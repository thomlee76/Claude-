const { chromium } = require('playwright'); const fs=require('fs');
(async()=>{const svg=fs.readFileSync(__dirname+'/icon.svg','utf8');const b=await chromium.launch();
for(const [sz,name] of [[512,'icon-512.png'],[192,'icon-192.png'],[180,'apple-touch-icon.png']]){const p=await b.newPage({viewport:{width:sz,height:sz}});
 await p.setContent('<body style="margin:0">'+svg.replace('<svg ','<svg width="'+sz+'" height="'+sz+'" ')+'</body>');await p.screenshot({path:__dirname+'/'+name,clip:{x:0,y:0,width:sz,height:sz}});}
await b.close();})();
