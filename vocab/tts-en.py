#!/usr/bin/env python3
"""Озвучка слов и примеров: audio/<id>-w.m4a и audio/<id>-e.m4a (Piper, британский голос). VOICE — путь к .onnx."""
import json, os, subprocess, sys, wave, tempfile
from pathlib import Path
import numpy as np
from piper import PiperVoice
from piper.config import SynthesisConfig
R = Path(__file__).resolve().parent; OUT = R / 'audio'; OUT.mkdir(exist_ok=True)
v = PiperVoice.load(os.environ['VOICE']); sr = v.config.sample_rate
def syn(t, ls): return np.concatenate([c.audio_int16_array for c in v.synthesize(t, syn_config=SynthesisConfig(length_scale=ls, noise_scale=.55, noise_w_scale=.7))])
only = set(sys.argv[1:])
for f in sorted((R / 'words').glob('t*.json')):
    for c in json.load(open(f, encoding='utf-8')):
        if only and c['id'] not in only: continue
        for kind, text, ls in (('w', c['w'] + '.', 1.12), ('e', c['ex'], 1.04)):
            dst = OUT / f"{c['id']}-{kind}.m4a"
            if dst.exists() and not only: continue
            pcm = np.concatenate([np.zeros(int(.08 * sr), np.int16), syn(text, ls), np.zeros(int(.15 * sr), np.int16)])
            with tempfile.NamedTemporaryFile(suffix='.wav') as tmp:
                with wave.open(tmp.name, 'wb') as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(pcm.tobytes())
                subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', tmp.name, '-ac', '1', '-ar', '22050', '-c:a', 'aac', '-b:a', '40k', '-movflags', '+faststart', str(dst)], check=True)
    print(f.stem, flush=True)
