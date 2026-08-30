import { Layers, Loader2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function Spinner({ className = "w-4 h-4" }: { className?: string }) {
  return <Loader2 className={`${className} animate-spin`} />;
}

export function PanelLoading({ label = "Loading module…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-slate-500">
      <Spinner className="w-5 h-5 text-indigo-400" />
      <p className="text-xs">{label}</p>
    </div>
  );
}

export function EmptyState({
  icon: Icon = Layers,
  title,
  description,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center px-6">
      <div className="w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center">
        <Icon className="w-5 h-5 text-slate-500" />
      </div>
      <p className="text-sm font-medium text-slate-300">{title}</p>
      {description && <p className="text-xs text-slate-500 max-w-xs">{description}</p>}
    </div>
  );
}
