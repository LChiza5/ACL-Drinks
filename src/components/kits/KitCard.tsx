import Link from "next/link";
import { formatPrice, getDiscountPercentage } from "@/lib/utils";
import { AddToCartControl } from "@/components/products/AddToCartControl";
import { KitComposite } from "./KitComposite";
import type { Kit } from "@/types";

/**
 * Same frame, type scale and CTA as ProductCard — a combo is a product with a
 * different image strategy, not a different design language. Also client-free
 * apart from the shared add-to-cart island.
 */
export function KitCard({
  kit,
  index = 0,
  sizes = "(max-width: 768px) 92vw, (max-width: 1024px) 46vw, 31vw",
}: {
  kit: Kit;
  index?: number;
  sizes?: string;
}) {
  const discount = getDiscountPercentage(kit.price, kit.comparePrice ?? 0);
  const items = kit.kitProducts ?? [];
  const unitCount = items.reduce((n, kp) => n + kp.quantity, 0);

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-[border-color,box-shadow,transform] duration-300 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-3 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)] focus-within:border-hibiscus-500/60"
      style={{
        background: "#1E1A17",
        borderColor: "rgba(255,61,138,0.22)",
        animationDuration: "420ms",
        animationDelay: `${Math.min(index, 5) * 60}ms`,
      }}
    >
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden" style={{ background: "#191512" }}>
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
          <KitComposite kit={kit} sizes={sizes} />
        </div>

        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {discount > 0 && (
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
              style={{ background: "#FF3D8A" }}
            >
              Ahorrá {discount}%
            </span>
          )}
        </div>
        {kit.badge && (
          <span
            className="absolute right-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
            style={{ background: "#F2A900", color: "#241a05" }}
          >
            {kit.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: "#FF75AC" }}>
          Combo Fiestero{unitCount > 0 ? ` · ${unitCount} unidades` : ""}
        </span>

        <h3 className="font-display text-lg font-semibold leading-tight">
          <Link
            href={`/combos-fiesteros/${kit.slug}`}
            className="rounded-sm outline-none transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-hibiscus-400 focus-visible:ring-2 focus-visible:ring-hibiscus-500"
            style={{ color: "#F5F2EC" }}
          >
            {kit.name}
          </Link>
        </h3>

        {items.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {items.slice(0, 4).map((kp) => (
              <li
                key={kp.id}
                className="rounded-full px-2 py-0.5 text-[11px]"
                style={{ background: "rgba(34,177,76,0.1)", color: "#4CD671", border: "1px solid rgba(34,177,76,0.22)" }}
              >
                {kp.quantity}× {kp.product?.name ?? "Producto"}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 pt-2">
          <span className="text-2xl font-black tracking-tight" style={{ color: "#4CD671" }}>
            {formatPrice(kit.price)}
          </span>
          {kit.comparePrice ? (
            <span className="text-sm line-through" style={{ color: "#8A8377" }}>
              {formatPrice(kit.comparePrice)}
            </span>
          ) : null}
        </div>

        <div className="relative z-10 pt-1">
          <AddToCartControl
            item={{
              id: kit.id,
              name: kit.name,
              price: kit.price,
              image: kit.image || "",
              type: "kit",
              slug: kit.slug,
            }}
            label="Agregar combo"
          />
        </div>
      </div>
    </article>
  );
}
