const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const MSG_DIR = path.join(__dirname, '..', 'messages');
const WALK_DIR = path.join(__dirname, '..', 'data', 'walkthrough');

const FIXED = { files: 0, strings: 0 };

// Known corrections for missing diacritics (word-level, whole word only)
const WORD_FIXES = {
  // Common Vietnamese words missing diacritics
  'dau': 'đầu', 'duoi': 'dưới', 'len': 'lên', 'truoc': 'trước',
  'sau': 'sau', 'giua': 'giữa', 'cuoi': 'cuối', 'nay': 'này',
  'cac': 'các', 'nguoi': 'người', 'nhung': 'nhưng', 'tot': 'tốt',
  'nhat': 'nhất', 'rat': 'rất', 'qua': 'qua', 'la': 'là',
  'cua': 'của', 'co': 'có', 've': 'về', 'hoac': 'hoặc',
  'ho tro': 'hỗ trợ', 'nen': 'nên', 'xong': 'xong', 'roi': 'rồi',
  'thuong': 'thương', 'nang': 'nâng', 'tang': 'tăng',
  'them': 'thêm', 'lon': 'lớn', 'nho': 'nhỏ', 'nhan': 'nhận',
  'lua': 'lửa', 'bao': 'bão', 'nam': 'năm', 'ben': 'bên',
  'thuong ': 'thường ', 'dung ': 'đúng ', 'dung': 'đúng',
  'trong ': 'trong ', 'giua ': 'giữa ', 'cuoi ': 'cuối ',
  'sau ': 'sau ', 'len ': 'lên ', 'len': 'lên',
  'duoi ': 'dưới ', 'dau ': 'đầu ', 'truoc ': 'trước ',
  'nay ': 'này ', 'nay': 'này',
  // Game-specific
  'sat thuong': 'sát thương', 'sat thuong ': 'sát thương ',
  'sat thuong dinh cao': 'sát thương đỉnh cao',
  'che tao': 'chế tạo', 'nang cap': 'nâng cấp', 
  'nhiem vu': 'nhiệm vụ', 'su dung': 'sử dụng',
  'trang bi': 'trang bị', 'gay sat': 'gây sát',
  'tot nhat': 'tốt nhất', 'tot cho': 'tốt cho',
  'kho': 'khó', 'de': 'để', 'thap': 'thấp',
  'cao': 'cao', 'manh': 'mạnh', 'yeu': 'yếu',
  'hieu qua': 'hiệu quả', 'moi ': 'mới ',
  'cu ': 'cũ ', 'thu ': 'thử ',
  'nhanh ': 'nhanh ', 'cham ': 'chậm ',
  'dac biet': 'đặc biệt', 'quan trong': 'quan trọng',
  'van de': 'vấn đề', 'mot ': 'một ',
  'duoc ': 'được ', 'con ': 'còn ',
  'hoi ': 'hồi ', 'chinh ': 'chính ',
  'phai ': 'phải ', 'tai ': 'tại ',
  'cho ': 'cho ', 'voi ': 'với ',
  'khong ': 'không ', 'ban ': 'bạn ',
  'khi ': 'khi ', 'cung ': 'cùng ',
  'nhieu': 'nhiều', 'hieu ': 'hiểu ',
  'tich ': 'tích ', 'chay ': 'chảy ',
  'thoat': 'thoát', 'kha nang': 'khả năng',
  'nhan vat': 'nhân vật', 'dau tien': 'đầu tiên',
  'tiep theo': 'tiếp theo', 'cuoi cung': 'cuối cùng',
  'bat buoc': 'bắt buộc', 'dong ho': 'đồng hồ',
  'tam ': 'tạm ', 'thoi ': 'thời ',
  'thay the': 'thay thế', 'phu hop': 'phù hợp',
  'rat tot': 'rất tốt', 'rat cao': 'rất cao',
  'thap hon': 'thấp hơn', 'cao hon': 'cao hơn',
  'nhi ': 'nhi ', 'muc ': 'mức ',
  'do ': 'độ ', 'loai ': 'loại ',
  'phan ': 'phần ', 'thuong': 'thường',
};

const BIGRAM_FIXES = [
  // Two-word phrases for more context
  ['de co ', 'để có '],
  ['de lay ', 'để lấy '],
  ['de tang ', 'để tăng '],
  ['de che tao ', 'để chế tạo '],
  ['de dat ', 'để đạt '],
  ['de tranh ', 'để tránh '],
  ['de mo ', 'để mở '],
  ['co the ', 'có thể '],
  ['nen ', 'nên '],
  ['ban nen ', 'bạn nên '],
  ['ban co the ', 'bạn có thể '],
  ['neu ban ', 'nếu bạn '],
  ['sau do ', 'sau đó '],
  ['xong thi ', 'xong thì '],
  ['roi ', 'rồi '],
  ['muon ', 'muốn '],
  ['khi ban ', 'khi bạn '],
  ['khi dang ', 'khi đang '],
  ['se ', 'sẽ '],
  ['da ', 'đã '],
  ['dang ', 'đang '],
  ['khong the ', 'không thể '],
  ['khong co ', 'không có '],
  ['khong duoc ', 'không được '],
  ['khong nen ', 'không nên '],
  ['phai ', 'phải '],
  ['can ', 'cần '],
  ['can phai ', 'cần phải '],
  ['giup ', 'giúp '],
  ['thuong ', 'thường '],
  ['luon ', 'luôn '],
  ['cung cap ', 'cung cấp '],
  ['cung nhau ', 'cùng nhau '],
  ['truoc khi ', 'trước khi '],
  ['sau khi ', 'sau khi '],
  ['trong khi ', 'trong khi '],
  ['sau do ', 'sau đó '],
  ['vi vay ', 'vì vậy '],
  ['vi the ', 'vì thế '],
  ['do do ', 'do đó '],
  ['tuy nhien ', 'tuy nhiên '],
  ['mac du ', 'mặc dù '],
  ['boi vi ', 'bởi vì '],
  ['nhu la ', 'như là '],
  ['nhu the ', 'như thế '],
  ['cung ', 'cùng '],
  ['chinh la ', 'chính là '],
];

function fixString(str) {
  if (typeof str !== 'string') return str;
  let fixed = str;
  let changed = false;

  // Fix encoding corruption (escaped unicode characters)
  fixed = fixed.replace(/\\u0003/g, '');
  
  // Replace corrupted unicode sequences and common encoding artifacts
  // This handles the Latin-1 misinterpreted as UTF-8 pattern
  fixed = fixed
    .replace(/\u00e0/g, 'à').replace(/\u00e1/g, 'á').replace(/\u00e3/g, 'ã')
    .replace(/\u00e2/g, 'â').replace(/\u00e8/g, 'è').replace(/\u00e9/g, 'é')
    .replace(/\u00ea/g, 'ê').replace(/\u00ec/g, 'ì').replace(/\u00ed/g, 'í')
    .replace(/\u00f2/g, 'ò').replace(/\u00f3/g, 'ó').replace(/\u00f5/g, 'õ')
    .replace(/\u00f4/g, 'ô').replace(/\u00f9/g, 'ù').replace(/\u00fa/g, 'ú')
    .replace(/\u00fd/g, 'ý').replace(/\u0111/g, 'đ')
    .replace(/\u0103/g, 'ă').replace(/\u01a1/g, 'ơ')
    .replace(/\u01b0/g, 'ư');
  
  // Encoding fixes already applied above

  // Fix word-level diacritics
  const words = fixed.split(/(\s+)/);
  for (let i = 0; i < words.length; i++) {
    const lower = words[i].toLowerCase().replace(/^["']|["']$/g, '');
    const punct = words[i].replace(/[^a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/g, '');
    const clean = words[i].replace(/[^a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/g, '');
    
    if (WORD_FIXES[lower]) {
      const replacement = WORD_FIXES[lower];
      // Preserve capitalization
      if (words[i][0] === words[i][0]?.toUpperCase() && words[i].length > 1) {
        const newWord = replacement[0].toUpperCase() + replacement.slice(1);
        if (newWord !== words[i]) {
          changed = true;
          words[i] = newWord;
        }
      } else if (replacement !== words[i]) {
        changed = true;
        words[i] = replacement;
      }
    }
  }
  fixed = words.join('');

  // Apply bigram fixes
  for (const [bad, good] of BIGRAM_FIXES) {
    const regex = new RegExp(bad.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    if (regex.test(fixed)) {
      fixed = fixed.replace(regex, good);
      changed = true;
    }
  }

  // Remove leading English template text that shouldn't be there
  // e.g., "Chọn Samurai để starting Uchigatana" -> keep but flag
  // Common pattern: Vietnamese start then switches to English
  fixed = fixed.replace(/để starting/gi, 'để lấy');
  fixed = fixed.replace(/để the /gi, 'để ');
  fixed = fixed.replace(/the low starting/gi, 'chỉ số thấp khởi đầu');
  fixed = fixed.replace(/the best starting/gi, 'chỉ số khởi đầu tốt nhất');
  fixed = fixed.replace(/high starting/gi, 'chỉ số cao');
  fixed = fixed.replace(/starting staff/gi, 'cây gậy khởi đầu');
  fixed = fixed.replace(/starting weapon/gi, 'vũ khí khởi đầu');
  fixed = fixed.replace(/starting spell/gi, 'phép khởi đầu');
  fixed = fixed.replace(/starting chime/gi, 'chuông khởi đầu');
  fixed = fixed.replace(/starting flame/gi, 'lửa khởi đầu');
  fixed = fixed.replace(/starting cat/gi, 'chất xúc tác khởi đầu');
  fixed = fixed.replace(/starting Rapier/gi, 'Rapier khởi đầu');
  fixed = fixed.replace(/determines your early/gi, 'sẽ quyết định lối chơi đầu');
  fixed = fixed.replace(/Rush to /gi, 'Chạy đến ');
  fixed = fixed.replace(/Rush toward/gi, 'Chạy đến');
  fixed = fixed.replace(/Get /gi, 'Lấy ');
  fixed = fixed.replace(/the /gi, '');
  fixed = fixed.replace(/ and /gi, ' và ');
  fixed = fixed.replace(/ with /gi, ' với ');

  // Fix "ng" pattern (missing "ư" or "u" in Vietnamese)
  fixed = fixed.replace(/\bng\b/gi, 'và');
  fixed = fixed.replace(/\bvao\b/gi, 'vào');
  
  if (changed) {
    FIXED.strings++;
  }
  
  return fixed;
}

function fixFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) return;
    const ext = path.extname(filePath);
    if (ext !== '.json') return;
    
    const relativePath = path.relative(path.join(__dirname, '..'), filePath);
    
    // Read as text to handle corrupted encodings
    let content = fs.readFileSync(filePath, 'utf-8');
    const original = content;
    
    // Fix encoding corruption - replace unicode escape sequences
    content = content.replace(/\\(u[0-9a-fA-F]{4})/g, (match, hex) => {
      return String.fromCharCode(parseInt(hex.slice(1), 16));
    });
    
    // Fix bad control characters (char codes in ranges that break JSON)
    content = content.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/g, '');
    
    let data;
    try {
      data = JSON.parse(content);
    } catch (parseErr) {
      // If still failing, do text-level fixes only
      console.log(`  ~ Text-level fix only for: ${relativePath}`);
      
      // Apply word-level fixes directly on text
      let textFixed = content;
      
      // Fix common Vietnamese issues in text
      for (const [bad, good] of Object.entries(WORD_FIXES)) {
        const regex = new RegExp(`\\b${bad}\\b`, 'gi');
        textFixed = textFixed.replace(regex, (match) => {
          if (match[0] === match[0]?.toUpperCase() && match.length > 1) {
            return good[0].toUpperCase() + good.slice(1);
          }
          return good;
        });
      }
      
      // Apply bigram fixes
      for (const [bad, good] of BIGRAM_FIXES) {
        const regex = new RegExp(bad.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        textFixed = textFixed.replace(regex, good);
      }
      
      if (textFixed !== content) {
        fs.writeFileSync(filePath, textFixed, 'utf-8');
        FIXED.files++;
      }
      return;
    }
    
    function deepFix(obj, path_ = '') {
      if (typeof obj === 'string') {
        const fixed = fixString(obj);
        return fixed;
      } else if (Array.isArray(obj)) {
        return obj.map((item, i) => deepFix(item, `${path_}[${i}]`));
      } else if (obj !== null && typeof obj === 'object') {
        const result = {};
        for (const [key, val] of Object.entries(obj)) {
          result[key] = deepFix(val, `${path_}.${key}`);
        }
        return result;
      }
      return obj;
    }
    
    const fixedData = deepFix(data);
    const fixedContent = JSON.stringify(fixedData, null, 4);
    
    if (fixedContent !== content) {
      // Verify it's parseable
      try { JSON.parse(fixedContent); } catch(e) { throw new Error(`Generated invalid JSON: ${e.message}`); }
      fs.writeFileSync(filePath, fixedContent, 'utf-8');
      FIXED.files++;
      console.log(`  ✓ Fixed: ${relativePath}`);
    } else {
      console.log(`  - No changes needed: ${relativePath}`);
    }
  } catch (err) {
    console.error(`  ✗ Error in ${filePath}: ${err.message}`);
  }
}

// Main
console.log('=== VIETNAMESE AUTO-FIXER ===\n');

// Fix messages
console.log('1. messages/vi.json');
fixFile(path.join(MSG_DIR, 'vi.json'));

// Fix data files
console.log('\n2. Data files (game builds)');
const dataFiles = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
for (const f of dataFiles) {
  fixFile(path.join(DATA_DIR, f));
}

// Fix walkthrough files
console.log('\n3. Walkthrough files');
if (fs.existsSync(WALK_DIR)) {
  const walkFiles = fs.readdirSync(WALK_DIR).filter(f => f.endsWith('.json'));
  for (const f of walkFiles) {
    fixFile(path.join(WALK_DIR, f));
  }
}

console.log(`\n=== SUMMARY ===`);
console.log(`Files modified: ${FIXED.files}`);
console.log(`Strings fixed: ${FIXED.strings}`);
console.log('\nNOTE: Auto-fixer handles diacritics and encoding only.');
console.log('Complex mixed-language strings in stepsVi/tipsVi need manual review.');
