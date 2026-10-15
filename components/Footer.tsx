import Link from "next/link";
import { Smartphone, Sun, Moon, Monitor } from "lucide-react";

const columns = [
  {
    title: "NovaCode",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Compare", href: "/pricing" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My projects", href: "#" },
      { label: "Profile", href: "#" },
      { label: "Referrals", href: "#" },
      { label: "Settings", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "What is vibe coding?", href: "#" },
      { label: "Docs", href: "/docs" },
      { label: "App Store status", href: "#" },
      { label: "Support", href: "#" },
      { label: "NovaCode Reviews", href: "#" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Integrations", href: "#" },
      { label: "Templates", href: "/templates" },
      { label: "CLI", href: "/cli" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Discord", href: "#" },
      { label: "X / Twitter", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "YouTube", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-[#1a1a1a] overflow-hidden">
      <div className="pointer-events-none absolute -bottom-32 -left-20 w-[480px] h-[480px] rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="relative max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-[6px] bg-gradient-to-br from-[#8b7cf6] to-[#5b4fe8] flex items-center justify-center">
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1L8.3 5.7L13 7L8.3 8.3L7 13L5.7 8.3L1 7L5.7 5.7Z" fill="white" />
                </svg>
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-[#fafafa]">
                NovaCode
              </span>
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-2 text-[12px] text-[#ccc] border border-[#2a2a2a] rounded-lg px-3 py-2 mb-5 hover:border-[#3a3a3a] transition-colors"
            >
              <Smartphone className="w-3.5 h-3.5" />
              Get the mobile app
            </Link>
            <ul className="space-y-2">
              {columns[0].links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-[#777] hover:text-[#fafafa] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {columns.slice(1).map((col) => (
            <div key={col.title}>
              <h3 className="text-[13px] font-medium text-[#777] mb-4">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-[#999] hover:text-[#fafafa] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-[#1a1a1a] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-5 order-2 md:order-1">
            <Link href="#" className="text-[12px] text-[#777] hover:text-[#fafafa] transition-colors">
              Terms of service
            </Link>
            <Link href="#" className="text-[12px] text-[#777] hover:text-[#fafafa] transition-colors">
              Privacy policy
            </Link>
            <Link href="#" className="text-[12px] text-[#777] hover:text-[#fafafa] transition-colors">
              Refund policy
            </Link>
          </div>
          <div className="flex items-center gap-4 order-1 md:order-2">
            <p className="text-[12px] text-[#777]">
              All rights reserved &bull; &copy; 2026 NovaCode
            </p>
            <div className="flex items-center gap-1 border border-[#2a2a2a] rounded-full p-1">
              <button aria-label="Light" className="p-1.5 rounded-full text-[#666] hover:text-[#fafafa] transition-colors">
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button aria-label="Dark" className="p-1.5 rounded-full bg-[#1f1f1f] text-[#fafafa]">
                <Moon className="w-3.5 h-3.5" />
              </button>
              <button aria-label="System" className="p-1.5 rounded-full text-[#666] hover:text-[#fafafa] transition-colors">
                <Monitor className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
