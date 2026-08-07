"use client";

import { motion } from "framer-motion";
import { Gift, Star, History, Tag, Shield, Truck } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const benefits = [
  { icon: Gift, title: "₡1.000 de Bienvenida", desc: "Crédito gratis en tu primera compra al registrarte." },
  { icon: Star, title: "Descuentos Exclusivos", desc: "Rebajas especiales solo para miembros registrados." },
  { icon: History, title: "Historial de Compras", desc: "Accede fácilmente a todos tus pedidos anteriores." },
  { icon: Tag, title: "Cupones Especiales", desc: "Códigos de descuento exclusivos para suscriptores." },
  { icon: Shield, title: "Compra Segura", desc: "Todos tus pagos encriptados y protegidos." },
  { icon: Truck, title: "Entrega Garantizada", desc: "Si no llega en el tiempo prometido, te compensamos." },
];

export function BenefitsSection() {
  return (
    <section className="section-padding" style={{ background: "#12110F" }}>
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-3 mb-12"
        >
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#C9984A" }}>¿Por qué elegirnos?</span>
          <h2 className="text-4xl font-black" style={{ color: "#F5F2EC" }}>
            Beneficios <span className="gradient-text">Exclusivos</span> 🎁
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
              transition={{ delay: i * 0.08 }}
              className="group cursor-pointer"
            >
              <SpotlightCard className="glass-card-hover rounded-xl p-6 space-y-4">
                <div className="inline-flex p-3 rounded-xl transition-all duration-300 group-hover:scale-110" style={{ background: "linear-gradient(135deg, #A67C52, #C9984A)" }}>
                  <b.icon className="h-6 w-6" style={{ color: "#F5F2EC" }} />
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: "#F5F2EC" }}>{b.title}</h3>
                  <p className="text-sm mt-1" style={{ color: "#B8B1A7" }}>{b.desc}</p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
