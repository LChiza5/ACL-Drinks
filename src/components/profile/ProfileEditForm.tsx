"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface FormData { name: string; phone: string; }

export function ProfileEditForm({ defaultName, defaultPhone }: { defaultName: string; defaultPhone?: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormData>({
    defaultValues: { name: defaultName, phone: defaultPhone ?? "" },
  });

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/users/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.success) {
      toast.success("Perfil actualizado");
      setOpen(false);
      router.refresh();
    } else {
      toast.error(result.error ?? "Error al actualizar");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Editar perfil</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <div className="space-y-2"><Label>Nombre</Label><Input {...register("name")} /></div>
          <div className="space-y-2"><Label>Teléfono</Label><Input {...register("phone")} /></div>
          <Button type="submit" className="w-full btn-neon" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar cambios"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
