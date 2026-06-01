from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime, timezone

from app.services.scorer import score_ai_policy
from app.services.validator import validate_score_ai_policy
from app.services.llm_client import PRIMARY_MODEL, VALIDATION_MODEL

router = APIRouter()


class ScorePolicyRequest(BaseModel):
    policy_text: str
    optimizeFor: str = "autonomy"


@router.post("/api/score-policy")
def score_policy(req: ScorePolicyRequest):
    policy_text = (req.policy_text or "").strip()

    if not policy_text:
        return {
            "version": "syllance-v1",
            "status": "no_input",
            "message": "No policy text provided.",
            "input_meta": {
                "chars": 0,
                "timestamp": datetime.now(timezone.utc).isoformat(),
            },
            "ai_policy_text": "",
            "primary": {
                "scores": {},
                "evidence": [],
                "keywords_by_category": {},
                "recommendations": [],
            },
            "validation": {
                "scores": {},
            },
        }

    try:
        primary = score_ai_policy(policy_text, req.optimizeFor)
        validation = validate_score_ai_policy(policy_text, req.optimizeFor)

        return {
            "version": "syllance-v1",
            "status": "ok",
            "message": "Policy scored directly.",
            "input_meta": {
                "chars": len(policy_text),
                "timestamp": datetime.now(timezone.utc).isoformat(),
            },
            "ai_policy_text": policy_text,
            "primary": {
                **primary, "model": PRIMARY_MODEL
            },
            "validation": {
                **validation,
                "model": VALIDATION_MODEL
            }
        }
    except Exception as e:
        return {
            "version": "syllance-v1",
            "status": "score_failed",
            "message": f"Direct scoring failed: {repr(e)}",
            "input_meta": {
                "chars": len(policy_text),
                "timestamp": datetime.now(timezone.utc).isoformat(),
            },
            "ai_policy_text": policy_text,
            "primary": {
                "scores": {},
                "evidence": [],
                "keywords_by_category": {},
                "recommendations": [],
            },
            "validation": {
                "scores": {},
            },
        }