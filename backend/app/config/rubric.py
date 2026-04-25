CATEGORIES = [
    "Formality",
    "Politeness",
    "Affect",
    "Strictness",
    "Clarity",
    "Contestability", #REMOVED VAGUENESS
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
        3: "Procedural",
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
        3: "Procedural",
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
    "Formality": 3.7,
    "Politeness": 4.0,
    "Affect": 4.0,
    "Strictness": 3.5,
    "Clarity": 5.0,
    "Contestability": 4.0,
}