"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import Footer from "@/components/Footer";

const CATEGORIES = ["All", "Residential", "Commercial", "Hospitality"];

export default function AllProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (p) => p.category?.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <main
      className="bg-[#080808] text-white min-h-screen overflow-x-hidden"
      style={{ fontFamily: "var(--font-outfit), sans-serif" }}
    >
      {/* ── Back Nav ── */}
      <div className="fixed top-8 left-8 z-50">
        <Link href="/">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center gap-3 rounded-full border border-white/10 bg-black/60 px-5 py-3 backdrop-blur-xl text-sm uppercase tracking-[0.2em] text-white/60 hover:text-white hover:border-white/30 transition-all duration-300 group"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            Home
          </motion.div>
        </Link>
      </div>

      {/* ── HERO ── */}
      <section className="relative h-[80vh] overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop"
            alt="Projects"
            className="w-full h-full object-cover brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/50 to-black/10" />
          {/* Subtle grain overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: "200px",
            }}
          />
        </div>

        <div className="relative z-10 px-10 md:px-20 pb-24 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="uppercase tracking-[0.45em] text-xs text-[#d6c6b8] mb-6"
          >
            Our Portfolio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold uppercase leading-[0.88] tracking-[-0.03em] text-[clamp(60px,8vw,120px)] max-w-4xl"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            All<br />
            <span className="text-white/20">Projects</span>
          </motion.h1>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="absolute bottom-10 right-10 flex flex-col items-center gap-3 text-white/30"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] rotate-90 origin-center mb-4">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"
            />
          </motion.div>
        </div>
      </section>

      {/* ── FILTER & STATS BAR ── */}
      <section className="border-y border-white/[0.07] bg-white/[0.015]">
        <div className="max-w-[1600px] mx-auto px-8 md:px-20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 py-7">
            {/* Filter pills */}
            <div className="flex items-center gap-3 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-[10px] uppercase tracking-[0.25em] transition-all duration-300 border ${
                    activeCategory === cat
                      ? "border-[#d6c6b8] bg-[#d6c6b8]/10 text-[#d6c6b8]"
                      : "border-white/[0.08] hover:border-white/25 text-white/35 hover:text-white/70"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-10">
              <div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={filtered.length}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                    className="text-2xl font-semibold tracking-tight"
                  >
                    {filtered.length}
                  </motion.p>
                </AnimatePresence>
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 mt-0.5">
                  Projects
                </p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="text-2xl font-semibold tracking-tight">9</p>
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 mt-0.5">
                  Countries
                </p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="text-2xl font-semibold tracking-tight">18</p>
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 mt-0.5">
                  Awards
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS GRID ── */}
      <section className="max-w-[1600px] mx-auto px-8 md:px-20 py-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={`/projects/${project.slug}`}>
                  <div
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.07] hover:border-white/20 transition-all duration-500 cursor-pointer bg-white/[0.02]"
                    onMouseEnter={() => setHoveredSlug(project.slug)}
                    onMouseLeave={() => setHoveredSlug(null)}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-108 brightness-[0.72] group-hover:brightness-[0.88]"
                        style={{ transform: hoveredSlug === project.slug ? "scale(1.08)" : "scale(1)" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/10 to-transparent" />

                      {/* Category badge */}
                      <div className="absolute top-5 left-5">
                        <span className="rounded-full border border-white/15 bg-black/50 backdrop-blur-md px-3.5 py-1.5 text-[10px] uppercase tracking-[0.25em] text-white/65">
                          {project.category}
                        </span>
                      </div>

                      {/* Arrow on hover */}
                      <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/0 border border-white/0 flex items-center justify-center text-white/0 transition-all duration-300 group-hover:bg-white group-hover:border-white group-hover:text-black text-sm font-bold">
                        ↗
                      </div>

                      {/* Index number */}
                      <div className="absolute bottom-4 right-5 font-mono text-[11px] text-white/20 tracking-widest">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-7">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[#d6c6b8]/50 mb-2">
                        {project.location}
                        {project.year ? ` · ${project.year}` : ""}
                      </p>
                      <h2
                        className="text-xl font-bold text-white/85 group-hover:text-white transition-colors duration-300 mb-3 leading-tight"
                        style={{ fontFamily: "var(--font-playfair), serif" }}
                      >
                        {project.title}
                      </h2>
                      <p className="text-sm text-white/35 line-clamp-2 leading-relaxed mb-5">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags?.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] uppercase tracking-widest text-white/25 border border-white/[0.08] rounded-full px-3 py-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hover accent line bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "linear-gradient(to right, transparent, rgba(214,198,184,0.55), transparent)" }}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-40 text-white/20"
          >
            <p className="text-xs uppercase tracking-[0.4em]">No projects in this category</p>
          </motion.div>
        )}
      </section>

      {/* ── FULL BLEED BANNER ── */}
      <section className="relative h-[55vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.06 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1974&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover brightness-[0.45]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 via-transparent to-[#080808]/60" />
        <div className="absolute inset-0 flex items-center px-10 md:px-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-[#d6c6b8] mb-5">
              Our Philosophy
            </p>
            <p
              className="text-3xl md:text-5xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Every space tells<br />
              <span className="text-white/35">a story before</span><br />
              anyone speaks.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-white/[0.07] bg-[#060606]">
        <div className="max-w-5xl mx-auto px-8 md:px-20 py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-xs uppercase tracking-[0.45em] text-[#d6c6b8] mb-6">
              Start Something New
            </p>
            <h2
              className="text-4xl md:text-7xl font-bold uppercase tracking-tight leading-none mb-10"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Have a Project<br />
              <span className="text-white/20">In Mind?</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/about">
                <div className="group flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                  About the Studio
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </Link>
              <Link href="/team">
                <div className="rounded-full bg-white text-black px-8 py-4 text-sm uppercase tracking-[0.2em] hover:bg-[#d6c6b8] transition-colors duration-300 font-medium">
                  Meet The Team
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}