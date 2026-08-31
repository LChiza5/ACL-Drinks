import type { Transition, Variants } from "framer-motion";

// Shared spring presets so every component in the redesign moves with the
// same physical "weight" instead of ad-hoc stiffness/damping per file.
export const springs = {
  snappy: { type: "spring", stiffness: 320, damping: 28 } satisfies Transition,
  gentle: { type: "spring", stiffness: 140, damping: 16 } satisfies Transition,
  bouncy: { type: "spring", stiffness: 380, damping: 12 } satisfies Transition,
};

export const durations = {
  fast: 0.18,
  normal: 0.3,
  slow: 0.5,
};

// Scroll-triggered reveal: fade + rise, once per element, staggered by index.
export function fadeUp(index = 0, stepDelay = 0.06) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { ...springs.gentle, delay: index * stepDelay },
  };
}

// Parent/child stagger variants for lists (nav menus, footer columns, grids).
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: springs.gentle },
};
