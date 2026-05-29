"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

const VALUES = [
  {
    number: "01",
    title: "Material Honesty",
    body: "We let every surface speak its own truth. Concrete stays concrete. Timber breathes. Glass reveals. No disguises, no shortcuts — only the poetry of material used with intention.",
  },
  {
    number: "02",
    title: "Light as Architecture",
    body: "Before we pick a material, we study how light moves through a site at dawn, noon, and dusk. Light is our most fundamental building material — free, alive, and ever-changing.",
  },
  {
    number: "03",
    title: "Emotional Geometry",
    body: "Spaces shape feelings. A double-height void creates awe. A low ceiling creates intimacy. We orchestrate proportion and geometry deliberately to evoke the exact emotional register each room deserves.",
  },
  {
    number: "04",
    title: "Timeless Over Trendy",
    body: "Trends age. Principles don't. We design from enduring ideas — not from what's on design blogs this month. Our work should feel just as alive in 40 years as it does at handover.",
  },
];

const MILESTONES = [
  { year: "2010", event: "Studio Founded", detail: "Started as a two-person practice in a rented Delhi basement." },
  { year: "2013", event: "First International Commission", detail: "A boutique hotel in Kathmandu — our first project outside India." },
  { year: "2016", event: "Aga Khan Award Nomination", detail: "Recognized for our Forest School in Coorg." },
  { year: "2019", event: "Dubai Studio Opens", detail: "Expanded to the Gulf with a 12-person team." },
  { year: "2022", event: "100th Project Delivered", detail: "Modern Villa, Mumbai became our centenary project." },
  { year: "2024", event: "Architectural Record Feature", detail: "Named one of Asia's most influential emerging practices." },
];

const STATS = [
  { value: "120+", label: "Projects Completed" },
  { value: "14", label: "Years of Practice" },
  { value: "18", label: "Global Awards" },
  { value: "9", label: "Countries" },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [showContact, setShowContact] = useState(false);

  return (
    <main className="bg-[#080808] text-white min-h-screen overflow-x-hidden" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>

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
      <section ref={heroRef} className="relative h-screen overflow-hidden flex items-end">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop"
            alt="Studio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/60 to-black/20" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 px-10 md:px-20 pb-20 w-full"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="uppercase tracking-[0.45em] text-xs text-[#d6c6b8] mb-6"
          >
            About the Studio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-[7.5rem] font-bold uppercase leading-[0.88] tracking-[-0.03em] max-w-5xl"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            We Build
            <br />
            <span className="text-white/25">Feelings,</span>
            <br />
            Not Just Walls.
          </motion.h1>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-10 right-10 flex flex-col items-center gap-3 text-white/30"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] rotate-90 origin-center mb-4">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className="max-w-6xl mx-auto px-8 md:px-20 py-32">
        <div className="grid md:grid-cols-[200px_1fr] gap-16 items-start">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-[#d6c6b8] mb-4">Our Manifesto</p>
            <div className="h-px w-10 bg-[#d6c6b8]/40" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            <p className="text-2xl md:text-4xl leading-snug text-white/80 font-light mb-10"
              style={{ fontFamily: "var(--font-playfair), serif" }}>
              "Architecture is not about buildings.
              <span className="text-white"> It's about the silence between forms,
              the quality of morning light on a wall, the way a threshold
              makes you pause before entering a room."</span>
            </p>
            <p className="text-base text-white/40 leading-relaxed max-w-2xl">
              Founded in 2010, Arch Studio is a practice built on the belief that great architecture
              emerges from deep listening — to the site, the client, the climate, and the culture.
              We've delivered over 120 projects across India, the Gulf, and Southeast Asia, each one
              a unique response to its particular set of conditions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="border-y border-white/[0.07] bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-8 md:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.07]">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="py-14 px-8 md:px-12"
              >
                <p className="text-5xl md:text-6xl font-semibold tracking-tight text-white mb-3">{s.value}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-white/35">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="max-w-7xl mx-auto px-8 md:px-20 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-[#d6c6b8] mb-4">What We Believe</p>
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}>
            Our Core Values
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06] rounded-3xl overflow-hidden">
          {VALUES.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group bg-[#080808] hover:bg-white/[0.03] transition-colors duration-500 p-10 md:p-14"
            >
              <p className="text-[#d6c6b8]/40 text-xs font-mono mb-8 tracking-[0.3em]">{v.number}</p>
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-5 group-hover:text-[#d6c6b8] transition-colors duration-300"
                style={{ fontFamily: "var(--font-playfair), serif" }}>
                {v.title}
              </h3>
              <p className="text-white/45 leading-relaxed text-sm md:text-base">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FULL BLEED IMAGE ── */}
      <section className="relative h-[70vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1974&auto=format&fit=crop"
          alt="Studio space"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 via-transparent to-[#080808]/60" />
        <div className="absolute inset-0 flex items-center px-10 md:px-24">
          <motion.blockquote
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <p className="text-3xl md:text-5xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}>
              Every project begins<br />
              <span className="text-white/40">with a long, slow walk</span><br />
              around the site.
            </p>
          </motion.blockquote>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="max-w-6xl mx-auto px-8 md:px-20 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-[#d6c6b8] mb-4">Our Journey</p>
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}>
            14 Years,<br /><span className="text-white/20">One Vision</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[72px] md:left-[88px] top-0 bottom-0 w-px bg-white/[0.08]" />

          <div className="space-y-0">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="group flex gap-8 md:gap-12 py-8 border-b border-white/[0.05] hover:border-white/20 transition-colors duration-300"
              >
                {/* Year */}
                <div className="w-16 md:w-20 flex-shrink-0 text-right">
                  <span className="text-sm font-mono text-[#d6c6b8]/50 group-hover:text-[#d6c6b8] transition-colors duration-300">
                    {m.year}
                  </span>
                </div>

                {/* Dot */}
                <div className="relative flex-shrink-0 w-4 flex items-start pt-1">
                  <div className="w-2 h-2 rounded-full border border-white/20 group-hover:border-[#d6c6b8] group-hover:bg-[#d6c6b8]/20 transition-all duration-300" />
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <h3 className="text-lg md:text-xl font-semibold text-white/80 group-hover:text-white transition-colors duration-300 mb-2">
                    {m.event}
                  </h3>
                  <p className="text-sm text-white/35 leading-relaxed">{m.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
            <p className="text-xs uppercase tracking-[0.45em] text-[#d6c6b8] mb-6">Work With Us</p>
            <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tight leading-none mb-10"
              style={{ fontFamily: "var(--font-playfair), serif" }}>
              Let's Build<br />
              <span className="text-white/20">Something</span><br />
              Unforgettable.
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/team">
                <div className="group flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                  Meet The Team
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </Link>
              <div
                onClick={() => setShowContact(true)}
                className="cursor-pointer rounded-full bg-white text-black px-8 py-4 text-sm uppercase tracking-[0.2em] hover:bg-[#d6c6b8] transition-colors duration-300 font-medium"
              >
                Start A Project
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact Modal */}
        <AnimatePresence>
          {showContact && (
            <ContactModal
              isOpen={showContact}
              onClose={() => setShowContact(false)}
            />
          )}
        </AnimatePresence>

      </section>

      <Footer />
    </main>
  );
}
