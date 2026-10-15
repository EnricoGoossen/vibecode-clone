"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What is Vibecode?",
    a: "Vibecode is an AI-powered app builder that lets you create mobile and web apps by describing what you want in natural language. No coding required — just describe your app and our AI agent builds it for you.",
  },
  {
    q: "How does it work?",
    a: "You describe your app in the chat panel. Our AI agent interprets your description, generates the code, and shows you a live preview. You can iterate by sending follow-up messages to refine the app.",
  },
  {
    q: "Can I build native iOS and Android apps?",
    a: "Yes. Vibecode builds native iOS apps using Swift + SwiftUI on cloud Macs, and Android apps using Kotlin. You can also build web apps with React. All from the same prompt.",
  },
  {
    q: "What happens to my code?",
    a: "Your code is yours. You can export it at any time, download the full source, or get SSH access to the build environment. There's no lock-in.",
  },
  {
    q: "How do credits work?",
    a: "Each build action consumes credits. The Free plan includes 100 credits/month, Pro includes 1,000, and Team includes 5,000. Credits reset monthly and don't roll over.",
  },
  {
    q: "Can I deploy to the App Store?",
    a: "Yes. With a Pro or Team plan, you can submit your app directly to the Apple App Store or Google Play Store. We handle the build, signing, and submission process.",
  },
  {
    q: "What AI integrations are available?",
    a: "Vibecode supports GPT, Gemini, image generation, maps, weather, and more. You can add AI-powered features to your app with a single prompt.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. The Free plan gives you 100 credits per month, web app builds, community support, and the ability to share your app via link. No credit card required.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-[48px] font-semibold tracking-[-1.2px] text-[#fafafa] mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-[16px] text-[#a3a3a3]">
            Everything you need to know about Vibecode.
          </p>
        </div>

        {/* FAQ items */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-[#1a1a1a]">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left"
              >
                <span className="text-[15px] font-medium text-[#fafafa] pr-4">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-[#555] shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="pb-5">
                  <p className="text-[14px] text-[#a3a3a3] leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
