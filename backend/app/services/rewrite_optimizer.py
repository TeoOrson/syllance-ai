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
        max_attempts = 2
    else:
        count = min(count, 3)
        max_attempts = 6

    attempt = 0
    variant = 1

    while len(candidates) < count and attempt < max_attempts:
        attempt += 1

        try:
            rewrite_result = rewrite_ai_policy(
                policy_text,
                mode,
                variant=variant
            )

            rewrite_text = (rewrite_result.get("rewrite", "") or "").strip()

            if not rewrite_text:
                print(f"Skipping rewrite attempt {attempt}: empty rewrite")
                variant += 1
                continue

            scored = score_ai_policy(rewrite_text, mode)
            scores = scored.get("scores", {})
            distance = average_distance_to_target(scores)

            candidates.append({
                "index": len(candidates),
                "variant": variant,
                "rewrite": rewrite_text,
                "scores": scores,
                "distance_to_target": distance,
            })

        except Exception as e:
            print(f"Skipping rewrite attempt {attempt}: {repr(e)}")

        variant += 1

    # Last-resort fallback so frontend never breaks
    if not candidates:
        fallback_rewrite = policy_text.strip()

        scored = score_ai_policy(fallback_rewrite, mode)
        scores = scored.get("scores", {})
        distance = average_distance_to_target(scores)

        candidates.append({
            "index": 0,
            "variant": 0,
            "rewrite": fallback_rewrite,
            "scores": scores,
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