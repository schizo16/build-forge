import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type GameSlug = 'elden-ring' | 'dark-souls-1' | 'dark-souls-2' | 'dark-souls-3' | 'bloodborne' | 'cyberpunk'

export const GAME_CONFIGS: Record<GameSlug, { name: string; nameVi: string; accent: string; itemType: string; itemTypeVi: string }> = {
  'elden-ring': { name: 'Elden Ring', nameVi: 'Elden Ring', accent: '#D4AF37', itemType: 'Talisman', itemTypeVi: 'Bùa' },
  'dark-souls-1': { name: 'Dark Souls I', nameVi: 'Dark Souls I', accent: '#F59E0B', itemType: 'Ring', itemTypeVi: 'Nhẫn' },
  'dark-souls-2': { name: 'Dark Souls II', nameVi: 'Dark Souls II', accent: '#F59E0B', itemType: 'Ring', itemTypeVi: 'Nhẫn' },
  'dark-souls-3': { name: 'Dark Souls III', nameVi: 'Dark Souls III', accent: '#F59E0B', itemType: 'Ring', itemTypeVi: 'Nhẫn' },
  'bloodborne': { name: 'Bloodborne', nameVi: 'Bloodborne', accent: '#EAB308', itemType: 'Rune', itemTypeVi: 'Rune' },
  'cyberpunk': { name: 'Cyberpunk 2077', nameVi: 'Cyberpunk 2077', accent: '#22C55E', itemType: 'Cyberware', itemTypeVi: 'Cyberware' },
}

export const CATEGORIES: { key: string; label: string; labelVi: string }[] = [
  { key: 'all', label: 'All', labelVi: 'Tất cả' },
  { key: 'pve', label: 'PVE', labelVi: 'PVE' },
  { key: 'pvp', label: 'PVP', labelVi: 'PVP' },
  { key: 'meta', label: 'META', labelVi: 'META' },
  { key: 'meme', label: 'Meme', labelVi: 'Meme' },
  { key: 'trend', label: 'Trend', labelVi: 'Trend' },
]

export const ALL_GAME_SLUGS: GameSlug[] = ['elden-ring', 'dark-souls-1', 'dark-souls-2', 'dark-souls-3', 'bloodborne', 'cyberpunk']
