import React from "react";
import { CATEGORIES } from "../data/categories";

export default function KeywordPanel({
  keywordsByCategory,
  selectedKeyword,
  setSelectedKeyword,
}) {
  return (
    <div style={{ display: "grid", gap: 10 }}>
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
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 900,
                  color: "rgba(255,255,255,0.92)",
                }}
              >
                {category}
              </div>

              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.60)",
                }}
              >
                {phrases.length}
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {phrases.length === 0 ? (
                <span
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  No phrases
                </span>
              ) : (
                phrases.map((phrase, index) => {
                  const isActive = selectedKeyword === phrase;

                  return (
                    <button
                      key={`${category}-${index}`}
                      onClick={() => setSelectedKeyword(phrase)}
                      style={{
                        border: "1px solid rgba(255,255,255,0.12)",
                        background: isActive
                          ? "rgba(34,211,238,0.18)"
                          : "rgba(255,255,255,0.05)",
                        color: "rgba(255,255,255,0.92)",
                        fontSize: 12,
                        padding: "6px 10px",
                        borderRadius: 999,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                      title="Click to highlight in extracted policy"
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