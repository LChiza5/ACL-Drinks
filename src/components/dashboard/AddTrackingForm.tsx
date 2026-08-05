"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AddTrackingForm({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    setLoading(true);
    const res = await fetch(`/api/orders/${orderId}/tracking`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description, location }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) {
      toast.success("Evento agregado");
      setDescription("");
      setLocation("");
      router.refresh();
    } else {
      toast.error(data.error ?? "Error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-2 flex-wrap">
      <Input placeholder="Descripción del evento" value={description} onChange={e => setDescription(e.target.value)} className="flex-1 min-w-48" />
      <Input placeholder="Ubicación (opcional)" value={location} onChange={e => setLocation(e.target.value)} className="w-40" />
      <Button type="submit" variant="outline" size="sm" disabled={loading || !description.trim()}>
        {loading ? "..." : "+ Agregar"}
      </Button>
    </form>
  );
}
