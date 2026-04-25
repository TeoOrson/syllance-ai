import React from "react";
import { CATEGORIES, CATEGORY_TARGETS } from "../data/categories";
import { getScoreComparison, getInterpretation } from "../utils/scoreUtils";

export default function ScorePanel({ scores }) {
  return (
    <div style={{ display: "grid", gap: 10, minWidth: 260 }}>
      {CATEGORIES.map((category) => {
        const score = scores?.[category] ?? null;
        const comp = getScoreComparison(category, score);
        const interpretation = getInterpretation(category, comp?.status);

        return (
          <div
            key={category}
            style={{
              display: "grid",
              gap: 6,
              padding: "12px 14px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            {/* Top row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 900 }}>
                {category}
              </div>
              <div style={{ fontSize: 12, fontWeight: 900 }}>
                {typeof score === "number" ? score.toFixed(1) : "_"}/5
              </div>
            </div>

            {/* Target */}
            <div
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.65)",
              }}
            >
              Target: {CATEGORY_TARGETS[category]}
            </div>

            {/* Status */}
            {comp && (
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color:
                    comp.status === "above"
                      ? "#f87171"
                      : comp.status === "below"
                      ? "#fbbf24"
                      : "#34d399",
                }}
              >
                {comp.status === "above" && "Above target"}
                {comp.status === "below" && "Below target"}
                {comp.status === "on" && "On target"}
              </div>
            )}

            {/* Interpretation */}
            {interpretation && (
              <div
                style={{
                  fontSize: 11,
                  lineHeight: 1.5,
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                {interpretation}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}