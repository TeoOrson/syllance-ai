import React from "react";

const steps = [
  {
    title: "Syllabus Input",
    icon: "▤",
    lines: ["User uploads syllabus policy"],
  },
  {
    title: "Language Analysis",
    icon: "◉",
    lines: ["Text processed by AI model", "Analyzes linguistic features"],
  },
  {
    title: "Scoring/Categorization",
    icon: "★",
    lines: ["Scores", "Category ratings assigned"],
  },
  {
    title: "Feedback & Guidance",
    icon: "✓",
    lines: ["Score explanations", "Highlighted text", "Improvement suggestions"],
  },
];

export default function PipelineGraphic() {
  return (
    <div
      className="w-full rounded-[30px] border border-border p-8"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.22), transparent 35%)," +
          "radial-gradient(circle at 80% 30%, rgba(34,211,238,0.18), transparent 35%)," +
          "var(--card)",
      }}
    >
      <div className="bg-brand-gradient mx-auto mb-8 w-fit rounded-xl px-7 py-3 text-3xl font-black tracking-[-0.5px] text-white">
        Analysis Pipeline
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-3.5">
        {steps.map((step, index) => (
          <React.Fragment key={step.title}>
            <div
              className="grid min-h-[260px] content-center justify-items-center gap-2.5 rounded-2xl border border-border p-6 text-center shadow-xl"
              style={{
                background:
                  "linear-gradient(160deg, rgba(168,85,247,0.28), rgba(34,211,238,0.16)), var(--card)",
              }}
            >
              <div className="grid size-[88px] place-items-center rounded-2xl border border-border bg-white/10 text-5xl font-black">
                {step.icon}
              </div>
              <div className="mt-2 text-xl font-black tracking-[-0.3px]">{step.title}</div>
              {step.lines.map((line) => (
                <div key={line} className="text-sm leading-snug text-foreground/70">
                  {line}
                </div>
              ))}
            </div>

            {index < steps.length - 1 && (
              <div className="text-3xl font-black text-foreground/60">→</div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div
        className="mt-6 grid grid-cols-[110px_1fr] items-center gap-6 rounded-2xl border border-border p-7"
        style={{
          background:
            "linear-gradient(90deg, rgba(168,85,247,0.24), rgba(34,211,238,0.18)), var(--card)",
        }}
      >
        <div className="grid size-[95px] place-items-center rounded-2xl bg-white/10 text-5xl">✦</div>
        <div>
          <div className="mb-3 text-[28px] font-black tracking-[-0.5px]">
            Literature Informed Framework
          </div>
          <div className="text-lg leading-relaxed text-foreground/75">
            Categories derived from research
          </div>
          <div className="text-lg leading-relaxed text-foreground/75">
            Defines how language influences perception and trust
          </div>
          <div className="text-lg leading-relaxed text-foreground/75">
            Guides model evaluation criteria
          </div>
        </div>
      </div>
    </div>
  );
}
