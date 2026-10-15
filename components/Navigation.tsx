"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, ChevronDown, LogOut, Settings as SettingsIcon } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "../lib/supabase/client";

const navLinks = [
  { label: "Templates", href: "/templates" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Community", href: "/community" },
  { label: "FAQs", href: "/faq" },
  { label: "Docs", href: "/docs" },
  { label: "CLI", href: "/cli" },
];

const menuLinks = [
  { label: "NovaCode", href: "/" },
  { label: "Get the mobile app", href: "#" },
  { label: "Blog", href: "/blog" },
  { label: "Compare", href: "/pricing" },
  { label: "Careers", href: "#" },
  { label: "My projects", href: "#" },
  { label: "Profile", href: "#" },
  { label: "Referrals", href: "#" },
  { label: "Settings", href: "/settings" },
  { label: "FAQ", href: "/faq" },
  { label: "What is vibe coding?", href: "#" },
  { label: "Docs", href: "/docs" },
  { label: "App Store status", href: "#" },
  { label: "Support", href: "#" },
  { label: "NovaCode Reviews", href: "#" },
  { label: "Pricing", href: "/pricing" },
  { label: "Integrations", href: "#" },
  { label: "Templates", href: "/templates" },
  { label: "CLI", href: "/cli" },
  { label: "Discord", href: "#" },
  { label: "X / Twitter", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Terms of service", href: "#" },
  { label: "Privacy policy", href: "#" },
  { label: "Refund policy", href: "#" },
];

export default function Navigation() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoaded(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setAccountOpen(false);
    router.push("/");
    router.refresh();
  };

  const initial = (user?.user_metadata?.full_name || user?.email || "?")
    .charAt(0)
    .toUpperCase();
  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1a1a1a] bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="w-7 h-7 rounded-[7px] bg-gradient-to-br from-[#8b7cf6] to-[#5b4fe8] flex items-center justify-center">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L8.3 5.7L13 7L8.3 8.3L7 13L5.7 8.3L1 7L5.7 5.7Z" fill="white" />
            </svg>
          </span>
          <span className="text-[16px] font-semibold tracking-tight text-[#fafafa]">
            NovaCode
          </span>
        </Link>

        {/* Desktop center links */}
        <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3 py-2 text-[14px] text-[#a3a3a3] hover:text-[#fafafa] rounded-md transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 shrink-0">
          {loaded && user ? (
            <div className="relative">
              <button
                onClick={() => setAccountOpen((v) => !v)}
                className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full border border-[#2a2a2a] hover:border-[#3a3a3a] transition-colors"
              >
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatarUrl} alt="" className="w-6 h-6 rounded-full" />
                ) : (
                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#8b7cf6] to-[#5b4fe8] flex items-center justify-center text-[11px] font-medium text-white">
                    {initial}
                  </span>
                )}
                <span className="text-[13px] text-[#f0f0f5] max-w-[120px] truncate">
                  {user.user_metadata?.full_name || user.email}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
              </button>

              {accountOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-[#232327] bg-[#131316] shadow-2xl shadow-black/40 py-1.5 overflow-hidden">
                  <div className="px-3.5 py-2.5 border-b border-[#232327]">
                    <p className="text-[13px] text-white truncate">{user.email}</p>
                  </div>
                  <Link
                    href="/settings"
                    onClick={() => setAccountOpen(false)}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] text-[#d4d4d8] hover:bg-[#1a1a1e] transition-colors"
                  >
                    <SettingsIcon className="w-4 h-4" />
                    Instellingen &amp; API-sleutels
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] text-[#d4d4d8] hover:bg-[#1a1a1e] transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Uitloggen
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex items-center text-[13px] font-medium text-[#fafafa] border border-[#2a2a2a] hover:border-[#3a3a3a] transition-colors px-4 py-[7px] rounded-full"
              >
                Log in
              </Link>
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center text-[13px] font-medium text-black bg-white hover:bg-neutral-200 transition-colors px-4 py-[7px] rounded-full"
              >
                Get started
              </Link>
            </>
          )}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden p-2 text-[#fafafa] hover:text-white transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / full menu dropdown */}
      {menuOpen && (
        <div className="lg:hidden absolute top-16 inset-x-0 bg-[#0a0a0a] border-t border-[#1a1a1a] px-6 py-4 max-h-[70vh] overflow-y-auto">
          <nav className="flex flex-col gap-1">
            {menuLinks.map((link, i) => (
              <Link
                key={`${link.label}-${i}`}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-[14px] text-[#a3a3a3] hover:text-[#fafafa] py-2 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
