export const APP_NAME = "SyllanceAI";

//REMOVED VAGUENESS

export const CATEGORIES = [
  "Formality",
  "Politeness",
  "Affect",
  "Strictness",
  "Clarity",
  
  "Contestability",
];

export const CATEGORY_ANCHORS = {
  Formality: [
    "Conversational",
    "Instructional",
    "Institutionalized",
    "Bureaucratic",
    "Administrative",
  ],
  Politeness: [
    "Face-Threatening",
    "Directive",
    "Procedural",
    "Autonomy-Supportive",
    "Face-Preserving",
  ],
  Affect: [
    "Discouraging",
    "Cautionary",
    "Neutralizing",
    "Encouraging",
    "Empowering",
  ],
  Strictness: [
    "Flexible",
    "Structured",
    "Procedural",
    "Controlling",
    "Restrictive",
  ],
  Clarity: [
    "Unclear",
    "Ambiguous",
    "Moderately clear",
    "Clear",
    "Highly clear",
  ],


  Contestability: [
    "Non-negotiable",
    "Limited Discretion",
    "Conditional",
    "Interpretable",
    "Negotiable",
  ],
};


// TARGET SCORES FOR EACH CATEGORY
export const CATEGORY_TARGETS = { 
    Formality: 3.7,
    Politeness: 4,
    Affect: 4,
    Strictness: 3.5,
    Clarity: 5,
    Contestability: 4,
    
};

// CATEGORY DESCRIPTIONS
export const CATEGORY_DESCRIPTIONS = {
    Formality:
    "Measures how informal, balanced, or overly administrative the policy sounds.",
  Politeness:
    "Measures whether the policy feels harsh, respectful, or overly softened.",
  Affect:
    "Measures the emotional framing of the policy, from discouraging to supportive.",
  Strictness:
    "Measures how lenient, balanced, or restrictive the policy is.",
  Clarity:
    "Measures how understandable, explicit, and specific the policy is.",
  Contestability:
    "Measures how much room there is to question, discuss, or appeal the policy.",

};