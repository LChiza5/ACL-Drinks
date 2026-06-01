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
      className="fixed bottom-6 right-4 z-50 flex items-center group"
      style={{ borderRadius: "9999px" }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span
        className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-sm font-semibold text-white pl-0 group-hover:pl-4 pr-0 group-hover:pr-3 rounded-l-full"
        style={{ background: "#166534", lineHeight: "3.5rem" }}
      >
        Soporte
      </span>
      <span
        className="flex items-center justify-center h-14 w-14 rounded-full shadow-lg"
        style={{
          background: "linear-gradient(135deg, #22c55e, #16a34a)",
          boxShadow: "0 4px 20px rgba(34,197,94,0.4)",
        }}
      >
        <FaWhatsapp className="h-7 w-7 text-white" />
      </span>
    </motion.a>
  );
}
