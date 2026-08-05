import type { Metadata } from "next";
import { KitForm } from "@/components/dashboard/KitForm";

export const metadata: Metadata = { title: "Nuevo Kit - Dashboard" };

export default function NewKitPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Nuevo Combo Fiestero</h1>
        <p className="text-muted-foreground text-sm mt-1">Crea un kit con productos y precio especial</p>
      </div>
      <KitForm />
    </div>
  );
}
