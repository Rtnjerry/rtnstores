import type { Product } from "@/lib/products";

function shade(hex: string, amount: number): string {
  const n = parseInt(hex.slice(1), 16);
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  const r = clamp((n >> 16) + amount);
  const g = clamp(((n >> 8) & 0xff) + amount);
  const b = clamp((n & 0xff) + amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

/** 8x8 Minecraft-style head used as the account "photo". */
export function PixelHead({ art, size = 128 }: { art: Product["art"]; size?: number }) {
  const skin = art.primary;
  const hair = art.secondary;
  const eye = art.accent;
  // H = hair, S = skin, D = darker skin, W = eye white, E = eye, M = mouth
  const grid = [
    "HHHHHHHH",
    "HHHHHHHH",
    "HSSSSSSH",
    "SSSSSSSS",
    "SWESSEWS",
    "SSSDDSSS",
    "SSMMMMSS",
    "SSSSSSSS",
  ];
  const color: Record<string, string> = {
    H: hair,
    S: skin,
    D: shade(skin, -35),
    W: "#ffffff",
    E: eye,
    M: shade(skin, -70),
  };
  return (
    <svg viewBox="0 0 8 8" width={size} height={size} shapeRendering="crispEdges" aria-hidden>
      {grid.flatMap((row, y) =>
        row.split("").map((c, x) => <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={color[c]} />),
      )}
      {/* subtle top-left highlight */}
      <rect x={0} y={0} width={8} height={1} fill="#ffffff" opacity={0.12} />
    </svg>
  );
}

/** 10x16 cape back texture. */
export function PixelCape({ art, size = 128 }: { art: Product["art"]; size?: number }) {
  const { primary, secondary, accent, pattern = "solid" } = art;
  const cells: { x: number; y: number; fill: string }[] = [];
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 10; x++) {
      let fill = primary;
      switch (pattern) {
        case "stripe":
          fill = (x + y) % 4 < 2 ? primary : secondary;
          break;
        case "checker":
          fill = (x + y) % 2 === 0 ? primary : secondary;
          if ((x * 7 + y * 3) % 11 === 0) fill = accent;
          break;
        case "diamond": {
          const d = Math.abs(x - 4.5) + Math.abs(y - 7.5);
          fill = d < 3 ? accent : d < 6 ? secondary : primary;
          break;
        }
        case "split":
          fill = x < 5 ? primary : secondary;
          if (y === 7 || y === 8) fill = accent;
          break;
        case "emblem": {
          fill = primary;
          const inEmblem = x >= 3 && x <= 6 && y >= 5 && y <= 10;
          if (inEmblem) fill = (x === 3 || x === 6 || y === 5 || y === 10) ? accent : secondary;
          if (x === 0 || x === 9) fill = shade(primary, -25);
          break;
        }
        case "gradient":
          fill = y < 5 ? accent : y < 11 ? secondary : primary;
          if ((x + y * 3) % 7 === 0) fill = shade(fill, 30);
          break;
      }
      cells.push({ x, y, fill });
    }
  }
  const h = size;
  const w = (size * 10) / 16;
  return (
    <svg viewBox="0 0 10 16" width={w} height={h} shapeRendering="crispEdges" aria-hidden>
      {cells.map((c) => (
        <rect key={`${c.x}-${c.y}`} x={c.x} y={c.y} width={1} height={1} fill={c.fill} />
      ))}
      <rect x={0} y={0} width={10} height={1} fill="#000" opacity={0.25} />
    </svg>
  );
}

export function ProductArt({ product, size }: { product: Product; size?: number }) {
  return product.kind === "account" ? <PixelHead art={product.art} size={size} /> : <PixelCape art={product.art} size={size} />;
}
