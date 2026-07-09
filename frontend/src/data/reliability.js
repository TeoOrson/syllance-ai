// Human/LLM reliability findings from the Week 7 validation study
// (45-policy stratified sample, human-coded vs. primary scorer).
// See validation/reliability_memo.md and week8/tool_output_recommendation_language.md.
//
// tier drives badge color/dot-count everywhere it's shown:
//   "high"        — agrees with human raters most of the time, trust it
//   "moderate"    — directionally right, runs biased by a predictable amount
//   "low"         — frequently wrong, treat as a floor not a verdict
//   "unstable"    — aggregate bias looks fine but hides equal-and-opposite
//                   per-policy errors; a stable-looking average is not evidence
//                   of accuracy here

export const RELIABILITY = {
  Formality: {
    tier: "moderate",
    exactAgreement: 0.444,
    meanBias: 0.71,
    biasDirection: "over",
    caveat:
      "Runs about 0.7 points high on average — reliable enough to compare policies against each other, less reliable as an absolute number.",
  },
  Politeness: {
    tier: "high",
    exactAgreement: 0.733,
    meanBias: 0.25,
    biasDirection: "over",
    caveat: "Our most reliable dimension — you can act on this score directly.",
  },
  Affect: {
    tier: "unstable",
    exactAgreement: 0.4,
    meanBias: 0.14,
    biasDirection: "neutral",
    caveat:
      "Looks stable on average, but that hides equal-and-opposite failures: it can miss sustained encouraging language after a warning, or miss sustained caution after a friendly opener. Read the keyword evidence yourself on mixed-tone policies.",
  },
  Strictness: {
    tier: "moderate",
    exactAgreement: 0.556,
    meanBias: 0.36,
    biasDirection: "over",
    caveat:
      "Runs about 0.4 points high on average — reliable enough to compare policies against each other, less reliable as an absolute number.",
  },
  Clarity: {
    tier: "low",
    exactAgreement: 0.244,
    meanBias: 1.78,
    biasDirection: "over",
    caveat:
      "Our least reliable dimension — the model over-scored Clarity in 96% of disagreements with human raters. Terse, principle-based, or scope-deferred policies ('when instructed') are the most common blind spot. Treat a high score here as a floor, not a verdict.",
  },
  Contestability: {
    tier: "low",
    exactAgreement: 0.378,
    meanBias: 0.87,
    biasDirection: "over",
    caveat:
      "Runs about 0.9 points high on average — the model tends to mistake broad definitional scope or a warm tone for actual negotiability. Double-check a high score against whether the policy states an actual process for questioning it.",
  },
};

export const TIER_META = {
  high: { dots: 3, label: "High confidence", color: "#34d399" },
  moderate: { dots: 2, label: "Moderate confidence", color: "#fbbf24" },
  low: { dots: 1, label: "Low confidence", color: "#f87171" },
  unstable: { dots: 1, label: "Unstable", color: "#f87171" },
};

export function getReliability(category) {
  return RELIABILITY[category] ?? null;
}
