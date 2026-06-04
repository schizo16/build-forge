import { Link } from "@/lib/navigation"

export function Footer() {
  return (
    <footer className="border-t border-forge-border py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Link href="/" className="font-display text-sm tracking-widest text-forge-muted">
            BUILD<span className="text-accent-gold">FORGE</span>
          </Link>
          <p className="text-xs text-forge-muted">
            &copy; {new Date().getFullYear()} Build Forge &mdash; Hand-curated RPG builds
          </p>
        </div>
      </div>
    </footer>
  )
}
