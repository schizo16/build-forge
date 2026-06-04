'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import type { GameSlug } from "@/lib/utils"

export function GameCard({ slug, name, accent, buildCount, index = 0 }: {
  slug: GameSlug
  name: string
  accent: string
  buildCount: number
  index?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        href={`/${slug}`}
        className="group flex flex-col items-center rounded-lg border p-5 text-center transition-all duration-300 hover:scale-[1.02]"
        style={{ borderColor: `${accent}33`, backgroundColor: '#1A1A1A' }}
      >
      <div
        className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${accent}22` }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke={accent} strokeWidth="1.5" />
          <path d="M12 8v8M8 12h8" stroke={accent} strokeWidth="1.5" />
        </svg>
      </div>
      <h3 className="font-display text-sm" style={{ color: accent }}>{name}</h3>
      <p className="mt-1 text-[10px] text-forge-muted">{buildCount} builds</p>
    </Link>
    </motion.div>
  )
}
