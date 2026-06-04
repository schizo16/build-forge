const fs = require('fs')
const path = require('path')

const dataDir = 'E:/code/Opencode/build-forge/data'
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'))

function fixMojibake(text) {
  if (typeof text !== 'string') return text
  
  // Try to detect if text has mojibake (corrupted Vietnamese)
  // Common patterns: Ä, áº§, á»¯, Ä, etc.
  const corruptPattern = /[ÃÄÈÊÎÔÕÙÜÝàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþ]/
  
  if (!corruptPattern.test(text)) return text
  
  try {
    // Convert the string back to bytes as if it were Latin-1, then re-decode as UTF-8
    const buffer = Buffer.from(text, 'latin1')
    const fixed = buffer.toString('utf8')
    
    // Verify the fix worked - check if it still has corruption
    if (corruptPattern.test(fixed)) {
      // Try harder: some mojibake is double-encoded
      const buffer2 = Buffer.from(fixed, 'latin1')
      return buffer2.toString('utf8')
    }
    
    return fixed
  } catch {
    return text
  }
}

function fixObject(obj) {
  if (typeof obj === 'string') {
    return fixMojibake(obj)
  }
  if (Array.isArray(obj)) {
    return obj.map(fixObject)
  }
  if (obj && typeof obj === 'object') {
    const result = {}
    for (const [key, value] of Object.entries(obj)) {
      result[key] = fixObject(value)
    }
    return result
  }
  return obj
}

let totalFixed = 0

for (const file of files) {
  const filePath = path.join(dataDir, file)
  const content = fs.readFileSync(filePath, 'utf8')
  const original = JSON.parse(content)
  const fixed = fixObject(original)
  const output = JSON.stringify(fixed, null, 4)
  
  // Count fixed strings
  const originalStr = JSON.stringify(original)
  const fixedStr = JSON.stringify(fixed)
  if (originalStr !== fixedStr) {
    totalFixed++
    fs.writeFileSync(filePath, output, 'utf8')
    console.log(`✓ Fixed: ${file}`)
  } else {
    console.log(`  OK: ${file}`)
  }
}

console.log(`\nFixed ${totalFixed} files`)
