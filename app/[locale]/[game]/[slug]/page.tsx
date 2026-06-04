import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import type { Metadata } from "next"
import { GAME_CONFIGS, type GameSlug } from "@/lib/utils"
import { getBuild } from "@/data"

export async function generateMetadata({ params }: { params: Promise<{ locale: string; game: string; slug: string }> }): Promise<Metadata> {
  const { game, slug } = await params
  const gameSlug = game as GameSlug
  const config = GAME_CONFIGS[gameSlug]
  if (!config) return { title: 'Build Forge' }
  const build = getBuild(gameSlug, slug)
  if (!build) return { title: 'Build Forge' }
  return {
    title: `${build.name} — ${config.name} Build — Build Forge`,
    description: build.description,
    openGraph: {
      title: `${build.name} — ${config.name}`,
      description: build.description,
      siteName: 'Build Forge',
      type: 'website',
    },
  }
}
import { getCyberpunkStartingStats } from "@/lib/cyberpunk-stats"
import { GuideSection } from "@/components/build-detail/guide-section"
import { StatBars } from "@/components/build-detail/stat-bars"
import { AnimatedSection } from "@/components/animated-section"
import { AffinityCompare } from "@/components/build-detail/affinity-compare"
import { ItemGrid } from "@/components/build-detail/item-grid"
import { TipsSection } from "@/components/build-detail/tips-section"
import { SaveButton } from "@/components/build-detail/save-button"

export default async function BuildDetailPage({ params }: { params: Promise<{ locale: string; game: string; slug: string }> }) {
  const { locale, game, slug } = await params
  const isVi = locale === 'vi'
  const t = await getTranslations({ locale, namespace: "build" })
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
            {isVi ? config.nameVi : config.name} &bull; Patch Latest
          </p>
          <h1 className="mt-1 font-display text-3xl tracking-wide text-forge-text">
            {isVi && build.nameVi ? build.nameVi : build.name}
          </h1>
          <p className="mt-2 max-w-lg text-xs text-forge-muted">
            {isVi && build.descriptionVi ? build.descriptionVi : build.description}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <SaveButton
              game={game}
              slug={build.slug}
              name={build.name}
              nameVi={build.nameVi}
              category={build.category}
              played={false}
              savedAt={Date.now()}
            />
            <span className="rounded bg-accent-red/20 px-2.5 py-1 text-[10px] font-semibold uppercase text-accent-red">
              {build.category}{build.dlc ? ' • DLC ✓' : ''}
            </span>
          </div>
          <p className="text-[10px] text-forge-muted">
            {isVi && build.gameClassVi ? build.gameClassVi : build.gameClass}
          </p>
        </div>
      </div>

      {/* Content sections */}
      <div className="mt-10 space-y-10">
        {/* Guide */}
        <AnimatedSection>
          <h2 className="mb-4 font-display text-base text-forge-text">{isVi ? '📖 Hướng dẫn' : '📖 Guide'}</h2>
          <GuideSection phases={build.phases} locale={locale} />
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection>
          <h2 className="mb-4 font-display text-base text-forge-text">{isVi ? '📊 Chỉ số' : '📊 Stats'}</h2>
          <StatBars stats={build.stats} sl={build.sl} />
        </AnimatedSection>

        {/* Cyberpunk Starting Stats */}
        {game === 'cyberpunk' && (
          <AnimatedSection>
            <h2 className="mb-4 font-display text-base text-forge-text">
              {isVi ? '🎭 Chỉ Số Tạo Nhân Vật' : '🎭 Starting Stats'}
            </h2>
            <div className="rounded-lg border border-accent-green/20 bg-forge-surface p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded bg-accent-green/20 px-2 py-0.5 text-[10px] text-accent-green">
                  {isVi ? 'Xuất thân' : 'Life Path'}: {(() => {
                    const s = getCyberpunkStartingStats(build.stats)
                    return isVi ? s.lifePathVi : s.lifePath
                  })()}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {['Body', 'Reflexes', 'Technical', 'Intelligence', 'Cool'].map((stat) => {
                  const { stats } = getCyberpunkStartingStats(build.stats)
                  const val = stats[stat] ?? 3
                  return (
                    <div key={stat} className="text-center rounded bg-forge-hover p-2">
                      <p className="text-[9px] text-forge-muted uppercase">{stat.slice(0, 4)}</p>
                      <p className="mt-1 font-display text-lg text-accent-green">{val}</p>
                    </div>
                  )
                })}
              </div>
              <p className="mt-3 text-[11px] text-forge-muted">
                {(() => {
                  const s = getCyberpunkStartingStats(build.stats)
                  return isVi ? s.notesVi : s.notes
                })()}
              </p>
              <p className="mt-1 text-[9px] text-forge-muted">
                {isVi ? '22 điểm ban đầu, tối đa 6 mỗi chỉ số' : '22 attribute points at creation, max 6 per stat'}
              </p>
            </div>
          </AnimatedSection>
        )}

        {/* Affinity Comparison */}
        {build.affinities.length > 0 && (
          <AnimatedSection>
            <h2 className="mb-4 font-display text-base text-forge-text">{isVi ? '⚔️ Ngọc' : '⚔️ Affinity'}</h2>
            <AffinityCompare affinities={build.affinities} locale={locale} />
          </AnimatedSection>
        )}

        {/* Items */}
        <AnimatedSection>
          <h2 className="mb-4 font-display text-base text-forge-text">{isVi ? '🎒 Trang bị' : '🎒 Items'}</h2>
          <ItemGrid items={build.items} itemType={config.itemType} locale={locale} gameSlug={gameSlug} />
        </AnimatedSection>

        {/* Tips */}
        <TipsSection tips={isVi && build.tipsVi ? build.tipsVi : build.tips} />
      </div>
    </div>
  )
}
