import type { StockStatus } from "@/types";
import { STATUS_META, TONE_CLASSES } from "@/components/ui/tone";

export function StatusBadge({ status }: { status: StockStatus }) {
  const meta = STATUS_META[status];
  const tone = TONE_CLASSES[meta.tone];
  const pulse = status === "critical";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide ${tone.bg} ${tone.border} ${tone.text}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {pulse && <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${tone.dot} opacity-75`} />}
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${tone.dot}`} />
      </span>
      {meta.label}
    </span>
  );
}
