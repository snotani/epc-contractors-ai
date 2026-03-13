"use client";

import { useRef, useEffect } from "react";
import { Bot } from "lucide-react";
import type { ChatMessage as ChatMessageType, PanelView } from "@/lib/types";
import ChatMessage from "./ChatMessage";
import ComposeBar from "./ComposeBar";

interface ChatPanelProps {
  projectId: string;
  messages: ChatMessageType[];
  onSendMessage: (content: string) => void;
  onOpenPanel: (view: PanelView) => void;
  isTyping?: boolean;
}

export default function ChatPanel({
  messages,
  onSendMessage,
  onOpenPanel,
  isTyping = false,
}: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#1F1F1F]">
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && !isTyping && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-14 h-14 rounded-full bg-[#2B2B40] flex items-center justify-center mb-4">
              <Bot className="w-7 h-7 text-[#7B83EB]" />
            </div>
            <h3 className="text-white text-base font-semibold mb-1">
              Project Manager AI
            </h3>
            <p className="text-[#8A8886] text-sm max-w-sm">
              Type a message to start the conversation, or click
              <span className="text-[#7B83EB] font-medium"> Start Demo </span>
              to run the full walkthrough.
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} onOpenPanel={onOpenPanel} />
        ))}

        {isTyping && (
          <div className="flex items-center gap-3 animate-fade-in-up">
            <div className="flex items-center gap-1">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
            <span className="text-[13px] text-[#8A8886] italic">
              Project Manager AI is working...
            </span>
          </div>
        )}
      </div>

      <ComposeBar onSendMessage={onSendMessage} disabled={isTyping} />
    </div>
  );
}
