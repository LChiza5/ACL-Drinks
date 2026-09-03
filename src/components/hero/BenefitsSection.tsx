"use client";

import { motion } from "framer-motion";
import { Gift, Star, History, Tag, Shield, Truck } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { TiltCard } from "@/components/ui/tilt-card";
import { IconBadge } from "@/components/ui/icon-badge";

const benefits = [
  { icon: Gift, title: "₡1.000 de Bienvenida", desc: "Crédito gratis en tu primera compra al registrarte.", tone: "gold" as const },
  { icon: Star, title: "Descuentos Exclusivos", desc: "Rebajas especiales solo para miembros registrados.", tone: "hibiscus" as const },
  { icon: History, title: "Historial de Compras", desc: "Accede fácilmente a todos tus pedidos anteriores.", tone: "emerald" as const },
  { icon: Tag, title: "Cupones Especiales", desc: "Códigos de descuento exclusivos para suscriptores.", tone: "gold" as const },
  { icon: Shield, title: "Compra Segura", desc: "Todos tus pagos encriptados y protegidos.", tone: "emerald" as const },
  { icon: Truck, title: "Entrega Garantizada", desc: "Si no llega en el tiempo prometido, te compensamos.", tone: "hibiscus" as const },
];

export function BenefitsSection() {
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "#12110F" }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl" style={{ background: "rgba(34,177,76,0.07)" }} />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl" style={{ background: "rgba(242,169,0,0.06)" }} />
      </div>
      <div className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-3 mb-12"
        >
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#F2A900" }}>¿Por qué elegirnos?</span>
          <h2 className="text-4xl font-display font-semibold inline-flex items-center gap-3" style={{ color: "#F5F2EC" }}>
            Beneficios <span className="italic gradient-text-primary">Exclusivos</span> <Gift className="h-8 w-8 text-gold-500" />
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: "#B8B1A7" }}>
            Regístrate gratis y disfruta de ventajas que ninguna otra licorería te ofrece.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 140, damping: 15, delay: i * 0.08 }}
              className="group cursor-pointer"
            >
              <TiltCard rotateAmplitude={6}>
                <SpotlightCard className="glass-card-hover rounded-xl p-6 space-y-4">
                  <IconBadge icon={b.icon} tone={b.tone} />
                  <div>
                    <h3 className="font-bold text-lg" style={{ color: "#F5F2EC" }}>{b.title}</h3>
                    <p className="text-sm mt-1" style={{ color: "#B8B1A7" }}>{b.desc}</p>
                  </div>
                </SpotlightCard>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
