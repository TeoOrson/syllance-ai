from app.services.llm_client import ollama_chat
from app.services.parser import parse_model_json


def build_extract_prompt(syllabus_text: str):
    system = (
        "You extract the AI / Generative AI policy section from a course syllabus. "
        "Return ONLY strict JSON, no markdown, no commentary."
    )

    user = f"""
Task:
Given the full syllabus text, locate the section(s) that describe policies about:
- AI, Generative AI, ChatGPT, LLMs, AI writing tools
- using AI for assignments (allowed/disallowed), disclosure, citations
- AI-related academic integrity rules
- approval / case-by-case AI use

Return ONLY JSON with this schema:
{{
  "found": true,
  "section_text": "verbatim extracted section text",
  "reason": "short explanation"
}}

Rules:
- If there is NO AI policy, set found=false and section_text="".
- Prefer the most explicit AI section.
- If multiple AI-related sections exist, concatenate them in original order.
- Do NOT summarize or rewrite.
- Output must be strict JSON only.

SYLLABUS TEXT:
\"\"\"{syllabus_text}\"\"\"
""".strip()

    return [
        {"role": "system", "content": system},
        {"role": "user", "content": user},
    ]


def extract_ai_policy(syllabus_text: str) -> dict:

    print("\n--- EXTRACTOR STEP ---")

    content = ollama_chat(build_extract_prompt(syllabus_text), temperature=0.0, timeout=180)
    out = parse_model_json(content)

    found = bool(out.get("found", False))
    section_text = str(out.get("section_text", "")).strip()
    reason = str(out.get("reason", "")).strip()

    if found and len(section_text) < 20:
        found = False
        section_text = ""
        if not reason:
            reason = "Model did not return a usable AI policy section."

    return {
        "found": found,
        "section_text": section_text,
        "reason": reason,
    }