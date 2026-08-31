/**
 * Signature glass-with-diamond mark, echoing the glass icon inside the real
 * ACL Drinks logo monogram. Drawn at lucide's 24x24/round-join convention so
 * it drops in wherever a lucide icon would go, but reads as the brand's own
 * shape instead of a generic library glyph.
 */
export function BrandGlassIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M7 3.5h10l-1.6 15.3a2.2 2.2 0 0 1-2.19 1.97h-2.42a2.2 2.2 0 0 1-2.19-1.97L7 3.5Z" />
      <path d="M12 8.5l2.6 2.6-2.6 2.6-2.6-2.6 2.6-2.6Z" />
    </svg>
  );
}
