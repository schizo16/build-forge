'use client'

import { useParams } from "next/navigation"
import { GAME_CONFIGS, type GameSlug } from "@/lib/utils"
import { walkthroughs } from "@/data/walkthrough/index"

export default function WalkthroughPage() {
  const params = useParams()
  const game = params.game as string
  const config = GAME_CONFIGS[game as GameSlug]
  const wt = walkthroughs[game]

  if (!config || !wt) return (
    <div className="flex min-h-screen items-center justify-center pt-24">
      <p className="text-forge-muted">Walkthrough not found</p>
    </div>
  )

  return (
    <div className="mx-auto max-w-4xl px-4 pt-28 pb-16">
      <p className="text-[10px] tracking-widest text-forge-muted uppercase">
        Build Forge / Walkthrough
      </p>
      <h1 className="mt-1 font-display text-2xl tracking-wider text-forge-text">
        {wt.name}
      </h1>
      <div className="mt-8 space-y-6">
        {wt.sections.sort((a, b) => a.order - b.order).map((section) => (
          <div key={section.order} className="rounded-lg border border-forge-border bg-forge-surface p-5">
            <h2 className="font-display text-base text-accent-gold mb-3">
              {section.order}. {section.title}
            </h2>
            <div className="space-y-2">
              {section.content.map((line, i) => (
                <p key={i} className="text-xs text-forge-text leading-relaxed">{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
