"use client";

import { useEffect, useMemo, useState } from "react";
import { Package, Search } from "lucide-react";
import type { InventoryItem, PurchaseOrder } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";
import { CATEGORIES } from "@/lib/mock/constants";
import { fmtInt } from "@/lib/utils/formatters";
import { InventoryToolbar } from "@/components/inventory/InventoryToolbar";
import { RowActionButton } from "@/components/inventory/RowActionButton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState, PanelLoading } from "@/components/ui/Feedback";

const PAGE_SIZE = 10;

interface InventoryTableProps {
  items: InventoryItem[];
  loading: boolean;
  onDraftPO: (item: InventoryItem) => Promise<PurchaseOrder | void>;
}

export function InventoryTable({ items, loading, onDraftPO }: InventoryTableProps) {
  const [searchRaw, setSearchRaw] = useState("");
  const search = useDebounce(searchRaw, 300);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkDrafting, setBulkDrafting] = useState(false);
  const [page, setPage] = useState(1);

  const toggleCategory = (c: string) => {
    setActiveCategories((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
    setPage(1);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((i) => {
      const matchesQuery =
        !q || i.sku.toLowerCase().includes(q) || i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q);
      const matchesCategory = activeCategories.length === 0 || activeCategories.includes(i.category);
      return matchesQuery && matchesCategory;
    });
  }, [items, search, activeCategories]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => setPage(1), [search, activeCategories]);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAllOnPage = () => {
    const allSelected = pageItems.every((i) => selected.has(i.id));
    setSelected((prev) => {
      const next = new Set(prev);
      pageItems.forEach((i) => (allSelected ? next.delete(i.id) : next.add(i.id)));
      return next;
    });
  };

  const handleBulkDraft = async () => {
    setBulkDrafting(true);
    const targets = items.filter((i) => selected.has(i.id));
    await Promise.all(targets.map((i) => onDraftPO(i)));
    setBulkDrafting(false);
    setSelected(new Set());
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 pt-5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center">
            <Package className="w-3.5 h-3.5 text-slate-300" />
          </div>
          <h2 className="text-sm font-semibold text-slate-100 tracking-tight">Inventory Control</h2>
        </div>
        <span className="text-xs text-slate-500 tabular-nums">{fmtInt(filtered.length)} SKUs</span>
      </div>

      <InventoryToolbar
        search={searchRaw}
        onSearch={setSearchRaw}
        categories={CATEGORIES}
        activeCategories={activeCategories}
        onToggleCategory={toggleCategory}
        selectedCount={selected.size}
        onBulkDraft={handleBulkDraft}
        bulkDrafting={bulkDrafting}
      />

      {loading ? (
        <PanelLoading label="Fetching inventory ledger…" />
      ) : filtered.length === 0 ? (
        <EmptyState icon={Search} title="No matching SKUs" description="Adjust your search term or category filters to see results." />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-800">
                  <th className="py-2.5 pl-5 pr-2 w-8">
                    <input
                      type="checkbox"
                      checked={pageItems.length > 0 && pageItems.every((i) => selected.has(i.id))}
                      onChange={toggleSelectAllOnPage}
                      className="w-3.5 h-3.5 rounded accent-indigo-500 cursor-pointer"
                    />
                  </th>
                  <th className="py-2.5 px-3 font-medium">SKU</th>
                  <th className="py-2.5 px-3 font-medium">Product</th>
                  <th className="py-2.5 px-3 font-medium hidden lg:table-cell">Category</th>
                  <th className="py-2.5 px-3 font-medium text-right">On-Hand</th>
                  <th className="py-2.5 px-3 font-medium text-right hidden md:table-cell">14D Forecast</th>
                  <th className="py-2.5 px-3 font-medium text-right">Run-out</th>
                  <th className="py-2.5 px-3 font-medium">Status</th>
                  <th className="py-2.5 pr-5 pl-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((item) => (
                  <tr key={item.id} className="text-xs border-b border-slate-800/70 hover:bg-slate-800/30 transition-colors group">
                    <td className="py-3 pl-5 pr-2">
                      <input
                        type="checkbox"
                        checked={selected.has(item.id)}
                        onChange={() => toggleSelect(item.id)}
                        className="w-3.5 h-3.5 rounded accent-indigo-500 cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-400 tabular-nums">{item.sku}</td>
                    <td className="py-3 px-3">
                      <p className="font-medium text-slate-200">{item.name}</p>
                      <p className="text-[10.5px] text-slate-500">{item.storeName}</p>
                    </td>
                    <td className="py-3 px-3 hidden lg:table-cell text-slate-400">{item.category}</td>
                    <td className="py-3 px-3 text-right font-medium text-slate-200 tabular-nums">{fmtInt(item.onHandStock)}</td>
                    <td className="py-3 px-3 text-right hidden md:table-cell text-indigo-300 tabular-nums">
                      {fmtInt(item.forecast14Day)}
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums text-slate-300">{item.daysOfRunout}d</td>
                    <td className="py-3 px-3">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="py-3 pr-5 pl-3 text-right">
                      <RowActionButton item={item} onDraft={onDraftPO} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-800 text-xs text-slate-500">
            <span>
              Showing{" "}
              <span className="text-slate-300 font-medium tabular-nums">
                {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)}
              </span>{" "}
              of <span className="text-slate-300 font-medium tabular-nums">{filtered.length}</span>
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-2.5 py-1 rounded-md border border-slate-800 disabled:opacity-40 hover:border-slate-700 transition-colors"
              >
                Prev
              </button>
              <span className="px-2 tabular-nums">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-2.5 py-1 rounded-md border border-slate-800 disabled:opacity-40 hover:border-slate-700 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
