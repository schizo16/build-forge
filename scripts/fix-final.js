const fs = require('fs');
const path = require('path');

// Comprehensive fix for all Vietnamese fields across all game data files
// This handles: FFFD corruption, missing diacritics, control chars, mixed languages

const FFFD = '\uFFFD';

// Word-level diacritic fixes (targeted at Vietnamese words)
const DIACRITIC_FIXES = {
  // vowels with tone marks
  'a': 'a', 'a\n': '', // special handling
  'a ': 'à ', 'a.': 'à.', 'a,': 'à,', 'a?': 'à?',
  'a ': 'á ', 'a.': 'á.', 'a,': 'á,',
  'a ': 'ạ ', 'a.': 'ạ.',
  'a ': 'ả ', 'a.': 'ả.',
  'a ': 'ã ', 'a.': 'ã.',
  'a ': 'â ',
  
  // Specific words that are commonly wrong
  'lua': 'lựa', 'lua chon': 'lựa chọn',
  'chon': 'chọn', 'chon ': 'chọn ',
  'te': 'tệ', 'te nhat': 'tệ nhất',
  'nhat': 'nhất', 'nhat ': 'nhất ',
  'tot': 'tốt', 'tot ': 'tốt ',
  'khong': 'không', 'khong ': 'không ',
  'tang': 'tăng', 'tang ': 'tăng ',
  'chay': 'chảy', 'chay ': 'chảy ',
  'mau': 'máu', 'mau ': 'máu ',
  'tich': 'tích', 'tich ': 'tích ',
  'luy': 'lũy', 'luy ': 'lũy ',
  'thap': 'thấp', 'thap ': 'thấp ',
  'hon': 'hơn', 'hon ': 'hơn ',
  'on dinh': 'ổn định',
  'mac dinh': 'mặc định',
  'chi can': 'chỉ cần',
  'chi dung': 'chỉ dùng',
  'hieu ung': 'hiệu ứng',
  'bang': 'băng', 'bang ': 'băng ',
  'giam': 'giảm', 'giam ': 'giảm ',
  'neu': 'nếu', 'neu ': 'nếu ',
  'muon': 'muốn', 'muon ': 'muốn ',
  'khuyen khich': 'khuyến khích',
  'vu khi': 'vũ khí',
  'truoc': 'trước', 'truoc ': 'trước ',
  'tien': 'tiên', 'tien ': 'tiên ',
  'nay': 'này', 'nay ': 'này ',
  'thuan': 'thuần', 'thuan ': 'thuần ',
  'cao nhat': 'cao nhất',
  'co san': 'có sẵn',
  'tuy chon': 'tùy chọn',
  'lanh phi': 'lãng phí',
  'dau tu': 'đầu tư',
  'rat manh': 'rất mạnh',
  'rat tot': 'rất tốt',
  'doc nhat': 'độc nhất',
  'khong the': 'không thể',
  'thay doi': 'thay đổi',
  'sat thuong': 'sát thương',
  'sat thuong chinh': 'sát thương chính',
  'tang theo': 'tăng theo',
  'yeu cau': 'yêu cầu',
  'giap nang': 'giáp nặng',
  'trang bi': 'trang bị',
  'nguon': 'nguồn',
  'chat luong': 'chất lượng',
  'phap': 'pháp',
  'mat': 'mất',
  'thuan': 'thuần',
  'tai': 'tại',
  'den': 'đến',
  'cho': 'cho',
  'voi': 'với',
  'de': 'để',
  'duoc': 'được',
  'con': 'còn',
  'mot': 'một',
  'da': 'đã',
  'dang': 'đang',
  'se': 'sẽ',
  'can': 'cần',
  'phai': 'phải',
  'cac': 'các',
  'nguoi': 'người',
  'nhung': 'nhưng',
  'hoac': 'hoặc',
  'nen': 'nên',
  'xong': 'xong',
  'roi': 'rồi',
  'thuong': 'thường',
  'nang': 'nâng',
  'them': 'thêm',
  'lon': 'lớn',
  'nho': 'nhỏ',
  'nhan': 'nhận',
  'lua': 'lửa',
  'nham': 'nhằm',
  'thu': 'thử',
  'doi': 'đổi',
  'lai': 'lại',
  'khi': 'khi',
  'cung': 'cùng',
  'nhieu': 'nhiều',
  'tam': 'tạm',
  'thoi': 'thời',
  'manh': 'mạnh',
  'yeu': 'yếu',
  'cao': 'cao',
  'hieu': 'hiểu',
  'dung': 'đúng',
  'so huu': 'sở hữu',
  'thuc hien': 'thực hiện',
  'hieu qua': 'hiệu quả',
  'dac biet': 'đặc biệt',
  'quan trong': 'quan trọng',
  'van de': 'vấn đề',
  'lien tuc': 'liên tục',
  'kha nang': 'khả năng',
  'nhan vat': 'nhân vật',
  'dau tien': 'đầu tiên',
  'tiep theo': 'tiếp theo',
  'cuoi cung': 'cuối cùng',
  'bat buoc': 'bắt buộc',
  'thay the': 'thay thế',
  'phu hop': 'phù hợp',
  'thap hon': 'thấp hơn',
  'cao hon': 'cao hơn',
  'toi da': 'tối đa',
  'su dung': 'sử dụng',
  'che tao': 'chế tạo',
  'nang cap': 'nâng cấp',
  'nhiem vu': 'nhiệm vụ',
  'chay den': 'chạy đến',
  'lay': 'lấy',
  'giet': 'giết',
  'tim': 'tìm',
  'luc': 'lúc',
  'sau do': 'sau đó',
  'muon': 'muốn',
  'that bai': 'thất bại',
  'thanh cong': 'thành công',
  'nu': 'nữ',
};

function cleanString(str) {
  if (typeof str !== 'string') return str;
  
  // Step 1: Remove all U+FFFD and control characters
  let cleaned = str.replace(/[\uFFFD\u0000-\u001F\u007F-\u009F]/g, '');
  
  // Step 2: Remove extra whitespace
  cleaned = cleaned.replace(/\s{2,}/g, ' ');
  cleaned = cleaned.trim();
  
  // Step 3: Apply diacritic fixes
  // Process left to right for longest matches first
  const sortedWords = Object.entries(DIACRITIC_FIXES).sort((a, b) => b[0].length - a[0].length);
  
  for (const [bad, good] of sortedWords) {
    if (bad.length === 1) continue; // skip single char fixes (too aggressive)
    const re = new RegExp(bad.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    cleaned = cleaned.replace(re, good);
  }
  
  return cleaned;
}

function fixVNFields(filePath) {
  try {
    if (!fs.existsSync(filePath)) return;
    if (path.extname(filePath) !== '.json') return;
    
    // Read raw, clean control chars
    let content = fs.readFileSync(filePath, 'utf-8');
    // First convert \uXXXX escape sequences to actual characters
    content = content.replace(/\\(u[0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex.slice(1), 16)));
    // Then remove all control characters (0x00-0x1F and 0x7F-0x9F) that might be in strings
    content = content.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '');
    
    const data = JSON.parse(content);
    
    function processValue(val) {
      if (typeof val === 'string') {
        return cleanString(val);
      } else if (Array.isArray(val)) {
        return val.map(processValue);
      } else if (val && typeof val === 'object') {
        const result = {};
        for (const [key, v] of Object.entries(val)) {
          // Only process Vietnamese fields
          if (/Vi$/i.test(key)) {
            result[key] = processValue(v);
          } else {
            result[key] = processValue(v);
          }
        }
        return result;
      }
      return val;
    }
    
    // Process the entire data structure
    // But only apply cleanString to *Vi fields
    function processObject(obj) {
      if (Array.isArray(obj)) {
        return obj.map(processObject);
      }
      if (!obj || typeof obj !== 'object') return obj;
      
      const result = {};
      for (const [key, val] of Object.entries(obj)) {
        if (/Vi$/i.test(key)) {
          // This is a Vietnamese field
          if (typeof val === 'string') {
            result[key] = cleanString(val);
          } else if (Array.isArray(val)) {
            result[key] = val.map(item => 
              typeof item === 'string' ? cleanString(item) : processObject(item)
            );
          } else {
            result[key] = processObject(val);
          }
        } else if (typeof val === 'string') {
          // English field - keep as-is (don't fix diacritics)
          // But still remove any corruption characters
          result[key] = val.replace(/[\uFFFD\u0000-\u001F]/g, '');
        } else {
          result[key] = processObject(val);
        }
      }
      return result;
    }
    
    const fixed = processObject(data);
    const output = JSON.stringify(fixed, null, 4) + '\n';
    
    // Verify it's valid JSON
    JSON.parse(output);
    
    // Count changes
    const origStr = JSON.stringify(data);
    if (output !== origStr) {
      fs.writeFileSync(filePath, output, 'utf-8');
      console.log(`  Fixed: ${path.relative(path.join(__dirname, '..'), filePath)}`);
      return true;
    }
    return false;
  } catch (err) {
    console.error(`  FAIL: ${path.relative(path.join(__dirname, '..'), filePath)} - ${err.message.slice(0, 60)}`);
    return false;
  }
}

// Run
console.log('=== Final Vietnamese Fix ===\n');

const files = [
  'data/elden-ring.json',
  'data/dark-souls-3.json',
  'data/dark-souls-1.json',
  'data/dark-souls-2.json',
  'data/bloodborne.json',
  'data/cyberpunk-2077.json',
  'data/walkthrough/elden-ring.json',
  'data/walkthrough/dark-souls-3.json',
  'data/walkthrough/dark-souls-1.json',
  'data/walkthrough/dark-souls-2.json',
  'data/walkthrough/bloodborne.json',
  'messages/vi.json',
];

let fixed = 0;
for (const f of files) {
  if (fixVNFields(path.join(__dirname, '..', f))) fixed++;
}

console.log(`\nFiles fixed: ${fixed}`);

// Verify all JSON
console.log('\nVerification:');
let ok = 0;
for (const f of files) {
  try {
    JSON.parse(fs.readFileSync(path.join(__dirname, '..', f), 'utf-8'));
    ok++;
  } catch(e) {
    console.log(`  INVALID: ${f}`);
  }
}
console.log(`All ${ok}/${files.length} files valid.`);
