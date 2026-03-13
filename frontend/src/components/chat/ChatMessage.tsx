"use client";

import { Bot, Cog } from "lucide-react";
import type {
  ChatMessage as ChatMessageType,
  CardType,
  PanelView,
  CoreValuesData,
  SimilarityData,
  SizingData,
  CostingData,
  DocumentData,
  PidData,
} from "@/lib/types";
import ReasoningTrace from "./ReasoningTrace";
import { CoreValuesCard } from "./cards/CoreValuesCard";
import { SimilarityCard } from "./cards/SimilarityCard";
import { SizingCard } from "./cards/SizingCard";
import { CostingCard } from "./cards/CostingCard";
import { DocumentCard } from "./cards/DocumentCard";
import { PidCard } from "./cards/PidCard";

interface ChatMessageProps {
  message: ChatMessageType;
  onOpenPanel?: (view: PanelView) => void;
}

const CARD_TITLES: Record<CardType, string> = {
  core_values: "Core Process Values",
  similarity: "Similar Projects",
  sizing: "Equipment Sizing",
  costing: "Cost Estimate",
  document: "Document Draft",
  pid: "P&ID — Process & Instrumentation",
};

function formatContent(content: string) {
  const lines = content.split("\n");
  return lines.map((line, lineIdx) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    const formatted = parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
    return (
      <span key={lineIdx}>
        {lineIdx > 0 && <br />}
        {formatted}
      </span>
    );
  });
}

function formatTimestamp(ts: string) {
  try {
    return new Date(ts).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return ts;
  }
}

export default function ChatMessage({ message, onOpenPanel }: ChatMessageProps) {
  const { type } = message;

  if (type === "user") {
    return (
      <div className="flex justify-end animate-fade-in-up">
        <div className="max-w-[70%]">
          <div className="bg-[#3D3D3D] text-white rounded-lg px-4 py-2.5 text-sm">
            {message.content}
          </div>
          <p className="text-[11px] text-[#8A8886] mt-1 text-right">
            {formatTimestamp(message.timestamp)}
          </p>
        </div>
      </div>
    );
  }

  if (type === "ai") {
    return (
      <div className="flex items-start gap-2.5 animate-fade-in-up">
        <div className="shrink-0 w-7 h-7 rounded-full bg-[#7B83EB] flex items-center justify-center mt-0.5">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div className="max-w-[70%]">
          <div className="bg-[#2B2B40] text-[#E8E8E8] rounded-lg px-4 py-2.5 text-sm leading-relaxed">
            {formatContent(message.content)}
          </div>
          {message.sources && message.sources.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {message.sources.map((src, i) => (
                <span
                  key={i}
                  className="inline-flex items-center text-[11px] bg-[#333340] text-[#9E9E9E] rounded px-1.5 py-0.5"
                >
                  {src.document}
                  {src.page != null && ` p.${src.page}`}
                  {src.sheet && ` · ${src.sheet}`}
                  {src.cell && `:${src.cell}`}
                </span>
              ))}
            </div>
          )}
          <p className="text-[11px] text-[#8A8886] mt-1">
            {formatTimestamp(message.timestamp)}
          </p>
        </div>
      </div>
    );
  }

  if (type === "reasoning") {
    return (
      <div className="flex items-start gap-2.5 animate-fade-in-up pl-9">
        <div className="max-w-[80%] w-full">
          <ReasoningTrace
            lines={message.reasoningLines ?? []}
            summary={message.reasoningSummary}
            isStreaming={message.isStreaming}
          />
        </div>
      </div>
    );
  }

  if (type === "action") {
    return (
      <div className="animate-fade-in-up">
        <div className="flex items-center gap-2 bg-[#2D3748] rounded-md px-3 py-2">
          <Cog className="w-4 h-4 text-[#7B83EB] animate-pulse shrink-0" />
          <span className="text-[13px] text-[#C8C8C8]">
            {message.content}
          </span>
        </div>
      </div>
    );
  }

  if (type === "card" && message.cardType) {
    const getPanelView = (): PanelView => {
      switch (message.cardType) {
        case "core_values": return "core_values";
        case "sizing": return "sizing";
        case "costing": return "costing";
        case "pid": return "pid";
        case "document": {
          const docData = message.cardData as DocumentData | undefined;
          return docData?.type === "services" ? "document_services" : "document_hardware";
        }
        default: return null;
      }
    };

    const panelView = getPanelView();
    const openPanel = () => { if (panelView) onOpenPanel?.(panelView); };

    const renderCardContent = () => {
      if (!message.cardData) return null;
      switch (message.cardType) {
        case "core_values":
          return <CoreValuesCard data={message.cardData as CoreValuesData} />;
        case "similarity":
          return <SimilarityCard data={message.cardData as SimilarityData} />;
        case "sizing":
          return <SizingCard data={message.cardData as SizingData} />;
        case "costing":
          return <CostingCard data={message.cardData as CostingData} />;
        case "pid":
          return <PidCard data={message.cardData as PidData} />;
        case "document":
          return (
            <DocumentCard
              data={message.cardData as DocumentData}
              onViewFull={openPanel}
            />
          );
        default:
          return null;
      }
    };

    const cardContent = renderCardContent();

    if (cardContent) {
      return (
        <div className="animate-fade-in-up max-w-[90%]">
          {message.cardType === "document" ? (
            cardContent
          ) : (
            <div
              className="cursor-pointer"
              onClick={openPanel}
            >
              {cardContent}
            </div>
          )}
        </div>
      );
    }

    const title = CARD_TITLES[message.cardType] ?? "Details";
    return (
      <div className="animate-fade-in-up">
        <div
          className="bg-[#2D2D2D] border border-[#3D3D3D] rounded-lg overflow-hidden cursor-pointer hover:border-[#7B83EB]/50 transition-colors"
          onClick={openPanel}
        >
          <div className="bg-[#333340] border-t-[3px] border-t-[#7B83EB] px-4 py-2.5">
            <h3 className="text-sm font-semibold text-white">{title}</h3>
          </div>
          <div className="px-4 py-3">
            <p className="text-[13px] text-[#D6D6D6] leading-relaxed">
              {message.content}
            </p>
            <span className="inline-block mt-2 text-[13px] text-[#7B83EB] font-medium">
              View Details →
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
