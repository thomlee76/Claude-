// Использование: node run.js <script.js> <имя1> [имя2 ...]
// Выполняет figma-lib.js + script.js в браузере с локальной реализацией Figma API
// и сохраняет рамки, для которых вызван frame.screenshot(), в book/img/fig-<имя>.png (по порядку вызовов).
const { chromium } = require('playwright');
const fs = require('fs'); const path = require('path');
(async () => {
  const [script, ...names] = process.argv.slice(2);
  const dir = __dirname, img = path.resolve(dir, '../../img');
  const lib = fs.readFileSync(path.resolve(dir, '../figma-lib.js'), 'utf8');
  const body = fs.readFileSync(path.resolve(script), 'utf8');
  const usesLib = /const\s+H\s*=\s*h\s*=>/.test(body);
  const code = (usesLib ? '' : lib + '\n') + body;
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 2600, height: 1700 }, deviceScaleFactor: 1.5 });
  await p.setContent('<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;background:#fff}#canvas{position:relative;width:2600px;height:1700px}</style></head><body><div id="canvas"></div></body></html>');
  await p.addScriptTag({ content: fs.readFileSync(path.join(dir, 'shim.js'), 'utf8') });
  await p.evaluate(() => document.fonts.load('16px Inter'));
  const res = await p.evaluate(async (src) => {
    try { const fn = new (Object.getPrototypeOf(async function(){}).constructor)(src); const r = await fn(); return { ok: true, r, shots: window.__shots }; }
    catch (e) { return { ok: false, err: String(e && e.stack || e), shots: window.__shots }; }
  }, code);
  if (!res.ok) { console.error('ERROR', res.err); }
  console.log('return:', JSON.stringify(res.r || null).slice(0, 300), 'shots:', res.shots.length);
  for (let i = 0; i < res.shots.length; i++) {
    const id = res.shots[i]; const name = names[i] || ('shot-' + i);
    const el = await p.$(`[data-shot="${id}"]`);
    const out = name.includes('/') ? name : path.join(img, 'fig-' + name + '.png');
    await el.screenshot({ path: out });
    console.log('saved', out);
  }
  await b.close();
})();
