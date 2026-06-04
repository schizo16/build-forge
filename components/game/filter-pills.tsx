'use client'

import { CATEGORIES } from "@/lib/utils"

export function FilterPills({ active, onChange }: { active: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onChange(cat.key)}
          className={`rounded-full px-3.5 py-1.5 text-[11px] transition-all ${
            active === cat.key
              ? 'bg-accent-gold font-semibold text-black'
              : 'border border-forge-border bg-forge-surface text-forge-muted hover:text-forge-text'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
