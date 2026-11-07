"""Build chapter videos: Supertonic Korean TTS + Playwright-rendered slides + ffmpeg.

Usage: python3 build_video.py ch1 [ch2 ...]
Outputs (in ../video/): chN.mp4, chN.vtt, chN.jpg (poster), chN.json (chapter marks)
TTS cache: $TTS_CACHE (default /tmp/claude-guide-tts)
"""
import hashlib, json, os, subprocess, sys
import numpy as np, soundfile as sf

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'video')
CACHE = os.environ.get('TTS_CACHE', '/tmp/claude-guide-tts')
VOICE, SPEED, SR = 'F3', 1.0, 44100
GAP_SENT, LEAD, TAIL = 0.45, 0.5, 1.1
os.makedirs(CACHE, exist_ok=True)
_tts = None


def tts():
    global _tts
    if _tts is None:
        from supertonic import TTS
        _tts = TTS()
    return _tts


def sentence_wav(text):
    key = hashlib.sha1(f'{VOICE}|{SPEED}|{text}'.encode()).hexdigest()[:16]
    fn = os.path.join(CACHE, key + '.wav')
    if not os.path.exists(fn):
        t = tts()
        wav, _ = t.synthesize(text, voice_style=t.get_voice_style(VOICE), lang='ko', speed=SPEED)
        sf.write(fn, np.asarray(wav, dtype=np.float32).reshape(-1), SR)
    a, sr = sf.read(fn, dtype='float32')
    assert sr == SR
    return a


def split_cue(a, b, text, limit=32):
    """Split a long sentence into subtitle chunks (≤ limit chars), timed by character share."""
    if len(text) <= limit:
        return [(a, b, text)]
    words, chunks, cur = text.split(' '), [], ''
    for w in words:
        cand = (cur + ' ' + w).strip()
        if len(cand) > limit and cur:
            chunks.append(cur); cur = w
        else:
            cur = cand
            if cur.endswith(',') and len(cur) >= limit * 0.55:
                chunks.append(cur); cur = ''
    if cur:
        chunks.append(cur)
    total = sum(len(c) for c in chunks)
    out, t = [], a
    for c in chunks:
        d = (b - a) * len(c) / total
        out.append((t, t + d, c)); t += d
    return out


def write_vtt(path, cues):
    with open(path, 'w', encoding='utf-8') as f:
        f.write('WEBVTT\n\n')
        n = 0
        for a, b, txt in cues:
            for ca, cb, ct in split_cue(a, b, txt):
                n += 1
                f.write(f'{n}\n{vtt_time(ca)} --> {vtt_time(cb)}\n{ct}\n\n')


def read_vtt(path):
    cues, lines = [], open(path, encoding='utf-8').read().split('\n\n')
    for blk in lines[1:]:
        p = blk.strip().split('\n')
        if len(p) >= 3 and '-->' in p[1]:
            ts = [x.strip() for x in p[1].split('-->')]
            sec = lambda s: sum(float(x) * m for x, m in zip(s.split(':'), (3600, 60, 1)))
            cues.append((sec(ts[0]), sec(ts[1]), '\n'.join(p[2:])))
    return cues


def vtt_time(s):
    h, m = divmod(s, 3600)
    m, s = divmod(m, 60)
    return f'{int(h):02d}:{int(m):02d}:{s:06.3f}'


def build(cid):
    data = json.load(open(os.path.join(HERE, 'scripts', cid + '.json'), encoding='utf-8'))
    slides = data['slides']
    work = os.path.join(CACHE, 'work-' + cid)
    os.makedirs(work, exist_ok=True)
    silence = lambda sec: np.zeros(int(sec * SR), dtype=np.float32)
    audio, cues, marks, durs, t = [], [], [], [], 0.0
    for si, s in enumerate(slides):
        start = t
        audio.append(silence(LEAD)); t += LEAD
        for k, sent in enumerate(s['n']):
            a = sentence_wav(sent)
            cues.append((t, t + len(a) / SR, sent))
            audio.append(a); t += len(a) / SR
            if k < len(s['n']) - 1:
                audio.append(silence(GAP_SENT)); t += GAP_SENT
        audio.append(silence(TAIL)); t += TAIL
        durs.append(t - start)
        marks.append({'t': round(start, 2), 'title': s['t']})
        print(f'  slide {si:2d} {t - start:5.1f}s  {s["t"]}', flush=True)
    full = np.concatenate(audio)
    peak = float(np.max(np.abs(full))) or 1.0
    full = full * (0.89 / peak)
    wav_path = os.path.join(work, 'narration.wav')
    sf.write(wav_path, full, SR)
    total = len(full) / SR
    print(f'{cid}: {len(slides)} slides, {total / 60:.2f} min', flush=True)

    # render slides
    subprocess.run(['node', os.path.join(HERE, 'render_slides.js'), os.path.join(HERE, 'scripts', cid + '.json'), work], check=True)

    # concat list (durations per slide image)
    lst = os.path.join(work, 'list.txt')
    with open(lst, 'w') as f:
        for i, d in enumerate(durs):
            f.write(f"file 's{i:02d}.png'\nduration {d:.3f}\n")
        f.write(f"file 's{len(durs) - 1:02d}.png'\n")
    mp4 = os.path.join(OUT, cid + '.mp4')
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', lst, '-i', wav_path,
                    '-vf', 'fps=10,format=yuv420p', '-c:v', 'libx264', '-preset', 'slow', '-tune', 'stillimage',
                    '-crf', '24', '-g', '100', '-c:a', 'aac', '-b:a', '64k', '-ac', '1', '-ar', '44100',
                    '-shortest', '-movflags', '+faststart', mp4], check=True)
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', os.path.join(work, 's00.png'), '-vf', 'scale=960:-1',
                    '-q:v', '4', os.path.join(OUT, cid + '.jpg')], check=True)
    write_vtt(os.path.join(OUT, cid + '.vtt'), cues)
    json.dump({'id': cid, 'title': data['title'], 'duration': round(total, 1), 'marks': marks},
              open(os.path.join(OUT, cid + '.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'  -> {mp4} {os.path.getsize(mp4) / 1e6:.1f} MB', flush=True)


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    for c in sys.argv[1:]:
        build(c)
