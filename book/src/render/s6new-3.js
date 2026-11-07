// Глава 6 (новая): рисунки 6.3, 6.4. Запуск: node run.js s6new-3.js 6-3 6-4
Object.assign(IC,{pin:'<path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',cam:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7l2-3h4l2 3"/><circle cx="12" cy="13.5" r="3.5"/>',mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',share:'<path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 12v8h14v-8"/>',alarm:'<circle cx="12" cy="13" r="7"/><path d="M12 10v3l2 2M4 5l3-2M20 5l-3-2"/>',map:'<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/>',bell:'<path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>',photo:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-8 8"/>'});
const sheet=figma.createFrame();sheet.name='Лист · Глава 6 · часть 2';sheet.resize(2520,1640);sheet.fills=F('#D8D2C7');
function MW(s,size,w){const t=T(sheet,s,0,0,{size,w});const v=t.width;t.remove();return v;}
function CHIP(p,ic,s,x,y,c,ct){const w=MW(s,14.5,'m')+52;R(p,x,y,w,34,{fill:ct,r:17});ICON(p,ic,x+12,y+8,18,c,2);T(p,s,x+38,y+8,{size:14.5,w:'m'});return w;}

// ===== 6.3
const f=FIG(sheet,0,'6.3','Мобильное приложение: системные приложения и быстрый вызов');
const COLS=[{x:56,name:'iOS',c:P.blu,ct:P.bluT,apps:[['chat','Messages'],['mail','Mail'],['cal','Calendar'],['map','Maps'],['list','Reminders'],['pin','геолокация']]},
 {x:608,name:'Android',c:P.grn,ct:P.grnT,apps:[['chat','сообщения'],['mail','почта'],['cal','календарь'],['alarm','будильники и таймеры'],['map','карты']]}];
const CW=536;
COLS.forEach(col=>{const x=col.x;
 ICB(f,'phone',x,134,38,col.c,'#FFFFFF');T(f,col.name,x+50,138,{size:24,w:'x',c:col.c});
 const r=R(f,x,184,CW,10,{fill:P.card,stroke:P.line,r:14});
 T(f,'СИСТЕМНЫЕ ПРИЛОЖЕНИЯ · ВСЕ ТАРИФЫ',x+18,198,{size:12.5,w:'b',c:P.mut,ls:8});
 let cx=x+18,cy=224;col.apps.forEach(([ic,s])=>{const w=MW(s,14.5,'m')+52;if(cx+w>x+CW-18){cx=x+18;cy+=42;}CHIP(f,ic,s,cx,cy,col.c,col.ct);cx+=w+8;});
 r.resize(CW,cy+34+16-184);col.b=184+r.height;});
// общие пометки
let ny=Math.max(COLS[0].b,COLS[1].b)+12;
const NT=['Геолокация — не на Team/Enterprise','Напоминания — только iOS','Контакты — нет доступа','Здоровье — бета, Pro/Max/Ultra, только США'];
const NW=(1088-3*10)/4;const nts=[];let nh=0;
NT.forEach((s,i)=>{const x=56+i*(NW+10);const t=T(f,s,x+46,ny+12,{size:14,w:'m',width:NW-58,lh:128});nts.push(t);nh=Math.max(nh,t.height+24);});
NT.forEach((s,i)=>{const x=56+i*(NW+10);const r=R(f,x,ny,NW,nh,{fill:P.ambT,r:12});f.insertChild(f.children.indexOf(nts[i]),r);ICON(f,'warn',x+14,ny+(nh-22)/2,22,P.amb,2.2);nts[i].y=ny+(nh-nts[i].height)/2;});
// быстрый вызов
const QY=ny+nh+12,QH=212;
COLS.forEach((col,k)=>{const x=col.x;R(f,x,QY,CW,QH,{fill:P.card,stroke:P.line,r:14});
 T(f,'БЫСТРЫЙ ВЫЗОВ · '+(k?'ANDROID 8+':'iOS 18+'),x+18,QY+14,{size:12.5,w:'b',c:P.mut,ls:8});});
// iOS: домашний экран с виджетом
{const x=56+18,y=QY+40;R(f,x,y,170,156,{fill:'#DCE6F1',r:18});
 const wd=R(f,x+12,y+12,146,70,{fill:P.card,r:14});ICB(f,'spark',x+22,y+22,30,P.accT,P.acc);T(f,'Claude',x+60,y+27,{size:14,w:'b'});R(f,x+22,y+58,126,14,{fill:P.soft,r:7});
 for(let i=0;i<4;i++)R(f,x+12+i*38,y+96,30,30,{fill:'#FFFFFF',r:8,op:0.7});
 T(f,'виджет',x+12,y+134,{size:12.5,w:'m',c:P.mut});
 const rows=[['search','«Ask Claude»','Spotlight и Siri'],['photo','«Analyze Photo with Claude»',''],['share','меню «Поделиться»',''],['layers','Shortcuts','']];
 rows.forEach(([ic,a,b],i)=>{const ry=y+i*40;const rx=x+188;R(f,rx,ry,312,34,{fill:P.bluT,r:9});ICON(f,ic,rx+10,ry+8,18,P.blu,2);const t=T(f,a,rx+36,ry+8,{size:14.5,w:'s'});if(b)T(f,'— '+b,t.x+t.width+6,ry+8,{size:14.5,c:P.mut});});}
// Android: виджет с тремя кнопками
{const x=608+18,y=QY+40;R(f,x,y,500,156,{fill:'#DCEBE1',r:18});
 for(let i=0;i<5;i++)R(f,x+30+i*92,y+16,40,40,{fill:'#FFFFFF',r:20,op:0.7});
 const wy=y+70;R(f,x+30,wy,440,74,{fill:P.card,r:37});ICB(f,'spark',x+44,wy+14,46,P.accT,P.acc);T(f,'Claude',x+100,wy+26,{size:16,w:'b'});
 [['chat','чат'],['cam','камера'],['mic','диктовка']].forEach(([ic,s],i)=>{const bx=x+220+i*82;E(f,bx,wy+10,40,P.grn);ICON(f,ic,bx+10,wy+20,20,'#FFFFFF',2);TC(f,s,bx-20,wy+52,80,18,{size:12.5,w:'m',c:P.mut});});}
// нижняя полоса
const SY=QY+QH+12;const sb=R(f,56,SY,1088,40,{fill:P.dark,r:12});ICON(f,'bell',76,SY+16,24,'#F2B8A0',2);
const st=T(f,'С телефона: облачные задачи, коннекторы, навыки, проекты, задачи по расписанию, Claude Docs; push-уведомление, когда задача готова или нужен ваш ответ',114,SY+14,{size:15,w:'m',c:'#FFFFFF',width:1010,lh:132});sb.resize(1088,st.height+28);
NOTE(f,'Схематичный макет. Claude готовит сообщение или письмо — отправляете вы в системном приложении.');

// ===== 6.4
const g=FIG(sheet,1,'6.4','Общий контекст: Excel, PowerPoint, Word, Outlook');
const WW=310,WH=186,XL=56,XR=490,YT=184,YB=500;
function OW(x,y,title,st,c,o={}){R(g,x,y,WW,WH,{fill:P.card,stroke:o.dash?P.mut:P.line,r:14,dash:o.dash,sw:o.dash?1.6:1.5});R(g,x+1,y+1,WW-2,38,{fill:P.soft,r:13});R(g,x+1,y+26,WW-2,13,{fill:P.soft,r:0});
 R(g,x+14,y+12,14,14,{fill:c,r:4});T(g,title,x+36,y+10,{size:14,w:'s'});const b=st==='GA';const pw=MW(st,12,'b')+16;PILL(g,st,x+WW-pw-10,y+8,{size:12,w:'b',fill:b?P.grnT:P.ambT,c:b?P.grn:P.amb,h:22,px:8});return y+40;}
// условие
const cw=MW('Работает, если файлы открыты',15,'b')+52;const cx0=(XL+XR+WW)/2-cw/2;R(g,cx0,136,cw,34,{fill:P.dark,r:17});ICON(g,'eye',cx0+14,143,20,'#F2B8A0',2);T(g,'Работает, если файлы открыты',cx0+40,143,{size:15,w:'b',c:'#FFFFFF'});
// облако
const CCX=(XL+XR+WW)/2,CCY=(YT+WH+YB)/2;
const cl=[[-95,-20,90,66],[-52,-55,104,92],[22,-44,88,80],[-110,4,220,46]];
cl.forEach(([dx,dy,w,h],i)=>{if(i<3)E(g,CCX+dx,CCY+dy,w,P.accT,{h});else R(g,CCX+dx,CCY+dy,w,h,{fill:P.accT,r:23});});
TC(g,'Общий контекст разговора',CCX-100,CCY-34,200,60,{size:16,w:'b',c:P.acc,lh:120});
// Excel
let cy=OW(XL,YT,'Excel — Sales_Oct.xlsx','GA',P.grn);
[0,1,2].forEach(i=>{R(g,XL+14,cy+12+i*34,282,1,{fill:P.line,r:0});});
T(g,'План Казахстан',XL+20,cy+22,{size:14.5,w:'m'});
const old=T(g,'$1,30 млн',XL+150,cy+22,{size:14.5,c:P.mut});R(g,old.x-2,old.y+old.height/2,old.width+4,1.6,{fill:P.mut,r:0});
R(g,XL+228,cy+16,76,30,{fill:P.ambT,r:6,stroke:P.amb,sw:2});T(g,'$1,40 млн',XL+234,cy+22,{size:14.5,w:'b',c:P.ink});
[0,1].forEach(i=>{R(g,XL+20,cy+60+i*34,100,10,{fill:'#E8E2D8',r:5});R(g,XL+150,cy+60+i*34,64,10,{fill:'#E8E2D8',r:5});R(g,XL+234,cy+60+i*34,60,10,{fill:'#E8E2D8',r:5});});
NUM(g,1,XL+14,cy+108,{d:28,size:14});T(g,'допущение изменено',XL+50,cy+113,{size:14,w:'s',c:P.acc});
// PowerPoint
cy=OW(XR,YT,'PowerPoint — Отчёт_Сеул.pptx','GA',P.acc);
R(g,XR+14,cy+10,282,92,{fill:P.soft,r:8});
[[30,46],[60,30],[90,52],[120,22]].forEach(([dx,h],i)=>{const bx=XR+14+dx*2-20;R(g,bx,cy+94-h,22,h,{fill:'#CFC6B8',r:3});R(g,bx+26,cy+94-(i===0?72:h+8),22,i===0?72:h+8,{fill:i===0?P.acc:'#B9B2A6',r:3});});
ICON(g,'up',XR+86,cy+12,18,P.acc,2.4);
NUM(g,2,XR+14,cy+108,{d:28,size:14});T(g,'столбец на диаграмме обновлён',XR+50,cy+113,{size:14,w:'s',c:P.acc});
// Word
cy=OW(XR,YB,'Word — Записка_CEO.docx','GA',P.blu);
[260,240,0,250].forEach((w,i)=>{if(w)R(g,XR+20,cy+14+i*22,w,10,{fill:'#E8E2D8',r:5});});
R(g,XR+20,cy+58,110,10,{fill:'#E8E2D8',r:5});R(g,XR+138,cy+51,84,24,{fill:P.ambT,r:5,stroke:P.amb,sw:1.5});T(g,'$1,40 млн',XR+144,cy+54,{size:13.5,w:'b'});R(g,XR+230,cy+58,50,10,{fill:'#E8E2D8',r:5});
NUM(g,3,XR+14,cy+108,{d:28,size:14});T(g,'цифра в абзаце обновлена',XR+50,cy+113,{size:14,w:'s',c:P.acc});
// Outlook
cy=OW(XL,YB,'Outlook','Бета',P.blu,{dash:true});
T(g,'Черновик · Кому: Сеул',XL+20,cy+12,{size:14,w:'s',c:P.mut});
[250,220,180].forEach((w,i)=>R(g,XL+20,cy+40+i*20,w,10,{fill:'#E8E2D8',r:5}));
NUM(g,4,XL+14,cy+104,{d:28,size:14,fill:P.mut});const o4=T(g,'черновик письма в Сеул — отправка только вашим кликом',XL+50,cy+102,{size:14,w:'s',c:P.ink,width:246,lh:122});
// стрелки
A(g,XL+WW-40,YT+WH+4,CCX-70,CCY-36,{c:P.acc,sw:2.6,head:11});
A(g,CCX+70,CCY-40,XR+40,YT+WH+6,{c:P.acc,sw:2.6,head:11});
A(g,CCX+70,CCY+28,XR+40,YB-6,{c:P.acc,sw:2.6,head:11});
A(g,CCX-70,CCY+28,XL+WW-40,YB-6,{c:P.mut,sw:2.4,head:11,dash:true});
// справа: ограничения
const LX=828,LW=316;const lr=R(g,LX,136,LW,10,{fill:P.card,stroke:P.line,r:14});
T(g,'Ограничения',LX+20,154,{size:18,w:'b'});
const LIM=[['user','Pro, Max, Team, Enterprise'],['doc','Word: не 2016/2019, не iPad/Android, не .doc'],['sheet','Excel: нет макросов, VBA и Data tables'],['mail','Outlook: только Exchange Online, не iOS/Android']];
let ly=194;LIM.forEach(([ic,s])=>{ICB(g,ic,LX+18,ly,34,P.soft,P.ink);const t=T(g,s,LX+64,ly+6,{size:15,w:'m',width:LW-84,lh:132});ly=Math.max(ly+34,t.y+t.height)+18;});
lr.resize(LW,ly-136);
const hy=ly+14;const hr=R(g,LX,hy,LW,10,{fill:P.ambT,r:14});ICON(g,'clock',LX+18,hy+18,26,P.amb,2.2);
const ht=T(g,'История — отдельно для каждого файла',LX+56,hy+18,{size:15,w:'s',width:LW-76,lh:130});hr.resize(LW,ht.height+36);
NOTE(g,'Цифры — условный пример. Excel, PowerPoint и Word — GA, Outlook — бета.');
await f.screenshot({scale:1.5});await g.screenshot({scale:1.5});
return {QY,SY,sbh:sb.height,ly,hy,o4:o4.y+o4.height,CCY};
