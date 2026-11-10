const { chromium } = require('playwright'); const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1600,height:600}});
const cells=['A','B','C'].map(n=>`<div style="text-align:center;font:600 28px sans-serif;color:#333"><div style="width:420px;height:420px;border-radius:92px;overflow:hidden;margin:0 auto 16px;box-shadow:0 6px 20px #0003">${fs.readFileSync(__dirname+'/'+n+'.svg','utf8').replace('<svg ','<svg width="420" height="420" ')}</div>${n}</div>`).join('');
await p.setContent(`<body style="margin:0;background:#fafafa;display:flex;gap:60px;padding:40px 60px">${cells}</body>`);await p.waitForTimeout(300);
await p.screenshot({path:__dirname+'/compare.png'});await b.close();})();
