'use client'

import { useState } from "react"
import type { BuildItem } from "@/lib/utils"
import { getItemImageUrl } from "@/lib/item-images"

const ITEM_ICONS: Record<string, string> = {
  weapon: '🗡️',
  talisman: '🏅',
  ring: '💍',
  rune: '🔮',
  armor: '🎭',
  physick: '🧪',
  cyberware: '⚡',
}

function ItemImage({ gameSlug, itemName, fallbackIcon }: { gameSlug: string; itemName: string; fallbackIcon: string }) {
  const [failed, setFailed] = useState(false)
  const src = getItemImageUrl(gameSlug, itemName)

  if (!src || failed) {
    return <span className="text-lg">{fallbackIcon}</span>
  }

  return (
    <img
      src={src}
      alt={itemName}
      className="h-full w-full object-contain p-1"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

export function ItemGrid({ items, itemType, locale, gameSlug }: { items: BuildItem[]; itemType?: string; locale?: string; gameSlug: string }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item, i) => {
        const typeLower = item.type.toLowerCase()
        return (
          <div key={i} className="rounded-lg border border-forge-border bg-forge-surface p-3 text-center">
            <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-md bg-forge-hover overflow-hidden">
              <ItemImage gameSlug={gameSlug} itemName={item.name} fallbackIcon={ITEM_ICONS[typeLower] || '📦'} />
            </div>
            <p className="text-[11px] text-forge-text">{locale === 'vi' && item.nameVi ? item.nameVi : item.name}</p>
            <p className="mt-0.5 text-[9px] text-forge-muted capitalize">
              {itemType && typeLower === itemType.toLowerCase() ? itemType : item.type}
            </p>
            <p className="mt-1 text-[9px] text-accent-gold">{locale === 'vi' && item.locationVi ? item.locationVi : item.location}</p>
          </div>
        )
      })}
    </div>
  )
}
