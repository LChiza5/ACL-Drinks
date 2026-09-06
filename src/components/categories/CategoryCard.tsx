"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Wine } from "@phosphor-icons/react/dist/ssr";
import type { Category } from "@/types";

export function CategoryCard({ category, index = 0 }: { category: Category; index?: number }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} whileHover={{ scale: 1.03, y: -4 }}>
      <Link href={`/categories/${category.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl border border-transparent hover:border-emerald-500/50 transition-colors duration-300 aspect-[4/3]" style={{ background: "#1E1A17" }}>
          {category.image ? (
            <Image src={category.image} alt={category.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 20vw" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Wine size={40} weight="duotone" color="#4A4038" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-center">
            {category.emoji && <span className="text-4xl mb-2 group-hover:scale-105 transition-transform duration-300">{category.emoji}</span>}
            <h3 className="font-black text-white text-lg leading-tight">{category.name}</h3>
            {category._count && <p className="text-xs text-white/70 mt-1">{category._count.products} productos</p>}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
