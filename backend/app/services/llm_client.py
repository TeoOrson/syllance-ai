import requests

OLLAMA_CHAT_URL = "http://localhost:11434/api/chat"

PRIMARY_MODEL = "gemma4:e4b"
VALIDATION_MODEL = "llama3.1:8b"


def ollama_chat(messages, model=PRIMARY_MODEL, temperature=0.2, timeout=180, num_predict=1200, think=None):

    print(f"\n=== OLLAMA CALL ===")
    print(f"MODEL: {model}")
    print(f"TEMP: {temperature}")
    print(f"MESSAGES PREVIEW: {str(messages)[:500]}")
    print("=== END REQUEST ===\n")

    options = {
        "temperature": temperature,
        "num_predict": num_predict,
    }
    if think is not None:
        options["think"] = think

    payload = {
        "model": model,
        "stream": False,
        "messages": messages,
        "options": options,
    }

    response = requests.post(OLLAMA_CHAT_URL, json=payload, timeout=timeout)
    response.raise_for_status()

    data = response.json()
    message = data.get("message", {})
    content = message.get("content", "")

    # Thinking models (e.g. qwen3) return reasoning in "thinking" and the
    # actual response in "content". If content is empty, the token budget was
    # exhausted by thinking — surface the issue rather than silently defaulting.
    if not content.strip() and message.get("thinking"):
        print(f"WARNING: {model} returned empty content (thinking used full token budget)")

    print(f"\n=== OLLAMA RESPONSE ({model}) ===")
    print(content[:1000])
    print("=== END RESPONSE ===\n")

    return content