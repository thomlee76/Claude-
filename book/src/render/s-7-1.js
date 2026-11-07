// Глава 7, рисунки 7.1 и 7.2. Рендер: node run.js s-7-1.js 7-1 7-2
const sheet=figma.createFrame();sheet.name='Лист · Раздел 7 · часть 1';sheet.resize(2520,1640);sheet.fills=F('#D8D2C7');
// переключатель
function TG(p,x,y,on){R(p,x,y,46,26,{fill:on?P.acc:'#CFC8BC',r:13});E(p,on?x+22:x+2,y+2,22,'#FFFFFF');}
// кнопка
function BT(p,s,x,y,o={}){const t=T(p,s,0,0,{size:o.size||15,w:o.w||'s',c:o.c||P.ink});const px=o.px||14,h=o.h||34;const r=R(p,x,y,t.width+px*2,h,{fill:o.fill||P.card,stroke:o.stroke===undefined?P.line:o.stroke,r:o.r??8});p.insertChild(p.children.indexOf(r)+1,t);t.x=x+px;t.y=y+(h-t.height)/2;return t.width+px*2;}

// ===== 7.1
const f=FIG(sheet,0,'7.1','Четыре слоя личной настройки Claude');
const SX=350,SW=590,LH=122,GAP=14,Y0=144;
const layers=[
 ['user',P.acc,P.accT,'Instructions for Claude','весь аккаунт','на «вы», вывод в начале, RU/EN/KO',null],
 ['brain',P.blu,P.bluT,'Память — Topics','обычные чаты, проекты, облачный Cowork','роль, проекты, люди, стиль работы',['repeat','пополняется сама']],
 ['folder',P.grn,P.grnT,'Проект','инструкции, знания, память проекта','SMC Алматы: спецификации, график, контакты',null],
 ['bolt',P.pur,P.purT,'Навык (skill)','процедура','morning: утренний бриф',['link','раздел 3']]];
layers.forEach(([ic,c,t,n,sub,ex,tag],i)=>{const y=Y0+i*(LH+GAP);
 R(f,SX,y,SW,LH,{fill:t,r:16});R(f,SX,y,10,LH,{fill:c,r:5});
 NUM(f,i+1,SX+26,y+18,{d:30,size:15,fill:c});
 ICB(f,ic,SX+SW-66,y+18,46,'#FFFFFF',c);
 const nt=T(f,n,SX+68,y+20,{size:21,w:'b',c:P.ink});
 T(f,sub,SX+68,y+52,{size:15,w:'m',c:c});
 const lb=T(f,'Пример:',SX+68,y+86,{size:14,w:'s',c:P.mut});
 const tt=T(f,ex,lb.x+lb.width+8,y+85,{size:15,w:'m',c:P.ink});
 if(tag){const px=nt.x+nt.width+16;const tw=T(f,tag[1],px+34,y+23,{size:13,w:'s',c:c});const pw=tw.width+46;const r=R(f,px,y+18,pw,28,{fill:'#FFFFFF',r:14});f.insertChild(f.children.indexOf(tw),r);ICON(f,tag[0],px+10,y+23,18,c,2.2);}
});
const SB=Y0+4*LH+3*GAP; // низ стопки
// правая колонка: стрелка вниз
const RX=972,RW=172;
R(f,RX,Y0,RW,SB-Y0,{fill:P.soft,r:16});
A(f,RX+RW/2,Y0+24,RX+RW/2,SB-150,{c:P.acc,sw:4,head:16});
ICB(f,'chat',RX+RW/2-26,SB-132,52,P.acc,'#FFFFFF');
T(f,'ответ Claude учитывает все слои',RX+14,SB-68,{size:15,w:'b',c:P.ink,width:RW-28,align:'CENTER',lh:125});
// левый блок: инкогнито
const IX=56,IW=262,IY=Y0+80,IH=300;
R(f,IX,IY,IW,IH,{fill:'#FFFFFF',stroke:P.ink,r:16,dash:true,sw:2});
ICB(f,'eye',IX+20,IY+20,44,P.dark,'#FFFFFF');
T(f,'Incognito chat',IX+76,IY+30,{size:19,w:'b'});
T(f,'вне слоёв памяти и истории',IX+20,IY+80,{size:14,c:P.mut,width:IW-40});
[['x',P.red,'нет истории'],['x',P.red,'нет памяти'],['check',P.grn,'Instructions действуют']].forEach(([ic,c,s],k)=>{const y=IY+126+k*52;
 R(f,IX+16,y,IW-32,42,{fill:k<2?P.redT:P.grnT,r:10});ICON(f,ic,IX+28,y+10,20,c,2.6);T(f,s,IX+58,y+10,{size:14.5,w:'s',c:P.ink});});
// пунктир от инкогнито к слою Instructions
A(f,IX+IW+6,IY+126+2*52+21,SX-8,Y0+LH/2+10,{c:P.ink,sw:2,head:10,dash:true});
NOTE(f,'Слои складываются: верхний действует везде, нижние — в своих рамках. По состоянию на 7 ноября 2026 года.');

// ===== 7.2
const g=FIG(sheet,1,'7.2','Settings > Your Claude: где настраивается память');
const WX=56,WY=128,WW=760,WH=574;
const cy=WIN(g,WX,WY,WW,WH,'Settings');
// левое меню
const MW=200;R(g,WX+1,cy,MW,WH-45,{fill:'#FBF9F5',r:0});R(g,WX+MW,cy,1,WH-45,{fill:P.line,r:0});
R(g,WX+12,cy+16,MW-24,64,{fill:P.accT,r:10});
T(g,'Your Claude',WX+26,cy+24,{size:16,w:'b',c:P.acc});
T(g,'в старом интерфейсе: Memory',WX+26,cy+48,{size:12,c:P.mut,width:MW-40});
['Privacy','Wellbeing'].forEach((s,i)=>T(g,s,WX+26,cy+100+i*40,{size:16,w:'m',c:P.ink}));
// правая часть
const CX=WX+MW+24,CR=WX+WW-24,CW=CR-CX;let y=cy+18;
T(g,'Instructions',CX,y,{size:15,w:'b'});y+=26;
R(g,CX,y,CW,62,{fill:'#FFFFFF',stroke:P.line,r:8});
T(g,'Я — руководитель отдела зарубежных продаж медицинского оборудования (СНГ, Латинская Америка)…',CX+12,y+10,{size:13.5,c:P.ink,width:CW-24,lh:135});
y+=62+14;
const rows=[];
function ROW(label,ctrl,sub){R(g,CX,y,CW,1,{fill:P.line,r:0});const t=T(g,label,CX,y+16,{size:15,w:'m'});let h=56;if(sub){T(g,sub,CX,y+38,{size:12.5,c:P.mut});h=66;}const ry=y;ctrl(ry,h);rows.push(ry+h/2);y+=h;return ry;}
const rIns=cy+18+26+31;
ROW('Generate memory from chats',(ry,h)=>TG(g,CR-46,ry+(h-26)/2,true));
const rMem=ROW('Your memory',(ry,h)=>{BT(g,'Manage',CR-88,ry+(h-34)/2,{size:14});});
const rSens=ROW('Include sensitive topics in memory',(ry,h)=>TG(g,CR-46,ry+(h-26)/2,false));
ROW('Search and reference chats',(ry,h)=>TG(g,CR-46,ry+(h-26)/2,true),'Pro, Max, Ultra, Team, Enterprise');
const rImp=y;R(g,CX,y,CW,1,{fill:P.line,r:0});const siw=BT(g,'Start import',CX,y+14,{size:14});y+=62;
// нижние кнопки
R(g,CX,y,CW,1,{fill:P.line,r:0});y+=16;
const bw=(CW-16)/2;
BT(g,'Pause memory',CX,y,{size:14});BT(g,'Reset memory',CX+bw+16,y,{size:14,c:P.red,stroke:P.red,fill:P.redT});
T(g,'сохранить, но не использовать',CX,y+44,{size:13,c:P.mut,width:bw});
T(g,'удалить всё безвозвратно, включая память проектов',CX+bw+16,y+44,{size:13,c:P.red,width:bw,lh:130});
// выноски
const badges=[[rows[1],CR-110],[rows[2],CR-68],[rImp+31,CX+siw+46]];
badges.forEach(([by,bx],i)=>NUM(g,i+1,bx-30,by-15,{d:30,size:14}));
const LX=840,LW=304;
const calls=[['Список Topics — рис. 7.3',rows[1]],['Для рабочего аккаунта — выключено',rows[2]],['Импорт из другого ИИ, экспериментально',rImp+31]];
// раздвинуть карточки, чтобы не перекрывались
let prevB=WY-12;
[['Путь: инициалы в левом нижнем углу → Settings → Your Claude','gear'],['Instructions действуют во всех разговорах, включая инкогнито','user']].forEach(([s,ic])=>{const t=T(g,s,LX+56,0,{size:14.5,w:'m',width:LW-72,lh:130});const h=t.height+28;const top=prevB+12;const r=R(g,LX,top,LW,h,{fill:P.soft,r:12});g.insertChild(g.children.indexOf(t),r);t.y=top+14;ICON(g,ic,LX+16,top+14,24,P.acc,2);prevB=top+h;});
prevB+=10;calls.forEach(([s,cyy],i)=>{const t=T(g,s,LX+56,0,{size:15,w:'s',width:LW-72,lh:130});const h=Math.max(56,t.height+28);let top=Math.max(cyy-h/2,prevB+12);
 const r=R(g,LX,top,LW,h,{fill:P.card,stroke:P.line,r:12});g.insertChild(g.children.indexOf(t),r);t.y=top+(h-t.height)/2;NUM(g,i+1,LX+14,top+(h-30)/2,{d:30,size:14});
prevB=top+h;});
NOTE(g,'Условный макет: расположение элементов в интерфейсе может отличаться.');
await f.screenshot({scale:1.5});await g.screenshot({scale:1.5});
return {f:f.id,g:g.id};
