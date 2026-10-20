export interface Chapter {
  time: string;
  title: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Episode {
  id: number;
  slug: string;
  path: string;
  title: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  videoId: string;
  videoUrl: string;
  embedUrl: string;
  uploadDate: string;
  durationIso: string;
  durationFormatted: string;
  thumbnail: string;
  previousLink: NavLink;
  nextLink: NavLink;
  alsoShowsJoinList?: boolean;
  movements: string[];
  chapters: Chapter[];
  summary: string;
}

export const PLAYLIST_URL =
  "https://www.youtube.com/playlist?list=PLbxZT1M57opNMSVb2oPyfE4on4lkWvZCB";
export const CHANNEL_URL = "https://www.youtube.com/@Bigronjones";

export const EPISODES: Episode[] = [
  {
    id: 1,
    slug: "chest-day",
    path: "/chest-day/",
    title: "Episode 1: Chest Day",
    h1: "Episode 1: Chest Day",
    seoTitle: "Back to Basics: Chest Day | Big Ron Jones",
    seoDescription:
      "Watch Big Ron Jones’ Back to Basics chest-day episode, then continue the four-part workout series and join his email list.",
    intro:
      "Start with chest day. Watch the first episode, follow the demonstrations, and continue through the series at your own pace.",
    videoId: "K9P5o6ehE0Y",
    videoUrl: "https://www.youtube.com/watch?v=K9P5o6ehE0Y",
    embedUrl: "https://www.youtube-nocookie.com/embed/K9P5o6ehE0Y",
    uploadDate: "2022-03-03T14:07:15-08:00",
    durationIso: "PT9M59S",
    durationFormatted: "9:59",
    thumbnail: "/thumbnails/ep1-chest.jpg",
    previousLink: {
      label: "Back to the Series",
      href: "/#watch",
    },
    nextLink: {
      label: "Next: Back and Shoulders",
      href: "/back-and-shoulders/",
    },
    movements: [
      "Incline barbell press",
      "Flat barbell press",
      "Incline dumbbell press",
      "Flat dumbbell press",
      "Cable fly",
    ],
    chapters: [
      { time: "00:00", title: "Build your chest-training foundation" },
      { time: "01:34", title: "Incline barbell press: setup and grip" },
      { time: "03:09", title: "Flat barbell press: reps and progression" },
      { time: "05:31", title: "Incline dumbbell press" },
      { time: "06:24", title: "Flat dumbbell press" },
      { time: "07:40", title: "Cable fly: avoid going too wide" },
      { time: "09:19", title: "The Big Five recap" },
    ],
    summary:
      "Build your chest-training foundation with Big Ron Jones’ Big Five: five barbell, dumbbell, and cable exercises explained step by step, covering incline and flat presses, exercise setup, and a common cable-fly mistake.",
  },
  {
    id: 2,
    slug: "back-and-shoulders",
    path: "/back-and-shoulders/",
    title: "Episode 2: Back and Shoulders",
    h1: "Episode 2: Back and Shoulders",
    seoTitle: "Back to Basics: Back and Shoulders | Big Ron Jones",
    seoDescription:
      "Watch Big Ron Jones’ Back to Basics back-and-shoulders episode, then continue the four-part workout series and join his email list.",
    intro:
      "Next up: back and shoulders. Watch the second episode and follow the demonstrations before moving on to leg day.",
    videoId: "qD1FNE5W49w",
    videoUrl: "https://www.youtube.com/watch?v=qD1FNE5W49w",
    embedUrl: "https://www.youtube-nocookie.com/embed/qD1FNE5W49w",
    uploadDate: "2022-03-09T09:10:54-08:00",
    durationIso: "PT11M59S",
    durationFormatted: "11:59",
    thumbnail: "/thumbnails/ep2-back-shoulders.jpg",
    previousLink: {
      label: "Previous: Chest Day",
      href: "/chest-day/",
    },
    nextLink: {
      label: "Next: Leg Day",
      href: "/leg-day/",
    },
    movements: [
      "Seated cable row",
      "Lat pulldown",
      "Machine row",
      "Rear-delt machine fly",
      "Seated dumbbell lateral raise",
      "Seated dumbbell front raise",
      "Machine overhead press",
    ],
    chapters: [
      { time: "00:00", title: "Build your back-and-shoulder foundation" },
      { time: "01:09", title: "Seated cable row" },
      { time: "02:26", title: "Lat pulldown: grip and setup" },
      { time: "03:25", title: "Lat pulldown: torso position" },
      { time: "04:04", title: "Machine row" },
      { time: "05:21", title: "Rear delts: why I train them first" },
      { time: "06:54", title: "Seated dumbbell lateral raise" },
      { time: "08:34", title: "Seated dumbbell front raise" },
      { time: "09:43", title: "Machine overhead press" },
      { time: "11:26", title: "Workout recap and recovery" },
    ],
    summary:
      "Build your back-and-shoulder training foundation with Big Ron Jones: seven exercises covering rows, lat pulldowns, rear delts, raises, and an overhead press, focusing on muscle engagement and proper setup.",
  },
  {
    id: 3,
    slug: "leg-day",
    path: "/leg-day/",
    title: "Episode 3: Leg Day",
    h1: "Episode 3: Leg Day",
    seoTitle: "Back to Basics: Leg Day | Big Ron Jones",
    seoDescription:
      "Watch Big Ron Jones’ Back to Basics leg-day episode, then continue the four-part workout series and join his email list.",
    intro:
      "It’s leg day. Watch the third episode, then continue to the final episode for arms.",
    videoId: "iUNOvln3iOQ",
    videoUrl: "https://www.youtube.com/watch?v=iUNOvln3iOQ",
    embedUrl: "https://www.youtube-nocookie.com/embed/iUNOvln3iOQ",
    uploadDate: "2022-03-16T05:19:48-07:00",
    durationIso: "PT11M26S",
    durationFormatted: "11:26",
    thumbnail: "/thumbnails/ep3-legs.jpg",
    previousLink: {
      label: "Previous: Back and Shoulders",
      href: "/back-and-shoulders/",
    },
    nextLink: {
      label: "Next: Arm Day",
      href: "/arm-day/",
    },
    movements: [
      "Hamstring curl",
      "Leg press",
      "Leg extension",
      "Standing calf raise",
    ],
    chapters: [
      { time: "00:00", title: "Introduction to leg day" },
      { time: "01:15", title: "Hamstring curls" },
      { time: "02:40", title: "Hamstring curl machine variations" },
      { time: "03:13", title: "Leg press: machine and seat setup" },
      { time: "04:35", title: "Leg press: foot position" },
      { time: "05:37", title: "Leg extensions" },
      { time: "07:02", title: "Leg extension technique discussion" },
      { time: "08:10", title: "Calf development discussion" },
      { time: "09:23", title: "Standing calf raises" },
      { time: "10:15", title: "Leg-day recap" },
    ],
    summary:
      "Build your leg-training foundation with Big Ron Jones: machine-based workout covering hamstring curls, leg presses, leg extensions, and standing calf raises with setup and foot position details.",
  },
  {
    id: 4,
    slug: "arm-day",
    path: "/arm-day/",
    title: "Episode 4: Arm Day",
    h1: "Episode 4: Arm Day",
    seoTitle: "Back to Basics: Arm Day | Big Ron Jones",
    seoDescription:
      "Watch Big Ron Jones’ Back to Basics arm-day episode, then continue the four-part workout series and join his email list.",
    intro:
      "Finish the series with arm day. Watch the final episode, revisit any session, and join my list to stay connected.",
    videoId: "MYiq-aRNtSA",
    videoUrl: "https://www.youtube.com/watch?v=MYiq-aRNtSA",
    embedUrl: "https://www.youtube-nocookie.com/embed/MYiq-aRNtSA",
    uploadDate: "2022-03-20T19:25:03-07:00",
    durationIso: "PT7M46S",
    durationFormatted: "7:46",
    thumbnail: "/thumbnails/ep4-arms.jpg",
    previousLink: {
      label: "Previous: Leg Day",
      href: "/leg-day/",
    },
    nextLink: {
      label: "Watch the Series Again",
      href: "/#watch",
    },
    alsoShowsJoinList: true,
    movements: [
      "Standing barbell curl",
      "Seated dumbbell curl",
      "Concentration hammer curl",
      "V-bar triceps pushdown",
      "Single-arm underhand triceps pushdown",
      "Overhead rope triceps extension",
    ],
    chapters: [
      { time: "00:00", title: "Arm day: standing barbell curls" },
      { time: "01:04", title: "Barbell curls: progressing the weight" },
      { time: "01:34", title: "Seated dumbbell curls" },
      { time: "03:04", title: "Concentration hammer curls" },
      { time: "03:46", title: "Cable triceps work: V-bar pushdown" },
      { time: "05:18", title: "Single-arm underhand triceps pushdown" },
      { time: "06:10", title: "Overhead rope triceps extension" },
      { time: "07:05", title: "Overhead extension: keep the handles apart" },
      { time: "07:26", title: "Four-day series wrap-up" },
    ],
    summary:
      "Complete the Back to Basics series with arm day: three biceps movements and three cable triceps movements explained step by step, covering grip, weight progression, and movement control.",
  },
];
