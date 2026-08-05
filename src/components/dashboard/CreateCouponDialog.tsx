"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormData {
  code: string;
  type: "PERCENTAGE" | "FIXED_AMOUNT" | "FREE_SHIPPING";
  value: number;
  description?: string;
  minOrder?: number;
  maxUses?: number;
  expiresAt?: string;
}

export function CreateCouponDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, setValue, reset, formState: { isSubmitting } } = useForm<FormData>({
    defaultValues: { type: "PERCENTAGE" },
  });

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/coupons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.success) {
      toast.success("Cupón creado");
      setOpen(false);
      reset();
      router.refresh();
    } else {
      toast.error(result.error ?? "Error al crear cupón");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="btn-neon gap-2"><Plus className="h-4 w-4" />Nuevo Cupón</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Crear Cupón</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Código *</Label>
              <Input {...register("code")} placeholder="VERANO20" className="uppercase" />
            </div>
            <div className="space-y-2">
              <Label>Tipo *</Label>
              <Select defaultValue="PERCENTAGE" onValueChange={v => setValue("type", v as FormData["type"])}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="PERCENTAGE">Porcentaje (%)</SelectItem>
                  <SelectItem value="FIXED_AMOUNT">Monto fijo (₡)</SelectItem>
                  <SelectItem value="FREE_SHIPPING">Envío gratis</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Valor *</Label>
              <Input type="number" {...register("value", { valueAsNumber: true })} placeholder="20" />
            </div>
            <div className="space-y-2">
              <Label>Mín. de compra (₡)</Label>
              <Input type="number" {...register("minOrder", { setValueAs: v => v === "" ? null : Number(v) })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Máx. usos</Label>
              <Input type="number" {...register("maxUses", { setValueAs: v => v === "" ? null : Number(v) })} />
            </div>
            <div className="space-y-2">
              <Label>Expira</Label>
              <Input type="date" {...register("expiresAt")} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Descripción</Label>
            <Input {...register("description")} />
          </div>
          <Button type="submit" className="w-full btn-neon" disabled={isSubmitting}>
            {isSubmitting ? "Creando..." : "Crear cupón"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
