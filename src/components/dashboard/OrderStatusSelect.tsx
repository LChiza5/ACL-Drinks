"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ORDER_STATUSES } from "@/constants";

export function OrderStatusSelect({ orderId, current }: { orderId: string; current: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onChange = async (status: string) => {
    setLoading(true);
    const res = await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) { toast.success("Estado actualizado"); router.refresh(); }
    else toast.error(data.error ?? "Error");
  };

  return (
    <select
      defaultValue={current}
      disabled={loading}
      onChange={e => onChange(e.target.value)}
      className="bg-brand-mid border border-border rounded-lg px-3 py-2 text-sm text-white font-medium focus:outline-none focus:border-neon-purple disabled:opacity-50"
    >
      {Object.entries(ORDER_STATUSES).map(([key, s]) => (
        <option key={key} value={key}>{s.emoji} {s.label}</option>
      ))}
    </select>
  );
}

export function MarkPaidButton({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    const res = await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentStatus: "COMPLETED" }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) { toast.success("Pago marcado como completado"); router.refresh(); }
    else toast.error(data.error ?? "Error");
  };

  return (
    <button onClick={onClick} disabled={loading}
      className="px-3 py-1.5 rounded-lg bg-green-500/20 border border-green-500/40 text-green-400 text-xs font-bold hover:bg-green-500/30 transition-colors disabled:opacity-50">
      {loading ? "..." : "✅ Marcar pagado"}
    </button>
  );
}
