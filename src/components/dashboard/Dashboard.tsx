"use client";

import { useCallback, useState } from "react";
import { ChevronRight, CircleAlert } from "lucide-react";
import type { AIInsight, InventoryItem } from "@/types";
import { useInventoryData } from "@/hooks/useInventoryData";
import { useForecastData } from "@/hooks/useForecastData";
import { useAIInsights } from "@/hooks/useAIInsights";
import { usePurchaseOrders } from "@/hooks/usePurchaseOrders";
import { useKPIs } from "@/hooks/useKPIs";
import { useToast } from "@/context/ToastContext";
import { fmtCurrencyPrecise, fmtInt } from "@/lib/utils/formatters";

import { AppHeader } from "@/components/layout/AppHeader";
import { BackgroundGlow } from "@/components/layout/BackgroundGlow";
import { TelemetryBar } from "@/components/telemetry/TelemetryBar";
import { ForecastChart } from "@/components/forecast/ForecastChart";
import { AIActionCenter } from "@/components/ai/AIActionCenter";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { EmptyState } from "@/components/ui/Feedback";

export function Dashboard() {
  const { items, loading: invLoading, error: invError, refetch } = useInventoryData();
  const { series, loading: fcLoading } = useForecastData();
  const { insights, loading: aiLoading } = useAIInsights();
  const { orders, dispatchOrder, addDraftOrder } = usePurchaseOrders(items);
  const kpis = useKPIs(items, series, orders);
  const toast = useToast();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    refetch();
    setTimeout(() => setRefreshing(false), 700);
  };

  const handleDraftPO = useCallback(
    async (item: InventoryItem) => {
      await new Promise((r) => setTimeout(r, 650 + Math.random() * 400));
      const po = addDraftOrder(item);
      toast.push({
        tone: "success",
        title: `Restock PO drafted — ${item.sku}`,
        description: `${fmtInt(po.quantity)} units · ${fmtCurrencyPrecise(po.totalValue)} · ${po.supplier}`,
      });
      return po;
    },
    [addDraftOrder, toast]
  );

  const handleDispatchInsight = useCallback(
    async (insight: AIInsight) => {
      const matchingOrder = orders.find((o) => o.sku === insight.sku);
      if (matchingOrder) {
        await dispatchOrder(matchingOrder.id);
      } else {
        await new Promise((r) => setTimeout(r, 800));
      }
      toast.push({
        tone: "success",
        title: `Webhook dispatched — ${insight.sku}`,
        description: "Purchase order transmitted to upstream supplier system.",
      });
    },
    [dispatchOrder, orders, toast]
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 antialiased">
      <BackgroundGlow />
      <AppHeader onRefresh={handleRefresh} refreshing={refreshing} />

      <main className="max-w-[1600px] mx-auto px-6 py-6 space-y-6">
        <ErrorBoundary fallbackHint="The executive telemetry bar could not be rendered.">
          {invError ? (
            <EmptyState icon={CircleAlert} title="Telemetry unavailable" description={invError} />
          ) : (
            <TelemetryBar kpis={kpis} loading={invLoading} />
          )}
        </ErrorBoundary>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch">
          <div className="xl:col-span-2">
            <ErrorBoundary fallbackHint="The demand analytics chart could not be rendered.">
              <ForecastChart fullSeries={series} loading={fcLoading} />
            </ErrorBoundary>
          </div>
          <div className="xl:col-span-1">
            <ErrorBoundary fallbackHint="The AI action center could not be rendered.">
              <AIActionCenter insights={insights} loading={aiLoading} onDispatch={handleDispatchInsight} />
            </ErrorBoundary>
          </div>
        </div>

        <ErrorBoundary fallbackHint="The inventory control table could not be rendered.">
          {invError ? (
            <div className="rounded-xl border border-slate-800 bg-slate-900/60">
              <EmptyState icon={CircleAlert} title="Inventory ledger unavailable" description={invError} />
            </div>
          ) : (
            <InventoryTable items={items} loading={invLoading} onDraftPO={handleDraftPO} />
          )}
        </ErrorBoundary>

        <footer className="pt-4 pb-8 flex items-center justify-between text-[11px] text-slate-600">
          <span>Smart Retail &amp; Inventory Forecasting System · Demand Intelligence Engine v2.4</span>
          <span className="flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3" /> All figures are simulated for demonstration
          </span>
        </footer>
      </main>
    </div>
  );
}
