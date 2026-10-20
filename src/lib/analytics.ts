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
