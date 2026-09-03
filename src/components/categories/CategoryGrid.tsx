import { CategoryCard } from "./CategoryCard";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Category } from "@/types";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  if (!categories.length) return null;
  return (
    <section className="section-padding">
      <div className="container-max">
        <SectionHeading
          align="center"
          eyebrow="Navega por"
          eyebrowColor="#4CD671"
          title="Nuestras"
          accent="Categorías"
          accentColor="#4CD671"
          className="mb-10"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => <CategoryCard key={cat.id} category={cat} index={i} />)}
        </div>
      </div>
    </section>
  );
}
