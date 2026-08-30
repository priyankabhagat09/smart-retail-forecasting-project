import type { DemandForecast } from "@/types";
import { seeded } from "@/lib/utils/random";

const HISTORY_DAYS = 180;
const FUTURE_DAYS = 180;

/**
 * Generates a 360-day demand series (180 days of history + 180 days of
 * AI-predicted future) with weekly seasonality, a long-run trend, holiday
 * lift events, and an exogenous "weather index" feature.
 */
export function generateForecastSeries(): DemandForecast[] {
  const rand = seeded(7);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const series: DemandForecast[] = [];
  const base = 420;
  let trend = 0;

  for (let i = -HISTORY_DAYS; i <= FUTURE_DAYS; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dow = date.getDay();
    const weekendLift = dow === 0 || dow === 6 ? 1.18 : 1;
    const seasonal = 1 + 0.22 * Math.sin((i / 365) * 2 * Math.PI * 2 + 1.2);
    trend += (rand() - 0.48) * 1.4;

    const weatherIndex = Math.round(50 + 35 * Math.sin(i / 40) + (rand() - 0.5) * 18);
    const isHoliday = rand() > 0.965;
    const holidayLift = isHoliday ? 1.35 : 1;

    const noise = (rand() - 0.5) * 34;
    const truePattern = (base + trend) * weekendLift * seasonal * holidayLift + noise;

    const isFuture = i > 0;
    const predicted = Math.max(40, Math.round((base + trend) * weekendLift * seasonal * holidayLift));
    const spread = Math.round(18 + Math.abs(i) * 0.35 + rand() * 12);

    series.push({
      dayIndex: i,
      date: date.toISOString().slice(0, 10),
      actual: isFuture ? null : Math.max(30, Math.round(truePattern)),
      predicted,
      lowerBound: Math.max(0, predicted - spread),
      upperBound: predicted + spread,
      range: spread * 2,
      weatherIndex,
      isHoliday,
      holidayName: isHoliday ? "Regional Promo / Holiday" : undefined,
    });
  }

  return series;
}
