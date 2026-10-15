import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";
import { encrypt, maskKey } from "../../../lib/crypto";

export async function GET() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("api_keys")
    .select("id, provider, label, created_at")
    .eq("user_id", auth.user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Nooit de volledige sleutel teruggeven, alleen dat er een sleutel is opgeslagen.
  const keys = (data ?? []).map((row) => ({
    id: row.id,
    provider: row.provider,
    label: row.label,
    created_at: row.created_at,
  }));

  return NextResponse.json({ keys });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  const body = await request.json();
  const { provider, apiKey, label } = body as {
    provider?: string;
    apiKey?: string;
    label?: string;
  };

  if (!provider || !apiKey) {
    return NextResponse.json({ error: "provider en apiKey zijn verplicht" }, { status: 400 });
  }

  const { encrypted, iv } = encrypt(apiKey);

  const { error } = await supabase.from("api_keys").upsert(
    {
      user_id: auth.user.id,
      provider,
      label: label ?? null,
      encrypted_key: encrypted,
      iv,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,provider" }
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, masked: maskKey(apiKey) });
}

export async function DELETE(request: Request) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const provider = searchParams.get("provider");
  if (!provider) {
    return NextResponse.json({ error: "provider is verplicht" }, { status: 400 });
  }

  const { error } = await supabase
    .from("api_keys")
    .delete()
    .eq("user_id", auth.user.id)
    .eq("provider", provider);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
