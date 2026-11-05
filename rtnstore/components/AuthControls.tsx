"use client";

import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";
import { clerkEnabled } from "@/lib/clerk";

function ClerkControls() {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return <div className="h-9 w-24 animate-pulse bg-white/10" />;
  if (isSignedIn) {
    return <UserButton appearance={{ elements: { avatarBox: "w-9 h-9 rounded-none" } }} />;
  }
  return (
    <div className="flex items-center gap-2">
      <SignInButton mode="modal">
        <button className="mc-btn mc-btn-ghost text-xs">Sign in</button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button className="mc-btn mc-btn-gold hidden text-xs sm:inline-flex">Sign up</button>
      </SignUpButton>
    </div>
  );
}

export default function AuthControls() {
  if (!clerkEnabled) return null;
  return <ClerkControls />;
}
