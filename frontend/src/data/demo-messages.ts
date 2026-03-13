import type { ChatMessage, DemoStep } from "@/lib/types";

export const DEMO_FLOW_H2: DemoStep[] = [
  // Step 0: AI greeting
  {
    delay: 0,
    messages: [
      {
        id: "msg-h2-001",
        projectId: "proj-jc-h2",
        type: "ai",
        content:
          "Welcome to Project JC-H2-2025. I've received an RFQ package from George Fox for a Hydrogen Purification & Drying Unit. 3 documents attached:\n\n• Technical Specification (PDF, 32 pages)\n• Sizing Datasheet (Excel, 23 sheets)\n• Services Requirements (PDF, 15 pages)\n\nShall I begin analysis?",
        timestamp: "2025-03-10T09:00:00Z",
      },
    ],
  },

  // Step 1: User response
  {
    delay: 3000,
    messages: [
      {
        id: "msg-h2-002",
        projectId: "proj-jc-h2",
        type: "user",
        content: "Yes, analyze the RFQ package",
        timestamp: "2025-03-10T09:00:32Z",
      },
    ],
  },

  // Step 2: RFQ Parsing reasoning trace
  {
    delay: 2000,
    messages: [
      {
        id: "msg-h2-003",
        projectId: "proj-jc-h2",
        type: "reasoning",
        content: "",
        timestamp: "2025-03-10T09:00:35Z",
        reasoningLines: [
          "Analyzing uploaded RFQ package (3 files, 47 pages total)...",
          "Parsing Technical Specification (PDF, 32 pages)...",
          "Identified sections: Scope of Work, Process Description, Design Basis, Material Specs, Applicable Codes",
          "Parsing Sizing Datasheet (Excel, 23 sheets)...",
          "Identified INPUT sheet with process parameters, OUTPUT sheet with stream data",
          "Parsing Services Requirements (PDF, 15 pages)...",
          "Identified requirements: Spare parts, PM plan, Training, Remote monitoring, SLAs",
          "All 3 documents parsed successfully. Proceeding to core values extraction.",
        ],
        reasoningSummary:
          "Parsed 3 documents (47 pages). Identified process parameters and service requirements.",
      },
    ],
  },

  // Step 3: Action banner
  {
    delay: 2000,
    messages: [
      {
        id: "msg-h2-004",
        projectId: "proj-jc-h2",
        type: "action",
        content: "Extracting core values from RFQ-2025-0042...",
        timestamp: "2025-03-10T09:01:05Z",
      },
    ],
  },

  // Step 4: Core values reasoning
  {
    delay: 3000,
    messages: [
      {
        id: "msg-h2-005",
        projectId: "proj-jc-h2",
        type: "reasoning",
        content: "",
        timestamp: "2025-03-10T09:01:12Z",
        reasoningLines: [
          "Scanning for process parameters across all documents...",
          "Found in Technical Spec Section 3.2: Feed Temperature = 40°C, Pressure = 16 barg",
          "Found in Sizing INPUT sheet row 16-17: Confirmed T=40°C, P=16 barg",
          "Found composition in INPUT rows 21-30: H2 = 99.58%, O2 = 0.41%",
          "Design code: ASME Sect. VIII Div 1 (Technical Spec Section 5.1)",
          "Material: SS316/316L (Technical Spec Section 5.3)",
          "⚠ WARNING: Turndown ratio not specified in RFQ. Will flag for clarification.",
          '⚠ WARNING: Product O2 target ambiguous — spec says "< 5 ppmv (1 ppmv optional)"',
        ],
        reasoningSummary:
          "Extracted 14 parameters. 2 items need clarification: turndown ratio and O2 target.",
      },
    ],
  },

  // Step 5: Core values card
  {
    delay: 2000,
    messages: [
      {
        id: "msg-h2-006",
        projectId: "proj-jc-h2",
        type: "card",
        cardType: "core_values",
        content: "Core Values Extracted",
        timestamp: "2025-03-10T09:02:45Z",
      },
    ],
    openPanel: "core_values",
  },

  // Step 6: AI follow-up on core values
  {
    delay: 1500,
    messages: [
      {
        id: "msg-h2-007",
        projectId: "proj-jc-h2",
        type: "ai",
        content:
          "I've extracted 14 core parameters from the RFQ package. 2 items need your attention:\n\n1. **Turndown ratio** is not specified in the RFQ — typical value is 20%. Shall I assume that?\n2. **O2 target** has two options: < 5 ppmv (standard) or < 1 ppmv (optional). Which should I size for?\n\nYou can review and edit all values in the panel on the right.",
        timestamp: "2025-03-10T09:02:48Z",
        sources: [
          { document: "MAIN SIZING DOC.xlsx", location: "INPUT sheet" },
          {
            document: "Technical Specification",
            location: "Sections 3.2-5.5",
          },
        ],
      },
    ],
  },

  // Step 7: User answers
  {
    delay: 6000,
    messages: [
      {
        id: "msg-h2-008",
        projectId: "proj-jc-h2",
        type: "user",
        content: "Use 20% turndown and size for < 5 ppmv standard",
        timestamp: "2025-03-10T09:05:30Z",
      },
    ],
  },

  // Step 8: AI confirmation
  {
    delay: 2000,
    messages: [
      {
        id: "msg-h2-009",
        projectId: "proj-jc-h2",
        type: "ai",
        content:
          "Got it. I've updated the core values:\n• Turndown ratio → 20%\n• Product O2 target → < 5 ppmv\n\nNow searching for similar past projects...",
        timestamp: "2025-03-10T09:05:45Z",
      },
    ],
  },

  // Step 9: Action banner - similarity
  {
    delay: 1500,
    messages: [
      {
        id: "msg-h2-010",
        projectId: "proj-jc-h2",
        type: "action",
        content: "Running similarity analysis against project database...",
        timestamp: "2025-03-10T09:06:00Z",
      },
    ],
  },

  // Step 10: Similarity reasoning
  {
    delay: 2500,
    messages: [
      {
        id: "msg-h2-011",
        projectId: "proj-jc-h2",
        type: "reasoning",
        content: "",
        timestamp: "2025-03-10T09:06:20Z",
        reasoningLines: [
          "Comparing against historical project database (5 projects)...",
          "Computing similarity vectors across 13 feature dimensions...",
          "HYROS H2 PDU (Arcamind): 92% match",
          "  ✓ Matching: Deoxo+Dryer config, SS316L, ASME VIII, 16 barg, PED Cat IV, molecular sieve",
          "  ✗ Differs: Flow rate (20,009 vs 800 Nm³/h), Feed temp (40 vs 30°C)",
          "  → This is a SCALE VARIANT — existing design can be adapted",
          "JC-H2-PURIF-2024: 78% match (no Deoxo section)",
          "Arcamind-DRYER-2023: 61% match (different pressure, open-loop regen)",
        ],
        reasoningSummary:
          "Best match: HYROS H2 PDU at 92%. Identified as scale variant.",
      },
    ],
  },

  // Step 11: Similarity card
  {
    delay: 2000,
    messages: [
      {
        id: "msg-h2-012",
        projectId: "proj-jc-h2",
        type: "card",
        cardType: "similarity",
        content: "Similar Projects Found",
        timestamp: "2025-03-10T09:07:45Z",
      },
    ],
  },

  // Step 12: AI follow-up on similarity
  {
    delay: 1500,
    messages: [
      {
        id: "msg-h2-013",
        projectId: "proj-jc-h2",
        type: "ai",
        content:
          "HYROS is a strong reference project (92% match). The main difference is the flow rate — your RFQ needs 20,009 Nm³/h vs the 800 Nm³/h HYROS reference (25x scale-up). I'll use the HYROS design as baseline and re-run sizing with the updated parameters.\n\nProceeding to sizing calculations...",
        timestamp: "2025-03-10T09:07:50Z",
      },
    ],
  },

  // Step 13: Action banner - sizing
  {
    delay: 3000,
    messages: [
      {
        id: "msg-h2-014",
        projectId: "proj-jc-h2",
        type: "action",
        content:
          "Running sizing calculations for H2 Purification & Drying Unit...",
        timestamp: "2025-03-10T09:08:10Z",
      },
    ],
  },

  // Step 14: Sizing reasoning
  {
    delay: 3000,
    messages: [
      {
        id: "msg-h2-015",
        projectId: "proj-jc-h2",
        type: "reasoning",
        content: "",
        timestamp: "2025-03-10T09:08:20Z",
        reasoningLines: [
          "Loading HYROS sizing model (Deoxo + Dryer, close-loop regeneration)...",
          "Injecting updated core values: T=40°C, P=16 barg, Flow=20,009 Nm³/h...",
          "Computing Deoxo section:",
          "  O2 inlet = 4,120 ppmv (0.412%)",
          "  Reaction: O2 + 2H2 → 2H2O over Pt/Pd catalyst",
          "  O2 outlet = 0 ppmv — PASS (target < 5 ppmv)",
          "  Outlet temperature = 128.55°C (exothermic reaction heat)",
          "Computing Drying section:",
          "  Dryer inlet moisture = 1,012 ppmv",
          "  Molecular sieve adsorption at 15°C, 15.6 barg",
          "  Outlet moisture = < 5 ppmv — PASS",
          "  Dew point via Antoine equation: -63°C at operating pressure",
          "Sizing equipment:",
          '  Gas-Water Separator: ID 500mm (20"), H 1,924mm',
          "  Deoxo Reactor: ~29.9 barg, 134.5°C, catalyst load ~55 kg",
          "  Drying Towers: 2x ND 250mm, H 2,300mm, SS316L",
          "  Feed Heater: 5.7 kW duty (8 kW installed)",
          "  Regen Heater: 12.7 kW duty",
          "Running consistency check vs RFQ requirements...",
          "✓ All 8 checks PASSED. No inconsistencies found.",
        ],
        reasoningSummary: "Sizing complete. All 8 requirement checks passed.",
      },
    ],
    openPanel: "sizing",
  },

  // Step 15: Sizing card
  {
    delay: 2500,
    messages: [
      {
        id: "msg-h2-016",
        projectId: "proj-jc-h2",
        type: "card",
        cardType: "sizing",
        content: "Sizing Results",
        timestamp: "2025-03-10T09:10:30Z",
      },
    ],
  },

  // Step 16: AI sizing follow-up
  {
    delay: 1500,
    messages: [
      {
        id: "msg-h2-017",
        projectId: "proj-jc-h2",
        type: "ai",
        content:
          "Sizing is complete — all parameters meet RFQ requirements:\n\n• **Deoxo**: 100% O2 conversion (4,120 → 0 ppmv)\n• **Dryer**: Outlet moisture < 5 ppmv, dew point -63°C\n• **Equipment**: 8 major items sized, all within design envelope\n\nAll 8 consistency checks passed. I'll now generate a preliminary P&ID based on these sizing results.",
        timestamp: "2025-03-10T09:10:35Z",
        sources: [
          {
            document: "MAIN SIZING DOC.xlsx",
            location: "OUTPUT CALCOLI DI PROCESSO",
            sheet: "OUTPUT",
          },
        ],
      },
    ],
  },

  // Step 16b: Action banner - P&ID
  {
    delay: 2000,
    messages: [
      {
        id: "msg-h2-pid-action",
        projectId: "proj-jc-h2",
        type: "action",
        content: "Generating preliminary P&ID from sizing results...",
        timestamp: "2025-03-10T09:10:50Z",
      },
    ],
  },

  // Step 16c: P&ID reasoning
  {
    delay: 3000,
    messages: [
      {
        id: "msg-h2-pid-reasoning",
        projectId: "proj-jc-h2",
        type: "reasoning",
        content: "",
        timestamp: "2025-03-10T09:10:55Z",
        reasoningLines: [
          "Generating preliminary P&ID from sizing outputs...",
          "Mapping equipment tags: V-001 (Gas-Water Separator), R-001 (Deoxo Reactor), T-001A/B (Drying Towers)...",
          "Assigning instrument tags: 4 PT, 2 DPT, 6 TT, 2 FT, 2 AT, 3 PSV = 19 instruments",
          "Defining process lines: 12 lines, all SS316L, CL150 rating",
          "Main process path: Battery Limit → V-001 → E-001 → R-001 → E-002 → T-001A/B → F-001 → Product",
          "Regeneration loop: B-001 → E-003 → T-001A/B (standby) → V-002 → B-001",
          "Cross-checking instrument coverage vs process requirements...",
          "✓ All critical measurement points covered (flow, pressure, temperature, purity analyzers)",
          "✓ Safety devices assigned (PSV-001, PSV-002, PSV-003)",
          "Preliminary P&ID ready — 10 equipment, 19 instruments, 12 process lines.",
        ],
        reasoningSummary:
          "P&ID generated: 10 equipment items, 19 instruments, 12 process lines.",
      },
    ],
  },

  // Step 16d: P&ID card
  {
    delay: 2500,
    messages: [
      {
        id: "msg-h2-pid-card",
        projectId: "proj-jc-h2",
        type: "card",
        cardType: "pid",
        content: "P&ID - H2 Purification & Drying Unit",
        timestamp: "2025-03-10T09:11:30Z",
      },
    ],
    openPanel: "pid",
  },

  // Step 16e: AI P&ID follow-up
  {
    delay: 1500,
    messages: [
      {
        id: "msg-h2-pid-followup",
        projectId: "proj-jc-h2",
        type: "ai",
        content:
          "Preliminary P&ID is ready (Dwg JC-H2-2025-PID-001, Rev A). Key highlights:\n\n• **10 equipment items** — from Gas-Water Separator to Particle Filter\n• **19 instruments** — full coverage including O2 and moisture analyzers\n• **12 process lines** — all SS316L, CL150, ASME B31.3\n• **Regeneration loop** — closed-loop with blower B-001 and heater E-003\n\nYou can view the full equipment list, instrument schedule, and line list in the panel on the right. Shall I proceed to costing?",
        timestamp: "2025-03-10T09:11:35Z",
        sources: [
          {
            document: "MAIN SIZING DOC.xlsx",
            location: "Equipment sizing outputs",
            sheet: "OUTPUT",
          },
          {
            document: "Technical Specification",
            location: "Section 5 - Design Codes",
          },
        ],
      },
    ],
  },

  // Step 17: User says yes to costing
  {
    delay: 5000,
    messages: [
      {
        id: "msg-h2-018",
        projectId: "proj-jc-h2",
        type: "user",
        content: "Yes, run costing",
        timestamp: "2025-03-10T09:12:30Z",
      },
    ],
  },

  // Step 18: Action banner - costing
  {
    delay: 1500,
    messages: [
      {
        id: "msg-h2-019",
        projectId: "proj-jc-h2",
        type: "action",
        content:
          "Generating cost breakdown based on HYROS reference + current supplier pricing...",
        timestamp: "2025-03-10T09:12:40Z",
      },
    ],
  },

  // Step 19: Costing reasoning
  {
    delay: 3000,
    messages: [
      {
        id: "msg-h2-020",
        projectId: "proj-jc-h2",
        type: "reasoning",
        content: "",
        timestamp: "2025-03-10T09:12:50Z",
        reasoningLines: [
          "Loading HYROS cost baseline (EUR 1,199,652 across 38 line items)...",
          "Scaling structural costs by weight ratio (flow-adjusted)...",
          "Checking current supplier pricing:",
          '  Filter cartridges: MBN P 020 20" = EUR 9.40/pc (catalog 2024)',
          "  Manual valves (40 units): EUR 63,120 from HYROS reference",
          "  Instrumentation package: EUR 296,403 (18 XV valves, 3 PSV, analyzers, PLC)",
          "⚠ FLAG: Catalyst DEOXO cost = EUR 0 in reference — needs supplier quote",
          "⚠ FLAG: Molecular Sieves (6 charges) cost = EUR 0 — needs supplier quote",
          "Computing totals: EUR 1,199,652 base cost",
          "Margin analysis at 25%: Selling price = EUR 1,599,536",
        ],
        reasoningSummary:
          "Total cost EUR 1.2M. 2 items need supplier confirmation.",
      },
    ],
    openPanel: "costing",
  },

  // Step 20: Costing card
  {
    delay: 2000,
    messages: [
      {
        id: "msg-h2-021",
        projectId: "proj-jc-h2",
        type: "card",
        cardType: "costing",
        content: "Cost Breakdown",
        timestamp: "2025-03-10T09:14:20Z",
      },
    ],
  },

  // Step 21: AI costing follow-up
  {
    delay: 1500,
    messages: [
      {
        id: "msg-h2-022",
        projectId: "proj-jc-h2",
        type: "ai",
        content:
          "Cost estimate is **EUR 1,199,652** based on the HYROS reference project. Key highlights:\n\n• Largest cost drivers: Equipment (27%) and Instrumentation (25%)\n• **2 items require fresh supplier quotes**: Deoxo catalyst (Johnson Matthey) and molecular sieve charges (BASF/UOP)\n• I've prepared draft emails for both suppliers\n• At 25% margin, the selling price would be **EUR 1,599,536**\n\nWant me to generate the offer documents?",
        timestamp: "2025-03-10T09:14:25Z",
        sources: [
          {
            document: "costs sizing .xlsx",
            location: "Proposal Cost Report",
          },
        ],
      },
    ],
  },

  // Step 22: User requests documents
  {
    delay: 6000,
    messages: [
      {
        id: "msg-h2-023",
        projectId: "proj-jc-h2",
        type: "user",
        content: "Generate both the hardware offer and services offer",
        timestamp: "2025-03-10T09:16:00Z",
      },
    ],
  },

  // Step 23: Action banner - documents
  {
    delay: 1500,
    messages: [
      {
        id: "msg-h2-024",
        projectId: "proj-jc-h2",
        type: "action",
        content: "Generating offer documents...",
        timestamp: "2025-03-10T09:16:10Z",
      },
    ],
  },

  // Step 24: Document generation reasoning
  {
    delay: 3000,
    messages: [
      {
        id: "msg-h2-025",
        projectId: "proj-jc-h2",
        type: "reasoning",
        content: "",
        timestamp: "2025-03-10T09:16:15Z",
        reasoningLines: [
          "Generating Hardware Offer...",
          "Template: Arcamind AI Engineering standard format (7 sections)",
          "Filling POS.1: Vertical cartridge filter, SS316L, OD optimized",
          "  ASME Sect. VIII Div 1 (no U-Stamp)",
          "  PED 2014/68/EU Cat IV Module G, CE stamped",
          "  ATEX 2014/34/EU Zone 1,2,21,22, CE/EExd",
          "Inserting pricing from costing results...",
          "Adding spare parts: 100% top cover gasket, 10% bolts (min 2 sets)",
          "Adding NDE: Hydrostatic, 100% RX butt welds, 100% DP fillet, 100% UT",
          "Adding documentation list: 8 deliverables",
          "Commercial: Lead time 12-16 weeks, Ex-Works, 60 days payment",
          "",
          "Generating Services Offer...",
          "Template: JC Services RFQ response format (8 sections)",
          "Section 1: Spare parts philosophy (operational + critical + commissioning)",
          "Section 2: Preventive maintenance (weekly/monthly/annual schedules)",
          "Section 3: Training plan (FAT/SAT + lifetime, 3 operator profiles)",
          "Section 4: Remote monitoring (PLC/VPN, ML anomaly detection)",
          "Section 5: On-site support (SLA: 72h response, EUR 500/day penalty)",
          "Section 6: Online support (24/7, 4h response SLA)",
          "Section 7: Predictive maintenance (IoT, 6-step implementation)",
          "Section 8: H&S compliance, GDPR, AES-256 encryption",
        ],
        reasoningSummary:
          "Generated hardware offer (7 sections) and services offer (8 sections).",
      },
    ],
  },

  // Step 25: Hardware document card
  {
    delay: 2500,
    messages: [
      {
        id: "msg-h2-026",
        projectId: "proj-jc-h2",
        type: "card",
        cardType: "document",
        content: "Hardware Offer Document",
        timestamp: "2025-03-10T09:18:30Z",
      },
    ],
    openPanel: "document_hardware",
  },

  // Step 26: Services document card
  {
    delay: 1500,
    messages: [
      {
        id: "msg-h2-027",
        projectId: "proj-jc-h2",
        type: "card",
        cardType: "document",
        content: "Services Offer Document",
        timestamp: "2025-03-10T09:18:35Z",
      },
    ],
  },

  // Step 27: AI wrap-up
  {
    delay: 1500,
    messages: [
      {
        id: "msg-h2-028",
        projectId: "proj-jc-h2",
        type: "ai",
        content:
          "Both documents are ready for review:\n\n📋 **Hardware Offer** — Arcamind standard format with PED/ATEX compliance, NDE testing, documentation list, and commercial terms\n📋 **Services Offer** — Addresses all 14 requirements from the George Fox RFQ including spare parts, PM plan, training, remote monitoring, and SLAs\n\nClick the document cards above to preview. All changes are tracked in version history.\n\nIs there anything you'd like me to adjust?",
        timestamp: "2025-03-10T09:18:40Z",
        sources: [
          {
            document: "Client_Offer_20250717_045538.pdf",
            location: "Offer template",
          },
          {
            document: "Services Requirements",
            location: "JC RFQ Sections 1-14",
          },
        ],
      },
    ],
  },
];

export const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  "proj-hyros": [
    {
      id: "msg-hyros-001",
      projectId: "proj-hyros",
      type: "ai",
      content:
        "The HYROS H2 PDU project is complete. Sizing, costing, and offer documents are all available for reference. You can browse the project data using the panels on the right.",
      timestamp: "2024-11-15T14:30:00Z",
    },
  ],
  "proj-asco": [
    {
      id: "msg-asco-001",
      projectId: "proj-asco",
      type: "ai",
      content:
        "The Arcamind Filtration project has been won. Offer documents and full version history are available for review in the side panels.",
      timestamp: "2025-01-22T10:00:00Z",
    },
  ],
  "proj-jc-h2": [],
  "proj-gas-dryer": [
    {
      id: "msg-gd-001",
      projectId: "proj-gas-dryer",
      type: "ai",
      content:
        "Welcome to the Adriatic GDU project. I've loaded 2 RFQ documents from Arcamind Solutions for the Gas Dehydration Package Unit (Molecular Sieve technology, 50 MMSCFD design).\n\n• PSR – Project Specific Requirements (ARC-AGP-2026-007-PSR-GDU-001)\n• RFQ – Request for Quotation (ARC-AGP-2026-007-RFQ-GAS-DRY-001)\n\nI can help you analyze the requirements, extract core parameters, discuss sizing, estimate costs, or draft offer documents. What would you like to start with?",
      timestamp: "2026-03-12T09:00:00Z",
    },
  ],
  "proj-h2pdu": [
    {
      id: "msg-h2pdu-001",
      projectId: "proj-h2pdu",
      type: "ai",
      content:
        "Welcome to the Al Dhafra H2 PDU project. I've loaded 2 RFQ documents from Arcamind for the Hydrogen Purification & Drying Unit (Deoxo + TSA, 10,000 Nm³/h, ISO 14687:2019 Grade 4.0).\n\n• PSR – Project Specific Requirements (MPE-AGHP-2026-003-PSR-HPDU-001)\n• RFQ – Request for Quotation (MPE-AGHP-2026-003-RFQ-HPDU-001)\n\nI can help you analyze the RFQ, extract design parameters, discuss the Deoxo/TSA sizing, estimate costs, or draft your technical and commercial offer. What would you like to do?",
      timestamp: "2026-03-12T09:00:00Z",
    },
  ],
};
