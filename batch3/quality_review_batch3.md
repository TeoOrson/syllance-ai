# Quality Review Notes — Batch 3
**Batch:** P141–P214  
**Review sample size:** 25 policies (P176, P182 flagged unscoreable — 23 scored reviews)  
**Date:** 2026-06-29  
**Reviewer:** Teo  
**Purpose:** Manual validation of LLM-scored outputs; error type confirmation; cross-batch calibration check

---

## Review Key

**My Assessment:** ✓ = correct | ↑ = should be higher | ↓ = should be lower | ? = unclear

**Error types:**
- E-S1: Strictness misread (permissive policy over-restricted)
- E-S2: Clarity overstatement
- E-S3: Contestability underscoring
- E-S4: Empty/weak evidence
- E-S5: Vague revision suggestions
- E-S6: Politeness/softness confusion
- E-S7: Missing affective tone (pedagogical framing underweighted)
- E-S8: Ignoring sanctions language

---

## Completed Reviews

---

### P144 — Psychology

**Policy excerpt:**
> "The learning opportunities in this course are useful only when you complete original work... I encourage you to take advantage of the learning opportunities and submit only your own work... I have carefully designed all assignments and class activities..."

| Category | Primary | Label | Val | Gap | My Assessment |
|---|---|---|---|---|---|
| Formality | 4.5 | Bureaucratic | 3.0 | 1.5 | ✓ |
| Politeness | 2.5 | Directive | 4.0 | 1.5 | ↑ (E-S6) |
| Affect | 1.5 | Cautionary | 4.0 | 2.5 | ↑ (E-S7) |
| Strictness | 5.0 | Restrictive | 4.0 | 1.0 | ✓ |
| Clarity | 4.8 | Highly clear | 4.0 | 0.8 | ✓ |
| Contestability | 1.5 | Limited Flexibility | 3.0 | 1.5 | ✓ |

**Errors confirmed:** E-S6, E-S7 — "I encourage you" and "I have carefully designed" are autonomy-supportive/empowering; primary anchored on prohibition

---

### P204 — Writing

**Policy excerpt:**
> "In this course, you are permitted to employ ChatGPT in the composition of one of the four major papers you will submit. Should you choose to use ChatGPT for an assignment, you must: (1) Acknowledge ChatGPT as a co-author..."

| Category | Primary | Label | Val | Gap | My Assessment |
|---|---|---|---|---|---|
| Formality | 3.5 | Bureaucratic | 3.0 | 0.5 | ✓ |
| Politeness | 2.0 | Directive | 4.0 | 2.0 | ✓ |
| Affect | 2.0 | Cautionary | 4.0 | 2.0 | ✓ |
| Strictness | 5.0 | Restrictive | 4.0 | 1.0 | ✓ |
| Clarity | 5.0 | Highly clear | 4.0 | 1.0 | ✓ |
| Contestability | 1.0 | Non-negotiable | 3.0 | 2.0 | ✓ |

**Errors confirmed:** Validation badly off on Politeness, Affect, Contestability — permission structure misread as warmth and negotiability

---

### P146 — Psychology

**Policy excerpt:**
> "Academic dishonesty will not be tolerated and may warrant penalties... Academic dishonesty includes, but is not limited to: cheating, plagiarism, unethically using artificial intelligence (AI)..."

| Category | Primary | Label | Val | Gap | My Assessment |
|---|---|---|---|---|---|
| Formality | 4.0 | Bureaucratic | 3.0 | 1.0 | ✓ |
| Politeness | 2.0 | Directive | 4.0 | 2.0 | ✓ |
| Affect | 2.0 | Cautionary | 4.0 | 2.0 | ✓ |
| Strictness | 5.0 | Restrictive | 4.0 | 1.0 | ✓ |
| Clarity | 5.0 | Highly clear | 4.0 | 1.0 | ↓ (E-S2) |
| Contestability | 3.0 | Moderate | 4.0 | 1.0 | ↓ (E-S3) |

**Errors confirmed:** E-S2 — "unethically using AI" is undefined; E-S3 — pure sanctions policy, no appeal mechanism, should be 1.0–1.5

---

### P210 — Writing

**Policy excerpt:**
> "AI Use Policy — What Counts as Artificial Intelligence (AI)? Artificial Intelligence refers to computer systems that generate, revise, or predict text, images, audio, video, code, or ideas in ways that resemble human work... Many commonly used tools include AI features, even when not explicitly labeled as AI. Examples include Grammarly, Microsoft Editor..."

| Category | Primary | Label | Val | Gap | My Assessment |
|---|---|---|---|---|---|
| Formality | 4.5 | Bureaucratic | 3.0 | 1.5 | ✓ |
| Politeness | 2.5 | Directive | 4.0 | 1.5 | ✓ |
| Affect | 2.0 | Cautionary | 4.0 | 2.0 | ✓ |
| Strictness | 4.8 | Restrictive | 3.5 | 1.3 | ✓ |
| Clarity | 4.8 | Highly clear | 4.0 | 0.8 | ✓ |
| Contestability | 3.5 | Fair + transparent | 4.0 | 0.5 | ↓ |

**Errors confirmed:** Contestability — both models wrong; broad definitional scope (closing loopholes) mistaken for negotiability. Should be 1.5–2.0. New error pattern: scope clarity ≠ contestability

---

### P180 — Writing

**Policy excerpt:**
> "Do not use generative artificial intelligence to write for you... Outsourcing your writing to generative AI services like ChatGPT, Gemini, Copilot, Perplexity, and Claude violates academic integrity policies, slows your development as a college-level writer, and silences your voice. (Not to mention that a conversation with ChatGPT can consume 16 ounces of fresh water...) You are welcome to use generative AI for research..."

| Category | Primary | Label | Val | Gap | My Assessment |
|---|---|---|---|---|---|
| Formality | 2.5 | Instructional | 4.0 | 1.5 | ↓ (~2.0) |
| Politeness | 1.5 | Directive | 4.0 | 2.5 | ✓ |
| Affect | 2.5 | Cautionary | 4.0 | 1.5 | ✓ |
| Strictness | 4.0 | Controlling | 4.0 | 0.0 | ↑ (5.0) |
| Clarity | 4.5 | Clear | 4.0 | 0.5 | ↓ ("for research" undefined) |
| Contestability | 2.5 | Limited Flexibility | 3.5 | 1.0 | ↓ (1.0–1.5) |

**Errors confirmed:** Formality overscored (water bottle comment drops register); Strictness underscored (E-S8 — hard prohibition + guilt framing = 5.0); Clarity overscored (E-S2 — research use undefined); Contestability overscored (E-S3). Validation badly off across the board.

---

### P142 — Physical Sciences

**Policy excerpt:**
> "When students violate the academic integrity policy (i.e., 'cheat'), they are committing an act of theft that can cause real harm to themselves and others including, but not limited to, their classmates, their faculty, and the caregivers who may be funding their education..."

| Category | Primary | Label | Val | Gap | My Assessment |
|---|---|---|---|---|---|
| Formality | 4.5 | Bureaucratic | 3.0 | 1.5 | ✓ |
| Politeness | 2.0 | Directive | 2.0 | 0.0 | ✓ |
| Affect | 1.5 | Cautionary | 4.0 | 2.5 | ✓ |
| Strictness | 5.0 | Restrictive | 4.0 | 1.0 | ✓ |
| Clarity | 4.5 | Clear | 4.0 | 0.5 | ✓ |
| Contestability | 1.5 | Limited Flexibility | 3.0 | 1.5 | ✓ |

**Errors confirmed:** Primary accurate throughout; validation hallucinating warmth on Affect — "act of theft" framing is maximally cautionary

---

### P182 — Writing ⚑ UNSCOREABLE

**Policy text:** "This is the current state of a draft policy" (incomplete draft)

**Assessment:** Unscoreable. Primary misread "draft" as open/contestable/empowering. Scores unreliable across all dimensions. Exclude from analysis alongside P090, P131, P176, P205.

---

### P154 — Research Methods

**Policy excerpt:**
> "GenAI can provide students with a valuable tool at the initial stages of academic work; however, GenAI use must align with the following principles: Transparency, Originality, Accuracy. Students can integrate GenAI tools into academic work while ensuring submissions maintain the highest standards of scholarly integrity..."

| Category | Primary | Label | Val | Gap | My Assessment |
|---|---|---|---|---|---|
| Formality | 4.5 | Bureaucratic | 3.0 | 1.5 | ✓ |
| Politeness | 2.5 | Directive | 4.0 | 1.5 | ✓ |
| Affect | 2.0 | Cautionary | 3.0 | 1.0 | ↑ (~3.0–3.5, E-S7) |
| Strictness | 4.5 | Controlling | 3.0 | 1.5 | ✓ |
| Clarity | 4.8 | Highly clear | 4.0 | 0.8 | ✓ |
| Contestability | 2.5 | Limited Flexibility | 3.0 | 0.5 | ✓ |

**Errors confirmed:** E-S7 — "valuable tool" opener and principles-based framing underweighted by primary

---

### P201 — Writing

**Policy excerpt:**
> "Increasingly, AI tools like ChatGPT are tools that students and teachers are using for various purposes... The key goal of our course, like any writing experience, is to use words, sources, and technology tools in transparent, accountable, and ethical ways..."

| Category | Primary | Label | Val | Gap | My Assessment |
|---|---|---|---|---|---|
| Formality | 3.0 | Institutionalized | 3.0 | 0.0 | ✓ |
| Politeness | 2.5 | Directive | 3.0 | 0.5 | ↑ (~3.5, E-S6) |
| Affect | 2.0 | Cautionary | 4.0 | 2.0 | ↑ (~3.0, E-S7) |
| Strictness | 4.0 | Controlling | 3.0 | 1.0 | ✓ |
| Clarity | 5.0 | Highly clear | 4.0 | 1.0 | ✓ |
| Contestability | 2.0 | Limited Flexibility | 4.0 | 2.0 | ✓ |

**Errors confirmed:** E-S6 — "our course" and "students and teachers" collaborative framing missed; E-S7 — values-based framing ("transparent, accountable, ethical") not cautionary

---

### P177 — Writing

**Policy excerpt:**
> "Generative AI programs like ChatGPT, Bard AI, and others are transforming our relationship to writing. These tremendously powerful tools can be useful to you in a number of ways in this course. These include: explaining course material, producing models of typical assignments, brainstorming and refining ideas, translating text..."

| Category | Primary | Label | Val | Gap | My Assessment |
|---|---|---|---|---|---|
| Formality | 4.5 | Bureaucratic | 3.0 | 1.5 | ↓ (~3.0–3.5) |
| Politeness | 2.5 | Directive | 4.0 | 1.5 | ↑ (~3.5, E-S6) |
| Affect | 2.8 | Neutralizing | 3.0 | 0.2 | ↑ (~4.5–5.0, E-S7) |
| Strictness | 4.5 | Controlling | 4.0 | 0.5 | ↓ (~2.0–2.5, E-S1) |
| Clarity | 4.8 | Highly clear | 4.0 | 0.8 | ↑ (5.0) |
| Contestability | 1.5 | Limited Flexibility | 3.5 | 2.0 | ✓ |

**Errors confirmed:** Primary wrong on 4/6 — "tremendously powerful tools" and explicit permitted-use list = empowering + low strictness; Formality overscored; E-S1, E-S6, E-S7

---

### P156 — Research Methods

**Policy excerpt:**
> "During this course, you may use generative AI to assist with assignments providing that you also do the following: 1. Include a disclaimer statement... 2. Validate the output and reflect on why this non-peer reviewed source is a useful addition..."

| Category | Primary | Label | Val | Gap | My Assessment |
|---|---|---|---|---|---|
| Formality | 4.0 | Bureaucratic | 3.0 | 1.0 | ✓ |
| Politeness | 2.5 | Directive | 3.0 | 0.5 | ✓ |
| Affect | 2.0 | Cautionary | 4.0 | 2.0 | ↑ (~3.0–3.5, E-S7) |
| Strictness | 4.5 | Controlling | 4.0 | 0.5 | ✓ |
| Clarity | 5.0 | Highly clear | 4.0 | 1.0 | ✓ |
| Contestability | 1.5 | Limited Flexibility | 3.0 | 1.5 | ✓ |

**Errors confirmed:** E-S7 — "you may use" + structured reflection requirement is constructive framing, not cautionary

---

### P143 — Politics

**Policy excerpt:**
> "genAI can be a powerful tool... you must (a) use genAI only as additional tools and in limited ways; (b) always critically question and check the results... Let me explain the reasoning: Applications such as ChatGPT may give you an output that looks and reads good but..."

| Category | Primary | Label | Val | Gap | My Assessment |
|---|---|---|---|---|---|
| Formality | 3.5 | Bureaucratic | 4.0 | 0.5 | ✓ |
| Politeness | 2.5 | Directive | 4.0 | 1.5 | ↑ (~3.5, E-S6) |
| Affect | 2.0 | Cautionary | 4.0 | 2.0 | ↑ (~3.0–3.5, E-S7) |
| Strictness | 3.5 | Controlling | 3.0 | 0.5 | ✓ |
| Clarity | 4.5 | Clear | 4.0 | 0.5 | ✓ |
| Contestability | 2.0 | Limited Flexibility | 3.0 | 1.0 | ✓ |

**Errors confirmed:** E-S6, E-S7 — "let me explain the reasoning" is autonomy-supportive; primary missed pedagogical rationale framing

---

### P203 — Writing

**Policy excerpt:**
> "All assignments should be your own original work... We will discuss what constitutes plagiarism, cheating, or academic dishonesty more in class... You should not use paraphrasing software ('spinbots') or AI writing software (like ChatGPT)."

| Category | Primary | Label | Val | Gap | My Assessment |
|---|---|---|---|---|---|
| Formality | 3.5 | Bureaucratic | 3.0 | 0.5 | ✓ |
| Politeness | 2.5 | Directive | 3.5 | 1.0 | ✓ |
| Affect | 2.0 | Cautionary | 4.0 | 2.0 | ✓ |
| Strictness | 4.5 | Controlling | 4.0 | 0.5 | ✓ |
| Clarity | 4.0 | Clear | 4.5 | 0.5 | ↓ (~3.0–3.5, E-S2) |
| Contestability | 2.0 | Limited Flexibility | 3.5 | 1.5 | ↑ (~2.5–3.0) |

**Errors confirmed:** E-S2 — "we will discuss more in class" defers actual definitions; Contestability slightly low — in-class discussion is an implicit dialogue mechanism

---

### P176 — Writing ⚑ UNSCOREABLE

**Policy text:** "Draft policy" (two words — full text)

**Assessment:** Unscoreable. Same category as P090, P131, P182, P205. Scores entirely fabricated. Exclude from analysis.

---

### P188 — Writing

**Policy excerpt:**
> "You are allowed to use artificial intelligence (AI) in this class. All graded written assignments must include an acknowledgment of the use of AI... Determining the appropriate use of AI during the writing process is a matter of judgment. When in doubt, email Prof. Weiss with questions."

| Category | Primary | Label | Val | Gap | My Assessment |
|---|---|---|---|---|---|
| Formality | 4.5 | Bureaucratic | 3.0 | 1.5 | ✓ |
| Politeness | 3.5 | Autonomy-Supportive | 4.0 | 0.5 | ✓ |
| Affect | 3.0 | Neutralizing | 3.0 | 0.0 | ✓ |
| Strictness | 4.5 | Controlling | 3.0 | 1.5 | ↓ (~2.5–3.0, E-S1) |
| Clarity | 4.8 | Highly clear | 4.0 | 0.8 | ✓ |
| Contestability | 2.5 | Limited Flexibility | 4.0 | 1.5 | ↑ (~3.5–4.0, E-S3) |

**Errors confirmed:** E-S1 — permissive policy with "matter of judgment" scored as restrictive; E-S3 — "email Prof. Weiss with questions" is a direct dialogue mechanism

---

### P141 — Physical Sciences ✓ CALIBRATION BASELINE

**Policy excerpt:**
> "AI tools such as ChatGPT can assist in providing explanations and suggestions and can be very useful when used correctly. However, these tools should not be used for direct answers to graded assignments..."

| Category | Primary | Label | Val | Gap | My Assessment |
|---|---|---|---|---|---|
| Formality | 2.5 | Instructional | 3.0 | 0.5 | ✓ |
| Politeness | 3.5 | Autonomy-Supportive | 3.5 | 0.0 | ✓ |
| Affect | 2.5 | Cautionary | 2.5 | 0.0 | ✓ |
| Strictness | 3.5 | Controlling | 4.0 | 0.5 | ✓ |
| Clarity | 4.5 | Clear | 4.0 | 0.5 | ✓ |
| Contestability | 2.5 | Limited Flexibility | 3.0 | 0.5 | ✓ |

**Errors confirmed:** None — solid calibration baseline

---

### P147 — Research Methods

**Policy excerpt:**
> "This class permits the use of generative AI in all assignments. The application of AI is an important, still-developing skillset that may be expected in the workplace and even within academia..."

| Category | Primary | Label | Val | Gap | My Assessment |
|---|---|---|---|---|---|
| Formality | 3.5 | Bureaucratic | 3.0 | 0.5 | ✓ |
| Politeness | 3.5 | Autonomy-Supportive | 3.0 | 0.5 | ✓ |
| Affect | 2.5 | Cautionary | 3.0 | 0.5 | ↑ (~3.0–3.5, E-S7) |
| Strictness | 3.5 | Controlling | 4.0 | 0.5 | ✓ |
| Clarity | 4.5 | Clear | 4.0 | 0.5 | ✓ |
| Contestability | 3.0 | Moderate | 3.0 | 0.0 | ✓ |

**Errors confirmed:** E-S7 — "important, still-developing skillset expected in the workplace" is forward-looking/skills framing, not cautionary

---

### P158 — Social Sciences

**Policy excerpt:**
> "Students will explore the circumstances where AI tools can extend versus stifle human capacity, knowledge production and creativity... There will be times when the instructor will require students to use AI tools as part of their work. Outside of those circumstances, using AI tools to generate content will be considered an infraction..."

| Category | Primary | Label | Val | Gap | My Assessment |
|---|---|---|---|---|---|
| Formality | 3.5 | Bureaucratic | 3.0 | 0.5 | ✓ |
| Politeness | 2.5 | Directive | 3.0 | 0.5 | ↑ (~3.0–3.5, E-S6) |
| Affect | 2.8 | Neutralizing | 3.0 | 0.2 | ↑ (~3.5–4.0, E-S7) |
| Strictness | 4.5 | Controlling | 4.0 | 0.5 | ↓ (~3.0–3.5, E-S1) |
| Clarity | 4.5 | Clear | 4.0 | 0.5 | ↓ (~3.5–4.0, E-S2) |
| Contestability | 3.5 | Fair + transparent | 2.5 | 1.0 | ✓ |

**Errors confirmed:** E-S1 — instructor requires AI use in some cases; E-S2 — "outside of those circumstances" is vague; E-S6, E-S7 — intellectual/exploratory framing missed

---

### P159 — Social Sciences ✓ CALIBRATION BASELINE

**Policy excerpt:**
> "Generative AI can certainly help with learning and execution of academic tasks. In this course, you can use generative AI in some cases, but there are some restrictions. Here are some examples of how to use AI for this course: Ask clarification questions about concepts..."

| Category | Primary | Label | Val | Gap | My Assessment |
|---|---|---|---|---|---|
| Formality | 2.5 | Instructional | 3.0 | 0.5 | ✓ |
| Politeness | 4.2 | Autonomy-Supportive | 4.0 | 0.2 | ✓ |
| Affect | 4.8 | Empowering | 4.0 | 0.8 | ✓ |
| Strictness | 3.5 | Controlling | 3.0 | 0.5 | ✓ |
| Clarity | 5.0 | Highly clear | 4.0 | 1.0 | ✓ |
| Contestability | 4.0 | Fair + transparent | 4.0 | 0.0 | ✓ |

**Errors confirmed:** None — exemplary empowering/autonomy-supportive policy; good high-end calibration baseline

---

### P163 — Sociology

**Policy excerpt:**
> "UMass Global's Social Work Department aims to promote innovation, critical thinking, and academic rigor while upholding the principles of integrity and ethical conduct. Students and instructors are encouraged to embrace the potential of AI as a powerful tool for learning, research, and intellectual growth..."

| Category | Primary | Label | Val | Gap | My Assessment |
|---|---|---|---|---|---|
| Formality | 3.5 | Bureaucratic | 3.0 | 0.5 | ✓ |
| Politeness | 3.5 | Autonomy-Supportive | 4.0 | 0.5 | ✓ |
| Affect | 3.8 | Encouraging | 4.0 | 0.2 | ✓ |
| Strictness | 3.2 | Conditional | 3.0 | 0.2 | ✓ |
| Clarity | 4.8 | Highly clear | 4.0 | 0.8 | ↓ (~3.5–4.0, E-S2) |
| Contestability | 3.7 | Fair + transparent | 4.0 | 0.3 | ✓ |

**Errors confirmed:** E-S2 — principle-based framing reads as polished but doesn't specify what's permitted on specific assignments

---

### P164 — Sociology

**Policy excerpt:**
> "It is fine to get research assistance from AI as long as you put both your prompt and the resulting text as an appendix at the end of your paper, and list it in your reference list..."

| Category | Primary | Label | Val | Gap | My Assessment |
|---|---|---|---|---|---|
| Formality | 3.0 | Institutionalized | 3.0 | 0.0 | ✓ |
| Politeness | 2.0 | Directive | 3.0 | 1.0 | ✓ |
| Affect | 2.0 | Cautionary | 3.0 | 1.0 | ↑ (~3.0–3.5, E-S7) |
| Strictness | 3.5 | Controlling | 3.5 | 0.0 | ✓ |
| Clarity | 4.5 | Clear | 4.0 | 0.5 | ✓ |
| Contestability | 3.5 | Fair + transparent | 4.0 | 0.5 | ✓ |

**Errors confirmed:** E-S7 — "it is fine" casual permissive opener and source-treatment framing not cautionary

---

### P211 — Writing Center

**Policy excerpt:**
> "Originality: The core content, ideas, and analysis in your academic work must be your own. AI tools should assist you in improving your writing but not replace your intellectual contributions. Avoiding Plagiarism: Any content generated or significantly altered by AI must be properly attributed..."

| Category | Primary | Label | Val | Gap | My Assessment |
|---|---|---|---|---|---|
| Formality | 3.5 | Bureaucratic | 4.0 | 0.5 | ✓ |
| Politeness | 2.5 | Directive | 4.0 | 1.5 | ✓ |
| Affect | 2.0 | Cautionary | 4.0 | 2.0 | ✓ |
| Strictness | 3.5 | Controlling | 3.0 | 0.5 | ✓ |
| Clarity | 4.5 | Clear | 4.0 | 0.5 | ✓ |
| Contestability | 3.5 | Fair + transparent | 4.0 | 0.5 | ✓ |

**Errors confirmed:** Primary accurate; validation overcorrecting on Politeness and Affect — structured principle-based policy is directive despite organized presentation

---

### P151 — Research ✓ CALIBRATION BASELINE

**Policy excerpt:**
> "Generative AI uses natural language processing, facilitating language-based interactions between humans and computers... To create the output, generative AI uses the statistical likelihood of the next word derived from its training data..."

| Category | Primary | Label | Val | Gap | My Assessment |
|---|---|---|---|---|---|
| Formality | 4.0 | Bureaucratic | 3.5 | 0.5 | ✓ |
| Politeness | 2.5 | Directive | 4.0 | 1.5 | ✓ |
| Affect | 3.8 | Encouraging | 3.0 | 0.8 | ✓ |
| Strictness | 4.5 | Controlling | 3.5 | 1.0 | ✓ |
| Clarity | 4.5 | Clear | 4.0 | 0.5 | ✓ |
| Contestability | 2.5 | Limited Flexibility | 4.0 | 1.5 | ✓ |

**Errors confirmed:** None — primary accurate; good calibration baseline

---

### P167 — Spanish

**Policy excerpt:**
> "Language courses rely on independent learning, encouraging you to explore meanings and build your skills outside of class. You may use online dictionaries when necessary... However, you may not use online tools that can generate near-perfect translations with little to no effort on your part... Making and correcting your own mistakes is an important part of learning..."

| Category | Primary | Label | Val | Gap | My Assessment |
|---|---|---|---|---|---|
| Formality | 2.5 | Instructional | 3.0 | 0.5 | ✓ |
| Politeness | 4.5 | Autonomy-Supportive | 4.0 | 0.5 | ↓ (~3.5–4.0) |
| Affect | 4.8 | Empowering | 4.0 | 0.8 | ↓ (~4.0–4.5) |
| Strictness | 4.2 | Controlling | 4.0 | 0.2 | ↑ (~4.5–5.0, E-S8) |
| Clarity | 4.8 | Highly clear | 4.0 | 0.8 | ↓ (~4.0–4.5, E-S2) |
| Contestability | 3.5 | Fair + transparent | 3.0 | 0.5 | ↓ (~2.0–2.5, E-S3) |

**Errors confirmed:** E-S2 — "near-perfect translations with little to no effort" is a fuzzy threshold; E-S3 — no appeal mechanism; E-S8 — "constitutes a violation" sanctions language underweights Strictness; Politeness and Affect slightly overscored

---

### P196 — Writing

**Policy excerpt:**
> "Students are allowed to employ generative AI tools in specific exercises when instructed so... 1) All creative writing must be original. 2) AI tools may be used only for research, brainstorming, and proofreading. 3) An addendum with a live link to the chat must be submitted. 4) Unauthorized use will be considered academic misconduct..."

| Category | Primary | Label | Val | Gap | My Assessment |
|---|---|---|---|---|---|
| Formality | 3.5 | Bureaucratic | 3.0 | 0.5 | ✓ |
| Politeness | 2.5 | Directive | 4.0 | 1.5 | ✓ |
| Affect | 2.0 | Cautionary | 3.0 | 1.0 | ✓ |
| Strictness | 4.5 | Controlling | 4.0 | 0.5 | ✓ |
| Clarity | 4.8 | Highly clear | 4.0 | 0.8 | ↓ (~4.0–4.5, E-S2) |
| Contestability | 1.5 | Limited Flexibility | 3.0 | 1.5 | ✓ |

**Errors confirmed:** E-S2 — "when instructed so" defers permission scope to in-class instruction; students can't determine from syllabus alone which exercises permit AI

---

## Aggregate Error Counts

| Error Type | Batch 1 | Batch 2 | Batch 3 | Notes |
|---|---|---|---|---|
| E-S1: Strictness misread | 3 | 2 | 3 (P177, P188, P158) | Permissive policies over-restricted |
| E-S2: Clarity overstatement | Multiple | 3 | 7 (P146, P180, P203, P158, P163, P167, P196) | Most common scoring error in batch 3 |
| E-S3: Contestability underscoring | Batch-wide | 6 | 3 (P188, P167, P146) | Primary; but also new over-scoring pattern |
| E-S6: Politeness/softness confusion | — | 5 | 5 (P144, P201, P143, P158, P177) | Collaborative/explanatory framing missed |
| E-S7: Missing affective tone | 2 | 4 | 10 (P144, P154, P201, P177, P156, P143, P147, P158, P163, P164) | Most frequent error type in batch 3 |
| E-S8: Ignoring sanctions | — | 0 | 2 (P180, P167) | Violation language underweights Strictness |
| Data quality | — | 1 | 2 (P176, P182) | Incomplete/draft policies; unscoreable |
| New: Scope clarity ≠ Contestability | — | — | 1 (P210) | Definitional breadth misread as negotiability |

---

## Summary Observations

**Most reliable dimensions in batch 3:** Strictness, Formality — models generally agree and primary matches researcher judgment when policy posture is clear

**Least reliable dimensions:** Affect (E-S7 in 10/23 reviewed policies — 43%), Clarity (E-S2 in 7/23 — 30%), Contestability (both under and over-scoring)

**Dominant error pattern:** E-S7 is the single most confirmed error in this batch by a wide margin. The primary model defaults to Cautionary when any cautionary language is present, ignoring sustained pedagogical framing, skills-based language, or permissive openers. This is the highest-priority prompt fix.

**New pattern — Contestability over-scoring:** Two new sources of false-high Contestability identified: (1) broad definitional scope mistaken for negotiability (P210), (2) in-class discussion deferred definitions read as dialogue (P203 — actually correct). Contestability errors now go in both directions.

**Validation model observations:**
- Over-scores Affect and Politeness on blunt prohibition policies (P142, P204, P211) — opposite of E-S7
- Under-scores Contestability on permissive/dialogic policies (P188) — opposite of E-S3
- Broadly agrees with primary on Strictness and Formality

**Calibration baselines confirmed:** P141, P151, P159 — all three are clean, well-scored policies that can serve as anchors for future prompt calibration

---

*See also: error_log_v3.md, descriptive_summary_final.md, quality_review_batch2.md*
