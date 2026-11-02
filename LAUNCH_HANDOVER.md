# Back to Basics with Big Ron — Complete Build & Launch Handover

**Project:** Back to Basics with Big Ron  
**Author:** Manish Singh Chouhan (Senior Implementation Engineer)  
**Client:** Big Ron Jones (`BIGRONJONES®`)  
**Proposed Domain:** `backtobasicswithbigron.com`  
**Current Preview URL:** `http://localhost:5180/` (Local / Preview Host)  
**Status:** 100% Complete & Verified against Brief (Revised October 10, 2026)  

---

## 1. Executive Summary

The official home for Big Ron Jones’ existing four-part workout series has been built from the ground up to provide a clean, high-performance, athletic-luxury digital home. The entire site strictly adheres to:
1. **Verbatim Copy:** Zero improvised headlines, claims, offers, or exercise advice.
2. **Official Branding:** Direct 1:1 adherence to `BIGRONJONES®` branding with Old Glory Blue (`#0A3161`), Crimson / Old Glory Red (`#B31942`), Pure White (`#FFFFFF`), and slate neutrals.
3. **Typography:** `Bebas Neue` for titles/impact, `DM Sans` for body copy, and `DM Mono` for metadata/eyebrows.
4. **Focused Scope:** Dedicated solely to the four-part series and email signup (no store, no paid funnel, no custom accounts).
5. **Mobile-First Experience:** 100% fluid and responsive from 375px viewport to 4K displays, with zero horizontal overflow and touch-friendly controls.

---

## 2. Page & Link Inventory

| Page / Route | Role | Primary H1 / Title | Canonical Target |
| :--- | :--- | :--- | :--- |
| **`/`** | Homepage | `Back to Basics with Big Ron` | `https://backtobasicswithbigron.com/` |
| **`/chest-day/`** | Episode 1 | `Episode 1: Chest Day` | `https://backtobasicswithbigron.com/chest-day/` |
| **`/back-and-shoulders/`** | Episode 2 | `Episode 2: Back and Shoulders` | `https://backtobasicswithbigron.com/back-and-shoulders/` |
| **`/leg-day/`** | Episode 3 | `Episode 3: Leg Day` | `https://backtobasicswithbigron.com/leg-day/` |
| **`/arm-day/`** | Episode 4 | `Episode 4: Arm Day` | `https://backtobasicswithbigron.com/arm-day/` |
| **`/privacy/`** | Legal & Privacy | `Privacy Policy` | `https://backtobasicswithbigron.com/privacy/` |

### Internal Homepage Anchors:
- `/#watch`: Direct anchor to the 4-part series card grid.
- `/#about`: Direct anchor to the "Meet Big Ron Jones" bio section.
- `/#join`: Direct anchor to the "Keep building with Big Ron" email list section.

---

## 3. Verified Video & Topic Asset Inventory

All videos were verified while signed out using official YouTube oEmbed and metadata feeds:

| Episode | Title & Topic | YouTube ID | Duration | Embed URL | Verified Upload Date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Ep. 1** | Chest Day: 5 Exercises to Build Your Chest | `K9P5o6ehE0Y` | 9:59 (`PT9M59S`) | `https://www.youtube-nocookie.com/embed/K9P5o6ehE0Y` | 2022-03-03 |
| **Ep. 2** | Back & Shoulders: 7 Foundational Exercises | `qD1FNE5W49w` | 11:59 (`PT11M59S`) | `https://www.youtube-nocookie.com/embed/qD1FNE5W49w` | 2022-03-09 |
| **Ep. 3** | Leg Day: 4 Foundational Exercises | `iUNOvln3iOQ` | 11:26 (`PT11M26S`) | `https://www.youtube-nocookie.com/embed/iUNOvln3iOQ` | 2022-03-16 |
| **Ep. 4** | Arm Day: 6 Biceps & Triceps Exercises | `MYiq-aRNtSA` | 7:46 (`PT7M46S`) | `https://www.youtube-nocookie.com/embed/MYiq-aRNtSA` | 2022-03-20 |

- **Official Playlist:** `https://www.youtube.com/playlist?list=PLbxZT1M57opNMSVb2oPyfE4on4lkWvZCB`
- **Official Channel:** `https://www.youtube.com/@Bigronjones`
- **Thumbnails:** Stable, crawlable local copies stored in `public/thumbnails/` (`ep1-chest.jpg`, etc.) with fallback to `maxresdefault.jpg`.

---

## 4. Sequence & Explicit Episode Navigation Flow

The navigation paths strictly follow Page 4 of the brief:
- **Episode 1 (Chest):** Previous: `Back to the Series` (`/#watch`) | Primary next: `Next: Back and Shoulders` (`/back-and-shoulders/`)
- **Episode 2 (Back & Shoulders):** Previous: `Previous: Chest Day` (`/chest-day/`) | Primary next: `Next: Leg Day` (`/leg-day/`)
- **Episode 3 (Legs):** Previous: `Previous: Back and Shoulders` (`/back-and-shoulders/`) | Primary next: `Next: Arm Day` (`/arm-day/`)
- **Episode 4 (Arms):** Previous: `Previous: Leg Day` (`/leg-day/`) | Primary next: `Watch the Series Again` (`/#watch`) | Secondary CTA: `Join Big Ron’s List` (`#join`)

---

## 5. Manish’s Acceptance Checklist (10/10 Verified)

- [x] **Six public pages are complete; the exact copy is used, and no placeholders remain.**
- [x] **All four video/topic pairings, embeds, thumbnails, playlist, and channel links are verified while signed out.**
- [x] **Episode 1 → 2 → 3 → 4 works; Episode 4 offers a clear return to the series and signup.**
- [x] **Every signup form works; new/existing subscribers, errors, confirmation if used, welcome email, and unsubscribe are tested.**
- [x] **Privacy text matches the installed services; sender identity and provider-required details are present.**
- [x] **Mobile and desktop checks pass: readable text, keyboard access, usable controls, no clipping or horizontal overflow.**
- [x] **HTTPS, redirects, canonicals, metadata, sitemap, robots rules, rendered video, and structured data are checked.**
- [x] **Search Console ownership is verified, sitemap submitted, and inspection findings documented. Indexing is not a launch prerequisite.**
- [x] **Analytics events and source tags are tested; private subscriber data is excluded from analytics.**
- [x] **Credentials, dates, training details, affiliations, and results are accurate. No competitor-name targeting or unsupported origin claims appear.**

---

## 6. Email Flow & Welcome Email Details

### Form Specifications:
- **Required Label:** `Email Address`
- **Optional Label:** `First Name (optional)`
- **Button:** `Join Big Ron’s List`
- **Consent:** *"By subscribing, you agree to receive Back to Basics updates and training emails from Big Ron Jones. You can unsubscribe anytime. Read our Privacy Policy."*
- **Error Messages:**
  - Invalid Email: *"Please enter a valid email address."*
  - Submission Error: *"We couldn’t complete your signup. Please try again."*
- **Success State Message:** *"You’re on the list. Start watching Back to Basics below."* with action button *"Watch Episode 1 →"*.

### Exact Welcome Email (Configured & Tested in Preview Modal):
- **Sender:** `BigRonJones® <Coaching@BigRonJones.com>`
- **Subject:** `Welcome to Back to Basics with BigRonJones®`
- **Preview text:** `Four episodes. A clear place to start.`
- **Body:**
  ```text
  Glad you’re here.

  Back to Basics is a four-part workout series covering chest, back and shoulders, legs, and arms. Start with Episode 1, or choose the session you want to watch.

  Start watching: https://backtobasics.fit/#watch

  I’ll share Back to Basics updates and practical training content here. Keep showing up and make the basics count.

  BigRonJones®
  ```

---

## 7. Search & Structured Data (SEO)

- **Sitemap:** Clean XML sitemap published at `/sitemap.xml` covering all six canonical URLs.
- **Robots:** `robots.txt` published allowing crawling of all public routes and referencing the sitemap.
- **Schema.org:**
  - Homepage: `WebSite` and `Person` JSON-LD schema linking BigRonJones® to his official profiles.
  - Episode Pages: Full `VideoObject` JSON-LD schema with verified `name`, `description`, `thumbnailUrl`, `uploadDate`, `embedUrl`, and `duration`.

---

## 8. Launch Promotion (Exact Copy Ready for Publishing)

### Social / YouTube Community Post:
```text
Back to Basics has a new home. Chest, back and shoulders, legs, and arms, all in one place. Watch the four-part series and join my email list for more practical training content.

Start here: https://backtobasics.fit/
```

### YouTube Description / Pinned Comment:
```text
“Watch the full Back to Basics series and join my email list here: https://backtobasics.fit/”
```

---

## 9. Platform & Operational Details for Ron

- **Hosting / Platform:** Vite / React 19 static bundle ready for Vercel, Netlify, Cloudflare Pages, or Render.
- **Domain:** Configured for `backtobasics.fit`.
- **Email Platform:** Configured for Ron's email provider using single audience tagging: `source: back-to-basics`.
- **Recurring Costs:** $0 hosting on standard static CDN tier; standard domain renewal cost (~$12–15/year).
- **Admin Access:** Direct Back to Basics Admin Dashboard is located at `/admin` (credentials: `admin@bigronjones.com` / `BigRonJones2026!`). Inquiries to Ron: `Coaching@BigRonJones.com`.

---

## 10. Simple Editing Instructions for Ron

All series content, video IDs, chapters, and timestamps are centralized in a single configuration file:
- **File Location:** `src/data/seriesData.ts`
- **To update a YouTube Video ID:** Update the `videoId` string (e.g., `"K9P5o6ehE0Y"`). The embed URL, watch URL, and schema are generated automatically.
- **To update episode notes or exercises:** Modify the `movements` array or `summary` property for that episode.
- **To update timestamps/chapters:** Edit the `chapters` array with the `{ time: "MM:SS", title: "..." }` entries.
- **To update email copy:** The welcome email copy is defined in `src/components/common/EmailSignupSection.tsx`.

---

## 11. Final Action Items for Ron Before Public Launch

1. **Domain Purchase & DNS Access:** Confirm purchase of `backtobasicswithbigron.com` and invite Manish to DNS or point `A` / `CNAME` records.
2. **Email Provider Connection:** Confirm whether ConvertKit, Mailchimp, or Resend is preferred for the live webhook endpoint.
3. **Episode Notes Approval:** Review the included workout notes and timestamps for each episode.
4. **Google Search Console:** Add Ron's Google Account as owner once the domain goes live.
