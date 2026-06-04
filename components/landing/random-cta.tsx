'use client'

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

export function RandomCTA() {
  const t = useTranslations("landing")
  const router = useRouter()

  const handleRandom = async () => {
    try {
      const res = await fetch('/api/random')
      if (!res.ok) throw new Error('Failed')
      const build = await res.json()
      router.push(`/${build.game}/${build.slug}`)
    } catch {
      router.push('/elden-ring')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <button
        onClick={handleRandom}
        className="inline-block rounded-lg bg-gradient-to-r from-accent-gold to-yellow-700 px-12 py-4 font-display text-base tracking-widest text-black transition-all duration-300 hover:brightness-110"
      >
        🎲 {t("random")}
      </button>
    </motion.div>
  )
}
