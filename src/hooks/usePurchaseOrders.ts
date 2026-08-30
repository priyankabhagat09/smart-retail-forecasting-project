"use client";

import { useCallback, useEffect, useState } from "react";
import type { InventoryItem, PurchaseOrder } from "@/types";
import { buildDraftOrder, generatePurchaseOrders } from "@/lib/mock/purchaseOrders";

export function usePurchaseOrders(inventory: InventoryItem[]) {
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);

  useEffect(() => {
    if (inventory.length) setOrders(generatePurchaseOrders(inventory));
  }, [inventory]);

  /** Simulates dispatching a PO to an upstream supplier via REST webhook. */
  const dispatchOrder = useCallback((id: string): Promise<void> => {
    return new Promise((resolve) => {
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: "pending" } : o)));
      setTimeout(() => {
        setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: "dispatched" } : o)));
        resolve();
      }, 900);
    });
  }, []);

  /** Optimistically appends a newly auto-drafted restock PO. */
  const addDraftOrder = useCallback((item: InventoryItem): PurchaseOrder => {
    const po = buildDraftOrder(item);
    setOrders((prev) => [po, ...prev]);
    return po;
  }, []);

  return { orders, dispatchOrder, addDraftOrder };
}
