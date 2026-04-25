import requests

OLLAMA_CHAT_URL = "http://localhost:11434/api/chat"

PRIMARY_MODEL = "gemma4:e4b"
VALIDATION_MODEL = "qwen3.5:9b"


def ollama_chat(messages, model=PRIMARY_MODEL, temperature=0.2, timeout=180, num_predict=1200):

    print(f"\n=== OLLAMA CALL ===")
    print(f"MODEL: {model}")
    print(f"TEMP: {temperature}")
    print(f"MESSAGES PREVIEW: {str(messages)[:500]}")
    print("=== END REQUEST ===\n")

    payload = {
        "model": model,
        "stream": False,
        "messages": messages,
        "options": {
            "temperature": temperature,
            "num_predict": num_predict,
        },
    }

    response = requests.post(OLLAMA_CHAT_URL, json=payload, timeout=timeout)
    response.raise_for_status()

    data = response.json()
    content = data.get("message", {}).get("content", "")

    print(f"\n=== OLLAMA RESPONSE ({model}) ===")
    print(content[:1000])
    print("=== END RESPONSE ===\n")

    return content