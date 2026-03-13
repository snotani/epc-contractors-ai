"use client";

import { useState } from "react";
import type { PidData } from "@/lib/types";

const TABS = ["Overview", "Equipment", "Instruments", "Lines"] as const;
type Tab = (typeof TABS)[number];

export function PidCard({ data }: { data: PidData }) {
  const [tab, setTab] = useState<Tab>("Overview");

  return (
    <div className="bg-[#2D2D2D] border border-[#3D3D3D] rounded-lg overflow-hidden">
      <div className="bg-[#333340] border-t-[3px] border-t-[#6264A7] px-4 py-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[#E0E0E0] font-medium text-sm">
            P&ID — Preliminary
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-[#6264A7]/20 text-[#9B9DF2] px-2 py-0.5 rounded-full font-medium">
              {data.drawingNumber}
            </span>
            <span className="text-[10px] bg-amber-500/15 text-amber-400 px-2 py-0.5 rounded-full">
              {data.revision}
            </span>
          </div>
        </div>
      </div>

      <div className="flex bg-[#252525] border-b border-[#3D3D3D]">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={(e) => {
              e.stopPropagation();
              setTab(t);
            }}
            className={`px-4 py-2 text-xs font-medium transition-colors relative ${
              tab === t
                ? "text-white"
                : "text-[#8A8886] hover:text-[#D6D6D6]"
            }`}
          >
            {t}
            {tab === t && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#6264A7]" />
            )}
          </button>
        ))}
      </div>

      <div className="p-4 max-h-[320px] overflow-y-auto scrollbar-thin">
        {tab === "Overview" && <OverviewTab data={data} />}
        {tab === "Equipment" && <EquipmentTab data={data} />}
        {tab === "Instruments" && <InstrumentsTab data={data} />}
        {tab === "Lines" && <LinesTab data={data} />}
      </div>
    </div>
  );
}

function OverviewTab({ data }: { data: PidData }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#252525] rounded-lg p-3 text-center">
          <p className="text-xl font-bold text-[#6264A7]">{data.equipment.length}</p>
          <p className="text-[10px] text-[#8A8886] uppercase tracking-wider mt-0.5">
            Equipment
          </p>
        </div>
        <div className="bg-[#252525] rounded-lg p-3 text-center">
          <p className="text-xl font-bold text-[#6264A7]">{data.instruments.length}</p>
          <p className="text-[10px] text-[#8A8886] uppercase tracking-wider mt-0.5">
            Instruments
          </p>
        </div>
        <div className="bg-[#252525] rounded-lg p-3 text-center">
          <p className="text-xl font-bold text-[#6264A7]">{data.lines.length}</p>
          <p className="text-[10px] text-[#8A8886] uppercase tracking-wider mt-0.5">
            Process Lines
          </p>
        </div>
      </div>
      <div>
        <h4 className="text-[#8A8886] text-xs font-medium uppercase tracking-wider mb-1.5">
          Process Flow
        </h4>
        <p className="text-[#D6D6D6] text-xs leading-relaxed whitespace-pre-line">
          {data.processDescription.split("\n\n")[0]}
        </p>
      </div>
    </div>
  );
}

function EquipmentTab({ data }: { data: PidData }) {
  return (
    <div className="space-y-1.5">
      {data.equipment.map((eq) => (
        <div
          key={eq.tag}
          className="bg-[#252525] border border-[#3D3D3D] rounded px-3 py-2"
        >
          <div className="flex items-baseline gap-2 mb-0.5">
            <span className="text-[#6264A7] font-mono text-xs font-bold">
              {eq.tag}
            </span>
            <span className="text-white text-sm font-medium">{eq.name}</span>
          </div>
          <div className="flex flex-wrap gap-x-4 text-[11px] text-[#8A8886]">
            <span>{eq.type}</span>
            <span>{eq.size}</span>
            <span>{eq.designConditions}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function InstrumentsTab({ data }: { data: PidData }) {
  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#333340]">
            {["Tag", "Type", "Service", "Range"].map((h) => (
              <th
                key={h}
                className="text-[#8A8886] font-medium text-left px-2 py-1.5 border border-[#3D3D3D] whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.instruments.map((inst, i) => (
            <tr
              key={inst.tag}
              className={i % 2 === 0 ? "bg-[#252525]" : "bg-[#2D2D2D]"}
            >
              <td className="text-[#6264A7] font-mono font-bold px-2 py-1.5 border border-[#3D3D3D]">
                {inst.tag}
              </td>
              <td className="text-[#D6D6D6] px-2 py-1.5 border border-[#3D3D3D] whitespace-nowrap">
                {inst.type}
              </td>
              <td className="text-[#D6D6D6] px-2 py-1.5 border border-[#3D3D3D]">
                {inst.service}
              </td>
              <td className="text-[#D6D6D6] px-2 py-1.5 border border-[#3D3D3D] whitespace-nowrap">
                {inst.range}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LinesTab({ data }: { data: PidData }) {
  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#333340]">
            {["Line", "From", "To", "Size", "Spec"].map((h) => (
              <th
                key={h}
                className="text-[#8A8886] font-medium text-left px-2 py-1.5 border border-[#3D3D3D] whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.lines.map((ln, i) => (
            <tr
              key={ln.tag}
              className={i % 2 === 0 ? "bg-[#252525]" : "bg-[#2D2D2D]"}
            >
              <td className="text-[#6264A7] font-mono font-bold px-2 py-1.5 border border-[#3D3D3D]">
                {ln.tag}
              </td>
              <td className="text-[#D6D6D6] px-2 py-1.5 border border-[#3D3D3D] whitespace-nowrap">
                {ln.from}
              </td>
              <td className="text-[#D6D6D6] px-2 py-1.5 border border-[#3D3D3D] whitespace-nowrap">
                {ln.to}
              </td>
              <td className="text-[#D6D6D6] px-2 py-1.5 border border-[#3D3D3D] whitespace-nowrap">
                {ln.size}
              </td>
              <td className="text-[#D6D6D6] px-2 py-1.5 border border-[#3D3D3D] whitespace-nowrap">
                {ln.spec}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
