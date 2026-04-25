def build_rewrite_prompt(policy_text: str, mode: str, variant: int = 1):
    system = (
        "You are an expert syllabus policy editor. "
        "You revise AI policy language while preserving meaning, rules, and coverage. "
        "Return ONLY strict valid JSON."
    )

    if mode == "autonomy":
        target_profile = """
Target rhetorical movement:
- Formality: around 3.7
- Politeness: move toward 4.0
- Affect: move toward 4.0
- Strictness: keep near 3.5
- Clarity: move toward 5.0
- Contestability: move toward 4.0
""".strip()

        mode_goals = """
Autonomy rewrite goals:
- Make the policy more student-guiding, respectful, and supportive.
- Increase room for clarification and communication.
- Preserve all rules and restrictions.
- Do not make the policy vague or overly permissive.
""".strip()

    else:
        target_profile = """
Target rhetorical movement:
- Formality: around 3.7
- Politeness: keep near 4.0
- Affect: keep near 4.0
- Strictness: keep near 3.5 without becoming punitive
- Clarity: move toward 5.0
- Contestability: keep near 4.0 through transparent process language
""".strip()

        mode_goals = """
Enforcement rewrite goals:
- Make the policy more explicit, structured, and procedurally clear.
- Strengthen rule clarity and boundaries.
- Preserve respectful tone.
- Do not add new punishments or permissions.
""".strip()

    variant_instruction = {
        1: "Variant 1: Produce a balanced rewrite focused on clear organization and respectful tone.",
        2: "Variant 2: Produce a stronger structural rewrite with clearer sections, bullets, and explicit expectations.",
        3: "Variant 3: Produce a more noticeable rhetorical shift while preserving all original rules and scope.",
        4: "Variant 4: Produce a concise but highly polished rewrite focused on clarity and student guidance.",
        5: "Variant 5: Produce the most target-optimized rewrite while avoiding new rules or changed meaning.",
    }.get(variant, "Produce a distinct rewrite that meaningfully changes rhetorical framing.")

    user = f"""
Rewrite the following AI policy.

Mode: {mode}
Variant: {variant}

{target_profile}

{mode_goals}

{variant_instruction}

Rules:
- Preserve all original permissions, restrictions, consequences, and scope.
- Do not add new permissions.
- Do not remove existing restrictions.
- Do not invent new punishments.
- Do not merely paraphrase.
- Substantively revise tone, phrasing, framing, and organization so category scores are likely to change.
- The rewrite must make a noticeable rhetorical shift while preserving the same meaning.
- Keep roughly the same length as the original unless clarity requires modest expansion.
- Use headings or bullets if they improve clarity.
- Include an “if unsure, ask” pathway when appropriate.
- Return strict JSON only.

Return ONLY strict valid JSON:
{{
  "rewrite": "rewritten policy text with escaped newlines",
  "changes_made": [
    "brief explanation of one change"
  ],
  "intended_score_movement": {{
    "Formality": "expected movement",
    "Politeness": "expected movement",
    "Affect": "expected movement",
    "Strictness": "expected movement",
    "Clarity": "expected movement",
    "Contestability": "expected movement"
  }}
}}

Output rules:
- Do not use markdown.
- Do not wrap the response in triple backticks.
- Escape internal quotation marks correctly.

AI POLICY TEXT:
\"\"\"{policy_text}\"\"\"
""".strip()

    return [
        {"role": "system", "content": system},
        {"role": "user", "content": user},
    ]