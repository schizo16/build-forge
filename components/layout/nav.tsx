import { LanguageSwitcher } from "./language-switcher"
import { Link } from "@/lib/navigation"
import type { GameSlug } from "@/lib/utils"

const DISPLAY_GAMES: { slug: GameSlug; label: string }[] = [
  { slug: 'elden-ring', label: 'Elden Ring' },
  { slug: 'dark-souls-1', label: 'DS1' },
  { slug: 'dark-souls-2', label: 'DS2' },
  { slug: 'dark-souls-3', label: 'DS3' },
  { slug: 'bloodborne', label: 'Bloodborne' },
  { slug: 'cyberpunk', label: 'CP2077' },
]

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-forge-border bg-forge-bg/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-display text-xl tracking-[0.15em] text-forge-text">
          BUILD<span className="text-accent-gold">FORGE</span>
        </Link>
        <div className="hidden items-center gap-5 md:flex">
          {DISPLAY_GAMES.map((game) => (
            <Link
              key={game.slug}
              href={`/${game.slug}`}
              className="text-xs text-forge-muted transition-colors hover:text-forge-text"
            >
              {game.label}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  )
}
