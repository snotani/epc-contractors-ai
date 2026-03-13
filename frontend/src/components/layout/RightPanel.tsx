"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { PanelView } from "@/lib/types";

interface RightPanelProps {
  view: PanelView;
  onClose: () => void;
  children: React.ReactNode;
}

const panelTitles: Record<NonNullable<PanelView>, string> = {
  core_values: "Core Values",
  sizing: "Sizing Results",
  costing: "Cost Breakdown",
  pid: "P&ID — Process & Instrumentation",
  document_hardware: "Hardware Offer",
  document_services: "Services Offer",
  version_history: "Version History",
};

export default function RightPanel({
  view,
  onClose,
  children,
}: RightPanelProps) {
  return (
    <AnimatePresence>
      {view && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
          className="flex h-full w-[420px] shrink-0 flex-col border-l border-[#3D3D3D] bg-[#252525]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#3D3D3D] px-4 py-3">
            <h3 className="text-sm font-semibold text-white">
              {panelTitles[view]}
            </h3>
            <button
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-md text-[#8A8886] transition-colors hover:bg-[#3D3D3D] hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <ScrollArea className="flex-1 overflow-hidden">
            <div className="p-4">{children}</div>
          </ScrollArea>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
