"use client";

import type { PidData } from "@/lib/types";

export default function PidPanel({ data }: { data: PidData }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">{data.title}</h3>
          <p className="text-xs text-[#8A8886] mt-0.5">
            Dwg: {data.drawingNumber} &middot; Rev {data.revision}
          </p>
        </div>
      </div>

      {/* Process Description */}
      <section>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8A8886]">
          Process Description
        </h4>
        <p className="text-[#D6D6D6] text-xs leading-relaxed whitespace-pre-line">
          {data.processDescription}
        </p>
      </section>

      {/* Equipment List */}
      <section>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8A8886]">
          Equipment List ({data.equipment.length} items)
        </h4>
        <div className="space-y-2">
          {data.equipment.map((eq) => (
            <div key={eq.tag} className="rounded-lg bg-[#2D2D2D] p-3">
              <div className="flex items-baseline gap-2">
                <span className="text-[#6264A7] font-mono text-xs font-bold">
                  {eq.tag}
                </span>
                <span className="text-sm font-medium text-white">
                  {eq.name}
                </span>
              </div>
              <div className="mt-1.5 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                <div>
                  <span className="text-[#8A8886]">Type: </span>
                  <span className="text-[#D6D6D6]">{eq.type}</span>
                </div>
                <div>
                  <span className="text-[#8A8886]">Size: </span>
                  <span className="text-[#D6D6D6]">{eq.size}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[#8A8886]">Design: </span>
                  <span className="text-[#D6D6D6]">{eq.designConditions}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instrument List */}
      <section>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8A8886]">
          Instrument Schedule ({data.instruments.length} items)
        </h4>
        <div className="-mx-4 overflow-x-auto px-4">
          <table className="w-max min-w-full text-xs">
            <thead>
              <tr className="bg-[#333340] text-left text-[#8A8886]">
                <th className="whitespace-nowrap px-2 py-2 font-medium">Tag</th>
                <th className="whitespace-nowrap px-2 py-2 font-medium">Type</th>
                <th className="whitespace-nowrap px-2 py-2 font-medium">Service</th>
                <th className="whitespace-nowrap px-2 py-2 font-medium">Range</th>
              </tr>
            </thead>
            <tbody>
              {data.instruments.map((inst, i) => (
                <tr
                  key={inst.tag}
                  className={`border-b border-[#3D3D3D]/40 text-[#D6D6D6] ${
                    i % 2 === 1 ? "bg-[#2D2D2D]" : ""
                  }`}
                >
                  <td className="whitespace-nowrap px-2 py-1.5 font-mono font-bold text-[#6264A7]">
                    {inst.tag}
                  </td>
                  <td className="whitespace-nowrap px-2 py-1.5">{inst.type}</td>
                  <td className="px-2 py-1.5">{inst.service}</td>
                  <td className="whitespace-nowrap px-2 py-1.5 font-mono">
                    {inst.range}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Line List */}
      <section>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8A8886]">
          Line List ({data.lines.length} lines)
        </h4>
        <div className="-mx-4 overflow-x-auto px-4">
          <table className="w-max min-w-full text-xs">
            <thead>
              <tr className="bg-[#333340] text-left text-[#8A8886]">
                <th className="whitespace-nowrap px-2 py-2 font-medium">Line</th>
                <th className="whitespace-nowrap px-2 py-2 font-medium">From</th>
                <th className="whitespace-nowrap px-2 py-2 font-medium">To</th>
                <th className="whitespace-nowrap px-2 py-2 font-medium">Size</th>
                <th className="whitespace-nowrap px-2 py-2 font-medium">Spec</th>
              </tr>
            </thead>
            <tbody>
              {data.lines.map((ln, i) => (
                <tr
                  key={ln.tag}
                  className={`border-b border-[#3D3D3D]/40 text-[#D6D6D6] ${
                    i % 2 === 1 ? "bg-[#2D2D2D]" : ""
                  }`}
                >
                  <td className="whitespace-nowrap px-2 py-1.5 font-mono font-bold text-[#6264A7]">
                    {ln.tag}
                  </td>
                  <td className="whitespace-nowrap px-2 py-1.5">{ln.from}</td>
                  <td className="whitespace-nowrap px-2 py-1.5">{ln.to}</td>
                  <td className="whitespace-nowrap px-2 py-1.5 font-mono">
                    {ln.size}
                  </td>
                  <td className="whitespace-nowrap px-2 py-1.5">{ln.spec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Notes */}
      <section>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8A8886]">
          Notes
        </h4>
        <ol className="list-decimal list-inside space-y-1">
          {data.notes.map((note, i) => (
            <li key={i} className="text-xs text-[#D6D6D6] leading-relaxed">
              {note}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
