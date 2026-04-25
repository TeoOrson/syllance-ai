from app.services.llm_client import ollama_chat
from app.services.parser import parse_model_json
from app.prompts.rewrite_prompt import build_rewrite_prompt


def rewrite_ai_policy(policy_text: str, mode: str, variant: int = 1) -> dict:
    content = ollama_chat(
        build_rewrite_prompt(policy_text, mode, variant=variant),
        temperature=0.45,
        timeout=180,
        num_predict=800,
    )

    print(f"\n=== RAW REWRITE MODEL OUTPUT | mode={mode} variant={variant} ===")
    print(content[:4000])
    print("\n=== END RAW REWRITE MODEL OUTPUT ===")

    out = parse_model_json(content)

    rewrite_text = str(out.get("rewrite", "")).strip()[:10000]

    return {
        "rewrite": rewrite_text,
        "changes_made": out.get("changes_made", []),
        "intended_score_movement": out.get("intended_score_movement", {}),
    }

#temp was 0.3