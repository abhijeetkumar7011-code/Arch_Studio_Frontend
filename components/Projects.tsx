"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { Variants } from "framer-motion";

const CATEGORIES = ["All", "Residential", "Commercial", "Hospitality"];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const total = filtered.length;

  // Safe index — always clamp inside bounds
  const safeIndex = total > 0 ? Math.min(current, total - 1) : 0;

  const goTo = useCallback(
    (index: number, dir: number) => {
      if (total === 0) return;
      setDirection(dir);
      setCurrent(((index % total) + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(safeIndex + 1, 1), [safeIndex, goTo]);
  const prev = useCallback(() => goTo(safeIndex - 1, -1), [safeIndex, goTo]);

  // Reset to 0 on filter change
  useEffect(() => {
    setCurrent(0);
  }, [activeFilter]);

  // Auto-advance
  useEffect(() => {
    if (total <= 1) return;
    autoRef.current = setTimeout(next, 5000);
    return () => { if (autoRef.current) clearTimeout(autoRef.current); };
  }, [safeIndex, next, total]);

  const variants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.5, ease: [0.7, 0, 0.84, 0] },
  }),
};

  // Guard — no projects in this filter
  if (total === 0) {
    return (
      <section id="projects" className="py-20 md:py-32 bg-[#0d0d0d] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center text-white/30 py-40">
          No projects in this category.
        </div>
      </section>
    );
  }

  const project    = filtered[safeIndex];
  const prevProject = filtered[((safeIndex - 1) + total) % total];
  const nextProject = filtered[(safeIndex + 1) % total];

  return (
    <section id="projects" className="py-20 md:py-32 bg-[#0d0d0d] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="uppercase tracking-[0.35em] text-xs text-[#d6c6b8] mb-4">
              Featured Work
            </p>
            <h2
              className="text-4xl md:text-6xl font-bold uppercase tracking-tight leading-none"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Projects<br />
              <span className="text-white/20">Highlight</span>
            </h2>
          </motion.div>

          {/* Filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
          >
            {CATEGORIES.filter(
              (c) => c === "All" || projects.some((p) => p.category === c)
            ).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] border transition-all duration-300 ${
                  activeFilter === tab
                    ? "bg-white text-black border-white"
                    : "border-white/15 text-white/50 hover:border-white/40 hover:text-white/80"
                }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>
        </div>

        {/* ── Slider ── */}
        <div className="relative">

          {/* Main slide */}
          <div className="relative overflow-hidden rounded-[32px] h-[60vh] md:h-[75vh] cursor-grab active:cursor-grabbing select-none">
            <AnimatePresence custom={direction} mode="popLayout">
              <motion.div
                key={project.slug}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) next();
                  else if (info.offset.x > 60) prev();
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  draggable={false}
                />

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

                {/* Slide content */}
                <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-14 pointer-events-none">

                  {/* Top row */}
                  <div className="flex justify-between items-start">
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/70"
                    >
                      {project.category}
                    </motion.span>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-white/30 text-sm tabular-nums"
                    >
                      <span className="text-white text-lg font-light">
                        {String(safeIndex + 1).padStart(2, "0")}
                      </span>
                      <span className="mx-2">/</span>
                      {String(total).padStart(2, "0")}
                    </motion.div>
                  </div>

                  {/* Bottom info */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="text-xs uppercase tracking-[0.3em] text-[#d6c6b8] mb-3"
                      >
                        {project.location}{project.year ? ` · ${project.year}` : ""}
                      </motion.p>

                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl md:text-7xl font-bold uppercase leading-none tracking-tight"
                        style={{ fontFamily: "var(--font-playfair), serif" }}
                      >
                        {project.title}
                      </motion.h3>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap gap-2 mt-4"
                      >
                        {project.tags?.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs text-white/40 uppercase tracking-widest">
                            #{tag}
                          </span>
                        ))}
                      </motion.div>
                    </div>

                    {/* Explore btn — pointer-events back on */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.45 }}
                      className="pointer-events-auto"
                    >
                      <Link href={`/projects/${project.slug}`}>
                        <div className="group flex items-center gap-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-6 py-4 hover:bg-white hover:border-white transition-all duration-300">
                          <span className="text-xs uppercase tracking-[0.25em] text-white group-hover:text-black transition-colors duration-300 whitespace-nowrap">
                            Explore Project
                          </span>
                          <div className="w-8 h-8 rounded-full border border-white/30 group-hover:border-black/20 flex items-center justify-center text-white group-hover:text-black transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                            ↗
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Controls row ── */}
          <div className="flex items-center justify-between mt-8 px-2">

            {/* Prev thumbnail */}
            <div className="flex items-center gap-4">
              <button
                onClick={prev}
                aria-label="Previous project"
                className="group relative overflow-hidden rounded-2xl w-20 h-14 md:w-28 md:h-20 flex-shrink-0 border border-white/10 hover:border-white/30 transition-all duration-300"
              >
                <img
                  src={prevProject.image}
                  alt=""
                  className="w-full h-full object-cover brightness-50 group-hover:brightness-75 transition duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center text-white/60 group-hover:text-white transition-colors text-lg">
                  ←
                </div>
              </button>
              <div className="hidden md:block">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-1">Prev</p>
                <p className="text-sm text-white/60 font-medium truncate max-w-[120px]">{prevProject.title}</p>
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {filtered.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > safeIndex ? 1 : -1)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="relative h-[3px] rounded-full transition-all duration-500 overflow-hidden"
                  style={{
                    width: i === safeIndex ? 40 : 16,
                    background: i === safeIndex ? "#d6c6b8" : "rgba(255,255,255,0.2)",
                  }}
                >
                  {i === safeIndex && (
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-white/40"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                      key={`${safeIndex}-progress`}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Next thumbnail */}
            <div className="flex items-center gap-4 flex-row-reverse">
              <button
                onClick={next}
                aria-label="Next project"
                className="group relative overflow-hidden rounded-2xl w-20 h-14 md:w-28 md:h-20 flex-shrink-0 border border-white/10 hover:border-white/30 transition-all duration-300"
              >
                <img
                  src={nextProject.image}
                  alt=""
                  className="w-full h-full object-cover brightness-50 group-hover:brightness-75 transition duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center text-white/60 group-hover:text-white transition-colors text-lg">
                  →
                </div>
              </button>
              <div className="hidden md:block text-right">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-1">Next</p>
                <p className="text-sm text-white/60 font-medium truncate max-w-[120px]">{nextProject.title}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
