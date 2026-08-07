"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { categorySchema, type CategoryInput } from "@/validations/product";
import type { Category } from "@/types";

export function CategoryForm({ category }: { category?: Category }) {
  const router = useRouter();
  const isEdit = !!category;

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: isEdit ? {
      name: category.name,
      description: category.description ?? "",
      emoji: category.emoji ?? "",
      color: category.color ?? "",
      sortOrder: category.sortOrder,
      isActive: category.isActive,
    } : { sortOrder: 0, isActive: true },
  });

  const onSubmit = async (data: CategoryInput) => {
    const res = await fetch(isEdit ? `/api/categories/${category.id}` : "/api/categories", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.success) {
      toast.success(isEdit ? "Categoría actualizada" : "Categoría creada");
      router.push("/dashboard/categories");
      router.refresh();
    } else {
      toast.error(result.error ?? "Error al guardar");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg">
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="space-y-2">
          <Label>Nombre *</Label>
          <Input {...register("name")} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Descripción</Label>
          <Input {...register("description")} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Emoji</Label>
            <Input {...register("emoji")} maxLength={4} placeholder="🍷" />
          </div>
          <div className="space-y-2">
            <Label>Color (hex)</Label>
            <Input {...register("color")} placeholder="#C9984A" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Orden de aparición</Label>
          <Input type="number" min="0" {...register("sortOrder", { valueAsNumber: true })} />
        </div>
        <div className="flex items-center justify-between">
          <Label>Activa</Label>
          <Switch defaultChecked={category?.isActive ?? true} onCheckedChange={v => setValue("isActive", v)} />
        </div>
      </div>
      <div className="flex gap-3">
        <Button type="submit" className="btn-neon" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : isEdit ? "Guardar cambios" : "Crear categoría"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()}>Cancelar</Button>
      </div>
    </form>
  );
}
