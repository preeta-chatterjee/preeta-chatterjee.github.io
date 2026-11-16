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
  // Fonts are self-hosted and declared/preloaded in index.html (see the loading rules in CLAUDE.md).
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
