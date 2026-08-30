import type { AIInsight } from "@/types";

/**
 * Static curated feed standing in for a real-time anomaly-detection stream.
 * In production this would be sourced from a streaming inference service.
 */
export function generateAIInsights(): AIInsight[] {
  return [
    {
      id: "AI-1",
      severity: "critical",
      sku: "SKU-9920",
      title: "Demand spike detected — Northeast Hub",
      description:
        "SKU-9920 demand spike (+42% MoM) detected in Northeast Hub. Model attributes 68% of the variance to regional weather divergence.",
      recommendedAction: "Increase safety stock by +350 units before next replenishment cycle.",
      region: "Northeast Hub",
      timestamp: "2 minutes ago",
    },
    {
      id: "AI-2",
      severity: "warning",
      sku: "SKU-4471",
      title: "Velocity slowdown — Midwest Distribution",
      description:
        "Sell-through pace has dropped 19% over trailing 14 days, diverging from seasonal baseline for this category.",
      recommendedAction: "Hold current PO; re-evaluate reorder quantity next cycle.",
      region: "Midwest Distribution",
      timestamp: "18 minutes ago",
    },
    {
      id: "AI-3",
      severity: "critical",
      sku: "SKU-7742",
      title: "Stockout risk within 48 hours",
      description:
        "Projected run-out for SKU-7742 falls inside the current supplier lead-time window at West Coast Metro.",
      recommendedAction: "Auto-draft expedited restock PO — priority freight recommended.",
      region: "West Coast Metro",
      timestamp: "31 minutes ago",
    },
    {
      id: "AI-4",
      severity: "info",
      sku: "SKU-2208",
      title: "Overstock consolidation opportunity",
      description: "Southwest Flagship is carrying 61 days of cover, well above target band for this category.",
      recommendedAction: "Consider inter-store transfer to Northeast Hub before markdown.",
      region: "Southwest Flagship",
      timestamp: "1 hour ago",
    },
    {
      id: "AI-5",
      severity: "warning",
      sku: "SKU-5561",
      title: "Exogenous factor: upcoming holiday window",
      description:
        "A regional promotional holiday in 9 days historically correlates with a 1.3x demand multiplier for this category.",
      recommendedAction: "Pre-position +180 units ahead of the promotional window.",
      region: "West Coast Metro",
      timestamp: "2 hours ago",
    },
  ];
}
