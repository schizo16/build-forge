'use client'

import { useState, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { useLocale } from "next-intl"
import { GAME_CONFIGS, type GameSlug } from "@/lib/utils"
import { FilterPills } from "@/components/game/filter-pills"
import { BuildGrid } from "@/components/game/build-grid"
import { filterBuilds, getGameBuildCount } from "@/lib/builds"

export default function GamePage() {
  const params = useParams()
  const router = useRouter()
  const locale = useLocale()
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
  const gameName = locale === 'vi' ? config.nameVi : config.name

  const handleRandom = useCallback(() => {
    if (builds.length === 0) return
    const pick = builds[Math.floor(Math.random() * builds.length)]
    router.push(`/${game}/${pick.slug}`)
  }, [builds, game, router])

  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-16">
      <p className="text-[10px] tracking-widest text-forge-muted uppercase">
        Build Forge / {locale === 'vi' ? config.nameVi : config.name}
      </p>
      <h1 className="mt-1 font-display text-2xl tracking-wider" style={{ color: config.accent }}>
        {gameName}{' '}
        <span className="text-sm text-forge-muted">
          &bull; {getGameBuildCount(game)} {locale === 'vi' ? 'build' : 'builds'}
        </span>
      </h1>
      <div className="mt-6 flex items-center gap-3">
        <FilterPills active={category} onChange={setCategory} locale={locale} />
        <button
          onClick={handleRandom}
          className="ml-auto rounded-full bg-accent-gold px-4 py-1.5 text-[11px] font-semibold text-black transition-all hover:brightness-110"
        >
          🎲 {locale === 'vi' ? 'NGẪU NHIÊN' : 'RANDOM'}
        </button>
      </div>
      <div className="mt-6">
        <BuildGrid builds={builds} gameSlug={game} accent={config.accent} locale={locale} />
      </div>
    </div>
  )
}
