"use client";

import { useState } from "react";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import type { SizingData, SizingCheck } from "@/lib/types";

const TABS = ["Summary", "Streams", "Equipment", "Checks"] as const;
type Tab = (typeof TABS)[number];

const statusIcon: Record<SizingCheck["status"], React.ReactNode> = {
  pass: <CheckCircle className="w-4 h-4 text-green-500" />,
  fail: <XCircle className="w-4 h-4 text-red-500" />,
  warning: <AlertTriangle className="w-4 h-4 text-amber-500" />,
};

const statusBadge: Record<SizingCheck["status"], string> = {
  pass: "bg-green-500/15 text-green-400",
  fail: "bg-red-500/15 text-red-400",
  warning: "bg-amber-500/15 text-amber-400",
};

export function SizingCard({
  data,
  activeTab: initialTab,
}: {
  data: SizingData;
  activeTab?: string;
}) {
  const [tab, setTab] = useState<Tab>(
    TABS.includes(initialTab as Tab) ? (initialTab as Tab) : "Summary"
  );

  return (
    <div className="bg-[#2D2D2D] border border-[#3D3D3D] rounded-lg overflow-hidden">
      <div className="bg-[#333340] border-t-[3px] border-t-[#7B83EB] px-4 py-3">
        <h3 className="text-[#E0E0E0] font-medium text-sm">
          Process Sizing Results
        </h3>
      </div>

      {/* Tab bar */}
      <div className="flex bg-[#252525] border-b border-[#3D3D3D]">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-xs font-medium transition-colors relative ${
              tab === t ? "text-white" : "text-[#8A8886] hover:text-[#D6D6D6]"
            }`}
          >
            {t}
            {tab === t && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#7B83EB]" />
            )}
          </button>
        ))}
      </div>

      <div className="p-4">
        {tab === "Summary" && <SummaryTab data={data} />}
        {tab === "Streams" && <StreamsTab data={data} />}
        {tab === "Equipment" && <EquipmentTab data={data} />}
        {tab === "Checks" && <ChecksTab data={data} />}
      </div>
    </div>
  );
}

function SummaryTab({ data }: { data: SizingData }) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <h4 className="text-[#8A8886] text-xs font-medium uppercase tracking-wider mb-2">
          Inputs
        </h4>
        <div className="space-y-1.5">
          {data.inputs.map((p) => (
            <div key={p.name} className="flex justify-between items-baseline">
              <span className="text-[#8A8886] text-xs">{p.name}</span>
              <span className="text-white text-sm font-medium">
                {p.value}{" "}
                <span className="text-[#8A8886] text-xs font-normal">
                  {p.unit}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-[#8A8886] text-xs font-medium uppercase tracking-wider mb-2">
          Outputs
        </h4>
        <div className="space-y-1.5">
          {data.outputs.map((p) => (
            <div key={p.name} className="flex justify-between items-baseline">
              <span className="text-[#8A8886] text-xs">{p.name}</span>
              <span className="text-white text-sm font-medium">
                {p.value}{" "}
                <span className="text-[#8A8886] text-xs font-normal">
                  {p.unit}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StreamsTab({ data }: { data: SizingData }) {
  const headers = [
    "#",
    "Name",
    "T (°C)",
    "P (barg)",
    "MW",
    "Flow",
    "H₂%",
    "O₂ (ppm)",
    "H₂O (ppm)",
  ];

  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#333340]">
            {headers.map((h) => (
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
          {data.streams.map((s, i) => (
            <tr
              key={s.id}
              className={i % 2 === 0 ? "bg-[#252525]" : "bg-[#2D2D2D]"}
            >
              <td className="text-[#D6D6D6] px-2 py-1.5 border border-[#3D3D3D]">
                {s.id}
              </td>
              <td className="text-[#D6D6D6] px-2 py-1.5 border border-[#3D3D3D] whitespace-nowrap">
                {s.name}
              </td>
              <td className="text-[#D6D6D6] px-2 py-1.5 border border-[#3D3D3D] text-right">
                {s.temperature}
              </td>
              <td className="text-[#D6D6D6] px-2 py-1.5 border border-[#3D3D3D] text-right">
                {s.pressure}
              </td>
              <td className="text-[#D6D6D6] px-2 py-1.5 border border-[#3D3D3D] text-right">
                {s.molecularWeight}
              </td>
              <td className="text-[#D6D6D6] px-2 py-1.5 border border-[#3D3D3D] text-right">
                {s.flowRate}
              </td>
              <td className="text-[#D6D6D6] px-2 py-1.5 border border-[#3D3D3D] text-right">
                {s.h2Pct}
              </td>
              <td className="text-[#D6D6D6] px-2 py-1.5 border border-[#3D3D3D] text-right">
                {s.o2Ppm}
              </td>
              <td className="text-[#D6D6D6] px-2 py-1.5 border border-[#3D3D3D] text-right">
                {s.h2oPpm}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EquipmentTab({ data }: { data: SizingData }) {
  return (
    <div className="grid grid-cols-1 gap-2">
      {data.equipment.map((eq) => (
        <div
          key={eq.name}
          className="bg-[#252525] border border-[#3D3D3D] rounded px-3 py-2"
        >
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-white font-medium text-sm">{eq.name}</span>
            <span className="text-[#8A8886] text-xs">{eq.type}</span>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs">
            <span className="text-[#8A8886]">
              Dimensions:{" "}
              <span className="text-[#D6D6D6]">{eq.dimensions}</span>
            </span>
            <span className="text-[#8A8886]">
              Material: <span className="text-[#D6D6D6]">{eq.material}</span>
            </span>
            <span className="text-[#8A8886]">
              Design P:{" "}
              <span className="text-[#D6D6D6]">{eq.designPressure}</span>
            </span>
            <span className="text-[#8A8886]">
              Design T:{" "}
              <span className="text-[#D6D6D6]">{eq.designTemperature}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ChecksTab({ data }: { data: SizingData }) {
  return (
    <div className="space-y-1.5">
      {data.checks.map((c) => (
        <div
          key={c.parameter}
          className="flex items-center gap-3 bg-[#252525] border border-[#3D3D3D] rounded px-3 py-2"
        >
          {statusIcon[c.status]}
          <div className="flex-1 min-w-0">
            <span className="text-[#D6D6D6] text-xs font-medium">
              {c.parameter}
            </span>
            <div className="flex gap-4 text-[10px] text-[#8A8886]">
              <span>
                Req: <span className="text-[#D6D6D6]">{c.requirement}</span>
              </span>
              <span>
                Act: <span className="text-[#D6D6D6]">{c.actual}</span>
              </span>
            </div>
          </div>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full ${statusBadge[c.status]}`}
          >
            {c.status}
          </span>
        </div>
      ))}
    </div>
  );
}
