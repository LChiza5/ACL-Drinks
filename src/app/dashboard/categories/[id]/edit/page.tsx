import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { CategoryForm } from "@/components/dashboard/CategoryForm";
import type { Category } from "@/types";

export const metadata: Metadata = { title: "Editar Categoría - Dashboard" };

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) notFound();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-black text-white">Editar Categoría</h1>
      <CategoryForm category={category as unknown as Category} />
    </div>
  );
}
