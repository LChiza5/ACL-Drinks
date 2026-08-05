import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function requireStaff() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user.role !== "ADMIN" && session.user.role !== "MANAGER")) return null;
  return session;
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const kit = await prisma.kit.findUnique({
    where: { id },
    include: { kitProducts: { include: { product: { select: { id: true, name: true, images: true, price: true } } } } },
  });
  if (!kit) return NextResponse.json({ success: false, error: "No encontrado" }, { status: 404 });
  return NextResponse.json({ success: true, data: kit });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!await requireStaff()) return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 });
    const { id } = await params;
    const { products: kitProducts, ...body } = await req.json();

    const kit = await prisma.$transaction(async (tx) => {
      if (kitProducts !== undefined) {
        await tx.kitProduct.deleteMany({ where: { kitId: id } });
        if (kitProducts.length > 0) {
          await tx.kitProduct.createMany({
            data: kitProducts.map((p: { productId: string; quantity: number }) => ({ kitId: id, productId: p.productId, quantity: p.quantity })),
          });
        }
      }
      return tx.kit.update({
        where: { id },
        data: body,
        include: { kitProducts: { include: { product: true } } },
      });
    });
    return NextResponse.json({ success: true, data: kit });
  } catch {
    return NextResponse.json({ success: false, error: "Error al actualizar kit" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!await requireStaff()) return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 });
    const { id } = await params;
    await prisma.kit.update({ where: { id }, data: { isActive: false } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Error al eliminar kit" }, { status: 500 });
  }
}
