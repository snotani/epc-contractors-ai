"use client";

import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import type { SizingData, SizingCheck } from "@/lib/types";

const statusIcon: Record<SizingCheck["status"], React.ReactNode> = {
  pass: <CheckCircle2 size={14} className="text-emerald-400" />,
  fail: <XCircle size={14} className="text-red-400" />,
  warning: <AlertTriangle size={14} className="text-amber-400" />,
};

const statusRowBg: Record<SizingCheck["status"], string> = {
  pass: "bg-emerald-400/5",
  fail: "bg-red-400/10",
  warning: "bg-amber-400/10",
};

export default function SizingPanel({ data }: { data: SizingData }) {
  return (
    <div className="space-y-6">
      {/* Section 1: Input Parameters */}
      <section>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8A8886]">
          Input Parameters
        </h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#3D3D3D] text-left text-xs text-[#8A8886]">
              <th className="pb-1.5 font-medium">Parameter</th>
              <th className="pb-1.5 font-medium">Value</th>
              <th className="pb-1.5 font-medium">Unit</th>
            </tr>
          </thead>
          <tbody>
            {data.inputs.map((p) => (
              <tr
                key={p.name}
                className="border-b border-[#3D3D3D]/50 text-[#D6D6D6]"
              >
                <td className="py-1.5">{p.name}</td>
                <td className="py-1.5 font-mono">{p.value}</td>
                <td className="py-1.5 text-[#8A8886]">{p.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Section 2: Output Parameters */}
      <section>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8A8886]">
          Output Parameters
        </h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#3D3D3D] text-left text-xs text-[#8A8886]">
              <th className="pb-1.5 font-medium">Parameter</th>
              <th className="pb-1.5 font-medium">Value</th>
              <th className="pb-1.5 font-medium">Unit</th>
            </tr>
          </thead>
          <tbody>
            {data.outputs.map((p) => (
              <tr
                key={p.name}
                className="border-b border-[#3D3D3D]/50"
              >
                <td className="py-1.5 text-[#D6D6D6]">{p.name}</td>
                <td className="py-1.5 font-mono text-emerald-400">
                  {p.value}
                </td>
                <td className="py-1.5 text-[#8A8886]">{p.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Section 3: Stream Table */}
      <section>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8A8886]">
          Stream Table
        </h4>
        <div className="-mx-4 overflow-x-auto px-4">
          <table className="w-max min-w-full text-xs">
            <thead>
              <tr className="bg-[#333340] text-left text-[#8A8886]">
                <th className="whitespace-nowrap px-2 py-2 font-medium">#</th>
                <th className="whitespace-nowrap px-2 py-2 font-medium">
                  Stream
                </th>
                <th className="whitespace-nowrap px-2 py-2 font-medium">
                  T (°C)
                </th>
                <th className="whitespace-nowrap px-2 py-2 font-medium">
                  P (barg)
                </th>
                <th className="whitespace-nowrap px-2 py-2 font-medium">MW</th>
                <th className="whitespace-nowrap px-2 py-2 font-medium">
                  Flow (Nm³/h)
                </th>
                <th className="whitespace-nowrap px-2 py-2 font-medium">
                  H₂ %
                </th>
                <th className="whitespace-nowrap px-2 py-2 font-medium">
                  O₂ ppm
                </th>
                <th className="whitespace-nowrap px-2 py-2 font-medium">
                  H₂O ppm
                </th>
              </tr>
            </thead>
            <tbody>
              {data.streams.map((s, i) => (
                <tr
                  key={s.id}
                  className={`border-b border-[#3D3D3D]/40 text-[#D6D6D6] ${
                    i % 2 === 1 ? "bg-[#2D2D2D]" : ""
                  }`}
                >
                  <td className="px-2 py-1.5 font-mono text-[#8A8886]">
                    {s.id}
                  </td>
                  <td className="whitespace-nowrap px-2 py-1.5 font-medium text-white">
                    {s.name}
                  </td>
                  <td className="px-2 py-1.5 font-mono">{s.temperature}</td>
                  <td className="px-2 py-1.5 font-mono">{s.pressure}</td>
                  <td className="px-2 py-1.5 font-mono">
                    {s.molecularWeight}
                  </td>
                  <td className="px-2 py-1.5 font-mono">{s.flowRate}</td>
                  <td className="px-2 py-1.5 font-mono">{s.h2Pct}</td>
                  <td className="px-2 py-1.5 font-mono">{s.o2Ppm}</td>
                  <td className="px-2 py-1.5 font-mono">{s.h2oPpm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Equipment Summary */}
      <section>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8A8886]">
          Equipment Summary
        </h4>
        <div className="space-y-2">
          {data.equipment.map((eq) => (
            <div
              key={eq.name}
              className="rounded-lg bg-[#2D2D2D] p-3"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-medium text-white">
                  {eq.name}
                </span>
                <span className="shrink-0 text-xs text-[#8A8886]">
                  {eq.type}
                </span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                <div>
                  <span className="text-[#8A8886]">Dimensions: </span>
                  <span className="text-[#D6D6D6]">{eq.dimensions}</span>
                </div>
                <div>
                  <span className="text-[#8A8886]">Material: </span>
                  <span className="text-[#D6D6D6]">{eq.material}</span>
                </div>
                <div>
                  <span className="text-[#8A8886]">Design P: </span>
                  <span className="text-[#D6D6D6]">{eq.designPressure}</span>
                </div>
                <div>
                  <span className="text-[#8A8886]">Design T: </span>
                  <span className="text-[#D6D6D6]">
                    {eq.designTemperature}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Requirement Checks */}
      <section>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8A8886]">
          Requirement Checks
        </h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#3D3D3D] text-left text-xs text-[#8A8886]">
              <th className="pb-1.5 font-medium">Parameter</th>
              <th className="pb-1.5 font-medium">Required</th>
              <th className="pb-1.5 font-medium">Actual</th>
              <th className="pb-1.5 text-right font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.checks.map((c) => (
              <tr
                key={c.parameter}
                className={`border-b border-[#3D3D3D]/50 ${statusRowBg[c.status]}`}
              >
                <td className="py-1.5 text-[#D6D6D6]">{c.parameter}</td>
                <td className="py-1.5 font-mono text-[#8A8886]">
                  {c.requirement}
                </td>
                <td className="py-1.5 font-mono text-white">{c.actual}</td>
                <td className="py-1.5 text-right">{statusIcon[c.status]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
