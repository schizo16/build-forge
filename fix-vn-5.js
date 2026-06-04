const fs = require('fs')
const path = require('path')

const dataDir = 'E:/code/Opencode/build-forge/data'

const VI_REPLACEMENTS = [
  ['l�n', 'lên'],
  ['Tng', 'Tăng'],
  ['S�ng', 'Súng'],
  ['s�ng', 'súng'],
  ['b�n', 'bắn'],
  ['B�n', 'Bắn'],
  ['t�a', 'tỉa'],
  ['T�a', 'Tỉa'],
  ['c�ng', 'công'],
  ['C�ng', 'Công'],
  ['ngh�', 'nghệ'],
  ['xuy�n', 'xuyên'],
  ['t��ng', 'tường'],
  ['Ki�', 'Kiế'],
  ['ki�', 'kiế'],
  ['N�m', 'Ném'],
  ['n�m', 'ném'],
  ['t�ng', 'tàng'],
  ['h�nh', 'hình'],
  ['Th�ng', 'Thông'],
  ['th�ng', 'thông'],
  ['Tr�', 'Trí'],
  ['L�c', 'Lục'],
  ['Thu�', 'Thuần'],
  ['To�n', 'Toàn'],
  ['th�n', 'thân'],
  ['s�t', 'sát'],
  ['ch�p', 'chớp'],
  ['l�a', 'lửa'],
  ['nguy�n', 'nguyền'],
  ['V�', 'Vũ'],
  ['Kh�', 'Khí'],
  ['tr�ng', 'trăng'],
  ['r�i', 'rơi'],
  ['l�\u001bn', 'lên'],
  ['\u001b', ''],
  ['\u0018', ''],
  ['\u0010', ''],
  ['\u0000', ''],
  ['\uFFFD', ''],
]

function isCorrupt(s) {
  if (typeof s !== 'string') return false
  if (s.includes('\uFFFD')) return true
  return VI_REPLACEMENTS.some(([bad]) => s.includes(bad))
}

function fixOne(s) {
  if (typeof s !== 'string') return s
  if (!isCorrupt(s)) return s
  
  let r = s
  for (const [bad, good] of VI_REPLACEMENTS) {
    r = r.split(bad).join(good)
  }
  
  try {
    const buf = Buffer.from(r, 'latin1')
    const back = buf.toString('utf8')
    if (!isCorrupt(back) && back.length >= r.length / 2) r = back
  } catch {}
  
  r = r.replace(/[\u0000-\u001f\u007f-\u009f]/g, '').replace(/\uFFFD/g, '')
  return r
}

function processFile(fp) {
  const content = fs.readFileSync(fp, 'utf8')
  const data = JSON.parse(content)
  if (!data.builds) return false

  let changed = false

  for (const build of data.builds) {
    for (const key of ['nameVi', 'descriptionVi']) {
      if (isCorrupt(build[key])) { build[key] = fixOne(build[key]); changed = true }
    }
    if (build.phases) {
      for (const p of build.phases) {
        for (const k of ['nameVi', 'areasVi']) {
          if (isCorrupt(p[k])) { p[k] = fixOne(p[k]); changed = true }
        }
        if (p.stepsVi) {
          p.stepsVi = p.stepsVi.map(s => { if (isCorrupt(s)) { changed = true; return fixOne(s) } return s })
        }
      }
    }
    if (build.tipsVi) {
      build.tipsVi = build.tipsVi.map(s => { if (isCorrupt(s)) { changed = true; return fixOne(s) } return s })
    }
    if (build.items) {
      for (const item of build.items) {
        for (const k of ['nameVi', 'locationVi']) {
          if (isCorrupt(item[k])) { item[k] = fixOne(item[k]); changed = true }
        }
      }
    }
  }

  if (changed) {
    fs.writeFileSync(fp, JSON.stringify(data, null, 4) + '\n', 'utf8')
  }
  return changed
}

const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'))
let count = 0
for (const f of files) {
  if (processFile(path.join(dataDir, f))) { console.log('Fixed: ' + f); count++ }
  else { console.log('OK: ' + f) }
}
console.log('\n' + count + ' files fixed')
