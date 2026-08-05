"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

export function CouponToggle({ couponId, isActive }: { couponId: string; isActive: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onChange = async (active: boolean) => {
    setLoading(true);
    const res = await fetch(`/api/coupons/${couponId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: active }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) router.refresh();
    else toast.error(data.error ?? "Error");
  };

  return <Switch defaultChecked={isActive} onCheckedChange={onChange} disabled={loading} />;
}
