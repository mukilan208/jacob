"use client";

import { ShieldCheck, TriangleAlert, ClipboardCheck, Wind } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { COMPLIANCE_CHECKLIST, SAFETY_DISTANCES } from "@/lib/pyro-data";

export function SafetySection() {
  return (
    <section
      id="safety"
      className="scroll-mt-20 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-8"
      aria-labelledby="safety-heading"
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
          <ShieldCheck className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h2 id="safety-heading" className="text-xl font-bold text-zinc-50 sm:text-2xl">
            Safety Specs &amp; Compliance
          </h2>
          <p className="text-sm text-zinc-400">
            High-budget displays are engineering projects. These are the constraints that shape
            every product choice above.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* distances table */}
        <div className="min-w-0 rounded-xl border border-zinc-800 bg-zinc-950/60 p-5">
          <h3 className="mb-1 flex items-center gap-2 text-sm font-semibold text-zinc-200">
            <TriangleAlert className="h-4 w-4 text-amber-400" aria-hidden="true" />
            NFPA 1123 Minimum Site Radii
          </h3>
          <p className="mb-4 text-xs leading-relaxed text-zinc-500">
            Distances from mortars to spectator lines, scaled by the largest caliber fired. Your
            venue is only eligible for products whose radius fits inside it.
          </p>
          <div className="overflow-x-auto rounded-lg border border-zinc-800">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableHead className="text-zinc-400">Product Class</TableHead>
                  <TableHead className="text-zinc-400">Min. Radius</TableHead>
                  <TableHead className="text-zinc-400">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SAFETY_DISTANCES.map((d) => (
                  <TableRow key={d.caliber} className="border-zinc-800/70">
                    <TableCell className="whitespace-nowrap font-medium text-zinc-200">
                      {d.caliber}
                    </TableCell>
                    <TableCell className="whitespace-nowrap font-semibold text-amber-300">
                      {d.radius}
                    </TableCell>
                    <TableCell className="text-xs text-zinc-500">{d.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-400/20 bg-amber-400/5 p-3 text-xs leading-relaxed text-amber-200/80">
            <Wind className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            Wind is the multiplier: kamuro, willow and titanium effects drift fallout far downwind.
            File a written fallout plan with your permit application.
          </div>
        </div>

        {/* compliance checklist */}
        <div className="min-w-0 rounded-xl border border-zinc-800 bg-zinc-950/60 p-5">
          <h3 className="mb-1 flex items-center gap-2 text-sm font-semibold text-zinc-200">
            <ClipboardCheck className="h-4 w-4 text-emerald-400" aria-hidden="true" />
            Licensing &amp; Compliance Checklist
          </h3>
          <p className="mb-4 text-xs leading-relaxed text-zinc-500">
            Five gates every premium display passes before a single mortar is loaded.
          </p>
          <ol className="space-y-3">
            {COMPLIANCE_CHECKLIST.map((item, i) => (
              <li
                key={item.title}
                className="flex gap-3 rounded-lg border border-zinc-800/80 bg-zinc-900/50 p-3.5"
              >
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 text-xs font-bold text-emerald-300"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-200">{item.title}</h4>
                  <p className="mt-0.5 text-xs leading-relaxed text-zinc-400">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
