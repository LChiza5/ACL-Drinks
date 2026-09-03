"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Package, CheckCircle2, Truck, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils";
import { ORDER_STATUSES } from "@/constants";

export default function TrackingPage() {
  const [code, setCode] = useState("");
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!code.trim()) return;
    setIsLoading(true); setError(""); setData(null);
    try {
      const param = code.startsWith("BN-") ? "orderNumber" : "code";
      const res = await fetch(`/api/tracking?${param}=${code.trim()}`);
      const result = await res.json();
      if (result.success) { setData(result.data); } else { setError(result.error); }
    } catch { setError("Error al buscar el pedido"); }
    finally { setIsLoading(false); }
  };

  const statusInfo = data ? ORDER_STATUSES[data.order?.status as keyof typeof ORDER_STATUSES] : null;

  return (
    <div className="section-padding container-max max-w-2xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-white mb-2 inline-flex items-center gap-3">Rastrear <span className="gradient-text">Pedido</span> <Package className="h-8 w-8 text-gold-500" /></h1>
        <p className="text-muted-foreground">Ingresa tu número de pedido o código de rastreo</p>
      </div>
      <div className="glass-card rounded-2xl p-6 mb-6">
        <div className="flex gap-3">
          <Input placeholder="BN-XXXX o código de rastreo" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} onKeyDown={(e) => e.key === "Enter" && handleSearch()} className="text-center font-mono tracking-wider" />
          <Button onClick={handleSearch} disabled={isLoading} className="btn-neon gap-2 shrink-0">
            <Search className="h-4 w-4" />{isLoading ? "Buscando..." : "Rastrear"}
          </Button>
        </div>
        {error && <p className="text-sm text-destructive mt-3 text-center">{error}</p>}
      </div>
      {data && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div><p className="text-sm text-muted-foreground">Pedido</p><p className="font-mono font-bold text-white">{data.order?.orderNumber}</p></div>
              {statusInfo && <Badge className="bg-neon-purple/20 border-neon-purple/50 text-neon-purple font-bold px-3 py-1">{statusInfo.emoji} {statusInfo.label}</Badge>}
            </div>
            {data.trackingCode && <div className="flex items-center gap-2 text-sm"><span className="text-muted-foreground">Código:</span><span className="font-mono text-neon-amber font-bold">{data.trackingCode}</span></div>}
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-bold text-white mb-4">Historial de Estado</h3>
            <div className="space-y-4">
              {data.trackings?.map((t: any, i: number) => (
                <div key={t.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`p-2 rounded-full ${i === 0 ? "bg-neon-purple text-white" : "bg-muted text-muted-foreground"}`}><Package className="h-4 w-4" /></div>
                    {i < data.trackings.length - 1 && <div className="w-0.5 h-6 bg-border mt-1" />}
                  </div>
                  <div className="pb-4">
                    <p className={`font-semibold text-sm ${i === 0 ? "text-white" : "text-muted-foreground"}`}>{t.description}</p>
                    {t.location && <p className="text-xs text-muted-foreground">{t.location}</p>}
                    <p className="text-xs text-muted-foreground mt-1">{formatDateTime(t.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
