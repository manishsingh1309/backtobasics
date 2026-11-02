/**
 * Analytics tracking for Back to Basics with Big Ron
 * Strictly adheres to brief requirements:
 * - Tracks watch_episode_click, youtube_outbound_click, signup_accepted, subscription_confirmed
 * - Excludes all PII (names, email addresses)
 * - Safe for SSR / Preview / Production
 * - Dynamic end-to-end telemetry and metrics storage for Admin Dashboard
 */

export interface AnalyticsEvent {
  event: string;
  timestamp: string;
  payload: Record<string, unknown>;
}

export interface TrafficSummary {
  totalPages: number;
  byPage: Array<{ path: string; label: string; views: number; pct: number }>;
  devices: Array<{ type: string; count: number; pct: number }>;
  referrers: Array<{ source: string; count: number; pct: number }>;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    _b2bEvents?: AnalyticsEvent[];
  }
}

// Global in-memory log of events for QA inspection bar
export const eventLog: AnalyticsEvent[] = [];

const CENTRAL_ENDPOINT = "https://bigronjones-2ah1.onrender.com/api/track/event";

export function getDeviceType(): "Mobile" | "Desktop" | "Tablet" {
  if (typeof navigator === "undefined") return "Desktop";
  const ua = navigator.userAgent.toLowerCase();
  if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) return "Tablet";
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile|wpdesktop/i.test(ua)) return "Mobile";
  return "Desktop";
}

export function getReferrerCategory(): string {
  if (typeof document === "undefined" || !document.referrer) return "Direct / Bookmarks";
  const ref = document.referrer.toLowerCase();
  if (ref.includes("bigronjones.com")) return "BigRonJones.com Navigation";
  if (ref.includes("youtube.com") || ref.includes("youtu.be")) return "YouTube (@Bigronjones)";
  if (/google|bing|yahoo|duckduckgo/i.test(ref)) return "Search Engines (Google/Bing)";
  if (/instagram|facebook|twitter|t\.co|tiktok|linkedin/i.test(ref)) return "Social (Instagram / Link in Bio)";
  try {
    const host = new URL(ref).hostname;
    return host || "Direct / Bookmarks";
  } catch {
    return "Direct / Bookmarks";
  }
}

function getVid(): string {
  if (typeof window === "undefined") return "server";
  let v = localStorage.getItem("brj_visitor_id");
  if (!v) {
    v = `vid_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem("brj_visitor_id", v);
  }
  return v;
}

function getSid(): string {
  if (typeof window === "undefined") return "server";
  let s = localStorage.getItem("brj_tracking_session_id");
  if (!s) {
    s = `sid_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem("brj_tracking_session_id", s);
  }
  return s;
}

function recordEvent(name: string, rawPayload: Record<string, unknown> = {}) {
  const device = getDeviceType();
  const referrer = getReferrerCategory();
  const pagePath = typeof window !== "undefined" ? window.location.pathname : "/";

  const payload: Record<string, unknown> = {
    ...rawPayload,
    device,
    referrer,
    page_path: rawPayload.page_path || pagePath,
  };

  const item: AnalyticsEvent = {
    event: name,
    timestamp: new Date().toISOString(),
    payload,
  };

  eventLog.push(item);
  if (typeof window !== "undefined") {
    if (!window._b2bEvents) window._b2bEvents = [];
    window._b2bEvents.push(item);

    // Push to GA4 dataLayer if initialized
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: name, ...payload });
    }
    if (typeof window.gtag === "function") {
      window.gtag("event", name, payload);
    }

    // Dispatch DOM custom event for live QA debugger & Admin listener
    window.dispatchEvent(new CustomEvent("b2b_analytics", { detail: item }));

    // Persist event in localStorage for real-time Back to Basics Admin Dashboard
    try {
      const stored = localStorage.getItem("b2b_analytics_events");
      const list: AnalyticsEvent[] = stored ? JSON.parse(stored) : [];
      list.unshift(item);
      if (list.length > 1000) list.length = 1000;
      localStorage.setItem("b2b_analytics_events", JSON.stringify(list));

      // Real dynamic metrics counters for Pageviews
      if (name === "page_view") {
        const pvKey = "b2b_page_views_counts";
        const currentCounts: Record<string, number> = JSON.parse(localStorage.getItem(pvKey) || "{}");
        const path = (payload.page_path as string) || pagePath || "/";
        currentCounts[path] = (currentCounts[path] || 0) + 1;
        localStorage.setItem(pvKey, JSON.stringify(currentCounts));

        const devKey = "b2b_device_counts";
        const currentDev: Record<string, number> = JSON.parse(localStorage.getItem(devKey) || "{}");
        currentDev[device] = (currentDev[device] || 0) + 1;
        localStorage.setItem(devKey, JSON.stringify(currentDev));

        const refKey = "b2b_referrer_counts";
        const currentRef: Record<string, number> = JSON.parse(localStorage.getItem(refKey) || "{}");
        currentRef[referrer] = (currentRef[referrer] || 0) + 1;
        localStorage.setItem(refKey, JSON.stringify(currentRef));
      }
    } catch {
      // Non-fatal
    }

    // Send to central BigRonJones telemetry endpoint
    try {
      const centralPayload = {
        event_id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        event_name: name,
        event_timestamp: item.timestamp,
        anonymous_visitor_id: getVid(),
        session_id: getSid(),
        site_id: "backtobasics.fit",
        page_path: pagePath,
        page_title: document.title,
        event_source: "browser",
        consent_state: "granted",
        schema_version: "2.0",
        siteOrigin: "backtobasics.fit",
        eventName: name,
        metadata: {
          ...payload,
          url: window.location.href,
        },
      };

      const jsonStr = JSON.stringify(centralPayload);
      if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
        const blob = new Blob([jsonStr], { type: "application/json" });
        if (!navigator.sendBeacon(CENTRAL_ENDPOINT, blob)) {
          fetch(CENTRAL_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: jsonStr, keepalive: true }).catch(() => {});
        }
      } else {
        fetch(CENTRAL_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: jsonStr, keepalive: true }).catch(() => {});
      }
    } catch {
      // Telemetry error must never disrupt app experience
    }
  }

  // Developer console notification
  console.info(`[Analytics] ${name}`, payload);
}

/**
 * Returns 100% real dynamic traffic summaries computed from actual recorded visits
 */
export function getRealDynamicTrafficSummary(): TrafficSummary {
  if (typeof window === "undefined") {
    return { totalPages: 0, byPage: [], devices: [], referrers: [] };
  }

  try {
    const pvCounts: Record<string, number> = JSON.parse(localStorage.getItem("b2b_page_views_counts") || "{}");
    const devCounts: Record<string, number> = JSON.parse(localStorage.getItem("b2b_device_counts") || "{}");
    const refCounts: Record<string, number> = JSON.parse(localStorage.getItem("b2b_referrer_counts") || "{}");

    // Standard series pages defined
    const pagesDef = [
      { path: "/", label: "Homepage (Back to Basics Hub)" },
      { path: "/chest-day/", label: "Episode 1: Chest Day" },
      { path: "/back-and-shoulders/", label: "Episode 2: Back & Shoulders" },
      { path: "/leg-day/", label: "Episode 3: Leg Day" },
      { path: "/arm-day/", label: "Episode 4: Arm Day" },
      { path: "/privacy/", label: "Privacy Policy" },
    ];

    let totalViews = 0;
    for (const p in pvCounts) {
      totalViews += pvCounts[p] || 0;
    }

    const byPage = pagesDef.map((p) => {
      const views = pvCounts[p.path] || pvCounts[p.path.replace(/\/$/, "")] || 0;
      const pct = totalViews > 0 ? Math.round((views / totalViews) * 100) : 0;
      return { path: p.path, label: p.label, views, pct };
    });

    // Also include any other unmapped paths
    for (const rawPath in pvCounts) {
      if (!pagesDef.some((def) => def.path === rawPath || def.path.replace(/\/$/, "") === rawPath) && !rawPath.startsWith("/admin")) {
        const v = pvCounts[rawPath] || 0;
        byPage.push({
          path: rawPath,
          label: `Other: ${rawPath}`,
          views: v,
          pct: totalViews > 0 ? Math.round((v / totalViews) * 100) : 0,
        });
      }
    }

    // Devices
    let totalDevices = 0;
    for (const d in devCounts) totalDevices += devCounts[d] || 0;
    const devicesList = ["Desktop", "Mobile", "Tablet"].map((type) => {
      const count = devCounts[type] || 0;
      const pct = totalDevices > 0 ? Math.round((count / totalDevices) * 100) : 0;
      return { type, count, pct };
    });

    // Referrers
    let totalRefs = 0;
    for (const r in refCounts) totalRefs += refCounts[r] || 0;
    const referrersList = Object.keys(refCounts).map((source) => {
      const count = refCounts[source] || 0;
      const pct = totalRefs > 0 ? Math.round((count / totalRefs) * 100) : 0;
      return { source, count, pct };
    });

    return {
      totalPages: totalViews,
      byPage,
      devices: devicesList,
      referrers: referrersList,
    };
  } catch {
    return { totalPages: 0, byPage: [], devices: [], referrers: [] };
  }
}

/**
 * Track user clicking to watch an episode
 * @param episodeNumber 1 | 2 | 3 | 4
 * @param title Episode title
 */
export function trackWatchEpisodeClick(episodeNumber: number, title: string) {
  recordEvent("watch_episode_click", {
    episode_number: episodeNumber,
    episode_title: title,
  });
}

/**
 * Track user outbound click to YouTube (Playlist or Channel or Video)
 * @param destination 'playlist' | 'channel' | 'video'
 * @param url Destination URL
 */
export function trackYouTubeOutboundClick(
  destination: "playlist" | "channel" | "video",
  url: string,
) {
  recordEvent("youtube_outbound_click", {
    destination,
    target_url: url,
  });
}

/**
 * Track valid email submission accepted by backend
 * Strictly no email or name is passed
 * @param page Current route/page
 * @param source Campaign or source identifier
 */
export function trackSignupAccepted(page: string, source = "back-to-basics") {
  recordEvent("signup_accepted", {
    source,
    page,
  });
}

/**
 * Track email confirmation or verified subscription
 * Strictly no email or name is passed
 * @param page Current route/page
 */
export function trackSubscriptionConfirmed(page: string) {
  recordEvent("subscription_confirmed", {
    page,
  });
}

/**
 * Track outbound click to assessment or coaching
 */
export function trackOutboundClick(target: string, url: string) {
  recordEvent("outbound_click", {
    target,
    url,
  });
}

/**
 * Page view tracking
 */
export function trackPageView(path: string, title: string) {
  recordEvent("page_view", {
    page_path: path,
    page_title: title,
  });
}
