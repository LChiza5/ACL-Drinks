import Image from "next/image";
import { Wine } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

/**
 * The one place a product photo is rendered.
 *
 * Two rules it exists to enforce:
 *  - `object-contain`, never `object-cover`. A bottle cropped to a square is a
 *    bottle with its neck and label sliced off; contain keeps the whole product
 *    visible whatever the source photo's aspect ratio is.
 *  - when there is no verified photo of the actual product we do NOT borrow a
 *    lookalike. The fallback below states the brand and the presentation in
 *    type on the ACL surface, so the card is honest about what it knows.
 */
type Props = {
  src?: string | null;
  name: string;
  brand?: string | null;
  volume?: string | null;
  /** Passed straight to next/image; each caller knows its own grid. */
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function ProductImage({ src, name, brand, volume, sizes, priority = false, className = "" }: Props) {
  if (!src) {
    return (
      <div
        className={cn("absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center", className)}
        role="img"
        aria-label={`${name}: foto del producto pendiente`}
      >
        <Wine size={36} weight="duotone" color="#4A4038" aria-hidden="true" />
        {brand && (
          <p className="text-sm font-display font-semibold leading-tight" style={{ color: "#8A8377" }}>
            {brand}
          </p>
        )}
        {volume && (
          <p className="text-[11px] uppercase tracking-[0.18em]" style={{ color: "#5C554B" }}>
            {volume}
          </p>
        )}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={buildAlt({ name, brand, volume })}
      fill
      sizes={sizes}
      priority={priority}
      className={cn("object-contain", className)}
    />
  );
}

/**
 * Alt text describes what the customer is buying, using only fields the record
 * actually has — no invented copy. "Botella de Absolut Vodka Original, 750ml".
 */
export function buildAlt({ name, brand, volume }: { name: string; brand?: string | null; volume?: string | null }) {
  const parts = [name];
  if (brand && !name.toLowerCase().includes(brand.toLowerCase())) parts.push(brand);
  if (volume) parts.push(volume);
  return parts.join(", ");
}
