# Builds the 6-page Cheongdam Harrison Hospital brochure (EN + RU) as HTML.
import sys
from content import T

OUT = '/home/user/Claude-/harrison_brochure/'

CSS = r"""
@page { size: A4; margin: 0; }
:root{--navy:#14284B;--navy2:#21406F;--gold:#B08D57;--gold2:#D9C3A0;--sand:#F5F1EA;--ink:#1E2430;--muted:#5D6676;--line:#E4DCCD;}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#fff}
body{font-family:'Inter',sans-serif;color:var(--ink);font-size:8.6pt;line-height:1.42;-webkit-print-color-adjust:exact;print-color-adjust:exact;font-feature-settings:"ss01","cv11"}
.page{width:210mm;height:297mm;position:relative;overflow:hidden;page-break-after:always;background:#fff}
.page:last-child{page-break-after:auto}
.inner{position:absolute;inset:0;padding:13mm 13mm 15mm}
h1,h2,h3,h4{font-family:'Inter Display','Inter',sans-serif;color:var(--navy);line-height:1.15}
.sec-head{display:flex;align-items:flex-end;gap:5mm;border-bottom:.4mm solid var(--navy);padding-bottom:2.5mm;margin-bottom:4.5mm}
.sec-num{font-family:'Inter Display';font-weight:300;font-size:30pt;color:var(--gold);line-height:.9}
.sec-head h2{font-size:19pt;font-weight:700;letter-spacing:-.2pt}
.sec-head .kick{font-size:7.4pt;letter-spacing:1.6pt;text-transform:uppercase;color:var(--muted);margin-bottom:1mm}
.foot{position:absolute;left:13mm;right:13mm;bottom:7mm;display:flex;justify-content:space-between;font-size:6.8pt;color:var(--muted);border-top:.2mm solid var(--line);padding-top:2mm;letter-spacing:.3pt}
.foot b{color:var(--navy);letter-spacing:1.2pt}
.lead{font-size:10pt;line-height:1.5;color:var(--ink)}
.muted{color:var(--muted)}
.gold{color:var(--gold)}
h3{font-size:11.5pt;font-weight:700;margin-bottom:1.6mm}
h4{font-size:9pt;font-weight:700;margin-bottom:1mm}
.card{background:var(--sand);border-radius:2.2mm;padding:3.6mm 4mm}
.card.line{background:#fff;border:.25mm solid var(--line)}
.tag{display:inline-block;font-size:6.6pt;letter-spacing:1.1pt;text-transform:uppercase;color:var(--gold);font-weight:700;margin-bottom:1mm}
ul.dots{list-style:none}
ul.dots li{position:relative;padding-left:3.2mm;margin-bottom:.7mm}
ul.dots li:before{content:"";position:absolute;left:0;top:1.55mm;width:1.3mm;height:1.3mm;border-radius:50%;background:var(--gold)}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:4mm}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:3.5mm}
.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:3mm}
.ph{width:100%;object-fit:cover;border-radius:2mm;display:block}
.cap{font-size:6.6pt;color:var(--muted);margin-top:1mm}
table{border-collapse:collapse;width:100%}
.wordmark{display:flex;flex-direction:column;line-height:1}
.wordmark .a{font-family:'Inter Display';font-weight:800;letter-spacing:3.2pt;font-size:13pt;color:var(--navy)}
.wordmark .b{font-size:6.8pt;letter-spacing:3.4pt;color:var(--gold);margin-top:1.3mm;font-weight:600}

/* COVER */
.cover .hero{position:absolute;left:0;right:0;top:0;height:158mm}
.cover .hero img{width:100%;height:100%;object-fit:cover}
.cover .hero:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,40,75,.55) 0%,rgba(20,40,75,.05) 38%,rgba(20,40,75,0) 60%,rgba(20,40,75,.65) 100%)}
.cover .top{position:absolute;left:13mm;right:13mm;top:12mm;display:flex;justify-content:space-between;align-items:flex-start;z-index:2}
.cover .top .wordmark .a{color:#fff}
.cover .top .wordmark .b{color:var(--gold2)}
.cover .top .lang{color:#fff;font-size:7pt;letter-spacing:2pt;border:.25mm solid rgba(255,255,255,.7);padding:1.3mm 2.6mm;border-radius:5mm}
.cover .herotxt{position:absolute;left:13mm;right:13mm;bottom:149mm;z-index:2;color:#fff}
.cover .body{position:absolute;left:13mm;right:13mm;top:166mm}
.cover h1{font-size:25pt;font-weight:700;letter-spacing:-.4pt;margin-bottom:3.5mm}
.cover h1 span{color:var(--gold)}
.cover .sub{font-size:10.2pt;color:var(--muted);margin-bottom:6mm;line-height:1.45}
.stats{display:grid;grid-template-columns:repeat(4,1fr);border-top:.4mm solid var(--navy);border-bottom:.25mm solid var(--line)}
.stat{padding:3.4mm 2.6mm 3.4mm 0}
.stat+.stat{padding-left:3.2mm;border-left:.25mm solid var(--line)}
.stat .n{font-family:'Inter Display';font-weight:700;font-size:20pt;color:var(--navy);line-height:1}
.stat .n small{font-size:11pt;color:var(--gold)}
.stat .t{font-size:7.2pt;color:var(--muted);margin-top:1.4mm;line-height:1.3}
.pillars{display:grid;grid-template-columns:repeat(4,1fr);gap:3mm;margin-top:6mm}
.pillar{border-left:.6mm solid var(--gold);padding:.4mm 0 .4mm 2.6mm}
.pillar b{display:block;font-size:8.6pt;color:var(--navy);margin-bottom:.6mm}
.pillar span{font-size:7.3pt;color:var(--muted);line-height:1.35;display:block}
.cover .bottom{position:absolute;left:13mm;right:13mm;bottom:10mm;display:flex;justify-content:space-between;align-items:flex-end;background:var(--navy);color:#fff;border-radius:2.4mm;padding:4mm 5mm}
.cover .bottom .c1{font-size:7.4pt;line-height:1.55}
.cover .bottom .c1 b{font-size:10pt;letter-spacing:.3pt}
.cover .bottom .c2{text-align:right;font-size:7.2pt;line-height:1.5;color:var(--gold2)}

/* ABOUT */
.mvv{display:grid;grid-template-columns:1.05fr 1fr;gap:4mm;margin-top:4mm}
.vision{display:grid;grid-template-columns:repeat(4,1fr);gap:2mm;margin-top:1.6mm}
.vision div{background:var(--navy);color:#fff;border-radius:1.6mm;padding:2.2mm 1mm;text-align:center;font-weight:600;font-size:7.6pt;line-height:1.2}
.vision div small{display:block;color:var(--gold2);font-weight:400;font-size:6.4pt;margin-top:.6mm}
.values li{margin-bottom:.9mm}
.story{display:grid;grid-template-columns:repeat(4,1fr);gap:3mm;margin-top:4mm}
.story .s{border-top:.5mm solid var(--gold);padding-top:2mm}
.story .s b{display:block;color:var(--navy);font-size:8.6pt;margin-bottom:.8mm}
.story .s p{font-size:7.4pt;color:var(--muted);line-height:1.38}
.floors{width:100%;font-size:7.5pt}
.floors td{padding:1.15mm 1.5mm;border-bottom:.2mm solid var(--line);vertical-align:top}
.floors td:first-child{width:11mm;font-weight:700;color:var(--gold)}
.eq{display:grid;grid-template-columns:1fr 1fr;gap:.6mm 3mm;font-size:7.3pt}
.eq div{border-bottom:.2mm dotted var(--line);padding:.6mm 0;display:flex;justify-content:space-between;gap:2mm}
.eq div span:last-child{color:var(--muted);text-align:right;white-space:nowrap}

/* DOCTORS */
.centers{display:grid;grid-template-columns:repeat(3,1fr);gap:2.4mm;margin-bottom:4mm}
.center{background:var(--sand);border-radius:1.8mm;padding:2.6mm 3mm}
.center b{color:var(--navy);font-size:8.6pt;display:block;margin-bottom:.6mm}
.center span{font-size:7.1pt;color:var(--muted);line-height:1.35;display:block}
.docs{display:grid;grid-template-columns:1fr 1fr;gap:3mm}
.doc{display:grid;grid-template-columns:24mm 1fr;gap:3.2mm;border:.25mm solid var(--line);border-radius:2mm;padding:2.6mm;align-items:start}
.doc img{width:24mm;height:30mm;object-fit:cover;object-position:top;border-radius:1.4mm;background:var(--sand)}
.doc .role{font-size:6.5pt;letter-spacing:1pt;text-transform:uppercase;color:var(--gold);font-weight:700}
.doc h4{font-size:10pt;margin:.4mm 0 .2mm}
.doc .pos{font-size:7.2pt;color:var(--navy2);font-weight:600;margin-bottom:1mm}
.doc .spec{font-size:7.2pt;margin-bottom:1mm}
.doc ul.dots li{font-size:6.9pt;color:var(--muted);margin-bottom:.3mm;line-height:1.3}
.doc ul.dots li:before{top:1.25mm;width:1mm;height:1mm}

/* METHODS */
.band{position:relative;height:23mm;border-radius:2.4mm;overflow:hidden;margin-bottom:4mm}
.band img{width:100%;height:100%;object-fit:cover}
.band .txt{position:absolute;left:6mm;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;color:#fff;max-width:100mm;text-shadow:0 0 6px rgba(10,30,70,.6)}
.band .txt b{font-size:12pt;font-family:'Inter Display';margin-bottom:1mm}
.band .txt span{font-size:8pt;line-height:1.4;opacity:.95}
.m-block{margin-bottom:3mm}
.m-block ul.dots li{font-size:7.5pt;margin-bottom:.35mm;line-height:1.35}
.m-block ul.dots li:before{top:1.25mm}
.m-block p.small{line-height:1.38}
.m-title{display:flex;align-items:baseline;gap:2.4mm;margin-bottom:1.4mm}
.m-title i{font-style:normal;font-family:'Inter Display';font-weight:700;color:var(--gold);font-size:11pt}
.m-title h3{margin:0}
.cmp{font-size:7.3pt}
.cmp th{background:var(--navy);color:#fff;font-weight:600;padding:1.1mm 1.8mm;text-align:left}
.cmp td{padding:.8mm 1.8mm;border-bottom:.2mm solid var(--line);vertical-align:top}
.cmp td:first-child{color:var(--muted);font-weight:600;width:24%}
.cmp td.hi{color:var(--navy);font-weight:600}
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:2mm;margin-top:2mm}
.steps div{background:var(--sand);border-radius:1.6mm;padding:1.5mm 2.2mm;font-size:7pt;line-height:1.3}
.steps div b{display:block;color:var(--gold);font-size:8pt;margin-bottom:.4mm}
.chips{display:flex;flex-wrap:wrap;gap:1.4mm}
.chips span{background:#fff;border:.25mm solid var(--gold2);color:var(--navy);border-radius:4mm;padding:.5mm 2mm;font-size:6.8pt}
.small{font-size:7.4pt}

/* PROCEDURES */
.proc{font-size:7.1pt;line-height:1.32}
.proc th{background:var(--navy);color:#fff;text-align:left;padding:1.6mm 2mm;font-weight:600;font-size:7.4pt}
.proc th:first-child{border-top-left-radius:1.6mm}
.proc th:last-child{border-top-right-radius:1.6mm}
.proc td{padding:1.9mm 2mm;border-bottom:.25mm solid var(--line);vertical-align:top}
.proc td:first-child{width:21mm;font-weight:700;color:var(--navy);font-size:7.8pt}
.proc td:first-child small{display:block;font-weight:400;color:var(--gold);font-size:6.4pt;margin-top:.5mm;letter-spacing:.4pt}
.proc tr:nth-child(even) td{background:#FBF9F5}
.proc ul{list-style:none}
.proc li{padding-left:2.4mm;position:relative;margin-bottom:.25mm}
.proc li:before{content:"–";position:absolute;left:0;color:var(--gold)}
.diag{display:grid;grid-template-columns:repeat(4,1fr);gap:2mm;margin-top:3.4mm}
.diag div{background:var(--sand);border-radius:1.6mm;padding:2mm 2.4mm;font-size:7pt;line-height:1.32}
.diag div b{color:var(--navy);display:block;font-size:7.8pt;margin-bottom:.4mm}

/* CONTACTS */
.ct-hero{display:grid;grid-template-columns:1.25fr 1fr;gap:4mm}
.ct-main{background:var(--navy);color:#fff;border-radius:2.4mm;padding:5mm}
.ct-main h3{color:#fff;font-size:12pt}
.ct-row{display:grid;grid-template-columns:24mm 1fr;gap:2mm;padding:1.5mm 0;border-bottom:.2mm solid rgba(255,255,255,.18);font-size:8pt}
.ct-row:last-child{border-bottom:none}
.ct-row span:first-child{color:var(--gold2);font-size:6.8pt;letter-spacing:.9pt;text-transform:uppercase;padding-top:.4mm}
.ct-row b{font-size:10.5pt}
.qrs{display:grid;grid-template-columns:1fr 1fr;gap:3mm}
.qr{border:.25mm solid var(--line);border-radius:2mm;padding:3mm;text-align:center;font-size:7pt}
.qr img{width:23mm;height:23mm;display:block;margin:0 auto 1.6mm}
.qr b{color:var(--navy);display:block;font-size:7.8pt}
.hours{font-size:7.5pt}
.hours td{padding:1.15mm 1.6mm;border-bottom:.2mm solid var(--line);vertical-align:top}
.hours td:first-child{font-weight:600;color:var(--navy)}
.hours td:last-child{text-align:right;white-space:nowrap}
.sched{font-size:6.9pt;text-align:center}
.sched th{background:var(--navy);color:#fff;font-weight:600;padding:1.1mm .8mm}
.sched td{padding:1mm .8mm;border-bottom:.2mm solid var(--line)}
.sched td:first-child{text-align:left;font-weight:600;color:var(--navy);white-space:nowrap}
.sched td.o{color:var(--navy);font-weight:700}
.sched td.s{color:var(--gold)}
.journey{display:grid;grid-template-columns:repeat(5,1fr);gap:0;margin-top:1.6mm}
.journey div:last-child{margin-right:0!important}
.journey div{position:relative;padding:2.4mm 2.4mm 2.4mm 2.4mm;background:var(--sand);font-size:6.9pt;line-height:1.3;margin-right:2mm;border-radius:1.6mm}
.journey div b{display:block;color:var(--navy);font-size:7.8pt;margin-bottom:.5mm}
.journey div i{font-style:normal;color:var(--gold);font-weight:700;font-size:9pt;display:block}
.intl{display:grid;grid-template-columns:repeat(4,1fr);background:var(--navy);border-radius:2.2mm;margin-top:5mm;padding:3.6mm 0}
.intl div{padding:0 4mm;color:#fff;font-size:7.2pt;line-height:1.38}
.intl div+div{border-left:.25mm solid rgba(255,255,255,.2)}
.intl b{display:block;color:var(--gold2);font-family:'Inter Display';font-size:10.5pt;margin-bottom:.8mm}
body.ru .lead{font-size:9.3pt}
body.ru .sec-head h2{font-size:17.5pt}
body.ru .story .s p{font-size:7.1pt}
body.ru .intl div{font-size:6.9pt}
body.ru .values li{font-size:8.2pt}
body.ru .centers .center span{font-size:6.9pt}
body.ru .doc ul.dots li{font-size:6.7pt}
body.ru .doc .spec{font-size:7pt}
body.ru .m-block ul.dots li{font-size:7.2pt}
body.ru .small{font-size:7.15pt}
body.ru .proc{font-size:6.85pt}
body.ru .proc td{padding:1.05mm 1.8mm}
body.ru .intl{margin-top:3.6mm}
body.ru .story{margin-top:3.2mm}
body.ru .mvv{margin-top:3.2mm}
body.ru .docs{gap:2.4mm}
body.ru .doc{padding:2.2mm}
body.ru .centers{margin-bottom:3.2mm}
body.ru .diag div{font-size:6.8pt}
body.ru .ct-row{font-size:7.7pt}
body.ru .journey div{font-size:6.7pt}
body.ru .e-img{display:none}
.note{font-size:6.6pt;color:var(--muted);line-height:1.4}
"""


def foot(t, n):
    return f'<div class="foot"><span><b>CHEONGDAM HARRISON HOSPITAL</b> &nbsp;·&nbsp; {t["city"]}</span><span>harrisonhospital.co.kr &nbsp;·&nbsp; {n} / 6</span></div>'


def head(num, kick, title):
    return f'<div class="sec-head"><div class="sec-num">{num}</div><div><div class="kick">{kick}</div><h2>{title}</h2></div></div>'


def ul(items, cls='dots'):
    return f'<ul class="{cls}">' + ''.join(f'<li>{i}</li>' for i in items) + '</ul>'


def page_cover(t):
    c = t['cover']
    stats = ''.join(f'<div class="stat"><div class="n">{n}</div><div class="t">{d}</div></div>' for n, d in c['stats'])
    pillars = ''.join(f'<div class="pillar"><b>{a}</b><span>{b}</span></div>' for a, b in c['pillars'])
    return f'''<section class="page cover">
<div class="hero"><img src="assets/lobby.jpg"></div>
<div class="top"><div class="wordmark"><span class="a">CHEONGDAM HARRISON</span><span class="b">HOSPITAL · SEOUL · KOREA</span></div><div class="lang">{c["lang"]}</div></div>
<div class="body">
<h1>{c["title"]}</h1>
<div class="sub">{c["sub"]}</div>
<div class="stats">{stats}</div>
<div class="pillars">{pillars}</div>
</div>
<div class="bottom"><div class="c1"><b>+82-2-333-8801</b><br>{c["addr"]}</div><div class="c2">harrisonhospital.co.kr<br>{c["online"]}</div></div>
</section>'''


def page_about(t):
    a = t['about']
    vision = ''.join(f'<div>{x}<small>{y}</small></div>' for x, y in a['vision'])
    story = ''.join(f'<div class="s"><b>{x}</b><p>{y}</p></div>' for x, y in a['story'])
    floors = ''.join(f'<tr><td>{f}</td><td>{d}</td></tr>' for f, d in a['floors'])
    eq = ''.join(f'<div><span>{x}</span><span>{y}</span></div>' for x, y in a['equip'])
    intl = ''.join(f'<div><b>{x}</b>{y}</div>' for x, y in a['intl'])
    return f'''<section class="page"><div class="inner">
{head("01", a["kick"], a["title"])}
<div class="grid2" style="grid-template-columns:1.25fr 1fr;gap:5mm">
 <div><p class="lead">{a["lead"]}</p><p style="margin-top:2.4mm">{a["p2"]}</p></div>
 <div><img class="ph" src="assets/or.jpg" style="height:44mm"><div class="cap">{a["cap_or"]}</div></div>
</div>
<div class="mvv">
 <div class="card"><span class="tag">{a["mission_t"]}</span><h3 style="font-size:10.5pt">{a["mission"]}</h3>
  <span class="tag" style="margin-top:2mm">{a["vision_t"]}</span><div class="vision">{vision}</div></div>
 <div class="card line"><span class="tag">{a["values_t"]}</span>{ul(a["values"], "dots values")}</div>
</div>
<div class="story">{story}</div>
<div class="grid2" style="grid-template-columns:1fr 1fr;gap:5mm;margin-top:4.5mm">
 <div><h4>{a["floors_t"]}</h4><table class="floors">{floors}</table></div>
 <div><h4>{a["equip_t"]}</h4><div class="eq">{eq}</div>
  <div class="grid3" style="gap:2mm;margin-top:3mm"><div><img class="ph" src="assets/vip.jpg" style="height:19mm"><div class="cap">{a["cap"][0]}</div></div><div><img class="ph" src="assets/rehab.jpg" style="height:19mm"><div class="cap">{a["cap"][1]}</div></div><div><img class="ph" src="assets/xray.jpg" style="height:19mm"><div class="cap">{a["cap"][2]}</div></div></div>
 </div>
</div>
<div class="intl">{intl}</div>
</div>{foot(t, 2)}</section>'''


def page_doctors(t):
    d = t['doctors']
    centers = ''.join(f'<div class="center"><b>{x}</b><span>{y}</span></div>' for x, y in d['centers'])
    docs = ''
    for key, role, name, pos, spec, bul in d['list']:
        docs += f'<div class="doc"><img src="assets/doc_{key}.jpg"><div><div class="role">{role}</div><h4>{name}</h4><div class="pos">{pos}</div><div class="spec">{spec}</div>{ul(bul)}</div></div>'
    return f'''<section class="page"><div class="inner">
{head("02", d["kick"], d["title"])}
<div class="centers">{centers}</div>
<div class="docs">{docs}</div>
</div>{foot(t, 3)}</section>'''


def page_methods(t):
    m = t['methods']
    e = m['endo']
    r = m['robot']
    cmp_rows = ''.join(f'<tr><td>{a}</td><td>{b}</td><td class="hi">{c}</td></tr>' for a, b, c in r['table'])
    endo_rows = ''.join(f'<tr><td>{a}</td><td>{b}</td><td>{c}</td></tr>' for a, b, c in e['table'])
    esteps = ''.join(f'<div><b>0{i+1}</b>{s}</div>' for i, s in enumerate(e['steps']))
    rsteps = ''.join(f'<div><b>0{i+1}</b>{s}</div>' for i, s in enumerate(r['steps']))
    regen = ''.join(f'<span>{x}</span>' for x in m['regen']['items'])
    pain = ''.join(f'<span>{x}</span>' for x in m['pain']['items'])
    return f'''<section class="page"><div class="inner">
{head("03", m["kick"], m["title"])}
<div class="band"><img src="assets/spine_bg.jpg"><div class="txt"><b>{m["band_t"]}</b><span>{m["band"]}</span></div></div>
<div class="m-block"><div class="m-title"><i>A</i><h3>{e["t"]}</h3></div>
 <div class="grid2" style="grid-template-columns:1fr 1.05fr;gap:4mm">
  <div><p class="small">{e["p"]}</p><h4 style="margin-top:2mm">{e["adv_t"]}</h4>{ul(e["adv"])}</div>
  <div><table class="cmp"><tr><th></th><th>{e["th"][0]}</th><th>{e["th"][1]}</th></tr>{endo_rows}</table>
   <p class="small" style="margin-top:1.6mm"><b style="color:var(--navy)">{e["who_t"]}</b> {e["who"]}</p></div>
 </div>
 <div class="steps">{esteps}</div>
</div>
<div class="m-block"><div class="m-title"><i>B</i><h3>{r["t"]}</h3></div>
 <div class="grid2" style="grid-template-columns:1fr 1.05fr;gap:4mm">
  <div><p class="small">{r["p"]}</p>{ul(r["facts"])}<div class="steps" style="grid-template-columns:1fr 1fr">{rsteps}</div></div>
  <div><table class="cmp"><colgroup><col style="width:27%"><col style="width:33%"><col></colgroup><tr><th>{r["th"][0]}</th><th>{r["th"][1]}</th><th>{r["th"][2]}</th></tr>{cmp_rows}</table></div>
 </div>
</div>
<div class="grid3" style="gap:3mm">
 <div class="card"><div class="m-title"><i>C</i><h4 style="margin:0;font-size:9.2pt">{m["regen"]["t"]}</h4></div><p class="small" style="margin-bottom:1.6mm">{m["regen"]["p"]}</p><div class="chips">{regen}</div></div>
 <div class="card"><div class="m-title"><i>D</i><h4 style="margin:0;font-size:9.2pt">{m["pain"]["t"]}</h4></div><p class="small" style="margin-bottom:1.6mm">{m["pain"]["p"]}</p><div class="chips">{pain}</div></div>
 <div class="card"><div class="m-title"><i>E</i><h4 style="margin:0;font-size:9.2pt">{m["rehab"]["t"]}</h4></div><p class="small">{m["rehab"]["p"]}</p><img class="ph e-img" src="assets/rehab2.jpg" style="height:24mm;margin-top:2mm"></div>
</div>
</div>{foot(t, 4)}</section>'''


def page_proc(t):
    p = t['proc']
    rows = ''
    for area, sub, cond, ns, s in p['rows']:
        rows += f'<tr><td>{area}<small>{sub}</small></td><td>{ul(cond, "")}</td><td>{ul(ns, "")}</td><td>{ul(s, "")}</td></tr>'
    diag = ''.join(f'<div><b>{x}</b>{y}</div>' for x, y in p['extra'])
    photos = ''.join(f'<div><img class="ph" src="assets/{k}.jpg" style="height:22mm"><div class="cap">{c}</div></div>' for k, c in p['photos'])
    return f'''<section class="page"><div class="inner">
{head("04", p["kick"], p["title"])}
<p class="small" style="margin:-1.4mm 0 3mm">{p["intro"]}</p>
<table class="proc"><tr><th>{p["th"][0]}</th><th style="width:28%">{p["th"][1]}</th><th style="width:27%">{p["th"][2]}</th><th>{p["th"][3]}</th></tr>{rows}</table>
<div class="diag">{diag}</div>
<div class="grid3" style="gap:3mm;margin-top:3.4mm">{photos}</div>
</div>{foot(t, 5)}</section>'''


def page_contacts(t):
    c = t['contacts']
    rows = ''.join(f'<div class="ct-row"><span>{a}</span><span>{b}</span></div>' for a, b in c['rows'])
    hours = ''.join(f'<tr><td>{a}</td><td>{b}</td></tr>' for a, b in c['hours'])
    days = c['days']
    srows = ''
    for name, slots in c['sched']:
        cells = ''
        for s in slots:
            cls = 'o' if s == 'O' else ('s' if s == 'S' else '')
            lab = c['lbl'][s]
            cells += f'<td class="{cls}">{lab}</td>'
        srows += f'<tr><td>{name}</td>{cells}</tr>'
    dh = ''.join(f'<th colspan="2">{d}</th>' for d in days)
    ap = ''.join(f'<th style="font-weight:400;background:var(--navy2)">{c["am"]}</th><th style="font-weight:400;background:var(--navy2)">{c["pm"]}</th>' for _ in days)
    journey = ''.join(f'<div><i>0{i+1}</i><b>{a}</b>{b}</div>' for i, (a, b) in enumerate(c['journey']))
    return f'''<section class="page"><div class="inner">
{head("05", c["kick"], c["title"])}
<div class="ct-hero">
 <div class="ct-main"><h3>{c["main_t"]}</h3>{rows}</div>
 <div style="display:flex;flex-direction:column;gap:3mm">
  <div class="qrs"><div class="qr"><img src="assets/qr_site.svg"><b>{c["qr1"]}</b>harrisonhospital.co.kr</div><div class="qr"><img src="assets/qr_online.svg"><b>{c["qr2"]}</b>harrisonhospital.co.kr/online</div></div>
  <div class="card" style="padding:3mm 3.4mm"><h4>{c["way_t"]}</h4>{ul(c["way"])}</div>
 </div>
</div>
<div class="grid2" style="grid-template-columns:.9fr 1.1fr;gap:4.5mm;margin-top:4.5mm">
 <div><h4>{c["hours_t"]}</h4><table class="hours">{hours}</table><p class="note" style="margin-top:1.4mm">{c["hours_note"]}</p></div>
 <div><h4>{c["sched_t"]}</h4><table class="sched"><tr><th rowspan="2" style="text-align:left">{c["doc"]}</th>{dh}</tr><tr>{ap}</tr>{srows}</table><p class="note" style="margin-top:1.4mm">{c["sched_note"]}</p></div>
</div>
<h4 style="margin-top:4.2mm">{c["journey_t"]}</h4>
<div class="journey">{journey}</div>
<div class="grid2" style="grid-template-columns:1fr 1fr;gap:4.5mm;margin-top:4mm">
 <div class="card line" style="padding:3mm 3.4mm"><h4>{c["park_t"]}</h4><p class="small">{c["park"]}</p></div>
 <div class="card line" style="padding:3mm 3.4mm"><h4>{c["social_t"]}</h4><p class="small">{c["social"]}</p></div>
</div>
<div class="card" style="margin-top:4mm;padding:3.2mm 4mm;display:grid;grid-template-columns:40mm 1fr;gap:4mm;align-items:center"><div><span class="tag">{c["net_k"]}</span><h4 style="font-size:10pt;margin:0">{c["net_t"]}</h4></div><p class="small">{c["net"]}</p></div>
<p class="note" style="margin-top:3mm">{c["disclaimer"]}</p>
</div>{foot(t, 6)}</section>'''


def build(lang):
    t = T[lang]
    html = f'''<!doctype html><html lang="{lang}"><head><meta charset="utf-8"><title>{t["doc_title"]}</title><style>{CSS}</style></head><body class="{lang}">
{page_cover(t)}{page_about(t)}{page_doctors(t)}{page_methods(t)}{page_proc(t)}{page_contacts(t)}
</body></html>'''
    path = OUT + f'Harrison_Brochure_{lang.upper()}.html'
    open(path, 'w', encoding='utf-8').write(html)
    print(path)


for lang in (sys.argv[1:] or ['en', 'ru']):
    build(lang)
