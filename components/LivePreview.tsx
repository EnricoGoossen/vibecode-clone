"use client";

import { Monitor, Smartphone, ExternalLink, Code2 } from "lucide-react";

interface GeneratedApp {
  html: string;
  css: string;
  js: string;
  title: string;
}

interface LivePreviewProps {
  app: GeneratedApp | null;
  deviceMode: "desktop" | "mobile";
  isGenerating: boolean;
}

export default function LivePreview({ app, deviceMode, isGenerating }: LivePreviewProps) {
  const srcDoc = app
    ? `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${app.css}</style></head><body>${app.html}<script>${app.js}<\/script></body></html>`
    : "";

  return (
    <div className="h-full flex flex-col items-center justify-center p-6">
      {isGenerating ? (
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#262626] border-t-[#fafafa] rounded-full animate-spin" />
          <p className="text-[13px] text-[#a3a3a3]">Building your app...</p>
        </div>
      ) : app ? (
        <div className={`h-full flex items-center justify-center ${deviceMode === "mobile" ? "w-full max-w-[375px]" : "w-full max-w-[1024px]"}`}>
          <div
            className={`h-full rounded-xl overflow-hidden border ${
              deviceMode === "mobile"
                ? "border-[#262626] w-[340px] h-[680px] rounded-[2rem] p-2"
                : "border-[#1a1a1a] w-full"
            }`}
          >
            {deviceMode === "mobile" && (
              <div className="mx-auto w-20 h-1 bg-[#262626] rounded-full mb-2" />
            )}
            <iframe
              srcDoc={srcDoc}
              className="w-full h-full bg-[#0a0a0a] rounded-lg"
              title="App preview"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#1a1a1a] flex items-center justify-center">
            {deviceMode === "mobile" ? (
              <Smartphone size={24} className="text-[#555]" />
            ) : (
              <Monitor size={24} className="text-[#555]" />
            )}
          </div>
          <div>
            <p className="text-[14px] text-[#a3a3a3]">Your app will appear here</p>
            <p className="text-[12px] text-[#555] mt-1">
              Describe what you want to build in the chat panel
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
