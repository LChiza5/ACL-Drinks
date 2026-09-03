/**
 * Original flat-illustration icons for the tropical-fauna strip. Same
 * technique as PizoteMascot (flat ellipses/paths, no gradients, no photo
 * refs) so the set reads as one cohesive family instead of a grab-bag of
 * borrowed styles - the thing that sank the two previous attempts (emoji
 * icon packs, then stock wildlife photos).
 */

const INK = {
  charcoal: "#3A332B",
  sand: "#E8DFC8",
};

export function FrogIcon({ className = "h-full w-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <ellipse cx="32" cy="42" rx="19" ry="15" fill="#7C8B4A" />
      <path d="M15 40 Q10 34 14 27" stroke="#4F7C82" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M49 40 Q54 34 50 27" stroke="#4F7C82" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
      <ellipse cx="15" cy="50" rx="6" ry="4" fill="#C1703F" />
      <ellipse cx="49" cy="50" rx="6" ry="4" fill="#C1703F" />
      <circle cx="21" cy="24" r="10" fill="#7C8B4A" />
      <circle cx="43" cy="24" r="10" fill="#7C8B4A" />
      <circle cx="21" cy="23" r="6.5" fill={INK.sand} />
      <circle cx="43" cy="23" r="6.5" fill={INK.sand} />
      <circle cx="21" cy="23" r="4" fill="#B5453A" />
      <circle cx="43" cy="23" r="4" fill="#B5453A" />
      <ellipse cx="21" cy="23" rx="1.3" ry="3" fill={INK.charcoal} />
      <ellipse cx="43" cy="23" rx="1.3" ry="3" fill={INK.charcoal} />
      <path d="M24 46 Q32 51 40 46" stroke="#5C6B38" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function ToucanIcon({ className = "h-full w-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <ellipse cx="27" cy="40" rx="13" ry="16" fill={INK.charcoal} />
      <path d="M18 30a10 10 0 0 1 18-6" fill={INK.charcoal} />
      <path d="M20 26c2-6 8-9 8-9s-1 6-6 10Z" fill={INK.sand} opacity="0" />
      <ellipse cx="24" cy="42" rx="6" ry="9" fill="#D4A94A" />
      <path d="M30 22c9-4 20-2 26 4-6 2-10 1-13-1 2 2 2 5 0 7-4-1-7-3-9-6-1 3-2 5-4 6-2-3-2-7 0-10Z" fill="#7C8B4A" />
      <path d="M56 26c-3-2-7-1-13 1 2 3 6 6 10 6 2-2 3-4 3-7Z" fill="#C1703F" />
      <path d="M53 33c-2 0-5-1-7-3 1 2 1 5-1 7 2 1 5 0 7-2 1-1 1-1 1-2Z" fill="#B5453A" />
      <circle cx="24" cy="26" r="2.6" fill={INK.sand} />
      <circle cx="24" cy="26" r="1.2" fill={INK.charcoal} />
      <path d="M20 55c0-4 2-7 4-7" stroke="#D4A94A" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M30 55c0-4-1-7-3-7" stroke="#D4A94A" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function SlothIcon({ className = "h-full w-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M12 30c-4 4-6 12-3 20" stroke="#B8AC94" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M52 30c4 4 6 12 3 20" stroke="#B8AC94" strokeWidth="7" fill="none" strokeLinecap="round" />
      <ellipse cx="32" cy="36" rx="19" ry="17" fill="#B8AC94" />
      <ellipse cx="32" cy="38" rx="12" ry="11" fill={INK.sand} />
      <path d="M23 30q-1 9 2 14" stroke="#6B5F49" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M41 30q1 9-2 14" stroke="#6B5F49" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <circle cx="24" cy="34" r="2.4" fill={INK.charcoal} />
      <circle cx="40" cy="34" r="2.4" fill={INK.charcoal} />
      <circle cx="23.3" cy="33.3" r="0.8" fill={INK.sand} />
      <circle cx="39.3" cy="33.3" r="0.8" fill={INK.sand} />
      <ellipse cx="32" cy="43" rx="2.6" ry="2" fill="#6B5F49" />
      <path d="M27 47q5 3 10 0" stroke="#6B5F49" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M8 50l3-4M11 50l2-5M14 51l1-5" stroke="#6B5F49" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M56 50l-3-4M53 50l-2-5M50 51l-1-5" stroke="#6B5F49" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function MacawIcon({ className = "h-full w-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M40 44c10 2 18-2 20-8-6 1-11 0-14-3 6 0 9-3 9-7-5 2-9 2-12 0 3-1 4-4 3-7-8 2-13 8-14 16Z" fill="#4A6FA5" />
      <path d="M39 40c8 1 14-2 16-6-5 1-9-1-11-3 5-1 7-3 7-6-4 1-8 1-10-1 2-1 3-3 2-5-6 2-10 7-11 13Z" fill="#D4A94A" />
      <ellipse cx="27" cy="34" rx="15" ry="13" fill="#B5453A" />
      <ellipse cx="18" cy="32" rx="6" ry="7" fill={INK.sand} />
      <circle cx="17" cy="31" r="2" fill={INK.charcoal} />
      <path d="M11 34c-4 1-7 4-7 7 3 0 6-2 7-4Z" fill={INK.charcoal} />
      <path d="M22 45c2 4 3 9 1 13-3-3-5-8-5-13Z" fill="#4A6FA5" opacity="0.85" />
    </svg>
  );
}

export function HowlerMonkeyIcon({ className = "h-full w-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M50 46c7 3 10 10 6 16-5-3-8-9-6-16Z" fill={INK.charcoal} />
      <ellipse cx="16" cy="32" rx="9" ry="14" fill="#D4A94A" />
      <ellipse cx="48" cy="32" rx="9" ry="14" fill="#D4A94A" />
      <ellipse cx="32" cy="32" rx="16" ry="15" fill={INK.charcoal} />
      <ellipse cx="32" cy="35" rx="10" ry="9" fill="#8A7F63" />
      <ellipse cx="27" cy="33" rx="3.2" ry="4" fill={INK.sand} />
      <ellipse cx="37" cy="33" rx="3.2" ry="4" fill={INK.sand} />
      <circle cx="27" cy="33" r="1.5" fill={INK.charcoal} />
      <circle cx="37" cy="33" r="1.5" fill={INK.charcoal} />
      <ellipse cx="32" cy="40" rx="4" ry="3" fill="#6B5F49" />
    </svg>
  );
}
