import { CATEGORY_TARGETS } from "../data/categories";

export function getScoreComparison(category, score) {
  const target = CATEGORY_TARGETS[category];
  if (typeof score !== "number") return null;

  const diff = score - target;

  let status = "on";
  if (diff > 0.6) status = "above";
  else if (diff < -0.6) status = "below";

  return {
    target,
    diff: Number(diff.toFixed(2)),
    status,
  };

  
}

export function getInterpretation(category, status) {
  const map = {
    Formality: {
      below: "Too informal → may reduce authority",
      on: "Balanced tone → clear and approachable",
      above: "Too formal → may reduce trust and clarity",
    },
    Politeness: {
      below: "Too blunt → may cause resistance",
      on: "Respectful tone → supports cooperation",
      above: "Overly soft → may weaken authority",
    },
    Affect: {
      below: "Negative tone → may increase anxiety",
      on: "Supportive tone → improves motivation",
      above: "Overly positive → may feel unserious",
    },
    Strictness: {
      below: "Too lenient → unclear expectations",
      on: "Balanced structure → supports responsibility",
      above: "Too strict → may reduce autonomy",
    },
    Clarity: {
      below: "Unclear → increases confusion",
      on: "Clear → supports understanding",
      above: "Highly explicit → optimal clarity",
    },
    Contestability: {
      below: "Too rigid → may feel unfair",
      on: "Balanced flexibility → supports trust",
      above: "Too flexible → weak enforcement",
    },
  };

  return map[category]?.[status] || "";
}