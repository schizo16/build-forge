import type { Build, GameSlug } from "@/lib/utils"
import eldenRingData from "./elden-ring.json"

interface RawGameData {
  name: string
  nameVi: string
  accent: string
  itemType: string
  itemTypeVi: string
  builds: Build[]
}

const ALL_BUILDS: Partial<Record<GameSlug, RawGameData>> = {
  'elden-ring': eldenRingData as RawGameData,
}

export function getGameBuilds(slug: GameSlug): Build[] {
  return ALL_BUILDS[slug]?.builds ?? []
}

export function getBuild(slug: GameSlug, buildSlug: string): Build | undefined {
  return ALL_BUILDS[slug]?.builds.find(b => b.slug === buildSlug)
}

export function getAllBuilds(): Build[] {
  return Object.values(ALL_BUILDS).flatMap(g => g?.builds ?? [])
}

export { ALL_BUILDS }
