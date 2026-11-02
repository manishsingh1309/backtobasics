import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Mail,
  Phone,
  Play,
  TrendingUp,
  Download,
  Search,
  Trash2,
  Plus,
  RefreshCw,
  Lock,
  LogOut,
  ExternalLink,
  AlertCircle,
  Smartphone,
  Compass,
  Globe,
  Database,
  BarChart3,
  Calendar,
} from "lucide-react";
import { SEO } from "@/components/common/SEO";
import {
  AnalyticsEvent,
  TrafficSummary,
  getRealDynamicTrafficSummary,
} from "@/lib/analytics";
import { supabase } from "@/lib/supabase";

export interface Subscriber {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  source: string;
  page: string;
  status: string;
  timestamp: string;
}

// Credentials for authorized administrator access
const ADMIN_EMAIL = "admin@bigronjones.com";
const ADMIN_PASSWORD = "BigRonJones2026!";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return (
      sessionStorage.getItem("b2b_admin_auth") === "true" ||
      localStorage.getItem("b2b_admin_auth") === "true"
    );
  });

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<"leads" | "traffic" | "events">("leads");
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [trafficSummary, setTrafficSummary] = useState<TrafficSummary>({
    totalPages: 0,
    byPage: [],
    devices: [],
    referrers: [],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPhoneOnly, setFilterPhoneOnly] = useState(false);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dbSyncStatus, setDbSyncStatus] = useState<"synced" | "syncing" | "local">("local");

  // New lead manual form state
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [manualAddMessage, setManualAddMessage] = useState("");
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  // Load 100% real, dynamic data from persistent storage and Supabase
  const loadData = useCallback(async () => {
    setIsRefreshing(true);
    setDbSyncStatus("syncing");

    // 1. Load local subscribers
    let localSubs: Subscriber[] = [];
    try {
      const storedSubs = localStorage.getItem("b2b_subscribers");
      if (storedSubs) {
        const parsed = JSON.parse(storedSubs);
        localSubs = parsed.map((s: Partial<Subscriber>, idx: number) => {
          const fName = s.firstName || (s.fullName ? s.fullName.split(" ")[0] : "") || "Subscriber";
          const lName =
            s.lastName ||
            (s.fullName && s.fullName.split(" ").length > 1
              ? s.fullName.split(" ").slice(1).join(" ")
              : "") ||
            "";
          return {
            id: s.id || `sub_${idx}_${Date.now()}`,
            firstName: fName,
            lastName: lName,
            fullName: s.fullName || [fName, lName].filter(Boolean).join(" ") || fName,
            email: s.email || "",
            phone: s.phone || "",
            source: s.source || "back-to-basics",
            page: s.page || "/",
            status: s.status || "active",
            timestamp: s.timestamp || new Date().toISOString(),
          };
        });
      }
    } catch {
      localSubs = [];
    }

    // 2. Query Supabase for remote leads from BigRonJones central database
    try {
      const { data: dbLeads, error } = await supabase
        .from("leads")
        .select("id, full_name, email, phone, source, utm_source, status, created_at")
        .or("source.eq.back-to-basics,utm_source.eq.back-to-basics,lead_magnet_slug.eq.back-to-basics")
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(dbLeads) && dbLeads.length > 0) {
        setDbSyncStatus("synced");
        // Convert DB leads to Subscriber type
        const remoteSubs: Subscriber[] = dbLeads.map((dl) => {
          const names = (dl.full_name || "").trim().split(" ");
          const fName = names[0] || "Subscriber";
          const lName = names.slice(1).join(" ") || "";
          return {
            id: dl.id,
            firstName: fName,
            lastName: lName,
            fullName: dl.full_name || fName,
            email: dl.email,
            phone: dl.phone || "",
            source: dl.source || "back-to-basics",
            page: "/",
            status: dl.status || "active",
            timestamp: dl.created_at || new Date().toISOString(),
          };
        });

        // Merge without duplicating emails
        const mergedMap = new Map<string, Subscriber>();
        for (const s of localSubs) {
          if (s.email) mergedMap.set(s.email.toLowerCase(), s);
        }
        for (const r of remoteSubs) {
          if (r.email) {
            const existing = mergedMap.get(r.email.toLowerCase());
            mergedMap.set(r.email.toLowerCase(), {
              ...r,
              phone: r.phone || (existing ? existing.phone : ""),
              page: existing ? existing.page : r.page,
            });
          }
        }
        const mergedList = Array.from(mergedMap.values()).sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setSubscribers(mergedList);
        localStorage.setItem("b2b_subscribers", JSON.stringify(mergedList));
      } else {
        setDbSyncStatus("local");
        setSubscribers(localSubs);
      }
    } catch {
      setDbSyncStatus("local");
      setSubscribers(localSubs);
    }

    // 3. Load real analytics events
    try {
      const storedEvents = localStorage.getItem("b2b_analytics_events");
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      } else {
        setEvents([]);
      }
    } catch {
      setEvents([]);
    }

    // 4. Load real dynamic traffic summary
    const summary = getRealDynamicTrafficSummary();
    setTrafficSummary(summary);

    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();

      // Listen for incoming dynamic events
      const handleAnalytics = (e: Event) => {
        const customEv = e as CustomEvent<AnalyticsEvent>;
        if (customEv.detail) {
          setEvents((prev) => [customEv.detail, ...prev.slice(0, 499)]);
          setTrafficSummary(getRealDynamicTrafficSummary());
        }
      };

      const handleSubscriber = (e: Event) => {
        const customEv = e as CustomEvent<Subscriber>;
        if (customEv.detail) {
          setSubscribers((prev) => {
            const updated = [customEv.detail, ...prev.filter((s) => s.email !== customEv.detail.email)];
            localStorage.setItem("b2b_subscribers", JSON.stringify(updated));
            return updated;
          });
        }
      };

      window.addEventListener("b2b_analytics", handleAnalytics);
      window.addEventListener("b2b_subscriber_added", handleSubscriber);

      return () => {
        window.removeEventListener("b2b_analytics", handleAnalytics);
        window.removeEventListener("b2b_subscriber_added", handleSubscriber);
      };
    }
  }, [isAuthenticated, loadData]);

  // Handle Login Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const cleanEmail = loginEmail.trim().toLowerCase();
    if (cleanEmail === ADMIN_EMAIL.toLowerCase() && loginPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      if (rememberMe) {
        localStorage.setItem("b2b_admin_auth", "true");
      } else {
        sessionStorage.setItem("b2b_admin_auth", "true");
      }
    } else {
      setLoginError("Invalid administrator credentials. Access is restricted to BigRonJonesLLC management.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("b2b_admin_auth");
    localStorage.removeItem("b2b_admin_auth");
  };

  // Delete a subscriber record
  const handleDeleteSubscriber = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this subscriber record?")) {
      const updated = subscribers.filter((s) => s.id !== id);
      setSubscribers(updated);
      localStorage.setItem("b2b_subscribers", JSON.stringify(updated));

      // Attempt remote delete from Supabase if lead exists
      try {
        await supabase.from("leads").delete().eq("id", id);
      } catch {
        // Non-fatal
      }
    }
  };

  // Add Manual Lead
  const handleAddManualLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFirstName.trim() || !newLastName.trim() || !newEmail.trim()) {
      setManualAddMessage("Please enter First Name, Last Name, and Email Address.");
      return;
    }

    setIsSubmittingLead(true);
    setManualAddMessage("");

    const newSub: Subscriber = {
      id: `sub_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      firstName: newFirstName.trim(),
      lastName: newLastName.trim(),
      fullName: `${newFirstName.trim()} ${newLastName.trim()}`,
      email: newEmail.trim().toLowerCase(),
      phone: newPhone.trim(),
      source: "back-to-basics",
      page: "/admin",
      status: "active",
      timestamp: new Date().toISOString(),
    };

    // Save locally
    const updated = [newSub, ...subscribers.filter((s) => s.email.toLowerCase() !== newSub.email)];
    setSubscribers(updated);
    localStorage.setItem("b2b_subscribers", JSON.stringify(updated));

    // Post to central BigRonJones backend
    try {
      const webhookUrl =
        import.meta.env.VITE_EMAIL_WEBHOOK_URL ||
        "https://bigronjones-2ah1.onrender.com/api/newsletter";

      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newSub.email,
          firstName: newSub.firstName,
          lastName: newSub.lastName,
          phone: newSub.phone || undefined,
          source: "back-to-basics",
          page: "/admin",
        }),
      });
    } catch {
      // Backend handles fallback
    }

    setIsSubmittingLead(false);
    setNewFirstName("");
    setNewLastName("");
    setNewEmail("");
    setNewPhone("");
    setShowAddLeadModal(false);
  };

  // Export Leads to CSV
  const handleExportCSV = () => {
    if (subscribers.length === 0) {
      alert("No subscribers to export.");
      return;
    }

    const headers = ["ID", "First Name", "Last Name", "Full Name", "Email", "Phone", "Source", "Origin Page", "Status", "Date Captured"];
    const rows = filteredSubscribers.map((s) => [
      s.id,
      `"${s.firstName.replace(/"/g, '""')}"`,
      `"${s.lastName.replace(/"/g, '""')}"`,
      `"${s.fullName.replace(/"/g, '""')}"`,
      `"${s.email.replace(/"/g, '""')}"`,
      `"${(s.phone || "").replace(/"/g, '""')}"`,
      `"${s.source}"`,
      `"${s.page}"`,
      `"${s.status}"`,
      `"${s.timestamp}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `backtobasics_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Clear live activity log
  const handleClearActivityLog = () => {
    if (window.confirm("Are you sure you want to clear the local activity log? Real subscriber records will remain unaffected.")) {
      localStorage.removeItem("b2b_analytics_events");
      setEvents([]);
    }
  };

  // Filtered subscribers based on live search & phone toggle
  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((sub) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        sub.firstName.toLowerCase().includes(q) ||
        sub.lastName.toLowerCase().includes(q) ||
        sub.fullName.toLowerCase().includes(q) ||
        sub.email.toLowerCase().includes(q) ||
        (sub.phone && sub.phone.includes(q));

      const matchesPhone = !filterPhoneOnly || Boolean(sub.phone && sub.phone.trim().length > 0);
      return matchesSearch && matchesPhone;
    });
  }, [subscribers, searchQuery, filterPhoneOnly]);

  // Dynamic KPI Metrics (100% computed from real records)
  const totalSubscribers = subscribers.length;
  const withPhoneCount = subscribers.filter((s) => s.phone && s.phone.trim().length > 0).length;
  const phoneCaptureRate = totalSubscribers > 0 ? Math.round((withPhoneCount / totalSubscribers) * 100) : 0;

  const episodeClickCount = events.filter((e) => e.event === "watch_episode_click").length;
  const youtubeClickCount = events.filter((e) => e.event === "youtube_outbound_click").length;
  const assessmentClickCount = events.filter(
    (e) => e.event === "outbound_click" && e.payload?.target === "assessment"
  ).length;
  const coachingClickCount = events.filter(
    (e) => e.event === "outbound_click" && e.payload?.target === "coaching"
  ).length;

  // -------------------------------------------------------------
  // Render Login Gate
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070A10] flex items-center justify-center p-4">
        <SEO title="Admin Access | BigRonJones®" noIndex={true} />
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#0c1322] p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0A3161] text-[#38bdf8] mb-4 border border-[#38bdf8]/30 shadow-lg shadow-blue-950/50">
              <Lock className="h-7 w-7 text-white" />
            </div>
            <h1 className="font-heading text-3xl text-white tracking-wide uppercase">
              Admin Portal
            </h1>
            <p className="mt-1 text-xs font-mono uppercase tracking-widest text-[#B31942] font-bold">
              BigRonJonesLLC · Back to Basics Hub
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Restricted management portal. Enter authorized credentials to inspect leads and telemetry.
            </p>
          </div>

          {loginError && (
            <div className="mb-6 rounded-lg border border-red-800/60 bg-red-950/40 p-3.5 text-xs text-red-300 flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-300 mb-1.5">
                Administrator Email
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@bigronjones.com"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-[#38bdf8] focus:outline-none focus:ring-1 focus:ring-[#38bdf8]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-[#38bdf8] focus:outline-none focus:ring-1 focus:ring-[#38bdf8]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-xs font-mono text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-900 text-[#0A3161]"
                />
                <span>Keep me signed in</span>
              </label>
              <span className="font-mono text-[11px] text-slate-500">256-Bit SSL</span>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-[#B31942] py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-red-950/50 hover:bg-[#8e1032] transition-colors focus:outline-none focus:ring-2 focus:ring-[#B31942]"
            >
              Access Dashboard
            </button>
          </form>

          <div className="mt-8 border-t border-slate-800/80 pt-4 text-center">
            <Link
              to="/"
              className="text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors inline-flex items-center gap-1"
            >
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Render Authenticated Admin Dashboard
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#070A10] text-slate-200">
      <SEO title="Back to Basics Admin Dashboard | BigRonJones®" noIndex={true} />

      {/* Top Admin Header Bar */}
      <header className="border-b border-slate-800 bg-[#0c1322]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-[#0A3161] flex items-center justify-center font-heading text-lg text-white border border-[#38bdf8]/40">
              B
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-lg tracking-wider text-white uppercase">
                  Back to Basics · Admin Hub
                </span>
                <span className="rounded bg-emerald-950 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400 border border-emerald-800/50">
                  LIVE DYNAMIC
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400">
                Official Tracking & Lead Capture Portal · BigRonJonesLLC
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Supabase Sync Badge */}
            <div
              className={`hidden md:inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono border ${
                dbSyncStatus === "synced"
                  ? "bg-emerald-950/50 border-emerald-800/60 text-emerald-300"
                  : "bg-blue-950/50 border-blue-800/60 text-blue-300"
              }`}
            >
              <Database className="h-3 w-3" />
              <span>{dbSyncStatus === "synced" ? "Supabase Live Connected" : "Local Storage Synced"}</span>
            </div>

            <button
              onClick={loadData}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-mono font-bold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              title="Refresh real-time data"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-[#38bdf8]" : ""}`} />
              <span className="hidden sm:inline">Refresh Data</span>
            </button>

            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-mono font-bold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">View Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-900/60 bg-red-950/40 px-3 py-1.5 text-xs font-mono font-bold text-red-300 hover:bg-red-900/60 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Dynamic KPI Overview Cards (All Computed in Real Time) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Card 1: Total Leads */}
          <div className="rounded-xl border border-slate-800 bg-[#0c1322] p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                Back to Basics Leads
              </span>
              <Users className="h-4 w-4 text-[#38bdf8]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-4xl text-white">{totalSubscribers}</span>
              <span className="text-xs font-mono text-emerald-400">real leads</span>
            </div>
            <p className="mt-1 text-[11px] font-mono text-slate-400">
              Synced with BigRonJones.com central leads
            </p>
          </div>

          {/* Card 2: Phone Number Capture Rate */}
          <div className="rounded-xl border border-slate-800 bg-[#0c1322] p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                Mobile Number Capture
              </span>
              <Phone className="h-4 w-4 text-[#B31942]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-4xl text-white">{withPhoneCount}</span>
              <span className="text-xs font-mono text-emerald-400">({phoneCaptureRate}% conversion)</span>
            </div>
            <p className="mt-1 text-[11px] font-mono text-slate-400">
              Direct phone contacts for coaching follow up
            </p>
          </div>

          {/* Card 3: Episode Views */}
          <div className="rounded-xl border border-slate-800 bg-[#0c1322] p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                Episode Plays
              </span>
              <Play className="h-4 w-4 text-[#38bdf8]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-4xl text-white">{episodeClickCount + youtubeClickCount}</span>
              <span className="text-xs font-mono text-slate-400">actual plays</span>
            </div>
            <p className="mt-1 text-[11px] font-mono text-slate-400">
              Chest, Back/Shoulders, Legs, Arms & Sue videos
            </p>
          </div>

          {/* Card 4: Assessment / Coaching Intent */}
          <div className="rounded-xl border border-slate-800 bg-[#0c1322] p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                Coaching Intent
              </span>
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-4xl text-white">
                {assessmentClickCount + coachingClickCount}
              </span>
              <span className="text-xs font-mono text-[#38bdf8]">high value</span>
            </div>
            <p className="mt-1 text-[11px] font-mono text-slate-400">
              Assessment + Personalized Guidance clicks
            </p>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="border-b border-slate-800 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("leads")}
              className={`pb-3 px-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${
                activeTab === "leads"
                  ? "border-[#B31942] text-white"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              Email Subscribers ({subscribers.length})
            </button>
            <button
              onClick={() => setActiveTab("traffic")}
              className={`pb-3 px-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${
                activeTab === "traffic"
                  ? "border-[#B31942] text-white"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              Traffic & Pageviews ({trafficSummary.totalPages})
            </button>
            <button
              onClick={() => setActiveTab("events")}
              className={`pb-3 px-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${
                activeTab === "events"
                  ? "border-[#B31942] text-white"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              User Activity Stream ({events.length})
            </button>
          </div>

          <div className="pb-3 flex items-center gap-2">
            {activeTab === "leads" && (
              <>
                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download CSV</span>
                </button>
                <button
                  onClick={() => setShowAddLeadModal(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#0A3161] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#08274d] transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Manual Lead</span>
                </button>
              </>
            )}

            {activeTab === "events" && events.length > 0 && (
              <button
                onClick={handleClearActivityLog}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-mono text-slate-400 hover:text-red-400 hover:border-red-900/60 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear Activity Log</span>
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: EMAIL LEADS */}
        {activeTab === "leads" && (
          <div>
            {/* Filter & Search Bar */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-[#0c1322] p-3">
              <div className="flex flex-1 items-center gap-2 min-w-[240px]">
                <Search className="h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by first name, last name, email, or phone..."
                  className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
                />
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
                  <input
                    type="checkbox"
                    checked={filterPhoneOnly}
                    onChange={(e) => setFilterPhoneOnly(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-900 text-[#0A3161]"
                  />
                  <span>Has Phone Number Only</span>
                </label>
                <span>•</span>
                <span>{filteredSubscribers.length} showing</span>
              </div>
            </div>

            {/* Leads Table */}
            <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#0c1322] shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="border-b border-slate-800 bg-[#070A10] text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="py-3 px-4">Name (First & Last)</th>
                      <th className="py-3 px-4">Email Address</th>
                      <th className="py-3 px-4">Mobile Number</th>
                      <th className="py-3 px-4">Origin Page</th>
                      <th className="py-3 px-4">Date / Time</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {filteredSubscribers.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-16 text-center text-slate-500 font-mono text-xs">
                          <Users className="mx-auto h-8 w-8 text-slate-600 mb-2" />
                          <p className="text-sm font-semibold text-slate-400 mb-1">No subscribers captured yet</p>
                          <p className="text-slate-500 max-w-sm mx-auto">
                            When visitors submit their first name, last name, and email on the site, their records will dynamically appear here in real time.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredSubscribers.map((sub) => (
                        <tr key={sub.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3 px-4 font-semibold text-white">
                            <div className="flex items-center gap-2.5">
                              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0A3161] text-[11px] font-mono font-bold text-white uppercase">
                                {sub.firstName.charAt(0)}
                                {sub.lastName ? sub.lastName.charAt(0) : ""}
                              </div>
                              <div>
                                <span className="block leading-tight">
                                  {sub.firstName} {sub.lastName}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-mono text-xs text-[#38bdf8]">
                            <a href={`mailto:${sub.email}`} className="hover:underline flex items-center gap-1.5">
                              <Mail className="h-3 w-3 text-slate-500" />
                              <span>{sub.email}</span>
                            </a>
                          </td>
                          <td className="py-3 px-4 font-mono text-xs">
                            {sub.phone ? (
                              <a
                                href={`tel:${sub.phone}`}
                                className="inline-flex items-center gap-1 rounded bg-slate-800 px-2 py-0.5 text-emerald-300 hover:text-emerald-200"
                              >
                                <Phone className="h-3 w-3 text-emerald-400" />
                                <span>{sub.phone}</span>
                              </a>
                            ) : (
                              <span className="text-slate-600 italic">Not provided</span>
                            )}
                          </td>
                          <td className="py-3 px-4 font-mono text-xs text-slate-400">
                            <code>{sub.page}</code>
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                            {new Date(sub.timestamp).toLocaleString(undefined, {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-400 border border-emerald-800/50">
                              Active
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleDeleteSubscriber(sub.id)}
                              className="rounded p-1 text-slate-500 hover:bg-red-950 hover:text-red-400 transition-colors"
                              title="Delete record"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TRAFFIC & SESSIONS (100% Dynamic from Real Visits) */}
        {activeTab === "traffic" && (
          <div className="space-y-6">
            {/* Pageview Breakdown */}
            <div className="rounded-xl border border-slate-800 bg-[#0c1322] p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-heading text-2xl text-white uppercase tracking-wide">
                    Page Traffic & Series Engagement
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Real-time aggregated view counts computed from visitors across all canonical routes
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono uppercase text-slate-400">Total Pageviews</span>
                  <p className="font-heading text-3xl text-white">{trafficSummary.totalPages}</p>
                </div>
              </div>

              {trafficSummary.totalPages === 0 ? (
                <div className="py-12 text-center text-slate-500 font-mono text-xs">
                  <BarChart3 className="mx-auto h-8 w-8 text-slate-600 mb-2" />
                  <p className="text-sm font-semibold text-slate-400 mb-1">No page views recorded yet</p>
                  <p className="text-slate-500 max-w-sm mx-auto">
                    Visit the public episode and home pages to see live traffic breakdowns, device metrics, and referrer data compute here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 font-mono text-xs">
                  {trafficSummary.byPage.map((row) => (
                    <div key={row.path} className="flex items-center justify-between gap-4 p-3 rounded-lg bg-slate-900/60 border border-slate-800/60">
                      <div className="flex-1">
                        <div className="flex justify-between mb-1.5">
                          <span className="text-white font-semibold text-sm">{row.label}</span>
                          <span className="text-[#38bdf8] font-bold">
                            {row.views} views ({row.pct}%)
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#0A3161] to-[#38bdf8] transition-all duration-500"
                            style={{ width: `${Math.max(row.pct, row.views > 0 ? 5 : 0)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Devices & Referrers Grid (Dynamic) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Devices Card */}
              <div className="rounded-xl border border-slate-800 bg-[#0c1322] p-6 shadow-xl">
                <h4 className="font-heading text-xl text-white uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-[#38bdf8]" />
                  <span>Device Breakdown (Dynamic)</span>
                </h4>
                {trafficSummary.devices.length === 0 || trafficSummary.totalPages === 0 ? (
                  <p className="text-xs font-mono text-slate-500 py-6 text-center">
                    Awaiting initial visitor sessions...
                  </p>
                ) : (
                  <div className="space-y-2.5 text-xs font-mono">
                    {trafficSummary.devices.map((d) => (
                      <div key={d.type} className="flex items-center justify-between p-2.5 rounded bg-slate-900/40 border border-slate-800/40">
                        <span className="text-slate-300">{d.type} Devices</span>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-400">{d.count} sessions</span>
                          <span className="text-white font-bold bg-slate-800 px-2 py-0.5 rounded">{d.pct}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Referrers Card */}
              <div className="rounded-xl border border-slate-800 bg-[#0c1322] p-6 shadow-xl">
                <h4 className="font-heading text-xl text-white uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Compass className="h-5 w-5 text-[#B31942]" />
                  <span>Traffic Referrers (Dynamic)</span>
                </h4>
                {trafficSummary.referrers.length === 0 || trafficSummary.totalPages === 0 ? (
                  <p className="text-xs font-mono text-slate-500 py-6 text-center">
                    Awaiting initial inbound referrers...
                  </p>
                ) : (
                  <div className="space-y-2.5 text-xs font-mono">
                    {trafficSummary.referrers.map((r) => (
                      <div key={r.source} className="flex items-center justify-between p-2.5 rounded bg-slate-900/40 border border-slate-800/40">
                        <span className="text-slate-300">{r.source}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-400">{r.count} visits</span>
                          <span className="text-white font-bold bg-slate-800 px-2 py-0.5 rounded">{r.pct}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: USER ACTIVITY STREAM (100% Dynamic Real-Time Actions) */}
        {activeTab === "events" && (
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#0c1322] shadow-xl">
            <div className="p-4 border-b border-slate-800 bg-[#070A10] flex items-center justify-between">
              <div>
                <h3 className="font-heading text-xl text-white uppercase tracking-wide">
                  Live Action Stream
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Real-time chronological feed of actions performed by visitors on Back to Basics
                </p>
              </div>
              <button
                onClick={loadData}
                className="inline-flex items-center gap-1 rounded bg-slate-800 px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Refresh Stream</span>
              </button>
            </div>

            {events.length === 0 ? (
              <div className="py-16 text-center text-slate-500 font-mono text-xs">
                <Globe className="mx-auto h-8 w-8 text-slate-600 mb-2" />
                <p className="text-sm font-semibold text-slate-400 mb-1">No user actions logged yet</p>
                <p className="text-slate-500 max-w-sm mx-auto">
                  When visitors watch episodes, click YouTube links, take the assessment, or subscribe, real action payloads will stream into this console.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-800/60 font-mono text-xs">
                {events.map((evt, idx) => {
                  let badgeColor = "bg-slate-800 text-slate-300";
                  if (evt.event === "watch_episode_click") badgeColor = "bg-blue-950 text-[#38bdf8] border border-blue-800/50";
                  if (evt.event === "youtube_outbound_click") badgeColor = "bg-red-950 text-red-400 border border-red-800/50";
                  if (evt.event === "signup_accepted" || evt.event === "subscription_confirmed")
                    badgeColor = "bg-emerald-950 text-emerald-400 border border-emerald-800/50";
                  if (evt.event === "outbound_click") badgeColor = "bg-amber-950 text-amber-300 border border-amber-800/50";

                  return (
                    <div key={`${evt.timestamp}_${idx}`} className="p-4 hover:bg-slate-800/30 transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${badgeColor}`}>
                            {evt.event.replace(/_/g, " ")}
                          </span>
                          {Boolean(evt.payload?.device) && (
                            <span className="text-[10px] text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded">
                              {String(evt.payload.device)}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(evt.timestamp).toLocaleString()}</span>
                        </span>
                      </div>
                      <div className="bg-[#070A10] p-2.5 rounded border border-slate-800/80 text-[11px] text-slate-400 overflow-x-auto">
                        <pre className="font-mono">{JSON.stringify(evt.payload, null, 2)}</pre>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Manual Add Lead Modal */}
      {showAddLeadModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#0c1322] p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <h3 className="font-heading text-xl text-white uppercase tracking-wide">
                Add Manual Lead
              </h3>
              <button
                type="button"
                onClick={() => setShowAddLeadModal(false)}
                className="text-slate-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            {manualAddMessage && (
              <div className="mb-4 rounded p-2.5 text-xs text-amber-300 bg-amber-950/40 border border-amber-900/60">
                {manualAddMessage}
              </div>
            )}

            <form onSubmit={handleAddManualLead} className="space-y-3 font-sans">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-300 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                    required
                    placeholder="e.g. Michael"
                    className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-[#38bdf8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-300 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                    required
                    placeholder="e.g. Cole"
                    className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-[#38bdf8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                  placeholder="michael.cole@example.com"
                  className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-[#38bdf8]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-300 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="(702) 555-0199"
                  className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-[#38bdf8]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-slate-800 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingLead}
                  className="px-5 py-2 text-xs font-bold uppercase tracking-wider rounded bg-[#0A3161] text-white hover:bg-[#08274d] transition-colors"
                >
                  {isSubmittingLead ? "Saving..." : "Save Lead"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
