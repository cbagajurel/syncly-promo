import { Img, staticFile } from "remotion";
import { C, DISPLAY } from "../constants";

/**
 * Syncly logo lockup — the app-icon mark (public/syncly.png) + wordmark.
 * Theme-aware: `tone="light"` for dark backdrops, `tone="dark"` for paper.
 */
export const Logo = ({
  size = 64,
  tone = "light",
  mark = true,
  wordmark = true,
}: {
  size?: number;
  tone?: "light" | "dark";
  mark?: boolean;
  wordmark?: boolean;
}) => {
  const fg = tone === "light" ? C.WHITE : C.PAPER_FG;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size * 0.34,
      }}
    >
      {mark && (
        <Img
          src={staticFile("syncly.png")}
          style={{
            width: size,
            height: size,
            borderRadius: size * 0.225,
            filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.35))",
          }}
        />
      )}
      {wordmark && (
        <span
          style={{
            fontFamily: DISPLAY,
            fontSize: size * 0.78,
            fontWeight: 600,
            letterSpacing: "-0.035em",
            lineHeight: 1,
            color: fg,
          }}
        >
          Syncly
        </span>
      )}
    </div>
  );
};
