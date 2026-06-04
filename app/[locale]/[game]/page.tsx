'use client'

import { useState, useCallback, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import { useLocale } from "next-intl"
import { GAME_CONFIGS, DIFFICULTIES, type GameSlug, type Build } from "@/lib/utils"
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
  const [difficulty, setDifficulty] = useState('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')
  const builds = filterBuilds(game, category, difficulty)
  const gameName = locale === 'vi' ? config.nameVi : config.name

  const filteredAndSorted = useMemo(() => {
    let result = builds

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(b =>
        b.name.toLowerCase().includes(q) ||
        (b.nameVi && b.nameVi.toLowerCase().includes(q))
      )
    }

    switch (sort) {
      case 'name-asc':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-desc':
        result = [...result].sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'difficulty-asc':
        result = [...result].sort((a, b) => a.difficulty - b.difficulty)
        break
      case 'difficulty-desc':
        result = [...result].sort((a, b) => b.difficulty - a.difficulty)
        break
    }

    return result
  }, [builds, search, sort])

  const handleRandom = useCallback(() => {
    if (filteredAndSorted.length === 0) return
    const pick = filteredAndSorted[Math.floor(Math.random() * filteredAndSorted.length)]
    router.push(`/${game}/${pick.slug}`)
  }, [filteredAndSorted, game, router])

  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-16">
      <p className="text-[10px] tracking-widest text-forge-muted uppercase">
        Build Forge / {locale === 'vi' ? config.nameVi : config.name}
      </p>
      {game.startsWith('dark-souls') && (
        <div className="mt-4 flex gap-1 rounded-lg bg-forge-surface p-1 border border-forge-border w-fit">
          {['dark-souls-1', 'dark-souls-2', 'dark-souls-3'].map((ds) => {
            const dsConfig = GAME_CONFIGS[ds as GameSlug]
            const isActive = game === ds
            return (
              <button
                key={ds}
                onClick={() => router.push(`/${ds}`)}
                className={`rounded-md px-4 py-1.5 text-[11px] font-sans transition-all ${
                  isActive
                    ? 'bg-accent-amber font-semibold text-black'
                    : 'text-forge-muted hover:text-forge-text'
                }`}
              >
                {isActive ? `✦ ${dsConfig.name}` : dsConfig.name}
              </button>
            )
          })}
        </div>
      )}
      <h1 className="mt-1 font-display text-2xl tracking-wider" style={{ color: config.accent }}>
        {gameName}{' '}
        <span className="text-sm text-forge-muted">
          &bull; {getGameBuildCount(game)} {locale === 'vi' ? 'build' : 'builds'}
        </span>
      </h1>
      <div className="mt-6 flex items-center gap-3">
        <FilterPills active={category} onChange={setCategory} locale={locale} />
      </div>
      <div className="mt-2 flex items-center gap-3">
        <FilterPills
          items={DIFFICULTIES}
          active={difficulty}
          onChange={setDifficulty}
          locale={locale}
        />
      </div>
      <div className="mt-3 flex items-center gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-forge-muted" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={locale === 'vi' ? 'Tìm build...' : 'Search builds...'}
            className="w-full rounded-lg border border-forge-border bg-forge-surface py-2 pl-10 pr-3 text-xs text-forge-text placeholder-forge-muted outline-none transition-all focus:border-accent-gold/50"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-forge-border bg-forge-surface px-3 py-2 text-xs text-forge-muted outline-none"
        >
          <option value="default">{locale === 'vi' ? 'Mặc định' : 'Default'}</option>
          <option value="name-asc">A-Z</option>
          <option value="name-desc">Z-A</option>
          <option value="difficulty-asc">{locale === 'vi' ? 'Dễ→Khó' : 'Easy→Hard'}</option>
          <option value="difficulty-desc">{locale === 'vi' ? 'Khó→Dễ' : 'Hard→Easy'}</option>
        </select>
        <button
          onClick={handleRandom}
          className="rounded-full bg-accent-gold px-4 py-1.5 text-[11px] font-semibold text-black transition-all hover:brightness-110 whitespace-nowrap"
        >
          🎲 {locale === 'vi' ? 'NGẪU NHIÊN' : 'RANDOM'}
        </button>
      </div>
      <div className="mt-6">
        <BuildGrid builds={filteredAndSorted} gameSlug={game} accent={config.accent} locale={locale} />
      </div>
    </div>
  )
}
