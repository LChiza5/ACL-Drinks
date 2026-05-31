import { CategoryCard } from "./CategoryCard";
import type { Category } from "@/types";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  if (!categories.length) return null;
  return (
    <section className="section-padding">
      <div className="container-max">
        <div className="text-center space-y-3 mb-10">
          <span className="text-sm font-semibold text-neon-purple uppercase tracking-widest">Navega por</span>
          <h2 className="text-4xl font-black text-white">Nuestras <span className="gradient-text">Categorías</span> 🏷️</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => <CategoryCard key={cat.id} category={cat} index={i} />)}
        </div>
      </div>
    </section>
  );
}
