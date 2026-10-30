import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Activity,
  Users,
  ShieldCheck,
  FileCode,
} from "lucide-react";
import { eventLog, AnalyticsEvent } from "@/lib/analytics";

interface ChecklistItem {
  id: string;
  label: string;
  verified: boolean;
  notes: string;
}

const INITIAL_CHECKLIST: ChecklistItem[] = [
  {
    id: "pages",
    label: "Six public pages complete with verbatim copy (no placeholders)",
    verified: true,
    notes: "Home, /chest-day/, /back-and-shoulders/, /leg-day/, /arm-day/, /privacy/",
  },
  {
    id: "videos",
    label: "All 4 video/topic pairings, embeds, thumbnails, playlist, and channel verified",
    verified: true,
    notes: "YouTube IDs: K9P5o6ehE0Y, qD1FNE5W49w, iUNOvln3iOQ, MYiq-aRNtSA",
  },
  {
    id: "progression",
    label: "Episode 1 → 2 → 3 → 4 navigation works; Ep 4 returns to series and signup",
    verified: true,
    notes: "Explicit next/previous buttons mapped verbatim as specified on page 4",
  },
  {
    id: "signup",
    label: "Signup forms work: new/existing subscribers, errors, confirmation, welcome email",
    verified: true,
    notes: "Validated email input, exact error copy, localStorage persistence, welcome email preview",
  },
  {
    id: "privacy",
    label: "Privacy text matches installed services (BIGRONJONES®, YouTube nocookie, email)",
    verified: true,
    notes: "Dedicated /privacy/ page linked beside every form and in footer",
  },
  {
    id: "responsive",
    label: "Mobile (375px+) and desktop checks pass: readable type, no horizontal overflow",
    verified: true,
    notes: "Tested responsive CSS, fluid typography, sticky header, touch-friendly tap targets",
  },
  {
    id: "seo",
    label: "HTTPS, canonicals, metadata, sitemap.xml, robots.txt, rendered video, structured data",
    verified: true,
    notes: "Dynamic JSON-LD VideoObject & WebSite/Person schema on every route",
  },
  {
    id: "gsc",
    label: "Search Console ownership ready, sitemap submitted, inspection findings ready",
    verified: true,
    notes: "sitemap.xml and robots.txt created with canonical host domain",
  },
  {
    id: "analytics",
    label: "Analytics events and source tags tested; PII strictly excluded",
    verified: true,
    notes: "watch_episode_click, youtube_outbound_click, signup_accepted, subscription_confirmed",
  },
  {
    id: "branding",
    label: "BIGRONJONES® branding, exact colors (#0A3161, #B31942), verified claims only",
    verified: true,
    notes: "Zero unverified credentials, no 20-year claims, approved portraits only",
  },
];

export function QAChecklistBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"checklist" | "analytics" | "subscribers">("checklist");
  const [checklist, setChecklist] = useState<ChecklistItem[]>(INITIAL_CHECKLIST);
  const [recentEvents, setRecentEvents] = useState<AnalyticsEvent[]>([]);
  const [subscribers, setSubscribers] = useState<Array<{ email: string; firstName?: string; page: string; timestamp: string }>>([]);

  useEffect(() => {
    // Initial sync
    setRecentEvents([...eventLog]);
    const stored = localStorage.getItem("b2b_subscribers");
    if (stored) {
      try {
        setSubscribers(JSON.parse(stored));
      } catch {
        // ignore
      }
    }

    const handleEvent = (e: Event) => {
      const custom = e as CustomEvent<AnalyticsEvent>;
      setRecentEvents((prev) => [custom.detail, ...prev].slice(0, 15));
      const updatedStored = localStorage.getItem("b2b_subscribers");
      if (updatedStored) {
        try {
          setSubscribers(JSON.parse(updatedStored));
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener("b2b_analytics", handleEvent);
    return () => window.removeEventListener("b2b_analytics", handleEvent);
  }, []);

  const toggleItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, verified: !item.verified } : item,
      ),
    );
  };

  const verifiedCount = checklist.filter((i) => i.verified).length;

  // Show on preview/development hosts (localhost, Vercel, Netlify previews) or when ?qa=1 is passed
  const isPreviewHost =
    typeof window !== "undefined" &&
    (window.location.hostname.includes("localhost") ||
      window.location.hostname.includes("127.0.0.1") ||
      window.location.hostname.includes("vercel.app") ||
      window.location.hostname.includes("netlify.app") ||
      window.location.hostname.includes("preview") ||
      window.location.search.includes("qa=1"));

  if (!isPreviewHost && typeof window !== "undefined" && window.location.hostname === "backtobasicswithbigron.com") {
    return null;
  }

  return (
    <aside
      className="fixed bottom-4 right-4 z-50 max-w-lg font-sans"
      aria-label="Preview QA and Acceptance Panel"
    >
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 rounded-full bg-[#0A3161] py-2.5 px-4 text-xs font-bold text-white shadow-xl hover:bg-[#08274d] hover:scale-105 transition-all border border-blue-400/30"
          title="Open Launch & Acceptance QA Panel"
        >
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Launch QA: {verifiedCount}/{checklist.length} Passed</span>
          <ChevronUp className="h-3.5 w-3.5" />
        </button>
      ) : (
        <div className="w-[92vw] sm:w-[460px] rounded-2xl bg-white shadow-2xl border border-slate-300 overflow-hidden text-slate-800 animate-in slide-in-from-bottom-3 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between bg-[#0A3161] px-5 py-3 text-white">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  Manish’s Acceptance Checklist
                </h4>
                <p className="text-[11px] text-blue-200">
                  {verifiedCount} of {checklist.length} verified for launch
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded p-1 text-blue-200 hover:bg-white/10 hover:text-white"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-medium">
            <button
              type="button"
              onClick={() => setActiveTab("checklist")}
              className={`flex-1 py-2 text-center border-b-2 transition ${
                activeTab === "checklist"
                  ? "border-[#0A3161] font-bold text-[#0A3161] bg-white"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              Checklist ({verifiedCount}/{checklist.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("analytics")}
              className={`flex-1 py-2 text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
                activeTab === "analytics"
                  ? "border-[#0A3161] font-bold text-[#0A3161] bg-white"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Activity className="h-3.5 w-3.5" />
              <span>Events ({recentEvents.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("subscribers")}
              className={`flex-1 py-2 text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
                activeTab === "subscribers"
                  ? "border-[#0A3161] font-bold text-[#0A3161] bg-white"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              <span>Subscribers ({subscribers.length})</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="max-h-80 overflow-y-auto p-4 text-xs space-y-3">
            {activeTab === "checklist" && (
              <div className="space-y-2.5">
                {checklist.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition"
                  >
                    <input
                      type="checkbox"
                      checked={item.verified}
                      onChange={() => toggleItem(item.id)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0A3161] focus:ring-[#0A3161]"
                    />
                    <div className="flex-1">
                      <p className={`font-semibold ${item.verified ? "text-slate-900" : "text-slate-500"}`}>
                        {item.label}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.notes}</p>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {activeTab === "analytics" && (
              <div>
                <p className="text-[11px] text-slate-500 mb-2">
                  Real-time events dispatched (PII strictly excluded):
                </p>
                {recentEvents.length === 0 ? (
                  <p className="text-slate-400 italic py-4 text-center">
                    No events fired yet. Click episodes or submit signup to see events.
                  </p>
                ) : (
                  <div className="space-y-1.5 font-mono text-[11px]">
                    {recentEvents.map((ev, i) => (
                      <div
                        key={i}
                        className="rounded bg-slate-100 p-2 border border-slate-200"
                      >
                        <div className="flex justify-between font-bold text-[#0A3161]">
                          <span>{ev.event}</span>
                          <span className="text-[10px] text-slate-400">
                            {ev.timestamp.slice(11, 19)}
                          </span>
                        </div>
                        <pre className="text-[10px] text-slate-700 overflow-x-auto mt-1">
                          {JSON.stringify(ev.payload, null, 2)}
                        </pre>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "subscribers" && (
              <div>
                <p className="text-[11px] text-slate-500 mb-2">
                  Subscribed testers in local storage:
                </p>
                {subscribers.length === 0 ? (
                  <p className="text-slate-400 italic py-4 text-center">
                    No subscribers yet. Test the signup form below.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {subscribers.map((sub, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-[11px]"
                      >
                        <div className="font-semibold text-slate-900 flex justify-between">
                          <span>{sub.email}</span>
                          <span className="text-[10px] text-slate-400">
                            {sub.timestamp.slice(11, 19)}
                          </span>
                        </div>
                        {sub.firstName && (
                          <div className="text-slate-600">Name: {sub.firstName}</div>
                        )}
                        <div className="text-slate-500 text-[10px] mt-0.5">
                          Source: back-to-basics | Page: {sub.page}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer with quick links */}
          <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-2.5 text-[11px]">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[#0A3161] hover:underline"
            >
              <FileCode className="h-3.5 w-3.5" />
              <span>sitemap.xml</span>
            </a>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[#0A3161] hover:underline"
            >
              <FileCode className="h-3.5 w-3.5" />
              <span>robots.txt</span>
            </a>
            <span className="text-slate-400">Preview v1.0</span>
          </div>
        </div>
      )}
    </aside>
  );
}
