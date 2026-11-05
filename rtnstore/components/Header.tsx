"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./CartProvider";
import AuthControls from "./AuthControls";

export default function Header() {
  const { count, ready } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b-4 border-black bg-[#1d1f24]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center bg-[#17dd62] font-pixel text-sm text-black shadow-[inset_-3px_-3px_0_#0e8a3d,inset_3px_3px_0_#7dffb0]">
            R
          </span>
          <span className="font-pixel text-lg tracking-wide text-white">
            RTN<span className="text-[#fcdb05]">Store</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-white/70 md:flex">
          <Link href="/#accounts" className="hover:text-white">Accounts</Link>
          <Link href="/#capes" className="hover:text-white">Capes</Link>
          <Link href="/#redeem" className="hover:text-white">How to redeem</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/cart" className="mc-btn mc-btn-ghost relative px-3" aria-label={`Cart, ${count} items`}>
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden text-xs sm:inline">Cart</span>
            {ready && count > 0 && (
              <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center bg-[#fcdb05] px-1 font-pixel text-[10px] text-black">
                {count}
              </span>
            )}
          </Link>
          <AuthControls />
        </div>
      </div>
    </header>
  );
}
