# 클로드 실습 가이드 — 빌드 방법

| 파일 | 역할 |
|---|---|
| `../content/ch1.js` ~ `ch4.js` | 레슨 본문·프롬프트·퀴즈 데이터 |
| `scripts/ch1.json` ~ `ch4.json` | 장별 영상 슬라이드와 내레이션 대본(문장 단위) |
| `slide.html`, `render_slides.js` | 슬라이드 디자인과 PNG 렌더링(Playwright, 1920×1080) |
| `build_video.py` | Supertonic 3 한국어 TTS(F3 음성) → 슬라이드 이미지와 합성(ffmpeg) → `../video/chN.mp4`, 자막 `.vtt`, 목차 `.json`, 포스터 `.jpg` |
| `template.html`, `base.css`, `app.js` | 앱 화면(목차, 탭, 검색, 퀴즈, 진도, 영상 플레이어, 오프라인 저장) |
| `sw-template.js` | 서비스 워커: 앱 셸 사전 캐시, 저장한 영상은 Range 요청(206)으로 재생 |
| `build.py` | `../index.html`, `../sw.js`, `../manifest.webmanifest`, 아이콘 생성 |

```bash
pip install supertonic soundfile    # 모델은 첫 실행 때 Hugging Face에서 받음
python3 build_video.py ch1 ch2 ch3 ch4
python3 build.py
```

내용을 고친 뒤에는 `build.py`만 다시 실행하면 됩니다. 대본을 고쳤다면 해당 장만 `build_video.py chN`으로 다시 만듭니다(문장별 음성은 캐시되어 바뀐 문장만 새로 합성).
