import { NextRequest, NextResponse } from "next/server"
import { getRandomBuild } from "@/lib/builds"
import { ALL_BUILDS } from "@/data"
import type { GameSlug } from "@/lib/utils"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const game = searchParams.get('game') as GameSlug | null
  const category = searchParams.get('category') ?? undefined

  const build = getRandomBuild(game ?? undefined, category)

  let gameSlug = game
  if (!gameSlug) {
    for (const [slug, data] of Object.entries(ALL_BUILDS)) {
      if (data?.builds.some(b => b.slug === build.slug)) {
        gameSlug = slug as GameSlug
        break
      }
    }
  }

  return NextResponse.json({
    game: gameSlug ?? 'elden-ring',
    slug: build.slug,
    name: build.name,
    category: build.category,
  })
}
