import os
import json
from collections.abc import AsyncGenerator

from anthropic import AsyncAnthropic

from .doc_parser import load_project_documents

DOCUMENTS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "documents")

SYSTEM_PROMPT_TEMPLATE = """You are Arcamind AI Engineering's Project Manager AI — an expert assistant for EPC contractors and equipment suppliers in the Oil & Gas and Green Energy sectors. You help engineers analyze RFQ packages, extract requirements, discuss sizing and costing, and draft offer documents.

You are currently working on project: {project_name} (RFQ: {rfq_number})
Client: {client}
System Type: {system_type}

The following RFQ documents have been loaded for this project:

{document_context}

INSTRUCTIONS:
- Provide detailed, technically accurate responses based on the loaded RFQ documents
- When referencing specific requirements, cite the document section/clause
- Format responses with markdown: use **bold** for emphasis, bullet points for lists
- When asked to analyze the RFQ, extract structured requirements with source references
- When asked about sizing, reference the process parameters from the documents
- When asked to generate offer documents, create professional structured content
- When asked about compliance, reference specific codes and standards from the RFQ
- Be concise but thorough. Engineers value precision over verbosity.
- If you don't have enough information to answer, say so clearly and suggest what additional data is needed.
"""

PROJECT_META = {
    "proj-gas-dryer": {
        "name": "Adriatic GDU – ARC Phase II",
        "client": "Arcamind Solutions",
        "rfq_number": "ARC-AGP-2026-007",
        "system_type": "Gas Dehydration Unit (Molecular Sieve)",
    },
    "proj-h2pdu": {
        "name": "Al Dhafra H2 PDU – Phase I",
        "client": "Arcamind",
        "rfq_number": "MPE-AGHP-2026-003",
        "system_type": "Hydrogen Purification & Drying Unit (Deoxo + TSA)",
    },
    "proj-hyros": {
        "name": "HYROS H2 PDU",
        "client": "Arcamind",
        "rfq_number": "RFQ-2024-0038",
        "system_type": "Hydrogen Purification & Drying Unit (10,000 Nm³/h, Deoxo + Dryer Towers). This is a completed project (status: quoted). Key specs: Feed H2 with O2 impurity, Deoxo reactor with Pt/Pd catalyst (~55 kg), 2× molecular sieve drying towers (3A, ND 250 mm, H 2,300 mm), feed heater 5.7 kW, regen heater 12.7 kW, outlet dew point -63°C, outlet moisture <5 ppmv. Total cost estimate ~EUR 1.2M.",
    },
    "proj-asco": {
        "name": "Arcamind Filtration Unit",
        "client": "Arcamind",
        "rfq_number": "RFQ-2024-0041",
        "system_type": "Vertical Cartridge Filter System (SS316L, ASME VIII Div 1, PED 2014/68/EU Cat IV Module G, 20 µm PP cartridges). This is a completed and won project. Key specs: design pressure 16 barg, material SS316L, ATEX Zone 1/2 compliance, CE stamped. Offer includes filter housing + cartridges, spare parts for commissioning and 2 years operation.",
    },
}


def get_system_prompt(project_id: str) -> str:
    meta = PROJECT_META.get(project_id, {})
    doc_context = load_project_documents(project_id, DOCUMENTS_DIR)

    if not doc_context:
        doc_context = "(No documents loaded for this project)"

    max_doc_chars = 180000
    if len(doc_context) > max_doc_chars:
        doc_context = doc_context[:max_doc_chars] + "\n\n[Document truncated due to length...]"

    return SYSTEM_PROMPT_TEMPLATE.format(
        project_name=meta.get("name", "Unknown"),
        rfq_number=meta.get("rfq_number", "N/A"),
        client=meta.get("client", "Unknown"),
        system_type=meta.get("system_type", "Unknown"),
        document_context=doc_context,
    )


async def stream_chat_response(
    project_id: str,
    messages: list[dict],
    api_key: str,
) -> AsyncGenerator[str, None]:
    """Stream a chat response from Claude for the given project and message history.

    Yields SSE-formatted strings: 'data: {"type": "text", "content": "..."}\n\n'
    """
    client = AsyncAnthropic(api_key=api_key)
    system_prompt = get_system_prompt(project_id)

    anthropic_messages = []
    for msg in messages:
        role = msg.get("role", "user")
        content = msg.get("content", "")
        if role in ("user", "assistant") and content:
            anthropic_messages.append({"role": role, "content": content})

    if not anthropic_messages:
        yield f'data: {json.dumps({"type": "text", "content": "Please send a message to get started."})}\n\n'
        yield f'data: {json.dumps({"type": "done"})}\n\n'
        return

    try:
        async with client.messages.stream(
            model="claude-sonnet-4-20250514",
            max_tokens=4096,
            system=system_prompt,
            messages=anthropic_messages,
        ) as stream:
            async for text in stream.text_stream:
                yield f'data: {json.dumps({"type": "text", "content": text})}\n\n'

        yield f'data: {json.dumps({"type": "done"})}\n\n'
    except Exception as e:
        yield f'data: {json.dumps({"type": "error", "content": str(e)})}\n\n'
