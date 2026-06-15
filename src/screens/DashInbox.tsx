import { useCurrentFrame } from "remotion";
import {
  IconSearch,
  IconFilter,
  IconSettings,
  IconIG,
  IconWA,
  IconFB,
  IconStar,
  IconArchive,
  IconUsers,
  IconImage,
  IconPaperclip,
  IconSmile,
  IconSend,
} from "../shared/icons";
import { Reveal } from "../anim";
import {
  CONVERSATIONS,
  AI_REPLY,
  type DConversation,
  type DMessage,
} from "../data/dummy";

const IG_COLOR = "var(--p-instagram)";

function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function convTime(iso: string) {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

function AiBadge({ status }: { status: DConversation["aiStatus"] }) {
  if (status === "AI_ACTIVE")
    return (
      <span style={{ fontSize: 11, color: "var(--accent)", lineHeight: 1 }}>
        🤖
      </span>
    );
  if (status === "AI_UNRESOLVED")
    return <span style={{ fontSize: 11, lineHeight: 1 }}>⚠️</span>;
  if (status === "HUMAN_TAKEOVER")
    return (
      <span style={{ fontSize: 11, color: "var(--fg-3)", lineHeight: 1 }}>
        👤
      </span>
    );
  return null;
}

function Bubble({
  m,
  delay,
  avatar,
}: {
  m: DMessage;
  delay: number;
  avatar: string;
}) {
  const isMe = m.direction === "OUTBOUND";
  return (
    <Reveal delay={delay} y={10} spring="SNAPPY">
      <div className={"inbox-msg " + (isMe ? "me" : "them")}>
        {!isMe && (
          <div className="inbox-msg-avatar">
            <span className="lp-preview-avatar" style={{ display: "grid" }}>
              {avatar}
            </span>
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            alignItems: isMe ? "flex-end" : "flex-start",
            maxWidth: "62%",
          }}
        >
          <div className="inbox-msg-bubble" style={{ maxWidth: "100%" }}>
            <div className="inbox-msg-text">{m.text}</div>
            <div className="inbox-msg-time mono">{fmtTime(m.sentAt)}</div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function DashInbox() {
  const frame = useCurrentFrame();
  const active = CONVERSATIONS[0];
  const avatar = "MR";

  const baseDelays = [2, 11, 20, 32];
  const lastMsgDelay = baseDelays[active.messages.length - 1];

  // AI reply beat
  const typingStart = lastMsgDelay + 24;
  const typingEnd = typingStart + 34;
  const replyStart = typingEnd;
  const showTyping = frame >= typingStart && frame < typingEnd;
  const showReply = frame >= replyStart;

  return (
    <div className="dash-inbox">
      {/* ── Left nav ── */}
      <aside className="inbox-nav">
        <div className="inbox-nav-head">
          <span className="inbox-nav-title">Team Inbox</span>
          <button
            className="btn btn-ghost btn-sm"
            style={{ padding: "2px 4px" }}
          >
            <IconSettings size={14} />
          </button>
        </div>

        <div className="inbox-nav-section">
          <div className="inbox-nav-section-label">Channels</div>
          <div className="inbox-nav-item active">
            <span className="inbox-nav-item-icon">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
            </span>
            <span className="inbox-nav-item-label">All Channels</span>
          </div>
          <div className="inbox-nav-item">
            <span
              className="inbox-nav-item-icon"
              style={{ color: "var(--p-instagram)" }}
            >
              <IconIG size={14} />
            </span>
            <span className="inbox-nav-item-label">Instagram</span>
            <span
              className="inbox-nav-item-badge"
              style={{
                background:
                  "color-mix(in srgb, var(--p-instagram) 12%, transparent)",
                color: "var(--p-instagram)",
              }}
            >
              1
            </span>
          </div>
          <div className="inbox-nav-item">
            <span
              className="inbox-nav-item-icon"
              style={{ color: "var(--p-whatsapp)" }}
            >
              <IconWA size={14} />
            </span>
            <span className="inbox-nav-item-label">WhatsApp</span>
            <span
              style={{ fontSize: 9, color: "var(--fg-3)", marginLeft: "auto" }}
            >
              ›
            </span>
          </div>
          <div className="inbox-nav-item">
            <span
              className="inbox-nav-item-icon"
              style={{ color: "var(--p-facebook)" }}
            >
              <IconFB size={14} />
            </span>
            <span className="inbox-nav-item-label">Messenger</span>
            <span
              className="inbox-nav-item-badge"
              style={{
                background:
                  "color-mix(in srgb, var(--p-facebook) 12%, transparent)",
                color: "var(--p-facebook)",
              }}
            >
              1
            </span>
          </div>
        </div>

        <div className="inbox-nav-section" style={{ flex: 1 }}>
          <div className="inbox-nav-item active">
            <span className="inbox-nav-item-label">All chats</span>
          </div>
          <div className="inbox-nav-item">
            <span className="inbox-nav-item-label">Active chats</span>
          </div>
          <div className="inbox-nav-item" style={{ opacity: 0.45 }}>
            <span className="inbox-nav-item-label">Assigned to me</span>
          </div>
          <div className="inbox-nav-item" style={{ opacity: 0.45 }}>
            <span className="inbox-nav-item-label">Unassigned</span>
          </div>
        </div>
      </aside>

      {/* ── Body: conversation list + thread ── */}
      <div className="inbox-body">
        {/* Conversation list */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minHeight: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 12px",
              borderBottom: "1px solid var(--border-0)",
              flexShrink: 0,
            }}
          >
            <div className="inbox-list-search" style={{ flex: 1 }}>
              <IconSearch size={13} />
              <input
                className="inbox-list-input"
                placeholder="Search conversations"
                readOnly
              />
            </div>
            <button className="btn btn-ghost btn-sm">
              <IconFilter size={13} />
            </button>
            <button className="btn btn-ghost btn-sm" style={{ fontSize: 11 }}>
              Select
            </button>
          </div>

          <div className="inbox-rows scroll" style={{ flex: 1 }}>
            {CONVERSATIONS.map((c, i) => {
              const last = c.messages[c.messages.length - 1];
              return (
                <Reveal
                  key={c.id}
                  delay={2 + i * 4}
                  x={-12}
                  y={0}
                  spring="SNAPPY"
                >
                  <div
                    className="inbox-row-wrap"
                    style={{ display: "flex", alignItems: "stretch" }}
                  >
                    <button
                      className={"inbox-row" + (i === 0 ? " active" : "")}
                      style={{ flex: 1 }}
                    >
                      <div className="inbox-row-avatar-wrap">
                        <div className="inbox-row-avatar">
                          <span
                            className="inbox-row-avatar-fallback"
                            style={{ display: "grid" }}
                          >
                            {(c.participantName ?? "?")
                              .slice(0, 2)
                              .toUpperCase()}
                          </span>
                        </div>
                        <span
                          className="inbox-row-platform"
                          style={{ background: IG_COLOR }}
                        />
                      </div>
                      <div className="inbox-row-body">
                        <div className="inbox-row-top">
                          <div className="inbox-row-name-block">
                            <span className="inbox-row-name">
                              {c.participantName}
                            </span>
                            <span className="inbox-row-handle">
                              @{c.participantUsername}
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            <AiBadge status={c.aiStatus} />
                            <span className="mono inbox-row-time">
                              {convTime(c.lastMessageAt)}
                            </span>
                          </div>
                        </div>
                        <div
                          className="inbox-row-prev"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <span
                            className="inbox-row-prev-text"
                            style={{
                              flex: 1,
                              fontWeight: c.unread > 0 ? 600 : 400,
                            }}
                          >
                            {last.text}
                          </span>
                          {c.unread > 0 && (
                            <span
                              style={{
                                background: "var(--accent)",
                                color: "var(--accent-fg)",
                                borderRadius: 999,
                                fontSize: 10,
                                fontWeight: 700,
                                padding: "1px 5px",
                                lineHeight: "14px",
                                flexShrink: 0,
                              }}
                            >
                              {c.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Thread */}
        <section
          className="inbox-thread"
          style={{
            borderRadius: 0,
            border: "none",
            background: "transparent",
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <header className="inbox-thread-head">
            <div className="inbox-thread-id">
              <div className="inbox-thread-avatar">
                <span
                  className="lp-preview-avatar lg inbox-thread-avatar-fallback"
                  style={{ display: "grid" }}
                >
                  {avatar}
                </span>
              </div>
              <div>
                <div className="inbox-thread-name">
                  {active.participantName}
                </div>
                <div className="inbox-thread-meta">
                  <span className="pdot" style={{ background: IG_COLOR }} />
                  <span>Instagram</span>
                  <span className="inbox-thread-meta-sep">·</span>
                  <span className="mono" style={{ fontSize: 10 }}>
                    @{active.participantUsername}
                  </span>
                </div>
              </div>
            </div>
            <div className="inbox-thread-actions">
              <button className="btn btn-ghost btn-sm">
                <IconStar size={14} />
              </button>
              <button className="btn btn-ghost btn-sm">
                <IconArchive size={14} />
              </button>
              <button className="btn btn-sm">
                <IconUsers size={12} /> Assign
              </button>
              <button className="btn btn-sm btn-accent">🤖 AI active</button>
              <button className="btn btn-sm">Resolve</button>
            </div>
          </header>

          <div className="inbox-thread-body scroll">
            <div style={{ flex: "1 1 0", minHeight: 0 }} aria-hidden="true" />
            <div>
              <div className="inbox-thread-divider">
                <span>Today</span>
              </div>
              {active.messages.map((m, i) => (
                <Bubble
                  key={m.id}
                  m={m}
                  delay={baseDelays[i]}
                  avatar={avatar}
                />
              ))}

              {showTyping && (
                <div className="inbox-msg them" style={{ padding: "6px 14px" }}>
                  <div
                    className="inbox-msgs-loading"
                    style={{ padding: 0, gap: 4 }}
                  >
                    <span
                      className="inbox-msgs-loading-dot"
                      style={{ width: 6, height: 6 }}
                    />
                    <span
                      className="inbox-msgs-loading-dot"
                      style={{ width: 6, height: 6, animationDelay: "0.15s" }}
                    />
                    <span
                      className="inbox-msgs-loading-dot"
                      style={{ width: 6, height: 6, animationDelay: "0.3s" }}
                    />
                  </div>
                  <span
                    className="mono"
                    style={{
                      fontSize: 11,
                      color: "var(--fg-3)",
                      marginLeft: 6,
                    }}
                  >
                    AI is typing…
                  </span>
                </div>
              )}

              {showReply && (
                <Reveal delay={replyStart} y={8} spring="SNAPPY" className="inbox-msg me">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                      alignItems: "flex-end",
                      maxWidth: "62%",
                    }}
                  >
                    <div
                      className="inbox-msg-bubble"
                      style={{ maxWidth: "100%" }}
                    >
                      <div className="inbox-msg-text">{AI_REPLY}</div>
                      <div className="inbox-msg-time mono">now · 🤖 AI</div>
                    </div>
                  </div>
                </Reveal>
              )}
            </div>
          </div>

          <footer className="inbox-thread-input">
            <div className="inbox-input-meta">
              <span>Replying as</span>
              <span className="chip">
                <span className="pdot" style={{ background: IG_COLOR }} />{" "}
                @atlasstudio
              </span>
              <span className="mono inbox-input-meta-tail">
                Shift + Enter for newline
              </span>
            </div>
            <div className="inbox-input-field">
              <textarea
                className="inbox-input-text"
                placeholder="Reply to Maya Rivera…"
                rows={2}
                readOnly
              />
              <div className="inbox-input-tools">
                <div className="inbox-input-tools-left">
                  <button className="btn btn-ghost btn-sm">
                    <IconImage size={14} />
                  </button>
                  <button className="btn btn-ghost btn-sm">
                    <IconPaperclip size={14} />
                  </button>
                  <button className="btn btn-ghost btn-sm">
                    <IconSmile size={14} />
                  </button>
                </div>
                <button className="btn btn-accent btn-sm">
                  <IconSend size={12} /> Send
                </button>
              </div>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}
