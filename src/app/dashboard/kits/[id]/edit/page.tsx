export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { KitForm } from "@/components/dashboard/KitForm";

export const metadata: Metadata = { title: "Editar Kit - Dashboard" };

export default async function EditKitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const kit = await prisma.kit.findUnique({
    where: { id },
    include: { kitProducts: { include: { product: { select: { id: true, name: true, images: true, price: true } } } } },
  });
  if (!kit) notFound();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Editar Kit</h1>
        <p className="text-muted-foreground text-sm mt-1">{kit.name}</p>
      </div>
      <KitForm kit={kit} />
    </div>
  );
}
