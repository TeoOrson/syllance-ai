from fastapi import APIRouter
from pydantic import BaseModel

from app.services.rewrite_optimizer import optimize_rewrites

router = APIRouter()


class RewriteOptimizeRequest(BaseModel):
    policy_text: str
    mode: str = "autonomy"
    count: int = 3
    run_mode: str = "fast"


@router.post("/api/rewrite-optimize")
def rewrite_optimize(req: RewriteOptimizeRequest):
    policy_text = (req.policy_text or "").strip()

    if not policy_text:
        return {
            "status": "error",
            "message": "No policy text provided.",
            "mode": req.mode,
            "best_index": None,
            "best_rewrite": "",
            "best_scores": {},
            "candidates": [],
        }

    try:
        count = max(1, min(5, int(req.count)))
        result = optimize_rewrites(policy_text, req.mode, count=count, run_mode=req.run_mode,)

        return {
            "status": "ok",
            **result,
        }

    except Exception as e:
        return {
            "status": "failed",
            "message": f"Rewrite optimization failed: {repr(e)}",
            "mode": req.mode,
            "best_index": None,
            "best_rewrite": "",
            "best_scores": {},
            "candidates": [],
        }