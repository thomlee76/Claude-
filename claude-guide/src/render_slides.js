// Render every slide of a chapter script to PNG (1920x1080) with Playwright.
// Usage: node render_slides.js script.json outDir
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const [scriptPath, outDir] = process.argv.slice(2);
  const data = JSON.parse(fs.readFileSync(scriptPath, 'utf8'));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1.5 });
  await page.goto('file://' + path.join(__dirname, 'slide.html'));
  const n = data.slides.length;
  for (let i = 0; i < n; i++) {
    await page.evaluate(([s, i, n, t]) => render(s, i, n, t), [data.slides[i], i, n, data.title]);
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.evaluate(() => {
      const b = document.querySelector('.body');
      return b ? b.scrollHeight > b.clientHeight + 2 : false;
    });
    if (overflow) console.warn(`  ! slide ${i} overflows: ${data.slides[i].t}`);
    await page.screenshot({ path: path.join(outDir, `s${String(i).padStart(2, '0')}.png`) });
  }
  await browser.close();
})();
