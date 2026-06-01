"use client";

import { motion } from "framer-motion";
import { Gift, Star, History, Tag, Shield, Truck } from "lucide-react";

const benefits = [
  { icon: Gift, title: "₡1.000 de Bienvenida", desc: "Crédito gratis en tu primera compra al registrarte.", color: "from-amber-700 to-amber-500" },
  { icon: Star, title: "Descuentos Exclusivos", desc: "Rebajas especiales solo para miembros registrados.", color: "from-amber-600 to-yellow-500" },
  { icon: History, title: "Historial de Compras", desc: "Accede fácilmente a todos tus pedidos anteriores.", color: "from-stone-600 to-stone-400" },
  { icon: Tag, title: "Cupones Especiales", desc: "Códigos de descuento exclusivos para suscriptores.", color: "from-amber-800 to-amber-600" },
  { icon: Shield, title: "Compra Segura", desc: "Todos tus pagos encriptados y protegidos.", color: "from-green-700 to-emerald-500" },
  { icon: Truck, title: "Entrega Garantizada", desc: "Si no llega en el tiempo prometido, te compensamos.", color: "from-amber-700 to-stone-500" },
];

export function BenefitsSection() {
  return (
    <section className="section-padding" style={{ background: "rgba(30,26,23,0.4)" }}>
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-3 mb-12"
        >
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#A67C52" }}>¿Por qué elegirnos?</span>
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
              className="glass-card-hover rounded-xl p-6 space-y-4 group cursor-pointer"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${b.color} transition-all duration-300 group-hover:scale-110`}>
                <b.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg" style={{ color: "#F5F2EC" }}>{b.title}</h3>
                <p className="text-sm mt-1" style={{ color: "#B8B1A7" }}>{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
