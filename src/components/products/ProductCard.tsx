import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { formatPrice, getDiscountPercentage } from "@/lib/utils";
import { ACL_BRAND } from "@/constants";
import { ProductImage } from "./ProductImage";
import { AddToCartControl } from "./AddToCartControl";
import type { Product } from "@/types";

/**
 * The single product card for the whole store.
 *
 * There is deliberately no WhiskyCard / BeerCard / RumCard: a ron, a whisky and
 * a six pack all render through here and differ only in their data. The frame,
 * the type scale, the price hierarchy, the CTA and the ACL footer stay put so a
 * grid reads as one catalogue.
 *
 * The file carries no "use client" on purpose. Rendered from a server page it
 * ships nothing but markup plus the small AddToCartControl island; rendered
 * from a client page (the home catalogue, which filters in place) it simply
 * joins that bundle. Either way there is no per-card canvas, no rAF loop and
 * no mousemove handler — the hover treatment is pure CSS.
 */
export function ProductCard({
  product,
  index = 0,
  priority = false,
  sizes = "(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw",
}: {
  product: Product;
  index?: number;
  /** Set on the first row of an above-the-fold grid so the LCP image is eager. */
  priority?: boolean;
  sizes?: string;
}) {
  const discount = getDiscountPercentage(product.price, product.comparePrice ?? 0);
  const available = product.inventory ? product.inventory.stock - product.inventory.reserved : null;
  const isOutOfStock = available !== null && available <= 0;
  const isLowStock = available !== null && available > 0 && available <= 5;

  // Presentation line: only fields the record actually has, never filler.
  const spec = [product.volume, product.alcoholContent ? `${product.alcoholContent}% alc.` : null]
    .filter(Boolean)
    .join(" · ");

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-[border-color,box-shadow,transform] duration-300 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-3 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-[0_16px_38px_rgba(0,0,0,0.5)] focus-within:border-emerald-500/60"
      style={{
        background: "#1E1A17",
        borderColor: "rgba(245,242,236,0.08)",
        animationDuration: "420ms",
        animationDelay: `${Math.min(index, 7) * 45}ms`,
      }}
    >
      {/* Image plate. Fixed 4/5 box + object-contain: the frame never moves and
          the bottle is never cropped, whatever the source photo looks like. */}
      <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden" style={{ background: "#191512" }}>
        <div className="absolute inset-0 p-4 transition-transform duration-500 group-hover:scale-[1.04]">
          <div className="relative h-full w-full">
            <ProductImage
              src={product.images[0]}
              name={product.name}
              brand={product.brand}
              volume={product.volume}
              sizes={sizes}
              priority={priority}
            />
          </div>
        </div>

        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.isNew && <CardBadge tone="gold">Nuevo</CardBadge>}
          {discount > 0 && <CardBadge tone="hibiscus">-{discount}%</CardBadge>}
          {isOutOfStock && <CardBadge tone="muted">Agotado</CardBadge>}
          {isLowStock && <CardBadge tone="gold">Últimas {available}</CardBadge>}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        {product.category && (
          <span className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: "#F2A900" }}>
            {product.category.name}
          </span>
        )}

        {/* Stretched link: the whole card is clickable, but only one link is in
            the tab order and the CTA below stays independently reachable. */}
        <h3 className="text-sm font-semibold leading-snug">
          <Link
            href={`/products/${product.slug}`}
            className="line-clamp-2 rounded-sm outline-none transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-500"
            style={{ color: "#F5F2EC" }}
          >
            {product.name}
          </Link>
        </h3>

        {(product.brand || spec) && (
          <p className="text-xs leading-snug" style={{ color: "#B8B1A7" }}>
            {product.brand}
            {product.brand && spec ? " · " : ""}
            {spec}
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 gap-y-0.5 pt-2">
          <span className="text-lg font-black tracking-tight" style={{ color: "#4CD671" }}>
            {formatPrice(product.price)}
          </span>
          {product.comparePrice ? (
            <span className="text-xs line-through" style={{ color: "#8A8377" }}>
              {formatPrice(product.comparePrice)}
            </span>
          ) : null}
        </div>

        <div className="relative z-10 pt-1">
          <AddToCartControl
            item={{
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.images[0] || "",
              type: "product",
              sku: product.sku || undefined,
              slug: product.slug,
            }}
            disabled={isOutOfStock}
            label="Agregar"
          />
        </div>
      </div>

      <CardBrandFooter />
    </article>
  );
}

function CardBadge({ children, tone }: { children: React.ReactNode; tone: "gold" | "hibiscus" | "muted" }) {
  const tones = {
    gold: { background: "#F2A900", color: "#241a05" },
    hibiscus: { background: "#FF3D8A", color: "#ffffff" },
    muted: { background: "rgba(18,17,15,0.86)", color: "#E4DFD6" },
  } as const;
  return (
    <span
      className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
      style={tones[tone]}
    >
      {children}
    </span>
  );
}

/**
 * Micro-branding, not a business card. The phone number and the full handle
 * live in the footer and the floating buttons; repeating them in every tile of
 * a 4-across grid would be noise, so the card keeps the mark plus two icon
 * links and nothing else.
 */
function CardBrandFooter() {
  return (
    <div
      className="relative z-10 flex items-center justify-between gap-2 px-4 py-2.5"
      style={{ borderTop: "1px solid rgba(245,242,236,0.07)" }}
    >
      <span className="flex items-center gap-1.5">
        <Image src={ACL_BRAND.logo} alt="" width={40} height={40} className="h-4 w-4 object-contain opacity-80" aria-hidden="true" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#8A8377" }}>
          {ACL_BRAND.name}
        </span>
      </span>
      <span className="flex items-center gap-1">
        <a
          href={ACL_BRAND.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`ACL Drinks en Instagram, ${ACL_BRAND.instagramHandle}`}
          className="grid h-7 w-7 place-items-center rounded-lg transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          style={{ color: "#8A8377" }}
        >
          <FaInstagram className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        <a
          href={ACL_BRAND.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Escribir a ACL Drinks por WhatsApp al ${ACL_BRAND.phone}`}
          className="grid h-7 w-7 place-items-center rounded-lg transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          style={{ color: "#8A8377" }}
        >
          <FaWhatsapp className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </span>
    </div>
  );
}
