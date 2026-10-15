"use client";

import { useState } from "react";
import { BookOpen, Code, Terminal, Rocket, Database, Shield } from "lucide-react";

const sections = [
  {
    icon: BookOpen,
    title: "Getting started",
    items: [
      { label: "Introduction", desc: "What NovaCode is and how it works" },
      { label: "Quick start", desc: "Build your first app in 5 minutes" },
      { label: "Project structure", desc: "How NovaCode organizes your code" },
      { label: "Prompting guide", desc: "Tips for getting the best results" },
    ],
  },
  {
    icon: Code,
    title: "Building",
    items: [
      { label: "Web apps", desc: "Build responsive websites and web apps" },
      { label: "iOS apps", desc: "Native Swift and SwiftUI apps" },
      { label: "Android apps", desc: "React Native apps for Android" },
      { label: "Custom code", desc: "Edit source code directly" },
    ],
  },
  {
    icon: Terminal,
    title: "CLI",
    items: [
      { label: "Installation", desc: "Install the NovaCode CLI" },
      { label: "Commands", desc: "Reference for all CLI commands" },
      { label: "Automation", desc: "Use NovaCode in CI/CD pipelines" },
    ],
  },
  {
    icon: Rocket,
    title: "Publishing",
    items: [
      { label: "App Store", desc: "Submit iOS apps to the App Store" },
      { label: "Google Play", desc: "Submit Android apps to Google Play" },
      { label: "Web hosting", desc: "Deploy web apps to production" },
    ],
  },
  {
    icon: Database,
    title: "Data & Auth",
    items: [
      { label: "Databases", desc: "Connect PostgreSQL, Supabase, or Firebase" },
      { label: "Authentication", desc: "Add login and user management" },
      { label: "APIs", desc: "Connect external APIs and webhooks" },
    ],
  },
  {
    icon: Shield,
    title: "Security",
    items: [
      { label: "Code ownership", desc: "You own all code NovaCode generates" },
      { label: "Data privacy", desc: "How your data is handled" },
      { label: "Compliance", desc: "GDPR and other compliance notes" },
    ],
  },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("Getting started");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa]">
      <section className="px-6 pt-16 pb-8 max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Docs</h1>
        <p className="text-[#a3a3a3]">
          Everything you need to build, ship, and manage apps with NovaCode.
        </p>
      </section>

      <section className="px-6 py-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.map((sec) => (
            <div
              key={sec.title}
              className="rounded-2xl border border-[#1e1e1e] bg-[#111113] p-5"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <sec.icon className="w-5 h-5 text-[#a3a3a3]" />
                <h2 className="text-[15px] font-semibold">{sec.title}</h2>
              </div>
              <ul className="space-y-2.5">
                {sec.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href="#"
                      className="block group"
                    >
                      <span className="text-[13px] font-medium text-[#a3a3a3] group-hover:text-[#fafafa] transition-colors">
                        {item.label}
                      </span>
                      <span className="block text-[12px] text-[#555] mt-0.5">
                        {item.desc}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
