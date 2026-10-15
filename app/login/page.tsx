"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Github, Mail } from "lucide-react";
import { createClient } from "../../lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<"github" | "google" | "email" | null>(null);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const signInWithProvider = async (provider: "github" | "google") => {
    setLoading(provider);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(null);
    }
  };

  const signInWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading("email");
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(null);
    } else {
      setSent(true);
      setLoading(null);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6 bg-[#0a0a0a]">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8b7cf6] to-[#5b4fe8] flex items-center justify-center">
              <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
                <path d="M7 1L8.3 5.7L13 7L8.3 8.3L7 13L5.7 8.3L1 7L5.7 5.7Z" fill="white" />
              </svg>
            </span>
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">
            Log in bij NovaCode
          </h1>
          <p className="text-sm text-neutral-400">
            Bouw en beheer je apps met AI
          </p>
        </div>

        <div className="space-y-2.5">
          <button
            onClick={() => signInWithProvider("github")}
            disabled={loading !== null}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#131316] border border-[#232327] text-sm font-medium text-white hover:border-[#38383c] transition-colors disabled:opacity-50"
          >
            <Github className="w-4 h-4" />
            {loading === "github" ? "Bezig..." : "Doorgaan met GitHub"}
          </button>
          <button
            onClick={() => signInWithProvider("google")}
            disabled={loading !== null}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-white text-sm font-medium text-black hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.87c2.27-2.09 3.59-5.17 3.59-8.81z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.93-2.92l-3.87-3c-1.08.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.1A12 12 0 0 0 12 24z" />
              <path fill="#FBBC05" d="M5.27 14.27A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.27v-3.1H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.37l4-3.1z" />
              <path fill="#EA4335" d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.27 6.63l4 3.1C6.22 6.88 8.87 4.77 12 4.77z" />
            </svg>
            {loading === "google" ? "Bezig..." : "Doorgaan met Google"}
          </button>
        </div>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-[#232327]" />
          <span className="text-xs text-neutral-500">of met e-mail</span>
          <div className="h-px flex-1 bg-[#232327]" />
        </div>

        {sent ? (
          <p className="text-sm text-neutral-300 text-center bg-[#131316] border border-[#232327] rounded-xl px-4 py-3">
            Check je inbox — we hebben een inloglink gestuurd naar {email}.
          </p>
        ) : (
          <form onSubmit={signInWithEmail} className="space-y-2.5">
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jij@voorbeeld.com"
                className="w-full bg-[#131316] border border-[#232327] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#5b4fe8]/50 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading !== null}
              className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#8b7cf6] to-[#5b4fe8] text-sm font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading === "email" ? "Bezig..." : "Stuur inloglink"}
            </button>
          </form>
        )}

        {error && (
          <p className="text-xs text-red-400 text-center mt-4">{error}</p>
        )}
      </div>
    </div>
  );
}
