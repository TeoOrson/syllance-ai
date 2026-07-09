import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardAction, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
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
      }, 1000);

      return;
    }

    setIsScoring(true);
    setStatusMessage("");
    setSelectedKeyword("");
    setRewrite("");
    setRewrittenScores({});
    setRewriteMode("");
    setRewriteCandidates([]);
    setBestRewriteIndex(null);

    try {
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
    }
  }

  async function handleRewrite(mode) {
    if (!aiPolicyText.trim()) {
      setStatusMessage("Analyze a policy first.");
      return;
    }

    if (PUBLIC_DEMO_ONLY) {
      setIsRewriting(true);
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
      }, 1200);

      return;
    }

    setIsRewriting(true);
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
        <mark className="rounded-[5px] bg-brand-cyan/30 px-1 text-foreground">
          {text.slice(i, i + highlight.length)}
        </mark>
        {text.slice(i + highlight.length)}
      </>
    );
  }

  return (
    <div className="text-[17px]">
      <section className="mt-3.5 flex flex-wrap items-center gap-3">
        <Select value={optimizeFor} onValueChange={setOptimizeFor}>
          <SelectTrigger className="font-bold">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="autonomy">Optimize: Autonomy</SelectItem>
            <SelectItem value="enforcement">Optimize: Enforcement</SelectItem>
          </SelectContent>
        </Select>

        <Select value={runMode} onValueChange={setRunMode}>
          <SelectTrigger className="font-bold">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fast">Fast mode</SelectItem>
            <SelectItem value="research">Research mode</SelectItem>
          </SelectContent>
        </Select>

        <div className="text-sm font-semibold text-foreground/62">
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

      {statusMessage && (
        <div className="mt-3 rounded-lg border border-border bg-card px-3 py-2.5 text-sm font-semibold text-foreground/82">
          {statusMessage}
        </div>
      )}

      <section className="mt-6 flex min-h-[68vh] flex-col justify-center">
        <div className="z-10 mb-[-48px] pl-2">
          <div className="text-[34px] font-black tracking-[-0.04em]">Perception Matrix</div>
          <div className="mt-1.5 text-[17px] font-semibold text-foreground/60">
            Hover categories to explore score, target, and status.
          </div>
        </div>

        <div className="flex w-full items-center justify-center overflow-x-auto px-6">
          <RadarChart scores={scores} size={850} />
        </div>

        {Object.keys(scores).length > 0 && (
          <Alert className="mx-auto mt-[18px] max-w-[780px] text-[13px] leading-relaxed">
            <AlertDescription className="text-foreground/72">
              <strong className="text-foreground/88">How to read these scores:</strong>{" "}
              Politeness is highly reliable. Strictness and Formality run slightly high but are
              directionally trustworthy.{" "}
              <strong className="text-red-400">
                Clarity and Contestability are the least reliable dimensions
              </strong>{" "}
              — both tend to score more favorably than a human reader would agree with, so treat high
              scores on those two with extra skepticism. Affect looks stable on average but can be wrong
              in either direction on any single policy — use the keyword evidence to sanity-check it.
            </AlertDescription>
          </Alert>
        )}
      </section>

      <section className="mt-3 grid grid-cols-1 items-start gap-[18px] lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-black">Original Input</CardTitle>
            <CardAction>
              <Button variant="brand" size="sm" onClick={handleAnalyze} disabled={isScoring}>
                {isScoring ? "Analyzing..." : "Analyze"}
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="mb-3.5 grid gap-2">
              <div className="text-[13px] font-black text-foreground/66">Try a demo policy:</div>

              <div className="flex flex-wrap gap-2.5">
                {DEMO_POLICIES.map((policy) => (
                  <Button
                    key={policy.name}
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    onClick={() => {
                      setInput(policy.text);
                      setSelectedDemoName(policy.name);
                      setStatusMessage(`Loaded demo: ${policy.name}`);
                    }}
                  >
                    {policy.name}
                  </Button>
                ))}
              </div>
            </div>

            <Textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setSelectedDemoName("");
              }}
              placeholder="Paste your syllabus here..."
              className="min-h-[250px] resize-y text-base leading-relaxed"
            />

            <div className="mt-4 border-t border-border pt-3.5">
              <div className="mb-2.5 text-sm font-black text-foreground/86">Extracted AI Policy</div>
              <div className="min-h-[190px] rounded-lg border border-border bg-card p-4 text-base leading-relaxed whitespace-pre-wrap">
                {renderHighlightedPolicy(aiPolicyText, selectedKeyword)}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-black">Optimized Rewrite</CardTitle>
          </CardHeader>
          <CardContent>
            <RewritePanel rewrite={rewrite} onRewrite={handleRewrite} isRewriting={isRewriting} />

            <div className="mt-4 border-t border-border pt-3.5">
              <div className="mb-2.5 text-sm font-black text-foreground/86">Rewrite Validation</div>
              <ValidationPanel
                originalScores={originalScores}
                rewrittenScores={rewrittenScores}
                rewriteMode={rewriteMode}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-[18px]">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-black">Analysis Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activePanel} onValueChange={setActivePanel}>
              <TabsList className="h-auto flex-wrap bg-transparent p-0">
                <TabsTrigger
                  value="insights"
                  className="rounded-full border border-border px-3.5 py-2.5 data-active:border-brand-cyan/48 data-active:bg-gradient-to-br data-active:from-brand-cyan/18 data-active:to-brand-purple/14"
                >
                  Score Insights
                </TabsTrigger>
                <TabsTrigger
                  value="keywords"
                  className="rounded-full border border-border px-3.5 py-2.5 data-active:border-brand-cyan/48 data-active:bg-gradient-to-br data-active:from-brand-cyan/18 data-active:to-brand-purple/14"
                >
                  Keywords
                </TabsTrigger>
                <TabsTrigger
                  value="candidates"
                  className="rounded-full border border-border px-3.5 py-2.5 data-active:border-brand-cyan/48 data-active:bg-gradient-to-br data-active:from-brand-cyan/18 data-active:to-brand-purple/14"
                >
                  Rewrite Candidates
                </TabsTrigger>
                <TabsTrigger
                  value="validation"
                  className="rounded-full border border-border px-3.5 py-2.5 data-active:border-brand-cyan/48 data-active:bg-gradient-to-br data-active:from-brand-cyan/18 data-active:to-brand-purple/14"
                >
                  Rewrite Explanation
                </TabsTrigger>
              </TabsList>

              <TabsContent value="insights" className="mt-4">
                <ScoreExplanationPanel scores={scores} />
              </TabsContent>

              <TabsContent value="keywords" className="mt-4">
                <div className="grid gap-4">
                  <KeywordPanel
                    keywordsByCategory={keywordsByCategory}
                    selectedKeyword={selectedKeyword}
                    setSelectedKeyword={setSelectedKeyword}
                  />
                  <KeywordExplanationPanel keywordsByCategory={keywordsByCategory} />
                </div>
              </TabsContent>

              <TabsContent value="candidates" className="mt-4">
                <RewriteCandidatesPanel candidates={rewriteCandidates} bestIndex={bestRewriteIndex} />
              </TabsContent>

              <TabsContent value="validation" className="mt-4">
                <div className="grid gap-4">
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
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
