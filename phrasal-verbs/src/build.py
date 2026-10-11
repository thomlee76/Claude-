import re, os, json, io, base64, glob
from PIL import Image

FILES = ['lessons.js', 'lessons2.js', 'lessons_21.js', 'lessons_41.js', 'lessons_61.js', 'lessons_81.js']
AUDIO_DIR = '/home/claude/tts/out'

t = open('app.html', encoding='utf-8').read()
d = '\n'.join(open(f, encoding='utf-8').read() for f in FILES)

# audio: attach sprite path + segment marks to every lesson that has a recording
marks = {}
for j in sorted(glob.glob(AUDIO_DIR + '/day*.json')):
    n = int(re.search(r'day(\d+)', j).group(1))
    if os.path.exists(j[:-5] + '.mp3'):
        marks[n] = json.load(open(j))
d += '\n(function(M){for(const k in M){const L=window.LESSONS[k];if(L){L.audio="audio/day"+String(k).padStart(2,"0")+".mp3";L.marks=M[k]}}})(' + json.dumps(marks) + ');\n'

out = t.replace('/*LESSONS*/', d)
open('index.html', 'w', encoding='utf-8').write(out)
scripts = re.findall(r'<script>(.*?)</script>', out, re.S)
open('/tmp/claude-0/chk2.js', 'w').write(scripts[1])

# EMBED images as data URIs so they always render
def datauri(p):
    im = Image.open(p).convert('RGB').resize((540, 540), Image.LANCZOS)
    b = io.BytesIO(); im.save(b, 'JPEG', quality=76, optimize=True, progressive=True)
    return 'data:image/jpeg;base64,' + base64.b64encode(b.getvalue()).decode()
html = open('index.html', encoding='utf-8').read()
html = re.sub(r'img:"(img/day\d+\.jpg)"', lambda m: 'img:"' + datauri(m.group(1)) + '"' if os.path.exists(m.group(1)) else 'img:null', html)
open('index.html', 'w', encoding='utf-8').write(html)
print('lessons with audio:', len(marks), '| page size MB:', round(len(html) / 1e6, 2))
