'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { useLocale } from "next-intl"
import { getSavedBuilds, togglePlayed, removeBuild, type SavedBuild } from "@/lib/build-storage"

export default function SavedPage() {
  const locale = useLocale()
  const isVi = locale === 'vi'
  const [saved, setSaved] = useState<SavedBuild[]>([])

  useEffect(() => {
    setSaved(getSavedBuilds())
  }, [])

  const handlePlayed = (game: string, slug: string) => {
    togglePlayed(game, slug)
    setSaved(getSavedBuilds())
  }

  const handleRemove = (game: string, slug: string) => {
    removeBuild(game, slug)
    setSaved(getSavedBuilds())
  }

  if (saved.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 pt-28 pb-16 text-center">
        <p className="font-display text-2xl text-forge-muted">
          {isVi ? 'Chưa có build nào được lưu' : 'No saved builds'}
        </p>
        <p className="mt-2 text-sm text-forge-muted">
          {isVi ? 'Bấm nút save trên trang build để lưu' : 'Click the save button on any build to save it'}
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pt-28 pb-16">
      <h1 className="font-display text-2xl text-forge-text">
        {isVi ? 'Build Đã Lưu' : 'Saved Builds'}
      </h1>
      <p className="mt-1 text-xs text-forge-muted">
        {saved.length} {isVi ? 'build' : 'builds'}
      </p>

      <div className="mt-8 space-y-3">
        {saved.map((build) => (
          <div
            key={`${build.game}-${build.slug}`}
            className="flex items-center justify-between rounded-lg border border-forge-border bg-forge-surface p-4 transition-all hover:border-accent-gold/30"
          >
            <Link href={`/${build.game}/${build.slug}`} className="flex-1">
              <h3 className="font-display text-sm text-forge-text">
                {isVi && build.nameVi ? build.nameVi : build.name}
              </h3>
              <p className="mt-0.5 text-[10px] text-forge-muted">
                {build.game} &bull; {build.category}
              </p>
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePlayed(build.game, build.slug)}
                className={`rounded px-2.5 py-1 text-[10px] transition-all ${
                  build.played
                    ? 'bg-accent-green/20 text-accent-green'
                    : 'bg-forge-hover text-forge-muted hover:text-forge-text'
                }`}
              >
                {build.played ? '✓' : '○'}
              </button>
              <button
                onClick={() => handleRemove(build.game, build.slug)}
                className="rounded px-2.5 py-1 text-[10px] text-accent-red/60 transition-all hover:bg-accent-red/20 hover:text-accent-red"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
