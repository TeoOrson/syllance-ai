from app.services.llm_client import ollama_chat
from app.services.parser import parse_model_json
from app.config.rubric import CATEGORIES, ANCHORS


def clamp_score(value, default=3.0):
    try:
        value = float(value)
    except Exception:
        value = default
    return max(1.0, min(5.0, round(value, 1)))


def nearest_anchor_label(category, score):
    anchor_index = int(round(score))
    anchor_index = max(1, min(5, anchor_index))
    return ANCHORS[category][anchor_index]


def build_score_prompt(policy_text: str, optimize_for: str):
    system = (
        "You are an expert evaluator acting as an AI-as-a-judge for syllabus AI policy language. "
        "Your job is to apply the provided rubric consistently. "
        "Do not rewrite the policy. Do not give general advice outside the JSON. "
        "Return ONLY strict valid JSON."
    )

    user = f"""
You are evaluating an AI syllabus policy using a perception rubric.

Your task:
1. Read the policy carefully.
2. Evaluate each category independently.
3. Use the full 1.0–5.0 scale.
4. Use decimal scores when the policy falls between anchors.
5. Provide exact evidence from the policy for each category.
6. Explain why the evidence supports the score.
7. Return ONLY strict JSON.

Important judging rules:
- Score only the actual policy language.
- Do not assume instructor intent beyond the text.
- Do not copy example scores.
- Do not default to the middle.
- If the text contains mixed signals, use a decimal score.
- Scores should vary across categories when the language supports different interpretations.
- Evidence must be copied verbatim from the policy.

Rubric anchors:

Formality:
1 = Conversational
2 = Instructional
3 = Institutionalized
4 = Bureaucratic
5 = Administrative

Politeness:
1 = Face-Threatening
2 = Directive
3 = Procedural
4 = Autonomy-Supportive
5 = Face-Preserving

Affect:
1 = Discouraging
2 = Cautionary
3 = Neutralizing
4 = Encouraging
5 = Empowering

Strictness:
1 = Flexible
2 = Structured
3 = Procedural
4 = Controlling
5 = Restrictive

Clarity:
1 = Unclear
2 = Ambiguous
3 = Understandable
4 = Clear
5 = Extremely clear

Contestability:
1 = Non-negotiable
2 = Limited flexibility
3 = Moderate
4 = Fair + transparent
5 = Overly flexible

Return JSON in this exact shape:
{{
  "version": "syllance-judge-v1",
  "scores": {{
    "Formality": {{
      "score": 0,
      "label": "",
      "confidence": 0,
      "reasoning": "",
      "evidence": []
    }},
    "Politeness": {{
      "score": 0,
      "label": "",
      "confidence": 0,
      "reasoning": "",
      "evidence": []
    }},
    "Affect": {{
      "score": 0,
      "label": "",
      "confidence": 0,
      "reasoning": "",
      "evidence": []
    }},
    "Strictness": {{
      "score": 0,
      "label": "",
      "confidence": 0,
      "reasoning": "",
      "evidence": []
    }},
    "Clarity": {{
      "score": 0,
      "label": "",
      "confidence": 0,
      "reasoning": "",
      "evidence": []
    }},
    "Contestability": {{
      "score": 0,
      "label": "",
      "confidence": 0,
      "reasoning": "",
      "evidence": []
    }}
  }},
  "keywords_by_category": {{
    "Formality": [],
    "Politeness": [],
    "Affect": [],
    "Strictness": [],
    "Clarity": [],
    "Contestability": []
  }},
  "recommendations": [
    {{
      "category": "",
      "text": ""
    }}
  ]
}}

Field rules:
- score must be a number from 1.0 to 5.0
- label must match the closest rubric anchor
- confidence must be a number from 0.0 to 1.0
- reasoning should be 1 concise sentence
- evidence should contain 1–3 exact phrases from the policy
- keywords_by_category must contain only exact phrases from the policy

AI POLICY TEXT:
\"\"\"{policy_text}\"\"\"
""".strip()

    return [
        {"role": "system", "content": system},
        {"role": "user", "content": user},
    ]

def score_ai_policy(policy_text: str, optimize_for: str) -> dict:
    content = ollama_chat(
    build_score_prompt(policy_text, optimize_for),
    temperature=0.2,
    timeout=240,
    num_predict=2000,
    )

    if not content or not content.strip():
        raise ValueError("Scoring model returned an empty response.")

    print("\n--- SCORER USING MODEL ---")

    print("\n=== RAW SCORE MODEL OUTPUT ===")
    print(content[:4000])
    print("\n=== END RAW SCORE MODEL OUTPUT ===")

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

    raw_evidence = out.get("evidence", [])
    if not isinstance(raw_evidence, list):
        raw_evidence = []

    cleaned_evidence = []
    policy_lower = policy_text.lower()

    for item in raw_evidence[:80]:
        if not isinstance(item, dict):
            continue

        category = item.get("category")
        if category not in CATEGORIES:
            continue

        phrase = str(item.get("phrase", "")).strip()[:80]
        quote = str(item.get("quote", "")).strip()[:400]

        start = -1
        end = -1

        if quote and quote.lower() in policy_lower:
            idx = policy_lower.find(quote.lower())
            if idx != -1:
                start = idx
                end = idx + len(quote)

        if start == -1 and phrase and phrase.lower() in policy_lower:
            idx = policy_lower.find(phrase.lower())
            if idx != -1:
                start = idx
                end = idx + len(phrase)

        cleaned_evidence.append({
            "category": category,
            "phrase": phrase,
            "quote": quote,
            "start": max(0, start),
            "end": max(0, end),
            "trigger": str(item.get("trigger", "")).strip()[:60],
        })

    keywords_by_category = out.get("keywords_by_category", {})
    if not isinstance(keywords_by_category, dict):
        keywords_by_category = {}

    fixed_kbc = {category: [] for category in CATEGORIES}

    for category in CATEGORIES:
        phrases = keywords_by_category.get(category, [])
        if isinstance(phrases, list):
            for phrase in phrases[:25]:
                p = str(phrase).strip()[:60]
                if p and p.lower() in policy_lower:
                    fixed_kbc[category].append(p)

    for item in cleaned_evidence:
        category = item["category"]
        phrase = item["phrase"].strip()

        if phrase and phrase.lower() in policy_lower:
            if phrase not in fixed_kbc[category]:
                fixed_kbc[category].append(phrase)

    for category in CATEGORIES:
        fixed_kbc[category] = fixed_kbc[category][:5]

    recommendations = out.get("recommendations", [])
    if not isinstance(recommendations, list):
        recommendations = []

    fixed_recommendations = []
    for item in recommendations[:20]:
        if isinstance(item, dict) and item.get("category") in CATEGORIES:
            fixed_recommendations.append({
                "category": item["category"],
                "text": str(item.get("text", ""))[:240],
            })

    print("\n=== FIXED SCORES RICH")
    print(fixed_scores_rich)

    return {
        "scores": fixed_scores_rich,
        "evidence": cleaned_evidence,
        "keywords_by_category": fixed_kbc,
        "recommendations": fixed_recommendations,
    }