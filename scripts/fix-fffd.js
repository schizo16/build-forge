const fs = require('fs');

// The U+FFFD replacement character corrupted the original Vietnamese diacritics
// Each U+FFFD replaces one Vietnamese character with a diacritic mark
// We fix by matching specific surrounding context

const filePath = 'data/elden-ring.json';
let content = fs.readFileSync(filePath, 'utf-8');
const original = content;

// Fix U+FFFD patterns based on word context
// Each entry: [corrupted pattern with FFFD, fixed pattern]
// We use the string '�' to represent U+FFFD in our patterns
const FFFD = '\uFFFD';

const contextFixes = [
  // verdictVi specific fixes - first build
  [FFFD + 'a ch' + FFFD + 'n t' + FFFD + ' nh' + FFFD + 't', 'ựa ch' + FFFD + 'n t' + FFFD + ' nh' + FFFD + 't'],
  
  // Actually, let me just hard-code the exact string replacements
  // These are exact verbatim strings from the file
  
  // Line 136 - Keen verdict
  ['L' + FFFD + 'a ch' + FFFD + 'n t' + FFFD + ' nh' + FFFD + 't cho build n' + FFFD + 'y. Dex thu' + FFFD + 'n kh' + FFFD + 'ng t' + String.fromCharCode(0x03) + 'ng ch' + FFFD + 'y m' + FFFD + 'u.',
   'Lựa chọn tệ nhất cho build này. Dex thuần không tăng chảy máu.'],
   
  // Line 147 - Blood verdict
  ['T' + FFFD + 'ch liy ch' + FFFD + 'y m' + FFFD + 'u kh' + FFFD + 'ng khi' + FFFD + 'p, nh' + FFFD + 'ng AR th' + FFFD + 'p h' + FFFD + 'n. T' + FFFD + 't nh' + FFFD + 't \u0011' + FFFD + ' g' + FFFD + 'y ch' + FFFD + 'y m' + FFFD + 'u nhanh.',
   'Tích lũy chảy máu không khiếp, nhưng AR thấp hơn. Tốt nhất để gây chảy máu nhanh.'],
   
  // Line 158 - Occult verdict  
  ['T' + FFFD + 't nh' + FFFD + 't t' + FFFD + 'ng th' + FFFD + '. AR cao nh' + FFFD + 't v' + FFFD + 'i ch' + FFFD + 'y m' + FFFD + 'u \u0011n \u0011' + FFFD + 'nh.',
   'Tốt nhất tổng thể. AR cao nhất với chảy máu ổn định.'],

  // Line 371 - Magic verdict  
  ['L' + FFFD + 'a ch' + FFFD + 'n m' + FFFD + 'c \u0011' + FFFD + 'nh t' + FFFD + 't nh' + FFFD + 't. Moonveil \u0011' + FFFD + ' c' + FFFD + ' Magic-infused \u0014 ch' + FFFD + ' c' + FFFD + 'n t\u0003ng Int.',
   'Lựa chọn mặc định tốt nhất. Moonveil đã có Magic-infused — chỉ cần tăng Int.'],

  // Line 382 - Cold verdict
  ['T' + FFFD + 't cho t' + FFFD + 'ch liy b' + String.fromCharCode(0x03) + 'ng nh' + FFFD + 'ng gi' + FFFD + 'm AR. Ch' + FFFD + ' d' + FFFD + 'ng n' + FFFD + 'u mu' + FFFD + 'n hi' + FFFD + 'u \u0011ng b' + String.fromCharCode(0x03) + 'ng.',
   'Tốt cho tích lũy băng nhưng giảm AR. Chỉ dùng nếu muốn hiệu ứng băng.'],
  
  // Line 389 - Keen verdict
  ['Kh' + FFFD + 'ng khuy' + FFFD + 'n kh' + FFFD + 'ch. Moonveil l' + FFFD + ' vi kh' + FFFD + ' Int tr' + FFFD + String.fromCharCode(0x03) + 'c ti' + FFFD + 'n.',
   'Không khuyến khích. Moonveil là vũ khí Int trước tiên.'],
  
  // Build 2 - Blasphemous Paladin
  ['T' + FFFD + 't h' + FFFD + 'n \u0011 c' + FFFD + 'p th' + FFFD + 'p nh' + FFFD + 'ng kh' + FFFD + 'ng b' + FFFD + 'ng m' + FFFD + 'c \u0011' + FFFD + 'nh.',
   'Tốt hơn ở cấp thấp nhưng không bằng mặc định.'],
  ['L' + FFFD + 'ng ph' + FFFD + ' cho build n' + FFFD + 'y.',
   'Lãng phí cho build này.'],
];

// Apply the fixes
for (const [bad, good] of contextFixes) {
  if (content.includes(bad)) {
    content = content.replace(bad, good);
    console.log('Fixed:', good.substring(0, 40) + '...');
  } else {
    console.log('NOT FOUND');
  }
}

if (content !== original) {
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('\nFile written.');
} else {
  console.log('\nNo changes.');
}
