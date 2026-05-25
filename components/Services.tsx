"use client";

import { motion } from "framer-motion";
import { Building2, PencilRuler, LampFloor, Compass } from "lucide-react";

const services = [
  { title: "Architecture", icon: Building2, desc: "Timeless structures designed with modern elegance." },
  { title: "Interior Design", icon: LampFloor, desc: "Luxury interiors crafted for emotion and comfort." },
  { title: "Urban Planning", icon: Compass, desc: "Creating connected spaces for future living." },
  { title: "Concept Design", icon: PencilRuler, desc: "Turning visionary ideas into visual experiences." },
];

export default function Services() {
  return (
    <section className="py-20 md:py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="mb-16 md:mb-24">
          <p className="uppercase tracking-[0.3em] text-xs md:text-sm text-neutral-400 mb-4">
            What We Do
          </p>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">
            Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="backdrop-blur-md bg-white/[0.03] border border-white/5 rounded-[24px] p-8 md:p-12 hover:-translate-y-2 hover:bg-white/[0.05] transition duration-500"
              >
                <Icon size={44} className="mb-6 md:mb-8 text-[#d6c6b8]" />
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-neutral-400 leading-relaxed text-sm md:text-base">{service.desc}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}