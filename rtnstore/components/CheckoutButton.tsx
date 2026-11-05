"use client";

import { SignInButton, useAuth } from "@clerk/nextjs";
import { Send } from "lucide-react";
import { clerkEnabled } from "@/lib/clerk";

type Props = { onCheckout: () => void; busy: boolean; disabled: boolean };

function Button({ onCheckout, busy, disabled }: Props) {
  return (
    <button onClick={onCheckout} disabled={busy || disabled} className="mc-btn mc-btn-tg w-full py-3 text-sm">
      <Send className="h-4 w-4" />
      {busy ? "Creating order…" : "Checkout via Telegram"}
    </button>
  );
}

function ClerkCheckout(props: Props) {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return <div className="h-12 w-full animate-pulse bg-white/10" />;
  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        <button className="mc-btn mc-btn-gold w-full py-3 text-sm">Sign in to checkout</button>
      </SignInButton>
    );
  }
  return <Button {...props} />;
}

export default function CheckoutButton(props: Props) {
  return clerkEnabled ? <ClerkCheckout {...props} /> : <Button {...props} />;
}
