import React, { useState } from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AnalyzePage from "./pages/AnalyzePage";
import AboutPage from "./pages/AboutPage";
import CategoryInteractions from "./pages/CategoryInteractions";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(900px 520px at 15% 8%, rgba(168,85,247,0.20), transparent 60%)," +
          "radial-gradient(800px 520px at 85% 10%, rgba(34,211,238,0.13), transparent 55%)," +
          "linear-gradient(180deg, #05060a 0%, #070812 100%)",
        color: "white",
      }}
    >
      <Header page={page} setPage={setPage} />

      <div className="app-content">
        {page === "home" && (
          <HomePage
            onStart={() => setPage("analyze")}
            onAbout={() => setPage("about")}
          />
        )}

        {page === "analyze" && <AnalyzePage />}
        {page === "about" && <AboutPage />}
        {page === "interactions" && <CategoryInteractions />}
      </div>
    </div>
  );
}