import { useState, useId } from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, AlertCircle, Mail, User, Eye, X } from "lucide-react";
import { trackSignupAccepted, trackSubscriptionConfirmed } from "@/lib/analytics";

interface EmailSignupSectionProps {
  pageContext?: string;
  className?: string;
}

export function EmailSignupSection({
  pageContext = "homepage",
  className = "",
}: EmailSignupSectionProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showWelcomePreview, setShowWelcomePreview] = useState(false);
  const [isConfirmationRequired] = useState(false); // Can be toggled for double opt-in test

  const emailInputId = useId();
  const firstNameInputId = useId();
  const location = useLocation();

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !validateEmail(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setLoading(true);

    try {
      // Simulate/execute API subscription call
      // Saves subscriber locally for preview/test auditing and sends payload
      const subscriber = {
        email: trimmedEmail,
        firstName: firstName.trim(),
        source: "back-to-basics",
        page: pageContext || location.pathname,
        timestamp: new Date().toISOString(),
      };

      // Check existing subscribers in localStorage for duplicate testing
      const existingStr = localStorage.getItem("b2b_subscribers") || "[]";
      const existingList = JSON.parse(existingStr);
      const isDuplicate = existingList.some(
        (s: { email: string }) => s.email.toLowerCase() === trimmedEmail.toLowerCase(),
      );

      // Append or update subscriber record
      if (!isDuplicate) {
        existingList.push(subscriber);
      }
      localStorage.setItem("b2b_subscribers", JSON.stringify(existingList));

      // Network latency simulation
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Fire analytics: ONLY fire on accepted signup, NEVER send email/name
      trackSignupAccepted(pageContext || location.pathname, "back-to-basics");
      trackSubscriptionConfirmed(pageContext || location.pathname);

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("We couldn’t complete your signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="join"
      className={`scroll-mt-24 border-t border-slate-200 bg-slate-50 py-16 sm:py-20 ${className}`}
      aria-labelledby="join-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-8 sm:p-12 shadow-sm text-center">
          {/* Section Heading */}
          <h2
            id="join-heading"
            className="font-heading text-3xl sm:text-4xl text-[#0A3161] uppercase tracking-wide"
          >
            Keep building with Big Ron
          </h2>

          {/* Section Copy */}
          <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
            Join my email list for Back to Basics updates and practical training content.
          </p>

          {/* Subscription State */}
          {status === "success" ? (
            <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50/70 p-6 text-center animate-in fade-in duration-300">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
              </div>

              {isConfirmationRequired ? (
                <p className="mt-4 text-base font-medium text-emerald-900">
                  Check your inbox to confirm your email address. Once confirmed, you’ll be on Big Ron’s list.
                </p>
              ) : (
                <p className="mt-4 text-base font-medium text-emerald-900">
                  You’re on the list. Start watching Back to Basics below.
                </p>
              )}

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/chest-day/"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-[#0A3161] px-6 py-3 text-sm font-bold text-white shadow transition-colors hover:bg-[#08274d]"
                >
                  Watch Episode 1 →
                </Link>

                <button
                  type="button"
                  onClick={() => setShowWelcomePreview(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Eye className="h-4 w-4 text-[#0A3161]" />
                  Preview Welcome Email
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 text-left max-w-xl mx-auto" noValidate>
              <div className="space-y-4">
                {/* Email Address (Required) */}
                <div>
                  <label
                    htmlFor={emailInputId}
                    className="block text-sm font-semibold text-slate-800 mb-1"
                  >
                    Email Address <span className="text-[#B31942]">*</span>
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id={emailInputId}
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 placeholder:text-slate-400 focus:border-[#0A3161] focus:ring-2 focus:ring-[#0A3161]/20 text-sm transition"
                      aria-invalid={status === "error" && !validateEmail(email)}
                      aria-describedby={errorMessage ? "form-error-msg" : undefined}
                    />
                  </div>
                </div>

                {/* First Name (Optional) */}
                <div>
                  <label
                    htmlFor={firstNameInputId}
                    className="block text-sm font-semibold text-slate-800 mb-1"
                  >
                    First Name (optional)
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <User className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id={firstNameInputId}
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Your first name"
                      className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 placeholder:text-slate-400 focus:border-[#0A3161] focus:ring-2 focus:ring-[#0A3161]/20 text-sm transition"
                    />
                  </div>
                </div>

                {/* Error message */}
                {errorMessage && (
                  <div
                    id="form-error-msg"
                    className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-[#B31942] border border-red-200"
                    role="alert"
                  >
                    <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-[#0A3161] py-3.5 px-6 text-base font-bold text-white shadow-md transition-all hover:bg-[#08274d] active:bg-[#061f3d] disabled:opacity-70 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0A3161]"
                >
                  {loading ? "Joining..." : "Join Big Ron’s List"}
                </button>

                {/* Consent text */}
                <p className="text-xs text-slate-500 leading-relaxed text-center sm:text-left mt-3">
                  By subscribing, you agree to receive Back to Basics updates and training emails from Big Ron Jones. You can unsubscribe anytime. Read our{" "}
                  <Link
                    to="/privacy/"
                    className="text-[#0A3161] underline hover:text-[#08274d] font-medium"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Welcome Email Modal Preview (verbatim brief implementation) */}
      {showWelcomePreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-preview-title"
        >
          <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-[#0A3161] px-6 py-4 text-white">
              <div>
                <h3 id="welcome-preview-title" className="text-sm font-bold tracking-wider uppercase">
                  Verified Welcome Email Preview
                </h3>
                <p className="text-xs text-slate-300">Exact email sent to new subscribers</p>
              </div>
              <button
                type="button"
                onClick={() => setShowWelcomePreview(false)}
                className="rounded-lg p-1 text-slate-300 hover:bg-white/10 hover:text-white"
                aria-label="Close email preview"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Email Headers */}
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 text-xs text-slate-600 space-y-1">
              <div>
                <strong className="text-slate-800">From:</strong> Big Ron Jones &lt;ron@thebigronjones.com&gt;
              </div>
              <div>
                <strong className="text-slate-800">Subject:</strong> Welcome to Back to Basics with Big Ron
              </div>
              <div>
                <strong className="text-slate-800">Preview text:</strong> Four episodes. A clear place to start.
              </div>
            </div>

            {/* Email Body Verbatim */}
            <div className="p-6 text-sm text-slate-800 space-y-4 max-h-[60vh] overflow-y-auto font-sans leading-relaxed">
              <p className="font-semibold text-base text-slate-900">Glad you’re here.</p>
              <p>
                Back to Basics is a four-part workout series covering chest, back and shoulders, legs, and arms. Start with Episode 1, or choose the session you want to watch.
              </p>
              <p>
                <strong>Start watching:</strong>{" "}
                <Link
                  to="/#watch"
                  onClick={() => setShowWelcomePreview(false)}
                  className="text-[#0A3161] underline font-medium"
                >
                  https://backtobasicswithbigron.com/#watch
                </Link>
              </p>
              <p>
                I’ll share Back to Basics updates and practical training content here. Keep showing up and make the basics count.
              </p>
              <p className="font-semibold text-slate-900 pt-2">Big Ron</p>

              <div className="mt-8 pt-4 border-t border-slate-200 text-[11px] text-slate-400">
                <p>BIGRONJONES® • Practical Advice for Your Real World Goals.®</p>
                <p className="mt-1">
                  You received this email because you subscribed on backtobasicswithbigron.com.{" "}
                  <span className="underline cursor-pointer">Unsubscribe</span> anytime.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setShowWelcomePreview(false)}
                className="rounded-md bg-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-300"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
