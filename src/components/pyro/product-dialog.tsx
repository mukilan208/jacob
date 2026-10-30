"use client";

import {
  ShieldAlert,
  Ruler,
  Timer,
  Upload,
  FileWarning,
  Target,
  BadgeCheck,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CATEGORIES, TIERS, formatUSD, type Product } from "@/lib/pyro-data";
import { ImpactMeter } from "./impact-meter";

export function ProductDialog({
  product,
  open,
  onOpenChange,
}: {
  product: Product | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  if (!product) return null;
  const tier = TIERS[product.tier];
  const cat = CATEGORIES[product.category];

  const specRows: { icon: typeof Timer; label: string; value?: string }[] = [
    { icon: Ruler, label: "Caliber / Size", value: product.specs.caliber ?? product.specs.shots },
    { icon: Timer, label: "Burn Duration", value: product.specs.duration },
    { icon: Upload, label: "Burst Height / Reach", value: product.specs.burstHeight },
    { icon: Target, label: "Minimum Safety Radius", value: product.specs.safetyRadius },
    { icon: FileWarning, label: "Classification", value: product.specs.classification },
    { icon: BadgeCheck, label: "Transport & Storage", value: product.specs.transport },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] overflow-y-auto border-zinc-800 bg-zinc-950 p-5 text-zinc-200 sm:max-w-2xl sm:p-6">
        <DialogHeader>
          <div className="mb-2 flex flex-wrap items-center gap-1.5">
            <Badge variant="outline" className={`${tier.badge} font-semibold`}>
              {tier.label} Tier
            </Badge>
            <Badge variant="outline" className="border-zinc-700 text-zinc-400">
              {cat.label}
            </Badge>
          </div>
          <DialogTitle className="text-left text-xl font-bold text-zinc-50 sm:text-2xl">
            {product.name}
          </DialogTitle>
          <DialogDescription className="text-left text-sm italic text-amber-200/80">
            {product.tagline} — {product.priceUnit}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2 rounded-lg border border-amber-400/20 bg-amber-400/5 p-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-zinc-500">
              Estimated budget range
            </div>
            <div className="text-2xl font-bold text-amber-300">
              {formatUSD(product.priceMin)} – {formatUSD(product.priceMax)}
            </div>
          </div>
          <div className="text-right text-[11px] leading-tight text-zinc-500">
            Excludes freight, permits,
            <br />
            crew &amp; insurance (adds 30–50%)
          </div>
        </div>

        <ImpactMeter value={product.impact} className="mt-4" />

        <p className="mt-4 text-sm leading-relaxed text-zinc-300">{product.description}</p>

        <div className="mt-4">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Signature Effects
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {product.effects.map((e) => (
              <span
                key={e}
                className="rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-300"
              >
                {e}
              </span>
            ))}
          </div>
        </div>

        <Separator className="my-5 bg-zinc-800" />

        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Technical Specifications
        </h4>
        <dl className="grid gap-2 sm:grid-cols-2">
          {specRows
            .filter((r) => r.value)
            .map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-3 rounded-lg border border-zinc-800/80 bg-zinc-900/50 p-3"
              >
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                <div className="min-w-0">
                  <dt className="text-[11px] uppercase tracking-wide text-zinc-500">{label}</dt>
                  <dd className="text-sm font-medium text-zinc-200">{value}</dd>
                </div>
              </div>
            ))}
        </dl>

        <div className="mt-5 rounded-lg border border-red-500/25 bg-red-500/5 p-4">
          <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-red-300">
            <ShieldAlert className="h-4 w-4" aria-hidden="true" />
            Safety Requirements
          </h4>
          <ul className="space-y-1.5">
            {product.safetyNotes.map((n) => (
              <li key={n} className="flex items-start gap-2 text-sm text-red-200/90">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red-400" aria-hidden="true" />
                {n}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 rounded-lg border border-emerald-500/25 bg-emerald-500/5 p-4">
          <h4 className="mb-2 text-sm font-semibold text-emerald-300">Best Deployed For</h4>
          <div className="flex flex-wrap gap-1.5">
            {product.bestFor.map((b) => (
              <span
                key={b}
                className="rounded-md bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-200"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-4 text-[11px] leading-relaxed text-zinc-600">
          All products are professional display fireworks (1.3G/1.4G) and may only be purchased,
          transported and fired by licensed pyrotechnic operators under NFPA 1123 and applicable
          federal, state and local law. Pricing reflects typical manufacturer/broker rates and
          fluctuates with composition, market and logistics.
        </p>
      </DialogContent>
    </Dialog>
  );
}
