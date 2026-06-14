import { ChevronLeft, ChevronRight, Plus, ArrowRight } from "lucide-react";
import { cn } from "../shared/cn";
import { Button } from "../shared/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../shared/ui/card";
import { Reveal } from "../anim";
import { POSTS, type DPost } from "../data/dummy";

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function daysInMonth(y: number, m: number) {
  return new Date(y, m + 1, 0).getDate();
}
function weekDayMon(d: Date) {
  return (d.getDay() + 6) % 7;
}
function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const STATUS_DOT: Record<DPost["status"], string> = {
  SCHEDULED: "var(--warn)",
  PUBLISHED: "var(--ok)",
  PUBLISHING: "var(--accent)",
  DRAFT: "var(--fg-3)",
  FAILED: "oklch(0.62 0.14 25)",
};
const LEGEND: { status: DPost["status"]; label: string }[] = [
  { status: "SCHEDULED", label: "Scheduled" },
  { status: "PUBLISHED", label: "Published" },
  { status: "DRAFT", label: "Draft" },
  { status: "FAILED", label: "Failed" },
];

export function DashSchedule() {
  const today = new Date();
  const month = startOfMonth(today);
  const year = month.getFullYear();
  const mon = month.getMonth();
  const totalDays = daysInMonth(year, mon);
  const firstWeekday = weekDayMon(new Date(year, mon, 1));
  const totalCells = Math.ceil((firstWeekday + totalDays) / 7) * 7;

  const postsByDate = new Map<string, DPost[]>();
  for (const p of POSTS) {
    const dateStr =
      p.status === "SCHEDULED" && p.scheduledAt
        ? p.scheduledAt
        : p.status === "PUBLISHED" && p.publishedAt
          ? p.publishedAt
          : null;
    if (!dateStr) continue;
    const d = new Date(dateStr);
    if (d.getFullYear() !== year || d.getMonth() !== mon) continue;
    const key = d.getDate().toString();
    if (!postsByDate.has(key)) postsByDate.set(key, []);
    postsByDate.get(key)!.push(p);
  }

  const upcoming = POSTS.filter((p) => p.status === "SCHEDULED" && p.scheduledAt)
    .sort(
      (a, b) =>
        new Date(a.scheduledAt!).getTime() - new Date(b.scheduledAt!).getTime(),
    )
    .slice(0, 6);
  const drafts = POSTS.filter((p) => p.status === "DRAFT");

  let chipIdx = 0;

  return (
    <div className="flex h-full flex-col gap-4">
      <Reveal delay={2}>
        <header className="flex shrink-0 flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="size-4" />
            </Button>
            <div className="min-w-40 text-lg font-semibold">
              {month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </div>
            <Button variant="ghost" size="icon">
              <ChevronRight className="size-4" />
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-3 sm:flex">
              {LEGEND.map((l) => (
                <span key={l.label} className="flex items-center gap-1.5">
                  <span className="size-2 shrink-0 rounded-full" style={{ background: STATUS_DOT[l.status] }} />
                  <span className="text-xs text-muted-foreground">{l.label}</span>
                </span>
              ))}
            </div>
            <Button variant="brand" size="sm">
              <Plus className="size-4" /> New post
            </Button>
          </div>
        </header>
      </Reveal>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        {/* Calendar */}
        <Reveal delay={6} className="min-h-0">
          <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
            <div className="grid shrink-0 grid-cols-7 border-b border-border">
              {WEEKDAY_LABELS.map((d) => (
                <div key={d} className="px-2 py-2.5 text-center font-mono text-xs text-muted-foreground">
                  {d}
                </div>
              ))}
            </div>
            <div className="flex-1 grid grid-cols-7" style={{ gridAutoRows: "1fr" }}>
              {Array.from({ length: totalCells }).map((_, idx) => {
                const dayNum = idx - firstWeekday + 1;
                const isThisMonth = dayNum >= 1 && dayNum <= totalDays;
                const cellDate = isThisMonth ? new Date(year, mon, dayNum) : null;
                const isToday = cellDate ? isSameDay(cellDate, today) : false;
                const cellPosts = isThisMonth ? postsByDate.get(dayNum.toString()) ?? [] : [];
                return (
                  <div
                    key={idx}
                    className={cn(
                      "border-b border-r border-border p-1.5 nth-[7n]:border-r-0",
                      !isThisMonth && "bg-background/30",
                    )}
                  >
                    {isThisMonth && (
                      <>
                        <span
                          className={cn(
                            "inline-flex size-6 items-center justify-center rounded-full text-xs font-medium",
                            isToday && "bg-brand text-brand-foreground",
                          )}
                        >
                          {dayNum}
                        </span>
                        {cellPosts.length > 0 && (
                          <div className="mt-1 flex flex-col gap-0.5">
                            {cellPosts.slice(0, 3).map((p) => {
                              const d = 12 + chipIdx++ * 3;
                              return (
                                <Reveal key={p.id} delay={d} y={6} spring="SNAPPY">
                                  <div className="flex items-center gap-1 rounded bg-secondary/60 px-1 py-0.5">
                                    <span className="size-1.5 shrink-0 rounded-full" style={{ background: STATUS_DOT[p.status] }} />
                                    <span className="min-w-0 flex-1 truncate text-[11px] text-muted-foreground">
                                      {p.caption ?? "No caption"}
                                    </span>
                                    {(p.scheduledAt || p.publishedAt) && (
                                      <span className="shrink-0 font-mono text-[10px] text-muted-foreground/70">
                                        {fmtTime((p.scheduledAt ?? p.publishedAt)!)}
                                      </span>
                                    )}
                                  </div>
                                </Reveal>
                              );
                            })}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Sidebar */}
        <aside className="flex flex-col gap-4 overflow-hidden">
          <Reveal delay={16}>
            <Card className="gap-0 py-0">
              <CardHeader className="border-b border-border py-4">
                <div className="grid gap-0.5">
                  <CardTitle className="text-sm">Upcoming</CardTitle>
                  <span className="font-mono text-xs text-muted-foreground">
                    {upcoming.length} scheduled
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-3">
                <div className="flex flex-col gap-3">
                  {upcoming.slice(0, 4).map((p) => (
                    <div key={p.id} className="flex w-full items-start gap-2 rounded-lg px-1 py-1 text-left">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ background: STATUS_DOT.SCHEDULED }} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm">{p.caption ?? "No caption"}</div>
                        <div className="font-mono text-xs text-muted-foreground">
                          {new Date(p.scheduledAt!).toLocaleString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                      <ArrowRight className="mt-1 size-3 shrink-0 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={20}>
            <div className="rounded-xl border border-dashed border-border p-4 text-center">
              <p className="mb-1 text-sm font-medium">Ready to post?</p>
              <p className="mb-3 text-xs text-muted-foreground">
                Click any future date on the calendar, or compose a new post now.
              </p>
              <Button variant="brand" size="sm">
                <Plus className="size-4" /> New post
              </Button>
            </div>
          </Reveal>
        </aside>
      </div>
    </div>
  );
}
