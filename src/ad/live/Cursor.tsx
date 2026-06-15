import { useCurrentFrame } from "remotion";
import { kf } from "../../anim";

export type CursorPoint = { f: number; x: number; y: number };

/**
 * An animated pointer that travels through waypoints and clicks on given
 * frames — the "someone is using the product" signal. Coordinates are in the
 * scene's 1920×1080 space.
 */
export function Cursor({
  path,
  clicks = [],
  accent = "#6366F1",
}: {
  path: CursorPoint[];
  clicks?: number[];
  accent?: string;
}) {
  const frame = useCurrentFrame();
  const x = kf(frame, path.map((p) => [p.f, p.x] as [number, number]));
  const y = kf(frame, path.map((p) => [p.f, p.y] as [number, number]));

  const click = clicks.reduce((acc, c) => {
    const d = frame - c;
    if (d < 0 || d > 18) return acc;
    return Math.max(acc, 1 - d / 18);
  }, 0);
  const press = clicks.some((c) => frame >= c && frame < c + 5);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        zIndex: 50,
        transform: `scale(${press ? 0.86 : 1})`,
        pointerEvents: "none",
        filter: "drop-shadow(0 6px 12px rgba(12,15,26,0.30))",
      }}
    >
      {click > 0 && (
        <span
          style={{
            position: "absolute",
            left: 2,
            top: 2,
            width: 46,
            height: 46,
            marginLeft: -23,
            marginTop: -23,
            borderRadius: "50%",
            border: `2px solid ${accent}`,
            opacity: click * 0.6,
            transform: `scale(${0.4 + (1 - click) * 1.1})`,
          }}
        />
      )}
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 3l14 8.5-6 1.4-1.6 6.1L5 3z"
          fill="#fff"
          stroke="#0C0F1A"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
