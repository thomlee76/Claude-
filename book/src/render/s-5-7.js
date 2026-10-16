// Рисунки 5.7 и 5.8 (библиотека figma-lib.js подключается автоматически)
Object.assign(IC,{branch:'<circle cx="6" cy="5" r="2.5"/><circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="7" r="2.5"/><path d="M6 7.5v9M18 9.5c0 5-12 3-12 7"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3-5.5 7-5.5s7 2 7 5.5"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14c3 0 5 1.5 5 4.5"/>',up:'<path d="M12 19V5M6 11l6-6 6 6"/>'});
function PL(p,pts,o={}){const c=o.c||P.mut,sw=o.sw||2.5,hd=12;const xs=pts.map(q=>q[0]),ys=pts.map(q=>q[1]);const mx=Math.min(...xs)-hd,my=Math.min(...ys)-hd;const w=Math.max(...xs)-mx+hd,h=Math.max(...ys)-my+hd;const Q=pts.map(([x,y])=>[x-mx,y-my]);let d='M'+Q.map(q=>q.join(' ')).join(' L');const [ax,ay]=Q[Q.length-2],[bx,by]=Q[Q.length-1];const a=Math.atan2(by-ay,bx-ax);d+=` M${bx-hd*Math.cos(a-0.5)} ${by-hd*Math.sin(a-0.5)} L${bx} ${by} L${bx-hd*Math.cos(a+0.5)} ${by-hd*Math.sin(a+0.5)}`;return SVG(p,`<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${d}" stroke="${c}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/></svg>`,mx,my);}
const sheet=figma.createFrame();sheet.name='Лист · Раздел 5 · часть 2';sheet.resize(2520,1640);sheet.fills=F('#D8D2C7');

// ---------- 5.7
const f=FIG(sheet,2,'5.7','Облачная сессия: от репозитория до PR');
const cw=336,gap=40,xs=[56,56+cw+gap,56+2*(cw+gap)];
function STEP(x,y,n,ic,c,t,title,body){const r=R(f,x,y,cw,10,{stroke:P.line,r:16});NUM(f,n,x+16,y+16,{d:30,size:14,fill:c});ICON(f,ic,x+cw-44,y+16,26,c,2);
 const a=T(f,title,x+56,y+19,{size:17,w:'b',width:cw-110,lh:118});let cy=Math.max(a.y+a.height,y+46)+12;cy=body(x+16,cy,cw-32);return {r,y,h:cy+16-y};}
function items(x,y,w,arr,c){arr.forEach(s=>{E(f,x+2,y+8,6,c);const t=T(f,s,x+16,y,{size:15,width:w-16,lh:130});y=t.y+t.height+5;});return y-5;}
const S=[
 [1,'branch',P.ink,'#E9E4DB','Репозиторий на GitHub',(x,y,w)=>{PILL(f,'Sign in with GitHub',x,y,{fill:P.dark,c:'#FFFFFF',size:14,w:'s',h:30,rr:8});return items(x,y+42,w,['подключите GitHub','для приватных репозиториев установите Claude GitHub App'],P.ink);}],
 [2,'globe',P.blu,P.bluT,'claude.ai/code',(x,y,w)=>items(x,y,w,['выбор репозитория и ветки','окружение Default (сеть Trusted)','режим Accept edits / Plan / Auto'],P.blu)],
 [3,'chat',P.acc,P.accT,'Задача',(x,y,w)=>{const r=R(f,x,y,w,10,{fill:P.accT,r:10});const t=T(f,'«Добавь на страницу для дистрибьюторов калькулятор цены с учётом скидки»',x+14,y+12,{size:15,w:'m',width:w-28,lh:135});r.resize(w,t.height+24);return y+t.height+24;}],
 [4,'cloud',P.pur,P.purT,'Облачная ВМ (Ubuntu 24.04)',(x,y,w)=>{const L=['клонирование','setup-скрипт','правки','проверки'];const ws=L.map(s=>{const tw=T(f,s,0,0,{size:14,w:'s'});const v=tw.width+24;tw.remove();return v;});let px=x,py=y;L.forEach((s,k)=>{PILL(f,s,px,py,{fill:P.purT,c:P.pur,size:14,w:'s',h:30,rr:8});px+=ws[k];if(k<3){if(px+28+ws[k+1]>x+w){px=x;py+=40;}else{A(f,px+5,py+15,px+21,py+15,{c:P.pur,sw:2,head:6});px+=28;}}});return py+30;}],
 [5,'code',P.grn,P.grnT,'Ветка и дифф',(x,y,w)=>{R(f,x,y,w,40,{fill:P.soft,r:10});T(f,'claude/price-calc',x+14,y+11,{size:14,w:'s',c:P.mut});const r1=T(f,'−18',0,y+10,{size:16,w:'b',c:P.red});r1.x=x+w-14-r1.width;const g1=T(f,'+42',0,y+10,{size:16,w:'b',c:P.grn});g1.x=r1.x-10-g1.width;return items(x,y+52,w,['построчные комментарии','кнопка Compare against'],P.grn);}],
 [6,'check',P.acc,P.accT,'Create PR',(x,y,w)=>{const bw=PILL(f,'Create PR',x,y,{fill:P.acc,c:'#FFFFFF',size:15,w:'b',h:34,rr:8,px:16});PILL(f,'Draft',x+bw+10,y,{fill:'#FFFFFF',stroke:P.line,c:P.ink,size:15,w:'s',h:34,rr:8,px:14});return items(x,y+46,w,['полный PR или черновик','далее Auto-fix при ошибках CI'],P.acc);}]];
const st=[];let row2=0;
S.forEach((s,i)=>{const row=Math.floor(i/3);const x=xs[i%3];if(i===3)row2=Math.max(st[0].h,st[1].h,st[2].h)+20+140+60;const yy=row===0?140:row2;st.push(STEP(x,yy,s[0],s[1],s[2],s[3],s[4],s[5]));});
[0,1].forEach(row=>{const g=st.slice(row*3,row*3+3);const mh=Math.max(...g.map(o=>o.h));g.forEach(o=>{o.r.resize(cw,mh+20);o.h=mh+20;});});
const r1y=140,r1h=st[0].h,r2y=st[3].y,r2h=st[3].h;
A(f,xs[0]+cw+6,r1y+r1h/2,xs[1]-6,r1y+r1h/2,{c:P.ink});A(f,xs[1]+cw+6,r1y+r1h/2,xs[2]-6,r1y+r1h/2,{c:P.ink});
A(f,xs[0]+cw+6,r2y+r2h/2,xs[1]-6,r2y+r2h/2,{c:P.ink});A(f,xs[1]+cw+6,r2y+r2h/2,xs[2]-6,r2y+r2h/2,{c:P.ink});
const midY=r1y+r1h+26;PL(f,[[xs[2]+cw/2,r1y+r1h+4],[xs[2]+cw/2,midY],[xs[0]+cw/2,midY],[xs[0]+cw/2,r2y-4]],{c:P.ink});
const by=r2y+r2h+16;const bh=Math.max(52,700-by);
const B=[['phone','Продолжить с телефона —\nвкладка Code',P.bluT,P.blu],['term','Забрать в терминал —\nclaude --teleport',P.grnT,P.grn],['key','Доступно на Pro, Max, Team и Enterprise (премиум-места)',P.ambT,P.amb]];
B.forEach(([ic,s,t,c],i)=>{const x=xs[i];R(f,x,by,cw,bh,{fill:t,r:14});ICON(f,ic,x+16,by+bh/2-13,26,c,2);TC(f,s,x+54,by,cw-70,bh,{size:15,w:'s',align:'LEFT',lh:128});});
NOTE(f,'Схематично: названия кнопок и окружений — по справке claude.ai/code; оформление может отличаться.');

// ---------- 5.8
const g=FIG(sheet,3,'5.8','Настройки: settings.json, разрешения, хуки');
const L=[['shield',P.pur,P.purT,'Managed (организация)','managed-settings.json'],['term',P.acc,P.accT,'Командная строка','claude --settings'],['lock',P.amb,P.ambT,'.claude/settings.local.json','лично вы, этот проект'],['users',P.grn,P.grnT,'.claude/settings.json','вся команда проекта'],['user',P.blu,P.bluT,'~/.claude/settings.json','вы, все проекты']];
const lx=104,lw=410,sh=74,sg=10;
L.forEach(([ic,c,t,h,s],i)=>{const y=140+i*(sh+sg);const x=lx+i*10,w=lw-i*10;R(g,x,y,w,sh,{stroke:P.line,r:14});R(g,x,y+12,6,sh-24,{fill:c,r:3});
 NUM(g,i+1,x+18,y+20,{d:34,size:15,fill:c});const a=T(g,h,x+64,y+15,{size:16.5,w:'b',c:P.ink,width:w-130});T(g,s,x+64,a.y+a.height+3,{size:14.5,c:P.mut,w:'m'});ICB(g,ic,x+w-52,y+17,40,t,c);});
const lb=140+5*(sh+sg)-sg;
A(g,72,lb,72,148,{c:P.acc,sw:3});T(g,'ВАЖНЕЕ',56,118,{size:12,w:'b',c:P.acc,ls:8});
const nb=634-lb-16;R(g,56,lb+16,458,nb,{fill:P.accT,r:14});ICON(g,'up',74,lb+16+nb/2-12,24,P.acc,2.2);
TC(g,'Выше — важнее; списки разрешений со всех уровней объединяются',110,lb+16,390,nb,{size:15,w:'s',align:'LEFT',lh:130});
const wx=546,wy=136,ww=598,wh=498;
R(g,wx,wy,ww,wh,{fill:P.dark,r:14});R(g,wx+1,wy+1,ww-2,43,{fill:'#3A3734',r:13});R(g,wx+1,wy+30,ww-2,14,{fill:'#3A3734',r:0});[0,1,2].forEach(i=>E(g,wx+18+i*20,wy+16,12,['#E06C5A','#E3B341','#62B26B'][i]));T(g,'.claude/settings.json',wx+90,wy+13,{size:15,w:'m',c:'#9C958B'});
const TX='#ECE6DC',TM='#9C958B',KB='#8FB8E8',KG='#86C79A',KY='#E6BE6A',KR='#EE8F82',KS='#D9C7A7';
const X=wx+24;let y=wy+62;const LH=23;
const C=(s,x,yy,c,w)=>T(g,s,x,yy,{size:15,w:w||'m',c});
function blk(y0,y1,col,label){R(g,wx+12,y0-5,ww-24,y1-y0+6,{fill:col,r:8,op:0.16});R(g,wx+12,y0-5,4,y1-y0+6,{fill:col,r:2});if(label){const t=T(g,label,0,y0,{size:12,w:'b',c:col,ls:8});t.x=wx+ww-24-t.width;}}
C('{',X,y,TX);y+=LH+6;
const kv=(k,kc,v,yy,ind)=>{const a=C(k,X+ind,yy,kc,'s');C(v,X+ind+a.width+8,yy,KS);};
const p0=y;C('"permissions": {',X+16,y,KB,'b');y+=LH;
kv('"allow":',KG,'["Bash(python weekly_report.py)"],',y,36);y+=LH;
kv('"ask":',KY,'["Bash(git push *)"],',y,36);y+=LH;
kv('"deny":',KR,'["Read(./.env)", "Read(./contracts/**)"],',y,36);y+=LH;
kv('"defaultMode":',TX,'"default"',y,36);y+=LH;
C('},',X+16,y,KB,'b');y+=LH;blk(p0,y,'#5E9BE0','РАЗРЕШЕНИЯ');y+=14;
const h0=y;C('"hooks": {',X+16,y,KY,'b');y+=LH;
[['"PreToolUse": […],','до действия, может заблокировать'],['"PostToolUse": […],','после действия'],['"Notification": […],','уведомить, что Claude ждёт'],['"Stop": […]','Claude закончил ответ']].forEach(([k,cm])=>{C(k,X+36,y,TX,'s');C('// '+cm,X+236,y,TM,'r');y+=LH;});
C('},',X+16,y,KY,'b');y+=LH;blk(h0,y,'#E6BE6A','ХУКИ');y+=14;
const e0=y;kv('"env":',KG,'{ "REPORT_DIR": "output" },',y,16);y+=LH;
kv('"model":',KG,'"opus"',y,16);y+=LH;blk(e0,y,'#86C79A','ОКРУЖЕНИЕ И МОДЕЛЬ');y+=8;
C('}',X,y,TX);const codeEnd=y+LH;
const sy=650;R(g,56,sy,1088,52,{fill:P.dark,r:14});
let bx=80;const lab=T(g,'Проверить, что загрузилось:',bx,sy+15,{size:16,w:'s',c:'#FFFFFF'});bx+=lab.width+16;
[['/status','настройки'],['/hooks','хуки'],['/permissions','разрешения']].forEach(([k,v])=>{const w=PILL(g,k,bx,sy+11,{fill:'#4A4542',c:'#F2C3AE',size:15,w:'b',h:30,rr:7});const t=T(g,'— '+v,bx+w+8,sy+16,{size:15.5,w:'m',c:'#FFFFFF'});bx+=w+8+t.width+28;});
NOTE(g,'Правила deny блокируют действие в любом режиме. Пример файла — схематичный.');
await f.screenshot({scale:1.5});await g.screenshot({scale:1.5});
return {r2y,r2h,by,bh,codeEnd,lb};
