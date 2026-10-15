"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const posts = [
  {
    title: "How to build an Instagram clone",
    excerpt: "A step-by-step guide to recreating the core screens of Instagram as a native iPhone app in Swift.",
    date: "Oct 2026",
    tag: "Guide",
    theme: "from-pink-400 to-purple-500",
  },
  {
    title: "How to build an Uber clone",
    excerpt: "Maps, ride matching, live trip tracking — how to build a ride-hailing app from scratch with AI.",
    date: "Sep 2026",
    tag: "Guide",
    theme: "from-gray-600 to-black",
  },
  {
    title: "Best AI mobile app builders in 2026",
    excerpt: "We compared the top AI app builders on features, pricing, and output quality. Here's what we found.",
    date: "Sep 2026",
    tag: "Comparison",
    theme: "from-blue-400 to-indigo-600",
  },
  {
    title: "What is vibe coding?",
    excerpt: "The new way of building software by describing what you want instead of writing code. A deep dive.",
    date: "Aug 2026",
    tag: "Concept",
    theme: "from-emerald-400 to-teal-600",
  },
  {
    title: "Publishing to the App Store without a Mac",
    excerpt: "How Vibecode builds, signs, and uploads your iOS app to the App Store — no Xcode required.",
    date: "Aug 2026",
    tag: "Tutorial",
    theme: "from-slate-400 to-blue-500",
  },
  {
    title: "From prompt to production: a case study",
    excerpt: "How a solo founder went from an idea to a live SaaS product in 3 weeks using Vibecode.",
    date: "Jul 2026",
    tag: "Case study",
    theme: "from-amber-400 to-orange-500",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa]">
      <section className="px-6 pt-16 pb-8 max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Blog</h1>
        <p className="text-[#a3a3a3]">
          Guides, comparisons, and stories from the Vibecode community.
        </p>
      </section>

      <section className="px-6 py-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {posts.map((post) => (
            <Link
              key={post.title}
              href="#"
              className="group rounded-2xl border border-[#1e1e1e] bg-[#111113] overflow-hidden hover:border-[#333] transition-colors"
            >
              <div className={`aspect-[16/9] bg-gradient-to-br ${post.theme} relative`}>
                <div className="absolute inset-0 bg-black/20" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#1a1a1a] text-[#737373] border border-[#242424]">
                    {post.tag}
                  </span>
                  <span className="text-[11px] text-[#555]">{post.date}</span>
                </div>
                <h2 className="text-[15px] font-medium mb-1.5 group-hover:text-white transition-colors">
                  {post.title}
                </h2>
                <p className="text-[13px] text-[#737373] leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
