<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:vietnamese-rules -->
# Vietnamese Text Quality

All `*Vi` fields in JSON files must use proper Vietnamese with correct diacritics. Common mistakes to avoid:

1. **Missing diacritics**: `khong` → `không`, `tang` → `tăng`, `nay` → `này`
2. **Mixed EN/VN**: "Chọn Samurai để starting Uchigatana" → "Chọn Samurai để bắt đầu với Uchigatana"
3. **Encoding corruption**: U+FFFD replacement chars in strings must be fixed
4. **Literal English translations**: "Pump Vigor" → "Tăng Vigor", "Craft Seppuku" → "Chế tạo Seppuku"
5. **locationVi fields**: Must be in Vietnamese, not copied from English `location`

Use `scripts/vn-v2-fixer.js` for automated word-level fixes. Manual review needed for stepsVi, tipsVi, and locationVi fields.

Running the fixer: `node scripts/vn-v2-fixer.js`
Running the audit: `node scripts/vn-audit.js`
<!-- END:vietnamese-rules -->
