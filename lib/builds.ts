import { ALL_BUILDS } from "@/data"
import type { GameSlug, Build } from "@/lib/utils"

export function filterBuilds(slug: GameSlug, category: string): Build[] {
  const builds = ALL_BUILDS[slug]?.builds ?? []
  if (category === 'all') return builds
  return builds.filter(b => b.category === category)
}

export function getGameBuildCount(slug: GameSlug): number {
  return ALL_BUILDS[slug]?.builds.length ?? 0
}

export function getTotalBuildCount(): number {
  return Object.values(ALL_BUILDS).reduce((sum, g) => sum + (g?.builds.length ?? 0), 0)
}

export function getRandomBuild(slug?: GameSlug, category?: string): Build {
  let pool: Build[]
  if (slug) {
    pool = category ? filterBuilds(slug, category) : (ALL_BUILDS[slug]?.builds ?? [])
  } else {
    pool = Object.values(ALL_BUILDS).flatMap(g => g?.builds ?? [])
    if (category) pool = pool.filter(b => b.category === category)
  }
  if (pool.length === 0) {
    const fallback = Object.values(ALL_BUILDS).flatMap(g => g?.builds ?? [])
    return fallback[0]
  }
  return pool[Math.floor(Math.random() * pool.length)]
}
