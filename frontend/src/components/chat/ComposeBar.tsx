"use client";

import { useState, useRef, useCallback, type KeyboardEvent } from "react";
import { Paperclip, Send } from "lucide-react";

interface ComposeBarProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function ComposeBar({
  onSendMessage,
  disabled = false,
  placeholder = "Type a message...",
}: ComposeBarProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const maxHeight = 4 * 24; // ~4 rows
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
  }, []);

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSendMessage(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [value, disabled, onSendMessage]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div className="border-t border-[#404040] bg-[#2D2D2D] px-4 py-3">
      <div className="flex items-end gap-2 rounded-lg bg-[#252525] px-3 py-2">
        <button
          type="button"
          className="shrink-0 p-1 text-[#8A8886] hover:text-white transition-colors"
          aria-label="Attach file"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            adjustHeight();
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="flex-1 resize-none bg-transparent text-white placeholder:text-[#8A8886] text-sm leading-6 outline-none disabled:opacity-50"
        />

        <button
          type="button"
          onClick={handleSend}
          disabled={!canSend}
          className={`shrink-0 rounded-md p-1.5 transition-colors ${
            canSend
              ? "bg-[#7B83EB] text-white hover:bg-[#6264A7]"
              : "bg-[#3D3D3D] text-[#6B6B6B]"
          }`}
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
