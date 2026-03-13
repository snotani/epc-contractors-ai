"use client";

import { AlertTriangle, FileText, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import type { CoreValuesData, CoreValue } from "@/lib/types";

const confidenceColor: Record<CoreValue["confidence"], string> = {
  high: "bg-emerald-400",
  medium: "bg-amber-400",
  low: "bg-red-400",
};

export default function CoreValuesPanel({ data }: { data: CoreValuesData }) {
  const lowConfidenceValues = data.values.filter(
    (v) => v.confidence === "low",
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <h4 className="text-sm font-semibold text-white">Core Values</h4>
        <span className="rounded-full bg-[#7B83EB]/20 px-2 py-0.5 text-xs font-medium text-[#7B83EB]">
          {data.values.length}
        </span>
        {data.warningCount > 0 && (
          <span className="flex items-center gap-1 rounded-full bg-[#FFA726]/15 px-2 py-0.5 text-xs font-medium text-[#FFA726]">
            <AlertTriangle size={11} />
            {data.warningCount} warning{data.warningCount > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Values list */}
      <div className="space-y-3">
        {data.values.map((v) => (
          <div key={v.key} className="space-y-1">
            {/* Label row */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-[#8A8886]">{v.label}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-[#8A8886] transition-colors hover:text-[#D6D6D6]">
                    <FileText size={11} />
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="max-w-[260px] rounded-md bg-[#1E1E1E] px-3 py-2 text-xs text-[#D6D6D6] shadow-lg"
                  >
                    <p className="font-medium text-white">
                      {v.source.document}
                    </p>
                    <p className="mt-0.5 text-[#8A8886]">
                      {v.source.location}
                      {v.source.cell && ` · Cell ${v.source.cell}`}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Input row */}
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={v.value}
                className="min-w-0 flex-1 rounded border border-[#3D3D3D] bg-[#2D2D2D] px-3 py-1.5 text-sm text-white outline-none focus:border-[#7B83EB]"
              />
              {v.unit && (
                <span className="shrink-0 text-xs text-[#8A8886]">
                  {v.unit}
                </span>
              )}
              <span
                className={`h-2.5 w-2.5 shrink-0 rounded-full ${confidenceColor[v.confidence]}`}
                title={`${v.confidence} confidence`}
              />
            </div>

            {/* Warning */}
            {v.warning && (
              <div className="flex items-start gap-1.5 pt-0.5">
                <AlertTriangle
                  size={12}
                  className="mt-0.5 shrink-0 text-[#FFA726]"
                />
                <span className="text-xs text-[#FFA726]">{v.warning}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Missing values section */}
      {lowConfidenceValues.length > 0 && (
        <div className="rounded-lg border border-[#3D3D3D] bg-[#2D2D2D] p-3">
          <div className="flex items-center gap-2">
            <HelpCircle size={14} className="text-red-400" />
            <span className="text-xs font-medium text-white">
              Missing / Low Confidence Values
            </span>
          </div>
          <ul className="mt-2 space-y-1.5">
            {lowConfidenceValues.map((v) => (
              <li key={v.key} className="flex items-start gap-2 text-xs">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-red-400" />
                <span className="text-[#D6D6D6]">
                  <span className="font-medium text-white">{v.label}</span>
                  {v.warning && ` — ${v.warning}`}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs italic text-[#8A8886]">
            Consider requesting clarification from the client for these values.
          </p>
        </div>
      )}
    </div>
  );
}
