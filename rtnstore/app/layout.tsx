import type { Metadata } from "next";
import { Geist, Pixelify_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { clerkEnabled } from "@/lib/clerk";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const pixel = Pixelify_Sans({ variable: "--font-pixel", subsets: ["latin"], weight: ["500", "700"] });

export const metadata: Metadata = {
  title: "RTNStore — Minecraft Accounts & Capes",
  description: "Buy Minecraft accounts with photo proof and capes delivered as redeem codes. Fast checkout via Telegram.",
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <footer className="border-t-4 border-black bg-[#16181c] py-8 text-center text-xs text-white/50">
        <p className="font-pixel text-sm text-white/80">
          RTN<span className="text-[#fcdb05]">Store</span>
        </p>
        <p className="mt-2">
          Support on Telegram:{" "}
          <a href="https://t.me/rtnstores" target="_blank" rel="noreferrer" className="text-[#17dd62] hover:underline">
            @rtnstores
          </a>
        </p>
        <p className="mt-2">Not affiliated with Mojang Studios or Microsoft.</p>
      </footer>
    </CartProvider>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${pixel.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {clerkEnabled ? (
          <ClerkProvider>
            <Shell>{children}</Shell>
          </ClerkProvider>
        ) : (
          <Shell>{children}</Shell>
        )}
      </body>
    </html>
  );
}
