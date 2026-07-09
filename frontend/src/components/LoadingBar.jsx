import React from "react";

export default function LoadingBar({ active, label = "Processing..." }) {
  if (!active) return null;

  return (
    <div className="mt-3.5">
      <div className="mb-2 text-sm font-extrabold text-foreground/72">{label}</div>

      <div className="relative h-[7px] overflow-hidden rounded-full bg-white/10">
        <div className="bg-brand-gradient animate-syllance-loading absolute top-0 left-0 h-full w-[38%] rounded-full" />
      </div>
    </div>
  );
}
