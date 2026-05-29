"use client";

interface HoneycombGalleryProps {
  images: string[];
  onOpen: (i: number) => void;
}

export default function HoneycombGallery({ images, onOpen }: HoneycombGalleryProps) {
  const R = 90;
  const GAP = 25; 
  const W = R * Math.sqrt(3);

  // Function to get position - centered and padded
  const getPosition = (i: number) => {
    const isHero = i === 0;
    const radius = isHero ? R * 1.5 : R;
    const row = i < 3 ? 0 : 1;
    const col = i < 3 ? i : i - 3;

    // x, y calculation with extra padding to prevent clipping
    const x = col * (W + GAP) + (row === 1 ? (W / 2 + GAP / 2) : 0) + (isHero ? 120 : 180);
    const y = row * (R * 1.5 + GAP) + 120;

    return { x, y, r: radius };
  };

  function hexPoints(cx: number, cy: number, r: number): string {
    return Array.from({ length: 6 }, (_, i) => {
      const a = (i * 60 + 30) * (Math.PI / 180);
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(" ");
  }

  return (
    <div className="flex justify-center w-full py-10">
      {/* ViewBox size badha diya taaki hero hex bina cut hue fit ho */}
      <svg viewBox="0 0 1100 450" className="w-full max-w-6xl overflow-visible">
        {images.map((img, i) => {
          const { x, y, r } = getPosition(i);
          const isHero = i === 0;

          return (
            <g 
              key={i} 
              onClick={() => onOpen && onOpen(i)} // Safety check add kiya
              className="cursor-pointer group"
            >
              <defs>
                <clipPath id={`clip-${i}`}>
                  <polygon points={hexPoints(x, y, r - 2)} />
                </clipPath>
              </defs>

              <polygon
                points={hexPoints(x, y, r)}
                fill="transparent"
                stroke={isHero ? "#d6c6b8" : "rgba(255,255,255,0.1)"}
                strokeWidth={isHero ? 4 : 2}
              />

              <image
                href={img}
                x={x - r}
                y={y - r}
                width={r * 2}
                height={r * 2}
                preserveAspectRatio="xMidYMid slice"
                clipPath={`url(#clip-${i})`}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}