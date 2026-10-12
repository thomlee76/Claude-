/* Фразовые глаголы 100 — данные уроков.
   {verb|particle} — подсветка фразового глагола в английской строке.
   img: путь к картинке урока (из Figma) или null — тогда показывается описание сцены. */

window.MAP = [
 ["go",[[1,"go out"],[2,"go back"],[3,"go down"],[4,"go up"],[5,"go around"],[6,"go with"],[7,"go over"],[8,"go through"],[9,"go off"]]],
 ["come",[[10,"come in"],[11,"come down"],[12,"come back"],[13,"come off"],[14,"come out"],[15,"come over"],[16,"come to"],[17,"come up"],[18,"come up with"]]],
 ["look",[[19,"look around"],[20,"look for"],[21,"look after"],[22,"look forward to"],[23,"look back"],[24,"look down on"],[25,"look up"],[26,"look up to"]]],
 ["put",[[27,"put down"],[28,"put on"],[29,"put up"],[30,"put back"],[31,"put aside"],[32,"put together"],[33,"put off"],[34,"put out"]]],
 ["take",[[35,"take out"],[36,"take down"],[37,"take off"],[38,"take after"],[39,"take on"],[40,"take up"],[41,"take back"],[42,"take over"]]],
 ["get",[[43,"get in"],[44,"get out"],[45,"get on"],[46,"get off"],[47,"get up"],[48,"get away"],[49,"get over"]]],
 ["turn",[[50,"turn around"],[51,"turn up"],[52,"turn off"],[53,"turn over"],[54,"turn down"],[55,"turn to"],[56,"turn out"]]],
 ["stand",[[57,"stand by"],[58,"stand for"],[59,"stand out"],[60,"stand up"],[61,"stand up to"]]],
 ["run",[[62,"run away"],[63,"run into"],[64,"run over"],[65,"run out of"]]],
 ["pass",[[66,"pass by"],[67,"pass on"],[68,"pass out"],[69,"pass away"]]],
 ["fall",[[70,"fall down"],[71,"fall apart"],[72,"fall for"],[73,"fall behind"]]],
 ["give",[[74,"give away"],[75,"give back"],[76,"give up"]]],
 ["make",[[77,"make over"],[78,"make up"],[79,"make up for"]]],
 ["show",[[80,"show around"],[81,"show off"],[82,"show up"]]],
 ["break",[[83,"break down"],[84,"break out"],[85,"break up"]]],
 ["move",[[86,"move in"],[87,"move up"],[88,"move on"]]],
 ["pick",[[89,"pick on"],[90,"pick out"],[91,"pick up"]]],
 ["pull",[[92,"pull out"],[93,"pull over"],[94,"pull off"]]],
 ["stay",[[95,"stay away"],[96,"stay over"],[97,"stay up"]]],
 ["keep",[[98,"keep on"],[99,"keep out"],[100,"keep up with"]]]
];

window.LESSONS = {
1:{
 verb:"go", part:"out", ru:"выйти (из дома, офиса); сходить куда-нибудь",
 key:["I'm {going|out} now.","Я сейчас выхожу."],
 img:"img/day01.jpg", scene:"Минхо открывает дверь и выходит из дома солнечным утром.",
 kw:["go out","groceries","go out for dinner"],
 dialog:[
  ["Alex","Are you {going|out}?","Ты уходишь?"],
  ["Min","Yeah, I'm {going|out} now. I need to buy some groceries.","Да, сейчас выхожу. Надо купить продукты."],
  ["Alex","It's a bit cold. Take a jacket.","Прохладно. Возьми куртку."],
  ["Min","Good idea. Do you need anything?","Хорошая мысль. Тебе что-нибудь купить?"],
  ["Alex","Some milk, please. And are we {going|out} tonight?","Молока, пожалуйста. А мы вечером куда-нибудь идём?"],
  ["Min","Sure. Let's {go|out} for dinner.","Конечно. Давай сходим поужинать."]
 ],
 note:"У go out два значения: <b>выйти</b> из дома или офиса и <b>сходить куда-нибудь</b> развлечься: go out for dinner, go out for a drink. После going не нужен to: <i>I'm going out</i>, а не <i>going to out</i>.",
 talks:[
  ["Быт",[["Sara","Do you want to {go|out} this weekend?","Хочешь куда-нибудь сходить в выходные?"],["Min","Sure. Where?","Давай. Куда?"],["Sara","There's a new café near the station.","Возле станции открылось новое кафе."],["Min","Sounds good. Saturday afternoon?","Звучит отлично. В субботу днём?"]]],
  ["Поездка",[["Front desk","Are you {going|out}, sir?","Вы уходите?"],["Min","Yes, I'm {going|out} for a walk. Can I leave my key here?","Да, иду прогуляться. Можно оставить ключ здесь?"],["Front desk","Of course. Have a nice evening.","Конечно. Хорошего вечера."]]],
  ["Работа",[["Client","Is Mr. Kim in the office?","Господин Ким в офисе?"],["Min","Sorry, he just {went|out}. He'll be back after lunch.","Извините, он только что вышел. Вернётся после обеда."],["Client","Okay, I'll call him later.","Хорошо, перезвоню позже."]]]
 ],
 quiz:[
  ["Перевод","«Я сейчас выхожу.»",["I'm going out now.","I'm going to out now.","I'm going back now.","I'm going off now."],"go out = выйти. Между going и out ничего не нужно."],
  ["Пропуск","He just went ___. He'll be back after lunch.",["out","up","down","over"],"went out = вышел (из офиса)."],
  ["Значение","Let's go out for dinner.",["Давай сходим поужинать.","Давай вернёмся к ужину.","Давай пропустим ужин.","Давай приготовим ужин."],"go out for + еда/напиток = сходить куда-то поесть или выпить."],
  ["Ошибка","Какое предложение правильное?",["Are you going out tonight?","Are you going to out tonight?","Do you going out tonight?","Are you go out tonight?"],"Present Continuous: are you + going + out."],
  ["Ситуация","В отеле вы говорите, что идёте прогуляться.",["I'm going out for a walk.","I'm going out a walk.","I'm going for out a walk.","I'm going walk out."],"go out for a walk = выйти прогуляться."]
 ]
},
2:{
 verb:"go", part:"back", ru:"вернуться (туда, где уже был); вернуться к теме",
 key:["I have to {go|back} home.","Мне нужно вернуться домой."],
 img:"img/day02.jpg", scene:"Поздний вечер. Минхо смотрит на часы и идёт обратно домой.",
 kw:["go back home","early meeting","take a taxi"],
 dialog:[
  ["Min","It's already eleven. I have to {go|back} home.","Уже одиннадцать. Мне пора домой."],
  ["Sara","Already? The party just started!","Уже? Вечеринка только началась!"],
  ["Min","I know, but I have an early meeting tomorrow.","Знаю, но у меня завтра ранняя встреча."],
  ["Sara","Are you {going|back} by subway?","Обратно поедешь на метро?"],
  ["Min","No, I'll take a taxi. It's faster.","Нет, возьму такси. Так быстрее."],
  ["Sara","Okay. Text me when you get home.","Ладно. Напиши, когда доберёшься."]
 ],
 note:"<b>go back home</b> — без to. Но с местом нужен to: <i>go back to the office</i>. В переговорах очень полезно <b>go back to + тема</b>: <i>Can we go back to the price?</i> — вернёмся к цене?",
 talks:[
  ["Быт",[["Min","Oh no, I left my phone at the café!","Ой, я оставил телефон в кафе!"],["Sara","Let's {go|back} and get it.","Давай вернёмся и заберём."],["Min","Thanks. It's only five minutes away.","Спасибо. Это всего пять минут отсюда."]]],
  ["Поездка",[["Alex","How was Bangkok?","Как Бангкок?"],["Min","Amazing. I want to {go|back} next year.","Потрясающе. Хочу снова поехать в следующем году."],["Alex","Me too. The food was great.","Я тоже. Еда была отличная."]]],
  ["Работа",[["Partner","Can we {go|back} to the price issue?","Можем вернуться к вопросу цены?"],["Min","Sure. What's your proposal?","Конечно. Какое у вас предложение?"],["Partner","We need a five percent discount.","Нам нужна скидка пять процентов."],["Min","Let me check with our head office.","Позвольте уточнить у головного офиса."]]]
 ],
 quiz:[
  ["Перевод","«Мне нужно вернуться домой.»",["I have to go back home.","I have to go back to home.","I have to go home back.","I have to come back to home."],"go back home — без to перед home."],
  ["Ошибка","Какое предложение правильное?",["Let's go back home.","Let's go back to home.","Let's go to back home.","Let's back go home."],"home здесь наречие, предлог to не нужен."],
  ["Пропуск","Can we go back ___ the price issue?",["to","at","on","for"],"go back to + тема = вернуться к вопросу."],
  ["Значение","I want to go back next year.",["Хочу снова поехать туда в следующем году.","Хочу уехать в следующем году.","Хочу отложить это на следующий год.","Хочу вернуть это в следующем году."],"go back = вернуться туда, где уже был."],
  ["Повтор · DAY 01","«Он только что вышел.»",["He just went out.","He just went back.","He just went off.","He just went down."],"went out = вышел."]
 ]
},
3:{
 verb:"go", part:"down", ru:"снижаться, падать (температура, цены, продажи)",
 key:["The temperature {went|down} a lot.","Температура сильно упала."],
 img:"img/day03.jpg", scene:"Зима. Минхо в пальто и шарфе стоит у уличного термометра, столбик упал.",
 kw:["go down","freezing","temperature"],
 dialog:[
  ["Min","Brr! It's freezing this morning.","Брр! Сегодня утром ужасно холодно."],
  ["Alex","Yeah, the temperature {went|down} a lot last night.","Да, ночью температура сильно упала."],
  ["Min","How cold is it now?","А сейчас сколько?"],
  ["Alex","Minus twelve. And it'll {go|down} even more this weekend.","Минус двенадцать. А в выходные станет ещё холоднее."],
  ["Min","Then I'll wear my thick coat.","Тогда надену тёплое пальто."],
  ["Alex","And don't forget your scarf.","И шарф не забудь."]
 ],
 note:"<b>go down</b> = снижаться: температура, цены, продажи, курс. Прошедшее время — <b>went down</b>. Противоположность — <b>go up</b> (DAY 04).",
 talks:[
  ["Быт",[["Sara","Apartment prices {went|down} this year.","Цены на квартиры в этом году снизились."],["Min","Really? Maybe it's time to buy.","Правда? Может, пора покупать."],["Sara","I'd wait a little longer.","Я бы ещё немного подождала."]]],
  ["Поездка",[["Min","Why is this flight so cheap?","Почему этот рейс такой дешёвый?"],["Alex","Prices {go|down} in the off-season.","В низкий сезон цены снижаются."],["Min","Great. Let's book it now.","Отлично. Давай бронировать сейчас."]]],
  ["Работа",[["Manager","Our sales {went|down} this quarter.","В этом квартале продажи упали."],["Min","A big tender was postponed.","Перенесли крупный тендер."],["Manager","I see. We need a new plan.","Понятно. Нужен новый план."]]]
 ],
 quiz:[
  ["Перевод","«Температура сильно упала.»",["The temperature went down a lot.","The temperature went out a lot.","The temperature went back a lot.","The temperature goed down a lot."],"go → went. Формы goed не существует."],
  ["Пропуск","Our sales went ___ this quarter. (упали)",["down","out","back","over"],"sales went down = продажи упали."],
  ["Значение","Что противоположно go down?",["go up","go out","go back","go over"],"go up = расти. Это следующий урок."],
  ["Значение","Prices go down in the off-season.",["В низкий сезон цены снижаются.","В низкий сезон цены растут.","В низкий сезон цены не меняются.","В низкий сезон билетов нет."],"go down = снижаться."],
  ["Повтор · DAY 02","«Давай вернёмся к вопросу цены.»",["Let's go back to the price issue.","Let's go back the price issue.","Let's go to back the price issue.","Let's come back on the price issue."],"go back to + тема."]
 ]
},
4:{
 verb:"go", part:"up", ru:"расти, повышаться (цены, температура, продажи)",
 key:["Gas prices {went|up} again.","Бензин снова подорожал."],
 img:"img/day04.jpg", scene:"Минхо на заправке с пистолетом в руке удивлённо смотрит на табло цен.",
 kw:["go up","gas prices","per liter"],
 dialog:[
  ["Min","Wow, gas prices {went|up} again.","Ого, бензин опять подорожал."],
  ["Sara","Really? How much is it now?","Правда? Сколько сейчас?"],
  ["Min","Almost 1,800 won per liter.","Почти 1 800 вон за литр."],
  ["Sara","Everything is {going|up} these days.","В последнее время всё дорожает."],
  ["Min","Maybe I should get an electric car.","Может, взять электромобиль."],
  ["Sara","Good luck. Car prices {went|up} too!","Удачи. Машины тоже подорожали!"]
 ],
 note:"На сколько выросло — <b>by</b>: <i>Prices went up by 5%</i> (на 5%). Не <i>for 5%</i>. О повышении по службе говорят <b>move up</b> (DAY 87).",
 talks:[
  ["Быт",[["Alex","My rent is {going|up} next month.","Со следующего месяца аренда растёт."],["Min","By how much?","На сколько?"],["Alex","A hundred thousand won.","На сто тысяч вон."],["Min","Ouch.","Ой."]]],
  ["Поездка",[["Sara","Hotel prices {go|up} during the holidays.","В праздники отели дорожают."],["Min","Then let's book early.","Тогда забронируем заранее."],["Sara","Okay, I'll do it tonight.","Хорошо, сделаю сегодня вечером."]]],
  ["Работа",[["Supplier","Our prices will {go|up} in January.","В январе наши цены вырастут."],["Min","By how much?","На сколько?"],["Supplier","About three percent.","Примерно на три процента."],["Min","Then we'll place the order before January.","Тогда разместим заказ до января."]]]
 ],
 quiz:[
  ["Перевод","«Бензин снова подорожал.»",["Gas prices went up again.","Gas prices went over again.","Gas prices came over again.","Gas prices went out again."],"go up = расти (о ценах)."],
  ["Предлог","«Продажи выросли на 10%.»",["Sales went up by 10%.","Sales went up for 10%.","Sales went up on 10%.","Sales went 10% up by."],"На сколько — by."],
  ["Пропуск","My rent is going ___ next month.",["up","out","back","over"],"rent is going up = аренда растёт."],
  ["Ситуация","Поставщик сообщает о подорожании с января.",["Prices will go up in January.","Prices will go down in January.","Prices will go out in January.","Prices will go back in January."],"will go up = вырастут."],
  ["Повтор · DAY 03","«В низкий сезон цены снижаются.»",["Prices go down in the off-season.","Prices go back in the off-season.","Prices go out in the off-season.","Prices go up in the off-season."],"go down = снижаться."]
 ]
},
5:{
 verb:"go", part:"around", ru:"распространяться (слух, новость, простуда); объехать",
 key:["There's a rumor {going|around}.","Ходит слух."],
 img:"img/day05.jpg", scene:"Офисная кухня: коллеги шепчутся, Минхо с кофе прислушивается.",
 kw:["go around","rumor","people say"],
 dialog:[
  ["Alex","Did you hear? There's a rumor {going|around}.","Слышал? Ходит слух."],
  ["Min","What rumor?","Какой слух?"],
  ["Alex","People say our team is moving to a new office.","Говорят, наша команда переезжает в новый офис."],
  ["Min","Really? Who told you that?","Правда? Кто тебе сказал?"],
  ["Alex","It's {going|around} the whole office.","Об этом говорит весь офис."],
  ["Min","Let's wait until the manager says something.","Давай подождём, пока руководитель что-то скажет."]
 ],
 note:"<b>go around</b> = расходиться, распространяться: <i>a rumor / the news / a cold is going around</i>. В прямом смысле — обойти или объехать: <i>go around the traffic</i>.",
 talks:[
  ["Быт",[["Sara","You don't look well.","Ты неважно выглядишь."],["Min","I think I caught a cold.","Кажется, я простыл."],["Sara","There's a bad cold {going|around}. Get some rest.","Сейчас ходит сильная простуда. Отдохни."]]],
  ["Поездка",[["Min","The traffic is terrible.","Пробка ужасная."],["Driver","Don't worry. I'll {go|around} it.","Не волнуйтесь. Я её объеду."],["Min","Thanks. My flight is at six.","Спасибо. У меня рейс в шесть."]]],
  ["Работа",[["Min","A rumor is {going|around} that the tender is canceled.","Ходит слух, что тендер отменили."],["Manager","Is it official?","Это официально?"],["Min","Not yet. I'll check with our distributor today.","Пока нет. Сегодня уточню у дистрибьютора."]]]
 ],
 quiz:[
  ["Перевод","«Ходит слух.»",["There's a rumor going around.","There's a rumor going over.","There's a rumor going back.","There's a rumor go around."],"rumor + going around."],
  ["Пропуск","There's a bad cold going ___. Get some rest.",["around","out","up","down"],"a cold is going around = ходит простуда."],
  ["Значение","I'll go around the traffic.",["Я объеду пробку.","Я постою в пробке.","Я вернусь из-за пробки.","Я выйду из машины."],"Прямое значение: обойти, объехать."],
  ["Ошибка","Какое предложение правильное?",["A rumor is going around.","A rumor is go around.","A rumor is going to around.","A rumor going around is."],"is + going + around."],
  ["Повтор · DAY 04","«Со следующего месяца аренда растёт.»",["My rent is going up next month.","My rent is going down next month.","My rent is going around next month.","My rent is going back next month."],"go up = расти."]
 ]
}
};
