import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { KPI } from "@/types";
import { TONE_CLASSES } from "@/components/ui/tone";

export function KPICard({ kpi }: { kpi: KPI }) {
  const tone = TONE_CLASSES[kpi.tone];
  const Icon = kpi.icon;
  const isPositive = kpi.delta >= 0;
  const deltaGood = kpi.key === "critical" ? !isPositive : isPositive;

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-5 transition-all hover:border-slate-700 ${tone.glow}`}
    >
      <div className="flex items-start justify-between">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${tone.bg} ${tone.border}`}>
          <Icon className={`w-4 h-4 ${tone.text}`} />
        </div>
        <span
          className={`inline-flex items-center gap-0.5 text-[11px] font-semibold px-1.5 py-0.5 rounded-md ${
            deltaGood ? "text-emerald-400 bg-emerald-500/10" : "text-rose-400 bg-rose-600/10"
          }`}
        >
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(kpi.delta)}%
        </span>
      </div>
      <p className="mt-4 text-2xl font-semibold tracking-tight text-slate-50 tabular-nums">{kpi.value}</p>
      <p className="mt-1 text-xs font-medium text-slate-500">{kpi.label}</p>
      <p className="mt-2 text-[10px] text-slate-600">vs. previous 30-day period</p>
    </div>
  );
}
