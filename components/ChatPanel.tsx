"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUp, Sparkles, ChevronDown } from "lucide-react";
import MessageBubble from "./MessageBubble";

interface Message {
  role: "user" | "agent";
  content: string;
  timestamp?: string;
  streaming?: boolean;
}

interface ChatPanelProps {
  onSend: (message: string) => void;
  isGenerating: boolean;
  hasApp: boolean;
}

const suggestions = [
  "A todo app with dark mode",
  "A personal budget tracker",
  "A kanban board for tasks",
  "A recipe collection app",
];

const MODELS = [
  { id: "glm-5.3-flash:cloud", label: "GLM 5.3 Flash", desc: "Snel, goed voor dagelijks gebruik" },
  { id: "gpt-oss:120b-cloud", label: "GPT-OSS 120B", desc: "Groter, sterker redeneervermogen" },
  { id: "gpt-oss:20b-cloud", label: "GPT-OSS 20B", desc: "Lichtgewicht en snel" },
  { id: "qwen3-coder:480b-cloud", label: "Qwen3 Coder 480B", desc: "Gespecialiseerd in code" },
  { id: "deepseek-v3.1:671b-cloud", label: "DeepSeek v3.1 671B", desc: "Grootste model, meest capabel" },
];

function timeNow() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatPanel({ onSend, isGenerating, hasApp }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [model, setModel] = useState(MODELS[0]);
  const [modelOpen, setModelOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  const handleSend = async () => {
    if (!input.trim() || sending || isGenerating) return;
    const msg = input.trim();
    setInput("");
    setSending(true);
    setMessages((prev) => [...prev, { role: "user", content: msg, timestamp: timeNow() }]);
    setStatus(`${model.label} denkt na...`);

    // Plek voor het streamende antwoord.
    setMessages((prev) => [...prev, { role: "agent", content: "", streaming: true }]);

    try {
      const res = await fetch("/api/ollama", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: msg, model: model.id }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "agent", content: `⚠️ ${data.error}`, timestamp: timeNow() };
          return next;
        });
        setStatus(null);
        setSending(false);
        return;
      }

      setStatus(null);
      const full: string = data.reply;

      // Het antwoord is al binnen (echt, van Ollama Cloud) — we onthullen het
      // woord voor woord zodat het leest als live typen.
      const words = full.split(/(\s+)/);
      let shown = "";
      for (const word of words) {
        shown += word;
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "agent", content: shown, streaming: true };
          return next;
        });
        await new Promise((r) => setTimeout(r, 18));
      }

      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = { role: "agent", content: full, timestamp: timeNow(), streaming: false };
        return next;
      });
      onSend(msg);
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "agent",
          content: "⚠️ Kon geen verbinding maken met de server.",
          timestamp: timeNow(),
        };
        return next;
      });
      setStatus(null);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Model selector */}
      <div className="relative px-4 py-2.5 border-b border-[#1a1a1a]">
        <button
          onClick={() => setModelOpen((v) => !v)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#1c1c20] text-neutral-300 border border-[#28282c] hover:border-[#38383c] transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          {model.label}
          <ChevronDown className="w-3 h-3 text-neutral-500" />
        </button>

        {modelOpen && (
          <div className="absolute left-4 top-full mt-1 w-64 rounded-xl border border-[#232327] bg-[#131316] shadow-2xl shadow-black/40 py-1.5 z-10 overflow-hidden">
            {MODELS.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setModel(m);
                  setModelOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 hover:bg-[#1a1a1e] transition-colors ${
                  m.id === model.id ? "bg-[#1a1a1e]" : ""
                }`}
              >
                <p className="text-[13px] text-white">{m.label}</p>
                <p className="text-[11px] text-neutral-500">{m.desc}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center mb-4">
              <Sparkles size={18} className="text-[#a3a3a3]" />
            </div>
            <p className="text-[14px] text-[#a3a3a3] mb-4">
              Describe the app you want to build
            </p>
            <div className="flex flex-col gap-2 w-full max-w-[280px]">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setInput(s)}
                  className="text-left px-3 py-2.5 rounded-lg bg-[rgba(250,250,250,0.04)] border border-[#1a1a1a] text-[12px] text-[#a3a3a3] hover:bg-[rgba(250,250,250,0.08)] hover:text-[#fafafa] transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <MessageBubble
            key={i}
            role={msg.role}
            content={msg.content}
            timestamp={msg.timestamp}
            streaming={msg.streaming}
          />
        ))}

        {status && (
          <div className="flex items-center gap-2 text-[12px] text-neutral-500 px-1 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            {status}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="px-4 py-3 border-t border-[#1a1a1a]">
        <div className="flex items-end gap-2 bg-[#1a1a1a] rounded-xl p-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Describe your app..."
            rows={1}
            className="flex-1 bg-transparent text-[13px] text-[#fafafa] placeholder-[#555] resize-none outline-none px-2 py-1.5 max-h-32"
            style={{ minHeight: "24px" }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || sending || isGenerating}
            className="p-2 rounded-lg bg-[#fafafa] text-[#0a0a0a] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#e5e5e5] transition-colors"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
