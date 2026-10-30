"use client";

import { useMemo, useState } from "react";
import {
  Calculator,
  Clock,
  TrendingUp,
  Info,
  CircleDollarSign,
  Layers3,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  CATEGORIES,
  PRIORITY_ALLOCATIONS,
  PRODUCTS,
  TIERS,
  formatUSD,
  tierForBudget,
  type Category,
  type Priority,
  type Product,
} from "@/lib/pyro-data";

const CATEGORY_ORDER: Category[] = ["shells", "cakes", "firecrackers", "effects"];

const BAR_COLORS: Record<Category, string> = {
  shells: "bg-amber-400",
  cakes: "bg-orange-400",
  firecrackers: "bg-red-400",
  effects: "bg-yellow-200",
};

function suggestForCategory(
  category: Category,
  categoryBudget: number
): { picks: Product[]; spent: number } {
  const pool = PRODUCTS.filter(
    (p) => p.category === category && p.priceMin <= categoryBudget
  ).sort((a, b) => b.impact - a.impact);

  const picks: Product[] = [];
  let spent = 0;
  for (const p of pool) {
    const qty = Math.max(1, Math.floor(categoryBudget / Math.max(p.priceMin, 1)));
    if (qty >= 2 && picks.length === 0) {
      picks.push(p);
      spent += p.priceMin;
      if (spent + p.priceMin <= categoryBudget) {
        picks.push(p);
        spent += p.priceMin;
      }
    } else if (spent + p.priceMin <= categoryBudget && picks.length < 4) {
      picks.push(p);
      spent += p.priceMin;
    }
  }
  return { picks, spent };
}

export function BudgetPlanner() {
  const [budget, setBudget] = useState<number>(15000);
  const [duration, setDuration] = useState<number>(12);
  const [priority, setPriority] = useState<Priority>("balanced");

  const plan = useMemo(() => {
    const alloc = PRIORITY_ALLOCATIONS[priority].alloc;
    const categoryBudgets = CATEGORY_ORDER.map((c) => ({
      category: c,
      amount: Math.round(budget * alloc[c]),
    }));

    const suggestions = categoryBudgets.map((cb) => ({
      ...cb,
      ...suggestForCategory(cb.category, cb.amount),
    }));

    const committed = suggestions.reduce((s, x) => s + x.spent, 0);
    const tierRec = tierForBudget(budget);
    const shellsRecommended = Math.round(duration * (priority === "aerial" ? 32 : 24));

    return { suggestions, committed, tierRec, shellsRecommended, alloc };
  }, [budget, duration, priority]);

  const tier = TIERS[plan.tierRec.tier];

  return (
    <section
      id="planner"
      className="scroll-mt-20 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-8"
      aria-labelledby="planner-heading"
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
          <Calculator className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h2 id="planner-heading" className="text-xl font-bold text-zinc-50 sm:text-2xl">
            Display Budget Planner
          </h2>
          <p className="text-sm text-zinc-400">
            Set your product budget — get tier strategy, category allocation and a suggested build.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr] lg:gap-8">
        {/* -------- inputs -------- */}
        <div className="space-y-6 rounded-xl border border-zinc-800 bg-zinc-950/60 p-5">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <label
                htmlFor="budget-slider"
                className="flex items-center gap-2 text-sm font-medium text-zinc-300"
              >
                <CircleDollarSign className="h-4 w-4 text-amber-400" aria-hidden="true" />
                Product Budget
              </label>
              <span className="rounded-md bg-amber-400/10 px-2.5 py-1 text-sm font-bold text-amber-300">
                {formatUSD(budget)}
              </span>
            </div>
            <Slider
              id="budget-slider"
              min={2000}
              max={150000}
              step={1000}
              value={[budget]}
              onValueChange={(v) => setBudget(v[0])}
              aria-label="Total product budget in US dollars"
            />
            <div className="mt-2 flex justify-between text-[11px] text-zinc-600">
              <span>$2K</span>
              <span>$150K</span>
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <label
                htmlFor="duration-slider"
                className="flex items-center gap-2 text-sm font-medium text-zinc-300"
              >
                <Clock className="h-4 w-4 text-amber-400" aria-hidden="true" />
                Show Duration
              </label>
              <span className="rounded-md bg-amber-400/10 px-2.5 py-1 text-sm font-bold text-amber-300">
                {duration} min
              </span>
            </div>
            <Slider
              id="duration-slider"
              min={3}
              max={30}
              step={1}
              value={[duration]}
              onValueChange={(v) => setDuration(v[0])}
              aria-label="Show duration in minutes"
            />
            <div className="mt-2 flex justify-between text-[11px] text-zinc-600">
              <span>3 min</span>
              <span>30 min</span>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300">
              <TrendingUp className="h-4 w-4 text-amber-400" aria-hidden="true" />
              Program Priority
            </div>
            <Tabs value={priority} onValueChange={(v) => setPriority(v as Priority)}>
              <TabsList className="grid h-auto w-full grid-cols-3 gap-1 bg-zinc-900 p-1">
                <TabsTrigger
                  value="balanced"
                  className="px-2 py-2 text-xs data-[state=active]:bg-amber-400/15 data-[state=active]:text-amber-300"
                >
                  Balanced
                </TabsTrigger>
                <TabsTrigger
                  value="aerial"
                  className="px-2 py-2 text-xs data-[state=active]:bg-amber-400/15 data-[state=active]:text-amber-300"
                >
                  Aerial
                </TabsTrigger>
                <TabsTrigger
                  value="finale"
                  className="px-2 py-2 text-xs data-[state=active]:bg-amber-400/15 data-[state=active]:text-amber-300"
                >
                  Finale
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <p className="mt-2 text-xs leading-relaxed text-zinc-500">
              {PRIORITY_ALLOCATIONS[priority].desc}
            </p>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900/70 p-3">
            <div className="text-[11px] uppercase tracking-wider text-zinc-500">
              Recommended tier strategy
            </div>
            <div className="mt-1 flex items-center gap-2">
              <Badge variant="outline" className={`${tier.badge} font-semibold`}>
                {tier.label}
              </Badge>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">{plan.tierRec.mix}</p>
          </div>
        </div>

        {/* -------- results -------- */}
        <div className="space-y-5">
          {/* allocation bar */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-5">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-200">
              <Layers3 className="h-4 w-4 text-amber-400" aria-hidden="true" />
              Category Allocation
            </h3>
            <div
              className="flex h-4 w-full overflow-hidden rounded-full bg-zinc-800"
              role="img"
              aria-label={`Budget allocation: ${CATEGORY_ORDER.map(
                (c) => `${CATEGORIES[c].label} ${Math.round(plan.alloc[c] * 100)}%`
              ).join(", ")}`}
            >
              {plan.suggestions.map((s) => (
                <div
                  key={s.category}
                  className={`${BAR_COLORS[s.category]} h-full transition-all duration-500`}
                  style={{ width: `${plan.alloc[s.category] * 100}%` }}
                />
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {plan.suggestions.map((s) => (
                <div key={s.category} className="flex items-center gap-2 text-xs">
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${BAR_COLORS[s.category]}`}
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <div className="truncate text-zinc-400">{CATEGORIES[s.category].short}</div>
                    <div className="font-semibold text-zinc-200">{formatUSD(s.amount)}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-zinc-900/80 p-3 text-xs leading-relaxed text-zinc-500">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-500" aria-hidden="true" />
              <span>
                A {duration}-minute program at this priority typically fires ~
                <strong className="text-zinc-300">{plan.shellsRecommended} shells</strong> plus cake
                and FX support. Remember crew, permits, insurance and freight usually add
                <strong className="text-zinc-300"> 30–50%</strong> on top of product spend.
              </span>
            </div>
          </div>

          {/* suggested build */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-zinc-200">Suggested Build</h3>
              <Badge variant="outline" className="border-amber-400/30 bg-amber-400/10 text-amber-300">
                Committed ~{formatUSD(plan.committed)} of {formatUSD(budget)}
              </Badge>
            </div>
            <div className="max-h-96 space-y-4 overflow-y-auto pr-1 [scrollbar-width:thin]">
              {plan.suggestions.map((s) => (
                <div key={s.category}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      {CATEGORIES[s.category].label}
                    </span>
                    <span className="text-xs text-zinc-500">{formatUSD(s.amount)} allocated</span>
                  </div>
                  {s.picks.length === 0 ? (
                    <p className="rounded-lg border border-dashed border-zinc-800 p-3 text-xs text-zinc-600">
                      Budget slice below the entry price for this category — consider reallocating
                      or raising the total budget.
                    </p>
                  ) : (
                    <ul className="space-y-1.5">
                      {s.picks.map((p, i) => (
                        <li
                          key={`${p.id}-${i}`}
                          className="flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 rounded-lg border border-zinc-800/80 bg-zinc-900/50 px-3 py-2"
                        >
                          <span className="text-sm text-zinc-300">{p.name}</span>
                          <span className="text-xs font-medium text-amber-300/90">
                            {formatUSD(p.priceMin)} – {formatUSD(p.priceMax)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-4 text-[11px] leading-relaxed text-zinc-600">
              Suggestions are indicative mixes ranked by visual impact within each allocation.
              Quantities assume per-unit pricing; broker discounts of 10–25% typically apply at
              volume. Final selection must be validated against your site radius and permit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
