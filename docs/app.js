/* 日本語 復習ノート — 실용형 레이아웃
   학습(과 → 섹션 탭) · 퀴즈 센터(자동 생성) · 진도 · 노트 */
const $=id=>document.getElementById(id);
const store={get(k,d){try{const v=localStorage.getItem("jpn:"+k);return v===null?d:JSON.parse(v)}catch(e){return d}},
             set(k,v){try{localStorage.setItem("jpn:"+k,JSON.stringify(v))}catch(e){}}};
const ESC=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const F=s=>String(s).replace(/([0-9０-９,]*[一-龯々〆%]+)（([ぁ-ゖー・ァ-ヶ]+)）/g,"<ruby>$1<rt>$2</rt></ruby>");
const SH=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const el=(tag,cls,html)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e};
const SFILE=s=>"l"+s.l+"-"+(s.p<10?"0"+s.p:s.p);
const KLABEL={gram:"문법",word:"단어",kanji:"한자",talk:"회화",sum:"정리"};
const LESSONS=GRAM.map(g=>g.l);
const LSHORT={1:"희망·계획",2:"비교·순위",3:"날짜·색·옷",4:"희망·주문·부탁",5:"추측·날짜·거리"};
const SECS=[["gram","문법"],["word","단어"],["kanji","한자"],["talk","회화"],["sheets","자료"],["quiz","퀴즈"]];

let known=new Set(store.get("known",[])),kknown=new Set(store.get("kknown",[]));
const lessonOf=l=>GRAM.find(g=>g.l===l);
const vocabOf=l=>VOCAB.map((v,i)=>[v,i]).filter(([v])=>!l||v[5]===l);
const kanjiOf=l=>KANJI.map((k,i)=>[k,i]).filter(([k])=>!l||k[4]===l);
const sheetsOf=(k,l)=>SHEETS.filter(s=>(!k||s.k===k)&&(!l||s.l===l));
const bests=()=>store.get("bests",{});

/* ===================== 라우팅 ===================== */
let R={tab:"lesson",lesson:store.get("lesson",LESSONS[0]),sec:store.get("sec","gram")};
function go(h){if(location.hash.slice(1)===h)route();else location.hash=h}
function route(){
  const h=decodeURIComponent(location.hash.slice(1));
  const p=h.split("/");
  if(p[0]==="quiz"||p[0]==="review"){R.tab="quiz"}
  else if(p[0]==="prog"){R.tab="prog"}
  else if(p[0]==="note"){R.tab="note"}
  else{
    R.tab="lesson";
    const l=parseInt((p[0]||"").replace("l",""),10);
    if(LESSONS.indexOf(l)>=0)R.lesson=l;
    if(SECS.some(s=>s[0]===p[1]))R.sec=p[1];
    store.set("lesson",R.lesson);store.set("sec",R.sec);
  }
  render();
}
window.addEventListener("hashchange",route);

/* ===================== 공통 ===================== */
function chips(items,isOn,fn,cls){
  const w=el("div","chips"+(cls?" "+cls:""));
  items.forEach(it=>{const b=el("button","chip"+(isOn(it[0])?" on":""),it[1]);b.type="button";b.onclick=()=>fn(it[0]);w.appendChild(b)});
  return w;
}
function card(title,meta){const c=el("div","card");if(title)c.appendChild(el("div","ch",'<b>'+title+'</b>'+(meta?'<span>'+meta+'</span>':'')));return c}

/* ===================== 자료 ===================== */
function sheetGrid(list,showL){
  const g=el("div","sh");
  list.forEach((s,i)=>{
    const b=el("button","shi");b.type="button";b.setAttribute("aria-label","LESSON 0"+s.l+" "+s.p+"페이지 — "+s.t);
    b.innerHTML='<span class="im"><img src="sheets/thumb/'+SFILE(s)+'.webp" alt="" loading="lazy" decoding="async"><span class="pg">'+(showL?"L"+s.l+"·":"")+s.p+'</span></span><span class="cap">'+ESC(s.t)+'</span>';
    b.onclick=()=>openViewer(list,i);g.appendChild(b);
  });
  return g;
}
let VL=[],VI=0,VZ=false;
function openViewer(list,i){VL=list;VI=i;VZ=false;$("viewer").classList.add("on");document.body.style.overflow="hidden";showSheet()}
function showSheet(){
  const s=VL[VI];$("vimg").src="sheets/"+SFILE(s)+".webp";$("vimg").alt=s.t;
  $("vttl").textContent=s.t;$("vsub").textContent="L0"+s.l+" · "+KLABEL[s.k]+" · "+s.p+"/10";
  $("vcnt").textContent=(VI+1)+" / "+VL.length;$("vprev").disabled=VI===0;$("vnext").disabled=VI===VL.length-1;
  const b=$("vbody");b.classList.toggle("zoom",VZ);b.scrollTop=0;b.scrollLeft=VZ?b.scrollWidth/2-b.clientWidth/2:0;
  $("vzoom").textContent=VZ?"축소":"확대";
}
function closeViewer(){$("viewer").classList.remove("on");document.body.style.overflow="";$("vimg").removeAttribute("src")}
function stepSheet(d){const n=VI+d;if(n<0||n>=VL.length)return;VI=n;VZ=false;showSheet()}

/* ===================== 학습 탭 ===================== */
function renderLesson(){
  const v=$("view"),l=R.lesson;
  // 과 선택 + 섹션 탭 (고정)
  const top=el("div","stick");
  top.appendChild(chips(LESSONS.map(x=>[x,'<b>'+x+'</b>'+ESC(LSHORT[x]||"")]),x=>x===l,x=>go("l"+x+"/"+R.sec),"lchips"));
  top.appendChild(chips(SECS,x=>x===R.sec,x=>go("l"+l+"/"+x),"stabs"));
  v.appendChild(top);
  ({gram:renderGram,word:renderWord,kanji:renderKanji,talk:renderTalk,sheets:renderSheets,quiz:renderLessonQuiz})[R.sec]();
}
function lessonHead(sub){
  const g=lessonOf(R.lesson);
  return el("div","lhead",'<b>LESSON 0'+R.lesson+' · '+ESC(g.title)+'</b><span>'+sub+'</span>');
}

/* --- 문법 --- */
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
  const v=$("view"),g=lessonOf(R.lesson);
  v.appendChild(lessonHead("문법 "+g.items.length+"가지"));
  const sh=sheetsOf("gram",R.lesson);
  if(sh.length){const c=card("문법 자료",sh.length+"장");c.appendChild(sheetGrid(sh));v.appendChild(c)}
  g.items.forEach(it=>v.appendChild(gramCard(it)));
}

/* --- 단어 --- */
let wmode=store.get("wmode","list"),wcat="전체",deck=[],di=0;
function toggleKnown(i){if(known.has(i))known.delete(i);else known.add(i);store.set("known",[...known]);updStats()}
function vocabRows(pairs,host){
  let cur=null,c=null;
  pairs.forEach(([v,i])=>{
    if(v[6]!==cur){cur=v[6];c=card(ESC(cur),pairs.filter(([x])=>x[6]===cur).length+"개");host.appendChild(c)}
    const r=el("div","vrow"+(known.has(i)?" kn":""));
    r.innerHTML='<div class="vm"><div class="vw jp">'+ESC(v[0])+'<span class="vr">'+ESC(v[1])+'</span></div><div class="vk">'+ESC(v[2])+'</div>'+
      '<div class="vex jp">'+F(v[3])+'<span>'+ESC(v[4])+'</span></div></div><button class="kb" type="button" aria-label="외움 표시">✓</button>';
    r.querySelector(".vm").onclick=()=>r.classList.toggle("open");
    r.querySelector(".kb").onclick=e=>{e.stopPropagation();toggleKnown(i);r.classList.toggle("kn",known.has(i))};
    c.appendChild(r);
  });
}
function flashcards(pairs,host){
  deck=SH(pairs.map(([,i])=>i));di=0;
  const c=el("div","fcwrap");
  c.innerHTML='<button class="fc" id="fc" type="button"><div class="fc-inner"><div class="face front"><span class="cnt" id="fc-cnt"></span><div class="em" id="fc-em"></div><div class="big jp" id="fc-front"></div><div class="hint">탭하면 뒤집힙니다</div></div>'+
    '<div class="face back"><div class="mid jp" id="fc-read"></div><div class="mid" id="fc-mean"></div><div class="note jp" id="fc-ex"></div></div></div></button>'+
    '<div class="row"><button class="btn" id="fc-again">다시</button><button class="btn p" id="fc-know">알아요 ✓</button></div>';
  host.appendChild(c);
  const show=()=>{const fc=$("fc");fc.classList.remove("flip");
    if(di>=deck.length){$("fc-em").textContent="🎉";$("fc-front").textContent="완료";$("fc-cnt").textContent="";$("fc-read").textContent="お疲れさま";$("fc-mean").textContent="수고하셨습니다";$("fc-ex").textContent="";return}
    const v=VOCAB[deck[di]];$("fc-cnt").textContent=(di+1)+"/"+deck.length;$("fc-em").textContent=v[7];$("fc-front").textContent=v[0];
    $("fc-read").textContent=v[1];$("fc-mean").textContent=v[2];$("fc-ex").innerHTML=F(v[3])};
  $("fc").onclick=()=>$("fc").classList.toggle("flip");
  $("fc-know").onclick=()=>{if(di<deck.length){known.add(deck[di]);store.set("known",[...known]);di++;show();updStats()}};
  $("fc-again").onclick=()=>{if(di<deck.length){deck.push(deck[di]);di++;show()}};
  show();
}
function wordView(pairs,host){
  const cats=[...new Set(pairs.map(([v])=>v[6]))];
  if(wcat!=="전체"&&cats.indexOf(wcat)<0)wcat="전체";
  const bar=el("div","bar2");
  bar.appendChild(chips([["list","목록"],["card","카드"]],x=>x===wmode,m=>{wmode=m;store.set("wmode",m);render()},"mini"));
  const kw=pairs.filter(([,i])=>known.has(i)).length;
  bar.appendChild(el("span","meta",kw+" / "+pairs.length+" 외움"));
  host.appendChild(bar);
  host.appendChild(chips([["전체","전체 "+pairs.length]].concat(cats.map(c=>[c,c.replace(/^L\d /,"")+" "+pairs.filter(([v])=>v[6]===c).length])),x=>x===wcat,x=>{wcat=x;render()},"scroll"));
  const cur=pairs.filter(([v])=>wcat==="전체"||v[6]===wcat);
  if(wmode==="list")vocabRows(cur,host);else flashcards(cur,host);
}
function renderWord(){
  const v=$("view"),pairs=vocabOf(R.lesson);
  v.appendChild(lessonHead("단어 "+pairs.length+"개"));
  const sh=sheetsOf("word",R.lesson);
  if(sh.length){const c=card("단어 자료",sh.length+"장");c.appendChild(sheetGrid(sh));v.appendChild(c)}
  wordView(pairs,v);
}

/* --- 한자 --- */
function kanjiGrid(pairs,host){
  const c=card("한자 "+pairs.length+"자","탭: 가리기 · ✓: 확인 표시");
  const g=el("div","kg");
  pairs.forEach(([k,i])=>{
    const d=el("div","kt"+(kknown.has(i)?" kn":""));
    d.innerHTML='<button class="kk" type="button" aria-label="확인 표시">✓</button><div class="k jp">'+ESC(k[0])+'</div><div class="r jp">'+ESC(k[1])+'</div><div class="m">'+ESC(k[2])+'</div><div class="kx jp">'+ESC(k[3])+'</div>';
    d.onclick=()=>d.classList.toggle("hide");
    d.querySelector(".kk").onclick=e=>{e.stopPropagation();if(kknown.has(i))kknown.delete(i);else kknown.add(i);store.set("kknown",[...kknown]);d.classList.toggle("kn",kknown.has(i));updStats()};
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
  v.appendChild(lessonHead("한자 "+pairs.length+"자"));
  const sh=sheetsOf("kanji",R.lesson);
  if(sh.length){const c=card("한자 자료",sh.length+"장");c.appendChild(sheetGrid(sh));v.appendChild(c)}
  kanjiGrid(pairs,v);
}

/* --- 회화 --- */
function renderTalk(){
  const v=$("view"),l=R.lesson,ds=DLGS.filter(d=>d.l===l),sp=SPEAK.filter(s=>s[2]===l);
  v.appendChild(lessonHead("대화 "+ds.length+" · 말하기 "+sp.length));
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

/* --- 자료 --- */
function renderSheets(){
  const v=$("view"),list=sheetsOf(0,R.lesson);
  v.appendChild(lessonHead("원본 자료 "+list.length+"장"));
  const c=card("LESSON 0"+R.lesson,"탭하면 크게 · 좌우로 넘기기");c.appendChild(sheetGrid(list));v.appendChild(c);
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
  return mkQ("「"+v[0]+"」의 뜻은?",v[2],distract(VOCAB,i,2,T,3),v[0]+"（"+v[1]+"） "+v[2],v[5],"단어 뜻","w"+i+"m");
}
function kanjiQ(i,type){
  const k=KANJI[i],T=tiers(KANJI,i,x=>x[4]===k[4],x=>true);
  if(type==="mean")return mkQ("「"+k[0]+"」의 뜻은?",k[2],distract(KANJI,i,2,T,3),k[0]+" "+k[1]+" · "+k[2]+" — "+k[3],k[4],"한자 뜻","k"+i+"m");
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
  const wrong=store.get("wrong",{}),inL=l=>!cfg.lessons.length||cfg.lessons.indexOf(l)>=0;
  let items=[];
  if(cfg.kinds.indexOf("word")>=0)VOCAB.forEach((v,i)=>{if(!inL(v[5]))return;(cfg.wtypes.length?cfg.wtypes:["mean"]).forEach(t=>{const q=wordQ(i,t);if(q)items.push(q)})});
  if(cfg.kinds.indexOf("kanji")>=0)KANJI.forEach((k,i)=>{if(!inL(k[4]))return;(cfg.ktypes.length?cfg.ktypes:["read"]).forEach(t=>items.push(kanjiQ(i,t)))});
  if(cfg.kinds.indexOf("gram")>=0)QUIZ.forEach((q,i)=>{if(inL(q[4]))items.push(gramQ(i))});
  if(cfg.wrongOnly)items=items.filter(x=>wrong[x.key]);
  items=SH(items);
  // 오답 우선 → 같은 항목은 한 문제만 → 남으면 채움
  const w=items.filter(x=>wrong[x.key]),rest=items.filter(x=>!wrong[x.key]);
  const seen=new Set(),first=[],later=[];
  w.concat(rest).forEach(x=>{if(seen.has(x.base))later.push(x);else{seen.add(x.base);first.push(x)}});
  let out=first.concat(later);
  if(cfg.count>0)out=out.slice(0,cfg.count);
  return SH(out);
}

/* ===================== 퀴즈 러너 ===================== */
let QO=[],QI=0,QS=0,QA=false,QKEY="",QWRONG=[];
function runQuiz(host,pool,key,onDone){
  QO=pool.slice();QI=0;QS=0;QA=false;QKEY=key;QWRONG=[];
  if(!QO.length){host.appendChild(el("div","card",'<p class="muted">조건에 맞는 문제가 없습니다.</p>'));return}
  const box=el("div","card quiz");
  box.innerHTML='<div class="qbar"><i id="qb"></i></div><div class="qn"><span id="qn"></span><span class="qtype" id="qty"></span></div>'+
    '<div class="qt jp" id="qt"></div><div class="opts" id="qo"></div><div class="fb" id="qf"></div><button class="btn p wide" id="qnext" style="display:none">다음</button>';
  const done=el("div","card qdone");done.style.display="none";
  host.appendChild(box);host.appendChild(done);
  const show=()=>{
    QA=false;$("qf").className="fb";$("qnext").style.display="none";
    $("qb").style.width=Math.round(QI/QO.length*100)+"%";
    const q=QO[QI];$("qn").textContent=(QI+1)+" / "+QO.length+" · "+q.l+"과";$("qty").textContent=q.type;$("qt").innerHTML=F(q.q);
    const b=$("qo");b.innerHTML="";
    q.opts.forEach((o,oi)=>{const btn=el("button","opt jp",F(o));btn.type="button";
      btn.onclick=()=>{if(QA)return;QA=true;const ok=oi===q.ans;
        b.querySelectorAll(".opt").forEach((x,xi)=>{if(xi===q.ans)x.classList.add("c")});
        const wrong=store.get("wrong",{});
        if(!ok){btn.classList.add("w");QWRONG.push(q);wrong[q.key]=(wrong[q.key]||0)+1;if(QO.length<60)QO.push(q)}
        else{QS++;if(wrong[q.key]){wrong[q.key]--;if(wrong[q.key]<=0)delete wrong[q.key]}}
        store.set("wrong",wrong);
        const st=store.get("qstats",{done:0,ok:0});st.done++;if(ok)st.ok++;store.set("qstats",st);
        const f=$("qf");f.className="fb on "+(ok?"g":"b");f.innerHTML=(ok?"정답 · ":"오답 · ")+F(q.expl);
        $("qnext").style.display="block"};
      b.appendChild(btn)});
  };
  $("qnext").onclick=()=>{QI++;if(QI>=QO.length)end();else show()};
  const end=()=>{
    box.style.display="none";done.style.display="block";
    const pct=Math.round(QS/QO.length*100);
    const bs=bests();if(pct>(bs[QKEY]||0)){bs[QKEY]=pct;store.set("bests",bs)}
    const uniq=[];const seen=new Set();QWRONG.forEach(q=>{if(!seen.has(q.key)){seen.add(q.key);uniq.push(q)}});
    done.innerHTML='<div class="score"><b>'+pct+'%</b><span>'+QS+' / '+QO.length+' 정답 · 최고 '+(bs[QKEY]||pct)+'%</span></div>'+
      (uniq.length?'<h3>틀린 문제 '+uniq.length+'</h3>'+uniq.map(q=>'<div class="ex"><div class="j jp">'+F(q.q)+'</div><div class="k jp">'+F(q.opts[q.ans])+' — '+F(q.expl)+'</div></div>').join(""):'<p class="ok">전부 맞혔습니다.</p>')+
      '<div class="row"><button class="btn" id="qagain">다시</button>'+(uniq.length?'<button class="btn p" id="qwrong">틀린 것만 다시</button>':'')+'</div>';
    $("qagain").onclick=()=>{host.innerHTML="";onDone&&onDone();};
    if(uniq.length)$("qwrong").onclick=()=>{host.innerHTML="";runQuiz(host,SH(uniq),QKEY,onDone)};
    updStats();
  };
  show();
}

/* --- 과 안의 퀴즈 --- */
let LQ={kinds:["word","kanji","gram"],count:20};
function renderLessonQuiz(){
  const v=$("view"),l=R.lesson;
  v.appendChild(lessonHead("이 과 퀴즈"));
  const cfg=Object.assign({},QCFG_DEF,{lessons:[l],kinds:LQ.kinds,count:LQ.count});
  const c=card("문제 구성",poolSize(cfg)+"문제 중 "+LQ.count+"문제");
  c.appendChild(chips([["word","단어"],["kanji","한자"],["gram","문법"]],x=>LQ.kinds.indexOf(x)>=0,x=>{const i=LQ.kinds.indexOf(x);if(i>=0){if(LQ.kinds.length>1)LQ.kinds.splice(i,1)}else LQ.kinds.push(x);render()},"mini"));
  c.appendChild(chips([[10,"10"],[20,"20"],[30,"30"],[50,"50"]],x=>x===LQ.count,x=>{LQ.count=x;render()},"mini"));
  const b=el("button","btn p wide","시작");b.onclick=()=>{host.innerHTML="";runQuiz(host,buildPool(cfg),"bestL"+l,()=>render())};
  c.appendChild(b);v.appendChild(c);
  const host=el("div");v.appendChild(host);
  const bs=bests();if(bs["bestL"+l])v.appendChild(el("p","muted","이 과 최고 기록 "+bs["bestL"+l]+"%"));
}

/* ===================== 퀴즈 센터 ===================== */
function renderQuizCenter(){
  const v=$("view");
  const wrong=store.get("wrong",{}),st=store.get("qstats",{done:0,ok:0});
  v.appendChild(el("div","lhead",'<b>퀴즈</b><span>푼 문제 '+st.done+' · 정답률 '+(st.done?Math.round(st.ok/st.done*100):0)+'% · 남은 오답 '+Object.keys(wrong).length+'</span>'));
  const save=()=>{store.set("qcfg",QCFG);render()};
  const togg=(arr,x,min)=>{const i=arr.indexOf(x);if(i>=0){if(arr.length>min)arr.splice(i,1)}else arr.push(x)};
  const c=card("문제 구성","문제은행 "+poolSize(QCFG)+"문제");
  c.appendChild(el("div","lab","종류"));
  c.appendChild(chips([["word","단어"],["kanji","한자"],["gram","문법"]],x=>QCFG.kinds.indexOf(x)>=0,x=>{togg(QCFG.kinds,x,1);save()},"mini"));
  c.appendChild(el("div","lab","과"));
  c.appendChild(chips([[0,"전체"]].concat(LESSONS.map(l=>[l,l+"과"])),x=>x===0?!QCFG.lessons.length:QCFG.lessons.indexOf(x)>=0,x=>{if(x===0)QCFG.lessons=[];else togg(QCFG.lessons,x,0);save()},"mini"));
  if(QCFG.kinds.indexOf("word")>=0){c.appendChild(el("div","lab","단어 문제 유형"));
    c.appendChild(chips([["mean","뜻 고르기"],["read","읽기 고르기"],["jp","일본어 고르기"]],x=>QCFG.wtypes.indexOf(x)>=0,x=>{togg(QCFG.wtypes,x,1);save()},"mini"))}
  if(QCFG.kinds.indexOf("kanji")>=0){c.appendChild(el("div","lab","한자 문제 유형"));
    c.appendChild(chips([["read","읽기"],["mean","뜻"]],x=>QCFG.ktypes.indexOf(x)>=0,x=>{togg(QCFG.ktypes,x,1);save()},"mini"))}
  c.appendChild(el("div","lab","문항 수"));
  c.appendChild(chips([[10,"10"],[20,"20"],[30,"30"],[50,"50"],[0,"전부"]],x=>x===QCFG.count,x=>{QCFG.count=x;save()},"mini"));
  const wo=el("label","sw",'<input type="checkbox" '+(QCFG.wrongOnly?"checked":"")+'> 틀린 문제만 ('+Object.keys(wrong).length+')');
  wo.querySelector("input").onchange=e=>{QCFG.wrongOnly=e.target.checked;save()};c.appendChild(wo);
  const b=el("button","btn p wide","시작");c.appendChild(b);v.appendChild(c);
  const host=el("div");v.appendChild(host);
  b.onclick=()=>{host.innerHTML="";const key="best"+(QCFG.lessons.length?QCFG.lessons.join(""):"A")+QCFG.kinds.join("");runQuiz(host,buildPool(QCFG),key,()=>render());window.scrollTo({top:host.offsetTop-60})};
  // 빠른 시작
  const q=card("빠른 시작");
  const grid=el("div","qs");
  [["단어 뜻 20",{kinds:["word"],wtypes:["mean"],count:20}],["단어 읽기 20",{kinds:["word"],wtypes:["read"],count:20}],["한자 읽기 20",{kinds:["kanji"],ktypes:["read"],count:20}],["문법 20",{kinds:["gram"],count:20}],["혼합 30",{kinds:["word","kanji","gram"],count:30}],["오답만",{wrongOnly:true,count:0}]].forEach(([lab,o])=>{
    const bb=el("button","btn",lab);bb.onclick=()=>{const cfg=Object.assign({},QCFG_DEF,{lessons:QCFG.lessons},o);host.innerHTML="";runQuiz(host,buildPool(cfg),"best"+lab,()=>render());window.scrollTo({top:host.offsetTop-60})};grid.appendChild(bb)});
  q.appendChild(grid);v.appendChild(q);
  if(Object.keys(wrong).length){
    const wc=card("오답 노트",Object.keys(wrong).length+"개");
    const list=el("div","wl");
    Object.keys(wrong).slice(0,40).forEach(k=>{let t="";if(k[0]==="w"){const v=VOCAB[parseInt(k.slice(1))];t=v[0]+" "+v[1]+" · "+v[2]}else if(k[0]==="k"){const x=KANJI[parseInt(k.slice(1))];t=x[0]+" "+x[1]+" · "+x[2]}else{const q=QUIZ[parseInt(k.slice(1))];t=q[0].replace(/<[^>]+>/g,"")+" → "+q[1][q[2]]}
      list.appendChild(el("div","wi jp",F(t)+'<span>×'+wrong[k]+'</span>'))});
    wc.appendChild(list);
    const cl=el("button","btn","오답 기록 지우기");cl.onclick=()=>{store.set("wrong",{});render()};wc.appendChild(cl);
    v.appendChild(wc);
  }
}

/* ===================== 진도 ===================== */
function renderProg(){
  const v=$("view");
  const wp=Math.round(known.size/VOCAB.length*100),kp=Math.round(kknown.size/KANJI.length*100);
  const st=store.get("qstats",{done:0,ok:0}),qp=st.done?Math.round(st.ok/st.done*100):0,b=bests();
  v.appendChild(el("div","lhead",'<b>진도</b><span>단어 '+wp+'% · 한자 '+kp+'% · 퀴즈 정답률 '+qp+'%</span>'));
  const c=card("영역별");
  [["단어 암기",wp,known.size+" / "+VOCAB.length],["한자 확인",kp,kknown.size+" / "+KANJI.length],["퀴즈 정답률",qp,st.ok+" / "+st.done+" 문제"]].forEach(([t,p,d])=>{
    c.appendChild(el("div","pr",'<div class="prh"><b>'+t+'</b><span>'+d+'</span></div><div class="prb"><i style="width:'+p+'%"></i></div>'))});
  v.appendChild(c);
  const lc=card("과별");
  const tb=el("table","pt",'<tr><th>과</th><th>단어</th><th>한자</th><th>최고</th></tr>'+LESSONS.map(l=>{
    const vs=vocabOf(l),ks=kanjiOf(l),kw=vs.filter(([,i])=>known.has(i)).length,kk=ks.filter(([,i])=>kknown.has(i)).length;
    return '<tr><td><b>'+l+'과</b> '+ESC(LSHORT[l]||"")+'</td><td>'+kw+'/'+vs.length+'</td><td>'+kk+'/'+ks.length+'</td><td>'+(b["bestL"+l]||0)+'%</td></tr>'}).join(""));
  lc.appendChild(tb);v.appendChild(lc);
  const w=card("내 약점 (고정)");
  w.innerHTML+='<div class="ex"><div class="k">① 海<b>で</b>泳ぐ(장소 で) ② たい의 부정 た<b>くない</b> ③ 高い의 반대말 두 개(安い/低い) ④ どちら 대답은 ～の<b>ほうが</b> ⑤ 緑<b>の</b>ズボン vs 赤<b>い</b>帽子 ⑥ 4月しがつ·7月しちがつ·9月くがつ ⑦ 1日ついたち·20日はつか ⑧ いいそう ✕ → よさそう</div></div>';
  v.appendChild(w);
  const rb=el("button","btn","진도 기록 초기화");rb.onclick=()=>{if(!confirm("단어·한자·퀴즈 기록을 모두 지웁니다."))return;known=new Set();kknown=new Set();["known","kknown","bests","wrong","qstats"].forEach(k=>store.set(k,k==="known"||k==="kknown"?[]:{}));updStats();render()};
  v.appendChild(rb);
}

/* ===================== 노트 ===================== */
function renderNote(){
  const v=$("view");
  v.appendChild(el("div","lhead",'<b>노트</b><span>자동 저장</span>'));
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

/* ===================== 렌더 ===================== */
function render(){
  const v=$("view");v.innerHTML="";
  if(R.tab==="lesson")renderLesson();else if(R.tab==="quiz")renderQuizCenter();else if(R.tab==="prog")renderProg();else renderNote();
  document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("on",t.dataset.p===R.tab));
  window.scrollTo({top:0});updStats();
}
function updStats(){
  const st=store.get("qstats",{done:0,ok:0});
  $("h-word").textContent=known.size+"/"+VOCAB.length;$("h-kanji").textContent=kknown.size+"/"+KANJI.length;
  $("h-quiz").textContent=(st.done?Math.round(st.ok/st.done*100):0)+"%";
}
document.querySelectorAll(".tab").forEach(t=>t.onclick=()=>{const p=t.dataset.p;go(p==="lesson"?("l"+R.lesson+"/"+R.sec):p)});
$("vclose").onclick=closeViewer;$("vprev").onclick=()=>stepSheet(-1);$("vnext").onclick=()=>stepSheet(1);
$("vzoom").onclick=()=>{VZ=!VZ;showSheet()};$("vimg").onclick=()=>{VZ=!VZ;showSheet()};
$("vbody").addEventListener("click",e=>{if(e.target===e.currentTarget)closeViewer()});
document.addEventListener("keydown",e=>{if(!$("viewer").classList.contains("on"))return;if(e.key==="Escape")closeViewer();else if(e.key==="ArrowLeft")stepSheet(-1);else if(e.key==="ArrowRight")stepSheet(1)});
(function(){let x0=null,y0=null;const b=$("vbody");
  b.addEventListener("touchstart",e=>{if(e.touches.length!==1)return;x0=e.touches[0].clientX;y0=e.touches[0].clientY},{passive:true});
  b.addEventListener("touchend",e=>{if(x0===null||VZ)return;const t=e.changedTouches[0],dx=t.clientX-x0,dy=t.clientY-y0;if(Math.abs(dx)>52&&Math.abs(dx)>Math.abs(dy)*1.6)stepSheet(dx<0?1:-1);x0=null},{passive:true});})();

const fb=$("furibtn");let furi=store.get("furi",true);
function applyF(){document.body.classList.toggle("nofuri",!furi);fb.classList.toggle("on",furi)}
fb.onclick=()=>{furi=!furi;store.set("furi",furi);applyF()};applyF();
const PALETTES=[["sumi", "墨 먹·주홍", "#C9463D", "#F6F2EA"], ["indigo", "藍 인디고", "#2F56C8", "#F4F5F7"], ["teal", "海 청록", "#0F766E", "#F2F6F6"], ["amber", "夜 흑연·호박", "#B86E00", "#F3F3F2"], ["forest", "森 숲", "#2F6B4F", "#F3F5F0"], ["sakura", "桜 벚꽃", "#D2497A", "#FAF4F6"], ["murasaki", "紫 보라", "#6B4FC9", "#F5F4F8"], ["matcha", "抹茶 말차", "#5F7F2A", "#F6F6EC"], ["sepia", "栗 세피아", "#8A5A2B", "#F5EFE6"], ["sora", "空 하늘", "#0E7FC0", "#F1F6FA"]];
const tb=$("thbtn"),MODES=[["auto","자동"],["light","밝게"],["dark","어둡게"]],LABEL={auto:"◐",light:"☀",dark:"☾"};
let theme=store.get("theme","auto"),palette=store.get("palette","sumi");
function applyT(){
  if(theme==="auto")document.documentElement.removeAttribute("data-theme");else document.documentElement.setAttribute("data-theme",theme);
  document.documentElement.setAttribute("data-palette",palette);tb.textContent=LABEL[theme];
  const pl=PALETTES.find(x=>x[0]===palette)||PALETTES[0];
  const dark=theme==="dark"||(theme==="auto"&&window.matchMedia("(prefers-color-scheme: dark)").matches);
  const tc=document.querySelector('meta[name="theme-color"]');if(tc)tc.setAttribute("content",dark?"#15161a":pl[3]);
}
function drawSet(){
  const th=$("setth");th.innerHTML="";MODES.forEach(([k,lab])=>{const b=el("button","chip"+(theme===k?" on":""),lab);b.onclick=()=>{theme=k;store.set("theme",k);applyT();drawSet()};th.appendChild(b)});
  const pw=$("setpal");pw.innerHTML="";PALETTES.forEach(([k,lab,ac])=>{const b=el("button",palette===k?"on":"",'<i style="background:'+ac+'"></i>'+lab);b.onclick=()=>{palette=k;store.set("palette",k);applyT();drawSet()};pw.appendChild(b)});
}
const openSet=o=>{$("setp").classList.toggle("on",o);$("setbg").classList.toggle("on",o);if(o)drawSet()};
tb.onclick=()=>openSet(!$("setp").classList.contains("on"));$("setbg").onclick=()=>openSet(false);
applyT();
route();

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
