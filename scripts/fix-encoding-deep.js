const fs = require('fs');

// Read as latin1 (preserves byte values), then fix diacritics
const buf = fs.readFileSync('data/elden-ring.json');
const latin1 = buf.toString('latin1');

const charFixes = {
  'Lua': 'Lựa', 'lua': 'lựa', 'chon': 'chọn',
  'te': 'tệ', 'nhat': 'nhất', 'tot': 'tốt',
  'khong': 'không', 'tang': 'tăng', 'chay': 'chảy',
  'mau': 'máu', 'tich': 'tích', 'luy': 'lũy',
  'thap': 'thấp', 'hon': 'hơn', 'on': 'ổn',
  'dinh': 'định', 'mac': 'mặc', 'chi': 'chỉ',
  'can': 'cần', 'hieu': 'hiệu', 'ung': 'ứng',
  'bang': 'băng', 'giam': 'giảm', 'dung': 'dùng',
  'neu': 'nếu', 'muon': 'muốn', 'khuyen': 'khuyến',
  'khich': 'khích', 'vu': 'vũ', 'khi': 'khí',
  'truoc': 'trước', 'tien': 'tiên', 'nay': 'này',
  'thuan': 'thuần', 'cao': 'cao', 'san': 'sẵn',
  'tuy': 'tùy', 'lanh': 'lãng', 'phi': 'phí',
  'dau': 'đầu', 'tu': 'tư', 'vao': 'vào',
  'rat': 'rất', 'manh': 'mạnh', 'doc': 'độc',
  'the': 'thể', 'yeu': 'yếu', 'cau': 'cầu',
  'giap': 'giáp', 'nang': 'nặng', 'trang': 'trang',
  'bi': 'bị', 'nguon': 'nguồn', 'nhanh': 'nhanh',
  'chat': 'chất', 'luong': 'lượng', 'phap': 'pháp',
  'than': 'thánh', 'kinh': 'kính', 'mat': 'mất',
};

let fixed = latin1;
for (const [bad, good] of Object.entries(charFixes)) {
  // Only replace whole words (word boundaries)
  const re = new RegExp('\\b' + bad.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'g');
  fixed = fixed.replace(re, good);
}

fs.writeFileSync('data/elden-ring.json', fixed, 'utf-8');

// Verify
try {
  const data = JSON.parse(fs.readFileSync('data/elden-ring.json', 'utf-8'));
  console.log('JSON valid, builds:', data.builds.length);
  console.log('verdictVi 0:', data.builds[0].affinities[0].verdictVi);
  console.log('verdictVi 1:', data.builds[0].affinities[1].verdictVi);
} catch(e) { console.log('FAIL:', e.message.slice(0, 100)); }
