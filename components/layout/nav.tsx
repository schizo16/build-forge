import Link from "next/link"

export function Nav() {
  return (
    <nav className="border-b border-forge-border bg-forge-bg/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center px-4">
        <Link href="/" className="font-display text-lg text-accent-gold">
          Build Forge
        </Link>
      </div>
    </nav>
  )
}
