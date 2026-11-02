const { chromium } = require('playwright'); const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1160,height:330}});
let h='<link rel="stylesheet" href="http://localhost:8765/vocab/fonts/fonts.css"><body style="margin:0;background:#E9EBF0;display:flex;gap:24px;padding:20px;font:600 16px -apple-system,sans-serif">';
const R=(process.argv[3]||'1-4').split('-').map(Number);for(let i=R[0];i<=R[1];i++){const s=fs.readFileSync(__dirname+'/opt'+i+'.svg','utf8').replace('<svg ','<svg width="250" height="250" ');h+='<div style="text-align:center"><div style="width:250px;height:250px;border-radius:56px;overflow:hidden;box-shadow:0 8px 20px rgba(0,0,0,.25)">'+s+'</div><div style="margin-top:12px">'+(i-R[0]+1)+'</div></div>';}
await p.setContent(h);await p.evaluate(()=>document.fonts.load('700 80px Oswald'));await p.waitForTimeout(600);await p.screenshot({path:process.argv[2]});await b.close();})();
