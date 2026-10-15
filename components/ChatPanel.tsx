"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import MessageBubble from "./MessageBubble";
import AgentSteps from "./AgentSteps";

interface Message {
  role: "user" | "agent";
  content: string;
  timestamp?: string;
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

export default function ChatPanel({ onSend, isGenerating, hasApp }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [steps, setSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, steps]);

  const handleSend = () => {
    if (!input.trim() || isGenerating) return;
    const msg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: msg, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);

    // Simulate agent steps
    const agentSteps = [
      "Analyzing your request...",
      "Designing the layout...",
      "Writing the code...",
      "Adding interactivity...",
      "Finalizing...",
    ];
    setSteps(agentSteps);
    setCurrentStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCurrentStep(step);
      if (step >= agentSteps.length) {
        clearInterval(interval);
        setMessages((prev) => [...prev, { role: "agent", content: "Done! Your app is ready in the preview.", timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
        setSteps([]);
        setCurrentStep(0);
        onSend(msg);
      }
    }, 600);
  };

  return (
    <div className="flex flex-col h-full">
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
                  onClick={() => {
                    setInput(s);
                  }}
                  className="text-left px-3 py-2.5 rounded-lg bg-[rgba(250,250,250,0.04)] border border-[#1a1a1a] text-[12px] text-[#a3a3a3] hover:bg-[rgba(250,250,250,0.08)] hover:text-[#fafafa] transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} content={msg.content} timestamp={msg.timestamp} />
        ))}

        {steps.length > 0 && (
          <AgentSteps steps={steps} currentStep={currentStep} isComplete={currentStep >= steps.length} />
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
            disabled={!input.trim() || isGenerating}
            className="p-2 rounded-lg bg-[#fafafa] text-[#0a0a0a] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#e5e5e5] transition-colors"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
