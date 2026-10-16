// Локальная реализация подмножества Figma Plugin API в браузере (для рисунков книги).
(function(){
  const W = {Regular:400, Medium:500, 'Semi Bold':600, Bold:700, 'Extra Bold':800, Black:900, Light:300, Thin:100, 'Extra Light':200};
  const nodes = new Map(); let seq = 1;
  const rgb = c => `rgb(${Math.round(c.r*255)},${Math.round(c.g*255)},${Math.round(c.b*255)})`;
  const paint = arr => { if(!arr || !arr.length) return null; const p = arr[0]; if(p.type !== 'SOLID') return null; const op = p.opacity ?? 1; const c = p.color; return `rgba(${Math.round(c.r*255)},${Math.round(c.g*255)},${Math.round(c.b*255)},${op})`; };
  const root = document.getElementById('canvas');
  window.__shots = [];

  class Base {
    constructor(type, tag='div'){ this.type=type; this.id='9:'+(seq++); this.el=document.createElement(tag); this.el.style.position='absolute'; this.el.style.left='0px'; this.el.style.top='0px'; this.el.style.boxSizing='border-box';
      this._x=0; this._y=0; this._w=100; this._h=100; this._fills=[]; this._strokes=[]; this._sw=1; this._r=0; this._dash=[]; this.parent=null; this.children=[]; this.name=type; this._op=1; this.exportSettings=[]; nodes.set(this.id,this); this.visible=true; }
    get x(){return this._x} set x(v){this._x=v; this.el.style.left=v+'px'}
    get y(){return this._y} set y(v){this._y=v; this.el.style.top=v+'px'}
    get width(){return this._w} get height(){return this._h}
    resize(w,h){ this._w=w; this._h=h; this.el.style.width=w+'px'; this.el.style.height=h+'px'; }
    get fills(){return this._fills} set fills(v){ this._fills=v; this._paint(); }
    get strokes(){return this._strokes} set strokes(v){ this._strokes=v; this._stroke(); }
    get strokeWeight(){return this._sw} set strokeWeight(v){ this._sw=v; this._stroke(); }
    get dashPattern(){return this._dash} set dashPattern(v){ this._dash=v; this._stroke(); }
    get cornerRadius(){return this._r} set cornerRadius(v){ this._r=v; if(this.type!=='ELLIPSE') this.el.style.borderRadius=v+'px'; }
    get opacity(){return this._op} set opacity(v){ this._op=v; this.el.style.opacity=v; }
    set strokeAlign(v){} set clipsContent(v){ this.el.style.overflow = v ? 'hidden' : 'visible'; }
    set placeholder(v){} set layoutMode(v){} set rotation(v){ this.el.style.transformOrigin='0 0'; this.el.style.transform=`rotate(${-v}deg)`; }
    _paint(){ this.el.style.background = paint(this._fills) || 'transparent'; }
    _stroke(){ const s = paint(this._strokes); if(!s){ this.el.style.border='none'; return; } this.el.style.border = `${this._sw}px ${this._dash && this._dash.length ? 'dashed' : 'solid'} ${s}`; }
    appendChild(n){ if(n.parent) n.parent._detach(n); this.children.push(n); n.parent=this; this.el.appendChild(n.el); }
    insertChild(i,n){ if(n.parent) n.parent._detach(n); const ref=this.children[i]; this.children.splice(i,0,n); n.parent=this; if(ref) this.el.insertBefore(n.el, ref.el); else this.el.appendChild(n.el); }
    _detach(n){ const i=this.children.indexOf(n); if(i>=0) this.children.splice(i,1); }
    remove(){ if(this.parent) this.parent._detach(this); this.el.remove(); nodes.delete(this.id); }
    findAll(fn){ const out=[]; const walk=n=>{ n.children.forEach(c=>{ if(!fn||fn(c)) out.push(c); walk(c); }); }; walk(this); return out; }
    findOne(fn){ return this.findAll(fn)[0]||null; }
    findAllWithCriteria({types}){ return this.findAll(n=>!types||types.includes(n.type)); }
    get absoluteBoundingBox(){ const r=this.el.getBoundingClientRect(); return {x:r.left,y:r.top,width:r.width,height:r.height}; }
    async screenshot(){ window.__shots.push(this.id); this.el.dataset.shot=this.id; return {}; }
    async exportAsync(){ return new Uint8Array(); }
    set(props){ Object.assign(this, props); return this; }
  }
  class Frame extends Base { constructor(){ super('FRAME'); this.el.style.overflow='hidden'; this.fills=[{type:'SOLID',color:{r:1,g:1,b:1}}]; this.resize(100,100);} }
  class Rect extends Base { constructor(){ super('RECTANGLE'); this.fills=[{type:'SOLID',color:{r:0.85,g:0.85,b:0.85}}]; this.resize(100,100);} }
  class Ellipse extends Base { constructor(){ super('ELLIPSE'); this.el.style.borderRadius='50%'; this.fills=[{type:'SOLID',color:{r:0.85,g:0.85,b:0.85}}]; this.resize(100,100);} }
  class Text extends Base {
    constructor(){ super('TEXT'); this._chars=''; this._font={family:'Inter',style:'Regular'}; this._size=12; this._auto='WIDTH_AND_HEIGHT'; this._lh=null; this._ls=null; this._align='LEFT';
      Object.assign(this.el.style,{whiteSpace:'pre',fontFamily:'Inter, sans-serif',fontSize:'12px',lineHeight:'normal',width:'auto',height:'auto',fontFeatureSettings:'"calt" 0'}); this.fills=[{type:'SOLID',color:{r:0,g:0,b:0}}]; }
    _paint(){ this.el.style.color = paint(this._fills) || 'transparent'; }
    get characters(){return this._chars} set characters(v){ this._chars=String(v); this.el.textContent=this._chars; }
    get fontName(){return this._font} set fontName(v){ this._font=v; this.el.style.fontWeight=W[v.style]||400; this.el.style.fontStyle=/Italic/.test(v.style)?'italic':'normal'; }
    get fontSize(){return this._size} set fontSize(v){ this._size=v; this.el.style.fontSize=v+'px'; this._lhApply(); }
    get lineHeight(){return this._lh||{unit:'AUTO'}} set lineHeight(v){ this._lh=v; this._lhApply(); }
    _lhApply(){ const v=this._lh; if(!v||v.unit==='AUTO') this.el.style.lineHeight='normal'; else if(v.unit==='PERCENT') this.el.style.lineHeight=(v.value/100*this._size)+'px'; else this.el.style.lineHeight=v.value+'px'; }
    get letterSpacing(){return this._ls||{unit:'PIXELS',value:0}} set letterSpacing(v){ this._ls=v; this.el.style.letterSpacing = v.unit==='PERCENT' ? (v.value/100)+'em' : v.value+'px'; }
    get textAutoResize(){return this._auto} set textAutoResize(v){ this._auto=v; if(v==='HEIGHT'){ this.el.style.whiteSpace='pre-wrap'; this.el.style.overflowWrap='break-word'; this.el.style.width=this._w+'px'; this.el.style.height='auto'; } else if(v==='WIDTH_AND_HEIGHT'){ this.el.style.whiteSpace='pre'; this.el.style.width='auto'; this.el.style.height='auto'; } else { this.el.style.whiteSpace='pre-wrap'; } }
    get textAlignHorizontal(){return this._align} set textAlignHorizontal(v){ this._align=v; this.el.style.textAlign={LEFT:'left',CENTER:'center',RIGHT:'right',JUSTIFIED:'justify'}[v]; }
    set textAlignVertical(v){}
    get width(){ return this._auto==='WIDTH_AND_HEIGHT' ? this.el.offsetWidth : this._w; }
    get height(){ return (this._auto==='NONE') ? this._h : this.el.offsetHeight; }
    resize(w,h){ this._w=w; this._h=h; this.el.style.width=w+'px'; if(this._auto==='WIDTH_AND_HEIGHT'){ this._auto='HEIGHT'; this.el.style.whiteSpace='pre-wrap'; this.el.style.overflowWrap='break-word'; } if(this._auto==='NONE') this.el.style.height=h+'px'; }
    _runs(){ const st=this._cs||[]; const ch=this._chars; let html='',cur=null,buf=''; const esc=t=>t.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
      const key=i=>JSON.stringify(st[i]||{}); for(let i=0;i<=ch.length;i++){ const k=i<ch.length?key(i):null; if(k!==cur){ if(buf){ const o=JSON.parse(cur); html+='<span style="'+(o.w?'font-weight:'+o.w+';':'')+(o.c?'color:'+o.c+';':'')+(o.s?'font-size:'+o.s+'px;':'')+'">'+esc(buf)+'</span>'; } buf=''; cur=k; } if(i<ch.length) buf+=ch[i]; } this.el.innerHTML=html; }
    setRangeFontName(a,b,f){ this._cs=this._cs||[]; for(let i=a;i<b;i++){ this._cs[i]=Object.assign({},this._cs[i],{w:W[f.style]||400}); } this._runs(); }
    setRangeFills(a,b,fl){ this._cs=this._cs||[]; for(let i=a;i<b;i++){ this._cs[i]=Object.assign({},this._cs[i],{c:paint(fl)}); } this._runs(); }
    setRangeFontSize(a,b,v){ this._cs=this._cs||[]; for(let i=a;i<b;i++){ this._cs[i]=Object.assign({},this._cs[i],{s:v}); } this._runs(); }
    getStyledTextSegments(){ return [{characters:this._chars,start:0,end:this._chars.length,fontName:this._font}]; }
  }
  class Svg extends Base {
    constructor(svg){ super('FRAME'); const m=/width="([\d.]+)"/.exec(svg), n=/height="([\d.]+)"/.exec(svg); this.el.innerHTML=svg; const s=this.el.firstElementChild; this._w=m?+m[1]:24; this._h=n?+n[1]:24; s.style.display='block'; s.setAttribute('width','100%'); s.setAttribute('height','100%'); s.setAttribute('preserveAspectRatio','none'); s.style.overflow='visible'; this.el.style.overflow='visible'; this.resize(this._w,this._h); this._fills=[]; }
    _paint(){}
  }
  const page = { children: [], appendChild(n){ this.children.push(n); n.parent=null; root.appendChild(n.el); }, findAll(fn){ let o=[]; this.children.forEach(c=>{ if(!fn||fn(c)) o.push(c); o=o.concat(c.findAll(fn)); }); return o; }, findAllWithCriteria({types}){ return this.findAll(n=>!types||types.includes(n.type)); } };
  const mk = C => { const n = new C(); page.appendChild(n); return n; };
  window.figma = {
    currentPage: page, root: { children: [page] },
    createFrame: ()=>mk(Frame), createRectangle: ()=>mk(Rect), createEllipse: ()=>mk(Ellipse), createText: ()=>mk(Text),
    createNodeFromSvg: svg => { const n=new Svg(svg); page.appendChild(n); return n; },
    createAutoLayout: ()=>mk(Frame),
    loadFontAsync: async()=>{}, listAvailableFontsAsync: async()=>Object.keys(W).map(s=>({fontName:{family:'Inter',style:s}})),
    getNodeByIdAsync: async id => nodes.get(id) || null, setCurrentPageAsync: async()=>{},
    notify: ()=>{},
  };
})();
