"use client";

import { useEffect, useState } from "react";
import type { DemandForecast } from "@/types";
import { generateForecastSeries } from "@/lib/mock/forecast";

interface ForecastState {
  series: DemandForecast[];
  loading: boolean;
  error: string | null;
}

export function useForecastData() {
  const [state, setState] = useState<ForecastState>({ series: [], loading: true, error: null });

  useEffect(() => {
    const timer = setTimeout(() => {
      setState({ series: generateForecastSeries(), loading: false, error: null });
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return state;
}
