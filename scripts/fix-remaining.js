const fs = require('fs');

function cleanVN(str) {
  if (typeof str !== 'string') return str;
  let s = str;
  const fixes = {
    'la chon': 'lựa chọn', 'lua chon': 'lựa chọn',
    'te nhat': 'tệ nhất', 'tot nhat': 'tốt nhất',
    'khong': 'không', 'tang': 'tăng', 'chay': 'chảy',
    'mau': 'máu', 'tich': 'tích', 'luy': 'lũy',
    'thap': 'thấp', 'hon': 'hơn', 'nay': 'này',
    'thuan': 'thuần', 'cao nhat': 'cao nhất',
    'lanh phi': 'lãng phí', 'dau tu': 'đầu tư',
    'trang bi': 'trang bị', 'rat manh': 'rất mạnh',
    'doc nhat': 'độc nhất', 'khong the': 'không thể',
    'thay doi': 'thay đổi', 'sat thuong': 'sát thương',
    'giam': 'giảm', 'bang': 'băng', 'hieu ung': 'hiệu ứng',
    'chi can': 'chỉ cần', 'chi dung': 'chỉ dùng',
    'neu muon': 'nếu muốn', 'khuyen khich': 'khuyến khích',
    'vu khi': 'vũ khí', 'truoc tien': 'trước tiên',
    'tot cho': 'tốt cho', 'mac dinh': 'mặc định',
    'tuy chon': 'tùy chọn', 'co san': 'có sẵn',
    'nguoi': 'người', 'nhung': 'nhưng', 'hoac': 'hoặc',
    'cac': 'các', 'thay the': 'thay thế',
    'den': 'đến', 'voi': 'với', 'de': 'để',
    'duoc': 'được', 'con': 'còn', 'mot': 'một',
    'da': 'đã', 'dang': 'đang', 'se': 'sẽ',
    'can': 'cần', 'phai': 'phải', 'tai': 'tại',
    'cho': 'cho', 'lay': 'lấy', 'giet': 'giết',
    'tim': 'tìm', 'luc': 'lúc',
    'sau do': 'sau đó', 'muon': 'muốn',
    'rat': 'rất', 'manh': 'mạnh', 'yeu': 'yếu',
    'cao': 'cao', 'thap': 'thấp',
    'nham': 'nhằm', 'thu': 'thử',
    'khi': 'khi', 'cung': 'cùng',
    'nhieu': 'nhiều', 'lai': 'lại',
    'doi': 'đổi', 'tam': 'tạm', 'thoi': 'thời',
  };
  for (const [b, g] of Object.entries(fixes)) {
    const re = new RegExp(b.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    s = s.replace(re, g);
  }
  return s;
}

function fixGame(filePath) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  let changed = false;
  
  function walk(obj) {
    if (Array.isArray(obj)) { obj.forEach(walk); return; }
    if (!obj || typeof obj !== 'object') return;
    for (const [key, val] of Object.entries(obj)) {
      if (typeof val === 'string' && /Vi$/i.test(key)) {
        const fixed = cleanVN(val);
        if (fixed !== val) { obj[key] = fixed; changed = true; }
      } else if (Array.isArray(val) && /Vi$/i.test(key)) {
        obj[key] = val.map(v => typeof v === 'string' ? cleanVN(v) : v);
      } else {
        walk(val);
      }
    }
  }
  
  walk(data);
  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4) + '\n', 'utf-8');
    console.log('  Fixed: ' + filePath);
    return true;
  }
  console.log('  No changes: ' + filePath);
  return false;
}

console.log('Fixing remaining game files...');
const games = [
  'data/dark-souls-1.json', 'data/dark-souls-2.json',
  'data/bloodborne.json', 'data/cyberpunk-2077.json',
];
let count = 0;
for (const g of games) { if (fixGame(g)) count++; }
console.log('Fixed: ' + count + ' files');
