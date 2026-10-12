/* 日本語 復習ノート — 출석형 레이아웃
   홈(주간 캘린더 + 카드 캐러셀) · 라이브러리(레슨팩/자료) · 플래시카드 · 퀴즈 · 분석(탑승권) · 노트 · 설정 */
const $=id=>document.getElementById(id);
const store={get(k,d){try{const v=localStorage.getItem("jpn:"+k);return v===null?d:JSON.parse(v)}catch(e){return d}},
             set(k,v){try{localStorage.setItem("jpn:"+k,JSON.stringify(v))}catch(e){}}};
const ESC=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const F=s=>String(s).replace(/([0-9０-９,]*[一-龯々〆%]+)（([ぁ-ゖー・ァ-ヶ]+)）/g,"<ruby>$1<rt>$2</rt></ruby>");
const SH=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const isKana=c=>/[ぁ-ゖァ-ヺー・]/.test(c);
function RW(w,r){if(!/[一-龯々〆]/.test(w)||!r||w===r)return ESC(w);
  let a=0;while(a<w.length&&a<r.length&&isKana(w[a])&&w[a]===r[a])a++;
  let b=0;while(b<w.length-a&&b<r.length-a&&isKana(w[w.length-1-b])&&w[w.length-1-b]===r[r.length-1-b])b++;
  const core=w.slice(a,w.length-b),rc=r.slice(a,r.length-b);if(!core||!rc)return ESC(w);
  return ESC(w.slice(0,a))+'<ruby>'+ESC(core)+'<rt>'+ESC(rc)+'</rt></ruby>'+ESC(w.slice(w.length-b))}
const el=(tag,cls,html)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e};
const SFILE=s=>"l"+s.l+"-"+(s.p<10?"0"+s.p:s.p);
const KLABEL={gram:"문법",word:"단어",kanji:"한자",talk:"회화",sum:"정리"};
const LESSONS=GRAM.map(g=>g.l);
const LSHORT={1:"희망·계획",2:"비교·순위",3:"날짜·색·옷",4:"희망·주문·부탁",5:"추측·날짜·거리"};
const SECS=[["gram","문법","文"],["word","단어","語"],["kanji","한자","漢"],["talk","회화","話"],["sheets","자료","資"]];
const L2=l=>"L"+(l<10?"0"+l:l);
const APPV="v19";

let known=new Set(store.get("known",[])),kknown=new Set(store.get("kknown",[]));
const lessonOf=l=>GRAM.find(g=>g.l===l);
const vocabOf=l=>VOCAB.map((v,i)=>[v,i]).filter(([v])=>!l||v[5]===l);
const kanjiOf=l=>KANJI.map((k,i)=>[k,i]).filter(([k])=>!l||k[4]===l);
const sheetsOf=(k,l)=>SHEETS.filter(s=>(!k||s.k===k)&&(!l||s.l===l));
const bests=()=>store.get("bests",{});
const wrongMap=()=>store.get("wrong",{});

/* ---- 활동 기록 (주간 캘린더 / Day N) ---- */
const DAILY=20;
const dkey=d=>{d=d||new Date();return d.getFullYear()+"-"+(d.getMonth()+1<10?"0":"")+(d.getMonth()+1)+"-"+(d.getDate()<10?"0":"")+d.getDate()};
function bump(n){const days=store.get("days",{});const k=dkey();days[k]=(days[k]||0)+(n||1);store.set("days",days);if(!store.get("first",null))store.set("first",k)}
const dayNo=()=>{const days=store.get("days",{});const k=dkey();const n=Object.keys(days).filter(x=>days[x]>0&&x<k).length;return n+1};

/* ===================== 라우팅 ===================== */
let R={pg:"home",lesson:store.get("lesson",LESSONS[LESSONS.length-1]),arg:null,sec:null};
function go(h){if(location.hash.slice(1)===h)route();else location.hash=h}
let lastHash="";
function route(){
  const h=decodeURIComponent(location.hash.slice(1)),p=h.split("/");
  const n=parseInt((p[1]||"").replace("l",""),10);
  if(p[0]===""||p[0]==="home")R={...R,pg:"home"};
  else if(p[0]==="lib")R={...R,pg:"lib",arg:p[1]||"lessons"};
  else if(p[0]==="note")R={...R,pg:"note"};
  else if(p[0]==="stats"||p[0]==="prog")R={...R,pg:"stats"};
  else if(p[0]==="set")R={...R,pg:"set"};
  else if(p[0]==="flash"){R={...R,pg:"flash",arg:isNaN(n)?R.lesson:n}}
  else if(p[0]==="quiz"||p[0]==="review"){R={...R,pg:"quiz",arg:p[1]==="wrong"||p[1]==="mix"?p[1]:(isNaN(n)?0:n)}}
  else if(/^l\d+$/.test(p[0])){
    const l=parseInt(p[0].slice(1),10);if(LESSONS.indexOf(l)>=0){R.lesson=l;store.set("lesson",l)}
    if(p[1]==="quiz"){R={...R,pg:"quiz",arg:R.lesson}}
    else if(SECS.some(s=>s[0]===p[1]))R={...R,pg:"sec",sec:p[1]};
    else R={...R,pg:"ldetail"};
  }
  else R={...R,pg:"home"};
  lastHash=h;render();
}
window.addEventListener("hashchange",route);

/* ===================== 공통 UI ===================== */
const ICO={back:'<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',more:'<svg viewBox="0 0 24 24" style="fill:currentColor;stroke:none"><circle cx="12" cy="5" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="12" cy="19" r="1.8"/></svg>',
  chev:'<svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>',bm:'<svg viewBox="0 0 24 24"><path d="M7 4h10v16l-5-3-5 3z"/></svg>',
  search:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  plane:'<svg viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/></svg>'};
function topbar(opts){
  const t=el("div","tb");
  const l=el("button","ic",ICO.back);l.setAttribute("aria-label","뒤로");l.onclick=()=>go(opts.back||"home");t.appendChild(l);
  const m=el("div","mid");if(opts.mid)m.appendChild(opts.mid);else if(opts.title)m.textContent=opts.title;t.appendChild(m);
  const r=el("button","ic",opts.right||"");if(opts.onRight)r.onclick=opts.onRight;else r.style.visibility="hidden";t.appendChild(r);
  return t;
}
function openSheet(title,items){
  const b=$("shbody");b.innerHTML="";if(title)b.appendChild(el("h4",null,title));
  items.forEach(it=>{const x=el("button","it"+(it.on?" on":""),(it.n!=null?'<span class="n">'+it.n+'</span>':'')+'<div>'+it.label+(it.sub?'<small>'+it.sub+'</small>':'')+'</div>'+(it.r?'<span class="r">'+it.r+'</span>':''));
    x.onclick=()=>{closeSheet();it.fn&&it.fn()};b.appendChild(x)});
  $("sheet").classList.add("on");$("shbg").classList.add("on");
}
function closeSheet(){$("sheet").classList.remove("on");$("shbg").classList.remove("on")}
$("shbg").onclick=closeSheet;
function card(title,meta){const c=el("div","card");if(title)c.appendChild(el("div","ch",'<b>'+title+'</b>'+(meta?'<span>'+meta+'</span>':'')));return c}
const mins=n=>"~"+Math.max(1,Math.ceil(n/6))+"분";
const pct=(a,b)=>b?Math.round(a/b*100):0;

/* ===================== 자료 뷰어 ===================== */
function sheetGrid(list,showL){
  const g=el("div","sh");
  list.forEach((s,i)=>{
    const b=el("button","shi");b.type="button";b.setAttribute("aria-label",L2(s.l)+" "+s.p+"페이지 — "+s.t);
    b.innerHTML='<span class="im"><img src="sheets/thumb/'+SFILE(s)+'.webp" alt="" loading="lazy" decoding="async"><span class="pg">'+(showL?"L"+s.l+"·":"")+s.p+'</span></span><span class="cap">'+ESC(s.t)+'</span>';
    b.onclick=()=>openViewer(list,i);g.appendChild(b);
  });
  return g;
}
let VL=[],VI=0,VZ=false;
function openViewer(list,i){VL=list;VI=i;VZ=false;$("viewer").classList.add("on");document.body.style.overflow="hidden";showSheet()}
function showSheet(){
  const s=VL[VI];$("vimg").src="sheets/"+SFILE(s)+".webp";$("vimg").alt=s.t;
  $("vttl").textContent=s.t;$("vsub").textContent=L2(s.l)+" · "+KLABEL[s.k]+" · "+s.p+"/10";
  $("vcnt").textContent=(VI+1)+" / "+VL.length;$("vprev").disabled=VI===0;$("vnext").disabled=VI===VL.length-1;
  const b=$("vbody");b.classList.toggle("zoom",VZ);b.scrollTop=0;b.scrollLeft=VZ?b.scrollWidth/2-b.clientWidth/2:0;
  $("vzoom").textContent=VZ?"축소":"확대";
}
function closeViewer(){$("viewer").classList.remove("on");document.body.style.overflow="";$("vimg").removeAttribute("src")}
function stepSheet(d){const n=VI+d;if(n<0||n>=VL.length)return;VI=n;VZ=false;showSheet()}

/* ===================== 홈 ===================== */
let hmode=store.get("hmode","study");
function ring(p,cls){const C=2*Math.PI*19;return '<svg viewBox="0 0 44 44" class="'+(cls||"")+'"><circle cx="22" cy="22" r="19" fill="none" stroke="var(--ln)" stroke-width="3.5"/>'+(p>0?'<circle cx="22" cy="22" r="19" fill="none" stroke="var(--tx)" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="'+C+'" stroke-dashoffset="'+(C*(1-Math.min(1,p)))+'"/>':"")+'</svg>'}
function weekStrip(){
  const w=el("div","weekw");const g=el("div","week");
  const now=new Date(),dow=now.getDay(),start=new Date(now);start.setDate(now.getDate()-dow);
  const days=store.get("days",{}),names=["일","월","화","수","목","금","토"];
  names.forEach(n=>g.appendChild(el("div","dn",n)));
  for(let i=0;i<7;i++){const d=new Date(start);d.setDate(start.getDate()+i);const k=dkey(d),cnt=days[k]||0,today=i===dow,fut=i>dow;
    const c=el("div","dd"+(fut?" fut":""));
    if(today)c.innerHTML=ring(cnt/DAILY)+'<span class="t">'+d.getDate()+'</span>';
    else if(cnt>0)c.innerHTML=ring(cnt/DAILY)+'<span>'+d.getDate()+'</span>';
    else c.textContent=d.getDate();
    g.appendChild(c)}
  w.appendChild(g);w.appendChild(el("div","handle"));return w;
}
function pickLesson(){
  openSheet("레슨 선택",LESSONS.map(l=>{const vs=vocabOf(l),kw=vs.filter(([,i])=>known.has(i)).length;
    return{n:l,label:L2(l)+" · "+ESC(lessonOf(l).title),sub:ESC(LSHORT[l]||""),r:pct(kw,vs.length)+"%",on:l===R.lesson,fn:()=>{R.lesson=l;store.set("lesson",l);render()}}}));
}
function homeCard(o){
  const c=el("div","hc");
  c.innerHTML='<div class="art">'+o.art+'</div><h2>'+o.title+'</h2><div class="pb"><i style="width:'+o.p+'%"></i></div><div class="pm"><span>'+o.left+'</span><span>'+(o.right||"")+'</span></div><div class="div"></div><div class="info">'+o.info+'</div>';
  const b=el("button","bigbtn"+(o.cls?" "+o.cls:""),o.btn||"바로 시작");b.onclick=o.fn;c.appendChild(b);return c;
}
function stripArt(pairs){
  const six=pairs.slice(0,6);
  return '<div class="strip">'+six.map(([v])=>'<div class="mc"><div class="im">'+(v[7]||"✎")+'</div><div class="tx jp">'+RW(v[0],v[1])+'<small>'+ESC(v[2])+'</small></div></div>').join("")+'</div>';
}
function sheetArt(list){return '<div class="sg">'+list.slice(0,5).map(s=>'<img src="sheets/thumb/'+SFILE(s)+'.webp" alt="" loading="lazy">').join("")+'</div>'}
function darkArt(glyph,sub,sheet){return '<div class="art dark">'+(sheet?'<img src="sheets/thumb/'+SFILE(sheet)+'.webp" alt="">':"")+'<span class="g">'+glyph+'</span><span class="s">'+sub+'</span></div>'}
function renderHome(){
  const v=$("view"),l=R.lesson,g=lessonOf(l),wrong=wrongMap(),nw=Object.keys(wrong).length;
  const ht=el("div","ht");
  const tt=el("button","ttl",L2(l)+ICO.chev);tt.onclick=pickLesson;ht.appendChild(tt);
  const seg=el("div","seg");
  [["study","학습"],["review","복습"]].forEach(([k,lab],i)=>{if(i)seg.appendChild(el("span","sep"));const b=el("button",(hmode===k?"on":"")+(k==="review"&&nw?" dot":""),lab);b.onclick=()=>{hmode=k;store.set("hmode",k);render()};seg.appendChild(b)});
  ht.appendChild(seg);v.appendChild(ht);
  v.appendChild(weekStrip());
  v.appendChild(el("div","dayh",'<b>Day '+dayNo()+'</b><span>'+(hmode==="study"?L2(l)+" · "+ESC(g.title):"전체 복습")+'</span>'));
  const car=el("div","car");
  if(hmode==="study"){
    const vs=vocabOf(l),unk=vs.filter(([,i])=>!known.has(i)),kw=vs.length-unk.length;
    car.appendChild(homeCard({art:stripArt(SH(unk.length?unk:vs)),title:"플래시카드",p:pct(kw,vs.length),left:kw?(unk.length?"진행 중":"완료"):"시작 전",right:mins(unk.length||vs.length),info:"복습단어 "+(unk.length||vs.length)+"개",fn:()=>go("flash/"+l)}));
    const b=bests()["bestL"+l]||0,qsh=sheetsOf("gram",l)[0];
    car.appendChild(homeCard({art:darkArt("問","LESSON QUIZ",qsh),title:"퀴즈",p:b,left:b?"최고 "+b+"%":"시작 전",right:"20문제",info:b?"다시 풀어 기록을 올려 보세요.":"실력을 확인하세요.",fn:()=>go("quiz/"+l)}));
    const seen=store.get("seen",{});const gs=seen["g"+l]?100:0;
    car.appendChild(homeCard({art:'<div class="big jp">文法</div>',title:"문법",p:gs,left:gs?"읽음":"시작 전",right:mins(g.items.length*8),info:"문법 포인트 "+g.items.length+"개",btn:"읽기",fn:()=>go("l"+l+"/gram")}));
    const ks=kanjiOf(l),kk=ks.filter(([,i])=>kknown.has(i)).length;
    car.appendChild(homeCard({art:'<div class="big jp">'+ks.slice(0,3).map(([k])=>k[0]).join("")+'</div>',title:"한자",p:pct(kk,ks.length),left:kk?(kk===ks.length?"완료":"진행 중"):"시작 전",right:mins(ks.length),info:"한자 "+ks.length+"자 · 확인 "+kk+"자",btn:"학습하기",fn:()=>go("l"+l+"/kanji")}));
    const ds=DLGS.filter(d=>d.l===l),sp=SPEAK.filter(s=>s[2]===l),ts=seen["t"+l]?100:0;
    car.appendChild(homeCard({art:'<div class="big jp">会話</div>',title:"회화",p:ts,left:ts?"읽음":"시작 전",right:mins(ds.length*6),info:"대화 "+ds.length+" · 말하기 "+sp.length,btn:"열기",fn:()=>go("l"+l+"/talk")}));
    const sh=sheetsOf(0,l);
    car.appendChild(homeCard({art:sheetArt(sh),title:"수업 자료",p:seen["s"+l]?100:0,left:seen["s"+l]?"열어봄":"시작 전",right:sh.length+"장",info:"선생님 자료 원본 "+sh.length+"장",btn:"보기",fn:()=>go("l"+l+"/sheets")}));
  }else{
    const unkAll=VOCAB.map((v,i)=>[v,i]).filter(([,i])=>!known.has(i));
    car.appendChild(homeCard({art:darkArt("誤","WRONG ANSWERS",sheetsOf("word",l)[0]),title:"오답 퀴즈",p:nw?0:100,left:nw?"남은 오답 "+nw:"오답 없음",right:nw?mins(nw*2):"",info:nw?"틀린 문제 "+nw+"개를 다시 풉니다.":"틀린 문제가 없습니다.",cls:nw?"":"g",fn:()=>{if(nw)go("quiz/wrong")}}));
    car.appendChild(homeCard({art:stripArt(SH(unkAll)),title:"미암기 단어",p:pct(known.size,VOCAB.length),left:known.size+" / "+VOCAB.length+" 외움",right:mins(Math.min(40,unkAll.length)),info:"아직 모르는 단어 "+unkAll.length+"개",fn:()=>go("flash/0")}));
    car.appendChild(homeCard({art:darkArt("混","MIXED 30",sheetsOf("gram",1)[0]),title:"혼합 퀴즈",p:bests()["best혼합 30"]||0,left:bests()["best혼합 30"]?"최고 "+bests()["best혼합 30"]+"%":"시작 전",right:"30문제",info:"전 레슨 단어·한자·문법 섞어서",fn:()=>go("quiz/mix")}));
    car.appendChild(homeCard({art:'<div class="big jp">'+SH(KANJI).slice(0,3).map(k=>k[0]).join("")+'</div>',title:"한자 전체",p:pct(kknown.size,KANJI.length),left:kknown.size+" / "+KANJI.length+" 확인",right:"",info:"레슨별 한자 카드로 이동",btn:"열기",fn:()=>go("lib")}));
    car.appendChild(homeCard({art:'<div class="big jp">設定</div>',title:"상세 퀴즈 설정",p:0,left:"종류·레슨·문항 수",right:"",info:"원하는 조건으로 문제 생성",btn:"설정하기",fn:()=>go("quiz/0")}));
  }
  v.appendChild(car);
}

/* ===================== 라이브러리 ===================== */
let libq="";
function renderLib(){
  const v=$("view"),tab=R.arg==="sheets"?"sheets":"lessons";
  const lt=el("div","lt");[["lessons","레슨팩"],["sheets","자료"]].forEach(([k,lab])=>{const b=el("button",tab===k?"on":"",lab);b.onclick=()=>go("lib/"+k);lt.appendChild(b)});v.appendChild(lt);
  const s=el("div","search",ICO.search+'<input type="search" placeholder="단어 · 한자 검색" autocomplete="off">');
  const inp=s.querySelector("input");inp.value=libq;v.appendChild(s);
  const res=el("div","sres hid");v.appendChild(res);
  const doSearch=()=>{libq=inp.value.trim();res.innerHTML="";if(libq.length<1){res.classList.add("hid");return}
    const q=libq.toLowerCase();let out=[];
    VOCAB.forEach((x,i)=>{if(x[0].includes(q)||x[1].includes(q)||x[2].toLowerCase().includes(q))out.push(['<b class="jp">'+RW(x[0],x[1])+'</b><em>'+ESC(x[1])+'</em> '+ESC(x[2]),L2(x[5])+" 단어",()=>go("l"+x[5]+"/word")])});
    KANJI.forEach((x,i)=>{if(x[0].includes(q)||x[1].includes(q)||x[2].toLowerCase().includes(q))out.push(['<b class="jp">'+ESC(x[0])+'</b><em>'+ESC(x[1])+'</em> '+ESC(x[2]),L2(x[4])+" 한자",()=>go("l"+x[4]+"/kanji")])});
    if(!out.length)res.appendChild(el("div","ri",'<span>결과 없음</span>'));
    out.slice(0,30).forEach(([h,m,fn])=>{const r=el("button","ri",'<div>'+h+'</div><span>'+m+' ›</span>');r.style.width="100%";r.onclick=fn;res.appendChild(r)});
    res.classList.remove("hid")};
  inp.oninput=doSearch;if(libq)doSearch();
  if(tab==="lessons"){
    const nw=Object.keys(wrongMap()).length;
    const bn=el("button","banner",'<span class="ic">誤</span><div><b>오답 노트 다시 풀기</b><span>'+(nw?"틀린 문제 "+nw+"개가 기다립니다":"틀린 문제가 없습니다")+'</span></div><span class="ch">›</span>');
    bn.onclick=()=>go(nw?"quiz/wrong":"quiz/0");v.appendChild(bn);
    v.appendChild(el("div","help",'레슨팩이란? <i>?</i> <span style="font-weight:400">수업 1회분 = 문법·단어·한자·회화·자료</span>'));
    LESSONS.forEach(l=>{
      const vs=vocabOf(l),ks=kanjiOf(l),kw=vs.filter(([,i])=>known.has(i)).length,kk=ks.filter(([,i])=>kknown.has(i)).length;
      const p=pct(kw+kk,vs.length+ks.length),sh=sheetsOf(0,l),wl=Object.keys(wrongMap()).filter(k=>{const i=parseInt(k.slice(1));return k[0]==="w"?VOCAB[i]&&VOCAB[i][5]===l:k[0]==="k"?KANJI[i]&&KANJI[i][4]===l:QUIZ[i]&&QUIZ[i][4]===l}).length;
      const c=el("button","lc");
      const ft=wl?'<div class="ft">오답 '+wl+'개 · 집중 학습<span class="fire">🔥</span></div>':p>=100?'<div class="ft done">완료<span class="fire">✓</span></div>':p>0?'<div class="ft idle">진행 중<span>단어 '+kw+'/'+vs.length+' · 한자 '+kk+'/'+ks.length+'</span></div>':'<div class="ft idle">시작 전<span>단어 '+vs.length+' · 한자 '+ks.length+'</span></div>';
      c.innerHTML='<div class="top"><div class="lv">'+L2(l)+'<span class="badge">+'+vs.length+'개</span></div><div class="sub">'+ESC(lessonOf(l).title)+'</div>'+
        '<div class="fan">'+[sh[0],sh[3],sh[6]].filter(Boolean).map(s=>'<img src="sheets/thumb/'+SFILE(s)+'.webp" alt="" loading="lazy">').join("")+'</div></div>'+
        '<div class="pr"><div class="pb"><i class="'+(p?"":"z")+'" style="width:'+Math.max(p,0)+'%"></i></div><b>'+p+'%</b></div>'+ft;
      c.onclick=()=>go("l"+l);v.appendChild(c);
    });
  }else{
    LESSONS.forEach(l=>{const list=sheetsOf(0,l);const c=card(L2(l)+" · "+ESC(lessonOf(l).title),list.length+"장");c.appendChild(sheetGrid(list));v.appendChild(c)});
  }
}

/* ---- 레슨 상세 ---- */
function renderLessonDetail(){
  const v=$("view"),l=R.lesson,g=lessonOf(l);
  v.appendChild(topbar({back:"lib",title:L2(l)}));
  v.appendChild(el("div","lhd",'<div class="k">LESSON '+(l<10?"0"+l:l)+'</div><b>'+ESC(g.title)+'</b><p>'+ESC(g.desc||"")+'</p>'));
  const vs=vocabOf(l),ks=kanjiOf(l),kw=vs.filter(([,i])=>known.has(i)).length,kk=ks.filter(([,i])=>kknown.has(i)).length,ds=DLGS.filter(d=>d.l===l),sh=sheetsOf(0,l);
  const rows=el("div","rows");
  [["gram","문법","文",g.items.length+"개"],["word","단어","語",kw+" / "+vs.length],["kanji","한자","漢",kk+" / "+ks.length],["talk","회화","話",ds.length+"편"],["sheets","자료","資",sh.length+"장"]].forEach(([k,lab,gl,m])=>{
    const r=el("button","r",'<span class="g">'+gl+'</span>'+lab+'<span>'+m+'</span><span class="ch">›</span>');r.onclick=()=>go("l"+l+"/"+k);rows.appendChild(r)});
  v.appendChild(rows);
  const two=el("div","two");const a=el("button","bigbtn w","플래시카드");a.onclick=()=>go("flash/"+l);const b=el("button","bigbtn","퀴즈 시작");b.onclick=()=>go("quiz/"+l);two.appendChild(a);two.appendChild(b);v.appendChild(two);
  const bs=bests()["bestL"+l];if(bs)v.appendChild(el("p","muted","이 레슨 퀴즈 최고 기록 "+bs+"%")).style.marginTop="10px";
}

/* ===================== 섹션 페이지 ===================== */
function markSeen(k){const s=store.get("seen",{});if(!s[k]){s[k]=1;store.set("seen",s)}}
function renderSection(){
  const v=$("view"),l=R.lesson,sec=R.sec,lab=SECS.find(s=>s[0]===sec)[1];
  const sh=sec==="sheets"?[]:sheetsOf(sec,l);
  v.appendChild(topbar({back:"l"+l,title:L2(l)+" · "+lab,right:sh.length?'<span style="font-size:13px;font-weight:700">자료</span>':"",onRight:sh.length?()=>openViewer(sh,0):null}));
  ({gram:renderGram,word:renderWord,kanji:renderKanji,talk:renderTalk,sheets:renderSheets})[sec]();
}
function gramCard(it){
  const c=el("div","card gram");
  let h='<div class="ch"><b>'+F(it.h)+'</b></div>';
  if(it.intro)h+='<p>'+F(it.intro)+'</p>';
  if(it.fx)h+='<div class="fx jp"><span class="b1">'+F(it.fx[0])+'</span><span class="op">'+it.fx[1]+'</span><span class="b2">'+F(it.fx[2])+'</span><span class="rs">'+F(it.fx[3])+'</span></div>';
  const TB=t=>{let s='<div class="tw"><table>';t.forEach((r,i)=>{s+="<tr>"+r.map((cell,j)=>{const tag=i===0?"th":"td";const cls=(i>0&&j===0)?' class="f jp"':(i>0?' class="jp"':"");return "<"+tag+cls+">"+F(cell)+"</"+tag+">"}).join("")+"</tr>"});return s+'</table></div>'};
  if(it.table)h+=TB(it.table);
  if(it.table2){if(it.t2h)h+='<h3>'+it.t2h+'</h3>';h+=TB(it.table2)}
  if(it.tip)h+='<div class="box tip"><span class="t">'+it.tip.t+'</span>'+F(it.tip.b)+'</div>';
  if(it.ex){h+='<h3>예문</h3>';it.ex.forEach(e=>{h+='<div class="ex"><div class="j jp">'+F(e[0])+'</div><div class="k">'+F(e[1])+'</div></div>'})}
  if(it.warn)h+='<div class="box warn"><span class="t">'+it.warn.t+'</span>'+F(it.warn.b)+'</div>';
  if(it.dlg){h+='<h3>미니 회화</h3>';it.dlg.forEach(d=>{h+='<div class="dl'+(d[0]==="B"?" me":"")+'"><span class="who">'+d[0]+'</span><div class="bub"><div class="j jp">'+F(d[1])+'</div><div class="k on">'+F(d[2])+'</div></div></div>'})}
  c.innerHTML=h;return c;
}
function renderGram(){
  const v=$("view"),g=lessonOf(R.lesson);markSeen("g"+R.lesson);
  v.appendChild(el("div","lhd",'<div class="k">문법 '+g.items.length+'가지</div><b>'+ESC(g.title)+'</b>'));
  const sh=sheetsOf("gram",R.lesson);
  if(sh.length){const c=card("문법 자료",sh.length+"장");c.appendChild(sheetGrid(sh));v.appendChild(c)}
  g.items.forEach(it=>v.appendChild(gramCard(it)));
}
let wcat="전체";
function toggleKnown(i){if(known.has(i))known.delete(i);else known.add(i);store.set("known",[...known]);bump(1)}
function vocabRows(pairs,host){
  let cur=null,c=null;
  pairs.forEach(([v,i])=>{
    if(v[6]!==cur){cur=v[6];c=card(ESC(cur),pairs.filter(([x])=>x[6]===cur).length+"개");host.appendChild(c)}
    const r=el("div","vrow"+(known.has(i)?" kn":""));
    r.innerHTML='<div class="vm"><div class="vw jp">'+RW(v[0],v[1])+'<span class="vr">'+ESC(v[1])+'</span></div><div class="vk">'+ESC(v[2])+'</div>'+
      '<div class="vex jp">'+F(v[3])+'<span>'+ESC(v[4])+'</span></div></div><button class="kb" type="button" aria-label="외움 표시">✓</button>';
    r.querySelector(".vm").onclick=()=>r.classList.toggle("open");
    r.querySelector(".kb").onclick=e=>{e.stopPropagation();toggleKnown(i);r.classList.toggle("kn",known.has(i))};
    c.appendChild(r);
  });
}
function renderWord(){
  const v=$("view"),pairs=vocabOf(R.lesson),l=R.lesson;
  const kw=pairs.filter(([,i])=>known.has(i)).length;
  v.appendChild(el("div","lhd",'<div class="k">단어 '+pairs.length+'개 · 외움 '+kw+'</div><b>'+ESC(lessonOf(l).title)+'</b>'));
  const two=el("div","two");const a=el("button","bigbtn","플래시카드로 외우기");a.onclick=()=>go("flash/"+l);two.appendChild(a);v.appendChild(two);
  const cats=[...new Set(pairs.map(([v])=>v[6]))];if(wcat!=="전체"&&cats.indexOf(wcat)<0)wcat="전체";
  const ch=el("div","chips scroll");[["전체","전체 "+pairs.length]].concat(cats.map(c=>[c,c.replace(/^L\d /,"")+" "+pairs.filter(([v])=>v[6]===c).length])).forEach(([k,lab])=>{const b=el("button","chip"+(wcat===k?" on":""),lab);b.onclick=()=>{wcat=k;render()};ch.appendChild(b)});v.appendChild(ch);
  vocabRows(pairs.filter(([v])=>wcat==="전체"||v[6]===wcat),v);
}
function kanjiGrid(pairs,host){
  const c=card("한자 "+pairs.length+"자","탭: 가리기 · ✓: 확인");
  const g=el("div","kg");
  pairs.forEach(([k,i])=>{
    const d=el("div","kt"+(kknown.has(i)?" kn":""));
    d.innerHTML='<button class="kk" type="button" aria-label="확인 표시">✓</button><div class="k jp">'+ESC(k[0])+'</div><div class="r jp">'+ESC(k[1])+'</div><div class="m">'+ESC(k[2])+'</div><div class="kx jp">'+ESC(k[3])+'</div>';
    d.onclick=()=>d.classList.toggle("hide");
    d.querySelector(".kk").onclick=e=>{e.stopPropagation();if(kknown.has(i))kknown.delete(i);else kknown.add(i);store.set("kknown",[...kknown]);d.classList.toggle("kn",kknown.has(i));bump(1)};
    g.appendChild(d);
  });
  c.appendChild(g);
  const row=el("div","row",'<button class="btn" id="k-hide">전부 가리기</button><button class="btn" id="k-show">전부 보기</button>');
  c.appendChild(row);host.appendChild(c);
  $("k-hide").onclick=()=>g.querySelectorAll(".kt").forEach(t=>t.classList.add("hide"));
  $("k-show").onclick=()=>g.querySelectorAll(".kt").forEach(t=>t.classList.remove("hide"));
}
function renderKanji(){
  const v=$("view"),pairs=kanjiOf(R.lesson);
  v.appendChild(el("div","lhd",'<div class="k">한자 '+pairs.length+'자</div><b>'+ESC(lessonOf(R.lesson).title)+'</b>'));
  const sh=sheetsOf("kanji",R.lesson);
  if(sh.length){const c=card("한자 자료",sh.length+"장");c.appendChild(sheetGrid(sh));v.appendChild(c)}
  kanjiGrid(pairs,v);
}
function renderTalk(){
  const v=$("view"),l=R.lesson,ds=DLGS.filter(d=>d.l===l),sp=SPEAK.filter(s=>s[2]===l);markSeen("t"+l);
  v.appendChild(el("div","lhd",'<div class="k">대화 '+ds.length+' · 말하기 '+sp.length+'</div><b>'+ESC(lessonOf(l).title)+'</b>'));
  const sh=sheetsOf("talk",l);
  if(sh.length){const c=card("회화 자료",sh.length+"장");c.appendChild(sheetGrid(sh));v.appendChild(c)}
  ds.forEach(d=>{
    const c=card(ESC(d.t),'<button class="lk" type="button">번역</button>');
    d.lines.forEach(x=>{c.appendChild(el("div","dl"+(x[0]==="B"?" me":""),'<span class="who">'+x[0]+'</span><div class="bub"><div class="j jp">'+F(x[1])+'</div><div class="k">'+F(x[2])+'</div></div>'))});
    c.querySelector(".lk").onclick=()=>c.classList.toggle("showkr");
    v.appendChild(c);
  });
  if(sp.length){
    const c=card("말하기 연습","모델 답은 탭");
    sp.forEach((q,i)=>{const d=el("div","sq",'<div class="q jp">'+(i+1)+'. '+F(q[0])+'</div><div class="reveal jp">'+F(q[1])+'</div>');d.onclick=()=>d.classList.toggle("on");c.appendChild(d)});
    v.appendChild(c);
  }
}
function renderSheets(){
  const v=$("view"),list=sheetsOf(0,R.lesson);markSeen("s"+R.lesson);
  v.appendChild(el("div","lhd",'<div class="k">원본 자료 '+list.length+'장</div><b>'+ESC(lessonOf(R.lesson).title)+'</b><p>탭하면 크게 · 좌우로 넘기기</p>'));
  const c=card();c.appendChild(sheetGrid(list));v.appendChild(c);
}

/* ===================== 플래시카드 ===================== */
let peek=store.get("peek",true);
function renderFlash(){
  const v=$("view"),l=R.arg;
  let pairs=l?vocabOf(l):VOCAB.map((x,i)=>[x,i]).filter(([,i])=>!known.has(i));
  if(l){const unk=pairs.filter(([,i])=>!known.has(i));if(unk.length)pairs=unk}
  let deck=SH(pairs.map(([,i])=>i));if(!l)deck=deck.slice(0,40);
  const total=deck.length;let di=0,nKnow=0,nStudy=0;
  const pills=el("div","mid");pills.innerHTML='<span class="pill"><span class="xr">↻</span><span id="fc-x">0</span></span><span class="pill"><span class="ckr">✓</span><span class="g" id="fc-ok">0</span>/'+total+'</span>';
  v.appendChild(topbar({back:l?"l"+l:"home",mid:pills,right:ICO.more,onRight:()=>openSheet("플래시카드",[
    {label:peek?"뜻 바로 보기":"뜻 가리기",sub:"카드를 탭하면 가려진 부분이 보입니다",fn:()=>{peek=!peek;store.set("peek",peek);render()}},
    {label:"다시 섞기",fn:()=>render()},
    {label:"단어 목록으로",fn:()=>go("l"+(l||R.lesson)+"/word")}])}));
  const host=el("div");v.appendChild(host);
  const btns=el("div","fbtns",'<button class="no" id="fc-know">알고 있어요</button><button class="yes" id="fc-study">학습할게요</button>');v.appendChild(btns);
  const show=()=>{host.innerHTML="";
    if(di>=deck.length){btns.classList.add("hid");
      const d=el("div","fdone",'<div class="em">🎉</div><b>'+(total?"오늘 카드 "+total+"장 완료":"외울 단어가 없습니다")+'</b><p>알고 있어요 '+nKnow+' · 학습할게요 '+nStudy+'</p>');
      const r=el("div","two");const a=el("button","bigbtn w","다시");a.onclick=()=>render();const b=el("button","bigbtn","홈으로");b.onclick=()=>go("home");r.appendChild(a);r.appendChild(b);d.appendChild(r);host.appendChild(d);return}
    btns.classList.remove("hid");
    const idx=deck[di],w=VOCAB[idx],cat=(w[6]||"").replace(/^L\d /,""),hn=(idx%4)+1;
    const c=el("div","fcard"+(peek?" peek":""));
    c.innerHTML='<div class="hero h'+hn+'"><span class="cat">'+ESC(cat)+'</span>'+(w[7]||"✎")+'<button class="bm" aria-label="자료">'+ICO.bm+'</button></div>'+
      '<div class="body"><div class="w jp"><span>'+RW(w[0],w[1])+'</span><span class="spk" aria-hidden="true">'+(di+1)+'/'+total+'</span></div><div class="rd jp">['+ESC(w[1])+']</div>'+
      '<div class="pos"><i>'+(cat.length>2?cat.slice(0,2):"뜻")+'</i>'+ESC(w[2])+'</div><div class="sep"></div>'+
      '<div class="exj jp">'+F(w[3])+'</div><div class="exk">'+ESC(w[4])+'</div>'+
      '<div class="foot"><span class="lv">'+L2(w[5])+'</span><button class="tip">목록 ›</button></div></div>';
    c.onclick=e=>{if(e.target.closest(".bm,.tip"))return;c.classList.remove("peek")};
    c.querySelector(".bm").onclick=e=>{e.stopPropagation();const sh=sheetsOf("word",w[5]);if(sh.length)openViewer(sh,0)};
    c.querySelector(".tip").onclick=e=>{e.stopPropagation();go("l"+w[5]+"/word")};
    host.appendChild(c);window.scrollTo({top:0});
    $("fc-x").textContent=nStudy;$("fc-ok").textContent=nKnow;
  };
  $("fc-know").onclick=()=>{if(di>=deck.length)return;known.add(deck[di]);store.set("known",[...known]);nKnow++;di++;bump(1);show()};
  $("fc-study").onclick=()=>{if(di>=deck.length)return;const i=deck[di];if(known.has(i)){known.delete(i);store.set("known",[...known])}nStudy++;if(deck.filter(x=>x===i).length<2)deck.push(i);di++;bump(1);show()};
  show();
}

/* ===================== 퀴즈 생성기 ===================== */
function pickN(arr,n,excl){const out=[],seen=new Set(excl);for(const x of SH(arr)){if(!seen.has(x)){seen.add(x);out.push(x);if(out.length===n)break}}return out}
function tiers(list,i,sameA,sameB){return[list.filter((x,j)=>j!==i&&sameA(x)),list.filter((x,j)=>j!==i&&sameB(x)),list]}
function distract(list,i,field,tiersArr,n){
  const val=list[i][field];let out=[];
  for(const t of tiersArr){out=out.concat(pickN(t.map(x=>x[field]),n-out.length,new Set([val,...out])));if(out.length>=n)break}
  return out.slice(0,n);
}
function mkQ(q,correct,ds,expl,l,type,key){const opts=SH([correct,...ds]);return{q,opts,ans:opts.indexOf(correct),expl,l,type,key,base:key.replace(/[a-z]$/,"")}}
function wordQ(i,type){
  const v=VOCAB[i],T=tiers(VOCAB,i,x=>x[6]===v[6],x=>x[5]===v[5]);
  if(type==="read"){if(v[0]===v[1])return null;return mkQ("「"+v[0]+"」의 읽기는?",v[1],distract(VOCAB,i,1,T,3),v[0]+"（"+v[1]+"） "+v[2],v[5],"단어 읽기","w"+i+"r")}
  if(type==="jp")return mkQ("「"+v[2]+"」을/를 일본어로?",v[0],distract(VOCAB,i,0,T,3),v[0]+"（"+v[1]+"） "+v[2],v[5],"뜻→단어","w"+i+"j");
  return mkQ("「"+RW(v[0],v[1])+"」의 뜻은?",v[2],distract(VOCAB,i,2,T,3),v[0]+"（"+v[1]+"） "+v[2],v[5],"단어 뜻","w"+i+"m");
}
function kanjiQ(i,type){
  const k=KANJI[i],T=tiers(KANJI,i,x=>x[4]===k[4],x=>true);
  if(type==="mean")return mkQ("「"+RW(k[0],k[1])+"」의 뜻은?",k[2],distract(KANJI,i,2,T,3),k[0]+" "+k[1]+" · "+k[2]+" — "+k[3],k[4],"한자 뜻","k"+i+"m");
  return mkQ("「"+k[0]+"」의 읽기는?",k[1],distract(KANJI,i,1,T,3),k[0]+" "+k[1]+" · "+k[2]+" — "+k[3],k[4],"한자 읽기","k"+i+"r");
}
const gramQ=i=>{const q=QUIZ[i];return{q:q[0],opts:q[1],ans:q[2],expl:q[3],l:q[4],type:"문법·"+q[5],key:"g"+i,base:"g"+i}};
const QCFG_DEF={kinds:["word","kanji","gram"],lessons:[],wtypes:["mean","read"],ktypes:["read","mean"],count:20,wrongOnly:false};
let QCFG=Object.assign({},QCFG_DEF,store.get("qcfg",{}));
function poolSize(cfg){
  const inL=l=>!cfg.lessons.length||cfg.lessons.indexOf(l)>=0;let n=0;
  if(cfg.kinds.indexOf("word")>=0)n+=VOCAB.filter(v=>inL(v[5])).length*Math.max(1,cfg.wtypes.length);
  if(cfg.kinds.indexOf("kanji")>=0)n+=KANJI.filter(k=>inL(k[4])).length*Math.max(1,cfg.ktypes.length);
  if(cfg.kinds.indexOf("gram")>=0)n+=QUIZ.filter(q=>inL(q[4])).length;
  return n;
}
function buildPool(cfg){
  const wrong=wrongMap(),inL=l=>!cfg.lessons.length||cfg.lessons.indexOf(l)>=0;
  let items=[];
  if(cfg.kinds.indexOf("word")>=0)VOCAB.forEach((v,i)=>{if(!inL(v[5]))return;(cfg.wtypes.length?cfg.wtypes:["mean"]).forEach(t=>{const q=wordQ(i,t);if(q)items.push(q)})});
  if(cfg.kinds.indexOf("kanji")>=0)KANJI.forEach((k,i)=>{if(!inL(k[4]))return;(cfg.ktypes.length?cfg.ktypes:["read"]).forEach(t=>items.push(kanjiQ(i,t)))});
  if(cfg.kinds.indexOf("gram")>=0)QUIZ.forEach((q,i)=>{if(inL(q[4]))items.push(gramQ(i))});
  if(cfg.wrongOnly)items=items.filter(x=>wrong[x.key]);
  items=SH(items);
  const w=items.filter(x=>wrong[x.key]),rest=items.filter(x=>!wrong[x.key]);
  const seen=new Set(),first=[],later=[];
  w.concat(rest).forEach(x=>{if(seen.has(x.base))later.push(x);else{seen.add(x.base);first.push(x)}});
  let out=first.concat(later);
  if(cfg.count>0)out=out.slice(0,cfg.count);
  return SH(out);
}

/* ===================== 퀴즈 러너 ===================== */
let QO=[],QI=0,QS=0,QA=false,QKEY="",QWRONG=[];
function runQuiz(host,pool,key,onDone,pillEl){
  QO=pool.slice();QI=0;QS=0;QA=false;QKEY=key;QWRONG=[];
  if(!QO.length){host.appendChild(el("div","card",'<p class="muted">조건에 맞는 문제가 없습니다.</p>'));return}
  const box=el("div","quiz");
  box.innerHTML='<div class="qbar"><i id="qb"></i></div><div class="qn"><span id="qn"></span><span class="qtype" id="qty"></span></div>'+
    '<div class="qt jp" id="qt"></div><div class="opts" id="qo"></div><div class="fb" id="qf"></div><button class="bigbtn" id="qnext" style="display:none;margin-top:14px">다음</button>';
  const done=el("div","qdone");done.style.display="none";
  host.appendChild(box);host.appendChild(done);
  const show=()=>{
    QA=false;$("qf").className="fb";$("qnext").style.display="none";
    $("qb").style.width=Math.round(QI/QO.length*100)+"%";
    if(pillEl)pillEl.textContent=(QI+1)+" / "+QO.length;
    const q=QO[QI];$("qn").textContent=(QI+1)+" / "+QO.length+" · "+L2(q.l);$("qty").textContent=q.type;$("qt").innerHTML=F(q.q);
    const b=$("qo");b.innerHTML="";
    q.opts.forEach((o,oi)=>{const btn=el("button","opt jp",F(o));btn.type="button";
      btn.onclick=()=>{if(QA)return;QA=true;const ok=oi===q.ans;
        b.querySelectorAll(".opt").forEach((x,xi)=>{if(xi===q.ans)x.classList.add("c")});
        const wrong=wrongMap();
        if(!ok){btn.classList.add("w");QWRONG.push(q);wrong[q.key]=(wrong[q.key]||0)+1;if(QO.length<60)QO.push(q)}
        else{QS++;if(wrong[q.key]){wrong[q.key]--;if(wrong[q.key]<=0)delete wrong[q.key]}}
        store.set("wrong",wrong);
        const st=store.get("qstats",{done:0,ok:0});st.done++;if(ok)st.ok++;store.set("qstats",st);bump(1);
        const f=$("qf");f.className="fb on "+(ok?"g":"b");f.innerHTML=(ok?"정답 · ":"오답 · ")+F(q.expl);
        $("qnext").style.display="flex"};
      b.appendChild(btn)});
    window.scrollTo({top:0});
  };
  $("qnext").onclick=()=>{QI++;if(QI>=QO.length)end();else show()};
  const end=()=>{
    box.style.display="none";done.style.display="block";
    const pc=Math.round(QS/QO.length*100);
    const bs=bests();if(pc>(bs[QKEY]||0)){bs[QKEY]=pc;store.set("bests",bs)}
    const uniq=[];const seen=new Set();QWRONG.forEach(q=>{if(!seen.has(q.key)){seen.add(q.key);uniq.push(q)}});
    done.innerHTML='<div class="score"><b>'+pc+'%</b><span>'+QS+' / '+QO.length+' 정답 · 최고 '+(bs[QKEY]||pc)+'%</span></div>'+
      (uniq.length?'<h3>틀린 문제 '+uniq.length+'</h3>'+uniq.map(q=>'<div class="ex"><div class="j jp">'+F(q.q)+'</div><div class="k jp">'+F(q.opts[q.ans])+' — '+F(q.expl)+'</div></div>').join(""):'<p class="ok" style="text-align:center">전부 맞혔습니다.</p>')+
      '<div class="two"><button class="bigbtn w" id="qagain">다시</button>'+(uniq.length?'<button class="bigbtn" id="qwrong">틀린 것만 다시</button>':'<button class="bigbtn" id="qhome">홈으로</button>')+'</div>';
    $("qagain").onclick=()=>{host.innerHTML="";onDone&&onDone();};
    if(uniq.length)$("qwrong").onclick=()=>{host.innerHTML="";runQuiz(host,SH(uniq),QKEY,onDone,pillEl)};else $("qhome").onclick=()=>go("home");
    if(pillEl)pillEl.textContent="완료";
  };
  show();
}

/* ---- 퀴즈 페이지 ---- */
let LQ={kinds:["word","kanji","gram"],count:20};
function chipRow(items,isOn,fn){const w=el("div","chips");items.forEach(it=>{const b=el("button","chip"+(isOn(it[0])?" on":""),it[1]);b.onclick=()=>fn(it[0]);w.appendChild(b)});return w}
function renderQuizPage(){
  const v=$("view"),a=R.arg;
  const pill=el("span","pill");pill.textContent="퀴즈";const mid=el("div","mid");mid.appendChild(pill);
  const backTo=typeof a==="number"&&a>0?"l"+a:"home";
  v.appendChild(topbar({back:backTo,mid,right:ICO.more,onRight:()=>openSheet("퀴즈",[{label:"상세 설정",sub:"종류 · 레슨 · 문항 수",fn:()=>go("quiz/0")},{label:"오답만 풀기",fn:()=>go("quiz/wrong")},{label:"홈으로",fn:()=>go("home")}])}));
  const host=el("div");
  if(a==="wrong"){v.appendChild(host);runQuiz(host,buildPool(Object.assign({},QCFG_DEF,{wrongOnly:true,count:0})),"best오답만",()=>render(),pill);return}
  if(a==="mix"){v.appendChild(host);runQuiz(host,buildPool(Object.assign({},QCFG_DEF,{count:30})),"best혼합 30",()=>render(),pill);return}
  if(a>0){
    const l=a,cfg=Object.assign({},QCFG_DEF,{lessons:[l],kinds:LQ.kinds,count:LQ.count});
    const c=el("div","qcfg",'<h2>'+L2(l)+' 퀴즈</h2><div class="d">'+ESC(lessonOf(l).title)+' · 문제은행 '+poolSize(cfg)+'문제</div>');
    c.appendChild(el("div","lab","종류"));
    c.appendChild(chipRow([["word","단어"],["kanji","한자"],["gram","문법"]],x=>LQ.kinds.indexOf(x)>=0,x=>{const i=LQ.kinds.indexOf(x);if(i>=0){if(LQ.kinds.length>1)LQ.kinds.splice(i,1)}else LQ.kinds.push(x);render()}));
    c.appendChild(el("div","lab","문항 수"));
    c.appendChild(chipRow([[10,"10"],[20,"20"],[30,"30"],[50,"50"]],x=>x===LQ.count,x=>{LQ.count=x;render()}));
    const b=el("button","bigbtn","바로 시작");b.style.marginTop="18px";b.onclick=()=>{c.remove();runQuiz(host,buildPool(cfg),"bestL"+l,()=>render(),pill)};
    c.appendChild(b);v.appendChild(c);v.appendChild(host);
    const bs=bests()["bestL"+l];if(bs)v.appendChild(el("p","muted","이 레슨 최고 기록 "+bs+"%")).style.margin="12px 4px";
    return;
  }
  // 상세 설정 (전체)
  const wrong=wrongMap(),st=store.get("qstats",{done:0,ok:0});
  const save=()=>{store.set("qcfg",QCFG);render()};
  const togg=(arr,x,min)=>{const i=arr.indexOf(x);if(i>=0){if(arr.length>min)arr.splice(i,1)}else arr.push(x)};
  const c=el("div","qcfg",'<h2>상세 퀴즈</h2><div class="d">푼 문제 '+st.done+' · 정답률 '+pct(st.ok,st.done)+'% · 문제은행 '+poolSize(QCFG)+'</div>');
  c.appendChild(el("div","lab","종류"));
  c.appendChild(chipRow([["word","단어"],["kanji","한자"],["gram","문법"]],x=>QCFG.kinds.indexOf(x)>=0,x=>{togg(QCFG.kinds,x,1);save()}));
  c.appendChild(el("div","lab","레슨"));
  c.appendChild(chipRow([[0,"전체"]].concat(LESSONS.map(l=>[l,L2(l)])),x=>x===0?!QCFG.lessons.length:QCFG.lessons.indexOf(x)>=0,x=>{if(x===0)QCFG.lessons=[];else togg(QCFG.lessons,x,0);save()}));
  if(QCFG.kinds.indexOf("word")>=0){c.appendChild(el("div","lab","단어 문제 유형"));
    c.appendChild(chipRow([["mean","뜻 고르기"],["read","읽기 고르기"],["jp","일본어 고르기"]],x=>QCFG.wtypes.indexOf(x)>=0,x=>{togg(QCFG.wtypes,x,1);save()}))}
  if(QCFG.kinds.indexOf("kanji")>=0){c.appendChild(el("div","lab","한자 문제 유형"));
    c.appendChild(chipRow([["read","읽기"],["mean","뜻"]],x=>QCFG.ktypes.indexOf(x)>=0,x=>{togg(QCFG.ktypes,x,1);save()}))}
  c.appendChild(el("div","lab","문항 수"));
  c.appendChild(chipRow([[10,"10"],[20,"20"],[30,"30"],[50,"50"],[0,"전부"]],x=>x===QCFG.count,x=>{QCFG.count=x;save()}));
  const wo=el("label","sw",'<span>틀린 문제만 ('+Object.keys(wrong).length+')</span><span class="tg'+(QCFG.wrongOnly?" on":"")+'"></span>');
  wo.onclick=()=>{QCFG.wrongOnly=!QCFG.wrongOnly;save()};c.appendChild(wo);
  const b=el("button","bigbtn","바로 시작");b.style.marginTop="18px";c.appendChild(b);v.appendChild(c);v.appendChild(host);
  b.onclick=()=>{c.remove();q.remove();const key="best"+(QCFG.lessons.length?QCFG.lessons.join(""):"A")+QCFG.kinds.join("");runQuiz(host,buildPool(QCFG),key,()=>render(),pill)};
  const q=el("div","qcfg",'<h2>빠른 시작</h2>');
  const grid=el("div","qs");
  [["단어 뜻 20",{kinds:["word"],wtypes:["mean"],count:20}],["단어 읽기 20",{kinds:["word"],wtypes:["read"],count:20}],["한자 읽기 20",{kinds:["kanji"],ktypes:["read"],count:20}],["문법 20",{kinds:["gram"],count:20}],["혼합 30",{kinds:["word","kanji","gram"],count:30}],["오답만",{wrongOnly:true,count:0}]].forEach(([lab,o])=>{
    const bb=el("button","btn",lab);bb.onclick=()=>{const cfg=Object.assign({},QCFG_DEF,{lessons:QCFG.lessons},o);c.remove();q.remove();runQuiz(host,buildPool(cfg),"best"+lab,()=>render(),pill)};grid.appendChild(bb)});
  q.appendChild(grid);v.appendChild(q);
  if(Object.keys(wrong).length){
    const wc=el("div","qcfg",'<h2>오답 노트 <span class="muted">'+Object.keys(wrong).length+'개</span></h2>');
    const list=el("div","wl");
    Object.keys(wrong).slice(0,40).forEach(k=>{let t="";if(k[0]==="w"){const x=VOCAB[parseInt(k.slice(1))];t=x[0]+" "+x[1]+" · "+x[2]}else if(k[0]==="k"){const x=KANJI[parseInt(k.slice(1))];t=x[0]+" "+x[1]+" · "+x[2]}else{const x=QUIZ[parseInt(k.slice(1))];t=x[0].replace(/<[^>]+>/g,"")+" → "+x[1][x[2]]}
      list.appendChild(el("div","wi jp",F(t)+'<span>×'+wrong[k]+'</span>'))});
    wc.appendChild(list);
    const cl=el("button","btn wide","오답 기록 지우기");cl.onclick=()=>{store.set("wrong",{});render()};wc.appendChild(cl);
    v.appendChild(wc);
  }
}

/* ===================== 분석 (탑승권) ===================== */
function renderStats(){
  const v=$("view");const w=el("div","st");
  const st=store.get("qstats",{done:0,ok:0}),qp=pct(st.ok,st.done),b=bests();
  const total=VOCAB.length+KANJI.length,cur=known.size+kknown.size,days=store.get("days",{}),nDays=Object.keys(days).filter(k=>days[k]>0).length;
  const curL=R.lesson,nextGoal=L2(curL);
  w.appendChild(el("div","sh1",'<em>복습 탑승권</em> 발급!<br>밑으로 내려 확인하세요'));
  const tk=el("div","tk");
  tk.innerHTML='<div class="main"><div class="lab">학습 일수</div><div class="val">'+nDays+'일째</div>'+
    '<div class="plane"><i></i>'+ICO.plane+'<i></i></div>'+
    '<div class="goal"><div class="lab">현재 레슨</div><div class="val">'+nextGoal+'</div></div>'+
    '<div class="chipj">✓ 復習</div>'+
    '<div class="meta"><div><span>퀴즈 정답률</span><b>'+qp+'%</b></div><div style="text-align:right"><span>오늘 활동</span><b>'+(days[dkey()]||0)+' / '+DAILY+'</b></div></div>'+
    '<div class="nums"><div><span>현재</span><b>'+cur+'개</b></div>'+ICO.plane+'<div><span>목표</span><b>'+total+'개</b></div></div></div>'+
    '<div class="side"><b>'+APPV.replace("v","")+'</b><span class="vt">BOARDING PASS</span><span class="green"></span></div>';
  w.appendChild(tk);
  const pf=el("div","perf");for(let i=0;i<22;i++)pf.appendChild(el("i"));w.appendChild(pf);
  w.appendChild(el("div","stub",'<div class="gl"></div>'));
  const ld=el("div","ldg",'<button>내리기 ↓</button>');w.appendChild(ld);
  const det=el("div");w.appendChild(det);
  ld.querySelector("button").onclick=()=>det.scrollIntoView({behavior:"smooth",block:"start"});
  const c=card("영역별");
  [["단어 암기",pct(known.size,VOCAB.length),known.size+" / "+VOCAB.length],["한자 확인",pct(kknown.size,KANJI.length),kknown.size+" / "+KANJI.length],["퀴즈 정답률",qp,st.ok+" / "+st.done+" 문제"]].forEach(([t,p,d])=>{
    c.appendChild(el("div","pr",'<div class="prh"><b>'+t+'</b><span>'+d+'</span></div><div class="prb"><i style="width:'+p+'%"></i></div>'))});
  det.appendChild(c);
  const lc=card("레슨별");
  lc.appendChild(el("table","pt",'<tr><th>레슨</th><th>단어</th><th>한자</th><th>최고</th></tr>'+LESSONS.map(l=>{
    const vs=vocabOf(l),ks=kanjiOf(l),kw=vs.filter(([,i])=>known.has(i)).length,kk=ks.filter(([,i])=>kknown.has(i)).length;
    return '<tr><td><b>'+L2(l)+'</b> '+ESC(LSHORT[l]||"")+'</td><td>'+kw+'/'+vs.length+'</td><td>'+kk+'/'+ks.length+'</td><td>'+(b["bestL"+l]||0)+'%</td></tr>'}).join("")));
  det.appendChild(lc);
  const dc=card("최근 14일");
  const g=el("div");g.style.cssText="display:grid;grid-template-columns:repeat(14,1fr);gap:4px;align-items:end;height:70px";
  for(let i=13;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const n=days[dkey(d)]||0;const bar=el("div");bar.title=dkey(d)+" "+n;bar.style.cssText="background:"+(n?"var(--lime)":"#2A2A2E")+";border-radius:3px;height:"+Math.max(6,Math.min(100,n/DAILY*100))+"%";g.appendChild(bar)}
  dc.appendChild(g);det.appendChild(dc);
  const rb=el("button","btn wide","진도 기록 초기화");rb.onclick=()=>{if(!confirm("단어·한자·퀴즈·활동 기록을 모두 지웁니다."))return;known=new Set();kknown=new Set();["known","kknown"].forEach(k=>store.set(k,[]));["bests","wrong","qstats","days","seen"].forEach(k=>store.set(k,{}));render()};
  det.appendChild(rb);
  v.appendChild(w);
}

/* ===================== 노트 ===================== */
function renderNote(){
  const v=$("view");
  v.appendChild(el("div","lt",'<button class="on">노트</button>'));
  const c=card("나의 메모",'<span id="savemsg"></span>');
  const ta=el("textarea");ta.id="mynote";ta.placeholder="수업 중 궁금했던 것, 선생님께 물어볼 것";ta.value=store.get("note","");
  let tmo;ta.addEventListener("input",()=>{clearTimeout(tmo);tmo=setTimeout(()=>{store.set("note",ta.value);$("savemsg").textContent="저장됨";setTimeout(()=>$("savemsg").textContent="",1500)},400)});
  c.appendChild(ta);v.appendChild(c);
  const m=card("내 오답노트 — 반드시 고칠 것");
  m.innerHTML+='<table><tr><th>×</th><th>○</th></tr>'+
    [["海に泳ぎます","海で泳ぎます","동작 장소 = で"],["なにもしなくないです","なにもしたくないです","たい의 부정 = たくない"],["ボールトスします","ボールをトスします","목적어 を"],["市外に行きたい","郊外（こうがい）に行きたい","市外는 회화에서 잘 안 씀"],["緑い ズボン","緑の ズボン","緑·紫·水色는 명사 → の"],["暑い 服","厚い 服","あつい 동음"],["よんがつ・にじゅうにち","しがつ・はつか","특수 읽기"],["いいそうです (추측)","よさそうです","いいそう는 전문"]]
    .map(r=>'<tr><td class="jp"><span class="no">'+r[0]+'</span></td><td class="jp"><span class="ok">'+F(r[1])+'</span><br><span class="muted">'+r[2]+'</span></td></tr>').join("")+'</table>';
  v.appendChild(m);
  const a=card("선생님께 물어볼 것");
  a.innerHTML+='<table><tr><td class="jp">紅茶が 好きです ・ 紅茶を 好きです</td><td>어느 쪽?<br><span class="muted">정답: が</span></td></tr><tr><td class="jp">どっち ・ どちら ・ どれ</td><td>실제로 언제 무엇을 쓰는지</td></tr><tr><td class="jp">迷う ・ 失くす</td><td>둘 다 "잃다"인데 차이는?</td></tr><tr><td class="jp">美容院 ・ 美容室</td><td>뉘앙스 차이</td></tr></table>';
  v.appendChild(a);
}

/* ===================== 설정 ===================== */
const PALETTES=[["mono","墨 모노","#111113","#F7F7F8"],["sumi","朱 주홍","#C9463D","#F6F2EA"],["indigo","藍 인디고","#2F56C8","#F4F5F7"],["teal","海 청록","#0F766E","#F2F6F6"],["amber","夜 호박","#B86E00","#F3F3F2"],["forest","森 숲","#2F6B4F","#F3F5F0"],["sakura","桜 벚꽃","#D2497A","#FAF4F6"],["murasaki","紫 보라","#6B4FC9","#F5F4F8"],["matcha","抹茶 말차","#5F7F2A","#F6F6EC"],["sepia","栗 세피아","#8A5A2B","#F5EFE6"],["sora","空 하늘","#0E7FC0","#F1F6FA"],["peach","桃 복숭아","#F7C4B4","#FBF5F1","pastel"],["rose","薄紅 연분홍","#F4BFCF","#FBF4F7","pastel"],["lavender","藤 라벤더","#CFC4F0","#F7F5FB","pastel"],["mint","薄荷 민트","#B8E3D6","#F2F9F6","pastel"],["mizu","水色 하늘색","#BBD8F2","#F3F7FB","pastel"],["butter","卵 버터","#F6E3A6","#FBF8EF","pastel"]];
const MODES=[["auto","자동"],["light","밝게"],["dark","어둡게"]];
let theme=store.get("theme","auto"),palette=store.get("palette","mono");
if(!store.get("pal3",false)){palette="mono";store.set("palette","mono");store.set("pal3",true)}
let furi=store.get("furi",true);
function applyT(){
  if(theme==="auto")document.documentElement.removeAttribute("data-theme");else document.documentElement.setAttribute("data-theme",theme);
  document.documentElement.setAttribute("data-palette",palette);
  document.body.classList.toggle("nofuri",!furi);
  const pl=PALETTES.find(x=>x[0]===palette)||PALETTES[0];
  const dark=theme==="dark"||(theme==="auto"&&window.matchMedia("(prefers-color-scheme: dark)").matches);
  const tc=document.querySelector('meta[name="theme-color"]');if(tc)tc.setAttribute("content",R.pg==="stats"?"#000000":dark?"#0B0B0C":pl[3]);
}
function renderSet(){
  const v=$("view");
  v.appendChild(el("div","lt",'<button class="on">설정</button>'));
  v.appendChild(el("div","sect","화면"));
  const r1=el("div","rows");
  const th=el("div","srow",'<div>밝기</div>');const sg=el("div","segc");MODES.forEach(([k,lab])=>{const b=el("button",theme===k?"on":"",lab);b.onclick=()=>{theme=k;store.set("theme",k);applyT();render()};sg.appendChild(b)});sg.style.flex="1";sg.style.maxWidth="230px";th.appendChild(sg);r1.appendChild(th);
  const fr=el("button","srow",'<div>ふりがな 표시<span class="d">한자 위 읽기</span></div><span class="tg'+(furi?" on":"")+'"></span>');fr.onclick=()=>{furi=!furi;store.set("furi",furi);applyT();render()};r1.appendChild(fr);
  const pk=el("button","srow",'<div>플래시카드 뜻 가리기<span class="d">탭하면 뜻·예문이 보입니다</span></div><span class="tg'+(peek?" on":"")+'"></span>');pk.onclick=()=>{peek=!peek;store.set("peek",peek);render()};r1.appendChild(pk);
  v.appendChild(r1);
  v.appendChild(el("div","sect","색상"));
  const r2=el("div","rows");const pw=el("div","pal");let grp="";
  PALETTES.forEach(([k,lab,ac,,g])=>{const gg=g||"basic";if(gg!==grp){grp=gg;pw.appendChild(el("div","grp",gg==="pastel"?"파스텔":"기본"))}const b=el("button",palette===k?"on":"",'<i style="background:'+ac+'"></i>'+lab);b.onclick=()=>{palette=k;store.set("palette",k);applyT();render()};pw.appendChild(b)});
  r2.appendChild(pw);v.appendChild(r2);
  v.appendChild(el("div","sect","데이터"));
  const r3=el("div","rows");
  const ex=el("button","srow",'<div>학습 기록 내보내기<span class="d">클립보드에 JSON 복사</span></div><span class="v">›</span>');ex.onclick=()=>{const o={};["known","kknown","bests","wrong","qstats","days","note","seen"].forEach(k=>o[k]=store.get(k,null));navigator.clipboard&&navigator.clipboard.writeText(JSON.stringify(o)).then(()=>alert("복사했습니다."),()=>alert("복사할 수 없습니다."))};r3.appendChild(ex);
  const rs=el("button","srow danger",'<div>진도 기록 초기화</div><span class="v">›</span>');rs.onclick=()=>{if(!confirm("단어·한자·퀴즈·활동 기록을 모두 지웁니다."))return;known=new Set();kknown=new Set();["known","kknown"].forEach(k=>store.set(k,[]));["bests","wrong","qstats","days","seen"].forEach(k=>store.set(k,{}));render()};r3.appendChild(rs);
  v.appendChild(r3);
  v.appendChild(el("div","sect","정보"));
  const r4=el("div","rows");
  r4.appendChild(el("div","srow",'<div>日本語 復習ノート</div><span class="v">'+APPV+'</span>'));
  r4.appendChild(el("div","srow",'<div>콘텐츠</div><span class="v">레슨 '+LESSONS.length+' · 단어 '+VOCAB.length+' · 한자 '+KANJI.length+' · 자료 '+SHEETS.length+'장</span>'));
  r4.appendChild(el("div","srow",'<div>홈 화면에 추가</div><span class="v">공유 → 홈 화면에 추가</span>'));
  v.appendChild(r4);
}

/* ===================== 렌더 ===================== */
function render(){
  const v=$("view");v.innerHTML="";closeSheet();
  const sub=["flash","quiz","sec","ldetail"].indexOf(R.pg)>=0;
  document.body.classList.toggle("sub",sub);
  document.body.setAttribute("data-pg",R.pg);
  ({home:renderHome,lib:renderLib,ldetail:renderLessonDetail,sec:renderSection,flash:renderFlash,quiz:renderQuizPage,stats:renderStats,note:renderNote,set:renderSet})[R.pg]();
  const tabOf={home:"home",lib:"lib",ldetail:"lib",sec:"lib",flash:"home",quiz:"home",stats:"stats",note:"note",set:"set"}[R.pg];
  document.querySelectorAll(".tab,.ava").forEach(t=>t.classList.toggle("on",t.dataset.p===tabOf));
  applyT();window.scrollTo({top:0});
}
document.querySelectorAll(".tab,.ava").forEach(t=>t.onclick=()=>go(t.dataset.p));
$("vclose").onclick=closeViewer;$("vprev").onclick=()=>stepSheet(-1);$("vnext").onclick=()=>stepSheet(1);
$("vzoom").onclick=()=>{VZ=!VZ;showSheet()};$("vimg").onclick=()=>{VZ=!VZ;showSheet()};
$("vbody").addEventListener("click",e=>{if(e.target===e.currentTarget)closeViewer()});
document.addEventListener("keydown",e=>{if(!$("viewer").classList.contains("on"))return;if(e.key==="Escape")closeViewer();else if(e.key==="ArrowLeft")stepSheet(-1);else if(e.key==="ArrowRight")stepSheet(1)});
(function(){let x0=null,y0=null;const b=$("vbody");
  b.addEventListener("touchstart",e=>{if(e.touches.length!==1)return;x0=e.touches[0].clientX;y0=e.touches[0].clientY},{passive:true});
  b.addEventListener("touchend",e=>{if(x0===null||VZ)return;const t=e.changedTouches[0],dx=t.clientX-x0,dy=t.clientY-y0;if(Math.abs(dx)>52&&Math.abs(dx)>Math.abs(dy)*1.6)stepSheet(dx<0?1:-1);x0=null},{passive:true});})();
route();
setTimeout(()=>{const s=$("splash");s.classList.add("off");setTimeout(()=>s.remove(),450)},650);

/* ===================== PWA ===================== */
(function(){
  let waiting=null,REG=null;
  if("serviceWorker" in navigator&&location.protocol.indexOf("http")===0){
    window.addEventListener("load",()=>{navigator.serviceWorker.register("sw.js").then(reg=>{REG=reg;
      const watch=sw=>{if(!sw)return;sw.addEventListener("statechange",()=>{if(sw.state==="installed"&&navigator.serviceWorker.controller){waiting=sw;$("pwa-update").classList.add("on")}})};
      if(reg.waiting&&navigator.serviceWorker.controller){waiting=reg.waiting;$("pwa-update").classList.add("on")}
      watch(reg.installing);reg.addEventListener("updatefound",()=>watch(reg.installing))}).catch(()=>{})});
    const check=()=>{try{if(REG)REG.update()}catch(e){}};
    document.addEventListener("visibilitychange",()=>{if(!document.hidden)check()});window.addEventListener("focus",check);
    window.addEventListener("pageshow",e=>{if(e.persisted)check()});setInterval(check,30*60*1000);
    let reloading=false;navigator.serviceWorker.addEventListener("controllerchange",()=>{if(reloading)return;reloading=true;location.reload()});
  }
  $("pwa-reload").onclick=()=>{if(waiting)waiting.postMessage("skipWaiting");else location.reload()};
  let deferred=null;const standalone=window.matchMedia("(display-mode: standalone)").matches||navigator.standalone===true;
  let dismissed=false;try{dismissed=localStorage.getItem("jpn:a2hs")==="1"}catch(e){}
  const showInstall=txt=>{if(standalone||dismissed)return;if($("pwa-update").classList.contains("on"))return;if(txt)$("pwa-how").textContent=txt;$("pwa-install").classList.add("on")};
  const hideInstall=()=>{$("pwa-install").classList.remove("on");try{localStorage.setItem("jpn:a2hs","1")}catch(e){}};
  window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferred=e;showInstall()});
  window.addEventListener("appinstalled",()=>{hideInstall();deferred=null});
  $("pwa-go").onclick=()=>{if(deferred){deferred.prompt();deferred.userChoice.then(()=>{deferred=null;hideInstall()})}else hideInstall()};
  $("pwa-x").onclick=hideInstall;
  const iOS=/iP(hone|ad|od)/.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
  if(iOS&&!standalone)setTimeout(()=>showInstall("공유 → “홈 화면에 추가”"),2500);
  const net=()=>$("offline").classList.toggle("on",!navigator.onLine);window.addEventListener("online",net);window.addEventListener("offline",net);net();
})();
