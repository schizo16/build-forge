'use client'

export interface SavedBuild {
  game: string
  slug: string
  name: string
  nameVi?: string
  category: string
  played: boolean
  savedAt: number
}

const STORAGE_KEY = 'build-forge-saved'

export function getSavedBuilds(): SavedBuild[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

export function isBuildSaved(game: string, slug: string): boolean {
  return getSavedBuilds().some(b => b.game === game && b.slug === slug)
}

export function toggleSaveBuild(build: SavedBuild): SavedBuild[] {
  const saved = getSavedBuilds()
  const idx = saved.findIndex(b => b.game === build.game && b.slug === build.slug)
  if (idx >= 0) {
    saved.splice(idx, 1)
  } else {
    saved.unshift({ ...build, played: false, savedAt: Date.now() })
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
  return saved
}

export function togglePlayed(game: string, slug: string): SavedBuild[] {
  const saved = getSavedBuilds()
  const build = saved.find(b => b.game === game && b.slug === slug)
  if (build) {
    build.played = !build.played
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
  }
  return saved
}

export function removeBuild(game: string, slug: string): SavedBuild[] {
  const saved = getSavedBuilds().filter(b => !(b.game === game && b.slug === slug))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
  return saved
}
