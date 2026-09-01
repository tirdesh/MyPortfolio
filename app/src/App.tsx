import React, { lazy, Suspense, useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { ThemeProvider } from "./providers/ThemeProvider";
import { initGA, logPageView } from "./utils/analytics";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Skills = lazy(() => import("./pages/Skills"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const SITE = "Tirdesh Pettugani";

const ROUTE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: `${SITE} · Full Stack Developer`,
    description:
      "Full stack developer designing and shipping AI-enabled products. Northeastern University MSIS, previously Commvault.",
  },
  "/about": {
    title: `About · ${SITE}`,
    description:
      "Education, experience and the route from Commvault to Microsoft 365 Copilot engineering at Wave Life Sciences.",
  },
  "/projects": {
    title: `Projects · ${SITE}`,
    description:
      "Selected work across iOS, the MERN stack and applied AI, filterable by technology.",
  },
  "/skills": {
    title: `Skills · ${SITE}`,
    description:
      "Languages, databases, web technologies, libraries, cloud platforms and tools, browsable two ways.",
  },
  "/contact": {
    title: `Contact · ${SITE}`,
    description: `Get in touch with ${SITE}.`,
  },
};

const applyRouteMeta = (pathname: string) => {
  const meta = ROUTE_META[pathname] ?? {
    title: `Page not found · ${SITE}`,
    description: "That page does not exist.",
  };
  document.title = meta.title;

  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", meta.description);

  // Always self-reference. Gating this on a known route left an unknown URL
  // asserting the previous page's canonical, which tells a crawler the junk
  // path is that page.
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute("href", `https://tirdesh.me${pathname}`);
  }
};

const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    applyRouteMeta(location.pathname);
    logPageView();
  }, [location]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    initGA();
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
