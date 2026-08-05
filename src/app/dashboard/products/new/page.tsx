import type { Metadata } from "next";
import { ProductForm } from "@/components/dashboard/ProductForm";

export const metadata: Metadata = { title: "Nuevo Producto - Dashboard" };

export default function NewProductPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-black text-white">Nuevo Producto</h1>
      <ProductForm />
    </div>
  );
}
