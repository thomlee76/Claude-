// Общая библиотека отрисовки иллюстраций (вставляется в начало каждого use_figma-вызова)
const H=h=>{h=h.replace('#','');return{r:parseInt(h.slice(0,2),16)/255,g:parseInt(h.slice(2,4),16)/255,b:parseInt(h.slice(4,6),16)/255}};
const P={bg:'#FAF7F2',card:'#FFFFFF',ink:'#1F1E1D',mut:'#6B6760',line:'#E3DCD0',acc:'#C96442',accT:'#F7E3D9',blu:'#2F6FB0',bluT:'#E2ECF7',grn:'#3C8A5A',grnT:'#E1F0E6',amb:'#B7801A',ambT:'#F8EBCF',pur:'#7458B0',purT:'#ECE5F6',red:'#B5453A',redT:'#F6DEDB',dark:'#2A2826',soft:'#F1ECE3'};
const W={r:'Regular',m:'Medium',s:'Semi Bold',b:'Bold',x:'Extra Bold'};
await Promise.all(Object.values(W).map(s=>figma.loadFontAsync({family:'Inter',style:s})));
const F=c=>[{type:'SOLID',color:H(c)}];
function R(p,x,y,w,h,o={}){const r=figma.createRectangle();p.appendChild(r);r.x=x;r.y=y;r.resize(w,h);r.cornerRadius=o.r??12;r.fills=o.fill===null?[]:F(o.fill||P.card);if(o.stroke){r.strokes=F(o.stroke);r.strokeWeight=o.sw||1.5;if(o.dash)r.dashPattern=[8,6];}if(o.op!=null)r.opacity=o.op;return r;}
function E(p,x,y,d,fill,o={}){const e=figma.createEllipse();p.appendChild(e);e.x=x;e.y=y;e.resize(d,o.h||d);e.fills=fill?F(fill):[];if(o.stroke){e.strokes=F(o.stroke);e.strokeWeight=o.sw||2;}if(o.op!=null)e.opacity=o.op;return e;}
function T(p,s,x,y,o={}){const t=figma.createText();p.appendChild(t);t.fontName={family:'Inter',style:W[o.w||'r']};t.fontSize=o.size||18;t.characters=String(s);t.fills=F(o.c||P.ink);if(o.lh)t.lineHeight={unit:'PERCENT',value:o.lh};if(o.ls)t.letterSpacing={unit:'PERCENT',value:o.ls};if(o.width){t.textAutoResize='HEIGHT';t.resize(o.width,t.height);}if(o.align)t.textAlignHorizontal=o.align;t.x=x;t.y=y;return t;}
// текст по центру прямоугольника
function TC(p,s,x,y,w,h,o={}){const t=T(p,s,x,y,Object.assign({align:'CENTER',width:w},o));t.y=y+(h-t.height)/2;return t;}
function BOX(p,x,y,w,h,s,o={}){R(p,x,y,w,h,{fill:o.fill||P.card,stroke:o.stroke===undefined?P.line:o.stroke,r:o.r??14,dash:o.dash,sw:o.sw});return TC(p,s,x+12,y,w-24,h,{size:o.size||18,w:o.w||'s',c:o.c||P.ink,lh:o.lh||125});}
function PILL(p,s,x,y,o={}){const t=T(p,s,0,0,{size:o.size||14,w:o.w||'s',c:o.c||P.ink});const px=o.px||12,h=o.h||(t.height+10);const r=R(p,x,y,t.width+px*2,h,{fill:o.fill||P.soft,r:h/2,stroke:o.stroke});p.insertChild(p.children.indexOf(r)+1,t);t.x=x+px;t.y=y+(h-t.height)/2;return t.width+px*2;}
function SVG(p,svg,x,y){const n=figma.createNodeFromSvg(svg);p.appendChild(n);n.x=x;n.y=y;n.fills=[];return n;}
function A(p,x1,y1,x2,y2,o={}){const c=o.c||P.mut,sw=o.sw||2.5,hd=o.head??12;const mx=Math.min(x1,x2)-hd,my=Math.min(y1,y2)-hd;const w=Math.abs(x2-x1)+2*hd,h=Math.abs(y2-y1)+2*hd;const a=Math.atan2(y2-y1,x2-x1);const X1=x1-mx,Y1=y1-my,X2=x2-mx,Y2=y2-my;let d=`M${X1} ${Y1} L${X2} ${Y2}`;if(hd>0){const h1x=X2-hd*Math.cos(a-0.5),h1y=Y2-hd*Math.sin(a-0.5),h2x=X2-hd*Math.cos(a+0.5),h2y=Y2-hd*Math.sin(a+0.5);d+=` M${h1x} ${h1y} L${X2} ${Y2} L${h2x} ${h2y}`;}return SVG(p,`<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${d}" stroke="${c}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"${o.dash?' stroke-dasharray="7 7"':''}/></svg>`,mx,my);}
const IC={doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',folder:'<path d="M3 6h6l2 2h10v11H3z"/>',cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',check:'<path d="M5 12l5 5 9-10"/>',chart:'<path d="M5 20V11M11 20V5M17 20v-6M3 20h18"/>',gear:'<circle cx="12" cy="12" r="3.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3.5 3.5 3.5 14.5 0 18M12 3c-3.5 3.5-3.5 14.5 0 18"/>',bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',spark:'<path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M16 16l5 5"/>',plug:'<path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0zM12 18v4"/>',term:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 9l4 3-4 3M12 15h6"/>',slides:'<rect x="3" y="4" width="18" height="12" rx="1"/><path d="M12 16v4M8 20h8"/>',bot:'<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 4v4M9 13v1M15 13v1M9 17h6"/>',brain:'<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a3 3 0 0 0-3-1zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1"/>',sheet:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>',shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',warn:'<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/>',play:'<path d="M7 4l13 8-13 8z"/>',repeat:'<path d="M4 12a8 8 0 0 1 14-5l2 2M20 12a8 8 0 0 1-14 5l-2-2M20 4v5h-5M4 20v-5h5"/>',link:'<path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1"/>',edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/>',plane:'<path d="M2 13l20-8-6 16-4-6z"/><path d="M12 15l-2 5"/>',hotel:'<path d="M3 21V5h12v16M15 10h6v11M7 9h2M11 9h2M7 13h2M11 13h2M7 17h2M11 17h2"/>',chat:'<path d="M4 5h16v11H9l-5 4z"/>',star:'<path d="M12 3l2.7 5.6 6.3.9-4.5 4.4 1 6.1L12 17l-5.5 3 1-6.1L3 9.5l6.3-.9z"/>',flag:'<path d="M5 21V4M5 4h12l-2 4 2 4H5"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',down:'<path d="M12 4v14M6 12l6 6 6-6"/>',cloud:'<path d="M7 18a5 5 0 0 1-.5-10A6 6 0 0 1 18 9a4.5 4.5 0 0 1 0 9z"/>',phone:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',code:'<path d="M8 6l-6 6 6 6M16 6l6 6-6 6"/>',list:'<path d="M9 6h12M9 12h12M9 18h12M4 6h.5M4 12h.5M4 18h.5"/>',money:'<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/>',key:'<circle cx="8" cy="14" r="4"/><path d="M11 11l9-9M17 5l3 3"/>',zap:'<path d="M4 12h4l3-8 4 16 3-8h2"/>',plus:'<path d="M12 5v14M5 12h14"/>',up:'<path d="M12 19V5M6 11l6-6 6 6"/>',chev:'<path d="M6 9l6 6 6-6"/>',right:'<path d="M9 6l6 6-6 6"/>',gauge:'<path d="M4 18a8 8 0 1 1 16 0"/><path d="M12 18l4-6"/>'};
function ICON(p,name,x,y,s=28,c=P.ink,sw=2){return SVG(p,`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="${c}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${IC[name]}</svg>`,x,y);}
// кружок-иконка
function ICB(p,name,x,y,d,bg,c){E(p,x,y,d,bg);return ICON(p,name,x+d*0.22,y+d*0.22,d*0.56,c,2);}
// номер-бейдж
function NUM(p,n,x,y,o={}){const d=o.d||34;E(p,x,y,d,o.fill||P.acc);return TC(p,String(n),x,y,d,d,{size:o.size||16,w:'b',c:'#FFFFFF'});}
// окно-макет интерфейса; возвращает y начала контента
function WIN(p,x,y,w,h,title,o={}){R(p,x,y,w,h,{fill:o.fill||P.card,stroke:P.line,r:14});R(p,x+1,y+1,w-2,43,{fill:o.bar||P.soft,r:13});R(p,x+1,y+30,w-2,14,{fill:o.bar||P.soft,r:0});[0,1,2].forEach(i=>E(p,x+18+i*20,y+16,12,['#E06C5A','#E3B341','#62B26B'][i]));if(title)T(p,title,x+90,y+13,{size:15,w:'m',c:P.mut});return y+44;}
function FIG(sheet,i,num,title){const f=figma.createFrame();sheet.appendChild(f);f.name='Рис. '+num;f.resize(1200,760);f.x=40+(i%2)*1240;f.y=40+Math.floor(i/2)*800;f.fills=F(P.bg);f.clipsContent=true;T(f,'РИС. '+num,56,40,{size:15,w:'b',c:P.acc,ls:14});T(f,title,56,64,{size:32,w:'b',width:1088,lh:115});return f;}
function NOTE(f,s){T(f,s,56,716,{size:14,c:P.mut,width:1088});}
// --- extra helpers / icons for 2.7–2.8
IC.img='<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 8"/>';
function TW(s,o){const t=T(figma.currentPage,s,0,0,o);const w=t.width;t.remove();return w;}
function PILLR(p,s,x,y,o={}){const w=PILL(p,s,x,y,o);if(o.rr!=null){const r=p.children[p.children.length-2];r.cornerRadius=o.rr;}return w;}
// Файл MvDtTWL7zo7gkRWp66io6B, лист 1:2 (там уже 2.5 = 2:2, 2.6 = 2:81)
const sheet=(()=>{const s=figma.createFrame();s.resize(2520,1640);s.fills=F('#D8D2C7');return s;})();

// ---------- 2.7
const f=FIG(sheet,2,'2.7','Папка проекта SMC: до и после');
const LX=56,LW=262,RX=372,RW=1144-372,TOP=140;
const lc=R(f,LX,TOP,LW,400,{fill:P.card,stroke:P.line,r:16});
const lh=R(f,LX,TOP,LW,48,{fill:P.redT,r:16});lh.bottomLeftRadius=0;lh.bottomRightRadius=0;
T(f,'До',LX+18,TOP+12,{size:20,w:'b',c:P.red});T(f,'SMC_Almaty',LX+62,TOP+16,{size:15,w:'s',c:P.red});
const files=[['doc','scan001.pdf'],['doc','КП новое (2).docx'],['doc','invoice_final_FINAL.pdf'],['img','фото монтаж.jpg'],['doc','договор MedLine подписан.pdf'],['sheet','Copy of schedule.xlsx'],['mail','письмо Dr Ahn.msg']];
let y=TOP+62;
files.forEach(([ic,s],k)=>{R(f,LX+12,y,LW-24,36,{fill:k%2?P.card:P.soft,r:8});ICON(f,ic,LX+20,y+9,18,P.mut,2);T(f,s,LX+46,y+9,{size:14,w:'m'});y+=40;});
T(f,'…',LX+22,y-4,{size:20,w:'b',c:P.mut});y+=26;
const rc=R(f,RX,TOP,RW,400,{fill:P.card,stroke:P.line,r:16});
const rh=R(f,RX,TOP,RW,48,{fill:P.grnT,r:16});rh.bottomLeftRadius=0;rh.bottomRightRadius=0;
T(f,'После',RX+18,TOP+12,{size:20,w:'b',c:P.grn});T(f,'SMC_Almaty — разделы проекта',RX+100,TOP+16,{size:15,w:'s',c:P.grn});
function FOLD(s,x,yy,o={}){ICON(f,'folder',x,yy+5,18,o.c||P.amb,2);T(f,s,x+26,yy+4,{size:15,w:o.sub?'m':'s',c:o.tc||P.ink});}
const tx1=RX+22,tx2=RX+400;let ty=TOP+64;
FOLD('01_Договоры',tx1,ty);ty+=30;FOLD('02_Поставки_и_логистика',tx1,ty);ty+=30;
['УЗИ','Рентген','Лаборатория'].forEach((s,k)=>{const lx=tx1+9;R(f,lx,ty-12,2,k===2?27:30,{fill:P.line,r:0});R(f,lx,ty+13,16,2,{fill:P.line,r:0});FOLD(s,tx1+30,ty,{sub:1,c:'#C9A45C'});ty+=30;});
FOLD('03_Монтаж_и_ввод',tx1,ty);ty+=30;
let ty2=TOP+64;['04_Обучение_персонала','05_Маркетинг','06_Финансы_и_счета'].forEach(s=>{FOLD(s,tx2,ty2);ty2+=30;});
R(f,tx2-8,ty2-3,240,30,{fill:P.ambT,r:8});FOLD('99_На_проверку',tx2,ty2,{c:P.amb,tc:'#7A5410'});ty2+=30;
const ty3=Math.max(ty,ty2)+10;
T(f,'Пример имени:',tx1,ty3+6,{size:14,w:'s',c:P.mut});
PILLR(f,'2026-09-14_Договор_MedLine-Kazakhstan.pdf',tx1+112,ty3,{fill:P.soft,c:P.ink,size:15,w:'s',h:32,rr:8});
const tby=ty3+50;
ICON(f,'sheet',tx1,tby,20,P.grn,2);T(f,'Реестр_SMC.xlsx',tx1+28,tby+1,{size:16,w:'b'});T(f,'фрагмент',tx1+28+TW('Реестр_SMC.xlsx',{size:16,w:'b'})+10,tby+3,{size:14,c:P.mut});
const hdr=['№','Файл','Тип','Контрагент','Дата','Сумма','Статус','Папка'];
const row=['12','2026-09-14_Догов…','Договор','ТОО MedLine KZ','14.09.2026','$184 000','подписан','01_Договоры'];
const PAD=8;const avail=RW-44;
const ws=hdr.map((h,i)=>Math.max(TW(h,{size:13,w:'b'}),i===3?0:TW(row[i],{size:14,w:'m'}))+PAD*2);
const fixed=ws.reduce((a,b,i)=>a+(i===3?0:b),0);ws[3]=avail-fixed;
const tx=tx1,t0=tby+30;
const kt=T(f,row[3],0,0,{size:14,w:'m',width:ws[3]-PAD*2,lh:125});const rhh=Math.max(36,kt.height+16);kt.remove();
const HH=34,TH=HH+rhh+30;
R(f,tx,t0,avail,TH,{fill:P.card,stroke:P.line,r:10});
const hb=R(f,tx+1,t0+1,avail-2,HH,{fill:P.grnT,r:9});hb.bottomLeftRadius=0;hb.bottomRightRadius=0;
let cx=tx;hdr.forEach((h,i)=>{T(f,h,cx+PAD,t0+9,{size:13,w:'b',c:P.grn});
 const tt=T(f,row[i],cx+PAD,0,{size:14,w:i===1?'s':'m',width:i===3?ws[3]-PAD*2:undefined,lh:125,c:i===6?P.grn:P.ink});tt.y=t0+HH+(rhh-tt.height)/2;
 T(f,'…',cx+PAD,t0+HH+rhh+4,{size:14,c:'#A39E95'});
 if(i>0)R(f,cx,t0+1,1,TH-2,{fill:P.line,r:0});cx+=ws[i];});
R(f,tx+1,t0+HH,avail-2,1,{fill:P.line,r:0});R(f,tx+1,t0+HH+rhh,avail-2,1,{fill:P.line,r:0});
const rEnd=t0+TH+18;
const CH=Math.max(rEnd,y)-TOP;lc.resize(LW,CH);rc.resize(RW,CH);
T(f,'47 файлов, 1 папка',LX+18,TOP+CH-36,{size:16,w:'b',c:P.red});
const ay=TOP+CH/2;A(f,LX+LW+8,ay,RX-8,ay,{c:P.ink,sw:3,head:12});
const sb=TOP+CH+16;
R(f,56,sb,1088,700-sb,{fill:P.dark,r:14});
T(f,'47 файлов вперемешку → 7 разделов проекта + реестр с датами, контрагентами, суммами и статусами',80,sb+(700-sb-24)/2,{size:17,w:'s',c:'#FFFFFF',width:1040});
NOTE(f,'Пример результата одной задачи Cowork; ничего не удалено — сомнительные файлы перенесены в 99_На_проверку.');

// ---------- 2.8
const g=FIG(sheet,3,'2.8','Права Claude в Cowork: три зоны');
const CW=352,GAP=16;
const cols=[
 [P.grn,P.grnT,'check','Может сам','в подключённых папках',['читать файлы','создавать новые файлы и папки','переименовывать и перемещать','запускать код в изолированной облачной среде','пользоваться коннекторами с разрешением „Always allow“']],
 [P.amb,P.ambT,'warn','Спрашивает подтверждение','',['окончательное удаление файлов — всегда, в любом режиме','действия через коннекторы с разрешением „Needs approval“','первое действие на новом сайте в браузере','доступ к каждому приложению при computer use']],
 [P.red,P.redT,'x','Не делает / недоступно','',['читать папки, которые вы не подключили','работать с локальными файлами, если Claude Desktop закрыт','использовать коннекторы со статусом „Blocked“','заходить во внутреннюю сеть компании из облачной среды']]];
const cards=[];let maxY=0;
cols.forEach(([c,t,ic,ti,sub,items],i)=>{const x=56+i*(CW+GAP);const y0=140;
 const card=R(g,x,y0,CW,300,{fill:P.card,stroke:P.line,r:16});
 const hd=R(g,x,y0,CW,70,{fill:t,r:16});hd.bottomLeftRadius=0;hd.bottomRightRadius=0;
 E(g,x+18,y0+15,40,c);ICON(g,ic,x+28,y0+25,20,'#FFFFFF',2.8);
 T(g,ti,x+70,y0+(sub?14:23),{size:i===1?17:19,w:'b',c:c});if(sub)T(g,sub,x+70,y0+40,{size:14,w:'s',c:c});
 let yy=y0+86;
 items.forEach((s,k)=>{const it=T(g,s,x+50,yy,{size:15,width:CW-70,lh:135});
  if(i===0){ICON(g,'check',x+20,yy+1,18,c,2.8);} else if(i===1){E(g,x+21,yy+3,16,null,{stroke:c,sw:2});E(g,x+27,yy+9,4,c);} else {ICON(g,'x',x+21,yy+2,16,c,2.8);}
  if(i===1&&k===0){it.setRangeFontName(s.indexOf('—'),s.length,{family:'Inter',style:'Bold'});}
  yy=it.y+it.height+14;});
 cards.push(card);maxY=Math.max(maxY,yy);});
const ch=maxY-140+4;cards.forEach(c=>c.resize(CW,ch));
const my=140+ch+22;
T(g,'РЕЖИМЫ ПОДТВЕРЖДЕНИЙ',56,my,{size:13,w:'b',c:P.mut,ls:10});
const modes=[[P.grn,'Manually approve','спрашивает перед каждым действием — для первых задач и папок с договорами'],[P.amb,'Automatically approve','проверяет каждое действие автоматически и останавливает рискованные; лимит расходуется быстрее'],[P.red,'Skip all approvals','не спрашивает и не проверяет — только для отдельной тестовой папки']];
const mh=700-(my+26);
modes.forEach(([c,n,d],i)=>{const x=56+i*(CW+GAP),y0=my+26;R(g,x,y0,CW,mh,{fill:P.card,stroke:P.line,r:12});R(g,x,y0,6,mh,{fill:c,r:3});
 const nt=T(g,n,x+22,0,{size:17,w:'b'});const dt=T(g,d,x+22,0,{size:15,c:P.mut,width:CW-40,lh:135});const tot=nt.height+4+dt.height;nt.y=y0+(mh-tot)/2;dt.y=nt.y+nt.height+4;});
NOTE(g,'Конкретное поведение зависит от выбранного режима подтверждений.');
await f.screenshot({scale:1.5});await g.screenshot({scale:1.5});
return {f:f.id,g:g.id,CH,ws,ch,my,mh};
