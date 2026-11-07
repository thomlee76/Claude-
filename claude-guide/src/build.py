"""Assemble the offline app: index.html (single file with content), sw.js, manifest, icons.

Run after build_video.py:  python3 build.py
"""
import hashlib, json, os, subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, '..'))
CHAPTERS = ['ch1', 'ch2', 'ch3', 'ch4']


def read(p):
    return open(p, encoding='utf-8').read()


def main():
    videos = {}
    for c in CHAPTERS:
        meta = json.load(open(os.path.join(ROOT, 'video', c + '.json'), encoding='utf-8'))
        mp4 = os.path.join(ROOT, 'video', c + '.mp4')
        videos[c] = {
            'src': f'video/{c}.mp4', 'vtt': f'video/{c}.vtt', 'poster': f'video/{c}.jpg',
            'duration': meta['duration'], 'size': os.path.getsize(mp4), 'marks': meta['marks'],
        }
    content = '\n'.join(read(os.path.join(ROOT, 'content', c + '.js')) for c in CHAPTERS)
    html = read(os.path.join(HERE, 'template.html'))
    html = html.replace('/*CSS*/', read(os.path.join(HERE, 'base.css')))
    html = html.replace('/*VIDEOS*/', json.dumps(videos, ensure_ascii=False))
    html = html.replace('/*CONTENT*/', content)
    html = html.replace('/*APP*/', read(os.path.join(HERE, 'app.js')))
    open(os.path.join(ROOT, 'index.html'), 'w', encoding='utf-8').write(html)

    manifest = {
        'name': '클로드 실습 가이드', 'short_name': '클로드 가이드',
        'description': '해외영업 실무 예시로 익히는 클로드 — 14개 레슨과 장별 영상 강의',
        'start_url': './', 'scope': './', 'display': 'standalone',
        'background_color': '#F1F4F7', 'theme_color': '#DC4A1E', 'lang': 'ko',
        'icons': [
            {'src': 'icon-192.png', 'sizes': '192x192', 'type': 'image/png'},
            {'src': 'icon-512.png', 'sizes': '512x512', 'type': 'image/png'},
            {'src': 'icon-512.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'maskable'},
        ],
    }
    json.dump(manifest, open(os.path.join(ROOT, 'manifest.webmanifest'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

    if not os.path.exists(os.path.join(ROOT, 'icon-512.png')):
        subprocess.run(['node', os.path.join(HERE, 'make_icons.js'), ROOT], check=True)

    precache = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png']
    for c in CHAPTERS:
        precache += [f'video/{c}.vtt', f'video/{c}.jpg']
    h = hashlib.sha1()
    for p in precache[1:]:
        h.update(open(os.path.join(ROOT, p), 'rb').read())
    sw = read(os.path.join(HERE, 'sw-template.js'))
    sw = sw.replace('__CACHE__', 'cg-' + h.hexdigest()[:10]).replace('__PRECACHE__', json.dumps(precache))
    open(os.path.join(ROOT, 'sw.js'), 'w', encoding='utf-8').write(sw)
    print('index.html', round(len(html.encode()) / 1024), 'KB; videos', {k: round(v['size'] / 1e6, 1) for k, v in videos.items()})


if __name__ == '__main__':
    main()
