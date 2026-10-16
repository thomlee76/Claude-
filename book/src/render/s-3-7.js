// Вызов use_figma для fileKey qSjkanUWVfauD3kCOHEuUs: сначала lib-patched.js, затем этот код.
const sheet=(()=>{const s=figma.createFrame();s.resize(2520,1640);s.fills=F('#D8D2C7');return s;})();

// ===== 3.7
const h=FIG(sheet,2,'3.7','Цикл тестирования и улучшения навыка');
const cx=468,cy=420,rx=300,ry=215;
E(h,cx-rx,cy-ry,rx*2,'',{h:ry*2,stroke:'#D3CABC',sw:3});
const steps=[
 ['Тестовые запросы',P.blu,'3 рабочих сценария + 3 запроса, где навык НЕ должен сработать',-90,250],
 ['Срабатывание',P.grn,'В мыслях Claude есть строка «Reading/Using [имя навыка]»?',-18,250],
 ['Оценка результата',P.amb,'Сравнить с эталонным письмом или отчётом по чек-листу',54,250],
 ['Диагноз',P.red,null,126,290],
 ['Правка и новая версия',P.pur,'Попросите Claude обновить навык, перезагрузите ZIP',198,250]];
const out=[];
steps.forEach(([title,c,body,ang,w],i)=>{
 const a=ang*Math.PI/180,px=cx+rx*Math.cos(a),py=cy+ry*Math.sin(a);
 const card=R(h,0,0,w,100,{fill:P.card,stroke:P.line,r:16});
 const nb=E(h,0,0,28,c);const nt=TC(h,String(i+1),0,0,28,28,{size:14,w:'b',c:'#FFFFFF'});
 const tt=T(h,title,0,0,{size:17,w:'b',c:c,width:w-64});
 let cur=16+Math.max(28,tt.height)+8;const items=[];
 if(body){const b=T(h,body,0,0,{size:14,width:w-32,lh:135});items.push([b,16,cur]);cur+=b.height;}
 else{[['не сработал','правим description'],['сработал, но ошибся','правим инструкции'],['путается в данных','выносим справку в references/']].forEach(([q,ans])=>{const s=q+' → '+ans;const b=T(h,s,0,0,{size:14,width:w-32,lh:135});b.setRangeFontName(0,q.length,{family:'Inter',style:'Semi Bold'});items.push([b,16,cur]);cur+=b.height+6;});cur-=6;}
 let pills=null;
 if(i===1){cur+=10;pills=cur;cur+=26;}
 cur+=16;
 const X=px-w/2,Y=py-cur/2;
 card.x=X;card.y=Y;card.resize(w,cur);
 nb.x=X+16;nb.y=Y+16;nt.x=X+16;nt.y=Y+16+(28-nt.height)/2;
 tt.x=X+52;tt.y=Y+16+(28-tt.height)/2;
 items.forEach(([n,dx,dy])=>{n.x=X+dx;n.y=Y+dy;});
 if(pills!==null){const w1=PILL(h,'да → шаг 3',X+16,Y+pills,{fill:P.grnT,c:P.grn,size:13});PILL(h,'нет → шаг 4',X+24+w1,Y+pills,{fill:P.redT,c:P.red,size:13});}
 out.push([Math.round(X),Math.round(Y),w,Math.round(cur)]);
});
[-54,18,90,162,234].forEach(m=>{const a1=(m-5)*Math.PI/180,a2=(m+5)*Math.PI/180;A(h,cx+rx*Math.cos(a1),cy+ry*Math.sin(a1),cx+rx*Math.cos(a2),cy+ry*Math.sin(a2),{c:P.acc,sw:3,head:13});});
E(h,cx-88,cy-88,176,P.dark);ICON(h,'chat',cx-14,cy-58,28,'#FFFFFF',2);
TC(h,'Новый чат для каждого теста',cx-70,cy-24,140,64,{size:17,w:'b',c:'#FFFFFF',lh:120});
const ad=R(h,920,140,224,100,{fill:P.ambT,r:16});
ICON(h,'star',940,160,26,P.amb,2);
const at=T(h,'Совет из документации Anthropic',940,196,{size:16,w:'b',c:P.amb,width:184,lh:125});
const ab=T(h,'Минимум три сценария-проверки. Проверяйте на тех моделях, которыми пользуетесь.',940,at.y+at.height+10,{size:15,width:184,lh:140});
ad.resize(224,ab.y+ab.height+20-140);
const sy=140+ad.height+16;
const sd=R(h,920,sy,224,100,{fill:P.dark,r:16});
ICON(h,'flag',940,sy+20,24,'#FFFFFF',2);
const st=T(h,'Когда остановиться',940,sy+54,{size:16,w:'b',c:'#FFFFFF',width:184});
const sb=T(h,'Ошибки перестали повторяться на всех тестовых запросах',940,st.y+st.height+8,{size:15,c:'#E8E2D8',width:184,lh:140});
sd.resize(224,sb.y+sb.height+20-sy);
NOTE(h,'Каждый тест — в новом чате: так результат не зависит от предыдущей переписки.');

// ===== 3.8
const g=FIG(sheet,3,'3.8','Библиотека навыков отдела продаж: 8 навыков');
const LC='#CFC6B8';
const HX=600,HY=380,HR=85;
R(g,416,HY-1.25,HX-HR-416+4,2.5,{fill:LC,r:1});
A(g,HX+60,HY-60,784,330,{head:0,c:LC});A(g,HX+60,HY+60,784,470,{head:0,c:LC});
const ST={'Required':[P.red,P.redT],'Installed by default':[P.grn,P.grnT],'Available to install':[P.blu,P.bluT],'Share: команда проекта':[P.pur,P.purT]};
const panel=(x,y,w,hh,title,n,c,ic)=>{R(g,x,y,w,hh,{fill:P.soft,r:18});ICON(g,ic,x+16,y+13,22,c,2);T(g,title,x+46,y+14,{size:18,w:'b',c});const m=T(g,n,0,y+17,{size:13,c:P.mut});m.x=x+w-16-m.width;};
const card=(i,x,y,name,title,owner,stt)=>{R(g,x,y,328,78,{fill:P.card,stroke:P.line,r:12});NUM(g,i,x+12,y+13,{d:24,size:12});T(g,name,x+44,y+13,{size:15,w:'b'});const t=T(g,title,x+44,y+36,{size:13,w:'m',c:P.ink});if(t.width>270)t.characters=title.replace('генерального директора','гендиректора');T(g,owner,x+44,y+56,{size:12,c:P.mut});const [c,bg]=ST[stt];const tmp=T(g,stt,0,0,{size:11,w:'s'});const pw=tmp.width+20;tmp.remove();PILL(g,stt,x+328-pw-12,y-10,{fill:bg,c,size:11,px:10,h:20,stroke:c});};
panel(56,140,360,420,'Переписка','4 навыка',P.acc,'mail');
[['distributor-letter-ru-en','Письмо дистрибьютору RU/EN','автор: руководитель отдела','Installed by default'],['expo-follow-up','Follow-up после выставки','автор: менеджер по Казахстану','Available to install'],['commercial-offer','Коммерческое предложение','автор: руководитель отдела','Installed by default'],['claim-response','Ответ на рекламацию','автор: руководитель отдела','Required']].forEach((d,i)=>card(i+1,72,192+i*92,...d));
panel(784,140,360,234,'Отчётность','2 навыка',P.blu,'chart');
card(5,800,192,'weekly-sales-report','Еженедельный отчёт руководству','автор: руководитель отдела','Installed by default');
card(6,800,284,'ceo-one-pager','Одностраничник для генерального директора','автор: руководитель отдела','Available to install');
panel(784,390,360,234,'Проекты и тендеры','2 навыка',P.grn,'shield');
card(7,800,442,'smc-project-status','Статус проекта Seoul Medical Center','автор: менеджер проекта SMC','Share: команда проекта');
card(8,800,534,'tender-checklist','Проверка тендерной документации','автор: менеджер по Казахстану','Available to install');
const y5=231,y6=323;
A(g,800,y5,770,y5,{head:0,c:P.acc,dash:1,sw:2});A(g,770,y5,770,y6,{head:0,c:P.acc,dash:1,sw:2});A(g,770,y6,797,y6,{c:P.acc,sw:2,head:9});
T(g,'одностраничник строится из недельного отчёта',580,y5+18,{size:13,w:'m',c:P.acc,width:180,align:'RIGHT',lh:130});
E(g,HX-HR,HY-HR,HR*2,P.dark);ICON(g,'user',HX-13,HY-58,26,'#FFFFFF',2);
TC(g,'Отдел продаж СНГ и LatAm',HX-66,HY-26,132,70,{size:17,w:'b',c:'#FFFFFF',lh:120});
T(g,'РЕЖИМ ПУБЛИКАЦИИ',440,492,{size:12,w:'b',c:P.mut,ls:8});
[['Required','обязателен'],['Installed by default','установлен по умолчанию'],['Available to install','доступен для установки'],['Share: команда проекта','доступ только команде']].forEach(([s,d],i)=>{const [c,bg]=ST[s];const yy=514+i*28;const pw=PILL(g,s,440,yy,{fill:bg,c,size:11,px:10,h:20,stroke:c});T(g,d,440+pw+8,yy+2,{size:13,c:P.ink});});
R(g,56,640,1088,56,{fill:P.dark,r:14});ICON(g,'layers',76,655,26,'#FFFFFF',2);
const ft=T(g,'Встроенные навыки Anthropic:',116,657,{size:17,w:'s',c:'#FFFFFF'});
let fx=ft.x+ft.width+16;['docx','xlsx','pptx','pdf'].forEach(s=>{fx+=PILL(g,s,fx,654,{fill:'#45413D',c:'#FFFFFF',size:14})+10;});
const fn=T(g,'основа для навыков с документами',0,659,{size:14,c:'#BDB5A9'});fn.x=1124-fn.width;
NOTE(g,'Пример библиотеки: авторы и режимы публикации условные; режим выбирается при Publish to org.');
await h.screenshot({scale:1.5});await g.screenshot({scale:1.5});
return {h:h.id,g:g.id,e1,e2,out};
