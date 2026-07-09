import React from "react";
import { CATEGORIES, CATEGORY_TARGETS } from "../data/categories";
import { CATEGORY_INSIGHTS } from "../data/categoryInsights";
import { getScoreComparison } from "../utils/scoreUtils";
import { getReliability, TIER_META } from "../data/reliability";

function formatScore(value) {
  return typeof value === "number" ? value.toFixed(1) : "—";
}

// These two dimensions had the lowest human-agreement rates in the Week 7
// validation study — open by default so users are more likely to check the
// evidence rather than take the score at face value.
const DEFAULT_OPEN = new Set(["Clarity", "Contestability"]);

export default function ScoreExplanationPanel({ scores }) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {CATEGORIES.map((category) => {
        const score = scores?.[category];
        const target = CATEGORY_TARGETS[category];
        const insight = CATEGORY_INSIGHTS[category];
        const comparison = getScoreComparison(category, score);
        const reliability = getReliability(category);
        const tierMeta = reliability ? TIER_META[reliability.tier] : null;

        return (
          <details
            key={category}
            open={DEFAULT_OPEN.has(category)}
            style={{
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(255,255,255,0.03)",
              padding: 12,
            }}
          >
            <summary
              style={{
                cursor: "pointer",
                fontWeight: 900,
                color: "rgba(255,255,255,0.92)",
              }}
            >
              {category}: {formatScore(score)}/5 · Target: {formatScore(target)}
              {tierMeta && (
                <span
                  title={`${tierMeta.label} — human/LLM validation study`}
                  style={{
                    marginLeft: 8,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "1px",
                    color: tierMeta.color,
                  }}
                >
                  {"●".repeat(tierMeta.dots)}
                  {"○".repeat(3 - tierMeta.dots)} {tierMeta.label}
                </span>
              )}
            </summary>

            <div
              style={{
                marginTop: 10,
                display: "grid",
                gap: 8,
                fontSize: 13,
                lineHeight: 1.55,
                color: "rgba(255,255,255,0.78)",
              }}
            >
              <div>
                <strong>Status:</strong>{" "}
                {comparison?.status === "on"
                  ? "On target"
                  : comparison?.status === "below"
                  ? "Below target"
                  : comparison?.status === "above"
                  ? "Above target"
                  : "Not scored yet"}
              </div>

              <div>
                <strong>Ideal:</strong> {insight?.ideal}
              </div>

              <div>
                <strong>If too low:</strong> {insight?.low}
              </div>

              <div>
                <strong>If too high:</strong> {insight?.high}
              </div>

              <div>
                <strong>Why it matters:</strong> {insight?.why}
              </div>

              {reliability && (
                <div
                  style={{
                    marginTop: 4,
                    paddingTop: 8,
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    color: tierMeta?.color,
                  }}
                >
                  <strong>Reliability:</strong> {reliability.caveat}
                </div>
              )}
            </div>
          </details>
        );
      })}
    </div>
  );
}