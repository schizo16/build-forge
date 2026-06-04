const fs = require('fs')
const path = require('path')

const dataDir = 'E:/code/Opencode/build-forge/data'

// Known Vietnamese corrections for common gaming terms
const VI_REPLACEMENTS = {
  'Tng': 'Tăng',
  'l�n': 'lên',
  'l�n ': 'lên ',
  'l�\u001bn': 'lên',
  'Dex': 'Dex',
  'Vigor': 'Vigor',
  'Str': 'Str',
  'Vitality': 'Vitality',
  'S�ng': 'Súng',
  's�ng': 'súng',
  'b�n': 'bắn',
  'B�n': 'Bắn',
  't�a': 'tỉa',
  'T�a': 'Tỉa',
  'c�ng': 'công',
  'C�ng': 'Công',
  'ngh�': 'nghệ',
  'Ngh�': 'Nghệ',
  'xuy�n': 'xuyên',
  't��ng': 'tường',
  '�': 'ấ',
  '� ': 'á ',
  'Ki�': 'Kiế',
  'ki�': 'kiế',
  'ch�': 'chế',
  'N�m': 'Ném',
  'n�m': 'ném',
  'Dao': 'Dao',
  't�ng': 'tàng',
  'T�ng': 'Tàng',
  'h�nh': 'hình',
  'H�nh': 'Hình',
  'Th�ng': 'Thông',
  'th�ng': 'thông',
  'Minh': 'Minh',
  'LMG': 'LMG',
  'Tr�': 'Trí',
  'tu�': 'tuệ',
  'Tu�': 'Tuệ',
  'L�c': 'Lục',
  'l�c': 'lục',
  'Thu�': 'Thuầ',
  'To�n': 'Toàn',
  'th�n': 'thân',
  'Th�n': 'Thân',
  's�t': 'sát',
  'S�t': 'Sát',
  'ch�p': 'chớp',
  'Ch�p': 'Chớp',
  'l�a': 'lửa',
  'L�a': 'Lửa',
  'th�n': 'thần',
  'Th�n': 'Thần',
  'nguy�n': 'nguyền',
  'Nguy�n': 'Nguyền',
  'V�': 'Vũ',
  'Kh�': 'Khí',
  'Ma': 'Ma',
  'Thu�': 'Thuật',
  '�nh': 'ánh',
  '�nh ': 'ánh ',
  'tr�ng': 'trăng',
  'Tr�ng': 'Trăng',
  't�': 'tối',
  'T�': 'Tối',
  'Sao': 'Sao',
  'R�i': 'Rơi',
  'r�i': 'rơi',
  's�ng': 'súng',
  'S�ng': 'Súng',
  'Nhanh': 'Nhanh',
  'Nhẹn': 'Nhẹn',
  'nhẹn': 'nhẹn',
  'đánh': 'đánh',
}

// Words that should never contain certain corruption patterns
function needsFix(str) {
  if (typeof str !== 'string') return false
  // Check for replacement character
  if (str.includes('\uFFFD')) return true
  // Check for patterns that indicate corruption
  const corruptionPatterns = [
    'l�n', 'Tng', 'l�\u001b', '\u001b', '\u0018', '\u0010',
    'S�ng', 's�ng', 'b�n', 'B�n', 't�a', 'T�a',
    'c�ng', 'C�ng', 'ngh�', 'xuy�n', 't��ng',
    'N�m', 'n�m', 't�ng', 'h�nh',
    'Th�ng', 'Tr�', 'L�c', 'Thu�',
    'Ki�', 'ki�', 'ch�', 'l�a',
  ]
  return corruptionPatterns.some(p => str.includes(p))
}

function fixText(str) {
  if (typeof str !== 'string') return str
  if (!needsFix(str)) return str

  let result = str

  // First try: fix known corruption patterns
  for (const [bad, good] of Object.entries(VI_REPLACEMENTS)) {
    while (result.includes(bad)) {
      result = result.replace(bad, good)
    }
  }

  // Second try: latin1 → utf8 for any remaining issues
  try {
    const buf = Buffer.from(result, 'latin1')
    const utf8Result = buf.toString('utf8')
    if (!needsFix(utf8Result) && utf8Result.length >= result.length / 2) {
      result = utf8Result
    }
  } catch {}

  // Third try: clean up remaining control characters
  result = result.replace(/[\u0000-\u001f\u007f-\u009f]/g, '')
  result = result.replace(/\uFFFD/g, '')

  return result
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const data = JSON.parse(content)

  if (!data.builds) return false

  let changed = false

  for (const build of data.builds) {
    // Fix descriptionVi
    if (build.descriptionVi && needsFix(build.descriptionVi)) {
      const fixed = fixText(build.descriptionVi)
      if (fixed !== build.descriptionVi) {
        build.descriptionVi = fixed
        changed = true
      }
    }

    // Fix nameVi
    if (build.nameVi && needsFix(build.nameVi)) {
      const fixed = fixText(build.nameVi)
      if (fixed !== build.nameVi) {
        build.nameVi = fixed
        changed = true
      }
    }

    // Fix phases
    if (build.phases) {
      for (const phase of build.phases) {
        if (phase.nameVi && needsFix(phase.nameVi)) {
          const fixed = fixText(phase.nameVi)
          if (fixed !== phase.nameVi) { phase.nameVi = fixed; changed = true }
        }
        if (phase.areasVi && needsFix(phase.areasVi)) {
          const fixed = fixText(phase.areasVi)
          if (fixed !== phase.areasVi) { phase.areasVi = fixed; changed = true }
        }
        if (phase.stepsVi) {
          phase.stepsVi = phase.stepsVi.map(s => {
            if (needsFix(s)) { const f = fixText(s); if (f !== s) { changed = true; return f } }
            return s
          })
        }
      }
    }

    // Fix tips
    if (build.tipsVi) {
      build.tipsVi = build.tipsVi.map(s => {
        if (needsFix(s)) { const f = fixText(s); if (f !== s) { changed = true; return f } }
        return s
      })
    }

    // Fix items
    if (build.items) {
      for (const item of build.items) {
        if (item.nameVi && needsFix(item.nameVi)) {
          const fixed = fixText(item.nameVi)
          if (fixed !== item.nameVi) { item.nameVi = fixed; changed = true }
        }
        if (item.locationVi && needsFix(item.locationVi)) {
          const fixed = fixText(item.locationVi)
          if (fixed !== item.locationVi) { item.locationVi = fixed; changed = true }
        }
      }
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4) + '\n', 'utf8')
  }
  return changed
}

const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'))
let count = 0

for (const file of files) {
  if (processFile(path.join(dataDir, file))) {
    console.log(`✓ Fixed: ${file}`)
    count++
  } else {
    console.log(`  OK: ${file}`)
  }
}

console.log(`\nFixed ${count} files`)

// Verify by showing some samples
console.log('\n--- Sample fixes ---')
for (const file of files) {
  const data = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'))
  if (data.builds) {
    for (const build of data.builds) {
      if (build.phases && build.phases[0] && build.phases[0].stepsVi) {
        console.log(`${build.slug}: ${build.phases[0].stepsVi[0]}`)
        break
      }
    }
  }
}
