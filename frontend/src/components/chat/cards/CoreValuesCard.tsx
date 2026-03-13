"use client";

import { AlertTriangle } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import type { CoreValuesData } from "@/lib/types";

const confidenceColor: Record<string, string> = {
  high: "bg-green-500",
  medium: "bg-amber-500",
  low: "bg-red-500",
};

export function CoreValuesCard({ data }: { data: CoreValuesData }) {
  const sources = Array.from(
    new Set(
      data.values.map(
        (v) =>
          `${v.source.document}${v.source.sheet ? ` (${v.source.sheet} sheet)` : ""}${v.source.location ? `, ${v.source.location}` : ""}`
      )
    )
  );

  return (
    <div className="bg-[#2D2D2D] border border-[#3D3D3D] rounded-lg overflow-hidden">
      <div className="bg-[#333340] border-t-[3px] border-t-[#7B83EB] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-[#E0E0E0] font-medium text-sm">
            Core Values Extracted
          </h3>
          <span className="text-xs text-[#8A8886] bg-[#252525] px-2 py-0.5 rounded-full">
            {data.values.length} parameters
          </span>
        </div>
        <div className="flex items-center gap-3">
          {data.warningCount > 0 && (
            <span className="flex items-center gap-1 text-xs text-amber-400">
              <AlertTriangle className="w-3 h-3" />
              {data.warningCount} warning{data.warningCount !== 1 && "s"}
            </span>
          )}
          {data.missingCount > 0 && (
            <span className="flex items-center gap-1 text-xs text-red-400">
              <AlertTriangle className="w-3 h-3" />
              {data.missingCount} missing
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
          {data.values.map((val) => (
            <div
              key={val.key}
              className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-[#333340]/40 transition-colors"
            >
              <span className="text-[#8A8886] text-xs truncate mr-2">
                {val.label}
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-white text-sm font-medium">
                  {val.value}
                </span>
                {val.unit && (
                  <span className="text-[#8A8886] text-xs">{val.unit}</span>
                )}
                <span
                  className={`w-1.5 h-1.5 rounded-full ${confidenceColor[val.confidence]}`}
                  title={`${val.confidence} confidence`}
                />
                {val.warning && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="cursor-help">
                        <AlertTriangle className="w-3 h-3 text-amber-400" />
                      </TooltipTrigger>
                      <TooltipContent>{val.warning}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          ))}
        </div>

        {sources.length > 0 && (
          <p className="text-[#8A8886] text-xs mt-4 pt-3 border-t border-[#3D3D3D]">
            Sources: {sources.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}
