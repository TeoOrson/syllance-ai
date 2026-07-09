import React from "react";
import { CATEGORIES } from "../data/categories";
import { Badge } from "./ui/badge";

export default function KeywordExplanationPanel({ keywordsByCategory }) {
  return (
    <div className="grid gap-3">
      <div className="text-[13px] leading-relaxed text-foreground/78">
        Keywords are short phrases pulled from the extracted AI policy. They are
        used as evidence signals for why the model associated parts of the
        policy with a category. They should appear directly in the policy text.
      </div>

      {CATEGORIES.map((category) => {
        const phrases = keywordsByCategory?.[category] || [];

        return (
          <div key={category} className="rounded-lg border border-border bg-card p-3">
            <div className="mb-2 text-[13px] font-black text-foreground/92">{category}</div>

            {phrases.length === 0 ? (
              <div className="text-xs text-foreground/55">
                No evidence phrases found for this category.
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {phrases.map((phrase, index) => (
                  <Badge key={`${category}-${index}`} variant="secondary" className="font-normal">
                    {phrase}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
