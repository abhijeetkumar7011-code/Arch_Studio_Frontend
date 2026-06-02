"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const PROJECT_DATA = {
  RESIDENTIAL: [
    { title: "Modern Villa", location: "MUMBAI, INDIA", href: "/projects/modern-villa" },
    { title: "Water House", location: "UDAIPUR, INDIA", href: "/projects/water-house" },
  ],
  COMMERCIAL: [
    { title: "Sky Pavilion", location: "DUBAI, UAE", href: "/projects/sky-pavilion" },
    { title: "Obsidian Office", location: "BENGALURU, INDIA", href: "/projects/obsidian-office" },
  ],
  HOSPITALITY: [
    { title: "Forest Retreat", location: "COORG, INDIA", href: "/projects/forest-retreat" },
  ],
};

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Services", href: "/#services" },
];

export default function Navbar({ onContactClick }: { onContactClick?: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 w-full z-50 py-5 px-4 md:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-full px-6 py-4 flex items-center justify-between backdrop-blur-md bg-black/20 border border-white/10">
            <Link href="/"><Logo /></Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-wider text-neutral-400">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`hover:text-white transition ${isActive(link.href) ? "text-white" : ""}`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Projects — click → /projects, hover → dropdown */}
              <div className="relative group cursor-pointer">
                <Link
                  href="/projects"
                  className="flex items-center gap-1 hover:text-white transition"
                >
                  Projects
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                </Link>

                <div className="absolute top-full left-0 pt-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out">
                  <div
                    className="w-[300px] rounded-[28px] overflow-hidden shadow-2xl"
                    style={{
                      background: "rgba(10,10,10,0.92)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      backdropFilter: "blur(24px)",
                      WebkitBackdropFilter: "blur(24px)",
                      boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
                    }}
                  >
                    <div className="p-7">
                      {/* View All row */}
                      <Link
                        href="/projects"
                        className="flex items-center justify-between mb-6 pb-5 group/all"
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                      >
                        <span className="group-hover/all:text-white transition-colors"
                          style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
                          View All Projects
                        </span>
                        <span className="group-hover/all:text-[#d6c6b8] transition-colors"
                          style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>↗</span>
                      </Link>

                      {Object.entries(PROJECT_DATA).map(([category, items], catIdx) => (
                        <div key={category} className={catIdx !== Object.keys(PROJECT_DATA).length - 1 ? "mb-7" : ""}>
                          <p style={{ fontSize: "9px", letterSpacing: "0.28em", color: "#d6c6b8", textTransform: "uppercase", fontWeight: 500, marginBottom: "14px" }}>
                            {category}
                          </p>
                          <div className="space-y-4">
                            {items.map((item) => (
                              <Link key={item.title} href={item.href} className="group/item flex items-start justify-between">
                                <div>
                                  <p className="group-hover/item:text-white transition-colors duration-200"
                                    style={{ fontSize: "14px", color: "rgba(255,255,255,0.85)", fontWeight: 400 }}>
                                    {item.title}
                                  </p>
                                  <p style={{ fontSize: "9px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.28)", marginTop: "4px", textTransform: "uppercase" }}>
                                    {item.location}
                                  </p>
                                </div>
                                <span className="group-hover/item:text-[#d6c6b8] transition-colors duration-200 mt-0.5"
                                  style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px", flexShrink: 0, marginLeft: "12px" }}>↗</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onContactClick}
              className="
                hidden md:flex
                items-center
                gap-2
                rounded-full
                bg-[#d6c6b8]
                px-6
                py-3
                text-xs
                uppercase
                tracking-[0.18em]
                text-black
                transition-all
                duration-300
                hover:scale-105
                hover:bg-white
  "
            >
              Contact Us
              <span>→</span>
            </button>

            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-white">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex flex-col"
            style={{ background: "rgba(6,6,6,0.97)", backdropFilter: "blur(30px)" }}
          >
            <div className="flex items-center justify-between px-6 pt-14">
              <Logo />
              <button
                onClick={() => { setMobileMenuOpen(false); setProjectsOpen(false); }}
                className="flex items-center justify-center w-10 h-10 rounded-full text-white"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pt-10">
              <div>
                <div className="flex items-center justify-between py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <Link href="/projects" onClick={() => setMobileMenuOpen(false)}
                    className="text-white font-normal" style={{ fontSize: "26px", letterSpacing: "-0.3px" }}>
                    Projects
                  </Link>
                  <button onClick={() => setProjectsOpen((p) => !p)} className="p-2 text-white/40">
                    <ChevronDown size={20} className="transition-transform duration-300"
                      style={{ transform: projectsOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                  </button>
                </div>

                <AnimatePresence>
                  {projectsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="py-5 space-y-6">
                        {Object.entries(PROJECT_DATA).map(([category, items], catIdx) => (
                          <div key={category}>
                            {catIdx > 0 && <div className="mb-5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }} />}
                            <p style={{ fontSize: "9px", letterSpacing: "0.28em", color: "#d6c6b8", textTransform: "uppercase", marginBottom: "14px" }}>
                              {category}
                            </p>
                            <div className="space-y-4">
                              {items.map((item) => (
                                <Link key={item.title} href={item.href} onClick={() => setMobileMenuOpen(false)}
                                  className="flex items-start justify-between group">
                                  <div>
                                    <p className="group-hover:text-white transition-colors" style={{ fontSize: "14px", color: "rgba(255,255,255,0.85)" }}>
                                      {item.title}
                                    </p>
                                    <p style={{ fontSize: "9px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.28)", textTransform: "uppercase", marginTop: "3px" }}>
                                      {item.location}
                                    </p>
                                  </div>
                                  <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>↗</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {NAV_LINKS.map((link) => (
                <Link key={link.label} href={link.href} onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-4"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontSize: "26px", letterSpacing: "-0.3px", color: "rgba(255,255,255,0.7)", fontWeight: 400 }}>
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>

            <div className="px-6 pb-10 pt-6">
              <button
                onClick={() => { setMobileMenuOpen(false); onContactClick?.(); }}
                className="w-full rounded-full py-4 text-white transition hover:bg-white hover:text-black"
                style={{ border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.04)", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase" }}
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
