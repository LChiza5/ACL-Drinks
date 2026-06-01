import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { ApiResponse, Product } from "@/types";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const product = await prisma.product.findFirst({
      where: { OR: [{ id }, { slug: id }], isActive: true },
      include: { category: true, inventory: true },
    });
    if (!product) return NextResponse.json<ApiResponse>({ success: false, error: "Producto no encontrado" }, { status: 404 });
    return NextResponse.json<ApiResponse<Product>>({ success: true, data: product as unknown as Product });
  } catch {
    return NextResponse.json<ApiResponse>({ success: false, error: "Error al obtener producto" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "MANAGER")) {
      return NextResponse.json<ApiResponse>({ success: false, error: "No autorizado" }, { status: 401 });
    }
    const body = await req.json();
    const product = await prisma.product.update({ where: { id }, data: body, include: { category: true, inventory: true } });
    return NextResponse.json<ApiResponse<Product>>({ success: true, data: product as unknown as Product });
  } catch {
    return NextResponse.json<ApiResponse>({ success: false, error: "Error al actualizar producto" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json<ApiResponse>({ success: false, error: "No autorizado" }, { status: 401 });
    }
    await prisma.product.update({ where: { id }, data: { isActive: false } });
    return NextResponse.json<ApiResponse>({ success: true, message: "Producto eliminado" });
  } catch {
    return NextResponse.json<ApiResponse>({ success: false, error: "Error al eliminar producto" }, { status: 500 });
  }
}
