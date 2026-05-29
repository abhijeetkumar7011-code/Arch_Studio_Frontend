"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="relative overflow-hidden bg-[#050505] section-padding text-white">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-white/10 blur-[140px]" />

      <div className="container-custom relative z-10">
        <div className="mb-16 max-w-3xl">
          {/* <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm uppercase tracking-[0.2em] backdrop-blur-xl">
            Let’s Build Something Iconic
          </div> */}

          {/* <h2 className="heading-lg uppercase leading-none">
            Start Your
            <span className="block text-white/40">Dream Project</span>
          </h2>

          <p className="mt-6 text-white/60 text-lg leading-relaxed max-w-2xl">
            Whether it’s a residence, commercial masterpiece, or futuristic interior experience, we transform ambitious ideas into architectural reality.
          </p> */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm uppercase tracking-[0.2em] backdrop-blur-xl">
            </div> */}
            <p className="uppercase tracking-[0.35em] text-xs text-[#d6c6b8] mb-4">
              Let’s Build Something Iconic
            </p>
            <h2
              className="text-4xl md:text-6xl font-bold uppercase tracking-tight leading-none"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Start Your<br />
              <span className="text-white/20">Dream Project</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 md:p-10 backdrop-blur-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none transition-all focus:border-white/30"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none transition-all focus:border-white/30"
              />
            </div>

            <input
              type="text"
              placeholder="Project Type"
              className="mt-6 w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none transition-all focus:border-white/30"
            />

            <textarea
              rows={6}
              placeholder="Tell us about your vision..."
              className="mt-6 w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none transition-all focus:border-white/30"
            />

            <button className="mt-8 rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.03]">
              Send Inquiry
            </button>
          </motion.div>

          {/* Info Cards */}
          <div className="space-y-6">
            {[
              {
                icon: <Phone className="h-5 w-5" />,
                title: "Call Us",
                value: "+91 95688 54950",
              },
              {
                icon: <Mail className="h-5 w-5" />,
                title: "Email",
                value: "abhijeetkumar7011@gmail.com",
              },
              {
                icon: <MapPin className="h-5 w-5" />,
                title: "Studio",
                value: "New Delhi, India",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="rounded-[28px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-2xl"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  {item.icon}
                </div>

                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="mt-2 text-white/55">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}