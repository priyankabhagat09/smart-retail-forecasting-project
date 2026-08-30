import { Radio, Sparkles } from "lucide-react";
import type { AIInsight } from "@/types";
import { AIInsightCard } from "@/components/ai/AIInsightCard";
import { EmptyState, PanelLoading } from "@/components/ui/Feedback";

interface AIActionCenterProps {
  insights: AIInsight[];
  loading: boolean;
  onDispatch: (insight: AIInsight) => Promise<void>;
}

export function AIActionCenter({ insights, loading, onDispatch }: AIActionCenterProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl h-full flex flex-col">
      <div className="flex items-center justify-between px-5 pt-5 pb-4">
        <div className="flex items-center gap-2">
          <div className="relative w-7 h-7 rounded-md bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
            <Radio className="w-3.5 h-3.5 text-indigo-400" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-100 tracking-tight">AI Action Center</h2>
            <p className="text-[10.5px] text-slate-500">Live anomaly &amp; recommendation feed</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2.5 max-h-[560px]">
        {loading ? (
          <PanelLoading label="Scanning telemetry streams…" />
        ) : insights.length === 0 ? (
          <EmptyState icon={Sparkles} title="No active signals" description="The model has not flagged any anomalies this cycle." />
        ) : (
          insights.map((insight) => <AIInsightCard key={insight.id} insight={insight} onDispatch={onDispatch} />)
        )}
      </div>
    </div>
  );
}
