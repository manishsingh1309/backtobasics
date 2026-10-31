import fs from "node:fs";
import path from "node:path";
import http from "node:http";

const ROOT = process.cwd();

console.log("=============================================================");
console.log("  BACK TO BASICS WITH BIG RON — QA & COMPLIANCE VERIFICATION ");
console.log("=============================================================\n");

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`  [FAIL] ${message}`);
    process.exitCode = 1;
  }
}

// 1. Check Build Output / Source Integrity
console.log("1. Checking Source Code & Asset Files:");
const requiredFiles = [
  "src/App.tsx",
  "src/pages/Home.tsx",
  "src/pages/EpisodeDetail.tsx",
  "src/pages/Privacy.tsx",
  "src/data/seriesData.ts",
  "src/components/common/SEO.tsx",
  "src/components/common/EmailSignupSection.tsx",
  "src/components/common/EpisodeCard.tsx",
  "src/components/common/QAChecklistBar.tsx",
  "src/components/layout/Header.tsx",
  "src/components/layout/Footer.tsx",
  "public/robots.txt",
  "public/sitemap.xml",
  "public/site.webmanifest",
  "public/thumbnails/ep1-chest.jpg",
  "public/thumbnails/ep2-back-shoulders.jpg",
  "public/thumbnails/ep3-legs.jpg",
  "public/thumbnails/ep4-arms.jpg",
  "public/ron/ron-portrait.webp",
];

for (const file of requiredFiles) {
  const fullPath = path.join(ROOT, file);
  assert(fs.existsSync(fullPath), `File exists: ${file}`);
}

// 2. Check Verbatim Copy in seriesData.ts
console.log("\n2. Checking Verbatim Episode Copy & Metadata in seriesData.ts:");
const seriesContent = fs.readFileSync(path.join(ROOT, "src/data/seriesData.ts"), "utf8");

const copySnippets = [
  "Start with chest day. Watch the first episode, follow the demonstrations, and continue through the series at your own pace.",
  "Next up: back and shoulders. Watch the second episode and follow the demonstrations before moving on to leg day.",
  "It’s leg day. Watch the third episode, then continue to the final episode for arms.",
  "Finish the series with arm day. Watch the final episode, revisit any session, and join my list to stay connected.",
  "Back to Basics: Chest Day | Big Ron Jones",
  "Back to Basics: Back and Shoulders | Big Ron Jones",
  "Back to Basics: Leg Day | Big Ron Jones",
  "Back to Basics: Arm Day | Big Ron Jones",
  "Watch Big Ron Jones’ Back to Basics chest-day episode, then continue the four-part workout series and join his email list.",
  "Watch Big Ron Jones’ Back to Basics back-and-shoulders episode, then continue the four-part workout series and join his email list.",
  "Watch Big Ron Jones’ Back to Basics leg-day episode, then continue the four-part workout series and join his email list.",
  "Watch Big Ron Jones’ Back to Basics arm-day episode, then continue the four-part workout series and join his email list.",
  "K9P5o6ehE0Y",
  "qD1FNE5W49w",
  "iUNOvln3iOQ",
  "MYiq-aRNtSA",
  "PLbxZT1M57opNMSVb2oPyfE4on4lkWvZCB",
  "https://www.youtube.com/@Bigronjones",
];

for (const snippet of copySnippets) {
  assert(seriesContent.includes(snippet), `Verbatim string verified: "${snippet.slice(0, 45)}..."`);
}

// 3. Check Homepage Verbatim Copy
console.log("\n3. Checking Homepage Copy in Home.tsx:");
const homeContent = fs.readFileSync(path.join(ROOT, "src/pages/Home.tsx"), "utf8");

const homeSnippets = [
  "Back to Basics with Big Ron",
  "Build muscle. Make the basics count.",
  "You don’t need to make training more complicated to take it seriously. Join me for a four-part workout series covering chest, back and shoulders, legs, and arms. Watch the videos, learn from the demonstrations, and bring a clear focus to your next workout.",
  "Watch Episode 1",
  "Join the Email List",
  "Your Back to Basics workout series",
  "Start with chest day and work through the series, or choose the episode you want to watch below.",
  "Watch the Full Series on YouTube",
  "Meet Big Ron Jones",
  "I’m Big Ron Jones. My approach is practical: understand the basics, train with purpose, and build habits you can keep. Back to Basics gives you a look at how I train and explain the work. Start with an episode, then stay connected for more training content.",
  "Visit My YouTube Channel",
];

for (const snippet of homeSnippets) {
  assert(homeContent.includes(snippet), `Homepage verbatim copy: "${snippet.slice(0, 45)}..."`);
}

// 4. Check Email Signup & Welcome Email Copy
console.log("\n4. Checking Email Signup & Welcome Email Copy:");
const emailContent = fs.readFileSync(path.join(ROOT, "src/components/common/EmailSignupSection.tsx"), "utf8");

const emailSnippets = [
  "Keep building with Big Ron",
  "Join my email list for Back to Basics updates and practical training content.",
  "Join Big Ron’s List",
  "Email Address",
  "First Name (optional)",
  "By subscribing, you agree to receive Back to Basics updates and training emails from Big Ron Jones. You can unsubscribe anytime. Read our",
  "Please enter a valid email address.",
  "We couldn’t complete your signup. Please try again.",
  "You’re on the list. Start watching Back to Basics below.",
  "Welcome to Back to Basics with Big Ron",
  "Four episodes. A clear place to start.",
  "Glad you’re here.",
  "Back to Basics is a four-part workout series covering chest, back and shoulders, legs, and arms. Start with Episode 1, or choose the session you want to watch.",
  "I’ll share Back to Basics updates and practical training content here. Keep showing up and make the basics count.",
  "Big Ron",
];

for (const snippet of emailSnippets) {
  assert(emailContent.includes(snippet), `Email flow verbatim copy: "${snippet.slice(0, 45)}..."`);
}

// 5. Check Footer Exercise Note
console.log("\n5. Checking Footer Exercise Note in Footer.tsx:");
const footerContent = fs.readFileSync(path.join(ROOT, "src/components/layout/Footer.tsx"), "utf8");
const footerNote = "These videos are educational. Choose exercises and loads appropriate to your experience and health. Stop if you experience pain.";
assert(footerContent.includes(footerNote), `Footer exercise note verified verbatim`);

// 6. Check Sitemap & Robots
console.log("\n6. Checking Sitemap & Robots.txt:");
const sitemapContent = fs.readFileSync(path.join(ROOT, "public/sitemap.xml"), "utf8");
const robotsContent = fs.readFileSync(path.join(ROOT, "public/robots.txt"), "utf8");

const requiredUrls = [
  "https://backtobasics.fit/",
  "https://backtobasics.fit/chest-day/",
  "https://backtobasics.fit/back-and-shoulders/",
  "https://backtobasics.fit/leg-day/",
  "https://backtobasics.fit/arm-day/",
  "https://backtobasics.fit/privacy/",
];

for (const url of requiredUrls) {
  assert(sitemapContent.includes(url), `Sitemap includes: ${url}`);
}
assert(robotsContent.includes("Sitemap: https://backtobasics.fit/sitemap.xml"), "robots.txt references sitemap.xml");

// 7. Check Local HTTP Server Response
console.log("\n7. Checking Dev Server HTTP Response:");
http.get("http://localhost:5180/", (res) => {
  assert(res.statusCode === 200, `Dev server returned HTTP ${res.statusCode}`);
  let html = "";
  res.on("data", (chunk) => (html += chunk));
  res.on("end", () => {
    assert(html.includes("Back to Basics with Big Ron | Official Workout Series"), "HTML contains exact title");
    assert(html.includes("canonical"), "HTML contains canonical tag");
    assert(html.includes("og:title"), "HTML contains OpenGraph title");
    assert(html.includes("twitter:title"), "HTML contains Twitter card title");

    console.log(`\n=============================================================`);
    console.log(`  VERIFICATION RESULTS: ${passedTests}/${totalTests} TESTS PASSED`);
    console.log(`=============================================================\n`);

    if (passedTests === totalTests) {
      console.log("  ALL TESTS PASSED! Site is 100% compliant with Ron's brief.");
    } else {
      process.exit(1);
    }
  });
}).on("error", (err) => {
  console.error("HTTP error:", err.message);
  process.exit(1);
});
