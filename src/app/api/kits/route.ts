import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import slugify from "slugify";

export async function GET() {
  try {
    const kits = await prisma.kit.findMany({
      include: { kitProducts: { include: { product: { select: { id: true, name: true, images: true, price: true } } } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: kits });
  } catch {
    return NextResponse.json({ success: false, error: "Error al obtener kits" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "MANAGER")) {
      return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 });
    }
    const { products: kitProducts, ...body } = await req.json();
    const slug = slugify(body.name, { lower: true, strict: true });
    const kit = await prisma.kit.create({
      data: {
        ...body,
        slug,
        kitProducts: kitProducts?.length
          ? { create: kitProducts.map((p: { productId: string; quantity: number }) => ({ productId: p.productId, quantity: p.quantity })) }
          : undefined,
      },
      include: { kitProducts: { include: { product: true } } },
    });
    return NextResponse.json({ success: true, data: kit }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Error al crear kit" }, { status: 500 });
  }
}
