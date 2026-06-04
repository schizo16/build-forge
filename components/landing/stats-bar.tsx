import { useTranslations } from "next-intl"
import { getTotalBuildCount } from "@/lib/builds"
import { ALL_GAME_SLUGS } from "@/lib/utils"

export function StatsBar() {
  const t = useTranslations("landing")
  const totalBuilds = getTotalBuildCount()
  const gameCount = ALL_GAME_SLUGS.length

  return (
    <div className="flex justify-center gap-10 border-t border-forge-border pt-6">
      <div className="text-center">
        <span className="font-display text-xl text-accent-gold">{totalBuilds}+</span>
        <span className="block text-[11px] text-forge-muted">{t("builds")}</span>
      </div>
      <div className="text-center">
        <span className="font-display text-xl text-accent-gold">{gameCount}</span>
        <span className="block text-[11px] text-forge-muted">{t("games")}</span>
      </div>
      <div className="text-center">
        <span className="font-display text-xl text-accent-gold">DLC</span>
        <span className="block text-[11px] text-forge-muted">{t("dlc")}</span>
      </div>
    </div>
  )
}
