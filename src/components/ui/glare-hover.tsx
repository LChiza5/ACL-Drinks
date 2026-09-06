"use client";

// Diagonal light sweep across product imagery on hover. Adapted from
// react-bits' GlareHover (https://reactbits.dev) — zero dependencies.
export function GlareHover({
  children,
  glareColor = "#F5F2EC",
  glareOpacity = 0.28,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 650,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const hex = glareColor.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;

  return (
    <div
      className={`glare-hover ${className}`}
      style={
        {
          "--gh-angle": `${glareAngle}deg`,
          "--gh-duration": `${transitionDuration}ms`,
          "--gh-size": `${glareSize}%`,
          "--gh-rgba": rgba,
          ...style,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
