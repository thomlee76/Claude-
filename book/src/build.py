#!/usr/bin/env python3
"""Сборка книги: sections/*.html + specs/*.json + template.html -> index.html (сайт), print.html (для PDF), artifact.html (фрагмент)."""
import json, re, sys, html
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'src'
OUT_ART = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / 'artifact.html'

DESC = {
 '1': 'Fable, Opus, Sonnet, Haiku: какую модель брать под письмо, тендер или отчёт; тарифы и лимиты',
 '2': 'Длинные поручения с файлами и папками: разбор документов SMC, отчёты по расписанию',
 '3': 'Навыки с вашими шаблонами писем и отчётов: Claude применяет их сам',
 '4': 'Gmail, Calendar, Google Drive и Sheets, DeepL, Booking.com: подключение и сценарии',
 '5': 'Автоматизация Excel-отчётов и пакетная обработка файлов без программирования',
 '6': 'Агенты, субагенты, Claude in Chrome, Research и задачи по расписанию',
 '7': 'От брифа до готовых слайдов: .pptx, фирменный шаблон, отчёт о запуске SMC',
}

def words(s):
    return len(re.sub(r'<[^>]+>', ' ', s).split())

def load_specs():
    sp = {}
    for f in sorted((ROOT / 'specs').glob('0*.json')):
        for it in json.loads(f.read_text(encoding='utf-8')):
            sp[it['id']] = it
    return sp

def figure_html(fid, spec, lazy):
    n, k = fid.split('-')
    s = spec.get(fid, {'title': '', 'caption': ''})
    alt = html.escape(s['title'], quote=True)
    cap = html.escape(s.get('caption', ''))
    ld = ' loading="lazy" decoding="async"' if lazy else ''
    return (f'<figure class="fig" id="fig-{fid}"><button type="button" aria-label="Увеличить рисунок {n}.{k}">'
            f'<img src="img/fig-{fid}.png" alt="{alt}" width="1800" height="1140"{ld}></button>'
            f'<figcaption><span class="fn">Рис. {n}.{k}.</span> {cap}</figcaption></figure>')

def process(sec, spec, lazy):
    m = re.match(r'\s*<section class="chapter( appendix)?" id="([^"]+)" data-num="([^"]+)" data-title="([^"]+)">', sec)
    sid, num, title = m.group(2), m.group(3), m.group(4)
    heads = []
    cnt = [0]
    def h3(mo):
        cnt[0] += 1
        hid = f'{sid}-s{cnt[0]}'
        heads.append((hid, re.sub(r'<[^>]+>', '', mo.group(1))))
        return f'<h3 id="{hid}">{mo.group(1)}</h3>'
    sec = re.sub(r'<h3>(.*?)</h3>', h3, sec, flags=re.S)
    sec = re.sub(r'<figure data-fig="(\d-\d)"></figure>', lambda mo: figure_html(mo.group(1), spec, lazy), sec)
    w = words(sec)
    nprompt = sec.count('class="prompt"')
    nfig = sec.count('class="fig"')
    if num.isdigit() and num != '0':
        eyebrow = f'Раздел {num}'
        meta = f'≈ {max(1, round(w/180))} мин чтения · {nfig} иллюстраций · {nprompt} промптов'
    elif num == '0':
        eyebrow, meta = 'Введение', f'≈ {max(1, round(w/180))} мин чтения'
    else:
        eyebrow, meta = f'Приложение {num}', ''
    head = f'<div class="ch-head"><span class="ch-num">{eyebrow}</span><span class="ch-meta">{meta}</span></div>'
    sec = sec.replace(m.group(0), m.group(0) + '\n' + head, 1)
    return dict(id=sid, num=num, title=title, html=sec, heads=heads, words=w, prompts=nprompt, figs=nfig)

LIBRARY = '''<section class="chapter appendix" id="library" data-num="А" data-title="Библиотека промптов">
<h2>Библиотека промптов</h2>
<p class="lead">Все готовые запросы книги в одном месте. Выберите раздел, скопируйте промпт и замените фрагменты в [квадратных скобках] своими данными.</p>
<div class="lib-bar" id="lib-bar"></div>
<div class="lib-count" id="lib-count"></div>
<div class="lib" id="lib-list"></div>
</section>'''

def main():
    spec = load_specs()
    files = ['00', '01', '02', '03', '04', '05', '06', '07']
    out = {}
    for lazy in (True, False):
        chs = [process((ROOT / 'sections' / f'{f}.html').read_text(encoding='utf-8'), spec, lazy) for f in files]
        lib = process(LIBRARY, spec, lazy)
        app = (ROOT / 'sections' / '99.html').read_text(encoding='utf-8')
        apps = [process(s + '</section>', spec, lazy) for s in app.split('</section>') if s.strip()]
        allch = chs + [lib] + apps
        # TOC
        toc = ['<ol>']
        for c in allch:
            n = c['num'] if c['num'] != '0' else '·'
            toc.append(f'<li data-ch="{c["id"]}"><a href="#{c["id"]}"><span class="n">{n}</span><span>{html.escape(c["title"])}</span></a>')
            if c['heads']:
                toc.append('<ol>' + ''.join(f'<li><a href="#{h}">{html.escape(t)}</a></li>' for h, t in c['heads']) + '</ol>')
            toc.append('</li>')
        toc.append('</ol>')
        total_w = sum(c['words'] for c in chs + apps)
        total_p = sum(c['prompts'] for c in chs)
        total_f = sum(c['figs'] for c in chs)
        cards = ''.join(f'<a href="#{c["id"]}"><span class="cn">{c["num"]}</span><span class="ct">{html.escape(c["title"])}</span><span class="cd">{DESC[c["num"]]}</span></a>' for c in chs if c['num'] in DESC)
        cover = f'''<header class="cover" id="cover">
<div class="eyebrow">Практическое руководство · октябрь 2026</div>
<h1>Claude в работе</h1>
<p class="sub">Модели, Cowork, Skills, коннекторы, Claude Code, агенты и презентации — для руководителя зарубежных продаж: письма партнёрам, отчёты руководству и проект Seoul Medical Center.</p>
<ul class="facts"><li><b>7</b>разделов</li><li><b>{total_f}</b>иллюстраций</li><li><b>{total_p}</b>готовых промптов</li><li><b>{round(total_w/1000)}</b>тыс. слов</li></ul>
{{{{PDF}}}}
<div class="chapters">{cards}</div>
</header>'''
        content = '\n'.join(c['html'] for c in allch)
        tpl = (SRC / 'template.html').read_text(encoding='utf-8')
        page = tpl.replace('{{TOC}}', '\n'.join(toc)).replace('{{COVER}}', cover).replace('{{CONTENT}}', content)
        out[lazy] = (page, total_w, total_p, total_f)
    page, total_w, total_p, total_f = out[True]
    # полный документ для сайта
    i = page.index('<header class="topbar">')
    head, body = page[:i], page[i:]
    full = ('<!doctype html>\n<html lang="ru">\n<head>\n<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
            + head + '</head>\n<body>\n' + body + '\n</body>\n</html>\n')
    pwa_head = ('<meta name="theme-color" content="#AE4C29">\n<link rel="manifest" href="manifest.webmanifest">\n'
                '<link rel="apple-touch-icon" href="apple-touch-icon.png">\n<link rel="icon" href="icon-192.png">\n'
                '<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="mobile-web-app-capable" content="yes">\n'
                '<meta name="apple-mobile-web-app-title" content="Claude в работе">\n<meta name="apple-mobile-web-app-status-bar-style" content="default">\n')
    sw_reg = ('<script>if("serviceWorker" in navigator){const had=!!navigator.serviceWorker.controller;let rl=false;'
              'navigator.serviceWorker.addEventListener("controllerchange",()=>{if(had&&!rl){rl=true;location.reload()}});'
              'addEventListener("load",()=>{navigator.serviceWorker.register("sw.js",{updateViaCache:"none"}).then(()=>navigator.serviceWorker.ready)'
              '.then(r=>{if(r.active)r.active.postMessage("ensure")}).catch(()=>{})})}</script>\n')
    pdf_link = '<a class="dl" href="Claude-v-rabote.pdf" target="_blank" rel="noopener">PDF-версия для печати</a>'
    full = full.replace('<meta name="viewport"', pwa_head + '<meta name="viewport"', 1).replace('{{PDF}}', pdf_link).replace('</body>', sw_reg + '</body>')
    (ROOT / 'index.html').write_text(full, encoding='utf-8')
    import hashlib
    imgs = sorted(p.name for p in (ROOT / 'img').glob('*.png'))
    pre = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'] + ['img/' + n for n in imgs]
    h = hashlib.sha1(full.encode()) 
    for n in imgs: h.update((ROOT / 'img' / n).read_bytes())
    sw = (SRC / 'sw-template.js').read_text(encoding='utf-8').replace('__CACHE__', 'cvr-' + h.hexdigest()[:10]).replace('__PRECACHE__', json.dumps(pre))
    (ROOT / 'sw.js').write_text(sw, encoding='utf-8')
    p2 = out[False][0]
    i = p2.index('<header class="topbar">')
    (ROOT / 'print.html').write_text('<!doctype html>\n<html lang="ru">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n'
                                     + p2[:i] + '</head>\n<body>\n' + p2[i:].replace('{{PDF}}','') + '\n</body>\n</html>\n', encoding='utf-8')
    OUT_ART.write_text(page.replace('{{PDF}}', ''), encoding='utf-8')
    missing = [f'fig-{k}.png' for k in spec if not (ROOT / 'img' / f'fig-{k}.png').exists()]
    print(f'words={total_w} prompts={total_p} figs={total_f} missing_images={len(missing)}')

if __name__ == '__main__':
    main()
