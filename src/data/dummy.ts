// ── Dummy data for the promotional video ────────────────────────────────────
// Realistic fixtures that mirror the shapes the real Syncly screens consume.
// All timestamps are derived from "now" so the calendar / relative-times land
// in the current month when the video is rendered.

const NOW = Date.now();
const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

const iso = (msAgo: number) => new Date(NOW - msAgo).toISOString();
const isoIn = (msAhead: number) => new Date(NOW + msAhead).toISOString();

/** Deterministic, network-free duotone "photo" placeholder as a data URI. */
export function photo(hue: number, label = ""): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='hsl(${hue} 55% 72%)'/>
        <stop offset='1' stop-color='hsl(${(hue + 38) % 360} 52% 52%)'/>
      </linearGradient>
    </defs>
    <rect width='400' height='400' fill='url(#g)'/>
    <circle cx='300' cy='110' r='150' fill='hsl(${hue} 60% 80%)' opacity='0.25'/>
    <rect x='-40' y='250' width='300' height='300' rx='40' fill='hsl(${(hue + 38) % 360} 45% 40%)' opacity='0.22' transform='rotate(18 110 400)'/>
    ${label ? `<text x='28' y='372' font-family='sans-serif' font-size='22' fill='white' opacity='0.85'>${label}</text>` : ""}
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// ── Account / workspace ──────────────────────────────────────────────────────
export const USER = { name: "Mara Costa", email: "mara@atlasstudio.co" };
export const WORKSPACE = { name: "Atlas Studio", plan: "Free" as const };

export const INSTAGRAM_ACCOUNTS = [
  {
    id: "ig1",
    username: "atlasstudio",
    profilePictureUrl: null,
    isActive: true,
  },
];
export const FACEBOOK_PAGES = [
  {
    id: "fb1",
    pageName: "Atlas Studio",
    profilePictureUrl: null,
    isActive: true,
  },
];

export const TOTAL_UNREAD = 26;

// ── Posts (Dashboard / Posts / Schedule) ─────────────────────────────────────
export type PostStatus =
  | "PUBLISHED"
  | "SCHEDULED"
  | "DRAFT"
  | "PUBLISHING"
  | "FAILED";
export type MediaType = "IMAGE" | "CAROUSEL" | "REELS";

export interface DPost {
  id: string;
  caption: string | null;
  mediaType: MediaType;
  mediaUrls: string[];
  status: PostStatus;
  scheduledAt?: string;
  publishedAt?: string;
  createdAt: string;
  instagramAccount: { username: string };
  errorMessage?: string;
}

export const POSTS: DPost[] = [
  {
    id: "p1",
    caption: "Inside the studio — twelve pieces, one quiet morning. Swipe →",
    mediaType: "CAROUSEL",
    mediaUrls: [photo(28), photo(150), photo(265)],
    status: "PUBLISHED",
    publishedAt: iso(2 * HOUR),
    createdAt: iso(3 * HOUR),
    instagramAccount: { username: "atlasstudio" },
  },
  {
    id: "p2",
    caption: "Linen, oak, light. The new collection is live.",
    mediaType: "IMAGE",
    mediaUrls: [photo(95)],
    status: "PUBLISHED",
    publishedAt: iso(1 * DAY),
    createdAt: iso(1 * DAY + HOUR),
    instagramAccount: { username: "atlasstudio" },
  },
  {
    id: "p3",
    caption: "30 seconds with the loom. Sound on.",
    mediaType: "REELS",
    mediaUrls: [photo(200)],
    status: "PUBLISHED",
    publishedAt: iso(3 * DAY),
    createdAt: iso(3 * DAY),
    instagramAccount: { username: "atlasstudio" },
  },
  {
    id: "p4",
    caption: "Spring drop — campaign frame. Goes live this afternoon.",
    mediaType: "IMAGE",
    mediaUrls: [photo(330)],
    status: "SCHEDULED",
    scheduledAt: isoIn(6 * HOUR),
    createdAt: iso(5 * HOUR),
    instagramAccount: { username: "atlasstudio" },
  },
  {
    id: "p5",
    caption: "Behind the scenes: studio tour, long form.",
    mediaType: "REELS",
    mediaUrls: [photo(180)],
    status: "SCHEDULED",
    scheduledAt: isoIn(1 * DAY + 2 * HOUR),
    createdAt: iso(6 * HOUR),
    instagramAccount: { username: "atlasstudio" },
  },
  {
    id: "p6",
    caption: "Customer story — Atlas Studio × Hôtel Roma.",
    mediaType: "CAROUSEL",
    mediaUrls: [photo(255), photo(20)],
    status: "SCHEDULED",
    scheduledAt: isoIn(2 * DAY + 4 * HOUR),
    createdAt: iso(1 * DAY),
    instagramAccount: { username: "atlasstudio" },
  },
  {
    id: "p7",
    caption: "Soft launch — new collection teaser.",
    mediaType: "IMAGE",
    mediaUrls: [photo(60)],
    status: "SCHEDULED",
    scheduledAt: isoIn(4 * DAY + 3 * HOUR),
    createdAt: iso(1 * DAY),
    instagramAccount: { username: "atlasstudio" },
  },
  {
    id: "p8",
    caption: "Friday picks — story set.",
    mediaType: "CAROUSEL",
    mediaUrls: [photo(290)],
    status: "DRAFT",
    createdAt: iso(2 * DAY),
    instagramAccount: { username: "atlasstudio" },
  },
  {
    id: "p9",
    caption: "Hiring: Senior Designer — craft, materials, quiet detail.",
    mediaType: "IMAGE",
    mediaUrls: [],
    status: "DRAFT",
    createdAt: iso(2 * DAY),
    instagramAccount: { username: "atlasstudio" },
  },
  {
    id: "p10",
    caption: "Saturday roundup — last week in the studio.",
    mediaType: "IMAGE",
    mediaUrls: [photo(120)],
    status: "FAILED",
    createdAt: iso(4 * DAY),
    instagramAccount: { username: "atlasstudio" },
    errorMessage: "Media aspect ratio not supported — re-crop and retry.",
  },
];

// ── Inbox ────────────────────────────────────────────────────────────────────
export type AiStatus = "AI_ACTIVE" | "AI_UNRESOLVED" | "HUMAN_TAKEOVER" | null;
export type Direction = "INBOUND" | "OUTBOUND";
export type MsgType =
  | "TEXT"
  | "IMAGE"
  | "VIDEO"
  | "AUDIO"
  | "STICKER"
  | "STORY_REPLY"
  | "UNSUPPORTED";

export interface DMessage {
  id: string;
  text: string | null;
  messageType: MsgType;
  direction: Direction;
  sentAt: string;
  isRead?: boolean;
}

export interface DConversation {
  id: string;
  participantName: string | null;
  participantUsername: string | null;
  participantIgId: string;
  participantAvatar: string | null;
  instagramAccountId?: string;
  facebookPageId?: string;
  lastMessageAt: string;
  unread: number;
  aiStatus: AiStatus;
  messages: DMessage[];
}

export const PLATFORM_IG = {
  id: "instagram",
  label: "Instagram",
  color: "var(--p-instagram)",
  live: true,
};

export const CONVERSATIONS: DConversation[] = [
  {
    id: "c1",
    participantName: "Maya Rivera",
    participantUsername: "mayarivera",
    participantIgId: "ig_maya",
    participantAvatar: null,
    instagramAccountId: "ig1",
    lastMessageAt: iso(2 * MIN),
    unread: 2,
    aiStatus: "AI_ACTIVE",
    messages: [
      {
        id: "m1",
        text: "Hey! Loved the spring collection drop ✨",
        messageType: "TEXT",
        direction: "INBOUND",
        sentAt: iso(14 * MIN),
      },
      {
        id: "m2",
        text: "Do you ship to Canada?",
        messageType: "TEXT",
        direction: "INBOUND",
        sentAt: iso(13 * MIN),
      },
      {
        id: "m3",
        text: "We do! Orders land in 4–6 business days with free returns.",
        messageType: "TEXT",
        direction: "OUTBOUND",
        sentAt: iso(11 * MIN),
        isRead: true,
      },
      {
        id: "m4",
        text: "Amazing. And is the linen tote still in stock?",
        messageType: "TEXT",
        direction: "INBOUND",
        sentAt: iso(2 * MIN),
      },
    ],
  },
  {
    id: "c2",
    participantName: "Daniel Park",
    participantUsername: "danielpark",
    participantIgId: "ig_daniel",
    participantAvatar: null,
    instagramAccountId: "ig1",
    lastMessageAt: iso(18 * MIN),
    unread: 1,
    aiStatus: "AI_ACTIVE",
    messages: [
      {
        id: "m1",
        text: "When's the next launch? 👀",
        messageType: "TEXT",
        direction: "INBOUND",
        sentAt: iso(18 * MIN),
      },
    ],
  },
  {
    id: "c3",
    participantName: "Priya Shah",
    participantUsername: "priyashah.studio",
    participantIgId: "ig_priya",
    participantAvatar: null,
    instagramAccountId: "ig1",
    lastMessageAt: iso(40 * MIN),
    unread: 3,
    aiStatus: "AI_UNRESOLVED",
    messages: [
      {
        id: "m1",
        text: "We'd like to feature this in our zine — who handles press?",
        messageType: "TEXT",
        direction: "INBOUND",
        sentAt: iso(40 * MIN),
      },
    ],
  },
  {
    id: "c4",
    participantName: "Tom Chen",
    participantUsername: "tomchen",
    participantIgId: "ig_tom",
    participantAvatar: null,
    instagramAccountId: "ig1",
    lastMessageAt: iso(1 * HOUR),
    unread: 0,
    aiStatus: "HUMAN_TAKEOVER",
    messages: [
      {
        id: "m1",
        text: "Thanks, that fixed it!",
        messageType: "TEXT",
        direction: "INBOUND",
        sentAt: iso(1 * HOUR),
      },
    ],
  },
  {
    id: "c5",
    participantName: "Aria Patel",
    participantUsername: "aria.makes",
    participantIgId: "ig_aria",
    participantAvatar: null,
    instagramAccountId: "ig1",
    lastMessageAt: iso(2 * HOUR),
    unread: 0,
    aiStatus: "AI_ACTIVE",
    messages: [
      {
        id: "m1",
        text: "Is the sale still on?",
        messageType: "TEXT",
        direction: "INBOUND",
        sentAt: iso(2 * HOUR),
      },
      {
        id: "m2",
        text: "It runs through Sunday — 20% off everything 🌿",
        messageType: "TEXT",
        direction: "OUTBOUND",
        sentAt: iso(2 * HOUR - 4 * MIN),
        isRead: true,
      },
    ],
  },
  {
    id: "c6",
    participantName: "Hiroshi Watanabe",
    participantUsername: "hwatanabe",
    participantIgId: "ig_hiro",
    participantAvatar: null,
    instagramAccountId: "ig1",
    lastMessageAt: iso(3 * HOUR),
    unread: 0,
    aiStatus: null,
    messages: [
      {
        id: "m1",
        text: "Sharing the brief now — let me know what you think.",
        messageType: "TEXT",
        direction: "INBOUND",
        sentAt: iso(3 * HOUR),
      },
    ],
  },
];

/** The AI-generated reply that types out during the Inbox scene. */
export const AI_REPLY =
  "Yes — the linen tote is back in stock in both natural and slate. Want me to hold one for you? 🌿";

// ── AI Knowledge Base (Settings) ─────────────────────────────────────────────
export interface KbEntry {
  id: string;
  label: string;
  type: "file" | "text";
  chunks: number;
  status: "Ready" | "Processing" | "Failed";
  createdAt: string;
}

export const KB_ENTRIES: KbEntry[] = [
  {
    id: "k1",
    label: "Shipping & returns policy.pdf",
    type: "file",
    chunks: 14,
    status: "Ready",
    createdAt: iso(5 * DAY),
  },
  {
    id: "k2",
    label: "Product care & materials",
    type: "text",
    chunks: 8,
    status: "Ready",
    createdAt: iso(5 * DAY),
  },
  {
    id: "k3",
    label: "FAQ — sizing and fit",
    type: "text",
    chunks: 11,
    status: "Ready",
    createdAt: iso(4 * DAY),
  },
  {
    id: "k4",
    label: "Wholesale & press kit.pdf",
    type: "file",
    chunks: 6,
    status: "Processing",
    createdAt: iso(20 * MIN),
  },
];

export interface LearnedQa {
  id: string;
  q: string;
  a: string;
  learnedAt: string;
}

export const LEARNED_QA: LearnedQa[] = [
  {
    id: "l1",
    q: "Do you offer gift wrapping?",
    a: "Yes — gift wrapping is free and added automatically at checkout.",
    learnedAt: iso(2 * DAY),
  },
  {
    id: "l2",
    q: "Can I change my shipping address after ordering?",
    a: "Within 2 hours of ordering — just reply here and we'll update it.",
    learnedAt: iso(3 * DAY),
  },
];
