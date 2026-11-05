# RTNStore

Minecraft accounts (with photo, $9.99–$49.99) and capes (redeem codes, $0.99–$9.99).
Built with Next.js 16, Tailwind CSS 4 and Clerk.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in your keys
npm run dev
```

## Deploy to Vercel

1. Import the repo in Vercel (framework preset: Next.js, no extra settings needed).
2. Add environment variables from `.env.example`:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` — enables sign-in. Without them the site still builds and
     works, but checkout runs as a guest.
   - `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` — optional; when set, each order is also pushed automatically to the
     @rtnstores chat by a bot.
3. Deploy.

## Checkout flow

Cart → **Checkout via Telegram** → the server validates the cart against the catalog, creates a payment ID
(`RTN-YYYYMMDD-XXXXXXXX`), optionally sends the order to Telegram via the bot, and opens
`t.me/rtnstores` with the order message prefilled for the customer to send.

Edit products and prices in `lib/products.ts`.
