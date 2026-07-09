import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AnalyzePage from "./pages/AnalyzePage";
import AboutPage from "./pages/AboutPage";
import CategoryInteractions from "./pages/CategoryInteractions";

export default function App() {
  return (
    <div className="bg-app-gradient min-h-screen text-foreground">
      <Header />

      <div className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/analyze" element={<AnalyzePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/interactions" element={<CategoryInteractions />} />
        </Routes>
      </div>
    </div>
  );
}
