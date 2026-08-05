"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FIELDS = [
  { key: "SINPE_PHONE", label: "Telefono SINPE", placeholder: "+506 8888-8888", hint: "Numero que recibe los pagos por SINPE Movil" },
  { key: "SINPE_NAME", label: "Nombre SINPE", placeholder: "ACL Drinks CR", hint: "Nombre que aparece en la confirmacion de SINPE" },
  { key: "WHATSAPP_NUMBER", label: "WhatsApp", placeholder: "+506 8888-8888" },
  { key: "DELIVERY_ZONE", label: "Zona de entrega local", placeholder: "Tilaran, Guanacaste" },
  { key: "DELIVERY_FEE_NATIONAL", label: "Costo envio nacional (₡)", placeholder: "3500" },
  { key: "FREE_DELIVERY_THRESHOLD", label: "Minimo para envio gratis (₡)", placeholder: "30000" },
] as const;

export function SettingsForm({ current }: { current: Record<string, string> }) {
  const [values, setValues] = useState<Record<string, string>>(current);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setSaving(false);
    if (res.ok) toast.success("Configuracion guardada");
    else toast.error("Error al guardar");
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6 space-y-5">
        {FIELDS.map(({ key, label, placeholder, hint }) => (
          <div key={key} className="space-y-1.5">
            <Label>{label}</Label>
            <Input
              value={values[key] ?? ""}
              onChange={e => setValues(prev => ({ ...prev, [key]: e.target.value }))}
              placeholder={placeholder}
            />
            {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
          </div>
        ))}
      </div>
      <Button className="btn-neon" onClick={save} disabled={saving}>
        {saving ? "Guardando..." : "Guardar cambios"}
      </Button>
    </div>
  );
}
