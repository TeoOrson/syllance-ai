from fastapi import APIRouter
from pydantic import BaseModel

from app.services.rewriter import rewrite_ai_policy

router = APIRouter()


class RewriteRequest(BaseModel):
    policy_text: str
    mode: str = "autonomy"


@router.post("/api/rewrite")
def rewrite(req: RewriteRequest):
    policy_text = (req.policy_text or "").strip()

    if not policy_text:
        return {
            "status": "error",
            "message": "No policy text provided.",
            "rewrite": "",
        }

    try:
        result = rewrite_ai_policy(policy_text, req.mode)
        return {
            "status": "ok",
            **result,
        }
    except Exception as e:
        return {
            "status": "failed",
            "message": f"Rewrite failed: {repr(e)}",
            "rewrite": "",
        }