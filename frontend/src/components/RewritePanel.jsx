import React from "react";

export default function RewritePanel({ rewrite, onRewrite, isRewriting }) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          onClick={() => onRewrite("autonomy")}
          disabled={isRewriting}
          style={buttonStyle}
        >
          {isRewriting ? "Optimizing..." : "Optimize Autonomy Rewrite"}
        </button>

        <button
          onClick={() => onRewrite("enforcement")}
          disabled={isRewriting}
          style={buttonStyle}
        >
          {isRewriting ? "Optimizing..." : "Optimize Enforcement Rewrite"}
        </button>
      </div>

      <textarea
        readOnly
        value={rewrite}
        placeholder="Best rewrite will appear here."
        style={{
          width: "100%",
          minHeight: 180,
          resize: "vertical",
          background: "rgba(255,255,255,0.04)",
          color: "rgba(255,255,255,0.92)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: 14,
          padding: 12,
          lineHeight: 1.55,
        }}
      />
    </div>
  );
}

const buttonStyle = {
  padding: "8px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.06)",
  color: "white",
  fontWeight: 900,
  cursor: "pointer",
};