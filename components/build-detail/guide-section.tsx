import { PhaseCard } from "./phase-card"
import type { BuildPhase } from "@/lib/utils"

const BORDER_COLORS = ['#78716C', '#F59E0B', '#D4AF37']

export function GuideSection({ phases, locale }: { phases: BuildPhase[]; locale?: string }) {
  return (
    <div className="space-y-4">
      {phases.map((phase, i) => (
        <PhaseCard key={i} phase={phase} borderColor={BORDER_COLORS[i] ?? '#78716C'} locale={locale} />
      ))}
    </div>
  )
}
