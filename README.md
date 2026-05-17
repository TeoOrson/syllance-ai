# SyllanceAI

SyllanceAI is an AI-powered syllabus policy perception analysis platform designed to evaluate how AI-related syllabus language may influence student interpretation, trust, clarity, and perceived fairness.

The system analyzes syllabus AI policies across multiple rhetorical and linguistic dimensions, generates evidence-backed explanations, and produces optimized rewrites aligned with specific communication goals such as autonomy, enforcement, or clarity.

---

## Research Goal

SyllanceAI investigates how policy wording shapes student perception before direct interaction with an instructor occurs.

The project is grounded in communication theory, pragmatics, politeness theory, instructional communication, and language perception research. Rather than treating syllabus policies as neutral text, SyllanceAI models them as persuasive and interpretive communication artifacts.

The system is designed to help instructors:

- Write clearer AI policies
- Balance competing communication goals
- Understand trade-offs between categories
- Improve student trust and comprehension
- Evaluate how wording choices affect interpretation

---

# Core Features

## AI Policy Extraction

Extracts AI-related policy language from uploaded syllabus text.

---

## Multi-Dimensional Policy Scoring

Policies are analyzed across six perception categories:

| Category | Description |
|---|---|
| Formality | Professional and institutional tone |
| Politeness | Warmth, cooperation, indirectness |
| Affect | Emotional tone and supportiveness |
| Strictness | Enforcement intensity and rigidity |
| Clarity | Explicitness and readability |
| Contestability | Flexibility and openness to interpretation |

Each category receives:

- Numerical score
- Supporting explanation
- Evidence keywords/phrases
- Target comparison
- Rewrite recommendations

---

## AI-as-a-Judge Validation

SyllanceAI uses a dual-model architecture:

### Primary Model
Generates initial scores and rewrite candidates.

### Validation Model
Independently evaluates outputs to validate scoring consistency and rewrite quality.

This approach reduces reliance on a single model and supports more robust research-oriented evaluation workflows.

---

## Rewrite Optimization System

The rewrite pipeline:

1. Generates multiple rewritten policy candidates
2. Scores each candidate independently
3. Measures distance from target category values
4. Selects the best-performing rewrite

The system supports:

- Fast mode
- Research mode
- Multi-candidate optimization
- Rewrite validation
- Comparative scoring

---

## Trade-Off Modeling

SyllanceAI models communication as a system of interacting rhetorical dimensions.

Examples:

- Increasing politeness may reduce clarity
- Increasing strictness may reduce contestability
- Increasing formality may reduce readability

The platform includes an interactive trade-off exploration system for demonstrating these relationships.

---

# System Architecture

## Frontend

- React
- Vite
- Custom animated UI
- Responsive mobile-first design
- Interactive radar visualization
- Dynamic explanation panels
- Research-focused landing pages

### Main Frontend Components

- Radar perception matrix
- Rewrite candidate explorer
- Score explanation panels
- Keyword evidence panels
- Trade-off interaction page
- Research overview sections

---

## Backend

- FastAPI
- Python
- Ollama local inference
- Structured JSON parsing
- Multi-model orchestration
- Prompt engineering pipelines

### Main Backend Services

| Service | Purpose |
|---|---|
| scorer.py | Policy scoring |
| rewriter.py | Rewrite generation |
| validator.py | Secondary model validation |
| rewrite_optimizer.py | Multi-candidate optimization |
| llm_client.py | Ollama model communication |
| parser.py | Structured JSON extraction |

---

# Models

## Primary Analysis Model

- `gemma4:e4b`

Used for:

- Primary policy scoring
- Rewrite generation
- Explanation generation

---

## Validation Model

- `qwen3.5:9b`

Used for:

- Independent validation scoring
- Rewrite evaluation
- Consistency checking

---

# Research Modes

## Fast Mode

Optimized for live demonstrations and rapid interaction.

Features:
- Single rewrite generation
- Faster runtime
- Reduced inference passes

---

## Research Mode

Optimized for deeper analysis and validation.

Features:
- Multi-candidate rewrites
- Validation scoring
- Rewrite optimization
- Comparative evaluation

---

# Example Workflow

1. User uploads syllabus policy
2. AI policy section extracted
3. Policy scored across six dimensions
4. Evidence phrases identified
5. Rewrite candidates generated
6. Candidates rescored
7. Best rewrite selected
8. Validation model evaluates outputs
9. Interactive explanations displayed

---

# Local Development

## Requirements

- Python 3.11+
- Node.js 18+
- Ollama

---

## Install Ollama Models

```bash
ollama pull gemma4:e4b
ollama pull qwen3.5:9b
```

---

## Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload --port 8000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# Environment

Frontend expects:

```env
VITE_API_BASE=http://localhost:8000
```

---

# Current Research Directions

- AI-as-a-Judge evaluation workflows
- Rewrite optimization systems
- Human rubric comparison
- Linguistic feature attribution
- Policy perception modeling
- Educational communication research
- Trust and interpretability analysis

---

# Future Goals

- PDF syllabus upload pipeline
- Instructor dashboards
- Human evaluation datasets
- Statistical validation workflows
- Expanded category frameworks
- Institutional deployment
- Research publication support

---

# Authors

Developed as an undergraduate AI + communication research project at Penn State Behrend.

Research areas:
- AI in education
- Instructional communication
- Language perception
- Human-centered AI
- Computational rhetoric

---

# Disclaimer

SyllanceAI is a research prototype intended for exploratory educational and communication analysis. Scores and rewrites should be interpreted as analytical support tools rather than authoritative judgments.
