import {
  Plus,
  Image as ImageIcon,
  Layers,
  PlayCircle,
  Send,
  Pencil,
  Trash2,
} from "lucide-react";
import { cn } from "../shared/cn";
import { Button } from "../shared/ui/button";
import { Badge } from "../shared/ui/badge";
import { Reveal } from "../anim";
import { POSTS, type DPost } from "../data/dummy";

const MEDIA_META: Record<DPost["mediaType"], { label: string; Icon: typeof ImageIcon }> = {
  IMAGE: { label: "Image", Icon: ImageIcon },
  CAROUSEL: { label: "Carousel", Icon: Layers },
  REELS: { label: "Reel", Icon: PlayCircle },
};

const STATUS_TABS = [
  { k: "all", l: "All" },
  { k: "PUBLISHED", l: "Published" },
  { k: "SCHEDULED", l: "Scheduled" },
  { k: "DRAFT", l: "Draft" },
  { k: "FAILED", l: "Failed" },
] as const;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function StatusBadge({ status }: { status: DPost["status"] }) {
  const map: Record<
    DPost["status"],
    { variant: "success" | "secondary" | "brand" | "outline" | "destructive"; label: string }
  > = {
    PUBLISHED: { variant: "success", label: "Published" },
    SCHEDULED: { variant: "secondary", label: "Scheduled" },
    PUBLISHING: { variant: "brand", label: "Publishing…" },
    DRAFT: { variant: "outline", label: "Draft" },
    FAILED: { variant: "destructive", label: "Failed" },
  };
  const { variant, label } = map[status];
  return <Badge variant={variant}>{label}</Badge>;
}

function PostThumb({ post }: { post: DPost }) {
  const m = MEDIA_META[post.mediaType];
  const firstUrl = post.mediaUrls[0];
  return (
    <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-secondary">
      {firstUrl ? (
        <img src={firstUrl} alt="" className="size-full object-cover" />
      ) : (
        <div className="flex size-full items-center justify-center text-muted-foreground">
          <m.Icon className="size-5" />
        </div>
      )}
      <span className="absolute bottom-1 left-1 flex items-center gap-0.5 rounded bg-black/55 px-1 py-0.5 text-[9px] text-white">
        <m.Icon className="size-2.5" />
      </span>
    </div>
  );
}

export function DashPosts() {
  const list = POSTS.slice(0, 6);
  const published = POSTS.filter((p) => p.status === "PUBLISHED").length;
  const draft = POSTS.filter((p) => p.status === "DRAFT").length;
  const scheduled = POSTS.filter((p) => p.status === "SCHEDULED").length;

  const summary = [
    { label: "SHOWING", value: `${list.length}`, sub: `of ${POSTS.length}` },
    { label: "PUBLISHED", value: `${published}` },
    { label: "SCHEDULED", value: `${scheduled}` },
    { label: "DRAFTS", value: `${draft}` },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Reveal delay={2}>
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Posts</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {published} published · {draft} drafts · {scheduled} scheduled · Instagram
            </p>
          </div>
          <Button variant="brand" size="sm">
            <Plus className="size-4" /> New post
          </Button>
        </header>
      </Reveal>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {summary.map((s, i) => (
          <Reveal key={s.label} delay={6 + i * 3}>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="font-mono text-[11px] tracking-wide text-muted-foreground">
                {s.label}
              </div>
              <div className="mt-1 font-mono text-xl font-bold tabular-nums">
                {s.value}
                {s.sub && (
                  <span className="ml-1 text-sm font-normal text-muted-foreground">
                    {s.sub}
                  </span>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={18}>
        <div className="inline-flex w-fit gap-1 rounded-lg bg-secondary p-1">
          {STATUS_TABS.map(({ k, l }, i) => (
            <span
              key={k}
              className={cn(
                "rounded-md px-3 py-1 text-sm font-medium",
                i === 0
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground",
              )}
            >
              {l}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="flex flex-col gap-3">
        {list.map((p, i) => {
          const m = MEDIA_META[p.mediaType];
          const canEdit = p.status === "DRAFT" || p.status === "SCHEDULED" || p.status === "FAILED";
          const canPublish = p.status === "DRAFT" || p.status === "FAILED";
          return (
            <Reveal key={p.id} delay={22 + i * 4} x={-10} y={6} spring="SNAPPY">
              <div className="group flex items-center gap-4 rounded-xl border border-border bg-card p-3">
                <PostThumb post={p} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">
                    {p.caption ? (
                      p.caption.length > 80 ? p.caption.slice(0, 80) + "…" : p.caption
                    ) : (
                      <span className="text-muted-foreground">No caption</span>
                    )}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full" style={{ background: "var(--p-instagram)" }} />
                      @{p.instagramAccount.username}
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <m.Icon className="size-3" /> {m.label}
                    </span>
                    <span className="font-mono">{formatDate(p.createdAt)}</span>
                    {p.scheduledAt && p.status === "SCHEDULED" && (
                      <span className="font-mono text-warning">⏰ {formatDateTime(p.scheduledAt)}</span>
                    )}
                  </div>
                  {p.errorMessage && (
                    <div className="mt-1 font-mono text-xs text-destructive">{p.errorMessage}</div>
                  )}
                </div>
                <StatusBadge status={p.status} />
                <div className="flex items-center gap-1">
                  {canEdit && (
                    <Button variant="ghost" size="icon" className="size-8">
                      <Pencil className="size-4" />
                    </Button>
                  )}
                  {canPublish && (
                    <Button variant="ghost" size="icon" className="size-8">
                      <Send className="size-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="size-8 text-muted-foreground">
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
