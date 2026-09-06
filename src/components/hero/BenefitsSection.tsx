"use client";

import { motion } from "framer-motion";
import { Gift, Star, ClockCounterClockwise, Tag, ShieldCheck, Truck } from "@phosphor-icons/react/dist/ssr";
import { TiltCard } from "@/components/ui/tilt-card";
import { IconBadge } from "@/components/ui/icon-badge";
import { SectionHeading } from "@/components/ui/section-heading";

const benefits = [
  { icon: Gift, title: "₡1.000 de Bienvenida", desc: "Crédito gratis en tu primera compra al registrarte.", tone: "gold" as const },
  { icon: Star, title: "Descuentos Exclusivos", desc: "Rebajas especiales solo para miembros registrados.", tone: "hibiscus" as const },
  { icon: ClockCounterClockwise, title: "Historial de Compras", desc: "Accede fácilmente a todos tus pedidos anteriores.", tone: "emerald" as const },
  { icon: Tag, title: "Cupones Especiales", desc: "Códigos de descuento exclusivos para suscriptores.", tone: "hibiscus" as const },
  { icon: ShieldCheck, title: "Compra Segura", desc: "Todos tus pagos encriptados y protegidos.", tone: "emerald" as const },
  { icon: Truck, title: "Entrega Garantizada", desc: "Si no llega en el tiempo prometido, te compensamos.", tone: "emerald" as const },
];

export function BenefitsSection() {
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "#12110F" }}>
      <div className="container-max relative z-10">
        <SectionHeading
          align="center"
          eyebrow="¿Por qué elegirnos?"
          eyebrowColor="#4CD671"
          title="Beneficios"
          accent="Exclusivos"
          accentColor="#4CD671"
          description="Regístrate gratis y disfruta de ventajas que ninguna otra licorería te ofrece."
          className="mb-14"
        />
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
                <div className="glass-card-hover rounded-sm p-6 space-y-4">
                  <IconBadge icon={b.icon} tone={b.tone} size="lg" />
                  <div>
                    <h3 className="font-bold text-lg" style={{ color: "#F5F2EC" }}>{b.title}</h3>
                    <p className="text-sm mt-1" style={{ color: "#B8B1A7" }}>{b.desc}</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
