import type { CSSProperties } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONT, MONO } from "../constants";

// ── Shared: macOS-style app window frame ─────────────────────────────────────
const AppFrame = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: CSSProperties;
}) => (
  <div
    style={{
      borderRadius: 12,
      overflow: "hidden",
      border: `1px solid ${C.BORDER0}`,
      boxShadow: C.SHADOW_LG,
      background: C.BG1,
      display: "flex",
      flexDirection: "column",
      ...style,
    }}
  >
    {/* Window chrome */}
    <div
      style={{
        background: C.BG2,
        padding: "10px 16px",
        borderBottom: `1px solid ${C.BORDER0}`,
        display: "flex",
        alignItems: "center",
        gap: 6,
        flexShrink: 0,
      }}
    >
      {(["#FF5F57", "#FFBD2E", "#28C840"] as const).map((c) => (
        <div
          key={c}
          style={{
            width: 11,
            height: 11,
            borderRadius: "50%",
            background: c,
            flexShrink: 0,
          }}
        />
      ))}
    </div>
    {children}
  </div>
);

// ── Mockup 1: Compose ─────────────────────────────────────────────────────────
const ComposeMockup = () => {
  const frame = useCurrentFrame();
  const cursorOn = Math.floor(frame / 20) % 2 === 0;

  const topbarBtns = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 16px",
        borderBottom: `1px solid ${C.BORDER0}`,
        background: C.BG1,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontFamily: FONT,
          fontSize: 13,
          fontWeight: 600,
          color: C.FG0,
        }}
      >
        <span style={{ color: C.FG3, fontSize: 18, fontWeight: 300 }}>←</span>
        New post
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <Chip label="Draft" muted />
        <Btn label="Schedule" accent />
      </div>
    </div>
  );

  return (
    <AppFrame style={{ height: "100%" }}>
      {topbarBtns}
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* Left panel */}
        <div
          style={{
            flex: 1,
            padding: "20px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            overflowY: "hidden",
          }}
        >
          {/* Publish to */}
          <FieldBlock label="Publish to">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "5px 10px",
                border: `1px solid ${C.BORDER0}`,
                borderRadius: 6,
                fontFamily: FONT,
                fontSize: 12,
                fontWeight: 500,
                color: C.FG1,
              }}
            >
              <Dot color={C.INSTAGRAM} />
              yourbrand
              <span
                style={{
                  marginLeft: 4,
                  fontSize: 10,
                  color: C.OK,
                  fontFamily: MONO,
                  letterSpacing: "0.04em",
                }}
              >
                CONNECTED
              </span>
            </div>
          </FieldBlock>

          {/* Post type */}
          <FieldBlock label="Type">
            <div
              style={{
                display: "inline-flex",
                border: `1px solid ${C.BORDER0}`,
                borderRadius: 6,
                overflow: "hidden",
                fontFamily: FONT,
                fontSize: 12,
              }}
            >
              {["Image", "Carousel", "Reel"].map((t, i) => (
                <div
                  key={t}
                  style={{
                    padding: "5px 14px",
                    background: i === 0 ? C.BG1 : C.BG2,
                    color: i === 0 ? C.FG0 : C.FG3,
                    fontWeight: i === 0 ? 600 : 400,
                    borderRight:
                      i < 2 ? `1px solid ${C.BORDER0}` : undefined,
                    boxShadow: i === 0 ? C.SHADOW_SM : undefined,
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
          </FieldBlock>

          {/* Media */}
          <FieldBlock label="Media">
            <div
              style={{
                height: 100,
                border: `1.5px dashed ${C.BORDER1}`,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: C.BG2,
                fontFamily: FONT,
                fontSize: 12,
                color: C.FG3,
                gap: 6,
              }}
            >
              <span style={{ fontSize: 16 }}>+</span> Upload media
            </div>
          </FieldBlock>

          {/* Caption */}
          <FieldBlock label="Caption">
            <div
              style={{
                background: C.BG2,
                border: `1px solid ${C.BORDER0}`,
                borderRadius: 8,
                padding: "10px 12px",
                minHeight: 72,
                fontFamily: FONT,
                fontSize: 13,
                color: C.FG1,
                lineHeight: 1.6,
              }}
            >
              Excited to share our latest drop with you all...
              {cursorOn && (
                <span
                  style={{
                    display: "inline-block",
                    width: 1.5,
                    height: 15,
                    background: C.ACCENT,
                    marginLeft: 1,
                    verticalAlign: "text-bottom",
                  }}
                />
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    color: C.FG3,
                  }}
                >
                  42 / 2200
                </span>
              </div>
            </div>
          </FieldBlock>

          {/* Schedule */}
          <FieldBlock label="Schedule">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: FONT,
                fontSize: 13,
                color: C.ACCENT,
                fontWeight: 500,
              }}
            >
              <span>⊙</span> Tomorrow · 9:00 AM
            </div>
          </FieldBlock>
        </div>

        {/* Divider */}
        <div style={{ width: 1, background: C.BORDER0, flexShrink: 0 }} />

        {/* Right: phone mockup */}
        <div
          style={{
            width: 160,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            flexShrink: 0,
            background: C.BG2,
          }}
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "9/16",
              background: "#000",
              borderRadius: 14,
              border: `2px solid ${C.BORDER1}`,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: "8px 10px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                borderBottom: "1px solid #222",
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: C.INSTAGRAM,
                }}
              />
              <span
                style={{
                  fontSize: 9,
                  color: "#fff",
                  fontFamily: FONT,
                  fontWeight: 600,
                }}
              >
                yourbrand
              </span>
            </div>
            <div
              style={{
                flex: 1,
                background: `linear-gradient(160deg, #1a1a2e 0%, #2d1b69 100%)`,
              }}
            />
            <div
              style={{
                padding: "6px 10px",
                fontSize: 8,
                color: "#ccc",
                fontFamily: FONT,
              }}
            >
              Excited to share our latest drop...
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  );
};

// ── Mockup 2: Unified Inbox ───────────────────────────────────────────────────
const CONVOS = [
  { initials: "AM", color: "#7C3AED", name: "Aria M.",   preview: "Hey, is this still available?",   time: "2m",  unread: 2, active: true  },
  { initials: "JR", color: "#2563EB", name: "Jake R.",   preview: "Love the quality, thank you!",    time: "14m", unread: 0, active: false },
  { initials: "PK", color: "#D97706", name: "Priya K.",  preview: "When does the sale end?",         time: "1h",  unread: 1, active: false },
  { initials: "CS", color: "#059669", name: "Carlos S.", preview: "Can I get a custom size?",        time: "3h",  unread: 0, active: false },
];

const MESSAGES = [
  { text: "Hey, is this still available? Saw it on Instagram 👀",  out: false },
  { text: "Yes! Still in stock in sizes S–XL. Want me to hold one for you?", out: true },
  { text: "That'd be amazing, I'll take a medium please!",          out: false },
];

const InboxMockup = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AppFrame style={{ height: "100%" }}>
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* Conversation list */}
        <div
          style={{
            width: 280,
            flexShrink: 0,
            borderRight: `1px solid ${C.BORDER0}`,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Search */}
          <div
            style={{
              padding: "10px 12px",
              borderBottom: `1px solid ${C.BORDER0}`,
            }}
          >
            <div
              style={{
                background: C.BG2,
                border: `1px solid ${C.BORDER0}`,
                borderRadius: 6,
                padding: "6px 10px",
                fontFamily: FONT,
                fontSize: 12,
                color: C.FG3,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span>⊕</span> Search messages
            </div>
          </div>

          {/* Filter pills */}
          <div
            style={{
              display: "flex",
              gap: 4,
              padding: "8px 10px",
              borderBottom: `1px solid ${C.BORDER0}`,
            }}
          >
            {["All", "Instagram", "Unread"].map((f, i) => (
              <div
                key={f}
                style={{
                  padding: "3px 10px",
                  borderRadius: 999,
                  border: `1px solid ${i === 0 ? C.FG0 : C.BORDER0}`,
                  background: i === 0 ? C.FG0 : "transparent",
                  color: i === 0 ? C.BG1 : C.FG2,
                  fontFamily: FONT,
                  fontSize: 11,
                  fontWeight: i === 0 ? 500 : 400,
                }}
              >
                {f}
              </div>
            ))}
          </div>

          {/* Conversation rows */}
          {CONVOS.map((c, i) => {
            const rowP = spring({
              frame: Math.max(0, frame - i * 8),
              fps,
              config: { damping: 22, stiffness: 160 },
            });
            const rowY = interpolate(rowP, [0, 1], [16, 0]);
            const rowOpacity = interpolate(rowP, [0, 0.4], [0, 1], {
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={c.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  borderBottom: `1px solid ${C.BORDER0}`,
                  background: c.active
                    ? "oklch(0.96 0.025 200)"
                    : "transparent",
                  borderLeft: c.active ? `2px solid ${C.ACCENT}` : "2px solid transparent",
                  transform: `translateY(${rowY}px)`,
                  opacity: rowOpacity,
                }}
              >
                <Avatar initials={c.initials} color={c.color} size={30} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: 4,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT,
                        fontSize: 13,
                        fontWeight: 600,
                        color: C.FG0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {c.name}
                    </span>
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: 10,
                        color: C.FG3,
                        flexShrink: 0,
                      }}
                    >
                      {c.time}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      marginTop: 2,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT,
                        fontSize: 11,
                        color: C.FG2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        flex: 1,
                      }}
                    >
                      {c.preview}
                    </span>
                    {c.unread > 0 && (
                      <span
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: C.FG0,
                          color: C.BG1,
                          fontFamily: FONT,
                          fontSize: 10,
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {c.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Thread */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          {/* Thread header */}
          <div
            style={{
              padding: "10px 16px",
              borderBottom: `1px solid ${C.BORDER0}`,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Avatar initials="AM" color="#7C3AED" size={30} />
            <div>
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: 13,
                  fontWeight: 600,
                  color: C.FG0,
                }}
              >
                Aria M.
              </div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  color: C.FG3,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Dot color={C.INSTAGRAM} size={6} /> Instagram DM
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              overflowY: "hidden",
            }}
          >
            {MESSAGES.map((m, i) => {
              const msgP = spring({
                frame: Math.max(0, frame - i * 10 - 10),
                fps,
                config: { damping: 20, stiffness: 150 },
              });
              const msgOpacity = interpolate(msgP, [0, 0.4], [0, 1], {
                extrapolateRight: "clamp",
              });
              const msgY = interpolate(msgP, [0, 1], [14, 0]);

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: m.out ? "flex-end" : "flex-start",
                    opacity: msgOpacity,
                    transform: `translateY(${msgY}px)`,
                  }}
                >
                  <div
                    style={{
                      maxWidth: "62%",
                      padding: "8px 12px",
                      borderRadius: m.out
                        ? "14px 4px 14px 14px"
                        : "4px 14px 14px 14px",
                      background: m.out ? C.ACCENT : C.BG2,
                      color: m.out ? "#fff" : C.FG0,
                      fontFamily: FONT,
                      fontSize: 13,
                      lineHeight: 1.55,
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input bar */}
          <div
            style={{
              padding: "10px 14px",
              borderTop: `1px solid ${C.BORDER0}`,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                flex: 1,
                background: C.BG2,
                border: `1px solid ${C.BORDER0}`,
                borderRadius: 8,
                padding: "8px 12px",
                fontFamily: FONT,
                fontSize: 12,
                color: C.FG3,
              }}
            >
              Type a message...
            </div>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: C.FG0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: C.BG1,
                fontSize: 14,
              }}
            >
              ↑
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  );
};

// ── Mockup 3: AI Auto-Reply ───────────────────────────────────────────────────
const AIMockup = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const TYPING_END = 35;
  const isTyping = frame < TYPING_END;

  const dot = (phase: number) =>
    0.35 + 0.65 * Math.abs(Math.sin((frame / fps) * Math.PI * 2.8 + phase));

  const replyP = spring({
    frame: Math.max(0, frame - TYPING_END),
    fps,
    config: { damping: 18, stiffness: 130 },
  });
  const replyOpacity = interpolate(replyP, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });
  const replyY = interpolate(replyP, [0, 1], [16, 0]);

  return (
    <AppFrame style={{ height: "100%" }}>
      {/* Header */}
      <div
        style={{
          padding: "10px 16px",
          borderBottom: `1px solid ${C.BORDER0}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar initials="AM" color="#7C3AED" size={30} />
          <div>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 13,
                fontWeight: 600,
                color: C.FG0,
              }}
            >
              Aria M.
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 10,
                color: C.FG3,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Dot color={C.INSTAGRAM} size={6} /> Instagram DM
            </div>
          </div>
        </div>
        {/* AI badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "4px 10px",
            border: `1px solid ${C.ACCENT}`,
            borderRadius: 999,
            fontFamily: FONT,
            fontSize: 11,
            fontWeight: 600,
            color: C.ACCENT,
            background: C.ACCENT_SOFT,
          }}
        >
          ✦ AI Active
        </div>
      </div>

      {/* Thread */}
      <div
        style={{
          flex: 1,
          padding: "20px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          overflowY: "hidden",
        }}
      >
        {/* Customer */}
        <div style={{ display: "flex", gap: 8 }}>
          <Avatar initials="AM" color="#7C3AED" size={28} />
          <div
            style={{
              maxWidth: "65%",
              padding: "10px 14px",
              borderRadius: "4px 14px 14px 14px",
              background: C.BG2,
              fontFamily: FONT,
              fontSize: 14,
              color: C.FG0,
              lineHeight: 1.55,
            }}
          >
            Hi! What are your business hours? Do you ship internationally? 🌍
          </div>
        </div>

        {/* AI typing or reply */}
        {isTyping ? (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                padding: "12px 18px",
                borderRadius: "14px 4px 14px 14px",
                background: C.ACCENT_SOFT,
                border: `1px solid ${C.BORDER1}`,
                display: "flex",
                gap: 5,
                alignItems: "center",
              }}
            >
              {[0, 0.9, 1.8].map((phase, i) => (
                <div
                  key={i}
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: C.ACCENT,
                    opacity: dot(phase),
                  }}
                />
              ))}
            </div>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: C.ACCENT,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                color: "#fff",
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              ✦
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
              alignItems: "flex-end",
              opacity: replyOpacity,
              transform: `translateY(${replyY}px)`,
            }}
          >
            <div
              style={{
                maxWidth: "65%",
                padding: "10px 14px",
                borderRadius: "14px 4px 14px 14px",
                background: C.ACCENT,
                fontFamily: FONT,
                fontSize: 14,
                color: "#fff",
                lineHeight: 1.55,
              }}
            >
              Hey! We're open Mon–Sat 9AM–6PM EST. And yes — we ship
              worldwide! 🚀 Anything else I can help with?
            </div>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: C.ACCENT,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                color: "#fff",
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              ✦
            </div>
          </div>
        )}

        {/* Confirmation */}
        {!isTyping && (
          <div
            style={{
              marginTop: 4,
              opacity: replyOpacity,
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontFamily: MONO,
              fontSize: 11,
              color: C.FG3,
              justifyContent: "flex-end",
            }}
          >
            <span style={{ color: C.OK }}>✓</span>
            AI replied in 0.9s · from knowledge base
          </div>
        )}
      </div>

      {/* Input */}
      <div
        style={{
          padding: "10px 14px",
          borderTop: `1px solid ${C.BORDER0}`,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            flex: 1,
            background: C.BG2,
            border: `1px solid ${C.BORDER0}`,
            borderRadius: 8,
            padding: "7px 12px",
            fontFamily: FONT,
            fontSize: 12,
            color: C.FG3,
          }}
        >
          AI is handling this conversation...
        </div>
        <div
          style={{
            padding: "6px 12px",
            border: `1px solid ${C.BORDER1}`,
            borderRadius: 6,
            fontFamily: FONT,
            fontSize: 11,
            fontWeight: 500,
            color: C.FG2,
          }}
        >
          Take over
        </div>
      </div>
    </AppFrame>
  );
};

// ── Mockup 4: Knowledge Base ──────────────────────────────────────────────────
const KB_DOCS = [
  { icon: "📄", name: "Brand Guidelines.pdf",  chunks: 42, status: "Active",     statusColor: C.OK   },
  { icon: "📝", name: "Product FAQ.docx",       chunks: 88, status: "Active",     statusColor: C.OK   },
  { icon: "📃", name: "Shipping Policy.txt",    chunks: 17, status: "Active",     statusColor: C.OK   },
  { icon: "✦",  name: "Learned responses",      chunks: 36, status: "Growing",    statusColor: C.ACCENT },
];

const KnowledgeMockup = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AppFrame style={{ height: "100%" }}>
      {/* Topbar */}
      <div
        style={{
          padding: "10px 16px",
          borderBottom: `1px solid ${C.BORDER0}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: C.FG0 }}>
          AI Knowledge Base
        </div>
        <Btn label="+ Add source" accent />
      </div>

      {/* Sub-tabs */}
      <div
        style={{
          display: "flex",
          gap: 0,
          borderBottom: `1px solid ${C.BORDER0}`,
          padding: "0 16px",
        }}
      >
        {["Knowledge entries", "Learned responses"].map((t, i) => (
          <div
            key={t}
            style={{
              padding: "8px 14px",
              fontFamily: FONT,
              fontSize: 12,
              fontWeight: i === 0 ? 600 : 400,
              color: i === 0 ? C.FG0 : C.FG3,
              borderBottom: i === 0 ? `2px solid ${C.ACCENT}` : "2px solid transparent",
            }}
          >
            {t}
          </div>
        ))}
      </div>

      {/* Doc list — 2×2 grid */}
      <div
        style={{
          padding: "12px 16px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
        }}
      >
        {KB_DOCS.map((doc, i) => {
          const p = spring({
            frame: Math.max(0, frame - i * 10),
            fps,
            config: { damping: 22, stiffness: 160 },
          });
          const rowY = interpolate(p, [0, 1], [18, 0]);
          const rowOpacity = interpolate(p, [0, 0.4], [0, 1], {
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={doc.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 14px",
                background: C.BG2,
                border: `1px solid ${C.BORDER0}`,
                borderRadius: 8,
                transform: `translateY(${rowY}px)`,
                opacity: rowOpacity,
              }}
            >
              <span
                style={{
                  fontSize: 20,
                  color: doc.statusColor,
                  flexShrink: 0,
                  lineHeight: 1,
                }}
              >
                {doc.icon}
              </span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 13,
                    fontWeight: 500,
                    color: C.FG0,
                    marginBottom: 2,
                  }}
                >
                  {doc.name}
                </div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    color: C.FG3,
                  }}
                >
                  {doc.chunks} chunks indexed
                </div>
              </div>
              <div
                style={{
                  padding: "3px 9px",
                  borderRadius: 999,
                  background:
                    doc.status === "Active"
                      ? "oklch(0.95 0.03 150)"
                      : C.ACCENT_SOFT,
                  color: doc.statusColor,
                  fontFamily: MONO,
                  fontSize: 10,
                  fontWeight: 600,
                }}
              >
                {doc.status}
              </div>
            </div>
          );
        })}
      </div>
    </AppFrame>
  );
};

// ── Shared primitives ─────────────────────────────────────────────────────────
const Avatar = ({
  initials,
  color,
  size = 30,
}: {
  initials: string;
  color: string;
  size?: number;
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: size * 0.37,
      fontWeight: 600,
      color: "#fff",
      fontFamily: FONT,
      flexShrink: 0,
    }}
  >
    {initials}
  </div>
);

const Dot = ({ color, size = 7 }: { color: string; size?: number }) => (
  <span
    style={{
      display: "inline-block",
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      flexShrink: 0,
    }}
  />
);

const Chip = ({ label, muted }: { label: string; muted?: boolean }) => (
  <div
    style={{
      padding: "4px 10px",
      border: `1px solid ${C.BORDER1}`,
      borderRadius: 6,
      fontFamily: FONT,
      fontSize: 11,
      fontWeight: 500,
      color: muted ? C.FG2 : C.FG0,
      background: C.BG2,
    }}
  >
    {label}
  </div>
);

const Btn = ({ label, accent }: { label: string; accent?: boolean }) => (
  <div
    style={{
      padding: "5px 12px",
      borderRadius: 6,
      background: accent ? C.FG0 : C.BG2,
      border: `1px solid ${accent ? C.FG0 : C.BORDER1}`,
      fontFamily: FONT,
      fontSize: 11,
      fontWeight: 600,
      color: accent ? C.BG1 : C.FG1,
    }}
  >
    {label}
  </div>
);

const FieldBlock = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
    <span
      style={{
        fontFamily: MONO,
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: "0.07em",
        textTransform: "uppercase",
        color: C.FG3,
      }}
    >
      {label}
    </span>
    {children}
  </div>
);

// ── Feature card with slide-in/out transition ────────────────────────────────
const FeatureSlide = ({
  number,
  label,
  title,
  bullets,
  Mockup,
  dur,
}: {
  number: string;
  label: string;
  title: string;
  bullets: readonly string[];
  Mockup: () => JSX.Element;
  dur: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ENTER = 22;
  const EXIT_START = dur - 18;

  // Spring enter from right
  const enterP = spring({
    frame,
    fps,
    config: { damping: 22, stiffness: 130 },
    durationInFrames: ENTER * 2,
  });
  const enterX = interpolate(enterP, [0, 1], [80, 0], {
    easing: Easing.out(Easing.cubic),
  });
  const enterOpacity = interpolate(enterP, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Linear exit to left
  const exitProgress = interpolate(frame, [EXIT_START, dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitX = interpolate(exitProgress, [0, 1], [0, -80]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  // Left panel stagger
  const leftP = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 22, stiffness: 130 },
  });
  const leftY = interpolate(leftP, [0, 1], [30, 0]);
  const leftOpacity = interpolate(leftP, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        transform: `translateX(${enterX + exitX}px)`,
        opacity: Math.min(enterOpacity, exitOpacity),
        display: "flex",
        alignItems: "center",
        paddingInline: 120,
        gap: 80,
        background: C.BG0,
      }}
    >
      {/* Left: copy */}
      <div
        style={{
          flex: "0 0 420px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          transform: `translateY(${leftY}px)`,
          opacity: leftOpacity,
        }}
      >
        {/* Number + label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: "0.1em",
            color: C.FG3,
          }}
        >
          <span style={{ color: C.ACCENT, fontWeight: 600 }}>{number}</span>
          <div
            style={{ flex: 1, height: 1, background: C.BORDER0 }}
          />
          <span>{label.toUpperCase()}</span>
        </div>

        {/* Title */}
        <h2
          style={{
            margin: 0,
            fontFamily: FONT,
            fontSize: 52,
            fontWeight: 700,
            letterSpacing: "-0.035em",
            lineHeight: 1.1,
            color: C.FG0,
            whiteSpace: "pre-line",
          }}
        >
          {title}
        </h2>

        {/* Bullets */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {bullets.map((b) => (
            <div
              key={b}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                fontFamily: FONT,
                fontSize: 17,
                color: C.FG2,
                lineHeight: 1.5,
              }}
            >
              <span
                style={{
                  color: C.OK,
                  fontWeight: 700,
                  flexShrink: 0,
                  marginTop: 1,
                }}
              >
                ✓
              </span>
              {b}
            </div>
          ))}
        </div>
      </div>

      {/* Right: mockup */}
      <div style={{ flex: 1, height: 660, minWidth: 0 }}>
        <Mockup />
      </div>
    </AbsoluteFill>
  );
};

// ── Main scene ────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    number: "01", label: "Content",
    title: "Compose &\nSchedule",
    bullets: [
      "Live Instagram preview",
      "Schedule posts days ahead",
      "Image, Carousel & Reels",
    ],
    Mockup: ComposeMockup,
    dur: 75,
  },
  {
    number: "02", label: "Messaging",
    title: "Unified\nInbox",
    bullets: [
      "All DMs in one place",
      "Real-time notifications",
      "Read receipts & history",
    ],
    Mockup: InboxMockup,
    dur: 75,
  },
  {
    number: "03", label: "Automation",
    title: "AI\nAuto-Reply",
    bullets: [
      "Replies in under 1 second",
      "Trained on your brand voice",
      "Escalates when needed",
    ],
    Mockup: AIMockup,
    dur: 75,
  },
  {
    number: "04", label: "Intelligence",
    title: "Knowledge\nBase",
    bullets: [
      "Upload PDF, DOCX, TXT",
      "Learns from human replies",
      "Hybrid semantic search",
    ],
    Mockup: KnowledgeMockup,
    dur: 75,
  },
] as const;

export const SceneFeatures = () => {
  let from = 0;
  return (
    <AbsoluteFill style={{ background: C.BG0 }}>
      {FEATURES.map((f) => {
        const seq = (
          <Sequence key={f.number} from={from} durationInFrames={f.dur}>
            <FeatureSlide {...f} />
          </Sequence>
        );
        from += f.dur;
        return seq;
      })}
    </AbsoluteFill>
  );
};
