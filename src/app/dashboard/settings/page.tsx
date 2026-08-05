import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getSettings } from "@/lib/settings";
import { SINPE_PHONE, SINPE_NAME, WHATSAPP_NUMBER, DELIVERY_ZONE, DELIVERY_FEE_NATIONAL, FREE_DELIVERY_THRESHOLD } from "@/constants";
import { Settings } from "lucide-react";
import { SettingsForm } from "@/components/dashboard/SettingsForm";

export const metadata: Metadata = { title: "Configuracion - Dashboard" };
export const dynamic = "force-dynamic";

export default async function DashboardSettingsPage() {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "ADMIN") redirect("/dashboard");

  const defaults = {
    SINPE_PHONE,
    SINPE_NAME,
    WHATSAPP_NUMBER,
    DELIVERY_ZONE,
    DELIVERY_FEE_NATIONAL: String(DELIVERY_FEE_NATIONAL),
    FREE_DELIVERY_THRESHOLD: String(FREE_DELIVERY_THRESHOLD),
  };

  const current = await getSettings(defaults);

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2"><Settings className="h-6 w-6 text-neon-blue" />Configuracion</h1>
        <p className="text-muted-foreground text-sm mt-1">Ajustes del negocio — solo admins</p>
      </div>
      <SettingsForm current={current} />
    </div>
  );
}
