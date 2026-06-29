import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartSidebar } from "@/components/cart/CartSidebar";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { InstagramButton } from "@/components/instagram/InstagramButton";
import { Providers } from "@/components/layout/Providers";
import { SEO } from "@/constants";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: SEO.title,
    template: `%s | ACL Drinks`,
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
    siteName: "ACL Drinks",
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
      <body className={`${dmSans.variable} ${cormorant.variable} font-sans antialiased`}>
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
                background: "rgba(30, 26, 23, 0.97)",
                border: "1px solid rgba(166, 124, 82, 0.35)",
                color: "#F5F2EC",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
