"use client";

import { Terminal, Copy, Check } from "lucide-react";
import { useState } from "react";

const commands = [
  {
    cmd: "npm install -g novacode-cli",
    desc: "Install the NovaCode CLI globally",
  },
  {
    cmd: "novacode init my-app",
    desc: "Create a new project",
  },
  {
    cmd: "novacode build",
    desc: "Build the current project",
  },
  {
    cmd: "novacode deploy --target appstore",
    desc: "Deploy to the App Store",
  },
  {
    cmd: "novacode deploy --target web",
    desc: "Deploy as a web app",
  },
  {
    cmd: "novacode logs",
    desc: "View build and runtime logs",
  },
  {
    cmd: "novacode credits",
    desc: "Check your remaining credits",
  },
];

export default function CliPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(cmd);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa]">
      <section className="px-6 pt-16 pb-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#1e1e1e] flex items-center justify-center">
            <Terminal className="w-5 h-5 text-[#a3a3a3]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">CLI</h1>
        </div>
        <p className="text-[#a3a3a3]">
          Build, manage, and deploy your NovaCode projects from the terminal.
        </p>
      </section>

      <section className="px-6 py-8 max-w-3xl mx-auto">
        <div className="rounded-2xl border border-[#1e1e1e] bg-[#0d0d0d] overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1e1e1e] bg-[#111113]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-[12px] text-[#555] ml-2">novacode-cli</span>
          </div>
          <div className="p-5 space-y-4">
            {commands.map((c) => (
              <div key={c.cmd} className="group">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-[#4ade80] select-none">$</span>
                  <code className="text-[13px] text-[#e5e5e5] font-mono flex-1">
                    {c.cmd}
                  </code>
                  <button
                    onClick={() => handleCopy(c.cmd)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-[#1a1a1a]"
                  >
                    {copied === c.cmd ? (
                      <Check className="w-3.5 h-3.5 text-[#4ade80]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-[#555]" />
                    )}
                  </button>
                </div>
                <p className="text-[12px] text-[#555] mt-1 ml-5">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 max-w-3xl mx-auto">
        <h2 className="text-lg font-semibold tracking-tight mb-4">Requirements</h2>
        <ul className="space-y-2">
          {[
            "Node.js 18 or later",
            "A NovaCode account (free or paid)",
            "Apple Developer account for App Store deployment ($99/year)",
          ].map((req) => (
            <li key={req} className="flex items-center gap-2 text-[14px] text-[#a3a3a3]">
              <Check className="w-4 h-4 text-[#4ade80]" />
              {req}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
