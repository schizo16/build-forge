const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const MSG_DIR = path.join(__dirname, '..', 'messages');
const WALK_DIR = path.join(__dirname, '..', 'data', 'walkthrough');

const FIXED = { files: 0, vnFields: 0, enRestored: 0 };

// VI-only field patterns (keys ending in Vi or containing Vi in key)
function isViField(key) {
  return /Vi$/i.test(key) || /^tipsVi$/i.test(key);
}

// Known word fixes
const WORD_FIXES = {
  'dau': 'đầu', 'duoi': 'dưới', 'len': 'lên', 'truoc': 'trước',
  'sau': 'sau', 'giua': 'giữa', 'cuoi': 'cuối', 'nay': 'này',
  'cac': 'các', 'nguoi': 'người', 'nhung': 'nhưng', 'tot': 'tốt',
  'nhat': 'nhất', 'rat': 'rất', 'qua': 'qua', 'la': 'là',
  'cua': 'của', 'co': 'có', 've': 'về', 'hoac': 'hoặc',
  'ho tro': 'hỗ trợ', 'nen': 'nên', 'xong': 'xong', 'roi': 'rồi',
  'thuong': 'thương', 'nang': 'nâng', 'tang': 'tăng',
  'them': 'thêm', 'lon': 'lớn', 'nho': 'nhỏ', 'nhan': 'nhận',
  'lua': 'lửa', 'ban': 'bạn', 'khi': 'khi', 'cung': 'cùng',
  'nhieu': 'nhiều', 'chay': 'chảy', 'thoat': 'thoát',
  'kha nang': 'khả năng', 'nhan vat': 'nhân vật',
  'dau tien': 'đầu tiên', 'tiep theo': 'tiếp theo',
  'cuoi cung': 'cuối cùng', 'bat buoc': 'bắt buộc',
  'tam': 'tạm', 'thoi': 'thời', 'thay the': 'thay thế',
  'phu hop': 'phù hợp', 'thap hon': 'thấp hơn',
  'cao hon': 'cao hơn', 'toi da': 'tối đa',
  'su dung': 'sử dụng', 'che tao': 'chế tạo',
  'nang cap': 'nâng cấp', 'nhiem vu': 'nhiệm vụ',
  'trang bi': 'trang bị', 'sat thuong': 'sát thương',
  'dac biet': 'đặc biệt', 'quan trong': 'quan trọng',
  'van de': 'vấn đề', 'thuc hien': 'thực hiện',
  'hieu qua': 'hiệu quả', 'nhanh': 'nhanh',
  'cham': 'chậm', 'manh': 'mạnh', 'yeu': 'yếu',
  'thuong': 'thường', 'chinh': 'chính',
  'lien tuc': 'liên tục', 'so huu': 'sở hữu',
  'phai': 'phải', 'tai': 'tại',
  'khong': 'không', 'cho': 'cho', 'voi': 'với',
  'de': 'để', 'duoc': 'được', 'con': 'còn',
  'mot': 'một', 'moi': 'mới', 'cu': 'cũ',
  'da': 'đã', 'dang': 'đang', 'se': 'sẽ',
  'can': 'cần', 'phai co': 'phải có',
  'chay den': 'chạy đến', 'lay': 'lấy',
  'giet': 'giết', 'tim': 'tìm', 'den': 'đến',
  'luc': 'lúc', 'sau do': 'sau đó',
  'truoc': 'trước', 'tiep': 'tiếp',
  'muon': 'muốn', 'nen': 'nên',
  'that bai': 'thất bại', 'thanh cong': 'thành công',
};

const PHRASE_FIXES = [
  ['starting ', 'khởi đầu '],
  ['determines your early ', 'sẽ quyết định lối chơi đầu '],
  [' and ', ' và '],
  [' with ', ' với '],
];

function fixVNString(str) {
  if (typeof str !== 'string') return str;
  let fixed = str;

  // Phase 1: Fix encoding issues  
  fixed = fixed.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/g, '');
  fixed = fixed.replace(/\\u0003/g, '');

  // Phase 2: Fix word-level diacritics
  // Only fix words that appear to be Vietnamese (have at least some VN context)
  const hasVNChars = /[đàáạảãâ]/i.test(fixed);
  if (hasVNChars) {
    const words = fixed.split(/(\s+)/);
    for (let i = 0; i < words.length; i++) {
      const lower = words[i].toLowerCase().replace(/^["'(\[,]|["')\],.]$/g, '');
      const clean = lower.replace(/[^a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/g, '');
      
      if (WORD_FIXES[clean] && clean !== WORD_FIXES[clean].toLowerCase()) {
        const orig = words[i];
        const replacement = WORD_FIXES[clean];
        // Preserve capitalization
        if (orig[0] === orig[0]?.toUpperCase() && orig.length > 1) {
          const newWord = replacement[0].toUpperCase() + replacement.slice(1);
          if (newWord !== orig) {
            words[i] = orig.replace(new RegExp(clean, 'i'), newWord);
            if (words[i] === orig) words[i] = newWord;
          }
        } else if (replacement !== orig.toLowerCase()) {
          words[i] = replacement;
        }
      }
    }
    fixed = words.join('');
  }

  // Phase 3: Apply common phrase fixes for Vietnamese strings
  for (const [bad, good] of PHRASE_FIXES) {
    const regex = new RegExp(bad.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    fixed = fixed.replace(regex, good);
  }

  return fixed;
}

function processFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) return;
    const relativePath = path.relative(path.join(__dirname, '..'), filePath);
    if (path.extname(filePath) !== '.json') return;
    
    let content = fs.readFileSync(filePath, 'utf-8');
    const original = content;
    
    let data = JSON.parse(content);
    
    function deepFix(obj, pathStr = '') {
      if (typeof obj === 'string') {
        return obj; // Strings are processed by key context
      } else if (Array.isArray(obj)) {
        return obj.map((item, i) => deepFix(item, `${pathStr}[${i}]`));
      } else if (obj !== null && typeof obj === 'object') {
        const result = {};
        for (const [key, val] of Object.entries(obj)) {
          if (isViField(key) && typeof val === 'string') {
            const fixed = fixVNString(val);
            if (fixed !== val) {
              FIXED.vnFields++;
            }
            result[key] = fixed;
          } else if (isViField(key) && Array.isArray(val)) {
            result[key] = val.map(item => {
              if (typeof item === 'string') {
                const fixed = fixVNString(item);
                if (fixed !== item) FIXED.vnFields++;
                return fixed;
              }
              return deepFix(item, `${pathStr}.${key}`);
            });
          } else {
            result[key] = deepFix(val, `${pathStr}.${key}`);
          }
        }
        return result;
      }
      return obj;
    }
    
    const fixedData = deepFix(data);
    const fixedContent = JSON.stringify(fixedData, null, 4) + '\n';
    
    if (fixedContent !== content) {
      fs.writeFileSync(filePath, fixedContent, 'utf-8');
      FIXED.files++;
      console.log(`  ✓ Fixed VN fields: ${relativePath}`);
    } else {
      console.log(`  - No VN changes: ${relativePath}`);
    }
  } catch (err) {
    console.error(`  ✗ ${err.message}`);
  }
}

console.log('=== VIETNAMESE FIELD-ONLY FIXER ===\n');
console.log('This only modifies *Vi fields (nameVi, descriptionVi, stepsVi, etc.)\n');

// Fix messages
processFile(path.join(MSG_DIR, 'vi.json'));

// Fix data files
const dataFiles = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
for (const f of dataFiles) {
  processFile(path.join(DATA_DIR, f));
}

// Fix walkthrough files
if (fs.existsSync(WALK_DIR)) {
  const walkFiles = fs.readdirSync(WALK_DIR).filter(f => f.endsWith('.json'));
  for (const f of walkFiles) {
    processFile(path.join(WALK_DIR, f));
  }
}

console.log(`\n=== SUMMARY ===`);
console.log(`Files modified: ${FIXED.files}`);
console.log(`VN fields fixed: ${FIXED.vnFields}`);
console.log('\nEnglish descriptions and non-Vi fields are UNCHANGED.');
