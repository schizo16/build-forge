import { BuildCard } from "./build-card"
import type { Build } from "@/lib/utils"

export function BuildGrid({ builds, gameSlug, accent, locale }: { builds: Build[]; gameSlug: string; accent: string; locale?: string }) {
  if (builds.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm text-forge-muted">No builds found for this category.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {builds.map((build) => (
        <BuildCard key={build.slug} build={build} gameSlug={gameSlug} accent={accent} locale={locale} />
      ))}
    </div>
  )
}
