"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, ChevronDown, Search, SlidersHorizontal, Zap } from "lucide-react";
import { Spinner } from "@/components/ui/Feedback";

interface InventoryToolbarProps {
  search: string;
  onSearch: (value: string) => void;
  categories: string[];
  activeCategories: string[];
  onToggleCategory: (category: string) => void;
  selectedCount: number;
  onBulkDraft: () => void;
  bulkDrafting: boolean;
}

export function InventoryToolbar({
  search,
  onSearch,
  categories,
  activeCategories,
  onToggleCategory,
  selectedCount,
  onBulkDraft,
  bulkDrafting,
}: InventoryToolbarProps) {
  const [catOpen, setCatOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setCatOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-800">
      <div className="relative flex-1 min-w-[220px]">
        <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search SKU, product name, or category…"
          className="w-full bg-slate-950/60 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition-all"
        />
      </div>

      <div className="relative" ref={ref}>
        <button
          onClick={() => setCatOpen((o) => !o)}
          className="flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg border border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 transition-colors"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Category
          {activeCategories.length > 0 && (
            <span className="rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] px-1.5 py-0.5 font-semibold">
              {activeCategories.length}
            </span>
          )}
          <ChevronDown className="w-3 h-3" />
        </button>
        {catOpen && (
          <div className="absolute z-20 mt-1.5 w-56 rounded-lg border border-slate-800 bg-slate-900/95 backdrop-blur-xl shadow-2xl p-1.5">
            {categories.map((c) => {
              const active = activeCategories.includes(c);
              return (
                <button
                  key={c}
                  onClick={() => onToggleCategory(c)}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs text-slate-300 hover:bg-slate-800/80 transition-colors"
                >
                  <span
                    className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                      active ? "bg-indigo-500 border-indigo-500" : "border-slate-700"
                    }`}
                  >
                    {active && <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />}
                  </span>
                  {c}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="ml-auto flex items-center gap-2">
        {selectedCount > 0 && (
          <div className="flex items-center gap-2 text-xs bg-indigo-500/10 border border-indigo-500/30 rounded-lg px-3 py-2 text-indigo-300">
            <span className="font-medium tabular-nums">{selectedCount} selected</span>
            <button
              onClick={onBulkDraft}
              disabled={bulkDrafting}
              className="flex items-center gap-1.5 font-semibold text-indigo-200 hover:text-white disabled:opacity-60 transition-colors"
            >
              {bulkDrafting ? <Spinner className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
              Bulk Auto-Draft PO
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
