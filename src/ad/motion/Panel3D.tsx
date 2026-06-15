import type { CSSProperties, ReactNode } from "react";

/**
 * CSS-3D perspective wrapper — the core "UI as hero" tool. Children render at
 * their native large pixel size; depth comes from perspective + translateZ +
 * rotateX/Y, NEVER from scale() > 1 (which would blur the rasterised text).
 * Hold legible frames at rx=ry=0, tz=0, scale=1 so the UI is razor-sharp.
 */
export function Panel3D({
  rx = 0,
  ry = 0,
  tz = 0,
  scale = 1,
  opacity = 1,
  perspective = 2200,
  originY = "40%",
  shadow = true,
  className,
  style,
  children,
}: {
  rx?: number;
  ry?: number;
  tz?: number;
  scale?: number;
  opacity?: number;
  perspective?: number;
  originY?: string;
  shadow?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const flat = rx === 0 && ry === 0 && tz === 0 && scale === 1;
  return (
    <div
      style={{
        perspective,
        perspectiveOrigin: `50% ${originY}`,
        opacity,
      }}
    >
      <div
        className={className}
        style={{
          transformStyle: "preserve-3d",
          transform: flat
            ? "none"
            : `translateZ(${tz}px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`,
          backfaceVisibility: "hidden",
          willChange: "transform",
          filter: shadow
            ? "drop-shadow(0 60px 120px rgba(15,20,30,0.18))"
            : undefined,
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
}
