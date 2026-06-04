import { notFound } from "next/navigation"
import { GAME_CONFIGS, type GameSlug } from "@/lib/utils"
import { getBuild } from "@/data"
import { GuideSection } from "@/components/build-detail/guide-section"
import { StatBars } from "@/components/build-detail/stat-bars"
import { AffinityCompare } from "@/components/build-detail/affinity-compare"
import { ItemGrid } from "@/components/build-detail/item-grid"
import { TipsSection } from "@/components/build-detail/tips-section"

export default async function BuildDetailPage({ params }: { params: Promise<{ game: string; slug: string }> }) {
  const { game, slug } = await params
  const gameSlug = game as GameSlug
  const config = GAME_CONFIGS[gameSlug]

  if (!config) notFound()

  const build = getBuild(gameSlug, slug)
  if (!build) notFound()

  return (
    <div className="mx-auto max-w-4xl px-4 pt-28 pb-16">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] tracking-widest text-forge-muted uppercase">
            {config.name} &bull; Patch Latest
          </p>
          <h1 className="mt-1 font-display text-3xl tracking-wide text-forge-text">
            {build.name}
          </h1>
          <p className="mt-2 max-w-lg text-xs text-forge-muted">{build.description}</p>
        </div>
        <div className="text-right shrink-0">
          <span className="rounded bg-accent-red/20 px-2.5 py-1 text-[10px] font-semibold uppercase text-accent-red">
            {build.category}{build.dlc ? ' • DLC ✓' : ''}
          </span>
          <p className="mt-1 text-[10px] text-forge-muted">
            {build.gameClass}
          </p>
        </div>
      </div>

      {/* Content sections */}
      <div className="mt-10 space-y-10">
        {/* Guide */}
        <section>
          <h2 className="mb-4 font-display text-base text-forge-text">📖 Guide</h2>
          <GuideSection phases={build.phases} />
        </section>

        {/* Stats */}
        <section>
          <h2 className="mb-4 font-display text-base text-forge-text">📊 Stats</h2>
          <StatBars stats={build.stats} sl={build.sl} />
        </section>

        {/* Affinity Comparison */}
        {build.affinities.length > 0 && (
          <section>
            <h2 className="mb-4 font-display text-base text-forge-text">⚔️ Affinity Comparison</h2>
            <AffinityCompare affinities={build.affinities} />
          </section>
        )}

        {/* Items */}
        <section>
          <h2 className="mb-4 font-display text-base text-forge-text">🎒 Items</h2>
          <ItemGrid items={build.items} itemType={config.itemType} />
        </section>

        {/* Tips */}
        <TipsSection tips={build.tips} />
      </div>
    </div>
  )
}
