import { CalendarDays, Cloud } from "lucide-react";
import type { TooltipProps } from "recharts";
import type { DemandForecast } from "@/types";
import { fmtDate, fmtInt } from "@/lib/utils/formatters";

export function ForecastTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload || !payload.length) return null;
  const row = payload[0]?.payload as DemandForecast | undefined;
  if (!row) return null;

  const variance = row.actual != null ? (((row.actual - row.predicted) / row.predicted) * 100).toFixed(1) : null;

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-950/95 backdrop-blur-xl px-4 py-3 shadow-2xl min-w-[220px]">
      <p className="text-xs font-semibold text-slate-200">{fmtDate(row.date)}</p>
      <div className="mt-2 space-y-1.5">
        {row.actual != null && (
          <div className="flex items-center justify-between gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-slate-300" /> Actual
            </span>
            <span className="font-medium text-slate-100 tabular-nums">{fmtInt(row.actual)} units</span>
          </div>
        )}
        <div className="flex items-center justify-between gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-indigo-400" /> AI Predicted
          </span>
          <span className="font-medium text-indigo-300 tabular-nums">{fmtInt(row.predicted)} units</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-xs">
          <span className="text-slate-500">Confidence band</span>
          <span className="text-slate-400 tabular-nums">
            {fmtInt(row.lowerBound)}–{fmtInt(row.upperBound)}
          </span>
        </div>
        {variance != null && (
          <div className="flex items-center justify-between gap-4 text-xs">
            <span className="text-slate-500">Variance</span>
            <span className={`font-medium tabular-nums ${Number(variance) >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
              {Number(variance) >= 0 ? "+" : ""}
              {variance}%
            </span>
          </div>
        )}
      </div>
      <div className="mt-2.5 pt-2.5 border-t border-slate-800 space-y-1.5">
        <div className="flex items-center justify-between gap-4 text-[11px]">
          <span className="flex items-center gap-1.5 text-slate-500">
            <Cloud className="w-3 h-3" /> Weather index
          </span>
          <span className="text-slate-400 tabular-nums">{row.weatherIndex}</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-[11px]">
          <span className="flex items-center gap-1.5 text-slate-500">
            <CalendarDays className="w-3 h-3" /> Regional holiday
          </span>
          <span className="text-slate-400">{row.isHoliday ? row.holidayName : "—"}</span>
        </div>
      </div>
    </div>
  );
}
