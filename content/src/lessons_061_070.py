# -*- coding: utf-8 -*-
from _helpers import E, D, N, BUILD, PICK
L = {}

L[61] = {
 "meaning": N("feel + прилагательное с неодушевлённым подлежащим = «производить впечатление на ощупь или в целом». Предмет сам «чувствуется» таким.",
              "사물이 주어일 때 feel은 '~한 느낌이 들다'입니다."),
 "examples":[
  E("This suit feels expensive.","Этот костюм на ощупь дорогой.","이 정장 원단이 좋아 보여요."),
  E("The fabric feels rough.","Ткань шершавая на ощупь.","원단이 좀 까슬까슬해요."),
  E("This room feels bigger than it is.","Эта комната кажется больше, чем есть.","이 방이 실제보다 넓어 보여요."),
  E("The whole meeting felt rushed.","Всё совещание ощущалось скомканным.","회의가 전체적으로 급하게 느껴졌어요."),
  E("It feels like Monday already.","Ощущение, что уже понедельник.","벌써 월요일 같은 기분이에요."),
  E("Does the handle feel loose to you?","Тебе не кажется, что ручка шатается?","손잡이가 헐거운 것 같지 않아요?"),
 ],
 "dialogue":[
  D("A","What do you think? Too formal?","Как думаешь? Слишком официально?","어때요? 너무 격식 있나요?"),
  D("B","Not at all. This suit feels expensive.","Совсем нет. Этот костюм на ощупь дорогой.","전혀요. 이 정장 원단이 좋아 보이는데요."),
  D("A","It's the same price as the grey one.","Он стоит столько же, сколько серый.","회색이랑 가격 같아요."),
  D("B","Then it's an easy decision.","Тогда выбор очевиден.","그럼 고민할 것 없네요.",True),
 ],
 "notes":[
  N("Два разных feel: I feel tired (я чувствую) и It feels soft (оно ощущается). Оба без предлога.",
    "사람이 주어면 '내가 느끼다', 사물이 주어면 '~하게 느껴지다'입니다."),
  N("It feels like… — «такое ощущение, что…». Дальше идёт целое предложение.",
    "It feels like 뒤에는 문장이 옵니다."),
  N("В обсуждении качества товара очень уместно: The finish feels solid — субъективно, но убедительно.",
    "제품 품질을 말할 때 설득력 있는 표현입니다."),
 ],
 "quiz":[
  BUILD("Тебе не кажется, что ручка шатается?","손잡이가 헐거운 것 같지 않아요?","Does the handle feel loose to you?",["feels","like"]),
  PICK("«Ткань шершавая на ощупь»","'원단이 까슬까슬해요'는?",
       "The fabric feels rough.","The fabric feels roughly.",
       "После feel идёт прилагательное, а не наречие.",
       "feel 뒤에는 부사가 아니라 형용사가 옵니다."),
 ],
}

L[62] = {
 "meaning": N("turn + возраст или состояние = «стать, исполниться». О переходе через рубеж: возраст, цвет, погода, ситуация.",
              "turn + 나이/상태는 '~가 되다'로, 어떤 선을 넘는 변화를 뜻합니다."),
 "examples":[
  E("I can't believe you've already turned 30.","Не верится, что тебе уже тридцать.","벌써 서른이라니 믿기지가 않네요."),
  E("The leaves turn red in October.","В октябре листья краснеют.","10월이면 단풍이 들어요."),
  E("The weather turned cold overnight.","Погода за ночь похолодала.","하룻밤 사이에 날씨가 추워졌어요."),
  E("My daughter turns five next month.","Дочке в следующем месяце исполняется пять.","딸이 다음 달에 다섯 살 돼요."),
  E("The negotiation turned tense.","Переговоры стали напряжёнными.","협상 분위기가 경직됐어요."),
  E("Things turned out fine in the end.","В итоге всё сложилось хорошо.","결국엔 잘 풀렸어요."),
 ],
 "dialogue":[
  D("A","Thirty candles. That's a lot of smoke.","Тридцать свечей. Много дыма.","초 서른 개면 연기 좀 나겠는데요."),
  D("B","I can't believe you've already turned 30.","Не верится, что тебе уже тридцать.","벌써 서른이라니 믿기지가 않네요."),
  D("A","Neither can I, honestly.","Честно, мне тоже.","솔직히 저도요."),
  D("B","It only gets better. Trust me.","Дальше только лучше. Поверь.","앞으로 더 좋아져요. 믿어요.",True),
 ],
 "notes":[
  N("turn 30 — без предлога и без years old. I turned 30 last week.",
    "나이 앞에 전치사를 쓰지 않습니다."),
  N("turn vs. get: turn cold — резко похолодало, get cold — постепенно. Turn о переломе.",
    "turn은 급격한 전환, get은 점진적 변화입니다."),
  N("turn out = «оказаться, сложиться». It turned out he was right. Отдельное важное значение.",
    "turn out은 '결국 ~로 밝혀지다'입니다."),
 ],
 "quiz":[
  BUILD("Дочке в следующем месяце исполняется пять.","딸이 다음 달에 다섯 살 돼요.","My daughter turns five next month.",["to","years old"]),
  PICK("«Погода за ночь похолодала»","'하룻밤 사이에 날씨가 추워졌어요'는?",
       "The weather turned cold overnight.","The weather turned to cold overnight.",
       "После turn прилагательное идёт без to.",
       "turn 뒤에는 to 없이 형용사가 옵니다."),
 ],
}

L[63] = {
 "meaning": N("move = «передвинуть, отодвинуть, переместить». О физическом перемещении предмета или о переезде.",
              "'옮기다, 이동하다'입니다. 물건을 옮기거나 이사하는 경우입니다."),
 "examples":[
  E("Is it OK if I move the fan away from me?","Ничего, если я отодвину вентилятор?","선풍기 좀 저쪽으로 돌려도 될까요?"),
  E("Could we move the meeting to Thursday?","Можем перенести встречу на четверг?","회의를 목요일로 옮길 수 있을까요?"),
  E("We're moving to a bigger office next year.","В следующем году переезжаем в офис побольше.","내년에 더 큰 사무실로 이전해요."),
  E("Don't move it, it's fragile.","Не двигай, оно хрупкое.","깨지기 쉬우니 옮기지 마세요."),
  E("Let's move on to the next item.","Перейдём к следующему пункту.","다음 안건으로 넘어가죠."),
  E("The shipment hasn't moved in three days.","Груз не двигается уже три дня.","화물이 사흘째 그대로예요."),
 ],
 "dialogue":[
  D("A","You look cold.","Ты мёрзнешь?","추워 보이시는데요."),
  D("B","Is it OK if I move the fan away from me?","Ничего, если я отодвину вентилятор?","선풍기 좀 저쪽으로 돌려도 될까요?"),
  D("A","Go ahead. Nobody's using it.","Конечно. Им никто не пользуется.","그러세요. 아무도 안 써요."),
  D("B","Thanks, it was blowing right at my neck.","Спасибо, дуло прямо в шею.","고마워요, 목에 바로 맞았거든요.",True),
 ],
 "notes":[
  N("move a meeting — перенести по времени. Синоним: push back (позже), move up (раньше).",
    "회의를 미루면 push back, 당기면 move up입니다."),
  N("Let's move on — «идём дальше». Ключевая фраза для ведущего совещания, чтобы прервать затянувшийся спор.",
    "회의 진행자가 논쟁을 끊을 때 쓰는 표현입니다."),
  N("Is it OK if I…? — мягкая просьба о разрешении. Рабочий минимум вежливости в открытом офисе.",
    "허락을 구하는 가장 무난한 표현입니다."),
 ],
 "quiz":[
  BUILD("Можем перенести встречу на четверг?","회의를 목요일로 옮길 수 있을까요?","Could we move the meeting to Thursday?",["on","at"]),
  PICK("Ведущий хочет закрыть затянувшийся пункт","회의에서 다음 안건으로 넘어갈 때",
       "Let's move on to the next item.","Let's move to the next item on.",
       "Фразовый глагол — move on, предлог сразу после глагола.",
       "move on이 하나의 구동사입니다."),
 ],
}

L[64] = {
 "meaning": N("run = «управлять, вести». О компании, магазине, проекте, программе. Одно из важнейших деловых значений.",
              "'운영하다, 경영하다'입니다. 회사, 가게, 프로젝트에 모두 씁니다."),
 "examples":[
  E("The gift shop is run by nuns.","Этим сувенирным магазином управляют монахини.","그 기념품 가게는 수녀님들이 운영해요."),
  E("She runs the Central Asia division.","Она руководит подразделением по Центральной Азии.","중앙아시아 사업부를 맡고 계세요."),
  E("Who's running this project?","Кто ведёт этот проект?","이 프로젝트 누가 담당해요?"),
  E("They run three factories in Vietnam.","У них три завода во Вьетнаме.","베트남에 공장이 세 곳 있어요."),
  E("Let me run the numbers again.","Давайте я пересчитаю.","숫자 다시 한번 돌려 볼게요."),
  E("I'll run it by my director first.","Сначала я согласую это с директором.","먼저 이사님께 확인해 보겠습니다."),
 ],
 "dialogue":[
  D("A","That little shop by the cathedral is lovely.","Тот магазинчик у собора очень милый.","성당 옆 작은 가게 참 좋더라고요."),
  D("B","The gift shop is run by nuns.","Им управляют монахини.","거긴 수녀님들이 운영해요."),
  D("A","That explains the atmosphere.","Тогда понятна атмосфера.","그래서 분위기가 그랬군요."),
  D("B","And the prices. Everything goes to charity.","И цены. Всё идёт на благотворительность.","가격도요. 수익은 전부 기부돼요.",True),
 ],
 "notes":[
  N("run a business / run a department / run a meeting. В речи звучит естественнее, чем manage.",
    "manage보다 구어에서 자연스럽습니다."),
  N("run something by somebody — «согласовать, показать на одобрение». Обязательная офисная фраза.",
    "run ~ by는 '~에게 확인받다'입니다. 사무실 필수 표현입니다."),
  N("run the numbers — «просчитать». Про расчёты, сметы, прогнозы.",
    "run the numbers는 '계산해 보다'입니다."),
 ],
 "quiz":[
  BUILD("Сначала я согласую это с директором.","먼저 이사님께 확인해 보겠습니다.","I'll run it by my director first.",["to","with"]),
  PICK("«Кто ведёт этот проект?»","'이 프로젝트 누가 담당해요?'는?",
       "Who's running this project?","Who's leading this project to?",
       "Здесь run без предлога. Второй вариант грамматически сломан.",
       "run 뒤에 전치사를 쓰지 않습니다."),
 ],
}

L[65] = {
 "meaning": N("try = «попробовать, испытать». О новом опыте, еде, методе, услуге. Не «стараться», а именно «попробовать на себе».",
              "'시도해 보다, 해 보다'입니다. 새로운 경험이나 방법을 시험하는 것입니다."),
 "examples":[
  E("I've never tried acupuncture before.","Я никогда не пробовал иглоукалывание.","침 맞아 본 적이 한 번도 없어요."),
  E("Have you tried the new place on the corner?","Ты пробовал новое место на углу?","모퉁이에 새로 생긴 데 가 봤어요?"),
  E("Try turning it off and on again.","Попробуй выключить и включить.","껐다가 다시 켜 보세요."),
  E("We tried a different supplier last quarter.","В прошлом квартале мы попробовали другого поставщика.","지난 분기에 다른 공급사를 써 봤어요."),
  E("It's worth a try.","Попробовать стоит.","한번 해 볼 만해요."),
  E("I tried to call you twice.","Я дважды пытался тебе дозвониться.","두 번이나 전화드렸는데요."),
 ],
 "dialogue":[
  D("A","My shoulder's been bad for months.","Плечо болит уже несколько месяцев.","어깨가 몇 달째 안 좋아요."),
  D("B","Have you tried acupuncture?","Иглоукалывание пробовал?","침 맞아 봤어요?"),
  D("A","I've never tried acupuncture before. Does it hurt?","Никогда не пробовал. Это больно?","한 번도 안 맞아 봤어요. 아파요?"),
  D("B","Less than you'd think.","Меньше, чем кажется.","생각보다 안 아파요.",True),
 ],
 "notes":[
  N("try + -ing — попробовать способ (Try turning it off). try + to — постараться сделать (I tried to call). Разница существенная.",
    "try + -ing는 방법 시도, try + to부정사는 노력입니다."),
  N("I tried to call you — дозвониться не вышло. I tried calling you — просто способ связи из нескольких.",
    "to는 실패를, -ing는 방법 선택을 암시합니다."),
  N("It's worth a try — мягкое предложение в переговорах, когда вы не уверены в результате.",
    "확신이 없을 때 제안하는 부드러운 표현입니다."),
 ],
 "quiz":[
  BUILD("Попробуй выключить и включить.","껐다가 다시 켜 보세요.","Try turning it off and on again.",["to turn","turn"]),
  PICK("Вы звонили, но не дозвонились","전화했지만 연결되지 않았습니다",
       "I tried to call you.","I tried calling you and succeeded.",
       "try to подчёркивает, что попытка не удалась.",
       "try to는 시도했으나 안 됐다는 뜻입니다."),
 ],
}

L[66] = {
 "meaning": N("can't stand = «не выносить, терпеть не могу». Сильная неприязнь. Почти всегда в отрицании.",
              "can't stand는 '못 견디다, 질색이다'입니다. 거의 항상 부정형으로 씁니다."),
 "examples":[
  E("It's so hot I can't stand it.","Так жарко, что я не выдерживаю.","너무 더워서 못 참겠어요."),
  E("I can't stand long meetings.","Терпеть не могу долгие совещания.","긴 회의는 정말 질색이에요."),
  E("She can't stand being late.","Она терпеть не может опаздывать.","그분은 늦는 걸 못 견뎌요."),
  E("How do you stand the noise?","Как ты выносишь этот шум?","이 소음을 어떻게 견뎌요?"),
  E("I can't stand the smell of durian.","Не выношу запах дуриана.","두리안 냄새는 못 참겠어요."),
  E("He stood there without saying a word.","Он стоял там, не сказав ни слова.","아무 말 없이 그냥 서 있더라고요."),
 ],
 "dialogue":[
  D("A","Should we sit outside?","Может, сядем снаружи?","밖에 앉을까요?"),
  D("B","It's so hot I can't stand it.","Так жарко, что я не выдерживаю.","너무 더워서 못 참겠어요."),
  D("A","Inside it is, then.","Тогда внутри.","그럼 안으로 들어가죠."),
  D("B","Somewhere with strong air conditioning.","Где-нибудь, где хорошо работает кондиционер.","에어컨 잘 나오는 데로요.",True),
 ],
 "notes":[
  N("can't stand + существительное или -ing: can't stand long meetings / can't stand waiting. Не can't stand to wait.",
    "can't stand 뒤에는 명사나 -ing가 옵니다."),
  N("Сильнее, чем don't like. В деловой обстановке о людях лучше не употреблять.",
    "don't like보다 훨씬 강합니다. 사람에 대해 쓰면 무례합니다."),
  N("Основное значение stand — «стоять». Значение «терпеть» живёт почти только в отрицании и вопросе.",
    "'참다'의 뜻은 부정문과 의문문에서만 씁니다."),
 ],
 "quiz":[
  BUILD("Терпеть не могу долгие совещания.","긴 회의는 정말 질색이에요.","I can't stand long meetings.",["to stand","standing"]),
  PICK("«Она терпеть не может опаздывать»","'늦는 걸 못 견뎌요'는?",
       "She can't stand being late.","She can't stand to be late.",
       "После can't stand используется -ing.","can't stand 뒤에는 -ing를 씁니다."),
 ],
}

L[67] = {
 "meaning": N("break = «ломаться, сломать». Может быть без виноватого: подлежащее — сама вещь, и она просто сломалась.",
              "'고장 나다, 부서지다'입니다. 사물이 주어가 되면 책임 소재를 밝히지 않습니다."),
 "examples":[
  E("The handle on my favorite cup broke.","У моей любимой чашки отломилась ручка.","제일 아끼는 컵 손잡이가 깨졌어요."),
  E("The printer broke again.","Принтер снова сломался.","프린터가 또 고장 났어요."),
  E("I broke my phone screen last week.","На прошлой неделе я разбил экран телефона.","지난주에 휴대폰 액정 깨뜨렸어요."),
  E("Let's take a short break.","Давайте сделаем короткий перерыв.","잠깐 쉬었다 하죠."),
  E("They broke the contract terms.","Они нарушили условия договора.","계약 조건을 위반했어요."),
  E("The news broke this morning.","Новость появилась сегодня утром.","오늘 아침에 소식이 터졌어요."),
 ],
 "dialogue":[
  D("A","What happened here?","Что тут случилось?","여기 무슨 일이에요?"),
  D("B","The handle on my favorite cup broke.","У моей любимой чашки отломилась ручка.","제일 아끼는 컵 손잡이가 깨졌어요."),
  D("A","Can it be glued?","Приклеить можно?","붙일 수 있을까요?"),
  D("B","Maybe. I'll try tonight.","Может быть. Попробую вечером.","아마도요. 저녁에 해 볼게요.",True),
 ],
 "notes":[
  N("The cup broke — само сломалось, никто не виноват. I broke the cup — виноват я. Английский чётко различает.",
    "사물이 주어면 책임을 묻지 않고, 사람이 주어면 책임이 있습니다."),
  N("В претензии партнёру безопаснее: The handle broke during transport — чем You broke the handle.",
    "클레임에서는 사물을 주어로 쓰는 편이 안전합니다."),
  N("take a break — перерыв. break a contract — нарушить. Одно слово, разные миры.",
    "take a break과 break a contract는 전혀 다른 뜻입니다."),
 ],
 "quiz":[
  BUILD("Принтер снова сломался.","프린터가 또 고장 났어요.","The printer broke again.",["was broken","broke down by"]),
  PICK("В претензии поставщику, не обвиняя напрямую","공급사에 클레임을 넣을 때, 직접 탓하지 않고",
       "The handle broke during transport.","You broke the handle during transport.",
       "Первый вариант констатирует факт и оставляет место для диалога.",
       "사물을 주어로 쓰면 대화의 여지가 남습니다."),
 ],
}

L[68] = {
 "meaning": N("hurt = «болеть» о части тела, «причинять боль» о действии. Подлежащее — то, что болит.",
              "'아프다, 아프게 하다'입니다. 아픈 부위가 주어가 됩니다."),
 "examples":[
  E("My tooth hurts when I drink cold water.","У меня болит зуб, когда я пью холодное.","찬물 마시면 이가 시려요."),
  E("Does it hurt when I press here?","Больно, когда я нажимаю здесь?","여기 누르면 아프세요?"),
  E("My back hurts after long flights.","После долгих перелётов у меня болит спина.","장거리 비행 후엔 허리가 아파요."),
  E("I hurt my knee playing football.","Я повредил колено, играя в футбол.","축구하다가 무릎을 다쳤어요."),
  E("It wouldn't hurt to ask.","Спросить не помешает.","물어봐서 나쁠 건 없죠."),
  E("The delay really hurt our reputation.","Задержка серьёзно ударила по нашей репутации.","지연 때문에 평판에 타격이 컸어요."),
 ],
 "dialogue":[
  D("A","Why are you drinking it lukewarm?","Почему ты пьёшь тёплым?","왜 미지근하게 드세요?"),
  D("B","My tooth hurts when I drink cold water.","У меня болит зуб от холодного.","찬물 마시면 이가 시려서요."),
  D("A","You should get that checked.","Тебе стоит это проверить.","한번 진료받아 보세요."),
  D("B","I've got an appointment Thursday.","В четверг записан.","목요일에 예약했어요.",True),
 ],
 "notes":[
  N("My tooth hurts — часть тела подлежащее. Не I have a pain in my tooth, хотя это тоже верно, но звучит по-медицински.",
    "아픈 부위를 주어로 삼는 것이 자연스럽습니다."),
  N("hurt — неправильный глагол без изменений: hurt / hurt / hurt.",
    "hurt는 형태가 변하지 않는 불규칙 동사입니다."),
  N("It wouldn't hurt to… — «не помешало бы». Мягкий совет, не давит.",
    "It wouldn't hurt to…는 부드러운 제안입니다."),
 ],
 "quiz":[
  BUILD("Больно, когда я нажимаю здесь?","여기 누르면 아프세요?","Does it hurt when I press here?",["is hurting","are pressing"]),
  PICK("«У меня болит спина»","'허리가 아파요'는?",
       "My back hurts.","My back is hurting me.",
       "Первый вариант — естественная норма. Второй звучит неуклюже.",
       "My back hurts가 자연스럽습니다."),
 ],
}

L[69] = {
 "meaning": N("notice = «заметить, обратить внимание». Непроизвольное наблюдение, а не целенаправленный поиск.",
              "'알아차리다, 눈치채다'입니다. 의도적으로 찾은 것이 아니라 저절로 눈에 들어온 것입니다."),
 "examples":[
  E("I noticed you never eat anything at lunch.","Я заметил, что ты никогда ничего не ешь в обед.","점심때 아무것도 안 드시는 것 같던데요."),
  E("Did you notice anything unusual in the report?","Ты заметил что-нибудь необычное в отчёте?","보고서에서 이상한 점 못 보셨어요?"),
  E("Nobody noticed the typo until it was printed.","Опечатку никто не заметил, пока не напечатали.","인쇄될 때까지 오타를 아무도 몰랐어요."),
  E("I couldn't help noticing your accent.","Не мог не заметить ваш акцент.","억양이 좀 남다르시네요."),
  E("Have you noticed how quiet he's been?","Ты заметил, какой он тихий в последнее время?","걔 요즘 조용한 거 알아채셨어요?"),
  E("It went unnoticed for months.","Это оставалось незамеченным месяцами.","몇 달 동안 아무도 몰랐어요."),
 ],
 "dialogue":[
  D("A","Not eating again?","Опять не ешь?","또 안 드세요?"),
  D("B","I had a late breakfast.","Я поздно завтракал.","아침을 늦게 먹어서요."),
  D("A","I noticed you never eat anything at lunch.","Я заметил, что ты никогда ничего не ешь в обед.","점심때 아무것도 안 드시는 것 같던데요."),
  D("B","Fair point. I'll get something.","Справедливо. Возьму что-нибудь.","맞는 말이에요. 뭐 좀 사 올게요.",True),
 ],
 "notes":[
  N("notice — заметил сам. realize — осознал. find out — узнал от кого-то. Три разных механизма.",
    "notice는 눈에 띈 것, realize는 깨달은 것, find out은 알게 된 것입니다."),
  N("I couldn't help noticing… — вежливое начало щекотливого замечания. Смягчает наблюдение о личном.",
    "민감한 지적을 부드럽게 시작하는 표현입니다."),
  N("notice в значении «замечать» не ставится в Continuous.",
    "'알아차리다'의 notice는 진행형으로 쓰지 않습니다."),
 ],
 "quiz":[
  BUILD("Опечатку никто не заметил.","오타를 아무도 몰랐어요.","Nobody noticed the typo.",["was noticing","knew"]),
  PICK("Мягко начать замечание о личном","개인적인 이야기를 조심스럽게 꺼낼 때",
       "I couldn't help noticing…","I was noticing that…",
       "Первый вариант — устойчивая деликатная формула.",
       "I couldn't help noticing이 정중한 관용 표현입니다."),
 ],
}

L[70] = {
 "meaning": N("expect = «ожидать, рассчитывать». Не «ждать на месте» (это wait), а предполагать, что нечто произойдёт.",
              "'기대하다, 예상하다'입니다. 기다리며 서 있는 wait와 다릅니다."),
 "examples":[
  E("I expect an answer by tomorrow.","Жду ответ к завтрашнему дню.","내일까지는 답변 주셨으면 합니다."),
  E("We're expecting the shipment on Friday.","Груз ожидаем в пятницу.","화물은 금요일에 도착 예정입니다."),
  E("I didn't expect it to be this complicated.","Я не ожидал, что это окажется настолько сложно.","이렇게 복잡할 줄은 몰랐어요."),
  E("What do you expect from this partnership?","Чего вы ждёте от этого партнёрства?","이번 협력에서 무엇을 기대하시나요?"),
  E("The results were better than expected.","Результаты оказались лучше ожидаемых.","결과가 예상보다 좋았어요."),
  E("You can expect a reply within two days.","Ответ придёт в течение двух дней.","2일 이내에 회신드리겠습니다."),
 ],
 "dialogue":[
  D("A","When do you need the revised quote?","Когда вам нужно исправленное предложение?","수정 견적 언제까지 필요하세요?"),
  D("B","I expect an answer by tomorrow.","Ответ жду к завтрашнему дню.","내일까지는 답변 주셨으면 합니다."),
  D("A","That's tight, but we'll manage.","Впритык, но справимся.","빡빡하지만 맞춰 보겠습니다."),
  D("B","I appreciate it.","Спасибо.","감사합니다.",True),
 ],
 "notes":[
  N("expect — предполагать. wait — физически ждать. I'm waiting for the report (сижу и жду) / I expect the report by Friday (рассчитываю).",
    "expect는 예상, wait는 실제로 기다리는 것입니다."),
  N("I expect an answer by tomorrow звучит требовательно. Мягче: I'd appreciate an answer by tomorrow.",
    "부드럽게 하려면 I'd appreciate를 씁니다."),
  N("better than expected / worse than expected — готовые связки для отчётов.",
    "보고서에서 자주 쓰는 표현입니다."),
 ],
 "quiz":[
  BUILD("Груз ожидаем в пятницу.","화물은 금요일에 도착 예정입니다.","We're expecting the shipment on Friday.",["waiting","at"]),
  PICK("Вы сидите в приёмной и ждёте","대기실에 앉아 기다리는 중입니다",
       "I'm waiting for Mr. Kim.","I'm expecting for Mr. Kim.",
       "Физическое ожидание — wait for. У expect предлог for не нужен.",
       "실제로 기다릴 때는 wait for를 씁니다."),
 ],
}
