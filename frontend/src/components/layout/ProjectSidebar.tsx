"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Project, ProjectStatus } from "@/lib/types";

interface ProjectSidebarProps {
  projects: Project[];
  selectedProjectId: string | null;
  onSelectProject: (id: string) => void;
  onNewProject: () => void;
}

const statusConfig: Record<
  ProjectStatus,
  { label: string; bg: string; text: string }
> = {
  new: { label: "New", bg: "bg-[#7B83EB]/20", text: "text-[#7B83EB]" },
  in_progress: {
    label: "In Progress",
    bg: "bg-[#FFA726]/20",
    text: "text-[#FFA726]",
  },
  quoted: { label: "Quoted", bg: "bg-[#29B6F6]/20", text: "text-[#29B6F6]" },
  won: { label: "Won", bg: "bg-[#4CAF50]/20", text: "text-[#4CAF50]" },
  lost: { label: "Lost", bg: "bg-[#EF5350]/20", text: "text-[#EF5350]" },
};

export default function ProjectSidebar({
  projects,
  selectedProjectId,
  onSelectProject,
  onNewProject,
}: ProjectSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full w-80 shrink-0 flex-col border-r border-[#3D3D3D] bg-[#292929]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="text-base font-semibold text-white">Projects</h2>
        <button
          onClick={onNewProject}
          className="flex h-7 w-7 items-center justify-center rounded-md text-[#7B83EB] transition-colors hover:bg-[#3D3D3D]"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Search */}
      <div className="px-3 pb-2">
        <div className="flex items-center gap-2 rounded-md bg-[#3D3D3D] px-3 py-1.5">
          <Search size={14} className="shrink-0 text-[#8A8886]" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-[#8A8886] outline-none"
          />
        </div>
      </div>

      {/* Project List */}
      <ScrollArea className="flex-1 overflow-hidden">
        <div className="flex flex-col py-1">
          {filtered.map((project) => {
            const isSelected = project.id === selectedProjectId;
            const status = statusConfig[project.status];

            return (
              <button
                key={project.id}
                onClick={() => onSelectProject(project.id)}
                className={`relative flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                  isSelected
                    ? "bg-[#3D3D3D]"
                    : "hover:bg-[#333333]"
                }`}
              >
                {isSelected && (
                  <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-sm bg-[#7B83EB]" />
                )}

                {/* Avatar */}
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                  style={{ backgroundColor: project.avatarColor }}
                >
                  {project.name.charAt(0).toUpperCase()}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium text-[#D6D6D6]">
                      {project.name}
                    </span>
                    {project.unreadCount > 0 && (
                      <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#7B83EB] px-1.5 text-[10px] font-semibold text-white">
                        {project.unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-0.5">
                    <span className="truncate text-xs text-[#8A8886]">
                      {project.client}
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${status.bg} ${status.text}`}
                    >
                      {status.label}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
