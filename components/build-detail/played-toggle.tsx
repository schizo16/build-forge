'use client'

import { useState, useEffect } from "react"
import { getSavedBuilds, togglePlayed } from "@/lib/build-storage"

export function PlayedToggle({ game, slug }: { game: string; slug: string }) {
  const [played, setPlayed] = useState(false)

  useEffect(() => {
    const saved = getSavedBuilds()
    const build = saved.find(b => b.game === game && b.slug === slug)
    setPlayed(build?.played ?? false)
  }, [game, slug])

  const handleClick = () => {
    togglePlayed(game, slug)
    setPlayed(!played)
  }

  return (
    <button
      onClick={handleClick}
      className={`rounded px-2 py-1 text-[10px] transition-all ${
        played
          ? 'bg-accent-green/20 text-accent-green'
          : 'bg-forge-hover text-forge-muted'
      }`}
    >
      {played ? '✓ Played' : '○ Mark played'}
    </button>
  )
}
