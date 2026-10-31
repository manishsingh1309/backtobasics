/**
 * Analytics tracking for Back to Basics with Big Ron
 * Strictly adheres to brief requirements:
 * - Tracks watch_episode_click, youtube_outbound_click, signup_accepted, subscription_confirmed
 * - Excludes all PII (names, email addresses)
 * - Safe for SSR / Preview / Production
 */

export interface AnalyticsEvent {
  event: string;
  timestamp: string;
  payload: Record<string, unknown>;
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

function recordEvent(name: string, payload: Record<string, unknown> = {}) {
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

    // Dispatch DOM custom event for live QA debugger
    window.dispatchEvent(new CustomEvent("b2b_analytics", { detail: item }));

    // Send to central BigRonJones telemetry endpoint
    try {
      const centralPayload = {
        event_id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        event_name: name,
        event_timestamp: item.timestamp,
        anonymous_visitor_id: getVid(),
        session_id: getSid(),
        site_id: "backtobasics.fit",
        page_path: window.location.pathname,
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
      // Telemetry error must never disrupt video playback
    }
  }

  // Developer console notification
  console.info(`[Analytics] ${name}`, payload);
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
 * Page view tracking
 */
export function trackPageView(path: string, title: string) {
  recordEvent("page_view", {
    page_path: path,
    page_title: title,
  });
}
