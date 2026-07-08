"""
sample_validation.py
Builds a stratified 45-policy validation sample for Week 7 human/LLM reliability analysis.

Outputs:
  validation/validation_sample.csv   -- full data (LLM scores + metadata); used for comparison analysis
  validation/coding_sheet.csv        -- policy text + metadata only; no LLM scores; used during human coding
"""

import pandas as pd
import numpy as np
import os

SEED = 42
TARGET_TOTAL = 45

EXCLUDED = {"P090", "P131", "P176", "P182", "P205"}

# B3 policies already qualitatively reviewed by Teo — mandatory includes (all scoreable)
B3_REVIEWED = [
    "P141", "P142", "P143", "P144", "P146", "P147", "P151", "P154",
    "P156", "P158", "P159", "P163", "P164", "P167", "P177", "P180",
    "P188", "P196", "P201", "P203", "P204", "P210", "P211",
]

DATASET = "../full_dataset.csv"
MASTER = "../03 Master Spreadsheet of AI Syllabus Copies - Policies.csv"
OUT_DIR = "../validation"


def max_gap(row):
    return max(row[col] for col in [
        "Formality_gap", "Politeness_gap", "Affect_gap",
        "Strictness_gap", "Clarity_gap", "Contestability_gap"
    ])


def select_fresh(pool: pd.DataFrame, n: int, seed: int) -> list:
    """
    Stratified selection of n fresh policies from B1+B2 pool.
    Priority order ensures coverage of known hard cases.
    """
    rng = np.random.default_rng(seed)
    selected = set()

    def pick(mask, k, label=""):
        candidates = pool[mask & ~pool["ID"].isin(selected)]["ID"].tolist()
        rng.shuffle(candidates)
        picks = candidates[:k]
        selected.update(picks)
        if label:
            print(f"  {label}: {picks}")
        return picks

    print("Fresh sample strata:")

    # Stratum A: Low clarity (<=3.5) — tests E-S2 (clarity overstatement)
    pick(pool["Clarity_primary"] <= 3.5, 7, "Low clarity (<=3.5)")

    # Stratum B: Low strictness (<=2.5) not already picked — tests E-S1
    pick(pool["Strictness_primary"] <= 2.5, 4, "Low strictness (<=2.5)")

    # Stratum C: High contestability (>=3.5) not already picked — tests E-S3/E-S9
    pick(pool["Contestability_primary"] >= 3.5, 4, "High contestability (>=3.5)")

    # Stratum D: High Affect gap (>=1.5) not already picked — targets E-S7 patterns
    pick(pool["Affect_gap"] >= 1.5, 4, "High Affect gap (>=1.5)")

    # Stratum E: High strictness (>=4.5) with low Politeness (<=2.5)
    #            — tests polite wording vs autonomy confusion
    pick(
        (pool["Strictness_primary"] >= 4.5) & (pool["Politeness_primary"] <= 2.5),
        3, "High strictness + low politeness"
    )

    # Stratum F: High strictness (>=4.5) with high Politeness (>=3.5)
    #            — polite but restrictive; tests E-S6
    pick(
        (pool["Strictness_primary"] >= 4.5) & (pool["Politeness_primary"] >= 3.5),
        2, "High strictness + high politeness (E-S6 test)"
    )

    # Stratum G: Fill remaining with highest max_gap (most uncertain policies)
    remaining_needed = n - len(selected)
    if remaining_needed > 0:
        pick(pool["max_gap"] >= 1.5, remaining_needed, f"High max-gap fill ({remaining_needed} needed)")

    return list(selected)[:n]


def main():
    rng = np.random.default_rng(SEED)

    df = pd.read_csv(DATASET)
    df_ok = df[df["status"] == "ok"].copy()
    df_ok = df_ok[~df_ok["ID"].isin(EXCLUDED)]

    master = pd.read_csv(MASTER)
    master = master.rename(columns={"Policy in the Syllabus": "policy_text"})

    df_ok["max_gap"] = df_ok.apply(max_gap, axis=1)

    # B3 mandatory includes
    b3_df = df_ok[df_ok["ID"].isin(B3_REVIEWED)].copy()
    b3_df["stratum"] = "B3_reviewed"
    print(f"B3 mandatory includes: {len(b3_df)} policies")

    # B1+B2 fresh pool
    pool = df_ok[~df_ok["ID"].isin(B3_REVIEWED)].copy()
    fresh_needed = TARGET_TOTAL - len(b3_df)
    print(f"Fresh needed from B1+B2: {fresh_needed}")
    print()

    fresh_ids = select_fresh(pool, fresh_needed, SEED)
    fresh_df = pool[pool["ID"].isin(fresh_ids)].copy()
    fresh_df["stratum"] = "fresh"

    sample = pd.concat([b3_df, fresh_df], ignore_index=True)
    sample = sample.sort_values("ID").reset_index(drop=True)
    sample["coding_order"] = range(1, len(sample) + 1)

    # Shuffle coding order so Teo doesn't see B3 policies grouped together
    order = list(range(len(sample)))
    rng.shuffle(order)
    sample["coding_order"] = [order.index(i) + 1 for i in range(len(sample))]
    sample = sample.sort_values("coding_order").reset_index(drop=True)

    print(f"\nTotal sample: {len(sample)} policies")

    # Join policy text
    sample = sample.merge(
        master[["ID", "policy_text"]],
        on="ID",
        how="left"
    )

    os.makedirs(OUT_DIR, exist_ok=True)

    # Full validation sample (LLM scores visible)
    llm_cols = [
        "coding_order", "ID", "stratum", "course", "discipline", "course_level",
        "institution", "policy_text", "needs_human_review", "max_gap",
        "Formality_primary", "Politeness_primary", "Affect_primary",
        "Strictness_primary", "Clarity_primary", "Contestability_primary",
        "Formality_validation", "Politeness_validation", "Affect_validation",
        "Strictness_validation", "Clarity_validation", "Contestability_validation",
        "Formality_gap", "Politeness_gap", "Affect_gap",
        "Strictness_gap", "Clarity_gap", "Contestability_gap",
    ]
    sample[llm_cols].to_csv(f"{OUT_DIR}/validation_sample.csv", index=False)
    print(f"Wrote: {OUT_DIR}/validation_sample.csv")

    # Coding sheet (no LLM scores — for human review session)
    coding_cols = [
        "coding_order", "ID", "stratum", "course", "discipline", "course_level",
        "institution", "policy_text",
        # Blank columns for human scores
        "human_Formality", "human_Politeness", "human_Affect",
        "human_Strictness", "human_Clarity", "human_Contestability",
        "notes",
    ]
    for col in ["human_Formality", "human_Politeness", "human_Affect",
                "human_Strictness", "human_Clarity", "human_Contestability", "notes"]:
        sample[col] = ""

    sample[coding_cols].to_csv(f"{OUT_DIR}/coding_sheet.csv", index=False)
    print(f"Wrote: {OUT_DIR}/coding_sheet.csv")

    # Summary
    print("\nSample composition:")
    print(f"  B3 reviewed (already read): {len(b3_df)}")
    print(f"  Fresh from B1+B2: {len(fresh_df)}")
    print(f"\nStrata coverage:")
    print(f"  Low clarity (<=3.5): {len(sample[sample['Clarity_primary'] <= 3.5])}")
    print(f"  Low strictness (<=2.5): {len(sample[sample['Strictness_primary'] <= 2.5])}")
    print(f"  High contestability (>=3.5): {len(sample[sample['Contestability_primary'] >= 3.5])}")
    print(f"  High Affect gap (>=1.5): {len(sample[sample['Affect_gap'] >= 1.5])}")
    print(f"  High strictness (>=4.5): {len(sample[sample['Strictness_primary'] >= 4.5])}")
    print(f"  needs_human_review=YES: {len(sample[sample['needs_human_review'] == 'YES'])}")


if __name__ == "__main__":
    main()
