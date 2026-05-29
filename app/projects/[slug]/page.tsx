"use client";

import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { use, useState } from "react";
import Footer from "@/components/Footer";

type Props = { params: Promise<{ slug: string }> };

/* ══════════════════════════════════════════════
   HEX GALLERY — matches screenshot exactly
   1 large hero hex (left) + 5 small hexes (right)
   Flat-top geometry, gap between hexes via spacing
══════════════════════════════════════════════ */

function flatHexPts(cx: number, cy: number, R: number): string {
  return [0, 60, 120, 180, 240, 300]
    .map((a) => {
      const rad = (a * Math.PI) / 180;
      return `${(cx + R * Math.cos(rad)).toFixed(2)},${(cy + R * Math.sin(rad)).toFixed(2)}`;
    })
    .join(" ");
}

function HexGallery({
  images,
  onOpen,
}: {
  images: string[];
  onOpen: (i: number) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const imgs = images.slice(0, 6);
  if (imgs.length === 0) return null;

  // Large hex geometry
  const L_CX = 230, L_CY = 255, L_R = 195;

  // Small hex centers & radius — 2 rows, staggered to match screenshot
  const SM_R = 118;
  const smalls = [
    { cx: 530, cy: 148 },
    { cx: 736, cy: 148 },
    { cx: 427, cy: 344 },
    { cx: 633, cy: 344 },
    { cx: 839, cy: 344 },
  ];

  const SVG_W = 900;
  const SVG_H = 520;

  return (
    <div className="w-full overflow-x-auto" style={{ scrollbarWidth: "none" }}>
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width={SVG_W}
        height={SVG_H}
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", borderRadius: "16px" }}
      >
        <defs>
          {/* Large hex clip */}
          <clipPath id="pgc-clip-0">
            <polygon points={flatHexPts(L_CX, L_CY, L_R)} />
          </clipPath>
          {/* Small hex clips */}
          {smalls.map((s, i) => (
            <clipPath key={i} id={`pgc-clip-${i + 1}`}>
              <polygon points={flatHexPts(s.cx, s.cy, SM_R)} />
            </clipPath>
          ))}
          {/* Right fade gradient */}
          <linearGradient id="pgc-rfade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#080808" stopOpacity="0" />
            <stop offset="100%" stopColor="#080808" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* ── Large hex ── */}
        {imgs[0] && (() => {
          const w = L_R * Math.sqrt(3);
          const h = L_R * 2;
          const isH = hovered === 0;
          return (
            <g
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHovered(0)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onOpen(0)}
            >
              <image
                href={imgs[0]}
                x={L_CX - w / 2} y={L_CY - h / 2}
                width={w} height={h}
                clipPath="url(#pgc-clip-0)"
                preserveAspectRatio="xMidYMid slice"
                style={{
                  filter: isH ? "brightness(1.15) saturate(1.05)" : "brightness(0.82)",
                  transition: "filter 0.4s ease",
                }}
              />
              {/* Dark overlay */}
              <polygon
                points={flatHexPts(L_CX, L_CY, L_R)}
                fill={isH ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0.25)"}
                style={{ transition: "fill 0.4s ease", pointerEvents: "none" }}
              />
              {/* Border */}
              <polygon
                points={flatHexPts(L_CX, L_CY, L_R + 2)}
                fill="none"
                stroke={isH ? "rgba(214,198,184,0.55)" : "rgba(255,255,255,0.1)"}
                strokeWidth={isH ? 2 : 1.5}
                style={{ transition: "all 0.3s ease" }}
              />
              {/* Hover icon */}
              {isH && (
                <text x={L_CX} y={L_CY + 12} textAnchor="middle"
                  fill="rgba(255,255,255,0.9)" fontSize={32}
                  style={{ pointerEvents: "none", userSelect: "none" }}>⤢</text>
              )}
            </g>
          );
        })()}

        {/* ── Small hexes ── */}
        {smalls.map((s, i) => {
          const idx = i + 1;
          const img = imgs[idx];
          if (!img) return null;
          const w = SM_R * Math.sqrt(3);
          const h = SM_R * 2;
          const isH = hovered === idx;
          return (
            <g
              key={idx}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onOpen(idx)}
            >
              <image
                href={img}
                x={s.cx - w / 2} y={s.cy - h / 2}
                width={w} height={h}
                clipPath={`url(#pgc-clip-${idx})`}
                preserveAspectRatio="xMidYMid slice"
                style={{
                  filter: isH ? "brightness(1.15) saturate(1.05)" : "brightness(0.78)",
                  transition: "filter 0.4s ease",
                }}
              />
              {/* Dark overlay */}
              <polygon
                points={flatHexPts(s.cx, s.cy, SM_R)}
                fill={isH ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0.3)"}
                style={{ transition: "fill 0.4s ease", pointerEvents: "none" }}
              />
              {/* Border */}
              <polygon
                points={flatHexPts(s.cx, s.cy, SM_R + 2)}
                fill="none"
                stroke={isH ? "rgba(214,198,184,0.55)" : "rgba(255,255,255,0.1)"}
                strokeWidth={isH ? 2 : 1.5}
                style={{ transition: "all 0.3s ease" }}
              />
              {/* Index number or expand icon */}
              {isH ? (
                <text x={s.cx} y={s.cy + 8} textAnchor="middle"
                  fill="rgba(255,255,255,0.9)" fontSize={22}
                  style={{ pointerEvents: "none", userSelect: "none" }}>⤢</text>
              ) : (
                <text x={s.cx} y={s.cy + 5} textAnchor="middle"
                  fill="rgba(255,255,255,0.2)" fontSize={11} fontFamily="monospace"
                  style={{ pointerEvents: "none", userSelect: "none" }}>
                  {String(idx).padStart(2, "0")}
                </text>
              )}
            </g>
          );
        })}

        {/* Right edge fade */}
        <rect x={820} y={0} width={80} height={SVG_H}
          fill="url(#pgc-rfade)" style={{ pointerEvents: "none" }} />
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════
   LIGHTBOX
══════════════════════════════════════════════ */
function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);

  return (
    <motion.div
      className="fixed inset-0 z-[999] bg-black/96 backdrop-blur-2xl flex items-center justify-center"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        className="absolute top-6 right-6 text-white/50 hover:text-white text-2xl w-11 h-11 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center transition-all z-10"
        onClick={onClose}
      >×</button>
      <button
        className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white w-11 h-11 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center transition-all z-10 text-xl"
        onClick={(e) => { e.stopPropagation(); setCurrent((current - 1 + images.length) % images.length); }}
      >←</button>
      <button
        className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white w-11 h-11 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center transition-all z-10 text-xl"
        onClick={(e) => { e.stopPropagation(); setCurrent((current + 1) % images.length); }}
      >→</button>

      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt=""
          className="max-w-[88vw] max-h-[88vh] object-contain rounded-2xl shadow-2xl"
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.93 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        />
      </AnimatePresence>

      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {images.map((_, i) => (
          <button key={i} onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            className="transition-all duration-300 rounded-full"
            style={{ width: i === current ? 28 : 6, height: 6, background: i === current ? "#d6c6b8" : "rgba(255,255,255,0.2)" }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════ */
export default function ProjectPage({ params }: Props) {
  const { slug } = use(params);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const project = projects.find((p) => p.slug === slug);
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const otherProjects = projects.filter((p) => p.slug !== slug);

  if (!project) return notFound();

  const gallery = project.gallery ?? [];

  return (
    <main className="bg-[#080808] text-white min-h-screen overflow-x-hidden">

      {/* Back Nav */}
      <div className="fixed top-8 left-8 z-50">
        <Link href="/projects">
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center gap-3 rounded-full border border-white/10 bg-black/60 px-5 py-3 backdrop-blur-xl text-sm uppercase tracking-[0.2em] text-white/70 hover:text-white hover:border-white/30 transition-all duration-300 group"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            Back
          </motion.div>
        </Link>
      </div>

      {/* HERO */}
      <section className="relative h-screen overflow-hidden">
        <motion.img
          initial={{ scale: 1.08 }} animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          src={project.heroImage} alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/50 to-black/10" />
        <div className="relative z-10 h-full flex flex-col justify-end px-10 md:px-20 pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }} className="flex flex-wrap gap-2 mb-6">
            {project.tags?.map((tag) => (
              <span key={tag} className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white/60 backdrop-blur-sm">{tag}</span>
            ))}
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="uppercase tracking-[0.35em] text-sm text-[#d6c6b8] mb-5">
            {project.location} · {project.category}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-[8rem] font-bold uppercase leading-[0.88] tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >{project.title}</motion.h1>
        </div>
      </section>

      {/* STATS */}
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
        className="max-w-7xl mx-auto px-8 md:px-20 mt-0 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/10 border border-white/10 rounded-3xl overflow-hidden bg-white/[0.02] backdrop-blur-sm">
          {project.stats?.map((stat, i) => (
            <div key={i} className="p-8 md:p-10">
              <p className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-2">{stat.value}</p>
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* DESCRIPTION */}
      <section className="max-w-5xl mx-auto px-8 md:px-20 py-28">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
          className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#d6c6b8] mb-4">Overview</p>
            <div className="h-px w-12 bg-[#d6c6b8]/40" />
          </div>
          <div>
            <p className="text-xl md:text-2xl leading-relaxed text-white/70 mb-8">{project.description}</p>
            <p className="text-base leading-relaxed text-white/45">{project.longDescription}</p>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          HEX GALLERY
      ══════════════════════════════════════ */}
      {gallery.length > 0 && (
        <section className="pb-28">
          {/* Section header */}
          <div className="max-w-7xl mx-auto px-8 md:px-20 mb-14">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}
              className="flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.45em] text-[#d6c6b8] mb-3">Visual Story</p>
                <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-none"
                  style={{ fontFamily: "var(--font-playfair), serif" }}>
                  Gallery
                </h2>
              </div>
              <div className="text-right">
                <p className="text-xs font-mono text-white/20 uppercase tracking-widest">
                  {String(gallery.length).padStart(2, "0")} Frames
                </p>
                <p className="text-[10px] text-white/15 uppercase tracking-widest mt-1">
                  Click to expand
                </p>
              </div>
            </motion.div>
          </div>

          {/* Hex Gallery canvas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="px-8 md:px-20"
          >
            <HexGallery images={gallery} onOpen={setLightboxIndex} />
          </motion.div>

          <div className="max-w-7xl mx-auto px-8 md:px-20 mt-12">
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </section>
      )}

      {/* MORE PROJECTS */}
      <section className="border-t border-white/[0.07] bg-[#060606]">
        <div className="max-w-7xl mx-auto px-8 md:px-20 py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}
            className="flex items-center justify-between mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[#d6c6b8] mb-3">Continue Exploring</p>
              <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight" style={{ fontFamily: "var(--font-playfair), serif" }}>More Projects</h2>
            </div>
            <Link href="/projects">
              <div className="hidden md:flex items-center gap-3 rounded-full border border-white/15 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white hover:border-white/40 transition-all duration-300 group">
                View All <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherProjects.map((p, i) => (
              <motion.div key={p.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }} viewport={{ once: true }}>
                <Link href={`/projects/${p.slug}`}>
                  <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] hover:border-white/20 transition-all duration-500 cursor-pointer bg-white/[0.02]">
                    <div className="relative h-56 overflow-hidden">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-90" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-white/70">{p.category}</span>
                      </div>
                      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/0 border border-white/0 flex items-center justify-center text-white/0 transition-all duration-300 group-hover:bg-white group-hover:border-white group-hover:text-black text-sm font-medium">↗</div>
                    </div>
                    <div className="p-6">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-white/35 mb-2">{p.location} · {p.year ?? ""}</p>
                      <h3 className="text-xl font-semibold text-white/90 group-hover:text-white transition-colors duration-300 mb-3" style={{ fontFamily: "var(--font-playfair), serif" }}>{p.title}</h3>
                      <p className="text-sm text-white/35 line-clamp-2 leading-relaxed mb-4">{p.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.tags?.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[10px] uppercase tracking-widest text-white/25 border border-white/10 rounded-full px-2.5 py-1">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d6c6b8]/0 to-transparent group-hover:via-[#d6c6b8]/60 transition-all duration-500" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEXT PROJECT */}
      <section>
        <Link href={`/projects/${nextProject.slug}`}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="group relative overflow-hidden h-[60vh] flex items-center justify-center cursor-pointer">
            <motion.img src={nextProject.image} alt={nextProject.title}
              className="absolute inset-0 w-full h-full object-cover brightness-[0.35] transition-all duration-1000 group-hover:brightness-[0.5] group-hover:scale-[1.04]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,black_100%)]" />
            <div className="relative z-10 text-center px-8">
              <p className="text-xs uppercase tracking-[0.5em] text-white/40 mb-5">— Next Project —</p>
              <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tight leading-none transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ fontFamily: "var(--font-playfair), serif" }}>{nextProject.title}</h2>
              <p className="mt-4 text-sm text-white/30 uppercase tracking-[0.3em]">{nextProject.location}</p>
              <div className="mt-10 inline-flex items-center gap-4">
                <div className="h-px w-16 bg-white/20 group-hover:w-24 transition-all duration-500" />
                <span className="text-xs uppercase tracking-[0.3em] text-white/50 group-hover:text-white/80 transition-colors">View Project</span>
                <div className="h-px w-16 bg-white/20 group-hover:w-24 transition-all duration-500" />
              </div>
            </div>
          </motion.div>
        </Link>
      </section>

      <Footer />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox images={gallery} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </AnimatePresence>

    </main>
  );
}