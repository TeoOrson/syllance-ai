"""
SyllanceAI Perception Rubric
============================
Six dimensions for analyzing AI syllabus policy language, each grounded in
communication theory and instructional communication research.

Theoretical basis by dimension
-------------------------------
Formality      — Register theory (Halliday 1978); academic genre analysis.
                 Measures degree of institutional register from personal/conversational
                 to fully administrative/impersonal.

Politeness     — Brown & Levinson (1987) politeness theory. Measures face-saving
                 strategies, positive/negative politeness, and autonomy preservation.
                 Higher scores reflect more positive politeness and autonomy support.

Affect         — Instructional communication and emotional climate research
                 (Mottet & Beebe 2006). Measures the degree to which policy language
                 creates a discouraging vs. empowering learning environment.

Strictness     — Regulatory communication; institutional authority language.
                 Measures breadth of prohibited behaviors AND severity of stated
                 consequences — not just the presence of rules.

Clarity        — Plain language principles; policy comprehension and instructional
                 design research. Measures how completely and unambiguously the policy
                 communicates what students are and are not permitted to do.
                 Grammatical clarity is NOT the same as policy clarity.

Contestability — Procedural justice theory (Thibaut & Walker 1975; Tyler 1988).
                 Measures whether the policy provides visible mechanisms for student
                 voice, clarification, or appeal. Procedural justice research shows
                 that perceived voice and fairness increase policy legitimacy even
                 when students disagree with rule content.

Target scores represent research-motivated communication ideals
--------------------------------------------------------------
Formality 3.7  — Institutionalized–Bureaucratic range: professional authority
                 without inaccessibly administrative distance.

Politeness 4.0 — Autonomy-Supportive: instructional communication research links
                 autonomy-supportive language to higher student motivation and trust
                 (Reeve 2009; Niemiec & Ryan 2009).

Affect 4.0     — Encouraging: positive emotional climate reduces student anxiety and
                 improves engagement and compliance with course requirements.

Strictness 3.5 — Conditional: sufficient structure for enforceability without
                 alienating framing that suppresses student questions or good-faith
                 clarification attempts.

Clarity 5.0    — Highly clear: policy documents should always maximize actionable
                 clarity. Students should be able to determine exactly what they can
                 and cannot do without asking.

Contestability 4.0 — Fair + transparent: procedural justice research shows that
                 perceived voice and process fairness increase rule legitimacy.
                 NOTE: 5.0 (Overly flexible) is NOT the ideal — it indicates a policy
                 so open-ended it provides no useful structure. 4.0 is the target.
"""

CATEGORIES = [
    "Formality",
    "Politeness",
    "Affect",
    "Strictness",
    "Clarity",
    "Contestability",
]

ANCHORS = {
    "Formality": {
        1: "Conversational",
        2: "Instructional",
        3: "Institutionalized",
        4: "Bureaucratic",
        5: "Administrative",
    },
    "Politeness": {
        1: "Face-Threatening",
        2: "Directive",
        3: "Transactional",       # neutral professional — neither warm nor hostile
        4: "Autonomy-Supportive",
        5: "Face-Preserving",
    },
    "Affect": {
        1: "Discouraging",
        2: "Cautionary",
        3: "Neutralizing",
        4: "Encouraging",
        5: "Empowering",
    },
    "Strictness": {
        1: "Flexible",
        2: "Structured",
        3: "Conditional",         # rule-based with conditions; moderate consequences
        4: "Controlling",
        5: "Restrictive",
    },
    "Clarity": {
        1: "Unclear",
        2: "Ambiguous",
        3: "Moderately clear",
        4: "Clear",
        5: "Highly clear",
    },
    "Contestability": {
        1: "Non-negotiable",
        2: "Limited Flexibility",
        3: "Moderate",
        4: "Fair + transparent",
        5: "Overly flexible",
    },
}

TARGET_SCORES = {
    "Formality":      3.7,  # Institutionalized–Bureaucratic; professional without inaccessible distance
    "Politeness":     4.0,  # Autonomy-Supportive; face-preserving, student agency acknowledged
    "Affect":         4.0,  # Encouraging; positive climate, skills framing
    "Strictness":     3.5,  # Conditional; enforceable without alienating framing
    "Clarity":        5.0,  # Highly clear; students must always know exactly what to do
    "Contestability": 4.0,  # Fair + transparent; voice and appeal paths visible
}
