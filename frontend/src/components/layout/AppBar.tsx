"use client";

import {
  LayoutDashboard,
  MessageSquare,
  Search,
  Settings,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AppBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "home", label: "Home", icon: LayoutDashboard },
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "search", label: "Search", icon: Search },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function AppBar({ activeTab, onTabChange }: AppBarProps) {
  return (
    <div className="flex h-full w-12 shrink-0 flex-col items-center bg-[#1B1B1B] py-3">
      {/* Logo */}
      <div className="mb-6 flex h-8 w-8 items-center justify-center">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="text-[#7B83EB]"
        >
          <path
            d="M10 1L19 10L10 19L1 10L10 1Z"
            fill="currentColor"
            opacity="0.9"
          />
          <path
            d="M10 5L15 10L10 15L5 10L10 5Z"
            fill="#1B1B1B"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Navigation */}
      <TooltipProvider>
        <nav className="flex flex-1 flex-col items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger
                  className={`relative flex h-10 w-full cursor-pointer items-center justify-center transition-colors ${
                    isActive ? "text-white" : "text-[#8A8886] hover:text-[#D6D6D6]"
                  }`}
                  onClick={() => onTabChange(item.id)}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-sm bg-[#7B83EB]" />
                  )}
                  <item.icon size={20} />
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
      </TooltipProvider>

      {/* User Avatar */}
      <div className="mt-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#7B83EB] text-xs font-semibold text-white">
        S
      </div>
    </div>
  );
}
