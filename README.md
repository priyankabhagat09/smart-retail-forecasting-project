# Smart Retail & Inventory Forecasting System

Enterprise-grade demand intelligence and automated inventory replenishment
dashboard. Built with Next.js (App Router), TypeScript, Tailwind CSS,
Recharts, and Lucide icons.

Open https://smart-retail-forecasting-project-ll.vercel.app/

## Architecture

```
src/
├── app/                     # Next.js App Router entry points
│   ├── layout.tsx           # Root layout + ToastProvider
│   ├── page.tsx             # Renders <Dashboard />
│   └── globals.css          # Tailwind directives + base theme
│
├── types/
│   └── index.ts             # Product, InventoryItem, SalesRecord,
│                             # DemandForecast, PurchaseOrder, AIInsight, KPI…
│
├── lib/
│   ├── mock/                # Deterministic mock data generators
│   │   ├── constants.ts     # Stores, categories, suppliers, product catalog
│   │   ├── inventory.ts     # generateInventory()
│   │   ├── forecast.ts      # generateForecastSeries()
│   │   ├── insights.ts      # generateAIInsights()
│   │   └── purchaseOrders.ts# generatePurchaseOrders(), buildDraftOrder()
│   └── utils/
│       ├── random.ts        # seeded() deterministic PRNG
│       └── formatters.ts    # fmtInt, fmtCurrency, fmtDate…
│
├── hooks/                   # Data-fetching / state-management layer
│   ├── useDebounce.ts
│   ├── useInventoryData.ts  # simulated async fetch, loading/error/refetch
│   ├── useForecastData.ts
│   ├── useAIInsights.ts
│   ├── usePurchaseOrders.ts # dispatchOrder(), addDraftOrder() (optimistic)
│   ├── useKPIs.ts           # derives executive telemetry tiles
│   └── useHorizonSeries.ts  # slices forecast series by 7D/30D/90D/1Y
│
├── context/
│   └── ToastContext.tsx     # lightweight toast/notification system
│
└── components/
    ├── ui/                  # Design-system primitives
    │   ├── tone.ts           # shared status/severity color tokens
    │   ├── StatusBadge.tsx
    │   ├── Feedback.tsx       # Spinner, PanelLoading, EmptyState
    │   └── ErrorBoundary.tsx
    ├── telemetry/            # Module 1 — Executive Telemetry Bar
    │   ├── KPICard.tsx
    │   └── TelemetryBar.tsx
    ├── forecast/              # Module 2 — Predictive Demand Analytics
    │   ├── ForecastTooltip.tsx
    │   └── ForecastChart.tsx
    ├── inventory/              # Module 3 — Inventory Control Table
    │   ├── InventoryToolbar.tsx
    │   ├── RowActionButton.tsx
    │   └── InventoryTable.tsx
    ├── ai/                      # Module 4 — AI Action Center
    │   ├── AIInsightCard.tsx
    │   └── AIActionCenter.tsx
    ├── layout/
    │   ├── AppHeader.tsx
    │   └── BackgroundGlow.tsx
    └── dashboard/
        └── Dashboard.tsx        # composition root — wires hooks to UI
```

## Design tokens

| Purpose            | Color              |
| ------------------ | ------------------- |
| Canvas              | `slate-950`          |
| Surface              | `slate-900` (+ `backdrop-blur-xl`) |
| Optimal stock        | `emerald-500`         |
| Warning / reorder     | `amber-500`             |
| Critical stockout      | `rose-600`                |
| AI / telemetry accents  | `indigo-500`                 |

## Swapping mock data for real APIs

Every hook under `src/hooks/` is written so its return shape
(`{ data, loading, error, refetch }`-style) is a drop-in replacement target.
Replace the `setTimeout` + mock-generator body inside each hook with a real
`fetch`/API-route call — no changes are required in any consuming component.

## Notes

- All datasets are deterministically seeded (`src/lib/utils/random.ts`) so the
  app runs immediately with no network dependency and renders identical data
  on server and client (no hydration mismatches).
- Each dashboard module is wrapped in an `ErrorBoundary` so a failure in one
  panel never takes down the rest of the page.
