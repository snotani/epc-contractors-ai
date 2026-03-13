"use client";

import { Check, AlertTriangle } from "lucide-react";
import type { SimilarityData, SimilarProject } from "@/lib/types";

function matchColor(pct: number) {
  if (pct >= 85) return "#4CAF50";
  if (pct >= 65) return "#FFA726";
  return "#EF5350";
}

function MatchRing({ percentage }: { percentage: number }) {
  const r = 18;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percentage / 100) * circumference;
  const color = matchColor(percentage);

  return (
    <div className="relative w-12 h-12 shrink-0">
      <svg viewBox="0 0 44 44" className="w-full h-full -rotate-90">
        <circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          stroke="#3D3D3D"
          strokeWidth="3"
        />
        <circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-xs font-bold"
        style={{ color }}
      >
        {percentage}%
      </span>
    </div>
  );
}

function ProjectRow({ project }: { project: SimilarProject }) {
  return (
    <div className="flex gap-3 py-3 border-b border-[#3D3D3D] last:border-b-0">
      <MatchRing percentage={project.matchPercentage} />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-white font-medium text-sm truncate">
            {project.name}
          </span>
          <span className="text-[#8A8886] text-xs shrink-0">
            {project.client}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          {project.matchingFeatures.map((f) => (
            <span
              key={f}
              className="inline-flex items-center gap-1 text-[10px] bg-green-500/15 text-green-400 px-1.5 py-0.5 rounded"
            >
              <Check className="w-2.5 h-2.5" />
              {f}
            </span>
          ))}
          {project.differences.map((d) => (
            <span
              key={d}
              className="inline-flex items-center gap-1 text-[10px] bg-amber-500/15 text-amber-400 px-1.5 py-0.5 rounded"
            >
              <AlertTriangle className="w-2.5 h-2.5" />
              {d}
            </span>
          ))}
        </div>
        {project.recommendation && (
          <p className="text-[#9E9E9E] text-xs italic mt-1.5">
            {project.recommendation}
          </p>
        )}
      </div>
    </div>
  );
}

export function SimilarityCard({ data }: { data: SimilarityData }) {
  return (
    <div className="bg-[#2D2D2D] border border-[#3D3D3D] rounded-lg overflow-hidden">
      <div className="bg-[#333340] border-t-[3px] border-t-[#7B83EB] px-4 py-3">
        <h3 className="text-[#E0E0E0] font-medium text-sm">
          Similar Projects Found
        </h3>
      </div>
      <div className="p-4 space-y-0">
        {data.projects.map((p) => (
          <ProjectRow key={p.name} project={p} />
        ))}
      </div>
      {data.decision && (
        <div className="mx-4 mb-4 bg-[#252525] border-l-2 border-l-[#7B83EB] px-3 py-2 rounded-r">
          <p className="text-[#D6D6D6] text-xs">{data.decision}</p>
        </div>
      )}
    </div>
  );
}
