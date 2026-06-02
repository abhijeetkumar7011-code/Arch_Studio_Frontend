"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

/* ══════════════════════════════════════════
   SNAPSHOT GALLERY: Polaroid-style cards
══════════════════════════════════════════ */

const ROTATIONS = [-2.8, 1.9, -1.4, 3.1, -2.1, 1.6, -3.4, 2.5, -1.1, 3.6];
const TAPE_COLORS = ["rgba(255,220,180,0.55)", "rgba(200,210,255,0.45)", "rgba(180,240,200,0.45)", "rgba(255,200,200,0.45)"];

function SnapshotCard({ src, index, onClick }: { src: string; index: number; onClick: () => void }) {
  const rotation = ROTATIONS[index % ROTATIONS.length];
  const tapeColor = TAPE_COLORS[index % TAPE_COLORS.length];
  const isLarge = index === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: rotation * 0.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      whileHover={{ rotate: 0, scale: 1.04, zIndex: 20, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      onClick={onClick}
      className="relative cursor-pointer group"
      style={{ transformOrigin: "center center" }}
    >
      {/* Tape strip */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-12 h-[18px] rounded-sm backdrop-blur-[2px] shadow-sm" 
           style={{ background: tapeColor, transform: "translateX(-50%) rotate(-1deg)" }} />

      {/* Polaroid frame */}
      <div className="relative overflow-hidden bg-[#1a1a18] border border-white/5 rounded-sm"
           style={{ padding: isLarge ? "10px 10px 36px" : "8px 8px 28px", boxShadow: "0 8px 32px rgba(0,0,0,0.6)" }}>
        
        {/* Photo Container */}
        <div className="relative overflow-hidden" style={{ width: isLarge ? 280 : 180, height: isLarge ? 210 : 140 }}>
          <img src={src} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110 group-hover:saturate-110" style={{ filter: "brightness(0.9) saturate(0.95)" }} />
          
          {/* Film Grain */}
          <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E')", backgroundSize: "120px" }} />

          {/* Hover Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/30 bg-white/10 backdrop-blur-[8px]">
              <span className="text-white text-lg">⤢</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between px-1 mt-2">
          <span className="text-[9px] font-mono tracking-[0.15em] text-white/20 uppercase">{String(index + 1).padStart(2, "0")}</span>
          <span className="text-[9px] font-mono text-white/10">▪</span>
        </div>
      </div>
    </motion.div>
  );
}

function Lightbox({ images, startIndex, onClose }: { images: string[]; startIndex: number; onClose: () => void }) {
  const [current, setCurrent] = useState(startIndex);
  return (
    <motion.div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/96 backdrop-blur-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <button className="absolute top-6 right-6 text-white/50 hover:text-white w-11 h-11 border border-white/10 rounded-full flex items-center justify-center transition-all z-10" onClick={onClose}>×</button>
      <button className="absolute left-5 text-white/40 hover:text-white w-11 h-11 border border-white/10 rounded-full flex items-center justify-center transition-all z-10" onClick={(e) => { e.stopPropagation(); setCurrent((current - 1 + images.length) % images.length); }}>←</button>
      <button className="absolute right-5 text-white/40 hover:text-white w-11 h-11 border border-white/10 rounded-full flex items-center justify-center transition-all z-10" onClick={(e) => { e.stopPropagation(); setCurrent((current + 1) % images.length); }}>→</button>

      <AnimatePresence mode="wait">
        <motion.div key={current} className="relative bg-[#1a1a18] p-3 pb-12 rounded-sm shadow-2xl" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} onClick={(e) => e.stopPropagation()}>
          <img src={images[current]} className="max-w-[80vw] max-h-[72vh] object-contain" alt="" />
          <div className="absolute bottom-3 left-0 right-0 text-center text-[11px] font-mono tracking-[0.2em] text-white/25">{String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 flex gap-2">
        {images.map((_, i) => (
          <button key={i} onClick={(e) => { e.stopPropagation(); setCurrent(i); }} className="rounded-full transition-all duration-300" 
                  style={{ width: i === current ? 24 : 6, height: 6, background: i === current ? "#d6c6b8" : "rgba(255,255,255,0.2)" }} />
        ))}
      </div>
    </motion.div>
  );
}

export default function SnapshotGallery({ images }: { images: string[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  if (!images?.length) return null;

  return (
    <>
      <div className="relative w-full overflow-x-auto pb-16 pt-6" style={{ scrollbarWidth: "none" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        
        <div className="flex items-end gap-6 px-2 min-w-max pt-6 pb-6">
          {images.map((src, i) => (
            <div key={i} style={{ marginTop: [0, 28, 12, 40, 8, 32, 16, 44, 6, 24][i % 10] }}>
              <SnapshotCard src={src} index={i} onClick={() => setLightboxIndex(i)} />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#080808] to-transparent" />
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && <Lightbox images={images} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />}
      </AnimatePresence>
    </>
  );
}