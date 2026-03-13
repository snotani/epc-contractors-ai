"use client";

import { useState, useEffect } from "react";
import { Brain, ChevronDown, ChevronRight, Check } from "lucide-react";

interface ReasoningTraceProps {
  lines: string[];
  summary?: string;
  isStreaming?: boolean;
}

export default function ReasoningTrace({
  lines,
  summary,
  isStreaming = false,
}: ReasoningTraceProps) {
  const [expanded, setExpanded] = useState(true);
  const [visibleCount, setVisibleCount] = useState(isStreaming ? 0 : lines.length);
  const [streamComplete, setStreamComplete] = useState(!isStreaming);

  useEffect(() => {
    if (!isStreaming) {
      setVisibleCount(lines.length);
      setStreamComplete(true);
      return;
    }

    setVisibleCount(0);
    setStreamComplete(false);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      setVisibleCount(current);
      if (current >= lines.length) {
        clearInterval(interval);
        setStreamComplete(true);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [lines, isStreaming]);

  useEffect(() => {
    if (isStreaming && streamComplete) {
      const timer = setTimeout(() => setExpanded(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isStreaming, streamComplete]);

  return (
    <div className="bg-[#252525] rounded-lg p-3 border-l-2 border-[#7B83EB]">
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="flex items-center gap-2 w-full text-left"
      >
        {expanded ? (
          <ChevronDown className="w-3.5 h-3.5 text-[#7B83EB] shrink-0" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-[#7B83EB] shrink-0" />
        )}
        <Brain className="w-4 h-4 text-[#7B83EB] shrink-0" />
        <span className="text-[13px] text-[#9E9E9E] italic">Thinking...</span>
        {streamComplete && (
          <Check className="w-3.5 h-3.5 text-[#4CAF50] ml-auto shrink-0" />
        )}
      </button>

      {expanded ? (
        <div className="mt-2 space-y-1 pl-[22px]">
          {lines.slice(0, visibleCount).map((line, idx) => (
            <p
              key={idx}
              className="text-[13px] text-[#9E9E9E] italic animate-fade-in-up"
            >
              {">"} {line}
            </p>
          ))}
        </div>
      ) : (
        <p className="mt-1.5 pl-[22px] text-[13px] text-[#9E9E9E] italic truncate">
          {summary || "Click to expand"}
        </p>
      )}
    </div>
  );
}
