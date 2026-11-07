// Глава 7, рисунки 7.7 и 7.8. Рендер: node run.js s-7-7.js 7-7 7-8
const sheet=figma.createFrame();sheet.name='Лист · Раздел 7 · часть 4';sheet.resize(2520,1640);sheet.fills=F('#D8D2C7');
function TG(p,x,y,on){R(p,x,y,46,26,{fill:on?P.acc:'#CFC8BC',r:13});E(p,on?x+22:x+2,y+2,22,'#FFFFFF');}
function BT(p,s,x,y,o={}){const t=T(p,s,0,0,{size:o.size||15,w:o.w||'s',c:o.c||P.ink});const px=o.px||14,h=o.h||34;const r=R(p,x,y,t.width+px*2,h,{fill:o.fill||P.card,stroke:o.stroke===undefined?P.line:o.stroke,r:o.r??8});p.insertChild(p.children.indexOf(r)+1,t);t.x=x+px;t.y=y+(h-t.height)/2;return t.width+px*2;}

// ===== 7.7
const f=FIG(sheet,0,'7.7','Проект «SMC Алматы»: инструкции, знания, память');
const WX=56,WY=128,WW=1088,WH=508;
const cy=WIN(f,WX,WY,WW,WH,'claude.ai · Projects');
// левая часть: проект и чаты
const LX=WX+28,LW=420;
ICB(f,'folder',LX,cy+22,44,P.accT,P.acc);
T(f,'SMC Алматы',LX+58,cy+30,{size:24,w:'b'});
R(f,LX,cy+86,LW,52,{fill:'#FFFFFF',stroke:P.line,r:12});T(f,'Новый чат в проекте…',LX+18,cy+102,{size:15,c:P.mut});
T(f,'ЧАТЫ ПРОЕКТА',LX,cy+164,{size:13,w:'b',c:P.mut,ls:8});
['Статус на 11.11','Письмо Айгерим — монтаж рентгена','Отчёт в Сеул (KO)'].forEach((s,i)=>{const y=cy+192+i*62;
 R(f,LX,y,LW,52,{fill:P.card,stroke:P.line,r:12});ICON(f,'chat',LX+16,y+14,22,P.acc,2);T(f,s,LX+52,y+15,{size:16,w:'s'});});
// правая панель
const PX=WX+480,PW=WX+WW-24-PX;R(f,PX-16,cy,1,WH-44,{fill:P.line,r:0});
let y=cy+16;
function BLOCK(title,n,h,body,call){R(f,PX,y,PW,h,{fill:'#FBF9F5',stroke:P.line,r:12});T(f,title,PX+18,y+14,{size:16,w:'b'});NUM(f,n,PX+PW-44,y+12,{d:28,size:13});
 const ct=T(f,call,0,0,{size:13.5,w:'s',c:P.acc});const cw0=ct.width+24;ct.remove();PILL(f,call,PX+PW-52-cw0,y+12,{fill:P.accT,c:P.acc,size:13.5,h:28});body(PX+18,y+44,PW-36);y+=h+12;}
BLOCK('Instructions',1,104,(x,yy,w)=>{T(f,'Проект: поставка и запуск оборудования SG Healthcare в Seoul Medical Center (Алматы). Дистрибьютор — ТОО MedLine Kazakhstan…',x,yy,{size:14,c:P.ink,width:w,lh:138});},'правила проекта');
BLOCK('Knowledge',2,128,(x,yy,w)=>{['Спецификация_SMC.xlsx','График_поставок_и_монтажа.xlsx','Контакты_SMC.docx'].forEach((s,i)=>{const sx=s.endsWith('xlsx');ICON(f,sx?'sheet':'doc',x,yy+i*26,20,sx?P.grn:P.blu,2);T(f,s,x+30,yy+i*26+1,{size:14.5,w:'m'});});},'спецификации, график, контакты');
BLOCK('Memory',3,150,(x,yy,w)=>{T(f,'Поставка УЗИ и рентгена в SMC; контакт в MedLine Kazakhstan — Айгерим Сейткали; медицинский директор — Dr. Ahn.',x,yy,{size:14,c:P.ink,width:w,lh:138});
 R(f,x,yy+46,w,1,{fill:P.line,r:0});T(f,'Use account memory',x,yy+56,{size:15,w:'s'});TG(f,x+w-46,yy+53,false);},'выключите, чтобы изолировать проект');
// выноски под окном справа
const by=WY+WH+14;
// плашка слева
R(f,56,by,1088,50,{fill:P.redT,r:12});ICON(f,'shield',76,by+13,24,P.red,2.2);
T(f,'В чатах проекта нет данных пациентов',112,by+15,{size:15.5,w:'s',c:P.red});
NOTE(f,'Все данные условные. Макет условный: расположение элементов в интерфейсе может отличаться.');

// ===== 7.8
const g=FIG(sheet,1,'7.8','Утренний бриф: задача по расписанию или навык morning');
const LX2=56,LR=870,DX=890,DW=1144-DX;
// верхняя дорожка
const TY=136,TH=290;
R(g,LX2,TY,LR-LX2,TH,{fill:P.bluT,r:16});
ICON(g,'clock',LX2+18,TY+16,22,P.blu,2.2);T(g,'Задача по расписанию',LX2+48,TY+16,{size:17,w:'b',c:P.blu});T(g,'платные тарифы, облако · раздел 2',LX2+254,TY+19,{size:14,c:P.mut});
const ny=TY+56,nh=188;
// узлы
const n1x=LX2+16,n1w=136;R(g,n1x,ny,n1w,nh,{fill:P.card,stroke:P.line,r:12});ICB(g,'clock',n1x+(n1w-52)/2,ny+28,52,P.blu,'#FFFFFF');
T(g,'будни 7:30\nпо Алматы',n1x+10,ny+100,{size:15,w:'b',width:n1w-20,align:'CENTER',lh:125});
const n2x=n1x+n1w+30,n2w=150;R(g,n2x,ny,n2w,nh,{fill:P.card,stroke:P.line,r:12});ICB(g,'bot',n2x+(n2w-52)/2,ny+28,52,P.acc,'#FFFFFF');
T(g,'Claude:',n2x+10,ny+96,{size:15,w:'b',width:n2w-20,align:'CENTER'});T(g,'Gmail + Google Calendar',n2x+10,ny+118,{size:14,w:'m',width:n2w-20,align:'CENTER',lh:125});
const n3x=n2x+n2w+30,n3w=262;R(g,n3x,ny,n3w,nh,{fill:P.card,stroke:P.line,r:12});
ICON(g,'list',n3x+14,ny+14,20,P.acc,2.2);T(g,'Бриф',n3x+42,ny+14,{size:15,w:'b'});
['встречи','письма дистрибьюторов: @medline.kz, @medtech.uz, @biosaude.com.br, @grupoazteca.mx','три дела','строка по-корейски'].reduce((yy,s)=>{E(g,n3x+18,yy+7,6,P.acc);const t=T(g,s,n3x+32,yy,{size:13.5,width:n3w-46,lh:126});return yy+t.height+3;},ny+44);
const n4x=n3x+n3w+30,n4w=LR-16-n4x;
// телефон
const phw=96,phh=nh+6,phx=n4x+(n4w-phw)/2,phy=ny-3;R(g,phx,phy,phw,phh,{fill:P.dark,r:16});R(g,phx+6,phy+14,phw-12,phh-28,{fill:'#FFFFFF',r:8});
T(g,'Бриф',phx+14,phy+22,{size:12,w:'b',c:P.acc});[60,48,64,40,56,44,58].forEach((w,i)=>R(g,phx+14,phy+44+i*14,w,7,{fill:'#E4DDD1',r:3}));
[[n1x+n1w,n2x],[n2x+n2w,n3x],[n3x+n3w,phx]].forEach(([a,b])=>A(g,a+4,ny+nh/2,b-4,ny+nh/2,{c:P.ink,sw:2.4,head:8}));
PILL(g,'работает без вас',LX2+16,TY+TH-34,{fill:'#FFFFFF',c:P.blu,size:13.5,h:26});
// нижняя дорожка
const BY=TY+TH+58,BH=152;
R(g,LX2,BY,LR-LX2,BH,{fill:P.purT,r:16});
ICON(g,'bolt',LX2+18,BY+16,22,P.pur,2.2);T(g,'Навык morning',LX2+48,BY+16,{size:17,w:'b',c:P.pur});T(g,'по запросу · раздел 3',LX2+196,BY+19,{size:14,c:P.mut});
const my=BY+50,mh=56;
const m1x=n1x,m1w=n1w+30+n2w;R(g,m1x,my,m1w,mh,{fill:P.card,stroke:P.line,r:12});ICON(g,'user',m1x+14,my+16,22,P.pur,2);
T(g,'вы пишете «/morning» или «утренний бриф»',m1x+46,my+9,{size:14,w:'m',width:m1w-58,lh:125});
const m2x=n3x,m2w=n3w;R(g,m2x,my,m2w,mh,{fill:P.card,stroke:P.line,r:12});ICON(g,'bolt',m2x+14,my+16,22,P.pur,2);T(g,'навык подгружается',m2x+46,my+18,{size:15,w:'s'});
const m3x=n4x+4,m3w=n4w-8;R(g,m3x,my,m3w,mh,{fill:P.card,stroke:P.line,r:12});TC(g,'тот же бриф',m3x,my,m3w,mh,{size:14.5,w:'s'});
A(g,m1x+m1w+4,my+mh/2,m2x-4,my+mh/2,{c:P.ink,sw:2.4,head:8});A(g,m2x+m2w+4,my+mh/2,m3x-4,my+mh/2,{c:P.ink,sw:2.4,head:8});
PILL(g,'срабатывает, когда вы попросили',LX2+16,BY+BH-34,{fill:'#FFFFFF',c:P.pur,size:13.5,h:26});
// между дорожками
const ax=n3x+n3w/2;A(g,ax,BY-4,ax,TY+TH+4,{c:P.acc,sw:2.6,head:10,dash:true});
const pt=T(g,'через неделю — перевести навык на расписание',0,0,{size:14,w:'s',c:P.acc});const pw=pt.width+28;pt.remove();
PILL(g,'через неделю — перевести навык на расписание',ax-14-pw,TY+TH+17,{fill:P.accT,c:P.acc,size:14,h:28});
// справа: Duet
const DY=TY,DH=BY+BH-TY;
R(g,DX,DY,DW,DH,{fill:'#ECE8E1',stroke:'#C9C2B6',r:16,dash:true});
PILL(g,'недоступно в Казахстане',DX+16,DY+18,{fill:'#9B958B',c:'#FFFFFF',size:13,h:26});
ICB(g,'phone',DX+16,DY+62,48,'#FFFFFF','#8A847A');
T(g,'Claude Duet',DX+76,DY+75,{size:18,w:'b',c:'#5E5A53'});
T(g,'исследовательская версия с 21.10.2026',DX+16,DY+128,{size:14.5,w:'m',c:'#5E5A53',width:DW-32,lh:130});
['готовый утренний бриф','отдельное приложение для iPhone и Android','Pro, Max, Ultra','только США','лист ожидания'].reduce((yy,s)=>{ICON(g,'right',DX+14,yy,18,'#8A847A',2.4);const t=T(g,s,DX+38,yy,{size:14.5,c:'#5E5A53',width:DW-52,lh:128});return yy+t.height+14;},DY+190);
// красная плашка
const ry=BY+BH+16;R(g,56,ry,1088,48,{fill:P.red,r:12});ICON(g,'lock',76,ry+12,24,'#FFFFFF',2.2);
T(g,'Ничего не отправлять без подтверждения: бриф только читает почту и календарь.',112,ry+14,{size:15.5,w:'s',c:'#FFFFFF'});
NOTE(g,'Встроенной команды /morning в справке Anthropic нет. Адреса дистрибьюторов — условные.');
await f.screenshot({scale:1.5});await g.screenshot({scale:1.5});
return {f:f.id,g:g.id};
