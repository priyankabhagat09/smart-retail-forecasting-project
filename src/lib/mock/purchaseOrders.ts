import type { InventoryItem, PurchaseOrder } from "@/types";
import { seeded } from "@/lib/utils/random";
import { SUPPLIERS } from "@/lib/mock/constants";

/**
 * Seeds an initial set of draft/pending purchase orders from the highest-risk
 * inventory items (critical or reorder-threshold status).
 */
export function generatePurchaseOrders(inventory: InventoryItem[]): PurchaseOrder[] {
  const rand = seeded(101);

  return inventory
    .filter((i) => i.status === "critical" || i.status === "reorder")
    .slice(0, 6)
    .map((item, idx) => {
      const quantity = item.reorderQty;
      const supplier = SUPPLIERS[Math.floor(rand() * SUPPLIERS.length)] ?? SUPPLIERS[0]!;
      return {
        id: `PO-${8800 + idx}`,
        sku: item.sku,
        productName: item.name,
        supplier,
        quantity,
        unitCost: item.unitCost,
        totalValue: +(quantity * item.unitCost).toFixed(2),
        status: idx % 3 === 0 ? "pending" : "draft",
        createdAt: "Today",
        etaDate: `${3 + Math.floor(rand() * 6)} days`,
      };
    });
}

/** Builds a single ad-hoc draft PO for an "Auto-Draft Restock PO" action. */
export function buildDraftOrder(item: InventoryItem): PurchaseOrder {
  const supplier = SUPPLIERS[Math.floor(Math.random() * SUPPLIERS.length)] ?? SUPPLIERS[0]!;
  return {
    id: `PO-${Math.floor(Math.random() * 9000 + 1000)}`,
    sku: item.sku,
    productName: item.name,
    supplier,
    quantity: item.reorderQty,
    unitCost: item.unitCost,
    totalValue: +(item.reorderQty * item.unitCost).toFixed(2),
    status: "draft",
    createdAt: "Just now",
    etaDate: `${3 + Math.floor(Math.random() * 6)} days`,
  };
}
