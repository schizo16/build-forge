import re
samples = [
    'y 105',
    'Agility 105',
    'Chon Samurai0 de',
    'SL 120',
    'Vigor 50',
    'Choose Hero0 for high',
    'Chon Pyromancer0',
    'Pick Sorcerer0',
    'Level 40',
    'Strength 16',
]
for s in samples:
    m = re.search(r'[A-Za-z]0\s', s)
    print(s, '->', bool(m), '->', m.group(0) if m else 'none')
