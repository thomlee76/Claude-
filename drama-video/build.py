# -*- coding: utf-8 -*-
"""Narrate (edge-tts) + encode episode videos from render.py output.
usage: python3 drama-video/build.py 01 02 ...  -> docs/english-drama/video/epNN.mp4
"""
import asyncio, hashlib, json, subprocess, sys, wave
from pathlib import Path
import edge_tts

ROOT = Path(__file__).resolve().parent
REPO = ROOT.parent
WORK = ROOT / "work"; AUD = WORK / "audio"; SCN = WORK / "scenes"
OUTV = REPO / "docs/english-drama/video"
for d in (AUD, SCN, OUTV): d.mkdir(parents=True, exist_ok=True)
SR = 24000

def run(*a): subprocess.run(a, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
def key(s): return hashlib.sha1(f"{s['v']}|{s['r']}|{s['t']}".encode()).hexdigest()[:16]

async def tts(seg, sem):
    wav = AUD / f"{key(seg)}.wav"
    if wav.exists() and wav.stat().st_size > 1000: return
    mp3 = wav.with_suffix(".mp3")
    async with sem:
        for i in range(7):
            try:
                await edge_tts.Communicate(seg["t"], seg["v"], rate=seg["r"]).save(str(mp3))
                if mp3.stat().st_size > 500: break
            except Exception as e:
                print("retry", i, seg["v"], repr(e)[:120], flush=True)
            await asyncio.sleep(2 + 3 * i)
        else:
            raise RuntimeError(f"TTS failed: {seg}")
    run("ffmpeg", "-nostdin", "-y", "-i", str(mp3), "-ac", "1", "-ar", str(SR), "-sample_fmt", "s16", str(wav))

def pcm(path):
    with wave.open(str(path)) as w: return w.readframes(w.getnframes())
def silence(sec): return b"\x00\x00" * int(SR * sec)

def build_ep(m):
    ep = m["ep"]; parts = []; prev = None; total = 0.0
    for i, sc in enumerate(m["scenes"]):
        data = silence(0.3)
        for s in sc["segs"]: data += pcm(AUD / f"{key(s)}.wav") + silence(s["p"])
        wav = SCN / f"ep{ep}_{i+1:03d}.wav"
        with wave.open(str(wav), "wb") as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(data)
        dur = len(data) / 2 / SR; total += dur
        fade = "fade=t=in:st=0:d=0.3," if sc.get("sec") != prev else ""
        prev = sc.get("sec")
        mp4 = SCN / f"ep{ep}_{i+1:03d}.mp4"
        run("ffmpeg", "-nostdin", "-y", "-loop", "1", "-framerate", "30", "-i", str(WORK / "frames" / sc["img"]), "-i", str(wav),
            "-t", f"{dur:.3f}", "-vf", f"{fade}format=yuv420p", "-r", "30", "-c:v", "libx264", "-tune", "stillimage", "-preset", "veryfast", "-crf", "23",
            "-c:a", "aac", "-b:a", "128k", "-ar", "44100", "-ac", "2", "-shortest", str(mp4))
        parts.append(mp4)
    lst = SCN / f"ep{ep}.txt"; lst.write_text("".join(f"file '{p}'\n" for p in parts))
    out = OUTV / f"ep{ep}.mp4"
    run("ffmpeg", "-nostdin", "-y", "-f", "concat", "-safe", "0", "-i", str(lst), "-c", "copy", "-movflags", "+faststart", str(out))
    print(f"ep{ep}: {len(parts)} scenes, {total/60:.2f} min, {out.stat().st_size/1e6:.1f} MB", flush=True)

async def main(nos):
    mans = [json.load(open(p, encoding="utf-8")) for p in sorted(WORK.glob("manifest_ep*.json"))]
    if nos: mans = [m for m in mans if m["ep"] in nos]
    sem = asyncio.Semaphore(5)
    segs = {key(s): s for m in mans for sc in m["scenes"] for s in sc["segs"]}
    print(len(segs), "unique narration clips", flush=True)
    await asyncio.gather(*(tts(s, sem) for s in segs.values()))
    for m in mans: build_ep(m)

if __name__ == "__main__":
    asyncio.run(main(sys.argv[1:]))
