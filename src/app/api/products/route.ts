import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { productSchema } from "@/validations/product";
import { slugify } from "@/lib/utils";
import type { ApiResponse, PaginatedResponse, Product } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const categoryId = searchParams.get("categoryId") || undefined;
    const search = searchParams.get("search") || undefined;
    const isFeatured = searchParams.get("isFeatured") === "true" ? true : undefined;
    const isNew = searchParams.get("isNew") === "true" ? true : undefined;
    const isOnSale = searchParams.get("isOnSale") === "true" ? true : undefined;
    const sortBy = searchParams.get("sortBy") || "newest";
    const minPrice = searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")!) : undefined;
    const maxPrice = searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")!) : undefined;

    const where = {
      isActive: true,
      ...(categoryId && { categoryId }),
      ...(isFeatured !== undefined && { isFeatured }),
      ...(isNew !== undefined && { isNew }),
      ...(isOnSale !== undefined && { isOnSale }),
      ...(search && { OR: [{ name: { contains: search, mode: "insensitive" as const } }, { description: { contains: search, mode: "insensitive" as const } }] }),
      ...(minPrice !== undefined || maxPrice !== undefined ? { price: { ...(minPrice !== undefined && { gte: minPrice }), ...(maxPrice !== undefined && { lte: maxPrice }) } } : {}),
    };

    const orderBy =
      sortBy === "price_asc" ? { price: "asc" as const } :
      sortBy === "price_desc" ? { price: "desc" as const } :
      sortBy === "name_asc" ? { name: "asc" as const } :
      { createdAt: "desc" as const };

    const [total, products] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({ where, include: { category: true, inventory: true }, orderBy, skip: (page - 1) * limit, take: limit }),
    ]);

    return NextResponse.json<ApiResponse<PaginatedResponse<Product>>>({
      success: true,
      data: { data: products as unknown as Product[], total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch {
    return NextResponse.json<ApiResponse>({ success: false, error: "Error al obtener productos" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "MANAGER")) {
      return NextResponse.json<ApiResponse>({ success: false, error: "No autorizado" }, { status: 401 });
    }
    const body = await req.json();
    const validated = productSchema.parse(body);
    const slug = validated.slug || slugify(validated.name);
    const product = await prisma.product.create({
      data: { ...validated, slug, inventory: { create: { stock: validated.stock || 0 } } },
      include: { category: true, inventory: true },
    });
    return NextResponse.json<ApiResponse<Product>>({ success: true, data: product as unknown as Product }, { status: 201 });
  } catch {
    return NextResponse.json<ApiResponse>({ success: false, error: "Error al crear producto" }, { status: 500 });
  }
}
