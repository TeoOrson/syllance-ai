import React from "react";
import { CATEGORIES, CATEGORY_TARGETS } from "../data/categories";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./ui/table";

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

const CLOSER_COLOR = {
  yes: "text-emerald-400",
  no: "text-red-400",
  same: "text-amber-400",
  none: "text-foreground/70",
};

export default function ValidationPanel({
  originalScores,
  rewrittenScores,
  rewriteMode,
}) {
  if (!rewrittenScores || Object.keys(rewrittenScores).length === 0) {
    return (
      <div className="text-[13px] leading-relaxed text-foreground/65">
        Generate and score a rewrite to validate whether it moves the policy in
        the intended direction.
      </div>
    );
  }

  return (
    <div className="grid gap-2.5">
      <div className="text-[13px] leading-relaxed text-foreground/82">
        <strong>Validation mode:</strong> {rewriteMode}
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-white/5">
              <TableHead>Category</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Original</TableHead>
              <TableHead>Rewrite</TableHead>
              <TableHead>Δ Score</TableHead>
              <TableHead>Closer to Target?</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
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
              let closerKey = "none";

              if (originalDistance !== null && rewrittenDistance !== null) {
                if (rewrittenDistance < originalDistance) {
                  closerText = "Yes";
                  closerKey = "yes";
                } else if (rewrittenDistance > originalDistance) {
                  closerText = "No";
                  closerKey = "no";
                } else {
                  closerText = "No change";
                  closerKey = "same";
                }
              }
              return (
                <TableRow key={category}>
                  <TableCell>{category}</TableCell>
                  <TableCell>{formatValue(target)}</TableCell>
                  <TableCell>{formatValue(original)}</TableCell>
                  <TableCell>{formatValue(rewritten)}</TableCell>
                  <TableCell>{delta === null ? "—" : formatDelta(delta)}</TableCell>
                  <TableCell className={`font-extrabold ${CLOSER_COLOR[closerKey]}`}>
                    {closerText}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
