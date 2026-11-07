// Глава 5 (новая), рисунки 5.5 и 5.6. Рендер: node run.js s5new-5.js 5-5 5-6
const sheet=figma.createFrame();sheet.name='Лист · Раздел 5 · часть 3';sheet.resize(2520,1640);sheet.fills=F('#D8D2C7');
const TOP=f=>{const t=f.children[1];return t.y+t.height+30;};
function BAR(p,x,y,w,c,h){return R(p,x,y,w,h||9,{fill:c||P.line,r:(h||9)/2});}
function TG(p,x,y,on){R(p,x,y,46,26,{fill:on?P.acc:'#CFC8BC',r:13});E(p,on?x+22:x+2,y+2,22,'#FFFFFF');}
function RAD(p,x,y,on,dis){E(p,x,y,20,'#FFFFFF',{stroke:dis?'#CFC8BC':(on?P.acc:P.mut),sw:2});if(on)E(p,x+5,y+5,10,P.acc);}
function CYL(p,x,y,w,h,fill,st){const eh=34;E(p,x,y+h-eh,w,fill,{h:eh,stroke:st,sw:2});R(p,x,y+eh/2,w,h-eh,{fill,r:0});R(p,x-1,y+eh/2,2,h-eh,{fill:st,r:0});R(p,x+w-1,y+eh/2,2,h-eh,{fill:st,r:0});E(p,x,y,w,'#FFFFFF',{h:eh,stroke:st,sw:2});}

// ===== 5.5
const f=FIG(sheet,0,'5.5','Мини-приложение: чьи лимиты, чьи коннекторы, какое хранилище');
const T0=TOP(f);
// пользователи
const UX=56,UW=232,UH=104;const users=[['Вы (автор)',P.acc,P.accT],['Логист',P.blu,P.bluT],['Сервисный инженер',P.grn,P.grnT]];
const uy=[T0,T0+144,T0+288];
users.forEach(([n,c,t],i)=>{const y=uy[i];R(f,UX,y,UW,UH,{fill:P.card,stroke:P.line,r:14});ICB(f,'user',UX+14,y+16,44,t,c);
 T(f,n,UX+70,y+18,{size:17,w:'b',width:UW-80,lh:120});T(f,'свой аккаунт Claude — свои лимиты',UX+70,y+(n.length>14?62:46),{size:13.5,c:P.mut,width:UW-82,lh:130});});
// артефакт
const AXx=356,AW=488,AH=212;const ay=WIN(f,AXx,T0,AW,AH,'SMC — трекер поставок');
PILL(f,'условный пример',AXx+AW-150,T0+10,{fill:'#FFFFFF',c:P.mut,size:12,h:24,px:10});
const tcw=[150,120,110];let tx=AXx+18;['Позиция','Статус','Срок'].forEach((h,i)=>{T(f,h,tx,ay+12,{size:13,w:'b',c:P.mut});tx+=tcw[i];});
[0,1,2].forEach(r=>{const y=ay+38+r*28;R(f,AXx+14,y-6,AW-28,1,{fill:P.line,r:0});BAR(f,AXx+18,y+4,[118,96,128][r],'#DCD4C6');E(f,AXx+168,y+3,10,[P.grn,P.amb,P.blu][r]);BAR(f,AXx+184,y+4,60,'#DCD4C6');BAR(f,AXx+288,y+4,64,'#DCD4C6');});
const bx=AXx+18,by=ay+124;R(f,bx,by,276,34,{fill:P.accT,stroke:P.acc,r:8,sw:1.5});ICON(f,'spark',bx+10,by+8,18,P.acc,2.4);T(f,'Составь письмо по этой строке',bx+36,by+8,{size:14,w:'s',c:P.acc});
T(f,'→ запрос к Claude',bx+290,by+9,{size:13.5,c:P.mut,w:'m'});
// стрелки от пользователей
[[uy[0]+52,T0+72],[uy[1]+52,T0+128],[uy[2]+52,T0+184]].forEach(([y1,y2])=>A(f,UX+UW+6,y1,AXx-8,y2,{c:P.ink,sw:2.2,head:10}));
// плашка и хранилища
const py=T0+AH+16;R(f,AXx,py,AW,52,{fill:P.ambT,r:12});
T(f,'до 20 МБ на артефакт, только текст; что общее, а что личное, решает автор',AXx+16,py+8,{size:14.5,w:'s',width:AW-32,lh:130,align:'CENTER'});
const cyY=py+82,CW2=(AW-24)/2,CH=150;
A(f,AXx+CW2/2,py+54,AXx+CW2/2,cyY-4,{c:P.ink,sw:2.2,head:9});A(f,AXx+CW2+24+CW2/2,py+54,AXx+CW2+24+CW2/2,cyY-4,{c:P.ink,sw:2.2,head:9});
CYL(f,AXx,cyY,CW2,CH,P.bluT,P.blu);CYL(f,AXx+CW2+24,cyY,CW2,CH,P.purT,P.pur);
[[AXx,'Общее хранилище','видят все пользователи: таблица поставок, статусы',P.blu],[AXx+CW2+24,'Личное хранилище','видит только сам пользователь: мои заметки',P.pur]].forEach(([x,n,s,c])=>{
 TC(f,n,x,cyY+42,CW2,24,{size:16,w:'b',c});T(f,s,x+16,cyY+74,{size:14,width:CW2-32,lh:132,align:'CENTER'});});
// коннекторы
const KX=912,KW=232;const kb=R(f,KX,T0,KW,200,{fill:P.card,stroke:P.line,r:14});
ICON(f,'plug',KX+16,T0+16,24,P.acc,2.2);T(f,'Приложения',KX+48,T0+18,{size:17,w:'b'});
['Asana','Google Calendar','Slack'].forEach((s,i)=>PILL(f,s,KX+16,T0+56+i*36,{fill:P.soft,c:P.ink,size:14.5,h:30,w:'s'}));
const kt=T(f,'каждый подключает свои приложения сам; инструменты с подтверждением каждого действия недоступны',KX+16,T0+166,{size:13.5,c:P.mut,width:KW-32,lh:132});
kb.resize(KW,kt.y+kt.height+16-T0);
A(f,KX-6,T0+96,AXx+AW+8,T0+96,{c:P.ink,sw:2.2,head:10});
// скачивание
const DY=kt.y+kt.height+40;R(f,KX,DY,KW,44,{fill:P.dark,r:10});ICON(f,'down',KX+56,DY+11,22,'#FFFFFF',2.4);T(f,'Скачать CSV',KX+86,DY+12,{size:16,w:'s',c:'#FFFFFF'});
T(f,'специальная кнопка; обычные ссылки на скачивание блокируются',KX,DY+54,{size:13.5,c:P.mut,width:KW,lh:132});
// тарифы
const SY=cyY+CH+20;R(f,56,SY,1088,46,{fill:P.dark,r:12});ICON(f,'key',76,SY+11,24,'#FFFFFF',2);
T(f,'Обращение к Claude — все тарифы; приложения и хранилище — Pro и выше; веб и десктоп',112,SY+13,{size:16,w:'s',c:'#FFFFFF',width:1010});
NOTE(f,'Условный пример. Перед вводом цен или контактов в чужой артефакт уточните у автора, какие поля общие.');

// ===== 5.6
const g=FIG(sheet,1,'5.6','Окно Share: кто может открыть и уровни доступа');
const G0=TOP(g);const DXx=56,DWd=724;
const dlg=R(g,DXx,G0,DWd,100,{fill:P.card,stroke:P.ink,r:16,sw:1.5});
T(g,'Share',DXx+24,G0+18,{size:22,w:'x'});ICON(g,'x',DXx+DWd-44,G0+20,22,P.mut,2.2);
const X0=DXx+24;let y=G0+62;
T(g,'КТО МОЖЕТ ОТКРЫТЬ',X0,y,{size:13,w:'b',c:P.mut,ls:8});y+=26;
const c1w=304,c2w=DWd-48-c1w-14,c2x=X0+c1w+14,colH=182;
R(g,X0,y,c1w,colH,{fill:P.soft,r:12});R(g,c2x,y,c2w,colH,{fill:P.soft,r:12});
PILL(g,'Pro / Max / Ultra',X0+14,y+12,{fill:'#FFFFFF',c:P.ink,size:13,h:26,w:'b'});PILL(g,'Team / Enterprise',c2x+14,y+12,{fill:'#FFFFFF',c:P.ink,size:13,h:26,w:'b'});
RAD(g,X0+16,y+52,true);T(g,'Only you',X0+46,y+52,{size:15,w:'m'});
RAD(g,X0+16,y+84,false);T(g,'Anyone with the link',X0+46,y+84,{size:15,w:'m'});
R(g,X0+14,y+118,c1w-28,36,{fill:'#FFFFFF',stroke:P.line,r:8});ICON(g,'mail',X0+24,y+126,20,P.mut,2);T(g,'Invite by email (beta)',X0+52,y+127,{size:14.5,c:P.mut});
RAD(g,c2x+16,y+52,true);T(g,'Only people invited',c2x+46,y+52,{size:15,w:'m'});
RAD(g,c2x+16,y+84,false);T(g,'Anyone at SG Healthcare',c2x+46,y+84,{size:15,w:'m'});
RAD(g,c2x+16,y+116,false,true);T(g,'Anyone with the link',c2x+46,y+116,{size:15,w:'m',c:'#A9A399'});
T(g,'только если владелец включил внешний доступ',c2x+46,y+140,{size:13,c:P.mut,width:c2w-56});
y+=colH+16;
T(g,'УРОВЕНЬ ДОСТУПА',X0,y,{size:13,w:'b',c:P.mut,ls:8});y+=24;
const LW=DWd-48;R(g,X0,y,LW,3*34+10,{fill:P.card,stroke:P.ink,r:10,sw:1.5});
[['Can view','смотреть и читать комментарии'],['Commenter','+ комментировать и скачивать файлы'],['Can edit','+ вносить изменения']].forEach(([n,d],k)=>{const yy=y+5+k*34;if(k===0){R(g,X0+5,yy,LW-10,32,{fill:P.soft,r:6});ICON(g,'check',X0+LW-36,yy+6,20,P.acc,2.6);}
 const t=T(g,n,X0+16,yy+7,{size:15,w:'b'});T(g,'— '+d,X0+16+t.width+8,yy+7,{size:15,c:P.mut});});
y+=3*34+10+14;
// приглашение
R(g,X0,y,LW,42,{fill:P.card,stroke:P.line,r:10});E(g,X0+10,y+7,28,P.blu);TC(g,'A',X0+10,y+7,28,28,{size:13,w:'b',c:'#FFFFFF'});
T(g,'aigerim@medline.kz',X0+48,y+11,{size:15,w:'s'});
const pv=PILL(g,'Can view',X0+250,y+8,{fill:P.soft,c:P.ink,size:13.5,h:26,px:12});ICON(g,'chev',X0+250+pv-4,y+13,14,P.ink,2.4);
PILL(g,'Pending, истекает через 30 дней',X0+LW-262,y+8,{fill:P.ambT,c:P.amb,size:13.5,h:26,w:'s'});
y+=42+14;R(g,DXx+1,y,DWd-2,1.5,{fill:P.line,r:0});y+=12;
TG(g,X0,y+5,true);T(g,'Always share latest version',X0+58,y+8,{size:15,w:'m'});
PILL(g,'артефакты из Claude Code',X0+272,y+5,{fill:P.purT,c:P.pur,size:13,h:26});
const cl=R(g,X0+LW-140,y,140,36,{fill:P.acc,r:8});ICON(g,'link',X0+LW-128,y+8,20,'#FFFFFF',2.2);T(g,'Copy link',X0+LW-100,y+8,{size:15,w:'s',c:'#FFFFFF'});
y+=36+18;dlg.resize(DWd,y-G0);
// сноски
const NX=DXx+DWd+20,NW=1144-NX;
const notes=[['lock',P.ink,P.card,'Новый артефакт сначала виден только вам'],['users',P.blu,P.bluT,'До 50 внешних приглашённых; письма на английском; нужен аккаунт Claude'],['doc',P.grn,P.grnT,'Docs по ссылке — только после входа и только чтение; уровни Viewer / Editor'],['phone',P.red,P.redT,'iOS / Android: доступ не меняется — только веб или десктоп']];
const NH=[],NT=[];notes.forEach(([ic,c,t,s])=>{const tt=T(g,s,NX+64,0,{size:15,w:'m',width:NW-80,lh:135});NT.push(tt);NH.push(Math.max(72,tt.height+32));});
const gap=(y-G0-NH.reduce((a,b)=>a+b,0))/3;let ny=G0;
notes.forEach(([ic,c,t,s],i)=>{const r=R(g,NX,ny,NW,NH[i],{fill:t,stroke:i===0?P.line:null,r:14});g.insertChild(g.children.indexOf(NT[i]),r);ICB(g,ic==='users'?'user':ic,NX+14,ny+(NH[i]-38)/2,38,'#FFFFFF',c);NT[i].y=ny+(NH[i]-NT[i].height)/2;ny+=NH[i]+gap;});
NOTE(g,'Почта и организация — условный пример. На Team / Enterprise внешняя ссылка и внешние приглашения — отдельные настройки.');
await f.screenshot({scale:1.5});await g.screenshot({scale:1.5});
return {T0,G0,y,SY};
