'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import type { Build } from "@/lib/utils"

const CATEGORY_COLORS: Record<string, string> = {
  meta: '#DC2626',
  pve: '#22C55E',
  pvp: '#F59E0B',
  meme: '#A78BFA',
  trend: '#22C55E',
}

export function BuildCard({ build, gameSlug, accent }: { build: Build; gameSlug: string; accent: string }) {
  const catColor = CATEGORY_COLORS[build.category] ?? '#78716C'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link
        href={`/${gameSlug}/${build.slug}`}
        className="group block overflow-hidden rounded-lg border border-forge-border bg-forge-surface transition-all duration-300 hover:border-accent-gold/40"
    >
      <div className="flex h-24 items-center justify-center border-b border-forge-border bg-gradient-to-br from-forge-surface to-forge-hover">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${accent}22` }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={accent} strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-sm text-forge-text">{build.name}</h3>
          <span
            className="rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase"
            style={{ backgroundColor: `${catColor}22`, color: catColor }}
          >
            {build.category}
          </span>
        </div>
        <p className="mt-1 text-[11px] text-forge-muted line-clamp-1">{build.description}</p>
        <div className="mt-2 flex gap-1.5 text-[10px] text-forge-muted">
          {Object.entries(build.stats)
            .filter(([, v]) => v >= 40)
            .map(([k]) => (
              <span key={k} className="capitalize">{k.slice(0, 3)}</span>
            ))}
        </div>
      </div>
    </Link>
    </motion.div>
  )
}
