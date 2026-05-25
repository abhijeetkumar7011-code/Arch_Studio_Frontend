"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onContactClick: () => void;
}

export default function Navbar({ onContactClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = ["Home", "Projects", "About", "Services"]//, "Process", "Testimonials"];

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 w-full z-50 py-6 px-4 md:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-full px-6 py-4 flex items-center justify-between backdrop-blur-md bg-black/20 border border-white/10">
            <h1 className="text-lg md:text-xl font-bold tracking-widest text-white">
              ARCH STUDIO
            </h1>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-8 text-sm uppercase tracking-wider text-neutral-300">
              {navLinks.map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-white transition">
                  {link}
                </a>
              ))}
              <button onClick={onContactClick} className="text-white font-semibold hover:text-[#d6c6b8] transition">
                CONTACT
              </button>
            </div>

            {/* Mobile Burger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-white hover:text-neutral-400 transition"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-black z-50 flex flex-col justify-between p-8"
          >
            <div className="flex justify-between items-center w-full">
              <h1 className="text-lg font-bold tracking-widest text-white">ARCH STUDIO</h1>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white">
                <X size={28} />
              </button>
            </div>

            <div className="flex flex-col gap-6 text-3xl font-bold uppercase tracking-tight text-neutral-400 mt-10">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-white transition"
                >
                  {link}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onContactClick();
                }}
                className="text-left hover:text-white transition text-[#d6c6b8]"
              >
                Contact Us
              </button>
            </div>

            <p className="text-xs text-neutral-600">© 2026 Arch Studio. Minimal Design.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}