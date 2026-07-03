import json
import re
from app.services.llm_client import ollama_chat, PRIMARY_MODEL


def strip_thinking(text: str) -> str:
    # Qwen3 and similar models emit <think>...</think> blocks before JSON output.
    # Strip them so the parser finds the actual response.
    return re.sub(r"<think>.*?</think>", "", text, flags=re.DOTALL).strip()


def extract_json_block(text: str) -> str:
    text = strip_thinking((text or "").strip())

    # fenced ```json ... ```
    fence = re.search(r"```(?:json)?\s*(\{.*\})\s*```", text, flags=re.DOTALL | re.IGNORECASE)
    if fence:
        text = fence.group(1).strip()

    start = text.find("{")
    if start == -1:
        raise ValueError("No JSON object found.")

    in_string = False
    escape = False
    depth = 0

    for i in range(start, len(text)):
        ch = text[i]

        if in_string:
            if escape:
                escape = False
            elif ch == "\\":
                escape = True
            elif ch == '"':
                in_string = False
            continue

        if ch == '"':
            in_string = True
            continue

        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                return text[start:i + 1].strip()

    raise ValueError("No complete JSON object found.")


def repair_json_with_ollama(bad_text: str) -> str:
    repair_messages = [
        {
            "role": "system",
            "content": (
                "You repair malformed JSON. "
                "Return ONLY strict valid JSON. "
                "Escape all internal newlines inside strings as \\n. "
                "Do not use markdown. Do not add commentary."
            ),
        },
        {
            "role": "user",
            "content": f"Repair this into strict valid JSON only:\n\n{bad_text}",
        },
    ]

    return ollama_chat(
        repair_messages,
        model=PRIMARY_MODEL,
        temperature=0,
        timeout=180,
    )


def parse_model_json(content: str):
    try:
        block = extract_json_block(content)
        return json.loads(block)
    except Exception:
        repaired = repair_json_with_ollama(content)
        block = extract_json_block(repaired)
        return json.loads(block)