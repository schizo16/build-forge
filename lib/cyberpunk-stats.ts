export interface StartingStats {
  lifePath: string
  lifePathVi: string
  stats: Record<string, number>
  notes: string
  notesVi: string
}

// Cyberpunk 2077: 22 points at creation, max 6 per stat
// Life path gives 2 points in specific stats
export function getCyberpunkStartingStats(finalStats: Record<string, number>): StartingStats {
  const body = finalStats.Body ?? 3
  const reflexes = finalStats.Reflexes ?? 3
  const technical = finalStats.Technical ?? 3
  const intelligence = finalStats.Intelligence ?? 3
  const cool = finalStats.Cool ?? 3

  // Determine primary stat
  const sorted = Object.entries({ Body: body, Reflexes: reflexes, Technical: technical, Intelligence: intelligence, Cool: cool })
    .sort(([, a], [, b]) => b - a)

  const primary = sorted[0][0]

  // Recommend life path based on primary stat
  let lifePath = 'Street Kid'
  let lifePathVi = 'Đường Phố'
  if (primary === 'Intelligence') { lifePath = 'Corpo'; lifePathVi = 'Corpo' }
  else if (primary === 'Technical') { lifePath = 'Nomad'; lifePathVi = 'Dân Lãng Tử' }
  else if (primary === 'Cool') { lifePath = 'Street Kid'; lifePathVi = 'Đường Phố' }

  // Recommend starting allocation (22 points, max 6 per stat)
  // Life path gives ~2 points in relevant stats
  const pathBonus: Record<string, string> = {
    Body: 'Body',
    Reflexes: 'Reflexes',
    Technical: 'Technical Ability',
    Intelligence: 'Intelligence',
    Cool: 'Cool',
  }

  return {
    lifePath,
    lifePathVi,
    stats: {
      Body: Math.min(Math.round(body * 0.4), 6),
      Reflexes: Math.min(Math.round(reflexes * 0.4), 6),
      Technical: Math.min(Math.round(technical * 0.4), 6),
      Intelligence: Math.min(Math.round(intelligence * 0.4), 6),
      Cool: Math.min(Math.round(cool * 0.4), 6),
    },
    notes: `Focus on ${primary} first (max 6). Life path ${lifePath} gives bonuses to ${pathBonus[primary]}.`,
    notesVi: `Tập trung ${primary} trước (tối đa 6). Xuất thân ${lifePathVi} cho thêm điểm ${pathBonus[primary]}.`,
  }
}
