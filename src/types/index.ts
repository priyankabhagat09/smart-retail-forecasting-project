/**
 * Domain types for the Smart Retail & Inventory Forecasting System.
 * Kept in a single module so hooks, mock data generators, and components
 * all consume one authoritative source of truth.
 */

export interface Store {
  id: string;
  name: string;
}

export interface Product {
  sku: string;
  name: string;
  category: string;
  unitCost: number;
  supplier: string;
}

export type StockStatus = "critical" | "reorder" | "optimal" | "overstocked";

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  storeId: string;
  storeName: string;
  onHandStock: number;
  forecast14Day: number;
  dailyVelocity: number;
  daysOfRunout: number;
  status: StockStatus;
  unitCost: number;
  reorderQty: number;
}

export interface SalesRecord {
  date: string;
  sku: string;
  storeId: string;
  unitsSold: number;
}

export interface DemandForecast {
  dayIndex: number;
  date: string;
  actual: number | null;
  predicted: number;
  lowerBound: number;
  upperBound: number;
  /** upperBound - lowerBound, precomputed for stacked-area rendering */
  range: number;
  weatherIndex: number;
  isHoliday: boolean;
  holidayName?: string;
}

export type POStatus = "draft" | "pending" | "dispatched" | "confirmed";

export interface PurchaseOrder {
  id: string;
  sku: string;
  productName: string;
  supplier: string;
  quantity: number;
  unitCost: number;
  totalValue: number;
  status: POStatus;
  createdAt: string;
  etaDate: string;
}

export type InsightSeverity = "info" | "warning" | "critical";

export interface AIInsight {
  id: string;
  severity: InsightSeverity;
  sku: string;
  title: string;
  description: string;
  recommendedAction: string;
  region: string;
  timestamp: string;
}

export type Horizon = "7D" | "30D" | "90D" | "1Y";

export interface KPI {
  key: string;
  label: string;
  value: string;
  delta: number;
  icon: React.ComponentType<{ className?: string }>;
  tone: "emerald" | "amber" | "rose" | "indigo";
}

export type ToastTone = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  tone: ToastTone;
  title: string;
  description?: string;
}
