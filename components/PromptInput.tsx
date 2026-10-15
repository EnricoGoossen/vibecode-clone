"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";

interface PromptInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export default function PromptInput({ onSend, disabled }: PromptInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 120) + "px";
    }
  }, [value]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-[#1e1e2e] p-4">
      <div className="flex items-end gap-3">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe the app you want to build..."
          rows={1}
          disabled={disabled}
          className="flex-1 bg-[#12121a] border border-[#1e1e2e] rounded-xl px-4 py-3 text-sm text-[#f0f0f5] placeholder-[#8b8b9e] resize-none focus:outline-none focus:border-[#6c5ce7]/50 transition-colors disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-r from-[#6c5ce7] to-[#a855f7] flex items-center justify-center text-white transition-all duration-200 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowUp size={18} />
        </button>
      </div>
      <p className="text-xs text-[#8b8b9e] mt-2 text-center">Powered by Claude</p>
    </div>
  );
}
