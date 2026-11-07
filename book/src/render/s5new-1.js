// Глава 5 (новая), рисунки 5.1 и 5.2. Рендер: node run.js s5new-1.js 5-1 5-2
const sheet=figma.createFrame();sheet.name='Лист · Раздел 5 · часть 1';sheet.resize(2520,1640);sheet.fills=F('#D8D2C7');
IC.pin='<path d="M9 3h6l-1 6 3 3H7l3-3z"/><path d="M12 12v9"/>';
const TOP=f=>{const t=f.children[1];return t.y+t.height+30;};
function BUL(p,items,x,y,w,o={}){let yy=y;const s=o.size||15;items.forEach(it=>{E(p,x,yy+s*0.5,6,o.dot||P.acc);const t=T(p,it,x+15,yy,{size:s,width:w-15,lh:o.lh||132,c:o.c||P.ink,w:o.w||'r'});yy=t.y+t.height+(o.gap??7);});return yy-(o.gap??7);}
function TG(p,x,y,on){R(p,x,y,46,26,{fill:on?P.acc:'#CFC8BC',r:13});E(p,on?x+22:x+2,y+2,22,'#FFFFFF');}
function BAR(p,x,y,w,c){return R(p,x,y,w,9,{fill:c||P.line,r:5});}

// ===== 5.1
const f=FIG(sheet,0,'5.1','Что изменилось: хронология артефактов 2026 года');
let top=TOP(f);
const ws=[186,252,220,160,222],G=12;const xs=[56];for(let i=1;i<5;i++)xs.push(xs[i-1]+ws[i-1]+G);
const ev=[
 ['12.03.2026',P.ink,P.card,P.line,'Визуализации в ответе',null,['диаграммы, графики и интерактивные элементы прямо в ответе']],
 ['16.09.2026',P.acc,P.accT,P.acc,'«Новый Claude»',null,['чат и Cowork — один разговор','артефакт в любом разговоре','вкладка Artifacts','запуск Claude Docs и Claude Slides','Claude Design — в разговоре']],
 ['08.10.2026',P.grn,P.grnT,P.grn,'Выход из беты',null,['Docs, Slides, Design —\u00a0GA','Dashboards (beta)','Motion (beta)','совместное редактирование']],
 ['15.10.2026',P.blu,P.card,P.line,'Enterprise',null,['Claude Docs включён по умолчанию на Enterprise']],
 ['14.12.2026',P.red,P.redT,P.red,'Закрытие claude.ai/design','warn',['чаты и комментарии не переносятся','публичные ссылки перестают работать']]];
const AX=top+46;
R(f,56,AX-1.5,1070,3,{fill:P.ink,r:2});A(f,1110,AX,1142,AX,{c:P.ink,sw:3,head:12});
const CY=AX+30;const cards=[];let ch=0;
ev.forEach(([d,c,fill,st,h,ic,items],i)=>{const x=xs[i],w=ws[i],cx=x+w/2;
 TC(f,d,x,top,w,30,{size:20,w:'x',c});
 E(f,cx-11,AX-11,22,i===4?P.red:P.card,{stroke:c,sw:3});
 R(f,cx-1,AX+11,2,CY-AX-11,{fill:c,r:1});
 const r=R(f,x,CY,w,100,{fill,stroke:st,r:14,sw:i===1||i===4?2:1.5});
 let hx=x+16;if(ic){ICON(f,ic,x+16,CY+18,22,P.red,2.2);hx+=30;}
 const ht=T(f,h,hx,CY+18,{size:18,w:'b',c:i===0||i===3?P.ink:c,width:x+w-16-hx,lh:122});
 let yy=ht.y+ht.height+12;
 if(i===0){PILL(f,'бета',x+16,yy,{fill:P.ambT,c:P.amb,size:13,h:24});yy+=34;}
 const b=BUL(f,items,x+16,yy,w-32,{size:16,dot:c,gap:9});
 cards.push(r);ch=Math.max(ch,b-CY+20);});
cards.forEach((r,i)=>r.resize(ws[i],ch));
// две колонки внизу
const BY=CY+ch+40,BW=(1088-20)/2;
const lb=R(f,56,BY,BW,100,{fill:P.soft,stroke:'#CFC8BC',r:16});
ICB(f,'clock',76,BY+18,44,'#FFFFFF',P.mut);
T(f,'LEGACY-АРТЕФАКТЫ',134,BY+20,{size:14,w:'b',c:P.mut,ls:8});
T(f,'созданы в чате до 16.09.2026',134,BY+44,{size:18,w:'s'});
let lx=134;[['check','работают и публикуются',P.grn],['x','новые создать нельзя',P.red]].forEach(([ic,s,c])=>{ICON(f,ic,lx,BY+80,20,c,2.6);const t=T(f,s,lx+26,BY+79,{size:16,w:'m'});lx+=t.width+34;});
const rb=R(f,56+BW+20,BY,BW,100,{fill:P.bluT,stroke:P.blu,r:16});const RX=56+BW+20;
ICB(f,'layers',RX+20,BY+18,44,'#FFFFFF',P.blu);
T(f,'НОВЫЕ АРТЕФАКТЫ',RX+78,BY+20,{size:14,w:'b',c:P.blu,ls:8});
T(f,'с 16.09.2026 — шаблоны:',RX+78,BY+44,{size:18,w:'s'});
let px=RX+78;['Docs','Slides','Design','Dashboards','Motion'].forEach(s=>{px+=PILL(f,s,px,BY+76,{fill:'#FFFFFF',c:P.blu,size:14,h:28,stroke:P.blu})+8;});
lb.resize(BW,120);rb.resize(BW,120);
A(f,56+BW+2,BY+60,56+BW+18,BY+60,{c:P.ink,sw:2.4,head:8});
NOTE(f,'По состоянию на 7 ноября 2026 года. После 14.12.2026 проекты отдельного сайта claude.ai/design не открыть — экспортируйте макеты заранее.');

// ===== 5.2
const g=FIG(sheet,1,'5.2','Как включить артефакты и три способа начать');
top=TOP(g);
const CW=352,WH=410,WY=top+48;const cx=[56,56+368,56+736];
[['Включите возможность'],['Просьба, Output или /docs'],['Или откройте вкладку Artifacts']].forEach(([s],i)=>{NUM(g,i+1,cx[i],top,{d:32,size:16});T(g,s,cx[i]+44,top+5,{size:17,w:'b',width:CW-44});});
// окно 1 — Settings
let x=cx[0];let y=WIN(g,x,WY,CW,WH,'Settings');
T(g,'Capabilities',x+24,y+20,{size:20,w:'b'});
BAR(g,x+24,y+70,170);BAR(g,x+24,y+86,110,'#EEE8DE');TG(g,x+CW-70,y+68,false);
const hy=y+116;R(g,x+14,hy,CW-28,112,{fill:P.accT,stroke:P.acc,r:12,sw:2});
T(g,'Create and edit files',x+28,hy+16,{size:17,w:'b'});TG(g,x+CW-70,hy+14,true);
T(g,'в старом интерфейсе — «Cloud code execution and file creation»',x+28,hy+50,{size:14,c:P.mut,width:CW-60,lh:132});
const ny=WY+WH-102;R(g,x+14,ny,CW-28,88,{fill:P.soft,r:12});ICON(g,'user',x+28,ny+16,22,P.mut,2);
T(g,'Team / Enterprise: Organization settings → Capabilities, управляет владелец',x+60,ny+14,{size:14.5,w:'m',width:CW-90,lh:135,c:P.ink});
// окно 2 — разговор
x=cx[1];y=WIN(g,x,WY,CW,WH,'Разговор');
R(g,x+CW-190,y+18,166,40,{fill:P.soft,r:12});BAR(g,x+CW-176,y+28,130,'#DCD4C6');BAR(g,x+CW-176,y+42,90,'#DCD4C6');
// поле ввода
const iy=WY+WH-96;R(g,x+14,iy,CW-28,82,{fill:P.card,stroke:'#CFC8BC',r:14});
T(g,'/docs',x+30,iy+12,{size:17,w:'m',c:P.ink});R(g,x+82,iy+13,2,22,{fill:P.acc,r:1});
const ob=R(g,x+28,iy+44,112,30,{fill:P.accT,stroke:P.acc,r:8,sw:2});ICON(g,'layers',x+38,iy+50,18,P.acc,2.2);T(g,'Output',x+62,iy+50,{size:15,w:'b',c:P.acc});ICON(g,'chev',x+118,iy+52,14,P.acc,2.4);
ICB(g,'up',x+CW-58,iy+42,32,P.acc,'#FFFFFF');
// меню шаблонов
const items=[['doc','Docs',0],['slides','Slides',0],['layers','Design',0],['chart','Dashboards',1],['play','Motion',1]];
const MH=items.length*36+14,my=iy-MH-8;R(g,x+28,my,230,MH,{fill:P.card,stroke:P.ink,r:12,sw:1.5});
items.forEach(([ic,s,b],k)=>{const yy=my+7+k*36;if(k===0)R(g,x+34,yy,218,34,{fill:P.soft,r:8});ICON(g,ic,x+46,yy+7,20,P.ink,2);const t=T(g,s,x+76,yy+7,{size:16,w:'m'});if(b)PILL(g,'beta',x+76+t.width+8,yy+6,{fill:P.ambT,c:P.amb,size:12,h:22,px:8});});
A(g,x+124,iy+42,x+124,my+MH+4,{c:P.acc,sw:2,head:7});
// окно 3 — вкладка Artifacts
x=cx[2];y=WIN(g,x,WY,CW,WH,'claude.ai');
const SBW=126;R(g,x+1,y,SBW,WY+WH-y-1,{fill:'#F6F2EB',r:0});R(g,x+1,WY+WH-14,SBW,13,{fill:'#F6F2EB',r:12});
[0,1,2].forEach(k=>BAR(g,x+16,y+24+k*30,[70,60,76][k],'#DCD4C6'));
const ay=y+112;R(g,x+8,ay,SBW-14,36,{fill:P.accT,stroke:P.acc,r:8,sw:2});ICON(g,'layers',x+16,ay+9,18,P.acc,2.2);T(g,'Artifacts',x+40,ay+9,{size:15,w:'b',c:P.acc});
[0,1].forEach(k=>BAR(g,x+16,ay+56+k*30,[64,80][k],'#DCD4C6'));
const gx=x+SBW+14,gw=CW-SBW-28;T(g,'Artifacts',gx,y+18,{size:17,w:'b'});
[['Weekly Report — CIS & LATAM','doc',1],['SMC — трекер поставок','sheet',1],['Калькулятор MedTech Tashkent','money',0]].forEach(([s,ic,pin],k)=>{const yy=y+54+k*100;R(g,gx,yy,gw,90,{fill:P.card,stroke:P.line,r:10});R(g,gx,yy,gw,30,{fill:P.soft,r:10});R(g,gx,yy+20,gw,10,{fill:P.soft,r:0});ICON(g,ic,gx+10,yy+6,18,P.mut,2);
 if(pin)ICON(g,'pin',gx+gw-30,yy+5,20,P.acc,2.2);T(g,s,gx+10,yy+38,{size:14,w:'s',width:gw-20,lh:125});});
// плашка про ошибки
const BY2=WY+WH+22;R(g,56,BY2,1088,54,{fill:P.ambT,r:12});ICON(g,'warn',76,BY2+15,24,P.amb,2.2);
T(g,'Ошибка в артефакте? Кнопка Try fixing with Claude — без гарантии успеха',112,BY2+16,{size:16,w:'s',width:1010});
NOTE(g,'Макеты упрощены. Команда /docs начинает документ, /motion — ролик Motion. Артефакты расходуют лимиты тарифа.');
await f.screenshot({scale:1.5});await g.screenshot({scale:1.5});
return {top};
