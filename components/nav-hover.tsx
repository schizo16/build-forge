'use client'

import { useRef } from "react"
import { gsap } from "gsap"
import { Link } from "@/lib/navigation"
import { LanguageSwitcher } from "@/components/layout/language-switcher"
import type { GameSlug } from "@/lib/utils"

const DISPLAY_GAMES: { slug: GameSlug; label: string }[] = [
  { slug: 'elden-ring', label: 'Elden Ring' },
  { slug: 'dark-souls-3', label: 'Dark Souls' },
  { slug: 'bloodborne', label: 'Bloodborne' },
  { slug: 'cyberpunk', label: 'Cyberpunk' },
]

export function NavHover() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  const handleEnter = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const parentRect = containerRef.current?.getBoundingClientRect()
    if (!lineRef.current || !parentRect) return
    gsap.to(lineRef.current, {
      x: rect.left - parentRect.left,
      width: rect.width,
      duration: 0.3,
      ease: "power2.out"
    })
  }

  const handleLeave = () => {
    if (!lineRef.current) return
    gsap.to(lineRef.current, {
      width: 0,
      duration: 0.2,
      ease: "power2.out"
    })
  }

  return (
    <div ref={containerRef} className="relative hidden items-center gap-5 md:flex">
      {DISPLAY_GAMES.map((game) => (
        <Link
          key={game.slug}
          href={`/${game.slug}`}
          className="text-xs text-forge-muted transition-colors hover:text-forge-text"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {game.label}
        </Link>
      ))}
      <Link
        href="/saved"
        className="text-xs text-forge-muted transition-colors hover:text-forge-text"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        ♥ Saved
      </Link>
      <Link
        href="/walkthrough/elden-ring"
        className="text-xs text-forge-muted transition-colors hover:text-forge-text"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        Walkthrough
      </Link>
      <LanguageSwitcher />
      <div ref={lineRef} className="absolute bottom-0 h-0.5 bg-accent-gold rounded-full" style={{ width: 0 }} />
    </div>
  )
}
