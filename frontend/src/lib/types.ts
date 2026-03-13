export type ProjectStatus = "new" | "in_progress" | "quoted" | "won" | "lost";
export type SystemType = "H2_PURIFICATION_DRYING" | "FILTRATION_SYSTEM" | "GAS_DEHYDRATION" | "GENERIC";
export type MessageType = "user" | "ai" | "reasoning" | "action" | "card";
export type CardType =
  | "core_values"
  | "similarity"
  | "sizing"
  | "costing"
  | "document"
  | "pid";
export type PanelView =
  | "core_values"
  | "sizing"
  | "costing"
  | "document_hardware"
  | "document_services"
  | "pid"
  | "version_history"
  | null;

export interface Project {
  id: string;
  name: string;
  client: string;
  systemType: SystemType;
  status: ProjectStatus;
  rfqNumber: string;
  createdAt: string;
  updatedAt: string;
  avatarColor: string;
  unreadCount: number;
  description: string;
}

export interface SourceCitation {
  document: string;
  location: string;
  page?: number;
  sheet?: string;
  cell?: string;
}

export interface ChatMessage {
  id: string;
  projectId: string;
  type: MessageType;
  content: string;
  timestamp: string;
  reasoningLines?: string[];
  reasoningSummary?: string;
  cardType?: CardType;
  cardData?: CoreValuesData | SimilarityData | SizingData | CostingData | DocumentData | PidData;
  sources?: SourceCitation[];
  isStreaming?: boolean;
}

export interface CoreValue {
  key: string;
  label: string;
  value: string;
  unit: string;
  source: SourceCitation;
  confidence: "high" | "medium" | "low";
  warning?: string;
}

export interface CoreValuesData {
  values: CoreValue[];
  missingCount: number;
  warningCount: number;
}

export interface SimilarProject {
  name: string;
  client: string;
  matchPercentage: number;
  matchingFeatures: string[];
  differences: string[];
  recommendation: string;
  systemType: SystemType;
}

export interface SimilarityData {
  projects: SimilarProject[];
  decision: string;
}

export interface SizingParameter {
  name: string;
  value: string;
  unit: string;
  source?: string;
}

export interface StreamData {
  id: number;
  name: string;
  temperature: string;
  pressure: string;
  molecularWeight: string;
  flowRate: string;
  h2Pct: string;
  o2Ppm: string;
  h2oPpm: string;
}

export interface EquipmentSizing {
  name: string;
  type: string;
  dimensions: string;
  material: string;
  designPressure: string;
  designTemperature: string;
}

export interface SizingCheck {
  parameter: string;
  requirement: string;
  actual: string;
  status: "pass" | "fail" | "warning";
}

export interface SizingData {
  inputs: SizingParameter[];
  outputs: SizingParameter[];
  streams: StreamData[];
  equipment: EquipmentSizing[];
  checks: SizingCheck[];
}

export interface CostLineItem {
  description: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  supplier?: string;
  needsConfirmation: boolean;
}

export interface CostCategory {
  name: string;
  cost: number;
  percentage: number;
  items: CostLineItem[];
}

export interface CostingData {
  categories: CostCategory[];
  totalCost: number;
  targetMargin: number;
  sellingPrice: number;
  supplierConfirmations: SupplierConfirmation[];
}

export interface SupplierConfirmation {
  item: string;
  supplier: string;
  status: "pending" | "confirmed" | "quoted";
  estimatedCost: number;
  draftEmail?: string;
}

export interface DocumentData {
  type: "hardware" | "services";
  title: string;
  sections: DocumentSection[];
  status: "draft" | "review" | "final";
}

export interface DocumentSection {
  title: string;
  content: string;
  subsections?: { title: string; content: string }[];
}

export interface PidEquipmentItem {
  tag: string;
  name: string;
  type: string;
  size: string;
  designConditions: string;
}

export interface PidInstrumentItem {
  tag: string;
  type: string;
  service: string;
  range: string;
}

export interface PidLineItem {
  tag: string;
  from: string;
  to: string;
  size: string;
  spec: string;
}

export interface PidData {
  title: string;
  drawingNumber: string;
  revision: string;
  equipment: PidEquipmentItem[];
  instruments: PidInstrumentItem[];
  lines: PidLineItem[];
  processDescription: string;
  notes: string[];
}

export interface VersionEntry {
  id: string;
  version: number;
  timestamp: string;
  action: string;
  description: string;
  changes?: string[];
}

export interface DemoStep {
  delay: number;
  messages: ChatMessage[];
  openPanel?: PanelView;
  closePanel?: boolean;
}
