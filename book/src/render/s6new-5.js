// Глава 6 (новая): рисунки 6.5, 6.6. Запуск: node run.js s6new-5.js 6-5 6-6
Object.assign(IC,{cursor:'<path d="M5 3l14 7-6 2-2 7z"/><path d="M13 12l5 5"/>'});
const sheet=figma.createFrame();sheet.name='Лист · Глава 6 · часть 3';sheet.resize(2520,1640);sheet.fills=F('#D8D2C7');
function MW(s,size,w){const t=T(sheet,s,0,0,{size,w});const v=t.width;t.remove();return v;}

// ===== 6.5
const f=FIG(sheet,0,'6.5','Claude for Google Workspace: панель в Google Таблице');
// метка в углу
{const s='Бета с 06.10.2026; Pro, Max, Ultra, Team, Enterprise';const w=MW(s,14,'b')+24;PILL(f,s,1144-w,138,{size:14,w:'b',fill:P.ambT,c:P.amb,h:30});}
const WX=56,WY=180,WWd=1088,WHt=380;
WIN(f,WX,WY,WWd,WHt,'AR_2026_Q4 — Google Sheets');
const SBX=WX+WWd-330;// боковая панель
// меню
const MY=WY+44;R(f,WX+1,MY,SBX-WX-1,32,{fill:P.card,r:0});R(f,WX+1,MY+32,WWd-2,1,{fill:P.line,r:0});
let mx=WX+16;let exX=0;
['File','Edit','View','Insert','Format','Data','Tools','Extensions','Help'].forEach(m=>{const w=MW(m,14,'m');if(m==='Extensions'){exX=mx-8;R(f,mx-8,MY+4,w+16,24,{fill:P.accT,r:6});}T(f,m,mx,MY+7,{size:14,w:m==='Extensions'?'b':'m',c:m==='Extensions'?P.acc:P.ink});mx+=w+18;});
// сетка
const GY=MY+40,GX=WX+1;const cols=[['',34],['A',156],['B',80],['C',70],['D',96],['E',108],['F',100],['G',SBX-WX-1-34-156-80-70-96-108-100]];
const rows=[['Дистрибьютор','Счёт','Дата','Срок оплаты','Сумма, USD','Оплачено','Корзина'],['MedLine Kazakhstan','INV-1021','02.09','02.10','184 000','0'],['MedLine Kazakhstan','INV-1034','15.09','15.10','96 500','40 000'],['MedTech UZ','INV-1040','20.09','20.10','61 200','0'],['BioSaúde BR','INV-1047','01.10','31.10','87 400','87 400'],['Grupo Azteca MX','INV-1052','08.10','07.11','45 300','0']];
const RH=30;let cx=GX;const colX=[];
cols.forEach(([h,w],i)=>{colX.push(cx);const isG=i===7;
 R(f,cx,GY,w,26,{fill:isG?P.accT:P.soft,r:0,stroke:P.line,sw:1});
 if(i)TC(f,h,cx,GY,w,26,{size:12.5,w:'s',c:isG?P.acc:P.mut});
 for(let r=0;r<rows.length;r++){const y=GY+26+RH*r;R(f,cx,y,w,RH,{fill:isG?'#FBEFE8':(i?P.card:P.soft),r:0,stroke:P.line,sw:1});
  if(i===0)TC(f,String(r+1),cx,y,w,RH,{size:12.5,c:P.mut,w:'m'});
  else if(r===0)T(f,rows[0][i-1],cx+8,y+7,{size:13.5,w:'b',c:isG?P.acc:P.ink});
  else if(!isG){const v=rows[r][i-1];const num=i>=5;const t=T(f,v,0,y+7,{size:13.5});t.x=num?cx+w-8-t.width:cx+8;}}
 cx+=w;});
const gx=colX[7],gw=cols[7][1];R(f,gx,GY,gw,26+RH*rows.length,{fill:null,r:2,stroke:P.acc,sw:2.2,dash:true});
// листы внизу + история версий
const TBY=WY+WHt-30;R(f,WX+1,TBY,SBX-WX-1,29,{fill:P.soft,r:0});R(f,WX+1,TBY,SBX-WX-1,1,{fill:P.line,r:0});
R(f,WX+40,TBY+2,124,26,{fill:P.card,r:0});T(f,'Open invoices',WX+52,TBY+7,{size:13,w:'s',c:P.grn});
{const s='Все правки — в истории версий файла';const w=MW(s,13.5,'b');const x=SBX-16-w;ICON(f,'clock',x-28,TBY+4,20,P.grn,2.2);T(f,s,x,TBY+6,{size:13.5,w:'b',c:P.grn});}
// выпадающее меню Extensions
const DX=exX,DY=MY+30;R(f,DX,DY,150,102,{fill:P.card,stroke:P.line,r:10});
R(f,DX+14,DY+16,100,10,{fill:'#E8E2D8',r:5});R(f,DX+14,DY+42,80,10,{fill:'#E8E2D8',r:5});
R(f,DX+6,DY+64,138,30,{fill:P.accT,r:7});ICON(f,'spark',DX+14,DY+70,18,P.acc,2);T(f,'Claude',DX+40,DY+70,{size:14,w:'b',c:P.acc});ICON(f,'right',DX+122,DY+71,16,P.acc,2.4);
const SX=DX+156,SY2=DY+60;R(f,SX,SY2,160,40,{fill:P.card,stroke:P.acc,r:10,sw:2});T(f,'Open Claude',SX+14,SY2+11,{size:14.5,w:'b'});
NUM(f,1,SX+122,SY2+6,{d:28,size:14});
// боковая панель Claude
R(f,SBX,MY,1,WHt-44-1,{fill:P.line,r:0});R(f,SBX+1,MY,WX+WWd-SBX-2,WHt-45,{fill:'#FCFAF7',r:0});
const PX=SBX+18,PW=WX+WWd-SBX-36;
ICON(f,'spark',PX,MY+12,20,P.acc,2.2);T(f,'Claude',PX+28,MY+12,{size:16,w:'b'});ICON(f,'x',PX+PW-18,MY+14,16,P.mut,2);
const EC=MY+48;const ec=R(f,PX,EC,PW,10,{fill:P.card,stroke:P.acc,r:12,sw:1.6});
T(f,'ПРЕДЛОЖЕННАЯ ПРАВКА',PX+14,EC+12,{size:11.5,w:'b',c:P.acc,ls:8});
const et=T(f,'Добавить столбец «Корзина» (G2:G48)',PX+14,EC+32,{size:15,w:'s',width:PW-28,lh:128});
const BY=et.y+et.height+10;R(f,PX+14,BY,70,32,{fill:P.acc,r:8});ICON(f,'check',PX+40,BY+7,18,'#FFFFFF',2.6);R(f,PX+92,BY,70,32,{fill:P.card,stroke:P.line,r:8});ICON(f,'x',PX+119,BY+8,16,P.mut,2.4);T(f,'ждёт вашего подтверждения',PX+176,BY-1,{size:12.5,c:P.mut,width:PW-190,lh:120});

ec.resize(PW,BY+32+14-EC);
// режимы и поле ввода
const IY=WY+WHt-58;R(f,PX,IY,PW,44,{fill:P.card,stroke:P.line,r:12});R(f,PX+14,IY+17,150,10,{fill:'#E8E2D8',r:5});E(f,PX+PW-38,IY+8,28,P.acc);ICON(f,'up',PX+PW-32,IY+14,16,'#FFFFFF',2.4);
const SGY=IY-46;R(f,PX,SGY,PW,36,{fill:P.soft,r:10});const half=(PW-8)/2;
R(f,PX+4,SGY+4,half,28,{fill:P.card,r:8,stroke:P.acc,sw:1.6});TC(f,'Ask before edits',PX+4,SGY+4,half,28,{size:13.5,w:'b',c:P.acc});
TC(f,'Accept all edits',PX+4+half,SGY+4,half,28,{size:13.5,w:'m',c:P.mut});
PILL(f,'по умолчанию',PX+16,SGY-30,{size:12.5,w:'b',fill:P.acc,c:'#FFFFFF',h:24,px:10});A(f,PX+60,SGY-6,PX+60,SGY+4,{c:P.acc,sw:2,head:6});
// низ: ограничения беты
const LY=WY+WHt+14;const LW=1088;const lc=R(f,56,LY,LW,10,{fill:P.card,stroke:P.line,r:14});
T(f,'ОГРАНИЧЕНИЯ БЕТЫ',74,LY+14,{size:12.5,w:'b',c:P.mut,ls:8});
const LIM=['Chrome, Edge, Safari — не Firefox','Нет диктовки','История чата — в браузере, не синхронизируется','Не читает комментарии и не принимает чужие предложения','Нет общего контекста между приложениями'];
let lx=74,ly=LY+40;LIM.forEach(s=>{const w=MW(s,13.5,'m')+44;if(lx+w>56+LW-14){lx=74;ly+=38;}R(f,lx,ly,w,30,{fill:P.redT,r:15});ICON(f,'x',lx+10,ly+8,14,P.red,2.4);T(f,s,lx+30,ly+6,{size:13.5,w:'m'});lx+=w+8;});
lc.resize(LW,ly+30+14-LY);
NOTE(f,'Условный макет: данные таблицы и надписи кнопок — примерные. Для общих файлов с финансовым отделом оставляйте Ask before edits.');

// ===== 6.6
const g=FIG(sheet,1,'6.6','На компьютере: коннектор → браузер → экран');
const SW=212,SG=10,SX0=272,BOT=696;
const ST=[
 {top:476,ic:'plug',c:P.grn,ct:P.grnT,name:'Коннектор',sub:'Gmail, Google Sheets…',tag:'быстрее и точнее',items:[]},
 {top:316,ic:'globe',c:P.amb,ct:P.ambT,name:'Встроенный браузер',sub:'',tag:'',items:['боковая панель рядом с задачей','Pro, Max, Ultra; Team/Enterprise — если не выключен','Settings > Cowork → Preferred browser: Built-in browser / Chrome (Claude in Chrome)']},
 {top:156,ic:'cursor',last:1,c:P.acc,ct:P.accT,name:'Computer use (экран)',sub:'',tag:'',items:['бета; Pro, Max, Ultra','macOS и Windows, не Linux','разрешение на каждое приложение','Full control: Settings > Capabilities (или Settings > System → This computer) → How Claude uses the apps you allow']}];
T(g,'ПОРЯДОК ВЫБОРА: 1 → 2 → 3',SX0,146,{size:13,w:'b',c:P.mut,ls:10});
const sb=[];
ST.forEach((s,i)=>{const x=SX0+i*(SW+SG);R(g,x,s.top,SW,BOT-s.top,{fill:s.ct,r:14});R(g,x,s.top,SW,8,{fill:s.c,r:4});
 NUM(g,i+1,x+14,s.top+22,{d:32,size:16,fill:s.c});
 const t=T(g,s.name,x+54,s.top+20,{size:17,w:'b',width:SW-64,lh:118});let y=Math.max(t.y+t.height,s.top+54)+10;
 if(s.sub){const u=T(g,s.sub,x+16,y,{size:14,c:P.ink,width:SW-32,lh:128});y=u.y+u.height+10;}
 if(s.tag){const w=PILL(g,s.tag,x+16,y,{size:13.5,w:'b',fill:s.c,c:'#FFFFFF',h:28});y+=38;}
 s.items.forEach((it,k)=>{E(g,x+16,y+7,6,s.c);const u=T(g,it,x+30,y,{size:13.5,c:P.ink,width:SW-46,lh:130});y=u.y+u.height+10;});
 const iy=BOT-(s.last?118:78);ICB(g,s.ic,x+SW/2-28,iy,56,'#FFFFFF',s.c);if(s.last){const lw=MW('последний вариант',13.5,'b')+28;PILL(g,'последний вариант',x+(SW-lw)/2,BOT-50,{size:13.5,w:'b',fill:s.c,c:'#FFFFFF',h:30,px:14});}
 sb.push({x,y,iy});});
// стрелки между ступенями
A(g,SX0+SW/2+20,ST[0].top-14,SX0+SW+SG-8,ST[1].top+60,{c:P.ink,sw:2.4,head:10});
A(g,SX0+(SW+SG)+SW/2+20,ST[1].top-14,SX0+2*(SW+SG)-8,ST[2].top+60,{c:P.ink,sw:2.4,head:10});
T(g,'нет\nконнектора',SX0+8,ST[0].top-78,{size:14,w:'s',c:P.mut,lh:125});
T(g,'браузера\nнедостаточно',SX0+SW+SG+8,ST[1].top-78,{size:14,w:'s',c:P.mut,lh:125});
// Trusted folders (слева)
const TX=56,TW=200,TY=456;const tr=R(g,TX,TY,TW,BOT-TY,{fill:P.card,stroke:P.mut,r:14,dash:true,sw:1.5});
T(g,'ТАКЖЕ НА ДЕСКТОПЕ',TX+16,TY+16,{size:11.5,w:'b',c:P.mut,ls:8});
T(g,'Trusted folders',TX+16,TY+36,{size:17,w:'b'});
R(g,TX+16,TY+70,TW-32,56,{fill:P.ambT,r:10});ICON(g,'folder',TX+26,TY+82,30,P.amb,2);T(g,'SMC_Almaty',TX+64,TY+87,{size:14.5,w:'b'});
const tt=T(g,'чтение, порядок, новые файлы; перед безвозвратным удалением — вопрос',TX+16,TY+140,{size:14,c:P.ink,width:TW-32,lh:132});{const k=g.children.indexOf(tr);const H2=tt.y+tt.height+16-TY;tr.resize(TW,H2);const dy=BOT-(TY+H2);g.children.slice(k).forEach(n=>n.y+=dy);}
// Quick Entry (справа)
const QX=944,QW=200,QY=156;const qr=R(g,QX,QY,QW,10,{fill:P.card,stroke:P.mut,r:14,dash:true,sw:1.5});
T(g,'ТАКЖЕ НА ДЕСКТОПЕ',QX+16,QY+16,{size:11.5,w:'b',c:P.mut,ls:8});
T(g,'Quick Entry',QX+16,QY+36,{size:17,w:'b'});
[0,1].forEach(i=>{const kx=QX+16+i*86;R(g,kx,QY+74,78,46,{fill:P.soft,stroke:'#B9B2A6',r:9,sw:1.5});R(g,kx+4,QY+76,70,36,{fill:P.card,r:7});TC(g,'Option',kx,QY+74,78,40,{size:14,w:'s'});});
const q1=T(g,'двойное нажатие — Claude поверх любого приложения',QX+16,QY+134,{size:14,c:P.ink,width:QW-32,lh:132});
const q2=T(g,'macOS, все тарифы; Windows — источники расходятся',QX+16,q1.y+q1.height+10,{size:14,w:'s',c:P.acc,width:QW-32,lh:132});
qr.resize(QW,q2.y+q2.height+16-QY);
NOTE(g,'Десктоп: macOS 13+, Windows 10+, Linux (бета). Доступ к компьютеру Claude получает только через десктоп-приложение.');
await f.screenshot({scale:1.5});await g.screenshot({scale:1.5});
return {sb,LYb:LY+lc.height,exX,qb:qr.y+qr.height};
