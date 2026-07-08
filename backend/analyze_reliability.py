"""
analyze_reliability.py
Runs after human coding is complete.

Reads:
  validation/validation_sample.csv   -- LLM scores
  validation/human_scores.csv        -- Teo's human scores (ID + 6 dimensions)

Outputs:
  validation/comparison_tables.csv   -- per-policy agreement for each dimension
  validation/reliability_summary.csv -- dimension-level agreement rates + bias direction
  validation/reliability_memo_data.md -- formatted tables ready to paste into the memo
"""

import pandas as pd
import numpy as np

DIMS = ["Formality", "Politeness", "Affect", "Strictness", "Clarity", "Contestability"]


def agreement_band(diff):
    if diff == 0:
        return "exact"
    elif diff == 1:
        return "off_by_1"
    elif diff == 2:
        return "off_by_2"
    else:
        return "major"


def bias_direction(llm_score, human_score):
    """Returns 'over' if LLM scored higher, 'under' if lower, 'match' if equal."""
    if llm_score > human_score:
        return "over"
    elif llm_score < human_score:
        return "under"
    return "match"


def main():
    sample = pd.read_csv("../validation/validation_sample.csv")
    human = pd.read_csv("../validation/human_scores.csv")

    # Merge
    df = sample.merge(human[["ID"] + [f"human_{d}" for d in DIMS]], on="ID", how="inner")
    print(f"Matched policies: {len(df)} / {len(sample)} in sample, {len(human)} human-coded")

    rows = []
    for _, row in df.iterrows():
        entry = {"ID": row["ID"], "discipline": row["discipline"], "stratum": row["stratum"]}
        for dim in DIMS:
            llm = float(row[f"{dim}_primary"])
            hum = float(row[f"human_{dim}"])
            diff = abs(round(llm - hum))
            entry[f"{dim}_llm"] = llm
            entry[f"{dim}_human"] = hum
            entry[f"{dim}_diff"] = round(llm - hum, 1)   # signed (+ = LLM over, - = LLM under)
            entry[f"{dim}_band"] = agreement_band(diff)
            entry[f"{dim}_bias"] = bias_direction(llm, hum)
        rows.append(entry)

    comp = pd.DataFrame(rows)
    comp.to_csv("../validation/comparison_tables.csv", index=False)
    print("Wrote: ../validation/comparison_tables.csv")

    # Reliability summary per dimension
    summary_rows = []
    for dim in DIMS:
        n = len(comp)
        exact = (comp[f"{dim}_band"] == "exact").sum()
        off1 = (comp[f"{dim}_band"] == "off_by_1").sum()
        off2 = (comp[f"{dim}_band"] == "off_by_2").sum()
        major = (comp[f"{dim}_band"] == "major").sum()
        over = (comp[f"{dim}_bias"] == "over").sum()
        under = (comp[f"{dim}_bias"] == "under").sum()
        mean_signed = comp[f"{dim}_diff"].mean()  # + = LLM over, - = LLM under
        within1 = exact + off1

        summary_rows.append({
            "dimension": dim,
            "n": n,
            "exact": exact,
            "exact_pct": round(exact / n * 100, 1),
            "within_1": within1,
            "within_1_pct": round(within1 / n * 100, 1),
            "off_by_2": off2,
            "off_by_2_pct": round(off2 / n * 100, 1),
            "major": major,
            "major_pct": round(major / n * 100, 1),
            "llm_over_pct": round(over / n * 100, 1),
            "llm_under_pct": round(under / n * 100, 1),
            "mean_signed_diff": round(mean_signed, 2),
            "bias_direction": "over" if mean_signed > 0.2 else ("under" if mean_signed < -0.2 else "neutral"),
        })

    summary = pd.DataFrame(summary_rows)
    summary.to_csv("../validation/reliability_summary.csv", index=False)
    print("Wrote: ../validation/reliability_summary.csv")

    # Print console report
    print("\n" + "=" * 70)
    print("RELIABILITY SUMMARY")
    print("=" * 70)
    for _, r in summary.iterrows():
        print(f"\n{r['dimension']}:")
        print(f"  Exact: {r['exact_pct']}% | Within 1pt: {r['within_1_pct']}% | "
              f"Major disagreement: {r['major_pct']}%")
        print(f"  LLM over: {r['llm_over_pct']}% | LLM under: {r['llm_under_pct']}% | "
              f"Mean signed diff: {r['mean_signed_diff']} ({r['bias_direction']})")

    # Formatted markdown tables for the memo
    with open("../validation/reliability_memo_data.md", "w") as f:
        f.write("# Reliability Analysis — Computed Tables\n\n")

        f.write("## Table 1: Agreement Rates by Dimension\n\n")
        f.write("| Dimension | Exact | Within 1pt | Off by 2 | Major (≥3) | Bias |\n")
        f.write("|-----------|-------|-----------|----------|------------|------|\n")
        for _, r in summary.iterrows():
            f.write(f"| {r['dimension']} | {r['exact_pct']}% | {r['within_1_pct']}% | "
                    f"{r['off_by_2_pct']}% | {r['major_pct']}% | "
                    f"LLM {r['bias_direction']} ({r['mean_signed_diff']:+.2f}) |\n")

        f.write("\n## Table 2: Directional Bias — Does the LLM Systematically Over/Under-Score?\n\n")
        f.write("| Dimension | LLM Over% | LLM Under% | Mean Signed Diff | Verdict |\n")
        f.write("|-----------|-----------|------------|-----------------|--------|\n")
        for _, r in summary.iterrows():
            f.write(f"| {r['dimension']} | {r['llm_over_pct']}% | {r['llm_under_pct']}% | "
                    f"{r['mean_signed_diff']:+.2f} | {r['bias_direction']} |\n")

        f.write("\n## Table 3: Full Per-Policy Comparison\n\n")
        header = "| ID | " + " | ".join([f"{d} (LLM→H) band" for d in DIMS]) + " |\n"
        f.write(header)
        f.write("|" + "---|" * (len(DIMS) + 1) + "\n")
        for _, row in comp.iterrows():
            cells = [row["ID"]]
            for dim in DIMS:
                cells.append(f"{row[f'{dim}_llm']}→{row[f'{dim}_human']} ({row[f'{dim}_band']})")
            f.write("| " + " | ".join(str(c) for c in cells) + " |\n")

    print("\nWrote: ../validation/reliability_memo_data.md")
    print("\nRun this after all human scores are in validation/human_scores.csv")


if __name__ == "__main__":
    main()
