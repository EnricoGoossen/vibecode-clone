"use client";

import { useState } from "react";
import Link from "next/link";

const categories = ["All", "Productivity", "Business", "AI-powered", "Design", "Content", "Entertainment"];

const templates = [
  { name: "To-Do List App", category: "Productivity", desc: "A clean task manager with drag & drop, due dates, and categories." },
  { name: "Budget Tracker", category: "Business", desc: "Track expenses, set budgets, visualize spending with charts." },
  { name: "AI Chat Assistant", category: "AI-powered", desc: "Custom GPT-powered chat with memory, tools, and streaming." },
  { name: "E-commerce Store", category: "Business", desc: "Product catalog, cart, checkout, and order management." },
  { name: "Portfolio Website", category: "Design", desc: "Minimal, elegant portfolio with projects, about, and contact." },
  { name: "Fitness Tracker", category: "Productivity", desc: "Workout logging, progress charts, and habit tracking." },
  { name: "Recipe Box", category: "Content", desc: "Save, search, and organize recipes with images and tags." },
  { name: "Project Manager", category: "Business", desc: "Kanban boards, sprints, team assignment, and reporting." },
];

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? templates
    : templates.filter((t) => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-[48px] font-semibold tracking-[-1.2px] text-[#fafafa] mb-4">
            Templates
          </h1>
          <p className="text-[16px] text-[#a3a3a3] max-w-2xl mx-auto">
            Start from a proven template or build from scratch. Every template is fully customizable.
          </p>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-[#fafafa] text-[#0a0a0a]"
                  : "bg-[#262626] border border-[rgba(250,250,250,0.2)] text-[rgba(250,250,250,0.9)] hover:bg-[#333]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Template grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tpl) => (
            <Link
              key={tpl.name}
              href="/build"
              className="group flex flex-col rounded-lg border border-[#1a1a1a] bg-[rgba(250,250,250,0.03)] p-6 hover:border-[rgba(250,250,250,0.2)] transition-colors"
            >
              {/* Placeholder image */}
              <div className="h-40 rounded-lg bg-[#1a1a1a] mb-4" />

              <span className="text-[12px] text-[#a3a3a3] mb-2">{tpl.category}</span>

              <h3 className="text-[18px] font-medium text-[#fafafa] mb-2 group-hover:text-[#fafafa]">
                {tpl.name}
              </h3>
              <p className="text-[13px] text-[#a3a3a3] leading-relaxed">{tpl.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
