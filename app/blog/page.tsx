import Link from "next/link";

const posts = [
  {
    title: "What is Vibe Coding? A Complete Guide",
    excerpt: "Vibe coding is the practice of building software by describing what you want in natural language, letting an AI agent handle the implementation.",
    date: "Oct 10, 2026",
    readTime: "8 min read",
  },
  {
    title: "Building Native iOS Apps with AI: What Changed in 2026",
    excerpt: "Cloud Macs, Swift + SwiftUI generation, and one-click App Store submission. The iOS app building landscape has shifted dramatically.",
    date: "Oct 5, 2026",
    readTime: "6 min read",
  },
  {
    title: "From Prompt to Production: Our Build Pipeline Explained",
    excerpt: "A deep dive into how Vibecode takes your description and turns it into a working, deployable application in minutes.",
    date: "Sep 28, 2026",
    readTime: "10 min read",
  },
  {
    title: "5 Apps Our Community Built This Month",
    excerpt: "From a budget tracker to a full e-commerce store — see what the Vibecode community is shipping.",
    date: "Sep 20, 2026",
    readTime: "5 min read",
  },
  {
    title: "React Native vs Native: Choosing the Right Stack",
    excerpt: "Not every app needs the same approach. Here's how to decide between cross-platform and native for your project.",
    date: "Sep 12, 2026",
    readTime: "7 min read",
  },
  {
    title: "Monetizing Your AI-Built App: Strategies That Work",
    excerpt: "In-app purchases, subscriptions, ads — how to make your Vibecode-built app earn revenue from day one.",
    date: "Sep 5, 2026",
    readTime: "9 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-[48px] font-semibold tracking-[-1.2px] text-[#fafafa] mb-4">
            Blog
          </h1>
          <p className="text-[16px] text-[#a3a3a3] max-w-2xl">
            Insights, guides, and updates from the Vibecode team.
          </p>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.title}
              href="#"
              className="block rounded-lg border border-[#1a1a1a] bg-[rgba(250,250,250,0.03)] p-6 hover:border-[rgba(250,250,250,0.2)] transition-colors"
            >
              <h3 className="text-[18px] font-medium text-[#fafafa] mb-2">
                {post.title}
              </h3>
              <p className="text-[14px] text-[#a3a3a3] leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4">
                <span className="text-[12px] text-[#555]">{post.date}</span>
                <span className="text-[12px] text-[#555]">{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
