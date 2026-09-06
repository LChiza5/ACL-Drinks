"use client";

import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

/**
 * Number that rolls up from 0 to its value the first time it scrolls into
 * view, using Number Flow's per-digit animation.
 *
 * Built on top of the Number Flow setup that ships with Skiper UI's
 * AnimatedNumber (skiper37) — see src/components/ui/skiper-ui/skiper37.tsx
 * for the original reference implementation and its attribution notice.
 */
export function CountUpNumber({
  value,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) setDisplay(value);
  }, [inView, value]);

  return (
    <span ref={ref} className={className}>
      <NumberFlow
        value={display}
        prefix={prefix}
        suffix={suffix}
        transformTiming={{ duration: 900, easing: "cubic-bezier(0.23, 1, 0.32, 1)" }}
        willChange
      />
    </span>
  );
}
