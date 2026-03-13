"use client";

import { useState } from "react";
import { FileDown, ChevronRight, ExternalLink, Loader2, Eye } from "lucide-react";
import type { DocumentData, DocumentSection } from "@/lib/types";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

const typeBadge: Record<DocumentData["type"], { label: string; className: string }> = {
  hardware: { label: "Hardware Offer", className: "bg-[#7B83EB]/20 text-[#7B83EB]" },
  services: { label: "Services Offer", className: "bg-purple-500/20 text-purple-400" },
};

const statusBadge: Record<DocumentData["status"], { label: string; className: string }> = {
  draft: { label: "Draft", className: "bg-amber-500/15 text-amber-400" },
  review: { label: "In Review", className: "bg-blue-500/15 text-blue-400" },
  final: { label: "Final", className: "bg-green-500/15 text-green-400" },
};

function truncate(text: string, lines = 3) {
  const split = text.split("\n");
  if (split.length <= lines) return { text, truncated: false };
  return { text: split.slice(0, lines).join("\n") + "...", truncated: true };
}

function SectionItem({
  section,
  index,
}: {
  section: DocumentSection;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const preview = truncate(section.content);

  return (
    <div className="border-b border-[#3D3D3D] last:border-b-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#333340]/40 transition-colors cursor-pointer text-left"
      >
        <ChevronRight
          className={`w-3.5 h-3.5 text-[#8A8886] shrink-0 transition-transform ${expanded ? "rotate-90" : ""}`}
        />
        <span className="text-[#8A8886] text-xs shrink-0 w-5">
          {index + 1}.
        </span>
        <span className="text-[#D6D6D6] text-xs truncate">{section.title}</span>
      </button>

      {expanded && (
        <div className="px-3 pb-3 pl-10">
          <p className="text-[#D6D6D6] text-xs whitespace-pre-line leading-relaxed">
            {preview.text}
          </p>
          {preview.truncated && !expanded && (
            <button className="text-[#7B83EB] text-[10px] mt-1">
              Show more
            </button>
          )}
          {section.subsections && section.subsections.length > 0 && (
            <div className="mt-2 space-y-2">
              {section.subsections.map((sub) => (
                <div key={sub.title}>
                  <h5 className="text-[#D6D6D6] text-xs font-medium mb-0.5">
                    {sub.title}
                  </h5>
                  <p className="text-[#9E9E9E] text-xs whitespace-pre-line leading-relaxed">
                    {truncate(sub.content).text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function DocumentCard({
  data,
  onViewFull,
}: {
  data: DocumentData;
  onViewFull?: () => void;
}) {
  const [downloading, setDownloading] = useState(false);
  const type = typeBadge[data.type];
  const status = statusBadge[data.status];

  const handlePdfAction = async (action: "download" | "view") => {
    setDownloading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/documents/pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          type: data.type,
          status: data.status,
          sections: data.sections.map((s) => ({
            title: s.title,
            content: s.content,
            subsections: s.subsections,
          })),
        }),
      });

      if (!res.ok) throw new Error("PDF generation failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      if (action === "view") {
        window.open(url, "_blank");
      } else {
        const a = document.createElement("a");
        a.href = url;
        a.download = `${data.title.replace(/\s+/g, "_")}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: generate a text blob if backend is unavailable
      const textContent = data.sections
        .map(
          (s, i) =>
            `${i + 1}. ${s.title}\n${s.content}${
              s.subsections
                ? "\n" +
                  s.subsections
                    .map((sub) => `  ${sub.title}: ${sub.content}`)
                    .join("\n")
                : ""
            }`
        )
        .join("\n\n");
      const blob = new Blob(
        [`${data.title}\n${"=".repeat(50)}\n\n${textContent}`],
        { type: "text/plain" }
      );
      const url = URL.createObjectURL(blob);
      if (action === "view") {
        window.open(url, "_blank");
      } else {
        const a = document.createElement("a");
        a.href = url;
        a.download = `${data.title.replace(/\s+/g, "_")}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="bg-[#2D2D2D] border border-[#3D3D3D] rounded-lg overflow-hidden">
      <div className="bg-[#333340] border-t-[3px] border-t-[#7B83EB] px-4 py-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[#E0E0E0] font-medium text-sm">{data.title}</h3>
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full ${type.className}`}
            >
              {type.label}
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full ${status.className}`}
            >
              {status.label}
            </span>
          </div>
        </div>
      </div>

      <div className="border-b border-[#3D3D3D]">
        {data.sections.map((section, i) => (
          <SectionItem key={section.title} section={section} index={i} />
        ))}
      </div>

      <div className="px-4 py-3 flex items-center justify-between">
        {onViewFull ? (
          <button
            onClick={onViewFull}
            className="text-[#7B83EB] hover:text-[#9BA1F5] text-xs flex items-center gap-1.5 transition-colors"
          >
            View Full Document
            <ExternalLink className="w-3 h-3" />
          </button>
        ) : (
          <span />
        )}
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePdfAction("view");
            }}
            disabled={downloading}
            className="text-[#8A8886] hover:text-[#D6D6D6] text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <Eye className="w-3.5 h-3.5" />
            View PDF
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePdfAction("download");
            }}
            disabled={downloading}
            className="text-[#8A8886] hover:text-[#D6D6D6] text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            {downloading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <FileDown className="w-3.5 h-3.5" />
            )}
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
