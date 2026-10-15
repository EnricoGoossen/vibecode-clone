import Link from "next/link";

const sidebarLinks = [
  { label: "Getting Started", href: "#getting-started" },
  { label: "Core Concepts", href: "#core-concepts" },
  { label: "Publishing", href: "#publishing" },
  { label: "API", href: "#api" },
];

const sections = [
  {
    id: "getting-started",
    title: "Getting Started",
    content: "Vibecode lets you build mobile and web apps by describing what you want in natural language. No coding required — just describe your app and our AI agent builds it for you.",
    code: null,
  },
  {
    id: "core-concepts",
    title: "Core Concepts",
    content: "Every app in Vibecode is built from a prompt. The AI agent interprets your description, generates the code, and shows you a live preview. You can iterate by sending follow-up messages to refine the app.",
    code: `// Your prompt becomes a working app
"Build a to-do list app with dark mode,
drag & drop reordering, and local storage"`,
  },
  {
    id: "publishing",
    title: "Publishing",
    content: "When your app is ready, you can share it via a link, deploy to the App Store, or export the full source code. With a Pro or Team plan, we handle the build, signing, and submission process.",
    code: `vibecode deploy --target app-store
vibecode deploy --target web
vibecode export --format zip`,
  },
  {
    id: "api",
    title: "API",
    content: "The Vibecode API lets you integrate AI-powered app building into your own workflows. Create, build, and deploy apps programmatically using REST endpoints.",
    code: `curl -X POST https://api.vibecodeapp.com/v1/apps \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"prompt": "Build a weather app", "platform": "ios"}'`,
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-[48px] font-semibold tracking-[-1.2px] text-[#fafafa] mb-4">
            Documentation
          </h1>
          <p className="text-[16px] text-[#a3a3a3] max-w-2xl">
            Everything you need to know about building apps with Vibecode.
          </p>
        </div>

        {/* Layout: sidebar + content */}
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <nav className="md:w-48 shrink-0">
            <ul className="space-y-1">
              {sidebarLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="block text-[14px] text-[#a3a3a3] hover:text-[#fafafa] py-2 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content */}
          <div className="flex-1 space-y-16">
            {sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className="text-[32px] font-semibold tracking-[-0.8px] text-[#fafafa] mb-4">
                  {section.title}
                </h2>
                <p className="text-[16px] text-[#a3a3a3] leading-relaxed mb-6">
                  {section.content}
                </p>
                {section.code && (
                  <div className="bg-[#1a1a1a] rounded-lg p-4 font-mono text-[13px] text-[#a3a3a3] overflow-x-auto whitespace-pre">
                    {section.code}
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
