// node render2.js [ids...] — рендер видеоуроков (3–4 мин) с озвучкой: scripts/<id>.json + build/<id>/{timeline.json,voice.wav} → ../video/<id>.mp4 + .jpg
const { chromium } = require('playwright'); const fs=require('fs'); const path=require('path'); const { spawn }=require('child_process');
const R=__dirname, OUT=path.join(R,'..','video'), FPS=+(process.env.FPS||24);
const CH=Object.fromEntries(JSON.parse(fs.readFileSync(path.join(R,'..','data.json'),'utf8')).chapters.map(c=>[c.id,c]));
const ids=process.argv.slice(2).length?process.argv.slice(2):fs.readdirSync(path.join(R,'build')).sort();
const FROM=+(process.env.FROM||0), TO=process.env.TO?+process.env.TO:null, TMP=process.env.OUTFILE;
async function one(b,id){const p=await b.newPage({viewport:{width:720,height:900},deviceScaleFactor:1});
  await p.goto('http://localhost:8765/guide/src-video/lesson.html',{waitUntil:'networkidle'});
  await p.evaluate(()=>Promise.all(['800 48px Unbounded','700 36px Unbounded','700 16px "Golos Text"','500 28px "Golos Text"','600 22px "Golos Text"','500 21px "JetBrains Mono"'].map(f=>document.fonts.load(f,'АБВabc01'))));
  const c=CH[id];const data={meta:{id,num:c.num,part:c.part,title:c.title,meta:(c.meta||[])[0]||''},scenes:JSON.parse(fs.readFileSync(path.join(R,'scripts',id+'.json'),'utf8')).scenes,
    tl:JSON.parse(fs.readFileSync(path.join(R,'build',id,'timeline.json'),'utf8'))};
  const T=await p.evaluate(d=>window.init(d),data);const end=TO||T;const N=Math.ceil((end-FROM)*FPS);
  const file=TMP||path.join(OUT,id+'.mp4');
  const ff=spawn('ffmpeg',['-loglevel','error','-y','-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-','-ss',String(FROM),'-t',String(end-FROM),'-i',path.join(R,'build',id,'voice.wav'),
    '-map','0:v','-map','1:a','-c:v','libx264','-preset','medium','-crf','28','-pix_fmt','yuv420p','-c:a','aac','-b:a','64k','-ac','1','-shortest','-movflags','+faststart',file]);
  const done=new Promise(r=>ff.on('close',r));
  let lastKey=null,lastBuf=null,shots=0;for(let i=0;i<N;i++){const t=FROM+i/FPS;const key=await p.evaluate(t=>window.render(t),t);let buf=key===lastKey?lastBuf:null;if(!buf){buf=await p.screenshot({type:'jpeg',quality:86});shots++;}lastKey=key;lastBuf=buf;if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));
    if(!TMP&&Math.abs(t-2.0)<.5/FPS)fs.writeFileSync(path.join(OUT,id+'.jpg'),await p.screenshot({type:'jpeg',quality:80}));}
  ff.stdin.end();await done;await p.close();console.log(id,T.toFixed(1)+'s',N,'frames',shots,'shots');}
(async()=>{const b=await chromium.launch();const q=[...ids];const W=Math.min(+(process.env.W||4),q.length);
  await Promise.all(Array.from({length:W},async()=>{while(q.length)await one(b,q.shift());}));await b.close();})();
