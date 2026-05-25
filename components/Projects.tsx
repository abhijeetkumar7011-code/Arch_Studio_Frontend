"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    title: "Modern Villa",
    location: "Mumbai, India",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Urban Residence",
    location: "Delhi, India",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1974&auto=format&fit=crop",
  },
  {
    title: "Luxury Interior",
    location: "Dubai, UAE",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1974&auto=format&fit=crop",
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 md:py-32 bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="uppercase tracking-[0.3em] text-xs md:text-sm text-neutral-400 mb-4">
              Featured Work
            </p>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-tight">
              Projects Highlight
            </h2>
          </motion.div>

          {/* Dynamic Tabs Filters */}
          <div className="flex gap-4 text-xs md:text-sm uppercase tracking-widest border-b border-white/10 pb-2 w-full md:w-auto">
            {["All", "Residential", "Commercial"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`pb-2 relative transition duration-300 ${activeFilter === tab ? "text-white" : "text-neutral-500 hover:text-neutral-300"}`}
              >
                {tab}
                {activeFilter === tab && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#d6c6b8]" />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group relative overflow-hidden rounded-[24px] h-[400px] md:h-[500px] cursor-pointer"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:via-black/20 transition duration-500" />

                <div className="absolute bottom-0 left-0 p-6 md:p-8 z-10 w-full">
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-300 mb-2">
                    {project.location} • {project.category}
                  </p>
                  <h3 className="text-2xl font-semibold text-white">
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}