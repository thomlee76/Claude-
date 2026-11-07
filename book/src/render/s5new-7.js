// Глава 5 (новая), рисунки 5.7 и 5.8. Рендер: node run.js s5new-7.js 5-7 5-8
const sheet=figma.createFrame();sheet.name='Лист · Раздел 5 · часть 4';sheet.resize(2520,1640);sheet.fills=F('#D8D2C7');
IC.pin='<path d="M9 3h6l-1 6 3 3H7l3-3z"/><path d="M12 12v9"/>';
const TOP=f=>{const t=f.children[1];return t.y+t.height+30;};

// ===== 5.7
const f=FIG(sheet,0,'5.7','Цикл еженедельного отчёта в Сеул в Claude Docs');
const T0=TOP(f);
const GP=22,SW=(1088-5*GP)/6;const sx=i=>56+i*(SW+GP);
const steps=[
 ['cal',P.blu,P.bluT,'Пятница: /docs + Gmail и Google Sheets',[['mail','Gmail'],['sheet','Google Sheets']]],
 ['chat',P.acc,P.accT,'Claude задаёт уточняющие вопросы и собирает черновик: вкладки',[[null,'요약'],[null,'Детали'],[null,'Дебиторка']]],
 ['edit',P.grn,P.grnT,'Вы правите сами — сохраняется сразу, видно всем',null],
 ['user',P.pur,P.purT,'Руководитель в Сеуле (Editor) выделяет текст и комментирует по-корейски',null],
 ['spark',P.acc,P.accT,'@Claude в ветке → правка с подписью автора и объяснение',null],
 ['down',P.ink,P.soft,'Export → Word / PDF для архива и почты',[['doc','Word'],['doc','PDF']]]];
const SY=T0+128;const cards=[];let SH=0;
steps.forEach(([ic,c,t,s,pills],i)=>{const x=sx(i);const r=R(f,x,SY,SW,100,{fill:t,r:14});cards.push(r);
 NUM(f,i+1,x+14,SY+14,{d:30,size:15,fill:c});ICB(f,ic,x+SW-52,SY+10,38,'#FFFFFF',c);
 const tt=T(f,s,x+14,SY+60,{size:15,w:'m',width:SW-28,lh:132});
 if(i===4){tt.setRangeFills(0,7,F(P.acc));tt.setRangeFontName(0,7,{family:'Inter',style:'Bold'});}
 let yy=tt.y+tt.height+10,px=x+14;
 if(pills)pills.forEach(([pi,ps])=>{const tw=T(f,ps,0,0,{size:13.5,w:'s'});const w=tw.width+(pi?44:24);tw.remove();if(px+w>x+SW-10){px=x+14;yy+=34;}
  const pr=R(f,px,yy,w,28,{fill:'#FFFFFF',r:14});if(pi)ICON(f,pi,px+10,yy+5,18,c,2);T(f,ps,px+(pi?32:12),yy+5,{size:13.5,w:'s',c:P.ink});px+=w+6;});
 if(pills)yy+=28;
 SH=Math.max(SH,yy-SY+16);});
cards.forEach(r=>r.resize(SW,SH));
for(let i=0;i<5;i++)A(f,sx(i)+SW+3,SY+SH/2,sx(i+1)-3,SY+SH/2,{c:P.ink,sw:2.4,head:8});
// развилка над шагом 4
const WX=sx(3)+SW/2-230,WWd=460;
R(f,WX,T0,WWd,84,{fill:P.redT,stroke:P.red,r:14,sw:1.5});ICON(f,'warn',WX+16,T0+16,24,P.red,2.2);
T(f,'Внешний приглашённый:',WX+52,T0+14,{size:15,w:'b',c:P.red});
T(f,'может комментировать, но не может звать Claude и не получает уведомлений',WX+52,T0+36,{size:14.5,width:WWd-68,lh:130});
A(f,sx(3)+SW/2,T0+88,sx(3)+SW/2,SY-6,{c:P.red,sw:2,head:8,dash:true});
// плашка под шагом 2
const BY=SY+SH+44;const BW=sx(3)-GP-56;
R(f,56,BY,BW,92,{fill:P.ambT,r:14});ICON(f,'repeat',76,BY+18,26,P.amb,2.2);
T(f,'Графики не обновляются сами',114,BY+16,{size:16,w:'b',c:P.amb});
T(f,'в следующую пятницу попросите: «обнови по свежим данным»',114,BY+42,{size:15,width:BW-74,lh:132});
A(f,sx(1)+SW/2,SY+SH+4,sx(1)+SW/2,BY-4,{c:P.amb,sw:2,head:8,dash:true});
// закрепление
const PX=sx(4),PW=1144-PX;R(f,PX,BY,PW,92,{fill:P.card,stroke:P.acc,r:14,sw:2});ICB(f,'pin',PX+16,BY+22,48,P.accT,P.acc);
const pt=T(f,'Закрепите отчёт в боковой панели',PX+80,BY,{size:17,w:'b',width:PW-96,lh:128});pt.y=BY+(92-pt.height)/2;
NOTE(f,'Чтобы руководитель мог звать @Claude, дайте ему доступ Editor внутри организации (Team / Enterprise).');

// ===== 5.8
const g=FIG(sheet,1,'5.8','Кто что видит: безопасность артефактов');
const G0=TOP(g);
const cw=[210,220,172,258];const xs=[56];for(let i=1;i<4;i++)xs.push(xs[i-1]+cw[i-1]);const TW=860;
R(g,56,G0,TW,40,{fill:P.dark,r:10});['Сценарий','Кто видит','Уровень доступа','Чего не класть'].forEach((h,i)=>T(g,h.toUpperCase(),xs[i]+14,G0+12,{size:12.5,w:'b',c:'#FFFFFF',ls:6}));
const rows=[
 ['doc','Отчёт в Сеул (Doc)','руководство в организации',['Editor'],'данные пациентов, лишние персональные данные'],
 ['sheet','Трекер SMC (общая база)','команда по приглашению',['Can edit','Can view'],'сканы и фото (только текст), данные пациентов'],
 ['money','Калькулятор КП (партнёр)','дистрибьютор',['Can view'],'себестоимость, маржа, цены других партнёров'],
 ['chart','Дашборд дебиторки','участники организации; по ссылке — только после входа',['Can view'],'закрытые финансовые данные вне круга'],
 ['layers','Одностраничник Design','публично',['по ссылке'],'непроверенные клинические утверждения']];
let y=G0+46;
rows.forEach(([ic,n,who,lv,no],j)=>{const bg=R(g,56,y,TW,70,{fill:j%2?P.soft:P.card,stroke:P.line,r:10});
 const a=T(g,n,xs[0]+56,y+14,{size:15.5,w:'b',width:cw[0]-66,lh:126});
 const b=T(g,who,xs[1]+14,y+14,{size:15,width:cw[1]-28,lh:132});
 let ly=y+12;lv.forEach(s=>{PILL(g,s,xs[2]+14,ly,{fill:s==='по ссылке'?P.ambT:P.bluT,c:s==='по ссылке'?P.amb:P.blu,size:13.5,h:26,w:'s'});ly+=32;});
 ICON(g,'x',xs[3]+14,y+15,18,P.red,2.6);
 const c=T(g,no,xs[3]+40,y+14,{size:15,width:cw[3]-54,lh:132});
 const h=Math.max(62,a.y+a.height-y+14,b.y+b.height-y+14,ly-y+8,c.y+c.height-y+14);bg.resize(TW,h);
 ICB(g,ic,xs[0]+12,y+(h-36)/2,36,P.accT,P.acc);a.y=y+(h-a.height)/2;
 y+=h+6;});
const tb=y-6;
// стоп-лист
const SX=56+TW+20,SWd=1144-SX;
R(g,SX,G0,SWd,tb-G0,{fill:P.red,r:16});
ICB(g,'x',SX+18,G0+20,44,'#FFFFFF',P.red);
T(g,'СТОП-ЛИСТ',SX+18,G0+82,{size:15,w:'x',c:'#FFFFFF',ls:10});
T(g,'Данные пациентов — ни в один артефакт',SX+18,G0+110,{size:15,w:'s',c:'#FFFFFF',width:SWd-36,lh:132});
let sy=G0+178;['ФИО','снимки','диагнозы'].forEach(s=>{R(g,SX+18,sy,SWd-36,38,{fill:'#FFFFFF',r:10,op:0.95});ICON(g,'x',SX+30,sy+10,18,P.red,2.6);T(g,s,SX+58,sy+9,{size:16,w:'b',c:P.red});sy+=46;});
T(g,'никогда',SX+18,sy+6,{size:22,w:'x',c:'#FFFFFF'});
// серые плашки
const PY=tb+16,PWd=(1088-24)/3;
const plq=[['shield','HIPAA / CMEK / ZDR: нельзя приглашать внешних; артефакты Claude Code недоступны'],['eye','Правки в Docs пока не попадают в Compliance API'],['warn','Удаление Doc — без корзины; снятие legacy с публикации удаляет данные']];
const pts=[];let ph=0;plq.forEach(([ic,s],i)=>{const t=T(g,s,56+i*(PWd+12)+52,PY+14,{size:14.5,w:'m',width:PWd-68,lh:132});pts.push(t);ph=Math.max(ph,t.height+28);});
plq.forEach(([ic,s],i)=>{const x=56+i*(PWd+12);const r=R(g,x,PY,PWd,ph,{fill:P.soft,stroke:'#CFC8BC',r:12});g.insertChild(g.children.indexOf(pts[i]),r);ICON(g,ic,x+16,PY+(ph-24)/2,24,P.mut,2.2);pts[i].y=PY+(ph-pts[i].height)/2;});
NOTE(g,'Всё, что попало в артефакт, видит каждый, у кого есть доступ. Перед внешним доступом сверьтесь с политикой компании.');
await f.screenshot({scale:1.5});await g.screenshot({scale:1.5});
return {T0,SY,SH,G0,tb,PY,ph};
