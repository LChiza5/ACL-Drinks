import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { ApiResponse, Category } from "@/types";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "MANAGER")) {
      return NextResponse.json<ApiResponse>({ success: false, error: "No autorizado" }, { status: 401 });
    }
    const body = await req.json();
    const category = await prisma.category.update({ where: { id }, data: body });
    return NextResponse.json<ApiResponse<Category>>({ success: true, data: category as unknown as Category });
  } catch {
    return NextResponse.json<ApiResponse>({ success: false, error: "Error al actualizar categoría" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json<ApiResponse>({ success: false, error: "No autorizado" }, { status: 401 });
    }
    await prisma.category.update({ where: { id }, data: { isActive: false } });
    return NextResponse.json<ApiResponse>({ success: true, message: "Categoría desactivada" });
  } catch {
    return NextResponse.json<ApiResponse>({ success: false, error: "Error al eliminar categoría" }, { status: 500 });
  }
}
