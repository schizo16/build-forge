"""Find problematic Vietnamese strings in build data."""
import json, os, re

basedir = 'data'
for fname in sorted(os.listdir(basedir)):
    if not fname.endswith('.json'):
        continue
    fpath = os.path.join(basedir, fname)
    with open(fpath, 'r', encoding='utf-8-sig') as f:
        data = json.load(f)
    
    for build in data.get('builds', []):
        slug = build.get('slug', '')
        for phase in build.get('phases', []):
            for s in phase.get('stepsVi', []):
                has_vn = bool(re.search(r'[^\x00-\x7F]', s))
                en_words = len(re.findall(r'\b[A-Za-z]{4,}\b', s))
                has_artifact = ('$1' in s or re.search(r'[A-Z][a-z]+0\s', s))
                
                if has_artifact:
                    print(f'[ARTIFACT] {fname}/{slug}: {s[:100]}')
                elif has_vn and en_words > 3:
                    vn_chars = sum(1 for c in s if ord(c) > 127)
                    if vn_chars < 15:
                        print(f'[MIXED] {fname}/{slug}: {s[:100]}')
