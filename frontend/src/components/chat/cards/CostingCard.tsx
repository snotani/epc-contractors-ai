"use client";

import { useState } from "react";
import { ChevronDown, Mail, Send, CheckCircle } from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import type { CostingData, CostCategory, SupplierConfirmation } from "@/lib/types";

function fmt(n: number) {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

const supplierStatusStyles: Record<SupplierConfirmation["status"], string> = {
  pending: "bg-amber-500/15 text-amber-400",
  confirmed: "bg-green-500/15 text-green-400",
  quoted: "bg-blue-500/15 text-blue-400",
};

export function CostingCard({ data }: { data: CostingData }) {
  const maxPct = Math.max(...data.categories.map((c) => c.percentage));
  const [confirmState, setConfirmState] = useState<"idle" | "sending" | "sent">("idle");

  const handleConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirmState !== "idle") return;
    setConfirmState("sending");
    setTimeout(() => setConfirmState("sent"), 1500);
  };

  return (
    <div className="bg-[#2D2D2D] border border-[#3D3D3D] rounded-lg overflow-hidden">
      <div className="bg-[#333340] border-t-[3px] border-t-[#7B83EB] px-4 py-3 flex items-center justify-between">
        <h3 className="text-[#E0E0E0] font-medium text-sm">Cost Breakdown</h3>
        <span className="text-white text-lg font-semibold">
          EUR {fmt(data.totalCost)}
        </span>
      </div>

      <div className="p-4 space-y-5">
        {/* Bar chart */}
        <div className="flex items-end gap-1.5 h-28">
          {data.categories.map((cat) => {
            const height = maxPct > 0 ? (cat.percentage / maxPct) * 100 : 0;
            const opacity = 0.4 + (cat.percentage / maxPct) * 0.6;
            return (
              <div
                key={cat.name}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <span className="text-[10px] text-[#8A8886]">
                  {cat.percentage}%
                </span>
                <div
                  className="w-full rounded-t"
                  style={{
                    height: `${height}%`,
                    backgroundColor: `rgba(123,131,235,${opacity})`,
                  }}
                />
                <span className="text-[10px] text-[#8A8886] text-center leading-tight truncate w-full">
                  {cat.name}
                </span>
                <span className="text-[10px] text-[#D6D6D6]">
                  {fmt(cat.cost)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Expandable categories */}
        <div className="border border-[#3D3D3D] rounded overflow-hidden">
          {data.categories.map((cat) => (
            <CategoryRow key={cat.name} category={cat} />
          ))}
        </div>

        {/* Margin calculator */}
        <div className="bg-[#252525] border border-[#3D3D3D] rounded px-3 py-2 flex items-center justify-between">
          <span className="text-[#8A8886] text-xs">
            Target Margin:{" "}
            <span className="text-white font-medium">
              {data.targetMargin}%
            </span>
          </span>
          <span className="text-[#8A8886] text-xs">
            Selling Price:{" "}
            <span className="text-white font-medium">
              EUR {fmt(data.sellingPrice)}
            </span>
          </span>
        </div>

        {/* Supplier confirmations */}
        {data.supplierConfirmations.length > 0 && (
          <div>
            <h4 className="text-[#8A8886] text-xs font-medium uppercase tracking-wider mb-2">
              Supplier Confirmations
            </h4>
            <div className="space-y-1.5">
              {data.supplierConfirmations.map((sc) => (
                <SupplierRow key={sc.item} confirmation={sc} />
              ))}
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
      </div>
    </div>
  );
}

function CategoryRow({ category }: { category: CostCategory }) {
  return (
    <Collapsible>
      <CollapsibleTrigger className="w-full flex items-center justify-between px-3 py-2 hover:bg-[#333340]/40 transition-colors border-b border-[#3D3D3D] last:border-b-0 cursor-pointer">
        <div className="flex items-center gap-2">
          <ChevronDown className="w-3 h-3 text-[#8A8886] transition-transform [[data-open]>&]:rotate-180" />
          <span className="text-[#D6D6D6] text-xs">{category.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white text-xs font-medium">
            EUR {fmt(category.cost)}
          </span>
          <span className="text-[#8A8886] text-[10px] w-10 text-right">
            {category.percentage}%
          </span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="bg-[#252525] border-b border-[#3D3D3D]">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="text-[#8A8886]">
                <th className="text-left px-3 py-1 font-medium">Item</th>
                <th className="text-right px-2 py-1 font-medium">Qty</th>
                <th className="text-right px-2 py-1 font-medium">Unit Cost</th>
                <th className="text-right px-3 py-1 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {category.items.map((item) => (
                <tr
                  key={item.description}
                  className="border-t border-[#3D3D3D]/50"
                >
                  <td className="text-[#D6D6D6] px-3 py-1">
                    {item.description}
                    {item.needsConfirmation && (
                      <span className="ml-1.5 text-[9px] bg-amber-500/15 text-amber-400 px-1 py-0.5 rounded">
                        TBC
                      </span>
                    )}
                  </td>
                  <td className="text-[#D6D6D6] text-right px-2 py-1">
                    {item.quantity}
                  </td>
                  <td className="text-[#D6D6D6] text-right px-2 py-1">
                    {fmt(item.unitCost)}
                  </td>
                  <td className="text-white text-right px-3 py-1 font-medium">
                    {fmt(item.totalCost)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function SupplierRow({
  confirmation,
}: {
  confirmation: SupplierConfirmation;
}) {
  const [showEmail, setShowEmail] = useState(false);

  return (
    <div className="bg-[#252525] border border-[#3D3D3D] rounded px-3 py-2">
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <span className="text-[#D6D6D6] text-xs">{confirmation.item}</span>
          <span className="text-[#8A8886] text-[10px] ml-2">
            {confirmation.supplier}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[#D6D6D6] text-xs font-medium">
            EUR {fmt(confirmation.estimatedCost)}
          </span>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full ${supplierStatusStyles[confirmation.status]}`}
          >
            {confirmation.status}
          </span>
          {confirmation.draftEmail && (
            <button
              onClick={() => setShowEmail(!showEmail)}
              className="text-[#7B83EB] hover:text-[#9BA1F5] text-[10px] flex items-center gap-1 transition-colors"
            >
              <Mail className="w-3 h-3" />
              Draft
            </button>
          )}
        </div>
      </div>
      {showEmail && confirmation.draftEmail && (
        <pre className="mt-2 text-[11px] text-[#9E9E9E] bg-[#1E1E1E] border border-[#3D3D3D] rounded p-2 whitespace-pre-wrap font-sans">
          {confirmation.draftEmail}
        </pre>
      )}
    </div>
  );
}
