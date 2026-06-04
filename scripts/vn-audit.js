const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const MSG_DIR = path.join(__dirname, '..', 'messages');
const WALK_DIR = path.join(__dirname, '..', 'data', 'walkthrough');

const FILES = [
  ...fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json')).map(f => path.join(DATA_DIR, f)),
  ...fs.readdirSync(WALK_DIR).filter(f => f.endsWith('.json')).map(f => path.join(WALK_DIR, f)),
  path.join(MSG_DIR, 'vi.json'),
  path.join(MSG_DIR, 'en.json'),
];

// Known diacritic corrections
const DIACRITIC_FIXES = {
  'dau': 'đầu',
  'duoi': 'dưới', 
  'len': 'lên',
  'truoc': 'trước',
  'sau': 'sau',
  'giua': 'giữa',
  'cuoi': 'cuối',
  'nay': 'này',
  'nay ': 'này ',
  'cac': 'các',
  'cac ': 'các ',
  'nguoi': 'người',
  'nguoi ': 'người ',
  'nhung': 'nhưng',
  'nhung ': 'nhưng ',
  'tot': 'tốt',
  'sat thuong': 'sát thương',
  'sat thuong ': 'sát thương ',
  'sau do': 'sau đó',
  'sau do ': 'sau đó ',
  'neu ban': 'nếu bạn',
  'neu ': 'nếu ',
  'xong ': 'xong ',
  'roi ': 'rồi ',
  'nguoi choi': 'người chơi',
  'nen ': 'nên ',
  'hoac': 'hoặc',
  'thong qua': 'thông qua',
  'vi the ': 'vì thế ',
  'vi vay': 'vì vậy',
  'khong ': 'không ',
  'khong co': 'không có',
  'con ': 'còn ',
  'mot ': 'một ',
  'mot so': 'một số',
  'duoc ': 'được ',
  'ban co the': 'bạn có thể',
  'ban nen': 'bạn nên',
  'cung ': 'cùng ',
  'cung cap': 'cung cấp',
  'cho ': 'cho ',
  'de ': 'để ',
  'de co ': 'để có ',
  'de lay': 'để lấy',
  'de che tao': 'để chế tạo',
  'de tang': 'để tăng',
  'nang cap': 'nâng cấp',
  'nang cao': 'nâng cao',
  'nang ': 'nâng ',
  'nang cap ': 'nâng cấp ',
  'che tao': 'chế tạo',
  'tang ': 'tăng ',
  'tang cuong': 'tăng cường',
  'r©¬i tõ': 'rơi từ',
  'san co': 'sẵn có',
  'ban ': 'bạn ',
  'khi ': 'khi ',
  'thuc hien': 'thực hiện',
  'thuc ': 'thực ',
  'nhan vat': 'nhân vật',
  'nhan ': 'nhận ',
  'su dung': 'sử dụng',
  'su dung ': 'sử dụng ',
  'nhiem vu': 'nhiệm vụ',
  'nhiem vu ': 'nhiệm vụ ',
  'tai nguyen': 'tài nguyên',
  'quan trong': 'quan trọng',
  'them ': 'thêm ',
  'lon ': 'lớn ',
  'nho ': 'nhỏ ',
  'van de': 'vấn đề',
  'cung ': 'cùng ',
  'hay ': 'hãy ',
  'hay ': 'hãy ',
  'tai ': 'tại ',
  'thong thuong': 'thông thường',
  'sat thuong': 'sát thương',
  'sat thuong ': 'sát thương ',
  'dac biet': 'đặc biệt',
  'dac biet ': 'đặc biệt ',
  'nhanh ': 'nhanh ',
  'cham ': 'chậm ',
  'tot nhat': 'tốt nhất',
  'tot nhat ': 'tốt nhất ',
  'sat thuong dinh cao': 'sát thương đỉnh cao',
};

// Common English patterns in Vietnamese fields
const ENGLISH_PATTERNS = [
  /starting (\w+)/gi,
  /the (\w+)/gi,
  /for (\w+)/gi,
  /and (\w+)/gi,
  /Rush to (\w+)/gi,
  /Rush toward (\w+)/gi,
  /Reach your weapon/gi,
  /Prioritize leveling/gi,
  /Explore (\w+)/gi,
  /Talk to every NPC/gi,
  /Save Smithing Stones/gi,
  /Purchase a backup/gi,
  /Master your weapon/gi,
  /Summon NPC/gi,
  /Collect every flask/gi,
  /Revisit merchants/gi,
  /Kill every optional/gi,
  /Buy basic spells/gi,
  /Keep Endurance/gi,
  /Experiment with Weapon/gi,
  /Check the Whetblade/gi,
  /Farm the best/gi,
  /Max your primary/gi,
  /Clear optional|Complete the DLC|Stack multiplicative|Use Terra Magicus|Learn endgame|Optimize flask|Customize your Physick|Upgrade a secondary|Aim for poise|Equip the strongest|Test your build|Record your damage|Stay at the meta|Attune a diverse|Carry backup|Apply weapon buffs|Stock up on|Never go above/gi,
  /Push (\w+) to the soft cap/gi,
  /Consider respeccing/gi,
  /Join a covenant/gi,
  /Invest in Mind/gi,
  /Infuse your weapon/gi,
  /Collect respec items/gi,
  /Target 35-40 Vigor/gi,
  /Maintain medium roll/gi,
  /Use consumables/gi,
  /Stockpile crafting/gi,
  /Stock up on throwing/gi,
  /Practice your core/gi,
  /Find the best catalyst/gi,
];

const CATEGORIES = {};
let totalIssues = 0;

function scanFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const ext = path.extname(filePath).toLowerCase();
  if (ext !== '.json') return;
  
  const relativePath = path.relative(path.join(__dirname, '..'), filePath);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;
    
    // Check for English text in Vietnamese fields
    if (/"(nameVi|descriptionVi|stepsVi|tipsVi|verdictVi|areaVi|locationVi|gameClassVi|itemTypeVi)"\s*:/i.test(line)) {
      // Check if the value is entirely English
      const match = line.match(/:\s*"([^"]+)"/);
      if (match) {
        const val = match[1];
        
        // Skip pure English game names
        if (/^(Elden Ring|Dark Souls|Bloodborne|Cyberpunk 2077|Dark Souls I{1,3})$/.test(val)) continue;
        
        const hasVietnamese = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(val);
        const hasEnglishContent = /[a-zA-Z]{4,}/.test(val);
        
        if (!hasVietnamese && hasEnglishContent && val.length > 10) {
          CATEGORIES['English-only Vietnamese field'] = (CATEGORIES['English-only Vietnamese field'] || 0) + 1;
          totalIssues++;
        }
        
        // Check for encoding artifacts
        if (/\\u\d{4}|�|Ã|Â|¢|°|±|§|®/i.test(val)) {
          CATEGORIES['Encoding corruption'] = (CATEGORIES['Encoding corruption'] || 0) + 1;
          totalIssues++;
        }
        
        // Check for mixed English-Vietnamese
        const viChars = (val.match(/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/gi) || []).length;
        const enWords = (val.match(/\b[a-z]{3,}\b/gi) || []).length;
        if (viChars > 0 && enWords > 5) {
          CATEGORIES['Mixed EN/VN (mostly English)'] = (CATEGORIES['Mixed EN/VN (mostly English)'] || 0) + 1;
          totalIssues++;
        }
        
        // Check for missing diacritics in Vietnamese text
        if (viChars > 0) {
          const words = val.split(/[\s,;.()]+/);
          for (const word of words) {
            const lower = word.toLowerCase();
            for (const [pattern, fix] of Object.entries(DIACRITIC_FIXES)) {
              if (lower === pattern && lower !== fix.toLowerCase()) {
                // Only flag if other Vietnamese chars exist
                CATEGORIES['Missing diacritics'] = (CATEGORIES['Missing diacritics'] || 0) + 1;
                totalIssues++;
                break;
              }
            }
          }
        }
      }
    }
    
    // Check locationVi for English
    if (/"(locationVi)"\s*:/i.test(line)) {
      const match = line.match(/:\s*"([^"]+)"/);
      if (match) {
        const val = match[1];
        if (/^[A-Z][a-z]+(?:\s+[a-z]+){2,}/.test(val) && val.length > 15 && !/[đàáạảãâ]/i.test(val)) {
          CATEGORIES['locationVi still English'] = (CATEGORIES['locationVi still English'] || 0) + 1;
          totalIssues++;
        }
      }
    }
  }
}

// Walkthrough walkthrough files
function scanWalkthrough(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(content);
  const relativePath = path.relative(path.join(__dirname, '..'), filePath);
  
  function walk(obj, pathStr) {
    if (typeof obj === 'string') {
      // Check every string in walkthrough for issues
      if (/(?:(?:^|[.!?]\s+)(?:[Tt]he|[Ii]t is|[Tt]his is|[Yy]ou should|[Yy]ou can|[Ii]f you|[Nn]ow you|[Ll]et's|[Mm]ake sure|[Dd]on't forget))/g.test(obj) && /[đàáạả]/i.test(obj)) {
        CATEGORIES['Walkthrough English phrasing in VN'] = (CATEGORIES['Walkthrough English phrasing in VN'] || 0) + 1;
        totalIssues++;
      }
    } else if (Array.isArray(obj)) {
      obj.forEach((item, i) => walk(item, `${pathStr}[${i}]`));
    } else if (obj && typeof obj === 'object') {
      for (const key of Object.keys(obj)) {
        walk(obj[key], `${pathStr}.${key}`);
      }
    }
  }
  
  walk(data, relativePath);
}

// Run scan
for (const file of FILES) {
  scanFile(file);
  if (file.includes('walkthrough')) {
    scanWalkthrough(file);
  }
}

console.log('=== VIETNAMESE AUDIT REPORT ===\n');
console.log(`Files scanned: ${FILES.length}`);
console.log(`Total issues found: ${totalIssues}\n`);

for (const [cat, count] of Object.entries(CATEGORIES).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${cat}: ${count}`);
}

console.log('\n=== RECOMMENDED ACTIONS ===\n');
console.log('1. Fix messages/vi.json - UI translations (foundation)');
console.log('2. Fix itemTypeVi encoding in elden-ring.json');
console.log('3. Fix verdictVi entries - missing diacritics');
console.log('4. Fix locationVi entries - translate to VN');
console.log('5. Fix stepsVi entries - remove English phrases');
console.log('6. Fix tipsVi entries - translate to VN');
console.log('7. Review walkthrough content');

// Now write a fix script
const fixScript = `
This audit found ${totalIssues} potential issues across ${FILES.length} files.

TOP PRIORITY FIXES:
1. \`messages/vi.json\` - UI labels are OK but should be verified
2. \`elden-ring.json\` itemTypeVi has encoding corruption ("B�a" → "Bùa")
3. All \`verdictVi\` fields across all games have missing diacritics
4. Many \`locationVi\` fields are still pure English
5. \`stepsVi\` fields mix Vietnamese and English (e.g., "Chọn Samurai để starting...")
6. \`tipsVi\` fields often entirely in English
7. DS3 "Tot nhat" → "Tốt nhất", "Sat thuong" → "Sát thương" across all files

MANUAL FIXES NEEDED FOR STEPSVI:
The stepsVi fields contain procedural content that mixes languages.
Example patterns to fix:
- "Chọn Samurai để starting Uchigatana" → "Chọn Samurai để lấy Uchigatana khởi đầu"
- "Tng Vigor lên 25" → "Tăng Vigor lên 25"
- "Rush to Fort Haight" → "Chạy đến Fort Haight"
- "Lấy the Bloody Slash" → "Lấy Bloody Slash"
`;

console.log(fixScript);

// Write report
fs.writeFileSync(
  path.join(__dirname, 'vn-audit-report.txt'),
  `Vietnamese Audit Report - ${new Date().toISOString()}\n${'='.repeat(60)}\n\nIssues found: ${totalIssues}\n\nCategories:\n${Object.entries(CATEGORIES).sort((a,b)=>b[1]-a[1]).map(([c,n])=>`  ${c}: ${n}`).join('\n')}\n`
);

console.log('\nReport written to scripts/vn-audit-report.txt');
