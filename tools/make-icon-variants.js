// Рендерит варианты ярлыка из tools/icons/variants.html в PNG 1024×1024 (папка — первый аргумент),
// затем tools/resize-icons.py режет их в docs/icons/alt/<id>-{180,192,512}.png.
// Нужен локальный сервер из корня репозитория (шрифты и исходник с одного адреса):
//   python3 -m http.server 8733
// Пример: node tools/make-icon-variants.js /tmp/icons && python3 tools/resize-icons.py /tmp/icons
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const OUT = process.argv[2];
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 512, height: 512 * 6 }, deviceScaleFactor: 2 });
  await p.goto('http://localhost:8733/tools/icons/variants.html');
  await p.evaluate(() => Promise.all([
    '700 50px "Bricolage Grotesque"', '500 50px "Bricolage Grotesque"', '700 50px "Golos Text"',
    '600 50px Literata', '700 50px "Noto Sans KR"', '900 50px "Noto Sans KR"'
  ].map(f => document.fonts.load(f, 'Verb 100+ have go out 동사구'))));
  await p.waitForTimeout(800);
  for (const el of await p.$$('.ic')) {
    const id = await el.getAttribute('id');
    await el.screenshot({ path: path.join(OUT, id + '.png') });
    console.log(id);
  }
  await b.close();
})();
