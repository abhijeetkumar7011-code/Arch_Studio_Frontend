"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | string>("2026");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050505] text-white">

      {/* Glow */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[700px] h-[300px] bg-white/[0.03] blur-[140px]" />
      </div>

      {/* Watermark */}
      <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 text-[11vw] font-bold tracking-[0.25em] text-white/[0.03] whitespace-nowrap pointer-events-none select-none">
        ARCH STUDIO
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16">

        {/* Top */}
        <div className="flex flex-col lg:flex-row justify-between gap-16 border-b border-white/10 pb-12">

          {/* Left */}
          <div className="max-w-md">
            <Logo />

            <p className="mt-6 text-sm leading-relaxed text-white/45">
              Crafting timeless architectural experiences where
              geometry, emotion and modern spatial storytelling merge
              into refined living.
            </p>

            {/* Socials */}
            <div className="flex flex-wrap items-center gap-4 mt-7 text-xs uppercase tracking-[0.25em] text-white/35">

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#d6c6b8] transition duration-300"
              >
                Instagram
              </a>

              {/* <span>/</span>

              <a
                href="https://behance.net"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#d6c6b8] transition duration-300"
              >
                Behance
              </a> */}

              <span>/</span>

              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#d6c6b8] transition duration-300"
              >
                Pinterest
              </a>

            </div>
          </div>

          {/* Right */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">

            {/* Quick Links */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.3em] text-white/30 mb-5">
                Quick Links
              </h4>

              <div className="space-y-3 text-sm text-white/50">

                <a href="#home" className="block hover:text-white transition">
                  Home
                </a>

                <a href="#projects" className="block hover:text-white transition">
                  Projects
                </a>

                <a href="#about" className="block hover:text-white transition">
                  About
                </a>

                <a href="#services" className="block hover:text-white transition">
                  Services
                </a>

              </div>
            </div>

            {/* Important */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.3em] text-white/30 mb-5">
                Important
              </h4>

              <div className="space-y-3 text-sm text-white/50">

                <a href="#contact" className="block hover:text-white transition">
                  Contact
                </a>

                <a href="#" className="block hover:text-white transition">
                  Privacy Policy
                </a>

                <a href="#" className="block hover:text-white transition">
                  Terms & Conditions
                </a>

                <a href="#" className="block hover:text-white transition">
                  Studio Process
                </a>

              </div>
            </div>

            {/* Studio */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.3em] text-white/30 mb-5">
                Studio
              </h4>

              <div className="space-y-3 text-sm text-white/50">

                <p>
                  New Delhi, India
                </p>

                <p>
                  Mon — Fri
                </p>

                <p>
                  9:00 AM — 6:00 PM
                </p>

              </div>
            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 text-xs uppercase tracking-[0.18em] text-white/30">

            <p>
              © {currentYear} Arch Studio
            </p>

            <div className="hidden md:block w-1 h-1 rounded-full bg-white/20" />

            <p className="flex items-center gap-2">
              <span className="text-white/20">&lt;/&gt;</span>

              Developed by
              
              <span className="text-white font-medium tracking-[0.2em]">
                Abhijeet Verma
              </span>
            </p>

          </div>

          {/* Back To Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/40 hover:text-white transition duration-300"
          >
            <span>
              Back to top
            </span>

            <span className="p-3 rounded-full border border-white/10 bg-white/[0.03] group-hover:bg-white group-hover:text-black transition duration-500">
              <ArrowUp size={14} />
            </span>
          </button>

        </div>

      </div>

    </footer>
  );
}