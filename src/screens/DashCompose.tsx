import type { ReactNode } from "react";
import {
  ChevronDown,
  Plus,
  Send,
  Smile,
  ImageIcon,
  PenSquare,
} from "lucide-react";
import { IconIG } from "../shared/icons";
import { cn } from "../shared/cn";
import { Button } from "../shared/ui/button";
import { Badge } from "../shared/ui/badge";
import { Textarea } from "../shared/ui/textarea";
import { Reveal } from "../anim";
import { photo } from "../data/dummy";

const IG_CHAR_LIMIT = 2200;
const IG_OPTIMAL = 138;
const MEDIA = photo(330, "spring drop");

export function DashCompose({
  caption = "Spring, in linen. The new collection lands today — twelve quiet pieces, made to last. 🌿",
  showCursor = false,
}: {
  caption?: string;
  showCursor?: boolean;
}) {
  const over = caption.length > IG_CHAR_LIMIT;
  return (
    <div className="flex flex-col gap-5">
      <Reveal delay={2}>
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <ChevronDown className="size-4 rotate-90" /> Back
            </Button>
            <span className="flex size-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
              <PenSquare className="size-4" />
            </span>
            <div>
              <div className="text-base font-semibold">New post</div>
              <div className="font-mono text-xs text-muted-foreground">
                Instagram · @atlasstudio
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="gap-1.5 py-1">
              <span className="size-1.5 rounded-full" style={{ background: "var(--ok)" }} />
              Ready · Instagram
            </Badge>
            <Button variant="ghost" size="sm">Save draft</Button>
            <Button variant="brand" size="sm" className="relative">
              <Send className="size-4" /> Publish now
            </Button>
          </div>
        </header>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        {/* Left — form */}
        <section className="flex flex-col gap-5">
          <Reveal delay={8}>
            <Block label="Publish to">
              <div className="flex items-center gap-3 rounded-lg border border-brand/40 bg-brand/5 px-3 py-2.5">
                <span style={{ color: "var(--p-instagram)" }}>
                  <IconIG size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">Instagram</div>
                  <div className="font-mono text-xs text-muted-foreground">
                    @atlasstudio
                  </div>
                </div>
                <span className="font-mono text-[10px] tracking-wide text-success">
                  CONNECTED
                </span>
              </div>
            </Block>
          </Reveal>

          <Reveal delay={12}>
            <Block label="Post type">
              <div className="inline-flex w-fit gap-1 rounded-lg bg-secondary p-1">
                {["Image", "Carousel", "Reel"].map((o, i) => (
                  <span
                    key={o}
                    className={cn(
                      "rounded-md px-3 py-1 text-sm font-medium",
                      i === 0
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground",
                    )}
                  >
                    {o}
                  </span>
                ))}
              </div>
            </Block>
          </Reveal>

          <Reveal delay={16}>
            <Block label="Photo" hint="JPEG, PNG or WebP">
              <div className="flex flex-wrap gap-2">
                <div className="relative size-20 overflow-hidden rounded-lg border-2 border-brand">
                  <img src={MEDIA} alt="" className="size-full object-cover" />
                  <div className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-success text-[9px] text-white">
                    ✓
                  </div>
                </div>
                <span className="grid size-20 place-items-center rounded-lg border-2 border-dashed border-border text-muted-foreground">
                  <Plus className="size-5" />
                </span>
              </div>
            </Block>
          </Reveal>

          <Reveal delay={20}>
            <Block
              label="Caption"
              hint={`${caption.length.toLocaleString()} / ${IG_CHAR_LIMIT.toLocaleString()}`}
            >
              <Textarea value={caption} readOnly rows={5} className="relative" />
              <div className="mt-2 flex gap-1">
                <Button variant="ghost" size="sm">
                  <span className="font-semibold">#</span> Hashtag
                </Button>
                <Button variant="ghost" size="sm">
                  <Smile className="size-4" />
                </Button>
              </div>
            </Block>
          </Reveal>

          <Reveal delay={24}>
            <Block label="Schedule">
              <div className="-mt-8 mb-2 flex justify-end">
                <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  Off
                </span>
              </div>
            </Block>
          </Reveal>
        </section>

        {/* Right — preview */}
        <aside className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] tracking-wide text-muted-foreground">
              PREVIEW
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full" style={{ background: "var(--p-instagram)" }} />
              Instagram
            </span>
          </div>
          <Reveal delay={14} spring="SMOOTH">
            <IgPreview caption={caption} />
          </Reveal>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="font-mono text-[11px] tracking-wide text-muted-foreground">
              TIPS
            </div>
            <div className="mt-2 flex flex-col gap-2 text-xs text-muted-foreground">
              <div className="flex gap-2">
                <span>{caption.length <= IG_OPTIMAL ? "✓" : "⚑"}</span>
                <span>
                  {caption.length <= IG_OPTIMAL
                    ? `Caption is in the optimal range (≤${IG_OPTIMAL} chars).`
                    : `Shorten to ~${IG_OPTIMAL} chars for best reach.`}
                </span>
              </div>
              <div className="flex gap-2">
                <span>💡</span>
                <span>Add 3–5 hashtags to increase discoverability.</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Block({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        {hint && (
          <span className="font-mono text-xs text-muted-foreground">{hint}</span>
        )}
      </div>
      {children}
    </div>
  );
}

function IgPreview({ caption }: { caption: string }) {
  const MAX = 125;
  const display = caption.length > MAX ? caption.slice(0, MAX) + "…" : caption;
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-center gap-2.5 p-3">
        <span className="flex size-8 items-center justify-center rounded-full bg-linear-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-xs font-semibold text-white">
          AT
        </span>
        <div className="flex-1">
          <div className="text-sm font-semibold">atlasstudio</div>
          <div className="font-mono text-[10px] text-muted-foreground">
            Original Audio
          </div>
        </div>
        <span className="text-muted-foreground">•••</span>
      </div>

      <div className="relative aspect-square w-full bg-secondary">
        <img src={MEDIA} alt="" className="size-full object-cover" />
      </div>

      <div className="flex items-center justify-between px-3 py-2 text-lg">
        <div className="flex gap-3">
          <span>♡</span>
          <span>💬</span>
          <span>✈</span>
        </div>
        <span>⊡</span>
      </div>

      <div className="px-3 pb-3 text-sm">
        <div className="font-semibold">1,234 likes</div>
        <div className="mt-0.5">
          <span className="font-semibold">atlasstudio</span>{" "}
          {display || <span className="text-muted-foreground">Your caption…</span>}
        </div>
        <div className="mt-1 font-mono text-xs text-muted-foreground">
          View all comments
        </div>
        <div className="font-mono text-[10px] text-muted-foreground">Just now</div>
      </div>
    </div>
  );
}
