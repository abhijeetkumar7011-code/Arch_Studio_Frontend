"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/* ── Animated Logo icon (extracted from Logo.tsx, adapted for large size) ── */
function LoaderIcon() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer dashed orbit ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.65, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute"
      >
        <svg width="88" height="88" viewBox="0 0 88 88">
          <circle
            cx="44" cy="44" r="42"
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="0.5"
            strokeDasharray="4 7"
          />
        </svg>
      </motion.div>

      {/* Icon box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          width: 72,
          height: 72,
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.04)",
          margin: 8,
        }}
      >
        {/* Inner top glow */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{ height: "45%", background: "linear-gradient(to bottom, rgba(255,255,255,0.09), transparent)" }}
        />

        {/* Architectural SVG — pillars + roof */}
        <svg width="32" height="32" viewBox="0 0 32 32">
          {/* Left pillar */}
          <motion.rect
            x="4" y="10" width="2.5" height="18" rx="1" fill="white"
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
            transition={{ delay: 1.0, duration: 0.45, ease: "easeOut" }}
            style={{ transformOrigin: "4px 28px" }}
          />
          {/* Right pillar */}
          <motion.rect
            x="25.5" y="10" width="2.5" height="18" rx="1" fill="white"
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
            transition={{ delay: 1.05, duration: 0.45, ease: "easeOut" }}
            style={{ transformOrigin: "25.5px 28px" }}
          />
          {/* Center pillar */}
          <motion.rect
            x="14.75" y="16" width="2.5" height="12" rx="1" fill="white"
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
            transition={{ delay: 1.1, duration: 0.35, ease: "easeOut" }}
            style={{ transformOrigin: "14.75px 28px" }}
          />
          {/* Roof */}
          <motion.polyline
            points="2,12 16,2 30,12"
            fill="none" stroke="white" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 1.15, duration: 0.55, ease: "easeOut" }}
          />
          {/* Base line */}
          <motion.line
            x1="2" y1="28" x2="30" y2="28"
            stroke="rgba(255,255,255,0.28)" strokeWidth="1" strokeLinecap="round"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.3 }}
          />
        </svg>
      </motion.div>
    </div>
  );
}

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Scanline */}
          <motion.div
            className="pointer-events-none absolute left-0 right-0 h-px"
            style={{ background: "rgba(214,198,184,0.05)" }}
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />

          {/* Corner brackets */}
          {[
            "top-4 left-4 border-t border-l",
            "top-4 right-4 border-t border-r",
            "bottom-4 left-4 border-b border-l",
            "bottom-4 right-4 border-b border-r",
          ].map((cls, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
              className={`absolute w-4 h-4 ${cls}`}
              style={{ borderColor: "rgba(255,255,255,0.12)" }}
            />
          ))}

          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice">
            {[230, 350, 470].map((y, i) => (
              <motion.line key={`h${i}`} x1={-10} y1={y} x2={1010} y2={y}
                stroke="rgba(255,255,255,0.04)" strokeWidth={0.5}
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ delay: 0.05 * i, duration: 1.2, ease: "easeOut" }} />
            ))}
            {[250, 500, 750].map((x, i) => (
              <motion.line key={`v${i}`} x1={x} y1={-10} x2={x} y2={710}
                stroke="rgba(255,255,255,0.035)" strokeWidth={0.5}
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ delay: 0.08 + 0.06 * i, duration: 1, ease: "easeOut" }} />
            ))}
            <motion.line x1={0} y1={700} x2={1000} y2={0}
              stroke="rgba(214,198,184,0.03)" strokeWidth={0.5}
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ delay: 0.3, duration: 1.6 }} />
          </svg>

          {/* Coordinate label */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute top-6 left-6 font-mono text-[11px] tracking-[0.1em]"
            style={{ color: "rgba(255,255,255,0.16)" }}
          >
            X:00.00 Y:00.00
          </motion.div>

          {/* Est. year */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute top-6 right-6 font-mono text-[11px] tracking-[0.1em]"
            style={{ color: "rgba(255,255,255,0.13)" }}
          >
            EST. 2019
          </motion.div>

          {/* ── Main content ── */}
          <div className="relative z-10 flex flex-col items-center">

            {/* Logo icon */}
            <LoaderIcon />

            {/* ARCH */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-bold text-white leading-none"
              style={{ fontSize: "clamp(52px, 10vw, 80px)", letterSpacing: "0.22em" }}
            >
              ARCH
            </motion.div>

            {/* Studio */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="mt-1"
              style={{ fontSize: "11px", letterSpacing: "0.6em", color: "rgba(255,255,255,0.32)", textTransform: "uppercase" }}
            >
              Studio
            </motion.div>

            {/* Double progress line with center dot */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.4 }}
              className="flex items-center gap-3 mt-6"
            >
              <div className="relative overflow-hidden" style={{ width: 72, height: "0.5px", background: "rgba(255,255,255,0.1)" }}>
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ delay: 1.6, duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0"
                  style={{ background: "rgba(214,198,184,0.65)" }}
                />
              </div>
              <motion.div
                animate={{ opacity: [0.3, 0.9, 0.3] }}
                transition={{ delay: 1.9, duration: 1.5, repeat: Infinity }}
                className="w-1 h-1 rounded-full"
                style={{ background: "rgba(214,198,184,0.6)" }}
              />
              <div className="relative overflow-hidden" style={{ width: 72, height: "0.5px", background: "rgba(255,255,255,0.1)" }}>
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: "0%" }}
                  transition={{ delay: 1.7, duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0"
                  style={{ background: "rgba(214,198,184,0.65)" }}
                />
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.6 }}
              className="mt-4 uppercase text-[10px] tracking-[0.38em]"
              style={{ color: "rgba(255,255,255,0.22)" }}
            >
              Crafting Modern Spaces
            </motion.div>

            {/* Dev credit */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.5 }}
              className="mt-6 flex items-center gap-2 font-mono text-[10px] tracking-[0.14em]"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              <span style={{ color: "rgba(214,198,184,0.4)" }}>&lt;/&gt;</span>
              <span>ABHIJEET VERMA</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ delay: 2.2, duration: 0.9, repeat: Infinity }}
                className="inline-block align-middle"
                style={{ width: 5, height: 11, background: "rgba(214,198,184,0.45)" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}