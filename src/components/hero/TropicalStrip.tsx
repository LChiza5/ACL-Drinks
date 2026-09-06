"use client";

import { motion } from "framer-motion";
import { PizoteMascot } from "@/components/ui/pizote-mascot";
import { FrogIcon, ToucanIcon, SlothIcon, MacawIcon, HowlerMonkeyIcon } from "@/components/ui/fauna-icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { springs } from "@/lib/motion";

const SPECIES = [
  {
    name: "Rana de Ojos Rojos",
    scientific: "Agalychnis callidryas",
    blurb: "Duerme de día pegada a una hoja; de noche, puro escándalo de color.",
    render: (cls: string) => <FrogIcon className={cls} />,
  },
  {
    name: "Tucán Pico Iris",
    scientific: "Ramphastos sulfuratus",
    blurb: "El pico hace todo el trabajo: pesca, pela fruta y presume.",
    render: (cls: string) => <ToucanIcon className={cls} />,
  },
  {
    name: "El Pizote",
    scientific: "Nasua narica",
    blurb: "Curioso, atrevido y el primero en llegar a la fiesta.",
    render: (cls: string) => <PizoteMascot covering={false} className={cls} />,
  },
  {
    name: "Perezoso",
    scientific: "Bradypus variegatus",
    blurb: "Se mueve tan despacio que hasta el musgo le crece encima.",
    render: (cls: string) => <SlothIcon className={cls} />,
  },
  {
    name: "Lapa Roja",
    scientific: "Ara macao",
    blurb: "Pareja para toda la vida y un color que no pasa desapercibido.",
    render: (cls: string) => <MacawIcon className={cls} />,
  },
  {
    name: "Mono Congo",
    scientific: "Alouatta palliata",
    blurb: "Se escucha a kilómetros antes de verse.",
    render: (cls: string) => <HowlerMonkeyIcon className={cls} />,
  },
];

export function TropicalStrip() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, #163826 0%, #12110F 65%)" }}
    >
      <div className="container-max relative z-10">
        <SectionHeading
          align="center"
          eyebrow="100% Tico"
          eyebrowColor="#F2A900"
          title="Pura Vida,"
          accent="Full Sabor"
          accentColor="#4CD671"
          description="Somos de Costa Rica y se nos nota."
          className="mb-12"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-10">
          {SPECIES.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 24, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ ...springs.bouncy, delay: i * 0.06 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div
                className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-full overflow-hidden flex items-center justify-center p-5"
                style={{ background: "radial-gradient(circle at 35% 30%, #EFE7D4, #E0D5B8 75%)" }}
              >
                {s.render("h-full w-full")}
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: "#F5F2EC" }}>{s.name}</p>
                <p className="text-[11px] italic" style={{ color: "#8FA88F" }}>{s.scientific}</p>
                <p className="text-xs mt-1 leading-snug max-w-[10rem] mx-auto" style={{ color: "#8A8377" }}>
                  {s.blurb}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
