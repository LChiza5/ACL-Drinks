import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { ProductForm } from "@/components/dashboard/ProductForm";
import type { Product } from "@/types";

export const metadata: Metadata = { title: "Editar Producto - Dashboard" };

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true, inventory: true },
  });
  if (!product) notFound();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-black text-white">Editar Producto</h1>
      <ProductForm product={product as unknown as Product} />
    </div>
  );
}
