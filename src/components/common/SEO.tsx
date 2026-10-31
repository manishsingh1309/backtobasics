import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Episode } from "@/data/seriesData";
import { trackPageView } from "@/lib/analytics";

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  episode?: Episode;
}

const BASE_URL = import.meta.env.VITE_SITE_URL || "https://backtobasics.fit";

export function SEO({ title, description, canonicalPath, episode }: SEOProps) {
  const location = useLocation();
  const currentPath = canonicalPath || location.pathname;
  const canonicalUrl = `${BASE_URL}${currentPath.endsWith("/") || currentPath.includes(".") ? currentPath : currentPath + "/"}`;

  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // 3. Update Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    // 4. Update OpenGraph Tags
    const updateOg = (property: string, content: string) => {
      let og = document.querySelector(`meta[property="${property}"]`);
      if (!og) {
        og = document.createElement("meta");
        og.setAttribute("property", property);
        document.head.appendChild(og);
      }
      og.setAttribute("content", content);
    };

    updateOg("og:title", title);
    updateOg("og:description", description);
    updateOg("og:url", canonicalUrl);
    updateOg(
      "og:image",
      episode
        ? `${BASE_URL}${episode.thumbnail}`
        : `${BASE_URL}/thumbnails/ep1-chest.jpg`,
    );

    // 5. Update Twitter Tags
    const updateTwitter = (name: string, content: string) => {
      let tw = document.querySelector(`meta[name="${name}"]`);
      if (!tw) {
        tw = document.createElement("meta");
        tw.setAttribute("name", name);
        document.head.appendChild(tw);
      }
      tw.setAttribute("content", content);
    };

    updateTwitter("twitter:title", title);
    updateTwitter("twitter:description", description);
    updateTwitter(
      "twitter:image",
      episode
        ? `${BASE_URL}${episode.thumbnail}`
        : `${BASE_URL}/thumbnails/ep1-chest.jpg`,
    );

    // 6. Structured Data (JSON-LD)
    const scriptId = "b2b-structured-data";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    if (episode) {
      // VideoObject schema
      const videoSchema = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: episode.seoTitle,
        description: episode.seoDescription,
        thumbnailUrl: [
          `${BASE_URL}${episode.thumbnail}`,
          `https://i.ytimg.com/vi/${episode.videoId}/maxresdefault.jpg`,
        ],
        uploadDate: episode.uploadDate,
        duration: episode.durationIso,
        embedUrl: episode.embedUrl,
        publisher: {
          "@type": "Person",
          name: "Big Ron Jones",
          url: "https://www.youtube.com/@Bigronjones",
        },
      };
      script.textContent = JSON.stringify(videoSchema);
    } else {
      // WebSite & Person schema
      const siteSchema = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": `${BASE_URL}/#website`,
            url: BASE_URL,
            name: "Back to Basics with Big Ron",
            description:
              "Watch Big Ron Jones’ four-part Back to Basics workout series for chest, back and shoulders, legs, and arms. Join his email list for training content.",
            publisher: {
              "@type": "Person",
              name: "Big Ron Jones",
              url: "https://www.youtube.com/@Bigronjones",
            },
          },
          {
            "@type": "Person",
            "@id": `${BASE_URL}/#person`,
            name: "Big Ron Jones",
            url: "https://thebigronjones.com",
            sameAs: [
              "https://www.youtube.com/@Bigronjones",
              "https://www.instagram.com/bigronjones/",
            ],
            jobTitle: "Fitness Coach & Founder of BIGRONJONES®",
            knowsAbout: [
              "Strength Training",
              "Muscle Building",
              "Hypertrophy",
              "Bodybuilding Basics",
            ],
          },
        ],
      };
      script.textContent = JSON.stringify(siteSchema);
    }

    // Track analytics pageview
    trackPageView(currentPath, title);
  }, [title, description, canonicalUrl, episode, currentPath]);

  return null;
}
