"use client";

import { useState } from "react";
import { CheckCircle2, Zap } from "lucide-react";
import type { InventoryItem, PurchaseOrder } from "@/types";
import { Spinner } from "@/components/ui/Feedback";

type DraftStatus = "idle" | "drafting" | "drafted";

interface RowActionButtonProps {
  item: InventoryItem;
  onDraft: (item: InventoryItem) => Promise<PurchaseOrder | void>;
}

export function RowActionButton({ item, onDraft }: RowActionButtonProps) {
  const [status, setStatus] = useState<DraftStatus>("idle");

  const handleClick = async () => {
    if (status !== "idle") return;
    setStatus("drafting");
    await onDraft(item); // optimistic UI — resolves after simulated network latency
    setStatus("drafted");
  };

  if (status === "drafted") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 px-2.5 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/30">
        <CheckCircle2 className="w-3.5 h-3.5" />
        PO Drafted
      </span>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={status === "drafting"}
      className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-300 px-2.5 py-1.5 rounded-md bg-slate-800/80 border border-slate-700 hover:border-indigo-500/40 hover:text-indigo-300 disabled:opacity-70 transition-colors"
    >
      {status === "drafting" ? <Spinner className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
      {status === "drafting" ? "Drafting…" : "Auto-Draft Restock PO"}
    </button>
  );
}
