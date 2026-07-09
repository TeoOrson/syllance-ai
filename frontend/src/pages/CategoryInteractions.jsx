import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Slider } from "../components/ui/slider";

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
    <main className="grid gap-8 py-11">
      <section className="max-w-[1200px]">
        <div className="w-fit rounded-full border border-brand-cyan/20 bg-brand-cyan/10 px-3 py-2 text-xs font-black tracking-wide text-brand-cyan uppercase">
          Research lens
        </div>
        <h1
          className="my-3 font-black"
          style={{ fontSize: "clamp(58px, 7vw, 104px)", lineHeight: 0.95, letterSpacing: "-3px" }}
        >
          How Categories Interact
        </h1>
        <p className="m-0 max-w-[1120px] text-xl leading-relaxed text-foreground/70">
          Language is not optimized for a single goal. When writing policies or
          instructions, improving one quality such as clarity, politeness, or
          authority can affect others.
        </p>
      </section>

      <section className="grid grid-cols-[64px_1fr] gap-5 rounded-[30px] border border-border bg-gradient-to-br from-brand-purple/10 to-brand-cyan/[0.055] p-7">
        <div className="bg-brand-gradient grid size-[52px] place-items-center rounded-full text-2xl font-black text-white">
          i
        </div>
        <div>
          <h2 className="m-0 text-2xl font-black">Language is not optimized for a single goal.</h2>
          <p className="mt-2.5 max-w-[1180px] text-lg leading-relaxed text-foreground/75">
            Research in communication and linguistics shows that people balance
            competing goals like clarity, politeness, and authority when choosing
            how to phrase something. Syllance.AI models language as a system of
            interacting categories where improving one dimension may introduce
            trade-offs in others.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 items-stretch gap-6 rounded-[30px] border border-border bg-card p-7 lg:grid-cols-[0.9fr_0.9fr_1.05fr]">
        <div className="grid content-start">
          <h2 className="m-0 text-4xl font-black tracking-[-0.9px]">See a Trade-Off in Action</h2>
          <p className="mt-2.5 mb-5 text-base leading-relaxed text-foreground/70">
            Adjust one category and see how it may affect others.
          </p>

          <label className="mb-2 block text-sm font-bold text-foreground/70">
            Increase focus on:
          </label>
          <Select value={focus} onValueChange={setFocus}>
            <SelectTrigger className="w-full font-bold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Clarity">Clarity</SelectItem>
              <SelectItem value="Politeness">Politeness</SelectItem>
              <SelectItem value="Strictness">Strictness</SelectItem>
              <SelectItem value="Formality">Formality</SelectItem>
            </SelectContent>
          </Select>

          <Slider
            className="mt-6"
            min={1}
            max={3}
            step={0.01}
            value={[level]}
            onValueChange={([v]) => setLevel(v)}
          />

          <div className="mt-2 flex justify-between text-xs text-foreground/60">
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>

          <div className="mt-[18px] w-fit rounded-full border border-border bg-white/[0.045] px-3 py-2 text-xs text-foreground/70">
            Current emphasis: <strong>{levelKey}</strong>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-white/4 p-[22px]">
          <div className="mb-3.5 text-base font-black">Potential impact on other categories</div>
          {active.impacts[levelKey].map(([cat, impact]) => (
            <div
              key={cat}
              className="flex justify-between gap-4 border-b border-border py-3 text-base last:border-b-0"
            >
              <strong>{cat}</strong>
              <span>{impact}</span>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-border bg-gradient-to-br from-brand-purple/[0.18] to-brand-cyan/8 p-6">
          <div className="mb-3 text-2xl font-black">✦ Insight</div>
          <p className="m-0 text-lg leading-relaxed text-foreground/85">{insight}</p>
        </div>
      </section>

      <section>
        <h2 className="m-0 text-4xl font-black tracking-[-0.9px]">Common Trade-Offs</h2>
        <div className="mt-[18px] grid grid-cols-1 gap-4 md:grid-cols-2">
          {COMMON_TRADEOFFS.map((card) => (
            <Card key={card.title} className="rounded-3xl">
              <CardContent>
                <h3 className="m-0 text-2xl font-black">{card.title}</h3>
                <p className="mt-3 mb-4.5 text-lg leading-relaxed text-foreground/70">{card.desc}</p>

                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3.5">
                  <div className="grid min-h-[122px] content-center gap-3 rounded-xl border border-border bg-white/[0.055] p-[18px] text-lg leading-snug">
                    <div>{card.left}</div>
                    <small className="text-foreground/60">{card.leftLabel}</small>
                  </div>

                  <div className="text-3xl font-black text-brand-cyan/80">↔</div>

                  <div className="grid min-h-[122px] content-center gap-3 rounded-xl border border-border bg-white/[0.055] p-[18px] text-lg leading-snug">
                    <div>{card.right}</div>
                    <small className="text-foreground/60">{card.rightLabel}</small>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-[30px] border border-border bg-white/[0.035] p-7">
        <h2 className="m-0 text-4xl font-black tracking-[-0.9px]">References</h2>
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
    <div className="mt-[18px] grid grid-cols-[42px_1fr] items-start gap-3.5">
      <div className="grid size-[34px] place-items-center rounded-[10px] bg-brand-purple/15">▣</div>
      <div>
        <div className="text-lg font-black">{title}</div>
        <div className="mt-1 text-base leading-snug text-foreground/65">{desc}</div>
      </div>
    </div>
  );
}
