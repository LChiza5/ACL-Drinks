import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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
    const updates: Record<string, string> = await req.json();
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
