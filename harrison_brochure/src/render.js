const { chromium } = require('playwright');
const lang = process.argv[2]; const pdf = process.argv[3]==='pdf';
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport:{width:794,height:1123}, deviceScaleFactor: 1.6 });
  await p.goto('file:///home/user/Claude-/harrison_brochure/Harrison_Brochure_'+lang.toUpperCase()+'.html');
  await p.waitForTimeout(800);
  // overflow check
  const ov = await p.evaluate(() => [...document.querySelectorAll('.page')].map((pg,i)=>{ const inner=pg.querySelector('.inner'); const foot=pg.querySelector('.foot'); if(!inner) return i+1+':cover'; const kids=[...inner.children]; const last=kids[kids.length-1].getBoundingClientRect().bottom; const ft=foot.getBoundingClientRect().top; return (i+1)+': lastBottom='+Math.round(last)+' footTop='+Math.round(ft)+(last>ft?' OVERFLOW':''); }));
  console.log(ov.join('\n'));
  const pages = await p.$$('.page');
  for (let i=0;i<pages.length;i++) await pages[i].screenshot({ path: `prev_${lang}_${i+1}.png` });
  if (pdf) await p.pdf({ path: '/home/user/Claude-/harrison_brochure/Harrison_Brochure_'+lang.toUpperCase()+'.pdf', preferCSSPageSize: true, printBackground: true });
  await b.close();
})();
