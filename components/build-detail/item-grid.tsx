import type { BuildItem } from "@/lib/utils"

const ITEM_ICONS: Record<string, string> = {
  weapon: '🗡️',
  talisman: '🏅',
  ring: '💍',
  rune: '🔮',
  armor: '🎭',
  physick: '🧪',
  cyberware: '⚡',
}

export function ItemGrid({ items, itemType }: { items: BuildItem[]; itemType?: string }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item, i) => {
        const typeLower = item.type.toLowerCase()
        return (
          <div key={i} className="rounded-lg border border-forge-border bg-forge-surface p-3 text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-md bg-forge-hover">
              <span className="text-lg">{ITEM_ICONS[typeLower] || '📦'}</span>
            </div>
            <p className="text-[11px] text-forge-text">{item.name}</p>
            <p className="mt-0.5 text-[9px] text-forge-muted capitalize">
              {itemType && typeLower === itemType.toLowerCase() ? itemType : item.type}
            </p>
            <p className="mt-1 text-[9px] text-accent-gold">{item.location}</p>
          </div>
        )
      })}
    </div>
  )
}
