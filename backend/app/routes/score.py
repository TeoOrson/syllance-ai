from datetime import datetime, timezone
from fastapi import APIRouter
from pydantic import BaseModel

from app.config.rubric import CATEGORIES
from app.services.extractor import extract_ai_policy
from app.services.scorer import score_ai_policy

router = APIRouter()


class ScoreRequest(BaseModel):
    text: str
    optimizeFor: str = "autonomy"


@router.post("/api/score")
def score(req: ScoreRequest):
    syllabus_text = (req.text or "").strip()

    if not syllabus_text:
        return {
            "version": "policypulse-v1",
            "status": "no_input",
            "message": "Paste or upload a syllabus to analyze.",
            "input_meta": {
                "chars": 0,
                "timestamp": datetime.now(timezone.utc).isoformat(),
            },
            "ai_policy_text": "",
            "scores": {
                category: {
                    "score": 1,
                    "label": "",
                    "confidence": 0.0,
                }
                for category in CATEGORIES
            },
            "evidence": [],
            "keywords_by_category": {category: [] for category in CATEGORIES},
            "recommendations": [],
        }

    try:
        extraction = extract_ai_policy(syllabus_text)
    except Exception as e:
        return {
            "version": "policypulse-v1",
            "status": "extract_failed",
            "message": f"AI policy extraction failed: {repr(e)}",
            "input_meta": {
                "chars": len(syllabus_text),
                "timestamp": datetime.now(timezone.utc).isoformat(),
            },
            "ai_policy_text": "",
            "scores": {
                category: {
                    "score": 3,
                    "label": "Needs review",
                    "confidence": 0.0,
                }
                for category in CATEGORIES
            },
            "evidence": [],
            "keywords_by_category": {category: [] for category in CATEGORIES},
            "recommendations": [],
        }

    if not extraction["found"]:
        return {
            "version": "policypulse-v1",
            "status": "no_ai_policy",
            "message": "No AI policy detected in syllabus.",
            "input_meta": {
                "chars": len(syllabus_text),
                "timestamp": datetime.now(timezone.utc).isoformat(),
            },
            "ai_policy_text": "",
            "scores": {
                category: {
                    "score": 3,
                    "label": "N/A",
                    "confidence": 0.0,
                }
                for category in CATEGORIES
            },
            "evidence": [],
            "keywords_by_category": {category: [] for category in CATEGORIES},
            "recommendations": [
                {
                    "category": "Clarity",
                    "text": "Add an AI policy section to enable scoring."
                }
            ],
        }

    policy_text = extraction["section_text"]

    try:
        scored = score_ai_policy(policy_text, req.optimizeFor)
    except Exception as e:
        return {
            "version": "policypulse-v1",
            "status": "score_failed",
            "message": f"AI policy was found, but scoring failed: {repr(e)}",
            "input_meta": {
                "chars": len(syllabus_text),
                "timestamp": datetime.now(timezone.utc).isoformat(),
            },
            "ai_policy_text": policy_text,
            "scores": {
                category: {
                    "score": 3,
                    "label": "Needs review",
                    "confidence": 0.0,
                }
                for category in CATEGORIES
            },
            "evidence": [],
            "keywords_by_category": {category: [] for category in CATEGORIES},
            "recommendations": [],
        }

    print("\n=== SCORE ROUTE INPUT ===")
    print(syllabus_text[:1000])

    print("\n=== EXTRACTED AI POLICY ===")
    print(policy_text[:1000])

    print("\n=== FINAL SCORES ===")
    print(scored.get("scores", {}))

    return {
        "version": "policypulse-v1",
        "status": "ok",
        "message": extraction.get("reason", "") or "AI policy extracted and scored.",
        "input_meta": {
            "chars": len(syllabus_text),
            "timestamp": datetime.now(timezone.utc).isoformat(),
        },
        "ai_policy_text": policy_text,
        **scored,
    }