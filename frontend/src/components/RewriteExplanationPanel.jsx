import React from "react";
import { CATEGORIES, CATEGORY_TARGETS } from "../data/categories";

function distance(score, target) {
  if (typeof score !== "number") return null;
  return Math.abs(score - target);
}

function format(value) {
  return typeof value === "number" ? value.toFixed(1) : "—";
}

export default function RewriteExplanationPanel({
  originalScores,
  rewrittenScores,
  candidates,
  bestIndex,
}) {
  const hasRewrite = rewrittenScores && Object.keys(rewrittenScores).length > 0;

  if (!hasRewrite) {
    return (
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>
        Generate an optimized rewrite to see how the rewrite was selected.
      </div>
    );
  }

  const rows = CATEGORIES.map((category) => {
    const target = CATEGORY_TARGETS[category];
    const original = originalScores?.[category];
    const rewrite = rewrittenScores?.[category];

    const oldDistance = distance(original, target);
    const newDistance = distance(rewrite, target);

    let result = "No change";
    if (oldDistance !== null && newDistance !== null) {
      if (newDistance < oldDistance) result = "Moved closer";
      else if (newDistance > oldDistance) result = "Moved farther";
    }

    return { category, target, original, rewrite, result };
  });

  const improved = rows.filter((r) => r.result === "Moved closer").length;
  const worsened = rows.filter((r) => r.result === "Moved farther").length;
  const unchanged = rows.filter((r) => r.result === "No change").length;

  const bestCandidate = candidates?.find((c) => c.index === bestIndex);

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div
        style={{
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.10)",
          background: "rgba(255,255,255,0.03)",
          padding: 12,
          fontSize: 13,
          lineHeight: 1.6,
          color: "rgba(255,255,255,0.82)",
        }}
      >
        <strong>Rewrite selection summary:</strong> The optimizer generated{" "}
        {candidates?.length || 0} rewrite candidates and selected Candidate{" "}
        {(bestIndex ?? 0) + 1} because it had the lowest average distance from
        the target category profile.
        {bestCandidate?.distance_to_target !== undefined && (
          <>
            {" "}
            Best distance: <strong>{bestCandidate.distance_to_target}</strong>.
          </>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 10,
        }}
      >
        <MiniStat label="Moved closer" value={improved} />
        <MiniStat label="Moved farther" value={worsened} />
        <MiniStat label="No change" value={unchanged} />
      </div>

      <div
        style={{
          overflowX: "auto",
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.10)",
          background: "rgba(255,255,255,0.03)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.05)" }}>
              <th style={th}>Category</th>
              <th style={th}>Target</th>
              <th style={th}>Original</th>
              <th style={th}>Rewrite</th>
              <th style={th}>Result</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.category} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <td style={td}>{row.category}</td>
                <td style={td}>{format(row.target)}</td>
                <td style={td}>{format(row.original)}</td>
                <td style={td}>{format(row.rewrite)}</td>
                <td style={td}>{row.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div
      style={{
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.03)",
        padding: 12,
      }}
    >
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.62)" }}>{label}</div>
      <div style={{ marginTop: 4, fontSize: 22, fontWeight: 950 }}>{value}</div>
    </div>
  );
}

const th = {
  textAlign: "left",
  padding: "10px 12px",
  fontWeight: 900,
  color: "rgba(255,255,255,0.90)",
};

const td = {
  padding: "10px 12px",
  color: "rgba(255,255,255,0.82)",
};