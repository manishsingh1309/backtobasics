import fs from "node:fs";
import path from "node:path";
import http from "node:http";

const ROOT = process.cwd();

console.log("===================================================================");
console.log("   SENIOR QA END-TO-END DEEP TEST SUITE: BACK TO BASICS WITH BIG RON");
console.log("===================================================================\n");

let passed = 0;
let failed = 0;
const failures = [];

function check(testName, condition, details = "") {
  if (condition) {
    console.log(`  ✓ [PASS] ${testName}`);
    passed++;
  } else {
    console.error(`  ✗ [FAIL] ${testName} ${details ? `(${details})` : ""}`);
    failed++;
    failures.push({ testName, details });
  }
}

// -------------------------------------------------------------
// Test Suite 1: Structural Files & Build Artefacts
// -------------------------------------------------------------
console.log("\n[SUITE 1] Assets, Build Output, and Configuration Validation");

const assets = [
  "public/brand/main.png",
  "public/ron/meetbigronjones.png",
  "public/brand/bigronjones-logo.svg",
  "public/thumbnails/ep1-chest.jpg",
  "public/thumbnails/ep2-back-shoulders.jpg",
  "public/thumbnails/ep3-legs.jpg",
  "public/thumbnails/ep4-arms.jpg",
  "public/robots.txt",
  "public/sitemap.xml",
  "public/site.webmanifest",
  "public/_redirects",
  "render.yaml",
  "vercel.json",
  "dist/index.html"
];

for (const a of assets) {
  const p = path.join(ROOT, a);
  const exists = fs.existsSync(p);
  const size = exists ? fs.statSync(p).size : 0;
  check(`Asset check: ${a}`, exists && size > 0, `Size: ${size} bytes`);
}

// -------------------------------------------------------------
// Test Suite 2: Render & SPA Routing Rules
// -------------------------------------------------------------
console.log("\n[SUITE 2] Render & SPA Routing Rules Verification");

const renderYaml = fs.readFileSync(path.join(ROOT, "render.yaml"), "utf8");
check("render.yaml static site runtime configured", renderYaml.includes("runtime: static"));
check("render.yaml build and publish path configured", renderYaml.includes("staticPublishPath: dist"));
check("render.yaml rewrite route configured for SPA fallback", renderYaml.includes("source: /*") && renderYaml.includes("destination: /index.html"));
check("render.yaml security and cache headers configured", renderYaml.includes("X-Content-Type-Options") && renderYaml.includes("Cache-Control"));

const vercelJson = JSON.parse(fs.readFileSync(path.join(ROOT, "vercel.json"), "utf8"));
check("vercel.json rewrites configured for SPA fallback", 
  Array.isArray(vercelJson.rewrites) && vercelJson.rewrites.some(r => r.source === "/(.*)" && r.destination === "/index.html")
);
check("vercel.json security headers configured", 
  Array.isArray(vercelJson.headers) && vercelJson.headers.some(h => h.headers.some(header => header.key === "X-Frame-Options"))
);

const redirects = fs.readFileSync(path.join(ROOT, "public/_redirects"), "utf8");
check("_redirects configured for Netlify/Cloudflare SPA", redirects.includes("/* /index.html 200"));

// -------------------------------------------------------------
// Test Suite 3: Verbatim Copy Compliance (Brief Alignment)
// -------------------------------------------------------------
console.log("\n[SUITE 3] Verbatim Copy Compliance Audit (Strict Zero-Improvisation)");

const seriesFile = fs.readFileSync(path.join(ROOT, "src/data/seriesData.ts"), "utf8");
const homeFile = fs.readFileSync(path.join(ROOT, "src/pages/Home.tsx"), "utf8");
const emailFile = fs.readFileSync(path.join(ROOT, "src/components/common/EmailSignupSection.tsx"), "utf8");
const footerFile = fs.readFileSync(path.join(ROOT, "src/components/layout/Footer.tsx"), "utf8");
const privacyFile = fs.readFileSync(path.join(ROOT, "src/pages/Privacy.tsx"), "utf8");

// Page 1 & 2
check("Homepage H1: 'Back to Basics with Big Ron'", homeFile.includes("Back to Basics") && homeFile.includes("with Big Ron"));
check("Homepage Subtitle: 'Build muscle. Make the basics count.'", homeFile.includes("Build muscle. Make the basics count."));
check("Homepage Primary CTA: 'Watch Episode 1'", homeFile.includes("Watch Episode 1"));
check("Homepage Secondary CTA: 'Join the Email List'", homeFile.includes("Join the Email List"));
check("Series Section Heading: 'Your Back to Basics workout series'", homeFile.includes("Your Back to Basics workout series"));
check("Series Section Copy: 'Start with chest day and work through the series...'", homeFile.includes("Start with chest day and work through the series, or choose the episode you want to watch below."));
check("Playlist Link: 'Watch the Full Series on YouTube'", homeFile.includes("Watch the Full Series on YouTube"));
check("About Section Heading: 'Meet Big Ron Jones'", homeFile.includes("Meet Big Ron Jones"));
check("About Section Copy verbatim", homeFile.includes("I’m Big Ron Jones. My approach is practical: understand the basics, train with purpose, and build habits you can keep."));
check("About Section Button: 'Visit My YouTube Channel'", homeFile.includes("Visit My YouTube Channel"));

// Page 4: Episode Intros
check("Ep 1 Intro verbatim", seriesFile.includes("Start with chest day. Watch the first episode, follow the demonstrations, and continue through the series at your own pace."));
check("Ep 2 Intro verbatim", seriesFile.includes("Next up: back and shoulders. Watch the second episode and follow the demonstrations before moving on to leg day."));
check("Ep 3 Intro verbatim", seriesFile.includes("It’s leg day. Watch the third episode, then continue to the final episode for arms."));
check("Ep 4 Intro verbatim", seriesFile.includes("Finish the series with arm day. Watch the final episode, revisit any session, and join my list to stay connected."));

// Page 4: Navigation Sequences
check("Ep 1 Nav: Back to the Series -> Next: Back and Shoulders", 
  seriesFile.includes("Back to the Series") && seriesFile.includes("Next: Back and Shoulders")
);
check("Ep 2 Nav: Previous: Chest Day -> Next: Leg Day", 
  seriesFile.includes("Previous: Chest Day") && seriesFile.includes("Next: Leg Day")
);
check("Ep 3 Nav: Previous: Back and Shoulders -> Next: Arm Day", 
  seriesFile.includes("Previous: Back and Shoulders") && seriesFile.includes("Next: Arm Day")
);
check("Ep 4 Nav: Previous: Leg Day -> Watch the Series Again + Join Big Ron's List", 
  seriesFile.includes("Previous: Leg Day") && seriesFile.includes("Watch the Series Again") && seriesFile.includes("alsoShowsJoinList: true")
);

// Page 4: Exact Search Metadata
check("Homepage SEO Title: 'Back to Basics with Big Ron | Official Workout Series'", 
  homeFile.includes("Back to Basics with Big Ron | Official Workout Series")
);
check("Homepage SEO Description verbatim", 
  homeFile.includes("Watch Big Ron Jones’ four-part Back to Basics workout series for chest, back and shoulders, legs, and arms. Join his email list for training content.")
);
check("Ep 1 SEO Title: 'Back to Basics: Chest Day | Big Ron Jones'", seriesFile.includes("Back to Basics: Chest Day | Big Ron Jones"));
check("Ep 2 SEO Title: 'Back to Basics: Back and Shoulders | Big Ron Jones'", seriesFile.includes("Back to Basics: Back and Shoulders | Big Ron Jones"));
check("Ep 3 SEO Title: 'Back to Basics: Leg Day | Big Ron Jones'", seriesFile.includes("Back to Basics: Leg Day | Big Ron Jones"));
check("Ep 4 SEO Title: 'Back to Basics: Arm Day | Big Ron Jones'", seriesFile.includes("Back to Basics: Arm Day | Big Ron Jones"));

// Page 5: Signup & Welcome Email
check("Email Section Heading: 'Keep building with Big Ron'", emailFile.includes("Keep building with Big Ron"));
check("Email Section Copy verbatim", emailFile.includes("Join my email list for Back to Basics updates and practical training content."));
check("Email Section Button: 'Join Big Ron’s List'", emailFile.includes("Join Big Ron’s List"));
check("Required Label: 'Email Address'", emailFile.includes("Email Address"));
check("Optional Label: 'First Name (optional)'", emailFile.includes("First Name (optional)"));
check("Consent text verbatim", emailFile.includes("By subscribing, you agree to receive Back to Basics updates and training emails from Big Ron Jones. You can unsubscribe anytime. Read our"));
check("Invalid email error: 'Please enter a valid email address.'", emailFile.includes("Please enter a valid email address."));
check("Submission error: 'We couldn’t complete your signup. Please try again.'", emailFile.includes("We couldn’t complete your signup. Please try again."));
check("Direct subscription success message verbatim", emailFile.includes("You’re on the list. Start watching Back to Basics below."));
check("Welcome Email Subject: 'Welcome to Back to Basics with Big Ron'", emailFile.includes("Welcome to Back to Basics with Big Ron"));
check("Welcome Email Preview Text: 'Four episodes. A clear place to start.'", emailFile.includes("Four episodes. A clear place to start."));
check("Welcome Email Greeting: 'Glad you’re here.'", emailFile.includes("Glad you’re here."));

// Page 2 & 5: Footer & Exercise Note
check("Footer Exercise Note verbatim", footerFile.includes("These videos are educational. Choose exercises and loads appropriate to your experience and health. Stop if you experience pain."));
check("Footer links: YouTube, Privacy Policy, Contact", 
  footerFile.includes("YouTube") && footerFile.includes("Privacy Policy") && footerFile.includes("Contact")
);

// -------------------------------------------------------------
// Test Suite 4: BIGRONJONES® Brand Consistency
// -------------------------------------------------------------
console.log("\n[SUITE 4] BIGRONJONES® Brand Styling & Trademark Audit");

check("BrandName component exists", fs.existsSync(path.join(ROOT, "src/components/shared/BrandName.tsx")));
check("Old Glory Blue #0A3161 used across theme", homeFile.includes("#0A3161") && footerFile.includes("#0A3161"));
check("Old Glory Red / Crimson #B31942 used across theme", homeFile.includes("#B31942") && seriesFile.includes("B31942") || footerFile.includes("#B31942"));
check("Footer contains BigRonJones® background watermark", footerFile.includes("BIGRONJONES") && footerFile.includes("pointer-events-none"));
check("Tagline: 'PRACTICAL ADVICE FOR YOUR REAL WORLD GOALS.®' present", footerFile.includes("PRACTICAL ADVICE FOR YOUR REAL WORLD GOALS."));
check("Corporate Entity: 'Big Ron Jones LLC · 10845 Griffith Peak Dr, Las Vegas, NV 89135'", 
  footerFile.includes("Big Ron Jones LLC") && privacyFile.includes("10845 Griffith Peak Dr, Las Vegas, NV 89135")
);

// -------------------------------------------------------------
// Test Suite 5: Live HTTP Endpoint & Header Checks
// -------------------------------------------------------------
console.log("\n[SUITE 5] Live HTTP Endpoint & Canonical Validation");

const endpoints = [
  "/",
  "/chest-day/",
  "/back-and-shoulders/",
  "/leg-day/",
  "/arm-day/",
  "/privacy/",
  "/sitemap.xml",
  "/robots.txt"
];

function fetchEndpoint(urlPath) {
  return new Promise((resolve) => {
    http.get(`http://localhost:5180${urlPath}`, (res) => {
      let body = "";
      res.on("data", chunk => body += chunk);
      res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body }));
    }).on("error", (err) => resolve({ error: err.message }));
  });
}

for (const ep of endpoints) {
  const res = await fetchEndpoint(ep);
  check(`HTTP 200 on ${ep}`, res.status === 200, `Status: ${res.status}`);
  if (ep.endsWith(".xml")) {
    check("Sitemap XML valid schema header", res.body.includes("<urlset") && res.body.includes("</urlset>"));
  }
  if (ep === "/robots.txt") {
    check("Robots.txt allows all crawlers", res.body.includes("User-agent: *") && res.body.includes("Allow: /"));
  }
}

// -------------------------------------------------------------
// Test Suite 6: Structured Data & VideoObject Schema Validation
// -------------------------------------------------------------
console.log("\n[SUITE 6] Structured Data (JSON-LD) Validation");

const seoFile = fs.readFileSync(path.join(ROOT, "src/components/common/SEO.tsx"), "utf8");
check("SEO component generates WebSite schema", seoFile.includes('"@type": "WebSite"'));
check("SEO component generates Person schema with social profiles", seoFile.includes('"@type": "Person"') && seoFile.includes("https://thebigronjones.com"));
check("SEO component generates VideoObject schema for episodes", 
  seoFile.includes('"@type": "VideoObject"') && 
  seoFile.includes("thumbnailUrl") && 
  seoFile.includes("uploadDate") && 
  seoFile.includes("duration") && 
  seoFile.includes("embedUrl")
);
check("No YouTube watch URL labeled as video contentUrl (Google Search Central requirement)", 
  !seoFile.includes('"contentUrl": episode.videoUrl')
);

// -------------------------------------------------------------
// Test Suite 7: Accessibility (a11y) & Usability Checks
// -------------------------------------------------------------
console.log("\n[SUITE 7] Accessibility & Responsive Checks");

const appFile = fs.readFileSync(path.join(ROOT, "src/App.tsx"), "utf8");
const headerFile = fs.readFileSync(path.join(ROOT, "src/components/layout/Header.tsx"), "utf8");
const epDetailFile = fs.readFileSync(path.join(ROOT, "src/pages/EpisodeDetail.tsx"), "utf8");

check("Skip-to-main-content accessible anchor present in App.tsx", appFile.includes("Skip to main content") && appFile.includes("sr-only"));
check("Single H1 per page structure maintained on Home & Episodes", 
  homeFile.split("<h1").length === 2 && epDetailFile.split("<h1").length === 2
);
check("Form inputs have corresponding label elements with unique IDs", 
  emailFile.includes("htmlFor={emailInputId}") && emailFile.includes("id={emailInputId}")
);
check("Email input has aria-invalid and aria-describedby for errors", 
  emailFile.includes("aria-invalid=") && emailFile.includes("aria-describedby=")
);
check("YouTube iframe includes descriptive title and allowFullScreen", 
  epDetailFile.includes("allowFullScreen") && epDetailFile.includes("title=")
);
check("Mobile hamburger button has aria-expanded and aria-label", 
  headerFile.includes("aria-expanded=") && headerFile.includes("aria-label=")
);

// -------------------------------------------------------------
// Summary
// -------------------------------------------------------------
console.log("\n===================================================================");
console.log(`   END-TO-END QA TEST RESULTS: ${passed} PASSED | ${failed} FAILED`);
console.log("===================================================================\n");

if (failed === 0) {
  console.log("🎉 ALL QUALITY, COMPLIANCE, AND BRAND TESTS PASSED SUCCESSFULLY!");
  process.exit(0);
} else {
  console.error(`⚠️ FAILED TESTS (${failed}):`);
  for (const f of failures) {
    console.error(`  - ${f.testName}: ${f.details}`);
  }
  process.exit(1);
}
