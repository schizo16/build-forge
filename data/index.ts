import type { Build, GameSlug } from "@/lib/utils"
import eldenRingData from "./elden-ring.json"
import darkSouls1Data from "./dark-souls-1.json"
import darkSouls2Data from "./dark-souls-2.json"
import darkSouls3Data from "./dark-souls-3.json"
import bloodborneData from "./bloodborne.json"
import cyberpunkData from "./cyberpunk-2077.json"

interface RawGameData {
  name: string
  nameVi: string
  accent: string
  itemType: string
  itemTypeVi: string
  builds: Build[]
}

const ALL_BUILDS: Record<GameSlug, RawGameData> = {
  'elden-ring': eldenRingData as RawGameData,
  'dark-souls-1': darkSouls1Data as RawGameData,
  'dark-souls-2': darkSouls2Data as RawGameData,
  'dark-souls-3': darkSouls3Data as RawGameData,
  'bloodborne': bloodborneData as RawGameData,
  'cyberpunk': cyberpunkData as RawGameData,
}

export function getGameBuilds(slug: GameSlug): Build[] {
  return ALL_BUILDS[slug]?.builds ?? []
}

export function getBuild(slug: GameSlug, buildSlug: string): Build | undefined {
  return ALL_BUILDS[slug]?.builds.find(b => b.slug === buildSlug)
}

export function getAllBuilds(): Build[] {
  return Object.values(ALL_BUILDS).flatMap(g => g.builds)
}

export { ALL_BUILDS }
