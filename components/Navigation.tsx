"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

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
  { label: "Vibecode", href: "/" },
  { label: "Get the mobile app", href: "#" },
  { label: "Blog", href: "/blog" },
  { label: "Compare", href: "/pricing" },
  { label: "Careers", href: "#" },
  { label: "My projects", href: "#" },
  { label: "Profile", href: "#" },
  { label: "Referrals", href: "#" },
  { label: "Settings", href: "#" },
  { label: "FAQ", href: "/faq" },
  { label: "What is vibe coding?", href: "#" },
  { label: "Docs", href: "/docs" },
  { label: "App Store status", href: "#" },
  { label: "Support", href: "#" },
  { label: "Vibecode Reviews", href: "#" },
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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1a1a1a] bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="w-7 h-7 rounded-[7px] bg-gradient-to-br from-[#ff8a3d] to-[#e85d04] flex items-center justify-center">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2 7L7 2L12 7L7 12L2 7Z" fill="white" />
            </svg>
          </span>
          <span className="text-[16px] font-semibold tracking-tight text-[#fafafa]">
            Vibecode
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
          <Link
            href="/sign-in"
            className="inline-flex items-center text-[13px] font-medium text-[#fafafa] border border-[#2a2a2a] hover:border-[#3a3a3a] transition-colors px-4 py-[7px] rounded-full"
          >
            Log in
          </Link>
          <Link
            href="/get-started"
            className="hidden sm:inline-flex items-center text-[13px] font-medium text-black bg-white hover:bg-neutral-200 transition-colors px-4 py-[7px] rounded-full"
          >
            Get started
          </Link>
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
