# Reliability Analysis — Computed Tables

## Table 1: Agreement Rates by Dimension

| Dimension | Exact | Within 1pt | Off by 2 | Major (≥3) | Bias |
|-----------|-------|-----------|----------|------------|------|
| Formality | 44.4% | 57.8% | 37.8% | 4.4% | LLM over (+0.71) |
| Politeness | 73.3% | 86.7% | 11.1% | 2.2% | LLM over (+0.25) |
| Affect | 40.0% | 71.1% | 20.0% | 8.9% | LLM neutral (+0.14) |
| Strictness | 55.6% | 73.3% | 24.4% | 2.2% | LLM over (+0.36) |
| Clarity | 24.4% | 35.6% | 44.4% | 20.0% | LLM over (+1.78) |
| Contestability | 37.8% | 57.8% | 35.6% | 6.7% | LLM over (+0.87) |

## Table 2: Directional Bias — Does the LLM Systematically Over/Under-Score?

| Dimension | LLM Over% | LLM Under% | Mean Signed Diff | Verdict |
|-----------|-----------|------------|-----------------|--------|
| Formality | 64.4% | 24.4% | +0.71 | over |
| Politeness | 46.7% | 33.3% | +0.25 | over |
| Affect | 40.0% | 42.2% | +0.14 | neutral |
| Strictness | 57.8% | 24.4% | +0.36 | over |
| Clarity | 95.6% | 0.0% | +1.78 | over |
| Contestability | 73.3% | 17.8% | +0.87 | over |

## Table 3: Full Per-Policy Comparison

| ID | Formality (LLM→H) band | Politeness (LLM→H) band | Affect (LLM→H) band | Strictness (LLM→H) band | Clarity (LLM→H) band | Contestability (LLM→H) band |
|---|---|---|---|---|---|---|
| P163 | 3.5→4.0 (exact) | 3.5→2.5 (off_by_1) | 3.8→4.0 (exact) | 3.2→3.0 (exact) | 4.8→4.0 (off_by_1) | 3.7→2.5 (off_by_1) |
| P180 | 2.5→2.0 (exact) | 1.5→1.5 (exact) | 2.5→1.5 (off_by_1) | 4.0→4.0 (exact) | 4.5→2.0 (off_by_2) | 2.5→1.0 (off_by_2) |
| P211 | 3.5→4.0 (exact) | 2.5→3.0 (exact) | 2.0→2.0 (exact) | 3.5→4.0 (exact) | 4.5→2.0 (off_by_2) | 3.5→1.5 (off_by_2) |
| P151 | 4.0→3.0 (off_by_1) | 2.5→2.0 (exact) | 3.8→2.5 (off_by_1) | 4.5→4.0 (exact) | 4.5→2.5 (off_by_2) | 2.5→1.5 (off_by_1) |
| P158 | 3.5→4.0 (exact) | 2.5→2.0 (exact) | 2.8→3.0 (exact) | 4.5→4.0 (exact) | 4.5→4.0 (exact) | 3.5→2.0 (off_by_2) |
| P147 | 3.5→4.0 (exact) | 3.5→3.0 (exact) | 2.5→5.0 (off_by_2) | 3.5→4.0 (exact) | 4.5→4.0 (exact) | 3.0→2.5 (exact) |
| P204 | 3.5→4.0 (exact) | 2.0→2.0 (exact) | 2.0→4.0 (off_by_2) | 5.0→3.5 (off_by_2) | 5.0→3.0 (off_by_2) | 1.0→1.0 (exact) |
| P173 | 4.0→2.5 (off_by_2) | 2.5→2.0 (exact) | 2.0→2.0 (exact) | 4.5→5.0 (exact) | 3.5→3.0 (exact) | 2.0→1.0 (off_by_1) |
| P029 | 3.5→2.0 (off_by_2) | 2.5→1.5 (off_by_1) | 2.0→1.0 (off_by_1) | 4.5→3.5 (off_by_1) | 5.0→2.5 (off_by_2) | 3.0→1.5 (off_by_2) |
| P154 | 4.5→4.0 (exact) | 2.5→3.0 (exact) | 2.0→4.0 (off_by_2) | 4.5→3.0 (off_by_2) | 4.8→3.0 (off_by_2) | 2.5→1.5 (off_by_1) |
| P181 | 3.5→5.0 (off_by_2) | 4.5→3.0 (off_by_2) | 4.0→1.0 (major) | 2.5→4.0 (off_by_2) | 3.0→2.5 (exact) | 3.0→1.0 (off_by_2) |
| P071 | 3.5→4.0 (exact) | 2.5→2.5 (exact) | 2.7→3.5 (off_by_1) | 4.5→4.0 (exact) | 4.8→2.0 (major) | 2.8→1.0 (off_by_2) |
| P160 | 3.0→3.5 (exact) | 3.0→3.0 (exact) | 3.0→3.0 (exact) | 2.0→1.0 (off_by_1) | 4.0→1.0 (major) | 1.0→1.0 (exact) |
| P075 | 2.5→2.0 (exact) | 2.5→3.0 (exact) | 2.0→4.0 (off_by_2) | 3.5→3.0 (exact) | 4.5→3.0 (off_by_2) | 2.5→2.0 (exact) |
| P146 | 4.0→3.0 (off_by_1) | 2.0→3.5 (off_by_2) | 2.0→3.5 (off_by_2) | 5.0→3.0 (off_by_2) | 5.0→4.5 (exact) | 3.0→1.5 (off_by_2) |
| P041 | 5.0→3.0 (off_by_2) | 2.0→2.5 (exact) | 2.0→2.0 (exact) | 5.0→3.5 (off_by_2) | 4.5→2.0 (off_by_2) | 1.5→1.0 (exact) |
| P143 | 3.5→2.5 (off_by_1) | 2.5→2.5 (exact) | 2.0→2.0 (exact) | 3.5→4.0 (exact) | 4.5→2.5 (off_by_2) | 2.0→1.0 (off_by_1) |
| P201 | 3.0→3.0 (exact) | 2.5→3.0 (exact) | 2.0→2.5 (exact) | 4.0→4.0 (exact) | 5.0→2.5 (off_by_2) | 2.0→1.0 (off_by_1) |
| P141 | 2.5→2.0 (exact) | 3.5→4.0 (exact) | 2.5→2.5 (exact) | 3.5→3.0 (exact) | 4.5→2.0 (off_by_2) | 2.5→4.0 (off_by_2) |
| P188 | 4.5→3.5 (off_by_1) | 3.5→2.5 (off_by_1) | 3.0→2.5 (exact) | 4.5→3.0 (off_by_2) | 4.8→2.5 (off_by_2) | 2.5→4.0 (off_by_2) |
| P159 | 2.5→2.5 (exact) | 4.2→4.0 (exact) | 4.8→3.5 (off_by_1) | 3.5→3.5 (exact) | 5.0→4.0 (off_by_1) | 4.0→4.0 (exact) |
| P167 | 2.5→2.0 (exact) | 4.5→2.5 (off_by_2) | 4.8→2.0 (major) | 4.2→4.0 (exact) | 4.8→2.0 (major) | 3.5→4.5 (off_by_1) |
| P156 | 4.0→4.0 (exact) | 2.5→2.0 (exact) | 2.0→1.5 (exact) | 4.5→4.5 (exact) | 5.0→2.0 (major) | 1.5→1.0 (exact) |
| P197 | 2.8→1.0 (off_by_2) | 3.5→2.0 (off_by_2) | 4.5→1.0 (major) | 3.8→4.0 (exact) | 4.8→1.5 (major) | 4.2→1.0 (major) |
| P078 | 2.7→1.0 (off_by_2) | 2.3→2.5 (exact) | 1.8→1.5 (exact) | 4.8→5.0 (exact) | 3.5→1.5 (off_by_2) | 1.2→1.0 (exact) |
| P026 | 4.5→3.0 (off_by_2) | 2.5→3.0 (exact) | 1.5→2.0 (exact) | 4.8→4.0 (off_by_1) | 4.5→1.0 (major) | 1.5→1.0 (exact) |
| P196 | 3.5→2.0 (off_by_2) | 2.5→3.0 (exact) | 2.0→4.0 (off_by_2) | 4.5→3.0 (off_by_2) | 4.8→4.0 (off_by_1) | 1.5→2.0 (exact) |
| P203 | 3.5→2.0 (off_by_2) | 2.5→2.0 (exact) | 2.0→2.0 (exact) | 4.5→5.0 (exact) | 4.0→2.0 (off_by_2) | 2.0→3.0 (off_by_1) |
| P142 | 4.5→1.0 (major) | 2.0→2.0 (exact) | 1.5→1.0 (exact) | 5.0→4.5 (exact) | 4.5→1.5 (major) | 1.5→2.5 (off_by_1) |
| P164 | 3.0→1.5 (off_by_2) | 2.0→2.0 (exact) | 2.0→1.0 (off_by_1) | 3.5→4.5 (off_by_1) | 4.5→1.0 (major) | 3.5→1.0 (off_by_2) |
| P062 | 3.5→2.0 (off_by_2) | 3.5→3.5 (exact) | 4.5→3.5 (off_by_1) | 3.5→2.5 (off_by_1) | 4.5→3.0 (off_by_2) | 3.5→4.0 (exact) |
| P101 | 3.5→3.0 (exact) | 3.5→3.0 (exact) | 2.5→3.5 (off_by_1) | 3.5→3.5 (exact) | 4.5→2.0 (off_by_2) | 2.5→1.0 (off_by_2) |
| P083 | 3.5→2.0 (off_by_2) | 4.5→4.0 (exact) | 5.0→4.0 (off_by_1) | 2.5→2.5 (exact) | 3.0→3.0 (exact) | 4.0→3.5 (exact) |
| P148 | 2.5→1.0 (off_by_2) | 3.5→4.0 (exact) | 2.5→3.5 (off_by_1) | 2.5→2.5 (exact) | 4.5→4.5 (exact) | 3.5→4.0 (exact) |
| P144 | 4.5→1.0 (major) | 2.5→1.5 (off_by_1) | 1.5→1.5 (exact) | 5.0→4.0 (off_by_1) | 4.8→1.5 (major) | 1.5→1.0 (exact) |
| P002 | 1.0→1.0 (exact) | 4.5→1.0 (major) | 5.0→1.0 (major) | 1.0→5.0 (major) | 3.5→3.0 (exact) | 4.5→1.0 (major) |
| P087 | 3.5→2.5 (off_by_1) | 4.5→3.0 (off_by_2) | 4.8→2.5 (off_by_2) | 3.5→4.0 (exact) | 4.8→3.0 (off_by_2) | 3.8→1.0 (major) |
| P096 | 2.5→3.0 (exact) | 4.5→4.0 (exact) | 4.0→5.0 (off_by_1) | 2.5→1.5 (off_by_1) | 4.5→4.0 (exact) | 3.5→1.0 (off_by_2) |
| P210 | 4.5→4.0 (exact) | 2.5→3.6 (off_by_1) | 2.0→3.0 (off_by_1) | 4.8→3.0 (off_by_2) | 4.8→3.5 (off_by_1) | 3.5→1.0 (off_by_2) |
| P018 | 3.5→4.5 (off_by_1) | 3.5→4.0 (exact) | 3.5→5.0 (off_by_2) | 4.5→3.0 (off_by_2) | 4.5→4.0 (exact) | 2.5→1.0 (off_by_2) |
| P184 | 3.5→1.0 (off_by_2) | 3.5→2.5 (off_by_1) | 4.5→2.0 (off_by_2) | 4.5→4.0 (exact) | 3.5→2.0 (off_by_2) | 3.5→1.0 (off_by_2) |
| P177 | 4.5→4.5 (exact) | 2.5→3.0 (exact) | 2.8→3.0 (exact) | 4.5→3.0 (off_by_2) | 4.8→4.0 (off_by_1) | 1.5→1.5 (exact) |
| P013 | 3.5→2.0 (off_by_2) | 2.5→3.0 (exact) | 3.5→4.5 (off_by_1) | 4.5→3.0 (off_by_2) | 4.8→4.5 (exact) | 2.5→1.0 (off_by_2) |
| P095 | 4.5→3.0 (off_by_2) | 2.5→2.0 (exact) | 1.5→1.0 (exact) | 4.8→4.0 (off_by_1) | 3.5→1.0 (off_by_2) | 1.5→1.0 (exact) |
| P074 | 2.5→4.0 (off_by_2) | 2.0→2.0 (exact) | 1.5→2.5 (off_by_1) | 4.5→4.5 (exact) | 3.5→1.0 (off_by_2) | 1.5→1.0 (exact) |
