"use client";

import { useMemo } from "react";
import type { DemandForecast, Horizon } from "@/types";

const HALF_WINDOW: Record<Horizon, number> = {
  "7D": 5,
  "30D": 18,
  "90D": 55,
  "1Y": 180,
};

export function useHorizonSeries(fullSeries: DemandForecast[], horizon: Horizon): DemandForecast[] {
  return useMemo(() => {
    const half = HALF_WINDOW[horizon];
    return fullSeries.filter((d) => d.dayIndex >= -half && d.dayIndex <= half);
  }, [fullSeries, horizon]);
}
