/* 日本語 復習ノート — 교재형(레슨 우선) 레이아웃
   수업 > 과 > 섹션(자료·문법·단어·한자·회화·퀴즈) / 복습 / 진도 / 노트 */
const $=id=>document.getElementById(id);
const store={get(k,d){try{const v=localStorage.getItem("jpn:"+k);return v===null?d:JSON.parse(v)}catch(e){return d}},
             set(k,v){try{localStorage.setItem("jpn:"+k,JSON.stringify(v))}catch(e){}}};
const ESC=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
// 漢字（かな） → ruby (콘텐츠는 모두 내부 데이터이므로 <b> 등 서식 태그 허용)
const F=s=>String(s).replace(/([0-9０-９,]*[一-龯々%]+)（([ぁ-ゖー・ァ-ヶ]+)）/g,"<ruby>$1<rt>$2</rt></ruby>");
const LT=n=>n===1?"a":n===2?"b":"c";
const SFILE=s=>"l"+s.l+"-"+(s.p<10?"0"+s.p:s.p);
const KLABEL={gram:"문법",word:"단어",kanji:"한자",talk:"회화"};
const LDATE={1:"2026.08.25",2:"2026.09.02",3:"2026.09.16"};
const SECT={sheets:["資","수업 자료"],gram:["文","문법"],word:["語","단어"],kanji:["漢","한자"],talk:["話","회화"],quiz:["問","퀴즈"]};
const LSHORT={1:"희망·계획",2:"비교·순위",3:"날짜·색·옷"};

let known=new Set(store.get("known",[])),kknown=new Set(store.get("kknown",[]));
const lessonOf=l=>GRAM.find(g=>g.l===l);
const vocabOf=l=>VOCAB.map((v,i)=>[v,i]).filter(([v])=>v[5]===l);
const kanjiOf=l=>KANJI.map((k,i)=>[k,i]).filter(([k])=>k[4]===l);
const quizOf=l=>QUIZ.map((q,i)=>i).filter(i=>QUIZ[i][4]===l);
const sheetsOf=(k,l)=>SHEETS.filter(s=>(!k||s.k===k)&&(!l||s.l===l));
const bests=()=>store.get("bests",{});
const el=(tag,cls,html)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e};

/* ===================== 라우팅 ===================== */
let R={tab:"lesson",lesson:store.get("lesson",1),sec:null};
function go(h){if(location.hash.slice(1)===h)route();else location.hash=h}
function route(){
  const h=decodeURIComponent(location.hash.slice(1))||("l"+R.lesson);
  const p=h.split("/");
  if(p[0]==="review"){R.tab="review";R.sec=p[1]||null}
  else if(p[0]==="prog"){R.tab="prog";R.sec=null}
  else if(p[0]==="note"){R.tab="note";R.sec=null}
  else{
    const l=parseInt((p[0]||"l1").replace("l",""),10);
    R.tab="lesson";R.lesson=(l>=1&&l<=3)?l:1;R.sec=SECT[p[1]]?p[1]:null;
    store.set("lesson",R.lesson);
  }
  render();
}
window.addEventListener("hashchange",route);

/* ===================== 공통 조각 ===================== */
function backBar(title,sub,to){
  const b=el("div","backbar");
  b.innerHTML='<button class="bk" type="button">‹ 돌아가기</button><div class="bt"><b></b><span></span></div>';
  b.querySelector("b").textContent=title;
  b.querySelector("span").textContent=sub;
  b.querySelector(".bk").onclick=()=>go(to);
  return b;
}
function sectTitle(t,meta){
  const s=el("div","sect","<h1>"+ESC(t)+"</h1><span>"+ESC(meta||"")+"</span>");
  return s;
}
function segBar(items,cur,fn){
  const w=el("div","seg");
  items.forEach(it=>{const b=el("button","sg"+(it[0]===cur?" on":""),ESC(it[1]));b.onclick=()=>fn(it[0]);w.appendChild(b)});
  return w;
}

/* ===================== 수업 자료 시트 ===================== */
const SHINT='<p class="muted" style="margin-bottom:9px">수업에서 받은 원본 자료입니다. 눌러서 크게 보고, 좌우로 넘기세요.</p>';
function sheetGrid(list,showL){
  const g=el("div","sh");
  list.forEach((s,i)=>{
    const b=el("button","shi");b.type="button";
    b.setAttribute("aria-label","LESSON 0"+s.l+" "+s.p+"페이지 — "+s.t);
    b.innerHTML='<span class="im"><img src="sheets/thumb/'+SFILE(s)+'.webp" alt="" loading="lazy" decoding="async">'+
      '<span class="pg">'+(showL?"L"+s.l:s.p)+'</span></span>'+
      '<span class="cap">'+ESC(s.t)+'</span>';
    b.onclick=()=>openViewer(list,i);
    g.appendChild(b);
  });
  return g;
}
let VL=[],VI=0,VZ=false;
function openViewer(list,i){VL=list;VI=i;VZ=false;$("viewer").classList.add("on");document.body.style.overflow="hidden";showSheet()}
function showSheet(){
  const s=VL[VI];
  $("vimg").src="sheets/"+SFILE(s)+".webp";
  $("vimg").alt="LESSON 0"+s.l+" "+s.p+"/10 — "+s.t;
  $("vttl").textContent=s.t;
  $("vsub").textContent="LESSON 0"+s.l+" · "+KLABEL[s.k]+" · "+s.p+"/10";
  $("vcnt").textContent=(VI+1)+" / "+VL.length;
  $("vprev").disabled=VI===0;$("vnext").disabled=VI===VL.length-1;
  const b=$("vbody");b.classList.toggle("zoom",VZ);b.scrollTop=0;
  b.scrollLeft=VZ?b.scrollWidth/2-b.clientWidth/2:0;
  $("vzoom").textContent=VZ?"축소":"확대";
}
function closeViewer(){$("viewer").classList.remove("on");document.body.style.overflow="";$("vimg").removeAttribute("src")}
function stepSheet(d){const n=VI+d;if(n<0||n>=VL.length)return;VI=n;VZ=false;showSheet()}

/* ===================== 과 홈 ===================== */
function lessonSelector(){
  const w=el("div","lsel");
  [1,2,3].forEach(l=>{
    const b=el("button",(R.lesson===l?"on l"+l:""),'<span class="n">LESSON 0'+l+'</span><span class="t">'+ESC(LSHORT[l])+'</span>');
    b.onclick=()=>go("l"+l);
    w.appendChild(b);
  });
  return w;
}
function navCard(icon,title,sub,onclick,pct,pink){
  const b=el("button","nc"+(pink?" p2":""));b.type="button";
  b.innerHTML='<span class="ic">'+icon+'</span><span class="tx"><b>'+ESC(title)+'</b><span>'+sub+'</span>'+
    (pct==null?"":'<span class="ncbar'+(pink?" pink":"")+'"><i style="width:'+pct+'%"></i></span>')+'</span><span class="go">›</span>';
  b.onclick=onclick;return b;
}
function renderHub(){
  const v=$("view"),l=R.lesson,g=lessonOf(l);
  v.appendChild(lessonSelector());
  const vs=vocabOf(l),ks=kanjiOf(l),qs=quizOf(l);
  const kw=vs.filter(([,i])=>known.has(i)).length, kk=ks.filter(([,i])=>kknown.has(i)).length;
  const best=bests()["bestL"+l]||0;
  const hero=el("div","lhero");
  hero.innerHTML='<div class="no">0'+l+'</div><div class="hx">'+
    '<div class="n">LESSON 0'+l+' · '+LDATE[l]+'</div><div class="ti">'+ESC(g.title)+'</div>'+
    '<div class="de jp">'+F(g.desc)+'</div></div>';
  v.appendChild(hero);
  v.appendChild(el("div","lhero",'<div class="st" style="margin-top:0"><div><b>'+kw+'/'+vs.length+'</b><span>단어</span></div>'+
    '<div><b>'+kk+'/'+ks.length+'</b><span>한자</span></div><div><b>'+best+'%</b><span>퀴즈</span></div></div>'));

  const sh=sheetsOf(0,l);
  v.appendChild(navCard("資","수업 자료","원본 "+sh.length+"장 · 문법 3 · 단어 3 · 한자 3 · 회화 1",()=>go("l"+l+"/sheets")));
  const strip=el("div","hstrip");
  sh.forEach((s,i)=>{
    const b=el("button","");b.type="button";b.setAttribute("aria-label",s.p+"쪽 "+s.t);
    b.innerHTML='<img src="sheets/thumb/'+SFILE(s)+'.webp" alt="" loading="lazy" decoding="async">';
    b.onclick=()=>openViewer(sh,i);strip.appendChild(b);
  });
  v.appendChild(strip);
  v.appendChild(navCard("文","문법",g.items.length+"가지 · "+ESC(g.items[0].h.replace(/^[①-⑩]\s*/,"").split(" — ")[0]),()=>go("l"+l+"/gram"),null,true));
  v.appendChild(navCard("語","단어",vs.length+"개 중 "+kw+"개 외움",()=>go("l"+l+"/word"),Math.round(kw/vs.length*100)));
  v.appendChild(navCard("漢","한자",ks.length+"자 중 "+kk+"자 확인",()=>go("l"+l+"/kanji"),Math.round(kk/ks.length*100),true));
  v.appendChild(navCard("話","회화","대화 "+DLGS.filter(d=>d.l===l).length+"개 · 말하기 "+SPEAK.filter(s=>s[2]===l).length+"문제",()=>go("l"+l+"/talk")));
  v.appendChild(navCard("問","퀴즈",qs.length+"문제"+(best?" · 최고 "+best+"%":" · 아직 안 풀었습니다"),()=>go("l"+l+"/quiz"),null,true));
}

/* ===================== 섹션: 자료 ===================== */
function renderSheets(){
  const v=$("view"),l=R.lesson,list=sheetsOf(0,l);
  v.appendChild(sectTitle("수업 자료",list.length+"장"));
  const c=el("div","card sheets");
  c.innerHTML='<h2><span class="bar"></span>LESSON 0'+l+' 원본 자료</h2>'+SHINT;
  c.appendChild(sheetGrid(list));
  v.appendChild(c);
}

/* ===================== 섹션: 문법 ===================== */
function gramCard(it){
  const c=el("div","card");
  let h='<h2><span class="bar"></span>'+F(it.h)+'</h2>';
  if(it.intro)h+='<p style="line-height:1.9">'+F(it.intro)+'</p>';
  if(it.fx)h+='<div class="fx jp"><span class="b1">'+F(it.fx[0])+'</span><span class="op">'+it.fx[1]+'</span><span class="b2">'+F(it.fx[2])+'</span><span class="rs">'+F(it.fx[3])+'</span></div>';
  const TB=t=>{let s='<div style="overflow-x:auto"><table>';t.forEach((r,i)=>{
    s+="<tr>"+r.map((cell,j)=>{const tag=i===0?"th":"td";const cls=(i>0&&j===0)?' class="f jp"':(i>0?' class="jp"':"");
      return "<"+tag+cls+">"+F(cell)+"</"+tag+">"}).join("")+"</tr>"});return s+'</table></div>'};
  if(it.table)h+=TB(it.table);
  if(it.table2){if(it.t2h)h+='<h3>'+it.t2h+'</h3>';h+=TB(it.table2)}
  if(it.tip)h+='<div class="box tip"><span class="t">💡 '+it.tip.t+'</span>'+F(it.tip.b)+'</div>';
  if(it.ex){h+='<h3>예문</h3>';it.ex.forEach(e=>{h+='<div class="ex"><div class="j jp">'+F(e[0])+'</div><div class="k">'+F(e[1])+'</div></div>'})}
  if(it.warn)h+='<div class="box warn"><span class="t">⚠️ '+it.warn.t+'</span>'+F(it.warn.b)+'</div>';
  if(it.dlg){h+='<h3>미니 회화</h3>';it.dlg.forEach(d=>{h+='<div class="dl'+(d[0]==="B"?" me":"")+'"><span class="who '+(d[0]==="B"?"b":"a")+'">'+d[0]+
    '</span><div class="bub"><div class="j jp">'+F(d[1])+'</div><div class="k" style="display:block">'+F(d[2])+'</div></div></div>'})}
  c.innerHTML=h;return c;
}
function renderGram(){
  const v=$("view"),g=lessonOf(R.lesson);
  v.appendChild(sectTitle("문법",g.items.length+"가지"));
  const sh=sheetsOf("gram",R.lesson);
  const sc=el("div","card sheets");
  sc.innerHTML='<h2><span class="bar"></span>이 과의 문법 자료</h2>';
  sc.appendChild(sheetGrid(sh));
  v.appendChild(sc);
  g.items.forEach(it=>v.appendChild(gramCard(it)));
}

/* ===================== 섹션: 단어 ===================== */
let wmode="list",wcat="전체",deck=[],di=0;
function vocabRows(pairs){
  const w=el("div");let cur=null,card=null;
  pairs.forEach(([v,i])=>{
    if(v[6]!==cur){cur=v[6];card=el("div","card",'<h2><span class="bar"></span>'+ESC(cur)+' <span class="ltag '+LT(v[5])+'">L'+v[5]+'</span></h2>');w.appendChild(card)}
    const r=el("div","vrow");
    r.innerHTML='<div class="vic">'+v[7]+'</div><div class="vmain"><div class="vw">'+ESC(v[0])+' <span class="vr">'+ESC(v[1])+'</span>'+
      (known.has(i)?' <span class="ok">✓</span>':'')+'</div><div class="vm">'+ESC(v[2])+'</div>'+
      '<div class="vex jp">'+F(v[3])+'<span class="k">'+ESC(v[4])+'</span></div></div>';
    card.appendChild(r);
  });
  return w;
}
function flashcards(pairs,host){
  deck=pairs.map(([,i])=>i);di=0;
  const c=el("div");
  c.innerHTML='<div class="fcw"><button class="fc" id="fc" aria-label="카드 뒤집기"><div class="fc-inner">'+
    '<div class="face front"><span class="cat" id="fc-cat"></span><span class="cnt" id="fc-cnt"></span><div class="em" id="fc-em"></div>'+
    '<div class="big jp" id="fc-front"></div><div class="note">읽기와 뜻을 말해보세요</div></div>'+
    '<div class="face back"><span class="cat">답</span><div class="mid jp" id="fc-read"></div><div class="mid" id="fc-mean"></div><div class="note jp" id="fc-ex"></div></div>'+
    '</div></button></div>'+
    '<div class="fchint">카드를 누르면 뒤집힙니다 · "다시"를 누른 카드는 뒤에서 또 나옵니다</div>'+
    '<div class="fcb"><button class="btn" id="fc-again">🔁 다시</button><button class="btn m" id="fc-know">✓ 알아요</button></div>'+
    '<div style="text-align:center;margin-top:11px"><button class="btn g" id="fc-reset">덱 처음부터</button></div>';
  host.appendChild(c);
  const show=()=>{
    const fc=$("fc");fc.classList.remove("flip");
    if(di>=deck.length){$("fc-em").textContent="🎉";$("fc-front").textContent="완료!";$("fc-cat").textContent=wcat;$("fc-cnt").textContent="";
      $("fc-read").textContent="お疲（つか）れさま";$("fc-mean").textContent="수고하셨습니다";$("fc-ex").textContent="'덱 처음부터'로 반복하세요";return}
    const v=VOCAB[deck[di]];
    $("fc-cat").textContent=v[6];$("fc-cnt").textContent=(di+1)+" / "+deck.length;
    $("fc-em").textContent=v[7];$("fc-front").textContent=v[0];
    $("fc-read").textContent=v[1];$("fc-mean").textContent=v[2];$("fc-ex").innerHTML=F(v[3]);
  };
  $("fc").onclick=()=>$("fc").classList.toggle("flip");
  $("fc-know").onclick=()=>{if(di<deck.length){known.add(deck[di]);store.set("known",[...known]);di++;show();updStats()}};
  $("fc-again").onclick=()=>{if(di<deck.length){deck.push(deck[di]);di++;show()}};
  $("fc-reset").onclick=()=>{deck=pairs.map(([,i])=>i);di=0;show()};
  show();
}
function wordView(pairs,host,title){
  const cats=[...new Set(pairs.map(([v])=>v[6]))];
  if(cats.indexOf(wcat)<0&&wcat!=="전체")wcat="전체";
  host.appendChild(segBar([["list","📖 목록"],["card","🃏 카드"]],wmode,m=>{wmode=m;render()}));
  const cw=el("div","seg");
  [["전체","전체 "+pairs.length]].concat(cats.map(c=>[c,c+" "+pairs.filter(([v])=>v[6]===c).length])).forEach(([k,lab])=>{
    const b=el("button","sg"+(wcat===k?" on":""),ESC(lab));b.onclick=()=>{wcat=k;render()};cw.appendChild(b)});
  host.appendChild(cw);
  const cur=pairs.filter(([v])=>wcat==="전체"||v[6]===wcat);
  if(wmode==="list")host.appendChild(vocabRows(cur));else flashcards(cur,host);
}
function renderWord(){
  const v=$("view"),pairs=vocabOf(R.lesson);
  v.appendChild(sectTitle("단어",pairs.length+"개"));
  const sh=sheetsOf("word",R.lesson);
  const sc=el("div","card sheets");sc.innerHTML='<h2><span class="bar"></span>이 과의 단어 자료</h2>';
  sc.appendChild(sheetGrid(sh));v.appendChild(sc);
  wordView(pairs,v);
}

/* ===================== 섹션: 한자 ===================== */
function kanjiGrid(pairs,host){
  const c=el("div","card");
  c.innerHTML='<h2><span class="bar"></span>한자 '+pairs.length+'자</h2>'+
    '<p class="muted" style="margin-bottom:10px">타일을 누르면 읽기·뜻이 가려집니다. 길게 눌러 ✓ 표시하면 진도에 반영됩니다.</p>';
  const g=el("div","kg");
  pairs.forEach(([k,i])=>{
    const d=el("button","kt"+(k[4]===2?" k2":k[4]===3?" k3":"")+(kknown.has(i)?" known":""));
    d.innerHTML='<div class="k jp">'+ESC(k[0])+'</div><div class="r jp">'+ESC(k[1])+'</div><div class="m">'+ESC(k[2])+'</div><div class="kx jp">'+ESC(k[3])+'</div>';
    let t;d.onclick=()=>d.classList.toggle("hide");
    d.addEventListener("pointerdown",()=>{t=setTimeout(()=>{
      if(kknown.has(i))kknown.delete(i);else kknown.add(i);
      store.set("kknown",[...kknown]);d.classList.toggle("known",kknown.has(i));updStats()},550)});
    ["pointerup","pointerleave","pointercancel"].forEach(e=>d.addEventListener(e,()=>clearTimeout(t)));
    g.appendChild(d);
  });
  c.appendChild(g);
  const row=el("div","",'<div style="display:flex;gap:8px;margin-top:12px"><button class="btn" id="k-hide">🙈 전부 가리기</button><button class="btn" id="k-show">👀 전부 보기</button></div>');
  c.appendChild(row);
  host.appendChild(c);
  $("k-hide").onclick=()=>g.querySelectorAll(".kt").forEach(t=>t.classList.add("hide"));
  $("k-show").onclick=()=>g.querySelectorAll(".kt").forEach(t=>t.classList.remove("hide"));
}
function renderKanji(){
  const v=$("view"),pairs=kanjiOf(R.lesson);
  v.appendChild(sectTitle("한자",pairs.length+"자"));
  const sc=el("div","card sheets");sc.innerHTML='<h2><span class="bar"></span>이 과의 한자 자료</h2>';
  sc.appendChild(sheetGrid(sheetsOf("kanji",R.lesson)));v.appendChild(sc);
  kanjiGrid(pairs,v);
}

/* ===================== 섹션: 회화 ===================== */
function renderTalk(){
  const v=$("view"),l=R.lesson;
  const ds=DLGS.filter(d=>d.l===l),sp=SPEAK.filter(s=>s[2]===l);
  v.appendChild(sectTitle("회화","대화 "+ds.length+" · 말하기 "+sp.length));
  const sc=el("div","card sheets");sc.innerHTML='<h2><span class="bar"></span>이 과의 회화 자료</h2>';
  sc.appendChild(sheetGrid(sheetsOf("talk",l)));v.appendChild(sc);
  v.appendChild(el("div","box note",'<span class="t">📌 사용법</span>한국어 번역을 켜지 말고 먼저 소리내어 읽으세요. 막힐 때만 번역을 켭니다.'));
  ds.forEach((d,i)=>{
    const c=el("div","card");c.id="dlg"+l+"_"+i;
    let h='<h2><span class="bar"></span>'+ESC(d.t)+' <span class="ltag '+LT(d.l)+'">L'+d.l+'</span></h2>';
    d.lines.forEach(x=>{h+='<div class="dl'+(x[0]==="B"?" me":"")+'"><span class="who '+(x[0]==="B"?"b":"a")+'">'+x[0]+
      '</span><div class="bub"><div class="j jp">'+F(x[1])+'</div><div class="k">'+F(x[2])+'</div></div></div>'});
    h+='<button class="btn" style="margin-top:9px;flex:none">🇰🇷 번역 켜기/끄기</button>';
    c.innerHTML=h;c.querySelector("button").onclick=()=>c.classList.toggle("showkr");
    v.appendChild(c);
  });
  if(sp.length){
    const c=el("div","card",'<h2><span class="bar"></span>말하기 연습 — 직접 대답하기</h2>');
    sp.forEach((q,i)=>{
      const d=el("div","sq");
      d.innerHTML='<div class="q jp">'+(i+1)+'. '+F(q[0])+'</div><button class="btn">모델 답 보기</button><div class="reveal jp">'+F(q[1])+'</div>';
      d.querySelector("button").onclick=()=>d.querySelector(".reveal").classList.toggle("on");
      c.appendChild(d);
    });
    v.appendChild(c);
  }
}

/* ===================== 퀴즈 ===================== */
let QO=[],QI=0,QS=0,QA=false,QKEY="best";
function quizView(pool,host,key,label){
  QKEY=key;
  const box=el("div","card");
  box.innerHTML='<div class="qbar"><i id="qb" style="width:0%"></i></div>'+
    '<div class="qn"><span id="qn"></span><span class="qtype" id="qty"></span></div>'+
    '<div class="qt jp" id="qt"></div><div class="opts" id="qo"></div><div class="fb" id="qf"></div>'+
    '<div style="text-align:right;margin-top:12px"><button class="btn p" id="qnext" style="display:none;flex:none">다음 →</button></div>';
  const done=el("div","card");done.id="qdone";done.style.display="none";done.style.textAlign="center";
  done.innerHTML='<div style="font-family:Outfit;font-size:38px;font-weight:800;color:var(--purple)" id="qsc"></div>'+
    '<p id="qmsg" style="margin:5px 0 14px"></p><button class="btn p" id="qre" style="flex:none;margin:0 auto">다시 도전</button>';
  host.appendChild(box);host.appendChild(done);
  const start=()=>{QO=pool.slice().sort(()=>Math.random()-.5);QI=0;QS=0;QA=false;
    done.style.display="none";box.style.display="block";show()};
  const show=()=>{
    QA=false;$("qf").className="fb";$("qnext").style.display="none";
    $("qb").style.width=Math.round(QI/QO.length*100)+"%";
    const q=QUIZ[QO[QI]];
    $("qn").textContent=(QI+1)+" / "+QO.length+" · "+q[4]+"과";
    $("qty").textContent=q[5];$("qt").innerHTML=F(q[0]);
    const b=$("qo");b.innerHTML="";
    q[1].map((o,i)=>i).sort(()=>Math.random()-.5).forEach(oi=>{
      const btn=el("button","opt jp",F(q[1][oi]));btn.dataset.i=oi;
      btn.onclick=()=>{if(QA)return;QA=true;const ok=oi===q[2];
        b.querySelectorAll(".opt").forEach(x=>{if(+x.dataset.i===q[2])x.classList.add("c")});
        if(!ok){btn.classList.add("w");QO.push(QO[QI])}else QS++;
        const f=$("qf");f.className="fb on "+(ok?"g":"b");
        f.innerHTML=(ok?"○ 정답! ":"× 오답 — 뒤에서 다시 나옵니다. ")+F(q[3]);
        $("qnext").style.display="inline-flex"};
      b.appendChild(btn)});
  };
  $("qnext").onclick=()=>{QI++;if(QI>=QO.length)end();else show()};
  const end=()=>{
    box.style.display="none";done.style.display="block";
    const pct=Math.round(QS/QO.length*100);
    $("qsc").textContent=QS+" / "+QO.length;
    $("qmsg").textContent=pct===100?"満点！완벽합니다.":pct>=80?"좋습니다. 틀린 유형만 단어에서 다시 확인하세요.":"오답노트와 문법을 복습한 뒤 재도전을 권합니다.";
    const bs=bests();if(pct>(bs[QKEY]||0)){bs[QKEY]=pct;store.set("bests",bs);updStats()}
  };
  $("qre").onclick=start;
  start();
}
function renderQuiz(){
  const v=$("view"),l=R.lesson,pool=quizOf(l);
  v.appendChild(sectTitle("퀴즈",pool.length+"문제 · 최고 "+(bests()["bestL"+l]||0)+"%"));
  quizView(pool,v,"bestL"+l);
}

/* ===================== 복습 탭 ===================== */
let rcat="전체",rtype="전체",rles=0;
function renderReviewMenu(){
  const v=$("view");
  v.appendChild(el("div","card",'<h2><span class="bar"></span>오늘의 복습 루트</h2>'+
    '<p style="font-size:13px;line-height:1.9">① <b>수업</b>에서 배운 과를 열어 자료 → 문법 → 단어 → 한자 → 회화 순서로 한 바퀴 → ② 여기 <b>복습</b>에서 전체 단어 카드와 전체 퀴즈로 과를 섞어 확인. 한 바퀴 약 20분입니다.</p>'+
    '<div class="box tip"><span class="t">💡 효율 팁</span>틀린 퀴즈 문제는 자동으로 뒤에 다시 나옵니다. 끝까지 풀면 약점이 저절로 걸러집니다.</div>'));
  const kw=known.size,kk=kknown.size,b=bests();
  v.appendChild(navCard("語","단어 카드 — 전체",VOCAB.length+"개 중 "+kw+"개 외움 · 과를 섞어 확인",()=>go("review/card"),Math.round(kw/VOCAB.length*100)));
  v.appendChild(navCard("問","전체 퀴즈",QUIZ.length+"문제 · 최고 "+(b.best||0)+"% · 과·유형으로 거를 수 있습니다",()=>go("review/quiz"),null,true));
  v.appendChild(navCard("漢","헷갈리는 한자 짝","高·大/多·寒/冷·海·選/失 — 자주 틀리는 5쌍",()=>go("review/pairs")));
  v.appendChild(el("div","card",'<h2><span class="bar"></span>내 오답노트 — 반드시 고칠 것</h2><table>'+
    '<tr><th>이렇게 쓰면 ×</th><th>이렇게 써야 ○</th></tr>'+
    '<tr><td class="jp"><span class="no">海に泳ぎます</span></td><td class="jp"><span class="ok">海で泳ぎます</span><br><span class="muted">동작 장소 = で</span></td></tr>'+
    '<tr><td class="jp"><span class="no">なにもしなくないです</span></td><td class="jp"><span class="ok">なにもしたくないです</span><br><span class="muted">たい의 부정 = たくない</span></td></tr>'+
    '<tr><td class="jp"><span class="no">ボールトスします</span></td><td class="jp"><span class="ok">ボールをトスします</span><br><span class="muted">목적어 を 누락</span></td></tr>'+
    '<tr><td class="jp"><span class="no">市外に行きたい</span></td><td class="jp"><span class="ok">郊外（こうがい）に行きたい</span><br><span class="muted">市外는 회화에서 잘 안 씀</span></td></tr>'+
    '<tr><td>~기로 하다 = つもり?</td><td><span class="ok">つもり = ~할 생각</span><br><span class="muted">~기로 하다 = ～ことにする</span></td></tr>'+
    '<tr><td>housemaid 自家製</td><td><span class="ok">homemade = 自家製（じかせい）</span><br><span class="muted">housemaid는 가사도우미</span></td></tr>'+
    '<tr><td class="jp"><span class="no">緑い ズボン</span></td><td class="jp"><span class="ok">緑の ズボン</span><br><span class="muted">緑·紫·水色는 명사 → の (L3)</span></td></tr>'+
    '<tr><td class="jp"><span class="no">暑い 服</span> (두꺼운 옷)</td><td class="jp"><span class="ok">厚い 服</span><br><span class="muted">あつい 동음: 暑い 덥다 / 厚い 두껍다 (L3)</span></td></tr>'+
    '<tr><td class="jp"><span class="no">よんがつ・にじゅうにち</span></td><td class="jp"><span class="ok">しがつ・はつか</span><br><span class="muted">4·7·9월, 1~10·14·20·24일은 특수 읽기 (L3)</span></td></tr>'+
    '</table>'));
}
function renderReviewCard(){
  const v=$("view");
  v.appendChild(sectTitle("단어 카드",VOCAB.length+"개 · 전체 과"));
  wordView(VOCAB.map((x,i)=>[x,i]),v);
}
function renderReviewQuiz(){
  const v=$("view");
  v.appendChild(sectTitle("전체 퀴즈",QUIZ.length+"문제"));
  const types=[...new Set(QUIZ.map(q=>q[5]))];
  v.appendChild(segBar([[0,"전체 과"],[1,"1과"],[2,"2과"],[3,"3과"]],rles,x=>{rles=x;render()}));
  v.appendChild(segBar([["전체","모든 유형"]].concat(types.map(t=>[t,t])),rtype,x=>{rtype=x;render()}));
  const pool=QUIZ.map((q,i)=>i).filter(i=>(!rles||QUIZ[i][4]===rles)&&(rtype==="전체"||QUIZ[i][5]===rtype));
  if(!pool.length){v.appendChild(el("div","card",'<p class="muted">이 조합에는 문제가 없습니다.</p>'));return}
  const key=(!rles&&rtype==="전체")?"best":("best"+rles+rtype);
  v.appendChild(el("div","muted","",));
  quizView(pool,v,key);
}
function renderReviewPairs(){
  const v=$("view");
  v.appendChild(sectTitle("헷갈리는 한자 짝","5쌍"));
  v.appendChild(el("div","card",'<h2><span class="bar"></span>자주 틀리는 짝</h2><table>'+
    '<tr><th>한자</th><th>구분</th></tr>'+
    '<tr><td class="jp" style="font-size:19px;font-weight:900">高</td><td class="jp"><ruby>高<rt>たか</rt></ruby>い = <b>비싸다</b>(⇔<ruby>安<rt>やす</rt></ruby>い) / <b>높다</b>(⇔<ruby>低<rt>ひく</rt></ruby>い)<span class="ltag b">L2</span></td></tr>'+
    '<tr><td class="jp" style="font-size:19px;font-weight:900">大·多</td><td class="jp"><ruby>大<rt>おお</rt></ruby>きい 크다 / <ruby>多<rt>おお</rt></ruby>い 많다 — 읽기가 같음<span class="ltag b">L2</span></td></tr>'+
    '<tr><td class="jp" style="font-size:19px;font-weight:900">寒·冷</td><td class="jp"><ruby>寒<rt>さむ</rt></ruby>い 날씨가 춥다 / <ruby>冷<rt>つめ</rt></ruby>たい 사물이 차갑다<span class="ltag a">L1</span></td></tr>'+
    '<tr><td class="jp" style="font-size:19px;font-weight:900">海</td><td class="jp">海<span class="ok">で</span><ruby>泳<rt>およ</rt></ruby>ぐ(장소) / 海<b>に</b><ruby>行<rt>い</rt></ruby>く(도착점)<span class="ltag a">L1</span></td></tr>'+
    '<tr><td class="jp" style="font-size:19px;font-weight:900">選·失</td><td class="jp"><ruby>選<rt>えら</rt></ruby>ぶ／<ruby>選択<rt>せんたく</rt></ruby>する ・ <ruby>失<rt>な</rt></ruby>くす／<ruby>紛失<rt>ふんしつ</rt></ruby>する<br><span class="muted">앞=일상, 뒤=격식</span><span class="ltag b">L2</span></td></tr>'+
    '</table>'));
}

/* ===================== 진도 ===================== */
function renderProg(){
  const v=$("view");
  const wp=Math.round(known.size/VOCAB.length*100),kp=Math.round(kknown.size/KANJI.length*100);
  const b=bests(),qp=b.best||0,all=Math.round((wp+kp+qp)/3);
  const C=2*Math.PI*44;
  v.appendChild(el("div","card",'<h2><span class="bar"></span>전체 습득률</h2><div class="ring">'+
    '<svg width="104" height="104" viewBox="0 0 104 104"><circle cx="52" cy="52" r="44" fill="none" stroke="var(--surface2)" stroke-width="11"/>'+
    '<circle cx="52" cy="52" r="44" fill="none" stroke="url(#rg)" stroke-width="11" stroke-linecap="round" stroke-dasharray="'+C.toFixed(1)+'" stroke-dashoffset="'+(C*(1-all/100)).toFixed(1)+'" transform="rotate(-90 52 52)"/>'+
    '<defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1B5FA8"/><stop offset="1" stop-color="#4BA3DC"/></linearGradient></defs>'+
    '<text x="52" y="58" text-anchor="middle" font-family="Outfit" font-size="24" font-weight="800" fill="var(--text)">'+all+'%</text></svg>'+
    '<div class="rt">'+(all>=80?"<b>훌륭합니다.</b><br>다음 수업 준비 완료.":all>=50?"<b>순조롭습니다.</b><br>퀴즈를 한 번 더 돌려보세요.":all>=20?"<b>시작이 좋습니다.</b><br>단어 카드부터 한 덱씩 끝내보세요.":"<b>이제 시작입니다.</b><br>수업 탭에서 한 과를 끝까지 돌아보세요.")+'</div></div>'));
  v.appendChild(el("div","card",'<h2><span class="bar"></span>영역별 진도</h2>'+
    '<div class="pr"><div class="prh"><b>단어 암기</b><span class="v">'+wp+'%</span></div><div class="prb"><i class="b1" style="width:'+wp+'%"></i></div><div class="muted" style="margin-top:3px">'+known.size+' / '+VOCAB.length+'개 · 카드에서 \'알아요\'를 누르면 반영됩니다</div></div>'+
    '<div class="pr"><div class="prh"><b>한자 습득</b><span class="v">'+kp+'%</span></div><div class="prb"><i class="b2" style="width:'+kp+'%"></i></div><div class="muted" style="margin-top:3px">'+kknown.size+' / '+KANJI.length+'자 · 타일을 길게 누르면 ✓ 표시됩니다</div></div>'+
    '<div class="pr" style="margin-bottom:0"><div class="prh"><b>전체 퀴즈 최고점</b><span class="v">'+qp+'%</span></div><div class="prb"><i class="b3" style="width:'+qp+'%"></i></div></div>'));
  let ls='<h2><span class="bar"></span>과별 기록</h2><div class="mini">';
  [1,2,3].forEach(l=>{
    const vs=vocabOf(l),ks=kanjiOf(l);
    const kw=vs.filter(([,i])=>known.has(i)).length,kk=ks.filter(([,i])=>kknown.has(i)).length;
    ls+='<div class="mc"><div class="n">'+kw+'/'+vs.length+'</div><div class="l">'+l+'과 단어</div></div>'+
        '<div class="mc"><div class="n">'+kk+'/'+ks.length+'</div><div class="l">'+l+'과 한자</div></div>';
  });
  ls+='</div><div class="mini" style="margin-top:9px">'+[1,2,3].map(l=>'<div class="mc"><div class="n">'+(b["bestL"+l]||0)+'%</div><div class="l">'+l+'과 퀴즈</div></div>').join("")+'</div>';
  v.appendChild(el("div","card",ls));
  const items=[];
  if(wp<60)items.push(["단어","아직 "+(VOCAB.length-known.size)+"개가 남았습니다. 과별로 한 덱씩 끝내세요."]);
  if(kp<60)items.push(["한자","한자 "+(KANJI.length-kknown.size)+"자가 미확인입니다. '전부 가리기' 후 테스트해 보세요."]);
  if(qp<80)items.push(["퀴즈","정답률 80% 이상을 목표로 하세요. 유형별로 나눠 풀면 약점이 보입니다."]);
  items.push(["고정 약점","① 海<b>で</b>泳ぐ(장소 で) ② たい의 부정 た<b>くない</b> ③ 高い의 반대말 두 개(安い/低い) ④ どちら 대답은 ～の<b>ほうが</b> ⑤ 緑<b>の</b>ズボン vs 赤<b>い</b>帽子 ⑥ 4月しがつ·7月しちがつ·9月くがつ ⑦ 1日ついたち·20日はつか"]);
  v.appendChild(el("div","card",'<h2><span class="bar"></span>다음에 집중할 것</h2>'+
    items.map(i=>'<div class="ex"><div class="j" style="font-size:13.5px">'+i[0]+'</div><div class="k">'+i[1]+'</div></div>').join("")));
  const rb=el("div","",'<div style="text-align:center"><button class="btn g" id="resetall" style="margin:0 auto">진도 기록 초기화</button></div>');
  v.appendChild(rb);
  $("resetall").onclick=()=>{known=new Set();kknown=new Set();
    store.set("known",[]);store.set("kknown",[]);store.set("bests",{});updStats();render()};
}

/* ===================== 노트 ===================== */
function renderNote(){
  const v=$("view");
  const c=el("div","card",'<h2><span class="bar"></span>나의 메모 <span class="saved" id="savemsg"></span></h2>'+
    '<p class="muted" style="margin-bottom:9px">수업 중 궁금했던 것, 선생님께 물어볼 것을 적어두세요. 자동 저장됩니다.</p>'+
    '<textarea id="mynote" placeholder="예) 「～ませんか」와 「～ましょう」 차이 물어보기"></textarea>');
  v.appendChild(c);
  const ta=$("mynote");ta.value=store.get("note","");
  let tmo;ta.addEventListener("input",()=>{clearTimeout(tmo);tmo=setTimeout(()=>{
    store.set("note",ta.value);$("savemsg").textContent="저장됨";setTimeout(()=>$("savemsg").textContent="",1600)},450)});
  v.appendChild(el("div","card",'<h2><span class="bar"></span>선생님께 물어볼 것 (추천)</h2><table>'+
    '<tr><td class="jp"><ruby>紅茶<rt>こうちゃ</rt></ruby>が <ruby>好<rt>す</rt></ruby>きです ・ 紅茶を 好きです</td><td>어느 쪽이 맞나요?<br><span class="muted">정답: が</span></td></tr>'+
    '<tr><td class="jp"><ruby>豚足<rt>とんそく</rt></ruby>は <ruby>辛<rt>から</rt></ruby>くないです ・ 辛いじゃないです</td><td>い형용사 부정 확인<br><span class="muted">정답: 辛くないです</span></td></tr>'+
    '<tr><td class="jp">どっち ・ どちら ・ どれ</td><td>실제로 언제 무엇을 쓰는지</td></tr>'+
    '<tr><td class="jp"><ruby>迷<rt>まよ</rt></ruby>う ・ <ruby>失<rt>な</rt></ruby>くす</td><td>둘 다 "잃다"로 번역되는데 차이는?</td></tr></table>'));
  v.appendChild(el("div","card",'<h2><span class="bar"></span>수업 어휘 출처 정리</h2>'+
    '<p style="font-size:12.5px;line-height:1.9"><b>LESSON 01</b> — 요일·시간, 바다/해변 장면 묘사, 착용 동사, 날씨 표현.<br><br>'+
    '<b>LESSON 02</b> — 비교 문법 중심. <span class="jp">自家製・寿司・白菜・近い／遠い・辛い／甘い・得意・景色・物価・季節・低い・種類・迷う・選ぶ・失くす・似合う・おすすめする・豚足・紅茶</span>.<br><br>'+
    '<b>LESSON 03</b> — 날짜·숫자·통화·가격·색·옷. <span class="jp">お腹が痛い・具合が悪い・食べ過ぎた・完食・生肉・焼ける・忙しかった・プレゼンしなければなりません・色·服 어휘·税込み／税抜き・消費税・送料無料・希少・品種／品質・特産品・高級・限定価格／限定品</span>.</p>'+
''));
}

/* ===================== 렌더 ===================== */
function render(){
  const v=$("view");v.innerHTML="";
  const g=lessonOf(R.lesson);
  if(R.tab==="lesson"){
    if(R.sec){
      v.appendChild(backBar("LESSON 0"+R.lesson+" · "+g.title,SECT[R.sec][1].toUpperCase(),"l"+R.lesson));
      ({sheets:renderSheets,gram:renderGram,word:renderWord,kanji:renderKanji,talk:renderTalk,quiz:renderQuiz})[R.sec]();
    }else renderHub();
  }else if(R.tab==="review"){
    if(R.sec){
      v.appendChild(backBar("복습",{card:"WORD CARDS",quiz:"QUIZ",pairs:"KANJI PAIRS"}[R.sec]||"","review"));
      ({card:renderReviewCard,quiz:renderReviewQuiz,pairs:renderReviewPairs})[R.sec]();
    }else renderReviewMenu();
  }else if(R.tab==="prog")renderProg();
  else renderNote();
  document.documentElement.setAttribute("data-lesson",R.tab==="lesson"?String(R.lesson):"0");
  document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("on",t.dataset.p===R.tab));
  window.scrollTo({top:0});
  updStats();
}
function updStats(){
  const wp=Math.round(known.size/VOCAB.length*100),kp=Math.round(kknown.size/KANJI.length*100);
  const qp=bests().best||0;
  $("h-word").textContent=known.size;$("h-kanji").textContent=kknown.size;
  $("h-quiz").textContent=qp+"%";$("h-all").textContent=Math.round((wp+kp+qp)/3)+"%";
}

/* ===================== 탭·설정·뷰어 이벤트 ===================== */
document.querySelectorAll(".tab").forEach(t=>t.onclick=()=>{
  const p=t.dataset.p;
  go(p==="lesson"?("l"+R.lesson):p);
});
$("vclose").onclick=closeViewer;
$("vprev").onclick=()=>stepSheet(-1);
$("vnext").onclick=()=>stepSheet(1);
$("vzoom").onclick=()=>{VZ=!VZ;showSheet()};
$("vimg").onclick=()=>{VZ=!VZ;showSheet()};
$("vbody").addEventListener("click",e=>{if(e.target===e.currentTarget)closeViewer()});
document.addEventListener("keydown",e=>{
  if(!$("viewer").classList.contains("on"))return;
  if(e.key==="Escape")closeViewer();else if(e.key==="ArrowLeft")stepSheet(-1);else if(e.key==="ArrowRight")stepSheet(1);
});
(function(){let x0=null,y0=null;const b=$("vbody");
  b.addEventListener("touchstart",e=>{if(e.touches.length!==1)return;x0=e.touches[0].clientX;y0=e.touches[0].clientY},{passive:true});
  b.addEventListener("touchend",e=>{if(x0===null||VZ)return;
    const t=e.changedTouches[0],dx=t.clientX-x0,dy=t.clientY-y0;
    if(Math.abs(dx)>52&&Math.abs(dx)>Math.abs(dy)*1.6)stepSheet(dx<0?1:-1);x0=null},{passive:true});
})();

const fb=$("furibtn");let furi=store.get("furi",true);
function applyF(){document.body.classList.toggle("nofuri",!furi);fb.textContent="ふりがな "+(furi?"ON":"OFF")}
fb.onclick=()=>{furi=!furi;store.set("furi",furi);applyF()};applyF();

const tb=$("thbtn"),MODES=["auto","light","dark"],LABEL={auto:"🌗 자동",light:"☀️ 밝게",dark:"🌙 어둡게"};
let theme=store.get("theme","auto");
function applyT(){
  if(theme==="auto")document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme",theme);
  tb.textContent=LABEL[theme];
}
tb.onclick=()=>{theme=MODES[(MODES.indexOf(theme)+1)%3];store.set("theme",theme);applyT()};applyT();

route();

/* ===================== PWA 셸 ===================== */
(function(){
  let waiting=null;
  if("serviceWorker" in navigator&&location.protocol.indexOf("http")===0){
    window.addEventListener("load",()=>{
      navigator.serviceWorker.register("sw.js").then(reg=>{
        const watch=sw=>{if(!sw)return;sw.addEventListener("statechange",()=>{
          if(sw.state==="installed"&&navigator.serviceWorker.controller){waiting=sw;$("pwa-update").classList.add("on")}})};
        if(reg.waiting&&navigator.serviceWorker.controller){waiting=reg.waiting;$("pwa-update").classList.add("on")}
        watch(reg.installing);reg.addEventListener("updatefound",()=>watch(reg.installing));
      }).catch(()=>{});
    });
    let reloading=false;
    navigator.serviceWorker.addEventListener("controllerchange",()=>{if(reloading)return;reloading=true;location.reload()});
  }
  $("pwa-reload").onclick=()=>{if(waiting)waiting.postMessage("skipWaiting");else location.reload()};

  let deferred=null;
  const standalone=window.matchMedia("(display-mode: standalone)").matches||navigator.standalone===true;
  let dismissed=false;try{dismissed=localStorage.getItem("jpn:a2hs")==="1"}catch(e){}
  const showInstall=txt=>{if(standalone||dismissed)return;if($("pwa-update").classList.contains("on"))return;
    if(txt)$("pwa-how").textContent=txt;$("pwa-install").classList.add("on")};
  const hideInstall=()=>{$("pwa-install").classList.remove("on");try{localStorage.setItem("jpn:a2hs","1")}catch(e){}};
  window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferred=e;showInstall()});
  window.addEventListener("appinstalled",()=>{hideInstall();deferred=null});
  $("pwa-go").onclick=()=>{if(deferred){deferred.prompt();deferred.userChoice.then(()=>{deferred=null;hideInstall()})}else hideInstall()};
  $("pwa-x").onclick=hideInstall;
  const iOS=/iP(hone|ad|od)/.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
  if(iOS&&!standalone)setTimeout(()=>showInstall("공유 버튼 → “홈 화면에 추가”를 누르세요"),2500);

  const net=()=>$("offline").classList.toggle("on",!navigator.onLine);
  window.addEventListener("online",net);window.addEventListener("offline",net);net();
})();
