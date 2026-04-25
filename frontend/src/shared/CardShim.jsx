import React from "react";

export default function Card({ title, right, children }) {
  return (
    <div
      style={{
        borderRadius: 18,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.30)",
        padding: 16,
      }}
    >
      {(title || right) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 10,
          }}
        >
          <div style={{ fontWeight: 900, fontSize: 14, color: "rgba(255,255,255,0.92)" }}>
            {title}
          </div>
          <div>{right}</div>
        </div>
      )}
      {children}
    </div>
  );
}