import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartSidebar } from "@/components/cart/CartSidebar";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { InstagramButton } from "@/components/instagram/InstagramButton";
import { Providers } from "@/components/layout/Providers";
import { SEO } from "@/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SEO.title,
    template: `%s | BrandName`,
  },
  description: SEO.description,
  keywords: SEO.keywords,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "es_CR",
    title: SEO.title,
    description: SEO.description,
    siteName: "BrandName",
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CartSidebar />
          <WhatsAppButton />
          <InstagramButton />
          <Toaster
            position="top-right"
            richColors
            theme="dark"
            toastOptions={{
              style: {
                background: "rgba(26, 10, 46, 0.95)",
                border: "1px solid rgba(168, 85, 247, 0.3)",
                color: "#f8f8f8",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
