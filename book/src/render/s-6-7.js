// Prepend /home/user/Claude-/book/src/figma-lib.js. fileKey f10Izw83ps7hP4Mm11Nr9V.
// Replace SHEET_ID with the sheet id returned by call 1. Draws figures 6.7, 6.8 (cells 2, 3). NOT YET RUN — check screenshots.
const sheet=(()=>{const s=figma.createFrame();s.resize(2520,1640);return s;})();

// ===== 6.7
const f=FIG(sheet,2,'6.7','Мультиагентный процесс: подготовка тендерного пакета');
const ST=[[56,200,'Разбор ТЗ',P.blu],[290,330,'Параллельные исполнители',P.acc],[654,220,'Агент-проверяющий',P.pur],[908,236,'Человек',P.grn]];
ST.forEach(([x,w,n,c],i)=>{NUM(f,i+1,x,140,{d:28,size:14,fill:c});T(f,n,x+38,144,{size:17,w:'b',c});});
const Y1=184,Y2=578,MID=(Y1+Y2)/2;
// этап 1
R(f,56,Y1,200,Y2-Y1,{fill:P.bluT,r:16});ICB(f,'doc',76,Y1+20,44,'#FFFFFF',P.blu);
T(f,'ОДИН АГЕНТ',76,Y1+80,{size:13,w:'b',c:P.blu,ls:8});
T(f,'46',76,Y1+102,{size:44,w:'x',c:P.blu});T(f,'пунктов требований',76,Y1+158,{size:15,w:'s',width:164});
T(f,'Извлечь требования из техзадания: 46 пунктов, сроки, гарантия, обучение',76,Y1+196,{size:15,width:164,lh:135});
// этап 2
const lanes=[['sheet','Таблица соответствия ТЗ ↔ характеристики УЗИ SG'],['doc','Перечень документов: регистрационное удостоверение, сертификаты, доверенность'],['money','Расчёт цены и логистики до Алматы, $184 000'],['mail','Сопроводительное письмо RU/EN']];
const LH=(Y2-Y1-30)/4;const lc=[];
lanes.forEach(([ic,s],i)=>{const y=Y1+i*(LH+10);lc.push(y+LH/2);R(f,290,y,330,LH,{fill:P.card,stroke:P.acc,r:14,sw:1.5});ICB(f,ic,304,y+14,34,P.accT,P.acc);
 T(f,'ИСПОЛНИТЕЛЬ '+(i+1),350,y+12,{size:13,w:'b',c:P.acc,ls:8});T(f,s,350,y+32,{size:15,width:256,lh:128});
 A(f,260,MID,286,y+LH/2,{c:P.ink,sw:2,head:8});A(f,624,y+LH/2,650,MID,{c:P.ink,sw:2,head:8});});
// этап 3
R(f,654,Y1,220,Y2-Y1,{fill:P.purT,r:16});ICB(f,'search',674,Y1+20,44,'#FFFFFF',P.pur);
T(f,'Сверяет каждый пункт ТЗ, ищет пропуски и противоречия, помечает',674,Y1+84,{size:15,width:180,lh:135});
const pt=f.children[f.children.length-1];PILL(f,'«не подтверждено»',674,pt.y+pt.height+10,{fill:P.redT,c:P.red,size:14,h:28});
[['check','46 пунктов сверено',P.grn],['warn','3 пропуска',P.amb],['x','1 противоречие',P.red]].forEach(([ic,s,c],i)=>{const y=Y1+270+i*30;ICON(f,ic,674,y,18,c,2.4);T(f,s,700,y,{size:15,w:'m'});});
A(f,878,MID,904,MID,{c:P.ink,sw:2,head:8});
// этап 4
R(f,908,Y1,236,64,{fill:P.redT,r:14});ICON(f,'lock',922,Y1+18,26,P.red,2);T(f,'Подача на портал — только вручную',958,Y1+12,{size:14,w:'b',c:P.red,width:176,lh:125});
R(f,908,Y1+76,236,Y2-Y1-76,{fill:P.grnT,r:16});ICB(f,'user',928,Y1+96,44,'#FFFFFF',P.grn);
T(f,'Руководитель проверяет цену, юридические формулировки, подписывает и подаёт',928,Y1+156,{size:15,width:196,lh:135});
// возврат
const RY=Y2+30;
R(f,762.8,Y2+2,2.4,RY-Y2-1,{fill:P.acc,r:1});R(f,455,RY-1.2,310,2.4,{fill:P.acc,r:1});A(f,455,RY,455,Y2+6,{c:P.acc,sw:2.4,head:9});
PILL(f,'Доработать (не более 2–3 итераций)',480,RY+10,{fill:P.accT,c:P.acc,size:14,h:28});
NOTE(f,'Параллельно работают только исполнители, которым не нужен результат друг друга; финальная сверка и подпись — за человеком.');

// ===== 6.8
const g=FIG(sheet,3,'6.8','Карта: какой агентный инструмент когда использовать');
ICON(g,'down',56,140,22,P.acc,2.4);T(g,'Сложность и стоимость растут сверху вниз',86,141,{size:17,w:'b',c:P.acc});
const TX=100,cw=[250,300,290,204],hd=['Инструмент','Когда брать','Пример из работы','Кто настраивает'];
const xs=[TX];for(let i=1;i<4;i++)xs.push(xs[i-1]+cw[i-1]);
R(g,TX,180,1044,42,{fill:P.dark,r:10});hd.forEach((h,i)=>T(g,h.toUpperCase(),xs[i]+16,193,{size:13,w:'b',c:'#FFFFFF',ls:8}));
const rows=[['search','Research (claude.ai)','разовое глубокое исследование с источниками','«рынок УЗИ в Бразилии»',0],
['chat','Cowork / агентная работа в чате','многошаговая работа с файлами и коннекторами','«пакет документов для SMC»',0],
['globe','Claude in Chrome','сайты без API и коннектора, формы, порталы','«тендеры на госпорталах»',0],
['clock','Задачи по расписанию','повторяющаяся рутина','«утренний бриф, мониторинг тендеров»',0],
['code','Agent SDK / Managed Agents','агент для всего отдела, интеграция с CRM/1С','«агент по дебиторке»',1]];
const tints=['#F7E3D9','#F1CDBB','#E9B49B','#DB906F','#C96442'];
rows.forEach(([ic,n,w,ex,it],j)=>{const y=228+j*88;R(g,TX,y,1044,82,{fill:j%2?P.soft:P.card,stroke:P.line,r:10});
 R(g,56,y,30,82,{fill:tints[j],r:8});TC(g,String(j+1),56,y,30,82,{size:15,w:'b',c:j>2?'#FFFFFF':P.acc});
 ICB(g,ic,xs[0]+14,y+21,40,j===4?P.purT:P.accT,j===4?P.pur:P.acc);
 T(g,n,xs[0]+64,y+0,{size:17,w:'b',width:cw[0]-74,lh:122}).y=y+(82-g.children[g.children.length-1].height)/2;
 const a=T(g,w,xs[1]+16,y,{size:15,width:cw[1]-32,lh:130});a.y=y+(82-a.height)/2;
 const b=T(g,ex,xs[2]+16,y,{size:15,w:'m',c:P.ink,width:cw[2]-32,lh:130});b.y=y+(82-b.height)/2;
 PILL(g,it?'ИТ или подрядчик':'вы сами',xs[3]+16,y+26,{fill:it?P.purT:P.grnT,c:it?P.pur:P.grn,size:15,h:30});});
A(g,71,228+5*88+2,71,228+5*88+20,{c:P.acc,sw:2.4,head:8});
NOTE(g,'Начинайте с самого простого варианта, который решает задачу.');
await f.screenshot({scale:1.5});await g.screenshot({scale:1.5});
return {f:f.id,g:g.id};
