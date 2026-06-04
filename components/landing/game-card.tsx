'use client'

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { TiltCard } from "@/components/tilt-card"
import { useLocale } from "next-intl"
import type { GameSlug } from "@/lib/utils"

export function GameCard({ slug, name, accent, buildCount, index = 0 }: {
  slug: GameSlug
  name: string
  accent: string
  buildCount: number
  index?: number
}) {
  const locale = useLocale()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleRandom = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setLoading(true)
    try {
      const res = await fetch(`/api/random?game=${slug}`)
      if (!res.ok) throw new Error('Failed')
      const build = await res.json()
      router.push(`/${build.game}/${build.slug}`)
    } catch {
      router.push(`/${slug}`)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <TiltCard className="rounded-lg">
        <Link
          href={`/${slug}`}
          className="group relative flex flex-col items-center rounded-lg border p-5 text-center transition-all duration-300"
          style={{ borderColor: `${accent}33`, backgroundColor: '#1A1A1A' }}
        >
          <button
            onClick={handleRandom}
            className="absolute right-2 top-2 rounded-full px-2 py-0.5 text-[9px] transition-all hover:brightness-110"
            style={{ backgroundColor: `${accent}33`, color: accent }}
          >
            {loading ? '...' : '🎲'}
          </button>
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
          <p className="mt-1 text-[10px] text-forge-muted">{buildCount} {locale === 'vi' ? 'build' : 'builds'}</p>
        </Link>
      </TiltCard>
    </motion.div>
  )
}
