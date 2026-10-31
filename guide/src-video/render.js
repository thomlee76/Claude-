// node render.js [ids...]  — рендер видеоуроков в ../video/<id>.mp4 и постеров <id>.jpg
const { chromium } = require('playwright'); const fs=require('fs'); const path=require('path'); const { spawn }=require('child_process');
const DATA=JSON.parse(fs.readFileSync(path.join(__dirname,'video-data.json'),'utf8'));
const OUT=path.join(__dirname,'..','video'); const FPS=24;
const ids=process.argv.slice(2).length?process.argv.slice(2):Object.keys(DATA);
async function one(b,id){const p=await b.newPage({viewport:{width:720,height:900},deviceScaleFactor:1});
  await p.goto('http://localhost:8765/guide/src-video/video.html',{waitUntil:'networkidle'});await p.evaluate(()=>Promise.all(['800 52px Unbounded','700 38px Unbounded','700 17px "Golos Text"','500 31px "Golos Text"','600 24px "Golos Text"','500 25px "JetBrains Mono"'].map(f=>document.fonts.load(f,'АБВabc01'))));
  const T=await p.evaluate(d=>window.init(d),DATA[id]);const N=Math.ceil(T*FPS);
  const ff=spawn('ffmpeg',['-loglevel','error','-y','-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','27','-pix_fmt','yuv420p','-movflags','+faststart',path.join(OUT,id+'.mp4')]);
  const done=new Promise(r=>ff.on('close',r));
  for(let i=0;i<N;i++){await p.evaluate(t=>window.render(t),i/FPS);const buf=await p.screenshot({type:'jpeg',quality:88});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));
    if(Math.abs(i/FPS-2.2)<.5/FPS)fs.writeFileSync(path.join(OUT,id+'.jpg'),await p.screenshot({type:'jpeg',quality:80}));}
  ff.stdin.end();await done;await p.close();console.log(id,T.toFixed(1)+'s',N,'frames');}
(async()=>{const b=await chromium.launch();const q=[...ids];const W=Math.min(4,q.length);
  await Promise.all(Array.from({length:W},async()=>{while(q.length)await one(b,q.shift());}));await b.close();})();
