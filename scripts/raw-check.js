const fs = require('fs');
const buf = fs.readFileSync('data/elden-ring.json');
// Find first 'verdictVi' and show surrounding bytes
const idx = buf.indexOf(Buffer.from('"verdictVi"'));
if (idx >= 0) {
  const chunk = buf.slice(idx, idx + 80);
  console.log('Bytes:', Array.from(chunk).map(b => b.toString(16).padStart(2,'0')).join(' '));
  console.log('UTF8 decode:', chunk.toString('utf-8'));
  
  // Show each character
  console.log('\nChar codes:');
  for (let i = 0; i < chunk.length; i++) {
    const b = chunk[i];
    console.log(`  [${i}] 0x${b.toString(16).padStart(2,'0')} (${b}) = '${String.fromCharCode(b)}'`);
  }
}
