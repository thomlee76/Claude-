# -*- coding: utf-8 -*-
from _helpers import E, D, N, BUILD, PICK
L = {}

L[11] = {
 "meaning": N("get a drink / get coffee / get something to eat — «взять, выпить, перекусить». Разговорная замена have или drink, почти всегда о совместном действии: предложение сходить куда-то вместе.",
              "'한잔하다, 뭐 좀 먹다'의 의미입니다. 주로 같이 하자고 제안할 때 씁니다."),
 "examples":[
  E("Let's get a drink after work.","Давай после работы выпьем по бокалу.","퇴근하고 한잔하죠."),
  E("Do you want to get coffee sometime?","Не хочешь как-нибудь выпить кофе?","언제 커피 한잔할래요?"),
  E("We got dinner near the office.","Мы поужинали рядом с офисом.","사무실 근처에서 저녁 먹었어요."),
  E("Let's get something to eat first.","Давай сначала перекусим.","일단 뭐 좀 먹죠."),
  E("I'm getting lunch with a client today.","Сегодня у меня обед с клиентом.","오늘 거래처랑 점심 약속 있어요."),
  E("Want to get a beer after the meeting?","Может, по пиву после встречи?","회의 끝나고 맥주 한잔할래요?"),
 ],
 "dialogue":[
  D("A","Long day. Let's get a drink after work.","Тяжёлый день. Давай после работы выпьем.","오늘 길었네요. 퇴근하고 한잔하죠."),
  D("B","I'd love to, but I have an early flight tomorrow.","С удовольствием, но у меня утром рейс.","좋은데, 내일 아침 비행기가 있어서요."),
  D("A","Just one, then. Half an hour.","Тогда по одному. Полчаса.","그럼 딱 한 잔만요. 30분."),
  D("B","All right, you talked me into it.","Ладно, уговорил.","알겠어요, 넘어갔네요.",True),
 ],
 "notes":[
  N("get a drink ≠ пить конкретно алкоголь. Это «зайти куда-то и что-то выпить». Уточнение даёт контекст.",
    "get a drink은 꼭 술을 뜻하지 않습니다. 상황이 결정합니다."),
  N("Let's get… — самое частое приглашение в американской речи. Формальнее: Would you like to join me for…?",
    "Let's get…은 가장 흔한 제안 표현입니다. 격식 있는 자리에서는 Would you like to join me for…?를 씁니다."),
  N("grab — синоним с оттенком «быстро, на ходу»: Let's grab lunch. Уместен на работе.",
    "grab은 '간단히 빨리'라는 뉘앙스를 더합니다."),
 ],
 "quiz":[
  BUILD("Давай сначала перекусим.","일단 뭐 좀 먹죠.","Let's get something to eat first.",["take","eating"]),
  PICK("«Не хочешь как-нибудь выпить кофе?»","'언제 커피 한잔할래요?'는?",
       "Do you want to get coffee sometime?","Do you want to drink coffee sometime?",
       "drink coffee звучит как «употреблять кофе вообще». Приглашение — get coffee.",
       "drink coffee는 습관을 말하는 느낌입니다. 약속 제안은 get coffee입니다."),
 ],
}

L[12] = {
 "meaning": N("Can I get…? — стандартный американский заказ в кафе, баре, ресторане. Дословно «могу я получить», по смыслу — «мне, пожалуйста».",
              "미국식 주문 표현입니다. '~ 주세요'에 해당합니다."),
 "examples":[
  E("Can I get a large Americano?","Можно мне большой американо?","아메리카노 큰 걸로 주세요."),
  E("Can I get the check, please?","Можно счёт, пожалуйста?","계산서 좀 주시겠어요?"),
  E("Can I get that to go?","Можно это с собой?","포장해 주시겠어요?"),
  E("Could I get a table by the window?","Можно столик у окна?","창가 자리로 앉을 수 있을까요?"),
  E("Can I get one more napkin?","Можно ещё одну салфетку?","냅킨 하나만 더 주세요."),
  E("I'll get the same thing.","Мне то же самое.","저도 같은 걸로 할게요."),
 ],
 "dialogue":[
  D("A","Hi, what can I get for you?","Здравствуйте, что вам?","안녕하세요, 뭐 드릴까요?"),
  D("B","Can I get a large Americano?","Можно большой американо?","아메리카노 큰 걸로 주세요."),
  D("A","Hot or iced?","Горячий или со льдом?","따뜻한 걸로요, 아이스로요?"),
  D("B","Iced, please. And can I get that to go?","Со льдом. И можно с собой?","아이스로요. 그리고 포장해 주세요.",True),
 ],
 "notes":[
  N("Can I get…? — США. В Британии привычнее Could I have…? или просто A large Americano, please. Оба варианта вежливы.",
    "미국은 Can I get…?, 영국은 Could I have…?를 선호합니다. 둘 다 공손합니다."),
  N("Could I get… чуть мягче, чем Can I get…. В незнакомом месте или в дорогом ресторане берите could.",
    "could가 can보다 조금 더 정중합니다."),
  N("for here or to go — «здесь или с собой». Британский вариант: eat in or take away.",
    "미국은 for here or to go, 영국은 eat in or take away라고 합니다."),
 ],
 "quiz":[
  BUILD("Можно счёт, пожалуйста?","계산서 좀 주시겠어요?","Can I get the check, please?",["take","bring"]),
  PICK("Заказ в американской кофейне","미국 카페에서 주문할 때",
       "Can I get a large Americano?","I want a large Americano.",
       "I want звучит требовательно. Can I get — нейтральная стандартная формула.",
       "I want은 무례하게 들립니다. Can I get이 표준입니다."),
 ],
}

L[13] = {
 "meaning": N("get back / get home / get there — «добраться, вернуться, доехать». get о перемещении подчёркивает прибытие, а не сам путь.",
              "'도착하다, 돌아오다'의 의미로, 과정이 아니라 도착에 초점이 있습니다."),
 "examples":[
  E("We just got back last night.","Мы только вчера вечером вернулись.","저희 어젯밤에 막 돌아왔어요."),
  E("What time did you get home?","Во сколько ты добрался домой?","몇 시에 집에 들어갔어요?"),
  E("I'll text you when I get there.","Напишу, когда доеду.","도착하면 연락할게요."),
  E("How do I get to the station from here?","Как отсюда добраться до вокзала?","여기서 역까지 어떻게 가요?"),
  E("It took us two hours to get to the airport.","Мы добирались до аэропорта два часа.","공항까지 두 시간 걸렸어요."),
  E("I got in around midnight.","Я приехал около полуночи.","자정쯤 도착했어요."),
 ],
 "dialogue":[
  D("A","How was Almaty?","Как Алматы?","알마티 어땠어요?"),
  D("B","Great. We just got back last night.","Отлично. Мы только вчера вечером вернулись.","좋았어요. 어젯밤에 막 돌아왔어요."),
  D("A","You must be exhausted.","Ты, наверное, вымотался.","많이 피곤하시겠어요."),
  D("B","A little. The flight got in really late.","Немного. Рейс прилетел очень поздно.","좀요. 비행기가 너무 늦게 도착했어요.",True),
 ],
 "notes":[
  N("get home, get there, get here — без предлога. Но get TO the station, get TO work — с to перед конкретным местом.",
    "home, there, here 앞에는 to를 쓰지 않습니다. 구체적 장소 앞에는 to를 씁니다."),
  N("get in — прибыть (о рейсе, поезде, человеке поздно ночью). The flight gets in at six.",
    "get in은 비행기나 기차가 '도착하다'라는 뜻입니다."),
  N("В вашей работе постоянно: I'll get back to you — «я вам отвечу». Это другое значение, не про движение.",
    "I'll get back to you는 '다시 연락드리겠습니다'라는 뜻으로 이동과 무관합니다."),
 ],
 "quiz":[
  BUILD("Напишу, когда доеду.","도착하면 연락할게요.","I'll text you when I get there.",["to","arrive"]),
  PICK("«Во сколько ты добрался домой?»","'몇 시에 집에 들어갔어요?'는?",
       "What time did you get home?","What time did you get to home?",
       "Перед home предлог to не ставится.","home 앞에는 to를 쓰지 않습니다."),
 ],
}

L[14] = {
 "meaning": N("get = понимать, «доходить». Разговорная замена understand, особенно в отрицании: I don't get it.",
              "'이해하다'의 구어 표현으로, 특히 부정문에서 자주 씁니다."),
 "examples":[
  E("I don't get why she's so upset.","Не понимаю, почему она так расстроена.","걔가 왜 그렇게 속상해하는지 모르겠어요."),
  E("Sorry, I didn't get that. Could you repeat it?","Извините, не расслышал. Повторите, пожалуйста.","죄송해요, 못 알아들었어요. 다시 말씀해 주시겠어요?"),
  E("Now I get it.","Теперь понял.","이제 알겠네요."),
  E("I don't get the joke.","Я не понял шутку.","그 농담을 이해 못 했어요."),
  E("Do you get what I mean?","Понимаешь, о чём я?","무슨 말인지 아시겠어요?"),
  E("He never gets my point.","Он никогда не улавливает мою мысль.","그 사람은 제 요지를 못 알아들어요."),
 ],
 "dialogue":[
  D("A","Mina left the meeting early and didn't say anything.","Мина рано ушла с совещания и ничего не сказала.","미나 씨가 회의 중간에 나가서 아무 말도 안 했어요."),
  D("B","I don't get why she's so upset.","Не понимаю, почему она так расстроена.","걔가 왜 그렇게 속상해하는지 모르겠어요."),
  D("A","Her proposal got rejected again.","Её предложение снова отклонили.","제안서가 또 반려됐대요."),
  D("B","Ah, now I get it.","А, теперь понятно.","아, 이제 알겠네요.",True),
 ],
 "notes":[
  N("I didn't get that — вежливее, чем I didn't understand. На созвоне с плохой связью это стандартная фраза.",
    "I didn't get that가 I didn't understand보다 부드럽습니다. 화상회의에서 자주 씁니다."),
  N("get в значении «понимать» не ставится в Continuous: I'm not getting it ✗ → I don't get it ✓",
    "'이해하다'의 get은 진행형으로 쓰지 않습니다."),
  N("You got it — «понял / сделаю». Короткий деловой ответ на просьбу.",
    "You got it은 '알겠습니다'라는 짧은 응답입니다."),
 ],
 "quiz":[
  BUILD("Понимаешь, о чём я?","무슨 말인지 아시겠어요?","Do you get what I mean?",["are","getting"]),
  PICK("«Я не понимаю»","'이해가 안 돼요'는?",
       "I don't get it.","I'm not getting it.",
       "Понимание — состояние, а не процесс, поэтому Continuous не подходит.",
       "이해는 상태이므로 진행형을 쓰지 않습니다."),
 ],
}

L[15] = {
 "meaning": N("get + прилагательное = «становиться». Описывает изменение состояния: get tired, get cold, get better, get rusty. Разговорная замена become.",
              "get + 형용사는 '~해지다'라는 변화를 나타냅니다. become의 구어 표현입니다."),
 "examples":[
  E("I feel like my English is getting rusty.","Чувствую, что мой английский начинает ржаветь.","영어가 점점 녹스는 것 같아요."),
  E("It's getting cold. Let's go inside.","Холодает. Пойдём внутрь.","추워지네요. 안으로 들어가죠."),
  E("I get tired around three every day.","Каждый день часам к трём я устаю.","매일 세 시쯤 되면 피곤해져요."),
  E("Don't worry, it gets easier.","Не волнуйся, дальше будет проще.","걱정 마세요, 점점 쉬워져요."),
  E("The situation is getting complicated.","Ситуация усложняется.","상황이 복잡해지고 있어요."),
  E("She's getting better at presentations.","У неё всё лучше получаются презентации.","발표 실력이 점점 늘고 있어요."),
 ],
 "dialogue":[
  D("A","Do you still use English at work?","Ты ещё пользуешься английским на работе?","아직 회사에서 영어 쓰세요?"),
  D("B","Less than before. I feel like my English is getting rusty.","Меньше, чем раньше. Чувствую, что он ржавеет.","예전보다는 덜 써요. 영어가 점점 녹스는 것 같아요."),
  D("A","Maybe try a conversation class.","Может, сходить на разговорные занятия.","회화 수업 한번 들어 보세요."),
  D("B","I've been thinking about it, actually.","Вообще-то, как раз думаю об этом.","안 그래도 생각 중이었어요.",True),
 ],
 "notes":[
  N("get + прилагательное = изменение. be + прилагательное = состояние. I'm tired — устал сейчас. I get tired — устаю регулярно.",
    "get은 변화, be는 상태입니다."),
  N("get better — универсально: о здоровье, о навыке, о ситуации. get worse — противоположность.",
    "get better는 건강, 실력, 상황 모두에 씁니다."),
  N("become звучит книжно. В разговоре почти всегда get: It's getting late, а не It's becoming late.",
    "become은 문어적입니다. 구어에서는 get을 씁니다."),
 ],
 "quiz":[
  BUILD("Не волнуйся, дальше будет проще.","걱정 마세요, 점점 쉬워져요.","Don't worry, it gets easier.",["becomes","more easy"]),
  PICK("«Холодает»","'추워지네요'는?",
       "It's getting cold.","It's becoming cold.",
       "В разговоре изменение состояния — это get. become звучит книжно.",
       "구어에서 변화는 get으로 말합니다."),
 ],
}

L[16] = {
 "meaning": N("get + симптом или болезнь = «заболевать, получать». get a headache, get a cold, get a fever. Речь о появлении, а не о наличии.",
              "get + 증상은 '~가 생기다, ~에 걸리다'입니다. 이미 있는 상태가 아니라 발생에 초점이 있습니다."),
 "examples":[
  E("I get a headache if I don't drink coffee.","Если я не выпью кофе, у меня болит голова.","커피를 안 마시면 머리가 아파요."),
  E("I think I'm getting a cold.","Кажется, я простужаюсь.","감기 기운이 있는 것 같아요."),
  E("She gets carsick on long drives.","Её укачивает в долгих поездках.","걔는 장거리 차 타면 멀미해요."),
  E("I got food poisoning in Bangkok.","Я отравился в Бангкоке.","방콕에서 식중독에 걸렸어요."),
  E("Do you get jet lag easily?","Ты тяжело переносишь смену часовых поясов?","시차 적응 많이 힘드세요?"),
  E("My back gets sore after long flights.","После долгих перелётов у меня болит спина.","장거리 비행 후에는 허리가 아파요."),
 ],
 "dialogue":[
  D("A","You've had three cups already.","Ты уже выпил три чашки.","벌써 세 잔째네요."),
  D("B","I get a headache if I don't drink coffee.","Если не выпью кофе, у меня болит голова.","커피를 안 마시면 머리가 아파요."),
  D("A","That sounds like a dependency.","Похоже на зависимость.","그거 중독 같은데요."),
  D("B","Probably. I should cut back.","Наверное. Надо сокращать.","그러게요. 좀 줄여야겠어요.",True),
 ],
 "notes":[
  N("get a headache — голова начинает болеть. have a headache — уже болит. Разница важная.",
    "get a headache는 '생기다', have a headache는 '이미 아프다'입니다."),
  N("get + болезнь: get a cold, get the flu, get food poisoning. Артикль запоминается со словом.",
    "질병마다 관사가 정해져 있으니 통째로 외우세요."),
  N("jet lag — без артикля: I have jet lag. При вашем графике перелётов пригодится ежемесячно.",
    "jet lag은 관사 없이 씁니다."),
 ],
 "quiz":[
  BUILD("Кажется, я простужаюсь.","감기 기운이 있는 것 같아요.","I think I'm getting a cold.",["the","have"]),
  PICK("«Голова начинает болеть, если не выпью кофе»","'커피를 안 마시면 머리가 아파요'는?",
       "I get a headache if I don't drink coffee.","I have a headache if I don't drink coffee.",
       "Речь о том, что боль появляется. Появление — get, наличие — have.",
       "통증이 '생기는' 것이므로 get을 씁니다."),
 ],
}

L[17] = {
 "meaning": N("get + объект + место = «доставить, довезти, дотащить». Подразумевается усилие: не просто переместить, а справиться с этим.",
              "get + 목적어 + 장소는 '~를 ~까지 옮기다'입니다. 수고가 든다는 뉘앙스가 있습니다."),
 "examples":[
  E("I need to get these groceries home.","Мне нужно довезти эти продукты до дома.","이 장 본 것들 집까지 가져가야 해요."),
  E("Can you get this box upstairs?","Можешь занести эту коробку наверх?","이 상자 좀 위층으로 옮겨 주실래요?"),
  E("We need to get the samples to Almaty by Friday.","Образцы нужно доставить в Алматы к пятнице.","샘플을 금요일까지 알마티로 보내야 해요."),
  E("How are we getting all this to the venue?","Как мы всё это довезём до площадки?","이걸 다 행사장까지 어떻게 가져가죠?"),
  E("I'll get the documents to you by tonight.","Документы будут у вас к вечеру.","서류는 오늘 밤까지 보내 드릴게요."),
  E("Let me get you a chair.","Сейчас принесу вам стул.","의자 하나 가져다 드릴게요."),
 ],
 "dialogue":[
  D("A","That's a lot of bags.","Много пакетов.","짐이 많네요."),
  D("B","I know. I need to get these groceries home somehow.","Да. Надо как-то довезти всё это до дома.","그러게요. 이걸 어떻게든 집까지 가져가야 하는데."),
  D("A","My car's right there. I'll give you a ride.","Моя машина рядом. Подвезу.","제 차 바로 저기 있어요. 태워 드릴게요."),
  D("B","You're a lifesaver.","Ты меня спас.","정말 감사해요.",True),
 ],
 "notes":[
  N("get X to Y — рабочая формула: get the samples to the customs broker, get the report to the director.",
    "get X to Y는 업무에서 자주 쓰는 구조입니다."),
  N("I'll get the documents to you by tonight — вежливее и живее, чем I will send the documents.",
    "I'll get ~ to you가 I will send보다 자연스럽습니다."),
  N("Let me get you… — «сейчас принесу». Стандартная фраза хозяина или принимающей стороны.",
    "Let me get you…는 손님을 맞을 때 쓰는 표현입니다."),
 ],
 "quiz":[
  BUILD("Документы будут у вас к вечеру.","서류는 오늘 밤까지 보내 드릴게요.","I'll get the documents to you by tonight.",["send","until"]),
  PICK("«Образцы нужно доставить к пятнице»","'샘플을 금요일까지 보내야 해요'는?",
       "We need to get the samples there by Friday.","We need to get the samples there until Friday.",
       "Срок «не позже чем» — by. until означает «вплоть до», то есть непрерывно.",
       "기한은 by, 지속은 until입니다."),
 ],
}

L[18] = {
 "meaning": N("Место или предмет + get = «получать» свет, дождь, посетителей, сигнал. Подлежащее неодушевлённое, действие приходит извне.",
              "장소나 사물이 주어가 되어 햇빛, 비, 손님, 신호 등을 '받다'라는 뜻입니다."),
 "examples":[
  E("This area doesn't get much sunshine.","В этом районе мало солнца.","이 동네는 햇빛이 잘 안 들어요."),
  E("The shop gets a lot of foot traffic on weekends.","В выходные у магазина большая проходимость.","주말에는 그 가게에 사람이 많이 다녀요."),
  E("We don't get much snow here.","Снега у нас тут немного.","여기는 눈이 많이 안 와요."),
  E("My phone doesn't get any signal in the basement.","В подвале телефон не ловит.","지하에서는 휴대폰이 안 터져요."),
  E("The north side gets cold in winter.","Северная сторона зимой промерзает.","북쪽은 겨울에 추워요."),
  E("Our booth got a lot of visitors this year.","В этом году у нашего стенда было много посетителей.","올해 저희 부스에 방문객이 많았어요."),
 ],
 "dialogue":[
  D("A","The rent here is surprisingly cheap.","Аренда здесь неожиданно дешёвая.","여기 월세가 의외로 싸네요."),
  D("B","There's a reason. This area doesn't get much sunshine.","Есть причина. В этом районе мало солнца.","이유가 있죠. 이 동네는 햇빛이 잘 안 들어요."),
  D("A","I hadn't thought about that.","Об этом я не подумал.","그건 생각 못 했네요."),
  D("B","Come back at noon and you'll see.","Зайди в полдень и сам увидишь.","낮 열두 시에 다시 와 보면 알 거예요.",True),
 ],
 "notes":[
  N("Русское «сюда не попадает солнце» → This area doesn't get much sunshine. Место становится подлежащим.",
    "장소를 주어로 삼는 것이 영어식 표현입니다."),
  N("get signal / get reception — «ловить связь». I don't get any signal here.",
    "휴대폰 신호는 get signal이라고 합니다."),
  N("foot traffic — проходимость, поток людей. Полезно при обсуждении точек продаж.",
    "foot traffic은 '유동 인구'입니다. 매장 입지 얘기에 씁니다."),
 ],
 "quiz":[
  BUILD("В подвале телефон не ловит.","지하에서는 휴대폰이 안 터져요.","My phone doesn't get any signal in the basement.",["some","catch"]),
  PICK("«В этом районе мало солнца»","'이 동네는 햇빛이 잘 안 들어요'는?",
       "This area doesn't get much sunshine.","In this area there is not much sunshine.",
       "Второй вариант грамматически верен, но звучит как перевод. Носитель делает место подлежащим.",
       "둘째 문장도 틀리진 않지만 번역투입니다."),
 ],
}

L[19] = {
 "meaning": N("get somebody something — «достать, взять кому-то». Двойное дополнение: сначала кому, потом что. Часто о заботе или услуге.",
              "get + 사람 + 사물은 '~에게 ~를 구해 주다'입니다."),
 "examples":[
  E("We got you a spot next to us.","Мы заняли тебе место рядом с нами.","우리 옆에 자리 맡아 놨어요."),
  E("Let me get you a coffee.","Давай я принесу тебе кофе.","제가 커피 한잔 사 올게요."),
  E("I got my wife flowers for our anniversary.","Я купил жене цветы на годовщину.","기념일이라 아내한테 꽃을 사 줬어요."),
  E("Can you get me a copy of the contract?","Можешь достать мне копию договора?","계약서 사본 좀 구해 주실 수 있어요?"),
  E("They got us two extra tickets.","Они достали нам два лишних билета.","표를 두 장 더 구해 줬어요."),
  E("I'll get you the numbers by Monday.","Цифры пришлю вам к понедельнику.","숫자는 월요일까지 드릴게요."),
 ],
 "dialogue":[
  D("A","Sorry I'm late. Is it packed?","Извини, опоздал. Там битком?","늦어서 미안해요. 사람 많아요?"),
  D("B","Don't worry, we got you a spot next to us.","Не волнуйся, мы заняли тебе место рядом.","걱정 마세요, 우리 옆에 자리 맡아 놨어요."),
  D("A","You're the best.","Вы лучшие.","최고예요."),
  D("B","Just hurry, it's starting.","Давай быстрее, уже начинается.","빨리 와요, 시작해요.",True),
 ],
 "notes":[
  N("Порядок: get + кому + что. Без предлога. get me a copy, а не get a copy to me.",
    "get + 사람 + 사물 순서로, 전치사를 쓰지 않습니다."),
  N("Если поменять порядок, нужен предлог for: I got a spot for you. Смысл тот же, звучит чуть формальнее.",
    "순서를 바꾸면 for가 필요합니다."),
  N("Can you get me…? в офисе — обычная просьба, не грубость. Для смягчения добавьте please или could.",
    "사무실에서 Can you get me…?는 무례하지 않습니다. could나 please를 붙이면 더 부드럽습니다."),
 ],
 "quiz":[
  BUILD("Можешь достать мне копию договора?","계약서 사본 좀 구해 주실 수 있어요?","Can you get me a copy of the contract?",["to","for"]),
  PICK("«Давай я принесу тебе кофе»","'제가 커피 한잔 사 올게요'는?",
       "Let me get you a coffee.","Let me get a coffee to you.",
       "При порядке «кому — что» предлог не нужен.","사람이 먼저 오면 전치사를 쓰지 않습니다."),
 ],
}

L[20] = {
 "meaning": N("get + объект + причастие прошедшего времени = «сделать так, чтобы что-то сделали». Вы не делаете сами — вам делают: стрижка, покраска, ремонт, проверка.",
              "get + 목적어 + 과거분사는 '~를 ~되게 하다'입니다. 내가 아니라 남이 해 주는 것입니다."),
 "examples":[
  E("I got my hair dyed yesterday.","Я вчера покрасил волосы.","어제 머리 염색했어요."),
  E("I need to get my car fixed.","Мне нужно починить машину.","차 수리 맡겨야 해요."),
  E("We got the contract translated into Russian.","Мы перевели договор на русский.","계약서를 러시아어로 번역했어요."),
  E("Did you get the samples cleared through customs?","Образцы прошли таможню?","샘플 통관은 됐어요?"),
  E("I'm getting my apartment painted this weekend.","На выходных мне красят квартиру.","이번 주말에 집 페인트칠해요."),
  E("You should get that checked by a doctor.","Тебе стоит показать это врачу.","그거 병원에서 한번 봐 보세요."),
 ],
 "dialogue":[
  D("A","Your hair looks different.","У тебя причёска изменилась.","머리 좀 달라 보이는데요."),
  D("B","I got my hair dyed yesterday.","Я вчера покрасилась.","어제 머리 염색했어요."),
  D("A","It suits you.","Тебе идёт.","잘 어울려요."),
  D("B","Thanks. I wasn't sure about the color.","Спасибо. Я сомневалась насчёт цвета.","고마워요. 색깔이 좀 걱정됐거든요.",True),
 ],
 "notes":[
  N("I got my hair dyed — покрасили мне. I dyed my hair — покрасил сам. Разница принципиальная.",
    "got my hair dyed는 남이 해 준 것, dyed my hair는 내가 한 것입니다."),
  N("have можно вместо get: I had my car fixed. get разговорнее, have чуть формальнее. Смысл один.",
    "have로 바꿔도 됩니다. get이 더 구어적입니다."),
  N("В работе очень удобно: get the documents notarized, get the shipment cleared, get the quote approved.",
    "업무에서 자주 쓰는 구조입니다."),
 ],
 "quiz":[
  BUILD("Мне нужно починить машину.","차 수리 맡겨야 해요.","I need to get my car fixed.",["fix","fixing"]),
  PICK("Вы отдали машину в сервис. Как сказать?","정비소에 차를 맡겼습니다. 어떻게 말할까요?",
       "I got my car fixed.","I got my car fix.",
       "После объекта идёт причастие прошедшего времени, а не инфинитив.",
       "목적어 뒤에는 과거분사가 옵니다."),
 ],
}
