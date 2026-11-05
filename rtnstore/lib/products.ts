export type ProductKind = "account" | "cape";

export type Product = {
  id: string;
  kind: ProductKind;
  name: string;
  tagline: string;
  price: number;
  features: string[];
  badge?: string;
  // Visual seed for the pixel art preview
  art: { primary: string; secondary: string; accent: string; pattern?: CapePattern };
};

export type CapePattern = "solid" | "stripe" | "diamond" | "split" | "emblem" | "checker" | "gradient";

export const ACCOUNTS: Product[] = [
  {
    id: "acc-starter",
    kind: "account",
    name: "Starter Java Account",
    tagline: "Fresh Java Edition account, ready to play.",
    price: 9.99,
    features: ["Java Edition", "Full email access", "Random skin + photo"],
    art: { primary: "#c68a5a", secondary: "#3b2a1a", accent: "#3a7bd5" },
  },
  {
    id: "acc-dual",
    kind: "account",
    name: "Java + Bedrock Bundle",
    tagline: "Play on PC, console and mobile with one login.",
    price: 14.99,
    features: ["Java + Bedrock", "Full email access", "Custom skin set"],
    badge: "Popular",
    art: { primary: "#e0ac7e", secondary: "#e8c547", accent: "#2f9e44" },
  },
  {
    id: "acc-namechange",
    kind: "account",
    name: "Name-Change Ready",
    tagline: "Pick your own username on day one.",
    price: 19.99,
    features: ["Java + Bedrock", "Name change available", "Skin + profile photo"],
    art: { primary: "#8d5a3b", secondary: "#141414", accent: "#9b59b6" },
  },
  {
    id: "acc-ranked",
    kind: "account",
    name: "Ranked Server Account",
    tagline: "Comes with a paid rank on a popular server.",
    price: 29.99,
    features: ["Java + Bedrock", "Server rank included", "Stats & photo proof"],
    art: { primary: "#f1c27d", secondary: "#a0522d", accent: "#e67e22" },
  },
  {
    id: "acc-og-name",
    kind: "account",
    name: "OG Rare Name",
    tagline: "Short, clean username collectors chase.",
    price: 39.99,
    features: ["4-letter OG name", "Full access", "Name history photo"],
    badge: "Rare",
    art: { primary: "#d9a066", secondary: "#2c3e50", accent: "#17dd62" },
  },
  {
    id: "acc-legend",
    kind: "account",
    name: "Legend Collector Account",
    tagline: "3-letter name with capes already equipped.",
    price: 49.99,
    features: ["3-letter OG name", "Capes equipped", "Full access + photo proof"],
    badge: "Best",
    art: { primary: "#ffdbac", secondary: "#fcdb05", accent: "#c0392b" },
  },
];

export const CAPES: Product[] = [
  {
    id: "cape-ember",
    kind: "cape",
    name: "Ember Cape",
    tagline: "Warm glow for night raids.",
    price: 0.99,
    features: ["Redeem code", "Instant delivery"],
    art: { primary: "#c0392b", secondary: "#e67e22", accent: "#f1c40f", pattern: "gradient" },
  },
  {
    id: "cape-frost",
    kind: "cape",
    name: "Frost Cape",
    tagline: "Packed ice, packed style.",
    price: 1.99,
    features: ["Redeem code", "Instant delivery"],
    art: { primary: "#74b9ff", secondary: "#dfe6e9", accent: "#0984e3", pattern: "stripe" },
  },
  {
    id: "cape-creeper",
    kind: "cape",
    name: "Sssplosive Cape",
    tagline: "Green, grainy and slightly dangerous.",
    price: 2.99,
    features: ["Redeem code", "Instant delivery"],
    art: { primary: "#27ae60", secondary: "#1e8449", accent: "#0b3d20", pattern: "checker" },
  },
  {
    id: "cape-amethyst",
    kind: "cape",
    name: "Amethyst Cape",
    tagline: "Crystal shards from the geode.",
    price: 3.99,
    features: ["Redeem code", "Instant delivery"],
    art: { primary: "#6c3483", secondary: "#a569bd", accent: "#e8daef", pattern: "diamond" },
  },
  {
    id: "cape-cherry",
    kind: "cape",
    name: "Cherry Grove Cape",
    tagline: "Petals falling as you sprint.",
    price: 4.99,
    features: ["Redeem code", "Instant delivery"],
    badge: "New",
    art: { primary: "#f8a5c2", secondary: "#fdd9e5", accent: "#6d214f", pattern: "split" },
  },
  {
    id: "cape-nether",
    kind: "cape",
    name: "Netherite Cape",
    tagline: "Forged from ancient debris.",
    price: 6.99,
    features: ["Redeem code", "Instant delivery"],
    art: { primary: "#3d3537", secondary: "#5b4f52", accent: "#e0b354", pattern: "emblem" },
  },
  {
    id: "cape-emerald",
    kind: "cape",
    name: "Emerald King Cape",
    tagline: "For villagers' favorite customer.",
    price: 8.99,
    features: ["Redeem code", "Instant delivery"],
    art: { primary: "#0e6b3a", secondary: "#17dd62", accent: "#fcdb05", pattern: "emblem" },
  },
  {
    id: "cape-founder",
    kind: "cape",
    name: "RTN Founder Cape",
    tagline: "Limited RTNStore signature cape.",
    price: 9.99,
    features: ["Redeem code", "Instant delivery", "Limited run"],
    badge: "Limited",
    art: { primary: "#111111", secondary: "#fcdb05", accent: "#17dd62", pattern: "split" },
  },
];

export const PRODUCTS: Product[] = [...ACCOUNTS, ...CAPES];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

export const TELEGRAM_USERNAME = "rtnstores";
