"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero({
  onContactClick,
}: {
  onContactClick: () => void;
}) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white flex items-center justify-center">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_45%)]" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] [background-size:80px_80px]" />

      {/* Blur Orb */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-white/10 blur-[120px]" />

      <div className="container-custom relative z-10 pt-32 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-6xl mx-auto"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm uppercase tracking-[0.25em] backdrop-blur-xl">
            Architecture • Interior • Future Living
          </div>

          <h1 className="heading-xl uppercase leading-[0.9] tracking-[-0.05em]">
            Designing
            <span className="block text-white/40">Spaces</span>
            That Feel Alive
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-base md:text-lg text-white/60 leading-relaxed">
            We craft architecture that merges emotion, geometry, light, and timeless modernism into unforgettable experiences.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
            <button 
              className="group flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition-all duration-300 hover:scale-105"
              onClick={onContactClick}
            >
              Start Your Project
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button className="rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-medium backdrop-blur-xl transition-all duration-300 hover:bg-white/10">
              Explore Portfolio
            </button>
          </div>
        </motion.div>

        {/* Bottom Floating Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            ["120+", "Luxury Projects"],
            ["18", "Global Awards"],
            ["14 Years", "Design Experience"],
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl"
            >
              <h3 className="text-4xl font-semibold tracking-tight">
                {item[0]}
              </h3>
              <p className="mt-2 text-white/50 text-sm uppercase tracking-[0.2em]">
                {item[1]}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}