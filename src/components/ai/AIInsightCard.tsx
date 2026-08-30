"use client";

import { useState } from "react";
import { CheckCircle2, Send, Zap } from "lucide-react";
import type { AIInsight } from "@/types";
import { SEVERITY_META, TONE_CLASSES } from "@/components/ui/tone";
import { Spinner } from "@/components/ui/Feedback";

type DispatchStatus = "idle" | "dispatching" | "dispatched";

interface AIInsightCardProps {
  insight: AIInsight;
  onDispatch: (insight: AIInsight) => Promise<void>;
}

export function AIInsightCard({ insight, onDispatch }: AIInsightCardProps) {
  const [state, setState] = useState<DispatchStatus>("idle");
  const meta = SEVERITY_META[insight.severity];
  const tone = TONE_CLASSES[meta.tone];

  const handleDispatch = async () => {
    if (state !== "idle") return;
    setState("dispatching");
    await onDispatch(insight);
    setState("dispatched");
  };

  return (
    <div className={`rounded-lg border ${tone.border} ${tone.bg} p-3.5`}>
      <div className="flex items-start gap-2.5">
        <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${tone.bg} border ${tone.border}`}>
          <meta.Icon className={`w-3.5 h-3.5 ${tone.text}`} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold text-slate-100">{insight.title}</p>
            <span className="text-[10px] text-slate-500 shrink-0">{insight.timestamp}</span>
          </div>
          <p className="mt-1 text-[11.5px] leading-relaxed text-slate-400">{insight.description}</p>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-300 font-medium">
            <Zap className={`w-3 h-3 ${tone.text}`} />
            {insight.recommendedAction}
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-500">
              {insight.sku} · {insight.region}
            </span>
            {state === "dispatched" ? (
              <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-emerald-400">
                <CheckCircle2 className="w-3 h-3" /> Dispatched to supplier
              </span>
            ) : (
              <button
                onClick={handleDispatch}
                disabled={state === "dispatching"}
                className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-slate-200 hover:text-white bg-slate-800/80 border border-slate-700 rounded-md px-2 py-1 disabled:opacity-70 transition-colors"
              >
                {state === "dispatching" ? <Spinner className="w-3 h-3" /> : <Send className="w-3 h-3" />}
                {state === "dispatching" ? "Dispatching…" : "Dispatch PO"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
