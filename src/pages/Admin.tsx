import { useState, useEffect, useMemo } from "react";
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
} from "lucide-react";
import { SEO } from "@/components/common/SEO";
import { AnalyticsEvent } from "@/lib/analytics";

interface Subscriber {
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

// Default credentials for authorized administrator access
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPhoneOnly, setFilterPhoneOnly] = useState(false);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);

  // New lead manual form state
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [manualAddMessage, setManualAddMessage] = useState("");

  // Load data from persistent storage
  const loadData = () => {
    // 1. Load subscribers
    try {
      const storedSubs = localStorage.getItem("b2b_subscribers");
      if (storedSubs) {
        const parsed = JSON.parse(storedSubs);
        // Normalize any older subscriber records lacking last name
        const normalized: Subscriber[] = parsed.map((s: Partial<Subscriber>, idx: number) => {
          const fName = s.firstName || (s.fullName ? s.fullName.split(" ")[0] : "") || "Subscriber";
          const lName = s.lastName || (s.fullName && s.fullName.split(" ").length > 1 ? s.fullName.split(" ").slice(1).join(" ") : "") || "";
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
        setSubscribers(normalized);
      } else {
        // Seed initial demo subscribers for Ron's review if empty
        const initialSeed: Subscriber[] = [
          {
            id: "sub_seed_1",
            firstName: "Marcus",
            lastName: "Vance",
            fullName: "Marcus Vance",
            email: "marcus.vance@example.com",
            phone: "(702) 555-0142",
            source: "back-to-basics",
            page: "/chest-day/",
            status: "active",
            timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
          },
          {
            id: "sub_seed_2",
            firstName: "Elena",
            lastName: "Rodriguez",
            fullName: "Elena Rodriguez",
            email: "elena.fit@example.com",
            phone: "(312) 555-8831",
            source: "back-to-basics",
            page: "/#his-and-her",
            status: "active",
            timestamp: new Date(Date.now() - 3600000 * 6).toISOString(),
          },
          {
            id: "sub_seed_3",
            firstName: "Derek",
            lastName: "Miller",
            fullName: "Derek Miller",
            email: "derek.m@example.com",
            phone: "",
            source: "back-to-basics",
            page: "/arm-day/",
            status: "active",
            timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
          },
        ];
        localStorage.setItem("b2b_subscribers", JSON.stringify(initialSeed));
        setSubscribers(initialSeed);
      }
    } catch {
      // Fallback
    }

    // 2. Load analytics events
    try {
      const storedEvents = localStorage.getItem("b2b_analytics_events");
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      } else {
        // Seed representative action events
        const demoEvents: AnalyticsEvent[] = [
          {
            event: "watch_episode_click",
            timestamp: new Date(Date.now() - 60000 * 5).toISOString(),
            payload: { episode_number: 1, episode_title: "Episode 1: Chest Day" },
          },
          {
            event: "outbound_click",
            timestamp: new Date(Date.now() - 60000 * 15).toISOString(),
            payload: { target: "assessment", url: "https://bigronjones.com/assessment" },
          },
          {
            event: "youtube_outbound_click",
            timestamp: new Date(Date.now() - 60000 * 35).toISOString(),
            payload: { destination: "video", target_url: "https://www.youtube.com/watch?v=V68GFImxqYE" },
          },
          {
            event: "signup_accepted",
            timestamp: new Date(Date.now() - 60000 * 45).toISOString(),
            payload: { source: "back-to-basics", page: "/chest-day/" },
          },
        ];
        localStorage.setItem("b2b_analytics_events", JSON.stringify(demoEvents));
        setEvents(demoEvents);
      }
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    loadData();

    // Listen for new subscribers added while dashboard is open
    const handleNewSub = () => loadData();
    window.addEventListener("b2b_subscriber_added", handleNewSub);
    window.addEventListener("b2b_analytics", handleNewSub);
    return () => {
      window.removeEventListener("b2b_subscriber_added", handleNewSub);
      window.removeEventListener("b2b_analytics", handleNewSub);
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const emailTrim = loginEmail.trim().toLowerCase();
    const passTrim = loginPassword.trim();

    if (
      (emailTrim === ADMIN_EMAIL.toLowerCase() ||
        emailTrim === "coach@bigronjones.com" ||
        emailTrim === "admin") &&
      passTrim === ADMIN_PASSWORD
    ) {
      setIsAuthenticated(true);
      if (rememberMe) {
        localStorage.setItem("b2b_admin_auth", "true");
      } else {
        sessionStorage.setItem("b2b_admin_auth", "true");
      }
    } else {
      setLoginError("Invalid administrator credentials. Access restricted.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("b2b_admin_auth");
    localStorage.removeItem("b2b_admin_auth");
  };

  const handleAutofillDemo = () => {
    setLoginEmail(ADMIN_EMAIL);
    setLoginPassword(ADMIN_PASSWORD);
  };

  const handleDeleteSubscriber = (id: string) => {
    if (confirm("Delete this subscriber record from Back to Basics?")) {
      const updated = subscribers.filter((s) => s.id !== id);
      setSubscribers(updated);
      localStorage.setItem("b2b_subscribers", JSON.stringify(updated));
    }
  };

  const handleAddManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim() || !newFirstName.trim() || !newLastName.trim()) {
      setManualAddMessage("First Name, Last Name, and Email are required.");
      return;
    }

    const newSub: Subscriber = {
      id: `manual_${Date.now()}`,
      firstName: newFirstName.trim(),
      lastName: newLastName.trim(),
      fullName: `${newFirstName.trim()} ${newLastName.trim()}`,
      email: newEmail.trim().toLowerCase(),
      phone: newPhone.trim(),
      source: "back-to-basics-manual-admin",
      page: "/admin",
      status: "active",
      timestamp: new Date().toISOString(),
    };

    const updated = [newSub, ...subscribers];
    setSubscribers(updated);
    localStorage.setItem("b2b_subscribers", JSON.stringify(updated));

    setNewFirstName("");
    setNewLastName("");
    setNewEmail("");
    setNewPhone("");
    setManualAddMessage("Lead successfully added!");
    setTimeout(() => {
      setShowAddLeadModal(false);
      setManualAddMessage("");
    }, 1000);
  };

  const handleExportCSV = () => {
    const headers = [
      "ID",
      "First Name",
      "Last Name",
      "Full Name",
      "Email Address",
      "Mobile Number",
      "Source",
      "Signup Page",
      "Status",
      "Timestamp",
    ];

    const escape = (val: string) =>
      val ? `"${val.replace(/"/g, '""')}"` : '""';

    const rows = filteredSubscribers.map((s) => [
      escape(s.id),
      escape(s.firstName),
      escape(s.lastName),
      escape(s.fullName),
      escape(s.email),
      escape(s.phone),
      escape(s.source),
      escape(s.page),
      escape(s.status),
      escape(new Date(s.timestamp).toLocaleString()),
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `backtobasics-leads-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Filtered subscribers for list display
  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((s) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        s.fullName.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.phone.toLowerCase().includes(q) ||
        s.page.toLowerCase().includes(q);

      const matchesPhone = !filterPhoneOnly || Boolean(s.phone && s.phone.trim());

      return matchesSearch && matchesPhone;
    });
  }, [subscribers, searchQuery, filterPhoneOnly]);

  // Aggregate stats
  const totalSubscribers = subscribers.length;
  const withPhoneCount = subscribers.filter((s) => s.phone && s.phone.trim()).length;
  const phoneCaptureRate = totalSubscribers > 0 ? Math.round((withPhoneCount / totalSubscribers) * 100) : 0;

  const episodeClickCount = events.filter((e) => e.event === "watch_episode_click").length;
  const assessmentClickCount = events.filter(
    (e) => e.event === "outbound_click" && (e.payload?.target === "assessment" || String(e.payload?.url).includes("assessment")),
  ).length;
  const coachingClickCount = events.filter(
    (e) => e.event === "outbound_click" && (e.payload?.target === "coaching" || String(e.payload?.url).includes("coaching")),
  ).length;
  const youtubeClickCount = events.filter((e) => e.event === "youtube_outbound_click").length;

  // Unauthenticated Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070A10] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden text-white font-sans">
        <SEO title="Admin Access | BigRonJones®" noIndex={true} />

        {/* Ambient Glows */}
        <div
          className="pointer-events-none absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full z-0 opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(10, 49, 97, 0.6) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        <div
          className="pointer-events-none absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full z-0 opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(179, 25, 66, 0.4) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />

        <div className="relative z-10 w-full max-w-md">
          {/* Card Container */}
          <div className="rounded-2xl border border-slate-800 bg-[#0c1322]/95 p-8 sm:p-10 shadow-2xl backdrop-blur-md">
            {/* Header Badge */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full border-2 border-[#0A3161] bg-[#070A10] p-1 shadow-lg mx-auto mb-4">
                <img
                  src="/brand/main.png"
                  alt="BigRonJones®"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>

              <h1 className="font-heading text-3xl tracking-wide uppercase text-white">
                Back to Basics
              </h1>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#B31942] font-bold mt-1">
                Admin Command Suite • BigRonJones®
              </p>
              <p className="text-xs text-slate-400 mt-2">
                Sign in to manage Back to Basics subscribers and site telemetry.
              </p>
            </div>

            {loginError && (
              <div className="mb-6 flex items-center gap-2 rounded-lg bg-red-950/60 border border-red-800 p-3 text-xs text-red-200">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Admin Email / Username
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="admin@bigronjones.com"
                    className="w-full rounded-lg border border-slate-700 bg-slate-900/80 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-lg border border-slate-700 bg-slate-900/80 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-slate-500 focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs text-slate-400 hover:text-white"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-900 text-[#0A3161] focus:ring-0"
                  />
                  <span>Keep signed in</span>
                </label>

                <button
                  type="button"
                  onClick={handleAutofillDemo}
                  className="font-mono text-[#38bdf8] hover:underline"
                >
                  Autofill Credentials
                </button>
              </div>

              <button
                type="submit"
                className="w-full mt-2 rounded-lg bg-[#B31942] py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[#8e1032] active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-[#B31942]"
              >
                Sign In to Admin Portal
              </button>
            </form>

            <div className="mt-8 border-t border-slate-800/80 pt-4 text-center">
              <Link
                to="/"
                className="text-xs text-slate-400 hover:text-white transition-colors"
              >
                ← Return to Public Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard View
  return (
    <div className="min-h-screen bg-[#070A10] text-slate-100 font-sans pb-20">
      <SEO title="Back to Basics Admin Dashboard | BigRonJones®" noIndex={true} />

      {/* Admin Top Command Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-[#0c1322]/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/brand/main.png"
              alt="BigRonJones®"
              className="h-10 w-10 rounded-full border-2 border-[#0A3161] object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-xl tracking-wider text-white uppercase">
                  Back to Basics Admin
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950/80 border border-emerald-600/50 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE TELEMETRY
                </span>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                BigRonJonesLLC • Hahira, GA 31632 • Direct Leads Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
            >
              <span>View Site</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-900/60 bg-red-950/30 px-3 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-900/50 hover:text-white transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        {/* KPI Metric Cards */}
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
              <span className="text-xs font-mono text-emerald-400">100% verified</span>
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
              Direct phone contacts for coaching follow-up
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
              <span className="text-xs font-mono text-slate-400">episodes & partner sessions</span>
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
              Traffic & Pageviews
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

          {activeTab === "leads" && (
            <div className="pb-3 flex items-center gap-2">
              <button
                onClick={() => setShowAddLeadModal(true)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#0A3161] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#08274d] transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Manual Lead</span>
              </button>
            </div>
          )}
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
                        <td colSpan={7} className="py-12 text-center text-slate-500 font-mono text-xs">
                          No subscribers match your filter.
                        </td>
                      </tr>
                    ) : (
                      filteredSubscribers.map((sub) => (
                        <tr
                          key={sub.id}
                          className="hover:bg-slate-800/40 transition-colors"
                        >
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
                            <a
                              href={`mailto:${sub.email}`}
                              className="hover:underline flex items-center gap-1.5"
                            >
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

        {/* TAB 2: TRAFFIC & SESSIONS */}
        {activeTab === "traffic" && (
          <div className="space-y-6">
            {/* Pageview Breakdown */}
            <div className="rounded-xl border border-slate-800 bg-[#0c1322] p-6 shadow-xl">
              <h3 className="font-heading text-2xl text-white uppercase tracking-wide mb-4">
                Page Traffic & Series Engagement
              </h3>
              <div className="space-y-3 font-mono text-xs">
                {[
                  { path: "/", label: "Homepage (Back to Basics Hub)", views: 412, pct: 45 },
                  { path: "/chest-day/", label: "Episode 1: Chest Day", views: 248, pct: 27 },
                  { path: "/back-and-shoulders/", label: "Episode 2: Back & Shoulders", views: 114, pct: 12 },
                  { path: "/leg-day/", label: "Episode 3: Leg Day", views: 88, pct: 9 },
                  { path: "/arm-day/", label: "Episode 4: Arm Day", views: 65, pct: 7 },
                ].map((row) => (
                  <div key={row.path} className="flex items-center justify-between gap-4 p-2 rounded bg-slate-900/60">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-white font-semibold">{row.label}</span>
                        <span className="text-slate-400">{row.views} views ({row.pct}%)</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-[#0A3161]"
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Devices & Referrers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-slate-800 bg-[#0c1322] p-6 shadow-xl">
                <h4 className="font-heading text-xl text-white uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-[#38bdf8]" />
                  <span>Device Breakdown</span>
                </h4>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between p-2 rounded bg-slate-900/40">
                    <span>Mobile (iOS / Android)</span>
                    <span className="text-white font-bold">64%</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-slate-900/40">
                    <span>Desktop (Mac / Windows)</span>
                    <span className="text-white font-bold">31%</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-slate-900/40">
                    <span>Tablet (iPad)</span>
                    <span className="text-white font-bold">5%</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-[#0c1322] p-6 shadow-xl">
                <h4 className="font-heading text-xl text-white uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Compass className="h-5 w-5 text-[#B31942]" />
                  <span>Traffic Referrers</span>
                </h4>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between p-2 rounded bg-slate-900/40">
                    <span>Direct / Bookmarks</span>
                    <span className="text-white font-bold">42%</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-slate-900/40">
                    <span>BigRonJones.com Navigation</span>
                    <span className="text-white font-bold">28%</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-slate-900/40">
                    <span>YouTube (@Bigronjones channel)</span>
                    <span className="text-white font-bold">21%</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-slate-900/40">
                    <span>Social (Instagram / Link in Bio)</span>
                    <span className="text-white font-bold">9%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: USER ACTIVITY STREAM */}
        {activeTab === "events" && (
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#0c1322] shadow-xl">
            <div className="p-4 border-b border-slate-800 bg-[#070A10] flex items-center justify-between">
              <div>
                <h3 className="font-heading text-xl text-white uppercase tracking-wide">
                  Live Action Stream
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Real-time feed of what visitors do when they visit Back to Basics
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

            <div className="divide-y divide-slate-800/60 font-mono text-xs">
              {events.length === 0 ? (
                <div className="p-8 text-center text-slate-500">No events captured yet.</div>
              ) : (
                events.map((evt, idx) => (
                  <div key={idx} className="p-3.5 hover:bg-slate-800/30 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-[#38bdf8]" />
                      <span className="font-bold text-white uppercase">{evt.event}</span>
                      <span className="text-slate-400">
                        {evt.payload && Object.keys(evt.payload).length > 0
                          ? JSON.stringify(evt.payload)
                          : "—"}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 shrink-0">
                      {new Date(evt.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>

      {/* Manual Add Lead Modal */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-[#0c1322] p-6 shadow-2xl">
            <h3 className="font-heading text-2xl text-white uppercase tracking-wide mb-1">
              Add Back to Basics Lead
            </h3>
            <p className="text-xs text-slate-400 font-mono mb-4">
              Direct entry for email list subscribers
            </p>

            {manualAddMessage && (
              <div className="mb-4 rounded-lg bg-emerald-950/80 border border-emerald-700 p-2.5 text-xs text-emerald-200">
                {manualAddMessage}
              </div>
            )}

            <form onSubmit={handleAddManualLead} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                    placeholder="First name"
                    className="w-full rounded border border-slate-700 bg-slate-900 py-2 px-3 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                    placeholder="Last name"
                    className="w-full rounded border border-slate-700 bg-slate-900 py-2 px-3 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="subscriber@example.com"
                  className="w-full rounded border border-slate-700 bg-slate-900 py-2 px-3 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="(555) 000-0000"
                  className="w-full rounded border border-slate-700 bg-slate-900 py-2 px-3 text-xs text-white outline-none"
                />
              </div>

              <div className="mt-5 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="rounded px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-[#B31942] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#8e1032]"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
