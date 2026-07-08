# System Improvement Recommendations
**SyllanceAI — Based on Week 7 Human/LLM Reliability Analysis**  
**Date:** July 2026

---

## 1. Categories Safe for Automated Scoring

### Politeness
86.7% within 1 point, 2.2% major disagreement. Mean bias: +0.25 (negligible). Safe to report as an automated score. No interface warning needed for typical policies. Monitor for policies with warm tone + adversarial content (the "I'm not a cop" pattern).

### Strictness
73.3% within 1 point, 2.2% major disagreement. Mean bias: +0.36 (slight over). Safe to report as automated score with a minor calibration note. One high-risk failure: casual-tone blanket prohibitions. Recommend adding a flag when Strictness_primary ≤ 2.0 AND key prohibition phrases are present in the text (e.g., "do not use," "not permitted," "prohibited") — this pattern signals potential under-scoring.

---

## 2. Categories Requiring Human Review

### Clarity — Always Flag
Do not present Clarity as a scored output without a human verification step or prominent uncertainty warning. The LLM over-scores Clarity on 95.6% of policies with a mean error of +1.78 points. A high automated Clarity score (≥4.0) is nearly meaningless — it reflects textual structure and confident register, not actual informational completeness.

**Recommended interface treatment:** Display Clarity scores with a warning badge ("Clarity scores are frequently overestimated — verify manually"). In research use, treat Clarity as a directional indicator only, or exclude it from any quantitative analysis that treats all six dimensions equally.

### Contestability — Flag Scores Above 2.5
The model over-scores Contestability in 73.3% of policies. Any automated score above 2.5 should be flagged for human verification. Scores at 1.0–2.0 are more reliable (lower bound is easier to identify). The model cannot reliably distinguish between a policy that *explains its reasoning* and one that genuinely *invites negotiation*.

**Recommended interface treatment:** Display Contestability with a cautionary note: "High contestability scores may reflect warm tone rather than actual appeal mechanisms." Flag any score ≥3.0.

### Affect — Flag Extreme Scores in Both Directions
Affect has a neutral aggregate bias (+0.14) but high individual volatility. Two failure modes produce large errors in opposite directions. Neither extreme (very high or very low automated Affect scores) should be trusted without reading the policy.

**Recommended interface treatment:** Display Affect with a confidence qualifier: "Affect scores can vary significantly between human and automated scoring. Treat scores below 2.0 or above 4.0 with caution." In research use, flag any policy where Affect_primary deviates from Affect_validation by ≥1.5 (the current gap threshold) AND the primary score is ≥4.0 or ≤2.0.

---

## 3. Prompt Improvements

### Priority 1 — Clarity (most urgent)
**Current failure:** Model scores structural completeness as clarity. A policy with well-formatted sections but vague language, deferred definitions, or "when instructed" conditions scores as highly clear.

**Prompt revision target:**
> "Score Clarity based on whether a student reading only this text knows exactly what they are and are not allowed to do with AI in this course. A well-organized or confident-sounding policy is NOT necessarily clear. Give a LOW Clarity score if: (1) what counts as 'AI' is undefined; (2) permission scope is deferred to in-class instruction or a separate document; (3) the policy uses principle-based language ('transparency,' 'integrity') without specifying permitted and prohibited behaviors; (4) consequences are vague or conditional on factors not explained. Give a HIGH Clarity score only when a student can make a specific decision (use / not use AI for a given task) solely from reading this text."

**Add anchor examples:**
- Score 1: "See AI policy linked here." / "You may not use AI in ways that are not your own work."
- Score 3: "AI may be used for brainstorming and grammar. Do not use it to draft assignments."
- Score 5: Numbered permitted uses, numbered prohibited uses, named tools, specific consequences, no deferred definitions.

### Priority 2 — Contestability
**Current failure:** Model equates explanatory tone, contact information, and broad definitions with negotiability.

**Prompt revision target:**
> "Score Contestability based on whether the policy gives students an actual mechanism to question, appeal, or negotiate its terms. A LOW score means the policy is presented as final with no room for dialogue. A HIGH score means the policy explicitly invites appeals, offers exceptions, or states that terms can be discussed with the instructor. Do NOT score higher because: (1) the instructor explains the reasoning behind the rules; (2) the instructor provides an email address for questions about course logistics; (3) the policy uses first-person or collaborative language; (4) the policy has a broad definition of AI (this closes loopholes, it does not open negotiation)."

**Add anchor examples:**
- Score 1: "AI is not permitted. Violations will be reported." (no dialogue)
- Score 2: "If you have questions about AI use, ask before submitting." (logistics only)
- Score 3–4: "Contact me if you need to discuss whether a specific use case is appropriate." (genuine dialogue opening)
- Score 5: "Students may petition for exceptions to this policy with 48-hour notice." (explicit mechanism)

### Priority 3 — Affect
**Current failure:** Two distinct modes. Mode A: warm/casual tone → over-scores Affect regardless of restrictiveness. Mode B: any cautionary language → anchors to low Affect regardless of permissive framing.

**Prompt revision target:**
> "Score Affect based on the SUSTAINED emotional stance the policy takes toward AI use and toward students. Do NOT anchor on a single phrase. Specifically: (1) A prohibition written in a casual or warm tone ('I'm not going to police you, but please don't use AI') is still low Affect — warmth of delivery does not change the discouraging content; (2) A policy that gives students specific permitted uses, treats AI as a skill to develop, or uses forward-looking professional framing is high Affect even if it also has cautionary sections — score the dominant register, not the most negative phrase; (3) Ask yourself: does this policy leave a student feeling capable and trusted, or constrained and distrusted?"

### Priority 4 — Formality
**Current failure:** Structural complexity (numbered lists, section headers) scored as bureaucratic register.

**Prompt revision target:**
> "Score Formality based on vocabulary, sentence construction, and the social relationship implied, not on document structure. A numbered list written in the first person with casual vocabulary is INSTRUCTIONAL, not BUREAUCRATIC. A two-sentence policy that uses official regulatory language is FORMAL even though it is short."

### Priority 5 — Keyword Extraction (E-P2, pre-existing)
Require 2–6 word phrase units. No full sentences. This was identified in Week 6 and remains unaddressed.

---

## 4. Confidence Threshold Recommendations

### Current threshold (primary/validation gap ≥ 1.0 → needs_human_review flag)
This threshold is appropriate and should be retained. However, it should be applied differentially by dimension:

| Dimension | Flag threshold | Rationale |
|---|---|---|
| Clarity | Always flag ≥4.0 | Systematic over-scoring makes high automated scores unreliable regardless of gap |
| Contestability | Flag ≥3.0 | Over-scoring pattern makes mid-high range unreliable |
| Affect | Flag when primary ≤2.0 OR ≥4.5 AND gap ≥1.0 | Bidirectional errors concentrate at extremes |
| Strictness | Flag when primary ≤2.0 AND prohibition language detected | Casual-tone prohibition failure |
| Formality | Current threshold sufficient | |
| Politeness | Current threshold sufficient | |

### New recommended threshold: Affect volatility flag
Add a secondary flag: when Affect_primary and Affect_validation differ by ≥1.5 AND Affect_primary is in the top or bottom quartile (≤2.0 or ≥4.5), mark the Affect score as "high uncertainty." This captures both failure modes.

---

## 5. Interface Warnings

### Warning 1 — Clarity (show on every policy)
> "⚠️ Clarity scores are frequently overestimated by the automated system. A high score reflects textual organization and confident language, not whether students can determine their actual options. Verify clarity manually before using this score in feedback to instructors."

### Warning 2 — Contestability (show when score ≥3.0)
> "Note: This policy received a moderate-to-high Contestability score. High scores sometimes reflect warm tone or explanatory rationale rather than explicit appeal mechanisms. Review the policy text to confirm whether actual student negotiation is possible."

### Warning 3 — Affect (show when score ≤2.0 or ≥4.5)
> "Note: Affect scores at the extremes are less reliable. The automated system may over-score policies written in a warm tone but with restrictive rules, or under-score policies with forward-looking or skills-based framing. Use as an approximate indicator."

### Warning 4 — Casual-tone prohibition (Strictness)
> "Note: This policy scored low on Strictness. If the policy uses casual or conversational language to communicate a prohibition, the automated score may underestimate how restrictive the actual rules are."

---

## 6. Research Use Guidance

For any publication or presentation drawing on SyllanceAI scores:

1. **Exclude Clarity from quantitative comparisons** that treat all six dimensions equally. If Clarity is included, note that automated scores carry a mean positive bias of approximately 1.8 points.
2. **Report Contestability as a lower-bound estimate.** Automated scores likely overestimate student-perceived negotiability by approximately 0.9 points on average.
3. **Treat Affect as directional only** — suitable for identifying strongly discouraging vs. strongly empowering policies in aggregate, but not reliable at the individual policy level.
4. **Politeness and Strictness are the most publication-ready dimensions** and can be reported with standard measurement caveats.
5. **Any policy flagged needs_human_review=YES should not be included in automated analyses** without manual score verification.

---

*Supporting data: `validation/reliability_summary.csv`, `validation/comparison_tables.csv`*  
*Memo: `validation/reliability_memo.md`*  
*See also: `error_log_v3.md` for prompt-level error type catalog*
