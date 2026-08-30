import type { InventoryItem, StockStatus } from "@/types";
import { seeded } from "@/lib/utils/random";
import { CATEGORIES, PRODUCT_NAMES, STORES } from "@/lib/mock/constants";

/**
 * Generates a realistic, deterministic inventory ledger spanning multiple
 * stores and categories. Not every product exists in every store, mirroring
 * real-world assortment variance.
 */
export function generateInventory(): InventoryItem[] {
  const rand = seeded(42);
  const items: InventoryItem[] = [];
  let counter = 1000;

  CATEGORIES.forEach((category) => {
    PRODUCT_NAMES[category]?.forEach((name) => {
      STORES.forEach((store) => {
        if (rand() > 0.55) return;
        counter += 7;

        const dailyVelocity = +(rand() * 18 + 2).toFixed(1);
        const onHandStock = Math.floor(rand() * 260);
        const daysOfRunout = +(onHandStock / Math.max(dailyVelocity, 0.5)).toFixed(1);
        const forecast14Day = Math.round(dailyVelocity * 14 * (0.85 + rand() * 0.3));

        let status: StockStatus;
        if (daysOfRunout < 3) status = "critical";
        else if (daysOfRunout < 7) status = "reorder";
        else if (daysOfRunout > 45) status = "overstocked";
        else status = "optimal";

        items.push({
          id: `INV-${counter}`,
          sku: `SKU-${counter}`,
          name,
          category,
          storeId: store.id,
          storeName: store.name,
          onHandStock,
          forecast14Day,
          dailyVelocity,
          daysOfRunout,
          status,
          unitCost: +(rand() * 60 + 8).toFixed(2),
          reorderQty: Math.round(forecast14Day * 1.4),
        });
      });
    });
  });

  return items;
}
