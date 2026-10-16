const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1150,height:820},deviceScaleFactor:1});
await p.goto('file://'+__dirname+'/icons.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
await p.screenshot({path:process.argv[2],fullPage:true});
for(let i=1;i<=6;i++){const e=await p.$('#i'+i);await e.evaluate(el=>{el.style.borderRadius='0';el.style.boxShadow='none'});}
for(let i=1;i<=6;i++){const e=await p.$('#i'+i); await e.screenshot({path:__dirname+'/opt'+i+'.png'});}
await b.close();})();
