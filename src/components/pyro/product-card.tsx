"use client";

import {
  Layers,
  Rocket,
  Sparkles,
  Zap,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORIES, TIERS, formatUSD, type Product } from "@/lib/pyro-data";
import { ImpactMeter } from "./impact-meter";

const ICONS: Record<string, typeof Rocket> = {
  Rocket,
  Layers,
  Zap,
  Sparkles,
};

export function ProductCard({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: (p: Product) => void;
}) {
  const tier = TIERS[product.tier];
  const cat = CATEGORIES[product.category];
  const Icon = ICONS[cat.icon] ?? Rocket;

  return (
    <article
      className={`group flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 ring-1 ring-transparent transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900 hover:shadow-lg hover:shadow-black/40 ${tier.ring} hover:ring-2`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800/80 text-amber-400"
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex flex-wrap justify-end gap-1.5">
          <Badge variant="outline" className={`${tier.badge} font-semibold tracking-wide`}>
            {tier.label}
          </Badge>
          <Badge variant="outline" className="border-zinc-700 text-zinc-400">
            {cat.short}
          </Badge>
        </div>
      </div>

      <h3 className="text-base font-bold leading-snug text-zinc-100 sm:text-lg">
        {product.name}
      </h3>
      <p className="mt-1 text-xs italic text-amber-200/70">{product.tagline}</p>

      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-400">
        {product.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {product.effects.slice(0, 3).map((e) => (
          <span
            key={e}
            className="rounded-md bg-zinc-800/70 px-2 py-0.5 text-[11px] text-zinc-300"
          >
            {e}
          </span>
        ))}
      </div>

      <ImpactMeter value={product.impact} className="mt-4" />

      <div className="mt-4 flex items-end justify-between gap-2 border-t border-zinc-800 pt-4">
        <div>
          <div className="text-lg font-bold text-zinc-50 sm:text-xl">
            {formatUSD(product.priceMin)} – {formatUSD(product.priceMax)}
          </div>
          <div className="text-[11px] text-zinc-500">{product.priceUnit}</div>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="gap-1 text-amber-300 hover:bg-amber-400/10 hover:text-amber-200"
          onClick={() => onOpen(product)}
          aria-label={`View full specs and safety details for ${product.name}`}
        >
          Specs
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-zinc-500">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500/80" aria-hidden="true" />
        <span className="truncate">{product.specs.safetyRadius}</span>
      </div>
    </article>
  );
}
