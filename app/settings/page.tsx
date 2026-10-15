"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Check, Trash2, ExternalLink, KeyRound } from "lucide-react";
import { createClient } from "../../lib/supabase/client";

const PROVIDERS = [
  {
    id: "openrouter",
    name: "OpenRouter",
    desc: "Eén sleutel voor tientallen modellen van alle aanbieders tegelijk — makkelijkste optie.",
    href: "https://openrouter.ai/keys",
    recommended: true,
  },
  {
    id: "openai",
    name: "OpenAI",
    desc: "GPT-modellen rechtstreeks via je eigen OpenAI-account.",
    href: "https://platform.openai.com/api-keys",
  },
  {
    id: "anthropic",
    name: "Anthropic",
    desc: "Claude-modellen rechtstreeks via je eigen Anthropic-account.",
    href: "https://console.anthropic.com/settings/keys",
  },
  {
    id: "google",
    name: "Google Gemini",
    desc: "Gemini-modellen via Google AI Studio.",
    href: "https://aistudio.google.com/app/apikey",
  },
  {
    id: "mistral",
    name: "Mistral",
    desc: "Mistral-modellen via je eigen Mistral-account.",
    href: "https://console.mistral.ai/api-keys",
  },
  {
    id: "ollama",
    name: "Ollama Cloud",
    desc: "Open-source modellen (Kimi, Llama, Qwen e.a.) via je eigen Ollama Cloud-account.",
    href: "https://ollama.com/settings/keys",
  },
];

type StoredKey = { id: string; provider: string; label: string | null; created_at: string };

export default function SettingsPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [keys, setKeys] = useState<StoredKey[]>([]);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState<{ provider: string; text: string } | null>(null);

  const loadKeys = useCallback(async () => {
    const res = await fetch("/api/keys");
    if (res.status === 401) {
      router.push("/login");
      return;
    }
    const data = await res.json();
    setKeys(data.keys ?? []);
  }, [router]);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/login");
        return;
      }
      setChecking(false);
      loadKeys();
    });
  }, [router, loadKeys]);

  const saveKey = async (providerId: string) => {
    const apiKey = draft[providerId]?.trim();
    if (!apiKey) return;
    setSaving(providerId);
    const res = await fetch("/api/keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider: providerId, apiKey }),
    });
    setSaving(null);
    if (res.ok) {
      setDraft((d) => ({ ...d, [providerId]: "" }));
      setMessage({ provider: providerId, text: "Opgeslagen en versleuteld bewaard." });
      loadKeys();
      setTimeout(() => setMessage(null), 3000);
    } else {
      const data = await res.json().catch(() => ({}));
      setMessage({ provider: providerId, text: data.error || "Opslaan mislukt." });
    }
  };

  const removeKey = async (providerId: string) => {
    setSaving(providerId);
    await fetch(`/api/keys?provider=${providerId}`, { method: "DELETE" });
    setSaving(null);
    loadKeys();
  };

  if (checking) {
    return <div className="min-h-[60vh]" />;
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#0a0a0a] px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10">
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">
            Instellingen &amp; API-sleutels
          </h1>
          <p className="text-sm text-neutral-400">
            Koppel je eigen LLM-abonnement. NovaCode gebruikt jouw sleutel om modellen aan te
            roepen — jij kiest en betaalt rechtstreeks bij de aanbieder. Sleutels worden
            versleuteld opgeslagen en nooit teruggestuurd naar de browser.
          </p>
        </div>

        <div className="space-y-3">
          {PROVIDERS.map((provider) => {
            const existing = keys.find((k) => k.provider === provider.id);
            return (
              <div
                key={provider.id}
                className="rounded-2xl border border-[#232327] bg-[#131316] p-5"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-[15px] font-medium text-white">{provider.name}</h3>
                      {provider.recommended && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gradient-to-r from-[#8b7cf6] to-[#5b4fe8] text-white">
                          Aanbevolen
                        </span>
                      )}
                      {existing && (
                        <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                          <Check className="w-3 h-3" />
                          Gekoppeld
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">{provider.desc}</p>
                  </div>
                  <a
                    href={provider.href}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white transition-colors"
                  >
                    Sleutel ophalen
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                    <input
                      type="password"
                      value={draft[provider.id] ?? ""}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, [provider.id]: e.target.value }))
                      }
                      placeholder={existing ? "Nieuwe sleutel invoeren om te vervangen" : "sk-..."}
                      className="w-full bg-[#0e0e10] border border-[#232327] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#5b4fe8]/50 transition-colors"
                    />
                  </div>
                  <button
                    onClick={() => saveKey(provider.id)}
                    disabled={saving === provider.id || !draft[provider.id]}
                    className="px-3.5 py-2 rounded-lg bg-white text-black text-xs font-medium hover:bg-neutral-200 transition-colors disabled:opacity-40"
                  >
                    {saving === provider.id ? "..." : "Opslaan"}
                  </button>
                  {existing && (
                    <button
                      onClick={() => removeKey(provider.id)}
                      disabled={saving === provider.id}
                      className="p-2 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                      aria-label="Verwijder sleutel"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                {message?.provider === provider.id && (
                  <p className="text-[11px] text-neutral-400 mt-2">{message.text}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
