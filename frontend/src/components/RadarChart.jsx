import React, { useMemo, useState } from "react";
import { CATEGORIES, CATEGORY_TARGETS } from "../data/categories";
import { getScoreComparison, getInterpretation } from "../utils/scoreUtils";
import { getReliability, TIER_META } from "../data/reliability";

function reliabilityDots(tier) {
  const meta = TIER_META[tier];
  if (!meta) return "";
  return "●".repeat(meta.dots) + "○".repeat(3 - meta.dots);
}

function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n));
}

export default function RadarChart({ scores, size = 820, max = 5 }) {
  const [hovered, setHovered] = useState(null);

  const margin = 120;
  const svgSize = size + margin * 2;
  const padding = 58;
  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const radius = size / 2 - padding;

  const points = useMemo(() => {
    const step = (Math.PI * 2) / CATEGORIES.length;

    return CATEGORIES.map((category, i) => {
      const raw = scores?.[category] ?? 3;
      const value = clamp(raw, 1, max);
      const r = (value / max) * radius;
      const a = -Math.PI / 2 + i * step;

      return {
        category,
        value,
        x: cx + r * Math.cos(a),
        y: cy + r * Math.sin(a),
        ax: cx + (radius + 72) * Math.cos(a),
        ay: cy + (radius + 72) * Math.sin(a),
      };
    });
  }, [scores, cx, cy, radius, max]);

  const polygon = points.map((p) => `${p.x},${p.y}`).join(" ");
  const step = (Math.PI * 2) / CATEGORIES.length;

  function getStatusColor(status) {
    if (status === "above") return "#f87171";
    if (status === "below") return "#fbbf24";
    return "#34d399";
  }

  function getStatusLabel(status) {
    if (status === "above") return "Above target";
    if (status === "below") return "Below target";
    return "On target";
  }

  return (
    <div style={{ position: "relative", display: "flex", justifyContent: "center", width: "100%" }}>
      <div
        style={{
          position: "absolute",
          width: size * 0.95,
          height: size * 0.95,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.22), rgba(168,85,247,0.13), transparent 70%)",
          filter: "blur(36px)",
          opacity: hovered ? 1 : 0.85,
          pointerEvents: "none",
        }}
      />

      <svg width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`} style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(168,85,247,0.82)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0.72)" />
          </linearGradient>

          <filter id="softGlow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {[1, 2, 3, 4, 5].map((level) => {
          const r = (level / max) * radius;
          const ringPts = CATEGORIES.map((_, i) => {
            const a = -Math.PI / 2 + i * step;
            return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
          }).join(" ");

          return (
            <polygon
              key={level}
              points={ringPts}
              fill="none"
              stroke="rgba(255,255,255,0.13)"
              strokeWidth="1.4"
            />
          );
        })}

        {CATEGORIES.map((_, i) => {
          const a = -Math.PI / 2 + i * step;
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={cx + radius * Math.cos(a)}
              y2={cy + radius * Math.sin(a)}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1.3"
            />
          );
        })}

        <polygon
          points={polygon}
          fill="url(#radarFill)"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="2"
          filter="url(#softGlow)"
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            animation: "radarPop 750ms ease-out both",
          }}
        />

        {points.map((p) => (
          <circle
            key={p.category}
            cx={p.x}
            cy={p.y}
            r={hovered === p.category ? 8 : 5.5}
            fill={hovered === p.category ? "rgba(34,211,238,1)" : "rgba(255,255,255,0.95)"}
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="2"
            onMouseEnter={() => setHovered(p.category)}
            onMouseLeave={() => setHovered(null)}
            style={{
              cursor: "pointer",
              transition: "all 0.2s ease",
              filter:
                hovered === p.category
                  ? "drop-shadow(0 0 14px rgba(34,211,238,0.9))"
                  : "drop-shadow(0 0 5px rgba(255,255,255,0.35))",
            }}
          />
        ))}

        {points.map((p) => {
          const score = scores?.[p.category] ?? null;
          const comp = getScoreComparison(p.category, score);
          const interpretation = getInterpretation(p.category, comp?.status);
          const isHovered = hovered === p.category;
          const statusColor = getStatusColor(comp?.status);

          const tooltipX =
            p.ax < cx ? p.ax - 250 : p.ax > cx ? p.ax + 20 : p.ax - 110;

          const tooltipY = p.ay < cy ? p.ay - 90 : p.ay + 24;
          const reliability = getReliability(p.category);
          const tierMeta = reliability ? TIER_META[reliability.tier] : null;
          const textAnchorValue = p.ax < cx - 8 ? "end" : p.ax > cx + 8 ? "start" : "middle";

          return (
            <g
              key={`${p.category}-label`}
              onMouseEnter={() => setHovered(p.category)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              <text
                x={p.ax}
                y={p.ay}
                fill={isHovered ? "white" : "rgba(255,255,255,0.95)"}
                fontSize={isHovered ? "36" : "32"}
                fontWeight="1000"
                textAnchor={textAnchorValue}
                dominantBaseline="middle"
                style={{
                  letterSpacing: "-0.03em",
                  textShadow: isHovered
                    ? `0 0 18px ${statusColor}, 0 0 28px rgba(255,255,255,0.35)`
                    : "0 0 14px rgba(255,255,255,0.32)",
                  transition: "all 0.2s ease",
                }}
              >
                {p.category}
              </text>

              {tierMeta && (
                <text
                  x={p.ax}
                  y={p.ay + (isHovered ? 30 : 27)}
                  fill={tierMeta.color}
                  fontSize={isHovered ? "15" : "13"}
                  textAnchor={textAnchorValue}
                  dominantBaseline="middle"
                  style={{ letterSpacing: "2px", transition: "all 0.2s ease" }}
                >
                  {reliabilityDots(reliability.tier)}
                </text>
              )}

              {isHovered && (
                <foreignObject x={tooltipX} y={tooltipY} width="230" height="190">
                  <div
                    style={{
                      boxSizing: "border-box",
                      width: "230px",
                      padding: "13px 14px",
                      borderRadius: 16,
                      border: "1px solid rgba(255,255,255,0.14)",
                      background: "rgba(13,15,22,0.92)",
                      backdropFilter: "blur(14px)",
                      boxShadow: `0 18px 45px rgba(0,0,0,0.35), 0 0 22px ${statusColor}44`,
                      color: "white",
                      fontFamily: "inherit",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                      <div style={{ fontSize: 15, fontWeight: 950 }}>{p.category}</div>
                      <div style={{ fontSize: 15, fontWeight: 950 }}>
                        {typeof score === "number" ? score.toFixed(1) : "_"} / {max}
                      </div>
                    </div>

                    <div style={{ marginTop: 6, fontSize: 15, color: "rgba(255,255,255,0.68)" }}>
                      Target: {CATEGORY_TARGETS[p.category]}
                    </div>

                    {comp && (
                      <div
                        style={{
                          marginTop: 7,
                          fontSize: 12,
                          fontWeight: 900,
                          color: statusColor,
                        }}
                      >
                        {getStatusLabel(comp.status)}
                      </div>
                    )}

                    {interpretation && (
                      <div
                        style={{
                          marginTop: 7,
                          fontSize: 11,
                          lineHeight: 1.45,
                          color: "rgba(255,255,255,0.78)",
                        }}
                      >
                        {interpretation}
                      </div>
                    )}

                    {tierMeta && (
                      <div
                        style={{
                          marginTop: 8,
                          paddingTop: 8,
                          borderTop: "1px solid rgba(255,255,255,0.12)",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 900,
                            color: tierMeta.color,
                            letterSpacing: "0.5px",
                          }}
                        >
                          {reliabilityDots(reliability.tier)} {tierMeta.label}
                        </div>
                      </div>
                    )}
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}

        <style>
          {`
            @keyframes radarPop {
              0% {
                transform: scale(0.72);
                opacity: 0;
              }
              65% {
                transform: scale(1.04);
                opacity: 1;
              }
              100% {
                transform: scale(1);
                opacity: 1;
              }
            }
          `}
        </style>
      </svg>
    </div>
  );
}