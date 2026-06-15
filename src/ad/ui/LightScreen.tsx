import { useId, type ReactNode } from "react";
import { F } from "../theme";
import { RADIUS, SHADOW, skinCss, CHAPTER, type Chapter } from "../tokens";

/**
 * Renders a dashboard screen at a fixed, large native pixel size, re-skinned to
 * the premium neutral base + a chapter accent. The skin is injected as scoped
 * CSS with `!important` so it overrides `DashboardChrome`'s own `.dash-light`
 * token declarations — no edits to the screen components.
 */
export function LightScreen({
  width = 1600,
  height = 1000,
  radius = RADIUS.xl,
  chapter = CHAPTER.hero,
  children,
}: {
  width?: number;
  height?: number;
  radius?: number;
  chapter?: Chapter;
  children: ReactNode;
}) {
  const rawId = useId();
  const id = `ls${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <div
      id={id}
      className="dash-root dash-light"
      style={{
        width,
        height,
        borderRadius: radius,
        overflow: "hidden",
        background: "#fff",
        border: "1px solid rgba(12,15,26,0.07)",
        boxShadow: SHADOW.float,
        fontFamily: F.display,
      }}
    >
      <style>{skinCss(id, chapter)}</style>
      {children}
    </div>
  );
}
