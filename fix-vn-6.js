const fs = require('fs')
const path = require('path')

const dataDir = 'E:/code/Opencode/build-forge/data'

// Translation patterns from English → Vietnamese
function translateStep(en) {
  let v = en

  // Common patterns
  v = v.replace(/^Choose\s+(.+?)(?:\s+for\s+|$)/i, (m, cls, rest) => {
    return `Chọn ${cls}${rest} để `  
  })
  v = v.replace(/^Pick\s+(.+?)(?:\s+for\s+|$)/i, (m, cls) => `Chọn ${cls}`)

  v = v.replace(/Level\s+(\w+)\s+to\s+(\d+)/gi, 'Tăng $1 lên $2')
  v = v.replace(/Raise\s+(\w+)\s+to\s+(\d+)/gi, 'Tăng $1 lên $2')
  v = v.replace(/Push\s+(\w+)\s+to\s+(\d+)/gi, 'Tăng $1 lên $2')
  v = v.replace(/Pump\s+(\w+)\s+to\s+(\d+)/gi, 'Tăng $1 lên $2')

  v = v.replace(/^Get\s+(.+?)\s+from\s+(.+)/i, 'Lấy $1 từ $2')
  v = v.replace(/^Get\s+(.+?)\s+in\s+(.+)/i, 'Lấy $1 ở $2')
  v = v.replace(/^Farm\s+(.+?)\s+from\s+(.+)/i, 'Farm $1 từ $2')
  v = v.replace(/^Farm\s+(.+?)\s+in\s+(.+)/i, 'Farm $1 ở $2')

  v = v.replace(/\bKill\s+/gi, 'Đánh bại ')
  v = v.replace(/\bDefeat\s+/gi, 'Đánh bại ')
  v = v.replace(/\bBeat\s+/gi, 'Đánh bại ')

  v = v.replace(/^Go to\s+(.+)/i, 'Đến $1')
  v = v.replace(/^Head to\s+(.+)/i, 'Đến $1')
  v = v.replace(/^Travel to\s+(.+)/i, 'Đến $1')
  v = v.replace(/^Return to\s+(.+)/i, 'Quay lại $1')
  v = v.replace(/^Back to\s+(.+)/i, 'Quay lại $1')
  v = v.replace(/^Enter\s+(.+)/i, 'Vào $1')

  v = v.replace(/^Equip\s+(.+)/i, 'Trang bị $1')
  v = v.replace(/^Upgrade\s+(.+?)(?:\s+to\s+(.+))?/i, (m, item, lvl) => lvl ? `Nâng ${item} lên ${lvl}` : `Nâng cấp ${item}`)
  v = v.replace(/^Max\s+(.+?)(?:\s+to\s+(.+))?/i, (m, item) => `Nâng tối đa ${item}`)

  v = v.replace(/^Find\s+(.+)/i, 'Tìm $1')
  v = v.replace(/^Look for\s+(.+)/i, 'Tìm $1')
  v = v.replace(/^Collect\s+(.+)/i, 'Thu thập $1')

  v = v.replace(/^Complete\s+(.+)/i, 'Hoàn thành $1')
  v = v.replace(/^Clear\s+(.+)/i, 'Dọn sạch $1')

  v = v.replace(/^Buy\s+(.+?)\s+from\s+(.+)/i, 'Mua $1 từ $2')

  v = v.replace(/^Use\s+(.+?)(?:\s+for\s+(.+))?/i, (m, item, reason) => reason ? `Dùng $1 cho $2` : `Dùng $1`)

  v = v.replace(/\bStart\s+(.+?)\s+quest\b/gi, 'Bắt đầu nhiệm vụ $1')
  v = v.replace(/\bQuest\b/gi, 'Nhiệm vụ')

  // Stat names
  v = v.replace(/\bVigor\b/g, 'Vigor')
  v = v.replace(/\bEndurance\b/g, 'Endurance')
  v = v.replace(/\bStrength\b/g, 'Strength')
  v = v.replace(/\bDexterity\b/g, 'Dexterity')
  v = v.replace(/\bIntelligence\b/g, 'Intelligence')
  v = v.replace(/\bFaith\b/g, 'Faith')
  v = v.replace(/\bArcane\b/g, 'Arcane')
  v = v.replace(/\bVitality\b/g, 'Vitality')
  v = v.replace(/\bSkill\b/g, 'Skill')
  v = v.replace(/\bBloodtinge\b/g, 'Bloodtinge')
  v = v.replace(/\bBody\b/g, 'Body')
  v = v.replace(/\bReflexes\b/g, 'Reflexes')
  v = v.replace(/\bTechnical\b/g, 'Technical')
  v = v.replace(/\bCool\b/g, 'Cool')
  v = v.replace(/\bMind\b/g, 'Mind')
  v = v.replace(/\bAttunement\b/g, 'Attunement')
  v = v.replace(/\bLuck\b/g, 'Luck')

  return v
}

// Check if string has Vietnamese diacritics
function hasDiacritics(s) {
  if (typeof s !== 'string') return false
  return /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(s)
}

function processFile(fp) {
  const content = fs.readFileSync(fp, 'utf8')
  const data = JSON.parse(content)
  if (!data.builds) return false
  let changed = false

  for (const build of data.builds) {
    if (build.phases) {
      for (const phase of build.phases) {
        if (phase.steps && phase.stepsVi) {
          phase.stepsVi = phase.stepsVi.map((sv, i) => {
            // If Vietnamese is missing diacritics, regenerate from English
            if (hasDiacritics(sv)) return sv  // already good
            const en = phase.steps[i] || sv
            const translated = translateStep(en)
            if (translated !== sv) { changed = true; return translated }
            return sv
          })
        }

        if (phase.nameVi && !hasDiacritics(phase.nameVi)) {
          const known = {
            'Early Game': 'Đầu Game',
            'Mid Game': 'Giữa Game',
            'Late Game': 'Cuối Game',
            'Late Game + DLC': 'Cuối Game + DLC',
            'Late Game + PvP': 'Cuối Game + PvP',
          }
          if (known[phase.name]) {
            phase.nameVi = known[phase.name]
            changed = true
          }
        }
      }
    }

    // Fix tips
    if (build.tips && build.tipsVi) {
      build.tipsVi = build.tipsVi.map((tv, i) => {
        if (hasDiacritics(tv)) return tv
        const en = build.tips[i] || tv
        const translated = translateStep(en)
        if (translated !== tv) { changed = true; return translated }
        return tv
      })
    }

    // Fix nameVi
    if (build.nameVi && !hasDiacritics(build.nameVi) && build.name) {
      // Use existing VI_NAMES mapping
      changed = true  // will set below
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

// Show sample
const sample = JSON.parse(fs.readFileSync(path.join(dataDir, 'elden-ring.json'), 'utf8'))
if (sample.builds && sample.builds[0] && sample.builds[0].phases) {
  console.log('\nSample stepsVi:')
  console.log(sample.builds[0].phases[0].stepsVi.slice(0, 3))
}
