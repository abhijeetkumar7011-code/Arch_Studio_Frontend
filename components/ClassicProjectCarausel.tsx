"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  image: string;
};

export default function ProjectHighlightsCarousel({
  projects,
}: {
  projects: Project[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;

    const cardWidth = 384; // 360 + gap approx

    const index = Math.round(
      container.scrollLeft / cardWidth
    );

    setActiveIndex(
      Math.min(index, projects.length - 1)
    );
  };

  return (
    <section className="py-6 overflow-hidden">
      <div className="max-w-[1800px] mx-auto">

        {/* Gallery */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="
            flex gap-6
            overflow-x-auto
            px-8 pb-8
            snap-x snap-mandatory
            scrollbar-hide
            scroll-smooth
          "
          style={{ scrollbarWidth: "none" }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.05,
                duration: 0.6,
              }}
              className="group shrink-0 snap-start w-[360px]"
            >
              <Link href={`/projects/${project.slug}`}>
                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-[28px]
                    h-[520px]
                    bg-white/[0.03]
                    border border-white/[0.06]
                  "
                >
                  {/* Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="
                      absolute inset-0
                      w-full h-full
                      object-cover
                      transition-all duration-1000
                      group-hover:scale-110
                    "
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  {/* Top */}
                  <div className="absolute top-5 left-5 right-5 flex justify-between items-center">
                    <div className="text-[11px] tracking-[0.3em] text-white/40 font-mono">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div
                      className="
                        px-3 py-1.5
                        rounded-full
                        border border-white/15
                        bg-black/30
                        backdrop-blur-xl
                        text-[10px]
                        uppercase
                        tracking-[0.2em]
                        text-white/70
                      "
                    >
                      {project.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-7">

                    <div className="mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/50">
                      <span>{project.location}</span>
                      <span>•</span>
                      <span>{project.year}</span>
                    </div>

                    <h3
                      className="text-4xl leading-[0.95] text-white mb-6"
                      style={{
                        fontFamily:
                          "'Cormorant Garamond', serif",
                      }}
                    >
                      {project.title}
                    </h3>

                    <div className="flex items-center justify-between">

                      <span className="text-[11px] uppercase tracking-[0.25em] text-white/50">
                        View Project
                      </span>

                      <div
                        className="
                          w-11 h-11
                          rounded-full
                          border border-white/15
                          flex items-center justify-center
                          text-white
                          transition-all duration-500
                          group-hover:bg-white
                          group-hover:text-black
                          group-hover:translate-x-1
                          group-hover:-translate-y-1
                        "
                      >
                        ↗
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Pointer */}
        <div className="flex justify-center items-center gap-3 mt-2">
          {projects.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => {
                scrollRef.current?.scrollTo({
                  left: i * 384,
                  behavior: "smooth",
                });

                setActiveIndex(i);
              }}
              animate={{
                width: i === activeIndex ? 40 : 16,
                opacity: i === activeIndex ? 1 : 0.4,
              }}
              transition={{
                duration: 0.3,
              }}
              className="h-[4px] rounded-full bg-white"
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center gap-5 px-8">
          <div className="flex-1 h-px bg-white/[0.06]" />

          <span className="text-[10px] uppercase tracking-[0.35em] text-white/25">
            Drag To Explore
          </span>

          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>
      </div>
    </section>
  );
}