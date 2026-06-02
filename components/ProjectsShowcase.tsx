"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import PremiumProjects from "@/components/PremiumProjectCarausel";
import ProjectHighlightsCarousel from "@/components/ClassicProjectCarausel";

import { projects } from "@/data/projects";

const CATEGORIES = [
  "All",
  "Residential",
  "Commercial",
  "Hospitality",
];

export default function ProjectShowcase() {
  const [view, setView] = useState<"premium" | "classic">("premium");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    return activeFilter === "All"
      ? projects
      : projects.filter(
          (project) => project.category === activeFilter
        );
  }, [activeFilter]);

  const visibleCategories = CATEGORIES.filter(
    (category) =>
      category === "All" ||
      projects.some((project) => project.category === category)
  );

  return (
    <section
      id="projects"
      className="py-20 md:py-32 bg-[#0d0d0d] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="uppercase tracking-[0.35em] text-xs text-[#d6c6b8] mb-4">
              Featured Works
            </p>

            <h2
              className="text-4xl md:text-6xl font-bold uppercase tracking-tight leading-none"
              style={{
                fontFamily:
                  "var(--font-playfair), serif",
              }}
            >
              Project
              <br />
              <span className="text-white/15">
                Highlights
              </span>
            </h2>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            viewport={{ once: true }}
            className="flex flex-col items-start md:items-end gap-10"
          >
            {/* Toggle */}
            <div className="relative flex items-center p-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl">
              {(["premium", "classic"] as const).map(
                (option) => (
                  <button
                    key={option}
                    onClick={() => setView(option)}
                    className="relative px-5 py-2.5"
                  >
                    {view === option && (
                      <motion.div
                        layoutId="active-view"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                        className="
                          absolute inset-0
                          rounded-full
                          bg-white
                          shadow-[0_0_25px_rgba(255,255,255,0.15)]
                        "
                      />
                    )}

                    <span
                      className={`relative z-10 text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 ${
                        view === option
                          ? "text-black"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      {option === "premium"
                        ? "Premium"
                        : "Classic"}
                    </span>
                  </button>
                )
              )}
            </div>

            {/* Category Chips */}
            <div className="flex flex-wrap gap-2 justify-end">
              {visibleCategories.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className="relative"
                >
                  {activeFilter === tab && (
                    <motion.div
                      layoutId="active-filter"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                      className="
                        absolute inset-0
                        rounded-full
                        bg-white
                        shadow-[0_0_20px_rgba(255,255,255,0.12)]
                      "
                    />
                  )}

                  <span
                    className={`relative z-10 block px-5 py-2.5 rounded-full border text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
                      activeFilter === tab
                        ? "text-black border-transparent"
                        : "text-white/50 border-white/15 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    {tab}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      {view === "premium" ? (
        <PremiumProjects
          externalFilter={activeFilter}
        />
      ) : (
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ProjectHighlightsCarousel
            projects={filteredProjects}
          />
        </div>
      )}
    </section>
  );
}