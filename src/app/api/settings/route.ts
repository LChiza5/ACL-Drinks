import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const settingsSchema = z
  .object({
    SINPE_PHONE: z.string().max(50).optional(),
    SINPE_NAME: z.string().max(100).optional(),
    WHATSAPP_NUMBER: z.string().max(50).optional(),
    DELIVERY_ZONE: z.string().max(100).optional(),
    DELIVERY_FEE_NATIONAL: z.string().max(20).optional(),
    FREE_DELIVERY_THRESHOLD: z.string().max(20).optional(),
  })
  .strict();

export async function GET() {
  try {
    const settings = await prisma.setting.findMany();
    return NextResponse.json({ success: true, data: Object.fromEntries(settings.map(s => [s.key, s.value])) });
  } catch {
    return NextResponse.json({ success: false, error: "Error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 });
    }
    const body = await req.json();
    const updates = settingsSchema.parse(body);
    await prisma.$transaction(
      Object.entries(updates).map(([key, value]) =>
        prisma.setting.upsert({ where: { key }, update: { value }, create: { key, value } })
      )
    );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Error al guardar" }, { status: 500 });
  }
}
