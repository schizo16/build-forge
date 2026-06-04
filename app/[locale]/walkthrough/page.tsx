'use client'

import Link from "next/link"
import { useLocale } from "next-intl"

const WALKTHROUGH_GAMES = [
  { slug: 'elden-ring', name: 'Elden Ring', desc: 'The Lands Between — full walkthrough with DLC', descVi: 'Vùng Đất Giữa — walkthrough đầy đủ kèm DLC' },
  { slug: 'dark-souls-1', name: 'Dark Souls I', desc: 'Lordran — từ Undead Asylum đến Gwyn', descVi: 'Lordran — từ Undead Asylum đến Gwyn' },
  { slug: 'dark-souls-2', name: 'Dark Souls II', desc: 'Drangleic — tất cả DLC Crowns', descVi: 'Drangleic — tất cả DLC Crowns' },
  { slug: 'dark-souls-3', name: 'Dark Souls III', desc: 'Lothric — từ Cemetery of Ash đến Ringed City', descVi: 'Lothric — từ Cemetery of Ash đến Ringed City' },
  { slug: 'bloodborne', name: 'Bloodborne', desc: 'Yharnam — từ Iosefka Clinic đến Old Hunters', descVi: 'Yharnam — từ Iosefka Clinic đến Old Hunters' },
]

export default function WalkthroughIndexPage() {
  const locale = useLocale()
  const isVi = locale === 'vi'

  return (
    <div className="mx-auto max-w-4xl px-4 pt-28 pb-16">
      <p className="text-[10px] tracking-widest text-forge-muted uppercase">Build Forge</p>
      <h1 className="mt-1 font-display text-3xl tracking-wider text-forge-text">
        {isVi ? 'Hướng Dẫn Game' : 'Walkthroughs'}
      </h1>
      <p className="mt-2 text-sm text-forge-muted">
        {isVi
          ? 'Walkthrough chi tiết từ đầu game đến cuối, kèm DLC — tiếng Việt'
          : 'Detailed game walkthroughs from start to finish, including DLC'}
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {WALKTHROUGH_GAMES.map((game) => (
          <Link
            key={game.slug}
            href={`/walkthrough/${game.slug}`}
            className="group rounded-lg border border-forge-border bg-forge-surface p-5 transition-all duration-300 hover:border-accent-gold/40 hover:scale-[1.02]"
          >
            <h2 className="font-display text-base text-forge-text group-hover:text-accent-gold transition-colors">
              {game.name}
            </h2>
            <p className="mt-2 text-xs text-forge-muted">
              {isVi ? game.descVi : game.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
