# -*- coding: utf-8 -*-
from _helpers import E, D, N, BUILD, PICK
L = {}

L[21] = {
 "meaning": N("get + человек + to + глагол = «уговорить, добиться, чтобы кто-то что-то сделал». В отличие от have (просто попросить), get подразумевает усилие или убеждение.",
              "get + 사람 + to부정사는 '설득해서 ~하게 하다'입니다. have보다 노력이 들어간 뉘앙스입니다."),
 "examples":[
  E("How can I get my kids to eat vegetables?","Как заставить детей есть овощи?","애들이 채소를 먹게 하려면 어떻게 해야 하죠?"),
  E("I finally got him to sign the contract.","Я всё-таки уговорил его подписать договор.","결국 계약서에 서명하게 만들었어요."),
  E("We couldn't get them to lower the price.","Нам не удалось добиться снижения цены.","가격을 낮추게 하지는 못했어요."),
  E("Try to get her to call me back.","Постарайся, чтобы она мне перезвонила.","그분이 저한테 다시 전화하도록 해 주세요."),
  E("It took an hour to get the printer to work.","Час ушёл, чтобы принтер заработал.","프린터 작동시키는 데 한 시간 걸렸어요."),
  E("I can't get this file to open.","Не могу открыть этот файл.","이 파일이 안 열리네요."),
 ],
 "dialogue":[
  D("A","He only eats rice and meat.","Он ест только рис и мясо.","걔는 밥이랑 고기만 먹어요."),
  D("B","Same here. How can I get my kids to eat vegetables?","У меня так же. Как заставить детей есть овощи?","저희도요. 애들이 채소를 먹게 하려면 어떻게 해야 하죠?"),
  D("A","Mix them into something they already like.","Подмешивай в то, что им уже нравится.","좋아하는 음식에 섞어 보세요."),
  D("B","I'll give that a try.","Попробую.","한번 해 볼게요.",True),
 ],
 "notes":[
  N("Три каузатива рядом: have him call (попросил), make him call (заставил), get him to call (уговорил). Только get требует to.",
    "have는 부탁, make는 강제, get은 설득입니다. get만 to부정사를 씁니다."),
  N("get + вещь + to + глагол — о технике: I can't get the printer to work. Очень употребимо.",
    "기계가 주어일 때도 씁니다."),
  N("В переговорах: We couldn't get them to move on price — «не удалось сдвинуть их по цене». Мягче, чем They refused.",
    "협상에서 완곡하게 쓰기 좋은 표현입니다."),
 ],
 "quiz":[
  BUILD("Не могу открыть этот файл.","이 파일이 안 열리네요.","I can't get this file to open.",["opening","open"]),
  PICK("«Я уговорил его подписать»","'서명하게 설득했어요'는?",
       "I got him to sign.","I got him sign.",
       "После get нужен to. Без to — это have или make.",
       "get 뒤에는 to를 씁니다."),
 ],
}

L[22] = {
 "meaning": N("make = готовить, изготавливать, создавать своими руками. Самое прямое значение: из чего-то получается что-то новое.",
              "가장 기본적인 '만들다'입니다. 요리, 제작, 창작 모두 포함합니다."),
 "examples":[
  E("I can make you steamed galbi, if you want.","Могу приготовить тебе тушёные кальби, если хочешь.","원하면 갈비찜 해 줄게요."),
  E("Did you make this yourself?","Ты сам это сделал?","이거 직접 만드셨어요?"),
  E("She makes really good coffee.","Она отлично варит кофе.","그분이 커피를 정말 잘 내려요."),
  E("We make all our parts in Korea.","Все комплектующие мы производим в Корее.","저희는 부품을 전부 한국에서 생산합니다."),
  E("Let me make a copy of this.","Давайте я сделаю копию.","이거 복사 한 부 할게요."),
  E("I made a reservation for seven.","Я забронировал на семь.","일곱 시로 예약했어요."),
 ],
 "dialogue":[
  D("A","What should I bring to dinner?","Что принести на ужин?","저녁에 뭐 가져갈까요?"),
  D("B","Nothing. I can make you steamed galbi, if you want.","Ничего. Могу приготовить кальби-ччим, если хочешь.","아무것도요. 원하면 갈비찜 해 줄게요."),
  D("A","That's my favorite. Are you sure?","Это моё любимое. Точно не сложно?","제가 제일 좋아하는 건데요. 괜찮으시겠어요?"),
  D("B","It's no trouble at all.","Совсем не сложно.","전혀 번거롭지 않아요.",True),
 ],
 "notes":[
  N("make — создать новое. do — выполнить работу. make dinner (приготовить) / do the dishes (помыть посуду).",
    "make는 새로 만드는 것, do는 하는 것입니다."),
  N("Устойчивые связки: make a reservation, make a decision, make a mistake, make a call. Здесь make ≠ «делать руками».",
    "make a reservation처럼 굳어진 표현이 많습니다. 통째로 외우세요."),
  N("В производстве: We make it in Korea / It's made in Korea. Для вашей отрасли — базовая фраза.",
    "제조업에서 기본이 되는 표현입니다."),
 ],
 "quiz":[
  BUILD("Я забронировал на семь.","일곱 시로 예약했어요.","I made a reservation for seven.",["did","booking"]),
  PICK("«Помыть посуду»","'설거지하다'는?",
       "do the dishes","make the dishes",
       "make the dishes означало бы «изготовить тарелки».",
       "make the dishes는 '접시를 만들다'가 됩니다."),
 ],
}

L[23] = {
 "meaning": N("make + человек + прилагательное или существительное = «сделать каким-то». Речь об изменении качества или роли, а не о действии.",
              "make + 목적어 + 형용사/명사는 '~를 ~하게 만들다'입니다."),
 "examples":[
  E("Having children has made me a better husband.","Дети сделали меня лучшим мужем.","아이가 생기면서 더 좋은 남편이 됐어요."),
  E("The new system made everything easier.","Новая система всё упростила.","새 시스템이 모든 걸 훨씬 편하게 만들었어요."),
  E("That comment made me uncomfortable.","От этого замечания мне стало неловко.","그 말 때문에 불편했어요."),
  E("They made her team leader last month.","В прошлом месяце её назначили руководителем группы.","지난달에 그분이 팀장이 됐어요."),
  E("This delay makes us look unprofessional.","Из-за этой задержки мы выглядим непрофессионально.","이번 지연 때문에 저희가 프로답지 않아 보여요."),
  E("Coffee makes me jittery.","От кофе меня трясёт.","커피 마시면 손이 떨려요."),
 ],
 "dialogue":[
  D("A","You seem different since the baby.","Ты изменился с рождением ребёнка.","아기 생기고 나서 좀 달라진 것 같아요."),
  D("B","Having children has made me a better husband, I think.","Думаю, дети сделали меня лучшим мужем.","아이가 생기면서 더 좋은 남편이 된 것 같아요."),
  D("A","In what way?","В чём именно?","어떤 면에서요?"),
  D("B","I notice things I never noticed before.","Замечаю то, чего раньше не замечал.","예전엔 못 보던 걸 보게 됐어요.",True),
 ],
 "notes":[
  N("make me happy / make me angry / make me nervous — эмоции всегда через make, не через do.",
    "감정은 do가 아니라 make로 표현합니다."),
  N("Без to! made me a better husband, не made me to be. Частая ошибка.",
    "to be를 넣지 않습니다. 자주 하는 실수입니다."),
  N("This makes us look unprofessional — очень полезная конструкция для внутренних писем: указывает на последствие, а не на виноватого.",
    "책임자를 지목하지 않고 결과만 말할 때 유용합니다."),
 ],
 "quiz":[
  BUILD("Новая система всё упростила.","새 시스템이 모든 걸 편하게 만들었어요.","The new system made everything easier.",["more easy","to be"]),
  PICK("«От кофе меня трясёт»","'커피 마시면 손이 떨려요'는?",
       "Coffee makes me jittery.","Coffee makes me to be jittery.",
       "После make + объект идёт прилагательное без to be.",
       "make 뒤에는 to be를 쓰지 않습니다."),
 ],
}

L[24] = {
 "meaning": N("make + человек + глагол без to = «заставить». Сильнее, чем have или get: подразумевается принуждение, в том числе самопринуждение.",
              "make + 목적어 + 동사원형은 '억지로 ~하게 하다'입니다. have나 get보다 강합니다."),
 "examples":[
  E("I made myself go to the gym today.","Я заставил себя сегодня пойти в зал.","오늘 억지로 헬스장에 갔어요."),
  E("My boss made me redo the whole report.","Начальник заставил меня переделать весь отчёт.","상사가 보고서를 통째로 다시 쓰게 했어요."),
  E("Don't make me repeat myself.","Не заставляй меня повторять.","같은 말 두 번 하게 하지 마세요."),
  E("The movie made me cry.","Фильм довёл меня до слёз.","그 영화 보고 울었어요."),
  E("They made us wait for two hours.","Нас заставили ждать два часа.","두 시간이나 기다리게 했어요."),
  E("I make myself read ten pages before bed.","Я заставляю себя читать десять страниц перед сном.","자기 전에 열 쪽씩 억지로라도 읽어요."),
 ],
 "dialogue":[
  D("A","You look wiped out.","Ты вымотан.","많이 지쳐 보여요."),
  D("B","I made myself go to the gym today.","Я заставил себя сегодня пойти в зал.","오늘 억지로 헬스장에 갔어요."),
  D("A","Good for you. Was it worth it?","Молодец. Оно того стоило?","잘하셨네요. 갈 만했어요?"),
  D("B","Ask me tomorrow morning.","Спроси меня завтра утром.","내일 아침에 다시 물어보세요.",True),
 ],
 "notes":[
  N("После make — голый инфинитив: made me redo, не made me to redo. Но в пассиве to возвращается: I was made to redo it.",
    "능동태는 to 없이, 수동태는 to를 씁니다."),
  N("make myself + глагол — «заставлять себя». Очень удобно для разговоров о дисциплине и привычках.",
    "make myself는 자기 자신을 다그칠 때 씁니다."),
  N("make me cry / make me laugh — о фильмах, книгах, людях. Не «заставил», а «вызвал реакцию».",
    "감정 반응을 일으킬 때는 '강제'의 뜻이 아닙니다."),
 ],
 "quiz":[
  BUILD("Нас заставили ждать два часа.","두 시간이나 기다리게 했어요.","They made us wait for two hours.",["to wait","waiting"]),
  PICK("«Я заставил себя пойти в зал»","'억지로 헬스장에 갔어요'는?",
       "I made myself go to the gym.","I made myself to go to the gym.",
       "В активном залоге после make инфинитив без to.",
       "능동태에서는 to를 쓰지 않습니다."),
 ],
}

L[25] = {
 "meaning": N("make + человек + feel + прилагательное = «вызывать чувство». Самая частая эмоциональная конструкция английского.",
              "make + 목적어 + feel + 형용사는 '~한 기분이 들게 하다'입니다."),
 "examples":[
  E("Sitting in traffic makes me feel anxious.","Стоять в пробке меня нервирует.","차 막히면 불안해져요."),
  E("Your message made me feel much better.","Твоё сообщение меня очень поддержало.","메시지 보고 마음이 훨씬 나아졌어요."),
  E("This room makes me feel claustrophobic.","В этой комнате мне тесно и душно.","이 방에 있으면 답답해요."),
  E("He has a way of making people feel welcome.","Он умеет создать ощущение, что тебе рады.","그분은 사람을 편안하게 해 주는 재주가 있어요."),
  E("Flying makes me feel sick.","В самолёте мне становится плохо.","비행기 타면 속이 안 좋아요."),
  E("Public speaking used to make me feel nervous.","Раньше выступления меня нервировали.","예전엔 발표할 때 긴장했어요."),
 ],
 "dialogue":[
  D("A","Why do you leave so early?","Почему ты выезжаешь так рано?","왜 그렇게 일찍 나가요?"),
  D("B","Sitting in traffic makes me feel anxious.","Стоять в пробке меня нервирует.","차 막히면 불안해져요."),
  D("A","I've never thought about it that way.","Никогда об этом так не думал.","그렇게 생각해 본 적은 없네요."),
  D("B","Thirty minutes early is worth it to me.","Мне стоит того выехать на полчаса раньше.","30분 일찍 나가는 게 저한텐 나아요.",True),
 ],
 "notes":[
  N("makes me feel anxious ≠ makes me anxious. Второе — прямее и сильнее, первое — мягче, о внутреннем ощущении.",
    "feel이 들어가면 조금 더 부드럽고 주관적인 느낌입니다."),
  N("В деловом письме претензию смягчает именно эта конструкция: This situation makes us feel uncertain about the timeline.",
    "클레임 메일에서 강도를 낮출 때 유용합니다."),
  N("make somebody feel welcome / at home / comfortable — устойчивые связки о гостеприимстве.",
    "손님 접대 관련 표현으로 굳어져 있습니다."),
 ],
 "quiz":[
  BUILD("В самолёте мне становится плохо.","비행기 타면 속이 안 좋아요.","Flying makes me feel sick.",["to feel","feeling"]),
  PICK("«Твоё сообщение меня поддержало»","'메시지 보고 마음이 나아졌어요'는?",
       "Your message made me feel much better.","Your message made me to feel much better.",
       "После make идёт feel без to.","make 뒤에는 to 없이 feel이 옵니다."),
 ],
}

L[26] = {
 "meaning": N("make it = «добраться, успеть, справиться, пройти». Очень ёмкая идиома: от «дойти до финала» до «прийти на встречу».",
              "make it은 '해내다, 도착하다, 참석하다'를 모두 뜻하는 관용구입니다."),
 "examples":[
  E("They made it to the finals.","Они вышли в финал.","걔네 결승에 올라갔어요."),
  E("Sorry, I can't make it tomorrow.","Извини, завтра не смогу прийти.","죄송한데 내일은 못 갈 것 같아요."),
  E("Did you make it home okay?","Ты нормально добрался домой?","집에 잘 들어갔어요?"),
  E("We barely made the flight.","Мы еле успели на рейс.","비행기 간신히 탔어요."),
  E("Can you make it by six?","Успеешь к шести?","여섯 시까지 올 수 있어요?"),
  E("He made it through a tough year.","Он пережил тяжёлый год.","힘든 한 해를 잘 버텼어요."),
 ],
 "dialogue":[
  D("A","Did you watch the game last night?","Смотрел вчерашний матч?","어젯밤 경기 봤어요?"),
  D("B","I did. They made it to the finals.","Смотрел. Они вышли в финал.","봤죠. 결승에 올라갔잖아요."),
  D("A","Nobody expected that.","Никто не ожидал.","아무도 예상 못 했죠."),
  D("B","Least of all me.","Меньше всех — я.","저는 더더욱요.",True),
 ],
 "notes":[
  N("I can't make it — стандартный вежливый отказ от приглашения. Не нужно объяснять причину.",
    "초대를 거절할 때 쓰는 정중한 표현입니다. 이유를 대지 않아도 됩니다."),
  N("make it to + место или этап. make the flight / make the deadline — без to, о том, что успел.",
    "장소·단계 앞에는 to, 시간에 맞췄다는 뜻일 때는 to 없이 씁니다."),
  N("make it big — «добиться большого успеха». Отдельная идиома, не путать.",
    "make it big은 '크게 성공하다'입니다."),
 ],
 "quiz":[
  BUILD("Извини, завтра не смогу прийти.","죄송한데 내일은 못 갈 것 같아요.","Sorry, I can't make it tomorrow.",["do","come it"]),
  PICK("«Они вышли в финал»","'결승에 올라갔어요'는?",
       "They made it to the finals.","They made to the finals.",
       "В идиоме обязательно it: make it to.","관용구에는 it이 반드시 들어갑니다."),
 ],
}

L[27] = {
 "meaning": N("make a + существительное о людях = «получиться, выйти каким-то». Оценка потенциала: из него выйдет хороший руководитель, из них выйдет пара.",
              "'~가 될 만하다, 어울리다'라는 평가 표현입니다."),
 "examples":[
  E("Those two would make a great couple.","Эти двое отлично смотрелись бы вместе.","저 둘 잘 어울릴 것 같은데요."),
  E("He would make a good manager.","Из него вышел бы хороший руководитель.","그분은 좋은 관리자가 될 것 같아요."),
  E("This room would make a nice office.","Из этой комнаты вышел бы хороший кабинет.","이 방을 사무실로 쓰면 괜찮겠어요."),
  E("She'd make a terrible liar.","Врать она совсем не умеет.","그분은 거짓말은 절대 못 해요."),
  E("That story would make a great film.","Из этой истории вышел бы отличный фильм.","그 이야기로 영화 만들면 좋겠어요."),
  E("You two make a good team.","Вы вдвоём хорошая команда.","두 분 호흡이 잘 맞네요."),
 ],
 "dialogue":[
  D("A","Have you noticed Jiwon and Daniel lately?","Замечала Чивон и Даниэля в последнее время?","요즘 지원 씨랑 다니엘 씨 봤어요?"),
  D("B","Those two would make a great couple.","Эти двое отлично смотрелись бы вместе.","저 둘 잘 어울릴 것 같은데요."),
  D("A","Should we say something?","Может, намекнуть?","우리가 말해 볼까요?"),
  D("B","Let's stay out of it.","Давай не будем лезть.","그냥 두죠.",True),
 ],
 "notes":[
  N("Почти всегда с would: подразумевается «если бы». Без would звучит как утверждение факта.",
    "보통 would와 함께 씁니다. 가정의 뉘앙스가 있기 때문입니다."),
  N("Подлежащее может быть и неодушевлённым: This room would make a nice office.",
    "사물도 주어가 될 수 있습니다."),
  N("Мягкий способ похвалить коллегу перед руководством: He would make a good team lead.",
    "상사에게 동료를 추천할 때 부담 없이 쓸 수 있는 표현입니다."),
 ],
 "quiz":[
  BUILD("Из него вышел бы хороший руководитель.","그분은 좋은 관리자가 될 것 같아요.","He would make a good manager.",["become","to be"]),
  PICK("«Из этой комнаты вышел бы хороший кабинет»","'이 방을 사무실로 쓰면 좋겠어요'는?",
       "This room would make a nice office.","This room would become a nice office.",
       "become говорит о превращении со временем. make оценивает пригодность.",
       "become은 변화, make는 적합성 평가입니다."),
 ],
}

L[28] = {
 "meaning": N("take = «взять и унести, забрать с собой». Основное значение: объект перемещается вместе с вами, от говорящего.",
              "가장 기본적인 '가져가다'입니다. 화자에게서 멀어지는 방향입니다."),
 "examples":[
  E("If we can't finish, we can take the leftovers home.","Если не доедим, можем забрать остатки домой.","다 못 먹으면 남은 거 싸 가면 돼요."),
  E("Take an umbrella, it looks like rain.","Возьми зонт, похоже на дождь.","비 올 것 같으니 우산 챙기세요."),
  E("I'm taking the samples with me to Almaty.","Образцы я везу с собой в Алматы.","샘플은 제가 알마티로 가져갑니다."),
  E("Can you take this to the front desk?","Можешь отнести это на ресепшен?","이거 프런트에 갖다 주실래요?"),
  E("He took my pen by mistake.","Он по ошибке взял мою ручку.","제 펜을 실수로 가져갔어요."),
  E("Take your time.","Не торопись.","천천히 하세요."),
 ],
 "dialogue":[
  D("A","We ordered way too much.","Мы заказали слишком много.","너무 많이 시켰네요."),
  D("B","If we can't finish, we can take the leftovers home.","Если не доедим, можем забрать домой.","다 못 먹으면 남은 거 싸 가면 돼요."),
  D("A","Good idea. I'll ask for a box.","Хорошая идея. Попрошу контейнер.","좋네요. 포장 용기 달라고 할게요."),
  D("B","Get two, just in case.","Возьми два, на всякий случай.","혹시 모르니 두 개 받으세요.",True),
 ],
 "notes":[
  N("take — от говорящего. bring — к говорящему. Take it to the office (туда) / Bring it to my office (сюда).",
    "take는 멀어지는 방향, bring은 가까워지는 방향입니다."),
  N("Take your time — «не спешите». Вежливая универсальная фраза, в том числе в переписке.",
    "Take your time은 '천천히 하세요'라는 정중한 표현입니다."),
  N("leftovers — остатки еды, только во множественном числе.",
    "leftovers는 항상 복수형으로 씁니다."),
 ],
 "quiz":[
  BUILD("Образцы я везу с собой в Алматы.","샘플은 제가 알마티로 가져갑니다.","I'm taking the samples with me to Almaty.",["bringing","for"]),
  PICK("Вы в офисе, просите отнести документ в другой отдел","사무실에서 다른 부서로 서류를 보낼 때",
       "Can you take this to accounting?","Can you bring this to accounting?",
       "Движение от говорящего — take. bring было бы, если бы вы ждали документ у себя.",
       "화자에게서 멀어지므로 take입니다."),
 ],
}

L[29] = {
 "meaning": N("take = «принимать, брать к себе»: учреждение принимает людей, магазин принимает карты, компания берёт заказы.",
              "기관이나 가게가 '받다, 받아 주다'의 의미입니다."),
 "examples":[
  E("That kindergarten doesn't take kids under five.","Этот детский сад не берёт детей младше пяти.","그 유치원은 다섯 살 미만은 안 받아요."),
  E("Do you take credit cards?","Вы принимаете карты?","카드 되나요?"),
  E("The clinic isn't taking new patients right now.","Клиника сейчас не принимает новых пациентов.","그 병원은 지금 신규 환자를 안 받아요."),
  E("We're not taking new orders until March.","Новые заказы мы принимаем только с марта.","3월까지는 신규 주문을 받지 않습니다."),
  E("Does this machine take coins?","Этот автомат принимает монеты?","이 기계 동전 돼요?"),
  E("They took him on as an intern.","Его взяли стажёром.","인턴으로 채용됐어요."),
 ],
 "dialogue":[
  D("A","We found a kindergarten near the office.","Мы нашли садик рядом с офисом.","사무실 근처에 유치원을 찾았어요."),
  D("B","How old is your daughter?","Сколько вашей дочке?","따님이 몇 살이죠?"),
  D("A","Four. But that kindergarten doesn't take kids under five.","Четыре. Но этот садик не берёт младше пяти.","네 살이요. 근데 거긴 다섯 살 미만은 안 받아요."),
  D("B","That's a shame. Keep looking.","Жаль. Ищите дальше.","아쉽네요. 계속 알아보세요.",True),
 ],
 "notes":[
  N("Do you take cards? — стандартный вопрос в магазине. Не Do you accept cards? (тоже верно, но формальнее).",
    "가게에서는 take를 더 많이 씁니다. accept는 격식체입니다."),
  N("take somebody on — принять на работу. We took her on last year.",
    "take on은 '채용하다'라는 뜻입니다."),
  N("В деловой переписке: We are not taking new orders at this time — вежливый отказ без слова no.",
    "no를 쓰지 않고 거절하는 정중한 표현입니다."),
 ],
 "quiz":[
  BUILD("Вы принимаете карты?","카드 되나요?","Do you take credit cards?",["get","are taking"]),
  PICK("«Клиника сейчас не принимает новых пациентов»","'지금 신규 환자를 안 받아요'는?",
       "The clinic isn't taking new patients.","The clinic doesn't get new patients.",
       "get означало бы, что к ним просто никто не приходит. Политика приёма — take.",
       "get은 '환자가 안 온다'는 뜻이 됩니다."),
 ],
}

L[30] = {
 "meaning": N("take advice / criticism / orders / a hint = «принимать, прислушиваться». Речь о готовности принять то, что вам говорят.",
              "조언, 비판, 지시 등을 '받아들이다'의 의미입니다."),
 "examples":[
  E("Kevin doesn't take advice from anyone.","Кевин ни от кого не принимает советов.","케빈은 누구 말도 안 들어요."),
  E("She takes criticism really well.","Она спокойно воспринимает критику.","그분은 비판을 잘 받아들여요."),
  E("I don't take orders from him.","Я не подчиняюсь его указаниям.","그 사람 지시는 안 받아요."),
  E("He can't take a joke.","Он не понимает шуток.","걔는 농담을 못 받아들여요."),
  E("Take my word for it.","Поверь мне на слово.","제 말 믿으세요."),
  E("Don't take it personally.","Не принимай на свой счёт.","기분 나쁘게 받아들이지 마세요."),
 ],
 "dialogue":[
  D("A","Did you tell Kevin about the pricing issue?","Ты сказал Кевину про проблему с ценой?","케빈한테 가격 문제 말했어요?"),
  D("B","I tried. Kevin doesn't take advice from anyone.","Пытался. Кевин ни от кого не принимает советов.","말은 했죠. 케빈은 누구 말도 안 들어요."),
  D("A","Then let him find out the hard way.","Тогда пусть учится на своих ошибках.","그럼 직접 부딪쳐 봐야 알겠네요."),
  D("B","That's where we're headed.","К тому и идёт.","그렇게 되겠죠.",True),
 ],
 "notes":[
  N("Don't take it personally — фраза первой необходимости в международных переговорах. Смягчает жёсткую позицию.",
    "협상에서 강한 입장을 부드럽게 만들 때 쓰는 표현입니다."),
  N("take it well / take it badly — «нормально воспринять / тяжело воспринять». Об известиях и критике.",
    "소식이나 비판에 대한 반응을 말할 때 씁니다."),
  N("take a hint — «понять намёк». Can't you take a hint? — резко, будьте осторожны.",
    "take a hint은 '눈치채다'입니다. 직설적이라 조심해서 쓰세요."),
 ],
 "quiz":[
  BUILD("Не принимай на свой счёт.","기분 나쁘게 받아들이지 마세요.","Don't take it personally.",["get","personal"]),
  PICK("«Она спокойно воспринимает критику»","'비판을 잘 받아들여요'는?",
       "She takes criticism really well.","She gets criticism really well.",
       "get criticism означало бы «получает критику». Принимать — take.",
       "get criticism은 '비판을 받는다'는 뜻입니다."),
 ],
}
