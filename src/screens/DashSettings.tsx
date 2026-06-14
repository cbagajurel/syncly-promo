import {
  Settings as SettingsIcon,
  Link2,
  Sparkles,
  Users,
  Bell,
  Shield,
  CreditCard,
  FileText,
  Type,
  Trash2,
  Upload,
} from "lucide-react";
import { cn } from "../shared/cn";
import { Button } from "../shared/ui/button";
import { Badge } from "../shared/ui/badge";
import { Reveal } from "../anim";
import { KB_ENTRIES, type KbEntry } from "../data/dummy";

const NAV = [
  { id: "general", label: "General", Icon: SettingsIcon },
  { id: "accounts", label: "Connected accounts", Icon: Link2 },
  { id: "ai", label: "AI Knowledge Base", Icon: Sparkles },
  { id: "team", label: "Team & roles", Icon: Users },
  { id: "notifications", label: "Notifications", Icon: Bell },
  { id: "security", label: "Security", Icon: Shield },
  { id: "billing", label: "Billing", Icon: CreditCard },
];

function StatusChip({ status }: { status: KbEntry["status"] }) {
  if (status === "Ready") return <Badge variant="success">Ready</Badge>;
  if (status === "Processing") return <Badge variant="outline">Processing</Badge>;
  return <Badge variant="destructive">Failed</Badge>;
}

export function DashSettings() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[200px_1fr]">
      {/* Settings nav */}
      <Reveal delay={2} x={-12} y={0}>
        <aside className="flex flex-col gap-0.5">
          {NAV.map((n) => {
            const active = n.id === "ai";
            return (
              <div
                key={n.id}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium",
                  active
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground",
                )}
              >
                <n.Icon className={cn("size-4 shrink-0", active && "text-brand")} />
                {n.label}
              </div>
            );
          })}
        </aside>
      </Reveal>

      {/* AI Knowledge Base pane */}
      <Reveal delay={6}>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-start gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <Sparkles className="size-4" />
            </span>
            <div className="flex-1">
              <h2 className="text-base font-semibold">AI Knowledge Base</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Teach the AI your policies and FAQs. It answers DMs instantly,
                in your voice — and learns from every reply you send.
              </p>
            </div>
          </div>

          {/* Sub-tabs */}
          <div className="mt-5 flex items-center gap-6 border-b border-border">
            <span className="border-b-2 border-brand pb-2 text-sm font-medium text-foreground">
              Knowledge entries
            </span>
            <span className="pb-2 text-sm font-medium text-muted-foreground">
              Learned responses
            </span>
          </div>

          {/* Add controls */}
          <div className="mt-4 flex items-center gap-2">
            <div className="inline-flex gap-1 rounded-lg bg-secondary p-1">
              <span className="rounded-md bg-card px-3 py-1 text-sm font-medium shadow-sm">
                Upload file
              </span>
              <span className="rounded-md px-3 py-1 text-sm font-medium text-muted-foreground">
                Type text
              </span>
            </div>
            <Button variant="outline" size="sm" className="ml-auto">
              <Upload className="size-3.5" /> Add to knowledge base
            </Button>
          </div>

          {/* Entries */}
          <div className="mt-4 flex flex-col gap-2">
            {KB_ENTRIES.map((e, i) => (
              <Reveal key={e.id} delay={12 + i * 4} x={-8} y={4} spring="SNAPPY">
                <div className="flex items-center gap-3 rounded-lg border border-border bg-background/40 px-3 py-2.5">
                  <span className="flex size-8 items-center justify-center rounded-md bg-secondary text-muted-foreground">
                    {e.type === "file" ? (
                      <FileText className="size-4" />
                    ) : (
                      <Type className="size-4" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{e.label}</div>
                    <div className="font-mono text-xs text-muted-foreground">
                      {e.type} · {e.chunks} chunks
                    </div>
                  </div>
                  <StatusChip status={e.status} />
                  <Button variant="ghost" size="icon" className="size-8 text-muted-foreground">
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
