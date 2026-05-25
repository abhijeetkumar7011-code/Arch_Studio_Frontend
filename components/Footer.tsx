"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | string>("2026");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-20 pb-10 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top Grid Area */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pb-16 border-b border-white/5">
          
          {/* Column 1: Brand & Text-Based Social Links */}
          <div className="space-y-6 md:col-span-1">
            <h3 className="text-xl font-bold tracking-widest text-white">
              ARCH STUDIO
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              Crafting timeless architectural experiences where aesthetics, function, and emotion converge.
            </p>
            
            {/* Sleek Text-Based Social Links */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs uppercase tracking-[0.2em] text-neutral-500 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#d6c6b8] transition duration-300"
              >
                Instagram
              </a>
              <span className="text-neutral-700">/</span>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#d6c6b8] transition duration-300"
              >
                Twitter
              </a>
              <span className="text-neutral-700">/</span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#d6c6b8] transition duration-300"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><a href="#home" className="hover:text-white transition duration-300">Home</a></li>
              <li><a href="#projects" className="hover:text-white transition duration-300">Projects</a></li>
              <li><a href="#about" className="hover:text-white transition duration-300">About Studio</a></li>
              <li><a href="#services" className="hover:text-white transition duration-300">Services</a></li>
            </ul>
          </div>

          {/* Column 3: Studio Location */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-bold">
              Studio Office
            </h4>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Connaught Place, New Delhi,<br />
              Delhi 110001, India
            </p>
            <p className="text-xs text-neutral-500 pt-1">
              Mon — Fri: 9:00 AM - 6:00 PM
            </p>
          </div>

          {/* Column 4: Newsletter/Updates */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-bold">
              Newsletter
            </h4>
            <p className="text-sm text-neutral-400">
              Subscribe to get latest design insights.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center border-b border-white/20 pb-2 pt-1 focus-within:border-[#d6c6b8] transition duration-300">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-transparent text-sm w-full focus:outline-none placeholder-neutral-600 text-white"
              />
              <button type="submit" className="text-xs uppercase tracking-widest text-[#d6c6b8] hover:text-white transition pl-2">
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar Section */}
        <div className="pt-10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-xs text-neutral-500 space-y-1 text-center sm:text-left">
            <p>© {currentYear} Arch Studio. All rights reserved.</p>
            
            {/* Beautiful & Sleek Developer Signature */}
            <p className="text-neutral-600 flex items-center justify-center sm:justify-start gap-1.5 tracking-wide">
              <span>Designed with precision & minimalism.</span>
              <span className="text-neutral-700">|</span>
              <span className="font-mono text-[11px] text-neutral-400 bg-white/[0.02] border border-white/5 px-2 py-0.5 rounded-md hover:text-[#d6c6b8] hover:border-[#d6c6b8]/20 transition duration-300">
                &lt;/&gt; Developed by <span className="font-sans font-medium tracking-wider text-white">Abhijeet</span>
              </span>
            </p>
          </div>

          {/* Back To Top Action */}
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition duration-300"
          >
            <span>Back to top</span>
            <span className="p-3 bg-white/5 border border-white/10 rounded-full group-hover:bg-white group-hover:text-black transition duration-500">
              <ArrowUp size={14} />
            </span>
          </button>
        </div>

      </div>

      {/* Huge Background Subtle Watermark Text */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.03] text-[12vw] font-bold tracking-[0.15em] text-white whitespace-nowrap">
        ARCH STUDIO
      </div>
    </footer>
  );
}