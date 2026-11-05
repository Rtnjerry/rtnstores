"use client";

import { Check, Plus } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { ProductArt } from "./PixelArt";
import { useCart } from "./CartProvider";

export default function ProductCard({ product }: { product: Product }) {
  const { add, lastAdded } = useCart();
  const justAdded = lastAdded === product.id;
  const isAccount = product.kind === "account";

  return (
    <article className="mc-panel group flex flex-col">
      <div
        className="relative grid h-48 place-items-center overflow-hidden border-b-4 border-black"
        style={{
          background: isAccount
            ? `radial-gradient(circle at 50% 60%, ${product.art.accent}55, transparent 65%), #2a2d33`
            : `radial-gradient(circle at 50% 50%, ${product.art.secondary}40, transparent 70%), #2a2d33`,
        }}
      >
        <div className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105 drop-shadow-[6px_6px_0_rgba(0,0,0,0.45)]">
          <ProductArt product={product} size={isAccount ? 112 : 136} />
        </div>
        {product.badge && (
          <span className="absolute left-3 top-3 bg-[#fcdb05] px-2 py-1 font-pixel text-[10px] uppercase text-black">
            {product.badge}
          </span>
        )}
        <span className="absolute right-3 top-3 bg-black/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/80">
          {isAccount ? "With photo" : "Redeem code"}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="font-pixel text-base leading-tight text-white">{product.name}</h3>
          <p className="mt-1 text-sm text-white/60">{product.tagline}</p>
        </div>
        <ul className="space-y-1 text-xs text-white/70">
          {product.features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-[#17dd62]" />
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-pixel text-xl text-[#fcdb05]">{formatPrice(product.price)}</span>
          <button onClick={() => add(product.id)} className="mc-btn mc-btn-green text-xs" aria-live="polite">
            {justAdded ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {justAdded ? "Added" : "Add to cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
