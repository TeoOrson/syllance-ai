import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";

export default function AboutPage() {
  return (
    <div className="mt-4 grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-black">Project overview</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 text-xl leading-relaxed text-foreground/85">
          <p>
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

          <p>
            Syllance.AI is an interactive research tool developed to investigate how variations in AI policy language impact
            student perceptions in the early stages of a course. Syllance.AI is an analytical tool designed to evaluate the
            language of AI-related syllabus policies. Users can input policy text, and the system assesses how the wording
            aligns across key categories such as clarity, strictness, and other linguistic dimensions. The tool then provides
            both quantitative scoring and qualitative explanations, helping users understand how specific language choices
            influence interpretation. In addition to identifying these patterns, Syllance.AI offers insight into which categories
            may be beneficial to emphasize or minimize, supporting more intentional and effective policy design.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-black">Research motivation</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 text-xl leading-relaxed text-foreground/85">
          <p>
            Before students ever interact with an instructor, they begin forming impressions based on how course expectations
            are communicated, often through the syllabus alone. With the rapid integration of generative AI tools into academic
            environments, instructors have introduced policy language to define acceptable use, but the way these policies are
            written plays a critical role in how they are interpreted. Subtle differences in tone, clarity, strictness, and
            other linguistic features can influence whether students feel supported, monitored, or uncertain, ultimately
            shaping early trust and engagement.
          </p>

          <p>
            Syllance.AI is motivated by the need to better understand and make visible how these language choices impact perception.
            Rather than treating policy writing as neutral or purely informational, this work recognizes that communication involves
            trade-offs between competing goals such as clarity, politeness, and authority. By analyzing and explaining these
            interactions, Syllance.AI helps users see how small changes in wording can shift interpretation, allowing for more
            intentional, transparent, and effective policy design.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
