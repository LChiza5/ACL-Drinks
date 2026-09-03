"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";

interface FloatingActionButtonProps {
  href: string;
  icon: IconType;
  label: string;
  ariaLabel: string;
  iconBg: string;
  labelBg: string;
  iconGlow: string;
  bottomClass: string;
  delay?: number;
}

/**
 * Shared shape for the two floating action buttons (WhatsApp, Instagram).
 * No `gap` on the flex row — the hover-reveal label uses its own padding to
 * create space instead, so a collapsed (max-w-0) label never adds a phantom
 * gap to the resting circle. Order is always [label, icon]: the icon sits
 * last/right, anchored by `right-4`, so it stays put as the label grows to
 * its left instead of shifting position itself.
 */
export function FloatingActionButton({ href, icon: Icon, label, ariaLabel, iconBg, labelBg, iconGlow, bottomClass, delay = 1 }: FloatingActionButtonProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`fixed ${bottomClass} right-4 z-50 flex items-center group`}
      style={{ borderRadius: "9999px" }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span
        className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-sm font-semibold text-white pl-0 group-hover:pl-4 pr-0 group-hover:pr-3 rounded-l-full"
        style={{ background: labelBg, lineHeight: "3.5rem" }}
      >
        {label}
      </span>
      <span
        className="flex items-center justify-center h-14 w-14 rounded-full shadow-lg shrink-0"
        style={{ background: iconBg, boxShadow: iconGlow }}
      >
        <Icon className="h-7 w-7 text-white" />
      </span>
    </motion.a>
  );
}
