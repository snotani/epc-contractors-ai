"use client";

import type { VersionEntry } from "@/lib/types";

function formatTimestamp(ts: string) {
  const d = new Date(ts);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }) +
    " · " +
    d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
}

export default function VersionHistoryPanel({
  entries,
}: {
  entries: VersionEntry[];
}) {
  const sorted = [...entries].sort((a, b) => b.version - a.version);

  return (
    <div className="space-y-1">
      <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#8A8886]">
        Version History
      </h4>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[13px] top-3 bottom-3 w-0.5 bg-[#3D3D3D]" />

        <div className="space-y-5">
          {sorted.map((entry, i) => (
            <div key={entry.id} className="relative flex gap-3">
              {/* Version dot */}
              <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7B83EB] text-[10px] font-bold text-white">
                v{entry.version}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-xs text-[#8A8886]">
                  {formatTimestamp(entry.timestamp)}
                </p>
                <p className="mt-0.5 text-sm font-medium text-white">
                  {entry.action}
                </p>
                <p className="mt-0.5 text-sm text-[#8A8886]">
                  {entry.description}
                </p>

                {entry.changes && entry.changes.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {entry.changes.map((change, ci) => (
                      <li
                        key={ci}
                        className="flex items-start gap-2 text-xs text-[#D6D6D6]"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#7B83EB]" />
                        {change}
                      </li>
                    ))}
                  </ul>
                )}

                {i < sorted.length - 1 && (
                  <div className="mt-4 border-b border-[#3D3D3D]/40" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
