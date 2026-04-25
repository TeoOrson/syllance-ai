import React from "react";
import { CATEGORIES } from "../data/categories";

export default function KeywordExplanationPanel({ keywordsByCategory }) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div
        style={{
          fontSize: 13,
          lineHeight: 1.6,
          color: "rgba(255,255,255,0.78)",
        }}
      >
        Keywords are short phrases pulled from the extracted AI policy. They are
        used as evidence signals for why the model associated parts of the
        policy with a category. They should appear directly in the policy text.
      </div>

      {CATEGORIES.map((category) => {
        const phrases = keywordsByCategory?.[category] || [];

        return (
          <div
            key={category}
            style={{
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(255,255,255,0.03)",
              padding: 12,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 900,
                color: "rgba(255,255,255,0.92)",
                marginBottom: 8,
              }}
            >
              {category}
            </div>

            {phrases.length === 0 ? (
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>
                No evidence phrases found for this category.
              </div>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {phrases.map((phrase, index) => (
                  <span
                    key={`${category}-${index}`}
                    style={{
                      fontSize: 12,
                      borderRadius: 999,
                      padding: "6px 9px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      color: "rgba(255,255,255,0.88)",
                    }}
                  >
                    {phrase}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}