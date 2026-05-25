"use client";

import { motion } from "framer-motion";

export default function MagneticButton({ children }: any) {
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="px-6 py-3 rounded-full bg-white text-black text-sm"
    >
      {children}
    </motion.button>
  );
}