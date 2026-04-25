import React from "react";
import Card from "../shared/CardShim";
import { CATEGORY_ANCHORS } from "../data/categories";

const CATEGORY_DESCRIPTIONS = {
  Formality:
    "Measures how conversational or administrative the policy sounds.",
  Politeness:
    "Measures whether the language feels face-threatening, directive, or face-preserving.",
  Affect:
    "Measures whether the policy discourages, neutralizes, or supports student confidence and learning.",
  Strictness:
    "Measures how flexible or restrictive the policy is in terms of permissions and consequences.",
  Clarity:
    "Measures how explicitly the policy explains allowed, disallowed, and expected behavior.",
  
  Contestability:
    "Measures how much room the policy gives for interpretation, discretion, or discussion.",
};

const PIPELINE_STEPS = [
  {
    title: "Upload or paste syllabus",
    text: "The user provides full syllabus text or an extracted course policy.",
  },
  {
    title: "Extract AI policy section",
    text: "The backend isolates the generative AI policy language from the larger syllabus.",
  },
  {
    title: "Score across 6 categories",
    text: "The extracted policy is evaluated using a 1–5 perception matrix grounded in the project rubric.",
  },
  {
    title: "Show phrases and profile",
    text: "The interface displays category scores, a radar chart, and grounded language cues from the policy.",
  },
  {
    title: "Generate rewrite",
    text: "The user can request an alternative rewrite optimized for autonomy-support or enforceability.",
  },
];

export default function AboutPage() {
  return (
    <div style={{ marginTop: 16, display: "grid", gap: 16 }}>
      <Card title="Project overview">
        <div
          style={{
            color: "rgba(255,255,255,0.86)",
            fontSize: 20,
            lineHeight: 1.85,
          }}
        >
          <p style={{ marginTop: 0 }}>
            <strong>Syllance.AI</strong> Before a student ever speaks to their professor, they have already formed an 
            impression which is often based solely on the course syllabus. With the rapid integration of generative AI tools 
            such as ChatGPT, Gemini, Claude, etc. into academic environments, this has prompted instructors to create course-level 
            policies to address the use. 
            Although the policies are designed to create and promote academic integrity as well as a responsible engagement with AI,
             the way they are written (particularly their tone, clarity, restrictiveness, politeness, affect and formality) 
             significantly shape how students interpret expectations and perceive their instructors before any direct interaction 
             occurs. Subtle experiences in language can influence whether a student feels supported, monitored, or uncertain, 
             ultimately affecting early trust formation and their willingness to engage. 

          </p>

          <p style={{ marginBottom: 0 }}>
            Syllance.AI is an interactive research tool developed to investigate how variations in AI policy language impact 
            student perceptions in the early stages of a course. Syllance.AI is an analytical tool designed to evaluate the 
            language of AI-related syllabus policies. Users can input policy text, and the system assesses how the wording 
            aligns across key categories such as clarity, strictness, and other linguistic dimensions. The tool then provides 
            both quantitative scoring and qualitative explanations, helping users understand how specific language choices 
            influence interpretation. In addition to identifying these patterns, Syllance.AI offers insight into which categories
             may be beneficial to emphasize or minimize, supporting more intentional and effective policy design.
          </p>
        </div>
      </Card>

      <Card title="Research motivation">
        <div
          style={{
            color: "rgba(255,255,255,0.84)",
            fontSize: 20,
            lineHeight: 1.85,
          }}
        >
          <p style={{ marginTop: 0 }}>
            Before students ever interact with an instructor, they begin forming impressions based on how course expectations
             are communicated, often through the syllabus alone. With the rapid integration of generative AI tools into academic
              environments, instructors have introduced policy language to define acceptable use, but the way these policies are
               written plays a critical role in how they are interpreted. Subtle differences in tone, clarity, strictness, and
                other linguistic features can influence whether students feel supported, monitored, or uncertain, ultimately 
                shaping early trust and engagement.

          </p>

          <p style={{ marginBottom: 0 }}>
            Syllance.AI is motivated by the need to better understand and make visible how these language choices impact perception.
             Rather than treating policy writing as neutral or purely informational, this work recognizes that communication involves
              trade-offs between competing goals such as clarity, politeness, and authority. By analyzing and explaining these 
              interactions, Syllance.AI helps users see how small changes in wording can shift interpretation, allowing for more 
              intentional, transparent, and effective policy design.
          </p>
        </div>
      </Card>
    </div>
  );
}