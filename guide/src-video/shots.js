// node shots.js id t1 t2 ... — PNG-кадры для проверки вёрстки → $SHOTS/<id>-<t>.png
const { chromium } = require('playwright'); const fs=require('fs'); const path=require('path');const R=__dirname;
const [id,...ts]=process.argv.slice(2);const CH=Object.fromEntries(JSON.parse(fs.readFileSync(path.join(R,'..','data.json'),'utf8')).chapters.map(c=>[c.id,c]));
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:720,height:900}});
  await p.goto('http://localhost:8765/guide/src-video/lesson.html',{waitUntil:'networkidle'});
  await p.evaluate(()=>Promise.all(['800 48px Unbounded','700 36px Unbounded','700 16px "Golos Text"','500 28px "Golos Text"','600 22px "Golos Text"','500 21px "JetBrains Mono"'].map(f=>document.fonts.load(f,'АБВabc01'))));
  const c=CH[id];const tl=JSON.parse(fs.readFileSync(path.join(R,'build',id,'timeline.json'),'utf8'));
  await p.evaluate(d=>window.init(d),{meta:{id,num:c.num,part:c.part,title:c.title,meta:(c.meta||[])[0]||''},scenes:JSON.parse(fs.readFileSync(path.join(R,'scripts',id+'.json'),'utf8')).scenes,tl});
  const times=ts.length?ts.map(Number):tl.scenes.map(s=>+(s.end-1.2).toFixed(1)).concat([tl.total-.5]);
  for(const t of times){await p.evaluate(t=>window.render(t),t);await p.screenshot({path:path.join(process.env.SHOTS||'.',id+'-'+t+'.png')});}
  console.log(times.join(' '));await b.close();})();
