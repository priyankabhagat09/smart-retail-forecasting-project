"use client";

import { useEffect, useState } from "react";
import type { AIInsight } from "@/types";
import { generateAIInsights } from "@/lib/mock/insights";

interface AIInsightsState {
  insights: AIInsight[];
  loading: boolean;
}

export function useAIInsights() {
  const [state, setState] = useState<AIInsightsState>({ insights: [], loading: true });

  useEffect(() => {
    const timer = setTimeout(() => {
      setState({ insights: generateAIInsights(), loading: false });
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  return state;
}
