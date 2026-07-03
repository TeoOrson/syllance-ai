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
    # optimize_for is intentionally unused here — scoring is mode-agnostic and measures
    # where the policy actually sits on each dimension. Only the rewrite step uses this.
    system = (
        "You are an expert evaluator scoring syllabus AI policies on a research rubric grounded in "
        "communication theory (Brown & Levinson 1987), register theory (Halliday 1978), "
        "instructional communication research (Mottet & Beebe 2006), and procedural justice theory "
        "(Thibaut & Walker 1975; Tyler 1988). "
        "Apply the rubric consistently and return ONLY strict valid JSON."
    )

    user = f"""
You are evaluating an AI syllabus policy using a multi-dimensional perception rubric grounded in communication research.

PROCEDURE:
1. Read the ENTIRE policy before scoring any dimension.
2. Evaluate each dimension independently using the full rubric below.
3. Use the full 1.0–5.0 scale; use decimal scores when a policy falls between anchors.
4. Copy short verbatim phrases (2–8 words) from the policy as evidence.
5. Return ONLY strict valid JSON.

HOLISTIC SCORING RULE (critical):
Score the SUSTAINED rhetorical posture of the full policy — not the most severe or most encouraging phrase in isolation. If a policy opens with warm pedagogical framing ("AI is a powerful tool for learning") and then states a restriction, weight the overall cumulative tone. A policy primarily organized around what students CAN do should score higher on Affect and Politeness than one primarily organized around consequences and prohibition, even if both contain restrictions.

JUDGING RULES:
- Score only the actual policy language as written.
- Do not assume instructor intent beyond the text.
- Do not default to middle scores — use the full 1–5 range.
- When the policy contains genuinely mixed signals, use a decimal between anchors.
- Scores should vary across dimensions; a policy can be high on Clarity and low on Contestability simultaneously.
- Evidence must be copied verbatim (2–8 words).
- Reflect genuine uncertainty in confidence scores: use below 0.7 when the policy is ambiguous or mixed.

---

RUBRIC

== FORMALITY (Register Theory: Halliday 1978) ==
Measures degree of institutional register — from personal/conversational to fully administrative/impersonal.

1 = Conversational   — Informal, personal register; colloquial phrasing; "I want you to...", "That's OK if..."
2 = Instructional    — Pedagogical register; direct personal address; accessible but not casual; first/second person throughout
3 = Institutionalized — Blends personal and institutional voice; cites university policies by name; structured but not bureaucratic
4 = Bureaucratic     — Institutional authority language; passive constructions; formal academic register; policy-as-document framing
5 = Administrative   — Fully impersonal, regulatory-style; indistinguishable from a university policy document

Calibration examples:
  Score 2: "Please don't just paste what AI says and hand it in. That misses the whole point of the assignment."
  Score 4: "Pursuant to university academic integrity policy, unauthorized submission of AI-generated content constitutes a violation subject to disciplinary review."

== POLITENESS (Brown & Levinson 1987 Politeness Theory) ==
Measures the degree to which the policy preserves student face, acknowledges student autonomy, and avoids bald face-threatening acts.

1 = Face-Threatening    — Blunt commands; accusatory or threatening framing; consequences stated as punishments
2 = Directive           — Commands stated as rules without face-saving moves; prohibition-first; no acknowledgment of student judgment
3 = Transactional       — Neutral professional register; states requirements without warmth or hostility; policy-as-procedure
4 = Autonomy-Supportive — Acknowledges student judgment; hedged or invitational language; rules framed as preferences or shared goals
5 = Face-Preserving     — Consistently deploys positive politeness strategies; treats students as capable professionals throughout

Calibration examples:
  Score 2: "You are not allowed to use ChatGPT or any AI tool for submitted work. Violations will be reported to the dean."
  Score 4: "I encourage you to think carefully about when AI supports your learning. You are welcome to discuss specific cases with me before an assignment is due."

== AFFECT (Instructional Communication: Mottet & Beebe 2006) ==
Measures the emotional climate created by the policy — the degree to which it creates a discouraging vs. empowering learning environment.

1 = Discouraging — Entirely organized around failure, punishment, and distrust; no acknowledgment of student good faith
2 = Cautionary   — Consequence-centered language dominates; warnings and prohibitions outweigh any positive framing
3 = Neutralizing  — Neither encouraging nor discouraging; procedural in tone; flat emotional register
4 = Encouraging   — Policy acknowledges student potential, frames AI as a developing skill or tool, includes at least one supportive move
5 = Empowering    — Explicitly positions student as capable developing professional; AI framed as opportunity; pedagogical rationale provided

IMPORTANT: Score the DOMINANT emotional register. A policy with a warm, skills-focused opening and some restrictions should score 3.5–4.0, not 2.0. Reserve scores of 2.0 or below for policies predominantly organized around prohibition and consequence language with no positive framing.

Calibration examples:
  Score 2: "Submitting AI-generated work will result in a failing grade and referral to the academic integrity office."
  Score 4: "Learning to use AI responsibly is an important professional skill. I want to help you develop judgment about when these tools serve your goals and when they undermine your learning."

== STRICTNESS (Regulatory Communication; Rule Density and Consequence Severity) ==
Measures BOTH the breadth of prohibited behaviors AND the severity of stated consequences.

1 = Flexible    — Few or no restrictions; AI broadly permitted with minimal conditions
2 = Structured  — Clear permitted/prohibited distinctions with conditions; no punitive language
3 = Conditional — Rule-based with conditions; some restrictions and disclosure requirements; moderate consequence language
4 = Controlling — Comprehensive restrictions; explicit prohibition language; clear consequences stated
5 = Restrictive — Complete or near-complete prohibition; strongest sanction language (course failure, expulsion, integrity referral)

IMPORTANT: Score on BOTH breadth AND severity. A policy that prohibits everything AND threatens expulsion is a 5. A policy that permits AI for some tasks with conditions is a 2–3 even if it uses firm language. A permissive policy with a "contact me if unsure" structure is a 1–2.

Calibration examples:
  Score 2: "AI tools may be used for brainstorming and editing. All submitted writing must be your own original work."
  Score 5: "The use of any AI tools — including grammar checkers, idea generators, and ChatGPT — is strictly prohibited and constitutes academic dishonesty subject to course failure."

== CLARITY (Plain Language Principles; Policy Comprehension Research) ==
Measures how completely and unambiguously the policy communicates what students are and are not permitted to do.

1 = Unclear          — Policy is contradictory, internally inconsistent, or impossible to act on
2 = Ambiguous        — Key terms undefined; student cannot determine what is and is not permitted
3 = Moderately clear — General intent is legible but important edge cases are unaddressed
4 = Clear            — Permitted and prohibited uses stated; most edge cases addressed; actionable
5 = Highly clear     — Explicit permitted/prohibited distinctions; specific tools, assignment types, or disclosure requirements named; student knows exactly what to do

IMPORTANT: Grammatical clarity is NOT the same as policy clarity. A short, well-written policy that says "use AI ethically" is NOT clear — "ethically" is undefined. Score 4–5 only when a student could read the policy and confidently know what they are and are not allowed to do on a specific assignment. Policies that defer scope ("as discussed in class," "when instructed") are 3 at most.

Calibration examples:
  Score 2: "AI use is generally not permitted unless it serves a clear pedagogical purpose." [Who decides? What purpose?]
  Score 5: "AI tools may be used for (1) grammar checking and (2) brainstorming outlines only. AI may not be used to generate submitted text. Disclose all AI use in a one-paragraph appendix on every submission."

== CONTESTABILITY (Procedural Justice Theory: Thibaut & Walker 1975; Tyler 1988) ==
Measures whether the policy provides visible mechanisms for student voice, clarification, or appeal.
Procedural justice research: perceived voice and process fairness increase rule legitimacy even when students disagree with the rule content.

NOTE: This scale is NOT "more is always better." Score 5 (Overly flexible) means the policy is so open-ended it provides no useful structure. The ideal is 4 (Fair + transparent): clear rules WITH a visible path for questions or case-by-case consideration. Broad definitions or detailed rules do NOT increase Contestability — only dialog and appeal structures do.

1 = Non-negotiable    — No appeal, no exceptions, no language inviting questions; rules stated as final
2 = Limited Flexibility — Primarily non-negotiable; one minor softening gesture but no real dialogue structure
3 = Moderate          — Some implicit flexibility (e.g., "assignments may vary") but no explicit appeal pathway
4 = Fair + transparent — At least one explicit dialog mechanism: "email me with questions," case-by-case language, per-assignment specification, or a stated appeal process
5 = Overly flexible   — Policy is so open-ended students cannot determine what is and is not permitted

Calibration examples:
  Score 1: "No AI use of any kind is permitted. There are no exceptions."
  Score 4: "Different assignments have different AI policies — check each prompt. If you are unsure whether a specific use is permitted, email me before the deadline. I review all requests individually."

---

Return JSON in this exact shape:
{{
  "version": "syllance-judge-v2",
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
- score: number from 1.0–5.0
- label: must match the closest rubric anchor label exactly
- confidence: 0.0–1.0; reflect genuine uncertainty; use below 0.7 when the policy is ambiguous or mixed
- reasoning: 1–2 sentences citing specific language from the policy that supports the score
- evidence: 1–3 short verbatim phrases (2–8 words) copied exactly from the policy text
- keywords_by_category: 2–6 word trigger phrases from the policy most significant for each dimension — NOT full sentences

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

    # Evidence lives inside each score object (where the model puts it per the prompt template)
    cleaned_evidence = []
    policy_lower = policy_text.lower()

    for category in CATEGORIES:
        raw_obj = raw_scores.get(category, {})
        cat_evidence = raw_obj.get("evidence", [])
        if not isinstance(cat_evidence, list):
            continue
        for phrase in cat_evidence[:3]:
            phrase = str(phrase).strip()
            if not phrase:
                continue
            idx = policy_lower.find(phrase.lower())
            cleaned_evidence.append({
                "category": category,
                "phrase": phrase[:80],
                "quote": phrase[:400],
                "start": max(0, idx) if idx != -1 else 0,
                "end": max(0, idx + len(phrase)) if idx != -1 else 0,
                "trigger": "",
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