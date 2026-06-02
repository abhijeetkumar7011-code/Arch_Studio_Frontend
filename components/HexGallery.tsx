"use client";

/**
 * HexGallery
 * ----------
 * Flat-top hexagon gallery matching the screenshot:
 *  - 1 large hero hex (left)
 *  - 5 smaller hexes in a 2-row staggered grid (right)
 *
 * Usage:
 *   <HexGallery images={project.gallery} onOpen={(i) => setLightboxIndex(i)} />
 *
 * Pass at least 1 image; up to 6 are shown.
 */

import { useState } from "react";

interface HexGalleryProps {
  images: string[];
  onOpen?: (index: number) => void;
}

export default function HexGallery({ images, onOpen }: HexGalleryProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  // const imgs = images.slice(0, 6);
  const imgs = images;

  /* ── Geometry ── */
  // Large hex: flat-top, center (230, 255), R = 195
  const L = {
    cx: 230, cy: 255, R: 195,
    pts: () => flatHexPts(230, 255, 195),
  };

  // Small hexes: R = 118, centers placed to match screenshot
  const smalls = [
    { cx: 510, cy: 140 },
    { cx: 710, cy: 260 },
    { cx: 510, cy: 370 },
    { cx: 910, cy: 140 },
    { cx: 910, cy: 370 },
    { cx: 710, cy: 480 },
    { cx: 1110, cy: 260 },
    { cx: 1110, cy: 480 },
    { cx: 1310, cy: 140 },
    { cx: 1310, cy: 370 },
  ];

  const R_SM = 118;
  const W = 1450;
  const H = 650;

  return (
    <div
      className="
        w-full
        overflow-x-auto
        overflow-y-hidden
        pb-4
        scrollbar-thin
        scrollbar-thumb-white/10
      "
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={650}
        style={{
          minWidth: W,
          display: "block",
        }}
        xmlns="http://www.w3.org/2000/svg"
      // style={{ display: "block", background: "#0a0a0a", borderRadius: "16px" }}
      >
        <defs>
          {/* Large hex clip */}
          <clipPath id="hg-clip-0">
            <polygon points={L.pts()} />
          </clipPath>
          {/* Small hex clips */}
          {smalls.map((s, i) => (
            <clipPath key={i} id={`hg-clip-${i + 1}`}>
              <polygon points={flatHexPts(s.cx, s.cy, R_SM)} />
            </clipPath>
          ))}
        </defs>

        {/* ── Large hex ── */}
        {imgs[0] && (
          <g
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setHovered(0)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onOpen?.(0)}
          >
            <image
              href={imgs[0]}
              x={L.cx - L.R * Math.sqrt(3) / 2}
              y={L.cy - L.R}
              width={L.R * Math.sqrt(3)}
              height={L.R * 2}
              clipPath="url(#hg-clip-0)"
              preserveAspectRatio="xMidYMid slice"
              // style={{
              //   filter: hovered === 0 ? "brightness(1.15)" : "brightness(0.85)",
              //   transition: "filter 0.35s ease",
              // }}
              style={{
                cursor: "pointer",
                transform:
                  hovered === 0 ? "scale(1.05)" : "scale(1)",
                transformOrigin: `${L.cx}px ${L.cy}px`,
                transition: "all .35s ease",
              }}
            />
            {/* Border */}
            <polygon
              points={L.pts()}
              fill="none"
              stroke={hovered === 0 ? "rgba(214,198,184,0.6)" : "rgba(255,255,255,0.1)"}
              strokeWidth={hovered === 0 ? 2 : 1.5}
              style={{ transition: "all 0.3s ease" }}
            />
            {/* Hover expand icon */}
            {hovered === 0 && (
              <foreignObject
                x={L.cx - 24}
                y={L.cy - 24}
                width={48}
                height={48}
                style={{ overflow: "visible", pointerEvents: "none" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "48px",
                    height: "48px",
                    borderRadius: "9999px",
                    border: "1px solid rgba(255,255,255,0.3)",
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(8px)",
                    color: "#fff",
                    fontSize: "24px",
                  }}
                >
                  ⤢
                </div>
              </foreignObject>
            )}
          </g>
        )}

        {/* ── Small hexes ── */}
        {smalls.map((s, i) => {
          const idx = i + 1;
          const img = imgs[idx];
          if (!img) return null;
          const w = R_SM * Math.sqrt(3);
          const h = R_SM * 2;
          const isH = hovered === idx;

          return (
            <g
              key={idx}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onOpen?.(idx)}
            >
              <image
                href={img}
                x={s.cx - w / 2}
                y={s.cy - h / 2}
                width={w}
                height={h}
                clipPath={`url(#hg-clip-${idx})`}
                preserveAspectRatio="xMidYMid slice"
                // style={{
                //   filter: isH ? "brightness(1.15)" : "brightness(0.8)",
                //   transition: "filter 0.35s ease",
                // }}
                style={{
                  cursor: "pointer",
                  transform: isH ? "scale(1.05)" : "scale(1)",
                  transformOrigin: `${s.cx}px ${s.cy}px`,
                  transition: "all .35s ease",
                }}
              />
              <polygon
                points={flatHexPts(s.cx, s.cy, R_SM)}
                fill="none"
                stroke={isH ? "rgba(214,198,184,0.6)" : "rgba(255,255,255,0.1)"}
                strokeWidth={isH ? 2 : 1.5}
                style={{ transition: "all 0.3s ease" }}
              />
              {isH && (
                <foreignObject
                  x={s.cx - 20}
                  y={s.cy - 20}
                  width={40}
                  height={40}
                  style={{ overflow: "visible", pointerEvents: "none" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "40px",
                      height: "40px",
                      borderRadius: "9999px",
                      border: "1px solid rgba(255,255,255,0.3)",
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(8px)",
                      color: "#fff",
                      fontSize: "20px",
                    }}
                  >
                    ⤢
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}

        {/* Right fade for partial hex-5 */}
        <defs>
          <linearGradient id="hg-rfade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0a0a0a" stopOpacity="0" />
            <stop offset="100%" stopColor="#0a0a0a" stopOpacity="1" />
          </linearGradient>
        </defs>
        {/* <rect x={820} y={0} width={80} height={H} fill="url(#hg-rfade)" style={{ pointerEvents: "none" }} /> */}
      </svg>
    </div>
  );
}

/**
 * Returns SVG polygon points string for a flat-top hexagon.
 * @param cx  Center X
 * @param cy  Center Y
 * @param R   Circumradius (center → vertex)
 */
function flatHexPts(cx: number, cy: number, R: number): string {
  // Flat-top: vertices at 0°, 60°, 120°, 180°, 240°, 300°
  const angles = [0, 60, 120, 180, 240, 300];
  return angles
    .map((a) => {
      const rad = (a * Math.PI) / 180;
      const x = cx + R * Math.cos(rad);
      const y = cy + R * Math.sin(rad);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}