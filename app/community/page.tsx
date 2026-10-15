import Link from "next/link";

const stats = [
  { value: "12,000+", label: "Builders" },
  { value: "45,000+", label: "Apps built" },
  { value: "3,200+", label: "Templates" },
];

const platforms = [
  { name: "Discord", desc: "Join 5,000+ builders sharing tips, templates, and feedback in real time." },
  { name: "X", desc: "Follow @vibecode for updates, tips, and community highlights." },
  { name: "YouTube", desc: "Tutorials, build-alongs, and product walkthroughs." },
  { name: "GitHub", desc: "Open-source templates, SDKs, and community projects." },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-[48px] font-semibold tracking-[-1.2px] text-[#fafafa] mb-4">
            Community
          </h1>
          <p className="text-[16px] text-[#a3a3a3] max-w-2xl mx-auto">
            Join thousands of builders creating apps with AI. Share, learn, and grow together.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-20">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-[32px] font-semibold tracking-[-0.8px] text-[#fafafa] mb-1">{s.value}</div>
              <div className="text-[13px] text-[#a3a3a3]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Platforms */}
        <div className="mb-20">
          <h2 className="text-[32px] font-semibold tracking-[-0.8px] text-[#fafafa] mb-6">
            Where to find us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {platforms.map((p) => (
              <div
                key={p.name}
                className="rounded-lg border border-[#1a1a1a] bg-[rgba(250,250,250,0.03)] p-6"
              >
                <h3 className="text-[18px] font-medium text-[#fafafa] mb-2">{p.name}</h3>
                <p className="text-[13px] text-[#a3a3a3]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="max-w-lg mx-auto rounded-lg border border-[#1a1a1a] bg-[rgba(250,250,250,0.03)] p-8">
            <h2 className="text-[32px] font-semibold tracking-[-0.8px] text-[#fafafa] mb-3">
              Ready to build?
            </h2>
            <p className="text-[14px] text-[#a3a3a3] mb-6">
              Start your first app today. It takes less than 5 minutes.
            </p>
            <Link
              href="/build"
              className="inline-block px-6 py-3 rounded-lg bg-[#fafafa] text-[#0a0a0a] text-[14px] font-medium hover:bg-[#e5e5e5] transition-colors"
            >
              Start building free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
