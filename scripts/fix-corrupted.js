const fs = require('fs');
const path = require('path');

// The ï¿½ (U+FFFD) corruption pattern: each Vietnamese letter with diacritics 
// was stored in Latin-1, read as UTF-8, creating invalid sequences replaced with ï¿½
// 
// Known corruption mapping:
// The character ï¿½ represents any Vietnamese letter that had diacritics
// We fix by: replacing common patterns based on context

function fixFile(filePath) {
  if (!fs.existsSync(filePath)) return false;
  
  let content = fs.readFileSync(filePath, 'utf-8');
  const orig = content;
  
  // Step 1: Remove all remaining control characters  
  content = content.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\u007F-\u009F]/g, '');
  
  // Step 2: The `\uXXXX` escape sequences in the file  
  content = content.replace(/\\(u[0-9a-fA-F]{4})/g, (_, hex) => {
    const code = parseInt(hex.slice(1), 16);
    if (code < 0x20) return ''; // strip control chars
    return String.fromCharCode(code);
  });
  
  // Step 3: Fix ï¿½ corruption patterns
  // This replaces words containing ï¿½ with their proper Vietnamese form
  const knownWords = {
    'L': { 'ï¿½a': 'ựa' },
    'l': { 'ï¿½a': 'ựa' },
    'ch': { 'ï¿½n': 'ọn', 'ï¿½y': 'ảy' },
    't': { 'ï¿½': 'ệ', 'ï¿½t': 'ốt', 'ï¿½ch': 'ích', 'ï¿½ng': 'ăng', 'ï¿½p': 'ấp', 'ï¿½n': 'ận', 'ï¿½': 'ể' },
    'n': { 'ï¿½': 'ề', 'ï¿½y': 'ày', 'ï¿½': 'ể', 'ï¿½i': 'ội', 'ï¿½': 'ở', 'ï¿½n': 'ền' },
    'nh': { 'ï¿½': 'ữ', 'ï¿½t': 'ất', 'ï¿½ng': 'ững', 'ï¿½': 'ị' },
    'kh': { 'ï¿½ng': 'ông', 'ï¿½': 'ỏ', 'ï¿½ch': 'ích' },
    'th': { 'ï¿½p': 'ấp', 'ï¿½': 'ể', 'ï¿½n': 'uần', 'ï¿½': 'ị' },
    'm': { 'ï¿½u': 'áu', 'ï¿½c': 'ặc' },
    'd': { 'ï¿½': 'ủ', 'ï¿½ng': 'ũng', 'ï¿½': 'ụ', 'ï¿½i': 'ội' },
    'g': { 'ï¿½m': 'iảm' },
    'h': { 'ï¿½n': 'ơn', 'ï¿½u': 'ều' },
    'ng': { 'ï¿½': 'ồ', 'ï¿½n': 'uồn', 'ï¿½': 'ữ' },
    'tr': { 'ï¿½ng': 'ống', 'ï¿½c': 'ước' },
    'v': { 'ï¿½': 'ũ' },
    'b': { 'ï¿½': 'ị' },
    'c': { 'ï¿½': 'ủa', 'ï¿½': 'ó', 'ï¿½o': 'ao' },
    's': { 'ï¿½n': 'ẵn' },
  };
  
  // A simpler approach: replace specific corrupted strings with known correct values
  const corruptedToFixed = [
    // Common ï¿½ patterns in Vietnamese content
    ['Lua chon', 'Lựa chọn'],
    ['lua chon', 'lựa chọn'],
    ['te nhat', 'tệ nhất'],
    ['tot nhat', 'tốt nhất'],
    ['khong', 'không'],
    ['tang', 'tăng'],
    ['chay', 'chảy'],
    ['mau', 'máu'],
    ['tich', 'tích'],
    ['luy', 'lũy'],
    ['thap', 'thấp'],
    ['hon', 'hơn'],
    ['on dinh', 'ổn định'],
    ['mac dinh', 'mặc định'],
    ['chi can', 'chỉ cần'],
    ['chi dung', 'chỉ dùng'],
    ['hieu ung', 'hiệu ứng'],
    ['bang', 'băng'],
    ['giam', 'giảm'],
    ['neu', 'nếu'],
    ['muon', 'muốn'],
    ['khuyen khich', 'khuyến khích'],
    ['vu khi', 'vũ khí'],
    ['truoc', 'trước'],
    ['tien', 'tiên'],
    ['build nay', 'build này'],
    ['dex thuan', 'Dex thuần'],
    ['cao nhat', 'cao nhất'],
    ['co san', 'có sẵn'],
    ['tuy chon', 'tùy chọn'],
    ['lanh phi', 'lãng phí'],
    ['dau tu', 'đầu tư'],
    ['rat manh', 'rất mạnh'],
    ['rat tot', 'rất tốt'],
    ['doc nhat', 'độc nhất'],
    ['khong the', 'không thể'],
    ['thay doi', 'thay đổi'],
    ['sat thuong', 'sát thương'],
    ['sat thuong chinh', 'sát thương chính'],
    ['tang theo', 'tăng theo'],
    ['yeu cau', 'yêu cầu'],
    ['giap nang', 'giáp nặng'],
    ['trang bi', 'trang bị'],
    ['nguon', 'nguồn'],
    ['nhanh', 'nhanh'],
    ['chat luong', 'chất lượng'],
    ['phap', 'pháp'],
    ['thanh cong', 'thành công'],
    ['that bai', 'thất bại'],
    ['mat', 'mất'],
    ['thuan', 'thuần'],
    ['tai', 'tại'],
    ['den', 'đến'],
    ['cho', 'cho'],
    ['voi', 'với'],
    ['de', 'để'],
    ['duoc', 'được'],
    ['con', 'còn'],
    ['mot', 'một'],
    ['da', 'đã'],
    ['dang', 'đang'],
    ['se', 'sẽ'],
    ['can', 'cần'],
    ['phai', 'phải'],
    ['nay', 'này'],
    ['nay ', 'này '],
    ['lay', 'lấy'],
    ['giet', 'giết'],
    ['tim', 'tìm'],
    ['luc', 'lúc'],
    ['sau do', 'sau đó'],
    ['sau ', 'sau '],
    ['muon ', 'muốn '],
    ['nen ', 'nên '],
    ['nu ', 'nữ '],
    ['rat ', 'rất '],
    ['ben ', 'bên '],
    ['trong ', 'trong '],
    ['giua ', 'giữa '],
    ['cuoi ', 'cuối '],
    ['len ', 'lên '],
    ['duoi ', 'dưới '],
    ['dau ', 'đầu '],
    ['truoc ', 'trước '],
    ['sau ', 'sau '],
    ['cac ', 'các '],
    ['nguoi ', 'người '],
    ['nhung ', 'nhưng '],
    ['hoac ', 'hoặc '],
    ['nen ', 'nên '],
    ['xong ', 'xong '],
    ['roi ', 'rồi '],
    ['thuong ', 'thường '],
    ['nang ', 'nâng '],
    ['tang ', 'tăng '],
    ['them ', 'thêm '],
    ['lon ', 'lớn '],
    ['nho ', 'nhỏ '],
    ['nhan ', 'nhận '],
    ['lua ', 'lửa '],
    ['nham ', 'nhằm '],
    ['thu ', 'thử '],
    ['doi ', 'đổi '],
    ['lai ', 'lại '],
    ['khi ', 'khi '],
    ['cung ', 'cùng '],
    ['cung ', 'cùng '],
    ['nhieu ', 'nhiều '],
    ['tam ', 'tạm '],
    ['thoi ', 'thời '],
    ['manh ', 'mạnh '],
    ['yeu ', 'yếu '],
    ['cao ', 'cao '],
    ['thap ', 'thấp '],
    ['hieu ', 'hiểu '],
    ['dung ', 'đúng '],
    ['sai ', 'sai '],
  ];
  
  for (const [bad, good] of corruptedToFixed) {
    // Case-insensitive replacement preserving case
    const re = new RegExp(bad.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    content = content.replace(re, (match) => {
      if (match[0] === match[0]?.toUpperCase() && match.length > 1) {
        return good[0].toUpperCase() + good.slice(1);
      }
      return good;
    });
  }
  
  // Step 4: Remove leading/trailing whitespace in string values
  content = content.replace(/":\s*"(\s+)/g, '": "');
  content = content.replace(/(\s+)"/g, '"');
  
  if (content !== orig) {
    fs.writeFileSync(filePath, content, 'utf-8');
    return true;
  }
  return false;
}

// Process all files
console.log('=== Vietnamese Corruption Fixer ===\n');

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

const baseDir = path.join(__dirname, '..');
let fixed = 0;

for (const f of files) {
  const fp = path.join(baseDir, f);
  if (fixFile(fp)) {
    console.log(`  Fixed: ${f}`);
    fixed++;
  }
}

console.log(`\nFiles fixed: ${fixed}`);

// Verify all JSON is valid
console.log('\nVerifying JSON validity...');
let valid = 0, invalid = 0;
for (const f of files) {
  const fp = path.join(baseDir, f);
  try {
    JSON.parse(fs.readFileSync(fp, 'utf-8'));
    valid++;
  } catch(e) {
    invalid++;
    console.log(`  INVALID: ${f} - ${e.message.slice(0, 60)}`);
  }
}
console.log(`Valid: ${valid}, Invalid: ${invalid}`);
