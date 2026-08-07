export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="url(#logoGrad)" />
      <path d="M17.5 6h5v2h-5z" fill="#F5F2EC" />
      <path d="M17 8h6v6l4 4v12a2 2 0 0 1-2 2H15a2 2 0 0 1-2-2V18l4-4Z" fill="#F5F2EC" />
      <rect x="14" y="21" width="12" height="2.5" fill="#F5F2EC" opacity="0.25" />
      <path d="M15.5 14.5v14" stroke="#F5F2EC" strokeOpacity="0.12" strokeWidth="1.2" strokeLinecap="round" />
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D4A855" />
          <stop offset="1" stopColor="#A67C52" />
        </linearGradient>
      </defs>
    </svg>
  );
}
