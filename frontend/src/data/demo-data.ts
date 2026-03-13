import type {
  CoreValuesData,
  SimilarityData,
  SizingData,
  CostingData,
  DocumentData,
  PidData,
} from "@/lib/types";

export const CORE_VALUES_H2: CoreValuesData = {
  values: [
    {
      key: "plant_type",
      label: "Plant Type",
      value: "Hydrogen Purification & Drying Unit (Deoxo + Dryer)",
      unit: "",
      confidence: "high",
      source: {
        document: "MAIN SIZING DOC.xlsx",
        location: "INPUT sheet",
        sheet: "INPUT",
      },
    },
    {
      key: "feed_temperature",
      label: "Feed Temperature",
      value: "40",
      unit: "°C",
      confidence: "high",
      source: {
        document: "MAIN SIZING DOC.xlsx",
        location: "INPUT sheet, Row 16",
        sheet: "INPUT",
        cell: "C16",
      },
    },
    {
      key: "feed_pressure",
      label: "Feed Pressure",
      value: "16",
      unit: "barg",
      confidence: "high",
      source: {
        document: "MAIN SIZING DOC.xlsx",
        location: "INPUT sheet, Row 17",
        sheet: "INPUT",
        cell: "C17",
      },
    },
    {
      key: "feed_flow_design",
      label: "Feed Flow (Design)",
      value: "20,009",
      unit: "Nm³/h",
      confidence: "high",
      source: {
        document: "MAIN SIZING DOC.xlsx",
        location: "INPUT sheet, Row 14",
        sheet: "INPUT",
        cell: "C14",
      },
    },
    {
      key: "feed_h2",
      label: "Feed Composition - H2",
      value: "99.58",
      unit: "mol%",
      confidence: "high",
      source: {
        document: "MAIN SIZING DOC.xlsx",
        location: "INPUT sheet, Row 21",
        sheet: "INPUT",
        cell: "C21",
      },
    },
    {
      key: "feed_o2",
      label: "Feed Composition - O2",
      value: "0.41",
      unit: "mol%",
      confidence: "high",
      source: {
        document: "MAIN SIZING DOC.xlsx",
        location: "INPUT sheet, Row 22",
        sheet: "INPUT",
        cell: "C22",
      },
    },
    {
      key: "water_dew_point",
      label: "Water Dew Point",
      value: "40",
      unit: "°C",
      confidence: "high",
      source: {
        document: "MAIN SIZING DOC.xlsx",
        location: "INPUT sheet, Row 18",
        sheet: "INPUT",
        cell: "C18",
      },
    },
    {
      key: "product_o2_target",
      label: "Product O2 Target",
      value: "< 5 (1 optional)",
      unit: "ppmv",
      confidence: "medium",
      warning:
        "Ambiguous - spec says < 5 ppmv standard or < 1 ppmv optional",
      source: {
        document: "Technical Specification",
        location: "Section 4.2, Page 8",
      },
    },
    {
      key: "product_purity_standard",
      label: "Product Purity Standard",
      value: "ISO 14687:2019 / SAE J2719",
      unit: "",
      confidence: "high",
      source: {
        document: "Technical Specification",
        location: "Section 4.3",
      },
    },
    {
      key: "design_code",
      label: "Design Code",
      value: "ASME Sect. VIII Div 1",
      unit: "",
      confidence: "high",
      source: {
        document: "Technical Specification",
        location: "Section 5.1",
      },
    },
    {
      key: "material",
      label: "Material",
      value: "SS316 / 316L",
      unit: "",
      confidence: "high",
      source: {
        document: "Technical Specification",
        location: "Section 5.3",
      },
    },
    {
      key: "atex_zone",
      label: "ATEX Zone",
      value: "1, 2, 21, 22",
      unit: "",
      confidence: "high",
      source: {
        document: "Technical Specification",
        location: "Section 5.4",
      },
    },
    {
      key: "ped_category",
      label: "PED Category",
      value: "IV Module G",
      unit: "",
      confidence: "high",
      source: {
        document: "Technical Specification",
        location: "Section 5.5",
      },
    },
    {
      key: "turndown_ratio",
      label: "Turndown Ratio",
      value: "Not specified",
      unit: "%",
      confidence: "low",
      warning: "Not found in RFQ - typical value is 20%",
      source: {
        document: "Technical Specification",
        location: "Not found",
      },
    },
  ],
  missingCount: 1,
  warningCount: 2,
};

export const SIMILARITY_RESULTS: SimilarityData = {
  projects: [
    {
      name: "HYROS H2 PDU",
      client: "Arcamind",
      matchPercentage: 92,
      systemType: "H2_PURIFICATION_DRYING",
      matchingFeatures: [
        "Deoxo + Dryer configuration",
        "SS316L construction",
        "ASME Sect. VIII Div 1",
        "16 barg operating pressure",
        "PED Category IV Module G",
        "Molecular sieve drying",
        "Close-loop regeneration",
        "Pt/Pd catalyst Deoxo",
        "2-tower alternating adsorption",
      ],
      differences: [
        "Flow rate: 20,009 vs 800 Nm³/h (25x scale)",
        "Feed temperature: 40°C vs 30°C",
        "Water dew point: 40°C vs 26°C",
      ],
      recommendation:
        "Scale variant - existing design can be adapted. Re-run sizing with updated parameters.",
    },
    {
      name: "JC-H2-PURIF-2024",
      client: "George Fox",
      matchPercentage: 78,
      systemType: "H2_PURIFICATION_DRYING",
      matchingFeatures: [
        "H2 purification",
        "Molecular sieve drying",
        "PED Category IV",
        "SS316L",
      ],
      differences: [
        "No Deoxo section",
        "Different pressure rating (25 barg)",
        "Open-loop regeneration",
      ],
      recommendation: "Partial match - drying section reference only.",
    },
    {
      name: "Arcamind-DRYER-2023",
      client: "Arcamind",
      matchPercentage: 61,
      systemType: "H2_PURIFICATION_DRYING",
      matchingFeatures: [
        "Molecular sieve drying",
        "ASME VIII",
        "SS316L",
      ],
      differences: [
        "No Deoxo section",
        "Different pressure (12 barg)",
        "Open-loop regeneration",
        "Smaller capacity",
      ],
      recommendation: "Limited reference - different configuration.",
    },
  ],
  decision:
    "HYROS H2 PDU is a strong reference (92% match). Main difference is flow rate (25x scale). Proceeding with HYROS as baseline, re-running sizing with updated parameters.",
};

export const SIZING_RESULTS_H2: SizingData = {
  inputs: [
    { name: "Feed Temperature", value: "40", unit: "°C" },
    { name: "Feed Pressure", value: "16", unit: "barg" },
    { name: "Feed Flow", value: "20,009", unit: "Nm³/h" },
    { name: "H2 Composition", value: "99.58", unit: "mol%" },
    { name: "O2 Composition", value: "0.41", unit: "mol%" },
    { name: "Water Dew Point", value: "40", unit: "°C" },
    { name: "Turndown Ratio", value: "20", unit: "%" },
    { name: "Product O2 Target", value: "< 5", unit: "ppmv" },
  ],
  outputs: [
    { name: "O2 Inlet Concentration", value: "4,120", unit: "ppmv" },
    { name: "O2 Outlet Concentration", value: "0", unit: "ppmv" },
    { name: "Deoxo Conversion", value: "100", unit: "%" },
    { name: "Deoxo Outlet Temperature", value: "128.55", unit: "°C" },
    { name: "Dryer Inlet Moisture", value: "1,012", unit: "ppmv" },
    { name: "Dryer Outlet Moisture", value: "< 5", unit: "ppmv" },
    { name: "Product Dew Point", value: "-63", unit: "°C" },
    { name: "Expected ΔP", value: "0.3", unit: "bar" },
    { name: "Guaranteed ΔP", value: "0.5", unit: "bar" },
  ],
  streams: [
    {
      id: 1,
      name: "Feed Gas (Inlet)",
      temperature: "40",
      pressure: "16.0",
      molecularWeight: "2.04",
      flowRate: "20,009",
      h2Pct: "99.58",
      o2Ppm: "4,120",
      h2oPpm: "saturated",
    },
    {
      id: 2,
      name: "After Separator",
      temperature: "40",
      pressure: "15.9",
      molecularWeight: "2.04",
      flowRate: "20,009",
      h2Pct: "99.58",
      o2Ppm: "4,120",
      h2oPpm: "1,012",
    },
    {
      id: 3,
      name: "Deoxo Inlet (Heated)",
      temperature: "80",
      pressure: "15.8",
      molecularWeight: "2.04",
      flowRate: "20,009",
      h2Pct: "99.58",
      o2Ppm: "4,120",
      h2oPpm: "450",
    },
    {
      id: 4,
      name: "Deoxo Outlet",
      temperature: "128.55",
      pressure: "15.5",
      molecularWeight: "2.02",
      flowRate: "19,926",
      h2Pct: "99.95",
      o2Ppm: "0",
      h2oPpm: "8,240",
    },
    {
      id: 5,
      name: "Dryer Inlet (Cooled)",
      temperature: "40",
      pressure: "15.4",
      molecularWeight: "2.02",
      flowRate: "19,926",
      h2Pct: "99.95",
      o2Ppm: "0",
      h2oPpm: "1,012",
    },
    {
      id: 6,
      name: "Product Gas",
      temperature: "15",
      pressure: "15.1",
      molecularWeight: "2.02",
      flowRate: "19,926",
      h2Pct: "99.95",
      o2Ppm: "0",
      h2oPpm: "< 5",
    },
  ],
  equipment: [
    {
      name: "Gas-Water Separator",
      type: "Vertical Vessel",
      dimensions: "ID 500mm (20\"), H 1,924mm",
      material: "SS316L",
      designPressure: "30 barg",
      designTemperature: "80°C",
    },
    {
      name: "Deoxo Reactor",
      type: "Catalytic Reactor",
      dimensions: "ID 600mm, H 2,100mm",
      material: "SS316L",
      designPressure: "29.9 barg",
      designTemperature: "134.5°C",
    },
    {
      name: "Drying Tower A",
      type: "Adsorption Column",
      dimensions: "ND 250mm, H 2,300mm",
      material: "SS316L",
      designPressure: "29.6 barg",
      designTemperature: "230°C",
    },
    {
      name: "Drying Tower B",
      type: "Adsorption Column",
      dimensions: "ND 250mm, H 2,300mm",
      material: "SS316L",
      designPressure: "29.6 barg",
      designTemperature: "230°C",
    },
    {
      name: "Feed Heater",
      type: "Electric Heater",
      dimensions: "5.7 kW duty (8 kW installed)",
      material: "SS316L",
      designPressure: "30 barg",
      designTemperature: "80°C",
    },
    {
      name: "Regeneration Heater",
      type: "Electric Heater",
      dimensions: "12.7 kW duty",
      material: "SS316L",
      designPressure: "30 barg",
      designTemperature: "250°C",
    },
    {
      name: "KO Drum",
      type: "Vertical Vessel",
      dimensions: "ID 250mm (10\"), H 900mm",
      material: "SS316L",
      designPressure: "30 barg",
      designTemperature: "80°C",
    },
    {
      name: "Particle Filter",
      type: "Inline Filter",
      dimensions: "2 μm, DN50",
      material: "SS316L",
      designPressure: "30 barg",
      designTemperature: "60°C",
    },
  ],
  checks: [
    {
      parameter: "O2 Outlet",
      requirement: "< 5 ppmv",
      actual: "0 ppmv",
      status: "pass",
    },
    {
      parameter: "Product Dew Point",
      requirement: "< -40°C",
      actual: "-63°C",
      status: "pass",
    },
    {
      parameter: "Pressure Drop",
      requirement: "< 0.5 bar",
      actual: "0.3 bar",
      status: "pass",
    },
    {
      parameter: "Outlet Temperature",
      requirement: "11-40°C",
      actual: "15°C",
      status: "pass",
    },
    {
      parameter: "Material Compatibility",
      requirement: "SS316/316L",
      actual: "SS316L",
      status: "pass",
    },
    {
      parameter: "Design Code",
      requirement: "ASME VIII Div 1",
      actual: "ASME VIII Div 1",
      status: "pass",
    },
    {
      parameter: "Turndown Capability",
      requirement: "20%",
      actual: "20% (160 Nm³/h min)",
      status: "pass",
    },
    {
      parameter: "PED Compliance",
      requirement: "Cat IV Module G",
      actual: "Cat IV Module G",
      status: "pass",
    },
  ],
};

export const COSTING_RESULTS_H2: CostingData = {
  totalCost: 1199652,
  targetMargin: 25,
  sellingPrice: 1599536,
  categories: [
    {
      name: "Equipment Supply",
      cost: 325800,
      percentage: 27.2,
      items: [
        { description: "Deoxo Reactor", quantity: 1, unitCost: 85000, totalCost: 85000, needsConfirmation: false },
        { description: "Drying Towers (2x)", quantity: 2, unitCost: 62000, totalCost: 124000, needsConfirmation: false },
        { description: "Gas-Water Separator", quantity: 1, unitCost: 45000, totalCost: 45000, needsConfirmation: false },
        { description: "KO Drum", quantity: 1, unitCost: 28000, totalCost: 28000, needsConfirmation: false },
        { description: "Particle Filter", quantity: 1, unitCost: 15800, totalCost: 15800, needsConfirmation: false },
        { description: "Heat Exchangers", quantity: 3, unitCost: 9333, totalCost: 28000, needsConfirmation: false },
      ],
    },
    {
      name: "Instrumentation Supply",
      cost: 296403,
      percentage: 24.7,
      items: [
        { description: "XV Control Valves", quantity: 18, unitCost: 7400, totalCost: 133200, needsConfirmation: false },
        { description: "PSV Safety Valves", quantity: 3, unitCost: 1800, totalCost: 5400, needsConfirmation: false },
        { description: "Temperature Transmitters", quantity: 12, unitCost: 2200, totalCost: 26400, needsConfirmation: false },
        { description: "Pressure Transmitters", quantity: 8, unitCost: 2800, totalCost: 22400, needsConfirmation: false },
        { description: "Flow Meters", quantity: 4, unitCost: 8500, totalCost: 34000, needsConfirmation: false },
        { description: "Analyzer (O2/H2O)", quantity: 2, unitCost: 18000, totalCost: 36000, needsConfirmation: false },
        { description: "PLC + HMI Package", quantity: 1, unitCost: 39003, totalCost: 39003, needsConfirmation: false },
      ],
    },
    {
      name: "Machinery Supply",
      cost: 163000,
      percentage: 13.6,
      items: [
        { description: "Catalyst DEOXO (Pt/Pd)", quantity: 1, unitCost: 0, totalCost: 0, supplier: "Johnson Matthey", needsConfirmation: true },
        { description: "Molecular Sieves (6 charges)", quantity: 6, unitCost: 0, totalCost: 0, supplier: "BASF / UOP", needsConfirmation: true },
        { description: "Electric Heaters", quantity: 3, unitCost: 22000, totalCost: 66000, needsConfirmation: false },
        { description: "Regeneration Blower", quantity: 1, unitCost: 35000, totalCost: 35000, needsConfirmation: false },
        { description: "Miscellaneous Machinery", quantity: 1, unitCost: 62000, totalCost: 62000, needsConfirmation: false },
      ],
    },
    {
      name: "Manual Valves",
      cost: 63120,
      percentage: 5.3,
      items: [
        { description: "Gate Valves (various sizes)", quantity: 24, unitCost: 1480, totalCost: 35520, needsConfirmation: false },
        { description: "Globe Valves", quantity: 12, unitCost: 1550, totalCost: 18600, needsConfirmation: false },
        { description: "Check Valves", quantity: 8, unitCost: 1125, totalCost: 9000, needsConfirmation: false },
      ],
    },
    {
      name: "Structures (Supply + Fab)",
      cost: 113199,
      percentage: 9.4,
      items: [
        { description: "Skid Frame (carbon steel)", quantity: 1, unitCost: 68000, totalCost: 68000, needsConfirmation: false },
        { description: "Support Structures", quantity: 1, unitCost: 25199, totalCost: 25199, needsConfirmation: false },
        { description: "Ladders & Platforms", quantity: 1, unitCost: 20000, totalCost: 20000, needsConfirmation: false },
      ],
    },
    {
      name: "Piping (Supply + Fab)",
      cost: 75856,
      percentage: 6.3,
      items: [
        { description: "SS316L Piping", quantity: 1, unitCost: 45000, totalCost: 45000, needsConfirmation: false },
        { description: "Fittings & Flanges", quantity: 1, unitCost: 18856, totalCost: 18856, needsConfirmation: false },
        { description: "Pipe Supports", quantity: 1, unitCost: 12000, totalCost: 12000, needsConfirmation: false },
      ],
    },
    {
      name: "Fabrication / Tests",
      cost: 80384,
      percentage: 6.7,
      items: [
        { description: "NDE (RX + DP + UT)", quantity: 1, unitCost: 32000, totalCost: 32000, needsConfirmation: false },
        { description: "Hydrostatic Testing", quantity: 1, unitCost: 12000, totalCost: 12000, needsConfirmation: false },
        { description: "PWHT", quantity: 1, unitCost: 8384, totalCost: 8384, needsConfirmation: false },
        { description: "Assembly & Welding", quantity: 1, unitCost: 28000, totalCost: 28000, needsConfirmation: false },
      ],
    },
    {
      name: "Engineering",
      cost: 56500,
      percentage: 4.7,
      items: [
        { description: "Process Engineering", quantity: 1, unitCost: 22000, totalCost: 22000, needsConfirmation: false },
        { description: "Mechanical Design", quantity: 1, unitCost: 18000, totalCost: 18000, needsConfirmation: false },
        { description: "Instrumentation Design", quantity: 1, unitCost: 10500, totalCost: 10500, needsConfirmation: false },
        { description: "Project Management", quantity: 1, unitCost: 6000, totalCost: 6000, needsConfirmation: false },
      ],
    },
    {
      name: "Other Costs",
      cost: 25390,
      percentage: 2.1,
      items: [
        { description: "Packing & Transport", quantity: 1, unitCost: 15000, totalCost: 15000, needsConfirmation: false },
        { description: "Documentation", quantity: 1, unitCost: 6390, totalCost: 6390, needsConfirmation: false },
        { description: "Insurance", quantity: 1, unitCost: 4000, totalCost: 4000, needsConfirmation: false },
      ],
    },
  ],
  supplierConfirmations: [
    {
      item: "Catalyst DEOXO (Pt/Pd)",
      supplier: "Johnson Matthey",
      status: "pending",
      estimatedCost: 45000,
      draftEmail:
        "Subject: RFQ - Platinum/Palladium Deoxo Catalyst\n\nDear Johnson Matthey Sales Team,\n\nWe are preparing an offer for a Hydrogen Purification Unit and require a quotation for:\n\n- Deoxo catalyst (Pt/Pd on alumina carrier)\n- Estimated quantity: 55 kg\n- Application: O2 removal from H2 stream\n- Operating conditions: 29.9 barg, 134.5°C max\n- Required delivery: 12-16 weeks\n\nPlease provide pricing, lead time, and minimum order quantity.\n\nBest regards",
    },
    {
      item: "Molecular Sieves (6 charges)",
      supplier: "BASF / UOP",
      status: "pending",
      estimatedCost: 52000,
      draftEmail:
        "Subject: RFQ - Molecular Sieve for H2 Drying\n\nDear BASF Catalysts Team,\n\nWe require a quotation for molecular sieves for a Hydrogen Drying Unit:\n\n- Type: 3A or 4A molecular sieve\n- Quantity: 6 full charges\n- Tower dimensions: ND 250mm, H 2,300mm\n- Operating conditions: 29.6 barg, adsorption at 10°C, regen at 230°C\n- H2O removal: from 1,012 ppmv to < 5 ppmv\n\nPlease provide pricing per charge, lead time, and expected lifetime.\n\nBest regards",
    },
  ],
};

export const HARDWARE_OFFER_DATA: DocumentData = {
  type: "hardware",
  title: "Hardware Offer - Vertical Cartridge Filter System",
  status: "draft",
  sections: [
    {
      title: "Equipment Description",
      content: "Technical specification for the Vertical Cartridge Filter System per Arcamind AI Engineering design standards.",
      subsections: [
        {
          title: "POS. 1 - Vertical Cartridge Filter",
          content:
            "Vertical cartridge filter vessel, manufactured in SS316L with optimised outer diameter for minimum wall thickness. All nozzles are ANSI flanged connections. Design per ASME Section VIII Division 1 (no U-Stamp). Internal surfaces electropolished Ra ≤ 0.8 μm. Factory acceptance testing includes hydrostatic test, helium leak test, and dimensional inspection.",
        },
        {
          title: "Cartridges",
          content:
            "Polypropylene melt-blown cartridges, 20 μm nominal filtration rating. Standard cartridge dimensions: 2.5\" OD × 30\" length, DOE (double open end) configuration. Quantity per vessel: 12 cartridges. Maximum differential pressure: 2.5 bar clean, 4.0 bar fouled.",
        },
      ],
    },
    {
      title: "Compliance & Certifications",
      content: "All equipment designed and manufactured in compliance with applicable European directives.",
      subsections: [
        {
          title: "PED 2014/68/EU",
          content:
            "Pressure Equipment Directive Category IV, Module G (EU-type examination with production quality assurance). CE marking applied. Notified Body involvement for design review and final inspection. Full documentation package including strength calculations, material certificates (EN 10204 3.1), and welding procedure qualifications (WPS/WPQR).",
        },
        {
          title: "ATEX 2014/34/EU",
          content:
            "Equipment suitable for installation in ATEX Zone 1, 2, 21, and 22. CE marking with Ex classification per IECEx/ATEX. All electrical components certified EExd (flameproof enclosure). Earthing/bonding provisions included on all conductive parts.",
        },
      ],
    },
    {
      title: "Spare Parts",
      content: "Recommended spare parts for commissioning and initial 2-year operation period.",
      subsections: [
        {
          title: "Commissioning Spares",
          content:
            "100% top cover gasket set (1 full set). Bolting: minimum 10% of total, minimum 2 complete sets. O-ring kit for all cartridge sealing points. Cartridge set: 1 complete replacement set (12 pcs).",
        },
        {
          title: "2-Year Operation Spares",
          content:
            "Cartridge replacement sets: 4 sets (12 pcs each) based on 6-month replacement cycle. Gasket sets: 4 complete sets. Drain valve repair kits: 2 sets. Pressure gauge replacement: 2 pcs.",
        },
      ],
    },
    {
      title: "NDE & Testing",
      content:
        "Hydrostatic test at 1.43× design pressure per ASME VIII. 100% radiographic examination (RX) of all butt welds. 100% dye penetrant (DP) inspection of all fillet welds. 100% ultrasonic testing (UT) where applicable per design code requirements. All NDE performed by ASNT Level II certified personnel. Test reports included in final documentation package.",
    },
    {
      title: "Documentation",
      content:
        "Complete documentation package includes: detailed fabrication drawing (GA + sectional views), mechanical calculation report per ASME VIII, nozzle load calculation, wind and seismic load calculation per site-specific requirements, final testing book comprising visual and dimensional certification, NDE reports, welding book (WPS, WPQR, welder qualifications), material certificates per EN 10204 Type 3.1, operation and maintenance manual, and recommended spare parts list.",
    },
    {
      title: "Exclusions",
      content:
        "The following items are excluded from this offer: differential pressure gauge and connections, vent and drain valves, isolation valves (inlet/outlet), pressure safety valve (PSV), ladders, platforms and access structures, on-site erection, installation, and commissioning services.",
    },
    {
      title: "Equipment Datasheet",
      content:
        "Key process and mechanical data for all major equipment items.",
      subsections: [
        {
          title: "Vertical Cartridge Filter (POS.1)",
          content:
            "Tag: F-001 | Type: Vertical Pressure Filter | Service: Liquid Filtration\nDesign Code: ASME Sect. VIII Div 1 | PED 2014/68/EU Category IV Module G\nDesign Pressure: 16 barg | Design Temperature: -10/+80°C\nMaterial: SS316L (shell, heads, internals) | Corrosion Allowance: 0 mm (SS)\nConnections: Inlet DN150 CL150 RF | Outlet DN150 CL150 RF | Drain DN50 CL150 RF\nCartridges: 12× PP melt-blown, 20 µm, 2.5\" OD × 30\" L, DOE\nMax ΔP: 2.5 bar (clean) / 4.0 bar (fouled)\nDry Weight: ~1,200 kg | Operating Weight: ~2,800 kg | Hydrotest Weight: ~3,400 kg",
        },
        {
          title: "Mechanical Calculations Summary",
          content:
            "Shell thickness: Calculated per ASME VIII UG-27. Min required: 6.2 mm, nominal: 8 mm.\nHead thickness: 2:1 SE head per UG-32, min required: 5.8 mm, nominal: 8 mm.\nNozzle reinforcement: All nozzles checked per UG-36 through UG-42.\nWind/seismic: Per site-specific requirements (to be confirmed at AFC).\nHydrostatic test pressure: 1.43× design = 22.9 barg, hold 30 min minimum.",
        },
      ],
    },
    {
      title: "P&ID Reference",
      content:
        "Process and Instrumentation Diagram summary for the Vertical Cartridge Filter system.",
      subsections: [
        {
          title: "P&ID Tag Summary",
          content:
            "Process Lines: L-001 (Inlet, 6\" CL150, SS316L) | L-002 (Outlet, 6\" CL150, SS316L) | L-003 (Drain, 2\" CL150, SS316L)\nInstruments: PI-001 (Inlet Pressure Indicator) | PI-002 (Outlet Pressure Indicator) | DPI-001 (Differential Pressure Indicator, 0–5 bar) | TI-001 (Temperature Indicator, Inlet)\nValves: XV-001 (Inlet Isolation, Ball, CL150) | XV-002 (Outlet Isolation, Ball, CL150) | XV-003 (Drain Valve, Ball, CL150) | XV-004 (Vent Valve, 1\" CL150)\nSafety: PSV-001 (Pressure Safety Valve, set at MAWP) — excluded from this offer scope",
        },
        {
          title: "Process Flow Description",
          content:
            "Feed liquid enters through the inlet nozzle (top or side, per GA drawing) and flows downward through the cartridge bundle. Particulates ≥ 20 µm are captured on the outer surface of the polypropylene cartridges. Filtered liquid exits through the outlet nozzle at the bottom. Differential pressure across the cartridge bundle is monitored continuously — when ΔP reaches 4.0 bar, cartridge replacement is required. The vessel can be drained via the bottom drain for cartridge change-out. A vent connection at the top allows air release during initial fill.",
        },
      ],
    },
    {
      title: "Commercial Conditions",
      content: "Standard commercial terms for equipment supply.",
      subsections: [
        {
          title: "Lead Time",
          content: "12-16 weeks from order confirmation and receipt of approved-for-fabrication drawings.",
        },
        {
          title: "Delivery",
          content: "Ex-Works Binasco (MI), Italy. Incoterms 2020.",
        },
        {
          title: "Packing",
          content: "Seaworthy packing suitable for overseas transport. Nitrogen-purged and sealed for corrosion protection.",
        },
        {
          title: "Payment Terms",
          content: "30% advance with order confirmation. 60% upon notification of ready for inspection. 10% within 30 days of delivery.",
        },
        {
          title: "Validity",
          content: "This offer is valid for 60 calendar days from date of issue.",
        },
      ],
    },
  ],
};

export const PID_H2_DATA: PidData = {
  title: "P&ID - H2 Purification & Drying Unit",
  drawingNumber: "JC-H2-2025-PID-001",
  revision: "A (Preliminary)",
  equipment: [
    { tag: "V-001", name: "Gas-Water Separator", type: "Vertical Vessel", size: "ID 500 mm, H 1,924 mm", designConditions: "30 barg / 80°C" },
    { tag: "E-001", name: "Feed Heater", type: "Electric Heater", size: "5.7 kW (8 kW installed)", designConditions: "30 barg / 80°C" },
    { tag: "R-001", name: "Deoxo Reactor", type: "Catalytic Reactor (Pt/Pd)", size: "ID 600 mm, H 2,100 mm", designConditions: "29.9 barg / 134.5°C" },
    { tag: "E-002", name: "Hydrogen Cooler", type: "Shell & Tube HX", size: "Duty ~18 kW", designConditions: "30 barg / 150°C" },
    { tag: "T-001A", name: "Drying Tower A", type: "Adsorption Column (Mol Sieve 3A)", size: "ND 250 mm, H 2,300 mm", designConditions: "29.6 barg / 230°C" },
    { tag: "T-001B", name: "Drying Tower B", type: "Adsorption Column (Mol Sieve 3A)", size: "ND 250 mm, H 2,300 mm", designConditions: "29.6 barg / 230°C" },
    { tag: "E-003", name: "Regeneration Heater", type: "Electric Heater", size: "12.7 kW", designConditions: "30 barg / 250°C" },
    { tag: "B-001", name: "Regeneration Blower", type: "Centrifugal Blower", size: "~15 kg/h H2", designConditions: "1.5 barg / 80°C" },
    { tag: "V-002", name: "KO Drum", type: "Vertical Vessel", size: "ID 250 mm, H 900 mm", designConditions: "30 barg / 80°C" },
    { tag: "F-001", name: "Particle Filter", type: "Inline Filter (2 µm)", size: "DN50", designConditions: "30 barg / 60°C" },
  ],
  instruments: [
    { tag: "PT-001", type: "Pressure Transmitter", service: "Feed Gas Inlet", range: "0–30 barg" },
    { tag: "PT-002", type: "Pressure Transmitter", service: "Deoxo Reactor Inlet", range: "0–30 barg" },
    { tag: "PT-003", type: "Pressure Transmitter", service: "Dryer Outlet", range: "0–30 barg" },
    { tag: "PT-004", type: "Pressure Transmitter", service: "Product Gas", range: "0–30 barg" },
    { tag: "DPT-001", type: "Diff. Pressure Transmitter", service: "Deoxo Reactor ΔP", range: "0–1 bar" },
    { tag: "DPT-002", type: "Diff. Pressure Transmitter", service: "Dryer Tower ΔP", range: "0–1 bar" },
    { tag: "TT-001", type: "Temperature Transmitter", service: "Feed Gas", range: "0–80°C" },
    { tag: "TT-002", type: "Temperature Transmitter", service: "Deoxo Inlet (heated)", range: "0–150°C" },
    { tag: "TT-003", type: "Temperature Transmitter", service: "Deoxo Outlet", range: "0–200°C" },
    { tag: "TT-004", type: "Temperature Transmitter", service: "Dryer Inlet", range: "0–80°C" },
    { tag: "TT-005", type: "Temperature Transmitter", service: "Regen Gas (hot)", range: "0–280°C" },
    { tag: "TT-006", type: "Temperature Transmitter", service: "Product Gas", range: "-10–60°C" },
    { tag: "FT-001", type: "Flow Transmitter", service: "Feed Gas Flow", range: "0–25,000 Nm³/h" },
    { tag: "FT-002", type: "Flow Transmitter", service: "Product Gas Flow", range: "0–25,000 Nm³/h" },
    { tag: "AT-001", type: "O2 Analyzer", service: "Product Gas O2", range: "0–100 ppmv" },
    { tag: "AT-002", type: "Moisture Analyzer", service: "Product Gas H2O", range: "0–100 ppmv" },
    { tag: "PSV-001", type: "Pressure Safety Valve", service: "V-001 Overpressure", range: "Set @ 30 barg" },
    { tag: "PSV-002", type: "Pressure Safety Valve", service: "R-001 Overpressure", range: "Set @ 29.9 barg" },
    { tag: "PSV-003", type: "Pressure Safety Valve", service: "T-001A/B Overpressure", range: "Set @ 29.6 barg" },
  ],
  lines: [
    { tag: "L-001", from: "Battery Limit", to: "V-001", size: "4\" (DN100)", spec: "CL150 RF, SS316L" },
    { tag: "L-002", from: "V-001", to: "E-001", size: "4\" (DN100)", spec: "CL150 RF, SS316L" },
    { tag: "L-003", from: "E-001", to: "R-001", size: "4\" (DN100)", spec: "CL150 RF, SS316L" },
    { tag: "L-004", from: "R-001", to: "E-002", size: "4\" (DN100)", spec: "CL150 RF, SS316L" },
    { tag: "L-005", from: "E-002", to: "T-001A/B", size: "3\" (DN80)", spec: "CL150 RF, SS316L" },
    { tag: "L-006", from: "T-001A/B", to: "F-001", size: "2\" (DN50)", spec: "CL150 RF, SS316L" },
    { tag: "L-007", from: "F-001", to: "Battery Limit", size: "2\" (DN50)", spec: "CL150 RF, SS316L" },
    { tag: "L-008", from: "B-001", to: "E-003", size: "2\" (DN50)", spec: "CL150 RF, SS316L" },
    { tag: "L-009", from: "E-003", to: "T-001A/B (regen)", size: "2\" (DN50)", spec: "CL150 RF, SS316L" },
    { tag: "L-010", from: "T-001A/B (regen out)", to: "V-002", size: "2\" (DN50)", spec: "CL150 RF, SS316L" },
    { tag: "L-011", from: "V-002", to: "B-001", size: "2\" (DN50)", spec: "CL150 RF, SS316L" },
    { tag: "L-012", from: "V-002", to: "Drain", size: "1\" (DN25)", spec: "CL150 RF, SS316L" },
  ],
  processDescription: "Feed hydrogen (Stream 1, 40°C, 16 barg, 20,009 Nm³/h) enters Gas-Water Separator V-001 for bulk liquid removal. Gas is heated in E-001 to ~80°C and enters Deoxo Reactor R-001 where O2 is catalytically converted (2H2 + O2 → 2H2O) over Pt/Pd catalyst. Hot product gas (128.55°C) is cooled in E-002 to ~40°C. Cooled gas enters the active Drying Tower (T-001A or T-001B, alternating) where moisture is adsorbed by molecular sieve 3A to < 5 ppmv. Dry product gas passes through Particle Filter F-001 (2 µm) to battery limit.\n\nRegeneration (closed loop): a slip-stream of dry H2 is circulated by Blower B-001 through Heater E-003 (230°C) into the standby tower. Desorbed moisture is condensed and collected in KO Drum V-002. Cycle time: ~8h adsorption / ~4h regeneration per tower.",
  notes: [
    "All piping SS316L per ASME B31.3, CL150 rating minimum",
    "All vessels ASME Sect. VIII Div 1, PED 2014/68/EU Cat IV Module G",
    "ATEX Zone 1/2 classification — all electrical per IECEx/EExd",
    "Instrument signals: 4-20 mA HART to PLC (Siemens S7-1500)",
    "Safety system: SIL 2 for PSVs and ESD functions",
    "Control valves (XV): pneumatic actuated, fail-safe closed",
    "Drawing is PRELIMINARY — subject to detailed engineering review",
  ],
};

export const SERVICES_OFFER_DATA: DocumentData = {
  type: "services",
  title: "Services Offer - H2 Purification & Drying Unit",
  status: "draft",
  sections: [
    {
      title: "Spare Parts Philosophy",
      content:
        "Comprehensive spare parts strategy based on equipment criticality analysis (ISO 14224) and MTBF data from similar Arcamind installations.",
      subsections: [
        {
          title: "Operational Spares",
          content:
            "Consumables and wear parts for routine maintenance: molecular sieve charges (annual replacement), catalyst top-up material (5% per annum), cartridge filter elements, gasket sets for all flanged connections, valve trim kits for control valves.",
        },
        {
          title: "Commissioning Spares",
          content:
            "First-fill materials and start-up consumables: initial molecular sieve charge, catalyst bed (Pt/Pd), calibration gases for analyzers, temporary strainer elements, nitrogen purge gas connections.",
        },
        {
          title: "Critical Spares",
          content:
            "Insurance spares for high-criticality components: spare control valve (XV) assembly, spare analyzer sensor head (O2 and H2O), spare heater element for regeneration heater, PLC CPU module and I/O cards, spare safety valve (PSV) set.",
        },
      ],
    },
    {
      title: "Preventive Maintenance Plan",
      content:
        "Scheduled maintenance program based on OEM recommendations and operational experience from 15+ similar units.",
      subsections: [
        {
          title: "Weekly Inspections",
          content:
            "Visual inspection of all equipment and piping. Check differential pressures across filters and dryer beds. Verify analyzer readings against portable reference instrument. Review PLC alarm log and trend data. Check heater element resistance and insulation.",
        },
        {
          title: "Monthly Maintenance",
          content:
            "Calibrate all pressure and temperature transmitters. Function test safety valves (partial stroke). Inspect control valve actuators and positioners. Review molecular sieve performance trends (breakthrough time). Lubricate all manual valve stems.",
        },
        {
          title: "Annual Shutdown Maintenance",
          content:
            "Replace molecular sieve charge (both towers). Inspect catalyst bed (sample analysis, pressure drop measurement). Full calibration of all instruments. Internal inspection of separator and KO drum. Thickness measurement of pressure-containing components. Re-certification of safety valves. Electrical inspection of all heaters and motors.",
        },
      ],
    },
    {
      title: "Training Plan",
      content:
        "Structured training program covering all project phases from FAT through lifetime operation.",
      subsections: [
        {
          title: "FAT / SAT / Commissioning Training",
          content:
            "On-site training during FAT (2 days at Arcamind AI Engineering facility): P&ID walkthrough, control philosophy review, safety system testing. SAT training (3 days at client site): installation verification, loop checks, pre-commissioning procedures. Commissioning training (5 days): start-up procedures, normal operation, emergency shutdown, first regeneration cycle supervision.",
        },
        {
          title: "Lifetime Training",
          content:
            "Annual refresher training (1 day): review of operating data, optimization recommendations, updated maintenance procedures. Advanced troubleshooting workshop (2 days, offered every 2 years): root cause analysis of common issues, catalyst and sieve performance evaluation, control system advanced diagnostics.",
        },
      ],
    },
    {
      title: "Remote Monitoring & Support",
      content:
        "24/7 remote monitoring via secure PLC/VPN connection with machine learning anomaly detection.",
      subsections: [
        {
          title: "Connectivity",
          content:
            "Secure VPN tunnel from unit PLC to Arcamind AI Engineering monitoring center. Protocol: OPC-UA over TLS 1.3. Data sampling rate: 1 second for critical parameters, 10 seconds for auxiliary. Estimated data throughput: < 50 MB/day. Firewall configuration provided for client IT review.",
        },
        {
          title: "Analytics & Dashboards",
          content:
            "Real-time dashboards accessible via web portal: unit status overview, performance KPIs (purity, pressure drops, cycle times), energy consumption trends, predictive maintenance indicators. ML-based anomaly detection trained on historical data from Arcamind fleet of H2 purification units. Automated alerts for deviations exceeding ±2σ from expected operating envelope.",
        },
      ],
    },
    {
      title: "On-Site Support",
      content:
        "Dedicated on-site support with guaranteed response times and performance penalties.",
      subsections: [
        {
          title: "Service Level Agreement",
          content:
            "Emergency response: on-site within 72 hours of callout (worldwide). Planned maintenance support: scheduled with minimum 2 weeks notice. Penalty clause: EUR 500/day for response exceeding 72-hour SLA, capped at 10% of annual service contract value.",
        },
        {
          title: "Scope of On-Site Services",
          content:
            "Troubleshooting and fault diagnosis. Catalyst and molecular sieve replacement supervision. Instrument calibration and loop tuning. Annual shutdown maintenance support. Performance guarantee testing assistance.",
        },
      ],
    },
    {
      title: "Online Support",
      content:
        "Round-the-clock remote technical assistance via multiple channels.",
      subsections: [
        {
          title: "Contact Channels",
          content:
            "24/7 emergency hotline (telephone). Email support with 4-hour response SLA during business hours, 8-hour response outside business hours. Secure video conferencing for guided troubleshooting. Access to Arcamind technical knowledge base and FAQ portal.",
        },
        {
          title: "Response SLA",
          content:
            "Critical (unit shutdown): 4 hours initial response, continuous support until resolution. Major (degraded performance): 4 hours initial response, resolution plan within 24 hours. Minor (non-urgent query): 8 hours initial response, resolution within 5 business days.",
        },
      ],
    },
    {
      title: "Predictive Maintenance",
      content:
        "IoT-enabled predictive maintenance program with phased implementation over 12 months.",
      subsections: [
        {
          title: "IoT Sensor Deployment",
          content:
            "Additional wireless vibration sensors on rotating equipment (blower). Acoustic emission sensors on pressure vessels. Corrosion monitoring probes on critical piping. All sensors integrated via MQTT to central analytics platform.",
        },
        {
          title: "6-Step Implementation",
          content:
            "Phase 1 (Month 1-2): Baseline data collection and sensor installation. Phase 2 (Month 3-4): Model training on normal operating data. Phase 3 (Month 5-6): Shadow mode - predictions generated but not acted upon. Phase 4 (Month 7-8): Validation against actual maintenance events. Phase 5 (Month 9-10): Production deployment with operator advisory alerts. Phase 6 (Month 11-12): Optimization and model refinement based on feedback.",
        },
      ],
    },
    {
      title: "Equipment Datasheets – Service Scope",
      content:
        "Summary datasheets for all major equipment items covered under the service agreement.",
      subsections: [
        {
          title: "Deoxo Reactor (R-001)",
          content:
            "Tag: R-001 | Type: Catalytic Fixed-Bed Reactor | Service: H2 Purification (O2 removal)\nDesign Code: ASME Sect. VIII Div 1 | Design Pressure: 29.9 barg | Design Temperature: 134.5°C\nMaterial: SS316/316L | Catalyst: Pt/Pd on alumina, ~55 kg\nInlet: 80°C, 15.8 barg | Outlet: 128.55°C, 15.5 barg\nO2 Conversion: 100% (4,120 ppmv → 0 ppmv) | ΔP Bed: < 0.05 bar",
        },
        {
          title: "Drying Towers (T-001A/B)",
          content:
            "Tag: T-001A/B | Type: Adsorption Column (Molecular Sieve 3A) | Service: H2 Drying\nDesign Code: ASME Sect. VIII Div 1 | Design Pressure: 29.6 barg | Design Temperature: 230°C\nMaterial: SS316L | Adsorbent: Molecular Sieve 3A | Configuration: 2-tower alternating\nDimensions: ND 250 mm, H 2,300 mm | Adsorption: 10°C, 15.4 barg | Regen: 230°C\nInlet Moisture: 1,012 ppmv | Outlet Moisture: < 5 ppmv | Dew Point: -63°C",
        },
      ],
    },
    {
      title: "P&ID Reference – H2 Purification System",
      content:
        "Process and Instrumentation Diagram summary for the H2 Purification & Drying Unit.",
      subsections: [
        {
          title: "Major Equipment Tags",
          content:
            "V-001: Gas-Water Separator (ID 500 mm, H 1,924 mm) | R-001: Deoxo Reactor | E-001: Feed Heater (5.7 kW)\nE-002: Hydrogen Cooler | T-001A/B: Drying Towers (2x, alternating) | E-003: Regen Heater (12.7 kW)\nV-002: KO Drum (ID 250 mm, H 900 mm) | F-001: Particle Filter (2 µm, DN50)\nB-001: Regeneration Blower",
        },
        {
          title: "Process Flow Description",
          content:
            "Feed hydrogen (Stream 1) enters the Gas-Water Separator V-001 for bulk liquid removal. The gas is heated in E-001 to ~80°C before entering the Deoxo Reactor R-001 where O2 is catalytically removed (2H2 + O2 → 2H2O). Hot gas from the reactor (128.55°C) is cooled in E-002 to ~40°C. The cooled gas enters the active Drying Tower (T-001A or T-001B) where moisture is adsorbed by molecular sieve 3A. Dry product gas exits through the Particle Filter F-001 (2 µm). Regeneration of the standby tower uses a heated slip-stream of dry H2 at 230°C, circulated by Blower B-001 through Heater E-003, with condensate collected in KO Drum V-002.",
        },
      ],
    },
    {
      title: "Health, Safety & Data Security",
      content:
        "All services delivered in compliance with applicable safety regulations and data protection standards.",
      subsections: [
        {
          title: "Safety Compliance",
          content:
            "All Arcamind service personnel hold valid safety certifications (BOSIET/HUET for offshore, site-specific inductions). Risk assessments and method statements provided prior to all on-site activities. Full compliance with client site HSE requirements.",
        },
        {
          title: "Data Security",
          content:
            "GDPR-compliant data processing agreement included. All data encrypted at rest (AES-256) and in transit (TLS 1.3). Role-based access control (RBAC) with multi-factor authentication. Data retention policy: 5 years operational data, 10 years safety-critical data. Annual penetration testing of remote access infrastructure.",
        },
      ],
    },
  ],
};
