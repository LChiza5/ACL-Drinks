"use client";

import { motion } from "framer-motion";

const dots = [
  { top: "18%", left: "12%", size: 10, delay: 0, rgb: "212,167,44" },
  { top: "30%", left: "82%", size: 14, delay: 0.6, rgb: "22,166,115" },
  { top: "62%", left: "8%", size: 8, delay: 1.1, rgb: "240,53,110" },
  { top: "72%", left: "88%", size: 12, delay: 0.3, rgb: "212,167,44" },
  { top: "12%", left: "48%", size: 6, delay: 1.6, rgb: "22,166,115" },
  { top: "85%", left: "45%", size: 9, delay: 0.9, rgb: "240,53,110" },
];

export function HeroDepthLayer() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none motion-reduce:hidden" aria-hidden="true">
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full blur-[2px]"
          style={{
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            background: `radial-gradient(circle, rgba(${d.rgb},0.55) 0%, rgba(${d.rgb},0) 70%)`,
          }}
          animate={{ y: [0, -14, 0], opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: d.delay }}
        />
      ))}
    </div>
  );
}
