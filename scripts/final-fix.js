const fs = require('fs');
const path = require('path');

// Read file as binary buffer and fix Latin-1 corruption
function fixFileEncoding(filePath) {
  const buf = fs.readFileSync(filePath);
  // Try to detect if the file has Latin-1 encoded Vietnamese
  // In Latin-1, Vietnamese chars are stored as byte sequences
  // that should be UTF-8. If the file was read as Latin-1,
  // we need to re-interpret as UTF-8.
  
  // Actually, the issue is simpler: the JSON has unicode escape sequences
  // like \u0011 that get interpreted literally. Let's just fix known patterns.
  let content = buf.toString('utf-8');
  
  // Fix known corrupted patterns in the verdictVi fields
  // These are from the original Latin-1 corruption
  const fixes = [
    // verdictVi entries - elden-ring.json specific
    ['L\u0011a ch\u0011n t\u0011 nh\u0013t', 'Lựa chọn tệ nhất'],
    ['Lua chon te nhat', 'Lựa chọn tệ nhất'],
    ['t\u0011 nh\u0013t', 'tệ nhất'],
    ['t\u0011t nh\u0013t', 'tốt nhất'],
    ['kh\u0014ng tng', 'không tăng'],
    ['ch\u0015y m\u0015u', 'chảy máu'],
    ['T\u0015ch liy', 'Tích lũy'],
    ['AR th\u0013p h\u0014n', 'AR thấp hơn'],
    ['T\u0015t nh\u0013t \u0011 g\u0015y', 'Tốt nhất để gây'],
    ['T\u0015t nh\u0013t t\u0015ng th\u0012', 'Tốt nhất tổng thể'],
    ['AR cao nh\u0013t v\u0015i', 'AR cao nhất với'],
    ['\u0011n \u0011nh', 'ổn định'],
    ['L\u0011a ch\u0011n m\u0015c \u0011nh', 'Lựa chọn mặc định'],
    ['\u0011 c\u0013', 'đã có'],
    ['ch\u0015 c\u0015n tng Int', 'chỉ cần tăng Int'],
    ['T\u0015t cho t\u0015ch liy bng', 'Tốt cho tích lũy băng'],
    ['nh\u0015ng gi\u0015m AR', 'nhưng giảm AR'],
    ['Ch\u0015 d\u0015ng n\u0013u', 'Chỉ dùng nếu'],
    ['mu\u0015n hi\u0013u \u0011ng bng', 'muốn hiệu ứng băng'],
    ['Kh\u0014ng khuy\u0013n kh\u0015ch', 'Không khuyến khích'],
    ['l\u0015 vi kh\u0015 Int tr\u0015\u0015c ti\u0015n', 'là vũ khí Int trước tiên'],
  ];
  
  let changed = false;
  for (const [bad, good] of fixes) {
    if (content.includes(bad)) {
      content = content.split(bad).join(good);
      changed = true;
    }
  }
  
  // Also replace all \uXXXX escape sequences with actual characters
  content = content.replace(/\\(u[0-9a-fA-F]{4})/g, (_, hex) => {
    return String.fromCharCode(parseInt(hex.slice(1), 16));
  });
  
  if (changed || content !== buf.toString('utf-8')) {
    fs.writeFileSync(filePath, content, 'utf-8');
    return true;
  }
  return false;
}

// Fix verdictVi entries by replacing entire strings
const VERDICT_FIXES = {
  // These are exact string replacements for known bad verdictVi
};

// Main
console.log('=== Final Vietnamese Fix ===\n');

const dataDir = path.join(__dirname, '..', 'data');
let fixed = 0;

for (const f of fs.readdirSync(dataDir).filter(f => f.endsWith('.json'))) {
  const filePath = path.join(dataDir, f);
  if (fixFileEncoding(filePath)) {
    console.log(`  Fixed: data\\${f}`);
    fixed++;
  }
}

// Also fix walkthrough files
const walkDir = path.join(__dirname, '..', 'data', 'walkthrough');
if (fs.existsSync(walkDir)) {
  for (const f of fs.readdirSync(walkDir).filter(f => f.endsWith('.json'))) {
    const filePath = path.join(walkDir, f);
    if (fixFileEncoding(filePath)) {
      console.log(`  Fixed: data\\walkthrough\\${f}`);
      fixed++;
    }
  }
}

// Fix messages
const msgFile = path.join(__dirname, '..', 'messages', 'vi.json');
if (fixFileEncoding(msgFile)) {
  console.log(`  Fixed: messages\\vi.json`);
  fixed++;
}

console.log(`\nFiles with encoding fixes: ${fixed}`);

// Now re-run the VN field fixer to apply word-level fixes on clean text
console.log('\nRe-running VN field fixer...');
require('./vn-v2-fixer.js');
