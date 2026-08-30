"use client";

import { useMemo } from "react";
import { AlertOctagon, Boxes, ClipboardList, TrendingUp } from "lucide-react";
import type { DemandForecast, InventoryItem, KPI, PurchaseOrder } from "@/types";
import { fmtCurrency, fmtInt } from "@/lib/utils/formatters";

/**
 * Computes the four executive telemetry tiles. Deltas are mocked against a
 * "previous 30-day period" baseline — replace with a real trailing-period
 * comparison once historical snapshots are available server-side.
 */
export function useKPIs(
  inventory: InventoryItem[],
  forecastSeries: DemandForecast[],
  orders: PurchaseOrder[]
): KPI[] {
  return useMemo(() => {
    const totalSKUs = inventory.length;
    const criticalCount = inventory.filter((i) => i.status === "critical").length;
    const projectedDemand = forecastSeries
      .filter((d) => d.dayIndex > 0 && d.dayIndex <= 30)
      .reduce((sum, d) => sum + d.predicted, 0);
    const pendingValuation = orders
      .filter((o) => o.status === "draft" || o.status === "pending")
      .reduce((sum, o) => sum + o.totalValue, 0);

    return [
      {
        key: "skus",
        label: "Active SKUs Monitored",
        value: fmtInt(totalSKUs),
        delta: 4.2,
        icon: Boxes,
        tone: "indigo",
      },
      {
        key: "demand",
        label: "Projected 30-Day Demand",
        value: `${fmtInt(projectedDemand)} units`,
        delta: 7.8,
        icon: TrendingUp,
        tone: "indigo",
      },
      {
        key: "critical",
        label: "Critical Stockout Risk",
        value: `${fmtInt(criticalCount)} SKUs`,
        delta: criticalCount > 8 ? 12.5 : -6.1,
        icon: AlertOctagon,
        tone: "rose",
      },
      {
        key: "po",
        label: "Pending Auto-Drafted POs",
        value: fmtCurrency(pendingValuation),
        delta: 3.4,
        icon: ClipboardList,
        tone: "amber",
      },
    ];
  }, [inventory, forecastSeries, orders]);
}
