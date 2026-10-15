import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageBubbleProps {
  role: "user" | "agent";
  content: string;
  timestamp?: string;
  streaming?: boolean;
}

export default function MessageBubble({ role, content, timestamp, streaming }: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} mb-4`}>
      <div
        className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-[#6c5ce7]/20 border border-[#6c5ce7]/30 text-[#f0f0f5]"
            : "bg-[#12121a] border border-[#1e1e2e] text-[#f0f0f5]"
        }`}
      >
        {isUser ? (
          content
        ) : (
          <div className="prose-chat">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content || " "}</ReactMarkdown>
            {streaming && (
              <span className="inline-block w-[7px] h-[14px] bg-[#f0f0f5] ml-0.5 align-middle animate-pulse" />
            )}
          </div>
        )}
      </div>
      {timestamp && !streaming && (
        <span className="text-xs text-[#8b8b9e] mt-1 px-1">{timestamp}</span>
      )}
    </div>
  );
}
