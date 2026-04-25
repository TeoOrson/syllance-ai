import React, { useState } from "react";

const OPTIONS = {
  Politeness: {
    insightLow:
      "A small increase in politeness can soften tone without strongly changing the rest of the policy.",
    insightMedium:
      "Making your language more polite can improve tone and reduce harshness, but it may also make your message less direct.",
    insightHigh:
      "A strong focus on politeness can make the policy feel supportive, but it may reduce directness, strictness, and clarity.",
    impacts: {
      low: [
        ["Clarity", "↔ Mostly stable"],
        ["Strictness", "↓ May decrease slightly"],
        ["Affect", "↑ May improve slightly"],
        ["Contestability", "↑ May increase slightly"],
      ],
      medium: [
        ["Clarity", "↓ May decrease slightly"],
        ["Strictness", "↓ May decrease"],
        ["Affect", "↑ May improve"],
        ["Contestability", "↑ May increase slightly"],
      ],
      high: [
        ["Clarity", "↓ May decrease"],
        ["Strictness", "↓ May decrease strongly"],
        ["Affect", "↑ May improve strongly"],
        ["Contestability", "↑ May increase"],
      ],
    },
  },

  Strictness: {
    insightLow:
      "A small increase in strictness can make expectations firmer without making the policy feel punitive.",
    insightMedium:
      "Increasing strictness can improve clarity and enforceability, but may reduce flexibility and perceived fairness.",
    insightHigh:
      "A strong focus on strictness can make rules very enforceable, but it can also make the policy feel rigid or intimidating.",
    impacts: {
      low: [
        ["Clarity", "↑ May improve slightly"],
        ["Contestability", "↓ May decrease slightly"],
        ["Politeness", "↔ Mostly stable"],
        ["Affect", "↓ May feel slightly colder"],
      ],
      medium: [
        ["Clarity", "↑ May improve"],
        ["Contestability", "↓ May decrease"],
        ["Politeness", "↓ May decrease"],
        ["Affect", "↓ May become cautionary"],
      ],
      high: [
        ["Clarity", "↑ May improve strongly"],
        ["Contestability", "↓ May decrease strongly"],
        ["Politeness", "↓ May decrease strongly"],
        ["Affect", "↓ May feel punitive"],
      ],
    },
  },

  Clarity: {
    insightLow:
      "A small clarity improvement can make the policy easier to understand without changing tone much.",
    insightMedium:
      "Improving clarity makes expectations more explicit, but may reduce politeness if language becomes more direct.",
    insightHigh:
      "A strong focus on clarity can make rules very explicit, but it may make the policy feel blunt or less flexible.",
    impacts: {
      low: [
        ["Politeness", "↔ Mostly stable"],
        ["Strictness", "↑ May improve slightly"],
        ["Contestability", "↔ Mostly stable"],
        ["Affect", "↔ Mostly stable"],
      ],
      medium: [
        ["Politeness", "↓ May decrease slightly"],
        ["Strictness", "↑ May improve"],
        ["Contestability", "↓ May narrow interpretation"],
        ["Affect", "↔ Usually stable"],
      ],
      high: [
        ["Politeness", "↓ May decrease"],
        ["Strictness", "↑ May improve strongly"],
        ["Contestability", "↓ May decrease"],
        ["Affect", "↓ May feel more directive"],
      ],
    },
  },

  Formality: {
    insightLow:
      "A small increase in formality can make language feel more professional without hurting readability.",
    insightMedium:
      "Increasing formality can make language sound more professional, but may reduce readability and clarity.",
    insightHigh:
      "A strong focus on formality can make a policy feel institutional or bureaucratic, which may reduce clarity and warmth.",
    impacts: {
      low: [
        ["Clarity", "↔ Mostly stable"],
        ["Politeness", "↔ Depends on wording"],
        ["Strictness", "↑ May feel slightly stronger"],
        ["Affect", "↔ Mostly stable"],
      ],
      medium: [
        ["Clarity", "↓ May decrease slightly"],
        ["Politeness", "↔ Depends on wording"],
        ["Strictness", "↑ May feel stronger"],
        ["Affect", "↓ May feel colder"],
      ],
      high: [
        ["Clarity", "↓ May decrease"],
        ["Politeness", "↓ May feel less personal"],
        ["Strictness", "↑ May feel much stronger"],
        ["Affect", "↓ May feel distant"],
      ],
    },
  },
};

const COMMON_TRADEOFFS = [
  {
    title: "Clarity ↔ Politeness",
    desc: "More direct language improves clarity but can feel less polite. More polite language often uses indirect phrasing, which may reduce clarity.",
    left: "Submit by Friday.",
    leftLabel: "High clarity · Lower politeness",
    right: "It would be great if you could submit by Friday.",
    rightLabel: "Higher politeness · Lower clarity",
  },
  {
    title: "Strictness ↔ Contestability",
    desc: "Stronger, more rigid rules reduce ambiguity and increase enforceability but leave less room for interpretation or appeal.",
    left: "Any violation will result in failure.",
    leftLabel: "High strictness · Low contestability",
    right: "Violations may be reviewed on a case-by-case basis.",
    rightLabel: "Lower strictness · Higher contestability",
  },
  {
    title: "Formality ↔ Clarity",
    desc: "Highly formal language often includes passive voice and complex structures, which can reduce readability and clarity.",
    left: "Utilization of unauthorized tools is prohibited.",
    leftLabel: "High formality · Lower clarity",
    right: "You cannot use unauthorized tools.",
    rightLabel: "Lower formality · Higher clarity",
  },
  {
    title: "Strictness ↔ Politeness",
    desc: "Strong directives like “must” and “required” signal authority and increase compliance but may reduce perceived politeness.",
    left: "You must attend the orientation.",
    leftLabel: "High strictness · Lower politeness",
    right: "We encourage you to attend the orientation.",
    rightLabel: "Lower strictness · Higher politeness",
  },
];

export default function CategoryInteractions() {
  const [focus, setFocus] = useState("Politeness");
  const [level, setLevel] = useState(2);

  const levelKey = level === 1 ? "low" : level === 2 ? "medium" : "high";
  const active = OPTIONS[focus];

  const insight =
    level === 1
      ? active.insightLow
      : level === 2
      ? active.insightMedium
      : active.insightHigh;

  return (
    <main style={page}>
      <section style={hero}>
        <div style={badge}>Research lens</div>
        <h1 style={title}>How Categories Interact</h1>
        <p style={subtitle}>
          Language is not optimized for a single goal. When writing policies or
          instructions, improving one quality such as clarity, politeness, or
          authority can affect others.
        </p>
      </section>

      <section style={overviewBox}>
        <div style={infoIcon}>i</div>
        <div>
          <h2 style={overviewTitle}>Language is not optimized for a single goal.</h2>
          <p style={overviewText}>
            Research in communication and linguistics shows that people balance
            competing goals like clarity, politeness, and authority when choosing
            how to phrase something. Syllance.AI models language as a system of
            interacting categories where improving one dimension may introduce
            trade-offs in others.
          </p>
        </div>
      </section>

      <section className="tradeoff-box" style={tradeoffBox}>
        <div style={controlPanel}>
          <h2 style={sectionTitle}>See a Trade-Off in Action</h2>
          <p style={body}>Adjust one category and see how it may affect others.</p>

          <label style={label}>Increase focus on:</label>
          <select
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
            style={select}
          >
            <option>Clarity</option>
            <option>Politeness</option>
            <option>Strictness</option>
            <option>Formality</option>
          </select>

          <input
            type="range"
            min="1"
            max="3"
            step="0.01"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            style={slider}
          />

          <div style={sliderLabels}>
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>

          <div style={focusPill}>
            Current emphasis: <strong>{levelKey}</strong>
          </div>
        </div>

        <div style={impactPanel}>
          <div style={panelTitle}>Potential impact on other categories</div>
          {active.impacts[levelKey].map(([cat, impact]) => (
            <div key={cat} style={impactRow}>
              <strong>{cat}</strong>
              <span>{impact}</span>
            </div>
          ))}
        </div>

        <div style={insightBox}>
          <div style={insightTitle}>✦ Insight</div>
          <p style={insightText}>{insight}</p>
        </div>
      </section>

      <section>
        <h2 style={sectionTitle}>Common Trade-Offs</h2>
        <div className="tradeoff-grid" style={grid}>
          {COMMON_TRADEOFFS.map((card) => (
            <div key={card.title} style={cardStyle}>
              <h3 style={cardTitle}>{card.title}</h3>
              <p style={cardText}>{card.desc}</p>

              <div style={exampleRow}>
                <div style={exampleBox}>
                  <div>{card.left}</div>
                  <small>{card.leftLabel}</small>
                </div>

                <div style={swap}>↔</div>

                <div style={exampleBox}>
                  <div>{card.right}</div>
                  <small>{card.rightLabel}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={references}>
        <h2 style={sectionTitle}>References</h2>
        <Ref
          title="Brown, P., & Levinson, S. (1987). Politeness: Some Universals in Language Usage. Cambridge University Press."
          desc="Foundational work on how speakers use language to maintain politeness, often through indirect strategies."
        />
        <Ref
          title="Conversational Constraints Theory"
          desc="Explains how speakers balance clarity and minimizing imposition, leading to trade-offs in communication."
        />
        <Ref
          title="Plain Language Action and Information Network (PLAIN)"
          desc="Research on how plain language improves comprehension and reduces complexity."
        />
      </section>
    </main>
  );
}

function Ref({ title, desc }) {
  return (
    <div style={refItem}>
      <div style={refIcon}>▣</div>
      <div>
        <div style={refTitle}>{title}</div>
        <div style={refDesc}>{desc}</div>
      </div>
    </div>
  );
}

const page = {
  display: "grid",
  gap: 34,
  padding: "44px 0 80px",
};

const hero = {
  maxWidth: 1200,
};

const badge = {
  width: "fit-content",
  padding: "8px 12px",
  borderRadius: 999,
  background: "rgba(34,211,238,0.10)",
  border: "1px solid rgba(34,211,238,0.20)",
  color: "rgba(34,211,238,0.92)",
  fontSize: 13,
  fontWeight: 950,
  textTransform: "uppercase",
  letterSpacing: 1,
};

const title = {
  margin: "18px 0 12px",
  fontSize: "clamp(58px, 7vw, 104px)",
  lineHeight: 0.95,
  letterSpacing: -3,
  fontWeight: 1000,
};

const subtitle = {
  margin: 0,
  maxWidth: 1120,
  fontSize: 23,
  lineHeight: 1.6,
  color: "rgba(255,255,255,0.72)",
};

const overviewBox = {
  display: "grid",
  gridTemplateColumns: "64px 1fr",
  gap: 22,
  padding: 30,
  borderRadius: 30,
  border: "1px solid rgba(255,255,255,0.10)",
  background:
    "linear-gradient(135deg, rgba(168,85,247,0.10), rgba(34,211,238,0.055)), rgba(255,255,255,0.035)",
};

const infoIcon = {
  width: 52,
  height: 52,
  borderRadius: 999,
  display: "grid",
  placeItems: "center",
  background:
    "linear-gradient(135deg, rgba(168,85,247,0.95), rgba(34,211,238,0.82))",
  fontSize: 28,
  fontWeight: 950,
};

const overviewTitle = {
  margin: 0,
  fontSize: 28,
  fontWeight: 950,
};

const overviewText = {
  margin: "10px 0 0",
  maxWidth: 1180,
  fontSize: 18,
  lineHeight: 1.75,
  color: "rgba(255,255,255,0.75)",
};

const tradeoffBox = {
  display: "grid",
  gridTemplateColumns: "0.9fr 0.9fr 1.05fr",
  gap: 24,
  alignItems: "stretch",
  padding: 30,
  borderRadius: 30,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.035)",
};

const controlPanel = {
  display: "grid",
  alignContent: "start",
};

const sectionTitle = {
  margin: 0,
  fontSize: 36,
  letterSpacing: -0.9,
  fontWeight: 1000,
};

const body = {
  margin: "10px 0 20px",
  fontSize: 17,
  lineHeight: 1.6,
  color: "rgba(255,255,255,0.70)",
};

const label = {
  display: "block",
  marginBottom: 8,
  fontSize: 14,
  fontWeight: 900,
  color: "rgba(255,255,255,0.72)",
};

const select = {
  width: "100%",
  padding: "13px 14px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.06)",
  color: "white",
  fontWeight: 900,
};

const slider = {
  width: "100%",
  marginTop: 24,
  accentColor: "#8b5cf6",
};

const sliderLabels = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 8,
  fontSize: 13,
  color: "rgba(255,255,255,0.58)",
};

const focusPill = {
  marginTop: 18,
  width: "fit-content",
  padding: "8px 11px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.045)",
  fontSize: 13,
  color: "rgba(255,255,255,0.72)",
};

const impactPanel = {
  padding: 22,
  borderRadius: 24,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const panelTitle = {
  marginBottom: 14,
  fontSize: 17,
  fontWeight: 950,
};

const impactRow = {
  display: "flex",
  justifyContent: "space-between",
  gap: 18,
  padding: "12px 0",
  borderBottom: "1px solid rgba(255,255,255,0.07)",
  fontSize: 17,
};

const insightBox = {
  padding: 26,
  borderRadius: 26,
  background:
    "linear-gradient(135deg, rgba(168,85,247,0.18), rgba(34,211,238,0.08))",
  border: "1px solid rgba(255,255,255,0.10)",
};

const insightTitle = {
  fontSize: 24,
  fontWeight: 1000,
  marginBottom: 12,
};

const insightText = {
  margin: 0,
  fontSize: 19,
  lineHeight: 1.7,
  color: "rgba(255,255,255,0.84)",
};

const grid = {
  marginTop: 18,
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 18,
};

const cardStyle = {
  padding: 26,
  borderRadius: 26,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.035)",
};

const cardTitle = {
  margin: 0,
  fontSize: 25,
  fontWeight: 1000,
};

const cardText = {
  margin: "12px 0 18px",
  fontSize: 18,
  lineHeight: 1.65,
  color: "rgba(255,255,255,0.72)",
};

const exampleRow = {
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",
  gap: 14,
  alignItems: "center",
};

const exampleBox = {
  minHeight: 122,
  display: "grid",
  alignContent: "center",
  gap: 12,
  padding: 18,
  borderRadius: 20,
  background: "rgba(255,255,255,0.055)",
  border: "1px solid rgba(255,255,255,0.10)",
  fontSize: 18,
  lineHeight: 1.35,
};

const swap = {
  fontSize: 30,
  fontWeight: 1000,
  color: "rgba(34,211,238,0.80)",
};

const references = {
  padding: 30,
  borderRadius: 30,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.035)",
};

const refItem = {
  marginTop: 18,
  display: "grid",
  gridTemplateColumns: "42px 1fr",
  gap: 14,
  alignItems: "start",
};

const refIcon = {
  width: 34,
  height: 34,
  borderRadius: 10,
  display: "grid",
  placeItems: "center",
  background: "rgba(168,85,247,0.16)",
};

const refTitle = {
  fontSize: 18,
  fontWeight: 950,
};

const refDesc = {
  marginTop: 4,
  fontSize: 16,
  lineHeight: 1.55,
  color: "rgba(255,255,255,0.66)",
};