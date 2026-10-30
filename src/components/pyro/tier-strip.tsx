"use client";

import { Crown, Award, Gem } from "lucide-react";
import { TIERS, type Tier } from "@/lib/pyro-data";

const TIER_ICONS: Record<Tier, typeof Crown> = {
  signature: Award,
  flagship: Crown,
  elite: Gem,
};

export function TierStrip() {
  return (
    <section
      id="tiers"
      className="scroll-mt-20"
      aria-labelledby="tiers-heading"
    >
      <h2 id="tiers-heading" className="sr-only">
        Product tiers
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {(Object.keys(TIERS) as Tier[]).map((t) => {
          const tier = TIERS[t];
          const Icon = TIER_ICONS[t];
          return (
            <div
              key={t}
              className={`rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 ring-1 ring-transparent transition-colors hover:bg-zinc-900/70 ${tier.ring} hover:ring-2`}
            >
              <div className="mb-3 flex items-center justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800/80 ${tier.accent}`}
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`text-sm font-bold ${tier.accent}`}>{tier.range}</span>
              </div>
              <h3 className={`text-lg font-bold ${tier.accent}`}>{tier.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{tier.blurb}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
