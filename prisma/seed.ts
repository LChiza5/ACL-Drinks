import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const adminPassword = await bcrypt.hash("Admin123!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@brandname.cr" },
    update: {},
    create: {
      name: "Admin BrandName",
      email: "admin@brandname.cr",
      password: adminPassword,
      role: UserRole.ADMIN,
      phone: "+50688888888",
    },
  });
  console.log("✅ Admin user:", admin.email);

  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "whisky" },
      update: {},
      create: {
        name: "Whisky",
        slug: "whisky",
        description: "Los mejores whiskies del mundo",
        emoji: "🥃",
        color: "#f59e0b",
        sortOrder: 1,
        image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400",
      },
    }),
    prisma.category.upsert({
      where: { slug: "ron" },
      update: {},
      create: {
        name: "Ron",
        slug: "ron",
        description: "Rones premium nacionales e importados",
        emoji: "🍹",
        color: "#a855f7",
        sortOrder: 2,
        image: "https://images.unsplash.com/photo-1514362453360-8f94243c9996?w=400",
      },
    }),
    prisma.category.upsert({
      where: { slug: "vodka" },
      update: {},
      create: {
        name: "Vodka",
        slug: "vodka",
        description: "Vodkas premium para tus cócteles favoritos",
        emoji: "🍸",
        color: "#3b82f6",
        sortOrder: 3,
        image: "https://images.unsplash.com/photo-1608885898957-c00a29a0f7e0?w=400",
      },
    }),
    prisma.category.upsert({
      where: { slug: "tequila" },
      update: {},
      create: {
        name: "Tequila",
        slug: "tequila",
        description: "Tequilas auténticos mexicanos",
        emoji: "🌵",
        color: "#10b981",
        sortOrder: 4,
        image: "https://images.unsplash.com/photo-1579416399094-57bf01671649?w=400",
      },
    }),
    prisma.category.upsert({
      where: { slug: "cervezas" },
      update: {},
      create: {
        name: "Cervezas",
        slug: "cervezas",
        description: "Cervezas nacionales e importadas bien heladas",
        emoji: "🍺",
        color: "#f43f5e",
        sortOrder: 5,
        image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400",
      },
    }),
  ]);
  console.log("✅ Categories:", categories.length);

  const products = await Promise.all([
    prisma.product.upsert({
      where: { slug: "johnnie-walker-red-label" },
      update: {},
      create: {
        name: "Johnnie Walker Red Label",
        slug: "johnnie-walker-red-label",
        description: "El whisky escocés más vendido del mundo.",
        price: 18500,
        comparePrice: 22000,
        images: ["https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600"],
        categoryId: categories[0].id,
        brand: "Johnnie Walker",
        alcoholContent: 40,
        volume: "750ml",
        country: "Escocia",
        sku: "JW-RED-750",
        isActive: true,
        isFeatured: true,
        isOnSale: true,
        tags: ["whisky", "escocés", "popular"],
        inventory: { create: { stock: 50, lowStock: 10 } },
      },
    }),
    prisma.product.upsert({
      where: { slug: "cacique-ron-extra-anejo" },
      update: {},
      create: {
        name: "Cacique Ron Extra Añejo",
        slug: "cacique-ron-extra-anejo",
        description: "El ron venezolano más premiado.",
        price: 15000,
        images: ["https://images.unsplash.com/photo-1514362453360-8f94243c9996?w=600"],
        categoryId: categories[1].id,
        brand: "Cacique",
        alcoholContent: 40,
        volume: "750ml",
        country: "Venezuela",
        sku: "CAC-EXTRA-750",
        isActive: true,
        isFeatured: true,
        tags: ["ron", "venezolano", "añejo"],
        inventory: { create: { stock: 35, lowStock: 8 } },
      },
    }),
    prisma.product.upsert({
      where: { slug: "absolut-vodka-original" },
      update: {},
      create: {
        name: "Absolut Vodka Original",
        slug: "absolut-vodka-original",
        description: "El vodka premium sueco.",
        price: 16500,
        comparePrice: 19000,
        images: ["https://images.unsplash.com/photo-1608885898957-c00a29a0f7e0?w=600"],
        categoryId: categories[2].id,
        brand: "Absolut",
        alcoholContent: 40,
        volume: "750ml",
        country: "Suecia",
        sku: "ABS-ORG-750",
        isActive: true,
        isFeatured: true,
        isOnSale: true,
        tags: ["vodka", "sueco", "premium"],
        inventory: { create: { stock: 40, lowStock: 10 } },
      },
    }),
    prisma.product.upsert({
      where: { slug: "jose-cuervo-tequila-especial" },
      update: {},
      create: {
        name: "Jose Cuervo Tequila Especial",
        slug: "jose-cuervo-tequila-especial",
        description: "Tequila dorado reposado.",
        price: 14500,
        images: ["https://images.unsplash.com/photo-1579416399094-57bf01671649?w=600"],
        categoryId: categories[3].id,
        brand: "Jose Cuervo",
        alcoholContent: 38,
        volume: "750ml",
        country: "México",
        sku: "JC-ESP-750",
        isActive: true,
        isNew: true,
        tags: ["tequila", "mexicano"],
        inventory: { create: { stock: 30, lowStock: 8 } },
      },
    }),
    prisma.product.upsert({
      where: { slug: "imperial-cerveza-nacional" },
      update: {},
      create: {
        name: "Imperial 6-Pack",
        slug: "imperial-cerveza-nacional",
        description: "La cerveza nacional de Costa Rica.",
        price: 5500,
        comparePrice: 6500,
        images: ["https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600"],
        categoryId: categories[4].id,
        brand: "Imperial",
        alcoholContent: 4.6,
        volume: "6x350ml",
        country: "Costa Rica",
        sku: "IMP-6PK-350",
        isActive: true,
        isFeatured: true,
        isOnSale: true,
        tags: ["cerveza", "nacional"],
        inventory: { create: { stock: 100, lowStock: 20 } },
      },
    }),
    prisma.product.upsert({
      where: { slug: "johnnie-walker-black-label" },
      update: {},
      create: {
        name: "Johnnie Walker Black Label",
        slug: "johnnie-walker-black-label",
        description: "12 años de maduración. Suave y premium.",
        price: 28000,
        comparePrice: 32000,
        images: ["https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600"],
        categoryId: categories[0].id,
        brand: "Johnnie Walker",
        alcoholContent: 40,
        volume: "750ml",
        country: "Escocia",
        sku: "JW-BLK-750",
        isActive: true,
        isFeatured: true,
        isOnSale: true,
        tags: ["whisky", "premium", "12 años"],
        inventory: { create: { stock: 25, lowStock: 5 } },
      },
    }),
  ]);
  console.log("✅ Products:", products.length);

  const kits = await Promise.all([
    prisma.kit.upsert({
      where: { slug: "kit-fiesta" },
      update: {},
      create: {
        name: "Kit Fiesta 🎉",
        slug: "kit-fiesta",
        description: "Todo lo que necesitas para una fiesta épica.",
        price: 35000,
        comparePrice: 42000,
        badge: "¡MÁS POPULAR!",
        isActive: true,
        isFeatured: true,
        kitProducts: {
          create: [
            { productId: products[1].id, quantity: 1 },
            { productId: products[2].id, quantity: 1 },
            { productId: products[4].id, quantity: 2 },
          ],
        },
      },
    }),
    prisma.kit.upsert({
      where: { slug: "kit-whisky-lover" },
      update: {},
      create: {
        name: "Kit Whisky Lover 🥃",
        slug: "kit-whisky-lover",
        description: "Para los amantes del buen whisky.",
        price: 44000,
        comparePrice: 54000,
        badge: "AHORRÁ ₡10.000",
        isActive: true,
        isFeatured: true,
        kitProducts: {
          create: [
            { productId: products[0].id, quantity: 1 },
            { productId: products[5].id, quantity: 1 },
          ],
        },
      },
    }),
  ]);
  console.log("✅ Kits:", kits.length);

  await prisma.coupon.upsert({
    where: { code: "GUARO2025" },
    update: {},
    create: {
      code: "GUARO2025",
      description: "₡2.000 de descuento en pedidos mayores a ₡15.000",
      type: "FIXED_AMOUNT",
      value: 2000,
      minOrder: 15000,
      maxUses: 100,
      isActive: true,
      expiresAt: new Date("2025-12-31"),
    },
  });

  console.log("🎉 Seed completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
