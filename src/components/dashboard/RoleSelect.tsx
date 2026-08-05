"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ROLES = ["ADMIN", "MANAGER", "CUSTOMER"] as const;

export function RoleSelect({ userId, current }: { userId: string; current: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onChange = async (role: string) => {
    setLoading(true);
    const res = await fetch(`/api/users/${userId}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) { toast.success("Rol actualizado"); router.refresh(); }
    else toast.error(data.error ?? "Error");
  };

  return (
    <select
      defaultValue={current}
      disabled={loading}
      onChange={e => onChange(e.target.value)}
      className="bg-brand-mid border border-border rounded-lg px-2 py-1 text-xs text-white font-medium focus:outline-none focus:border-neon-purple disabled:opacity-50"
    >
      {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
    </select>
  );
}
