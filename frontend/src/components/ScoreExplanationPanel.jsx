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
    <div className="grid gap-3">
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
            className="rounded-lg border border-border bg-card p-3"
          >
            <summary className="cursor-pointer font-black text-foreground/92">
              {category}: {formatScore(score)}/5 · Target: {formatScore(target)}
              {tierMeta && (
                <span
                  title={`${tierMeta.label} — human/LLM validation study`}
                  className="ml-2 text-[11px] font-bold tracking-widest"
                  style={{ color: tierMeta.color }}
                >
                  {"●".repeat(tierMeta.dots)}
                  {"○".repeat(3 - tierMeta.dots)} {tierMeta.label}
                </span>
              )}
            </summary>

            <div className="mt-2.5 grid gap-2 text-[13px] leading-relaxed text-foreground/78">
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
                  className="mt-1 border-t border-border pt-2"
                  style={{ color: tierMeta?.color }}
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
