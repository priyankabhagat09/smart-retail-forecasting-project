import { Boxes, RefreshCw } from "lucide-react";

interface AppHeaderProps {
  onRefresh: () => void;
  refreshing: boolean;
}

export function AppHeader({ onRefresh, refreshing }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500/20 to-indigo-500/5 border border-indigo-500/30 flex items-center justify-center">
            <Boxes className="w-4.5 h-4.5 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-[15px] font-semibold text-slate-50 tracking-tight leading-tight">
              Smart Retail &amp; Inventory Forecasting
            </h1>
            <p className="text-[11px] text-slate-500 leading-tight">Enterprise Demand Intelligence Platform</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-2.5 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live telemetry
          </div>
          <button
            onClick={onRefresh}
            disabled={refreshing}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-300 border border-slate-800 rounded-lg px-3 py-2 hover:border-slate-700 hover:text-white disabled:opacity-60 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>
    </header>
  );
}
