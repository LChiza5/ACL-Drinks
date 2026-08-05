"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";

export function RestockInput({ productId, current }: { productId: string; current: number }) {
  const [value, setValue] = useState(String(current));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = async () => {
    setSaving(true);
    const res = await fetch(`/api/inventory/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock: Number(value) }),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      toast.success("Stock actualizado");
      setTimeout(() => setSaved(false), 2000);
    } else {
      toast.error("Error al actualizar");
    }
  };

  return (
    <div className="flex items-center gap-1.5 justify-center">
      <Input
        type="number"
        min="0"
        value={value}
        onChange={(e) => { setValue(e.target.value); setSaved(false); }}
        className="h-7 w-20 text-center text-sm"
      />
      <Button
        size="icon"
        variant="ghost"
        className={`h-7 w-7 ${saved ? "text-green-400" : ""}`}
        onClick={save}
        disabled={saving || value === String(current)}
      >
        {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
      </Button>
    </div>
  );
}
