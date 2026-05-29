"use client";

import { motion } from "framer-motion";

const steps = [
  { title: "Concept", desc: "Understanding vision and requirements." },
  { title: "Design", desc: "Transforming ideas into visuals." },
  { title: "Develop", desc: "Engineering architecture with precision." },
  { title: "Deliver", desc: "Bringing spaces to life." },
];

export default function Process() {
  return (
    <section className="py-20 md:py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="uppercase tracking-[0.35em] text-xs text-[#d6c6b8] mb-4">
              WorkFlow
            </p>
            <h2
              className="text-4xl md:text-6xl font-bold uppercase tracking-tight leading-none"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Our Process<br />
            </h2>
          </motion.div>
        </div>

          <div className="divide-y divide-white/10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-start gap-6 md:gap-16 py-8 md:py-12 first:pt-0 last:pb-0"
              >
                <div className="text-4xl md:text-6xl font-bold text-[#d6c6b8] md:w-32 shrink-0">
                  0{i + 1}
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-semibold">{step.title}</h3>
                  <p className="text-neutral-400 text-sm md:text-base">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
    </section>
  );
}