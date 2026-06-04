const https = require('https')
const fs = require('fs')
const path = require('path')

const DATA_DIR = path.join(__dirname, '..', 'data')
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images', 'items')

const GAME_SLUG_MAP = {
  'elden-ring': 'elden-ring',
  'dark-souls-3': 'dark-souls-3',
  'dark-souls-1': 'dark-souls-1',
  'dark-souls-2': 'dark-souls-2',
  'bloodborne': 'bloodborne',
  'cyberpunk-2077': null,
}

const WIKI_CONFIG = {
  'elden-ring': { base: 'https://eldenring.wiki.fextralife.com/file/Elden-Ring', suffix: '_elden_ring_wiki_guide_350wp.png' },
  'dark-souls-3': { base: 'https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3', suffix: '_dark_souls_3_wiki_guide_350wp.png' },
  'dark-souls-1': { base: 'https://darksouls.wiki.fextralife.com/file/Dark-Souls', suffix: '_dark_souls_wiki_guide_350wp.png' },
  'dark-souls-2': { base: 'https://darksouls2.wiki.fextralife.com/file/Dark-Souls-2', suffix: '_dark_souls_2_wiki_guide_350wp.png' },
  'bloodborne': { base: 'https://bloodborne.wiki.fextralife.com/file/Bloodborne', suffix: '_bloodborne_wiki_guide_350wp.png' },
}

const REQUEST_OPTS = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://www.fextralife.com/',
  }
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function downloadImage(url, dest, retries = 2) {
  return new Promise((resolve) => {
    const dir = path.dirname(dest)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

    const doAttempt = (attempt) => {
      const file = fs.createWriteStream(dest)
      const req = https.get(url, { ...REQUEST_OPTS, timeout: 15000 }, (res) => {
        if (res.statusCode === 200) {
          res.pipe(file)
          file.on('finish', () => { file.close(); resolve(true) })
        } else {
          file.close()
          if (fs.existsSync(dest)) fs.unlinkSync(dest)
          if (attempt < retries && (res.statusCode === 502 || res.statusCode === 503)) {
            setTimeout(() => doAttempt(attempt + 1), 2000)
          } else {
            resolve(false)
          }
        }
      })
      req.on('error', () => {
        file.close()
        if (fs.existsSync(dest)) fs.unlinkSync(dest)
        if (attempt < retries) {
          setTimeout(() => doAttempt(attempt + 1), 2000)
        } else {
          resolve(false)
        }
      })
      req.on('timeout', () => {
        req.destroy()
        file.close()
        if (fs.existsSync(dest)) fs.unlinkSync(dest)
        if (attempt < retries) {
          setTimeout(() => doAttempt(attempt + 1), 2000)
        } else {
          resolve(false)
        }
      })
    }
    doAttempt(0)
  })
}

function getWikiUrls(gameSlug, itemSlug) {
  const config = WIKI_CONFIG[gameSlug]
  if (!config) return []
  const { base, suffix } = config
  return [
    `${base}/${itemSlug}${suffix}`,
    `${base}/${itemSlug}${suffix.replace('_350wp', '')}`,
    `${base}/${itemSlug}.png`,
    `${base}/${itemSlug}.webp`,
    `${base}/${itemSlug}${suffix.replace('_350wp', '_600wp')}`,
    `${base}/${itemSlug}${suffix.replace('_350wp', '_1200wp')}`,
  ]
}

async function downloadWithFallback(gameSlug, itemName, dest) {
  const itemSlug = slugify(itemName)
  const urls = getWikiUrls(gameSlug, itemSlug)
  for (const url of urls) {
    const ok = await downloadImage(url, dest)
    if (ok) return true
  }
  return false
}

async function main() {
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'))
  let totalItems = 0
  let downloaded = 0
  let failed = 0

  for (const file of files) {
    const fileKey = file.replace('.json', '')
    const gameSlug = GAME_SLUG_MAP[fileKey]

    if (!gameSlug) {
      console.log(`\nSkipping ${file} (cyberpunk)`)
      continue
    }

    const filePath = path.join(DATA_DIR, file)
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

    const itemSet = new Map()
    for (const build of data.builds) {
      for (const item of build.items) {
        const key = item.name.toLowerCase()
        if (!itemSet.has(key)) {
          itemSet.set(key, item)
        }
      }
    }

    const uniqueItems = Array.from(itemSet.values())
    console.log(`\n${data.name} (${gameSlug}): ${uniqueItems.length} unique items`)

    const gameDir = path.join(IMAGES_DIR, gameSlug)
    if (!fs.existsSync(gameDir)) fs.mkdirSync(gameDir, { recursive: true })

    for (const item of uniqueItems) {
      totalItems++
      const imageName = `${slugify(item.name)}.png`
      const destPath = path.join(gameDir, imageName)

      if (fs.existsSync(destPath)) {
        process.stdout.write(`  ${item.name} (cached)\n`)
        downloaded++
        continue
      }

      process.stdout.write(`  ${item.name}... `)
      const ok = await downloadWithFallback(gameSlug, item.name, destPath)
      if (ok) {
        process.stdout.write(`✓\n`)
        downloaded++
      } else {
        process.stdout.write(`✗\n`)
        failed++
      }
    }

    for (const build of data.builds) {
      for (const item of build.items) {
        const imageName = `${slugify(item.name)}.png`
        item.imageUrl = `/images/items/${gameSlug}/${imageName}`
      }
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf-8')
    console.log(`  Updated ${file} with imageUrl paths`)
  }

  console.log(`\n=== Results ===`)
  console.log(`Total unique items found (excluding cyberpunk): ${totalItems}`)
  console.log(`Images available (cached + downloaded): ${downloaded}`)
  console.log(`Failed (kept emoji): ${failed}`)
}

main().catch(console.error)
