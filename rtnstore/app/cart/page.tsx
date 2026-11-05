"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Copy, Minus, Plus, Send, Trash2 } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import CheckoutButton from "@/components/CheckoutButton";
import { ProductArt } from "@/components/PixelArt";
import { formatPrice } from "@/lib/products";

type OrderResult = {
  paymentId: string;
  total: number;
  message: string;
  telegramSent: boolean;
  telegramUrl: string;
};

export default function CartPage() {
  const { lines, total, count, ready, setQuantity, remove, clear } = useCart();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderResult | null>(null);
  const [copied, setCopied] = useState(false);

  async function checkout() {
    setBusy(true);
    setError(null);
    // Open the tab synchronously so popup blockers allow it, then point it at Telegram.
    const tab = window.open("", "_blank");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: lines.map((l) => ({ id: l.product.id, quantity: l.quantity })) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Checkout failed.");
      const result = data as OrderResult;
      setOrder(result);
      clear();
      if (tab) tab.location.href = result.telegramUrl;
      else window.location.href = result.telegramUrl;
    } catch (e) {
      tab?.close();
      setError(e instanceof Error ? e.message : "Checkout failed.");
    } finally {
      setBusy(false);
    }
  }

  async function copyMessage() {
    if (!order) return;
    try {
      await navigator.clipboard.writeText(order.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  if (order) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14">
        <div className="mc-panel p-6 md:p-8">
          <p className="font-pixel text-xs text-[#17dd62]">Order created</p>
          <h1 className="mt-2 font-pixel text-3xl text-white">Thanks for shopping!</h1>
          <div className="mt-6 border-4 border-black bg-black/40 p-4">
            <p className="text-xs uppercase tracking-wider text-white/50">Payment ID</p>
            <p className="mt-1 select-all break-all font-pixel text-xl text-[#fcdb05]">{order.paymentId}</p>
            <p className="mt-3 text-sm text-white/70">Total: {formatPrice(order.total)} USD</p>
          </div>
          <p className="mt-6 text-sm text-white/70">
            {order.telegramSent
              ? "Your order was sent to @rtnstores automatically. "
              : ""}
            Telegram should have opened with your order message ready. Press <b>Send</b> in the chat with{" "}
            <b>@rtnstores</b> to receive payment details. Keep your payment ID for reference.
          </p>
          <pre className="mt-4 max-h-64 overflow-auto whitespace-pre-wrap border-4 border-black bg-[#16181c] p-4 text-xs text-white/80">
            {order.message}
          </pre>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={order.telegramUrl} target="_blank" rel="noreferrer" className="mc-btn mc-btn-tg">
              <Send className="h-4 w-4" /> Open Telegram
            </a>
            <button onClick={copyMessage} className="mc-btn mc-btn-ghost">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy message"}
            </button>
            <Link href="/" className="mc-btn mc-btn-green">Keep shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-pixel text-3xl text-white">Your cart</h1>
      {!ready ? (
        <div className="mt-8 h-40 animate-pulse bg-white/5" />
      ) : lines.length === 0 ? (
        <div className="mc-panel mt-8 p-10 text-center">
          <p className="text-white/70">Your cart is empty.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/#accounts" className="mc-btn mc-btn-green">Shop accounts</Link>
            <Link href="/#capes" className="mc-btn mc-btn-gold">Browse capes</Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <ul className="space-y-4">
            {lines.map(({ product, quantity }) => (
              <li key={product.id} className="mc-panel flex items-center gap-4 p-4">
                <div className="grid h-20 w-20 shrink-0 place-items-center bg-black/30">
                  <ProductArt product={product} size={product.kind === "account" ? 56 : 64} />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-pixel text-sm text-white">{product.name}</h2>
                  <p className="text-xs text-white/50">
                    {product.kind === "account" ? "Account · with photo" : "Cape · redeem code"}
                  </p>
                  <p className="mt-1 text-sm text-[#fcdb05]">{formatPrice(product.price)}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    className="mc-btn mc-btn-ghost p-1.5"
                    onClick={() => setQuantity(product.id, quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-8 text-center font-pixel text-sm">{quantity}</span>
                  <button
                    className="mc-btn mc-btn-ghost p-1.5"
                    onClick={() => setQuantity(product.id, quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <button
                  className="ml-1 text-white/40 hover:text-red-400"
                  onClick={() => remove(product.id)}
                  aria-label={`Remove ${product.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
          <aside className="mc-panel h-fit p-5 lg:sticky lg:top-24">
            <h2 className="font-pixel text-lg text-white">Summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-white/70">
                <dt>Items</dt>
                <dd>{count}</dd>
              </div>
              <div className="flex justify-between border-t-2 border-black/50 pt-2 text-base">
                <dt className="font-semibold text-white">Total</dt>
                <dd className="font-pixel text-[#fcdb05]">{formatPrice(total)}</dd>
              </div>
            </dl>
            <div className="mt-5">
              <CheckoutButton onCheckout={checkout} busy={busy} disabled={lines.length === 0} />
            </div>
            {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
            <p className="mt-4 text-xs text-white/50">
              Checkout creates a payment ID and opens Telegram with your order for <b>@rtnstores</b>. Payment is completed in
              the chat.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
