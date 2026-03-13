import type { Project, VersionEntry } from "@/lib/types";

export const DEMO_PROJECTS: Project[] = [
  {
    id: "proj-jc-h2",
    name: "JC H2 Purification 2025",
    client: "George Fox",
    systemType: "H2_PURIFICATION_DRYING",
    status: "new",
    rfqNumber: "RFQ-2025-0042",
    avatarColor: "#7B83EB",
    unreadCount: 3,
    description:
      "H2 Purification & Drying Unit - New RFQ, 3 documents received",
    createdAt: "2025-03-10",
    updatedAt: "2025-03-10",
  },
  {
    id: "proj-gas-dryer",
    name: "Adriatic GDU – ARC Phase II",
    client: "Arcamind Solutions",
    systemType: "GAS_DEHYDRATION",
    status: "new",
    rfqNumber: "ARC-AGP-2026-007",
    avatarColor: "#4FC3F7",
    unreadCount: 2,
    description:
      "Gas Dehydration Unit – Molecular Sieve, 50 MMSCFD, ASME VIII, PED Cat IV",
    createdAt: "2026-03-12",
    updatedAt: "2026-03-12",
  },
  {
    id: "proj-h2pdu",
    name: "Al Dhafra H2 PDU – Phase I",
    client: "Arcamind",
    systemType: "H2_PURIFICATION_DRYING",
    status: "new",
    rfqNumber: "MPE-AGHP-2026-003",
    avatarColor: "#FF7043",
    unreadCount: 2,
    description:
      "H2 Purification & Drying Unit – Deoxo + TSA, 10,000 Nm³/h, ISO 14687",
    createdAt: "2026-03-12",
    updatedAt: "2026-03-12",
  },
  {
    id: "proj-hyros",
    name: "HYROS H2 PDU",
    client: "Arcamind",
    systemType: "H2_PURIFICATION_DRYING",
    status: "quoted",
    rfqNumber: "RFQ-2024-0038",
    avatarColor: "#4CAF50",
    unreadCount: 0,
    description:
      "10,000 Nm³/h Hydrogen Purification & Drying Unit - Deoxo + Dryer Towers",
    createdAt: "2024-11-15",
    updatedAt: "2025-01-20",
  },
  {
    id: "proj-asco",
    name: "Arcamind Filtration Unit",
    client: "Arcamind",
    systemType: "FILTRATION_SYSTEM",
    status: "won",
    rfqNumber: "RFQ-2024-0041",
    avatarColor: "#FFA726",
    unreadCount: 0,
    description:
      "Vertical Cartridge Filter - SS316L, ASME VIII Div 1, PED Cat IV",
    createdAt: "2024-12-03",
    updatedAt: "2025-02-10",
  },
];

export const VERSION_HISTORY: Record<string, VersionEntry[]> = {
  "proj-jc-h2": [
    {
      id: "vh-1",
      version: 1,
      action: "RFQ Package Received",
      description:
        "3 documents ingested: Technical Specification (PDF, 32pp), Sizing Datasheet (Excel, 23 sheets), Services Requirements (PDF, 15pp)",
      timestamp: "2025-03-10T09:00:00",
    },
    {
      id: "vh-2",
      version: 2,
      action: "Core Values Extracted",
      description:
        "14 parameters extracted from RFQ. 2 items flagged for clarification.",
      timestamp: "2025-03-10T09:05:00",
    },
    {
      id: "vh-3",
      version: 3,
      action: "Similarity Analysis Complete",
      description:
        "Best match: HYROS H2 PDU (92%). Identified as scale variant.",
      timestamp: "2025-03-10T09:08:00",
    },
    {
      id: "vh-4",
      version: 4,
      action: "Sizing Calculations Complete",
      description:
        "All 8 requirement checks passed. Deoxo conversion 100%, dryer outlet < 5 ppmv.",
      timestamp: "2025-03-10T09:15:00",
    },
    {
      id: "vh-5",
      version: 5,
      action: "Cost Estimate Generated",
      description:
        "Total cost EUR 1,199,652. 2 items pending supplier confirmation.",
      timestamp: "2025-03-10T09:22:00",
    },
    {
      id: "vh-6",
      version: 6,
      action: "Offer Documents Generated",
      description:
        "Hardware offer (Arcamind standard format) and Services offer (JC RFQ response) generated.",
      timestamp: "2025-03-10T09:30:00",
    },
  ],
};
