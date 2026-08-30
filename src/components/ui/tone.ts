import { AlertOctagon, AlertTriangle, CheckCircle2, Layers, ShieldAlert, Sparkles } from "lucide-react";
import type { InsightSeverity, StockStatus } from "@/types";

export type Tone = "emerald" | "amber" | "rose" | "indigo";

export const TONE_CLASSES: Record<
  Tone,
  { text: string; bg: string; border: string; dot: string; glow: string }
> = {
  emerald: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    dot: "bg-emerald-400",
    glow: "shadow-[0_0_0_1px_rgba(16,185,129,0.15)]",
  },
  amber: {
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    dot: "bg-amber-400",
    glow: "shadow-[0_0_0_1px_rgba(245,158,11,0.15)]",
  },
  rose: {
    text: "text-rose-400",
    bg: "bg-rose-600/10",
    border: "border-rose-600/30",
    dot: "bg-rose-500",
    glow: "shadow-[0_0_0_1px_rgba(225,29,72,0.15)]",
  },
  indigo: {
    text: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/30",
    dot: "bg-indigo-400",
    glow: "shadow-[0_0_0_1px_rgba(99,102,241,0.15)]",
  },
};

export const STATUS_META: Record<StockStatus, { label: string; tone: Tone; Icon: typeof AlertOctagon }> = {
  critical: { label: "Critical", tone: "rose", Icon: AlertOctagon },
  reorder: { label: "Reorder", tone: "amber", Icon: AlertTriangle },
  optimal: { label: "Optimal", tone: "emerald", Icon: CheckCircle2 },
  overstocked: { label: "Overstocked", tone: "indigo", Icon: Layers },
};

export const SEVERITY_META: Record<InsightSeverity, { tone: Tone; Icon: typeof ShieldAlert }> = {
  critical: { tone: "rose", Icon: ShieldAlert },
  warning: { tone: "amber", Icon: AlertTriangle },
  info: { tone: "indigo", Icon: Sparkles },
};
