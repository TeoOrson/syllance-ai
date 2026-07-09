import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { APP_NAME } from "../data/categories";
import PipelineGraphic from "../components/PipelineGraphic";

const FEATURE_CARDS = [
  {
    title: "Built for interpretability",
    text: "Syllance.AI is designed to make language analysis transparent and understandable. Each score is tied directly to evidence from the policy text, along with clear explanations of why specific wording leads to certain perceptions. Instead of just assigning numbers, the system helps users see how tone, clarity, and structure influence interpretation, making it easier to understand how a policy is being received.",
  },
  {
    title: "Optimized rewrites",
    text: "Syllance.AI goes beyond analysis by generating multiple rewritten versions of a policy based on different rhetorical goals. These candidates are evaluated across the same perception categories, and the system selects the version that best aligns with the intended balance of clarity, strictness, tone, and flexibility. This allows users to actively refine their policies rather than just observe their impact.",
  },
  {
    title: "Research-facing workflow",
    text: "Syllance.AI is built as both a practical tool and a research platform for studying how language shapes perception in academic settings. It supports syllabus AI policy research, live demonstrations, and future validation work by comparing model-generated evaluations with structured human rubrics. This makes it useful not only for instructors, but also for understanding broader patterns in how policy language affects student trust and engagement.",
  },
];

const PIPELINE_STEPS = [
  ["01", "Extract", "Find the AI policy section from the syllabus."],
  ["02", "Judge", "Score language across six perception categories."],
  ["03", "Explain", "Surface evidence phrases and category reasoning."],
  ["04", "Optimize", "Generate rewrites and select the best candidate."],
];

export default function HomePage() {
  const navigate = useNavigate();
  const onStart = () => navigate("/analyze");
  const onAbout = () => navigate("/about");

  return (
    <main className="mt-8 grid gap-6">
      <section className="home-hero grid min-h-[78vh] grid-cols-1 items-center gap-12 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-[70px] lg:py-20">
        <div className="grid gap-4">
          <div className="w-fit rounded-full border border-border bg-white/5 px-3 py-1.5 text-xs font-black text-foreground/70">
            Research prototype for higher education AI policy
          </div>

          <h1
            className="home-title m-0 font-black"
            style={{ fontSize: "clamp(86px, 12vw, 172px)", lineHeight: 0.86, letterSpacing: "-7px" }}
          >
            {APP_NAME}
          </h1>

          <p className="m-0 max-w-[850px] text-2xl leading-relaxed text-foreground/75">
            A perception-analysis tool for understanding how AI syllabus policy
            language shapes clarity, authority, trust, and student response.
          </p>

          <div className="home-button-row mt-1.5 flex flex-wrap gap-3">
            <Button
              variant="brand"
              onClick={onStart}
              className="w-full rounded-xl px-6 py-6 text-[17px] lg:w-auto"
            >
              Analyze now
            </Button>
            <Button
              variant="outline"
              onClick={onAbout}
              className="w-full rounded-xl px-6 py-6 text-[17px] font-extrabold lg:w-auto"
            >
              View research
            </Button>
          </div>
        </div>

        <div className="min-h-[360px] rounded-3xl border border-border bg-gradient-to-b from-white/8 to-white/4 p-6 shadow-2xl">
          <div className="mb-4 flex gap-1.5">
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
          </div>

          <div className="mb-3.5 text-sm font-black">Policy analysis preview</div>

          <div className="grid grid-cols-2 gap-2.5">
            {[
              ["Clarity", "4.8"],
              ["Politeness", "4.1"],
              ["Strictness", "3.5"],
              ["Affect", "3.9"],
            ].map(([name, score]) => (
              <div key={name} className="rounded-lg border border-border bg-white/4 p-3.5">
                <div className="text-xs text-foreground/60">{name}</div>
                <div className="mt-1.5 text-3xl font-black">{score}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2.5 rounded-lg bg-white/4 p-3 text-[13px] font-bold text-foreground/70">
            <div>Upload</div>
            <div>→</div>
            <div>Score</div>
            <div>→</div>
            <div>Rewrite</div>
            <div>→</div>
            <div>Validate</div>
          </div>
        </div>
      </section>

      <section className="mission-section grid grid-cols-1 items-start gap-6 rounded-2xl border border-border bg-white/[0.035] p-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="text-xs font-black tracking-wide text-brand-cyan uppercase">Our mission</div>
          <h2 className="mt-2 text-[46px] leading-[1.05] font-bold tracking-[-1.2px]">
            Helping instructors write AI policies students can actually understand and trust.
          </h2>
        </div>

        <p className="m-0 text-lg leading-relaxed text-foreground/75">
          Syllabus AI policies are becoming one of the first places students learn how
          their instructors view generative AI, academic integrity, and student
          responsibility. Our goal is to make that language more measurable,
          interpretable, and supportive of better communication between instructors
          and students.
        </p>
      </section>

      <section className="section-grid grid grid-cols-1 gap-4 lg:grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
        {FEATURE_CARDS.map((card) => (
          <Card key={card.title}>
            <CardHeader>
              <CardTitle className="text-sm font-black">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="m-0 text-xl leading-relaxed text-foreground/75">{card.text}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-3 rounded-2xl border border-border bg-white/[0.035] p-6">
        <div>
          <div className="text-xs font-black tracking-wide text-brand-cyan uppercase">How it works</div>
          <h2 className="mt-2 mb-5 max-w-[660px] text-[34px] tracking-[-0.8px]">
            From syllabus text to measurable policy perception.
          </h2>
        </div>

        <div className="pipeline-grid grid grid-cols-1 gap-3 lg:grid-cols-[repeat(auto-fit,minmax(210px,1fr))]">
          {PIPELINE_STEPS.map(([num, head, text]) => (
            <div key={num} className="rounded-xl border border-border bg-white/[0.035] p-4">
              <div className="mb-4 text-xs font-black text-foreground/50">{num}</div>
              <div className="font-black">{head}</div>
              <div className="mt-2 text-xl leading-relaxed text-foreground/65">{text}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-7 rounded-[34px] border border-border bg-gradient-to-b from-white/6 to-white/[0.025] px-8 py-10 shadow-2xl lg:px-12">
        <div className="text-xs font-black tracking-wide text-brand-cyan uppercase">Analysis pipeline</div>
        <h2 className="mt-2.5 mb-7 max-w-[980px] text-[46px] leading-[1.05] tracking-[-1.2px]">
          A research-informed workflow from syllabus text to actionable feedback.
        </h2>
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[900px]">
            <PipelineGraphic />
          </div>
        </div>
      </section>

      <section className="mb-10 rounded-2xl border border-border bg-gradient-to-br from-brand-purple/15 to-brand-cyan/10 p-7 text-center">
        <h2 className="m-0 text-3xl tracking-[-0.7px]">Try the analyzer on a real AI policy.</h2>
        <p className="mx-auto my-3.5 max-w-[900px] text-xl leading-relaxed text-foreground/70">
          Paste a syllabus, extract the AI policy, view the perception profile,
          and generate an optimized rewrite.
        </p>
        <Button variant="brand" onClick={onStart} className="rounded-xl px-6 py-6">
          Launch Syllance.AI
        </Button>
      </section>
    </main>
  );
}
