import React from "react";
import { CATEGORIES } from "../data/categories";

export default function KeywordPanel({
  keywordsByCategory,
  selectedKeyword,
  setSelectedKeyword,
}) {
  return (
    <div className="grid gap-2.5">
      {CATEGORIES.map((category) => {
        const phrases = keywordsByCategory?.[category] || [];

        return (
          <div key={category} className="rounded-lg border border-border bg-card p-3">
            <div className="mb-2 flex items-center justify-between gap-2.5">
              <div className="text-[13px] font-black text-foreground/92">{category}</div>
              <div className="text-xs text-foreground/60">{phrases.length}</div>
            </div>

            <div className="flex flex-wrap gap-2">
              {phrases.length === 0 ? (
                <span className="text-xs text-foreground/55">No phrases</span>
              ) : (
                phrases.map((phrase, index) => {
                  const isActive = selectedKeyword === phrase;

                  return (
                    <button
                      key={`${category}-${index}`}
                      onClick={() => setSelectedKeyword(phrase)}
                      title="Click to highlight in extracted policy"
                      className={
                        "cursor-pointer rounded-full border border-border px-2.5 py-1.5 text-xs text-foreground/92 transition-all " +
                        (isActive ? "bg-brand-cyan/18" : "bg-white/5")
                      }
                    >
                      {phrase}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
