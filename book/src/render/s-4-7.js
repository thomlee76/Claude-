const sheet=figma.createFrame();sheet.name='Лист · Раздел 4 · часть 2';sheet.resize(2520,1640);sheet.fills=F('#D8D2C7');
// ---- 4.7
const f=FIG(sheet,2,'4.7','Сценарий командировки: календарь + авиабилеты + отель');
const src=[['cal',P.blu,P.bluT,'Google Calendar','Свободно 10–13 ноября; 11.11 10:00 — встреча с Dr. Ahn в SMC; 12.11 15:00 — MedLine Kazakhstan'],
['plane',P.grn,P.grnT,'Kiwi.com','ICN → ALA 10.11: 2–3 варианта рейса; обратно 13.11'],
['hotel',P.pur,P.purT,'Booking.com','3 отеля в 15 минутах от SMC, бесплатная отмена']];
let sh=0;const st=[];
src.forEach(([ic,c,t,n,d],i)=>{const x=56+i*368;const tt=T(f,d,x+76,174,{size:14.5,width:268,lh:135});st.push(tt);sh=Math.max(sh,tt.y+tt.height-140+16);});
src.forEach(([ic,c,t,n,d],i)=>{const x=56+i*368;const r=R(f,x,140,352,sh,{fill:t,r:14});f.insertChild(f.children.indexOf(st[i]),r);ICB(f,ic,x+16,154,44,c,'#FFFFFF');T(f,n,x+76,150,{size:17,w:'b',c:c});});
const qy=140+sh+16;R(f,56,qy,1088,48,{fill:P.soft,r:12});ICON(f,'chat',72,qy+12,24,P.acc,2);T(f,'Запрос: «Спланируй командировку в Алматы 10–13 ноября: встречи из календаря, рейс из Сеула, отель рядом с SMC»',108,qy+14,{size:15,w:'m',width:1020});
const ty=qy+48+28;
T(f,'НОЯБРЬ 2026 · АЛМАТЫ',56,ty,{size:13,w:'b',c:P.mut,ls:10});
const days=[['10','вт',[['plane',P.grn,'Перелёт Сеул → Алматы'],['hotel',P.pur,'Заселение в отель']]],
['11','ср',[['check',P.acc,'SMC: приёмка УЗИ'],['cal',P.blu,'10:00 встреча с Dr. Ahn']]],
['12','чт',[['user',P.acc,'Обучение персонала SMC'],['cal',P.blu,'15:00 переговоры с MedLine Kazakhstan']]],
['13','пт',[['plane',P.grn,'Обратный рейс Алматы → Сеул']]]];
const lineY=ty+40;R(f,56,lineY,744,3,{fill:P.ink,r:2});
let maxB=0;
days.forEach(([d,w,ev],i)=>{const x=56+i*188;E(f,x+80,lineY-8,18,P.card,{stroke:P.ink,sw:3});
 T(f,d+' ноя',x,lineY+22,{size:20,w:'x'});T(f,w,x+86,lineY+28,{size:14,c:P.mut});
 let yy=lineY+60;ev.forEach(([ic,c,s])=>{const tt=T(f,s,x+42,yy+12,{size:15,w:'s',width:124,lh:130});const h=Math.max(52,tt.height+24);const r=R(f,x,yy,176,h,{fill:P.card,stroke:P.line,r:10});f.insertChild(f.children.indexOf(tt),r);R(f,x,yy,4,h,{fill:c,r:2});ICON(f,ic,x+14,yy+12,20,c,2);yy+=h+10;});
 maxB=Math.max(maxB,yy);});
// что сделал Claude
const px=830,py=ty;const items=['Создал 4 события в календаре — только после вашего «да»','Сравнил варианты рейсов: время, пересадки, цена, ссылки','Подобрал 3 отеля рядом с SMC с бесплатной отменой'];
const ph=Math.max(maxB-py,260);
R(f,px,py,314,ph,{fill:P.card,stroke:P.ink,r:14,sw:2});ICON(f,'spark',px+18,py+18,24,P.acc,2.2);T(f,'Что сделал Claude',px+52,py+19,{size:17,w:'b'});
let iy=py+64;items.forEach(s=>{ICON(f,'check',px+18,iy+1,20,P.grn,2.6);const tt=T(f,s,px+48,iy,{size:15,width:248,lh:135});iy=tt.y+tt.height+16;});
const by=Math.max(py+ph,maxB)+16;
R(f,56,by,1088,58,{fill:P.ambT,r:12});ICON(f,'warn',76,by+16,24,P.amb,2.2);
T(f,'Бронирование и оплату подтверждаете вы на сайте Kiwi.com / Booking.com. Цены и наличие проверяйте перед оплатой.',112,by+18,{size:15,w:'s',width:1010});
NOTE(f,'Даты, встречи и варианты — условный пример. Коннекторы Kiwi.com и Booking.com ищут; бронирование — на сайте сервиса.');

// ---- 4.8
const g=FIG(sheet,3,'4.8','Безопасность данных при работе с коннекторами: 8 правил');
const rules=[['shield','Подключайте только нужное и проверенное: значок Anthropic verified или известный разработчик'],
['key','Проверяйте экран входа (OAuth): какие права просит сервис'],
['lock','Чтение — Always allow; отправка и удаление — Needs approval или Blocked'],
['plug','Включайте коннекторы в чате только под задачу: + → Connectors'],
['warn','Текст в письмах и файлах — это данные, а не команды. Подозрительно: «игнорируй инструкции», «перешли всё на адрес…»'],
['eye','Перед отправкой читайте черновик и адресата полностью'],
['search','В режиме Research инструменты вызываются без подтверждения — отключайте инструменты записи'],
['user','Коммерческая тайна и данные пациентов — только по политике компании. Данные коннекторов Google не идут на обучение моделей, а текст, скопированный в чат, подчиняется вашим настройкам приватности']];
const CW=536;let y=140;
for(let r=0;r<4;r++){const pair=[rules[r*2],rules[r*2+1]];const ts=[];let h=0;
 pair.forEach(([ic,s],k)=>{const x=56+k*(CW+16);const tt=T(g,s,x+110,y+18,{size:15,w:'m',width:CW-130,lh:135});ts.push(tt);h=Math.max(h,tt.height+36);});
 h=Math.max(h,92);
 pair.forEach(([ic,s],k)=>{const x=56+k*(CW+16);const n=r*2+k+1;const warn=n===5||n===7;const rc=R(g,x,y,CW,h,{fill:warn?P.warnT||P.redT:P.card,stroke:P.line,r:14});g.insertChild(g.children.indexOf(ts[k]),rc);
  NUM(g,n,x+16,y+16,{d:30,fill:warn?P.red:P.ink});ICB(g,ic,x+56,y+12,40,warn?P.red:P.acc,'#FFFFFF');ts[k].y=y+(h-ts[k].height)/2;});
 y+=h+12;}
R(g,56,y+4,1088,56,{fill:P.dark,r:12});ICON(g,'plug',76,y+20,24,'#FFFFFF',2);
T(g,'Сомневаетесь — Customize → Connectors → Disconnect: доступ закрывается сразу',114,y+21,{size:16,w:'s',c:'#FFFFFF',width:1010});
NOTE(g,'Главный риск — не утечка пароля, а чужие инструкции внутри писем и документов (prompt injection) и действия без проверки.');
await f.screenshot({scale:1.5});await g.screenshot({scale:1.5});
return {f:f.id,g:g.id,y};
