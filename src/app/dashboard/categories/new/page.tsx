import type { Metadata } from "next";
import { CategoryForm } from "@/components/dashboard/CategoryForm";

export const metadata: Metadata = { title: "Nueva Categoría - Dashboard" };

export default function NewCategoryPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-black text-white">Nueva Categoría</h1>
      <CategoryForm />
    </div>
  );
}
