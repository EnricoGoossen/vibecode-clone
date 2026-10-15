import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";
import { decrypt } from "../../../lib/crypto";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  const { prompt, model } = (await request.json()) as { prompt?: string; model?: string };
  if (!prompt) {
    return NextResponse.json({ error: "prompt is verplicht" }, { status: 400 });
  }

  const { data: row, error } = await supabase
    .from("api_keys")
    .select("encrypted_key, iv")
    .eq("user_id", auth.user.id)
    .eq("provider", "ollama")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!row) {
    return NextResponse.json(
      { error: "Geen Ollama Cloud-sleutel gekoppeld. Voeg er een toe in Instellingen." },
      { status: 400 }
    );
  }

  const apiKey = decrypt(row.encrypted_key, row.iv);
  const selectedModel = model || "glm-5.3-flash:cloud";

  try {
    const response = await fetch("https://ollama.com/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: [{ role: "user", content: prompt }],
        stream: false,
      }),
    });

    const text = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        { error: `Ollama Cloud gaf een fout (${response.status}): ${text.slice(0, 300)}` },
        { status: 502 }
      );
    }

    const data = JSON.parse(text);
    const reply = data?.message?.content ?? "(geen inhoud ontvangen)";

    return NextResponse.json({ reply, model: selectedModel });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Onbekende fout";
    return NextResponse.json({ error: `Kon Ollama Cloud niet bereiken: ${message}` }, { status: 500 });
  }
}
