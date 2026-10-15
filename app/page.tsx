"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronDown,
  Mic,
  Sparkles,
  Globe,
  Calendar,
  Users,
  Calculator,
  Package,
  Pause,
  ArrowRight,
  ArrowUpRight,
  Apple,
  PlayCircle,
  Star,
} from "lucide-react";

const suggestions = [
  { label: "Booking site", icon: Calendar },
  { label: "Customer CRM", icon: Users },
  { label: "Quote calculator", icon: Calculator },
  { label: "Website", icon: Globe },
  { label: "Inventory tracker", icon: Package },
];

const webApps = [
  { name: "Fatto Studio", desc: "Portfolio site for an architecture studio", theme: "from-stone-200 to-stone-400" },
  { name: "Fieldnotes", desc: "A weekend trip planner that builds your itinerary", theme: "from-amber-200 to-orange-300" },
  { name: "The Traveller's Rest", desc: "A browser game where you run a storybook tavern", theme: "from-emerald-300 to-teal-500" },
  { name: "Shepherd Anatomy Atlas", desc: "An interactive anatomy atlas for medical students", theme: "from-sky-300 to-indigo-400" },
  { name: "Cyber Ronin", desc: "Launch page for a concept cyber helmet", theme: "from-fuchsia-400 to-purple-600" },
];

const mobileApps = [
  { name: "MyJoy", desc: "Your all-in-one wellbeing companion for a more balanced body and mind", store: true, theme: "from-rose-300 to-pink-500" },
  { name: "Demo Crew", desc: "A cartoon demolition game", store: false, theme: "from-yellow-300 to-orange-500" },
  { name: "Lumen Budget", desc: "Track income, spending and your balance", store: true, theme: "from-lime-300 to-emerald-500" },
  { name: "ScentScout", desc: "A shelf for your fragrance collection", store: false, theme: "from-violet-300 to-indigo-500" },
  { name: "Tomorrow's Weather Alert", desc: "Tomorrow's forecast, sent the night before", store: true, theme: "from-cyan-300 to-blue-500" },
  { name: "Lift Mode", desc: "Log every session, keep the streak alive", store: false, theme: "from-slate-300 to-slate-500" },
  { name: "STARDUST Coffee House", desc: "Order ahead from a local coffee shop", store: true, theme: "from-amber-300 to-red-500" },
  { name: "AetherQuest", desc: "A 3D island adventure with three heroes", store: false, theme: "from-teal-300 to-cyan-600" },
  { name: "Couch-O-Meter", desc: "Interval timers for quick workouts", store: true, theme: "from-pink-300 to-rose-500" },
  { name: "Flighter", desc: "Every flight you take, on a 3D globe", store: false, theme: "from-blue-300 to-indigo-600" },
];

function BrowserPreview({ app }: { app: (typeof webApps)[number] }) {
  return (
    <div className="rounded-2xl border border-[#242424] bg-[#111113] overflow-hidden shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1e1e1e]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#2c2c2c]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#2c2c2c]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#2c2c2c]" />
        <span className="mx-auto text-[12px] text-[#999] bg-[#1a1a1a] px-3 py-1 rounded-md">
          {app.name}
        </span>
      </div>
      <div className={`aspect-[16/10] bg-gradient-to-br ${app.theme} relative`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
          <div className="w-20 h-2.5 rounded-full bg-black/20" />
          <div className="flex gap-2">
            <div className="w-10 h-2.5 rounded-full bg-black/20" />
            <div className="w-10 h-2.5 rounded-full bg-black/20" />
            <div className="w-10 h-2.5 rounded-full bg-black/20" />
          </div>
        </div>
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <div className="space-y-2">
            <div className="w-40 h-3 rounded-full bg-black/25" />
            <div className="w-28 h-3 rounded-full bg-black/15" />
          </div>
          <div className="w-16 h-8 rounded-full bg-black/25" />
        </div>
      </div>
    </div>
  );
}

function PhoneCard({ app }: { app: (typeof mobileApps)[number] }) {
  return (
    <div className="shrink-0 w-[180px] snap-start">
      <div className="rounded-[2rem] border-[6px] border-[#1a1a1a] bg-black overflow-hidden shadow-xl shadow-black/40">
        <div className={`aspect-[9/19.5] bg-gradient-to-br ${app.theme} relative`}>
          <div className="absolute top-0 inset-x-0 flex items-center justify-between px-4 pt-2 text-[10px] font-medium text-black/70">
            <span>9:41</span>
            <span className="w-14 h-4 rounded-full bg-black/20" />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-black/15 rounded-t-3xl" />
        </div>
      </div>
      <h4 className="text-sm font-medium text-white mt-3 mb-1">{app.name}</h4>
      <p className="text-xs text-neutral-500 leading-relaxed">{app.desc}</p>
      {app.store && (
        <p className="text-xs text-neutral-600 mt-1">On the App Store</p>
      )}
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [tab, setTab] = useState<"web" | "mobile">("web");
  const [activeWeb, setActiveWeb] = useState(0);
  const [prompt, setPrompt] = useState("");

  const goBuild = () => {
    const q = prompt.trim();
    router.push(q ? `/build?prompt=${encodeURIComponent(q)}` : "/build");
  };

  return (
    <div className="relative bg-[#0a0a0a] text-white overflow-hidden">
      {/* ambient glow */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-[700px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(168,85,247,0.08),transparent)]" />
      <div className="pointer-events-none absolute bottom-[-200px] left-[-100px] w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-sky-500/5 blur-[140px]" />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-28 pb-10 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-[64px] font-bold tracking-tight leading-[1.05] mb-6">
          Build mobile and web apps with AI.
        </h1>
        <p className="text-lg text-neutral-400 mb-10 max-w-xl">
          Describe your idea, get a working app, and publish it without starting from scratch.
        </p>

        {/* Prompt Input */}
        <div className="w-full max-w-2xl mx-auto">
          <div className="bg-[#131316] border border-[#232327] rounded-[22px] p-4 text-left">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  goBuild();
                }
              }}
              placeholder="What do you want to create?"
              rows={2}
              className="w-full bg-transparent border-0 resize-none text-[15px] text-white placeholder-neutral-500 focus:outline-none mb-3"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#1c1c20] text-neutral-300 border border-[#28282c] hover:border-[#38383c] transition-colors">
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                  Opus 5.5 (Med)
                  <ChevronDown className="w-3 h-3 text-neutral-500" />
                </button>
                <button
                  onClick={() => setTab(tab === "web" ? "mobile" : "web")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#1c1c20] text-neutral-300 border border-[#28282c] hover:border-[#38383c] transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  {tab === "web" ? "Web" : "Mobile"}
                  <ChevronDown className="w-3 h-3 text-neutral-500" />
                </button>
              </div>
              <div className="flex items-center gap-1">
                <button
                  aria-label="Voice input"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#1c1c20] transition-colors"
                >
                  <Mic className="w-4 h-4" />
                </button>
                <button
                  aria-label="Generate"
                  onClick={goBuild}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-black hover:bg-neutral-200 transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {suggestions.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => setPrompt(label)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs text-neutral-300 bg-[#131316] border border-[#232327] hover:border-[#38383c] transition-colors"
              >
                <Icon className="w-3.5 h-3.5 text-neutral-500" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Built on NovaCode */}
      <section className="relative px-6 py-20 mt-16 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
          Built on NovaCode
        </h2>
        <p className="text-neutral-400 text-[15px] mb-14 max-w-lg mx-auto">
          Websites, games and iPhone apps made with NovaCode. Each one started as a prompt.
        </p>

        {/* Web apps */}
        <div className="mb-20 text-left">
          <div className="flex items-center justify-between mb-6">
            <h3 className="flex items-center gap-2 text-xs font-semibold tracking-widest text-neutral-500 uppercase">
              <Globe className="w-3.5 h-3.5" />
              On the web
            </h3>
            <button className="flex items-center gap-1.5 text-xs text-neutral-400 border border-[#232327] rounded-full px-3 py-1.5 hover:text-white transition-colors">
              <Pause className="w-3 h-3" />
              Pause
            </button>
          </div>

          <div className="grid md:grid-cols-[320px_1fr] gap-8 items-start">
            <div className="flex flex-col gap-1">
              {webApps.map((app, i) => (
                <button
                  key={app.name}
                  onClick={() => setActiveWeb(i)}
                  className={`text-left rounded-xl px-4 py-3 transition-colors ${
                    activeWeb === i ? "bg-[#17171a]" : "hover:bg-[#121214]"
                  }`}
                >
                  <h4 className="text-sm font-medium text-white mb-1">{app.name}</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed">{app.desc}</p>
                  {activeWeb === i && (
                    <span className="block mt-3 h-[2px] w-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-purple-500" />
                  )}
                </button>
              ))}
            </div>

            <BrowserPreview app={webApps[activeWeb]} />
          </div>
        </div>

        {/* Mobile apps */}
        <div className="text-left">
          <div className="flex items-center justify-between mb-6">
            <h3 className="flex items-center gap-2 text-xs font-semibold tracking-widest text-neutral-500 uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              On iPhone
            </h3>
            <button className="flex items-center gap-1.5 text-xs text-neutral-400 border border-[#232327] rounded-full px-3 py-1.5 hover:text-white transition-colors">
              <Pause className="w-3 h-3" />
              Pause
            </button>
          </div>

          <div className="flex gap-5 overflow-x-auto snap-x pb-4 -mx-6 px-6 [scrollbar-width:none]">
            {mobileApps.map((app) => (
              <PhoneCard key={app.name} app={app} />
            ))}
          </div>

          <p className="text-sm text-neutral-500 mt-6">
            <Link href="#" className="text-white underline underline-offset-2">
              Get the mobile app
            </Link>{" "}
            to keep building on the go.
          </p>
        </div>
      </section>

      {/* Mobile app CTA */}
      <section className="relative px-6 py-24 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 leading-tight">
              Get the mobile app
              <br />
              to keep building on the go.
            </h2>
            <p className="text-neutral-400 mb-2">Create websites and apps in seconds with AI</p>
            <p className="text-sm text-neutral-500 mb-8 max-w-sm">
              The NovaCode app has been on the App Store since June 2025, and NovaCode builds
              native Swift iPhone apps you can publish there too.{" "}
              <a href="#" className="text-white underline underline-offset-2">
                App Store status
              </a>
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#"
                className="flex items-center gap-2 bg-white text-black px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-neutral-200 transition-colors"
              >
                <Apple className="w-5 h-5" />
                <span className="text-left leading-tight">
                  <span className="block text-[10px] font-normal">Download on the</span>
                  <span className="block text-[13px] font-semibold -mt-0.5">App Store</span>
                </span>
              </a>
              <div className="flex items-center gap-1 text-xs text-neutral-400 border border-[#232327] rounded-xl px-3 py-2.5">
                <Star className="w-3.5 h-3.5 fill-neutral-400 text-neutral-400" />
                4.7 App Store
              </div>
              <a
                href="#"
                className="flex items-center gap-2 bg-white text-black px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-neutral-200 transition-colors"
              >
                <PlayCircle className="w-5 h-5" />
                <span className="text-left leading-tight">
                  <span className="block text-[10px] font-normal">GET IT ON</span>
                  <span className="block text-[13px] font-semibold -mt-0.5">Google Play</span>
                </span>
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="w-[260px] rounded-[2.5rem] border-[8px] border-[#1a1a1a] bg-black overflow-hidden shadow-2xl shadow-black/50">
              <div className="aspect-[9/19.5] bg-[#0d0d0f] relative flex flex-col">
                <div className="flex items-center justify-between px-5 pt-3 text-[10px] text-neutral-400">
                  <span>9:41</span>
                  <span className="w-12 h-3 rounded-full bg-neutral-800" />
                </div>
                <div className="flex gap-2 px-4 pt-4">
                  <span className="px-2.5 py-1 rounded-full text-[9px] bg-[#1c1c20] text-neutral-300 border border-[#28282c]">
                    AI chat
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[9px] bg-[#1c1c20] text-neutral-300 border border-[#28282c]">
                    Mood Tracker
                  </span>
                </div>
                <div className="flex-1 px-4 pt-4 space-y-2">
                  <div className="bg-[#17171a] rounded-xl p-3 text-[10px] text-neutral-300 leading-relaxed">
                    Let&apos;s make a calorie tracking app using{" "}
                    <span className="text-emerald-400">@gpt-5.2</span> to analyze my food.
                  </div>
                  <div className="bg-[#17171a] rounded-xl p-3 text-[10px] text-neutral-300 leading-relaxed">
                    Use this for my logo: <span className="text-sky-400">@favicon</span>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <div className="flex items-center justify-between bg-[#141416] rounded-full px-3 py-2">
                    <span className="flex items-center gap-1 text-[9px] text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Cloud enabled
                    </span>
                    <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-black" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 py-20 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
          Create websites and apps in seconds with AI
        </h2>
        <p className="text-neutral-400">
          The NovaCode app has been on the App Store since June 2025, and NovaCode builds native
          Swift iPhone apps you can publish there too.{" "}
          <a href="#" className="text-white underline underline-offset-2">
            App Store status
          </a>
        </p>
      </section>

      {/* Final CTA band */}
      <section className="relative px-6 pt-10 pb-28 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-neutral-200 mb-8 leading-snug">
          Join the next wave of thinkers,
          <br />
          creators, problem-solvers.
        </h2>
        <button
          onClick={goBuild}
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black font-medium rounded-full text-sm hover:bg-neutral-200 transition-colors"
        >
          Get started
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
}
