"use client";

import { useState } from "react";
import { BarChart3 } from "lucide-react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DemandForecast, Horizon } from "@/types";
import { useHorizonSeries } from "@/hooks/useHorizonSeries";
import { ForecastTooltip } from "@/components/forecast/ForecastTooltip";
import { PanelLoading, EmptyState } from "@/components/ui/Feedback";
import { fmtDate } from "@/lib/utils/formatters";

const HORIZONS: Horizon[] = ["7D", "30D", "90D", "1Y"];

export function ForecastChart({ fullSeries, loading }: { fullSeries: DemandForecast[]; loading: boolean }) {
  const [horizon, setHorizon] = useState<Horizon>("30D");
  const data = useHorizonSeries(fullSeries, horizon);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-5 xl:p-6 h-full flex flex-col">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
              <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <h2 className="text-sm font-semibold text-slate-100 tracking-tight">Predictive Demand Analytics</h2>
          </div>
          <p className="mt-1 text-xs text-slate-500 pl-9">
            Historical actuals vs. AI-predicted demand, with confidence bounds
          </p>
        </div>
        <div className="flex items-center rounded-lg border border-slate-800 bg-slate-950/60 p-1">
          {HORIZONS.map((h) => (
            <button
              key={h}
              onClick={() => setHorizon(h)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                horizon === h
                  ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex-1 min-h-[320px]">
        {loading ? (
          <PanelLoading label="Running forecast model…" />
        ) : data.length === 0 ? (
          <EmptyState icon={BarChart3} title="No forecast data in range" description="Try a wider time horizon." />
        ) : (
          <ResponsiveContainer width="100%" height="100%" minHeight={320}>
            <ComposedChart data={data} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
              <defs>
                <linearGradient id="ciBand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 6" stroke="#1e293b" vertical={false} />
              <XAxis
                dataKey="date"
                tickFormatter={fmtDate}
                stroke="#475569"
                tick={{ fill: "#64748b", fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: "#1e293b" }}
                minTickGap={28}
              />
              <YAxis stroke="#475569" tick={{ fill: "#64748b", fontSize: 11 }} tickLine={false} axisLine={false} width={44} />
              <Tooltip content={<ForecastTooltip />} cursor={{ stroke: "#334155", strokeDasharray: "3 3" }} />
              <Legend
                verticalAlign="top"
                height={28}
                align="right"
                iconType="circle"
                iconSize={7}
                wrapperStyle={{ fontSize: 11, color: "#94a3b8" }}
              />
              <Area
                dataKey="lowerBound"
                stackId="ci"
                stroke="none"
                fill="transparent"
                isAnimationActive={false}
                legendType="none"
                name="Lower bound"
              />
              <Area
                dataKey="range"
                stackId="ci"
                stroke="none"
                fill="url(#ciBand)"
                isAnimationActive={false}
                name="Confidence interval"
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#e2e8f0"
                strokeWidth={2}
                dot={false}
                connectNulls={false}
                name="Actual demand"
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#818cf8"
                strokeWidth={2}
                strokeDasharray="5 4"
                dot={false}
                name="AI predicted"
                isAnimationActive={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
