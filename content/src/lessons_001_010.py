# -*- coding: utf-8 -*-
from _helpers import E, D, N, BUILD, PICK
L = {}

L[1] = {
 "meaning": N("Базовое «иметь / у меня есть»: вещи, питомцы, родственники, черты характера, симптомы. Это состояние, а не действие, поэтому в этом значении have не ставится в Continuous.", "가장 기본적인 '소유'의 의미입니다. 물건, 반려동물, 가족, 성격, 증상까지 모두 have로 말합니다. 동작이 아니라 상태이므로 진행형으로 쓰지 않습니다."),
 "examples":[
  E("Do you have any pets?","У тебя есть домашние животные?","반려동물 키워요?"),
  E("I have two older brothers.","У меня два старших брата.","저는 형이 둘 있어요."),
  E("Do you have any allergies?","У вас есть аллергия?","알레르기 있으세요?"),
  E("She has a great sense of humor.","У неё отличное чувство юмора.","걔는 유머 감각이 정말 좋아요."),
  E("We have a meeting at three.","У нас встреча в три.","세 시에 회의 있어요."),
  E("I don't have my wallet on me.","У меня нет с собой кошелька.","지금 지갑을 안 가지고 있어요."),
 ],
 "dialogue":[
  D("A","Do you have any pets?","У тебя есть питомцы?","반려동물 키워요?"),
  D("B","Yeah, I have a golden retriever. His name is Max.","Да, золотистый ретривер. Его зовут Макс.","네, 골든 리트리버 한 마리요. 이름은 맥스예요."),
  D("A","Oh, nice. How long have you had him?","О, здорово. Давно он у тебя?","좋네요. 키운 지 얼마나 됐어요?"),
  D("B","About three years now.","Уже около трёх лет.","이제 한 3년 됐어요.",True),
 ],
 "notes":[
  N("have got — разговорный британский вариант have: I've got a car = I have a car. В американском чаще просто have.",
    "have got은 영국식 구어체로 have와 같은 뜻입니다. 미국에서는 그냥 have를 더 많이 씁니다."),
  N("Вопрос без do — Have you any pets? — звучит устаревше. Современно: Do you have…? (US) или Have you got…? (UK).",
    "Have you any pets?는 예스러운 표현입니다. 요즘은 Do you have…? 또는 Have you got…?을 씁니다."),
  N("В вопросе — any, не some. Some появляется, когда вы предлагаете: Would you like some coffee?",
    "의문문에서는 some이 아니라 any를 씁니다. 권유할 때만 some을 씁니다."),
 ],
 "quiz":[
  BUILD("У вас есть аллергия?","알레르기 있으세요?","Do you have any allergies?",["some", "are", "has"]),
  PICK("Что звучит естественно?","어느 쪽이 자연스러울까요?",
       "I have a headache.","I'm having a headache.",
       "have в значении состояния не ставится в Continuous.",
       "상태를 나타내는 have는 진행형으로 쓰지 않습니다."),
 ],
}

L[2] = {
 "meaning": N("have = есть, пить, принимать пищу: have lunch, have a coffee, have a snack. Здесь have — это действие, поэтому Continuous возможен: I'm having lunch.", "have가 '먹다, 마시다'의 뜻으로 쓰입니다. 이때는 동작이므로 진행형이 가능합니다."),
 "examples":[
  E("I just had a snack, so I'm not that hungry.","Я только что перекусил, так что не особо голоден.","방금 간식을 먹어서 별로 안 배고파요."),
  E("Let's have lunch together sometime.","Давай как-нибудь пообедаем вместе.","언제 같이 점심 먹어요."),
  E("I usually have coffee around ten.","Обычно я пью кофе около десяти.","보통 열 시쯤 커피를 마셔요."),
  E("I'm having dinner right now. Can I call you back?","Я сейчас ужинаю. Можно перезвоню?","지금 저녁 먹는 중이에요. 이따 전화드려도 될까요?"),
  E("Did you have breakfast?","Ты завтракал?","아침 먹었어요?"),
  E("We had a few drinks after work.","Мы после работы выпили пару бокалов.","퇴근하고 몇 잔 했어요."),
 ],
 "dialogue":[
  D("A","Do you want to grab something to eat?","Хочешь перекусить?","뭐 좀 먹으러 갈래요?"),
  D("B","I just had a snack, so I'm not that hungry.","Я только что перекусил, не особо голоден.","방금 간식 먹어서 별로 안 배고파요."),
  D("A","Okay. Maybe just coffee, then?","Ладно. Тогда, может, просто кофе?","그럼 커피만 마실까요?"),
  D("B","Sure, I could go for a coffee.","Давай, от кофе не откажусь.","좋아요, 커피는 괜찮아요.",True),
 ],
 "notes":[
  N("Ключевая разница с уроком 1: have-обладание в Continuous не ставится, have-еда ставится. I'm having lunch ✓ / I'm having a car ✗",
    "소유의 have는 진행형 불가, 식사의 have는 진행형 가능합니다."),
  N("have a coffee / have a beer — с артиклем, когда речь о порции. I don't drink coffee — о привычке вообще.",
    "한 잔을 말할 때는 관사를 붙입니다. 습관을 말할 때는 drink를 씁니다."),
  N("«Только что» — just + Past Simple в американском (I just had), в британском чаще Present Perfect (I've just had). Оба верны.",
    "미국식은 just + 과거형, 영국식은 현재완료를 선호합니다. 둘 다 맞습니다."),
 ],
 "quiz":[
  BUILD("Ты завтракал?","아침 먹었어요?","Did you have breakfast?",["are", "having", "a"]),
  PICK("«Я сейчас обедаю» — как сказать?","'지금 점심 먹는 중이에요'는?",
       "I'm having lunch.","I have lunch now.",
       "Еда — это действие, значит Continuous. I have lunch at noon описывает привычку, а не текущий момент.",
       "식사는 동작이므로 진행형을 씁니다. I have lunch at noon은 습관을 뜻합니다."),
 ],
}

L[3] = {
 "meaning": N("have = провести, пережить отрезок времени или опыт: have a good time, have a hard day, have a weird morning.", "시간이나 경험을 '보내다, 겪다'의 의미입니다."),
 "examples":[
  E("I had a weird morning yesterday.","Вчера у меня было странное утро.","어제 아침이 좀 이상했어요."),
  E("Did you have a good time in Osaka?","Хорошо провели время в Осаке?","오사카에서 잘 보냈어요?"),
  E("I had a really long day.","У меня был очень тяжёлый день.","오늘 하루 진짜 길었어요."),
  E("We had a great time at the workshop.","Мы отлично провели время на воркшопе.","워크숍 정말 즐거웠어요."),
  E("She's having a hard time at work these days.","У неё сейчас тяжёлый период на работе.","걔 요즘 회사에서 힘들어해요."),
  E("Have a safe flight.","Хорошего полёта.","안전하게 잘 다녀오세요."),
 ],
 "dialogue":[
  D("A","You look tired.","Ты выглядишь уставшим.","피곤해 보여요."),
  D("B","I had a weird morning yesterday and barely slept.","Вчера было странное утро, я почти не спал.","어제 아침이 좀 이상했는데 잠도 거의 못 잤어요."),
  D("A","What happened?","Что случилось?","무슨 일 있었어요?"),
  D("B","Long story. I'll tell you over coffee.","Долгая история. Расскажу за кофе.","얘기가 길어요. 커피 마시면서 얘기할게요.",True),
 ],
 "notes":[
  N("Здесь have означает проживать отрезок времени, поэтому Continuous возможен: She's having a hard time.",
    "시간을 '보내는' 의미이므로 진행형이 가능합니다."),
  N("Have a good one / Have a good day — стандартное прощание. В деловом письме уместно Have a great day.",
    "Have a good one은 흔한 작별 인사입니다. 업무 메일에서는 Have a great day가 무난합니다."),
  N("Порядок слов жёсткий: have + прилагательное + существительное. a long day, a hard time, a safe flight.",
    "have + 형용사 + 명사 순서로 굳어져 있습니다."),
 ],
 "quiz":[
  BUILD("Хорошо провели время в Осаке?","오사카에서 잘 보냈어요?","Did you have a good time in Osaka?",["were", "having"]),
  PICK("«У неё сейчас тяжёлый период»","'걔 요즘 힘들어해요'는?",
       "She's having a hard time.","She has a hard time.",
       "О текущем периоде — Continuous. She has a hard time звучит как общее свойство характера.",
       "지금 겪고 있는 상황은 진행형으로 말합니다."),
 ],
}

L[4] = {
 "meaning": N("have = проводить, устраивать мероприятие: встречу, презентацию, вечеринку, распродажу. Разговорный синоним hold.", "행사를 '열다, 하다'의 의미입니다. hold의 구어체 표현입니다."),
 "examples":[
  E("Samsung is having a new-product launch today.","Samsung сегодня проводит презентацию нового продукта.","삼성이 오늘 신제품 발표회를 열어요."),
  E("We're having a team dinner on Friday.","В пятницу у нас корпоратив.","금요일에 회식 있어요."),
  E("The store is having a sale this week.","На этой неделе в магазине распродажа.","이번 주에 그 가게 세일해요."),
  E("Are you having a housewarming party?","Ты устраиваешь новоселье?","집들이 하실 거예요?"),
  E("We had a long meeting about the budget.","У нас было долгое совещание по бюджету.","예산 관련해서 회의를 길게 했어요."),
  E("They're having a press conference at noon.","В полдень у них пресс-конференция.","정오에 기자회견을 해요."),
 ],
 "dialogue":[
  D("A","Are you free Thursday afternoon?","Ты свободен в четверг после обеда?","목요일 오후에 시간 돼요?"),
  D("B","Not really. Samsung is having a new-product launch and we're invited.","Не совсем. У Samsung презентация, нас позвали.","아니요. 삼성 신제품 발표회가 있는데 저희도 초대받았어요."),
  D("A","That's a good chance to meet their team.","Хороший шанс познакомиться с их командой.","그쪽 팀 만날 좋은 기회네요."),
  D("B","Exactly. I'll send you the invitation.","Именно. Пришлю тебе приглашение.","맞아요. 초대장 보내드릴게요.",True),
 ],
 "notes":[
  N("О запланированном событии have почти всегда в Continuous: We're having a meeting tomorrow.",
    "예정된 행사는 보통 진행형으로 말합니다."),
  N("hold a meeting — письменно и официально. have a meeting — в разговоре и в обычных письмах.",
    "공식 문서는 hold, 일상 대화와 메일은 have를 씁니다."),
  N("«У нас будет совещание» → We're having / We have a meeting. We will have звучит как решение, принятое прямо сейчас.",
    "이미 정해진 일정에 will을 쓰면 지금 막 정한 것처럼 들립니다."),
 ],
 "quiz":[
  BUILD("В пятницу у нас корпоратив.","금요일에 회식 있어요.","We're having a team dinner on Friday.",["will", "at"]),
  PICK("«На этой неделе в магазине распродажа»","'이번 주에 그 가게 세일해요'는?",
       "The store is having a sale this week.","The store has a sale this week.",
       "Мероприятие с конкретным сроком — Continuous.",
       "기간이 정해진 행사는 진행형이 자연스럽습니다."),
 ],
}

L[5] = {
 "meaning": N("have something to do — «есть что-то, что надо сделать». Не путать с have to (быть должным): I have work to do ≠ I have to work.", "'할 일이 있다'는 뜻입니다. 의무를 뜻하는 have to와 구별해야 합니다."),
 "examples":[
  E("I have some chores to do in the afternoon.","У меня после обеда дела по дому.","오후에 집안일이 좀 있어요."),
  E("I have a lot of emails to answer.","Мне надо ответить на кучу писем.","답장해야 할 메일이 많아요."),
  E("Do you have anything to add?","Хотите что-нибудь добавить?","더 하실 말씀 있으세요?"),
  E("I have two calls to make before lunch.","До обеда мне надо сделать два звонка.","점심 전에 전화 두 통 해야 해요."),
  E("We have a lot to talk about.","Нам есть о чём поговорить.","우리 얘기할 게 많아요."),
  E("I don't have much to say about it.","Мне особо нечего об этом сказать.","그거에 대해선 별로 할 말이 없어요."),
 ],
 "dialogue":[
  D("A","Want to grab lunch and go see a movie?","Пообедаем и сходим в кино?","점심 먹고 영화 볼래요?"),
  D("B","Lunch sounds good, but I have some chores to do in the afternoon.","Обед — да, но у меня после обеда дела по дому.","점심은 좋은데, 오후에 집안일이 좀 있어요."),
  D("A","No problem. Next weekend, then?","Не проблема. Тогда на следующих выходных?","괜찮아요. 그럼 다음 주말에 할까요?"),
  D("B","Works for me.","Мне подходит.","저는 좋아요.",True),
 ],
 "notes":[
  N("have something to do ≠ have to do something. I have work to do — у меня есть работа. I have to work — я обязан работать.",
    "have + 명사 + to부정사는 '할 ~가 있다', have to + 동사는 '~해야 한다'입니다."),
  N("Схема: have + (a lot / some / nothing / anything) + to + глагол.",
    "have + 수량 표현 + to + 동사원형 구조로 외우세요."),
  N("Do you have anything to add? — стандартная фраза в конце совещания. Запомните целиком.",
    "회의 마무리에 쓰는 정형 표현입니다. 통째로 외우세요."),
 ],
 "quiz":[
  BUILD("Хотите что-нибудь добавить?","더 하실 말씀 있으세요?","Do you have anything to add?",["some", "adding"]),
  PICK("«У меня есть работа, которую надо сделать»","'해야 할 일이 있어요'는?",
       "I have work to do.","I have to work to do.",
       "have to — это обязанность, здесь она не нужна: работа уже есть как объект.",
       "여기서는 의무가 아니라 '할 일'이라는 목적어이므로 have to를 쓰지 않습니다."),
 ],
}

L[6] = {
 "meaning": N("Неодушевлённое подлежащее + have: у места, здания или предмета есть характеристика, атмосфера, функция.", "장소나 사물이 주어가 되어 '~가 있다, ~한 특징을 가지다'를 나타냅니다."),
 "examples":[
  E("The Gion district in Kyoto has a charming vibe.","У квартала Гион в Киото особое очарование.","교토 기온 거리는 분위기가 참 좋아요."),
  E("This cafe has really good desserts.","В этом кафе очень хорошие десерты.","이 카페 디저트가 진짜 괜찮아요."),
  E("The new model has a bigger screen.","У новой модели экран больше.","새 모델은 화면이 더 커요."),
  E("Our office has a great view.","Из нашего офиса отличный вид.","저희 사무실은 전망이 좋아요."),
  E("Does this hotel have a gym?","В этом отеле есть спортзал?","이 호텔에 헬스장 있어요?"),
  E("This restaurant has a nice terrace.","В этом ресторане приятная терраса.","이 식당은 테라스가 좋아요."),
 ],
 "dialogue":[
  D("A","How was Kyoto?","Как Киото?","교토 어땠어요?"),
  D("B","Amazing. The Gion district has a charming vibe, especially at night.","Потрясающе. У Гиона особое очарование, особенно вечером.","너무 좋았어요. 기온 거리는 특히 밤에 분위기가 정말 좋아요."),
  D("A","Is it very touristy?","Там очень туристично?","관광객 많아요?"),
  D("B","A bit, but it's still worth it.","Немного, но всё равно стоит того.","좀 있긴 한데 그래도 가 볼 만해요.",True),
 ],
 "notes":[
  N("«В этом кафе хорошие десерты» → This cafe has good desserts. Не In this cafe are good desserts — это калька с русского.",
    "장소를 주어로 삼아 have를 쓰는 것이 영어식 발상입니다."),
  N("vibe — разговорное «атмосфера». Формально: atmosphere, character.",
    "vibe는 구어체이고, 격식 있는 자리에서는 atmosphere를 씁니다."),
  N("Об услугах в отеле естественнее have: Does the hotel have parking? — лучше, чем Is there parking in the hotel?",
    "호텔 시설을 물을 때는 have가 더 자연스럽습니다."),
 ],
 "quiz":[
  BUILD("В этом отеле есть спортзал?","이 호텔에 헬스장 있어요?","Does this hotel have a gym?",["Is", "there"]),
  PICK("«Из нашего офиса отличный вид»","'저희 사무실은 전망이 좋아요'는?",
       "Our office has a great view.","In our office is a great view.",
       "Английский делает место подлежащим и вешает на него have.",
       "영어는 장소를 주어로 삼습니다."),
 ],
}

L[7] = {
 "meaning": N("have somebody over — принимать гостей у себя дома. Устойчивая благодарность гостя: Thank you for having us.", "'집에 초대하다'라는 뜻입니다. 손님이 하는 인사 Thank you for having us도 함께 외우세요."),
 "examples":[
  E("Thank you for having us over for dinner.","Спасибо, что пригласили нас на ужин.","저녁 초대해 주셔서 감사합니다."),
  E("We're having some friends over on Saturday.","В субботу к нам придут друзья.","토요일에 친구들 몇 명 초대했어요."),
  E("Let's have them over sometime.","Давай как-нибудь позовём их к нам.","언제 한번 초대하죠."),
  E("Thanks for having me.","Спасибо, что позвали.","초대해 주셔서 감사합니다."),
  E("She had her parents over for the holidays.","Она принимала родителей на праздники.","명절에 부모님을 모셨어요."),
  E("We don't have people over very often.","Мы нечасто зовём гостей.","저희는 손님을 자주 초대하진 않아요."),
 ],
 "dialogue":[
  D("A","Thank you for having us over for dinner. Everything was delicious.","Спасибо, что позвали на ужин. Всё было очень вкусно.","저녁 초대해 주셔서 감사합니다. 다 너무 맛있었어요."),
  D("B","I'm so glad you enjoyed it.","Очень рада, что вам понравилось.","맛있게 드셨다니 다행이에요."),
  D("A","Next time you two come to our place.","В следующий раз вы к нам.","다음엔 저희 집으로 오세요."),
  D("B","We'd love to.","С удовольствием.","좋죠, 꼭 갈게요.",True),
 ],
 "notes":[
  N("Thanks for having me — универсальная благодарность гостя: и в гостях, и в подкасте, и на встрече.",
    "집, 방송, 행사 어디서든 손님이 쓰는 표현입니다."),
  N("have over — именно к себе домой. invite — шире и формальнее.",
    "have over는 '집으로', invite는 더 넓고 격식 있는 표현입니다."),
  N("Ответ хозяина: Thanks for coming. / Our pleasure.",
    "초대한 쪽은 Thanks for coming이라고 답합니다."),
 ],
 "quiz":[
  BUILD("Спасибо, что пригласили нас на ужин.","저녁 초대해 주셔서 감사합니다.","Thank you for having us over for dinner.",["invite", "to"]),
  PICK("Гость уходит. Что он скажет?","손님이 돌아가며 하는 인사는?",
       "Thanks for having me.","Thanks for inviting me to have.",
       "Thanks for having me — готовая формула, менять её не нужно.",
       "통째로 굳어진 표현입니다."),
 ],
}

L[8] = {
 "meaning": N("Каузатив: have + человек + глагол БЕЗ to. «Попросить / устроить, чтобы кто-то что-то сделал». Мягче, чем make (заставить).", "have + 사람 + 동사원형: '~에게 ~하게 하다'. make(강제)보다 부드러운 표현입니다."),
 "examples":[
  E("You could have Daniel give you a ride.","Ты можешь попросить Даниэля тебя подвезти.","다니엘한테 태워 달라고 하면 되잖아요."),
  E("I'll have my assistant send you the file.","Я попрошу ассистента прислать вам файл.","비서한테 파일 보내 드리라고 할게요."),
  E("Let me have someone call you back.","Я попрошу, чтобы вам перезвонили.","담당자가 다시 연락드리게 하겠습니다."),
  E("She had the waiter bring more water.","Она попросила официанта принести ещё воды.","웨이터한테 물 더 갖다 달라고 했어요."),
  E("I'll have them check the shipment again.","Попрошу их ещё раз проверить отгрузку.","출고 건 다시 확인해 보라고 하겠습니다."),
  E("Have him wait in the lobby.","Пусть подождёт в холле.","로비에서 기다리시라고 해 주세요."),
 ],
 "dialogue":[
  D("A","I don't think I can get to the airport by six.","Вряд ли успею в аэропорт к шести.","6시까지 공항에 못 갈 것 같아요."),
  D("B","You could have Daniel give you a ride. He's driving that way anyway.","Попроси Даниэля подвезти, он всё равно едет в ту сторону.","다니엘한테 태워 달라고 해요. 어차피 그쪽으로 가잖아요."),
  D("A","Good idea. Would that be okay with him?","Хорошая идея. Ему будет удобно?","좋은 생각이네요. 괜찮을까요?"),
  D("B","I'm sure he wouldn't mind.","Уверен, он не против.","아마 상관없을 거예요.",True),
 ],
 "notes":[
  N("Три каузатива: have (попросить, нейтрально) / make (заставить) / get (уговорить, get + to + глагол). I'll have him call / I made him call / I got him to call.",
    "have는 중립, make는 강제, get은 설득입니다. get만 to부정사를 씁니다."),
  N("Голый инфинитив, без to: have him call, а не have him to call. Частая ошибка.",
    "have 다음에는 to 없이 동사원형이 옵니다. 자주 틀리는 부분입니다."),
  N("В деловой переписке I'll have my colleague follow up — стандартная вежливая формула.",
    "업무 메일에서 자주 쓰는 정중한 표현입니다."),
 ],
 "quiz":[
  BUILD("Я попрошу ассистента прислать вам файл.","비서한테 파일 보내 드리라고 할게요.","I'll have my assistant send you the file.",["to send", "asking"]),
  PICK("«Попрошу его вам перезвонить»","'그에게 다시 전화드리라고 할게요'는?",
       "I'll have him call you back.","I'll have him to call you back.",
       "После have — глагол без to.",
       "have 뒤에는 to를 쓰지 않습니다."),
 ],
}

L[9] = {
 "meaning": N("get = получить, достать, приобрести — самое базовое значение. В разговоре заменяет buy, receive, obtain.", "가장 기본적인 '얻다, 구하다, 사다'의 의미로, 구어에서 buy/receive/obtain을 대신합니다."),
 "examples":[
  E("My boyfriend got a ticket to the concert.","Мой парень достал билет на концерт.","남자친구가 콘서트 티켓을 구했어요."),
  E("I got your email, thanks.","Получил ваше письмо, спасибо.","메일 잘 받았습니다, 감사합니다."),
  E("Where did you get that jacket?","Где ты взял эту куртку?","그 재킷 어디서 샀어요?"),
  E("I need to get a new phone.","Мне нужен новый телефон.","휴대폰 새로 사야 해요."),
  E("Did you get the documents from the customs broker?","Ты получил документы от таможенного брокера?","관세사한테 서류 받았어요?"),
  E("He got a job at a hospital in Almaty.","Он устроился на работу в больницу в Алматы.","알마티에 있는 병원에 취직했어요."),
 ],
 "dialogue":[
  D("A","My boyfriend got a ticket to the concert.","Мой парень достал билет на концерт.","남자친구가 콘서트 티켓을 구했어요."),
  D("B","Only one?","Только один?","한 장만요?"),
  D("A","Yeah, they sold out in five minutes.","Да, всё раскупили за пять минут.","네, 5분 만에 매진됐어요."),
  D("B","That's rough. Maybe try the resale site.","Обидно. Попробуй сайт перепродажи.","아쉽네요. 리셀 사이트 한번 봐요.",True),
 ],
 "notes":[
  N("get покрывает buy, receive, obtain и find. В письме лучше receive / obtain, в разговоре — почти всегда get.",
    "구어에서는 get 하나로 해결되지만, 격식 있는 문서에서는 receive/obtain을 씁니다."),
  N("got ≠ have got. I got a new phone — купил (действие). I've got a new phone — у меня есть (состояние).",
    "got은 '샀다', have got은 '가지고 있다'입니다."),
  N("Запоминайте связками: get a job, get a ticket, get an email, get a haircut.",
    "덩어리째 외우는 것이 효율적입니다."),
 ],
 "quiz":[
  BUILD("Где ты взял эту куртку?","그 재킷 어디서 샀어요?","Where did you get that jacket?",["have", "got"]),
  PICK("«Получил ваше письмо»","'메일 잘 받았습니다'는?",
       "I got your email.","I am getting your email.",
       "Письмо уже получено — это завершённое действие, Continuous не подходит.",
       "이미 끝난 동작이므로 진행형을 쓰지 않습니다."),
 ],
}

L[10] = {
 "meaning": N("get a table / get a seat / get a spot — «достать, занять место». Подразумевается, что это непросто или требует брони.", "'자리를 잡다, 구하다'의 의미로, 쉽지 않거나 예약이 필요한 상황에서 씁니다."),
 "examples":[
  E("You have to book way in advance to get a table there.","Столик там надо бронировать сильно заранее.","거기는 한참 전에 예약해야 자리가 있어요."),
  E("We got a table by the window.","Нам достался столик у окна.","창가 자리 잡았어요."),
  E("I couldn't get a seat on the morning flight.","Не смог взять место на утренний рейс.","아침 비행기 자리를 못 구했어요."),
  E("Try to get there early to get a good spot.","Приходи пораньше, чтобы занять хорошее место.","좋은 자리 잡으려면 일찍 가세요."),
  E("Did you get tickets for Saturday?","Ты взял билеты на субботу?","토요일 표 구했어요?"),
  E("We got the last two rooms at the hotel.","Мы взяли последние два номера в отеле.","호텔에 마지막 남은 방 두 개 잡았어요."),
 ],
 "dialogue":[
  D("A","Let's try that new place in Gangnam.","Давай сходим в то новое место в Каннаме.","강남에 새로 생긴 데 가 볼까요?"),
  D("B","You have to book way in advance to get a table there.","Там столик надо бронировать сильно заранее.","거기는 한참 전에 예약해야 자리가 있어요."),
  D("A","How far in advance?","Насколько заранее?","얼마나 전에요?"),
  D("B","About a month, I heard.","Говорят, примерно за месяц.","한 달 정도라고 들었어요.",True),
 ],
 "notes":[
  N("way in advance — «сильно заранее». way усиливает: way too expensive, way better, way more.",
    "way는 강조어입니다. way too expensive처럼 씁니다."),
  N("book (британское) = reserve (американское). Оба понятны везде.",
    "book은 영국식, reserve는 미국식이지만 둘 다 통합니다."),
  N("Не путайте: get a table — сесть за столик сейчас; get a reservation — получить бронь.",
    "get a table는 자리를 잡는 것, get a reservation은 예약을 잡는 것입니다."),
 ],
 "quiz":[
  BUILD("Нам достался столик у окна.","창가 자리 잡았어요.","We got a table by the window.",["have", "on"]),
  PICK("«Бронировать надо сильно заранее»","'한참 전에 예약해야 해요'는?",
       "You have to book way in advance.","You have to book very in advance.",
       "Перед in advance усилитель — way, не very.",
       "in advance 앞에는 very가 아니라 way를 씁니다."),
 ],
}
