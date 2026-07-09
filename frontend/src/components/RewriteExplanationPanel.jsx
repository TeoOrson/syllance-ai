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
      <div className="text-[13px] text-foreground/65">
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
    <div className="grid gap-3.5">
      <div className="rounded-lg border border-border bg-card p-3 text-[13px] leading-relaxed text-foreground/82">
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

      <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-2.5">
        <MiniStat label="Moved closer" value={improved} />
        <MiniStat label="Moved farther" value={worsened} />
        <MiniStat label="No change" value={unchanged} />
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-white/5">
              <TableHead>Category</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Original</TableHead>
              <TableHead>Rewrite</TableHead>
              <TableHead>Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.category}>
                <TableCell>{row.category}</TableCell>
                <TableCell>{format(row.target)}</TableCell>
                <TableCell>{format(row.original)}</TableCell>
                <TableCell>{format(row.rewrite)}</TableCell>
                <TableCell>{row.result}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="text-xs text-foreground/62">{label}</div>
      <div className="mt-1 text-[22px] font-black">{value}</div>
    </div>
  );
}
