#!/usr/bin/env python3
"""JLPT N5 텔레그램 봇 — 하루 8단어 콜라주(2장, 2×2)와 메시지 생성.

사용:
  python3 build.py prompts          # 그림 생성용 프롬프트 목록 출력 (id<TAB>prompt)
  python3 build.py render [1-25]    # 콜라주 PNG + 메시지 JSON 생성 (기본: 그림이 모두 있는 날 전부)

데이터: words.tsv (예문의 후리가나 표기: {漢字:かな})
그림:   img/<id>.png|webp (없으면 그 날은 건너뜀)
결과:   collages/dayNN-1.png, collages/dayNN-2.png, messages/dayNN.json
"""
import json, re, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent
PER_DAY, DAYS = 8, 25
START = "2026-11-23"  # DAY 1
STYLE = ("Cinematic Japanese anime illustration, film still quality. {scene}. "
         "Highly detailed hand-painted background, dramatic lighting, rich saturated colors, "
         "expressive faces. No text, no letters, no numbers, no signs with writing, no logos, no watermark.")

# ---------- data ----------
def load_words():
    rows = []
    for line in (ROOT / "words.tsv").read_text(encoding="utf-8").splitlines():
        if not line or line.startswith("#"):
            continue
        f = line.split("\t")
        rows.append(dict(id=f[0], word=f[1], reading=f[2], pos=f[3], ko=f[4],
                         ex=[(f[5], f[6]), (f[7], f[8])], scene=f[9]))
    # 주제(테마)는 원래 단어장(words.js) 순서를 그대로 사용
    js = (ROOT.parent / "words.js").read_text(encoding="utf-8")
    theme_of, cur = {}, None
    for line in js.splitlines():
        m = re.search(r'\{t:"([^"]+)"', line)
        if m:
            cur = re.sub(r"\s*[①②③]$", "", m.group(1))
        m = re.search(r'\["([a-z0-9]+)",', line)
        if m and cur:
            theme_of[m.group(1)] = cur
    for r in rows:
        r["theme"] = theme_of.get(r["id"], "")
    assert len(rows) == PER_DAY * DAYS, len(rows)
    return rows

def day_words(rows, n):
    return rows[(n - 1) * PER_DAY: n * PER_DAY]

def day_title(ws):
    seen = []
    for w in ws:
        if w["theme"] not in seen:
            seen.append(w["theme"])
    return " · ".join(seen)

SEG = re.compile(r"\{([^:}]+):([^}]*)\}|([^{]+)")
def parse(s):
    """'{私:わたし}は' -> [('私','わたし'), ('は', None)]"""
    return [(m.group(1), m.group(2)) if m.group(1) else (m.group(3), None) for m in SEG.finditer(s)]

def plain(s):
    return "".join(b for b, _ in parse(s))

def inline_ruby(s):
    return "".join(f"{b}({r})" if r else b for b, r in parse(s))

KANA = re.compile(r"[぀-ゟ]+$")
def bold_mask(text, word):
    """예문에서 강조할 글자 위치 (단어 전체 → 없으면 활용형 어간)."""
    mask = [False] * len(text)
    keys = [word]
    stem = KANA.sub("", word)
    if stem and stem != word:
        keys.append(stem)
    for k in keys:
        hit = False
        for m in re.finditer(re.escape(k), text):
            hit = True
            for i in range(m.start(), m.end()):
                mask[i] = True
        if hit:
            break
    return mask

# ---------- drawing ----------
FD = Path("/usr/share/fonts/opentype/noto")
def font(weight, size, lang="JP"):
    idx = {"JP": 0, "KR": 1}[lang]
    return ImageFont.truetype(str(FD / f"NotoSansCJK-{weight}.ttc"), size, index=idx)

def hexc(h):
    return tuple(int(h[i:i + 2], 16) for i in (1, 3, 5))

W, PAD, GAP, CW, PIC_H, R = 1080, 36, 24, 492, 300, 30
BX = 28                       # card body side padding
BODY_W = CW - 2 * BX
C = dict(bg="#F2F2F5", tag="#8A8A93", title="#111114", word="#111114", furi="#8C8C95",
         badge="#EEEEF1", badget="#55555C", ko="#1C1C20", line="#ECECEF", num="#9A9AA2",
         ex="#1C1C20", exb="#000000", exko="#74747C")

def tw(d, s, f):
    return d.textlength(s, font=f)

def wrap_ko(d, text, f, width):
    words, lines, cur = text.split(" "), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if tw(d, t, f) <= width or not cur:
            cur = t
        else:
            lines.append(cur)
            cur = w
    lines.append(cur)
    return lines

def ruby_layout(d, src, word, width, fb, fbb, fr):
    """후리가나 줄 배치 → [(lines: [[(x, base, ruby, bold)]]), ...]"""
    segs = parse(src)
    text = "".join(b for b, _ in segs)
    mask = bold_mask(text, word)
    units, pos = [], 0          # 루비 없는 부분은 글자 단위로 쪼개 줄바꿈 가능하게
    for base, ruby in segs:
        if ruby:
            units.append((base, ruby, any(mask[pos:pos + len(base)])))
        else:
            for i, ch in enumerate(base):
                units.append((ch, None, mask[pos + i]))
        pos += len(base)
    lines, line, x, prev_rr = [], [], 0.0, -1e9
    size = fb.size
    for base, ruby, b in units:
        bw = tw(d, base, fbb if b else fb)
        rw = tw(d, ruby, fr) if ruby else 0
        shift = 0.0
        if ruby:
            rl = x + (bw - rw) / 2
            if rl < prev_rr + 2:                # 앞 루비와 겹치지 않게
                shift = prev_rr + 2 - rl
            if not line and rl + shift < -6:    # 줄 맨 앞: 번호 쪽으로 6px까지만 걸치게
                shift = -6 - rl
        end = x + shift + bw
        if ruby:
            rr = x + shift + (bw + rw) / 2
            end = max(end, rr - size * 0.5)     # 루비가 뒤 글자 위로 반 글자까지만 걸치게
        if line and end > width and base not in "。、！？":
            lines.append(line)
            line, x, prev_rr, shift = [], 0.0, -1e9, 0.0
            if ruby:
                rl = (bw - rw) / 2
                shift = (-6 - rl) if rl < -6 else 0.0
                end = max(shift + bw, shift + (bw + rw) / 2 - size * 0.5)
            else:
                end = bw
        line.append((x + shift, base, ruby, b))
        if ruby:
            prev_rr = x + shift + (bw + rw) / 2
        x = end if ruby else x + shift + bw
    if line:
        lines.append(line)
    return lines

def card_image(d0, w, pic_path):
    """카드 1장을 그려 (Image, height) 반환."""
    fb, fbb = font("Medium", 24), font("Bold", 24)
    fr = font("Regular", 14)
    fnum = font("Medium", 22)
    fko = font("Regular", 18, "KR")
    fword_r = font("Regular", 22)
    fmean = font("Medium", 30, "KR")
    fpos = font("Bold", 17, "KR")
    size = 62
    while True:
        fword = font("Bold", size)
        if tw(d0, w["word"], fword) <= BODY_W or size <= 30:
            break
        size -= 2
    # --- measure ---
    y = PIC_H + 18
    y += 30                                    # furigana line
    y += int(size * 1.25)                      # word
    y += 6 + 44                                # meaning row
    y += 16 + 1 + 10                           # divider
    ex_blocks = []
    for i, (jp, ko) in enumerate(w["ex"]):
        nw = tw(d0, "①", fnum) + 8
        lines = ruby_layout(d0, jp, w["word"], BODY_W - nw, fb, fbb, fr)
        kol = wrap_ko(d0, ko, fko, BODY_W)
        h = (12 if i else 0) + len(lines) * 50 + len(kol) * 27
        ex_blocks.append((nw, lines, kol, h))
        y += h
    H = y + 26
    img = Image.new("RGBA", (CW, H), (0, 0, 0, 0))
    m = Image.new("L", (CW, H), 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, CW - 1, H - 1), R, fill=255)
    base = Image.new("RGBA", (CW, H), hexc("#FFFFFF") + (255,))
    pic = Image.open(pic_path).convert("RGB")
    sw, sh = pic.size
    tr = CW / PIC_H
    if sw / sh > tr:
        nw_ = int(sh * tr); pic = pic.crop(((sw - nw_) // 2, 0, (sw - nw_) // 2 + nw_, sh))
    else:
        nh = int(sw / tr); pic = pic.crop((0, (sh - nh) // 2, sw, (sh - nh) // 2 + nh))
    base.paste(pic.resize((CW, PIC_H), Image.LANCZOS), (0, 0))
    d = ImageDraw.Draw(base)
    x0, y = BX, PIC_H + 18
    # word + furigana (centered over word)
    ww = tw(d, w["word"], fword)
    if w["reading"]:
        rw = tw(d, w["reading"], fword_r)
        d.text((x0 + max(0, (ww - rw) / 2), y), w["reading"], font=fword_r, fill=C["furi"])
    y += 30
    d.text((x0, y - size * 0.12), w["word"], font=fword, fill=C["word"])
    y += int(size * 1.25)
    # meaning row
    y += 6
    pw = tw(d, w["pos"], fpos)
    d.rounded_rectangle((x0, y + 8, x0 + pw + 20, y + 36), 14, fill=C["badge"])
    d.text((x0 + 10, y + 8 + 2), w["pos"], font=fpos, fill=C["badget"])
    d.text((x0 + pw + 20 + 12, y), w["ko"], font=fmean, fill=C["ko"])
    y += 44
    y += 16
    d.line((x0, y, CW - BX, y), fill=C["line"], width=1)
    y += 11
    for i, (nw, lines, kol, h) in enumerate(ex_blocks):
        if i:
            y += 12
        for li, line in enumerate(lines):
            if li == 0:
                d.text((x0, y + 15), "①②"[i], font=fnum, fill=C["num"])
            for (sx, b, r, bold) in line:
                bx = x0 + nw + sx
                f = fbb if bold else fb
                bw = tw(d, b, f)
                if r:
                    rw = tw(d, r, fr)
                    d.text((bx + (bw - rw) / 2, y), r, font=fr, fill=C["furi"])
                d.text((bx, y + 14), b, font=f, fill=C["exb"] if bold else C["ex"])
            y += 50
        for k in kol:
            d.text((x0, y - 2), k, font=fko, fill=C["exko"])
            y += 27
    img.paste(base, (0, 0), m)
    return img

def collage(words, n, part, title):
    d0 = ImageDraw.Draw(Image.new("RGB", (10, 10)))
    cards = [card_image(d0, w, pic_path(w["id"])) for w in words]
    ftag, ftitle = font("Bold", 22, "KR"), font("Bold", 46, "KR")
    head_h = 40 + 32 + 2 + 64
    rows = [cards[:2], cards[2:]]
    row_h = [max(c.size[1] for c in r) for r in rows]
    H = head_h + GAP + row_h[0] + GAP + row_h[1] + 44
    canvas = Image.new("RGB", (W, H), hexc(C["bg"]))
    d = ImageDraw.Draw(canvas)
    tag = f"JLPT N5  ·  DAY {n}  ·  {part}/2"
    d.text(((W - tw(d, tag, ftag)) / 2, 40), tag, font=ftag, fill=C["tag"])
    d.text(((W - tw(d, title, ftitle)) / 2, 40 + 32), title, font=ftitle, fill=C["title"])
    y = head_h + GAP
    for r, rh in zip(rows, row_h):
        for ci, c in enumerate(r):
            x = PAD + ci * (CW + GAP)
            # 높이 맞추기 + 그림자
            full = Image.new("RGBA", (CW, rh), (0, 0, 0, 0))
            m = Image.new("L", (CW, rh), 0)
            ImageDraw.Draw(m).rounded_rectangle((0, 0, CW - 1, rh - 1), R, fill=255)
            white = Image.new("RGBA", (CW, rh), (255, 255, 255, 255))
            full.paste(white, (0, 0), m)
            full.alpha_composite(c, (0, 0))
            sh = Image.new("RGBA", (CW + 80, rh + 80), (0, 0, 0, 0))
            ImageDraw.Draw(sh).rounded_rectangle((40, 48, 40 + CW, 48 + rh), R, fill=(0, 0, 0, 30))
            sh = sh.filter(ImageFilter.GaussianBlur(12))
            canvas.paste(sh, (x - 40, y - 40), sh)
            canvas.paste(full, (x, y), full)
        y += rh + GAP
    return canvas

def pic_path(i):
    for ext in ("png", "webp", "jpg"):
        p = ROOT / "img" / f"{i}.{ext}"
        if p.exists():
            return p
    return None

def message(rows, n):
    ws = day_words(rows, n)
    out = [f"📚 <b>JLPT N5 오늘의 단어</b>", f"DAY {n} / {DAYS} · {day_title(ws)} · {PER_DAY}단어", ""]
    for k, w in enumerate(ws, (n - 1) * PER_DAY + 1):
        head = f"<b>{k}. {w['word']}</b>"
        if w["reading"]:
            head += f" ({w['reading']})"
        out.append(f"{head} — {w['ko']}")
        for i, (jp, ko) in enumerate(w["ex"]):
            out.append(f"{'①②'[i]} {inline_ruby(jp)}")
            out.append(f"→ {ko}")
        out.append("")
    if n < DAYS:
        nxt = " · ".join(w["word"] for w in day_words(rows, n + 1))
        out.append(f"📌 내일(DAY {n + 1}): {nxt}")
    else:
        out.append("🎉 JLPT N5 핵심 단어 200개를 모두 마쳤습니다! 수고하셨습니다.")
    caps = []
    for part in (1, 2):
        part_ws = ws[(part - 1) * 4: part * 4]
        caps.append(f"🇯🇵 <b>JLPT N5 · DAY {n}</b> ({part}/2)\n" + " · ".join(w["word"] for w in part_ws))
    return {"day": n, "caption1": caps[0], "caption2": caps[1], "text": "\n".join(out)}

def main():
    rows = load_words()
    cmd = sys.argv[1] if len(sys.argv) > 1 else "render"
    if cmd == "prompts":
        for r in rows:
            print(f"{r['id']}\t{'OK' if pic_path(r['id']) else 'MISSING'}\t{STYLE.format(scene=r['scene'])}")
        return
    days = [int(a) for a in sys.argv[2:]] or range(1, DAYS + 1)
    (ROOT / "collages").mkdir(exist_ok=True)
    (ROOT / "messages").mkdir(exist_ok=True)
    for n in days:
        ws = day_words(rows, n)
        missing = [w["id"] for w in ws if not pic_path(w["id"])]
        if missing:
            print(f"DAY {n}: skip, missing images {missing}")
            continue
        title = day_title(ws)
        for part in (1, 2):
            img = collage(ws[(part - 1) * 4: part * 4], n, part, title)
            img.save(ROOT / "collages" / f"day{n:02d}-{part}.png", optimize=True)
        msg = message(rows, n)
        (ROOT / "messages" / f"day{n:02d}.json").write_text(json.dumps(msg, ensure_ascii=False, indent=1), encoding="utf-8")
        print(f"DAY {n}: ok ({title}), text {len(msg['text'])} chars")

if __name__ == "__main__":
    main()
