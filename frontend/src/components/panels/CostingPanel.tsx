"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Mail,
  Send,
  CheckCircle,
  Clock,
  CheckCircle2,
  MessageSquareQuote,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import type { CostingData, SupplierConfirmation } from "@/lib/types";

const CATEGORY_COLORS = [
  "#7B83EB",
  "#4FC3F7",
  "#81C784",
  "#FFD54F",
  "#FF8A65",
  "#BA68C8",
  "#4DB6AC",
  "#A1887F",
  "#90A4AE",
];

const statusConfig: Record<
  SupplierConfirmation["status"],
  { label: string; color: string; icon: React.ReactNode }
> = {
  pending: {
    label: "Pending",
    color: "text-amber-400 bg-amber-400/15",
    icon: <Clock size={12} />,
  },
  confirmed: {
    label: "Confirmed",
    color: "text-emerald-400 bg-emerald-400/15",
    icon: <CheckCircle2 size={12} />,
  },
  quoted: {
    label: "Quoted",
    color: "text-[#4FC3F7] bg-[#4FC3F7]/15",
    icon: <MessageSquareQuote size={12} />,
  },
};

function formatEur(n: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export default function CostingPanel({ data }: { data: CostingData }) {
  const [margin, setMargin] = useState(data.targetMargin);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );
  const [expandedEmails, setExpandedEmails] = useState<Set<string>>(new Set());
  const [confirmState, setConfirmState] = useState<"idle" | "sending" | "sent">("idle");

  function handleConfirm() {
    if (confirmState !== "idle") return;
    setConfirmState("sending");
    setTimeout(() => setConfirmState("sent"), 1500);
  }

  const computedSellingPrice = Math.round(
    data.totalCost / (1 - margin / 100),
  );

  function toggleCategory(name: string) {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  function toggleEmail(item: string) {
    setExpandedEmails((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  }

  return (
    <div className="space-y-6">
      {/* Summary header */}
      <div className="rounded-lg bg-[#2D2D2D] p-4">
        <p className="text-xs text-[#8A8886]">Total Cost</p>
        <p className="mt-0.5 text-2xl font-bold text-white">
          {formatEur(data.totalCost)}
        </p>
        <div className="mt-2 flex items-baseline gap-3">
          <div>
            <span className="text-xs text-[#8A8886]">Selling Price: </span>
            <span className="text-sm font-semibold text-emerald-400">
              {formatEur(computedSellingPrice)}
            </span>
          </div>
          <div>
            <span className="text-xs text-[#8A8886]">Margin: </span>
            <span className="text-sm font-medium text-[#7B83EB]">
              {margin}%
            </span>
          </div>
        </div>
      </div>

      {/* Stacked bar */}
      <div>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8A8886]">
          Cost Breakdown
        </h4>
        <div className="flex h-5 overflow-hidden rounded-full">
          {data.categories.map((cat, i) => (
            <div
              key={cat.name}
              style={{
                width: `${cat.percentage}%`,
                backgroundColor: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
              }}
              title={`${cat.name}: ${cat.percentage}%`}
              className="transition-opacity hover:opacity-80"
            />
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
          {data.categories.map((cat, i) => (
            <div key={cat.name} className="flex items-center gap-1.5 text-xs">
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor:
                    CATEGORY_COLORS[i % CATEGORY_COLORS.length],
                }}
              />
              <span className="text-[#8A8886]">
                {cat.name}{" "}
                <span className="text-[#D6D6D6]">{cat.percentage}%</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed categories */}
      <div>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8A8886]">
          Detailed Breakdown
        </h4>
        <div className="space-y-1">
          {data.categories.map((cat, i) => {
            const isOpen = expandedCategories.has(cat.name);
            return (
              <Collapsible key={cat.name} open={isOpen}>
                <CollapsibleTrigger
                  onClick={() => toggleCategory(cat.name)}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left transition-colors hover:bg-[#2D2D2D]"
                >
                  {isOpen ? (
                    <ChevronDown size={14} className="text-[#8A8886]" />
                  ) : (
                    <ChevronRight size={14} className="text-[#8A8886]" />
                  )}
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor:
                        CATEGORY_COLORS[i % CATEGORY_COLORS.length],
                    }}
                  />
                  <span className="flex-1 text-sm text-white">{cat.name}</span>
                  <span className="text-sm font-mono text-[#D6D6D6]">
                    {formatEur(cat.cost)}
                  </span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mb-2 ml-6 mr-2 overflow-hidden rounded-md border border-[#3D3D3D]">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-[#3D3D3D] bg-[#333340] text-left text-[#8A8886]">
                          <th className="px-2 py-1.5 font-medium">Item</th>
                          <th className="px-2 py-1.5 text-right font-medium">
                            Qty
                          </th>
                          <th className="px-2 py-1.5 text-right font-medium">
                            Unit
                          </th>
                          <th className="px-2 py-1.5 text-right font-medium">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cat.items.map((item) => (
                          <tr
                            key={item.description}
                            className={`border-b border-[#3D3D3D]/40 ${
                              item.needsConfirmation
                                ? "bg-amber-400/5"
                                : ""
                            }`}
                          >
                            <td className="px-2 py-1.5 text-[#D6D6D6]">
                              {item.description}
                              {item.supplier && (
                                <span className="ml-1 text-[#8A8886]">
                                  ({item.supplier})
                                </span>
                              )}
                              {item.needsConfirmation && (
                                <span className="ml-1 text-amber-400">●</span>
                              )}
                            </td>
                            <td className="px-2 py-1.5 text-right font-mono text-[#D6D6D6]">
                              {item.quantity}
                            </td>
                            <td className="px-2 py-1.5 text-right font-mono text-[#D6D6D6]">
                              {item.unitCost > 0
                                ? formatEur(item.unitCost)
                                : "TBD"}
                            </td>
                            <td className="px-2 py-1.5 text-right font-mono text-white">
                              {item.totalCost > 0
                                ? formatEur(item.totalCost)
                                : "TBD"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      </div>

      {/* Supplier confirmations */}
      {data.supplierConfirmations.length > 0 && (
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8A8886]">
            Supplier Confirmations
          </h4>
          <div className="space-y-2">
            {data.supplierConfirmations.map((sc) => {
              const cfg = statusConfig[sc.status];
              const emailOpen = expandedEmails.has(sc.item);
              return (
                <div
                  key={sc.item}
                  className="rounded-lg border border-[#3D3D3D] bg-[#2D2D2D] p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-white">
                        {sc.item}
                      </p>
                      <p className="text-xs text-[#8A8886]">{sc.supplier}</p>
                    </div>
                    <span
                      className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${cfg.color}`}
                    >
                      {cfg.icon}
                      {cfg.label}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#8A8886]">
                    Estimated:{" "}
                    <span className="text-[#D6D6D6]">
                      {formatEur(sc.estimatedCost)}
                    </span>
                  </p>

                  {sc.draftEmail && (
                    <div className="mt-2">
                      <button
                        onClick={() => toggleEmail(sc.item)}
                        className="flex items-center gap-1 text-xs text-[#7B83EB] transition-colors hover:text-[#9BA2F0]"
                      >
                        {emailOpen ? (
                          <ChevronDown size={12} />
                        ) : (
                          <ChevronRight size={12} />
                        )}
                        Draft Email Preview
                      </button>
                      {emailOpen && (
                        <div className="mt-2 rounded-md border border-[#3D3D3D] bg-[#1E1E1E] p-3">
                          <pre className="whitespace-pre-wrap text-xs leading-relaxed text-[#D6D6D6]">
                            {sc.draftEmail}
                          </pre>
                          <button
                            disabled
                            className="mt-3 flex items-center gap-1.5 rounded-md bg-[#7B83EB]/20 px-3 py-1.5 text-xs font-medium text-[#7B83EB] opacity-50"
                          >
                            <Mail size={12} />
                            Send Email
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={handleConfirm}
            disabled={confirmState !== "idle"}
            className={`w-full mt-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
              confirmState === "idle"
                ? "bg-[#7B83EB] text-white hover:bg-[#6264A7] cursor-pointer"
                : confirmState === "sending"
                  ? "bg-[#7B83EB]/70 text-white cursor-wait"
                  : "bg-[#4CAF50]/20 text-[#4CAF50] cursor-default"
            }`}
          >
            {confirmState === "idle" && (
              <>
                <Send className="w-4 h-4" />
                Confirm Quote with Suppliers
              </>
            )}
            {confirmState === "sending" && (
              <>
                <Send className="w-4 h-4 animate-pulse" />
                Sending Confirmation Requests...
              </>
            )}
            {confirmState === "sent" && (
              <>
                <CheckCircle className="w-4 h-4" />
                Confirmation Requests Sent
              </>
            )}
          </button>
        </div>
      )}

      {/* Margin calculator */}
      <div>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8A8886]">
          Margin Calculator
        </h4>
        <div className="rounded-lg border border-[#3D3D3D] bg-[#2D2D2D] p-4">
          <div className="flex items-center justify-between">
            <label className="text-sm text-[#D6D6D6]">Target Margin</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={15}
                max={40}
                value={margin}
                onChange={(e) => {
                  const v = Math.min(40, Math.max(15, Number(e.target.value)));
                  setMargin(v);
                }}
                className="w-16 rounded border border-[#3D3D3D] bg-[#1E1E1E] px-2 py-1 text-right text-sm text-white outline-none focus:border-[#7B83EB]"
              />
              <span className="text-sm text-[#8A8886]">%</span>
            </div>
          </div>
          <input
            type="range"
            min={15}
            max={40}
            value={margin}
            onChange={(e) => setMargin(Number(e.target.value))}
            className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[#3D3D3D] accent-[#7B83EB]"
          />
          <div className="mt-1 flex justify-between text-xs text-[#8A8886]">
            <span>15%</span>
            <span>40%</span>
          </div>
          <div className="mt-4 flex items-baseline justify-between border-t border-[#3D3D3D] pt-3">
            <span className="text-sm text-[#D6D6D6]">Selling Price</span>
            <span className="text-lg font-bold text-emerald-400">
              {formatEur(computedSellingPrice)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
