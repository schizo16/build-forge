const WIKI_BASE: Record<string, string> = {
  'elden-ring': 'https://eldenring.wiki.fextralife.com/file/Elden-Ring',
  'dark-souls-1': 'https://darksouls.wiki.fextralife.com/file/Dark-Souls',
  'dark-souls-2': 'https://darksouls2.wiki.fextralife.com/file/Dark-Souls-2',
  'dark-souls-3': 'https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3',
  'bloodborne': 'https://bloodborne.wiki.fextralife.com/file/Bloodborne',
}

const WIKI_SUFFIXES: Record<string, string> = {
  'elden-ring': '_elden_ring_wiki_guide_350wp.png',
  'dark-souls-1': '_dark_souls_wiki_guide_350wp.png',
  'dark-souls-2': '_dark_souls_wiki_guide_350wp.png',
  'dark-souls-3': '_dark_souls_wiki_guide_350wp.png',
  'bloodborne': '_bloodborne_wiki_guide_350wp.png',
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function getItemImageUrl(gameSlug: string, itemName: string): string {
  return `/images/items/${gameSlug}/${slugify(itemName)}.png`
}

export function getWikiFallbackUrl(gameSlug: string, itemName: string): string | null {
  const base = WIKI_BASE[gameSlug]
  const suffix = WIKI_SUFFIXES[gameSlug]
  if (!base || !suffix) return null
  return `${base}/${slugify(itemName)}${suffix}`
}
