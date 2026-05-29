"use client";

import { motion } from "framer-motion";

export default function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center gap-3 cursor-pointer group"
    >
      {/* Icon */}
      <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-60" />

        {/* Architectural Shape */}
        <div className="relative w-5 h-5">
          <div className="absolute left-0 bottom-0 w-[2px] h-full bg-white rounded-full" />
          <div className="absolute right-0 bottom-0 w-[2px] h-full bg-white rounded-full" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[2px] bg-white rounded-full rotate-[35deg] origin-center" />
        </div>
      </div>

      {/* Text */}
      <div className="leading-none">
        <h1 className="text-lg tracking-[0.25em] uppercase font-semibold text-white group-hover:text-neutral-300 transition">
          ARCH
        </h1>

        <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">
          Studio
        </p>
      </div>
    </motion.div>
  );
}