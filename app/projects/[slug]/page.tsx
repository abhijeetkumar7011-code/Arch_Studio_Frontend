"use client";

import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { use, useState } from "react";
import Footer from "@/components/Footer";
import HexGallery from "@/components/HexGallery";
import SnapShotGallery from "@/components/SnapShotGallery";

type Props = { params: Promise<{ slug: string }> };



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
  const [galleryMode, setGalleryMode] = useState<"hex" | "snapshot">("hex");

  const project = projects.find((p) => p.slug === slug);
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const otherProjects = projects.filter((p) => p.slug !== slug);

  if (!project) return notFound();

  const gallery = project.gallery ?? [];

  return (
    // <main className="bg-[#080808] text-white min-h-screen overflow-x-hidden">
    <main className="bg-[#080808] text-white min-h-screen overflow-x-visible">

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

      {/* GALLERIES SWITCHER */}
      <div className="max-w-7xl mx-auto px-8 md:px-20 mb-10 mt-20">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* <span className="text-xs uppercase tracking-[0.35em] text-[#d6c6b8]">View Mode</span> */}
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#d6c6b8] mb-3">View Mode</p>
            {/* Dynamically update based on gallery mode */}
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight" style={{ fontFamily: "var(--font-playfair), serif" }}>
              {galleryMode === "hex" ? "Hex Gallery" : "Snapshot Gallery"}
            </h2>
          </div>

          <div className="flex rounded-full bg-white/5 p-1 border border-white/10">
            <button
              onClick={() => setGalleryMode("hex")}
              className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                galleryMode === "hex" ? "bg-white text-black" : "text-white/50 hover:text-white"
              }`}
            >
              Hex Gallery
            </button>
            <button
              onClick={() => setGalleryMode("snapshot")}
              className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                galleryMode === "snapshot" ? "bg-white text-black" : "text-white/50 hover:text-white"
              }`}
            >
              Snapshot Gallery
            </button>
          </div>
        </div>
      </div>

      {/* GALLERY RENDERER */}
      <AnimatePresence mode="wait" >
        {galleryMode === "hex" ? (
          <motion.div
            key="hex"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto px-8 md:px-20"
          >
            <HexGallery images={gallery} onOpen={(i) => setLightboxIndex(i)} />
          </motion.div>
        ) : (
          <motion.div
            key="snapshot"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto px-8 md:px-20"
          >
            <SnapShotGallery images={gallery} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════
          HEX GALLERY
      ══════════════════════════════════════ */}
      {/* <AnimatePresence mode="wait">
        {galleryMode === "hex" ? (
          <motion.div
            key="hex"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <HexGallery
              images={gallery}
              onOpen={(i) => setLightboxIndex(i)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="snapshot"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <SnapShotGallery
              images={gallery}
              onOpen={(i) => setLightboxIndex(i)}
            />
          </motion.div>
        )}
      </AnimatePresence> */}


      {/* Integrating SnapShot Gallery */}
      {/* <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
      >
        <SnapShotGallery images={gallery} />
      </motion.div> */}

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