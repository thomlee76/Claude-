# -*- coding: utf-8 -*-
"""Render slide frames + narration manifest for the drama episode videos.
usage: python3 drama-video/render.py 01 02 ...   (no args = all 40)
writes drama-video/work/frames/epNN_SSS.jpg and drama-video/work/manifest_epNN.json
"""
import base64, html, json, os, re, sys
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent
REPO = ROOT.parent
DATA = json.load(open(ROOT / "data.json", encoding="utf-8"))
CAST = DATA["cast"]
IMG = REPO / "docs/english-drama/img"
OUT = ROOT / "work/frames"; OUT.mkdir(parents=True, exist_ok=True)

KO = "ko-KR-SunHiNeural"
EN = "en-US-JennyNeural"
VOICE = {"A": "en-US-GuyNeural", "D": "en-US-AriaNeural", "P": "en-US-RogerNeural", "M": "en-GB-RyanNeural",
         "J": "en-US-EricNeural", "K": "en-US-ChristopherNeural", "V": "en-GB-ThomasNeural", "L": "en-US-MichelleNeural",
         "N": "en-AU-WilliamNeural", "E": "en-GB-SoniaNeural", "S": "en-US-JennyNeural"}
SLOT = ["#4FB3BF", "#7FA6E8", "#E9915B", "#B496E0"]

def b64(p): return base64.b64encode(Path(p).read_bytes()).decode()
FONTS = "".join(
    f"@font-face{{font-family:Plex;font-weight:{w};src:url(data:font/woff2;base64,{b64(ROOT/'fonts'/f'ibm-plex-sans-kr-{s}-{w}-normal.woff2')}) format('woff2')}}"
    for s in ("latin", "korean") for w in (400, 700))
IMGCACHE = {}
def img(no, p):
    k = (no, p)
    if k not in IMGCACHE: IMGCACHE[k] = "data:image/webp;base64," + b64(IMG / f"ep{no}_p{p}.webp")
    return IMGCACHE[k]

esc = lambda s: html.escape("" if s is None else str(s))
def hl(s): return re.sub(r"\{(\d):([^}]+)\}", lambda m: f'<span class="hl" style="color:{SLOT[int(m[1])]}">{m[2]}</span>', esc(s))
def plain(s): return re.sub(r"\{\d:([^}]+)\}", r"\1", s or "")
def speakable(s):
    s = plain(s).replace("·", ",").replace("→", ",").replace("~", " ").replace("…", ".")
    s = re.sub(r"\[\[(.+?)\]\]", r"\1", s); s = re.sub(r"\*\*(.+?)\*\*", r"\1", s)
    return re.sub(r"\s+", " ", s).strip()

CSS = FONTS + """
*{box-sizing:border-box;margin:0;padding:0}
body{width:1280px;height:720px;overflow:hidden;background:#0B0B0F;color:#F2F2F7;font-family:Plex,sans-serif;-webkit-font-smoothing:antialiased;position:relative}
.top{position:absolute;left:48px;right:48px;top:30px;display:flex;align-items:center;gap:14px}
.ep{background:#FF8A3D;color:#fff;font-weight:700;font-size:18px;padding:5px 12px;border-radius:8px}
.tt{font-size:19px;font-weight:700;color:#C7C7D1}
.sec{margin-left:auto;font-size:15px;font-weight:700;letter-spacing:.14em;color:#8E8E99}
.bar{position:absolute;left:0;right:0;bottom:0;height:6px;background:#1E1E24}.bar i{display:block;height:100%;background:#FF8A3D}
.brand{position:absolute;right:48px;bottom:22px;font-size:13px;color:#5E5E68;letter-spacing:.08em}
.main{position:absolute;left:48px;right:48px;top:88px;bottom:46px}
.hl{font-weight:700}
.card{background:#17171C;border-radius:24px}
.dot{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;color:#fff;font-weight:700;font-size:17px;flex:none;box-shadow:0 0 0 2px rgba(255,255,255,.28)}
/* title */
.ttl{display:grid;grid-template-columns:1fr 560px;gap:44px;height:100%;align-items:center}
.ttl .k{font-size:16px;letter-spacing:.2em;color:#FF8A3D;font-weight:700}
.ttl .n{font-size:110px;font-weight:700;line-height:1;letter-spacing:-.03em;margin-top:8px}
.ttl h1{font-size:52px;line-height:1.25;margin-top:14px;word-break:keep-all}
.ttl .g{display:inline-block;margin-top:22px;font-size:22px;font-weight:700;color:#2EC4B6;background:#2EC4B61F;padding:8px 16px;border-radius:12px}
.grid4{display:grid;grid-template-columns:1fr 1fr;gap:10px}.grid4 img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:16px;display:block}
/* story */
.st{display:grid;grid-template-columns:600px 1fr;gap:36px;height:100%;align-items:center}
.st img{width:600px;height:540px;object-fit:cover;border-radius:24px;display:block}
.st .lab{font-size:18px;color:#8E8E99;font-weight:700;margin-bottom:18px}
.ln{display:flex;gap:14px;align-items:flex-start;padding:16px 18px;border-radius:18px;margin-bottom:12px;opacity:.32}
.ln.on{opacity:1;background:#17171C}
.ln .nm{font-size:15px;font-weight:700;color:#AEAEB8}
.ln .en{font-size:27px;font-weight:700;line-height:1.35;margin-top:2px}
.ln .ko{font-size:18px;color:#A3A3AE;margin-top:6px;line-height:1.4}
.ln.on .en{font-size:30px}
/* expression */
.ex{display:grid;grid-template-columns:1fr 300px;gap:36px;height:100%;align-items:center}
.ex .lab{font-size:16px;font-weight:700;color:#FF8A3D;letter-spacing:.12em}
.ex .w{font-size:64px;font-weight:700;line-height:1.1;margin-top:8px;letter-spacing:-.01em}
.ex .why{font-size:25px;line-height:1.5;color:#D1D1D8;margin-top:16px;word-break:keep-all}
.ex .trap{font-size:20px;color:#FF6B5E;margin-top:14px;word-break:keep-all}
.exs{margin-top:22px;display:flex;flex-direction:column;gap:10px}
.exs div{background:#17171C;border-radius:16px;padding:14px 18px}
.exs b{display:block;font-size:24px;line-height:1.35}.exs span{display:block;font-size:17px;color:#A3A3AE;margin-top:4px}
.ex img{width:300px;height:300px;object-fit:cover;border-radius:22px}
.ex .idx{font-size:15px;color:#8E8E99;margin-top:12px;text-align:center}
/* red pen */
.rp{display:flex;flex-direction:column;justify-content:center;height:100%;gap:22px}
.rp .lab{font-size:16px;font-weight:700;color:#FF6B5E;letter-spacing:.12em}
.rp .row{border-radius:22px;padding:26px 30px;font-size:36px;line-height:1.4;font-weight:700}
.rp .bad{background:#2A1715;color:#F3A08C}.rp .bad s{text-decoration-thickness:3px}
.rp .good{background:#13281E;color:#E9F7EF}.rp .good u{color:#34C77B;text-decoration:none;border-bottom:4px solid #34C77B}
.rp .tag{display:block;font-size:15px;letter-spacing:.14em;margin-bottom:8px;opacity:.8}
.rp .why{font-size:24px;color:#D1D1D8;word-break:keep-all}
/* shadowing */
.sh{display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;text-align:center}
.sh .chip{font-size:18px;font-weight:700;color:#2EC4B6;background:#2EC4B61F;padding:8px 18px;border-radius:999px}
.sh .who{display:flex;align-items:center;gap:12px;margin-top:30px;font-size:19px;color:#AEAEB8;font-weight:700}
.sh .en{font-size:48px;font-weight:700;line-height:1.35;margin-top:18px;max-width:1080px}
.sh .ko{font-size:22px;color:#A3A3AE;margin-top:16px}
.sh .cnt{font-size:16px;color:#8E8E99;margin-top:28px;letter-spacing:.1em}
/* quiz */
.qz{display:flex;flex-direction:column;justify-content:center;height:100%}
.qz .lab{font-size:16px;font-weight:700;color:#9B8CFF;letter-spacing:.12em}
.qz .q{font-size:38px;font-weight:700;line-height:1.4;margin-top:12px;word-break:keep-all}
.qz .ops{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:30px}
.qz .op{background:#17171C;border:2px solid #26262D;border-radius:18px;padding:18px 22px;font-size:27px;display:flex;gap:14px;align-items:center}
.qz .op i{font-style:normal;width:36px;height:36px;border-radius:50%;background:#26262D;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:700;flex:none}
.qz .op.ok{border-color:#34C77B;background:#13281E}.qz .op.ok i{background:#34C77B;color:#0B0B0F}
.qz .op.dim{opacity:.35}
.qz .why{font-size:24px;color:#D1D1D8;margin-top:24px}
/* section + outro */
.sc{display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;text-align:center}
.sc .n{font-size:20px;font-weight:700;color:#FF8A3D;letter-spacing:.2em}
.sc h1{font-size:64px;margin-top:12px}.sc p{font-size:24px;color:#A3A3AE;margin-top:14px}
.ot{display:grid;grid-template-columns:1fr 520px;gap:40px;height:100%;align-items:center}
.ot .k{font-size:18px;color:#FF8A3D;font-weight:700;letter-spacing:.16em}
.ot h1{font-size:46px;line-height:1.3;margin-top:12px;word-break:keep-all}
.ot p{font-size:22px;color:#A3A3AE;margin-top:18px}
.ot img{width:520px;height:390px;object-fit:cover;border-radius:24px}
"""

def dot(k, sz=40): c = CAST.get(k, ["?", "#555"]); return f'<span class="dot" style="background:{c[1]};width:{sz}px;height:{sz}px">{"Su" if k == "A" else k}</span>'
def shell(ep, sec, inner, prog): return f"""<html><head><meta charset="utf-8"><style>{CSS}</style></head><body>
<div class="top"><span class="ep">EP.{ep['no']}</span><span class="tt">{esc(ep['title'])}</span><span class="sec">{sec}</span></div>
<div class="main">{inner}</div><div class="brand">BUSINESS ENGLISH DRAMA · B1</div><div class="bar"><i style="width:{prog:.1f}%"></i></div></body></html>"""

def scenes(ep):
    """yield (section, inner_html, segs)  segs: [(voice, text, rate, pause_after)]"""
    no = ep["no"]; S = []
    # 1 title
    S.append(("INTRO", f"""<div class="ttl"><div><div class="k">BUSINESS ENGLISH DRAMA</div><div class="n">EP.{no}</div><h1>{esc(ep['title'])}</h1><div class="g">{esc(ep['grammar'])}</div></div>
      <div class="grid4">{''.join(f'<img src="{img(no,p)}">' for p in range(1,5))}</div></div>""",
      [(KO, f"비즈니스 영어 드라마, 에피소드 {int(no)}. {ep['title']}.", "+8%", 0.3), (KO, f"오늘의 문법은 {speakable(ep['grammar'])}. 먼저 이야기를 들어 볼까요?", "+8%", 0.4)]))
    # 2 story: one frame per line
    for pi, pn in enumerate(ep["panels"]):
        for li, ln in enumerate(pn["lines"]):
            rows = "".join(f"""<div class="ln {'on' if j == li else ''}">{dot(l['s'])}<div><div class="nm">{esc(CAST.get(l['s'], [l['s']])[0])}</div><div class="en">{hl(l['en'])}</div><div class="ko">{esc(l['ko'])}</div></div></div>""" for j, l in enumerate(pn["lines"]))
            S.append(("STORY", f"""<div class="st"><img src="{img(no, pi+1)}"><div><div class="lab">{pi+1} / 4 · {esc(pn['label'])}</div>{rows}</div></div>""",
                      [(VOICE.get(ln["s"], EN), speakable(ln["en"]), "-5%", 0.45)]))
    # 3 expressions
    S.append(("EXPRESSIONS", '<div class="sc"><div class="n">KEY EXPRESSIONS</div><h1>오늘의 핵심 표현</h1><p>이야기 속 표현 4개를 짚어 봅니다</p></div>', [(KO, "핵심 표현 네 가지를 짚어 볼게요.", "+8%", 0.2)]))
    for i, x in enumerate(ep["explain"]):
        exs = "".join(f"<div><b>{esc(en)}</b><span>{esc(ko)}</span></div>" for en, ko in x["ex"][:2])
        S.append(("EXPRESSIONS", f"""<div class="ex"><div><div class="lab">EXPRESSION {i+1} / 4</div><div class="w">{esc(x['w'])}</div><div class="why">{esc(x['why'])}</div><div class="trap">⚠ {esc(x['trap'])}</div><div class="exs">{exs}</div></div>
          <div><img src="{img(no, i+1)}"></div></div>""",
          [(EN, speakable(x["w"]), "-10%", 0.2), (KO, speakable(x["why"]), "+12%", 0.2), (EN, speakable(x["ex"][0][0]), "-5%", 0.6)]))
    # 4 red pen
    for i, (a, bad, good, rest, why) in enumerate([[x or "" for x in r] for r in ep["red"]]):
        S.append(("RED PEN", f"""<div class="rp"><div class="lab">빨간 펜 첨삭 {i+1} / {len(ep['red'])}</div>
          <div class="row bad"><span class="tag">BEFORE</span>{esc(a)} <s>{esc(bad)}</s> {esc(rest)}</div>
          <div class="row good"><span class="tag">AFTER</span>{esc(a)} <u>{esc(good)}</u> {esc(rest)}</div>{f'<div class="why">✎ {esc(why)}</div>' if why else ''}</div>""",
          ([(KO, "빨간 펜 첨삭입니다.", "+8%", 0.1)] if i == 0 else []) + [(EN, speakable(f"{a} {good} {rest}"), "-5%", 0.2), (KO, speakable(why), "+12%", 0.5)]))
    # 5 shadowing: 3 lines that contain a highlight
    lines = [l for p in ep["panels"] for l in p["lines"] if "{" in l["en"]][:3] or [l for p in ep["panels"] for l in p["lines"]][:3]
    for i, l in enumerate(lines):
        S.append(("SHADOWING", f"""<div class="sh"><span class="chip">🎧 듣고 따라 말해 보세요 · {i+1} / {len(lines)}</span><div class="who">{dot(l['s'],34)}{esc(CAST.get(l['s'],[l['s']])[0])}</div>
          <div class="en">{hl(l['en'])}</div><div class="ko">{esc(l['ko'])}</div><div class="cnt">LISTEN · REPEAT · LISTEN</div></div>""",
          ([(KO, "따라 말해 보세요. 멈춘 동안 소리 내어 말하면 됩니다.", "+8%", 0.3)] if i == 0 else []) +
          [(VOICE.get(l["s"], EN), speakable(l["en"]), "-12%", 2.8), (VOICE.get(l["s"], EN), speakable(l["en"]), "+0%", 0.6)]))
    # 6 quiz (2 questions)
    for i, q in enumerate(ep["quiz"][:2]):
        ops = lambda ans: "".join(f'<div class="op {("ok" if j == q["a"] else "dim") if ans else ""}"><i>{"ABCD"[j]}</i>{esc(o)}</div>' for j, o in enumerate(q["opts"]))
        S.append(("QUIZ", f"""<div class="qz"><div class="lab">QUIZ {i+1} / 2</div><div class="q">{esc(q['q'])}</div><div class="ops">{ops(False)}</div></div>""",
          ([(KO, "퀴즈입니다. 정답을 골라 보세요.", "+8%", 2.6)] if i == 0 else [(KO, "다음 문제.", "+8%", 2.6)])))
        S.append(("QUIZ", f"""<div class="qz"><div class="lab">QUIZ {i+1} / 2 · 정답</div><div class="q">{esc(q['q'])}</div><div class="ops">{ops(True)}</div><div class="why">✎ {esc(q['why'])}</div></div>""",
          [(KO, f"정답은 {['A','B','C','D'][q['a']]}번,", "+8%", 0.1), (EN, speakable(q["opts"][q["a"]]), "+0%", 0.2), (KO, speakable(q["why"]), "+12%", 0.6)]))
    # 7 outro
    nxt = re.sub(r"\s*▸.*$", "", ep["next"]).strip()
    nno = f"{int(no)+1:02d}"
    pic = f'<img src="{img(nno,1)}">' if (IMG / f"ep{nno}_p1.webp").exists() else f'<img src="{img(no,4)}">'
    S.append(("NEXT", f"""<div class="ot"><div><div class="k">NEXT EPISODE</div><h1>{esc(nxt)}</h1><p>오늘 표현은 앱의 복습 퀴즈와 단어장에서 다시 연습하세요.</p></div>{pic}</div>""",
      [(KO, f"다음 화 예고. {speakable(nxt)}", "+8%", 0.3), (KO, "오늘도 수고하셨습니다.", "+8%", 1.2)]))
    return S

def main(nos):
    eps = [e for e in DATA["eps"] if not nos or e["no"] in nos]
    with sync_playwright() as p:
        b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1280, "height": 720})
        for ep in eps:
            sc = scenes(ep); man = []
            for i, (sec, inner, segs) in enumerate(sc):
                fn = f"ep{ep['no']}_{i+1:03d}.jpg"
                pg.set_content(shell(ep, sec, inner, (i+1)/len(sc)*100)); pg.wait_for_timeout(80)
                pg.screenshot(path=str(OUT / fn), type="jpeg", quality=90)
                man.append({"img": fn, "sec": sec, "segs": [{"v": v, "t": t, "r": r, "p": pa} for v, t, r, pa in segs if t]})
            json.dump({"ep": ep["no"], "scenes": man}, open(ROOT / f"work/manifest_ep{ep['no']}.json", "w", encoding="utf-8"), ensure_ascii=False, indent=0)
            print("ep", ep["no"], len(sc), "scenes")
        b.close()

if __name__ == "__main__":
    main(sys.argv[1:])
