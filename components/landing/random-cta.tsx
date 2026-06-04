'use client'

import { useRouter } from "next/navigation"

export function RandomCTA() {
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
    <button
      onClick={handleRandom}
      className="inline-block rounded-lg bg-gradient-to-r from-accent-gold to-yellow-700 px-12 py-4 font-display text-base tracking-widest text-black transition-all duration-300 hover:brightness-110"
    >
      🎲 RANDOM BUILD
    </button>
  )
}
