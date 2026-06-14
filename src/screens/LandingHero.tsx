import {
  ArrowRight,
  LayoutDashboard,
  Inbox as InboxIcon,
  PenSquare,
  CalendarDays,
  BarChart3,
  Plus,
  Send,
} from "lucide-react";
import { Reveal } from "../anim";

export function LandingHero() {
  return (
    <div className="relative w-full h-full bg-background text-foreground font-sans noise-overlay overflow-hidden">
      {/* Soft radial wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 6%, transparent 45%, var(--bg-0) 100%)",
        }}
      />

      {/* Nav */}
      <Reveal delay={2} y={-10}>
        <nav className="z-20 relative flex items-center justify-between mx-auto px-12 max-w-[1500px] h-24">
          <span className="font-display text-3xl tracking-tight">Syncly</span>
          <div className="flex items-center gap-12 text-foreground/70 text-base">
            <span>Features</span>
            <span>Platforms</span>
            <span>Pricing</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-foreground/70 text-base">Sign in</span>
            <span className="bg-brand px-6 py-2.5 rounded-full font-medium text-brand-foreground text-base">
              Open the dashboard
            </span>
          </div>
        </nav>
      </Reveal>

      {/* Hero content */}
      <div className="z-10 relative flex flex-col items-center mx-auto px-6 pt-6 max-w-[1500px] text-center">
        <Reveal delay={8}>
          <div className="flex items-center gap-3 bg-background shadow-sm mx-auto py-1 pr-1 pl-2 border border-foreground/8 rounded-full">
            <span className="bg-brand px-2 py-0.5 rounded-full font-medium text-[12px] text-brand-foreground">
              New
            </span>
            <span className="text-foreground/80 text-[15px]">
              AI auto-replies across every channel
            </span>
            <span className="bg-foreground/8 w-px h-4" />
            <span className="flex justify-center items-center bg-background rounded-full size-6">
              <ArrowRight className="size-3" />
            </span>
          </div>
        </Reveal>

        <Reveal delay={14}>
          <h1 className="mt-8 font-display text-[clamp(3rem,7vw,6rem)] text-balance leading-[0.95] tracking-tight">
            <span className="block">Manage every</span>
            <span className="block">
              <span className="inline-block relative">
                message
                <span className="right-0 -bottom-1 left-0 absolute bg-brand/25 h-3" />
              </span>{" "}
              in one place.
            </span>
          </h1>
        </Reveal>

        <Reveal delay={20}>
          <p className="mx-auto mt-7 max-w-2xl text-muted-foreground text-xl text-balance leading-relaxed">
            Unified messaging, scheduling, and publishing across Facebook,
            Instagram, WhatsApp, and LinkedIn — for teams who'd rather reply
            than tab-switch.
          </p>
        </Reveal>

        <Reveal delay={26}>
          <div className="flex justify-center items-center gap-3 mt-9">
            <span className="flex items-center gap-2 bg-brand px-6 rounded-xl h-12 font-medium text-brand-foreground text-base">
              Open the dashboard
              <ArrowRight className="size-4" />
            </span>
            <span className="flex items-center px-6 rounded-xl h-12 text-foreground text-base">
              See a live preview
            </span>
          </div>
        </Reveal>

        {/* Framed product peek */}
        <Reveal delay={32} y={36} spring="HEAVY">
          <div className="relative mx-auto mt-14 max-w-5xl">
            <div className="bg-foreground/[0.02] shadow-[0_30px_64px_-28px_rgba(60,40,120,0.28)] p-2 border border-foreground/10 rounded-xl">
              <HeroPreview />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

const peekNav = [
  { Icon: LayoutDashboard, label: "Dashboard" },
  { Icon: InboxIcon, label: "Inbox", active: true },
  { Icon: PenSquare, label: "Posts" },
  { Icon: CalendarDays, label: "Schedule" },
  { Icon: BarChart3, label: "Analytics" },
];

const peekConversations = [
  { initials: "MR", name: "Maya Rivera", dot: "bg-ig", snippet: "Do you ship to Canada?", time: "2m", active: true },
  { initials: "TC", name: "Tom Chen", dot: "bg-wa", snippet: "Thanks, that fixed it!", time: "18m", active: false },
  { initials: "AP", name: "Aria Patel", dot: "bg-fb", snippet: "Is the sale still on?", time: "1h", active: false },
];

function HeroPreview() {
  return (
    <div className="grid lg:grid-cols-[196px_minmax(0,1fr)] bg-background border border-border rounded-lg overflow-hidden text-foreground dash-light">
      <aside className="flex flex-col bg-sidebar border-border border-r">
        <div className="flex items-center gap-2.5 px-4 border-border border-b h-12">
          <span className="flex justify-center items-center bg-brand rounded-md size-6 font-display text-brand-foreground text-xs">
            S
          </span>
          <span className="font-semibold text-sm">Syncly</span>
        </div>
        <div className="px-3 pt-3">
          <span className="flex justify-center items-center gap-2 bg-brand rounded-lg w-full h-8 font-medium text-brand-foreground text-xs">
            <Plus className="size-3.5" strokeWidth={2} />
            Compose
          </span>
        </div>
        <nav className="flex flex-col gap-0.5 px-3 py-3">
          {peekNav.map((it) => (
            <span
              key={it.label}
              className={`relative flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium ${
                it.active ? "bg-secondary text-foreground" : "text-muted-foreground"
              }`}
            >
              <span
                className={`absolute top-1/2 left-0 -translate-y-1/2 w-1 h-5 rounded-r-full bg-brand ${
                  it.active ? "opacity-100" : "opacity-0"
                }`}
              />
              <it.Icon className={`size-4 shrink-0 ${it.active ? "text-brand" : ""}`} strokeWidth={1.75} />
              {it.label}
            </span>
          ))}
        </nav>
      </aside>

      <div className="flex flex-col min-w-0">
        <header className="flex items-center gap-3 px-4 border-border border-b h-12">
          <span className="font-mono text-muted-foreground text-xs">atlasstudio</span>
          <span className="text-border">/</span>
          <span className="font-semibold text-sm">Inbox</span>
          <span className="flex items-center gap-1.5 bg-brand ml-auto px-2.5 rounded-md h-7 font-medium text-brand-foreground text-xs">
            <Plus className="size-3.5" strokeWidth={2} /> New post
          </span>
        </header>

        <div className="grid lg:grid-cols-[240px_minmax(0,1fr)]">
          <div className="border-border border-r">
            <div className="flex justify-between items-center px-4 border-border border-b h-10">
              <span className="font-medium text-[13px]">All messages</span>
              <span className="font-mono text-[11px] text-muted-foreground">26 open</span>
            </div>
            <ul>
              {peekConversations.map((c) => (
                <li
                  key={c.name}
                  className={`flex items-start gap-2.5 px-4 py-3 border-b border-border ${
                    c.active ? "bg-secondary" : ""
                  }`}
                >
                  <span className="relative shrink-0">
                    <span className="flex justify-center items-center bg-secondary rounded-full size-8 font-mono text-[11px] text-foreground/70">
                      {c.initials}
                    </span>
                    <span className={`absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-background ${c.dot}`} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="flex justify-between items-center gap-2">
                      <span className="font-medium text-[13px] truncate">{c.name}</span>
                      <span className="font-mono text-[10px] text-muted-foreground shrink-0">{c.time}</span>
                    </span>
                    <span className="block mt-0.5 text-[12px] text-muted-foreground truncate">{c.snippet}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col min-h-[260px]">
            <div className="flex items-center gap-2.5 px-4 border-border border-b h-10">
              <span className="relative">
                <span className="flex justify-center items-center bg-secondary rounded-full size-6 font-mono text-[10px] text-foreground/70">
                  MR
                </span>
                <span className="-right-0.5 -bottom-0.5 absolute bg-ig border-2 border-background rounded-full size-2" />
              </span>
              <span className="font-medium text-[13px]">Maya Rivera</span>
              <span className="font-mono text-[11px] text-muted-foreground">Instagram · DM</span>
            </div>
            <div className="flex flex-col flex-1 gap-2.5 p-4">
              <div className="flex justify-start">
                <span className="bg-secondary px-3 py-2 rounded-2xl rounded-bl-md max-w-[80%] text-[13px] leading-relaxed">
                  Hey! Do you ship to Canada?
                </span>
              </div>
              <div className="flex justify-end">
                <span className="bg-brand px-3 py-2 rounded-2xl rounded-br-md max-w-[80%] text-[13px] text-brand-foreground leading-relaxed">
                  We do! Orders land in 4–6 business days with free returns.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 mx-4 mb-4 px-3 border border-border rounded-lg h-9">
              <span className="text-[12px] text-muted-foreground">Reply to Maya…</span>
              <span className="flex justify-center items-center bg-brand ml-auto rounded-md size-6">
                <Send className="size-3 text-brand-foreground" strokeWidth={1.75} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
