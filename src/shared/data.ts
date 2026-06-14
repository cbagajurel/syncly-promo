export type PlatformId = "facebook" | "instagram" | "whatsapp" | "linkedin";

export interface Platform {
  id: PlatformId;
  name: string;
  color: string;
}

export const PLATFORMS: Platform[] = [
  { id: "facebook", name: "Facebook", color: "var(--p-facebook)" },
  { id: "instagram", name: "Instagram", color: "var(--p-instagram)" },
  { id: "whatsapp", name: "WhatsApp", color: "var(--p-whatsapp)" },
  { id: "linkedin", name: "LinkedIn", color: "var(--p-linkedin)" },
];

export const PLATFORM_BY_ID: Record<PlatformId, Platform> = Object.fromEntries(
  PLATFORMS.map((p) => [p.id, p]),
) as Record<PlatformId, Platform>;

export interface PlatformOverview {
  id: PlatformId;
  unread: number;
  messagesToday: number;
  posts: number;
  status: string;
  trend: number[];
}

export const PLATFORM_OVERVIEW: PlatformOverview[] = [
  {
    id: "facebook",
    unread: 12,
    messagesToday: 84,
    posts: 3,
    status: "Connected",
    trend: [4, 6, 5, 7, 8, 7, 9, 11, 10, 12],
  },
  {
    id: "instagram",
    unread: 7,
    messagesToday: 156,
    posts: 5,
    status: "Connected",
    trend: [10, 11, 9, 12, 15, 14, 16, 18, 17, 19],
  },
  {
    id: "whatsapp",
    unread: 23,
    messagesToday: 312,
    posts: 0,
    status: "Connected",
    trend: [22, 24, 21, 28, 30, 27, 33, 31, 35, 38],
  },
  {
    id: "linkedin",
    unread: 4,
    messagesToday: 28,
    posts: 2,
    status: "Connected",
    trend: [3, 4, 2, 5, 4, 6, 7, 5, 6, 8],
  },
];

export interface Message {
  from: "me" | "them";
  at: string;
  text: string;
}

export interface Conversation {
  id: string;
  platform: PlatformId;
  name: string;
  handle: string;
  avatar: string;
  unread: number;
  starred?: boolean;
  lastAt: string;
  preview: string;
  thread: Message[];
}

export const CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    platform: "whatsapp",
    name: "Maya Lindqvist",
    handle: "+46 70 555 0142",
    avatar: "ML",
    unread: 2,
    starred: true,
    lastAt: "2m",
    preview: "Could you confirm the shipping address for the order?",
    thread: [
      {
        from: "them",
        at: "10:42",
        text: "Hi! Just placed order #4821 — the gift wrap option didn't appear at checkout.",
      },
      {
        from: "them",
        at: "10:42",
        text: "Could you confirm the shipping address for the order?",
      },
      {
        from: "me",
        at: "10:48",
        text: "Hi Maya, I can see the order. Gift wrapping is added on our end, no extra step needed.",
      },
      {
        from: "them",
        at: "10:51",
        text: "Perfect, thank you. One more thing can it arrive by Friday?",
      },
    ],
  },
  {
    id: "c2",
    platform: "instagram",
    name: "Daniel Park",
    handle: "@danielpark",
    avatar: "DP",
    unread: 1,
    lastAt: "11m",
    preview: "Loved the new collection drop ↩ when's the next launch?",
    thread: [
      {
        from: "them",
        at: "10:31",
        text: "Loved the new collection drop ↩ when's the next launch?",
      },
    ],
  },
  {
    id: "c3",
    platform: "linkedin",
    name: "Yuki Tanaka",
    handle: "Head of Partnerships, Northwind",
    avatar: "YT",
    unread: 0,
    lastAt: "34m",
    preview: "Thanks for the intro — looping in our team on Thursday.",
    thread: [
      {
        from: "them",
        at: "09:55",
        text: "Thanks for the intro — looping in our team on Thursday.",
      },
      {
        from: "me",
        at: "10:08",
        text: "Sounds good. I'll send a calendar hold for 2pm.",
      },
    ],
  },
  {
    id: "c4",
    platform: "facebook",
    name: "Atlas Studio",
    handle: "Page mention",
    avatar: "AS",
    unread: 0,
    lastAt: "1h",
    preview: "We featured you in our weekly roundup ✦",
    thread: [
      {
        from: "them",
        at: "09:14",
        text: "We featured you in our weekly roundup ✦",
      },
    ],
  },
  {
    id: "c5",
    platform: "whatsapp",
    name: "Customer Support — Felix",
    handle: "+1 415 555 0119",
    avatar: "F",
    unread: 0,
    lastAt: "2h",
    preview: "Refund processed. Receipt sent.",
    thread: [
      { from: "me", at: "08:01", text: "Refund processed. Receipt sent." },
    ],
  },
  {
    id: "c6",
    platform: "instagram",
    name: "Priya Shah",
    handle: "@priyashah.studio",
    avatar: "PS",
    unread: 3,
    lastAt: "3h",
    preview: "We'd like to feature this in our zine — DM for details.",
    thread: [
      {
        from: "them",
        at: "07:22",
        text: "We'd like to feature this in our zine — DM for details.",
      },
    ],
  },
  {
    id: "c7",
    platform: "linkedin",
    name: "Hiroshi Watanabe",
    handle: "Director, Form & Function",
    avatar: "HW",
    unread: 0,
    lastAt: "Yesterday",
    preview: "Sharing the brief now — let me know what you think.",
    thread: [
      {
        from: "them",
        at: "Yesterday",
        text: "Sharing the brief now — let me know what you think.",
      },
    ],
  },
  {
    id: "c8",
    platform: "facebook",
    name: "Mariana Costa",
    handle: "Messenger",
    avatar: "MC",
    unread: 0,
    lastAt: "Yesterday",
    preview: "Got it — appreciate the quick turnaround!",
    thread: [
      {
        from: "them",
        at: "Yesterday",
        text: "Got it — appreciate the quick turnaround!",
      },
    ],
  },
];

export interface ScheduledPost {
  id: string;
  platform: PlatformId;
  day: number;
  hour: number;
  title: string;
  status: "queued" | "draft";
}

export const SCHEDULED_POSTS: ScheduledPost[] = [
  {
    id: "p1",
    platform: "instagram",
    day: 1,
    hour: 9,
    title: "Spring drop — carousel #2",
    status: "queued",
  },
  {
    id: "p2",
    platform: "facebook",
    day: 1,
    hour: 14,
    title: "Behind the scenes: studio tour",
    status: "queued",
  },
  {
    id: "p3",
    platform: "linkedin",
    day: 2,
    hour: 10,
    title: "Customer story — Atlas Studio",
    status: "queued",
  },
  {
    id: "p4",
    platform: "instagram",
    day: 3,
    hour: 11,
    title: "Reel: how we make it",
    status: "draft",
  },
  {
    id: "p5",
    platform: "whatsapp",
    day: 3,
    hour: 15,
    title: "Status update for VIP list",
    status: "queued",
  },
  {
    id: "p6",
    platform: "facebook",
    day: 4,
    hour: 12,
    title: "New collection — soft launch",
    status: "queued",
  },
  {
    id: "p7",
    platform: "instagram",
    day: 5,
    hour: 9,
    title: "Friday picks — story set",
    status: "queued",
  },
  {
    id: "p8",
    platform: "linkedin",
    day: 5,
    hour: 16,
    title: "Hiring: Senior Designer",
    status: "draft",
  },
  {
    id: "p9",
    platform: "instagram",
    day: 6,
    hour: 10,
    title: "Saturday roundup",
    status: "queued",
  },
];

export type PostStatus = "live" | "scheduled";
export type PostType =
  | "image"
  | "carousel"
  | "video"
  | "reel"
  | "text"
  | "link";

export interface RecentPost {
  id: string;
  platform: PlatformId;
  type: PostType;
  slides?: number;
  duration?: string;
  domain?: string;
  title: string;
  excerpt: string;
  when: string;
  whenAbs: string;
  impressions: number;
  engagement: number;
  comments: number;
  shares: number;
  status: PostStatus;
}

export const RECENT_POSTS: RecentPost[] = [
  {
    id: "rp1",
    platform: "instagram",
    type: "carousel",
    slides: 5,
    title: "How we built the new collection",
    excerpt: "Inside the studio — twelve pieces, one quiet morning. Swipe →",
    when: "2 hours ago",
    whenAbs: "May 8 · 09:14",
    impressions: 12480,
    engagement: 4.2,
    comments: 84,
    shares: 31,
    status: "live",
  },
  {
    id: "rp2",
    platform: "facebook",
    type: "video",
    duration: "2:14",
    title: "Studio tour — long form",
    excerpt: "A walk through the Lisbon studio with founder Mara Costa.",
    when: "Yesterday",
    whenAbs: "May 7 · 17:00",
    impressions: 8230,
    engagement: 2.8,
    comments: 22,
    shares: 14,
    status: "live",
  },
  {
    id: "rp3",
    platform: "linkedin",
    type: "text",
    title: "We're hiring a Senior Designer",
    excerpt:
      "We're growing the team. If you care about craft, materials and quiet detail — read more.",
    when: "Yesterday",
    whenAbs: "May 7 · 11:20",
    impressions: 4910,
    engagement: 6.1,
    comments: 41,
    shares: 58,
    status: "live",
  },
  {
    id: "rp4",
    platform: "instagram",
    type: "image",
    title: "Spring drop — campaign frame",
    excerpt: "Linen, oak, light. The new collection is live.",
    when: "2 days ago",
    whenAbs: "May 6 · 08:45",
    impressions: 21340,
    engagement: 5.3,
    comments: 132,
    shares: 88,
    status: "live",
  },
  {
    id: "rp7",
    platform: "instagram",
    type: "reel",
    duration: "0:28",
    title: "Behind the scenes — loom #03",
    excerpt: "30 seconds with the loom. Sound on.",
    when: "3 days ago",
    whenAbs: "May 5 · 14:10",
    impressions: 33210,
    engagement: 7.8,
    comments: 198,
    shares: 274,
    status: "live",
  },
  {
    id: "rp8",
    platform: "linkedin",
    type: "link",
    domain: "atlasstudio.co",
    title: "Read · How we ship slowly on purpose",
    excerpt:
      "A short essay on craft pace, batches, and why we don't drop weekly.",
    when: "4 days ago",
    whenAbs: "May 4 · 09:00",
    impressions: 6120,
    engagement: 3.4,
    comments: 18,
    shares: 24,
    status: "live",
  },
  {
    id: "rp5",
    platform: "linkedin",
    type: "text",
    title: "Customer story — Atlas Studio × Hôtel Roma",
    excerpt: "A 90-day collaboration, written up. Goes live Wednesday at 8:30.",
    when: "Wed",
    whenAbs: "May 13 · 08:30",
    impressions: 0,
    engagement: 0,
    comments: 0,
    shares: 0,
    status: "scheduled",
  },
  {
    id: "rp6",
    platform: "facebook",
    type: "carousel",
    slides: 4,
    title: "Soft launch — new collection",
    excerpt: "Four-frame teaser. Drops Thursday at midday.",
    when: "Thu",
    whenAbs: "May 14 · 12:00",
    impressions: 0,
    engagement: 0,
    comments: 0,
    shares: 0,
    status: "scheduled",
  },
  {
    id: "rp9",
    platform: "whatsapp",
    type: "image",
    title: "Status · spring lookbook",
    excerpt: "24-hour status to broadcast list. Approved by Mara.",
    when: "Fri",
    whenAbs: "May 15 · 15:00",
    impressions: 0,
    engagement: 0,
    comments: 0,
    shares: 0,
    status: "scheduled",
  },
];
