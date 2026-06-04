#!/usr/bin/env python3
"""Fix template artifacts and mixed Vi/En in build data files."""
import json
import re
import os

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')

FIXES_MAP = {
    "$1he": "the",
    "Tng ": "Tang ",
    " tng ": " tang ",
    "Nng ": "Nang ",
    " nng ": " nang ",
    "Dng ": "Dung ",
    " dng ": " dung ",
}

def fix_broken_characters(text):
    """Fix broken unicode characters."""
    if not isinstance(text, str):
        return text
    return text

def clean_text(text):
    """Clean template artifacts and fix missing diacritics."""
    if not isinstance(text, str) or not text.strip():
        return text
    original = text
    
    # Remove $1 prefix artifacts
    text = text.replace("$1", "")
    
    # Fix "Class0" pattern where 0 shouldn't be there
    # Only letter+digit where digit is unwanted artifact
    text = re.sub(r'([A-Za-z])0\s+để', r'\1 để', text)
    
    # Remove "the" after Vietnamese verbs (Lay the X -> Lay X)
    text = re.sub(r'\b(Lấy|Tìm|Dùng|Gắn|Mua|Trang bị)\s+the\s+', r'\1 ', text, flags=re.IGNORECASE)
    
    # Fix common missing diacritics
    text = text.replace('Tng ', 'Tang ')
    text = text.replace(' tng ', ' tang ')
    text = text.replace('Nng ', 'Nang ')
    text = text.replace(' nng ', ' nang ')
    text = text.replace('Dng ', 'Dung ')
    text = text.replace(' dng ', ' dung ')
    
    return text

def has_vietnamese(text):
    """Detect if text has Vietnamese content."""
    vi_chars = set('aAeEiIoOuUyYdD')
    # Check for chars with diacritics
    for c in text:
        if 0x1EA0 <= ord(c) <= 0x1EF9:
            return True
    # Check for common Vietnamese words
    vi_words = ['nhe', 'nha', 'ngay', 'luon', 'nhi', 'thoi', 'nao', 'di', 'xong',
                'cua', 'nhung', 'duoc', 'cac', 'cho', 'voi', 'khi', 'trong',
                'tren', 'vao', 'nay', 'ban', 'de', 'tu', 'se', 'lam', 'co',
                'nen', 'phai', 'sau', 'qua', 'lai', 'neu', 'thi', 'rat', 'nhu',
                'moi', 'toi', 'no', 'ho', 'len', 'lay', 'tim', 'dung', 'giet',
                'nang', 'cap', 'trang', 'thanh', 'thuong', 'lua', 'song', 'dao',
                'thap', 'cao', 'tot', 'xau', 'gay', 'dan', 'mau', 'hp', 'st',
                'giam', 'xuyen', 'kinh', 'nghiem', 'truoc', 'sau', 'giua',
                'cuoi', 'dau', 'nho', 'lon', 'nhanh', 'chem', 'dap', 'phang']
    text_lower = text.lower()
    words = text_lower.split()
    for w in words:
        w_clean = w.strip('.,!?;:()[]{}"\'')
        if w_clean in vi_words:
            return True
    return False

def process_build(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    modified = False
    
    for build in data.get('builds', []):
        for phase in build.get('phases', []):
            if 'stepsVi' in phase:
                new_steps = []
                for s in phase['stepsVi']:
                    fixed = clean_text(s)
                    if fixed != s:
                        modified = True
                    new_steps.append(fixed)
                phase['stepsVi'] = new_steps
        
        if 'tipsVi' in build:
            new_tips = []
            for t in build['tipsVi']:
                fixed = clean_text(t)
                if fixed != t:
                    modified = True
                new_tips.append(fixed)
            build['tipsVi'] = new_tips
    
    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        return True
    return False

def process_walkthrough(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    modified = False
    
    for section in data.get('sections', []):
        if 'content' in section:
            new_content = []
            for line in section['content']:
                if has_vietnamese(line):
                    fixed = clean_text(line)
                    if fixed != line:
                        modified = True
                    new_content.append(fixed)
                else:
                    new_content.append(line)
            section['content'] = new_content
    
    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        return True
    return False

def main():
    build_files = sorted([f for f in os.listdir(DATA_DIR) if f.endswith('.json')])
    walk_dir = os.path.join(DATA_DIR, 'walkthrough')
    walk_files = sorted([f for f in os.listdir(walk_dir) if f.endswith('.json')])
    
    mod_builds = []
    for fname in build_files:
        fpath = os.path.join(DATA_DIR, fname)
        if process_build(fpath):
            mod_builds.append(fname)
    
    mod_walks = []
    for fname in walk_files:
        fpath = os.path.join(walk_dir, fname)
        if process_walkthrough(fpath):
            mod_walks.append(fname)
    
    print("Modified build files:", mod_builds)
    print("Modified walkthrough files:", mod_walks)

if __name__ == '__main__':
    main()
