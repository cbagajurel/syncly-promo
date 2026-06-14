import {
  Inbox as InboxIcon,
  CalendarDays,
  Sparkles,
  BarChart3,
  Users,
  ShieldCheck,
} from "lucide-react";
import { Reveal } from "../anim";

const FEATURES = [
  { n: "01", Icon: InboxIcon, title: "Unified inbox", desc: "Every DM, comment, and mention from all channels in one thread." },
  { n: "02", Icon: Sparkles, title: "AI auto-replies", desc: "Answers in your voice, drawn from your own knowledge base." },
  { n: "03", Icon: CalendarDays, title: "Schedule & publish", desc: "Plan a month of posts and let Syncly ship them on time." },
  { n: "04", Icon: BarChart3, title: "Clear analytics", desc: "Response times, engagement, and reach — without a spreadsheet." },
  { n: "05", Icon: Users, title: "Built for teams", desc: "Assign, collaborate, and hand off conversations seamlessly." },
  { n: "06", Icon: ShieldCheck, title: "Calm by default", desc: "No noise, no clutter — just the conversations that matter." },
];

const PLATFORMS = [
  { name: "Instagram", dot: "bg-ig", live: true },
  { name: "Facebook", dot: "bg-fb", live: true },
  { name: "Messenger", dot: "bg-msgr", live: true },
  { name: "WhatsApp", dot: "bg-wa", live: false },
  { name: "TikTok", dot: "bg-tiktok", live: false },
];

export function LandingMontage() {
  return (
    <div className="relative flex flex-col justify-center w-full h-full bg-background text-foreground font-sans noise-overlay overflow-hidden">
      <div className="mx-auto px-12 w-full max-w-[1400px]">
        {/* Heading */}
        <Reveal delay={2}>
          <div className="flex items-end gap-4 mb-10">
            <span className="bg-foreground/15 w-12 h-px" />
            <h2 className="font-display text-5xl lg:text-6xl tracking-tight">
              Everything in one calm surface.
            </h2>
          </div>
        </Reveal>

        {/* Features grid */}
        <div className="gap-px grid grid-cols-3 bg-foreground/8 border border-foreground/8">
          {FEATURES.map((f, i) => (
            <Reveal key={f.n} delay={8 + i * 4} className="bg-background">
              <div className="flex flex-col gap-3 p-8 h-full">
                <div className="flex items-center justify-between">
                  <f.Icon className="size-6 text-foreground/70" strokeWidth={1.6} />
                  <span className="font-mono text-muted-foreground text-xs">{f.n}</span>
                </div>
                <h3 className="mt-2 font-display text-2xl">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Integrations */}
        <Reveal delay={34}>
          <div className="flex items-center gap-3 mt-10">
            <span className="mr-2 font-mono text-muted-foreground text-xs uppercase tracking-wider">
              Connects with
            </span>
            {PLATFORMS.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-2.5 bg-background px-4 py-2.5 border border-foreground/8 rounded-full"
              >
                <span className={`size-2.5 rounded-full ${p.dot}`} />
                <span className="font-medium text-sm">{p.name}</span>
                <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
                  {p.live ? "Connected" : "Soon"}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
