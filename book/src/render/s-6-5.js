// Prepend /home/user/Claude-/book/src/figma-lib.js. fileKey f10Izw83ps7hP4Mm11Nr9V. Creates the sheet + figures 6.5, 6.6.
const SH=(a,y,r)=>[{type:'DROP_SHADOW',color:{r:0,g:0,b:0,a},offset:{x:0,y},radius:r,spread:0,visible:true,blendMode:'NORMAL'}];

const sheet=figma.createFrame();sheet.name='Лист · Раздел 6 · часть 2';sheet.resize(2520,1640);sheet.fills=F('#D8D2C7');

// ===== 6.5
const f=FIG(sheet,0,'6.5','Задача по расписанию: ежедневный бриф (настройка)');
WIN(f,56,140,1088,560,'Claude Cowork');
const sb=R(f,57,184,200,515,{fill:P.soft,r:0});sb.bottomLeftRadius=13;R(f,257,184,1,515,{fill:P.line,r:0});
[['chat','Chats'],['folder','Projects'],['clock','Scheduled'],['gear','Settings']].forEach(([ic,n],i)=>{const y=204+i*44;if(n==='Scheduled')R(f,69,y-8,176,38,{fill:P.card,r:10,stroke:P.line});ICON(f,ic,84,y,20,n==='Scheduled'?P.acc:P.mut,2);T(f,n,116,y+1,{size:15,w:n==='Scheduled'?'b':'m',c:n==='Scheduled'?P.acc:P.ink});});
T(f,'Scheduled',284,202,{size:24,w:'b'});
R(f,996,200,124,36,{fill:P.dark,r:10});ICON(f,'plus',1010,209,18,'#FFFFFF',2.2);T(f,'New task',1034,208,{size:15,w:'s',c:'#FFFFFF'});
[['Мониторинг тендеров KZ','Daily · 08:00'],['Отчёт по дебиторке','Weekly · Mon 09:00']].forEach(([a,b],i)=>{const y=256+i*56;R(f,284,y,836,46,{fill:P.card,stroke:P.line,r:10});T(f,a,302,y+13,{size:15,w:'m'});T(f,b,960,y+13,{size:15,c:P.mut});});
const ov=R(f,57,184,1086,515,{fill:P.dark,r:0,op:0.32});ov.bottomLeftRadius=13;ov.bottomRightRadius=13;
const MY=250,MX=320;
const md=R(f,MX,MY,760,436,{fill:P.card,r:16});md.effects=SH(0.22,10,30);
T(f,'Create scheduled task',MX+24,MY+20,{size:22,w:'b'});ICON(f,'x',MX+722,MY+24,18,P.mut,2);
R(f,MX,MY+62,760,1,{fill:P.line,r:0});
const L=MX+24,RX=MX+406;
function LAB(s,x,y,opt){const t=T(f,s,x,y,{size:14,w:'s',c:P.mut});if(opt)T(f,'необязательно',t.x+t.width+8,y,{size:14,c:'#A39E95'});}
function INP(x,y,w,h,txt,o={}){R(f,x,y,w,h,{fill:o.fill||P.card,stroke:o.stroke||P.line,r:10,sw:o.sw||1.5});if(o.icon)ICON(f,o.icon,x+12,y+(h-18)/2,18,P.mut,2);if(txt)T(f,txt,x+(o.icon?38:14),y+(h-19)/2,{size:15,w:o.w||'r',c:o.c||P.ink});if(o.chev)ICON(f,o.chev,x+w-30,y+(h-18)/2,18,P.mut,2);}
LAB('Task name',L,MY+78);INP(L,MY+98,352,40,'Утренний бриф: почта и календарь',{w:'m'});
LAB('Prompt',L,MY+152);R(f,L,MY+172,352,98,{fill:P.card,stroke:P.line,r:10});
T(f,'Собери письма за последние 24 часа от партнёров из KZ/UZ/BR/MX, встречи на сегодня, просроченные ответы…',L+14,MY+182,{size:15,width:324,lh:130});
LAB('Model',L,MY+284,true);INP(L,MY+304,352,40,'Claude Sonnet 5.5',{chev:'chev'});
LAB('Folder',L,MY+358,true);INP(L,MY+378,352,40,'',{icon:'folder'});
LAB('Approval mode',RX,MY+78);INP(RX,MY+98,330,40,'Select…',{c:P.mut,chev:'chev'});
LAB('Frequency',RX,MY+152);INP(RX,MY+172,204,40,'On weekdays',{w:'m',stroke:P.acc,sw:2,chev:'chev'});
INP(RX+214,MY+172,116,40,'07:30',{icon:'clock',w:'m'});
const pop=R(f,RX,MY+218,204,162,{fill:P.card,stroke:P.line,r:10});pop.effects=SH(0.16,6,18);
['Hourly','Daily','Weekly','On weekdays','Manually'].forEach((s,i)=>{const y=MY+224+i*30;const on=s==='On weekdays';if(on)R(f,RX+6,y,192,30,{fill:P.accT,r:8});T(f,s,RX+18,y+6,{size:15,w:on?'s':'r',c:on?P.acc:P.ink});if(on)ICON(f,'check',RX+170,y+6,18,P.acc,2.4);});
R(f,MX+636,MY+378,100,40,{fill:P.acc,r:10});TC(f,'Save',MX+636,MY+378,100,40,{size:15,w:'b',c:'#FFFFFF'});
T(f,'Cancel',MX+560,MY+388,{size:15,w:'m',c:P.mut});
NOTE(f,'Альтернатива: кнопка New task → Create with Claude — Claude сам задаст вопросы и предложит название, расписание и инструкцию, вы нажимаете Schedule. Схематичный макет.');

// ===== 6.6
const g=FIG(sheet,1,'6.6','Архитектура собственного агента компании');
function BL(x,y,w,ic,title,desc,c,ct,o={}){const r=R(g,x,y,w,64,{fill:o.fill||P.card,stroke:o.stroke||P.line,r:12,sw:o.sw||1.5});ICB(g,ic,x+14,y+14,36,ct,c);const t=T(g,title,x+62,y+12,{size:17,w:'b',c:o.tc||P.ink,width:w-76});let b=t.y+t.height;if(desc){const d=T(g,desc,x+62,b+3,{size:15,c:P.mut,width:w-76,lh:128});b=d.y+d.height;}r.resize(w,Math.max(64,b+13-y));return r;}
function COL(x,w,title,sub,c,ct){const pn=R(g,x,140,w,100,{fill:P.card,stroke:P.line,r:16});R(g,x,140,w,64,{fill:ct,r:16});R(g,x,180,w,24,{fill:ct,r:0});T(g,title,x+20,150,{size:20,w:'b',c});T(g,sub,x+20,177,{size:14,c:P.mut});return pn;}
const lp=COL(56,532,'Claude Agent SDK (Python / TypeScript)','библиотека: ваши разработчики запускают на своих серверах',P.blu,P.bluT);
const rp=COL(612,532,'Claude Managed Agents (beta)','агент, которого размещает Anthropic',P.pur,P.purT);
let y=220;const LB=[['term','Ваше приложение / сервер компании','где запускается агент'],['layers','Agent SDK','цикл агента, встроенные инструменты, субагенты, хуки, разрешения'],['sheet','Ваши системы','CRM, 1С, папка тендеров, почта'],['key','Claude API','доступ по ключу API']];
LB.forEach(([ic,t,d],i)=>{const r=BL(76,y,492,ic,t,d,P.blu,P.bluT,i===1?{stroke:P.blu,sw:2,fill:'#F5F9FD'}:{});y=r.y+r.height;if(i<3){A(g,322,y+3,322,y+19,{c:P.blu,sw:2.2,head:7});y+=22;}});
let ly=y;
y=220;const RB=[['bot','Agent','модель, системный промпт, инструменты, MCP-серверы, навыки'],['cloud','Environment','облачная песочница Anthropic или своя (self-hosted)'],['play','Session','запущенный экземпляр агента'],['chat','Events','сообщения и результаты']];const rr=[];
RB.forEach(([ic,t,d],i)=>{const r=BL(632,y,304,ic,t,d,P.pur,P.purT,i===2?{stroke:P.pur,sw:2,fill:'#F8F5FC'}:{});rr.push(r);y=r.y+r.height;if(i<3){A(g,784,y+3,784,y+19,{c:P.pur,sw:2.2,head:7});y+=22;}});
const ry=y;
function SIDE(x,y,w,ic,title,desc){const r=R(g,x,y,w,100,{fill:P.soft,r:12,stroke:P.pur,dash:true,sw:1.5});ICB(g,ic,x+14,y+14,36,'#FFFFFF',P.pur);const t=T(g,title,x+14,y+60,{size:16,w:'b',width:w-28,lh:120});const d=T(g,desc,x+14,t.y+t.height+4,{size:14,c:P.mut,width:w-28,lh:128});r.resize(w,d.y+d.height+14-y);return r;}
const v=SIDE(964,220,160,'lock','Vault','ключи и пароли — агент их не видит');
const sd=SIDE(964,v.y+v.height+18,160,'clock','Scheduled deployment','запуск по cron');
const s=rr[2];
A(g,962,v.y+v.height/2,940,v.y+v.height/2,{c:P.pur,sw:2,head:7});
A(g,962,sd.y+40,940,s.y+s.height/2,{c:P.pur,sw:2,head:7});
const PB=Math.max(ly,ry,sd.y+sd.height)+20;lp.resize(532,PB-140);rp.resize(532,PB-140);
const cy=PB+14;const cs=R(g,56,cy,1088,60,{fill:P.dark,r:14});ICON(g,'money',78,cy+16,26,'#F2B8A0',2);
const ct=T(g,'Стоимость: токены по тарифам модели; у Managed Agents ещё $0,08 за час работы сессии; веб-поиск $10 за 1000 запросов',120,cy+16,{size:16,w:'m',c:'#FFFFFF',width:1000,lh:135});cs.resize(1088,ct.height+32);
ICON(g,'user',56,714,18,P.acc,2);T(g,'Кому: ИТ-отдел или подрядчик, не менеджер напрямую.',82,715,{size:15,w:'s',c:P.ink});
await f.screenshot({scale:1.5});await g.screenshot({scale:1.5});
return {sheet:sheet.id,f:f.id,g:g.id,PB,cy,ly,ry};
