'use client'

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { GameCard } from "@/components/landing/game-card"
import { RandomCTA } from "@/components/landing/random-cta"
import { StatsBar } from "@/components/landing/stats-bar"
import { ParallaxBg } from "@/components/parallax-bg"
import { GAME_CONFIGS, ALL_GAME_SLUGS } from "@/lib/utils"
import { getGameBuildCount } from "@/lib/builds"

export default function HomePage() {
  const t = useTranslations("landing")

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-24">
      <ParallaxBg className="pointer-events-none absolute inset-0">
        <div className="animate-gradient h-full w-full opacity-20"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, #D4AF3722 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, #F59E0B11 0%, transparent 40%)',
          }}
        />
      </ParallaxBg>
      <div className="mx-auto max-w-4xl text-center" style={{ perspective: "1000px" }}>
        <p className="text-[11px] tracking-[0.2em] text-forge-muted uppercase">{t("random")}</p>
        <motion.h1
          className="mt-2 font-display text-4xl leading-tight tracking-wider text-forge-text md:text-5xl whitespace-pre-line"
          style={{ transformStyle: "preserve-3d" }}
          whileHover={{ translateZ: 20 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {t("hero")}
        </motion.h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-forge-muted">
          {t("subtitle")}
        </p>
        <div className="mt-8">
          <RandomCTA />
        </div>
      </div>

      <div className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-4 md:grid-cols-4" style={{ perspective: "1000px" }}>
        {ALL_GAME_SLUGS.map((slug, index) => {
          const config = GAME_CONFIGS[slug]
          return (
            <GameCard
              key={slug}
              slug={slug}
              name={config.name}
              accent={config.accent}
              buildCount={getGameBuildCount(slug)}
              index={index}
            />
          )
        })}
      </div>

      <div className="mt-12 w-full max-w-xl" style={{ perspective: "1000px" }}>
        <StatsBar />
      </div>
    </div>
  )
}
