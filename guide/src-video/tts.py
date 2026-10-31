#!/usr/bin/env python3
"""Озвучка сценария: python3 tts.py ch-01 [ch-02 ...]
Читает scripts/<id>.json, синтезирует каждую фразу голосом Piper, пишет build/<id>/voice.wav и build/<id>/timeline.json
(начало/конец каждой сцены, момент начала каждого фрагмента say, субтитры по фразам).
Голос: переменная VOICE (путь к .onnx), по умолчанию ru_RU-denis-medium в папке VOICES."""
import json, os, re, sys, wave
from pathlib import Path
import numpy as np
from piper import PiperVoice
from piper.config import SynthesisConfig

R = Path(__file__).resolve().parent
VOICE = os.environ.get('VOICE') or str(Path(os.environ.get('VOICES', '.')) / 'ru_RU-denis-medium.onnx')
LEAD, SENT_GAP, SEG_GAP, TAIL, FINALE = 0.6, 0.28, 0.55, 1.0, 4.0

def sentences(s):
    parts = re.split(r'(?<=[.!?…])\s+', s.strip())
    return [p for p in parts if p]

def main(ids):
    v = PiperVoice.load(VOICE)
    sr = v.config.sample_rate
    cfg = SynthesisConfig(length_scale=float(os.environ.get('RATE', '1.0')), noise_scale=0.6, noise_w_scale=0.75)
    for id_ in ids:
        sc = json.loads((R / 'scripts' / f'{id_}.json').read_text(encoding='utf-8'))
        out = R / 'build' / id_; out.mkdir(parents=True, exist_ok=True)
        audio, t = [], 0.0
        def sil(d):
            nonlocal t
            audio.append(np.zeros(int(d * sr), dtype=np.int16)); t += d
        tl = []
        for s in sc['scenes']:
            st = t; marks, subs = [], []
            sil(LEAD)
            for k, seg in enumerate(s['say']):
                if k: sil(SEG_GAP)
                marks.append(round(t, 3))
                for j, sen in enumerate(sentences(seg)):
                    if j: sil(SENT_GAP)
                    pcm = np.concatenate([c.audio_int16_array for c in v.synthesize(sen, syn_config=cfg)])
                    d = len(pcm) / sr
                    subs.append({'a': round(t, 3), 'b': round(t + d, 3), 'text': sen})
                    audio.append(pcm); t += d
            sil(TAIL)
            tl.append({'start': round(st, 3), 'end': round(t, 3), 'marks': marks, 'subs': subs})
        fin = t; sil(FINALE)
        with wave.open(str(out / 'voice.wav'), 'wb') as w:
            w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(np.concatenate(audio).tobytes())
        (out / 'timeline.json').write_text(json.dumps({'total': round(t, 3), 'finale': round(fin, 3), 'scenes': tl}, ensure_ascii=False), encoding='utf-8')
        print(id_, f'{t:.1f}s', flush=True)

if __name__ == '__main__':
    main(sys.argv[1:])
