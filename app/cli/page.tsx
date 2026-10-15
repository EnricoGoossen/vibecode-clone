import { Terminal } from "lucide-react";

const installCommands = [
  {
    platform: "macOS / Linux",
    command: "curl -fsSL https://cli.vibecodeapp.com/install | sh",
  },
  {
    platform: "Windows (PowerShell)",
    command: "irm https://cli.vibecodeapp.com/install.ps1 | iex",
  },
];

const commands = [
  { cmd: "vibecode init", desc: "Initialize a new Vibecode project" },
  { cmd: "vibecode build", desc: "Build your app from the current prompt" },
  { cmd: "vibecode preview", desc: "Start a local preview server" },
  { cmd: "vibecode deploy", desc: "Deploy to Vibecode Cloud or App Store" },
  { cmd: "vibecode export", desc: "Export your project source code" },
  { cmd: "vibecode login", desc: "Authenticate with your Vibecode account" },
  { cmd: "vibecode credits", desc: "Check your remaining credits" },
  { cmd: "vibecode templates", desc: "List available templates" },
];

const features = [
  { title: "Terminal-first", desc: "Full workflow without leaving your editor" },
  { title: "Export anytime", desc: "Your code is yours — download it whenever" },
  { title: "Cross-platform", desc: "macOS, Linux, and Windows support" },
];

export default function CliPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-[48px] font-semibold tracking-[-1.2px] text-[#fafafa] mb-4">
            Vibecode CLI
          </h1>
          <p className="text-[16px] text-[#a3a3a3] max-w-2xl">
            Build, preview, and deploy apps from your terminal. Available on macOS, Linux, and Windows.
          </p>
        </div>

        {/* Install */}
        <div className="mb-20">
          <h2 className="text-[32px] font-semibold tracking-[-0.8px] text-[#fafafa] mb-6">
            Installation
          </h2>
          <div className="space-y-4">
            {installCommands.map((item) => (
              <div key={item.platform} className="rounded-lg border border-[#1a1a1a] bg-[rgba(250,250,250,0.03)] overflow-hidden">
                <div className="px-4 py-2 border-b border-[#1a1a1a]">
                  <span className="text-[12px] text-[#555]">{item.platform}</span>
                </div>
                <div className="px-4 py-3">
                  <code className="font-mono text-[13px] text-[#fafafa]">{item.command}</code>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commands */}
        <div className="mb-20">
          <h2 className="text-[32px] font-semibold tracking-[-0.8px] text-[#fafafa] mb-6">
            Commands
          </h2>
          <div className="rounded-lg border border-[#1a1a1a] bg-[rgba(250,250,250,0.03)] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1a1a1a]">
                  <th className="text-left px-4 py-3 text-[12px] font-medium text-[#555] uppercase tracking-wider">Command</th>
                  <th className="text-left px-4 py-3 text-[12px] font-medium text-[#555] uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody>
                {commands.map((c, i) => (
                  <tr key={c.cmd} className={i < commands.length - 1 ? "border-b border-[#1a1a1a]" : ""}>
                    <td className="px-4 py-3">
                      <code className="font-mono text-[13px] text-[#fafafa]">{c.cmd}</code>
                    </td>
                    <td className="px-4 py-3 text-[14px] text-[#a3a3a3]">{c.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-[32px] font-semibold tracking-[-0.8px] text-[#fafafa] mb-6">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-lg border border-[#1a1a1a] bg-[rgba(250,250,250,0.03)] p-6">
                <h3 className="text-[18px] font-medium text-[#fafafa] mb-2">{f.title}</h3>
                <p className="text-[13px] text-[#a3a3a3]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
