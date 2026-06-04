"""Check encoding issues in JSON files."""
import json
import os

basedir = 'data'
for fname in sorted(os.listdir(basedir)):
    if not fname.endswith('.json'):
        continue
    fpath = os.path.join(basedir, fname)
    with open(fpath, 'rb') as f:
        raw = f.read()
    errors = []
    if 0xFFFD in raw:
        errors.append('contains U+FFFD replacement characters')
    try:
        text = raw.decode('utf-8')
    except:
        errors.append('cannot decode as UTF-8')
    try:
        data = json.loads(text)
    except Exception as e:
        errors.append(f'JSON parse error: {e}')
    if errors:
        print(f'{fname}: {"; ".join(errors)}')
    else:
        print(f'{fname}: OK ({len(raw)} bytes)')

# Check walkthrough
walkdir = os.path.join(basedir, 'walkthrough')
for fname in sorted(os.listdir(walkdir)):
    if not fname.endswith('.json'):
        continue
    fpath = os.path.join(walkdir, fname)
    with open(fpath, 'rb') as f:
        raw = f.read()
    try:
        text = raw.decode('utf-8')
        data = json.loads(text)
        print(f'walkthrough/{fname}: OK ({len(raw)} bytes)')
    except Exception as e:
        print(f'walkthrough/{fname}: ERROR - {e}')
