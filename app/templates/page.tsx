"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ArrowUpRight } from "lucide-react";

const categories = [
  { label: "All", count: 39 },
  { label: "Social", count: 4 },
  { label: "Video", count: 3 },
  { label: "Travel", count: 5 },
  { label: "Music", count: 4 },
  { label: "Fitness", count: 5 },
  { label: "Lifestyle", count: 10 },
  { label: "Productivity", count: 2 },
  { label: "Finance", count: 3 },
  { label: "Games", count: 3 },
];

const templates = [
  { name: "Instagram clone", desc: "Photo feed, stories, double-tap likes, comments, explore grid, DMs and profiles.", cat: "Social", theme: "from-pink-400 to-purple-500" },
  { name: "Uber clone", desc: "Map with moving cars, destination search, ride options, driver matching, live trip and rating.", cat: "Travel", theme: "from-gray-700 to-black" },
  { name: "Airbnb clone", desc: "Category browsing, map view, date and guest search, listing pages, checkout, wishlists and trips.", cat: "Travel", theme: "from-rose-400 to-red-500" },
  { name: "TikTok clone", desc: "Swipeable full-screen video feed, double-tap likes, comments, share sheet, profiles and recording.", cat: "Video", theme: "from-cyan-400 to-pink-500" },
  { name: "YouTube clone", desc: "Topic-chip home feed, watch page with up next, draggable mini-player, Shorts, search and subscriptions.", cat: "Video", theme: "from-red-500 to-red-700" },
  { name: "Netflix clone", desc: "Profile picker, hero billboard, Top 10 rows, title pages with trailers, full-screen player and My List.", cat: "Video", theme: "from-red-600 to-black" },
  { name: "Spotify clone", desc: "Plays real audio: home shelves, playlists, mini-player, Now Playing with lyrics, search and library.", cat: "Music", theme: "from-green-400 to-emerald-600" },
  { name: "Tinder clone", desc: "Swipe deck with like, nope and super like, It's a Match screen, chat, filters and profile editor.", cat: "Social", theme: "from-orange-400 to-pink-500" },
  { name: "Cash App clone", desc: "Big-number pay pad, pay and request flows, balance, debit card, investing charts and activity.", cat: "Finance", theme: "from-teal-400 to-cyan-600" },
  { name: "Discord clone", desc: "Server rail, channel categories, chat with reactions and embeds, member roles, voice room and DMs.", cat: "Social", theme: "from-indigo-400 to-purple-600" },
  { name: "Milo", desc: "An AI companion onboarding: springy sticky notes, four cartoon companions, a rolling dial and a postage stamp.", cat: "Lifestyle", theme: "from-amber-300 to-orange-400" },
  { name: "HomeView", desc: "A smart-home display on the iPhone Duo: drifting clock faces, face recognition, Siri answers, a 68° dashboard.", cat: "Lifestyle", theme: "from-slate-400 to-blue-500" },
  { name: "Gift Profiles", desc: "A Telegram-style profile where gift bubbles pop out of the avatar and swell into jelly blobs as you drag them.", cat: "Social", theme: "from-violet-400 to-fuchsia-500" },
  { name: "Plasma", desc: "A money app onboarding screen whose hero is a turning 3D ring of puffy, glossy country-flag badges.", cat: "Finance", theme: "from-blue-400 to-indigo-600" },
  { name: "Battlefleet", desc: "Battleship for the foldable iPhone Duo, with a realistic 3D ocean, jet strikes and a two-panel board.", cat: "Games", theme: "from-cyan-500 to-blue-700" },
  { name: "Pickup", desc: "A coffee order tracker whose street tilts into a 3D field of QR blocks that flattens into your pickup code.", cat: "Lifestyle", theme: "from-amber-400 to-yellow-500" },
  { name: "ScentScout", desc: "A fragrance tracker with a cream bottle shelf, a bottle zoom transition, a cologne library and a wear diary.", cat: "Lifestyle", theme: "from-stone-300 to-amber-400" },
  { name: "Hearthguard", desc: "A 3D tower defense game where your hero cuts through hordes of hundreds, grabs their gold and builds towers.", cat: "Games", theme: "from-orange-500 to-red-600" },
  { name: "Tilt Kart", desc: "A 3D kart racer you steer by turning your phone like a wheel, with drifts, item boxes and AI rivals.", cat: "Games", theme: "from-yellow-400 to-orange-500" },
  { name: "Ticker", desc: "A Robinhood-style investing app with a scrubbable chart, candlesticks and a buy flow that ends in confetti.", cat: "Finance", theme: "from-emerald-400 to-green-600" },
  { name: "Tempo", desc: "A music player with a drifting gradient from the album art, springy artwork and lyrics that scroll in time.", cat: "Music", theme: "from-purple-400 to-pink-500" },
  { name: "Lingo", desc: "A Duolingo-style Spanish app with a winding lesson path, a bouncing mascot, flip-in word cards and confetti.", cat: "Productivity", theme: "from-green-400 to-lime-500" },
  { name: "Breathe", desc: "A meditation app with a glowing breathing orb, an aurora sky, mood check-ins, sleep stories and soundscapes.", cat: "Lifestyle", theme: "from-indigo-400 to-purple-600" },
  { name: "Pulse", desc: "An Apple Fitness-style tracker with animated activity rings, weekly charts and workouts with a route map.", cat: "Fitness", theme: "from-green-400 to-emerald-600" },
  { name: "Keepy", desc: "Counts your football juggling touches from a clip or the live camera, with ball tracking and rhythm stats.", cat: "Fitness", theme: "from-lime-400 to-green-500" },
  { name: "Steps Duo", desc: "A step and workout tracker for the foldable iPhone Duo, with a calendar, run maps and shareable stat cards.", cat: "Fitness", theme: "from-blue-400 to-cyan-500" },
  { name: "Duo Fridge", desc: "Turns the iPhone Duo into a fridge: folded it is the door with magnets, unfolded it is the stocked shelves.", cat: "Lifestyle", theme: "from-sky-400 to-blue-500" },
  { name: "Dar Ride", desc: "A ride-hailing app for Dar es Salaam with cars, bajajis and boda bodas, a 3D night map and fares in shillings.", cat: "Travel", theme: "from-amber-500 to-orange-600" },
  { name: "Grok Bark", desc: "Grok Bot's look, but the AI agents run your dog's life: squirrel watch, treats, mailman defense and zoomies.", cat: "Lifestyle", theme: "from-gray-600 to-gray-800" },
  { name: "LegWork", desc: "Onboarding for a walking app that paints every street you walk onto a spinning globe.", cat: "Fitness", theme: "from-emerald-400 to-teal-500" },
  { name: "LegWork Leaderboard", desc: "A monthly walking leaderboard with a 3D podium, a city or world toggle and your own rank highlighted.", cat: "Fitness", theme: "from-amber-400 to-yellow-500" },
  { name: "Mixtapes", desc: "Turns the iPhone Duo into a zippered CD wallet: closed when folded, a binder of CDs to flip through when open.", cat: "Music", theme: "from-fuchsia-400 to-purple-500" },
  { name: "Passport", desc: "Turns the iPhone Duo into a US passport: folded it is the cover, unfolded you flip pages and stamp your trips.", cat: "Travel", theme: "from-blue-500 to-indigo-600" },
  { name: "Pinned", desc: "Meetings as sticky notes: tear off a note's ticket stub to cancel it and a red CANCELLED stamp slams down.", cat: "Productivity", theme: "from-yellow-300 to-amber-400" },
  { name: "Platform", desc: "A live platform view for Kyoto Station: trains glide in and out of a 3D map and your platform glows green.", cat: "Travel", theme: "from-emerald-400 to-green-600" },
  { name: "Cat Collector", desc: "Pokemon GO for street cats: catch cats with the camera, collect sticker cards and vote for Top Cat.", cat: "Lifestyle", theme: "from-pink-400 to-rose-500" },
  { name: "Music", desc: "Apple Music's iOS 26 look on the foldable iPhone Duo: one column when folded, wide shelves when open.", cat: "Music", theme: "from-red-400 to-pink-500" },
  { name: "Devotional", desc: "The onboarding of a daily devotional app: pick topics, swipe statements, sign a commitment and get a plan.", cat: "Lifestyle", theme: "from-amber-300 to-orange-400" },
  { name: "egglu", desc: "A cute egg-cooking buddy: wake up Pip, pull a lever to pick an egg, swipe to crack a recipe and run the timer.", cat: "Lifestyle", theme: "from-yellow-300 to-amber-400" },
];

const faqs = [
  {
    q: "What is an app template?",
    a: "A working app you start from instead of a blank screen. Each NovaCode template is a native iPhone app written in Swift with SwiftUI that recreates the core screens of a popular app under its own name, running on sample data.",
  },
  {
    q: "Are the templates free?",
    a: "Remixing a template is free with a NovaCode account and gives you your own copy of the Swift project. Changes you ask the agent for use credits. Publishing to the App Store needs the Plus plan or higher and an Apple Developer account ($99/year).",
  },
  {
    q: "Can I publish a template to the App Store?",
    a: "Yes, once it is your own product. Change the name, design and content first: Apple's App Review Guideline 4.1 rejects apps that copy or impersonate other apps. Publish to App Store signs in with your Apple ID and builds, signs and uploads the app, with no Mac or Xcode.",
  },
  {
    q: "Do the templates run on Android?",
    a: "No. They are native iPhone apps in Swift. For Android, start a Mobile app project in NovaCode, which builds React Native apps for iPhone and Android, and paste a template's prompt.",
  },
];

export default function TemplatesPage() {
  const [activeCat, setActiveCat] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = templates.filter((t) => {
    const matchesCat = activeCat === "All" || t.cat === activeCat;
    const matchesSearch = search === "" || t.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa]">
      {/* Header */}
      <section className="px-6 pt-16 pb-8 max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
          App templates
        </h1>
        <p className="text-[#a3a3a3] max-w-xl">
          Working iPhone apps in Swift. Remix one, change it by chatting, and publish it to the App Store.
        </p>
      </section>

      {/* Actions */}
      <section className="px-6 pb-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link
            href="/build"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#fafafa] text-[#0a0a0a] font-medium rounded-full text-sm hover:bg-[#e5e5e5] transition-colors"
          >
            Start from scratch
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.label}
                onClick={() => setActiveCat(c.label)}
                className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                  activeCat === c.label
                    ? "bg-[#fafafa] text-[#0a0a0a]"
                    : "bg-[#141414] text-[#a3a3a3] hover:text-[#fafafa] border border-[#1e1e1e]"
                }`}
              >
                {c.label}
                <span className={`ml-1.5 text-[11px] ${activeCat === c.label ? "text-[#555]" : "text-[#555]"}`}>
                  {c.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative mt-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search templates"
            className="w-full bg-[#141414] border border-[#242424] rounded-xl pl-10 pr-4 py-3 text-sm text-[#fafafa] placeholder-[#555] focus:outline-none focus:border-[#444]"
          />
        </div>
      </section>

      {/* Templates grid */}
      <section className="px-6 py-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((t) => (
            <Link
              key={t.name}
              href="/build"
              className="group rounded-2xl border border-[#1e1e1e] bg-[#111113] overflow-hidden hover:border-[#333] transition-colors"
            >
              <div className={`aspect-[16/10] bg-gradient-to-br ${t.theme} relative`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="w-16 h-2 rounded-full bg-black/20" />
                  <div className="flex gap-1.5">
                    <div className="w-8 h-2 rounded-full bg-black/20" />
                    <div className="w-8 h-2 rounded-full bg-black/20" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div className="space-y-1.5">
                    <div className="w-32 h-2.5 rounded-full bg-black/25" />
                    <div className="w-20 h-2.5 rounded-full bg-black/15" />
                  </div>
                  <div className="w-12 h-6 rounded-full bg-black/25" />
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[14px] font-medium text-[#fafafa] group-hover:text-white">
                    {t.name}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1a1a1a] text-[#737373] border border-[#242424]">
                    iOS
                  </span>
                </div>
                <p className="text-[12px] text-[#737373] leading-relaxed line-clamp-2">
                  {t.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#737373]">No templates match your search.</p>
          </div>
        )}
      </section>

      {/* What every template includes */}
      <section className="px-6 py-16 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold tracking-tight mb-6">
          What every template includes
        </h2>
        <ul className="space-y-3">
          {[
            "A native iPhone app in Swift and SwiftUI that runs in NovaCode's cloud iOS simulator, in your browser.",
            "Its own name, logo and colors, with none of the original app's trademarks.",
            "Realistic sample data with no login or backend, so every screen works right away.",
            "The exact prompt that built it, so you can rebuild it or change the brief.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[14px] text-[#a3a3a3]">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#444] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold tracking-tight mb-6">Questions</h2>
        <div className="space-y-6">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="text-[15px] font-medium text-[#fafafa] mb-2">{f.q}</h3>
              <p className="text-[14px] text-[#a3a3a3] leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
