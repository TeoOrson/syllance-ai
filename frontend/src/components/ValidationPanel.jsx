import React from "react";
import { CATEGORIES, CATEGORY_TARGETS } from "../data/categories";
import { getScoreComparison } from "../utils/scoreUtils";

function formatValue(value) {
  return typeof value === "number" ? value.toFixed(1) : "-";
}

function formatDelta(delta) {
  if (delta > 0) return `+${delta.toFixed(1)}`;
  if (delta < 0) return delta.toFixed(1);
  return "0.0";
}

function getDistanceToTarget(score, target) {
  if (typeof score !== "number") return null;
  return Math.abs(score - target);
}

export default function ValidationPanel({
  originalScores,
  rewrittenScores,
  rewriteMode,
}) {
  if (!rewrittenScores || Object.keys(rewrittenScores).length === 0) {
    return (
      <div
        style={{
          fontSize: 13,
          color: "rgba(255,255,255,0.65)",
          lineHeight: 1.6,
        }}
      >
        Generate and score a rewrite to validate whether it moves the policy in
        the intended direction.
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div
        style={{
          fontSize: 13,
          color: "rgba(255,255,255,0.82)",
          lineHeight: 1.6,
        }}
      >
        <strong>Validation mode:</strong> {rewriteMode}
      </div>

      <div
        style={{
          overflowX: "auto",
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.10)",
          background: "rgba(255,255,255,0.03)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 12,
          }}
        >
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.05)" }}>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Target</th>
              <th style={thStyle}>Original</th>
              <th style={thStyle}>Rewrite</th>
              <th style={thStyle}>Δ Score</th>
              <th style={thStyle}>Closer to Target?</th>
            </tr>
          </thead>

          <tbody>
            {CATEGORIES.map((category) => {
              const target = CATEGORY_TARGETS[category];
              const original = originalScores?.[category] ?? null;
              const rewritten = rewrittenScores?.[category] ?? null;

              const delta =
                typeof original === "number" && typeof rewritten === "number"
                  ? rewritten - original
                  : null;

              const originalDistance = getDistanceToTarget(original, target);
              const rewrittenDistance = getDistanceToTarget(rewritten, target);

              let closerText = "—";
              let closerColor = "rgba(255,255,255,0.70)";

              if (
                originalDistance !== null &&
                rewrittenDistance !== null
              ) {
                if (rewrittenDistance < originalDistance) {
                  closerText = "Yes";
                  closerColor = "#34d399";
                } else if (rewrittenDistance > originalDistance) {
                  closerText = "No";
                  closerColor = "#f87171";
                } else {
                  closerText = "No change";
                  closerColor = "#fbbf24";
                }
              }
              return (
                <tr
                  key={category}
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <td style={tdStyle}>{category}</td>
                  <td style={tdStyle}>{formatValue(target)}</td>
                  <td style={tdStyle}>{formatValue(original) ?? "—"}</td>
                  <td style={tdStyle}>{formatValue(rewritten) ?? "—"}</td>
                  <td style={tdStyle}>
                    {delta === null ? "—" : formatDelta(delta)}
                  </td>
                  <td style={{ ...tdStyle, color: closerColor, fontWeight: 800 }}>
                    {closerText}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "10px 12px",
  fontSize: 12,
  fontWeight: 900,
  color: "rgba(255,255,255,0.90)",
};

const tdStyle = {
  padding: "10px 12px",
  color: "rgba(255,255,255,0.82)",
};