"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

const TEAM = [
  {
    name: "Ankush Kumar",
    role: "Founder & Principal Architect",
    since: "2010",
    location: "Delhi, India",
    education: "IIT Roorkee · AA London",
    bio: "Ankush founded the studio after six years at Zaha Hadid Architects in London. His work is defined by a rigorous exploration of structure as expression — where the bones of a building become its beauty.",
    philosophy: "I believe the best architecture is the kind you feel before you understand it.",
    awards: ["Aga Khan Award Nominee 2016", "AD50 India 2021", "Architectural Record Vanguard 2023"],
    projects: ["Modern Villa", "Sky Pavilion", "Forest Retreat"],
    image: "https://images.unsplash.com/photo-1544168190-79c17527004f?w=600&auto=format&fit=crop",
    accent: "#d6c6b8",
  },
  {
    name: "Kajol Singh",
    role: "Design Director",
    since: "2012",
    location: "Mumbai, India",
    education: "CEPT Ahmedabad · ETH Zürich",
    bio: "Kajol leads all design development from concept through construction. Her spatial instincts are matched by a forensic attention to material detail — she can identify a stone's quarry by touch.",
    philosophy: "Every door hinge is a design decision. There are no minor details.",
    awards: ["Elle Decor A-List 2022", "Wallpaper* Architect of the Year 2023"],
    projects: ["Water House", "Obsidian Office", "Villa Delhi"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
    accent: "#c4b5a0",
  },
  {
    name: "Abhijeet Verma",
    role: "Head of Technology",
    since: "2015",
    location: "Bengaluru, India",
    education: "SPA Delhi · UCL Bartlett",
    bio: "Abhijeet bridges computational design and construction intelligence. He has pioneered the studio's use of parametric modelling and environmental simulation, ensuring every project performs as beautifully as it looks.",
    philosophy: "Algorithms don't design. But they let you explore a thousand ideas before choosing the right one.",
    awards: ["Digital Futures Award 2020", "RIBA Research Medal 2022"],
    projects: ["Obsidian Office", "Sky Pavilion"],
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop",
    accent: "#b8a898",
  },
  {
    name: "Natasha Verma",
    role: "Partner — Gulf Region",
    since: "2019",
    location: "Dubai, UAE",
    education: "AUB Beirut · Harvard GSD",
    bio: "Natasha established our Dubai practice and leads all Gulf projects. Her background in Islamic geometric tradition and contemporary tectonics creates a unique bridge between regional identity and international language.",
    philosophy: "Context is not a constraint — it's the source of every original idea.",
    awards: ["RIBA International Award 2022", "Gulf Architect of the Year 2024"],
    projects: ["Sky Pavilion"],
    image: "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?w=600&auto=format&fit=crop",
    accent: "#cfc0ac",
  },
  {
    name: "Prince Mishra",
    role: "Senior Architect",
    since: "2017",
    location: "Delhi, India",
    education: "TVB Delhi · TU Delft",
    bio: "Prince specialises in residential architecture and has led delivery on 40+ luxury homes. His calm precision and site intuition make him the studio's most trusted project architect.",
    philosophy: "A home is the most intimate thing we will ever build. It deserves our quietest, most careful attention.",
    awards: ["JK Cement Architecture Award 2021"],
    projects: ["Modern Villa", "Villa Delhi", "Water House"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
    accent: "#d6c6b8",
  },
  {
    name: "Meera Krishnan",
    role: "Interior & Materials Lead",
    since: "2018",
    location: "Mumbai, India",
    education: "NID Ahmedabad · Domus Academy Milan",
    bio: "Meera curates every material palette and interior installation in the studio's work. Her eye for the intersection of craft and contemporary design has defined the tactile character of our most celebrated interiors.",
    philosophy: "Touch matters as much as sight. A beautiful room that feels wrong to walk through has failed.",
    awards: ["AD Design Award 2023", "ELLE Décor Young Designer 2020"],
    projects: ["Forest Retreat", "Water House", "Obsidian Office"],
    image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?q=80&w=1887&auto=format&fit=crop",
    accent: "#c8b8a4",
  },
];

export default function TeamPage() {
  const [active, setActive] = useState<number | null>(null);
  const [showContact, setShowContact] = useState(false);

  return (
    <main
      className="bg-[#080808] text-white min-h-screen overflow-x-hidden"
      style={{ fontFamily: "var(--font-outfit), sans-serif" }}
    >
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
      <section className="relative h-[70vh] overflow-hidden flex items-end">
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
          alt="Team"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/40 to-transparent" />

        <div className="relative z-10 px-10 md:px-20 pb-20 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="uppercase tracking-[0.45em] text-xs text-[#d6c6b8] mb-6"
          >
            The People
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-[7.5rem] font-bold uppercase leading-[0.88] tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Behind
            <br />
            <span className="text-white/25">Every Space</span>
          </motion.h1>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="max-w-5xl mx-auto px-8 md:px-20 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-[180px_1fr] gap-12"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#d6c6b8] mb-4">Our Team</p>
            <div className="h-px w-10 bg-[#d6c6b8]/30" />
          </div>
          <p className="text-xl md:text-2xl text-white/60 leading-relaxed">
            Arch Studio is 28 architects, designers, and thinkers spread across Delhi, Mumbai, and Dubai.
            We share one conviction: that <span className="text-white">the best work comes from deep
              collaboration, relentless curiosity, and genuine care</span> for the people who will inhabit
            what we make.
          </p>
        </motion.div>
      </section>

      {/* ── TEAM GRID ── */}
      <section className="max-w-7xl mx-auto px-8 md:px-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div
                className="relative overflow-hidden rounded-2xl border border-white/[0.07] hover:border-white/20 transition-all duration-500 cursor-pointer bg-white/[0.02]"
                onClick={() => setActive(active === i ? null : i)}
              >
                {/* Photo */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/20 to-transparent" />

                  {/* Since badge */}
                  <div className="absolute top-4 right-4 rounded-full border border-white/15 bg-black/40 backdrop-blur-md px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-white/50">
                    Since {member.since}
                  </div>
                </div>

                {/* Info */}
                <div className="p-7">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#d6c6b8]/60 mb-2">
                    {member.location}
                  </p>
                  <h3
                    className="text-xl font-bold text-white mb-1 group-hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-sm text-white/40 mb-5">{member.role}</p>

                  {/* Education */}
                  <p className="text-xs text-white/25 uppercase tracking-widest mb-5 font-mono">
                    {member.education}
                  </p>

                  {/* Expand toggle */}
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/30 group-hover:text-white/60 transition-colors duration-300">
                    <span>{active === i ? "Close" : "Read Bio"}</span>
                    <motion.span
                      animate={{ rotate: active === i ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-base leading-none"
                    >
                      +
                    </motion.span>
                  </div>
                </div>

                {/* Hover accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to right, transparent, ${member.accent}80, transparent)` }}
                />
              </div>

              {/* ── Expanded Bio Panel ── */}
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-7 space-y-6">

                      {/* Bio */}
                      <p className="text-sm text-white/55 leading-relaxed">{member.bio}</p>

                      {/* Philosophy */}
                      <div className="border-l-2 border-[#d6c6b8]/30 pl-5">
                        <p className="text-sm italic text-white/70">"{member.philosophy}"</p>
                      </div>

                      {/* Awards */}
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.35em] text-white/25 mb-3">Recognition</p>
                        <div className="space-y-1.5">
                          {member.awards.map((a) => (
                            <div key={a} className="flex items-center gap-2">
                              <div className="w-1 h-1 rounded-full bg-[#d6c6b8]/40" />
                              <p className="text-xs text-white/40">{a}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Projects */}
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.35em] text-white/25 mb-3">Key Projects</p>
                        <div className="flex flex-wrap gap-2">
                          {member.projects.map((p) => (
                            <span key={p} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/40">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CULTURE STRIP ── */}
      <section className="max-w-7xl mx-auto px-8 md:px-20 py-24">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: "Studio Culture", value: "We critique each other's work every Friday morning. Harshly. Kindly." },
            { label: "How We Hire", value: "We look for people who care more about the quality of the question than the speed of the answer." },
            { label: "Where We Work", value: "Three studios. One shared way of seeing. Everyone visits every site at least once." },
          ].map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/[0.07] p-8 bg-white/[0.015]"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-[#d6c6b8]/60 mb-4">{c.label}</p>
              <p className="text-white/50 text-sm leading-relaxed">{c.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-white/[0.07] bg-[#060606]">
        <div className="max-w-4xl mx-auto px-8 md:px-20 py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-xs uppercase tracking-[0.45em] text-[#d6c6b8] mb-6">Join The Studio</p>
            <h2
              className="text-4xl md:text-6xl font-bold uppercase tracking-tight leading-none mb-8"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              We're Always<br />
              <span className="text-white/20">Looking For</span><br />
              Exceptional People.
            </h2>
            <p className="text-white/40 text-base mb-10 max-w-xl mx-auto leading-relaxed">
              We hire slowly and deliberately. If you think in three dimensions, care about craft, and want to build things that outlast you — we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/about">
                <div className="group flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                  About the Studio
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </Link>
              <div
                onClick={() => setShowContact(true)}
                className="cursor-pointer rounded-full bg-white text-black px-8 py-4 text-sm uppercase tracking-[0.2em] hover:bg-[#d6c6b8] transition-colors duration-300 font-medium"
              >
                Get In Touch
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContact && (
          <ContactModal
            isOpen={showContact}
            onClose={() => setShowContact(false)}
          />
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
