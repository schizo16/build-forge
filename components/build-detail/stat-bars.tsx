const STAT_LABELS: Record<string, string> = {
  vigor: 'VIG', mind: 'MND', endurance: 'END',
  strength: 'STR', dexterity: 'DEX', intelligence: 'INT',
  faith: 'FTH', arcane: 'ARC',
  vitality: 'VIT', skill: 'SKL', bloodtinge: 'BLT',
  body: 'BDY', reflexes: 'RFX', technical: 'TEC', cool: 'COL',
}

export function StatBars({ stats, sl }: { stats: Record<string, number>; sl: number }) {
  const entries = Object.entries(stats)
  const primaryStats = entries.filter(([, v]) => v >= 40).map(([k]) => k.toLowerCase())

  return (
    <div className="rounded-lg border border-forge-border bg-forge-surface p-5">
      <div className="space-y-2.5">
        {entries.map(([key, value]) => {
          const keyLower = key.toLowerCase()
          const pct = Math.min((value / 99) * 100, 100)
          const isPrimary = primaryStats.includes(keyLower)
          return (
            <div key={key} className="grid grid-cols-[48px_1fr_28px] items-center gap-2">
              <span className="text-[11px] text-forge-muted uppercase">{STAT_LABELS[keyLower] || key}</span>
              <div className="h-3.5 overflow-hidden rounded-sm bg-forge-hover">
                <div
                  className="gsap-bar h-full rounded-sm"
                  data-width={`${pct}%`}
                  style={{ backgroundColor: isPrimary ? '#D4AF37' : '#78716C' }}
                />
              </div>
              <span className="text-right text-[11px]" style={{ color: isPrimary ? '#D4AF37' : '#78716C' }}>
                {value}
              </span>
            </div>
          )
        })}
      </div>
      <p className="mt-4 border-t border-forge-border pt-3 text-[11px] text-forge-muted">
        SL {sl} &mdash; Primary: {primaryStats.map(k => STAT_LABELS[k] || k).join('/') || 'None'}
      </p>
    </div>
  )
}
