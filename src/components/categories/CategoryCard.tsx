import Link from "next/link";
import Image from "next/image";
import { Wine } from "@phosphor-icons/react/dist/ssr";
import type { Category } from "@/types";

/**
 * Category tile. Two changes from the previous version:
 *  - the 4xl emoji that sat on top of the photo is gone; the category is named
 *    in type, the way a catalogue names a section.
 *  - a bottle photo is letterboxed (`contain`) instead of cropped, while an
 *    ambient shot still fills the frame. Same tile, right treatment per source.
 *
 * No framer-motion and no client directive: the hover is CSS, so a page of
 * category tiles ships no JavaScript at all.
 */
export function CategoryCard({ category, index = 0 }: { category: Category; index?: number }) {
  const isProductShot = category.image?.startsWith("/catalog/products/");

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border transition-[border-color,transform,box-shadow] duration-300 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-[0_14px_32px_rgba(0,0,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      style={{
        background: "#1E1A17",
        borderColor: "rgba(245,242,236,0.08)",
        animationDuration: "400ms",
        animationDelay: `${Math.min(index, 7) * 45}ms`,
      }}
    >
      <div
        className={`relative aspect-[4/3] w-full overflow-hidden ${isProductShot ? "p-3" : ""}`}
        style={{ background: "#191512" }}
      >
        {category.image ? (
          <Image
            src={category.image}
            alt=""
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
            className={`transition-transform duration-500 group-hover:scale-105 ${isProductShot ? "object-contain p-3" : "object-cover"}`}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <Wine size={36} weight="duotone" color="#4A4038" aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-center gap-0.5 px-4 py-3">
        <h3 className="font-display text-base font-semibold leading-tight" style={{ color: "#F5F2EC" }}>
          {category.name}
        </h3>
        {category._count && (
          <p className="text-xs" style={{ color: "#8A8377" }}>
            {category._count.products} {category._count.products === 1 ? "producto" : "productos"}
          </p>
        )}
      </div>
    </Link>
  );
}
