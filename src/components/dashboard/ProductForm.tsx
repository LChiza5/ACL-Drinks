"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Image from "next/image";
import { X, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { productSchema, type ProductInput } from "@/validations/product";
import type { Category, Product } from "@/types";

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [uploading, setUploading] = useState(false);
  const isEdit = !!product;

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: isEdit ? {
      name: product.name,
      description: product.description ?? "",
      price: product.price,
      comparePrice: product.comparePrice ?? undefined,
      images: product.images,
      categoryId: product.categoryId,
      brand: product.brand ?? "",
      alcoholContent: product.alcoholContent ?? undefined,
      volume: product.volume ?? "",
      country: product.country ?? "",
      sku: product.sku ?? "",
      isActive: product.isActive,
      isFeatured: product.isFeatured,
      isNew: product.isNew,
      isOnSale: product.isOnSale,
      tags: product.tags,
      stock: 0,
    } : {
      images: [], tags: [], isActive: true, isFeatured: false, isNew: false, isOnSale: false, stock: 0,
    },
  });

  const images = watch("images") ?? [];

  useEffect(() => {
    fetch("/api/categories").then(r => r.json()).then(d => setCategories(d.data ?? []));
  }, []);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) {
        setValue("images", [...images, data.data.url]);
      } else {
        toast.error("Error al subir imagen");
      }
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: ProductInput) => {
    const res = await fetch(isEdit ? `/api/products/${product.id}` : "/api/products", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.success) {
      toast.success(isEdit ? "Producto actualizado" : "Producto creado");
      router.push("/dashboard/products");
      router.refresh();
    } else {
      toast.error(result.error ?? "Error al guardar");
    }
  };

  const flags = [
    ["isActive", "Activo"],
    ["isFeatured", "Destacado"],
    ["isNew", "Nuevo"],
    ["isOnSale", "En rebaja"],
  ] as const;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      {/* Info básica */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h2 className="font-bold text-white">Información básica</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2 sm:col-span-2">
            <Label>Nombre *</Label>
            <Input {...register("name")} />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Precio (₡) *</Label>
            <Input type="number" step="1" {...register("price", { valueAsNumber: true })} />
            {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Precio comparado (₡)</Label>
            <Input type="number" step="1" {...register("comparePrice", { setValueAs: v => v === "" ? null : Number(v) })} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Descripción</Label>
            <Textarea {...register("description")} rows={3} />
          </div>
          <div className="space-y-2">
            <Label>Categoría *</Label>
            <Select defaultValue={product?.categoryId} onValueChange={v => setValue("categoryId", v)}>
              <SelectTrigger><SelectValue placeholder="Selecciona..." /></SelectTrigger>
              <SelectContent>
                {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.emoji} {c.name}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.categoryId && <p className="text-xs text-destructive">{errors.categoryId.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>SKU</Label>
            <Input {...register("sku")} />
          </div>
        </div>
      </div>

      {/* Detalles */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h2 className="font-bold text-white">Detalles del producto</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Marca</Label>
            <Input {...register("brand")} />
          </div>
          <div className="space-y-2">
            <Label>País de origen</Label>
            <Input {...register("country")} />
          </div>
          <div className="space-y-2">
            <Label>Graduación alcohólica (%)</Label>
            <Input type="number" step="0.1" {...register("alcoholContent", { setValueAs: v => v === "" ? null : Number(v) })} />
          </div>
          <div className="space-y-2">
            <Label>Volumen (ej: 750ml)</Label>
            <Input {...register("volume")} />
          </div>
          {!isEdit && (
            <div className="space-y-2">
              <Label>Stock inicial</Label>
              <Input type="number" min="0" {...register("stock", { valueAsNumber: true })} />
            </div>
          )}
          <div className="space-y-2 sm:col-span-2">
            <Label>Tags (separados por coma)</Label>
            <Input
              defaultValue={product?.tags.join(", ")}
              onChange={e => setValue("tags", e.target.value.split(",").map(t => t.trim()).filter(Boolean))}
            />
          </div>
        </div>
      </div>

      {/* Imágenes */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h2 className="font-bold text-white">Imágenes</h2>
        <div className="flex flex-wrap gap-3">
          {images.map((url, i) => (
            <div key={i} className="relative h-24 w-24 rounded-lg overflow-hidden bg-brand-mid">
              <Image src={url} alt="" fill className="object-cover" />
              <button type="button"
                onClick={() => setValue("images", images.filter((_, j) => j !== i))}
                className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5 hover:bg-destructive transition-colors">
                <X className="h-3 w-3 text-white" />
              </button>
            </div>
          ))}
          <label className={`h-24 w-24 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-neon-purple/50 transition-colors ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
            {uploading
              ? <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              : <><Upload className="h-6 w-6 text-muted-foreground" /><span className="text-xs text-muted-foreground mt-1">Subir</span></>}
            <input type="file" accept="image/*" className="hidden"
              onChange={e => e.target.files?.[0] && handleUpload(e.target.files[0])} />
          </label>
        </div>
        {errors.images && <p className="text-xs text-destructive">{errors.images.message as string}</p>}
      </div>

      {/* Estado */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h2 className="font-bold text-white">Estado</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {flags.map(([field, label]) => (
            <div key={field} className="flex items-center justify-between">
              <Label>{label}</Label>
              <Switch
                defaultChecked={product ? product[field] : field === "isActive"}
                onCheckedChange={v => setValue(field, v)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" className="btn-neon" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : isEdit ? "Guardar cambios" : "Crear producto"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()}>Cancelar</Button>
      </div>
    </form>
  );
}
