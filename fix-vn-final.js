const fs = require('fs')
const path = require('path')

const dataDir = 'E:/code/Opencode/build-forge/data'

function hasDiacritics(s) {
  if (typeof s !== 'string') return false
  return /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(s)
}

// Simple fallback: if Vietnamese text has no diacritics, use English instead
function fixFile(fp) {
  const content = fs.readFileSync(fp, 'utf8')
  const data = JSON.parse(content)
  if (!data.builds) return false
  let changed = false

  for (const build of data.builds) {
    // Fix nameVi
    if (build.nameVi && !hasDiacritics(build.nameVi) && build.name) {
      build.nameVi = build.name
      changed = true
    }

    // Fix descriptionVi
    if (build.descriptionVi && !hasDiacritics(build.descriptionVi) && build.description) {
      build.descriptionVi = build.description
      changed = true
    }

    if (build.phases) {
      for (const phase of build.phases) {
        // Fix phase nameVi
        if (phase.nameVi && !hasDiacritics(phase.nameVi) && phase.name) {
          phase.nameVi = phase.name
          changed = true
        }
        if (phase.areasVi && !hasDiacritics(phase.areasVi) && phase.areas) {
          phase.areasVi = phase.areas
          changed = true
        }
        // Fix stepsVi: if ANY step is bad, copy all from English
        if (phase.stepsVi && phase.steps) {
          const allCorrupt = phase.stepsVi.every(s => !hasDiacritics(s))
          if (allCorrupt && phase.steps.length > 0) {
            phase.stepsVi = [...phase.steps]
            changed = true
          }
        }
      }
    }

    // Fix tipsVi
    if (build.tipsVi && build.tips) {
      const allCorrupt = build.tipsVi.every(s => !hasDiacritics(s))
      if (allCorrupt && build.tips.length > 0) {
        build.tipsVi = [...build.tips]
        changed = true
      }
    }

    // Fix items
    if (build.items) {
      for (const item of build.items) {
        if (item.nameVi && !hasDiacritics(item.nameVi) && item.name) {
          item.nameVi = item.name
          changed = true
        }
        if (item.locationVi && !hasDiacritics(item.locationVi) && item.location) {
          item.locationVi = item.location
          changed = true
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
  if (fixFile(path.join(dataDir, f))) { console.log('Fixed: ' + f); count++ }
  else { console.log('OK: ' + f) }
}
console.log('\n' + count + ' files fixed - corrupted VN text replaced with English fallback')
