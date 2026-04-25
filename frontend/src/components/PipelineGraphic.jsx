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
    <div style={wrap}>
      <div style={title}>Analysis Pipeline</div>

      <div style={stepsRow}>
        {steps.map((step, index) => (
          <React.Fragment key={step.title}>
            <div style={stepCard}>
              <div style={iconBox}>{step.icon}</div>
              <div style={stepTitle}>{step.title}</div>
              {step.lines.map((line) => (
                <div key={line} style={stepText}>
                  {line}
                </div>
              ))}
            </div>

            {index < steps.length - 1 && <div style={arrow}>→</div>}
          </React.Fragment>
        ))}
      </div>

      <div style={framework}>
        <div style={frameworkIcon}>✦</div>
        <div>
          <div style={frameworkTitle}>Literature Informed Framework</div>
          <div style={frameworkLine}>Categories derived from research</div>
          <div style={frameworkLine}>
            Defines how language influences perception and trust
          </div>
          <div style={frameworkLine}>Guides model evaluation criteria</div>
        </div>
      </div>
    </div>
  );
}

const wrap = {
  width: "100%",
  borderRadius: 30,
  padding: 32,
  background:
    "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.22), transparent 35%)," +
    "radial-gradient(circle at 80% 30%, rgba(34,211,238,0.18), transparent 35%)," +
    "rgba(255,255,255,0.035)",
  border: "1px solid rgba(255,255,255,0.10)",
};

const title = {
  width: "fit-content",
  margin: "0 auto 34px",
  padding: "12px 28px",
  borderRadius: 18,
  background:
    "linear-gradient(90deg, rgba(168,85,247,0.95), rgba(34,211,238,0.90))",
  fontSize: 30,
  fontWeight: 950,
  letterSpacing: -0.5,
};

const stepsRow = {
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr auto 1fr auto 1fr",
  gap: 14,
  alignItems: "center",
};

const stepCard = {
  minHeight: 260,
  display: "grid",
  alignContent: "center",
  justifyItems: "center",
  textAlign: "center",
  gap: 11,
  padding: 24,
  borderRadius: 26,
  border: "1px solid rgba(255,255,255,0.12)",
  background:
    "linear-gradient(160deg, rgba(168,85,247,0.28), rgba(34,211,238,0.16)), rgba(255,255,255,0.045)",
  boxShadow: "0 22px 60px rgba(0,0,0,0.28)",
};

const iconBox = {
  width: 88,
  height: 88,
  borderRadius: 26,
  display: "grid",
  placeItems: "center",
  fontSize: 48,
  fontWeight: 950,
  background: "rgba(255,255,255,0.10)",
  border: "1px solid rgba(255,255,255,0.14)",
};

const stepTitle = {
  marginTop: 8,
  fontSize: 21,
  fontWeight: 950,
  letterSpacing: -0.3,
};

const stepText = {
  fontSize: 14,
  color: "rgba(255,255,255,0.72)",
  lineHeight: 1.45,
};

const arrow = {
  fontSize: 34,
  fontWeight: 950,
  color: "rgba(255,255,255,0.65)",
};

const framework = {
  marginTop: 26,
  display: "grid",
  gridTemplateColumns: "110px 1fr",
  gap: 26,
  alignItems: "center",
  padding: 28,
  borderRadius: 28,
  border: "1px solid rgba(255,255,255,0.12)",
  background:
    "linear-gradient(90deg, rgba(168,85,247,0.24), rgba(34,211,238,0.18)), rgba(255,255,255,0.035)",
};

const frameworkIcon = {
  width: 95,
  height: 95,
  borderRadius: 28,
  display: "grid",
  placeItems: "center",
  fontSize: 52,
  background: "rgba(255,255,255,0.10)",
};

const frameworkTitle = {
  fontSize: 28,
  fontWeight: 950,
  letterSpacing: -0.5,
  marginBottom: 12,
};

const frameworkLine = {
  fontSize: 18,
  lineHeight: 1.7,
  color: "rgba(255,255,255,0.76)",
};