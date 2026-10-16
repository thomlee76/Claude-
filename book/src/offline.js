(function(){const LIST=__LIST__;const st=document.getElementById('offSt'),pb=document.getElementById('offPdf');
if(!st||!('serviceWorker' in navigator)||!('caches' in window))return;
const base=new URL('./',location.href);
async function count(){let n=0;for(const p of LIST){if(await caches.match(new URL(p,base).href,{ignoreSearch:true}))n++;}return n;}
async function pdfSaved(){return !!(await caches.match(new URL('Claude-v-rabote.pdf',base).href));}
let tries=0;
async function tick(){const n=await count();st.hidden=false;
  if(n>=LIST.length){st.textContent='Доступно без интернета';st.classList.add('ok');pb.hidden=await pdfSaved();if(!pb.hidden)pb.textContent='Сохранить и PDF для офлайна (11 МБ)';return;}
  st.classList.remove('ok');st.textContent=navigator.onLine?('Сохраняю для работы без интернета: '+n+' из '+LIST.length):('Без сети сохранено '+n+' из '+LIST.length+' — откройте книгу с интернетом');
  tries++;if(tries%5===0&&navigator.serviceWorker.controller)navigator.serviceWorker.controller.postMessage('ensure');setTimeout(tick,1500);}
navigator.serviceWorker.ready.then(()=>setTimeout(tick,600));
pb.addEventListener('click',async()=>{pb.disabled=true;pb.textContent='Сохраняю PDF…';try{const c=await caches.open('cvr-files');await c.add(new URL('Claude-v-rabote.pdf',base).href);pb.textContent='PDF сохранён';setTimeout(()=>{pb.hidden=true},1500);}catch(e){pb.disabled=false;pb.textContent='Не удалось — проверьте интернет и нажмите ещё раз';}});
if(navigator.storage&&navigator.storage.persist)navigator.storage.persist().catch(()=>{});
})();
