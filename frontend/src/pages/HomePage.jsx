import React from "react";
import Card from "../shared/CardShim";
import { APP_NAME } from "../data/categories";
//import pipelineGraphic from "../assets/TransparentSyllancePipelineGraphicIMage.png"
import PipelineGraphic from "../components/PipelineGraphic";

export default function HomePage({ onStart, onAbout }) {
  return (
    <main style={{ display: "grid", gap: 22, marginTop: 34 }}>
      <section className="home-hero" style={hero}>
        <div style={heroText}>
          <div style={eyebrow}>Research prototype for higher education AI policy</div>

          <h1 className="home-title" style={title}>{APP_NAME}</h1>

          <p style={subtitle}>
            A perception-analysis tool for understanding how AI syllabus policy
            language shapes clarity, authority, trust, and student response.
          </p>

          <div className="home-button-row" style={buttonRow}>
            <button onClick={onStart} style={primaryButton}>
              Analyze now
            </button>
            <button onClick={onAbout} style={secondaryButton}>
              View research
            </button>
          </div>
        </div>

        <div style={productMock}>
          <div style={mockTop}>
            <span />
            <span />
            <span />
          </div>

          <div style={mockTitle}>Policy analysis preview</div>

          <div style={scoreGrid}>
            {[
              ["Clarity", "4.8"],
              ["Politeness", "4.1"],
              ["Strictness", "3.5"],
              ["Affect", "3.9"],
            ].map(([name, score]) => (
              <div key={name} style={scoreCard}>
                <div style={scoreLabel}>{name}</div>
                <div style={scoreValue}>{score}</div>
              </div>
            ))}
          </div>

          <div style={pipelineMini}>
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

      <section className="mission-section" style={missionSection}>
        <div>
            <div style={sectionKicker}>Our mission</div>
            <h2 style={missionTitle}>
            Helping instructors write AI policies students can actually understand and trust.
            </h2>
        </div>

        <p style={missionText}>
            Syllabus AI policies are becoming one of the first places students learn how
            their instructors view generative AI, academic integrity, and student
            responsibility. Our goal is to make that language more measurable,
            interpretable, and supportive of better communication between instructors
            and students.
        </p>
        </section>

      <section className="section-grid" style={sectionGrid}>
        <Card title="Built for interpretability">
          <p style={bodyText}>
            Syllance.AI is designed to make language analysis transparent and understandable.
             Each score is tied directly to evidence from the policy text, along with clear 
             explanations of why specific wording leads to certain perceptions. Instead of 
             just assigning numbers, the system helps users see how tone, clarity, and structure 
             influence interpretation, making it easier to understand how a policy is being receive
          </p>
        </Card>

        <Card title="Optimized rewrites">
          <p style={bodyText}>
            Syllance.AI goes beyond analysis by generating multiple rewritten versions of a policy 
            based on different rhetorical goals. These candidates are evaluated across the same perception
             categories, and the system selects the version that best aligns with the intended balance of 
             clarity, strictness, tone, and flexibility. This allows users to actively refine their policies 
             rather than just observe their impact.
          </p>
        </Card>

        <Card title="Research-facing workflow">
          <p style={bodyText}>
            Syllance.AI is built as both a practical tool and a research platform for studying how language shapes
             perception in academic settings. It supports syllabus AI policy research, live demonstrations, and future
              validation work by comparing model-generated evaluations with structured human rubrics. This makes it 
              useful not only for instructors, but also for understanding broader patterns in how policy language affects 
              student trust and engagement.
          </p>
        </Card>
      </section>

      <section style={pipelineSection}>
        <div>
          <div style={sectionKicker}>How it works</div>
          <h2 style={sectionTitle}>From syllabus text to measurable policy perception.</h2>
        </div>

        <div className="pipeline-grid" style={pipelineGrid}>
          {[
            ["01", "Extract", "Find the AI policy section from the syllabus."],
            ["02", "Judge", "Score language across six perception categories."],
            ["03", "Explain", "Surface evidence phrases and category reasoning."],
            ["04", "Optimize", "Generate rewrites and select the best candidate."],
          ].map(([num, head, text]) => (
            <div key={num} style={pipelineCard}>
              <div style={numStyle}>{num}</div>
              <div style={{ fontWeight: 950 }}>{head}</div>
              <div style={pipelineText}>{text}</div>
            </div>
          ))}
        </div>
      </section>

       <section style={pipelineGraphicSection}>
        <div style={sectionKicker}>Analysis pipeline</div>
        <h2 style={pipelineGraphicTitle}>
            A research-informed workflow from syllabus text to actionable feedback.
        </h2>
        <div className="pipeline-graphic-mobile">
            <PipelineGraphic />
        </div>
        </section>   

      <section style={finalCta}>
        <h2 style={{ margin: 0, fontSize: 30, letterSpacing: -0.7 }}>
          Try the analyzer on a real AI policy.
        </h2>
        <p style={finalText}>
          Paste a syllabus, extract the AI policy, view the perception profile,
          and generate an optimized rewrite.
        </p>
        <button onClick={onStart} style={wideButton}>
          Launch Syllance.AI
        </button>
      </section>
    </main>
  );
}

const hero = {
  minHeight: "78vh",
  display: "grid",
  gridTemplateColumns: "1.15fr 0.85fr",
  gap: 70,
  alignItems: "center",
  padding: "64px 0 80px",
};

const heroText = {
  display: "grid",
  gap: 18,
};

const eyebrow = {
  width: "fit-content",
  padding: "7px 11px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.05)",
  color: "rgba(255,255,255,0.72)",
  fontSize: 12,
  fontWeight: 900,
};

const title = {
  margin: 0,
  fontSize: "clamp(86px, 12vw, 172px)",
  lineHeight: 0.86,
  letterSpacing: -7,
  fontWeight: 1000,
};

const subtitle = {
  margin: 0,
  maxWidth: 850,
  fontSize: 24,
  lineHeight: 1.55,
  color: "rgba(255,255,255,0.74)",
};

const buttonRow = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
  marginTop: 6,
};

const primaryButton = {
  padding: "17px 26px",
  borderRadius: 17,
  border: "1px solid rgba(255,255,255,0.14)",
  background:
    "linear-gradient(90deg, rgba(168,85,247,0.95), rgba(34,211,238,0.90))",
  color: "white",
  fontWeight: 950,
  fontSize: 17,
  cursor: "pointer",
};

const secondaryButton = {
  padding: "17px 26px",
  borderRadius: 17,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.045)",
  color: "white",
  fontWeight: 850,
  fontSize: 17,
  cursor: "pointer",
};

const productMock = {
  borderRadius: 30,
  border: "1px solid rgba(255,255,255,0.11)",
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.085), rgba(255,255,255,0.04))",
  boxShadow: "0 34px 100px rgba(0,0,0,0.48)",
  padding: 26,
  minHeight: 360,
};

const mockTop = {
  display: "flex",
  gap: 7,
  marginBottom: 18,
};

const mockTitle = {
  fontSize: 14,
  fontWeight: 950,
  marginBottom: 14,
};

const scoreGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10,
};

const scoreCard = {
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  padding: 14,
};

const scoreLabel = {
  fontSize: 12,
  color: "rgba(255,255,255,0.58)",
};

const scoreValue = {
  marginTop: 6,
  fontSize: 32,
  fontWeight: 1000,
};

const pipelineMini = {
  marginTop: 16,
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  alignItems: "center",
  padding: 13,
  borderRadius: 16,
  background: "rgba(255,255,255,0.04)",
  color: "rgba(255,255,255,0.72)",
  fontSize: 13,
  fontWeight: 850,
};

const sectionGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 16,
};

const bodyText = {
  margin: 0,
  fontSize: 20,
  lineHeight: 1.8,
  color: "rgba(255,255,255,0.76)",
};

const pipelineSection = {
  marginTop: 12,
  padding: 24,
  borderRadius: 26,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.035)",
};

const sectionKicker = {
  fontSize: 12,
  fontWeight: 950,
  color: "rgba(34,211,238,0.85)",
  textTransform: "uppercase",
  letterSpacing: 1,
};

const sectionTitle = {
  marginTop: 8,
  marginBottom: 20,
  maxWidth: 660,
  fontSize: 34,
  letterSpacing: -0.8,
};

const pipelineGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
  gap: 12,
};

const pipelineCard = {
  padding: 15,
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.035)",
};

const numStyle = {
  fontSize: 12,
  color: "rgba(255,255,255,0.48)",
  fontWeight: 950,
  marginBottom: 18,
};

const pipelineText = {
  marginTop: 8,
  fontSize: 20,
  lineHeight: 1.65,
  color: "rgba(255,255,255,0.68)",
};

const finalCta = {
  marginBottom: 40,
  padding: 28,
  borderRadius: 28,
  border: "1px solid rgba(255,255,255,0.10)",
  background:
    "linear-gradient(135deg, rgba(168,85,247,0.13), rgba(34,211,238,0.08))",
  textAlign: "center",
};

const finalText = {
  margin: "14px auto 24px",
  maxWidth: 900,
  fontSize: 20,
  color: "rgba(255,255,255,0.72)",
  lineHeight: 1.7,
};

const wideButton = {
  padding: "14px 22px",
  borderRadius: 15,
  border: "1px solid rgba(255,255,255,0.14)",
  background:
    "linear-gradient(90deg, rgba(168,85,247,0.95), rgba(34,211,238,0.90))",
  color: "white",
  fontWeight: 950,
  cursor: "pointer",
};

const missionSection = {
  display: "grid",
  gridTemplateColumns: "0.9fr 1.1fr",
  gap: 24,
  alignItems: "start",
  padding: 26,
  borderRadius: 28,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.035)",
};

const missionTitle = {
  margin: "8px 0 0",
  fontSize: 46,
  lineHeight: 1.05,
  letterSpacing: -1.2,
};

const missionText = {
  margin: 0,
  fontSize: 19,
  lineHeight: 1.85,
  color: "rgba(255,255,255,0.76)",
};

const pipelineGraphicSection = {
  marginTop: 28,
  padding: "42px 48px",
  borderRadius: 34,
  border: "1px solid rgba(255,255,255,0.10)",
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.025))",
  boxShadow: "0 30px 90px rgba(0,0,0,0.32)",
};

const pipelineGraphicTitle = {
  margin: "10px 0 28px",
  maxWidth: 980,
  fontSize: 46,
  lineHeight: 1.05,
  letterSpacing: -1.2,
};

const pipelineImageWrap = {
  width: "100%",
  borderRadius: 28,
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.30)",
};

const pipelineImage = {
  display: "block",
  width: "100%",
  height: "auto",
};