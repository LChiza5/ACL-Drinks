"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";

interface FloatingActionButtonProps {
  href: string;
  icon: IconType;
  label: string;
  ariaLabel: string;
  iconBg: string;
  iconGlow: string;
  bottomClass: string;
  delay?: number;
}

/**
 * Floating action button that expands into a single continuous pill on hover.
 *
 * The whole anchor carries the gradient and `rounded-full`, so collapsed it is
 * exactly a 60px circle and expanded it is one uninterrupted pill — the label
 * lives *inside* that same surface instead of being a separate slab bolted to
 * the left of the circle (which read as two detached shapes).
 */
export function FloatingActionButton({ href, icon: Icon, label, ariaLabel, iconBg, iconGlow, bottomClass, delay = 1 }: FloatingActionButtonProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`fixed ${bottomClass} right-4 sm:right-5 z-50 group flex h-[52px] sm:h-[60px] items-center justify-end rounded-full pr-[5px] pl-[5px] sm:pr-[6px] sm:pl-[6px] hover:pl-6 transition-[padding] duration-300 ease-out`}
      style={{ background: iconBg, boxShadow: iconGlow }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
    >
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[15px] font-bold text-white transition-all duration-300 ease-out group-hover:max-w-[10rem] group-hover:pr-3">
        {label}
      </span>
      <span className="flex h-[42px] w-[42px] sm:h-12 sm:w-12 shrink-0 items-center justify-center">
        <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-white drop-shadow-sm" />
      </span>
    </motion.a>
  );
}
