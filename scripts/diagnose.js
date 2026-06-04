const fs = require('fs');
const content = fs.readFileSync('data/elden-ring.json', 'utf-8');

// Find verdictVi values and show what we're dealing with
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('verdictVi')) {
    console.log(`Line ${i+1}: ${lines[i].trim()}`);
  }
}
console.log('\n---');
// Show first tipsVi
const tipsStart = content.indexOf('"tipsVi"');
if (tipsStart >= 0) {
  const snippet = content.slice(tipsStart, tipsStart + 300);
  console.log('First tipsVi:', snippet);
}
