"use client";

import { FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import { INSTAGRAM_URL } from "@/constants";

export function InstagramButton() {
  return (
    <motion.a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-4 z-50 flex items-center gap-2 text-white rounded-full shadow-lg transition-colors group"
      style={{ background: "linear-gradient(135deg, #f43f5e, #ec4899, #a855f7)" }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="flex items-center justify-center h-14 w-14 rounded-full">
        <FaInstagram className="h-7 w-7" />
      </span>
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap pr-0 group-hover:pr-4 text-sm font-semibold">
        Síguenos
      </span>
    </motion.a>
  );
}
