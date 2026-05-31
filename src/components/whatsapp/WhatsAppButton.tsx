"use client";

import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from "@/constants";

export function WhatsAppButton() {
  const url = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-4 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white rounded-full shadow-lg shadow-green-500/30 transition-colors group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="flex items-center justify-center h-14 w-14 rounded-full">
        <FaWhatsapp className="h-7 w-7" />
      </span>
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap pr-0 group-hover:pr-4 text-sm font-semibold">
        ¡Escríbenos!
      </span>
    </motion.a>
  );
}
