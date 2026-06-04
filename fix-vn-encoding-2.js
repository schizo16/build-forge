const fs = require('fs')
const path = require('path')

const dataDir = 'E:/code/Opencode/build-forge/data'

// Known good Vietnamese phrases for direct replacement
const CORRUPT_MAP = {
  "Äáº§u Game": "Đầu Game",
  "Äáº§u Game": "Đầu Game",
  "Giá»¯a Game": "Giữa Game",
  "Giữa Game": "Giữa Game",
  "Cuá»i Game": "Cuối Game",
  "Cu\u0018i Game": "Cuối Game",
  "Cu\u001ci Game": "Cuối Game",
  "Cu\u001ai Game": "Cuối Game",
  "Cu\u0000i Game": "Cuối Game",
  "Cu\u0018i Game + DLC": "Cuối Game + DLC",
  "Cu\u001ci Game + DLC": "Cuối Game + DLC",
  "Cu\u001ai Game + DLC": "Cuối Game + DLC",
  "Cu\u0000i Game + DLC": "Cuối Game + DLC",
  "Cu\u0018i Game + PvP": "Cuối Game + PvP",
  "Game + DLC": "Game + DLC",
  "Game + PvP": "Game + PvP",
  "Äáº§u": "Đầu",
  "Ä\u0010áº§u": "Đầu",
  "Giá»¯a": "Giữa",
  "Gi\u001ba": "Giữa",
  "Cu\u0018i": "Cuối",
  "Cu\u001ci": "Cuối",
  "Cu\u001ai": "Cuối",
  "Cuá»\u0091i": "Cuối",
  "Cu\u0000i": "Cuối",
}

// Known build nameVi mappings based on build names
const BUILD_NAME_VI = {
  // Cyberpunk
  "B\u001bn T\u001ba C\u00f4ng Ngh\u1ec7": "Bắn Tỉa Công Nghệ",
  "S\u00fang Th\u00f4ng Minh": "Súng Thông Minh",
  "N\u00e9m Dao T\u00e0ng H\u00ecnh": "Ném Dao Tàng Hình",
  "S\u00fang L\u00fac T\u00e0ng H\u00ecnh": "Súng Lục Tàng Hình",
  "LMG Cu\u1ed3ng N\u1ed9": "LMG Cuồng Nộ",
  "S\u00fang Tr\u01b0\u1eddng Ch\u00ednh X\u00e1c": "Súng Trường Chính Xác",
  "Monowire Tr\u00ed Tu\u1ec7": "Monowire Trí Tuệ",
  "Vi\u00ean \u0110\u1ea1n N\u00e9m": "Viên Đạn Ném",
  "Xe T\u0103ng \u0110\u1ed9c Di\u1ec7n": "Xe Tăng Độc Diện",
  "S\u00fang L\u00fac Nhanh Nh\u1eb9n": "Súng Lục Nhanh Nhẹn",
  "\u0110\u1ea5m B\u1ed1c C\u1eadn Chi\u1ebfn": "Đấm Bốc Cận Chiến",
  "Netrunner T\u00e0ng H\u00ecnh": "Netrunner Tàng Hình",
  "S\u00fang L\u00fac Thu\u1ea7n Cool": "Súng Lục Thuần Cool",
  "\u0010\u1ea5m B\u1ed1c To\u00e0n Th\u00e2n": "Đấm Bốc Toàn Thân",
  "S\u00fang C\u00f4ng Ngh\u1ec7 Reflex": "Súng Công Nghệ Reflex",
  
  // Elden Ring (new builds)
  "\u0110\u1ea1i Ki\u1ebfm Tr\u0103ng T\u1ed1i": "Đại Kiếm Trăng Tối",
  "H\u00e0m Qu\u00e1i Th\u00fa Sao R\u01a1i": "Hàm Quái Thú Sao Rơi",
  "S\u00f4ng M\u00e1u": "Sông Máu",
  "Poker T\u1eed Th\u1ea7n": "Poker Tử Thần",
  "\u0110\u1ea1i Ki\u1ebfm S\u00e1t Th\u1ea7n": "Đại Kiếm Sát Thần",
  "Tia Ch\u1edbp Gransax": "Tia Chớp Gransax",
  "Ki\u1ebfm \u0110\u00eam v\u00e0 L\u1eeda": "Kiếm Đêm và Lửa",
  "Ki\u1ebfm T\u1eed Th\u1ea7n Marais": "Kiếm Tử Thần Marais",
  "Ki\u1ebfm Nguy\u1ec1n Morgott": "Kiếm Nguyền Morgott",
  "\u0110\u1ea1i Ki\u1ebfm Ho\u00e0ng Gia": "Đại Kiếm Hoàng Gia",
  "Th\u00e1nh Ki\u1ebfm Di V\u1eadt": "Thánh Kiếm Di Vật",
  "K\u00edch L\u01b0\u1ee1i Eleonora": "Kích Lưỡi Eleonora",
  "Th\u01b0\u01a1ng Th\u1ea7n Mohgwyn": "Thương Thần Mohgwyn",
  "Ki\u1ebfm V\u1ea3y R\u1ed3ng L\u1eeda": "Kiếm Vảy Rồng Lửa",
  
  // DS builds that might have issues
  "Hi\u1ec7p S\u0129 Blasphemous": "Hiệp Sĩ Blasphemous",
  "Ph\u00e1p S\u01b0 L\u1eeda": "Pháp Sư Lửa",
  "Long Giao": "Long Giao",
  "Chi\u1ebfn Binh Ch\u1ea5t L\u01b0\u1ee3ng": "Chiến Binh Chất Lượng",
  "Cu\u1ed3ng T\u00edn S\u1ea5m S\u00e9t": "Cuồng Tín Sấm Sét",
  "Ng\u00f3n Tay Nh\u1eabn": "Ngón Tay Nhẫn",
}

function fixString(str) {
  if (typeof str !== 'string') return str
  
  // Direct replacement for known corrupt patterns
  for (const [corrupt, good] of Object.entries(CORRUPT_MAP)) {
    if (str.includes(corrupt)) {
      str = str.replace(new RegExp(corrupt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), good)
    }
  }
  
  // Fix build nameV i
  for (const [corrupt, good] of Object.entries(BUILD_NAME_VI)) {
    if (str === corrupt) {
      return good
    }
  }
  
  return str
}

function fixObject(obj) {
  if (typeof obj === 'string') {
    return fixString(obj)
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

const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'))
let fixedCount = 0

for (const file of files) {
  const filePath = path.join(dataDir, file)
  const content = fs.readFileSync(filePath, 'utf8')
  const original = JSON.parse(content)
  const fixed = fixObject(original)
  const output = JSON.stringify(fixed, null, 4) + '\n'
  
  if (content !== output) {
    fs.writeFileSync(filePath, output, 'utf8')
    console.log(`✓ Fixed: ${file}`)
    fixedCount++
  } else {
    console.log(`  OK: ${file}`)
  }
}

console.log(`\nFixed ${fixedCount} files with comprehensive encoding repair`)
