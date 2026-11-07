// Generate app icons (512, 192, apple-touch 180) with Playwright.
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const out = process.argv[2];
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 512, height: 512 } });
  await page.setContent(`<html><body style="margin:0">
    <div style="width:512px;height:512px;background:#DC4A1E;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Noto Sans CJK KR',sans-serif;color:#fff">
      <div style="font-size:250px;line-height:1;margin-top:-20px">✳</div>
      <div style="font-size:64px;font-weight:800;letter-spacing:-2px;margin-top:6px">가이드</div>
    </div></body></html>`);
  await page.screenshot({ path: path.join(out, 'icon-512.png') });
  for (const [s, name] of [[192, 'icon-192.png'], [180, 'apple-touch-icon.png']]) {
    const p2 = await browser.newPage({ viewport: { width: s, height: s } });
    await p2.setContent(`<img src="data:image/png;base64,${require('fs').readFileSync(path.join(out, 'icon-512.png')).toString('base64')}" style="width:${s}px;height:${s}px;display:block">`);
    await p2.screenshot({ path: path.join(out, name) });
  }
  await browser.close();
})();
