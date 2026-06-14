import type { ReactNode } from "react";
import {
  LayoutDashboard,
  Inbox as InboxIcon,
  PenSquare,
  CalendarDays,
  BarChart3,
  Settings,
  Bell,
  Users,
  Plus,
  Search,
  ChevronsLeft,
  LogOut,
  Moon,
} from "lucide-react";
import { cn } from "../shared/cn";
import { Button } from "../shared/ui/button";
import { Badge } from "../shared/ui/badge";
import { Input } from "../shared/ui/input";
import {
  USER,
  WORKSPACE,
  INSTAGRAM_ACCOUNTS,
  FACEBOOK_PAGES,
  TOTAL_UNREAD,
} from "../data/dummy";

type View =
  | "dashboard"
  | "inbox"
  | "posts"
  | "schedule"
  | "analytics"
  | "settings"
  | "compose";

const NAV_ITEMS = [
  { id: "dashboard", Icon: LayoutDashboard, label: "Dashboard" },
  { id: "inbox", Icon: InboxIcon, label: "Inbox" },
  { id: "posts", Icon: PenSquare, label: "Posts" },
  { id: "schedule", Icon: CalendarDays, label: "Schedule" },
  { id: "analytics", Icon: BarChart3, label: "Analytics" },
  { id: "settings", Icon: Settings, label: "Settings" },
] as const;

const VIEW_TITLES: Record<View, string> = {
  dashboard: "Dashboard",
  inbox: "Inbox",
  posts: "Posts",
  schedule: "Schedule",
  analytics: "Analytics",
  settings: "Settings",
  compose: "New post",
};

export function DashboardChrome({
  view,
  children,
}: {
  view: View;
  children: ReactNode;
}) {
  return (
    <div
      className="dash-root dash-light flex bg-background text-foreground overflow-hidden"
      style={{ height: "100%", width: "100%" }}
    >
      <Sidebar view={view} />
      <div className="flex flex-col flex-1 bg-background min-w-0 min-h-0">
        <Topbar view={view} />
        <div className="dash-canvas scroll" data-view={view}>
          {children}
        </div>
      </div>
    </div>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5 overflow-hidden">
      <span className="flex justify-center items-center bg-brand rounded-md size-7 font-display text-brand-foreground text-sm shrink-0">
        S
      </span>
      <span className="font-semibold text-base whitespace-nowrap">Syncly</span>
    </div>
  );
}

function Sidebar({ view }: { view: View }) {
  const initials = "MC";
  return (
    <aside className="flex flex-col bg-sidebar border-border border-r h-full w-[248px] shrink-0">
      <div className="flex items-center gap-2.5 px-4 border-border border-b h-14">
        <Brand />
      </div>

      <div className="px-3 pt-3">
        <Button variant="brand" className="w-full">
          <Plus className="size-4" />
          Compose
        </Button>
      </div>

      <nav className="flex flex-col flex-1 gap-1 px-3 py-4 overflow-y-auto">
        {NAV_ITEMS.map((it) => {
          const isActive = view === it.id;
          return (
            <div
              key={it.id}
              className={cn(
                "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm",
                isActive
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "top-1/2 left-0 absolute bg-brand rounded-r-full w-1 h-6 -translate-y-1/2",
                  isActive ? "opacity-100" : "opacity-0",
                )}
              />
              <it.Icon
                className={cn("size-[18px] shrink-0", isActive && "text-brand")}
              />
              <span className="flex-1">{it.label}</span>
              {it.id === "inbox" && (
                <Badge variant="brand" className="px-1.5">
                  {TOTAL_UNREAD}
                </Badge>
              )}
            </div>
          );
        })}
      </nav>

      <div className="px-3 py-3 border-border border-t">
        <div className="mb-2 px-1 font-medium text-[11px] text-muted-foreground uppercase tracking-wide">
          Connected
        </div>
        {INSTAGRAM_ACCOUNTS.map((a) => (
          <div
            key={a.id}
            className="flex items-center gap-2 px-1 py-1.5 rounded-md w-full text-foreground text-xs text-left"
          >
            <span className="bg-(--p-instagram) rounded-full size-2 shrink-0" />
            <span className="truncate">@{a.username}</span>
            <span className="ml-auto font-mono text-[10px] text-muted-foreground">
              on
            </span>
          </div>
        ))}
        {FACEBOOK_PAGES.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-2 px-1 py-1.5 rounded-md w-full text-foreground text-xs text-left"
          >
            <span className="bg-(--p-facebook) rounded-full size-2 shrink-0" />
            <span className="truncate">{p.pageName}</span>
            <span className="ml-auto font-mono text-[10px] text-muted-foreground">
              on
            </span>
          </div>
        ))}
      </div>

      <div className="p-3 border-border border-t">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg w-full text-left">
          <span className="flex justify-center items-center bg-gradient-to-br from-brand/80 to-chart-1 rounded-lg size-8 font-semibold text-brand-foreground text-xs shrink-0">
            {initials}
          </span>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm truncate">{USER.name}</div>
            <div className="text-muted-foreground text-xs truncate">
              {WORKSPACE.name} · {WORKSPACE.plan}
            </div>
          </div>
          <LogOut className="size-4 text-muted-foreground shrink-0" />
        </div>
        <div className="flex justify-center items-center gap-2 mt-1 px-2 py-2 rounded-lg w-full text-muted-foreground text-sm">
          <ChevronsLeft className="size-4" />
          <span>Collapse</span>
        </div>
      </div>
    </aside>
  );
}

function Topbar({ view }: { view: View }) {
  return (
    <header className="top-0 z-30 sticky flex items-center gap-4 bg-background/80 backdrop-blur-md px-5 border-border border-b h-14 shrink-0">
      <div className="flex items-center gap-2 text-sm">
        <span className="font-mono text-muted-foreground">{WORKSPACE.name}</span>
        <span className="text-border">/</span>
        <span className="font-semibold">{VIEW_TITLES[view]}</span>
      </div>

      <div className="hidden md:flex relative items-center ml-auto">
        <Search className="left-3 absolute size-4 text-muted-foreground pointer-events-none" />
        <Input placeholder="Search…" className="pl-9 w-56" />
        <span className="right-3 absolute font-mono text-[10px] text-muted-foreground pointer-events-none">
          ⌘K
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Moon className="size-[18px]" />
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-[18px]" />
          <span className="top-2 right-2 absolute bg-brand rounded-full size-1.5" />
        </Button>
        <Button variant="outline" size="sm">
          <Users className="size-4" /> Invite
        </Button>
        <Button variant="brand" size="sm">
          <Plus className="size-4" /> New post
        </Button>
      </div>
    </header>
  );
}
