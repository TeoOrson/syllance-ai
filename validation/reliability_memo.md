# Human-in-the-Loop Review of AI Syllabus Policy Classification
**SyllanceAI Research Project — Week 7 Reliability Analysis**  
**Reviewer:** Teo Orson  
**Date:** July 2026  
**Sample:** 45 policies (23 B3 re-coded, 22 fresh from B1/B2)  
**Models evaluated:** Primary scorer — gemma4:e4b | Validation scorer — qwen3.5:9b

---

## 1. Purpose

This memo reports the results of a systematic human/LLM reliability analysis for the SyllanceAI policy classification system. The primary scorer (gemma4:e4b) was evaluated against human scores across six perception dimensions: Formality, Politeness, Affect, Strictness, Clarity, and Contestability. The validation sample was stratified to include high and low scorers on key dimensions, policies with high model disagreement, and unusual or ambiguous formats.

The central research questions are: (1) Which dimensions does the model score reliably? (2) Where does it fail systematically? (3) What should be done before these scores are used in research or shown to instructors?

---

## 2. Sample Composition

| Category | N |
|---|---|
| B3 policies (previously read, re-coded numerically) | 23 |
| Fresh policies from B1/B2 | 22 |
| **Total** | **45** |

**Strata represented:** Low clarity (n=8), low strictness (n=6), high contestability (n=15), high Affect gap (n=17), high strictness + low politeness (n=3), high strictness + high politeness (n=2), deferred policy format (n=1), non-English policy (n=1), K-12 institution (n=1).

Human coding was conducted blind — LLM scores were not visible during the review session. Scores were recorded dimension-by-dimension, with mid-session revisions permitted. One policy (P160, "See policy and guidance for the use of AI generative tools here") required a joint consensus score due to its deferred format; notes to that effect are preserved in `human_scores.csv`.

---

## 3. Agreement Statistics

Agreement was coded as: **exact** (0 points difference), **off by 1**, **off by 2**, or **major** (≥3 points). Bias direction (positive = LLM over-scores, negative = LLM under-scores) is expressed as mean signed difference.

### Table 1: Agreement Rates by Dimension

| Dimension | Exact | Within 1pt | Off by 2 | Major | Mean Signed Diff | Bias |
|---|---|---|---|---|---|---|
| Politeness | 73.3% | **86.7%** | 11.1% | 2.2% | +0.25 | slight over |
| Strictness | 55.6% | 73.3% | 24.4% | 2.2% | +0.36 | slight over |
| Affect | 40.0% | 71.1% | 20.0% | 8.9% | +0.14 | neutral |
| Formality | 44.4% | 57.8% | 37.8% | 4.4% | +0.71 | over |
| Contestability | 37.8% | 57.8% | 35.6% | 6.7% | +0.87 | over |
| **Clarity** | **24.4%** | **35.6%** | **44.4%** | **20.0%** | **+1.78** | **severe over** |

### Table 2: Directional Bias Summary

| Dimension | LLM Over% | LLM Under% | Match% | Mean Diff |
|---|---|---|---|---|
| Politeness | 46.7% | 33.3% | 20.0% | +0.25 |
| Strictness | 57.8% | 24.4% | 17.8% | +0.36 |
| Affect | 40.0% | 42.2% | 17.8% | +0.14 |
| Formality | 64.4% | 24.4% | 11.1% | +0.71 |
| Contestability | 73.3% | 17.8% | 8.9% | +0.87 |
| **Clarity** | **95.6%** | **0.0%** | **4.4%** | **+1.78** |

*Note: No policy received an exact match across all six dimensions simultaneously. 33/45 policies (73.3%) had no major disagreements on any dimension.*

---

## 4. Dimension-by-Dimension Reliability Analysis

### 4.1 Clarity — Unreliable; Systematic Over-Scoring

**Reliability verdict: LOW — do not use automated Clarity scores without human review.**

Clarity is the most severely compromised dimension. The LLM scored higher than the human coder on **95.6%** of policies, with a mean signed difference of **+1.78 points**. Nine policies (20%) showed major disagreement (≥3 points). The LLM never under-scored Clarity.

The root error is consistent: the model interprets **structural completeness and confident register** as clarity, rather than whether a student actually knows what is and is not permitted. Several sub-patterns were confirmed:

- **Terse prohibition policies** (P074, P095, P142): a single sentence banning AI has clear register but tells students nothing about what "AI" means or what happens if they use it → human scored 1.0–1.5, LLM scored 3.5–4.5
- **Principle-based policies** (P163, P026, P144): well-organized lists of values ("transparency, originality, accuracy") read as thorough but leave operational questions unanswered → human scored 1.0–2.0, LLM scored 4.0–4.8
- **Deferred-scope policies** (P156, P196): "when instructed" or assignment-specific permissions not defined in the syllabus → human scored 2.0, LLM scored 4.5–5.0
- **Deferred policy entirely** (P160): single sentence pointing offsite → human scored 1.0, LLM scored 4.0

Worst cases: P164 (LLM 4.5 / Human 1.0, Δ = **+3.5**), P026 (4.5 / 1.0, Δ = **+3.5**), P144 (4.8 / 1.5, Δ = **+3.3**), P197 (4.8 / 1.5, Δ = **+3.3**).

---

### 4.2 Contestability — Unreliable; Systematic Over-Scoring

**Reliability verdict: LOW — flag all automated scores above 2.5 for human review.**

The LLM over-scored Contestability in **73.3%** of policies, with a mean signed difference of **+0.87**. The core failure: the model conflates **warm or explanatory tone** with actual negotiability. A policy that explains its reasoning, provides instructor contact information, or uses first-person collaborative language is not thereby contestable — contestability requires an explicit mechanism for students to question, appeal, or renegotiate the terms.

Three confirmed over-scoring patterns:
1. **Explanatory rationale mistaken for dialogue** (P002, P087, P197, P181): instructors who explain *why* the rules exist are scored as more contestable, when in fact the rules are still non-negotiable
2. **Contact info for questions ≠ appeal mechanism** (P062, P148 scored correctly; P071, P087 over-scored): "email me with questions" about logistics is not the same as "contact me to negotiate policy exceptions"
3. **Broad definitional scope mistaken for negotiability** (P210, previously confirmed as E-S9): a policy that carefully defines what counts as AI use (to close loopholes) is not thereby open to renegotiation

Worst cases: P002 (4.5 / 1.0, Δ = **+3.5**), P197 (4.2 / 1.0, Δ = **+3.2**), P087 (3.8 / 1.0, Δ = **+2.8**).

---

### 4.3 Affect — Moderate Reliability; Bidirectional Failure

**Reliability verdict: MODERATE — directional bias is neutral in aggregate but errors are large and unpredictable. Use with caution; flag extreme scores.**

Affect is the most behaviorally complex dimension. The aggregate bias is nearly neutral (+0.14), which initially appeared reassuring. However, this neutrality masks bidirectional errors of equal magnitude: the LLM over-scores on 13 policies and under-scores on 14, with many individual differences exceeding 2.0 points.

Two distinct failure modes operate in opposite directions:

**Mode 1 — Tone-driven over-scoring (LLM scores too high):** The model reads warm, casual, or intellectually generous tone and assigns high Affect, even when the actual rules are restrictive or punitive. Examples: P002 (LLM 5.0 / Human 1.0 — "none of you are mediocre" misread as empowering; the policy is a near-total ban); P181 (4.0 / 1.0 — philosophical pedagogical framing misread as supportive; the policy prohibits AI); P197 (4.5 / 1.0 — welcoming opener misread; environmental impact requirements signal distrust); P167 (4.8 / 2.0 — "I am happy to help" misread as Empowering; the policy is a prohibition with sanctions).

**Mode 2 — Caution-anchoring under-scoring (LLM scores too low):** The model anchors on any cautionary language present and suppresses the Affect score, even when the policy has a permissive or skills-forward overall register. Examples: P147 (LLM 2.5 / Human 5.0 — "still-developing skillset expected in the workplace" is strongly forward-looking/empowering; LLM scored cautionary); P154 (2.0 / 4.0 — "valuable tool at the initial stages" opener ignored); P075 (2.0 / 4.0 — "I am assuming we won't have a problem... spend the semester learning together" ignored); P196 (2.0 / 4.0 — four creative AI usage levels signaling genuine engagement ignored).

The original E-S7 hypothesis (LLM systematically underrates Affect) is partially confirmed for the caution-anchoring mode but the tone-driven over-scoring mode is equally prevalent and was not anticipated. The net effect is a volatile, unreliable dimension where errors are large but cancel in aggregate.

---

### 4.4 Formality — Moderate Reliability; Systematic Over-Scoring

**Reliability verdict: MODERATE — usable directionally but over-scores by ~0.7 on average; flag scores ≥4.0.**

The LLM over-scores Formality in 64.4% of policies, with a mean of +0.71. The dominant error: the model conflates **structural organization** (numbered lists, section headers, bold text) with **formal register**. A policy with bulleted lists written in the first person, with casual vocabulary, may score 3.5–4.5 from the LLM while a human reader recognizes it as instructional rather than bureaucratic.

Worst cases: P142 (4.5 / 1.0, Δ = **+3.5**) — "cheating is theft" paragraph scored as bureaucratic; P144 (4.5 / 1.0, Δ = **+3.5**) — long policy with informal register throughout; P041 (5.0 / 3.0, Δ = **+2.0**) — Spanish-language two-sentence policy.

---

### 4.5 Politeness — Reliable with One Caveat

**Reliability verdict: HIGH — 86.7% within 1pt, 2.2% major. Safe for automated use with monitoring.**

Politeness is the strongest-performing dimension. The slight over-scoring (+0.25) is not practically meaningful at the corpus level. However, one failure mode warrants attention: **the model conflates explanatory, reasoning-forward tone with face-preserving politeness**. In five policies (P002, P167, P181, P197, P087), the LLM over-scored Politeness by ≥1.5 points. In each case, the instructor's register was warm or explanatory but the underlying message was directive or adversarial. P002 is the extreme case: "none of you are mediocre and you deserve better" in a policy that also says "I'm not a cop" and prohibits all AI use — LLM scored 4.5, human scored 1.0.

This pattern is related to the Affect over-scoring failure and suggests a shared root cause: the model does not adequately separate *how something is said* from *what the effect of the rule is on the student*.

---

### 4.6 Strictness — Reliable with Tone Caveat

**Reliability verdict: HIGH — 73.3% within 1pt, 2.2% major. Safe for automated use. Watch for casual-tone prohibitions.**

Strictness performs well overall. The systematic over-scoring (+0.36) is small and likely reflects the model's tendency to score conditional policies as slightly more restrictive than they are. Only one catastrophic error: P002 (LLM 1.0 / Human 5.0, Δ = **-4.0**). This is a total AI prohibition written in a casual, anti-institutional tone — the model read the casual register as low strictness and missed that "please do not use Generative AI tools" is a near-blanket ban. This is the inverse of the Formality problem: casual tone ≠ permissive rules.

---

## 5. Key Findings

### Did the model overrate Clarity?
**Yes, severely and consistently.** The LLM over-scored Clarity on 95.6% of policies with a mean error of +1.78 points. This is the largest and most consistent systematic bias found in this study. The model cannot distinguish between a policy that is clearly formatted and one that clearly informs students of their options.

### Did the model underrate Strictness?
**Mostly no — but with one critical exception pattern.** The mean signed difference for Strictness is +0.36, indicating slight over-scoring in aggregate. The model tends to score moderately strict policies as slightly more restrictive than the human coder. However, when a restrictive policy is written in a casual or conversational register, the model catastrophically under-scores Strictness (see P002: LLM 1.0 vs. Human 5.0). This "casual-tone prohibition" failure mode is rare but high-stakes.

### Did the model detect Contestability accurately?
**No.** The model over-scored in 73.3% of policies, consistently conflating tone, explanatory rationale, and instructor availability with actual negotiability. The model has no reliable concept of what makes a policy actionably contestable from a student's perspective.

### Did the model confuse polite wording with autonomy support?
**Yes, for both Politeness and Affect.** In five cases, the model over-scored Politeness by ≥1.5 points on policies the human coder identified as face-threatening or adversarial. The same policies also showed large Affect over-scoring. The model appears to apply a shared heuristic: *warm, explanatory, or first-person language → high Politeness and Affect*. This heuristic fails when the underlying rules are restrictive, punitive, or dismissive.

---

## 6. Reliability Rankings

| Rank | Dimension | Verdict | Primary Risk |
|---|---|---|---|
| 1 | Politeness | Safe for automated use | Tone/adversarial confusion in ≈11% of cases |
| 2 | Strictness | Safe with monitoring | Casual-tone prohibition failure (~2–3% of corpus) |
| 3 | Affect | Use directionally only | Bidirectional errors, high volatility |
| 4 | Formality | Use with flag ≥4.0 | Structure mistaken for register (+0.71 mean) |
| 5 | Contestability | Flag scores >2.5 | Tone/warmth mistaken for negotiability (+0.87 mean) |
| 6 | **Clarity** | **Do not use without human review** | Systematic severe over-scoring (+1.78 mean, 20% major) |

---

*Comparison tables: `validation/comparison_tables.csv`*  
*Human scores: `validation/human_scores.csv`*  
*Full validation sample: `validation/validation_sample.csv`*  
*See also: `error_log_v3.md`, `descriptive_summary_final.md`*
