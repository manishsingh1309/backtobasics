import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Mail, Video, Eye, Lock } from "lucide-react";
import { SEO } from "@/components/common/SEO";
import BrandName from "@/components/shared/BrandName";

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy | Back to Basics with Big Ron"
        description="Privacy policy for Back to Basics with Big Ron: how we handle your email, video embeds, cookies, and your data."
        canonicalPath="/privacy/"
      />

      <div className="min-h-screen bg-slate-50/60 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb back */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-[#0A3161]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Back to Home</span>
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
            {/* Header */}
            <div className="border-b border-slate-100 pb-6 mb-8">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0A3161] mb-2">
                <Shield className="h-4 w-4 text-[#0A3161]" />
                <span>LEGAL NOTICE & DATA PROTECTION</span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl text-[#0A3161] uppercase tracking-wide">
                Privacy Policy
              </h1>
              <p className="mt-2 text-sm text-slate-500 font-mono">
                Last updated: October 2026 • BigRonJonesLLC · <BrandName variant="upper" />
              </p>
            </div>

            {/* Introduction */}
            <div className="prose prose-slate max-w-none text-slate-700 space-y-6 text-sm sm:text-base leading-relaxed">
              <p>
                This privacy policy describes how <strong>Back to Basics with <BrandName variant="mixed" /></strong>, an official production of <strong>BigRonJonesLLC (<BrandName variant="upper" />)</strong>, collects, uses, and protects your information when you visit this website (backtobasics.fit) or subscribe to our email updates.
              </p>
              <p>
                Our philosophy is simple: we collect only what is strictly necessary to share practical training content and provide a clean viewing experience. We never sell, rent, or trade your personal information.
              </p>

              {/* 1. Operator Information */}
              <div className="rounded-xl bg-slate-50 p-6 border border-slate-200">
                <h2 className="font-heading text-2xl text-[#0A3161] uppercase tracking-wide mb-2 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-[#0A3161]" />
                  <span>1. Website Operator & Contact</span>
                </h2>
                <p className="text-sm text-slate-700">
                  This website is operated by:
                </p>
                <div className="mt-2 text-sm text-slate-900 font-mono space-y-1">
                  <p className="font-bold">BigRonJonesLLC</p>
                  <p>Hahira, GA 31632</p>
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:Coaching@BigRonJones.com"
                      className="text-[#0A3161] font-semibold underline hover:text-[#08274d]"
                    >
                      Coaching@BigRonJones.com
                    </a>
                  </p>
                </div>
              </div>

              {/* 2. Collected Fields & Email Purpose */}
              <h2 className="font-heading text-2xl text-[#0A3161] uppercase tracking-wide pt-4 flex items-center gap-2">
                <Mail className="h-5 w-5 text-[#0A3161]" />
                <span>2. Information We Collect and Why</span>
              </h2>
              <p>
                When you choose to join <BrandName variant="mixed" />’ email list, we collect:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-700">
                <li>
                  <strong>First Name & Last Name:</strong> Used to address you properly in training communications and coaching inquiries.
                </li>
                <li>
                  <strong>Email Address:</strong> Used to deliver the Back to Basics welcome email, series updates, and practical training content from <BrandName variant="mixed" />.
                </li>
                <li>
                  <strong>Mobile Number:</strong> Provided to allow direct SMS updates, program reminders, and coaching notifications from BigRonJonesLLC.
                </li>
                <li>
                  <strong>Signup Source & Context:</strong> We record which page or episode you signed up on (e.g. <code>source: back-to-basics</code>, <code>page: /chest-day/</code>) so we know where our audience discovers the series.
                </li>
              </ul>
              <p>
                We do not collect payment details, credit cards, or billing addresses on this educational website.
              </p>

              {/* 3. Embedded Video Services */}
              <h2 className="font-heading text-2xl text-[#0A3161] uppercase tracking-wide pt-4 flex items-center gap-2">
                <Video className="h-5 w-5 text-[#0A3161]" />
                <span>3. Embedded YouTube Videos</span>
              </h2>
              <p>
                The workout series is hosted on YouTube and embedded on our episode pages using YouTube’s privacy-enhanced domain (<code>youtube-nocookie.com</code>). In accordance with YouTube’s documentation, this mode means YouTube does not set tracking cookies on your device when you load the page until you actively press play on the video player.
              </p>
              <p>
                When you choose to play a video, your browser communicates directly with YouTube’s servers, subject to Google’s standard Privacy Policy.
              </p>

              {/* 4. Analytics and Cookies */}
              <h2 className="font-heading text-2xl text-[#0A3161] uppercase tracking-wide pt-4 flex items-center gap-2">
                <Eye className="h-5 w-5 text-[#0A3161]" />
                <span>4. Analytics and Measurement</span>
              </h2>
              <p>
                To understand how visitors navigate the four episodes and improve the site experience, we measure anonymous interaction events such as <code>watch_episode_click</code>, <code>youtube_outbound_click</code>, and <code>signup_accepted</code>.
              </p>
              <p>
                <strong>Privacy Guarantee:</strong> We strictly exclude personal identifiable information (PII)—including names and email addresses—from all analytics tracking.
              </p>

              {/* 5. Unsubscribe Process */}
              <h2 className="font-heading text-2xl text-[#0A3161] uppercase tracking-wide pt-4">
                5. How to Unsubscribe or Delete Your Data
              </h2>
              <p>
                You can unsubscribe at any time. Every email sent by <BrandName variant="mixed" /> includes a direct, one-click unsubscribe link in the footer.
              </p>
              <p>
                Alternatively, you may email{" "}
                <a
                  href="mailto:Coaching@BigRonJones.com?subject=Unsubscribe%20Request"
                  className="text-[#0A3161] underline hover:text-[#08274d]"
                >
                  Coaching@BigRonJones.com
                </a>{" "}
                with "Unsubscribe" in the subject line, and we will remove your email address from our database promptly.
              </p>

              {/* 6. Updates to This Policy */}
              <h2 className="font-heading text-2xl text-[#0A3161] uppercase tracking-wide pt-4">
                6. Changes to This Notice
              </h2>
              <p>
                If we update our email provider, analytics setup, or privacy practices, we will post the updated policy directly on this page with a revised date.
              </p>
            </div>

            {/* Back to Home CTA */}
            <div className="mt-10 pt-6 border-t border-slate-100 flex justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-lg bg-[#0A3161] px-6 py-3 text-sm font-bold text-white shadow hover:bg-[#08274d] transition"
              >
                Return to Back to Basics
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
