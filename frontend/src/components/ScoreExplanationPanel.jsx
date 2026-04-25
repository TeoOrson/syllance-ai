import React from "react";
import { CATEGORIES, CATEGORY_TARGETS } from "../data/categories";
import { CATEGORY_INSIGHTS } from "../data/categoryInsights";
import { getScoreComparison } from "../utils/scoreUtils";

function formatScore(value) {
  return typeof value === "number" ? value.toFixed(1) : "—";
}

export default function ScoreExplanationPanel({ scores }) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {CATEGORIES.map((category) => {
        const score = scores?.[category];
        const target = CATEGORY_TARGETS[category];
        const insight = CATEGORY_INSIGHTS[category];
        const comparison = getScoreComparison(category, score);

        return (
          <details
            key={category}
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
            </div>
          </details>
        );
      })}
    </div>
  );
}