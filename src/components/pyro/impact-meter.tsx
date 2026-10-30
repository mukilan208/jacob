"use client";

import { Flame } from "lucide-react";

export function ImpactMeter({ value, className = "" }: { value: number; className?: string }) {
  const pct = (value / 10) * 100;
  const label =
    value >= 9.5 ? "Extreme" : value >= 8.5 ? "Exceptional" : value >= 7.5 ? "High" : "Strong";
  return (
    <div className={className} aria-label={`Visual impact ${value} out of 10, ${label}`}>
      <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-wider">
        <span className="text-zinc-500">Visual Impact</span>
        <span className="flex items-center gap-1 font-semibold text-amber-300">
          <Flame className="h-3 w-3" aria-hidden="true" />
          {value.toFixed(1)}
          <span className="text-zinc-500">/10 · {label}</span>
        </span>
      </div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={10}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
