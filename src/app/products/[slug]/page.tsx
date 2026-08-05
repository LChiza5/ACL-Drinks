export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatPrice, getDiscountPercentage } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/products/ProductCard";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { Wine, Globe, Droplets, Package } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) return { title: "Producto no encontrado" };
  return { title: product.name, description: product.description || `Compra ${product.name} en BrandName.`, openGraph: { images: product.images[0] ? [product.images[0]] : [] } };
}

export const revalidate = 60;

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findFirst({
    where: { slug, isActive: true },
    include: { category: true, inventory: true },
  });
  if (!product) notFound();

  const related = await prisma.product.findMany({
    where: { categoryId: product.categoryId, isActive: true, id: { not: product.id } },
    include: { category: true, inventory: true },
    take: 4,
  });

  const discount = getDiscountPercentage(product.price, product.comparePrice ?? 0);
  const inStock = !product.inventory || (product.inventory.stock - product.inventory.reserved) > 0;

  return (
    <div className="section-padding container-max">
      <div className="grid md:grid-cols-2 gap-10 mb-16">
        {/* Image */}
        <div className="space-y-3">
          <div className="relative aspect-square rounded-2xl overflow-hidden glass-card">
            {product.images[0] ? (
              <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-9xl">🍾</div>
            )}
            {discount > 0 && <div className="absolute top-4 left-4"><Badge variant="sale" className="text-sm font-black px-3 py-1">-{discount}% OFF</Badge></div>}
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1, 5).map((img, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden glass-card">
                  <Image src={img} alt={`${product.name} ${i + 2}`} fill className="object-cover" sizes="20vw" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            {product.category && <span className="text-sm font-semibold text-neon-purple">{product.category.name}</span>}
            <h1 className="text-3xl font-black text-white leading-tight">{product.name}</h1>
            {product.brand && <p className="text-muted-foreground">por <span className="text-white font-medium">{product.brand}</span></p>}
          </div>

          <div className="flex items-end gap-3">
            <span className="text-4xl font-black text-white">{formatPrice(product.price)}</span>
            {product.comparePrice && (
              <>
                <span className="text-xl text-muted-foreground line-through">{formatPrice(product.comparePrice)}</span>
                <Badge variant="sale">AHORRÁS {formatPrice(product.comparePrice - product.price)}</Badge>
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {product.isNew && <Badge variant="new">NUEVO</Badge>}
            {!inStock && <Badge variant="destructive">SIN STOCK</Badge>}
            {inStock && product.inventory && product.inventory.stock <= product.inventory.lowStock && (
              <Badge variant="neon-amber">⚠️ Últimas {product.inventory.stock - product.inventory.reserved} unidades</Badge>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {product.volume && <div className="glass-card rounded-xl p-3 flex items-center gap-2"><Package className="h-4 w-4 text-neon-purple shrink-0" /><div><p className="text-xs text-muted-foreground">Contenido</p><p className="text-sm font-bold text-white">{product.volume}</p></div></div>}
            {product.alcoholContent && <div className="glass-card rounded-xl p-3 flex items-center gap-2"><Droplets className="h-4 w-4 text-neon-blue shrink-0" /><div><p className="text-xs text-muted-foreground">Alcohol</p><p className="text-sm font-bold text-white">{product.alcoholContent}%</p></div></div>}
            {product.country && <div className="glass-card rounded-xl p-3 flex items-center gap-2"><Globe className="h-4 w-4 text-neon-green shrink-0" /><div><p className="text-xs text-muted-foreground">Origen</p><p className="text-sm font-bold text-white">{product.country}</p></div></div>}
            {product.brand && <div className="glass-card rounded-xl p-3 flex items-center gap-2"><Wine className="h-4 w-4 text-neon-amber shrink-0" /><div><p className="text-xs text-muted-foreground">Marca</p><p className="text-sm font-bold text-white">{product.brand}</p></div></div>}
          </div>

          {product.description && <div className="space-y-2"><h3 className="font-bold text-white">Descripción</h3><p className="text-muted-foreground leading-relaxed text-sm">{product.description}</p></div>}

          <AddToCartButton product={product as never} inStock={inStock} />
        </div>
      </div>

      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-black text-white mb-6">También te puede gustar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p, i) => <ProductCard key={p.id} product={p as never} index={i} />)}
          </div>
        </div>
      )}
    </div>
  );
}
