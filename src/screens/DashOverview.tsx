import {
  MessageSquare,
  CalendarClock,
  ArrowRight,
  Filter,
  Plus,
  Link2,
} from "lucide-react";
import { Button } from "../shared/ui/button";
import { Badge } from "../shared/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "../shared/ui/card";
import { MetricCard } from "../shared/ui/metric-card";
import { PLATFORM_BY_ID } from "../shared/data";
import { PLATFORM_ICONS } from "../shared/icons";
import { Reveal } from "../anim";
import {
  USER,
  INSTAGRAM_ACCOUNTS,
  FACEBOOK_PAGES,
  TOTAL_UNREAD,
  POSTS,
  CONVERSATIONS,
  type DConversation,
} from "../data/dummy";

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

function convInitials(c: DConversation): string {
  const name = c.participantName ?? c.participantUsername ?? c.participantIgId;
  return name.slice(0, 2).toUpperCase();
}

function formatScheduledAt(isoStr: string) {
  const d = new Date(isoStr);
  return {
    date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    time: d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  };
}

export function DashOverview() {
  const scheduledCount = POSTS.filter((p) => p.status === "SCHEDULED").length;
  const totalPlatforms = INSTAGRAM_ACCOUNTS.length + FACEBOOK_PAGES.length;
  const convos = CONVERSATIONS.slice(0, 5);
  const scheduled = POSTS.filter(
    (p) => p.status === "SCHEDULED" && p.scheduledAt,
  )
    .sort(
      (a, b) =>
        new Date(a.scheduledAt!).getTime() - new Date(b.scheduledAt!).getTime(),
    )
    .slice(0, 5);

  const firstName = USER.name.split(" ")[0];

  return (
    <div className="flex flex-col gap-6">
      {/* Greeting */}
      <Reveal delay={2}>
        <section className="flex flex-wrap justify-between items-end gap-4">
          <div>
            <h1 className="font-bold text-2xl tracking-tight">
              Good morning, {firstName}.
            </h1>
            <p className="mt-1 text-muted-foreground text-sm">
              {totalPlatforms} platforms connected
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="success" className="gap-1.5 py-1">
              <span className="bg-success rounded-full size-1.5" /> All connected
            </Badge>
            <Button variant="outline" size="sm">
              <Filter className="size-3.5" /> Today
            </Button>
            <Button variant="brand" size="sm">
              <Plus className="size-4" /> New post
            </Button>
          </div>
        </section>
      </Reveal>

      {/* Stats */}
      <section className="gap-4 grid grid-cols-1 sm:grid-cols-3">
        {[
          {
            label: "Unread messages",
            value: String(TOTAL_UNREAD),
            icon: <MessageSquare className="size-4" />,
          },
          {
            label: "Scheduled posts",
            value: String(scheduledCount),
            icon: <CalendarClock className="size-4" />,
          },
          {
            label: "Connected platforms",
            value: String(totalPlatforms),
            icon: <Link2 className="size-4" />,
          },
        ].map((s, i) => (
          <Reveal key={s.label} delay={6 + i * 4}>
            <MetricCard label={s.label} value={s.value} icon={s.icon} />
          </Reveal>
        ))}
      </section>

      {/* Platform cards */}
      <section className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="font-medium text-muted-foreground text-sm">
            Connected platforms
          </span>
          <Button variant="ghost" size="sm">
            <Plus className="size-3.5" /> Connect platform
          </Button>
        </div>
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
          {(["instagram", "facebook"] as const).map((id, i) => {
            const meta = PLATFORM_BY_ID[id];
            const PIcon = PLATFORM_ICONS[id];
            return (
              <Reveal key={id} delay={18 + i * 5}>
                <div className="relative bg-card p-5 border border-border rounded-xl overflow-hidden">
                  <div className="flex items-center gap-2 mb-4">
                    <span style={{ color: meta.color }}>
                      <PIcon size={16} />
                    </span>
                    <span className="font-semibold text-sm">{meta.name}</span>
                    <Badge variant="success" className="gap-1 ml-auto py-0.5">
                      <span className="bg-success rounded-full size-1.5" />{" "}
                      Connected
                    </Badge>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="font-mono text-[10px] text-muted-foreground tracking-wide">
                        ACCOUNTS
                      </div>
                      <div className="font-mono font-medium tabular-nums text-sm">
                        1
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-muted-foreground text-xs">
                      View inbox <ArrowRight className="size-3" />
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Quick inbox + upcoming */}
      <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
        <Reveal delay={28}>
          <Card className="gap-0 py-0">
            <CardHeader className="flex justify-between items-center py-4 border-border border-b">
              <div className="gap-0.5 grid">
                <CardTitle className="text-sm">Recent conversations</CardTitle>
                <span className="font-mono text-muted-foreground text-xs">
                  across all channels
                </span>
              </div>
              <Button variant="ghost" size="sm">
                Open inbox <ArrowRight className="size-3.5" />
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col p-2">
              {convos.map((c) => {
                const platformColor = c.instagramAccountId
                  ? "var(--p-instagram)"
                  : "var(--p-facebook)";
                const preview = c.messages[0]?.text ?? "Media message";
                return (
                  <div
                    key={c.id}
                    className="flex items-center gap-3 px-2 py-2.5 rounded-lg text-left"
                  >
                    <span className="flex justify-center items-center bg-secondary rounded-full size-8 font-medium text-xs shrink-0">
                      {convInitials(c)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center gap-2">
                        <span className="font-medium text-sm truncate">
                          {c.participantName}
                        </span>
                        <span className="font-mono text-muted-foreground text-xs shrink-0">
                          {relativeTime(c.lastMessageAt)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="rounded-full size-1.5 shrink-0"
                          style={{ background: platformColor }}
                        />
                        <span className="text-muted-foreground text-xs truncate">
                          {preview}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={32}>
          <Card className="gap-0 py-0">
            <CardHeader className="flex justify-between items-center py-4 border-border border-b">
              <div className="gap-0.5 grid">
                <CardTitle className="text-sm">Upcoming posts</CardTitle>
                <span className="font-mono text-muted-foreground text-xs">
                  scheduled
                </span>
              </div>
              <Button variant="ghost" size="sm">
                Open schedule <ArrowRight className="size-3.5" />
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col p-2">
              {scheduled.map((p) => {
                const { date, time } = formatScheduledAt(p.scheduledAt!);
                return (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 px-2 py-2.5 rounded-lg"
                  >
                    <div className="flex flex-col w-12 shrink-0">
                      <span className="font-mono font-medium text-xs">
                        {date}
                      </span>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {time}
                      </span>
                    </div>
                    <span
                      className="rounded-full size-1.5 shrink-0"
                      style={{ background: "var(--p-instagram)" }}
                    />
                    <span className="flex-1 min-w-0 text-sm truncate">
                      {p.caption ?? "No caption"}
                    </span>
                    <Badge variant="secondary" className="capitalize shrink-0">
                      {p.status.toLowerCase()}
                    </Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </div>
  );
}
