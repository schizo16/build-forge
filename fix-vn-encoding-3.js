const fs = require('fs')
const path = require('path')

const dataDir = 'E:/code/Opencode/build-forge/data'

// Detect if a string contains corrupted Vietnamese
function isCorrupted(str) {
  if (typeof str !== 'string') return false
  // Check for common corruption markers
  const markers = [
    '\u001b', '\u0018', '\u001c', '\u0010', '\u0000',  // control chars
    '\u001ba', '\u0018i', '\u001ci',
    '\uFFFD',  // replacement character
    'B\u001b', 'S\u001b', 'N\u001b', 'L\u001b', 'K\u001b',
    '\u001b\u001b',
  ]
  return markers.some(m => str.includes(m))
}

// Known correct Vietnamese for corrupted build names
const VI_NAMES = {
  // Cyberpunk builds (from English names)
  'tech-sniper': 'Bắn Tỉa Công Nghệ',
  'smart-gun': 'Súng Thông Minh',
  'stealth-knife': 'Ném Dao Tàng Hình',
  'blade-runner': 'Blade Runner',
  'gorilla-arms': 'Đấm Bốc Gorilla',
  'berserk-shotgun': 'Shotgun Cuồng Nộ',

  // Elden Ring new builds
  'dark-moon-greatsword': 'Đại Kiếm Trăng Tối',
  'fallingstar-beast-jaw': 'Hàm Quái Thú Sao Rơi',
  'rivers-of-blood': 'Sông Máu',
  'death-poker': 'Poker Tử Thần',
  'godslayer-greatsword': 'Đại Kiếm Sát Thần',
  'bolt-of-gransax': 'Tia Chớp Gransax',
  'sword-of-night-and-flame': 'Kiếm Đêm và Lửa',
  'marais-executioner-sword': 'Kiếm Tử Thần Marais',
  'morgott-cursed-sword': 'Kiếm Nguyền Morgott',
  'royal-greatsword': 'Đại Kiếm Hoàng Gia',
  'sacred-relic-sword': 'Thánh Kiếm Di Vật',
  'eleonora-poleblade': 'Kích Lưỡi Eleonora',
  'mohgwyn-sacred-spear': 'Thương Thần Mohgwyn',
  'magma-wyrm-scalesword': 'Kiếm Vảy Rồng Lửa',
  'blasphemous-blade': 'Hiệp Sĩ Blasphemous',
  'pyromancer': 'Pháp Sư Lửa',
  'dragon-communion': 'Long Giao',
  'quality-build': 'Chiến Binh Chất Lượng',
  'faith-lightning': 'Cuồng Tín Sấm Sét',
  'finger-build': 'Ngón Tay Nhẫn',
  'dex-ice-spear': 'Giáo Băng Dex',
  'jump-attack-colossal': 'Build Nhảy Đại Kiếm',
  
  // Dark Souls 1
  'giant-dad': 'Giant Dad',
  'claymore-quality': 'Claymore Chất Lượng',
  'zweihander-chaos': 'Zweihander Hỗn Mang',
  'dex-falchion': 'Falchion Nhanh Nhẹn',
  'faith-paladin': 'Thánh Kỵ Sĩ',
  'great-club-strength': 'Chùy Lớn Sức Mạnh',
  'dark-bead': 'Hạt Đen Tối',
  'black-knight-halberd': 'Kích Hiệp Sĩ Đen',
  'great-scythe-dex': 'Lưỡi Hái Lớn',
  'uchigatana-pyro': 'Uchigatana Pháp Thuật',
  'dragon-king-greataxe': 'Rìu Vua Rồng',
  'crystal-magic-weapon': 'Vũ Khí Pha Lê Ma Thuật',
  'sunlight-blade': 'Kiếm Ánh Sáng',
  
  // Dark Souls 2
  'powerstance': 'Hai Tay Kết Hợp',
  'rapier-dex': 'Kiếm Mũi Nhọn',
  'str-ultra-greatsword': 'Đại Kiếm Sức Mạnh',
  'faith-lightning': 'Đức Tin Sấm Sét',
  'sorcery': 'Pháp Thuật',
  'quality-pvp': 'Chất Lượng PvP',
  'poison': 'Độc Tố',
  'helix-halberd-pwr-stance': 'Kích Xoáy Hai Tay',
  'ice-rapier-int': 'Kiếm Mũi Băng',
  'sacred-chime-hammer': 'Búa Chuông Thánh',
  'majestic-greatsword-quality': 'Đại Kiếm Uy Nghi',
  'fume-ultra-greatsword': 'Đại Kiếm Khói Đen',
  'warped-sword-dex': 'Kiếm Cong Nhanh',
  'dragon-tooth-str': 'Răng Rồng',
  'sanctum-crossbow': 'Nỏ Thánh Địa',

  // Dark Souls 3
  'sellsword-winblades': 'Song Kiếm Sellsword',
  'chaos-zweihander': 'Zweihander Hỗn Mang',
  'pure-strength': 'Sức Mạnh Thuần Túy',
  'sorcerer': 'Pháp Sư',
  'faith-lightning': 'Đức Tin Sấm Sét',
  'pyromancer': 'Pháp Sư Lửa',
  'dex-sharp': 'Nhanh Nhẹn Sắc Bén',
  'lapp-havel': 'Lapp Havel',
  'lothric-knight-ss': 'Kiếm Hiệp Sĩ Lothric',
  'great-club': 'Chùy Lớn',
  'demons-scar': 'Sẹo Quỷ',
  'friede-scythe': 'Lưỡi Hái Friede',
  'ringed-knight-paired': 'Song Kiếm Hiệp Sĩ',
  'murky-hand-scythe': 'Lưỡi Hái Bóng Tối',
  'gotthard-twinswords': 'Song Kiếm Gotthard',
  'wolf-knight-gs': 'Đại Kiếm Sói',

  // Bloodborne
  'saw-cleaver-quality': 'Chất Lượng Saw Cleaver',
  'holy-blade': 'Thánh Kiếm',
  'chikage-bloodtinge': 'Chikage Máu',
  'rakuyo-skill': 'Rakuyo Kỹ Năng',
  'beast-claw': 'Móng Vuốt Thú',
  'kos-parasite-arcane': 'Ký Sinh Trùng Kos',
  'bowblade': 'Cung Kiếm',
  'whirligig-saw': 'Cưa Xoay',
  'beast-cutter': 'Dao Thịt Thú',
  'amygdalan-arm': 'Tay Amygdala',
  'church-pick': 'Cuốc Nhà Thờ',
  'blade-of-mercy': 'Lưỡi Dao Nhân Từ',
  'reiterpallasch': 'Reiterpallasch',
  'burial-blade': 'Lưỡi Hái Tang Lễ',
  'stake-driver': 'Khoan Tay',
  'tonitrus': 'Tonitrus',
  'simons-bowblade': 'Cung Kiếm Simon',
  'holy-moonlight-sword': 'Thánh Kiếm Ánh Trăng',
}

// Known phase name corrections
const PHASE_FIXES = {
  'Ä\u0010áº§u Game': 'Đầu Game',
  'Ä\u0010áº§u Game': 'Đầu Game',
  'Giá»¯a Game': 'Giữa Game',
  'Giá»\u0091a Game': 'Giữa Game',
  'Giá»¥a Game': 'Giữa Game',
  'Gi\u001ba Game': 'Giữa Game',
  'Gi\u001ba Game': 'Giữa Game',
  'Cu\u0018i Game': 'Cuối Game',
  'Cu\u001ci Game': 'Cuối Game',
  'Cu\u001ai Game': 'Cuối Game',
  'Cu\u0000i Game': 'Cuối Game',
  'Cu\u001c Game': 'Cuối Game',
  'Cu\u0018i Game + DLC': 'Cuối Game + DLC',
  'Cu\u001ci Game + DLC': 'Cuối Game + DLC',
  'Cu\u001ai Game + DLC': 'Cuối Game + DLC',
  'Cu\u0000i Game + DLC': 'Cuối Game + DLC',
  'Cu\u0018i Game + PvP': 'Cuối Game + PvP',
}

function fixString(str, slug) {
  if (typeof str !== 'string') return str
  
  // Fix phase names
  for (const [bad, good] of Object.entries(PHASE_FIXES)) {
    if (str.includes(bad)) {
      str = str.replace(new RegExp(bad.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), good)
    }
  }
  
  return str
}

function fixBuildNames(builds, slug) {
  const viName = VI_NAMES[slug]
  if (!viName) return

  for (const build of builds) {
    if (build.slug === slug) {
      if (isCorrupted(build.nameVi)) {
        build.nameVi = viName
      }
      // Fix phases in this build
      if (build.phases) {
        for (const phase of build.phases) {
          phase.nameVi = fixString(phase.nameVi)
          if (phase.stepsVi) {
            phase.stepsVi = phase.stepsVi.map(s => fixString(s))
          }
        }
      }
      // Fix description
      if (build.descriptionVi && isCorrupted(build.descriptionVi)) {
        // Try to fix with latin1->utf8 conversion
        try {
          const buf = Buffer.from(build.descriptionVi, 'latin1')
          const fixed = buf.toString('utf8')
          if (!isCorrupted(fixed)) build.descriptionVi = fixed
        } catch {}
      }
      return
    }
  }
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  let data = JSON.parse(content)
  
  if (!data.builds) return false
  
  for (const build of data.builds) {
    const slug = build.slug
    
    // Fix build name
    if (VI_NAMES[slug] && isCorrupted(build.nameVi)) {
      build.nameVi = VI_NAMES[slug]
    }
    
    // Fix phase names
    if (build.phases) {
      for (const phase of build.phases) {
        phase.nameVi = fixString(phase.nameVi, slug)
        if (phase.areasVi) {
          phase.areasVi = fixString(phase.areasVi, slug)
        }
        if (phase.stepsVi) {
          phase.stepsVi = phase.stepsVi.map(s => fixString(s, slug))
        }
      }
    }
    
    // Fix description
    if (build.descriptionVi && isCorrupted(build.descriptionVi)) {
      try {
        const buf = Buffer.from(build.descriptionVi, 'latin1')
        const fixed = buf.toString('utf8')
        if (!isCorrupted(fixed)) build.descriptionVi = fixed
      } catch {}
    }
    
    // Fix items
    if (build.items) {
      for (const item of build.items) {
        if (item.nameVi && isCorrupted(item.nameVi)) {
          try {
            const buf = Buffer.from(item.nameVi, 'latin1')
            const fixed = buf.toString('utf8')
            if (!isCorrupted(fixed)) item.nameVi = fixed
          } catch {}
        }
        if (item.locationVi && isCorrupted(item.locationVi)) {
          try {
            const buf = Buffer.from(item.locationVi, 'latin1')
            const fixed = buf.toString('utf8')
            if (!isCorrupted(fixed)) item.locationVi = fixed
          } catch {}
        }
      }
    }
    
    // Fix tips
    if (build.tipsVi) {
      build.tipsVi = build.tipsVi.map(s => fixString(s, slug))
    }
    
    // Fix sayings/special strings
    for (const key of ['gameClassVi', 'nameVi']) {
      if (build[key] && isCorrupted(build[key])) {
        try {
          const buf = Buffer.from(build[key], 'latin1')
          const fixed = buf.toString('utf8')
          if (!isCorrupted(fixed)) build[key] = fixed
        } catch {}
      }
    }
  }
  
  const output = JSON.stringify(data, null, 4) + '\n'
  if (content !== output) {
    fs.writeFileSync(filePath, output, 'utf8')
    return true
  }
  return false
}

const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'))
let count = 0

for (const file of files) {
  const filePath = path.join(dataDir, file)
  if (processFile(filePath)) {
    console.log(`✓ Fixed: ${file}`)
    count++
  } else {
    console.log(`  OK: ${file}`)
  }
}

console.log(`\nFixed ${count} files`)
