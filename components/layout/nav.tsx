import { Link } from "@/lib/navigation"
import { NavHover } from "@/components/nav-hover"

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-forge-border bg-forge-bg/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-display text-xl tracking-[0.15em] text-forge-text">
          BUILD<span className="text-accent-gold">FORGE</span>
        </Link>
        <NavHover />
      </div>
    </nav>
  )
}
