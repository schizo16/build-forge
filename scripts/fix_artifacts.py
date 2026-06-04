"""Fix $1 and Class0 template artifacts in all build data files."""
import json
import os
import re

basedir = os.path.join(os.path.dirname(__file__), '..', 'data')
changed = []

for fname in sorted(os.listdir(basedir)):
    if not fname.endswith('.json'):
        continue
    fpath = os.path.join(basedir, fname)
    
    with open(fpath, 'r', encoding='utf-8-sig') as f:
        data = json.load(f)
    
    modified = False
    
    for build in data.get('builds', []):
        for phase in build.get('phases', []):
            new_steps = []
            for s in phase.get('stepsVi', []):
                orig = s
                s = s.replace('$1he', 'the')
                s = s.replace('$1', '')
                s = re.sub(r'([A-Za-z]+)0\s+de', r'\1 de', s)
                s = re.sub(r'([A-Za-z]+)0\s', r'\1 ', s)
                new_steps.append(s)
                if s != orig:
                    modified = True
            phase['stepsVi'] = new_steps
        
        new_tips = []
        for t in build.get('tipsVi', []):
            orig = t
            t = t.replace('$1he', 'the')
            t = t.replace('$1', '')
            new_tips.append(t)
            if t != orig:
                modified = True
        build['tipsVi'] = new_tips
    
    if modified:
        with open(fpath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        changed.append(fname)
        print(f'Fixed: {fname}')

if not changed:
    print('No files needed changes')
else:
    print(f'\nTotal: {len(changed)} files fixed')
