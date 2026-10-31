const { chromium } = require('playwright'); const fs=require('fs');
(async()=>{const DATA=JSON.parse(fs.readFileSync(__dirname+'/video-data.json','utf8'));const id=process.argv[2],out=process.argv[3];
const b=await chromium.launch();const p=await b.newPage({viewport:{width:720,height:900}});
await p.goto('http://localhost:8765/guide/src-video/video.html',{waitUntil:'networkidle'});await p.evaluate(()=>Promise.all(['800 52px Unbounded','700 38px Unbounded','700 17px "Golos Text"','500 31px "Golos Text"','600 24px "Golos Text"','500 25px "JetBrains Mono"'].map(f=>document.fonts.load(f,'АБВabc01'))));
const T=await p.evaluate(d=>window.init(d),DATA[id]);
const marks=await p.evaluate(()=>{const s=new Set();document.querySelectorAll('.el').forEach(e=>s.add(+e.dataset.out));return [...s].sort((a,b)=>a-b)});
const ts=marks.map(m=>m-0.6);let i=0;for(const t of ts){await p.evaluate(t=>window.render(t),t);await p.screenshot({path:out+'/pv-'+(i++)+'.png'});}
const ov=await p.evaluate(()=>{let m=0;document.querySelectorAll('.el').forEach(e=>{m=Math.max(m,e.offsetTop+e.offsetHeight)});return m});
console.log(id,'T=',T.toFixed(1),'scenes',ts.length,'maxBottom',ov);await b.close();})();
