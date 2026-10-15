"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Templates", href: "/templates" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Community", href: "/community" },
  { label: "FAQs", href: "/faqs" },
  { label: "Docs", href: "/docs" },
  { label: "CLI", href: "/cli" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-[#1e1e2e] bg-[#0a0a0f]/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-lg tracking-tight"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6c5ce7] to-[#a855f7] flex items-center justify-center glow-accent-subtle">
            <Sparkles className="w-4 h-4 text-white" />
          </span>
          <span className="text-[#f0f0f5]">NovaCode</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3 py-2 text-sm text-[#8b8b9e] hover:text-[#f0f0f5] rounded-md transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/sign-in"
            className="px-4 py-2 text-sm font-medium text-[#f0f0f5] hover:text-white transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/get-started"
            className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-[#6c5ce7] to-[#a855f7] text-white hover:opacity-90 transition-opacity glow-accent-subtle"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden p-2 text-[#f0f0f5] hover:text-white transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile slide-down */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          mobileOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 border-t border-[#1e1e2e] bg-[#0a0a0f]/95 backdrop-blur-md">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-sm text-[#8b8b9e] hover:text-[#f0f0f5] hover:bg-[#12121a] rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-[#1e1e2e]">
            <Link
              href="/sign-in"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2.5 text-sm font-medium text-center text-[#f0f0f5] border border-[#1e1e2e] rounded-lg hover:bg-[#12121a] transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/get-started"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2.5 text-sm font-medium text-center rounded-lg bg-gradient-to-r from-[#6c5ce7] to-[#a855f7] text-white hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
