import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { buildLines, buildOrderMessage, generatePaymentId, telegramChatUrl } from "@/lib/order";

const clerkServerReady = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY);

async function sendToTelegram(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
      cache: "no-store",
    });
    if (!res.ok) console.error("Telegram sendMessage failed with status", res.status);
    return res.ok;
  } catch (err) {
    console.error("Telegram sendMessage error", err);
    return false;
  }
}

export async function POST(req: Request) {
  let customer = "Guest";

  if (clerkServerReady) {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Please sign in to check out." }, { status: 401 });
    }
    const user = await currentUser();
    const name = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.username || "User";
    const email = user?.primaryEmailAddress?.emailAddress;
    customer = `${name}${email ? ` (${email})` : ""} · ${userId}`;
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const lines = buildLines((body as { items?: unknown })?.items);
  if (!lines) {
    return NextResponse.json({ error: "Your cart is empty or contains invalid items." }, { status: 400 });
  }

  const total = Math.round(lines.reduce((s, l) => s + l.subtotal, 0) * 100) / 100;
  const paymentId = generatePaymentId();
  const message = buildOrderMessage({ paymentId, lines, total, customer });
  const telegramSent = await sendToTelegram(message);

  return NextResponse.json({
    paymentId,
    total,
    message,
    telegramSent,
    telegramUrl: telegramChatUrl(message),
  });
}
