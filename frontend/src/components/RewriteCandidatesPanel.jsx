import React from "react";
import { CATEGORIES } from "../data/categories";

function formatScore(value) {
  return typeof value === "number" ? value.toFixed(1) : "—";
}

export default function RewriteCandidatesPanel({ candidates, bestIndex }) {
  if (!candidates || candidates.length === 0) {
    return (
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>
        Generate a rewrite to view candidate attempts and scoring.
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {candidates.map((candidate) => {
        const isBest = candidate.index === bestIndex;

        return (
          <details
            key={candidate.index}
            open={isBest}
            style={{
              borderRadius: 14,
              border: isBest
                ? "1px solid rgba(34,211,238,0.45)"
                : "1px solid rgba(255,255,255,0.10)",
              background: isBest
                ? "rgba(34,211,238,0.06)"
                : "rgba(255,255,255,0.03)",
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
              Candidate {candidate.index + 1}
              {isBest ? " — Best" : ""}
              {" "}
              | Distance: {candidate.distance_to_target}
            </summary>

            <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
              <textarea
                readOnly
                value={candidate.rewrite || ""}
                style={{
                  width: "100%",
                  minHeight: 120,
                  resize: "vertical",
                  background: "rgba(255,255,255,0.04)",
                  color: "rgba(255,255,255,0.90)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: 12,
                  padding: 10,
                  lineHeight: 1.5,
                }}
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                  gap: 8,
                }}
              >
                {CATEGORIES.map((category) => (
                  <div
                    key={category}
                    style={{
                      borderRadius: 10,
                      border: "1px solid rgba(255,255,255,0.08)",
                      background: "rgba(255,255,255,0.03)",
                      padding: 8,
                    }}
                  >
                    <div style={{ fontSize: 11, fontWeight: 900 }}>
                      {category}
                    </div>
                    <div style={{ fontSize: 12, marginTop: 4 }}>
                      {formatScore(candidate.scores?.[category]?.score)}/5
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </details>
        );
      })}
    </div>
  );
}