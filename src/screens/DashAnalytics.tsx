import type { ReactNode } from "react";
import { Activity, Clock, MessageSquare, Send } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";
import { PLATFORM_OVERVIEW, PLATFORM_BY_ID, RECENT_POSTS } from "../shared/data";
import { cn } from "../shared/cn";
import { Button } from "../shared/ui/button";
import { MetricCard } from "../shared/ui/metric-card";
import { Reveal } from "../anim";

export function DashAnalytics() {
  const volume = [
    22, 28, 26, 30, 33, 31, 38, 42, 40, 46, 45, 48, 52, 50, 55, 58, 56, 62, 60,
    65, 68, 66, 70, 72, 75, 78, 76, 82, 80, 84,
  ].map((value, i) => ({ day: i + 1, value }));

  const frequency = [
    3, 5, 4, 6, 8, 5, 3, 4, 7, 6, 8, 9, 10, 7, 6, 8, 9, 11, 9, 10, 12, 11, 9, 8,
    10, 12, 14, 11, 10, 9,
  ].map((value, i) => ({ day: i + 1, value }));

  const byPlatform = PLATFORM_OVERVIEW.map((p) => ({
    name: PLATFORM_BY_ID[p.id].name,
    value: p.messagesToday * 28,
    color: PLATFORM_BY_ID[p.id].color,
  }));

  const kpis = [
    { label: "Engagement rate", value: "4.62%", delta: "+0.4 pp", icon: <Activity className="size-4" /> },
    { label: "Avg. response time", value: "8m 12s", delta: "-22%", icon: <Clock className="size-4" /> },
    { label: "Messages handled", value: "12,840", delta: "+14%", icon: <MessageSquare className="size-4" /> },
    { label: "Posts published", value: "184", delta: "+9%", icon: <Send className="size-4" /> },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Reveal delay={2}>
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Performance overview</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Atlas Studio · across 4 platforms
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex gap-1 rounded-lg bg-secondary p-1">
              {["7d", "30d", "90d"].map((k) => (
                <span
                  key={k}
                  className={cn(
                    "rounded-md px-3 py-1 text-sm font-medium",
                    k === "30d"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground",
                  )}
                >
                  {k}
                </span>
              ))}
            </div>
            <Button variant="outline" size="sm">Export</Button>
          </div>
        </header>
      </Reveal>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k, i) => (
          <Reveal key={k.label} delay={6 + i * 4}>
            <MetricCard label={k.label} value={k.value} delta={k.delta} trend="up" icon={k.icon} />
          </Reveal>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Reveal delay={20} className="lg:col-span-2">
          <ChartCard title="Message volume" sub="all platforms · 30d">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={volume} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="vol" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-0)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--fg-3)" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--fg-3)" }} tickLine={false} axisLine={false} />
                <Area type="monotone" dataKey="value" stroke="var(--accent)" strokeWidth={2} fill="url(#vol)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </Reveal>

        <Reveal delay={26}>
          <ChartCard title="By platform" sub="messages, last 30 days">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={byPlatform} layout="vertical" margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-0)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "var(--fg-3)" }} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" width={70} tick={{ fontSize: 11, fill: "var(--fg-2)" }} tickLine={false} axisLine={false} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={18} isAnimationActive={false}>
                  {byPlatform.map((p) => (
                    <Cell key={p.name} fill={p.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Reveal>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Reveal delay={32}>
          <ChartCard title="Posting frequency" sub="posts per day">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={frequency} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-0)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--fg-3)" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--fg-3)" }} tickLine={false} axisLine={false} />
                <Bar dataKey="value" fill="var(--chart-1)" radius={[3, 3, 0, 0]} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Reveal>

        <Reveal delay={36}>
          <div className="flex flex-col rounded-xl border border-border bg-card">
            <div className="border-b border-border px-5 py-4">
              <div className="text-sm font-semibold">Top performing posts</div>
              <div className="font-mono text-xs text-muted-foreground">by engagement</div>
            </div>
            <div className="flex flex-col p-2">
              {RECENT_POSTS.filter((p) => p.status === "live").slice(0, 4).map((p) => {
                const meta = PLATFORM_BY_ID[p.platform];
                return (
                  <div key={p.id} className="flex items-center gap-3 rounded-lg px-3 py-2.5">
                    <span className="size-1.5 shrink-0 rounded-full" style={{ background: meta.color }} />
                    <span className="min-w-0 flex-1 truncate text-sm">{p.title}</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {(p.impressions / 1000).toFixed(1)}k
                    </span>
                    <span className="font-mono text-xs font-medium text-success">{p.engagement}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function ChartCard({
  title,
  sub,
  children,
}: {
  title: string;
  sub: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <div className="text-sm font-semibold">{title}</div>
        <div className="font-mono text-xs text-muted-foreground">{sub}</div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
