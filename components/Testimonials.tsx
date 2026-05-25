"use client";

import { motion } from "framer-motion";

const reviews = [
  { name: "Aarav Mehta", text: "They transformed our vision into a masterpiece." },
  { name: "Sophia Lee", text: "Minimal, elegant, and absolutely stunning execution." },
  { name: "Daniel Smith", text: "Best architecture team we have worked with." },
];

export default function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-[#0f0f0f] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="mb-16 md:mb-24">
          <p className="uppercase tracking-[0.3em] text-xs md:text-sm text-neutral-400 mb-4">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">
            Client Words
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="backdrop-blur-md bg-white/[0.02] border border-white/5 p-8 md:p-10 rounded-[24px] flex flex-col justify-between"
            >
              <p className="text-neutral-300 italic mb-6 text-base leading-relaxed">
                "{r.text}"
              </p>
              <h4 className="font-semibold text-white tracking-wide text-sm md:text-base">
                — {r.name}
              </h4>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}