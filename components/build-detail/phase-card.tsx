import type { BuildPhase } from "@/lib/utils"

export function PhaseCard({ phase, borderColor, locale }: { phase: BuildPhase; borderColor: string; locale?: string }) {
  const isVi = locale === 'vi'
  return (
    <div className="rounded-lg border-l-4 bg-forge-surface p-4" style={{ borderLeftColor: borderColor }}>
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: borderColor }}>
          {isVi && phase.nameVi ? phase.nameVi : phase.name}
        </h3>
        <span className="text-[10px] text-forge-muted">
          {phase.levels} &bull; {isVi && phase.areasVi ? phase.areasVi : phase.areas}
        </span>
      </div>
      <div className="mt-3 space-y-2">
        {(isVi && phase.stepsVi ? phase.stepsVi : phase.steps).map((step, i) => (
          <div key={i} className="flex gap-2">
            <span className="mt-0.5 text-accent-gold shrink-0">✦</span>
            <span className="text-xs text-forge-text">{step}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
