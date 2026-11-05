import { formatPrice, getProduct, TELEGRAM_USERNAME, type Product } from "./products";

export type OrderLineInput = { id: string; quantity: number };
export type OrderLine = { product: Product; quantity: number; subtotal: number };

export function buildLines(input: unknown): OrderLine[] | null {
  if (!Array.isArray(input) || input.length === 0 || input.length > 50) return null;
  const lines: OrderLine[] = [];
  for (const raw of input) {
    if (!raw || typeof raw !== "object") return null;
    const { id, quantity } = raw as Record<string, unknown>;
    if (typeof id !== "string" || typeof quantity !== "number") return null;
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) return null;
    const product = getProduct(id);
    if (!product) return null;
    lines.push({ product, quantity, subtotal: Math.round(product.price * quantity * 100) / 100 });
  }
  return lines;
}

export function generatePaymentId(date = new Date()): string {
  const ymd = date.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase();
  return `RTN-${ymd}-${rand}`;
}

export function buildOrderMessage(opts: {
  paymentId: string;
  lines: OrderLine[];
  total: number;
  customer: string;
  date?: Date;
}): string {
  const { paymentId, lines, total, customer, date = new Date() } = opts;
  const items = lines
    .map((l) => {
      const type = l.product.kind === "account" ? "Account (with photo)" : "Cape (redeem code)";
      return `• ${l.product.name} [${type}] x${l.quantity} — ${formatPrice(l.subtotal)}`;
    })
    .join("\n");
  return [
    "🛒 New RTNStore order",
    "",
    `Payment ID: ${paymentId}`,
    `Customer: ${customer}`,
    `Date: ${date.toUTCString()}`,
    "",
    "Items:",
    items,
    "",
    `Total: ${formatPrice(total)} USD`,
    "",
    "Hi! I'd like to pay for this order. Please send payment details.",
  ].join("\n");
}

export function telegramChatUrl(message: string): string {
  return `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(message)}`;
}
