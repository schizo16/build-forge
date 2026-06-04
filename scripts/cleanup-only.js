const fs = require('fs');
const path = require('path');

// MINIMAL SAFE fix: Only strip control characters that break JSON parsing
// Does NOT modify any Vietnamese text content

function safeClean(filePath) {
  try {
    if (!fs.existsSync(filePath)) return false;
    if (path.extname(filePath) !== '.json') return false;
    
    let content = fs.readFileSync(filePath, 'utf-8');
    const orig = content;
    
    // Step 1: Convert \uXXXX escape sequences to actual chars
    content = content.replace(/\\(u[0-9a-fA-F]{4})/g, (_, hex) => {
      return String.fromCharCode(parseInt(hex.slice(1), 16));
    });
    
    // Step 2: Remove all control characters (0x00-0x1F except \t \n \r, also 0x7F-0x9F)
    content = content.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '');
    
    // Step 3: Remove U+FFFD replacement chars (these mean the char was lost anyway)
    content = content.replace(/\uFFFD/g, '');
    
    if (content === orig) return false;
    
    // Verify JSON is valid
    try {
      JSON.parse(content);
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`  OK: ${path.relative(path.join(__dirname, '..'), filePath)}`);
      return true;
    } catch (e) {
      console.log(`  INVALID after clean: ${path.relative(path.join(__dirname, '..'), filePath)} - ${e.message.slice(0, 60)}`);
      return false;
    }
  } catch (err) {
    console.log(`  ERROR: ${path.relative(path.join(__dirname, '..'), filePath)} - ${err.message.slice(0, 60)}`);
    return false;
  }
}

console.log('=== Safe cleanup (control chars + U+FFFD only) ===\n');

const files = [
  'data/elden-ring.json', 'data/dark-souls-3.json', 'data/dark-souls-1.json',
  'data/dark-souls-2.json', 'data/bloodborne.json', 'data/cyberpunk-2077.json',
  'data/walkthrough/elden-ring.json', 'data/walkthrough/dark-souls-3.json',
  'data/walkthrough/dark-souls-1.json', 'data/walkthrough/dark-souls-2.json',
  'data/walkthrough/bloodborne.json', 'messages/vi.json',
];

let ok = 0, fail = 0;
for (const f of files) {
  if (safeClean(path.join(__dirname, '..', f))) ok++; else fail++;
}

console.log(`\nCleaned: ${ok}, Failed: ${fail}`);

// Final verification
console.log('\nFinal verification:');
let allOk = 0;
for (const f of files) {
  try {
    JSON.parse(fs.readFileSync(path.join(__dirname, '..', f), 'utf-8'));
    allOk++;
  } catch(e) {
    console.log(`  INVALID: ${f}`);
  }
}
console.log(`${allOk}/${files.length} files valid.`);
