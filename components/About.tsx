"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-20 md:py-32 bg-[#0f0f0f] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 md:gap-20 items-center">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="uppercase tracking-[0.35em] text-xs text-[#d6c6b8] mb-4">
            About Studio
          </p>
          <h2
            className="text-4xl md:text-6xl font-bold uppercase tracking-tight leading-none"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            We Shape<br />
            <span className="text-white/20">Modern Living</span>
          </h2>

          <div className="space-y-4 text-neutral-400 leading-relaxed text-base md:text-lg">
            <p>
              We are an architecture studio focused on crafting spaces that
              blend functionality with emotion. Every project is a story
              built with precision, light, and material honesty.
            </p>
            <p>
              From luxury homes to urban landscapes, we design environments
              that breathe with the people who inhabit them.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-[24px] overflow-hidden shadow-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1974&auto=format&fit=crop"
            alt="Architecture Concept"
            className="w-full h-[350px] md:h-[550px] object-cover hover:scale-105 transition duration-700"
          />
        </motion.div>

      </div>
    </section>
  );
}