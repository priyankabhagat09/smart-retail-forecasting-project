export function BackgroundGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      <div className="absolute -top-40 left-1/4 w-[520px] h-[520px] rounded-full bg-indigo-600/10 blur-[120px]" />
      <div className="absolute top-1/3 -right-32 w-[420px] h-[420px] rounded-full bg-emerald-600/5 blur-[120px]" />
    </div>
  );
}
