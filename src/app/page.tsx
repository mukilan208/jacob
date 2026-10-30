"use client";

import { useMemo, useState } from "react";
import {
  Flame,
  Rocket,
  Layers,
  Zap,
  Sparkles,
  Search,
  SlidersHorizontal,
  PackageOpen,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CATEGORIES,
  PRODUCTS,
  TIERS,
  type Category,
  type Product,
  type Tier,
} from "@/lib/pyro-data";
import { FireworksCanvas } from "@/components/pyro/fireworks-canvas";
import { ProductCard } from "@/components/pyro/product-card";
import { ProductDialog } from "@/components/pyro/product-dialog";
import { BudgetPlanner } from "@/components/pyro/budget-planner";
import { SafetySection } from "@/components/pyro/safety-section";
import { TierStrip } from "@/components/pyro/tier-strip";
import { Button } from "@/components/ui/button";

const CAT_ICONS: Record<Category, typeof Rocket> = {
  shells: Rocket,
  cakes: Layers,
  firecrackers: Zap,
  effects: Sparkles,
};

type SortKey = "impact" | "price-asc" | "price-desc";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "impact", label: "Highest impact" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "price-asc", label: "Price: low to high" },
];

export default function Home() {
  const [category, setCategory] = useState<Category | "all">("all");
  const [tier, setTier] = useState<Tier | "all">("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("impact");
  const [selected, setSelected] = useState<Product | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = PRODUCTS.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (tier !== "all" && p.tier !== tier) return false;
      if (q) {
        const hay = `${p.name} ${p.tagline} ${p.description} ${p.effects.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    list.sort((a, b) => {
      if (sort === "impact") return b.impact - a.impact;
      if (sort === "price-asc") return a.priceMin - b.priceMin;
      return b.priceMax - a.priceMax;
    });
    return list;
  }, [category, tier, query, sort]);

  const stats = useMemo(
    () => ({
      products: PRODUCTS.length,
      categories: Object.keys(CATEGORIES).length,
      maxImpact: Math.max(...PRODUCTS.map((p) => p.impact)),
      topTier: TIERS.elite.range,
    }),
    []
  );

  const openProduct = (p: Product) => {
    setSelected(p);
    setDialogOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-200 antialiased">
      {/* ---------------- header ---------------- */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2.5" aria-label="Pyro Prestige home">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-red-500 text-zinc-950">
              <Flame className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-base font-black tracking-tight text-zinc-50 sm:text-lg">
              PYRO <span className="text-amber-400">PRESTIGE</span>
            </span>
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            <a
              href="#catalog"
              className="rounded-md px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
            >
              Catalog
            </a>
            <a
              href="#planner"
              className="rounded-md px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
            >
              Budget Planner
            </a>
            <a
              href="#safety"
              className="rounded-md px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
            >
              Safety
            </a>
          </nav>
          <Button
            asChild
            size="sm"
            className="bg-gradient-to-r from-amber-400 to-orange-500 font-semibold text-zinc-950 hover:from-amber-300 hover:to-orange-400"
          >
            <a href="#planner">Plan a Display</a>
          </Button>
        </div>
      </header>

      <main id="top" className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6">
        {/* ---------------- hero ---------------- */}
        <section className="relative -mx-4 overflow-hidden sm:-mx-6" aria-labelledby="hero-heading">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-[#120d06] to-zinc-950" />
          <div className="absolute inset-0 opacity-90">
            <FireworksCanvas />
          </div>
          <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 pb-16 pt-20 text-center sm:pb-24 sm:pt-28">
            <p className="mb-4 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-300">
              Premium Pyrotechnics · High-Budget Display Catalog
            </p>
            <h1
              id="hero-heading"
              className="text-balance text-4xl font-black leading-tight tracking-tight text-zinc-50 sm:text-6xl"
            >
              Engineer the <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-red-400 bg-clip-text text-transparent">Sky.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg">
              A curated catalog of the world&rsquo;s most spectacular display shells, cake
              assortments and salute systems — ranked by visual impact, specified for safety, and
              priced by tier. Built for planners of once-in-a-lifetime shows.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 bg-gradient-to-r from-amber-400 to-orange-500 px-8 font-bold text-zinc-950 hover:from-amber-300 hover:to-orange-400"
              >
                <a href="#catalog">Explore the Catalog</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 border-zinc-700 bg-zinc-900/50 px-8 font-semibold text-zinc-200 hover:bg-zinc-800 hover:text-white"
              >
                <a href="#planner">Plan Your Budget</a>
              </Button>
            </div>

            <dl className="mt-14 grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Curated Products", value: String(stats.products) },
                { label: "Categories", value: String(stats.categories) },
                { label: "Max Impact Rating", value: `${stats.maxImpact.toFixed(1)}/10` },
                { label: "Elite Range", value: stats.topTier },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-zinc-800/80 bg-zinc-950/70 px-3 py-4 backdrop-blur-sm"
                >
                  <dd className="text-lg font-bold text-amber-300 sm:text-xl">{s.value}</dd>
                  <dt className="mt-0.5 text-[11px] uppercase tracking-wider text-zinc-500">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---------------- tier strip ---------------- */}
        <div className="mt-4">
          <TierStrip />
        </div>

        {/* ---------------- catalog ---------------- */}
        <section id="catalog" className="mt-16 scroll-mt-20" aria-labelledby="catalog-heading">
          <div className="mb-6">
            <h2 id="catalog-heading" className="text-2xl font-bold text-zinc-50 sm:text-3xl">
              The Premium Catalog
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              Every item is professional-grade display pyrotechnics, specified with visual impact
              rating, NFPA-aligned safety radius and a realistic budget range. Open any product for
              full technical specs.
            </p>
          </div>

          {/* category tabs */}
          <Tabs value={category} onValueChange={(v) => setCategory(v as Category | "all")}>
            <TabsList className="h-auto w-full flex-wrap justify-start gap-1 bg-zinc-900/70 p-1.5">
              <TabsTrigger
                value="all"
                className="gap-1.5 px-3 py-2 text-xs data-[state=active]:bg-amber-400/15 data-[state=active]:text-amber-300 sm:text-sm"
              >
                <PackageOpen className="h-4 w-4" aria-hidden="true" />
                All <span className="text-zinc-500">({PRODUCTS.length})</span>
              </TabsTrigger>
              {(Object.keys(CATEGORIES) as Category[]).map((c) => {
                const Icon = CAT_ICONS[c];
                const count = PRODUCTS.filter((p) => p.category === c).length;
                return (
                  <TabsTrigger
                    key={c}
                    value={c}
                    className="gap-1.5 px-3 py-2 text-xs data-[state=active]:bg-amber-400/15 data-[state=active]:text-amber-300 sm:text-sm"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {CATEGORIES[c].short} <span className="text-zinc-500">({count})</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>

          {category !== "all" && (
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              {CATEGORIES[category].blurb}
            </p>
          )}

          {/* search + sort row */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
                aria-hidden="true"
              />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search effects, names, use cases…"
                className="border-zinc-800 bg-zinc-900/70 pl-9 text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-amber-400/40"
                aria-label="Search products"
              />
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 shrink-0 text-zinc-500" aria-hidden="true" />
              <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
                <SelectTrigger
                  className="w-[190px] border-zinc-800 bg-zinc-900/70 text-zinc-300 focus:ring-amber-400/40"
                  aria-label="Sort products"
                >
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="border-zinc-800 bg-zinc-950 text-zinc-300">
                  {SORTS.map((s) => (
                    <SelectItem key={s.key} value={s.key}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* tier filter chips */}
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter by tier">
            <button
              onClick={() => setTier("all")}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                tier === "all"
                  ? "border-zinc-500 bg-zinc-800 text-zinc-100"
                  : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
              }`}
              aria-pressed={tier === "all"}
            >
              All Tiers
            </button>
            {(Object.keys(TIERS) as Tier[]).map((t) => (
              <button
                key={t}
                onClick={() => setTier(tier === t ? "all" : t)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  tier === t
                    ? `${TIERS[t].badge} border`
                    : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                }`}
                aria-pressed={tier === t}
              >
                {TIERS[t].label} · {TIERS[t].range}
              </button>
            ))}
          </div>

          {/* grid */}
          {filtered.length > 0 ? (
            <div className="mt-6 grid gap-4 pb-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} onOpen={openProduct} />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-dashed border-zinc-800 p-10 text-center">
              <PackageOpen className="mx-auto h-8 w-8 text-zinc-600" aria-hidden="true" />
              <p className="mt-3 text-sm text-zinc-400">No products match those filters.</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                onClick={() => {
                  setCategory("all");
                  setTier("all");
                  setQuery("");
                }}
              >
                Reset filters
              </Button>
            </div>
          )}
        </section>

        {/* ---------------- planner ---------------- */}
        <div className="mt-16">
          <BudgetPlanner />
        </div>

        {/* ---------------- safety ---------------- */}
        <div className="mt-10 mb-14">
          <SafetySection />
        </div>
      </main>

      {/* ---------------- footer ---------------- */}
      <footer className="mt-auto border-t border-zinc-800/80 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-amber-400 to-red-500 text-zinc-950">
                <Flame className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-sm font-bold text-zinc-300">
                PYRO <span className="text-amber-400">PRESTIGE</span>
              </span>
            </div>
            <nav aria-label="Footer" className="flex items-center gap-4 text-xs text-zinc-500">
              <a href="#catalog" className="hover:text-zinc-300">
                Catalog
              </a>
              <a href="#planner" className="hover:text-zinc-300">
                Planner
              </a>
              <a href="#safety" className="hover:text-zinc-300">
                Safety
              </a>
            </nav>
          </div>
          <p className="mt-6 text-center text-[11px] leading-relaxed text-zinc-600 sm:text-left">
            Planning reference only. All catalog items are professional display fireworks that may
            only be acquired, stored, transported and fired by licensed pyrotechnic operators
            subject to NFPA 1123, ATF regulations and local ordinances. Always confirm site radii,
            permits and insurance before purchase.
          </p>
        </div>
      </footer>

      <ProductDialog product={selected} open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}
