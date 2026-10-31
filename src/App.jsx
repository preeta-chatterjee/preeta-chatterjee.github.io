import { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { C } from "./theme";
import { CONTACT_PATH } from "./routes";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import CaseStudyPage from "./pages/CaseStudyPage";

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <HashRouter>
      <div style={{ background: C.bg, minHeight: "100vh", overflowX: "hidden" }}>
        <Cursor />
        <Nav />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path={CONTACT_PATH} element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<CaseStudyPage />} />
        </Routes>
      </div>
    </HashRouter>
);
}
