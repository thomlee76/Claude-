// Глава 7, рисунки 7.3 и 7.4. Рендер: node run.js s-7-3.js 7-3 7-4
const sheet=figma.createFrame();sheet.name='Лист · Раздел 7 · часть 2';sheet.resize(2520,1640);sheet.fills=F('#D8D2C7');
function BT(p,s,x,y,o={}){const t=T(p,s,0,0,{size:o.size||15,w:o.w||'s',c:o.c||P.ink});const px=o.px||14,h=o.h||34;const r=R(p,x,y,t.width+px*2,h,{fill:o.fill||P.card,stroke:o.stroke===undefined?P.line:o.stroke,r:o.r??8});p.insertChild(p.children.indexOf(r)+1,t);t.x=x+px;t.y=y+(h-t.height)/2;return t.width+px*2;}
IC.scissors='<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5L20 18M8.5 16.5L20 6"/>';
IC.ghost='<path d="M5 21V10a7 7 0 0 1 14 0v11l-2.5-2-2.3 2-2.2-2-2.2 2-2.3-2z"/><path d="M9.5 10v1M14.5 10v1"/>';

// ===== 7.3
const f=FIG(sheet,0,'7.3','Список Topics: проверить, исправить, удалить');
const WX=56,WY=128,WW=748;
const topics=[
 ['Роль и компания','руководитель зарубежных продаж, SG Healthcare',0],
 ['Проект Seoul Medical Center, Алматы','',1],
 ['Дистрибьюторы','MedLine Kazakhstan, MedTech, BioSaúde, Grupo Médico Azteca',0],
 ['Стиль писем','деловой, на вы',0],
 ['Поездка в Осаку 2025','',2]];
// сначала считаем высоту окна
const CH=50,EH=128,G=8,HEAD=50;
const WH=44+HEAD+topics.reduce((s,t)=>s+(t[2]===1?EH:CH)+G,0)+8;
const cy=WIN(f,WX,WY,WW,WH,'Your memory');
T(f,'Topics',WX+24,cy+14,{size:18,w:'b'});
T(f,'условные примеры',WX+104,cy+17,{size:14,c:P.mut});
let y=cy+HEAD;
topics.forEach(([n,d,st])=>{const x=WX+20,w=WW-40;
 if(st===1){R(f,x,y,w,EH,{fill:P.card,stroke:P.acc,r:12,sw:2});
  ICON(f,'chev',x+16,y+15,20,P.acc,2.4);T(f,n,x+48,y+14,{size:16,w:'b'});
  R(f,x+48,y+46,w-200,1,{fill:P.line,r:0});
  T(f,'Главный проект — Seoul Medical Center в Алматы, дистрибьютор — ТОО MedLine Kazakhstan. Поставка УЗИ и рентгена, контакт в SMC — Dr. Ahn.',x+48,y+56,{size:14.5,c:P.ink,width:w-210,lh:138});
  // правка и удаление
  R(f,x+w-140,y+56,40,36,{fill:P.soft,stroke:P.line,r:8});ICON(f,'edit',x+w-131,y+63,22,P.ink,2);
  BT(f,'Delete',x+w-92,y+57,{size:14,c:P.red,stroke:P.red,fill:P.redT});
  y+=EH+G;return;}
 const red=st===2;
 R(f,x,y,w,CH,{fill:red?P.redT:P.card,stroke:red?P.red:P.line,r:12,sw:red?2:1.5});
 ICON(f,'right',x+16,y+15,20,red?P.red:P.mut,2.4);
 const t=T(f,n,x+48,y+15,{size:16,w:'s',c:P.ink});
 if(d)T(f,'— '+d,t.x+t.width+8,y+16,{size:15,c:P.mut,width:w-(t.width+8)-64});
 if(red){const tw=T(f,'устарело — удалить',0,0,{size:14,w:'b',c:'#FFFFFF'});const pw=tw.width+46;tw.remove();const px=x+w-pw-14;
  R(f,px,y+10,pw,30,{fill:P.red,r:16});ICON(f,'x',px+12,y+16,18,'#FFFFFF',2.6);T(f,'устарело — удалить',px+34,y+15,{size:14,w:'b',c:'#FFFFFF'});}
 y+=CH+G;});
// правая плашка
const PX=830,PW=314;
R(f,PX,WY,PW,WH,{fill:P.dark,r:16});
ICB(f,'lock',PX+20,WY+20,44,'#FFFFFF',P.dark);
T(f,'Не сохраняется никогда',PX+20,WY+78,{size:20,w:'b',c:'#FFFFFF',width:PW-40});
T(f,'даже если попросить',PX+20,WY+108,{size:14,c:'#CFC8BC'});
['номера госдокументов','судимость','номера финансовых счетов','иммиграционный статус'].forEach((s,i)=>{const yy=WY+150+i*50;
 R(f,PX+20,yy,PW-40,44,{fill:'#3A3734',r:10});ICON(f,'x',PX+34,yy+12,20,'#E8A08F',2.6);T(f,s,PX+64,yy+12,{size:15,w:'s',c:'#FFFFFF'});});
T(f,'Здоровье, раса, религия, политика, гендерная идентичность — не сохраняются по умолчанию (Include sensitive topics in memory).',PX+20,WY+360,{size:13.5,c:'#CFC8BC',width:PW-40,lh:135});
// предупреждение
const by=WY+WH+18;
R(f,56,by,1088,56,{fill:P.ambT,r:12});ICON(f,'warn',76,by+16,24,P.amb,2.2);
T(f,'Удаление чата не удаляет записи памяти из него — их удаляют вручную в Topics.',112,by+18,{size:16,w:'s',width:1010});
NOTE(f,'Условный макет и условные записи. Откройте тему, поправьте значком правки или удалите кнопкой «Delete».');

// ===== 7.4
const g=FIG(sheet,1,'7.4','Импорт памяти из другого ИИ за 4 шага');
const CW=250,GX=29,TOP=138,BH=364;const xs=[0,1,2,3].map(i=>56+i*(CW+GX));
const heads=['Прежний ИИ (например, ChatGPT)','Settings > Your Claude','Вставьте текст','Проверьте результат'];
const tints=[[P.mut,P.soft],[P.acc,P.accT],[P.acc,P.accT],[P.grn,P.grnT]];
xs.forEach((x,i)=>{NUM(g,i+1,x,TOP,{d:30,size:14,fill:i===0?P.ink:(i===3?P.grn:P.acc)});T(g,heads[i],x+40,TOP+5,{size:16,w:'b',width:CW-40,lh:120});});
const BY=TOP+60;
xs.forEach((x,i)=>{R(g,x,BY,CW,BH,{fill:tints[i][1],r:16});if(i<3)A(g,x+CW+4,BY+BH/2,x+CW+GX-4,BY+BH/2,{c:P.ink,sw:2.5,head:9});});
// 1: окно чата прежнего ИИ
{const x=xs[0];const c=WIN(g,x+12,BY+12,CW-24,BH-24,'');
 R(g,x+26,c+12,CW-52,140,{fill:P.soft,r:10});
 T(g,'«I\'m moving to another service and need to export my data. List every memory you have stored about me…»',x+36,c+20,{size:13,w:'m',c:P.ink,width:CW-72,lh:135});
 T(g,'Ответ — список:',x+28,c+168,{size:13,w:'s',c:P.mut});
 [0,1,2,3].forEach(k=>{const yy=c+196+k*24;E(g,x+30,yy+3,7,P.mut);R(g,x+44,yy,[150,120,160,110,135][k],12,{fill:'#E4DDD1',r:6});});}
// 2: Settings
{const x=xs[1];const c=WIN(g,x+12,BY+12,CW-24,BH-24,'Settings');
 R(g,x+26,c+14,CW-52,40,{fill:P.accT,r:8});T(g,'Your Claude',x+38,c+24,{size:15,w:'b',c:P.acc});
 T(g,'в старом интерфейсе: Settings > Memory',x+28,c+66,{size:13,c:P.mut,width:CW-56,lh:130});
 [0,1].forEach(k=>R(g,x+28,c+110+k*26,[150,110][k],12,{fill:'#E4DDD1',r:6}));
 const bw=BT(g,'Start import',0,0,{size:15,fill:P.acc,c:'#FFFFFF',stroke:null,h:40});
 // переставим кнопку по центру
 const nb=g.children.slice(-2);nb[0].x=x+(CW-bw)/2;nb[0].y=c+186;nb[1].x=nb[0].x+14;nb[1].y=c+186+(40-nb[1].height)/2;
 T(g,'экспериментально, все тарифы, веб и десктоп',x+28,c+240,{size:13,c:P.mut,width:CW-56,lh:130,align:'CENTER'});}
// 3: поле вставки
{const x=xs[2];
 // выноска с ножницами
 R(g,x+12,BY+12,CW-24,86,{fill:P.card,stroke:P.red,r:12,sw:2});ICON(g,'scissors',x+26,BY+26,24,P.red,2.2);
 T(g,'сначала вычеркните имена клиентов, телефоны, цены',x+60,BY+24,{size:14,w:'s',c:P.red,width:CW-88,lh:130});
 const fy=BY+112;R(g,x+12,fy,CW-24,BH-124,{fill:P.card,stroke:P.line,r:12});
 const lines=[[170,0],[120,1],[180,0],[140,1],[110,0]];
 lines.forEach(([w,cut],k)=>{const yy=fy+20+k*22;R(g,x+28,yy,w,12,{fill:cut?'#EBC3BC':'#E4DDD1',r:6});if(cut)R(g,x+22,yy+5,w+12,2.5,{fill:P.red,r:1});});
 BT(g,'Add to memory',x+(CW-142)/2,fy+BH-124-60,{size:15,fill:P.acc,c:'#FFFFFF',stroke:null,h:40});}
// 4: проверка
{const x=xs[3];
 BT(g,'See what Claude learned about you',x+12,BY+14,{size:12.5,fill:P.grn,c:'#FFFFFF',stroke:null,h:36,px:10});
 A(g,x+CW/2,BY+56,x+CW/2,BY+82,{c:P.grn,sw:2.4,head:8});
 const c=WIN(g,x+12,BY+90,CW-24,BH-102,'Чат');
 [['Работа и роль',[140,100]],['Проекты',[150,90]],['Люди',[120]],['Стиль общения',[130]]].forEach(([h,ls],k,arr)=>{});
 let yy=c+10;[['Работа и роль',[150]],['Проекты',[160,110]],['Люди',[130]],['Стиль общения',[140]]].forEach(([h,ls])=>{T(g,h,x+28,yy,{size:13.5,w:'b',c:P.grn});yy+=22;ls.forEach(w=>{R(g,x+28,yy,w,10,{fill:'#E4DDD1',r:5});yy+=18;});yy+=8;});}
// подпись под стрелками
const cy2=BY+BH+16;
R(g,56,cy2,1088,40,{fill:P.soft,r:10});ICON(g,'warn',72,cy2+9,22,P.amb,2.2);
T(g,'Личные детали могут не сохраниться — память ориентирована на работу',106,cy2+10,{size:15,w:'m',c:P.ink});
// стрелка обратно: экспорт
const ey=cy2+56;
A(g,xs[3]+CW/2,ey+44,xs[0]+CW/2,ey+44,{c:P.blu,sw:2.5,head:12,dash:true});
const et=T(g,'Экспорт своей памяти: «Manage» рядом с Your memory или просьба в чате выписать память дословно',0,ey+4,{size:15,w:'s',c:P.blu});et.x=56+(1088-et.width)/2;
const er=R(g,et.x-14,ey,et.width+28,28,{fill:P.bluT,r:14});g.insertChild(g.children.indexOf(et),er);
E(g,xs[3]+CW/2-6,ey+38,12,P.blu);
NOTE(g,'Порядок — по справке Anthropic на 7 ноября 2026 года. Окна условные.');
await f.screenshot({scale:1.5});await g.screenshot({scale:1.5});
return {f:f.id,g:g.id};
