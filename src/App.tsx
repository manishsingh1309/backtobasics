import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { QAChecklistBar } from "@/components/common/QAChecklistBar";
import Home from "@/pages/Home";
import EpisodeDetail from "@/pages/EpisodeDetail";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/NotFound";
import { EPISODES } from "@/data/seriesData";

/**
 * Handles smooth hash scrolling (/#watch, /#about, /#join) and scroll-to-top on route changes
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    if (!id) return;

    let frame = 0;
    let raf = 0;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        return;
      }
      if (frame++ < 25) raf = requestAnimationFrame(tryScroll);
    };

    raf = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 selection:bg-[#0A3161] selection:text-white">
      <ScrollManager />

      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-[#0A3161] focus:px-4 focus:py-2.5 focus:text-sm focus:font-bold focus:text-white focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/chest-day"
            element={<EpisodeDetail episode={EPISODES[0]} />}
          />
          <Route
            path="/chest-day/"
            element={<EpisodeDetail episode={EPISODES[0]} />}
          />
          <Route
            path="/back-and-shoulders"
            element={<EpisodeDetail episode={EPISODES[1]} />}
          />
          <Route
            path="/back-and-shoulders/"
            element={<EpisodeDetail episode={EPISODES[1]} />}
          />
          <Route
            path="/leg-day"
            element={<EpisodeDetail episode={EPISODES[2]} />}
          />
          <Route
            path="/leg-day/"
            element={<EpisodeDetail episode={EPISODES[2]} />}
          />
          <Route
            path="/arm-day"
            element={<EpisodeDetail episode={EPISODES[3]} />}
          />
          <Route
            path="/arm-day/"
            element={<EpisodeDetail episode={EPISODES[3]} />}
          />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/privacy/" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      {/* Floating QA Verification & Checklist Bar for Preview */}
      <QAChecklistBar />
    </div>
  );
}
