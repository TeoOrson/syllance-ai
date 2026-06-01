from app.services.llm_client import ollama_chat, VALIDATION_MODEL
from app.services.parser import parse_model_json
from app.services.scorer import build_score_prompt, clamp_score, nearest_anchor_label
from app.config.rubric import CATEGORIES


def validate_score_ai_policy(policy_text: str, optimize_for: str) -> dict:
    prompt_messages = build_score_prompt(policy_text, optimize_for)

    content = ollama_chat(
        prompt_messages,
        model=VALIDATION_MODEL,
        temperature=0.2,
        timeout=240,
        num_predict=2000,
    )

    print("\n--- VALIDATOR (SECOND MODEL) ---")

    print("\n=== RAW VALIDATION MODEL OUTPUT ===")
    print(content[:4000])
    print("\n=== END RAW VALIDATION MODEL OUTPUT ===")

    out = parse_model_json(content)

    raw_scores = out.get("scores", {})
    fixed_scores_rich = {}

    for category in CATEGORIES:
        raw_obj = raw_scores.get(category, {})
        if not isinstance(raw_obj, dict):
            raw_obj = {}

        score = clamp_score(raw_obj.get("score", 3.0), default=3.0)

        try:
            confidence = float(raw_obj.get("confidence", 0.65))
        except Exception:
            confidence = 0.65

        fixed_scores_rich[category] = {
            "score": score,
            "label": nearest_anchor_label(category, score),
            "confidence": round(confidence, 2),
        }

    return {
        "scores": fixed_scores_rich
    }