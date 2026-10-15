import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Start building and exploring",
    features: [
      "100 credits per month",
      "Web app builds",
      "Community support",
      "Share via link",
      "Basic AI integrations",
    ],
    cta: "Start free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$20",
    period: "/month",
    description: "For serious builders",
    features: [
      "1,000 credits per month",
      "Native iOS + Android builds",
      "Priority support",
      "App Store deployment",
      "All AI integrations",
      "Custom domains",
      "Export & SSH access",
    ],
    cta: "Go Pro",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$79",
    period: "/month",
    description: "For teams and agencies",
    features: [
      "5,000 credits per month",
      "Everything in Pro",
      "5 team members",
      "Shared workspace",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-[48px] font-semibold tracking-[-1.2px] text-[#fafafa] mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-[16px] text-[#a3a3a3] max-w-2xl mx-auto">
            Start free, upgrade when you need more. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-lg border p-8 ${
                plan.highlighted
                  ? "border-[rgba(250,250,250,0.2)] bg-[rgba(250,250,250,0.05)]"
                  : "border-[#1a1a1a] bg-[rgba(250,250,250,0.03)]"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#262626] text-[#fafafa] text-[12px] font-medium px-3 py-1 rounded-full border border-[rgba(250,250,250,0.2)]">
                    Most popular
                  </span>
                </div>
              )}

              <h3 className="text-[18px] font-medium text-[#fafafa] mb-2">{plan.name}</h3>
              <p className="text-[13px] text-[#a3a3a3] mb-6">{plan.description}</p>

              <div className="mb-8">
                <span className="text-[48px] font-semibold tracking-[-1.2px] text-[#fafafa]">{plan.price}</span>
                <span className="text-[14px] text-[#a3a3a3]">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check size={16} className="text-[#a3a3a3] mt-0.5 shrink-0" />
                    <span className="text-[14px] text-[#fafafa]">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/build"
                className={`block text-center py-3 rounded-lg text-[14px] font-medium transition-colors ${
                  plan.highlighted
                    ? "bg-[#fafafa] text-[#0a0a0a] hover:bg-[#e5e5e5]"
                    : "bg-[#262626] border border-[rgba(250,250,250,0.2)] text-[rgba(250,250,250,0.9)] hover:bg-[#333]"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
