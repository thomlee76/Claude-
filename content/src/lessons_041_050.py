# -*- coding: utf-8 -*-
from _helpers import E, D, N, BUILD, PICK
L = {}

L[41] = {
 "meaning": N("go + прилагательное = «перейти в плохое состояние». Экран погас, молоко скисло, связь пропала. Почти всегда о нежелательном изменении.",
              "go + 형용사는 보통 '나쁜 상태로 바뀌다'입니다. 화면이 꺼지거나 음식이 상하는 경우입니다."),
 "examples":[
  E("The screen went dark for some reason.","Экран почему-то погас.","화면이 갑자기 꺼졌어요."),
  E("The milk went bad.","Молоко испортилось.","우유가 상했어요."),
  E("My phone went dead in the middle of the call.","Телефон сел прямо посреди разговора.","통화 중에 휴대폰이 꺼졌어요."),
  E("The line went quiet.","На линии стало тихо.","전화가 조용해졌어요."),
  E("He went pale when he heard the number.","Он побледнел, когда услышал цифру.","금액 듣고 얼굴이 하얘졌어요."),
  E("The whole system went down yesterday.","Вчера вся система легла.","어제 시스템 전체가 다운됐어요."),
 ],
 "dialogue":[
  D("A","Were you on the call? You disappeared.","Ты был на созвоне? Ты пропал.","통화에 계셨어요? 갑자기 사라지셔서."),
  D("B","The screen went dark for some reason.","Экран почему-то погас.","화면이 갑자기 꺼졌어요."),
  D("A","Did you restart it?","Перезагружал?","재부팅해 봤어요?"),
  D("B","Twice. I think it's the battery.","Дважды. Думаю, дело в батарее.","두 번이나요. 배터리 문제인 것 같아요.",True),
 ],
 "notes":[
  N("get + прилагательное — нейтральное изменение (get cold). go + прилагательное — обычно к худшему (go bad, go dark, go blind).",
    "get은 중립적 변화, go는 대개 나쁜 쪽으로의 변화입니다."),
  N("Исключения есть: go green (перейти на экологичное), go digital. Здесь go = «перейти на новый режим».",
    "go green처럼 '전환하다'의 뜻도 있습니다."),
  N("go down — «упасть, выйти из строя» о системах и серверах. The server went down. Полезно в переписке с IT.",
    "시스템이 멈출 때는 go down이라고 합니다."),
 ],
 "quiz":[
  BUILD("Молоко испортилось.","우유가 상했어요.","The milk went bad.",["got","became"]),
  PICK("«Телефон сел посреди разговора»","'통화 중에 휴대폰이 꺼졌어요'는?",
       "My phone went dead during the call.","My phone became dead during the call.",
       "become здесь не употребляется. Устойчиво — go dead.",
       "go dead로 굳어진 표현입니다."),
 ],
}

L[42] = {
 "meaning": N("go = «класться, храниться где-то». О месте, где вещь должна лежать по правилам или по порядку.",
              "'~에 들어간다, 놓인다'라는 뜻으로, 물건의 제자리를 말합니다."),
 "examples":[
  E("Food trash goes in this yellow bag.","Пищевые отходы — в этот жёлтый пакет.","음식물 쓰레기는 이 노란 봉투에 넣으면 돼요."),
  E("Where do the towels go?","Куда класть полотенца?","수건은 어디에 넣어요?"),
  E("These files go in the cabinet on the left.","Эти папки — в шкаф слева.","이 서류는 왼쪽 캐비닛에 넣으면 돼요."),
  E("The signature goes at the bottom of page two.","Подпись ставится внизу второй страницы.","서명은 2페이지 맨 아래에 하시면 됩니다."),
  E("Glass goes in the blue bin.","Стекло — в синий контейнер.","유리는 파란 통에 버려요."),
  E("That doesn't go there.","Это кладётся не туда.","그건 거기에 두는 게 아니에요."),
 ],
 "dialogue":[
  D("A","I'm never sure about the recycling here.","Я всё время путаюсь с раздельным сбором.","여기 분리수거가 늘 헷갈려요."),
  D("B","Food trash goes in this yellow bag.","Пищевые отходы — в этот жёлтый пакет.","음식물 쓰레기는 이 노란 봉투에 넣으면 돼요."),
  D("A","And the plastic?","А пластик?","플라스틱은요?"),
  D("B","Rinse it first, then the clear one.","Сначала сполосни, потом в прозрачный.","헹궈서 투명한 봉투에 넣으세요.",True),
 ],
 "notes":[
  N("Подлежащее — вещь, глагол в настоящем простом: The knives go in this drawer. Это правило, а не разовое действие.",
    "물건이 주어가 되고 현재형을 씁니다. 규칙을 말하기 때문입니다."),
  N("Where does this go? — самая удобная фраза в чужой кухне, на складе, в новом офисе.",
    "낯선 곳에서 물건 둘 자리를 물을 때 쓰는 표현입니다."),
  N("В документах: The signature goes here — «подпись ставится здесь». Естественнее, чем You must sign here.",
    "서류에서 '여기에 서명하시면 됩니다'라는 뜻으로 씁니다."),
 ],
 "quiz":[
  BUILD("Куда класть полотенца?","수건은 어디에 넣어요?","Where do the towels go?",["are going","put"]),
  PICK("«Эти папки — в шкаф слева»","'이 서류는 왼쪽 캐비닛에 넣으면 돼요'는?",
       "These files go in the cabinet on the left.","These files are going in the cabinet on the left.",
       "Это постоянное правило, значит Present Simple.",
       "규칙이므로 현재형을 씁니다."),
 ],
}

L[43] = {
 "meaning": N("want = «хотеть». Прямое желание. Do you want…? — предложение помощи, не грубость, если интонация дружелюбная.",
              "'원하다'입니다. Do you want…?는 도움을 제안할 때도 씁니다."),
 "examples":[
  E("Do you want a ride to the station?","Подвезти тебя до вокзала?","역까지 태워다 줄까요?"),
  E("I want to be clear about the deadline.","Хочу прояснить вопрос со сроком.","기한에 대해 확실히 하고 싶습니다."),
  E("Do you want me to send it again?","Хотите, я пришлю ещё раз?","다시 보내 드릴까요?"),
  E("She doesn't want to talk about it.","Она не хочет об этом говорить.","그 얘기는 하기 싫어해요."),
  E("What time do you want to meet?","Во сколько встретимся?","몇 시에 만나고 싶으세요?"),
  E("You don't want to miss that flight.","Этот рейс лучше не пропускать.","그 비행기는 놓치면 안 돼요."),
 ],
 "dialogue":[
  D("A","My meeting ran long. I'll never catch the train.","Встреча затянулась. На поезд я не успею.","회의가 길어져서 기차를 못 탈 것 같아요."),
  D("B","Do you want a ride to the station?","Подвезти тебя до вокзала?","역까지 태워다 줄까요?"),
  D("A","Are you sure? It's out of your way.","Точно? Это тебе не по пути.","괜찮으세요? 가는 길도 아닌데."),
  D("B","It's five minutes. Get in.","Пять минут. Садись.","5분이면 돼요. 타세요.",True),
 ],
 "notes":[
  N("Do you want me to…? — самый естественный способ предложить помощь. Вежливее: Would you like me to…?",
    "도움을 제안할 때 가장 자연스러운 표현입니다."),
  N("I want you to… звучит как приказ. В деловой переписке замените на I'd like you to… или Could you…?",
    "I want you to는 명령처럼 들립니다. 업무에서는 바꿔 쓰세요."),
  N("You don't want to… — это не «ты не хочешь», а предупреждение: «лучше не надо». You don't want to be late.",
    "You don't want to…는 '~하지 않는 게 좋다'는 경고입니다."),
 ],
 "quiz":[
  BUILD("Хотите, я пришлю ещё раз?","다시 보내 드릴까요?","Do you want me to send it again?",["that I","sending"]),
  PICK("Просьба к партнёру в письме","거래처에 보내는 메일에서",
       "I'd like you to confirm the quantity.","I want you to confirm the quantity.",
       "I want you to в письме звучит как приказ. I'd like — деловой стандарт.",
       "I want you to는 명령조입니다."),
 ],
}

L[44] = {
 "meaning": N("say с неодушевлённым подлежащим = «гласить, быть написанным». Так говорят про сайт, письмо, табличку, инструкцию.",
              "사물이 주어일 때 say는 '~라고 쓰여 있다'입니다."),
 "examples":[
  E("The website says the item is out of stock.","На сайте написано, что товара нет в наличии.","사이트에 품절이라고 나와 있어요."),
  E("The sign says no parking.","На знаке написано, что парковка запрещена.","표지판에 주차 금지라고 되어 있어요."),
  E("What does the contract say about penalties?","Что в договоре сказано о штрафах?","계약서에 위약금 관련해서 뭐라고 되어 있어요?"),
  E("The label says made in Korea.","На этикетке написано «сделано в Корее».","라벨에 한국산이라고 적혀 있어요."),
  E("My ticket says gate 14.","В моём билете указан гейт 14.","제 티켓에는 14번 게이트라고 되어 있어요."),
  E("The email says they need it by Friday.","В письме сказано, что нужно к пятнице.","메일에 금요일까지 필요하다고 되어 있어요."),
 ],
 "dialogue":[
  D("A","Did you order the replacement part?","Ты заказал запчасть?","교체 부품 주문했어요?"),
  D("B","I tried. The website says the item is out of stock.","Пытался. На сайте написано, что его нет.","하려고 했는데, 사이트에 품절이라고 나와 있어요."),
  D("A","Call them directly. Sometimes they have stock.","Позвони напрямую. Иногда у них есть.","직접 전화해 보세요. 있을 때도 있어요."),
  D("B","I'll do that in the morning.","Утром позвоню.","아침에 해 볼게요.",True),
 ],
 "notes":[
  N("Русское «здесь написано» → it says, а не it is written. Английский делает документ говорящим.",
    "한국어의 '~라고 적혀 있다'는 영어로 it says입니다."),
  N("What does it say? — про любой текст: смс, вывеску, инструкцию, показания прибора.",
    "어떤 텍스트에 대해서든 쓸 수 있습니다."),
  N("Очень полезно при работе с договорами: The contract says… — нейтрально ссылается на документ, не на человека.",
    "계약서를 인용할 때 사람을 지목하지 않아 유용합니다."),
 ],
 "quiz":[
  BUILD("Что в договоре сказано о штрафах?","계약서에 위약금 관련해서 뭐라고 되어 있어요?","What does the contract say about penalties?",["is written","tell"]),
  PICK("«На сайте написано, что товара нет»","'사이트에 품절이라고 나와 있어요'는?",
       "The website says the item is out of stock.","On the website is written that the item is out of stock.",
       "Носитель делает сам сайт подлежащим и ставит say.",
       "영어는 사이트를 주어로 삼습니다."),
 ],
}

L[45] = {
 "meaning": N("Let me + глагол = «давай я, позвольте мне». Вежливое предложение сделать что-то самому. Основа делового этикета.",
              "Let me + 동사원형은 '제가 ~할게요'라는 정중한 제안입니다."),
 "examples":[
  E("Let me walk you out.","Давайте я вас провожу.","제가 배웅해 드릴게요."),
  E("Let me check and get back to you.","Позвольте уточнить, и я вам отвечу.","확인해 보고 다시 연락드릴게요."),
  E("Let me know if you need anything.","Дайте знать, если что-то понадобится.","필요한 거 있으면 말씀하세요."),
  E("Let me introduce our technical director.","Позвольте представить нашего технического директора.","저희 기술이사님을 소개하겠습니다."),
  E("Let me get that for you.","Давайте я это возьму.","제가 들어 드릴게요."),
  E("Let me think about it.","Дайте подумать.","좀 생각해 볼게요."),
 ],
 "dialogue":[
  D("A","Thank you for your time today.","Спасибо за уделённое время.","오늘 시간 내 주셔서 감사합니다."),
  D("B","My pleasure. Let me walk you out.","Не за что. Давайте я вас провожу.","별말씀을요. 제가 배웅해 드릴게요."),
  D("A","You don't have to.","Не стоит.","안 그러셔도 되는데요."),
  D("B","The elevator's confusing. I insist.","С лифтом легко запутаться. Настаиваю.","엘리베이터가 좀 헷갈려서요. 제가 모시겠습니다.",True),
 ],
 "notes":[
  N("Let me — глагол без to: Let me check, не Let me to check.",
    "Let me 뒤에는 to 없이 동사원형이 옵니다."),
  N("Let me check and get back to you — универсальный ответ, когда вы не знаете ответа прямо сейчас. Запомните целиком.",
    "즉답할 수 없을 때 쓰는 만능 표현입니다."),
  N("Let's = let us, но смысл другой: Let's go — «пойдём вместе». Let me go — «позволь мне уйти».",
    "Let's와 Let me는 뜻이 다릅니다."),
 ],
 "quiz":[
  BUILD("Позвольте уточнить, и я вам отвечу.","확인해 보고 다시 연락드릴게요.","Let me check and get back to you.",["to check","answer"]),
  PICK("«Давайте я вас провожу»","'제가 배웅해 드릴게요'는?",
       "Let me walk you out.","Let me to walk you out.",
       "После let инфинитив без to.","let 뒤에는 to를 쓰지 않습니다."),
 ],
}

L[46] = {
 "meaning": N("let somebody do = «позволить, дать возможность». Уже не о себе, а о разрешении другому человеку.",
              "let + 사람 + 동사원형은 '~가 ~하게 두다, 허락하다'입니다."),
 "examples":[
  E("Could you let me finish my sentence, please?","Дайте мне, пожалуйста, договорить.","제 말 좀 끝까지 들어 주시겠어요?"),
  E("My parents didn't let me study abroad.","Родители не разрешили мне учиться за границей.","부모님이 유학을 안 보내 주셨어요."),
  E("Let him try it his way first.","Пусть сначала попробует по-своему.","일단 자기 방식대로 해 보게 두세요."),
  E("They won't let us into the building without a pass.","Нас не пустят в здание без пропуска.","출입증 없이는 건물에 못 들어가요."),
  E("Let me know as soon as you hear anything.","Сообщите, как только что-то узнаете.","소식 들으시는 대로 알려 주세요."),
  E("Don't let this hold up the shipment.","Не давайте этому задержать отгрузку.","이것 때문에 출고가 지연되지 않게 해 주세요."),
 ],
 "dialogue":[
  D("A","But the numbers clearly show that…","Но цифры явно показывают, что…","근데 숫자를 보면 분명히…"),
  D("B","Could you let me finish my sentence, please?","Дайте мне, пожалуйста, договорить.","제 말 좀 끝까지 들어 주시겠어요?"),
  D("A","Sorry. Go ahead.","Извините. Продолжайте.","죄송해요. 말씀하세요."),
  D("B","Thank you. As I was saying…","Спасибо. Так вот, как я говорил…","감사합니다. 아까 말씀드린 대로…",True),
 ],
 "notes":[
  N("let = позволить (нейтрально), allow = разрешить (формально), permit = официально допустить. В речи почти всегда let.",
    "구어에서는 allow나 permit보다 let을 씁니다."),
  N("У let нет пассива: I was let to go ✗. Вместо этого I was allowed to go.",
    "let은 수동태가 없습니다. allowed를 씁니다."),
  N("Could you let me finish? — редкая фраза, которая позволяет жёстко остановить собеседника, оставаясь вежливым.",
    "예의를 지키면서 상대를 멈출 수 있는 표현입니다."),
 ],
 "quiz":[
  BUILD("Пусть сначала попробует по-своему.","일단 자기 방식대로 해 보게 두세요.","Let him try it his way first.",["to try","trying"]),
  PICK("«Мне разрешили уйти пораньше»","'일찍 퇴근해도 된다고 했어요'는?",
       "I was allowed to leave early.","I was let to leave early.",
       "У let нет пассивной формы, в пассиве используется allow.",
       "let은 수동태가 없어 allowed를 씁니다."),
 ],
}

L[47] = {
 "meaning": N("let somebody or something + глагол в значении «допустить, дать чему-то повлиять на себя». Часто в отрицании: не позволяй.",
              "'~가 나에게 영향을 미치게 두다'라는 뜻으로, 주로 부정문에서 씁니다."),
 "examples":[
  E("I can't let nasty comments discourage me.","Не могу позволить злым комментариям меня сломить.","악플 때문에 위축되지 않으려고요."),
  E("Don't let it get to you.","Не принимай близко к сердцу.","너무 신경 쓰지 마세요."),
  E("I won't let one bad quarter define us.","Я не дам одному плохому кварталу определить нас.","분기 한 번 안 좋았다고 회사가 결정되진 않아요."),
  E("Don't let him talk you into it.","Не давай ему себя уговорить.","그 사람 말에 넘어가지 마세요."),
  E("She let the opportunity slip away.","Она упустила возможность.","기회를 놓쳐 버렸어요."),
  E("Let's not let this drag on.","Давайте не будем это затягивать.","이 건 질질 끌지 맙시다."),
 ],
 "dialogue":[
  D("A","Have you seen what they wrote under your post?","Видел, что написали под твоим постом?","글에 달린 댓글 봤어요?"),
  D("B","I did. I can't let nasty comments discourage me.","Видел. Не могу позволить злым комментариям меня сломить.","봤어요. 악플 때문에 위축되지 않으려고요."),
  D("A","That's a healthy attitude.","Здоровый подход.","건강한 태도네요."),
  D("B","It took a few years to get here.","К этому я шёл несколько лет.","몇 년 걸려서 겨우 이렇게 됐어요.",True),
 ],
 "notes":[
  N("Don't let it get to you — одна из самых полезных фраз поддержки. Дословно «не давай этому до тебя добраться».",
    "위로할 때 가장 유용한 표현 중 하나입니다."),
  N("let something slip — упустить, проговориться. Два значения, различает контекст.",
    "let something slip은 '놓치다'와 '무심코 말하다' 두 뜻이 있습니다."),
  N("Let's not let this drag on — мягкий способ поторопить партнёра в переговорах, не обвиняя его.",
    "상대를 탓하지 않고 재촉하는 표현입니다."),
 ],
 "quiz":[
  BUILD("Не давай ему себя уговорить.","그 사람 말에 넘어가지 마세요.","Don't let him talk you into it.",["to talk","talking"]),
  PICK("«Не принимай близко к сердцу»","'너무 신경 쓰지 마세요'는?",
       "Don't let it get to you.","Don't let it to get to you.",
       "После let — инфинитив без to.","let 뒤에는 to를 쓰지 않습니다."),
 ],
}

L[48] = {
 "meaning": N("give + человек + ощущение = «вызывать». Подлежащее — причина, дополнение — тот, кто чувствует. Работает с эмоциями и физическими ощущениями.",
              "give + 사람 + 감정/느낌은 '~하게 만들다'입니다. 주어가 원인입니다."),
 "examples":[
  E("This song gives me chills.","От этой песни у меня мурашки.","이 노래 들으면 소름 돋아요."),
  E("Loud offices give me a headache.","От шумных офисов у меня болит голова.","시끄러운 사무실에 있으면 머리가 아파요."),
  E("His tone gave me a bad feeling.","Его тон вызвал у меня плохое предчувствие.","그 사람 말투가 좀 불길했어요."),
  E("That gives me an idea.","Это наводит меня на мысль.","그 말 들으니 아이디어가 떠오르네요."),
  E("The delay gave us a real headache.","Задержка доставила нам серьёзные хлопоты.","지연 때문에 아주 골치 아팠어요."),
  E("Give me a second.","Секунду.","잠깐만요."),
 ],
 "dialogue":[
  D("A","What are you listening to?","Что слушаешь?","뭐 듣고 있어요?"),
  D("B","An old recording. This song gives me chills every time.","Старую запись. От этой песни каждый раз мурашки.","옛날 녹음이요. 이 노래는 들을 때마다 소름 돋아요."),
  D("A","Send it to me.","Скинь мне.","저한테도 보내 주세요."),
  D("B","Listen to it with headphones.","Слушай в наушниках.","이어폰으로 들어 보세요.",True),
 ],
 "notes":[
  N("give me chills — может быть и восторг, и страх. Контекст решает.",
    "give me chills는 감동일 수도, 공포일 수도 있습니다."),
  N("give somebody a headache — и буквально, и переносно: «доставить хлопот». В работе второе значение частое.",
    "실제 두통과 '골치 아프게 하다' 둘 다 됩니다."),
  N("Give me a second / Give me a minute — «подождите». Естественнее, чем Please wait.",
    "Please wait보다 자연스러운 표현입니다."),
 ],
 "quiz":[
  BUILD("От шумных офисов у меня болит голова.","시끄러운 사무실에 있으면 머리가 아파요.","Loud offices give me a headache.",["make","to me"]),
  PICK("«Это наводит меня на мысль»","'아이디어가 떠오르네요'는?",
       "That gives me an idea.","That makes me an idea.",
       "Идея и ощущения передаются через give, не make.",
       "아이디어나 느낌은 give로 표현합니다."),
 ],
}

L[49] = {
 "meaning": N("give an update / a call / a hand / a ride — устойчивые связки, где give заменяет целый глагол. Основа делового языка.",
              "give + 명사 형태로 동사 하나를 대신하는 굳어진 표현들입니다."),
 "examples":[
  E("Let me give you a quick update on the project.","Коротко расскажу, как идёт проект.","프로젝트 진행 상황 간단히 말씀드릴게요."),
  E("I'll give you a call tomorrow.","Завтра позвоню.","내일 전화드릴게요."),
  E("Can you give me a hand with this?","Поможешь мне с этим?","이거 좀 도와주실래요?"),
  E("He gave me a ride to the airport.","Он подвёз меня до аэропорта.","공항까지 태워다 주셨어요."),
  E("Give it a try.","Попробуй.","한번 해 보세요."),
  E("I'd like to give a short presentation first.","Сначала хотел бы сделать короткую презентацию.","먼저 간단히 발표를 하고 싶습니다."),
 ],
 "dialogue":[
  D("A","Where do we stand on the Kazakhstan project?","Как у нас дела по казахстанскому проекту?","카자흐스탄 프로젝트는 어떻게 돼 가요?"),
  D("B","Let me give you a quick update.","Коротко расскажу.","간단히 말씀드릴게요."),
  D("A","Keep it to five minutes, I have a call.","Уложись в пять минут, у меня созвон.","5분만요, 통화가 있어서요."),
  D("B","Three points, then. Installation, training, payment.","Тогда три пункта. Монтаж, обучение, оплата.","그럼 세 가지만요. 설치, 교육, 대금.",True),
 ],
 "notes":[
  N("give an update — самая частая деловая связка. Обновление статуса без формального отчёта.",
    "정식 보고 없이 상황을 공유할 때 쓰는 표현입니다."),
  N("give somebody a call естественнее, чем call somebody, когда речь о будущем обещании.",
    "약속으로 말할 때는 give a call이 자연스럽습니다."),
  N("Give it a try / Give it a shot — «попробуй». Shot разговорнее.",
    "shot이 조금 더 구어적입니다."),
 ],
 "quiz":[
  BUILD("Поможешь мне с этим?","이거 좀 도와주실래요?","Can you give me a hand with this?",["help","to me"]),
  PICK("«Коротко расскажу о статусе»","'상황 간단히 말씀드릴게요'는?",
       "Let me give you a quick update.","Let me give you a quick information.",
       "information неисчисляемо, артикль a с ним не ставится. Устойчиво — an update.",
       "information은 불가산이라 a를 붙이지 않습니다."),
 ],
}

L[50] = {
 "meaning": N("keep = «оставить себе, не возвращать». О предмете, который остаётся у человека навсегда.",
              "'가지다, 돌려주지 않다'의 의미입니다."),
 "examples":[
  E("You can keep the omelet pan.","Сковородку для омлета можешь оставить себе.","그 오믈렛 팬은 그냥 가지세요."),
  E("Keep the change.","Сдачи не надо.","잔돈은 됐어요."),
  E("I kept the receipt just in case.","Чек я сохранил на всякий случай.","혹시 몰라서 영수증 보관해 뒀어요."),
  E("Can I keep this copy?","Можно мне оставить эту копию?","이 사본 제가 가져도 될까요?"),
  E("Keep it, I have another one.","Оставь себе, у меня есть ещё.","그냥 가지세요, 저 하나 더 있어요."),
  E("We keep all contracts for seven years.","Все договоры мы храним семь лет.","계약서는 7년간 보관합니다."),
 ],
 "dialogue":[
  D("A","I should return this. I've had it for a month.","Надо бы вернуть. Она у меня уже месяц.","이거 돌려드려야 하는데. 한 달이나 됐네요."),
  D("B","You can keep the omelet pan. I never use it.","Оставь себе, я ей всё равно не пользуюсь.","그냥 가지세요. 저는 안 써요."),
  D("A","Are you sure?","Точно?","진짜 괜찮으세요?"),
  D("B","It's been in the back of a cabinet for years.","Она годами лежала в глубине шкафа.","몇 년째 찬장 구석에 있었어요.",True),
 ],
 "notes":[
  N("Keep the change — стандартная фраза в такси и кафе. Три слова, работает везде.",
    "택시나 식당에서 쓰는 정형 표현입니다."),
  N("keep — оставить себе. save — сохранить на будущее. store — хранить на складе. Разные оттенки.",
    "keep, save, store는 뉘앙스가 다릅니다."),
  N("You can keep it — мягкий отказ принять вещь обратно, звучит как подарок, а не как отмахивание.",
    "돌려받지 않겠다는 뜻을 선물처럼 들리게 합니다."),
 ],
 "quiz":[
  BUILD("Чек я сохранил на всякий случай.","혹시 몰라서 영수증 보관해 뒀어요.","I kept the receipt just in case.",["saved","for"]),
  PICK("В такси, отдавая купюру","택시에서 지폐를 건네며",
       "Keep the change.","Save the change.",
       "Устойчивая формула — keep the change.","Keep the change로 굳어진 표현입니다."),
 ],
}
