'use client'

import { useState, useEffect } from "react"
import { isBuildSaved, toggleSaveBuild, type SavedBuild } from "@/lib/build-storage"

export function SaveButton({ game, slug, name, nameVi, category }: SavedBuild) {
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setSaved(isBuildSaved(game, slug))
  }, [game, slug])

  const handleClick = () => {
    toggleSaveBuild({ game, slug, name, nameVi, category, played: false, savedAt: Date.now() })
    setSaved(!saved)
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-all hover:brightness-110"
      style={{
        borderColor: saved ? '#D4AF3744' : '#2A2A2A',
        backgroundColor: saved ? '#D4AF3711' : '#1A1A1A',
        color: saved ? '#D4AF37' : '#78716C',
      }}
      title={saved ? 'Unsave' : 'Save build'}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill={saved ? '#D4AF37' : 'none'} stroke={saved ? '#D4AF37' : '#78716C'} strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      {saved ? 'Saved' : 'Save'}
    </button>
  )
}
