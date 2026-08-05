"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";
import { X, Upload, Loader2, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface KitProductEntry { productId: string; quantity: number; name: string; image?: string; price: number }
interface ProductOption { id: string; name: string; images: string[]; price: number }
interface Kit {
  id: string; name: string; description?: string | null; price: number; comparePrice?: number | null;
  image?: string | null; badge?: string | null; isActive: boolean; isFeatured: boolean;
  kitProducts: { productId: string; quantity: number; product: ProductOption }[];
}

export function KitForm({ kit }: { kit?: Kit }) {
  const router = useRouter();
  const isEdit = !!kit;
  const [image, setImage] = useState<string>(kit?.image ?? "");
  const [uploading, setUploading] = useState(false);
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [search, setSearch] = useState("");
  const [kitProducts, setKitProducts] = useState<KitProductEntry[]>(
    kit?.kitProducts.map(kp => ({ productId: kp.productId, quantity: kp.quantity, name: kp.product.name, image: kp.product.images[0], price: kp.product.price })) ?? []
  );
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      name: kit?.name ?? "",
      description: kit?.description ?? "",
      price: kit?.price ?? 0,
      comparePrice: kit?.comparePrice ?? undefined,
      badge: kit?.badge ?? "",
      isActive: kit?.isActive ?? true,
      isFeatured: kit?.isFeatured ?? false,
    },
  });

  useEffect(() => {
    fetch("/api/products?limit=100").then(r => r.json()).then(d => setProducts(d.data?.data ?? []));
  }, []);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) setImage(data.data.url);
      else toast.error("Error al subir imagen");
    } finally {
      setUploading(false);
    }
  };

  const addProduct = (p: ProductOption) => {
    if (kitProducts.find(kp => kp.productId === p.id)) return;
    setKitProducts(prev => [...prev, { productId: p.id, quantity: 1, name: p.name, image: p.images[0], price: p.price }]);
    setSearch("");
  };

  const updateQty = (productId: string, delta: number) => {
    setKitProducts(prev => prev.map(kp => kp.productId === productId ? { ...kp, quantity: Math.max(1, kp.quantity + delta) } : kp));
  };

  const removeProduct = (productId: string) => setKitProducts(prev => prev.filter(kp => kp.productId !== productId));

  const onSubmit = async (data: Record<string, unknown>) => {
    if (!data.name) return toast.error("El nombre es obligatorio");
    if (Number(data.price) <= 0) return toast.error("El precio es obligatorio");
    setSaving(true);
    try {
      const body = { ...data, image: image || null, products: kitProducts.map(({ productId, quantity }) => ({ productId, quantity })) };
      const res = await fetch(isEdit ? `/api/kits/${kit.id}` : "/api/kits", {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      if (result.success) {
        toast.success(isEdit ? "Kit actualizado" : "Kit creado");
        router.push("/dashboard/kits");
        router.refresh();
      } else {
        toast.error(result.error ?? "Error al guardar");
      }
    } finally {
      setSaving(false);
    }
  };

  const filtered = search.length > 1
    ? products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) && !kitProducts.find(kp => kp.productId === p.id))
    : [];

  const previewTotal = kitProducts.reduce((s, kp) => s + kp.price * kp.quantity, 0);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      {/* Info basica */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h2 className="font-bold text-white">Informacion basica</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2 sm:col-span-2">
            <Label>Nombre del kit *</Label>
            <Input {...register("name")} placeholder="Combo Fiestero Premium" />
          </div>
          <div className="space-y-2">
            <Label>Precio (₡) *</Label>
            <Input type="number" step="1" {...register("price", { valueAsNumber: true })} />
          </div>
          <div className="space-y-2">
            <Label>Precio comparado (₡)</Label>
            <Input type="number" step="1" {...register("comparePrice", { setValueAs: (v: string) => v === "" ? null : Number(v) })} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Descripcion</Label>
            <Textarea {...register("description")} rows={3} />
          </div>
          <div className="space-y-2">
            <Label>Badge / etiqueta</Label>
            <Input {...register("badge")} placeholder="Mas vendido, Nuevo..." />
          </div>
        </div>
      </div>

      {/* Imagen */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h2 className="font-bold text-white">Imagen del kit</h2>
        <div className="flex items-center gap-4">
          {image ? (
            <div className="relative h-28 w-28 rounded-lg overflow-hidden bg-brand-mid shrink-0">
              <Image src={image} alt="" fill className="object-cover" />
              <button type="button" onClick={() => setImage("")}
                className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5 hover:bg-destructive transition-colors">
                <X className="h-3 w-3 text-white" />
              </button>
            </div>
          ) : (
            <label className={`h-28 w-28 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-neon-purple/50 transition-colors ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
              {uploading ? <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /> : <><Upload className="h-6 w-6 text-muted-foreground" /><span className="text-xs text-muted-foreground mt-1">Subir</span></>}
              <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleUpload(e.target.files[0])} />
            </label>
          )}
          <p className="text-xs text-muted-foreground">Sube una imagen representativa del combo</p>
        </div>
      </div>

      {/* Productos */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h2 className="font-bold text-white">Productos incluidos</h2>
        <div className="relative">
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar producto para agregar..."
            className="w-full"
          />
          {filtered.length > 0 && (
            <div className="absolute z-10 top-full mt-1 w-full bg-brand-dark border border-border rounded-lg shadow-xl overflow-hidden">
              {filtered.slice(0, 8).map(p => (
                <button key={p.id} type="button" onClick={() => addProduct(p)}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 transition-colors text-left">
                  <div className="h-8 w-8 rounded bg-brand-mid shrink-0 overflow-hidden flex items-center justify-center">
                    {p.images[0] ? <Image src={p.images[0]} alt="" width={32} height={32} className="object-cover" /> : <span className="text-sm">🍾</span>}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-white truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">₡{p.price.toLocaleString()}</p>
                  </div>
                  <Plus className="h-4 w-4 text-neon-purple shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>

        {kitProducts.length > 0 ? (
          <div className="space-y-2">
            {kitProducts.map(kp => (
              <div key={kp.productId} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                <div className="h-9 w-9 rounded bg-brand-mid shrink-0 overflow-hidden flex items-center justify-center">
                  {kp.image ? <Image src={kp.image} alt="" width={36} height={36} className="object-cover" /> : <span>🍾</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{kp.name}</p>
                  <p className="text-xs text-muted-foreground">₡{kp.price.toLocaleString()} c/u</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Button type="button" size="icon" variant="ghost" className="h-6 w-6" onClick={() => updateQty(kp.productId, -1)}><Minus className="h-3 w-3" /></Button>
                  <span className="text-sm font-bold text-white w-6 text-center">{kp.quantity}</span>
                  <Button type="button" size="icon" variant="ghost" className="h-6 w-6" onClick={() => updateQty(kp.productId, 1)}><Plus className="h-3 w-3" /></Button>
                </div>
                <Button type="button" size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => removeProduct(kp.productId)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
            <p className="text-xs text-muted-foreground pt-1">
              Valor individual: ₡{previewTotal.toLocaleString()} — precio del kit: ₡{(watch("price") || 0).toLocaleString()}
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Agrega al menos un producto al kit</p>
        )}
      </div>

      {/* Estado */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h2 className="font-bold text-white">Estado</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <Label>Activo</Label>
            <Switch defaultChecked={kit?.isActive ?? true} onCheckedChange={v => setValue("isActive", v)} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Destacado</Label>
            <Switch defaultChecked={kit?.isFeatured ?? false} onCheckedChange={v => setValue("isFeatured", v)} />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" className="btn-neon" disabled={saving}>
          {saving ? "Guardando..." : isEdit ? "Guardar cambios" : "Crear kit"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()}>Cancelar</Button>
      </div>
    </form>
  );
}
