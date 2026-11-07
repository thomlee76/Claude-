/* ---------------- state ---------------- */
const KEY = 'claude-guide-v1';
let ST = {done:{}, quiz:{}, theme:null, last:null, vpos:{}};
try{ const raw = localStorage.getItem(KEY); if(raw) ST = Object.assign(ST, JSON.parse(raw)); }catch(e){}
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(ST)); }catch(e){} }

/* chapter video lesson goes first in each chapter */
const LESSONS = [];
PARTS.forEach((p, pi) => {
  p.gnum = (pi + 1) + '장';
  const v = VIDEOS[p.id];
  if(v){
    p.lessons.unshift({
      id: p.id + '-v', video: p.id, short: '영상 강의', title: '영상 강의 · ' + p.title,
      intro: p.gnum + ' 핵심 내용을 약 ' + Math.round(v.duration / 60) + '분 영상으로 먼저 훑어봅니다. 아래 목차를 누르면 해당 장면으로 이동하고, 자막은 기본으로 켜져 있습니다. 레슨을 읽기 전에 보거나 복습용으로 활용하세요.',
      blocks: [['video', p.id]]
    });
  }
  p.lessons.forEach(l => {
    l.part = p;
    l.gno = l.video ? '▶' : String(LESSONS.filter(x => !x.video).length + 1).padStart(2, '0');
    LESSONS.push(l);
  });
});
const TEXT_LESSONS = LESSONS.filter(l => !l.video);
const TOTAL_Q = LESSONS.reduce((n,l)=>n+(l.quiz?l.quiz.length:0),0);

/* ---------------- helpers ---------------- */
const $ = s => document.querySelector(s);
function el(tag, cls, html){
  const n = document.createElement(tag);
  if(cls) n.className = cls;
  if(html != null) n.innerHTML = html;
  return n;
}
function strip(s){ return String(s).replace(/<[^>]+>/g,''); }
function fmt(t){ t = Math.max(0, Math.floor(t)); return Math.floor(t/60) + ':' + String(t%60).padStart(2,'0'); }

/* ---------------- theme ---------------- */
if(ST.theme) document.documentElement.setAttribute('data-theme', ST.theme);
$('#themebtn').onclick = () => {
  const cur = document.documentElement.getAttribute('data-theme');
  const isDark = cur ? cur === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  ST.theme = isDark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', ST.theme);
  save();
};

/* ---------------- offline video cache ---------------- */
const hasCache = 'caches' in window;
async function isCached(url){
  if(!hasCache) return false;
  try{ const c = await caches.open(VCACHE); return !!(await c.match(url)); }catch(e){ return false; }
}
async function cacheVideo(url, onProgress){
  const res = await fetch(url, {cache:'no-store'});
  if(!res.ok) throw new Error('HTTP ' + res.status);
  const total = +res.headers.get('content-length') || 0;
  const reader = res.body.getReader();
  const chunks = []; let got = 0;
  for(;;){
    const {done, value} = await reader.read();
    if(done) break;
    chunks.push(value); got += value.length;
    if(onProgress) onProgress(got, total);
  }
  const blob = new Blob(chunks, {type:'video/mp4'});
  const c = await caches.open(VCACHE);
  await c.put(url, new Response(blob, {headers:{'Content-Type':'video/mp4','Content-Length':String(blob.size)}}));
}
async function refreshOffline(){
  const ids = Object.keys(VIDEOS);
  let n = 0;
  for(const id of ids) if(await isCached(VIDEOS[id].src)) n++;
  const mb = ids.reduce((s,id)=>s+VIDEOS[id].size,0) / 1e6;
  const btn = $('#offbtn');
  if(!hasCache){ $('#offlbl').innerHTML = '<b>오프라인 영상</b><br>이 브라우저는 저장을 지원하지 않습니다'; btn.style.display='none'; return; }
  $('#offlbl').innerHTML = '<b>오프라인 영상 ' + n + ' / ' + ids.length + '편 저장됨</b><br>전체 약 ' + mb.toFixed(0) + 'MB · 레슨 글은 자동 저장';
  btn.textContent = n === ids.length ? '저장 완료' : '전체 저장';
  btn.classList.toggle('ok', n === ids.length);
  btn.disabled = n === ids.length;
}
$('#offbtn').onclick = async () => {
  const btn = $('#offbtn'), bar = $('#offbar');
  btn.disabled = true; bar.style.display = 'block';
  const ids = Object.keys(VIDEOS);
  const total = ids.reduce((s,id)=>s+VIDEOS[id].size,0);
  let base = 0;
  try{
    for(const id of ids){
      const v = VIDEOS[id];
      if(!(await isCached(v.src))){
        btn.textContent = id.replace('ch','') + '장 저장 중…';
        await cacheVideo(v.src, got => { bar.firstChild.style.width = ((base + got) / total * 100).toFixed(1) + '%'; });
      }
      base += v.size;
      bar.firstChild.style.width = (base / total * 100).toFixed(1) + '%';
    }
  }catch(e){ alert('영상 저장 중 오류가 발생했습니다. 네트워크 연결을 확인한 뒤 다시 시도하세요.\n' + e.message); }
  bar.style.display = 'none';
  refreshOffline();
  if(current && current.video) renderLesson(current);
};

/* ---------------- video block ---------------- */
function renderVideo(id){
  const v = VIDEOS[id];
  const box = el('div');
  const wrap = el('div','vwrap');
  const vid = document.createElement('video');
  vid.controls = true; vid.playsInline = true; vid.preload = 'metadata';
  vid.setAttribute('playsinline',''); vid.poster = v.poster;
  vid.src = v.src;
  const tr = document.createElement('track');
  tr.kind = 'subtitles'; tr.srclang = 'ko'; tr.label = '한국어'; tr.src = v.vtt; tr.default = true;
  vid.appendChild(tr);
  wrap.appendChild(vid);
  box.appendChild(wrap);

  const bar = el('div','vbar');
  const sub = el('button','vbtn','자막 끄기'); sub.type = 'button';
  sub.onclick = () => {
    const t = vid.textTracks[0]; if(!t) return;
    t.mode = t.mode === 'showing' ? 'hidden' : 'showing';
    sub.textContent = t.mode === 'showing' ? '자막 끄기' : '자막 켜기';
  };
  const speed = el('button','vbtn','속도 1.0×'); speed.type = 'button';
  const rates = [1, 1.25, 1.5, 0.9];
  speed.onclick = () => {
    const i = (rates.indexOf(vid.playbackRate) + 1) % rates.length;
    vid.playbackRate = rates[i]; speed.textContent = '속도 ' + rates[i].toFixed(rates[i] % 1 ? 2 : 1).replace(/0$/,'') + '×';
  };
  const dl = el('button','vbtn pri','이 영상 오프라인 저장'); dl.type = 'button';
  const stat = el('span','vstat', '약 ' + Math.round(v.duration/60) + '분 · ' + (v.size/1e6).toFixed(1) + 'MB');
  isCached(v.src).then(ok => { if(ok){ dl.textContent = '✓ 오프라인 저장됨'; dl.className = 'vbtn ok'; dl.disabled = true; } });
  if(!hasCache) dl.style.display = 'none';
  dl.onclick = async () => {
    dl.disabled = true;
    try{
      await cacheVideo(v.src, (got,total) => { dl.textContent = '저장 중… ' + (total ? Math.round(got/total*100) : Math.round(got/1e6)) + (total ? '%' : 'MB'); });
      dl.textContent = '✓ 오프라인 저장됨'; dl.className = 'vbtn ok';
      refreshOffline();
    }catch(e){ dl.disabled = false; dl.textContent = '저장 실패 · 다시 시도'; }
  };
  bar.appendChild(sub); bar.appendChild(speed); bar.appendChild(dl); bar.appendChild(stat);
  box.appendChild(bar);

  const marks = el('div','marks');
  marks.style.marginTop = '18px';
  marks.appendChild(el('div','mh','영상 목차 · 누르면 해당 장면으로 이동'));
  const mbtns = v.marks.map((m,i) => {
    const b = el('button'); b.type = 'button';
    b.appendChild(el('span','tm', fmt(m.t)));
    b.appendChild(el('span',null, m.title));
    b.onclick = () => { vid.currentTime = m.t + 0.05; vid.play().catch(()=>{}); window.scrollTo({top:0, behavior:'smooth'}); };
    marks.appendChild(b);
    return b;
  });
  box.appendChild(marks);

  const resume = ST.vpos[id];
  vid.addEventListener('loadedmetadata', () => { if(resume && resume > 5 && resume < v.duration - 10) vid.currentTime = resume; }, {once:true});
  let lastSave = 0;
  vid.addEventListener('timeupdate', () => {
    const t = vid.currentTime;
    let k = 0; v.marks.forEach((m,i) => { if(t >= m.t) k = i; });
    mbtns.forEach((b,i) => b.classList.toggle('on', i === k));
    if(Math.abs(t - lastSave) > 5){ lastSave = t; ST.vpos[id] = t; save(); }
  });
  vid.addEventListener('ended', () => {
    ST.vpos[id] = 0;
    const lid = id + '-v';
    if(!ST.done[lid]){ ST.done[lid] = true; buildToc(); buildTabs(); updateProgress(); const d = $('.donebtn'); if(d){ d.className = 'donebtn is-done'; d.textContent = '✓ 이 영상을 시청했습니다'; } }
    save();
  });
  return box;
}

/* ---------------- block renderer ---------------- */
function renderBlock(b, id){
  const t = b[0];
  let node;
  if(t === 'h'){ node = el('h3','sec',b[1]); }
  else if(t === 'h4'){ node = el('h4','sub',b[1]); }
  else if(t === 'p'){ node = el('p','tx',b[1]); }
  else if(t === 'ul' || t === 'ol'){
    node = el(t === 'ul' ? 'ul' : 'ol','li');
    b[1].forEach(x => node.appendChild(el('li',null,x)));
  }
  else if(t === 'ui'){
    node = el('div','uilist');
    b[1].forEach(r => {
      const row = el('div','row');
      row.appendChild(el('div','n',r[0]));
      const c = el('div');
      c.appendChild(el('div','nm',r[1]));
      c.appendChild(el('div','ds',r[2]));
      row.appendChild(c);
      node.appendChild(row);
    });
  }
  else if(t === 'prompt'){
    node = el('div','prompt');
    const h = el('div','ph');
    h.appendChild(el('span','who', b[2] ? strip(b[2]) : '프롬프트'));
    const btn = el('button','copy','복사');
    btn.type = 'button';
    btn.onclick = () => {
      const done = () => { btn.textContent = '복사됨'; btn.classList.add('ok'); setTimeout(()=>{ btn.textContent='복사'; btn.classList.remove('ok'); },1600); };
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(b[1]).then(done).catch(()=>{ fallbackCopy(b[1]); done(); });
      } else { fallbackCopy(b[1]); done(); }
    };
    h.appendChild(btn);
    node.appendChild(h);
    const pre = el('pre'); pre.textContent = b[1];
    node.appendChild(pre);
  }
  else if(t === 'out'){
    node = el('div','output');
    const h = el('div','oh');
    h.appendChild(el('span','star','✳'));
    h.appendChild(el('span',null, b[2] ? strip(b[2]) : '클로드 답변 예시'));
    node.appendChild(h);
    const body = el('div','ob'); body.textContent = b[1];
    node.appendChild(body);
    if(b[3]){
      const tr = el('div','trim');
      tr.appendChild(el('b',null,'예시'));
      tr.appendChild(el('span',null,'실제 답변은 이보다 길고, 실행할 때마다 표현이 조금씩 달라집니다.'));
      node.appendChild(tr);
    }
  }
  else if(t === 'tip'){
    node = el('div','tip');
    node.appendChild(el('span','lb','TIP'));
    node.appendChild(el('p',null,b[1]));
  }
  else if(t === 'sum'){
    node = el('div','summary');
    node.appendChild(el('div','st','핵심 정리'));
    const ul = el('ul');
    b[1].forEach(x => ul.appendChild(el('li',null,x)));
    node.appendChild(ul);
  }
  else if(t === 'tbl'){
    node = el('div','tblwrap');
    const cap = el('div','tblcap');
    cap.appendChild(el('span',null,b[1]));
    const wrap = el('div','tblscroll');
    const table = el('table');
    const thead = el('thead'); const tr = el('tr');
    b[2].forEach(h => tr.appendChild(el('th',null,h)));
    thead.appendChild(tr); table.appendChild(thead);
    const tb = el('tbody');
    b[3].forEach(r => {
      const row = el('tr');
      r.forEach(c => row.appendChild(el('td',null,c)));
      tb.appendChild(row);
    });
    table.appendChild(tb);
    if(b[4]){
      const f = document.createElement('input');
      f.type = 'search'; f.placeholder = '표 안에서 거르기';
      f.oninput = () => {
        const q = f.value.trim().toLowerCase();
        [...tb.rows].forEach(r => r.classList.toggle('hide', q !== '' && !r.textContent.toLowerCase().includes(q)));
      };
      cap.appendChild(f);
    }
    node.appendChild(cap);
    wrap.appendChild(table);
    node.appendChild(wrap);
  }
  else if(t === 'split'){
    node = el('div','split');
    b[1].forEach(c => {
      const col = el('div','col ' + (c.kind || ''));
      col.appendChild(el('div','lbl',c.lbl));
      if(c.q) col.appendChild(el('div','q','“' + c.q + '”'));
      col.appendChild(el('p',null,c.p));
      node.appendChild(col);
    });
  }
  else if(t === 'video'){ node = renderVideo(b[1]); }
  else { node = el('p','tx', String(b[1] || '')); }
  node.id = id;
  return node;
}
function fallbackCopy(text){
  const ta = document.createElement('textarea');
  ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.select();
  try{ document.execCommand('copy'); }catch(e){}
  ta.remove();
}

/* ---------------- quiz ---------------- */
function renderQuiz(lesson){
  const wrap = el('div','quiz');
  const head = el('div','quiz-h');
  head.appendChild(el('h3',null,'확인 문제'));
  const score = el('div','score');
  head.appendChild(score);
  wrap.appendChild(head);
  function refresh(){
    let ok = 0, ans = 0;
    lesson.quiz.forEach((q,i) => { const v = ST.quiz[lesson.id + ':' + i]; if(v){ ans++; if(v === 'o') ok++; } });
    score.textContent = ok + ' / ' + lesson.quiz.length + ' 정답 · ' + ans + '문항 응답';
    updateProgress();
  }
  lesson.quiz.forEach((q,i) => {
    const key = lesson.id + ':' + i;
    const card = el('div','q');
    card.appendChild(el('div','qn','Q' + (i+1)));
    card.appendChild(el('div','qt', q.q));
    const expl = el('div','expl', q.e);
    if(q.t === 'choice'){
      const opts = el('div','opts');
      const btns = [];
      q.o.forEach((o,j) => {
        const b = el('button','opt'); b.type = 'button';
        b.appendChild(el('span','mk', String.fromCharCode(65+j)));
        b.appendChild(el('span',null,o));
        b.onclick = () => {
          btns.forEach(x => x.disabled = true);
          btns[q.a].classList.add('correct');
          if(j !== q.a) b.classList.add('wrong');
          ST.quiz[key] = (j === q.a) ? 'o' : 'x';
          save(); expl.classList.add('show'); refresh();
        };
        btns.push(b); opts.appendChild(b);
      });
      card.appendChild(opts);
      if(ST.quiz[key]){ btns.forEach(x => x.disabled = true); btns[q.a].classList.add('correct'); expl.classList.add('show'); }
    } else {
      const row = el('div','fillrow');
      const inp = document.createElement('input');
      inp.type = 'text'; inp.placeholder = '답을 입력하세요';
      const btn = el('button',null,'확인'); btn.type = 'button';
      const check = () => {
        const v = inp.value.trim().toLowerCase().replace(/\s+/g,'');
        const good = q.a.some(a => a.toLowerCase().replace(/\s+/g,'') === v);
        inp.classList.remove('ok','no'); inp.classList.add(good ? 'ok' : 'no');
        ST.quiz[key] = good ? 'o' : 'x';
        save(); expl.classList.add('show'); refresh();
      };
      btn.onclick = check;
      inp.onkeydown = e => { if(e.key === 'Enter') check(); };
      row.appendChild(inp); row.appendChild(btn);
      card.appendChild(row);
      if(ST.quiz[key]){ inp.classList.add(ST.quiz[key] === 'o' ? 'ok' : 'no'); expl.classList.add('show'); }
    }
    card.appendChild(expl);
    wrap.appendChild(card);
  });
  refresh();
  return wrap;
}

/* ---------------- lesson page ---------------- */
let current = null;
function renderLesson(lesson){
  current = lesson;
  ST.last = lesson.id; save();
  const page = $('#page');
  page.innerHTML = '';
  const head = el('div','lesson-head');
  const eb = el('div','eyebrow');
  eb.appendChild(el('span',null, (lesson.video ? 'Video' : 'Lesson ' + lesson.gno) + ' · ' + lesson.part.gnum + ' ' + lesson.part.short));
  head.appendChild(eb);
  head.appendChild(el('h2',null,lesson.title));
  head.appendChild(el('p','intro',lesson.intro));
  page.appendChild(head);
  const blocks = el('div','blocks');
  lesson.blocks.forEach((b,i) => blocks.appendChild(renderBlock(b, 'b-' + lesson.id + '-' + i)));
  page.appendChild(blocks);
  if(lesson.quiz && lesson.quiz.length) page.appendChild(renderQuiz(lesson));
  const doneTxt = () => lesson.video ? (ST.done[lesson.id] ? '✓ 이 영상을 시청했습니다' : '시청 완료로 표시하기') : (ST.done[lesson.id] ? '✓ 이 레슨을 완료했습니다' : '이 레슨 완료로 표시하기');
  const done = el('button','donebtn' + (ST.done[lesson.id] ? ' is-done' : ''));
  done.type = 'button';
  done.textContent = doneTxt();
  done.onclick = () => {
    ST.done[lesson.id] = !ST.done[lesson.id];
    save();
    done.className = 'donebtn' + (ST.done[lesson.id] ? ' is-done' : '');
    done.textContent = doneTxt();
    buildToc(); buildTabs(); updateProgress();
  };
  page.appendChild(done);
  const idx = LESSONS.indexOf(lesson);
  const nav = el('div','pagenav');
  const label = l => (l.video ? '▶ ' : l.gno + '. ') + l.title;
  if(idx > 0){
    const a = el('a','pv'); a.href = '#' + LESSONS[idx-1].id;
    a.appendChild(el('div','dir','← 이전'));
    a.appendChild(el('div','tt', label(LESSONS[idx-1])));
    nav.appendChild(a);
  }
  if(idx < LESSONS.length - 1){
    const a = el('a','nx'); a.href = '#' + LESSONS[idx+1].id;
    a.appendChild(el('div','dir','다음 →'));
    a.appendChild(el('div','tt', label(LESSONS[idx+1])));
    nav.appendChild(a);
  }
  page.appendChild(nav);
  if(idx === LESSONS.length - 1 || idx === 0){
    page.appendChild(el('div','about','이 가이드의 본문, 예시, 영상 대본은 해외영업 실무를 기준으로 새로 작성한 학습 자료입니다. 클로드의 메뉴 이름과 화면 배치는 업데이트에 따라 달라질 수 있습니다. 영상 내레이션은 음성 합성(Supertonic)으로 제작했습니다.'));
  }
  $('#crumb').textContent = lesson.part.gnum + ' ' + lesson.part.title + '  ›  ' + (lesson.video ? '영상 강의' : lesson.gno + '. ' + lesson.title);
  document.title = lesson.title + ' — 클로드 실습 가이드';
  buildToc();
  buildTabs();
  window.scrollTo(0,0);
}

/* ---------------- tab strip ---------------- */
function buildTabs(){
  const grp = $('#grp'), tabs = $('#tabs');
  grp.innerHTML = ''; tabs.innerHTML = '';
  PARTS.forEach((p, pi) => {
    if(pi > 0) grp.appendChild(el('span','sep','·'));
    const b = el('button', p === current.part ? 'on' : '', p.gnum + ' ' + p.short);
    b.type = 'button';
    b.onclick = () => { location.hash = '#' + p.lessons[0].id; };
    grp.appendChild(b);
  });
  let active = null;
  PARTS.forEach((p, pi) => {
    if(pi > 0) tabs.appendChild(el('span','tabsep'));
    p.lessons.forEach(l => {
      const a = el('a','tab' + (l === current ? ' on' : '') + (ST.done[l.id] ? ' done' : '') + (l.video ? ' vid' : ''));
      a.href = '#' + l.id; a.title = l.title;
      a.appendChild(el('div','n', l.video ? p.gnum : l.gno));
      a.appendChild(el('div','t', l.short));
      if(l === current) active = a;
      tabs.appendChild(a);
    });
  });
  if(active){
    const left = active.offsetLeft - (tabs.clientWidth - active.offsetWidth) / 2;
    tabs.scrollTo({left: Math.max(0, left), behavior: 'auto'});
  }
}

/* ---------------- toc + progress ---------------- */
function buildToc(){
  const toc = $('#toc');
  toc.innerHTML = '';
  PARTS.forEach(p => {
    const h = el('div','toc-part');
    h.appendChild(el('span','num',p.gnum));
    h.appendChild(el('span','ttl',p.title));
    toc.appendChild(h);
    p.lessons.forEach(l => {
      const a = el('a', l.video ? 'vid' : '');
      a.href = '#' + l.id;
      if(l === current) a.classList.add('on');
      if(ST.done[l.id]) a.classList.add('done');
      a.appendChild(el('span','idx', l.gno));
      a.appendChild(el('span',null, l.video ? '영상 강의 (' + Math.round(VIDEOS[l.video].duration/60) + '분)' : l.title));
      a.appendChild(el('span','dot'));
      toc.appendChild(a);
    });
  });
}
const C = 2 * Math.PI * 19, C2 = 2 * Math.PI * 8;
$('#ringfg').setAttribute('stroke-dasharray', C.toFixed(1));
$('#mringfg').setAttribute('stroke-dasharray', C2.toFixed(1));
function updateProgress(){
  const done = LESSONS.filter(l => ST.done[l.id]).length;
  const frac = done / LESSONS.length;
  const pct = Math.round(frac * 100);
  $('#ringfg').setAttribute('stroke-dashoffset', (C * (1 - frac)).toFixed(1));
  $('#mringfg').setAttribute('stroke-dashoffset', (C2 * (1 - frac)).toFixed(1));
  $('#ringtx').textContent = pct + '%';
  $('#mpct').textContent = pct + '%';
  const tl = TEXT_LESSONS.filter(l => ST.done[l.id]).length;
  const vl = done - tl;
  $('#progn').textContent = '레슨 ' + tl + '/' + TEXT_LESSONS.length + ' · 영상 ' + vl + '/' + (LESSONS.length - TEXT_LESSONS.length);
  const ok = Object.values(ST.quiz).filter(v => v === 'o').length;
  $('#progq').textContent = '퀴즈 ' + ok + ' / ' + TOTAL_Q + '문항 정답';
}
$('#resetbtn').onclick = () => {
  if(!confirm('진도와 퀴즈 기록을 모두 초기화할까요? (저장한 영상은 그대로 남습니다)')) return;
  ST.done = {}; ST.quiz = {}; ST.vpos = {}; save();
  renderLesson(current); updateProgress();
};

/* ---------------- routing ---------------- */
function route(){
  const id = location.hash.replace('#','') || ST.last;
  const l = LESSONS.find(x => x.id === id) || LESSONS[0];
  renderLesson(l);
  updateProgress();
  $('#side').classList.remove('open');
  $('#scrim').classList.remove('on');
}
window.addEventListener('hashchange', route);

/* ---------------- search ---------------- */
const INDEX = [];
const KIND = {h:'소제목',h4:'소제목',p:'본문',ul:'목록',ol:'단계',ui:'화면 요소',prompt:'프롬프트',out:'답변 예시',tip:'TIP',sum:'정리',tbl:'표',split:'비교'};
LESSONS.forEach(l => {
  INDEX.push({l, i:-1, txt: l.title + ' ' + l.intro, kind: l.video ? '영상' : '레슨 소개'});
  l.blocks.forEach((b,i) => {
    const t = b[0];
    let txt = '';
    if(t === 'video') txt = VIDEOS[b[1]].marks.map(m => m.title).join(' · ');
    else if(t === 'ul' || t === 'ol' || t === 'sum') txt = b[1].join(' · ');
    else if(t === 'ui') txt = b[1].map(r => r[1] + ' ' + r[2]).join(' · ');
    else if(t === 'tbl') txt = b[1] + ' · ' + b[2].join(' ') + ' · ' + b[3].map(r => r.join(' ')).join(' · ');
    else if(t === 'split') txt = b[1].map(c => c.lbl + ' ' + (c.q||'') + ' ' + c.p).join(' · ');
    else txt = String(b[1] || '');
    INDEX.push({l, i, txt: strip(txt), kind: t === 'video' ? '영상 목차' : (KIND[t] || '본문')});
  });
  (l.quiz||[]).forEach(q => INDEX.push({l, i:-1, txt: strip(q.q + ' ' + q.e), kind:'확인 문제'}));
});
function esc(s){ return s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
function snippet(txt, q){
  const at = txt.toLowerCase().indexOf(q.toLowerCase());
  const s = Math.max(0, at - 40);
  const cut = (s > 0 ? '…' : '') + txt.slice(s, at + q.length + 90) + (txt.length > at + q.length + 90 ? '…' : '');
  const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), 'ig');
  return esc(cut).replace(re, m => '<mark>' + m + '</mark>');
}
const ovl = $('#ovl'), sinput = $('#sinput'), results = $('#results');
function openSearch(){ ovl.classList.add('open'); sinput.focus(); sinput.select(); }
function closeSearch(){ ovl.classList.remove('open'); }
$('#searchbtn').onclick = openSearch;
ovl.onclick = e => { if(e.target === ovl) closeSearch(); };
document.addEventListener('keydown', e => {
  if(e.key === 'Escape') closeSearch();
  if(e.key === '/' && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)){ e.preventDefault(); openSearch(); }
});
sinput.oninput = () => {
  const q = sinput.value.trim();
  results.innerHTML = '';
  if(q.length < 1) return;
  const hits = INDEX.filter(r => r.txt.toLowerCase().includes(q.toLowerCase())).slice(0,40);
  if(!hits.length){ results.appendChild(el('div','nores','검색 결과가 없습니다.')); return; }
  hits.forEach(h => {
    const b = el('button','res'); b.type = 'button';
    b.appendChild(el('div','rl', (h.l.video ? h.l.part.gnum + ' 영상' : 'Lesson ' + h.l.gno + ' · ' + h.l.short) + ' · ' + h.kind));
    b.appendChild(el('div','rt', snippet(h.txt, q)));
    b.onclick = () => {
      closeSearch();
      const go = () => {
        if(h.i >= 0){
          const t = document.getElementById('b-' + h.l.id + '-' + h.i);
          if(t){ t.scrollIntoView({behavior:'smooth', block:'center'}); t.classList.remove('flash'); void t.offsetWidth; t.classList.add('flash'); }
        }
      };
      if(current.id === h.l.id) go();
      else { location.hash = '#' + h.l.id; setTimeout(go, 120); }
    };
    results.appendChild(b);
  });
};

/* ---------------- mobile drawer ---------------- */
$('#menubtn').onclick = () => { $('#side').classList.add('open'); $('#scrim').classList.add('on'); };
$('#scrim').onclick = () => { $('#side').classList.remove('open'); $('#scrim').classList.remove('on'); };

/* ---------------- service worker ---------------- */
if('serviceWorker' in navigator && location.protocol !== 'file:'){
  navigator.serviceWorker.register('sw.js').catch(()=>{});
}
if(navigator.storage && navigator.storage.persist){ navigator.storage.persist().catch(()=>{}); }

route();
refreshOffline();
