import os
from pathlib import Path
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, Response
from pydantic import BaseModel

DOCUMENTS_DIR = Path(__file__).resolve().parent.parent / "data" / "documents"

env_path = Path(__file__).resolve().parent.parent.parent.parent / ".env"
if env_path.exists():
    load_dotenv(env_path)

from .doc_parser import get_available_projects, load_project_documents, PROJECT_DOCS
from .chat_engine import stream_chat_response
from .pdf_gen import generate_offer_pdf

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")


@asynccontextmanager
async def lifespan(app: FastAPI):
    for project_id in PROJECT_DOCS:
        load_project_documents(project_id, str(DOCUMENTS_DIR))
    yield


app = FastAPI(
    title="EPC Contractors AI",
    description="AI-powered bid automation for EPC contractors",
    version="0.2.0",
    lifespan=lifespan,
)

allowed_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
frontend_url = os.getenv("FRONTEND_URL")
if frontend_url:
    allowed_origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
async def health():
    has_key = bool(ANTHROPIC_API_KEY)
    return {"status": "ok", "version": "0.2.0", "anthropic_key_configured": has_key}


@app.get("/api/projects")
async def list_projects():
    return {"projects": get_available_projects()}


class ChatRequest(BaseModel):
    messages: list[dict]


@app.post("/api/chat/{project_id}")
async def chat(project_id: str, request: ChatRequest):
    if not ANTHROPIC_API_KEY:
        raise HTTPException(status_code=500, detail="ANTHROPIC_API_KEY not configured")

    if project_id not in PROJECT_DOCS:
        raise HTTPException(status_code=404, detail=f"Project {project_id} not found or has no documents")

    return StreamingResponse(
        stream_chat_response(project_id, request.messages, ANTHROPIC_API_KEY),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


@app.post("/api/documents/pdf")
async def generate_pdf(doc_data: dict):
    """Generate a PDF from document data."""
    try:
        pdf_bytes = generate_offer_pdf(doc_data)
        title = doc_data.get("title", "offer").replace(" ", "_")
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": f'attachment; filename="{title}.pdf"'},
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
