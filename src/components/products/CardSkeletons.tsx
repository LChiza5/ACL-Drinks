import { Skeleton } from "@/components/ui/skeleton";

/**
 * The old placeholders were a bare `aspect-square` box while the real card is a
 * 4/5 image plus ~150px of body and a brand footer. Every Suspense boundary
 * therefore shifted the page down the moment data arrived — pure CLS. These
 * mirror the real cards' DOM so the swap is invisible.
 */
export function ProductCardSkeleton() {
  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-2xl border"
      style={{ background: "#1E1A17", borderColor: "rgba(245,242,236,0.08)" }}
    >
      <Skeleton className="aspect-[4/5] w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/5" />
        <Skeleton className="h-3 w-2/5" />
        <Skeleton className="mt-auto h-6 w-24" />
        <Skeleton className="h-9 w-full rounded-xl" />
      </div>
      <div className="px-4 py-2.5" style={{ borderTop: "1px solid rgba(245,242,236,0.07)" }}>
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  );
}

export function KitCardSkeleton() {
  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-2xl border"
      style={{ background: "#1E1A17", borderColor: "rgba(255,61,138,0.22)" }}
    >
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="mt-auto h-8 w-32" />
        <Skeleton className="h-9 w-full rounded-xl" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8, className = "grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4" }) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
