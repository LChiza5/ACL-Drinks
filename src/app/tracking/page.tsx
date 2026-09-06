"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagnifyingGlass, Package, CheckCircle, Truck, MapPin, Clock } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils";
import { ORDER_STATUSES } from "@/constants";
import { springs } from "@/lib/motion";

/** Timeline dot icon per position: newest step gets the "live" treatment. */
const STEP_ICONS = [Truck, Package, CheckCircle, Clock];

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
        <span className="text-sm font-semibold uppercase tracking-widest text-gold-500">
          ¿Dónde viene mi pedido?
        </span>
        <h1 className="text-4xl font-black mt-2 text-white">
          Rastrear <span className="text-gold-500">Pedido</span>{" "}
          <Package size={36} weight="duotone" color="#F2A900" className="inline-block align-middle" />
        </h1>
        <p className="mt-2 text-muted-foreground">Ingresá tu número de pedido o código de rastreo</p>
      </div>

      <div className="glass-card rounded-2xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="BN-XXXX o código de rastreo"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="text-center sm:text-left font-mono tracking-wider h-12"
          />
          <Button onClick={handleSearch} disabled={isLoading || !code.trim()} className="btn-neon gap-2 shrink-0 h-12 px-6 text-white">
            <MagnifyingGlass size={18} weight="bold" />{isLoading ? "Buscando..." : "Rastrear"}
          </Button>
        </div>
        {error && <p className="text-sm text-destructive mt-3 text-center">{error}</p>}
      </div>

      <AnimatePresence mode="wait">
        {!data && !error && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={springs.gentle}
            className="flex flex-col items-center text-center gap-4 py-14"
          >
            <div
              className="flex h-24 w-24 items-center justify-center rounded-full"
              style={{ background: "rgba(242,169,0,0.10)", border: "1px solid rgba(242,169,0,0.28)" }}
            >
              <Truck size={48} weight="duotone" color="#F2A900" />
            </div>
            <div>
              <p className="font-bold text-lg" style={{ color: "#F5F2EC" }}>Todavía no buscaste nada</p>
              <p className="text-sm mt-1 max-w-sm mx-auto" style={{ color: "#B8B1A7" }}>
                El número de pedido te llega por WhatsApp apenas confirmamos la compra. Se ve así: <span className="font-mono text-gold-500">BN-1234</span>
              </p>
            </div>
          </motion.div>
        )}

        {data && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springs.gentle}
            className="space-y-4"
          >
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Pedido</p>
                  <p className="font-mono font-bold text-lg text-white">{data.order?.orderNumber}</p>
                </div>
                {statusInfo && (
                  <Badge className="rounded-full border-0 font-bold px-4 py-1.5 text-white shrink-0" style={{ background: "#22B14C" }}>
                    {statusInfo.label}
                  </Badge>
                )}
              </div>
              {data.trackingCode && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={16} weight="duotone" color="#B8B1A7" />
                  <span className="text-muted-foreground">Código:</span>
                  <span className="font-mono font-bold text-gold-500">{data.trackingCode}</span>
                </div>
              )}
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-bold text-white mb-5">Historial de Estado</h3>
              <div className="space-y-1">
                {data.trackings?.map((t: any, i: number) => {
                  const StepIcon = STEP_ICONS[Math.min(i, STEP_ICONS.length - 1)];
                  const isLatest = i === 0;
                  return (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ ...springs.gentle, delay: i * 0.07 }}
                      className="flex gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-full shrink-0"
                          style={
                            isLatest
                              ? { background: "#22B14C", boxShadow: "0 0 0 4px rgba(34,177,76,0.18)" }
                              : { background: "rgba(245,242,236,0.06)", border: "1px solid rgba(245,242,236,0.12)" }
                          }
                        >
                          <StepIcon size={20} weight="duotone" color={isLatest ? "#FFFFFF" : "#8A8377"} />
                        </div>
                        {i < data.trackings.length - 1 && (
                          <div className="w-px flex-1 min-h-[28px] my-1" style={{ background: "rgba(245,242,236,0.12)" }} />
                        )}
                      </div>
                      <div className="pb-6 pt-1.5">
                        <p className={`font-semibold text-sm ${isLatest ? "text-white" : "text-muted-foreground"}`}>{t.description}</p>
                        {t.location && <p className="text-xs mt-0.5" style={{ color: "#8A8377" }}>{t.location}</p>}
                        <p className="text-xs mt-1" style={{ color: "#8A8377" }}>{formatDateTime(t.timestamp)}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
