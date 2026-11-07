// Глава 6 (новая): рисунки 6.1, 6.2. Запуск: node run.js s6new-1.js 6-1 6-2
Object.assign(IC,{car:'<path d="M5 11l2-5h10l2 5"/><rect x="3" y="11" width="18" height="6" rx="2"/><circle cx="7.5" cy="19" r="1.5"/><circle cx="16.5" cy="19" r="1.5"/>',cursor:'<path d="M5 3l14 7-6 2-2 7z"/><path d="M13 12l5 5"/>',mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',wave:'<path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4"/>'});
const sheet=figma.createFrame();sheet.name='Лист · Глава 6 · часть 1';sheet.resize(2520,1640);sheet.fills=F('#D8D2C7');
function MW(s,size,w){const t=T(sheet,s,0,0,{size,w});const v=t.width;t.remove();return v;}

// ===== 6.1
const f=FIG(sheet,0,'6.1','Карта: где вы находитесь — какой Claude использовать');
const IT=[
 ['car','В такси','Голосовой режим',[['Бета','b'],'все тарифы']],
 ['phone','Минута с телефоном','Приложение iOS/Android, облачные задачи, Claude Docs',[['GA','g']]],
 ['sheet','В Excel / PowerPoint / Word','Надстройки Claude for Excel, PowerPoint, Word',[['GA','g'],'Pro, Max, Team, Enterprise']],
 ['mail','В Outlook','Claude for Outlook',[['Бета','b'],'Pro, Max, Team, Enterprise']],
 ['doc','В Google Docs, Sheets, Slides','Claude for Google Workspace / коннекторы Google',[['Бета','b'],'Pro–Enterprise']],
 ['chat','В Slack','Claude Tag',[['Бета','b'],'только Team, Enterprise']],
 ['fg','За компьютером','Trusted folders, встроенный браузер',[['GA','g'],'Linux — бета']],
 ['cursor','Программа без коннектора','Computer use',[['Бета','b'],'Pro, Max, Ultra; macOS, Windows']],
 ['cloud','Ушли от компьютера','Облачная задача / Remote Control',[['GA','g'],'Pro–Enterprise']]];
const CH=120,LX=56,RX=764,CW=380,rowsY=[136,282,428,574];
const CX=600,CY=392,CD=206;
// линии
const LC='#CFC6B8';
rowsY.forEach((y,i)=>{if(i<3){A(f,CX,CY,LX+CW,y+CH/2,{c:LC,sw:2,head:0});A(f,CX,CY,RX,y+CH/2,{c:LC,sw:2,head:0});}
 else{A(f,CX,CY,LX+CW,y+22,{c:LC,sw:2,head:0});A(f,CX,CY,RX,y+22,{c:LC,sw:2,head:0});}});
A(f,CX,CY,CX,rowsY[3],{c:LC,sw:2,head:0});
function CARD(x,y,w,it,n){const [ic,sit,dec,st]=it;const r=R(f,x,y,w,CH,{fill:P.card,stroke:P.line,r:14});const k0=f.children.length;
 if(ic==='fg'){E(f,x+14,y+16,44,P.accT);ICON(f,'folder',x+19,y+27,18,P.acc,2);ICON(f,'globe',x+35,y+27,18,P.acc,2);}else ICB(f,ic,x+14,y+16,44,P.accT,P.acc);
 const tx=x+72,tw=w-86;
 const a=T(f,sit,tx,y+14,{size:14,w:'s',c:P.mut,width:tw});
 const b=T(f,dec,tx,a.y+a.height+2,{size:16.5,w:'b',width:tw,lh:122});
 let px=tx,py=b.y+b.height+8;
 st.forEach(s=>{if(Array.isArray(s)){const g=s[1]==='g';const ww=PILL(f,s[0],px,py,{size:13,w:'b',fill:g?P.grnT:P.ambT,c:g?P.grn:P.amb,h:24,px:10});px+=ww+8;}
  else{const ww=MW(s,13,'m');if(px+ww>x+w-12){px=tx;py+=28;}T(f,s,px,py+4,{size:13,w:'m',c:P.mut});px+=ww+8;}});
 const hh=py+24+14-y;const H2=Math.max(CH,hh);r.resize(w,H2);const ch=f.children.slice(k0);const top=Math.min(...ch.map(c=>c.y)),bot=Math.max(...ch.map(c=>c.y+c.height));const off=y+(H2-(bot-top))/2-top;ch.forEach(c=>c.y+=off);return H2;}
const hs=[];
for(let i=0;i<4;i++){hs.push(CARD(LX,rowsY[i],CW,IT[i]));hs.push(CARD(RX,rowsY[i],CW,IT[i+4]));}
hs.push(CARD(470,rowsY[3],260,IT[8]));
// центр
E(f,CX-CD/2-10,CY-CD/2-10,CD+20,P.accT);E(f,CX-CD/2,CY-CD/2,CD,P.acc);
ICON(f,'spark',CX-17,CY-72,34,'#FFFFFF',2.4);
TC(f,'Claude',CX-CD/2,CY-28,CD,40,{size:34,w:'x',c:'#FFFFFF'});
TC(f,'один аккаунт',CX-CD/2,CY+16,CD,26,{size:17,w:'m',c:'#FFFFFF'});
NOTE(f,'Голосовой режим: русского нет — English или Korean. Статусы и тарифы — по состоянию на 7 ноября 2026 года.');

// ===== 6.2
const g=FIG(sheet,1,'6.2','Голосовой режим: включение, язык, модели');
function PHONE(x,y,w,h){R(g,x,y,w,h,{fill:P.dark,r:36});R(g,x+8,y+8,w-16,h-16,{fill:P.card,r:29});R(g,x+w/2-40,y+16,80,18,{fill:P.dark,r:9});}
// левый телефон: чат
const L1=56,PY=140,PH=492;PHONE(L1,PY,250,PH);
T(g,'Claude',L1+26,PY+48,{size:17,w:'b'});R(g,L1+8,PY+80,234,1,{fill:P.line,r:0});
const ub=R(g,L1+70,PY+98,156,10,{fill:P.soft,r:14});const ut=T(g,'Good morning. Check my calendar for today.',L1+84,PY+108,{size:14,width:128,lh:130});ub.resize(156,ut.height+20);
let yy=PY+108+ut.height+28;
[200,190,206,150].forEach(w=>{R(g,L1+26,yy,w,10,{fill:'#E8E2D8',r:5});yy+=20;});
yy+=14;[196,170].forEach(w=>{R(g,L1+26,yy,w,10,{fill:'#E8E2D8',r:5});yy+=20;});
const IY=PY+PH-74;R(g,L1+20,IY,210,46,{fill:P.soft,r:23,stroke:P.line});
ICON(g,'plus',L1+34,IY+13,20,P.mut,2);ICON(g,'mic',L1+144,IY+12,22,P.mut,2);
E(g,L1+180,IY+5,36,P.acc);ICON(g,'wave',L1+188,IY+13,20,'#FFFFFF',2.2);
E(g,L1+175,IY,46,null,{stroke:P.acc,sw:2});
// выноска
const CBY=330;const cb=R(g,326,CBY,186,100,{fill:P.accT,r:14});
const c1=T(g,'Запуск голосового режима',342,CBY+14,{size:15,w:'b',c:P.acc,width:156,lh:122});
const c0=T(g,'значок звуковой волны справа от микрофона',342,c1.y+c1.height+6,{size:14,c:P.ink,width:156,lh:128});
const c2=T(g,'на вебе и десктопе — справа внизу',342,c0.y+c0.height+6,{size:14,c:P.mut,width:156,lh:128});cb.resize(186,c2.y+c2.height+14-CBY);
A(g,360,cb.y+cb.height+4,L1+214,IY+10,{c:P.acc,sw:2.2,head:10});
// правый телефон: настройки
const L2=530;PHONE(L2,PY,300,PH);
const p1=T(g,'Settings > Capabilities → Voice > Spoken language',L2+24,PY+46,{size:13.5,w:'b',c:P.acc,width:252,lh:125});
const p2=T(g,'или Settings > General → Voice > Language',L2+24,p1.y+p1.height+4,{size:12.5,c:P.mut,width:252,lh:125});
R(g,L2+8,p2.y+p2.height+10,284,1,{fill:P.line,r:0});
const LG=['English','French','German','Hindi','Indonesian','Italian','Japanese','Korean','Portuguese (BR)','Spanish (LatAm)','Spanish (Spain)'];
let ly=p2.y+p2.height+18;const RH=29;let korY=0;
LG.forEach(s=>{const on=s==='English',ko=s==='Korean';
 if(on)R(g,L2+16,ly,268,RH-2,{fill:P.accT,r:8});
 if(ko){R(g,L2+16,ly,268,RH-2,{fill:P.bluT,r:8,stroke:P.blu,sw:2});korY=ly;}
 E(g,L2+28,ly+6,15,on?P.acc:null,{stroke:on?P.acc:'#B9B2A6',sw:1.6});if(on)E(g,L2+32,ly+10,7,'#FFFFFF');
 T(g,s,L2+54,ly+5,{size:14.5,w:on||ko?'s':'r',c:on?P.acc:P.ink});
 if(ko)PILL(g,'для Сеула',L2+190,ly+3,{size:12,w:'b',fill:P.blu,c:'#FFFFFF',h:21,px:8});
 ly+=RH;});
// правая колонка
const RX2=860,RW=284;
const rc=R(g,RX2,PY,RW,80,{fill:P.redT,r:14,stroke:P.red,sw:1.5});
ICB(g,'x',RX2+16,PY+18,42,P.red,'#FFFFFF');
T(g,'Русского нет',RX2+72,PY+16,{size:19,w:'b',c:P.red});
const rt=T(g,'язык не определяется автоматически',RX2+72,PY+44,{size:13.5,c:P.ink,width:200,lh:125});rc.resize(RW,rt.y+rt.height+14-PY);
let by=PY+rc.height+16;
const mb=R(g,RX2,by,RW,10,{fill:P.card,stroke:P.line,r:14});
T(g,'Модель в голосе',RX2+18,by+16,{size:16,w:'b'});
[['Opus',1],['Sonnet',1],['Haiku',1],['Fable',0]].forEach(([m,ok],i)=>{const y=by+50+i*34;
 if(ok){ICON(g,'check',RX2+18,y+2,20,P.grn,2.6);T(g,m,RX2+48,y+2,{size:15.5,w:'s'});T(g,'доступна',RX2+170,y+4,{size:13.5,c:P.grn,w:'m'});}
 else{R(g,RX2+10,y-4,RW-20,32,{fill:P.soft,r:8});ICON(g,'x',RX2+18,y+2,20,'#A39E95',2.4);T(g,m,RX2+48,y+2,{size:15.5,w:'s',c:'#A39E95'});T(g,'недоступен в голосе',RX2+110,y+4,{size:13.5,c:'#8E887E',w:'m'});}});
mb.resize(RW,50+4*34+10);by+=mb.height+16;
const mo=R(g,RX2,by,RW,10,{fill:P.card,stroke:P.line,r:14});
T(g,'Режим',RX2+18,by+16,{size:16,w:'b'});
[['Hands-free (по умолчанию)',1],['Push-to-talk',0]].forEach(([m,on],i)=>{const y=by+52+i*34;
 E(g,RX2+18,y+2,17,on?P.acc:null,{stroke:on?P.acc:'#B9B2A6',sw:1.6});if(on)E(g,RX2+23,y+7,7,'#FFFFFF');
 T(g,m,RX2+46,y,{size:15.5,w:on?'s':'r'});});
mo.resize(RW,52+2*34+8);
// нижняя полоса
const SY=PY+PH+16;const sb=R(g,56,SY,1088,52,{fill:P.dark,r:12});ICON(g,'plug',76,SY+14,24,'#F2B8A0',2);
const st=T(g,'Free: Haiku + 1 инструмент. Платные тарифы: все коннекторы — Gmail, Google Calendar, Google Docs, Slack, веб-поиск',114,SY+16,{size:15,w:'m',c:'#FFFFFF',width:1010,lh:130});sb.resize(1088,st.height+32);
NOTE(g,'Схематичный макет. Язык можно сменить и голосом прямо в разговоре; неанглийские языки — тоже бета.');
await f.screenshot({scale:1.5});await g.screenshot({scale:1.5});
return {korY,ly,SY,sbh:sb.height,hs};
