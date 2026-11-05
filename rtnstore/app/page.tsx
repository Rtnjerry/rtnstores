import Link from "next/link";
import { ShieldCheck, Send, Zap } from "lucide-react";
import { ACCOUNTS, CAPES } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { PixelCape, PixelHead } from "@/components/PixelArt";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b-4 border-black">
        <div className="absolute inset-0 bg-gradient-to-b from-[#3a6ea5]/40 via-transparent to-transparent" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="mb-4 inline-block bg-black/50 px-3 py-1 font-pixel text-xs text-[#17dd62]">
              ★ Minecraft accounts & capes
            </p>
            <h1 className="font-pixel text-4xl leading-tight text-white md:text-6xl">
              Level up with <span className="text-[#fcdb05]">RTNStore</span>
            </h1>
            <p className="mt-5 max-w-md text-white/70">
              Accounts with photo proof from $9.99 and capes from $0.99, delivered as redeem codes. Add to cart, check out, and
              your order lands straight in our Telegram.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#accounts" className="mc-btn mc-btn-green">Shop accounts</Link>
              <Link href="#capes" className="mc-btn mc-btn-gold">Browse capes</Link>
            </div>
          </div>
          <div className="relative flex items-end justify-center gap-8">
            <div className="animate-float drop-shadow-[10px_10px_0_rgba(0,0,0,0.5)]">
              <PixelHead art={ACCOUNTS[5].art} size={180} />
            </div>
            <div className="animate-float drop-shadow-[10px_10px_0_rgba(0,0,0,0.5)] [animation-delay:-2s]">
              <PixelCape art={CAPES[7].art} size={200} />
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:grid-cols-3">
        {[
          { icon: ShieldCheck, title: "Photo proof", text: "Every account ships with a photo of its profile." },
          { icon: Zap, title: "Code delivery", text: "Capes arrive as redeem codes you activate yourself." },
          { icon: Send, title: "Telegram checkout", text: "Your order + payment ID go straight to @rtnstores." },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="mc-panel flex items-start gap-3 p-4">
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#17dd62]" />
            <div>
              <h3 className="font-pixel text-sm text-white">{title}</h3>
              <p className="mt-1 text-sm text-white/60">{text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Accounts */}
      <section id="accounts" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="font-pixel text-3xl text-white">Accounts</h2>
            <p className="text-sm text-white/60">With photo · $9.99 – $49.99</p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ACCOUNTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Capes */}
      <section id="capes" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-10">
        <div className="mb-6">
          <h2 className="font-pixel text-3xl text-white">Capes</h2>
          <p className="text-sm text-white/60">All capes redeemable by code · $0.99 – $9.99</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CAPES.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Redeem */}
      <section id="redeem" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12">
        <div className="mc-panel p-6 md:p-8">
          <h2 className="font-pixel text-2xl text-white">How it works</h2>
          <ol className="mt-6 grid gap-6 md:grid-cols-4">
            {[
              ["Add to cart", "Pick accounts and capes. Mix as many as you like."],
              ["Check out", "Sign in and hit checkout. We create a unique payment ID."],
              ["Telegram", "Your order and payment ID are sent to @rtnstores. Confirm payment in the chat."],
              ["Redeem", "Get your account login + photo, and a redeem code for every cape."],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center bg-[#fcdb05] font-pixel text-sm text-black">{i + 1}</span>
                <div>
                  <h3 className="font-pixel text-sm text-white">{t}</h3>
                  <p className="mt-1 text-sm text-white/60">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
