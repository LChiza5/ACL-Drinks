"use client";

import { motion } from "framer-motion";

const INK = {
  bodyLight: "#D4A855",
  body: "#C9984A",
  bodyDark: "#A67C52",
  snout: "#B8916A",
  nose: "#3A2A1C",
  eye: "#20160D",
  tail: "#8B6239",
};

interface PizoteMascotProps {
  /** true = cubrirse los ojos con las patas (campo de contraseña enfocado y con contenido) */
  covering: boolean;
  /** true = entreabrir un ojo (el usuario activó "mostrar contraseña") */
  peeking?: boolean;
  className?: string;
}

export function PizoteMascot({ covering, peeking = false, className = "" }: PizoteMascotProps) {
  const leftPaw = covering ? { cx: 66, cy: 55 } : { cx: 60, cy: 87 };
  const rightPaw = covering ? { cx: 94, cy: 55 } : { cx: 100, cy: 87 };

  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true">
      {/* cola anillada */}
      <path d="M116 130 Q 152 122 148 82 Q 146 48 118 36" stroke={INK.tail} strokeWidth="18" fill="none" strokeLinecap="round" />
      <path d="M116 130 Q 152 122 148 82 Q 146 48 118 36" stroke={INK.bodyLight} strokeWidth="18" strokeDasharray="10 14" fill="none" strokeLinecap="round" opacity="0.55" />

      {/* cuerpo */}
      <ellipse cx="80" cy="118" rx="40" ry="32" fill={INK.body} />

      {/* orejas */}
      <circle cx="55" cy="33" r="10" fill={INK.bodyDark} />
      <circle cx="105" cy="33" r="10" fill={INK.bodyDark} />

      {/* cabeza (respiración sutil) */}
      <motion.circle
        cx="80" cy="62" r="36"
        fill={INK.bodyLight}
        animate={{ scale: [1, 1.015, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "80px 62px" }}
      />

      {/* hocico */}
      <ellipse cx="80" cy="82" rx="14" ry="11" fill={INK.snout} />
      <circle cx="80" cy="89" r="5" fill={INK.nose} />

      {/* ojos (las patas se posan encima al cubrir) */}
      <circle cx="66" cy="55" r="5" fill={INK.eye} />
      <circle cx="94" cy="55" r="5" fill={INK.eye} />

      {/* patas (CSS transitions: framer-motion no aplicaba cx/cy de forma confiable en este stack) */}
      <ellipse
        cx={leftPaw.cx} cy={leftPaw.cy} rx="13" ry="16"
        fill={INK.bodyLight}
        stroke={INK.bodyDark}
        strokeWidth="1.5"
        opacity={covering && peeking ? 0.35 : 1}
        style={{ transition: "cx 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), cy 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease" }}
      />
      <ellipse
        cx={rightPaw.cx} cy={rightPaw.cy} rx="13" ry="16"
        fill={INK.bodyLight}
        stroke={INK.bodyDark}
        strokeWidth="1.5"
        style={{ transition: "cx 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), cy 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
      />
    </svg>
  );
}
