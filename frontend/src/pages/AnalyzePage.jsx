import React, { useState } from "react";
import Card from "../shared/CardShim";
import LoadingBar from "../components/LoadingBar";
import RadarChart from "../components/RadarChart";
import KeywordPanel from "../components/KeywordPanel";
import RewritePanel from "../components/RewritePanel";
import ValidationPanel from "../components/ValidationPanel";
import RewriteCandidatesPanel from "../components/RewriteCandidatesPanel";
import { scorePolicy, rewriteOptimizePolicy } from "../services/api";
import ScoreExplanationPanel from "../components/ScoreExplanationPanel";
import KeywordExplanationPanel from "../components/KeywordExplanationPanel";
import RewriteExplanationPanel from "../components/RewriteExplanationPanel";

const PUBLIC_DEMO_ONLY =
  import.meta.env.VITE_PUBLIC_DEMO_ONLY === "true" ||
  window.location.hostname.includes("vercel.app");

const DEMO_POLICIES = [
  {
    name: "Strict policy",
    text: `Students may not use generative AI tools, including ChatGPT, Copilot, Gemini, or similar systems, unless the instructor gives explicit permission. Unauthorized AI use on assignments, quizzes, exams, reflections, or projects will be treated as academic misconduct. Violations may result in a zero and may be reported through university academic integrity procedures. If you are unsure whether AI use is allowed, ask before using it.`,
    fakeScores: {
      Formality: 4.2,
      Politeness: 2.3,
      Affect: 2.4,
      Strictness: 4.7,
      Clarity: 4.1,
      Contestability: 2.1,
    },
    fakeKeywords: {
      Formality: ["academic misconduct", "university procedures"],
      Politeness: ["if you are unsure"],
      Affect: ["treated as academic misconduct"],
      Strictness: ["may not use", "violations may result", "zero"],
      Clarity: ["unless the instructor gives explicit permission"],
      Contestability: ["ask before using it"],
    },
    fakeRewrite: `Students should not use generative AI tools, including ChatGPT, Copilot, Gemini, or similar systems, unless the instructor has clearly allowed them for a specific assignment or activity. Unauthorized AI use may be handled through the course and university academic integrity process. If you are unsure whether AI use is allowed, please ask before using it so expectations are clear.`,
    fakeRewriteScores: {
      Formality: 3.8,
      Politeness: 3.8,
      Affect: 3.4,
      Strictness: 3.7,
      Clarity: 4.6,
      Contestability: 3.7,
    },
    fakeDistance: 0.7,
  },
  {
    name: "Flexible policy",
    text: `Generative AI tools may be used to support brainstorming, studying, outlining, grammar review, and idea development. Students are responsible for checking AI-generated content for accuracy and making sure final submissions reflect their own understanding. When AI is used, students should briefly explain how it supported their work. If you are unsure whether a use is appropriate, please ask for guidance.`,
    fakeScores: {
      Formality: 3.2,
      Politeness: 4.4,
      Affect: 4.3,
      Strictness: 2.5,
      Clarity: 4.0,
      Contestability: 4.5,
    },
    fakeKeywords: {
      Formality: ["students are responsible"],
      Politeness: ["please ask", "guidance"],
      Affect: ["support", "idea development"],
      Strictness: ["should briefly explain"],
      Clarity: ["when AI is used", "checking AI-generated content"],
      Contestability: ["if you are unsure", "appropriate"],
    },
    fakeRewrite: `Generative AI tools may be used to support brainstorming, studying, outlining, grammar review, and idea development. Students remain responsible for checking AI-generated content for accuracy and ensuring that final submissions reflect their own understanding. When AI meaningfully supports an assignment, students should briefly explain how it was used. If a use case is unclear, students are encouraged to ask for guidance before submitting work.`,
    fakeRewriteScores: {
      Formality: 3.6,
      Politeness: 4.2,
      Affect: 4.1,
      Strictness: 3.3,
      Clarity: 4.7,
      Contestability: 4.1,
    },
    fakeDistance: 0.5,
  },
  {
    name: "Balanced policy",
    text: `Students may use generative AI tools for brainstorming, studying, debugging, outlining, and improving clarity in writing. However, students may not use AI to complete exams, quizzes, reflections, or assignments where independent work is required. Submitted work must represent the student's own reasoning. AI use should be acknowledged when it meaningfully contributes to an assignment. If expectations are unclear, ask before using AI.`,
    fakeScores: {
      Formality: 3.6,
      Politeness: 3.6,
      Affect: 3.5,
      Strictness: 3.8,
      Clarity: 4.3,
      Contestability: 3.5,
    },
    fakeKeywords: {
      Formality: ["submitted work", "independent work"],
      Politeness: ["if expectations are unclear"],
      Affect: ["improving clarity", "brainstorming"],
      Strictness: ["may not use", "must represent"],
      Clarity: ["AI use should be acknowledged"],
      Contestability: ["ask before using AI"],
    },
    fakeRewrite: `Students may use generative AI tools for brainstorming, studying, debugging, outlining, and improving clarity in writing. AI should not be used to complete exams, quizzes, reflections, or assignments where independent work is required. Submitted work should represent the student's own reasoning and understanding. When AI meaningfully contributes to an assignment, students should acknowledge how it was used. If expectations are unclear, students should ask before using AI.`,
    fakeRewriteScores: {
      Formality: 3.7,
      Politeness: 4.0,
      Affect: 3.8,
      Strictness: 3.5,
      Clarity: 4.8,
      Contestability: 4.0,
    },
    fakeDistance: 0.3,
  },
];

function getDemoResult(input, selectedDemoName) {
  const byName = DEMO_POLICIES.find((p) => p.name === selectedDemoName);
  if (byName) return byName;

  const byText = DEMO_POLICIES.find((p) => p.text.trim() === input.trim());
  if (byText) return byText;

  return DEMO_POLICIES[2];
}

function scoresToRichScores(scores) {
  return Object.fromEntries(
    Object.entries(scores).map(([category, score]) => [
      category,
      {
        score,
        label: "Demo score",
        confidence: 0.9,
      },
    ])
  );
}

export default function AnalyzePage() {
  const [input, setInput] = useState("");
  const [selectedDemoName, setSelectedDemoName] = useState("");
  const [optimizeFor, setOptimizeFor] = useState("autonomy");
  const [runMode, setRunMode] = useState("fast");
  const [activePanel, setActivePanel] = useState("insights");
  const [loadingStep, setLoadingStep] = useState(0);

  const [isScoring, setIsScoring] = useState(false);
  const [isRewriting, setIsRewriting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [scores, setScores] = useState({});
  const [originalScores, setOriginalScores] = useState({});
  const [rewrittenScores, setRewrittenScores] = useState({});
  const [rewriteMode, setRewriteMode] = useState("");
  const [aiPolicyText, setAiPolicyText] = useState("");
  const [keywordsByCategory, setKeywordsByCategory] = useState({});
  const [selectedKeyword, setSelectedKeyword] = useState("");
  const [rewrite, setRewrite] = useState("");
  const [rewriteCandidates, setRewriteCandidates] = useState([]);
  const [bestRewriteIndex, setBestRewriteIndex] = useState(null);

  async function handleAnalyze() {
    if (!input.trim()) {
      setStatusMessage("Paste a syllabus to analyze.");
      return;
    }

    if (PUBLIC_DEMO_ONLY) {
      setIsScoring(true);
      setLoadingStep(2);
      setStatusMessage("Demo mode: generating sample analysis...");
      setSelectedKeyword("");
      setRewrite("");
      setRewrittenScores({});
      setRewriteMode("");
      setRewriteCandidates([]);
      setBestRewriteIndex(null);

      setTimeout(() => {
        const demo = getDemoResult(input, selectedDemoName);

        setScores(demo.fakeScores);
        setOriginalScores(demo.fakeScores);
        setAiPolicyText(input);
        setKeywordsByCategory(demo.fakeKeywords || {});
        setStatusMessage(`Demo analysis complete: ${demo.name}`);
        setIsScoring(false);
        setLoadingStep(0);
      }, 1000);

      return;
    }

    setIsScoring(true);
    setLoadingStep(1);
    setStatusMessage("");
    setSelectedKeyword("");
    setRewrite("");
    setRewrittenScores({});
    setRewriteMode("");
    setRewriteCandidates([]);
    setBestRewriteIndex(null);

    try {
      setLoadingStep(2);
      const out = await scorePolicy(input, optimizeFor);

      if (out.status !== "ok") {
        setStatusMessage(out.message || "Scoring failed.");
        return;
      }

      const nextScores = {};
      Object.entries(out.scores || {}).forEach(([category, obj]) => {
        nextScores[category] = obj?.score ?? 3.0;
      });

      setScores(nextScores);
      setOriginalScores(nextScores);
      setAiPolicyText(out.ai_policy_text || "");
      setKeywordsByCategory(out.keywords_by_category || {});
      setStatusMessage("Scoring complete.");
    } catch (e) {
      console.error(e);
      setStatusMessage("Scoring failed.");
    } finally {
      setIsScoring(false);
      setLoadingStep(0);
    }
  }

  async function handleRewrite(mode) {
    if (!aiPolicyText.trim()) {
      setStatusMessage("Analyze a policy first.");
      return;
    }

    if (PUBLIC_DEMO_ONLY) {
      setIsRewriting(true);
      setLoadingStep(3);
      setStatusMessage("Demo mode: generating sample rewrite...");
      setRewriteMode(mode);

      setTimeout(() => {
        const demo = getDemoResult(input, selectedDemoName);
        const fakeRewrite = demo.fakeRewrite;
        const fakeRewriteScores = demo.fakeRewriteScores;

        setRewrite(fakeRewrite);
        setRewrittenScores(fakeRewriteScores);
        setRewriteCandidates([
          {
            index: 0,
            rewrite: fakeRewrite,
            scores: scoresToRichScores(fakeRewriteScores),
            distance_to_target: demo.fakeDistance,
          },
        ]);
        setBestRewriteIndex(0);
        setActivePanel("validation");

        setStatusMessage(`Demo rewrite complete: ${demo.name}`);
        setIsRewriting(false);
        setLoadingStep(0);
      }, 1200);

      return;
    }

    setIsRewriting(true);
    setLoadingStep(3);
    setStatusMessage("");
    setRewriteMode(mode);

    try {
      const candidateCount = runMode === "fast" ? 1 : 3;
      const out = await rewriteOptimizePolicy(aiPolicyText, mode, candidateCount, runMode);

      if (out.status !== "ok") {
        setStatusMessage(out.message || "Rewrite optimization failed.");
        return;
      }

      setRewrite(out.best_rewrite || "");
      setRewriteCandidates(out.candidates || []);
      setBestRewriteIndex(out.best_index);

      const next = {};
      Object.entries(out.best_scores || {}).forEach(([k, v]) => {
        next[k] = v?.score ?? 3;
      });

      setRewrittenScores(next);
      setStatusMessage(
        `${runMode === "fast" ? "Fast" : "Research"} mode generated ${
          out.candidates?.length || 0
        } rewrites. Selected candidate ${(out.best_index ?? 0) + 1} as best.`
      );
      setActivePanel("validation");
    } catch (e) {
      console.error(e);
      setStatusMessage("Rewrite optimization failed.");
    } finally {
      setIsRewriting(false);
      setLoadingStep(0);
    }
  }

  function renderHighlightedPolicy(text, highlight) {
    if (!text) return "No extracted policy yet.";
    if (!highlight) return text;

    const i = text.toLowerCase().indexOf(highlight.toLowerCase());
    if (i === -1) return text;

    return (
      <>
        {text.slice(0, i)}
        <mark style={markStyle}>
          {text.slice(i, i + highlight.length)}
        </mark>
        {text.slice(i + highlight.length)}
      </>
    );
  }

  function renderActivePanel() {
    if (activePanel === "insights") {
      return <ScoreExplanationPanel scores={scores} />;
    }

    if (activePanel === "keywords") {
      return (
        <div style={{ display: "grid", gap: 16 }}>
          <KeywordPanel
            keywordsByCategory={keywordsByCategory}
            selectedKeyword={selectedKeyword}
            setSelectedKeyword={setSelectedKeyword}
          />
          <KeywordExplanationPanel keywordsByCategory={keywordsByCategory} />
        </div>
      );
    }

    if (activePanel === "candidates") {
      return (
        <RewriteCandidatesPanel
          candidates={rewriteCandidates}
          bestIndex={bestRewriteIndex}
        />
      );
    }

    if (activePanel === "validation") {
      return (
        <div style={{ display: "grid", gap: 16 }}>
          <ValidationPanel
            originalScores={originalScores}
            rewrittenScores={rewrittenScores}
            rewriteMode={rewriteMode}
          />
          <RewriteExplanationPanel
            originalScores={originalScores}
            rewrittenScores={rewrittenScores}
            candidates={rewriteCandidates}
            bestIndex={bestRewriteIndex}
          />
        </div>
      );
    }

    return null;
  }

  return (
    <div style={{ fontSize: 17 }}>
      <section style={topBarStyle}>
        <select
          value={optimizeFor}
          onChange={(e) => setOptimizeFor(e.target.value)}
          style={selectStyle}
        >
          <option value="autonomy">Optimize: Autonomy</option>
          <option value="enforcement">Optimize: Enforcement</option>
        </select>

        <select
          value={runMode}
          onChange={(e) => setRunMode(e.target.value)}
          style={selectStyle}
        >
          <option value="fast">Fast mode</option>
          <option value="research">Research mode</option>
        </select>

        <div style={topHelpTextStyle}>
          Analyze the AI policy, compare the original text with an optimized rewrite, then review supporting evidence.
        </div>
      </section>

      <LoadingBar
        active={isScoring || isRewriting}
        label={
          isScoring
            ? "Analyzing and scoring policy..."
            : isRewriting
            ? "Generating and validating rewrite..."
            : "Processing..."
        }
      />

      {statusMessage && <div style={statusStyle}>{statusMessage}</div>}

      <section style={heroStyle}>
        <div style={heroTitleBlockStyle}>
          <div style={heroTitleStyle}>Perception Matrix</div>
          <div style={heroSubtitleStyle}>
            Hover categories to explore score, target, and status.
          </div>
        </div>

        <div className="radar-mobile-wrap" style={radarWrapStyle}>
          <RadarChart scores={scores} size={850} />
        </div>
      </section>

      <section className="analyze-compare-grid" style={compareGridStyle}>
        <Card
          title="Original Input"
          right={
            <button
              onClick={handleAnalyze}
              disabled={isScoring}
              style={primaryButtonStyle(isScoring)}
            >
              {isScoring ? "Analyzing..." : "Analyze"}
            </button>
          }
        >
          <div style={demoPolicyWrapStyle}>
            <div style={demoPolicyLabelStyle}>Try a demo policy:</div>

            <div style={demoPolicyButtonsStyle}>
              {DEMO_POLICIES.map((policy) => (
                <button
                  key={policy.name}
                  onClick={() => {
                    setInput(policy.text);
                    setSelectedDemoName(policy.name);
                    setStatusMessage(`Loaded demo: ${policy.name}`);
                  }}
                  style={demoPolicyButtonStyle}
                >
                  {policy.name}
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setSelectedDemoName("");
            }}
            placeholder="Paste your syllabus here..."
            style={largeTextareaStyle}
          />

          <div style={subPanelStyle}>
            <div style={miniHeaderStyle}>Extracted AI Policy</div>
            <div style={policyBoxStyle}>
              {renderHighlightedPolicy(aiPolicyText, selectedKeyword)}
            </div>
          </div>
        </Card>

        <Card title="Optimized Rewrite">
          <RewritePanel
            rewrite={rewrite}
            onRewrite={handleRewrite}
            isRewriting={isRewriting}
          />

          <div style={subPanelStyle}>
            <div style={miniHeaderStyle}>Rewrite Validation</div>
            <ValidationPanel
              originalScores={originalScores}
              rewrittenScores={rewrittenScores}
              rewriteMode={rewriteMode}
            />
          </div>
        </Card>
      </section>

      <section style={{ marginTop: 18 }}>
        <Card title="Analysis Details">
          <div style={tabsStyle}>
            <TabButton active={activePanel === "insights"} onClick={() => setActivePanel("insights")}>
              Score Insights
            </TabButton>
            <TabButton active={activePanel === "keywords"} onClick={() => setActivePanel("keywords")}>
              Keywords
            </TabButton>
            <TabButton active={activePanel === "candidates"} onClick={() => setActivePanel("candidates")}>
              Rewrite Candidates
            </TabButton>
            <TabButton active={activePanel === "validation"} onClick={() => setActivePanel("validation")}>
              Rewrite Explanation
            </TabButton>
          </div>

          <div style={{ marginTop: 16 }}>{renderActivePanel()}</div>
        </Card>
      </section>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 14px",
        borderRadius: 999,
        border: active
          ? "1px solid rgba(34,211,238,0.48)"
          : "1px solid rgba(255,255,255,0.12)",
        background: active
          ? "linear-gradient(135deg, rgba(34,211,238,0.18), rgba(168,85,247,0.14))"
          : "rgba(255,255,255,0.045)",
        color: active ? "white" : "rgba(255,255,255,0.72)",
        fontWeight: 900,
        cursor: "pointer",
        boxShadow: active ? "0 12px 30px rgba(34,211,238,0.10)" : "none",
      }}
    >
      {children}
    </button>
  );
}

const topBarStyle = {
  marginTop: 14,
  display: "flex",
  gap: 12,
  alignItems: "center",
  flexWrap: "wrap",
};

const topHelpTextStyle = {
  fontSize: 15,
  color: "rgba(255,255,255,0.62)",
  fontWeight: 600,
};

const selectStyle = {
  background: "rgba(255,255,255,0.06)",
  color: "white",
  border: "1px solid rgba(255,255,255,0.16)",
  borderRadius: 14,
  padding: "10px 14px",
  fontWeight: 800,
  backdropFilter: "blur(8px)",
  outline: "none",
};

const statusStyle = {
  marginTop: 12,
  padding: "10px 12px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.06)",
  color: "rgba(255,255,255,0.82)",
  fontSize: 15,
  fontWeight: 600,
};

const heroStyle = {
  marginTop: 26,
  minHeight: "68vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const heroTitleBlockStyle = {
  marginBottom: -48,
  zIndex: 2,
  paddingLeft: 8,
};

const heroTitleStyle = {
  fontSize: 34,
  fontWeight: 1000,
  letterSpacing: "-0.04em",
  color: "white",
};

const heroSubtitleStyle = {
  marginTop: 6,
  fontSize: 17,
  color: "rgba(255,255,255,0.6)",
  fontWeight: 600,
};

const radarWrapStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
};

const compareGridStyle = {
  marginTop: 12,
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 18,
  alignItems: "start",
};

const largeTextareaStyle = {
  width: "100%",
  minHeight: 250,
  resize: "vertical",
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.075), rgba(255,255,255,0.035))",
  color: "rgba(255,255,255,0.92)",
  border: "1px solid rgba(255,255,255,0.16)",
  borderRadius: 18,
  padding: "16px 18px",
  outline: "none",
  fontSize: 16,
  lineHeight: 1.6,
  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)",
};

const subPanelStyle = {
  marginTop: 16,
  paddingTop: 14,
  borderTop: "1px solid rgba(255,255,255,0.10)",
};

const miniHeaderStyle = {
  marginBottom: 10,
  fontSize: 14,
  fontWeight: 950,
  color: "rgba(255,255,255,0.86)",
};

const policyBoxStyle = {
  minHeight: 190,
  whiteSpace: "pre-wrap",
  lineHeight: 1.65,
  fontSize: 16,
  padding: 16,
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.035)",
  color: "rgba(255,255,255,0.88)",
};

const tabsStyle = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
};

const markStyle = {
  background: "rgba(34,211,238,0.30)",
  color: "white",
  padding: "0 4px",
  borderRadius: 5,
};

function primaryButtonStyle(disabled) {
  return {
    padding: "9px 15px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.18)",
    background: disabled
      ? "rgba(255,255,255,0.08)"
      : "linear-gradient(135deg, rgba(168,85,247,0.95), rgba(34,211,238,0.95))",
    color: "white",
    fontWeight: 900,
    cursor: disabled ? "not-allowed" : "pointer",
    boxShadow: "0 10px 28px rgba(34,211,238,0.16)",
  };
}

const demoPolicyWrapStyle = {
  marginBottom: 14,
  display: "grid",
  gap: 9,
};

const demoPolicyLabelStyle = {
  fontSize: 13,
  fontWeight: 950,
  color: "rgba(255,255,255,0.66)",
};

const demoPolicyButtonsStyle = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
};

const demoPolicyButtonStyle = {
  padding: "9px 12px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.13)",
  background: "rgba(255,255,255,0.055)",
  color: "white",
  fontWeight: 850,
  cursor: "pointer",
};