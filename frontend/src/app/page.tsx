"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Menu } from "lucide-react";
import type { ChatMessage, PanelView } from "@/lib/types";
import { DEMO_PROJECTS, VERSION_HISTORY } from "@/data/projects";
import {
  CORE_VALUES_H2,
  SIMILARITY_RESULTS,
  SIZING_RESULTS_H2,
  COSTING_RESULTS_H2,
  PID_H2_DATA,
  HARDWARE_OFFER_DATA,
  SERVICES_OFFER_DATA,
} from "@/data/demo-data";
import { DEMO_FLOW_H2, INITIAL_MESSAGES } from "@/data/demo-messages";
import AppBar from "@/components/layout/AppBar";
import ProjectSidebar from "@/components/layout/ProjectSidebar";
import RightPanel from "@/components/layout/RightPanel";
import ChatPanel from "@/components/chat/ChatPanel";
import CoreValuesPanel from "@/components/panels/CoreValuesPanel";
import SizingPanel from "@/components/panels/SizingPanel";
import CostingPanel from "@/components/panels/CostingPanel";
import PidPanel from "@/components/panels/PidPanel";
import VersionHistoryPanel from "@/components/panels/VersionHistoryPanel";
import { DocumentCard } from "@/components/chat/cards/DocumentCard";
import { TooltipProvider } from "@/components/ui/tooltip";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
const REAL_BACKEND_PROJECTS = new Set(["proj-gas-dryer", "proj-h2pdu", "proj-hyros", "proj-asco"]);

export default function Home() {
  const [activeTab, setActiveTab] = useState("chat");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    "proj-jc-h2"
  );
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({
    ...INITIAL_MESSAGES,
  });
  const [panelView, setPanelView] = useState<PanelView>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [demoStepIndex, setDemoStepIndex] = useState(-1);
  const [demoRunning, setDemoRunning] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const demoTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const currentMessages = selectedProjectId
    ? messages[selectedProjectId] || []
    : [];

  const addMessages = useCallback(
    (projectId: string, newMsgs: ChatMessage[]) => {
      setMessages((prev) => ({
        ...prev,
        [projectId]: [...(prev[projectId] || []), ...newMsgs],
      }));
    },
    []
  );

  const sendToBackend = useCallback(
    async (projectId: string, allMessages: ChatMessage[]) => {
      setIsTyping(true);
      abortControllerRef.current = new AbortController();

      const apiMessages = allMessages
        .filter((m) => m.type === "user" || m.type === "ai")
        .map((m) => ({
          role: m.type === "user" ? "user" : "assistant",
          content: m.content,
        }));

      const aiMsgId = `ai-${Date.now()}`;
      const aiMsg: ChatMessage = {
        id: aiMsgId,
        projectId,
        type: "ai",
        content: "",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => ({
        ...prev,
        [projectId]: [...(prev[projectId] || []), aiMsg],
      }));

      try {
        const res = await fetch(`${BACKEND_URL}/api/chat/${projectId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: apiMessages }),
          signal: abortControllerRef.current.signal,
        });

        if (!res.ok || !res.body) {
          throw new Error(`Backend error: ${res.status}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            try {
              const data = JSON.parse(line.slice(6));
              if (data.type === "text") {
                setMessages((prev) => {
                  const msgs = prev[projectId] || [];
                  const lastIdx = msgs.length - 1;
                  if (lastIdx >= 0 && msgs[lastIdx].id === aiMsgId) {
                    const updated = [...msgs];
                    updated[lastIdx] = {
                      ...updated[lastIdx],
                      content: updated[lastIdx].content + data.content,
                    };
                    return { ...prev, [projectId]: updated };
                  }
                  return prev;
                });
              } else if (data.type === "error") {
                setMessages((prev) => {
                  const msgs = prev[projectId] || [];
                  const lastIdx = msgs.length - 1;
                  if (lastIdx >= 0 && msgs[lastIdx].id === aiMsgId) {
                    const updated = [...msgs];
                    updated[lastIdx] = {
                      ...updated[lastIdx],
                      content: `Error: ${data.content}`,
                    };
                    return { ...prev, [projectId]: updated };
                  }
                  return prev;
                });
              }
            } catch {
              // skip malformed SSE lines
            }
          }
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        setMessages((prev) => {
          const msgs = prev[projectId] || [];
          const lastIdx = msgs.length - 1;
          if (lastIdx >= 0 && msgs[lastIdx].id === aiMsgId) {
            const updated = [...msgs];
            updated[lastIdx] = {
              ...updated[lastIdx],
              content:
                updated[lastIdx].content ||
                "Unable to reach backend. Make sure the backend server is running on port 8000.",
            };
            return { ...prev, [projectId]: updated };
          }
          return prev;
        });
      } finally {
        setIsTyping(false);
        abortControllerRef.current = null;
      }
    },
    []
  );

  const enrichMessage = useCallback((msg: ChatMessage): ChatMessage => {
    if (msg.type === "reasoning") {
      return { ...msg, isStreaming: true };
    }
    if (msg.type !== "card" || msg.cardData) return msg;
    switch (msg.cardType) {
      case "core_values":
        return { ...msg, cardData: CORE_VALUES_H2 };
      case "similarity":
        return { ...msg, cardData: SIMILARITY_RESULTS };
      case "sizing":
        return { ...msg, cardData: SIZING_RESULTS_H2 };
      case "costing":
        return { ...msg, cardData: COSTING_RESULTS_H2 };
      case "pid":
        return { ...msg, cardData: PID_H2_DATA };
      case "document":
        if (msg.content.toLowerCase().includes("hardware")) {
          return { ...msg, cardData: HARDWARE_OFFER_DATA };
        }
        return { ...msg, cardData: SERVICES_OFFER_DATA };
      default:
        return msg;
    }
  }, []);

  const runDemoStep = useCallback(
    (stepIndex: number) => {
      if (stepIndex >= DEMO_FLOW_H2.length) {
        setDemoRunning(false);
        setIsTyping(false);
        setDemoStepIndex(-1);
        return;
      }

      const step = DEMO_FLOW_H2[stepIndex];
      const enrichedMessages = step.messages.map(enrichMessage);
      const hasAiResponse =
        stepIndex + 1 < DEMO_FLOW_H2.length &&
        DEMO_FLOW_H2[stepIndex + 1].messages.some(
          (m) => m.type !== "user"
        );

      setIsTyping(false);

      demoTimeoutRef.current = setTimeout(() => {
        addMessages("proj-jc-h2", enrichedMessages);
        setDemoStepIndex(stepIndex);

        if (step.openPanel) {
          setPanelView(step.openPanel);
        }
        if (step.closePanel) {
          setPanelView(null);
        }

        const nextStep = stepIndex + 1;
        if (nextStep < DEMO_FLOW_H2.length) {
          const nextStepData = DEMO_FLOW_H2[nextStep];
          const nextIsAi = nextStepData.messages.some(
            (m) => m.type !== "user"
          );
          if (nextIsAi) {
            setIsTyping(true);
          }
          demoTimeoutRef.current = setTimeout(() => {
            runDemoStep(nextStep);
          }, nextStepData.delay);
        } else {
          setDemoRunning(false);
          setIsTyping(false);
        }
      }, step.delay);
    },
    [addMessages, enrichMessage]
  );

  const startDemo = useCallback(() => {
    if (demoRunning) return;
    setMessages((prev) => ({ ...prev, "proj-jc-h2": [] }));
    setDemoRunning(true);
    setSelectedProjectId("proj-jc-h2");
    setPanelView(null);
    setTimeout(() => runDemoStep(0), 300);
  }, [demoRunning, runDemoStep]);

  useEffect(() => {
    return () => {
      if (demoTimeoutRef.current) {
        clearTimeout(demoTimeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleSendMessage = useCallback(
    (content: string) => {
      if (!selectedProjectId) return;

      const newMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        projectId: selectedProjectId,
        type: "user",
        content,
        timestamp: new Date().toISOString(),
      };

      if (REAL_BACKEND_PROJECTS.has(selectedProjectId)) {
        setMessages((prev) => {
          const updated = {
            ...prev,
            [selectedProjectId]: [...(prev[selectedProjectId] || []), newMsg],
          };
          sendToBackend(selectedProjectId, updated[selectedProjectId]);
          return updated;
        });
        return;
      }

      addMessages(selectedProjectId, [newMsg]);

      if (
        selectedProjectId === "proj-jc-h2" &&
        !demoRunning &&
        currentMessages.length === 0
      ) {
        startDemo();
      }
    },
    [selectedProjectId, addMessages, demoRunning, currentMessages.length, startDemo, sendToBackend]
  );

  const handleOpenPanel = useCallback((view: PanelView) => {
    if (view) {
      setPanelView(view);
    }
  }, []);

  const handleSelectProject = useCallback(
    (id: string) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      setSelectedProjectId(id);
      setPanelView(null);
      setIsTyping(false);
      setSidebarOpen(false);
      if (demoRunning && id !== "proj-jc-h2") {
        if (demoTimeoutRef.current) {
          clearTimeout(demoTimeoutRef.current);
        }
        setDemoRunning(false);
      }
    },
    [demoRunning]
  );

  const handleNewProject = useCallback(() => {
    setSelectedProjectId("proj-jc-h2");
    setPanelView(null);
    setSidebarOpen(false);
    if (!demoRunning) {
      startDemo();
    }
  }, [demoRunning, startDemo]);

  const renderPanelContent = () => {
    switch (panelView) {
      case "core_values":
        return <CoreValuesPanel data={CORE_VALUES_H2} />;
      case "sizing":
        return <SizingPanel data={SIZING_RESULTS_H2} />;
      case "costing":
        return <CostingPanel data={COSTING_RESULTS_H2} />;
      case "pid":
        return <PidPanel data={PID_H2_DATA} />;
      case "document_hardware":
        return (
          <div className="p-4">
            <DocumentCard data={HARDWARE_OFFER_DATA} />
          </div>
        );
      case "document_services":
        return (
          <div className="p-4">
            <DocumentCard data={SERVICES_OFFER_DATA} />
          </div>
        );
      case "version_history":
        return (
          <VersionHistoryPanel
            entries={
              selectedProjectId
                ? VERSION_HISTORY[selectedProjectId] || []
                : []
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <TooltipProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-[#1F1F1F]">
        <AppBar activeTab={activeTab} onTabChange={setActiveTab} />

        <ProjectSidebar
          projects={DEMO_PROJECTS}
          selectedProjectId={selectedProjectId}
          onSelectProject={handleSelectProject}
          onNewProject={handleNewProject}
          mobileOpen={sidebarOpen}
          onMobileClose={() => setSidebarOpen(false)}
        />

        <div className="flex flex-1 min-w-0 min-h-0">
          <div className="flex-1 min-w-0 min-h-0 flex flex-col">
            {selectedProjectId ? (
              <>
                <div className="h-12 flex items-center justify-between px-3 md:px-4 border-b border-[#3D3D3D] bg-[#252525] shrink-0">
                  <div className="flex items-center gap-2 md:gap-3 min-w-0">
                    <button
                      onClick={() => setSidebarOpen(true)}
                      className="md:hidden flex h-8 w-8 items-center justify-center rounded-md text-[#8A8886] hover:bg-[#3D3D3D] hover:text-white transition-colors shrink-0"
                    >
                      <Menu size={18} />
                    </button>
                    <h2 className="text-white font-semibold text-sm truncate">
                      {DEMO_PROJECTS.find(
                        (p) => p.id === selectedProjectId
                      )?.name || "Project"}
                    </h2>
                    <span className="text-[#8A8886] text-xs hidden sm:inline">
                      {DEMO_PROJECTS.find(
                        (p) => p.id === selectedProjectId
                      )?.rfqNumber}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedProjectId === "proj-jc-h2" &&
                      !demoRunning &&
                      currentMessages.length === 0 && (
                        <button
                          onClick={startDemo}
                          className="px-3 py-1.5 bg-[#7B83EB] text-white text-xs font-medium rounded-md hover:bg-[#6264A7] transition-colors"
                        >
                          Start Demo
                        </button>
                      )}
                    {demoRunning && (
                      <span className="text-[#7B83EB] text-xs font-medium animate-pulse">
                        Demo Running...
                      </span>
                    )}
                    <button
                      onClick={() =>
                        setPanelView(
                          panelView === "version_history"
                            ? null
                            : "version_history"
                        )
                      }
                      className="p-1.5 rounded-md hover:bg-[#3D3D3D] text-[#8A8886] hover:text-white transition-colors"
                      title="Version History"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </button>
                  </div>
                </div>
                <ChatPanel
                  projectId={selectedProjectId}
                  messages={currentMessages}
                  onSendMessage={handleSendMessage}
                  onOpenPanel={handleOpenPanel}
                  isTyping={isTyping}
                />
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[#2B2B40] flex items-center justify-center mx-auto mb-4">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#7B83EB"
                      strokeWidth="1.5"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-white text-lg font-semibold mb-2">
                    EPC Project Manager AI
                  </h3>
                  <p className="text-[#8A8886] text-sm max-w-md">
                    Select a project from the sidebar to view its bid
                    progress, or click &quot;+&quot; to start a new RFQ
                    analysis.
                  </p>
                </div>
              </div>
            )}
          </div>

          <RightPanel view={panelView} onClose={() => setPanelView(null)}>
            {renderPanelContent()}
          </RightPanel>
        </div>
      </div>
    </TooltipProvider>
  );
}
