interface MessageBubbleProps {
  role: "user" | "agent";
  content: string;
  timestamp?: string;
}

export default function MessageBubble({ role, content, timestamp }: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} mb-4`}>
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-[#6c5ce7]/20 border border-[#6c5ce7]/30 text-[#f0f0f5]"
            : "bg-[#12121a] border border-[#1e1e2e] text-[#f0f0f5]"
        }`}
      >
        {content}
      </div>
      {timestamp && (
        <span className="text-xs text-[#8b8b9e] mt-1 px-1">{timestamp}</span>
      )}
    </div>
  );
}
