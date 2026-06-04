'use client'

import { useState } from "react"
import { useParams } from "next/navigation"
import { GAME_CONFIGS, type GameSlug } from "@/lib/utils"
import { FilterPills } from "@/components/game/filter-pills"
import { BuildGrid } from "@/components/game/build-grid"
import { filterBuilds, getGameBuildCount } from "@/lib/builds"

export default function GamePage() {
  const params = useParams()
  const game = params.game as GameSlug
  const config = GAME_CONFIGS[game]

  if (!config) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <p className="text-forge-muted">Game not found</p>
      </div>
    )
  }

  const [category, setCategory] = useState('all')
  const builds = filterBuilds(game, category)

  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-16">
      <p className="text-[10px] tracking-widest text-forge-muted uppercase">
        Build Forge / {config.name}
      </p>
      <h1 className="mt-1 font-display text-2xl tracking-wider" style={{ color: config.accent }}>
        {config.name}{' '}
        <span className="text-sm text-forge-muted">
          &bull; {getGameBuildCount(game)} builds
        </span>
      </h1>
      <div className="mt-6">
        <FilterPills active={category} onChange={setCategory} />
      </div>
      <div className="mt-6">
        <BuildGrid builds={builds} gameSlug={game} accent={config.accent} />
      </div>
    </div>
  )
}
