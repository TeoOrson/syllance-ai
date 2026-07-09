import React from "react";
import { CATEGORIES } from "../data/categories";
import { Textarea } from "./ui/textarea";

function formatScore(value) {
  return typeof value === "number" ? value.toFixed(1) : "—";
}

export default function RewriteCandidatesPanel({ candidates, bestIndex }) {
  if (!candidates || candidates.length === 0) {
    return (
      <div className="text-[13px] text-foreground/65">
        Generate a rewrite to view candidate attempts and scoring.
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {candidates.map((candidate) => {
        const isBest = candidate.index === bestIndex;

        return (
          <details
            key={candidate.index}
            open={isBest}
            className={
              "rounded-lg border p-3 " +
              (isBest
                ? "border-brand-cyan/45 bg-brand-cyan/6"
                : "border-border bg-card")
            }
          >
            <summary className="cursor-pointer font-black text-foreground/92">
              Candidate {candidate.index + 1}
              {isBest ? " — Best" : ""} | Distance: {candidate.distance_to_target}
            </summary>

            <div className="mt-3 grid gap-3">
              <Textarea
                readOnly
                value={candidate.rewrite || ""}
                className="min-h-[120px] resize-y leading-relaxed"
              />

              <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-2">
                {CATEGORIES.map((category) => (
                  <div key={category} className="rounded-[10px] border border-border bg-card p-2">
                    <div className="text-[11px] font-black">{category}</div>
                    <div className="mt-1 text-xs">
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
