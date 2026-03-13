# EPC Contractors AI - Project Manager POC

AI-powered bid automation platform for SME engineering suppliers in the Oil & Gas supply chain. Reduces time and cost to produce technical and commercial offers for skid/system packages.

## Quick Start

### 1. Frontend Only (Demo Mode)

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000. Click the **JC H2 Purification 2025** project and press **Start Demo** to run the full walkthrough.

### 2. Full Stack with Real AI Backend

```bash
# Terminal 1 — Backend (requires Python 3.11+)
pip install -r backend/requirements.txt
# Make sure .env has ANTHROPIC_API_KEY in the project root
python -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8000

# Terminal 2 — Frontend
cd frontend
npm install
npm run dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api/health

### 3. Docker (Full Stack)

```bash
docker-compose up --build
```

## Projects

| Project | Type | Mode | Description |
|---------|------|------|-------------|
| **JC H2 Purification 2025** | H2 Purification & Drying | Demo (scripted) | Full end-to-end demo flow with pre-seeded data |
| **Adriatic GDU – ARC Phase II** | Gas Dehydration (Mol Sieve) | Real AI Backend | 50 MMSCFD GDU, PSR + RFQ loaded from docx files |
| **Al Dhafra H2 PDU – Phase I** | H2 Purification & Drying | Real AI Backend | 10,000 Nm³/h HPDU, Deoxo + TSA, ISO 14687 |
| HYROS H2 PDU | H2 Purification & Drying | Static | Historical project reference |
| Arcamind Filtration Unit | Filtration System | Static | Historical project reference |

## Features

- **Demo Flow (JC H2)**: Scripted walkthrough with AI reasoning traces, core values extraction, similarity matching, sizing, costing with supplier confirmation, and document generation
- **Real AI Chat (Gas Dryer, H2 PDU)**: Claude-powered chat that reads actual RFQ documents and provides intelligent analysis, requirement extraction, sizing guidance, and offer drafting
- **PDF Export**: Download or view generated offer documents as PDF
- **Equipment Datasheets**: Structured process/mechanical data for all major equipment
- **P&ID References**: Process flow descriptions with instrument/valve tag listings
- **Teams Dark Theme**: Microsoft Teams-inspired dark mode UI with 3-panel layout

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Python 3.12, FastAPI, Anthropic Claude Sonnet 4
- **PDF Generation**: fpdf2
- **Document Parsing**: python-docx
- **Theme**: Microsoft Teams dark mode

## Project Structure

```
epc-contractors-ai/
  .env                    # ANTHROPIC_API_KEY
  *.docx                  # RFQ documents (PSR + RFQ for Gas Dryer and H2 PDU)
  frontend/               # Next.js app (Teams-dark themed)
    src/
      app/                # App Router pages
      components/
        layout/           # AppBar, ProjectSidebar, RightPanel
        chat/             # ChatPanel, ChatMessage, ComposeBar, ReasoningTrace
        chat/cards/       # CoreValues, Similarity, Sizing, Costing, Document cards
        panels/           # CoreValues, Sizing, Costing, VersionHistory panels
        ui/               # shadcn/ui components
      data/               # Pre-seeded demo data (projects, messages, demo-data)
      lib/                # Types, utilities
  backend/                # Python FastAPI
    app/
      main.py             # API routes (health, projects, chat SSE, PDF gen)
      chat_engine.py      # Claude streaming integration with document context
      doc_parser.py       # DOCX parsing and project document loading
      pdf_gen.py          # PDF generation from offer document data
  docker-compose.yml      # Full stack orchestration
```
