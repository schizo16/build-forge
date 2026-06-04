import type { AffinityOption } from "@/lib/utils"

export function AffinityCompare({ affinities, locale }: { affinities: AffinityOption[]; locale?: string }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {affinities.map((aff, i) => {
        const isCurrent = aff.verdict.includes('Current') || aff.verdictVi?.includes('hiện tại')
        return (
          <div
            key={i}
            className={`rounded-lg border p-4 bg-forge-surface ${
              isCurrent ? 'border-accent-red/40' : 'border-forge-border'
            }`}
          >
            <div className="flex items-center justify-between">
              <h4 className="font-display text-sm text-forge-text">{aff.name}</h4>
              <span className="text-[10px] text-forge-muted">{aff.scaling}</span>
            </div>
            <p className="mt-2 font-sans text-2xl text-forge-text">{aff.ar}</p>
            <div className="mt-2 flex justify-between text-[10px] text-forge-muted">
              <span>Scaling: {aff.scaling}</span>
              {aff.statusEffect && (
                <span>{aff.statusEffect.type}: {aff.statusEffect.value}</span>
              )}
            </div>
            <div
              className={`mt-2 rounded px-2 py-1 text-[9px] ${
                isCurrent
                  ? 'bg-accent-red/20 text-accent-red'
                  : 'bg-forge-hover text-forge-muted'
              }`}
            >
              {locale === 'vi' && aff.verdictVi ? aff.verdictVi : aff.verdict}
            </div>
          </div>
        )
      })}
    </div>
  )
}
