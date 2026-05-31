import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { categorySchema } from "@/validations/product";
import { slugify } from "@/lib/utils";
import type { ApiResponse, Category } from "@/types";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      include: { _count: { select: { products: true } } },
    });
    return NextResponse.json<ApiResponse<Category[]>>({ success: true, data: categories as unknown as Category[] });
  } catch {
    return NextResponse.json<ApiResponse>({ success: false, error: "Error al obtener categorías" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "MANAGER")) {
      return NextResponse.json<ApiResponse>({ success: false, error: "No autorizado" }, { status: 401 });
    }
    const body = await req.json();
    const validated = categorySchema.parse(body);
    const category = await prisma.category.create({
      data: { ...validated, slug: validated.slug || slugify(validated.name) },
    });
    return NextResponse.json<ApiResponse<Category>>({ success: true, data: category as unknown as Category }, { status: 201 });
  } catch {
    return NextResponse.json<ApiResponse>({ success: false, error: "Error al crear categoría" }, { status: 500 });
  }
}
