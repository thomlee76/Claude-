// Глава 6 (новая): рисунки 6.7, 6.8. Запуск: node run.js s6new-7.js 6-7 6-8
const sheet=figma.createFrame();sheet.name='Лист · Глава 6 · часть 4';sheet.resize(2520,1640);sheet.fills=F('#D8D2C7');
function MW(s,size,w){const t=T(sheet,s,0,0,{size,w});const v=t.width;t.remove();return v;}
function CLOUD(p,x,y,w,h,fill){E(p,x,y+h*0.32,w*0.42,fill,{h:h*0.6});E(p,x+w*0.2,y,w*0.5,fill,{h:h*0.82});E(p,x+w*0.5,y+h*0.16,w*0.46,fill,{h:h*0.7});R(p,x+w*0.08,y+h*0.5,w*0.84,h*0.5,{fill,r:h*0.25});}
function PHN(p,x,y,c){R(p,x,y,50,88,{fill:c||P.dark,r:11});R(p,x+4,y+10,42,68,{fill:'#FFFFFF',r:5});R(p,x+18,y+4,14,3,{fill:'#FFFFFF',r:2,op:0.6});}
function LAPON(p,x,y,w,h,c){R(p,x,y,w,h,{fill:c||P.dark,r:8});R(p,x+6,y+6,w-12,h-12,{fill:'#1A1918',r:4});R(p,x-12,y+h,w+24,9,{fill:'#9A948A',r:4});}
function LAPOFF(p,x,y,w){R(p,x,y,w,10,{fill:'#B9B2A6',r:4});R(p,x-12,y+10,w+24,9,{fill:'#CFC9BF',r:4});}

// ===== 6.7
const f=FIG(sheet,0,'6.7','Продолжить с телефона: три разных механизма');
ICON(f,'phone',56,138,24,P.acc,2.2);T(f,'Начал на ПК — продолжил с телефона',88,138,{size:19,w:'b'});
const CW=344,CG=28,Y0=180,Y1=700;
const COL=[{t:'Облачная задача',s:'Cowork / единый Claude',c:P.grn,ct:P.grnT},{t:'Remote Control',s:'Claude Code',c:P.blu,ct:P.bluT},{t:'Dispatch',s:'',c:'#8E887E',ct:'#ECE8E1'}];
COL.forEach((k,i)=>{const x=56+i*(CW+CG);R(f,x,Y0,CW,Y1-Y0,{fill:i===2?'#F1EEE9':P.card,stroke:P.line,r:16});
 R(f,x,Y0,CW,62,{fill:k.ct,r:16});R(f,x,Y0+40,CW,22,{fill:k.ct,r:0});
 NUM(f,i+1,x+16,Y0+15,{d:32,size:16,fill:k.c});T(f,k.t,x+60,Y0+11,{size:19,w:'b',c:i===2?P.mut:k.c});if(k.s)T(f,k.s,x+60,Y0+36,{size:13.5,w:'m',c:P.mut});});
// колонка 1
{const x=56,sy=Y0+80;
 CLOUD(f,x+104,sy+6,140,84,P.grnT);ICON(f,'play',x+160,sy+30,24,P.grn,2.2);TC(f,'задача в облаке',x+104,sy+60,140,20,{size:13,w:'s',c:P.grn});
 LAPOFF(f,x+34,sy+166,100);T(f,'ноутбук закрыт',x+22,sy+196,{size:13,w:'m',c:P.mut});
 PHN(f,x+262,sy+120);
 A(f,x+92,sy+160,x+132,sy+92,{c:'#B9B2A6',sw:2,head:8,dash:true});
 A(f,x+232,sy+82,x+272,sy+114,{c:P.grn,sw:2.6,head:10});
 PILL(f,'push: готово',x+206,sy+214,{size:13,w:'b',fill:P.grn,c:'#FFFFFF',h:26,px:10});
 let ty=sy+258;const a=T(f,'Работает без включённого компьютера',x+20,ty,{size:15,w:'s',width:CW-40,lh:130});
 const b=T(f,'Pro, Max, Ultra; Team — бета; Enterprise — если включено',x+20,a.y+a.height+10,{size:14,c:P.mut,width:CW-40,lh:130});
 const lw=MW('Ваш основной вариант',15,'b')+50;R(f,x+20,Y1-58,lw,38,{fill:P.grn,r:19});ICON(f,'check',x+34,Y1-49,20,'#FFFFFF',2.6);T(f,'Ваш основной вариант',x+60,Y1-49,{size:15,w:'b',c:'#FFFFFF'});}
// колонка 2
{const x=56+CW+CG,sy=Y0+80;
 LAPON(f,x+22,sy+70,176,100,P.dark);T(f,'$ claude\nremote-control',x+38,sy+90,{size:13,w:'m',c:'#9BD39F',lh:130});
 {const fw=MW('файлы остаются на компьютере',13,'s')+40;R(f,x+16,sy+194,fw,30,{fill:P.bluT,r:8});ICON(f,'folder',x+26,sy+200,18,P.blu,2);T(f,'файлы остаются на компьютере',x+50,sy+200,{size:13,w:'s',c:P.blu});}
 const uw=MW('claude.ai/code',13.5,'b')+44;R(f,x+CW-uw-16,sy+6,uw,30,{fill:P.card,stroke:P.blu,r:15,sw:1.5});ICON(f,'globe',x+CW-uw-6,sy+12,18,P.blu,2);T(f,'claude.ai/code',x+CW-uw+18,sy+12,{size:13.5,w:'b',c:P.blu});
 PHN(f,x+272,sy+112);
 A(f,x+204,sy+92,x+CW-70,sy+42,{c:P.blu,sw:1.6,head:8});
 A(f,x+204,sy+140,x+266,sy+150,{c:P.blu,sw:1.6,head:8});
 T(f,'окно управления:',x+22,sy+14,{size:13.5,w:'s',c:P.blu});
 let ty=sy+258;const a=T(f,'Компьютер и процесс должны работать',x+20,ty,{size:15,w:'s',width:CW-40,lh:130});
 const b=T(f,'Team/Enterprise — включает владелец',x+20,a.y+a.height+10,{size:14,c:P.mut,width:CW-40,lh:130});
 PILL(f,'подробно — раздел 8',x+20,Y1-58,{size:14,w:'s',fill:P.bluT,c:P.blu,h:34,px:14});}
// колонка 3
{const x=56+2*(CW+CG),sy=Y0+80;
 PHN(f,x+40,sy+60,'#9A948A');A(f,x+104,sy+104,x+178,sy+104,{c:'#9A948A',sw:2.4,head:10});
 R(f,x+190,sy+40,120,80,{fill:'#9A948A',r:8});R(f,x+196,sy+46,108,68,{fill:'#D8D3CB',r:4});R(f,x+236,sy+120,28,18,{fill:'#9A948A',r:0});R(f,x+220,sy+136,60,8,{fill:'#9A948A',r:4});
 T(f,'телефон',x+38,sy+158,{size:13,w:'m',c:P.mut});T(f,'десктоп',x+224,sy+158,{size:13,w:'m',c:P.mut});
 R(f,x,Y0+62,CW,Y1-Y0-62,{fill:'#F1EEE9',r:0,op:0.45});
 E(f,x+CW/2-32,sy+196,64,P.mut);ICON(f,'lock',x+CW/2-16,sy+212,32,'#FFFFFF',2.2);
 TC(f,'Ограниченная бета, закрыт для новых пользователей',x+30,sy+272,CW-60,60,{size:16,w:'b',c:P.mut,lh:130});}
NOTE(f,'Схема. Вместо Dispatch Anthropic рекомендует облачный Cowork; облачная задача видит файлы ноутбука, только пока десктоп открыт.');

// ===== 6.8
const g=FIG(sheet,1,'6.8','Что видит computer use и что запрещать');
const DX=56,DY=140,DW=500,DH=424;
R(g,DX,DY,DW,DH,{fill:P.dark,r:16});R(g,DX+8,DY+8,DW-16,DH-16,{fill:'#DCE1E7',r:10});R(g,DX+8,DY+8,DW-16,22,{fill:'#C9CFD7',r:10});R(g,DX+8,DY+20,DW-16,10,{fill:'#C9CFD7',r:0});
function MWIN(x,y,w,h,ic,title,ok){R(g,x,y,w,h,{fill:P.card,r:8});R(g,x,y,w,26,{fill:P.soft,r:8});R(g,x,y+16,w,10,{fill:P.soft,r:0});ICON(g,ic,x+8,y+5,16,ok?P.grn:P.ink,2);T(g,title,x+30,y+5,{size:12.5,w:'s'});}
function FRM(x,y,w,h,c){R(g,x-5,y-5,w+10,h+10,{fill:null,stroke:c,sw:3,r:11});}
// Excel
MWIN(DX+22,DY+48,262,162,'sheet','Excel — Price_check.xlsx',1);
for(let r=0;r<4;r++)for(let c=0;c<4;c++)R(g,DX+30+c*62,DY+82+r*24,58,19,{fill:r===0?P.grnT:'#F1ECE3',r:3});
FRM(DX+22,DY+48,262,162,P.grn);PILL(g,'нужно для задачи',DX+32,DY+182,{size:12,w:'b',fill:P.grn,c:'#FFFFFF',h:22,px:9});
// уведомление мессенджера
{const x=DX+302,y=DY+42;R(g,x,y,180,58,{fill:P.card,r:12});ICB(g,'chat',x+10,y+12,32,P.bluT,P.blu);T(g,'Мессенджер',x+50,y+10,{size:12.5,w:'b'});R(g,x+50,y+32,112,9,{fill:'#E0DAD0',r:4});FRM(x,y,180,58,P.red);}
// банк-клиент
{const x=DX+302,y=DY+114;MWIN(x,y,180,96,'money','Банк-клиент');R(g,x+12,y+36,110,9,{fill:'#E0DAD0',r:5});T(g,'$ ••• •••',x+12,y+52,{size:16,w:'b',c:P.ink});R(g,x+12,y+78,80,9,{fill:'#E0DAD0',r:5});FRM(x,y,180,96,P.red);}
// медицинская система
{const x=DX+22,y=DY+236;MWIN(x,y,262,166,'user','Медицинская система');R(g,x+12,y+38,238,100,{fill:'#F6F3EE',r:8});E(g,x+22,y+50,44,'#CFC6B8');
 [[110,0.55],[150,0.35]].forEach(([w,o],i)=>{R(g,x+78,y+52+i*8,w,12,{fill:'#8E887E',r:6,op:o});});R(g,x+78,y+52,120,22,{fill:'#B9B2A6',r:11,op:0.5});
 T(g,'имя скрыто',x+78,y+78,{size:11.5,w:'m',c:P.mut});[200,170,190].forEach((w,i)=>R(g,x+22,y+100+i*12,w,7,{fill:'#E0DAD0',r:3}));FRM(x,y,262,166,P.red);}
// менеджер паролей
{const x=DX+302,y=DY+236;MWIN(x,y,180,166,'key','Менеджер паролей');[0,1,2].forEach(i=>{R(g,x+12,y+42+i*38,156,28,{fill:'#F6F3EE',r:6});T(g,'••••••••',x+22,y+47+i*38,{size:14,w:'b',c:P.mut});});FRM(x,y,180,166,P.red);}
// легенда
const LGY=DY+DH+12;R(g,DX,LGY,DW,34,{fill:P.redT,r:10});R(g,DX+12,LGY+9,24,16,{fill:null,stroke:P.red,sw:3,r:4});ICON(g,'eye',DX+46,LGY+7,20,P.red,2.2);T(g,'Claude увидит на скриншоте',DX+74,LGY+8,{size:14,w:'b',c:P.red});R(g,DX+290,LGY+9,24,16,{fill:null,stroke:P.grn,sw:3,r:4});T(g,'нужно для задачи',DX+324,LGY+8,{size:14,w:'b',c:P.grn});
// таблица
const TX=580,TW=564,TY=140,cw=(TW-16)/3,TB=LGY+34;
const TC3=[{h:'Разрешить',s:'',c:P.grn,ct:P.grnT,ic:'check',it:['Excel и нужная программа','Рабочая папка из Trusted folders']},
 {h:'Спрашивать',s:'ваши правила в промпте',c:P.amb,ct:P.ambT,ic:'chat',it:['Сохранение файлов','Переход на новые сайты']},
 {h:'Запретить',s:'',c:P.red,ct:P.redT,ic:'x',it:['Банк-клиент и платёжные сервисы','Медицинские системы и данные пациентов','Менеджер паролей','Почта с паролями и реквизитами','Импорт cookies банков, почты и SSO']}];
TC3.forEach((k,i)=>{const x=TX+i*(cw+8);R(g,x,TY,cw,TB-TY,{fill:k.ct,r:14});
 R(g,x,TY,cw,48,{fill:k.c,r:14});R(g,x,TY+34,cw,14,{fill:k.c,r:0});ICON(g,k.ic,x+14,TY+13,22,'#FFFFFF',2.6);T(g,k.h,x+44,TY+13,{size:17,w:'b',c:'#FFFFFF'});
 let y=TY+60;if(k.s){const st=T(g,k.s,x+14,y-2,{size:13,w:'s',c:k.c,width:cw-28,lh:125});y=st.y+st.height+8;}
 k.it.forEach(s=>{const t=T(g,s,x+18,y+10,{size:14,w:'m',width:cw-36,lh:128});const r=R(g,x+8,y,cw-16,t.height+20,{fill:P.card,r:10});g.insertChild(g.children.indexOf(t),r);y+=t.height+28;});
 k.b=y;});
// предупреждение
const WY=TB+14;const wr=R(g,56,WY,1088,40,{fill:P.dark,r:12});ICON(g,'warn',76,WY+15,24,'#F2B8A0',2.2);
const wt=T(g,'Anthropic: не используйте встроенный браузер и Claude in Chrome для финансовых счетов, медицинской информации и чужих персональных данных',114,WY+13,{size:15,w:'s',c:'#FFFFFF',width:1010,lh:132});wr.resize(1088,wt.height+26);
NOTE(g,'Схематичный пример. Перед запуском закройте лишние окна и уведомления; в промпте перечислите разрешённые приложения.');
await f.screenshot({scale:1.5});await g.screenshot({scale:1.5});
return {cb:TC3.map(k=>k.b),TB,wb:WY+wr.height};
