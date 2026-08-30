"use client";

import { useCallback, useEffect, useState } from "react";
import type { InventoryItem } from "@/types";
import { generateInventory } from "@/lib/mock/inventory";

interface InventoryState {
  items: InventoryItem[];
  loading: boolean;
  error: string | null;
}

/**
 * Simulates an async fetch of the inventory ledger. Swap the body of
 * `load` for a real API call (e.g. `fetch('/api/inventory')`) in production —
 * the returned shape ({ items, loading, error, refetch }) is designed to be
 * a drop-in replacement.
 */
export function useInventoryData() {
  const [state, setState] = useState<InventoryState>({ items: [], loading: true, error: null });

  const load = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: null }));
    const timer = setTimeout(() => {
      try {
        const items = generateInventory();
        setState({ items, loading: false, error: null });
      } catch {
        setState({ items: [], loading: false, error: "Failed to load inventory telemetry." });
      }
    }, 550);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => load(), [load]);

  return { ...state, refetch: load };
}
