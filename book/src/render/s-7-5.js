// Глава 7, рисунки 7.5 и 7.6. Рендер: node run.js s-7-5.js 7-5 7-6
const sheet=figma.createFrame();sheet.name='Лист · Раздел 7 · часть 3';sheet.resize(2520,1640);sheet.fills=F('#D8D2C7');
IC.ghost='<path d="M5 21V10a7 7 0 0 1 14 0v11l-2.5-2-2.3 2-2.2-2-2.2 2-2.3-2z"/><path d="M9.5 10v1M14.5 10v1"/>';

// ===== 7.5
const f=FIG(sheet,0,'7.5','Проекты: текущая версия и новая (бета)');
const CW=532,X=[56,612],TOP=138;
const cols=[
 {c:P.blu,t:P.bluT,h:'Текущие проекты',tag:'GA — доступны всем',items:[
  ['history','история чатов проекта'],['doc','инструкции проекта'],['folder','знания (файлы)'],['brain','своя память проекта'],
  ['user','Free — до 5 проектов'],['search','платные тарифы: RAG, project knowledge search,\nёмкость до 10×'],['link','Team/Enterprise: Can view / Can edit,\nвкладка Shared with me']]},
 {c:P.acc,t:P.accT,h:'Новые проекты',tag:'бета с 17.09.2026',items:[
  ['chat','проект = один разговор'],['layers','параллельные потоки (threads) в облаке'],['brain','общая память'],['folder','Library — библиотека файлов'],
  ['code','пока: выборочно Pro/Max/Ultra в Claude Code (claude.ai/code, вкладка Code)'],['clock','чат, Cowork, Team, Enterprise — позже'],['list','лист ожидания claude.com/form/projects'],['warn','несколько потоков быстрее расходуют лимиты']]}];
IC.history='<path d="M4 12a8 8 0 1 0 2.5-5.8L4 8.5"/><path d="M4 4v4.5h4.5M12 8v4l3 2"/>';
const HB=128,IH=46,BOT=640;
cols.forEach((o,k)=>{const x=X[k];
 R(f,x,TOP,CW,BOT-TOP,{fill:P.card,stroke:P.line,r:18});
 R(f,x,TOP,CW,HB,{fill:o.t,r:18});R(f,x,TOP+HB-18,CW,18,{fill:o.t,r:0});
 // значок
 if(k===0){ICB(f,'folder',x+22,TOP+22,64,'#FFFFFF',o.c);}
 else{E(f,x+22,TOP+22,64,'#FFFFFF');
  // один разговор с тремя потоками в облаке
  ICON(f,'cloud',x+30,TOP+26,48,P.accT,2);
  E(f,x+36,TOP+50,10,o.c);[[66,36],[68,54],[66,72]].forEach(([dx,dy])=>{A(f,x+44,TOP+55,x+dx,TOP+dy,{c:o.c,sw:2,head:0});E(f,x+dx-1,TOP+dy-4,8,o.c);});}
 T(f,o.h,x+104,TOP+28,{size:24,w:'b',c:P.ink});
 PILL(f,o.tag,x+104,TOP+68,{fill:o.c,c:'#FFFFFF',size:14,h:28});
 let y=TOP+HB+12;const ih=(BOT-y-10)/o.items.length;
 o.items.forEach(([ic,s],i)=>{const t=T(f,s,x+64,0,{size:15.5,w:'m',width:CW-84,lh:128});t.y=y+(ih-t.height)/2;
  ICON(f,ic,x+24,y+(ih-22)/2,22,ic==='warn'?P.amb:o.c,2);
  if(i<o.items.length-1)R(f,x+24,y+ih,CW-48,1,{fill:P.line,r:0});y+=ih;});
});
// стрелка переноса
E(f,568,TOP+HB/2-22,44,P.card,{stroke:P.line,sw:1.5});A(f,578,TOP+HB/2,602,TOP+HB/2,{c:P.acc,sw:2.5,head:8});
const by=BOT+14;R(f,56,by,1088,46,{fill:P.dark,r:12});ICON(f,'check',76,by+12,22,'#8FD3A6',2.6);
T(f,'При переносе в новые проекты ничего не теряется.',110,by+13,{size:15.5,w:'s',c:'#FFFFFF'});
NOTE(f,'По состоянию на 7 ноября 2026 года. Новые проекты уже есть и у тех, чьи проекты перенесли.');

// ===== 7.6
const g=FIG(sheet,1,'7.6','Обычный чат, чат без памяти и инкогнито');
const cw=[264,236,288,300],xs=[56];for(let i=1;i<4;i++)xs.push(xs[i-1]+cw[i-1]);
const HY=150,HH=84;
const heads=[['Свойство',''],['Обычный чат',''],['Чат без памяти','«+» → Memory выкл. до первого сообщения'],['Incognito chat','значок-призрак']];
R(g,56,HY,xs[3]-56,HH,{fill:P.soft,r:12});
heads.forEach(([h,s],i)=>{if(i===3)return;const x=xs[i]+16;const t=T(g,h,x,0,{size:16,w:'b',width:cw[i]-28});let hh=t.height;let st=null;if(s){st=T(g,s,x,0,{size:13,c:P.mut,width:cw[i]-28,lh:125});hh+=4+st.height;}
 const y0=HY+(HH-hh)/2;t.y=y0;if(st)st.y=y0+t.height+4;});
const rows=[
 ['В истории чатов','y','y','n'],
 ['Читает и пополняет память','y','n','n'],
 ['Поиск по чатам и Reflect','y',['—','в справке не описано'],'n'],
 ['Используется для обучения',['по настройке','Help improve our AI models'],['по настройке',''],'n'],
 ['Хранение',['по настройкам',''],['по настройкам',''],['30 дней','Enterprise — по политике']],
 ['Есть в проектах','y','y','n'],
 ['Файлы и запуск кода','y','y',['нет','прежний интерфейс','n']],
 ['Instructions for Claude',['действуют','','y'],['действуют','','y'],['действуют','','y']]];
const RH=56,RY=HY+HH+6;
rows.forEach((r,j)=>{const y=RY+j*RH;R(g,56,y,xs[3]-56,RH-4,{fill:j%2?P.soft:P.card,r:10,stroke:j%2?null:P.line});});
// колонка инкогнито — тёмная рамка
const IX=xs[3]+8,IW=cw[3]-8,IY=HY-12,IHt=RY+rows.length*RH-4-IY+10;
R(g,IX,IY,IW,IHt,{fill:'#FFFFFF',stroke:P.ink,r:16,sw:4});
R(g,IX,IY,IW,HH+12,{fill:P.dark,r:16});R(g,IX,IY+HH-4,IW,16,{fill:P.dark,r:0});
rows.forEach((r,j)=>{if(j%2)R(g,IX+6,RY+j*RH,IW-12,RH-4,{fill:P.soft,r:8});});
ICON(g,'ghost',IX+18,IY+(HH+12-30)/2,30,'#FFFFFF',2);
T(g,'Incognito chat',IX+58,IY+26,{size:17,w:'b',c:'#FFFFFF'});T(g,'значок-призрак',IX+58,IY+50,{size:13,c:'#CFC8BC'});
function CELL(v,x,w,y){let main,sub='',kind;
 if(v==='y'){main='да';kind='y';}else if(v==='n'){main='нет';kind='n';}else{[main,sub,kind]=v;}
 let tx=x+16;
 if(kind==='y'){ICON(g,'check',x+14,0,20,P.grn,2.8);tx=x+42;}else if(kind==='n'){ICON(g,'x',x+14,0,20,P.red,2.8);tx=x+42;}
 const ic=kind?g.children[g.children.length-1]:null;
 const t=T(g,main,tx,0,{size:15,w:'s',c:kind==='n'?P.red:(kind==='y'?P.grn:P.ink)});let hh=t.height;let st=null;
 if(sub){st=T(g,sub,tx,0,{size:12.5,c:P.mut,width:x+w-tx-10,lh:120});hh+=2+st.height;}
 const y0=y+(RH-4-hh)/2;t.y=y0;if(st)st.y=y0+t.height+2;if(ic)ic.y=y0+(t.height-20)/2;}
rows.forEach((r,j)=>{const y=RY+j*RH;T(g,r[0],xs[0]+16,0,{size:15,w:'m',width:cw[0]-24}).y=y+(RH-4-g.children[g.children.length-1].height)/2;
 for(let i=1;i<4;i++)CELL(r[i],i===3?IX:xs[i],i===3?IW:cw[i],y);});
NOTE(g,'По состоянию на 7 ноября 2026 года. Instructions for Claude действуют во всех трёх режимах.');
await f.screenshot({scale:1.5});await g.screenshot({scale:1.5});
return {f:f.id,g:g.id};
