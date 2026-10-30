const { chromium } = require('playwright');
const pdf = process.argv[2]==='pdf';
const dir = '/home/user/Claude-/human_brochure/';
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport:{width:794,height:1123}, deviceScaleFactor: 1.6 });
  await p.goto('file://'+dir+'Human_Medical_Imaging_Brochure_RU.html', {waitUntil:'networkidle'}); await p.evaluate(()=>document.fonts.ready);
  await p.waitForTimeout(800);
  const ov = await p.evaluate(() => [...document.querySelectorAll('.page')].map((pg,i)=>{ const inner=pg.querySelector('.content'); const foot=pg.querySelector('.foot')||pg.querySelector('.pae')||pg.querySelector('.slogan'); if(!inner) return (i+1)+':cover'; const kids=[...inner.children]; const last=Math.max(...kids.map(k=>k.getBoundingClientRect().bottom)); const ft=foot.getBoundingClientRect().top; return (i+1)+': last='+Math.round(last)+' foot='+Math.round(ft)+(last>ft-4?' OVERFLOW':''); }));
  console.log(ov.join('\n'));
  const pages = await p.$$('.page');
  for (let i=0;i<pages.length;i++) await pages[i].screenshot({ path: `/tmp/claude-0/-home-user-Claude-/6f5bc795-fb90-55f8-8e54-edbb7ae85710/scratchpad/hm_${i+1}.png` });
  if (pdf) await p.pdf({ path: dir+'Human_Medical_Imaging_Brochure_RU.pdf', preferCSSPageSize: true, printBackground: true });
  await b.close();
})();
