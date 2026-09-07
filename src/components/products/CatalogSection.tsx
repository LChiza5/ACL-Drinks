"use client";

import { useEffect, useMemo, useState } from "react";
import { MagnifyingGlass as PackageSearch } from "@phosphor-icons/react/dist/ssr";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";

type Category = {
  id: string;
  name: string;
  slug: string;
  _count: { products: number };
};

type Props = {
  categories: Category[];
  allProducts: Product[];
};

/**
 * The home catalogue renders every active product. That is fine at 6 products
 * and a problem at 500, so the grid reveals a page at a time: the DOM stays
 * small, the filter stays instant, and nobody waits on cards they cannot see.
 */
const PAGE = 12;

export function CatalogSection({ categories, allProducts }: Props) {
  const [activeFilter, setActiveFilter] = useState("todos");
  const [visible, setVisible] = useState(PAGE);

  const filters = useMemo(() => [
    { id: "todos", label: "Todos" },
    ...categories.map((c) => ({ id: c.slug, label: c.name })),
    { id: "rebajas", label: "Rebajas" },
    { id: "combos-fiesteros", label: "Combos Fiesteros" },
  ], [categories]);

  const filtered = useMemo(() => {
    if (activeFilter === "todos") return allProducts;
    if (activeFilter === "rebajas") return allProducts.filter((p) => p.isOnSale);
    if (activeFilter === "combos-fiesteros") return [];
    return allProducts.filter((p) => p.category?.slug === activeFilter);
  }, [activeFilter, allProducts]);

  // Changing the filter starts the list over rather than keeping a stale count.
  useEffect(() => setVisible(PAGE), [activeFilter]);

  const shown = filtered.slice(0, visible);
  const remaining = filtered.length - shown.length;

  return (
    <section id="catalogo" className="section-padding">
      <div className="container-max">
        <SectionHeading
          align="center"
          eyebrow="Catálogo"
          eyebrowColor="#FFC94D"
          title="Nuestra"
          accent="Selección"
          accentColor="#4CD671"
          className="mb-10"
        />

        {/* Barra de filtros horizontal */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8" style={{ scrollbarWidth: "none" }}>
          {filters.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className="shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap"
                style={
                  isActive
                    ? {
                        background: "linear-gradient(135deg, #178A38, #22B14C)",
                        color: "#F5F2EC",
                        boxShadow: "0 4px 16px rgba(34,177,76,0.4)",
                      }
                    : {
                        background: "rgba(255, 255, 255,0.05)",
                        color: "#B8B1A7",
                        border: "1px solid rgba(242,169,0,0.2)",
                      }
                }
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {shown.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} priority={i < 4} />
            ))}
          </div>
          {remaining > 0 && (
            <div className="mt-10 text-center">
              <Button
                variant="outline"
                onClick={() => setVisible((v) => v + PAGE)}
                className="rounded-2xl px-8"
              >
                Ver {Math.min(remaining, PAGE)} productos más
              </Button>
            </div>
          )}
          </>
        ) : (
          <EmptyState
            icon={PackageSearch}
            title={activeFilter === "combos-fiesteros" ? "Los Combos Fiesteros están más abajo" : "Sin productos en esta categoría"}
            description={activeFilter === "combos-fiesteros" ? "Desplázate hacia abajo para verlos" : "Pronto agregaremos más productos"}
          />
        )}
      </div>
    </section>
  );
}
