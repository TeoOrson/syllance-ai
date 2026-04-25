import React, { useState } from "react";
import { APP_NAME } from "../data/categories";
import logo from "../assets/SyllanceTransparentLogo.png"


export default function Header({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);

  function go(key) {
    setPage(key);
    setMenuOpen(false);
    setResearchOpen(false);
  }

  return (
    <header style={headerShell}>
      <div style={headerInner}>
        <div style={brand} onClick={() => go("home")}>
          <img className="header-logo" src={logo} alt="SyllanceAI logo" style={logoImg} />

          <div>
            <div className="header-brand-name" style={brandName}>{APP_NAME}</div>
            <div style={tagline}>AI policy perception analysis</div>
          </div>
        </div>

        <nav className="desktop-nav" style={nav}>
          <button onClick={() => go("home")} style={tab(page === "home")}>
            Home
          </button>

          <button onClick={() => go("analyze")} style={tab(page === "analyze")}>
            Analyze
          </button>

          <div style={{ position: "relative" }}>
            <button
              onClick={() => setResearchOpen(!researchOpen)}
              style={tab(page === "about")}
            >
              Research ▾
            </button>

            {researchOpen && (
              <div style={researchDropdown}>
                <button onClick={() => go("about")} style={dropItem}>
                  <strong>Research overview</strong>
                  <span>Project goal and motivation</span>
                </button>
                <button onClick={() => go("interactions")} style={dropItem}>
                  <strong>How categories interact</strong>
                  <span>Trade-offs between policy dimensions</span>
                </button>
                <button onClick={() => go("about")} style={dropItem}>
                  <strong>Validation approach</strong>
                  <span>Rewrite scoring and model comparison</span>
                </button>
                <button onClick={() => go("about")} style={dropItem}>
                  <strong>Teaching implications</strong>
                  <span>Why policy tone matters</span>
                </button>
              </div>
            )}
          </div>
        </nav>

        <div style={actions}>
          <button className="header-launch" onClick={() => go("analyze")} style={ctaSmall}>
            Launch tool
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              ...hamburger,
              background: menuOpen
                ? "rgba(255,255,255,0.12)"
                : "rgba(255,255,255,0.055)",
            }}
            aria-label="Open menu"
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <div style={mobileDropdown}>
            <button onClick={() => go("home")} style={mobileItem}>
              Home
            </button>
            <button onClick={() => go("analyze")} style={mobileItem}>
              Analyze
            </button>

            <div style={mobileSectionLabel}>Research</div>

            <button onClick={() => go("about")} style={mobileItem}>
              Research overview
            </button>
            <button onClick={() => go("interactions")} style={mobileItem}>
              How categories interact
            </button>
            <button onClick={() => go("about")} style={mobileItem}>
              Validation approach
            </button>
            <button onClick={() => go("about")} style={mobileItem}>
              Teaching implications
            </button>

            <button onClick={() => go("analyze")} style={mobileCta}>
              Analyze now
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

const headerShell = {
  position: "sticky",
  top: 0,
  zIndex: 50,
  width: "100%",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(5,6,10,0.84)",
  backdropFilter: "blur(22px)",
};

const headerInner = {
  width: "100%",
  maxWidth: "100%",
  margin: "0 auto",
  padding: "18px 44px",
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
  gap: 34,
  position: "relative",
};

const brand = {
  display: "flex",
  alignItems: "center",
  gap: 22,
  cursor: "pointer",
  justifySelf: "start",
};

const logoImg = {
  height: 100,
  width: 100,
  objectFit: "contain",
};

const brandName = {
  fontSize: 54,
  fontWeight: 1000,
  letterSpacing: -1.8,
  lineHeight: 0.95,
};

const tagline = {
  marginTop: 9,
  fontSize: 16,
  color: "rgba(255,255,255,0.60)",
};

const nav = {
  justifySelf: "center",
  display: "flex",
  alignItems: "center",
  gap: 14,
  padding: 8,
  borderRadius: 20,
  background: "rgba(255,255,255,0.055)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const tab = (active) => ({
  border: active
    ? "1px solid rgba(147,197,253,0.85)"
    : "1px solid transparent",
  color: active ? "white" : "rgba(255,255,255,0.72)",
  padding: "11px 17px",
  borderRadius: 14,
  fontWeight: 900,
  fontSize: 15,
  cursor: "pointer",
  background: active ? "rgba(255,255,255,0.11)" : "transparent",
  boxShadow: active ? "0 0 0 2px rgba(59,130,246,0.25)" : "none",
  transition: "all 0.18s ease",
})

const actions = {
  justifySelf: "end",
  display: "flex",
  alignItems: "center",
  gap: 16,
};

const ctaSmall = {
  padding: "14px 22px",
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.14)",
  background:
    "linear-gradient(90deg, rgba(168,85,247,0.95), rgba(34,211,238,0.90))",
  color: "white",
  fontWeight: 950,
  fontSize: 17,
  cursor: "pointer",
};

const hamburger = {
  width: 56,
  height: 56,
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,0.14)",
  color: "white",
  fontSize: 27,
  fontWeight: 900,
  cursor: "pointer",
  transition: "all 0.18s ease",
};

const researchDropdown = {
  position: "absolute",
  top: 56,
  left: "50%",
  transform: "translateX(-50%)",
  width: 310,
  display: "grid",
  gap: 8,
  padding: 10,
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(8,10,18,0.98)",
  boxShadow: "0 22px 70px rgba(0,0,0,0.52)",
};

const dropItem = {
  display: "grid",
  gap: 4,
  textAlign: "left",
  padding: "12px 13px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.04)",
  color: "white",
  cursor: "pointer",
};

const mobileDropdown = {
  position: "absolute",
  top: 108,
  right: 44,
  width: 340,
  display: "grid",
  gap: 10,
  padding: 14,
  borderRadius: 22,
  border: "1px solid rgba(255,255,255,0.14)",
  background:
    "linear-gradient(180deg, rgba(18,20,32,0.99), rgba(8,10,18,0.99))",
  boxShadow: "0 28px 90px rgba(0,0,0,0.62)",
};

const mobileItem = {
  textAlign: "left",
  padding: "13px 14px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.04)",
  color: "white",
  fontSize: 14,
  fontWeight: 850,
  cursor: "pointer",
};

const mobileSectionLabel = {
  marginTop: 6,
  marginLeft: 4,
  fontSize: 11,
  fontWeight: 950,
  letterSpacing: 1,
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.45)",
};

const mobileCta = {
  padding: "14px",
  borderRadius: 15,
  border: "1px solid rgba(255,255,255,0.12)",
  background:
    "linear-gradient(90deg, rgba(168,85,247,0.95), rgba(34,211,238,0.90))",
  color: "white",
  fontWeight: 950,
  cursor: "pointer",
};