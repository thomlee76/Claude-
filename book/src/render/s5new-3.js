// Глава 5 (новая), рисунки 5.3 и 5.4. Рендер: node run.js s5new-3.js 5-3 5-4
const sheet=figma.createFrame();sheet.name='Лист · Раздел 5 · часть 2';sheet.resize(2520,1640);sheet.fills=F('#D8D2C7');
const TOP=f=>{const t=f.children[1];return t.y+t.height+30;};
function PW(s,o){const t=T(sheet,s,0,0,{size:o.size||14,w:o.w||'s'});const w=t.width+2*(o.px||12);t.remove();return w;}
function PILLS(p,arr,x,y,maxW,o={}){let cx=x,cy=y;const h=o.h||28,gp=o.gap||8;arr.forEach(s=>{const w=PW(s,o);if(cx+w>x+maxW&&cx>x){cx=x;cy+=h+gp;}PILL(p,s,cx,cy,Object.assign({h},o));cx+=w+gp;});return cy+h;}
function BAR(p,x,y,w,c,h){return R(p,x,y,w,h||9,{fill:c||P.line,r:(h||9)/2});}

// ===== 5.3
const f=FIG(sheet,0,'5.3','Пять типов артефактов: тарифы, статус, экспорт');
let top=TOP(f);
const cw=[176,264,372,276];const xs=[56];for(let i=1;i<4;i++)xs.push(xs[i-1]+cw[i-1]);
R(f,56,top,1088,42,{fill:P.dark,r:10});['Тип','Для чего','Тарифы и статус','Export'].forEach((h,i)=>T(f,h.toUpperCase(),xs[i]+16,top+13,{size:13,w:'b',c:'#FFFFFF',ls:8}));
const rows=[
 ['doc','Docs','Живые документы, отчёты','GA','есть на iOS / Android','Free, Pro, Max, Ultra, Team, Enterprise','Word, PDF, Markdown, Google\u00a0Docs'],
 ['slides','Slides','Презентации (см. раздел 10)','GA',null,'Все тарифы','PowerPoint, PDF, Google Slides'],
 ['layers','Design','Макеты, одностраничники, лендинги','GA',null,'Все тарифы','.zip, PDF, PowerPoint, standalone HTML'],
 ['chart','Dashboards','Дашборды по хранилищам данных и коннекторам','бета','веб и десктоп','Pro, Max, Ultra, Team, Enterprise (на Enterprise выключен по умолчанию)','Отправка в Amplitude, Grafana, Hex, Mixpanel'],
 ['play','Motion','Анимированные ролики-объяснения','бета','веб и десктоп','Только Team и Enterprise','MP4']];
let y=top+48;
rows.forEach(([ic,n,what,st,plat,tar,fm],j)=>{
 const bg=R(f,56,y,1088,80,{fill:j%2?P.soft:P.card,stroke:P.line,r:10});
 const ga=st==='GA';
 const a=T(f,what,xs[1]+16,y+14,{size:15.5,width:cw[1]-32,lh:132});
 PILL(f,st,xs[2]+16,y+13,{fill:ga?P.grnT:P.ambT,c:ga?P.grn:P.amb,size:13,h:26,w:'b',stroke:ga?P.grn:P.amb});
 const b=T(f,tar,xs[2]+88,y+14,{size:15.5,width:cw[2]-104,lh:132});
 let bb=b.y+b.height;if(plat){const pt=T(f,plat,xs[2]+88,bb+2,{size:14,c:P.mut,w:'m'});bb=pt.y+pt.height;}
 const c=T(f,fm,xs[3]+16,y+14,{size:15.5,w:'m',width:cw[3]-32,lh:132});
 const h=Math.max(68,a.y+a.height-y+14,bb-y+14,c.y+c.height-y+14);bg.resize(1088,h);
 ICB(f,ic,xs[0]+14,y+(h-40)/2,40,ga?P.grnT:P.ambT,ga?P.grn:P.amb);
 const nt=T(f,n,xs[0]+64,y,{size:18,w:'b'});nt.y=y+(h-nt.height)/2;
 y+=h+6;});
const sy=y+12;
R(f,56,sy,1088,70,{fill:P.soft,stroke:'#CFC8BC',r:12,dash:true});ICON(f,'x',76,sy+23,24,P.mut,2.2);
const nt=T(f,'Не артефакт: визуализации в ответе (бета, временные, .svg/.html) и интерактивные коннекторы MCP Apps (карточка сервиса в чате)',112,sy+10,{size:15,w:'m',c:P.mut,width:1010,lh:132});nt.y=sy+(70-nt.height)/2;
NOTE(f,'GA — общий доступ, вышло из беты 08.10.2026. Для администраторов есть отдельный шаблон Design systems.');

// ===== 5.4
const g=FIG(sheet,1,'5.4','Claude Doc: вкладки, комментарий с @Claude и Edit with Claude');
top=TOP(g);
const WX=56,WW=1088,WHh=510;
const y0=WIN(g,WX,top,WW,WHh,'Weekly Report — CIS & LATAM — неделя 46');
// вкладки
let tx=WX+24;['요약','Детали','Дебиторка'].forEach((s,i)=>{const act=i===1;const t=T(g,s,0,0,{size:16,w:act?'b':'m',c:act?P.ink:P.mut});const w=t.width+32;t.x=tx+16;t.y=y0+16;
 if(act){const r=R(g,tx,y0+8,w,38,{fill:P.accT,r:8});g.insertChild(g.children.indexOf(t),r);R(g,tx+8,y0+46,w-16,3,{fill:P.acc,r:2});}tx+=w+8;});
R(g,WX+1,y0+52,WW-2,1.5,{fill:P.line,r:0});
// кнопки Share / Export
const exX=WX+WW-24-118,shX=exX-12-96;
R(g,shX,y0+10,96,34,{fill:P.dark,r:8});TC(g,'Share',shX,y0+10,96,34,{size:15,w:'s',c:'#FFFFFF'});
R(g,exX,y0+10,118,34,{fill:P.card,stroke:P.ink,r:8,sw:1.5});T(g,'Export',exX+18,y0+18,{size:15,w:'s'});ICON(g,'chev',exX+86,y0+19,16,P.ink,2.4);
// панель комментариев
const CX=WX+640,CWd=WX+WW-14-CX;
R(g,CX,y0+62,CWd,WHh-44-62-14,{fill:P.soft,r:12});
T(g,'Комментарии',CX+16,y0+78,{size:15,w:'b',c:P.mut});
// меню Export
const mx=exX+118-196,my=y0+50,MI=30;R(g,mx,my,196,4*MI+12,{fill:P.card,stroke:P.ink,r:10,sw:1.5});
[['doc','Word'],['doc','PDF'],['code','Markdown'],['globe','Google Docs']].forEach(([ic,s],k)=>{const yy=my+6+k*MI;if(k===0)R(g,mx+6,yy,184,MI-2,{fill:P.soft,r:6});ICON(g,ic,mx+16,yy+5,18,P.mut,2);T(g,s,mx+44,yy+5,{size:15,w:'m'});});
// документ
const DX=WX+32,DW=560;
T(g,'Детали',DX,y0+70,{size:24,w:'x'});
BAR(g,DX,y0+114,520);BAR(g,DX,y0+132,DW);BAR(g,DX,y0+150,380);
T(g,'Риски',DX,y0+180,{size:20,w:'b'});
const sy0=y0+218;R(g,DX-6,sy0-8,DW+12,46,{fill:'#CFE0F3',r:6});
BAR(g,DX,sy0,DW-10,'#8FB3DA');BAR(g,DX,sy0+18,DW-160,'#8FB3DA');
const px=DX+110,py=y0+170;R(g,px,py,250,40,{fill:P.dark,r:10});ICON(g,'spark',px+14,py+10,20,'#F0A58A',2.2);T(g,'Edit with Claude',px+42,py+10,{size:15,w:'s',c:'#FFFFFF'});
R(g,px+192,py+8,1.5,24,{fill:'#5A5652',r:0});ICON(g,'chat',px+210,py+9,22,'#FFFFFF',2);
// таблица после правки Claude
const ty=y0+278,tcw=[180,130,110,140];
R(g,DX-8,ty-10,DW+16,176,{fill:null,stroke:P.acc,r:10,sw:2,dash:true});
let cxx=DX;['Риск','Клиент','Сумма','Действие'].forEach((h,i)=>{R(g,cxx,ty,tcw[i]-4,28,{fill:P.soft,r:4});T(g,h,cxx+10,ty+5,{size:14,w:'b'});cxx+=tcw[i];});
[0,1,2].forEach(r=>{let c2=DX;tcw.forEach((w,i)=>{R(g,c2,ty+32+r*31,w-4,27,{fill:P.card,stroke:P.line,r:4});BAR(g,c2+10,ty+41+r*31,[120,80,56,90][i]-(r*7)%20,'#DCD4C6');c2+=w;});});
PILL(g,'изменено: Claude',DX,ty+130,{fill:P.accT,c:P.acc,size:13,h:26,w:'b',px:30});ICON(g,'spark',DX+9,ty+135,16,P.acc,2.4);
// ветка комментариев
const TX=CX+12,TWd=CWd-24;let cy=my+4*MI+12+12;
const thr=R(g,TX,cy,TWd,100,{fill:P.card,stroke:P.line,r:12});
A(g,DX+DW+8,sy0+14,TX-4,sy0+14,{c:P.blu,sw:1.8,head:0,dash:true});
function MSG(who,col,ini,txt,yy,o={}){if(ini==='*'){E(g,TX+14,yy,28,P.acc);ICON(g,'spark',TX+19,yy+5,18,'#FFFFFF',2.4);}else{E(g,TX+14,yy,28,col);TC(g,ini,TX+14,yy,28,28,{size:13,w:'b',c:'#FFFFFF'});}
 T(g,who,TX+52,yy+5,{size:14,w:'b'});const t=T(g,txt,TX+52,yy+27,{size:15,width:TWd-66,lh:130,w:o.w||'r'});
 if(o.at){t.setRangeFills(0,7,F(P.acc));t.setRangeFontName(0,7,{family:'Inter',style:'Bold'});}
 return t.y+t.height;}
cy+=12;cy=MSG('Руководитель (Сеул)',P.blu,'Р','리스크 부분을 표로 정리해 주세요',cy);
R(g,TX+14,cy+9,TWd-28,1,{fill:P.line,r:0});cy+=18;
cy=MSG('Вы',P.acc,'В','@Claude преврати раздел в таблицу…',cy,{at:1});
R(g,TX+52,cy+7,20,20,{fill:P.acc,r:5});ICON(g,'check',TX+54,cy+9,16,'#FFFFFF',3);T(g,'Send to Claude',TX+80,cy+8,{size:14,w:'m'});cy+=32;
R(g,TX+14,cy+4,TWd-28,1,{fill:P.line,r:0});cy+=12;
cy=MSG('Claude','','*','Заменил список таблицей из 4 столбцов, сумму взял с вкладки «Дебиторка»',cy);
thr.resize(TWd,cy+12-thr.y);
// плашка внизу
const by=top+WHh+12;R(g,56,by,1088,46,{fill:P.dark,r:12});ICON(g,'lock',76,by+11,24,'#FFFFFF',2);
T(g,'Доступ к Docs: Viewer / Editor. Удаление — без корзины',112,by+13,{size:16,w:'s',c:'#FFFFFF',width:1010});
NOTE(g,'Данные условные. Каждая правка подписана автором — человеком или Claude.');
await f.screenshot({scale:1.5});await g.screenshot({scale:1.5});
return {top,by,cy};
