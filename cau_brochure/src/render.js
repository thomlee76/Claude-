const { chromium } = require('playwright');
const pdf = process.argv[2]==='pdf';
const dir = '/home/user/Claude-/cau_brochure/';
const S = '/tmp/claude-0/-home-user-Claude-/6f5bc795-fb90-55f8-8e54-edbb7ae85710/scratchpad/';
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport:{width:794,height:1123}, deviceScaleFactor: 1.6 });
  await p.goto('file://'+dir+'CAU_Health_Checkup_Brochure_RU.html', {waitUntil:'networkidle'}); await p.evaluate(()=>document.fonts.ready);
  const ov = await p.evaluate(() => [...document.querySelectorAll('.page')].map((pg,i)=>{ const inner=pg.querySelector('.in')||pg.querySelector('.in2'); const foot=pg.querySelector('.ft'); if(!inner||!foot) return (i+1)+':cover'; const last=Math.max(...[...inner.children].map(k=>k.getBoundingClientRect().bottom)); const ft=foot.getBoundingClientRect().top; return (i+1)+': last='+Math.round(last)+' foot='+Math.round(ft)+(last>ft-3?' OVERFLOW':'')+' gap='+Math.round(ft-last); }));
  console.log(ov.join('\n'));
  console.log('Manrope', await p.evaluate(()=>document.fonts.check('800 20px Manrope')));
  const pages = await p.$$('.page');
  for (let i=0;i<pages.length;i++) await pages[i].screenshot({ path: S+`cau_${i+1}.png` });
  if (pdf) await p.pdf({ path: dir+'CAU_Health_Checkup_Brochure_RU.pdf', preferCSSPageSize: true, printBackground: true });
  await b.close();
})();
