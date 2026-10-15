"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    cat: "Getting started",
    items: [
      {
        q: "What is Vibecode?",
        a: "Vibecode is an AI app builder. You describe what you want in plain language, and Vibecode writes the code, builds the app, and gets it ready to ship — as a web app or a native mobile app.",
      },
      {
        q: "Do I need to know how to code?",
        a: "No. You describe what you want and Vibecode handles the code. But if you do know how to code, you can also edit the source directly, connect your own database, and SSH into the project.",
      },
      {
        q: "What can I build?",
        a: "Websites, web apps, and native mobile apps for iOS and Android. From landing pages to full SaaS products, from utility apps to games.",
      },
      {
        q: "How does it work?",
        a: "You type a prompt describing your app. Vibecode's AI agent writes the code, sets up the project, and gives you a live preview. You can keep chatting to make changes, add features, or fix bugs.",
      },
    ],
  },
  {
    cat: "Pricing",
    items: [
      {
        q: "How much does it cost?",
        a: "Plans start at $20/month (Plus), $50/month (Pro), and $200/month (Max). Annual billing gets you 2 months free. $1 in credits = $1 in AI usage — we charge exactly what we pay.",
      },
      {
        q: "Is there a free tier?",
        a: "You can start building for free with limited credits. To publish to the App Store or access premium models, you need a paid plan.",
      },
      {
        q: "Do credits roll over?",
        a: "Yes. Credits roll over each billing cycle while your plan is active.",
      },
    ],
  },
  {
    cat: "Publishing",
    items: [
      {
        q: "Can I publish to the App Store?",
        a: "Yes. Vibecode builds, signs, and uploads your app to the App Store. You need an Apple Developer account ($99/year). No Mac or Xcode required.",
      },
      {
        q: "Can I publish to Google Play?",
        a: "Yes. Vibecode generates React Native apps for Android that you can submit to Google Play.",
      },
      {
        q: "Can I download the source code?",
        a: "Yes. All paid plans include source code download. You own the code Vibecode generates for you.",
      },
    ],
  },
  {
    cat: "Technical",
    items: [
      {
        q: "What technologies does Vibecode use?",
        a: "Web apps are built with modern web frameworks. iOS apps are native Swift and SwiftUI. Android apps use React Native. You can also connect your own database and authentication.",
      },
      {
        q: "Can I connect my own database?",
        a: "Yes. All paid plans include database and authentication connectivity for each project.",
      },
      {
        q: "Is there a CLI?",
        a: "Yes. Vibecode has a command-line interface for building and managing projects from your terminal. See the CLI docs for setup instructions.",
      },
    ],
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa]">
      <section className="px-6 pt-16 pb-8 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
          Frequently asked questions
        </h1>
        <p className="text-[#a3a3a3]">
          Everything you need to know about Vibecode.
        </p>
      </section>

      <section className="px-6 py-8 max-w-3xl mx-auto">
        {faqs.map((cat) => (
          <div key={cat.cat} className="mb-10">
            <h2 className="text-[13px] font-semibold uppercase tracking-wider text-[#555] mb-4">
              {cat.cat}
            </h2>
            <div className="space-y-1">
              {cat.items.map((item) => {
                const isOpen = open === item.q;
                return (
                  <div key={item.q} className="border-b border-[#1e1e1e]">
                    <button
                      onClick={() => setOpen(isOpen ? null : item.q)}
                      className="w-full flex items-center justify-between py-4 text-left"
                    >
                      <span className="text-[15px] font-medium pr-4">{item.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#555] shrink-0 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="pb-4 text-[14px] text-[#a3a3a3] leading-relaxed">
                        {item.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
