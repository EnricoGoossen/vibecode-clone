"use client";

import { MessageCircle, Users, Star } from "lucide-react";

const stats = [
  { label: "Active builders", value: "12,400+" },
  { label: "Apps shipped", value: "38,000+" },
  { label: "Avg. rating", value: "4.8" },
];

const testimonials = [
  {
    name: "Sarah K.",
    role: "Indie developer",
    text: "I went from zero code to a live iOS app in a weekend. Vibecode is the closest thing to magic I've seen in dev tools.",
  },
  {
    name: "Marcus T.",
    role: "Product manager",
    text: "Our team prototypes features in Vibecode before committing to a build. It's changed how we validate ideas.",
  },
  {
    name: "Aisha R.",
    role: "Solo founder",
    text: "Published my SaaS to the App Store without touching Xcode. The whole flow just works.",
  },
  {
    name: "Jake M.",
    role: "Designer",
    text: "I describe the app, Vibecode builds it, and I tweak the design by chatting. No more waiting on devs.",
  },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa]">
      <section className="px-6 pt-16 pb-10 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
          Community
        </h1>
        <p className="text-[#a3a3a3] max-w-lg mx-auto">
          Join thousands of builders shipping apps with AI. Share what you&apos;re making, get
          feedback, and learn from others.
        </p>
      </section>

      {/* Stats */}
      <section className="px-6 pb-12 max-w-3xl mx-auto">
        <div className="grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center p-4 rounded-2xl bg-[#111113] border border-[#1e1e1e]">
              <div className="text-2xl font-semibold mb-1">{s.value}</div>
              <div className="text-[12px] text-[#737373]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-8 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold tracking-tight mb-6">What builders say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border border-[#1e1e1e] bg-[#111113] p-5">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#facc15] text-[#facc15]" />
                ))}
              </div>
              <p className="text-[14px] text-[#a3a3a3] leading-relaxed mb-4">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <div className="text-[13px] font-medium">{t.name}</div>
                <div className="text-[12px] text-[#555]">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-12 max-w-2xl mx-auto text-center">
        <h2 className="text-xl font-semibold tracking-tight mb-3">Ready to build?</h2>
        <p className="text-[#a3a3a3] mb-6">
          Start building your app today. No credit card required.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#fafafa] text-[#0a0a0a] font-medium rounded-full text-sm hover:bg-[#e5e5e5] transition-colors"
        >
          Start building
        </a>
      </section>
    </div>
  );
}
