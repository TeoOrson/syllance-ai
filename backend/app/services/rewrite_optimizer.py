from app.services.rewriter import rewrite_ai_policy
from app.services.scorer import score_ai_policy
from app.config.rubric import CATEGORIES, TARGET_SCORES


def average_distance_to_target(scores: dict) -> float:
    distances = []

    for category in CATEGORIES:
        score_obj = scores.get(category, {})
        score = score_obj.get("score")

        if isinstance(score, (int, float)):
            target = TARGET_SCORES[category]
            distances.append(abs(float(score) - float(target)))

    if not distances:
        return 999.0

    return round(sum(distances) / len(distances), 3)


def optimize_rewrites(policy_text: str, mode: str, count: int = 3, run_mode: str = "fast") -> dict:
    candidates = []

    if run_mode == "fast":
        count = 1
    else:
        count = min(count, 3)


    for i in range(count):
        variant = i + 1

        rewrite_result = rewrite_ai_policy(policy_text, mode, variant=variant)
        rewrite_text = rewrite_result.get("rewrite", "").strip()

        scored = score_ai_policy(rewrite_text, mode)
        distance = average_distance_to_target(scored.get("scores", {}))

        candidates.append({
            "index": i,
            "variant": variant,
            "rewrite": rewrite_text,
            "scores": scored.get("scores", {}),
            "distance_to_target": distance,
        })

    best = min(candidates, key=lambda c: c["distance_to_target"])

    return {
        "mode": mode,
        "run_mode": run_mode,
        "best_index": best["index"],
        "best_rewrite": best["rewrite"],
        "best_scores": best["scores"],
        "best_distance_to_target": best["distance_to_target"],
        "candidates": candidates,
    }