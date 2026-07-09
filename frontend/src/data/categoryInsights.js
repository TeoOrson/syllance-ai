export const CATEGORY_INSIGHTS = {
  Formality: {
    target: 3.7,
    ideal: "Professional, structured, readable, and human.",
    low: "Too informal can feel unclear or not authoritative enough.",
    high: "Too formal can feel cold, rigid, intimidating, and harder to understand.",
    why: "Measures how bureaucratic vs. conversational the language reads. Phrases like \"academic integrity\" and \"in accordance with policy\" push this up; first-person, casual phrasing pulls it down.",
  },
  Politeness: {
    target: 4.0,
    ideal: "Respectful, cooperative, and authority-preserving.",
    low: "Blunt or harsh language may create resistance.",
    high: "Overly polite language can weaken authority or blur expectations.",
    why: "Measures how much the tone protects student dignity. Collaborative phrasing (\"let's,\" \"reach out if...\") and explained rationale raise it; blunt commands and accusatory framing lower it.",
  },
  Affect: {
    target: 4.0,
    ideal: "Supportive, encouraging, and learning-oriented.",
    low: "Fear-based or punishment-heavy tone can increase anxiety.",
    high: "Overly positive tone can make consequences feel unserious.",
    why: "Measures the emotional register of the policy as a whole — not just its most severe sentence. A warm opening followed by a strict clause should still land as mixed, not simply discouraging.",
  },
  Strictness: {
    target: 3.5,
    ideal: "Firm expectations with some flexibility.",
    low: "Too lenient can make boundaries unclear.",
    high: "Too strict can reduce autonomy and create fear-based compliance.",
    why: "Measures how much room the policy leaves for AI use. Outright bans and mandatory disclosure requirements push this up; permissive, guideline-style language pulls it down.",
  },
  Clarity: {
    target: 5.0,
    ideal: "Precise, explicit, structured, and example-based.",
    low: "Low clarity creates confusion and inconsistent interpretation.",
    high: "High clarity is generally desirable because it reduces ambiguity.",
    why: "Measures whether a student could read the policy and know exactly what's allowed on a specific assignment — not just whether the sentences are grammatically clear.",
  },
  Contestability: {
    target: 4.0,
    ideal: "Fair, transparent, and open to clarification.",
    low: "No room for questions can feel unfair or rigid.",
    high: "Too much flexibility can weaken consistency and enforcement.",
    why: "Measures whether the policy leaves room for a student to ask questions or push back. Invitations to email or discuss raise it; flat, unappealable consequences lower it.",
  },
};