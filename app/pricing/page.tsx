"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Plus",
    price: 20,
    credits: "$20 credits per month",
    features: [
      "Access to Premium models",
      "Build any AI apps with just prompts — no API keys required",
      "Generate custom image and sound assets",
      "Connect database and authentication for each project",
      "App store submission",
      "Download source code",
      "SSH to Cursor",
      "24/7 priority support",
    ],
    recommended: false,
  },
  {
    name: "Pro",
    price: 50,
    credits: "$55 credits per month",
    features: [
      "Access to Premium models",
      "Build any AI apps with just prompts — no API keys required",
      "Generate custom image and sound assets",
      "Connect database and authentication for each project",
      "App store submission",
      "Download source code",
      "SSH to Cursor",
      "24/7 priority support",
    ],
    recommended: true,
  },
  {
    name: "Max",
    price: 200,
    credits: "$220 credits per month",
    features: [
      "Access to Premium models",
      "Build any AI apps with just prompts — no API keys required",
      "Generate custom image and sound assets",
      "Connect database and authentication for each project",
      "App store submission",
      "Download source code",
      "SSH to Cursor",
      "24/7 priority support",
    ],
    recommended: false,
  },
];

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa]">
      {/* Header */}
      <section className="px-6 pt-16 pb-10 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
          Wholesale AI pricing. No hidden fees.
        </h1>
        <p className="text-[#a3a3a3] max-w-xl mx-auto text-[15px] leading-relaxed">
          $1 in credits on Vibecode = $1 in AI usage on Anthropic, OpenAI, etc. We charge exactly
          what we pay. Credits roll over each billing cycle while your plan is active.
        </p>
      </section>

      {/* Billing toggle */}
      <section className="px-6 pb-10">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              billing === "monthly"
                ? "bg-[#fafafa] text-[#0a0a0a]"
                : "bg-[#141414] text-[#a3a3a3] hover:text-[#fafafa] border border-[#1e1e1e]"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("annual")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              billing === "annual"
                ? "bg-[#fafafa] text-[#0a0a0a]"
                : "bg-[#141414] text-[#a3a3a3] hover:text-[#fafafa] border border-[#1e1e1e]"
            }`}
          >
            Annual
            <span className="ml-1 text-[11px] opacity-60">(2 months free)</span>
          </button>
        </div>
      </section>

      {/* Plans */}
      <section className="px-6 py-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const displayPrice = billing === "annual" ? Math.round(plan.price * 10 / 12) : plan.price;
            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-6 flex flex-col ${
                  plan.recommended
                    ? "border-[#fafafa]/30 bg-[#141414]"
                    : "border-[#1e1e1e] bg-[#111113]"
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#fafafa] text-[#0a0a0a] text-[11px] font-semibold">
                    Recommended
                  </span>
                )}

                <h2 className="text-lg font-semibold mb-1">{plan.name}</h2>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-semibold">${displayPrice}</span>
                  <span className="text-sm text-[#737373]">/month</span>
                </div>
                <p className="text-[13px] text-[#a3a3a3] mb-6">{plan.credits}</p>

                <button
                  className={`w-full py-2.5 rounded-xl text-sm font-medium mb-6 transition-colors ${
                    plan.recommended
                      ? "bg-[#fafafa] text-[#0a0a0a] hover:bg-[#e5e5e5]"
                      : "bg-[#1a1a1a] text-[#fafafa] hover:bg-[#242424] border border-[#242424]"
                  }`}
                >
                  Upgrade to {plan.name}
                </button>

                <ul className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13px] text-[#a3a3a3]">
                      <Check className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="text-center text-[13px] text-[#555] mt-8">
          Credits roll over each billing cycle while your plan is active
        </p>
      </section>

      {/* Disclaimer */}
      <section className="px-6 py-12 max-w-2xl mx-auto text-center">
        <p className="text-[13px] text-[#555] leading-relaxed">
          Our pricing tiers are experimental and may evolve. We&apos;re still trying to figure out
          the exact way to price this product, and we may change our tier limits at any time as
          defined in the{" "}
          <a href="#" className="text-[#a3a3a3] underline underline-offset-2">
            terms of service
          </a>
          .{" "}
          <a href="#" className="text-[#a3a3a3] underline underline-offset-2">
            terms of service
          </a>{" "}
          and{" "}
          <a href="#" className="text-[#a3a3a3] underline underline-offset-2">
            refund policy
          </a>
          .
        </p>
      </section>
    </div>
  );
}
