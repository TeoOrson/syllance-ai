import React from "react";

export default function LoadingBar({ active, label = "Processing..." }) {
  if (!active) return null;

  return (
    <div style={{ marginTop: 14 }}>
      <div
        style={{
          marginBottom: 8,
          fontSize: 14,
          fontWeight: 800,
          color: "rgba(255,255,255,0.72)",
        }}
      >
        {label}
      </div>

      <div
        style={{
          position: "relative",
          height: 7,
          borderRadius: 999,
          overflow: "hidden",
          background: "rgba(255,255,255,0.10)",
        }}
      >
        <div style={barStyle} />
      </div>

      <style>
        {`
          @keyframes syllanceLoading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(280%); }
          }
        `}
      </style>
    </div>
  );
}

const barStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "38%",
  height: "100%",
  borderRadius: 999,
  background:
    "linear-gradient(90deg, rgba(168,85,247,0.95), rgba(34,211,238,0.95))",
  animation: "syllanceLoading 1.1s ease-in-out infinite",
};