"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import Logo from "./Logo";

export default function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-[#0a0a0a] rounded-[40px] border border-white/10 shadow-2xl overflow-hidden grid lg:grid-cols-2"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/70 transition-colors"
            >
              <X size={20} />
            </button>

            {/* LEFT VISUAL */}
            <div className="relative hidden lg:block min-h-[80vh] overflow-hidden">

              {/* Image */}
              <img
                src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2000&auto=format&fit=crop"
                alt="Architecture"
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/65" />

              {/* Glow */}
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#d6c6b8]/10 blur-[120px]" />

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col justify-center p-10">

                <div>
                  <Logo />

                  <div className="mt-10">
                    <p className="text-xs uppercase tracking-[0.4em] text-[#d6c6b8] mb-5">
                      Premium Architecture Studio
                    </p>

                    <h2
                      className="
                      text-6xl
                      font-bold
                      leading-[0.9]
                      tracking-tight
                      text-white
                      "
                      style={{
                        fontFamily: "var(--font-playfair), serif",
                      }}
                    >
                      Let’s Build
                      <span className="block text-white/35">
                        Something Iconic
                      </span>
                    </h2>

                    <p className="mt-8 max-w-md text-white/55 leading-relaxed">
                      Modern architecture crafted with cinematic
                      interiors, emotional storytelling and timeless
                      spatial experiences.
                    </p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4 mt-12">

                  <div className="flex items-center gap-4 text-white/70">
                    <span className="w-11 h-11 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center">
                      <Mail size={17} />
                    </span>

                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-white/30 mb-1">
                        Email
                      </p>

                      <p className="text-sm">
                        abhijeetkumar7011@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-white/70">
                    <span className="w-11 h-11 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center">
                      <Phone size={17} />
                    </span>

                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-white/30 mb-1">
                        Phone
                      </p>

                      <p className="text-sm">
                        +91 98765 43210
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-white/70">
                    <span className="w-11 h-11 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center">
                      <MapPin size={17} />
                    </span>

                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-white/30 mb-1">
                        Studio
                      </p>

                      <p className="text-sm">
                        New Delhi, India
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Form (Scrollable without visible bar) */}
            <div className="flex flex-col overflow-y-auto scrollbar-hide p-8 md:p-12">
              <div className="flex-1">
                {/* <p className="text-xs uppercase tracking-[0.3em] text-[#d6c6b8] mb-2">Get in Touch</p>
                <h3 className="text-3xl font-bold mb-8">Start Your Project</h3> */}

                <p className="text-xs uppercase tracking-[0.35em] text-[#d6c6b8] mb-4">
                  Get in Touch
                </p>

                <h3
                  className="text-2xl md:text-3xl font-bold leading-tight mb-4"
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                  }}
                >
                  Start Your
                  <span className="block text-white/35">
                    Dream Project
                  </span>
                </h3>

                <form
                  action="https://formsubmit.co/abhijeetkumar7011@gmail.com"
                  method="POST"
                  className="space-y-4 mt-12"
                >

                  {/* Hidden */}
                  <input
                    type="hidden"
                    name="_subject"
                    value="New Architecture Inquiry"
                  />

                  <input
                    type="hidden"
                    name="_template"
                    value="table"
                  />

                  <input
                    type="hidden"
                    name="_captcha"
                    value="false"
                  />

                  {/* Name */}
                  <div>
                    <label className="text-xs uppercase tracking-[0.2em] text-white/35 mb-3 block">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="
                      w-full
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.03]
                      px-5
                      py-4
                      text-sm
                      text-white
                      placeholder:text-white/20
                      outline-none
                      focus:border-[#d6c6b8]/40
                      transition
                      "
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs uppercase tracking-[0.2em] text-white/35 mb-3 block">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      className="
                      w-full
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.03]
                      px-5
                      py-4
                      text-sm
                      text-white
                      placeholder:text-white/20
                      outline-none
                      focus:border-[#d6c6b8]/40
                      transition
                      "
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs uppercase tracking-[0.2em] text-white/35 mb-3 block">
                      Project Details
                    </label>

                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us about your project..."
                      className="
                      w-full
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.03]
                      px-5
                      py-4
                      text-sm
                      text-white
                      placeholder:text-white/20
                      outline-none
                      resize-none
                      focus:border-[#d6c6b8]/40
                      transition
                      "
                    />
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    className="
                    group
                    w-full
                    rounded-2xl
                    bg-white
                    px-6
                    py-4
                    text-sm
                    font-semibold
                    text-black
                    transition
                    duration-300
                    hover:scale-[1.02]
                    flex
                    items-center
                    justify-center
                    gap-3
                    "
                  >
                    Send Message

                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}