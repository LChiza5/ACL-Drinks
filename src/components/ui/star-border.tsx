"use client";

// Adapted from react-bits' StarBorder (https://reactbits.dev) — zero dependencies.
export function StarBorder({
  children,
  color = "#D4A72C",
  speed = "5s",
  className = "",
}: {
  children: React.ReactNode;
  color?: string;
  speed?: string;
  className?: string;
}) {
  return (
    <div className={`star-border-container ${className}`}>
      <div className="border-gradient-bottom" style={{ background: `radial-gradient(circle, ${color}, transparent 10%)`, animationDuration: speed }} />
      <div className="border-gradient-top" style={{ background: `radial-gradient(circle, ${color}, transparent 10%)`, animationDuration: speed }} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
