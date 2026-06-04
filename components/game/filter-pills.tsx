'use client'

import { CATEGORIES } from "@/lib/utils"

export function FilterPills({ active, onChange, locale, items }: {
  active: string
  onChange: (v: string) => void
  locale?: string
  items?: { key: string; label: string; labelVi: string }[]
}) {
  const list = items ?? CATEGORIES
  return (
    <div className="flex flex-wrap gap-2" role="tablist">
      {list.map((item) => (
        <button
          key={item.key}
          onClick={() => onChange(item.key)}
          className={`rounded-full px-3.5 py-1.5 text-[11px] transition-all ${
            active === item.key
              ? 'bg-accent-gold font-semibold text-black shadow-[0_0_15px_-3px_#D4AF37]'
              : 'border border-forge-border bg-forge-surface text-forge-muted hover:text-forge-text'
          }`}
        >
          {locale === 'vi' && item.labelVi ? item.labelVi : item.label}
        </button>
      ))}
    </div>
  )
}
