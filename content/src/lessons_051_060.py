# -*- coding: utf-8 -*-
from _helpers import E, D, N, BUILD, PICK
L = {}

L[51] = {
 "meaning": N("keep + -ing = «постоянно, всё время, снова и снова». Часто с оттенком раздражения: это повторяется, и надоело.",
              "keep + -ing는 '계속 ~하다'입니다. 짜증 섞인 반복의 뉘앙스가 있습니다."),
 "examples":[
  E("This website keeps giving me an error message.","Этот сайт постоянно выдаёт мне ошибку.","이 사이트 자꾸 오류가 떠요."),
  E("He keeps changing the deadline.","Он всё время двигает срок.","그 사람 자꾸 기한을 바꿔요."),
  E("I keep forgetting her name.","Я всё время забываю её имя.","자꾸 그분 이름을 까먹어요."),
  E("My laptop keeps freezing.","Ноутбук постоянно зависает.","노트북이 자꾸 멈춰요."),
  E("Keep going, you're almost there.","Продолжай, ты почти у цели.","계속하세요, 거의 다 왔어요."),
  E("They keep asking for the same documents.","Они снова и снова просят одни и те же документы.","같은 서류를 계속 요구해요."),
 ],
 "dialogue":[
  D("A","Did you submit the customs form?","Ты отправил таможенную форму?","통관 서류 제출했어요?"),
  D("B","I've tried four times. This website keeps giving me an error message.","Пробовал четыре раза. Сайт постоянно выдаёт ошибку.","네 번 시도했는데, 사이트에서 자꾸 오류가 떠요."),
  D("A","Try a different browser.","Попробуй другой браузер.","다른 브라우저로 해 보세요."),
  D("B","I'll give that a shot.","Попробую.","그렇게 해 볼게요.",True),
 ],
 "notes":[
  N("keep + -ing, без to: keeps giving, не keeps to give. Частая ошибка.",
    "keep 뒤에는 -ing가 옵니다. to를 쓰지 않습니다."),
  N("keep -ing ≠ continue -ing. keep подчёркивает раздражающую повторяемость, continue — просто продолжение.",
    "keep은 짜증스러운 반복, continue는 단순한 지속입니다."),
  N("Keep going / Keep it up — подбадривание. Без раздражения, наоборот.",
    "Keep going은 격려 표현입니다."),
 ],
 "quiz":[
  BUILD("Ноутбук постоянно зависает.","노트북이 자꾸 멈춰요.","My laptop keeps freezing.",["to freeze","freeze"]),
  PICK("«Он всё время двигает срок»","'자꾸 기한을 바꿔요'는?",
       "He keeps changing the deadline.","He keeps to change the deadline.",
       "После keep идёт форма на -ing.","keep 뒤에는 -ing를 씁니다."),
 ],
}

L[52] = {
 "meaning": N("keep + объект + прилагательное = «поддерживать в каком-то состоянии». Не разовое действие, а постоянное усилие.",
              "keep + 목적어 + 형용사는 '~를 ~한 상태로 유지하다'입니다."),
 "examples":[
  E("Wow, how do you keep your bathroom so clean?","Как ты держишь ванную в такой чистоте?","화장실을 어떻게 이렇게 깨끗하게 유지해요?"),
  E("Keep the door closed, please.","Пожалуйста, держите дверь закрытой.","문 닫아 두세요."),
  E("I'll keep you posted.","Буду держать вас в курсе.","진행 상황 계속 알려 드릴게요."),
  E("Keep it simple.","Не усложняй.","간단하게 갑시다."),
  E("We need to keep the customer informed.","Нам нужно держать клиента в курсе.","고객에게 계속 알려 드려야 합니다."),
  E("Try to keep the samples dry.","Постарайтесь, чтобы образцы оставались сухими.","샘플이 젖지 않게 해 주세요."),
 ],
 "dialogue":[
  D("A","Can I use your bathroom?","Можно воспользоваться ванной?","화장실 좀 써도 될까요?"),
  D("B","Of course, second door.","Конечно, вторая дверь.","그럼요, 두 번째 문이요."),
  D("A","Wow, how do you keep it so clean?","Как ты держишь её в такой чистоте?","와, 어떻게 이렇게 깨끗하게 유지해요?"),
  D("B","Five minutes every morning. That's the whole secret.","Пять минут каждое утро. Вот и весь секрет.","매일 아침 5분이요. 그게 다예요.",True),
 ],
 "notes":[
  N("I'll keep you posted — золотая фраза деловой переписки. Обещает информировать, не обязывая к срокам.",
    "업무 메일에서 아주 유용합니다. 기한을 약속하지 않고 소통을 약속합니다."),
  N("keep somebody informed / updated / posted — три синонима. posted самый разговорный, informed самый формальный.",
    "posted는 구어, informed는 격식체입니다."),
  N("Keep it simple — совет и просьба одновременно. В презентациях руководству особенно уместно.",
    "경영진 보고에서 특히 유용한 표현입니다."),
 ],
 "quiz":[
  BUILD("Буду держать вас в курсе.","진행 상황 계속 알려 드릴게요.","I'll keep you posted.",["to post","posting"]),
  PICK("«Нам нужно держать клиента в курсе»","'고객에게 계속 알려 드려야 합니다'는?",
       "We need to keep the customer informed.","We need to keep the customer inform.",
       "После объекта идёт причастие: informed.","목적어 뒤에는 과거분사가 옵니다."),
 ],
}

L[53] = {
 "meaning": N("leave = «уезжать, отбывать, уходить». О начале пути. Present Continuous здесь обозначает запланированное будущее.",
              "'떠나다, 출발하다'입니다. 현재진행형은 예정된 미래를 나타냅니다."),
 "examples":[
  E("I'm leaving on the first flight out tomorrow.","Я улетаю завтра первым рейсом.","내일 첫 비행기로 떠나요."),
  E("What time does your train leave?","Во сколько отходит твой поезд?","기차 몇 시에 출발해요?"),
  E("She left the company last year.","Она ушла из компании в прошлом году.","작년에 퇴사하셨어요."),
  E("I have to leave in ten minutes.","Мне надо выходить через десять минут.","10분 뒤에 나가야 해요."),
  E("We're leaving for Almaty on Sunday.","В воскресенье мы вылетаем в Алматы.","일요일에 알마티로 출발합니다."),
  E("He left without saying goodbye.","Он ушёл не попрощавшись.","인사도 없이 가 버렸어요."),
 ],
 "dialogue":[
  D("A","How long are you in town?","Ты надолго в городе?","여기 얼마나 계세요?"),
  D("B","Not long. I'm leaving on the first flight out tomorrow.","Ненадолго. Улетаю завтра первым рейсом.","얼마 안 돼요. 내일 첫 비행기로 떠나요."),
  D("A","Then let's have dinner tonight.","Тогда поужинаем сегодня.","그럼 오늘 저녁 같이 해요."),
  D("B","I was hoping you'd say that.","Я надеялся, что ты это скажешь.","그 말 기다렸어요.",True),
 ],
 "notes":[
  N("leave for + пункт назначения: I'm leaving for Almaty. Без for leave означает «покинуть это место».",
    "목적지 앞에는 for를 씁니다. for가 없으면 '이곳을 떠나다'입니다."),
  N("I'm leaving tomorrow — запланированное будущее. Will leave звучало бы как решение, принятое прямо сейчас.",
    "확정된 일정은 현재진행형으로 말합니다."),
  N("leave a company — уволиться. Мягче и нейтральнее, чем quit или resign.",
    "퇴사를 가장 무난하게 표현하는 단어입니다."),
 ],
 "quiz":[
  BUILD("В воскресенье мы вылетаем в Алматы.","일요일에 알마티로 출발합니다.","We're leaving for Almaty on Sunday.",["to","at"]),
  PICK("Билет куплен, вылет завтра. Как сказать?","표를 샀고 내일 출발합니다. 어떻게 말할까요?",
       "I'm leaving tomorrow.","I will leave tomorrow.",
       "План уже зафиксирован, поэтому Present Continuous.",
       "이미 정해진 일정은 현재진행형으로 말합니다."),
 ],
}

L[54] = {
 "meaning": N("leave somebody something = «оставить для кого-то». Вы уходите, а вещь остаётся тому, кто придёт позже.",
              "leave + 사람 + 사물은 '~에게 ~를 남겨 두다'입니다."),
 "examples":[
  E("I left you some pizza over there if you're hungry.","Я оставил тебе там пиццу, если проголодаешься.","배고프면 저기 피자 좀 남겨 놨어요."),
  E("She left a message for you.","Она оставила вам сообщение.","메시지 남기셨어요."),
  E("I'll leave the documents on your desk.","Оставлю документы у вас на столе.","서류는 책상에 올려 둘게요."),
  E("Somebody left their umbrella in the meeting room.","Кто-то оставил зонт в переговорной.","회의실에 우산 놓고 가신 분 있어요."),
  E("Leave it with me.","Оставь это мне.","저한테 맡기세요."),
  E("Can I leave my bag here for an hour?","Можно я оставлю сумку здесь на час?","가방 한 시간만 여기 둬도 될까요?"),
 ],
 "dialogue":[
  D("A","You're still up?","Ты ещё не спишь?","아직 안 주무세요?"),
  D("B","Just heading to bed. I left you some pizza over there if you're hungry.","Уже иду. Я оставил тебе пиццу, если проголодаешься.","지금 자러 가요. 배고프면 저기 피자 남겨 놨어요."),
  D("A","You're a good roommate.","Ты хороший сосед.","좋은 룸메이트네요."),
  D("B","Remember that next time it's your turn.","Вспомни об этом, когда будет твоя очередь.","다음에 당신 차례일 때 기억해 줘요.",True),
 ],
 "notes":[
  N("Leave it with me — «предоставьте это мне, я займусь». Очень уверенный деловой ответ.",
    "'제가 처리하겠습니다'라는 뜻의 자신감 있는 표현입니다."),
  N("leave a message — стандарт для голосовой почты и секретарей. Can I leave a message?",
    "부재 시 메시지를 남길 때 쓰는 표준 표현입니다."),
  N("Порядок как у get: leave + кому + что, без предлога. Или leave something for somebody.",
    "leave + 사람 + 사물 또는 leave + 사물 + for + 사람입니다."),
 ],
 "quiz":[
  BUILD("Оставлю документы у вас на столе.","서류는 책상에 올려 둘게요.","I'll leave the documents on your desk.",["at","to"]),
  PICK("Коллега просит помочь с задачей","동료가 일을 부탁할 때",
       "Leave it with me.","Leave it to me here.",
       "Устойчивая формула — Leave it with me.","Leave it with me로 굳어진 표현입니다."),
 ],
}

L[55] = {
 "meaning": N("leave + объект + прилагательное = «оставить в каком-то состоянии». Вы не меняете состояние, а не трогаете его.",
              "leave + 목적어 + 형용사는 '~를 ~한 상태로 두다'입니다. 건드리지 않는다는 뜻입니다."),
 "examples":[
  E("Do you want me to leave the door open?","Оставить дверь открытой?","문 열어 둘까요?"),
  E("Leave the light on, please.","Оставьте свет включённым, пожалуйста.","불 켜 두세요."),
  E("The delay left us with no options.","Задержка не оставила нам вариантов.","지연 때문에 선택지가 없어졌어요."),
  E("Don't leave the field blank.","Не оставляйте поле пустым.","빈칸으로 두지 마세요."),
  E("His answer left me confused.","Его ответ меня запутал.","그분 답변이 오히려 헷갈렸어요."),
  E("Let's leave it as it is for now.","Пока оставим как есть.","일단 그대로 두죠."),
 ],
 "dialogue":[
  D("A","I'll be back in ten minutes.","Я вернусь через десять минут.","10분 있다 올게요."),
  D("B","Do you want me to leave the door open?","Оставить дверь открытой?","문 열어 둘까요?"),
  D("A","Please. My hands will be full.","Да, пожалуйста. У меня будут заняты руки.","네, 짐이 많을 것 같아서요."),
  D("B","I'll prop it with a chair.","Подопру стулом.","의자로 받쳐 놓을게요.",True),
 ],
 "notes":[
  N("leave it open / leave it on / leave it blank — состояние не меняется. Противоположность: close it, turn it off, fill it in.",
    "상태를 바꾸지 않는다는 뜻입니다."),
  N("left us with no options — деловая формула: констатирует последствие, не обвиняя партнёра прямо.",
    "상대를 직접 탓하지 않고 결과만 말할 때 유용합니다."),
  N("Leave it as it is — «оставим как есть». Мягкий способ закрыть спор без победителя.",
    "논쟁을 부드럽게 마무리하는 표현입니다."),
 ],
 "quiz":[
  BUILD("Не оставляйте поле пустым.","빈칸으로 두지 마세요.","Don't leave the field blank.",["empty to","as"]),
  PICK("«Оставить дверь открытой?»","'문 열어 둘까요?'는?",
       "Should I leave the door open?","Should I leave the door opened?",
       "Здесь нужно прилагательное open, а не причастие opened.",
       "형용사 open을 씁니다."),
 ],
}

L[56] = {
 "meaning": N("bring = «привести, принести сюда». Движение к говорящему или к месту, где он будет. Противоположность take.",
              "'가져오다, 데려오다'로, 화자 쪽으로 오는 방향입니다. take의 반대입니다."),
 "examples":[
  E("Do you mind if I bring Nick with me?","Ничего, если я приведу с собой Ника?","닉도 같이 데려가도 될까요?"),
  E("Don't forget to bring your passport.","Не забудь взять паспорт.","여권 꼭 챙기세요."),
  E("Could you bring me the file?","Можешь принести мне файл?","파일 좀 가져다주실래요?"),
  E("I'll bring the samples to the meeting.","Образцы я принесу на встречу.","샘플은 제가 회의에 가져가겠습니다."),
  E("What brings you to Seoul?","Что привело вас в Сеул?","서울에는 어쩐 일로 오셨어요?"),
  E("Bring a jacket, it gets cold at night.","Возьми куртку, ночью холодает.","밤에 추우니까 겉옷 챙기세요."),
 ],
 "dialogue":[
  D("A","We're doing dinner Friday at my place.","В пятницу ужинаем у меня.","금요일에 저희 집에서 저녁 해요."),
  D("B","Do you mind if I bring Nick with me?","Ничего, если я приведу Ника?","닉도 같이 데려가도 될까요?"),
  D("A","Not at all. The more the merrier.","Конечно. Чем больше, тем лучше.","그럼요. 많을수록 좋죠."),
  D("B","He'll bring dessert.","Он принесёт десерт.","디저트는 걔가 가져올 거예요.",True),
 ],
 "notes":[
  N("Ключ — точка зрения слушателя. Собеседник будет там, значит для него это «сюда» → bring, даже если вы идёте туда.",
    "듣는 사람 기준으로 방향을 정합니다."),
  N("What brings you here? — вежливый способ спросить о цели визита. Мягче, чем Why are you here?",
    "방문 목적을 묻는 정중한 표현입니다."),
  N("Do you mind if I…? — просьба о разрешении. Ответ «да, можно» — это Not at all или Go ahead, а не Yes.",
    "Do you mind if…?에 허락은 Not at all입니다. Yes라고 하면 반대의 뜻입니다."),
 ],
 "quiz":[
  BUILD("Образцы я принесу на встречу.","샘플은 제가 회의에 가져가겠습니다.","I'll bring the samples to the meeting.",["take","for"]),
  PICK("Вас зовут на ужин, вы согласны привести друга. Ответ хозяина «конечно»","친구를 데려가도 되냐고 물었을 때 '그럼요'는?",
       "Not at all.","Yes, I mind.",
       "Do you mind…? спрашивает «вы против?». Разрешение — отрицательный ответ.",
       "Do you mind…?는 '싫으세요?'라는 뜻이라 허락은 부정으로 답합니다."),
 ],
}

L[57] = {
 "meaning": N("head = «направляться, двигаться куда-то». Разговорная и живая замена go, часто о начале движения прямо сейчас.",
              "'~로 향하다'라는 뜻으로, go의 구어적 표현입니다."),
 "examples":[
  E("I'm heading down to Busan this weekend.","На выходных еду в Пусан.","이번 주말에 부산 내려가요."),
  E("I'm heading out now.","Я сейчас выхожу.","저 지금 나갑니다."),
  E("Where are you headed?","Тебе куда?","어디 가세요?"),
  E("We're heading to the airport around four.","Часам к четырём выезжаем в аэропорт.","네 시쯤 공항으로 출발해요."),
  E("He headed straight for the exit.","Он сразу направился к выходу.","곧장 출구로 가더라고요."),
  E("Let's head back, it's getting late.","Пойдём обратно, поздно уже.","늦었으니 돌아가죠."),
 ],
 "dialogue":[
  D("A","Any plans for the weekend?","Планы на выходные есть?","주말에 뭐 하세요?"),
  D("B","I'm heading down to Busan.","Еду в Пусан.","부산 내려가요."),
  D("A","Business or pleasure?","По делам или отдыхать?","일이에요, 여행이에요?"),
  D("B","Neither. Family.","Ни то ни другое. Семья.","둘 다 아니에요. 가족이요.",True),
 ],
 "notes":[
  N("head down / head up — направление по карте. Из Сеула в Пусан — вниз (юг), в Сеул — up.",
    "지도 기준으로 남쪽은 down, 북쪽은 up입니다."),
  N("Where are you headed? — headed, не heading, в этом вопросе. Устойчиво.",
    "이 질문에서는 headed를 씁니다."),
  N("I'm heading out — «я пошёл». Самый естественный способ попрощаться в офисе.",
    "퇴근할 때 가장 자연스러운 인사입니다."),
 ],
 "quiz":[
  BUILD("Часам к четырём выезжаем в аэропорт.","네 시쯤 공항으로 출발해요.","We're heading to the airport around four.",["at","for"]),
  PICK("«Тебе куда?»","'어디 가세요?'는?",
       "Where are you headed?","Where are you heading to?",
       "Первый вариант — устойчивая разговорная формула. Второй понятен, но встречается реже.",
       "Where are you headed?가 굳어진 표현입니다."),
 ],
}

L[58] = {
 "meaning": N("come = «идти вместе, присоединиться». Ключ не в направлении, а в том, что вы идёте к тому же месту, что и собеседник.",
              "'같이 가다, 합류하다'입니다. 상대와 같은 곳으로 간다는 점이 핵심입니다."),
 "examples":[
  E("Are you coming with us to the party?","Ты с нами на вечеринку?","우리랑 파티 갈래요?"),
  E("I'm coming, give me two minutes.","Иду, дай мне две минуты.","가요, 2분만요."),
  E("Do you want to come along?","Хочешь с нами?","같이 갈래요?"),
  E("She's coming to Seoul next month.","В следующем месяце она приезжает в Сеул.","다음 달에 서울 오신대요."),
  E("Come in, please.","Проходите, пожалуйста.","들어오세요."),
  E("The delegation is coming on Tuesday.","Делегация приезжает во вторник.","대표단은 화요일에 옵니다."),
 ],
 "dialogue":[
  D("A","Are you coming with us to the party?","Ты с нами на вечеринку?","우리랑 파티 갈래요?"),
  D("B","Who's going to be there?","А кто будет?","누구누구 와요?"),
  D("A","The whole team, plus some people from sales.","Вся команда и ребята из продаж.","팀 전체랑 영업팀 몇 명이요."),
  D("B","All right, count me in.","Ладно, я с вами.","좋아요, 저도 갈게요.",True),
 ],
 "notes":[
  N("«Я иду» в ответ на зов — I'm coming, а не I'm going. Вы движетесь к тому, кто зовёт.",
    "부르는 사람에게 갈 때는 going이 아니라 coming입니다."),
  N("come along / come with us — присоединиться. come over — прийти в гости.",
    "come along은 합류, come over는 집에 방문입니다."),
  N("Count me in — «я участвую». Count me out — «без меня». Оба коротких ответа очень употребимы.",
    "Count me in은 참여, Count me out은 불참입니다."),
 ],
 "quiz":[
  BUILD("В следующем месяце она приезжает в Сеул.","다음 달에 서울 오신대요.","She's coming to Seoul next month.",["going","at"]),
  PICK("Вас зовут ужинать из соседней комнаты. Ваш ответ:","옆방에서 밥 먹으라고 부릅니다. 대답은?",
       "I'm coming!","I'm going!",
       "Вы движетесь к говорящему, значит coming.",
       "부르는 쪽으로 가므로 coming입니다."),
 ],
}

L[59] = {
 "meaning": N("put somebody on / in something = «поместить, записать, определить». О списках, статусах, назначениях.",
              "'명단이나 상태에 넣다, 배정하다'의 의미입니다."),
 "examples":[
  E("They put me on the waiting list.","Меня поставили в лист ожидания.","저 대기자 명단에 올려놨대요."),
  E("Can you put me through to the sales department?","Соедините меня с отделом продаж.","영업부로 연결해 주시겠어요?"),
  E("They put her in charge of the project.","Её назначили руководить проектом.","그분이 프로젝트 책임자로 임명됐어요."),
  E("Put me down for two tickets.","Запиши на меня два билета.","저는 표 두 장으로 해 주세요."),
  E("He was put on hold for twenty minutes.","Его продержали на линии двадцать минут.","20분이나 대기 상태로 있었어요."),
  E("Put it in writing, please.","Изложите это письменно, пожалуйста.","서면으로 주시면 좋겠습니다."),
 ],
 "dialogue":[
  D("A","Did you get the appointment?","Тебе назначили приём?","예약됐어요?"),
  D("B","Not yet. They put me on the waiting list.","Пока нет. Поставили в лист ожидания.","아직이요. 대기자 명단에 올려놨대요."),
  D("A","How long is the wait?","Сколько ждать?","얼마나 기다려야 해요?"),
  D("B","Three weeks, they said.","Говорят, три недели.","3주라고 하더라고요.",True),
 ],
 "notes":[
  N("put me through — соединить по телефону. Стандарт при звонке в компанию.",
    "전화 연결을 부탁할 때 쓰는 표준 표현입니다."),
  N("put somebody on hold — поставить на удержание. Обратное: take somebody off hold.",
    "전화 대기 상태로 두는 것을 말합니다."),
  N("Put it in writing — очень полезно в переговорах: просьба зафиксировать договорённость документом, без недоверия в тоне.",
    "구두 합의를 문서로 남겨 달라고 정중히 요청하는 표현입니다."),
 ],
 "quiz":[
  BUILD("Соедините меня с отделом продаж.","영업부로 연결해 주시겠어요?","Can you put me through to the sales department?",["on","connect"]),
  PICK("«Её назначили руководить проектом»","'프로젝트 책임자가 됐어요'는?",
       "They put her in charge of the project.","They put her on charge of the project.",
       "Устойчивое сочетание — in charge of.","in charge of로 굳어져 있습니다."),
 ],
}

L[60] = {
 "meaning": N("put somebody in a mood / position / situation = «привести в состояние». Причина снаружи, человек оказывается в нём.",
              "'~한 기분이나 상황에 놓이게 하다'입니다. 원인이 밖에 있습니다."),
 "examples":[
  E("Nasty comments always put me in a bad mood.","Злые комментарии всегда портят мне настроение.","악플 보면 항상 기분이 상해요."),
  E("Good news put everyone in a great mood.","Хорошая новость подняла всем настроение.","좋은 소식에 다들 기분이 좋아졌어요."),
  E("That puts us in a difficult position.","Это ставит нас в сложное положение.","그러면 저희가 곤란해집니다."),
  E("The delay put the whole team under pressure.","Задержка поставила всю команду под давление.","지연 때문에 팀 전체가 압박을 받았어요."),
  E("Don't put me in that position.","Не ставь меня в такое положение.","저를 그런 입장에 놓지 마세요."),
  E("A short walk puts me in a better mood.","Короткая прогулка поднимает мне настроение.","잠깐 걷고 오면 기분이 나아져요."),
 ],
 "dialogue":[
  D("A","You've been quiet all evening.","Ты весь вечер молчишь.","저녁 내내 조용하시네요."),
  D("B","Nasty comments always put me in a bad mood.","Злые комментарии всегда портят мне настроение.","악플 보면 항상 기분이 상해요."),
  D("A","Then stop reading them.","Тогда не читай их.","그럼 그냥 보지 마세요."),
  D("B","Easier said than done.","Легче сказать, чем сделать.","말은 쉽죠.",True),
 ],
 "notes":[
  N("put me in a bad mood — причина снаружи. I'm in a bad mood — просто констатация состояния.",
    "put은 원인을 밝히고, be는 상태만 말합니다."),
  N("That puts us in a difficult position — важнейшая фраза переговоров. Показывает проблему, не обвиняя партнёра.",
    "협상에서 상대를 탓하지 않고 곤란함을 전하는 표현입니다."),
  N("put somebody under pressure — «давить». В отчёте руководству звучит объективно, без эмоций.",
    "보고서에서 감정 없이 상황을 전달할 수 있습니다."),
 ],
 "quiz":[
  BUILD("Это ставит нас в сложное положение.","그러면 저희가 곤란해집니다.","That puts us in a difficult position.",["on","situation of"]),
  PICK("«Хорошая новость подняла всем настроение»","'좋은 소식에 다들 기분이 좋아졌어요'는?",
       "The news put everyone in a great mood.","The news put everyone to a great mood.",
       "Устойчиво — put somebody IN a mood.","in a mood로 씁니다."),
 ],
}
