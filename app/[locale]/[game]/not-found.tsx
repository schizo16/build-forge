import Link from "next/link"

export default function GameNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 pt-24">
      <h1 className="font-display text-6xl text-accent-gold">404</h1>
      <p className="mt-4 text-forge-muted">Game not found</p>
      <Link href="/" className="mt-6 text-xs text-accent-gold transition-all hover:underline">
        ← Back to home
      </Link>
    </div>
  )
}
