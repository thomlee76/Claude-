# -*- coding: utf-8 -*-
from _helpers import E, D, N, BUILD, PICK
L = {}

L[31] = {
 "meaning": N("It takes + что-то + to + глагол = «требуется, нужно». Безличное it: описывает, какие качества или усилия нужны для результата.",
              "It takes ~ to ...는 '~하려면 ~가 필요하다'입니다. 비인칭 it을 씁니다."),
 "examples":[
  E("It takes a lot to make me angry.","Меня трудно вывести из себя.","저는 웬만해선 화 안 내요."),
  E("It takes courage to say that out loud.","Нужна смелость, чтобы сказать это вслух.","그 말을 하려면 용기가 필요하죠."),
  E("It takes two people to carry this.","Это вдвоём нести надо.","이건 두 사람이 들어야 해요."),
  E("It takes practice.","Это дело практики.","연습이 필요한 일이에요."),
  E("It doesn't take much to make her happy.","Её несложно порадовать.","그분은 작은 것에도 기뻐해요."),
  E("It takes discipline to lose weight.","Чтобы похудеть, нужна дисциплина.","살 빼려면 절제가 필요해요."),
 ],
 "dialogue":[
  D("A","How are you so calm? Everyone's panicking.","Как ты так спокоен? Все в панике.","어떻게 그렇게 침착해요? 다들 난리인데."),
  D("B","It takes a lot to make me angry.","Меня трудно вывести из себя.","저는 웬만해선 화 안 내요."),
  D("A","I wish I were like that.","Хотел бы я так уметь.","저도 그랬으면 좋겠네요."),
  D("B","Give it twenty years.","Лет через двадцать научишься.","한 이십 년 지나면 됩니다.",True),
 ],
 "notes":[
  N("Всегда с it. Начать с This takes… нельзя — конструкция безличная.",
    "반드시 it으로 시작합니다."),
  N("Тот же оборот про время: It takes two hours to get there — урок 32.",
    "시간을 말할 때도 같은 구조를 씁니다."),
  N("It takes a lot to… — вежливая похвала: It takes a lot to admit that. Хорошо работает в переписке с партнёрами.",
    "상대를 인정할 때 쓰기 좋은 표현입니다."),
 ],
 "quiz":[
  BUILD("Это дело практики.","연습이 필요한 일이에요.","It takes practice.",["This","needs"]),
  PICK("«Нужна смелость, чтобы это сказать»","'그 말 하려면 용기가 필요해요'는?",
       "It takes courage to say that.","This takes courage to say that.",
       "Конструкция безличная — только it.","비인칭 it만 쓸 수 있습니다."),
 ],
}

L[32] = {
 "meaning": N("It takes + время + to + глагол = «занимает столько-то времени». То же безличное it, но о длительности. Кому именно — через me, us, him.",
              "소요 시간을 말하는 구조입니다. 대상은 me, us처럼 넣습니다."),
 "examples":[
  E("It took me months to finish reading that book.","Я читал эту книгу несколько месяцев.","그 책 다 읽는 데 몇 달 걸렸어요."),
  E("How long does it take to get there?","Сколько туда добираться?","거기까지 얼마나 걸려요?"),
  E("It takes about four hours to fly to Almaty.","До Алматы лететь примерно четыре часа.","알마티까지 비행기로 네 시간쯤 걸려요."),
  E("It only took ten minutes.","Это заняло всего десять минут.","십 분밖에 안 걸렸어요."),
  E("It's taking longer than expected.","Это занимает больше времени, чем ожидалось.","예상보다 오래 걸리고 있어요."),
  E("Customs clearance takes about three days.","Растаможка занимает примерно три дня.","통관은 3일 정도 걸립니다."),
 ],
 "dialogue":[
  D("A","Did you finish that book I lent you?","Дочитал книгу, которую я давал?","제가 빌려준 책 다 읽었어요?"),
  D("B","Finally. It took me months to finish reading it.","Наконец-то. Я читал её несколько месяцев.","드디어요. 다 읽는 데 몇 달 걸렸어요."),
  D("A","That bad?","Настолько тяжёлая?","그렇게 어려웠어요?"),
  D("B","Not bad. Just dense.","Не тяжёлая. Просто плотная.","어렵다기보단 내용이 빽빽해서요.",True),
 ],
 "notes":[
  N("Порядок: It takes + кому + сколько + to + глагол. It took me two hours to finish.",
    "It takes + 사람 + 시간 + to부정사 순서입니다."),
  N("Без указания лица — о среднем: It takes two hours. С лицом — о конкретном опыте.",
    "사람을 넣으면 개인의 경험, 빼면 일반적인 소요 시간입니다."),
  N("В работе: Clearance takes three days — подлежащим может быть и процесс, без it.",
    "과정 자체를 주어로 쓸 수도 있습니다."),
 ],
 "quiz":[
  BUILD("Сколько туда добираться?","거기까지 얼마나 걸려요?","How long does it take to get there?",["is","spend"]),
  PICK("«Я читал эту книгу несколько месяцев»","'그 책 읽는 데 몇 달 걸렸어요'는?",
       "It took me months to finish that book.","I took months to finish that book.",
       "В этой конструкции подлежащее — безличное it, а человек идёт дополнением.",
       "사람이 아니라 it이 주어입니다."),
 ],
}

L[33] = {
 "meaning": N("take it well / badly / hard = «воспринять известие». Об эмоциональной реакции на плохую или неожиданную новость.",
              "소식을 '받아들이다'라는 뜻으로, 반응을 말합니다."),
 "examples":[
  E("She didn't take it well.","Она восприняла это тяжело.","걔는 그걸 많이 힘들어했어요."),
  E("How did he take the news?","Как он воспринял новость?","그 소식 듣고 어떻게 반응했어요?"),
  E("He took it surprisingly well.","Он воспринял это на удивление спокойно.","의외로 담담하게 받아들이더라고요."),
  E("They took the rejection hard.","Отказ они восприняли тяжело.","거절당하고 많이 힘들어했어요."),
  E("I hope she doesn't take it the wrong way.","Надеюсь, она не поймёт это превратно.","오해하지 않았으면 좋겠어요."),
  E("Take it as a compliment.","Восприми это как комплимент.","칭찬으로 받아들이세요."),
 ],
 "dialogue":[
  D("A","Did you tell her about the transfer?","Ты сказал ей про перевод?","발령 얘기 했어요?"),
  D("B","I did. She didn't take it well.","Сказал. Она восприняла тяжело.","했죠. 많이 힘들어하더라고요."),
  D("A","Give her a couple of days.","Дай ей пару дней.","며칠 시간을 주세요."),
  D("B","That's what I'm doing.","Так и делаю.","그러려고요.",True),
 ],
 "notes":[
  N("take it hard сильнее, чем take it badly. hard — о настоящем горе.",
    "hard가 badly보다 강합니다."),
  N("take it the wrong way — «неправильно понять, обидеться». Don't take this the wrong way, but… — стандартное предисловие к критике.",
    "비판 전에 Don't take this the wrong way, but…을 붙입니다."),
  N("Вопрос How did he take it? — естественнее, чем What was his reaction?",
    "How did he take it?이 더 자연스럽습니다."),
 ],
 "quiz":[
  BUILD("Как он воспринял новость?","그 소식 듣고 어떻게 반응했어요?","How did he take the news?",["get","did he took"]),
  PICK("«Она восприняла это тяжело»","'많이 힘들어했어요'는?",
       "She didn't take it well.","She didn't take it good.",
       "Наречие при глаголе — well, не good.","동사를 꾸미므로 good이 아니라 well입니다."),
 ],
}

L[34] = {
 "meaning": N("do = выполнять работу, задачу, обязанность. В отличие от make (создать новое), do — про процесс и деятельность.",
              "do는 '하다', 즉 일이나 활동을 수행하는 것입니다. 새로 만드는 make와 구별됩니다."),
 "examples":[
  E("I do a lot of admin work at my job.","На работе у меня много бумажной работы.","회사에서 행정 업무를 많이 해요."),
  E("Who does the cooking in your family?","Кто у вас в семье готовит?","집에서 요리는 누가 하세요?"),
  E("I'll do the presentation, you do the numbers.","Презентацию беру я, цифры за тобой.","발표는 제가 하고, 숫자는 맡아 주세요."),
  E("Have you done the paperwork yet?","Ты уже оформил документы?","서류 작업 끝냈어요?"),
  E("She does yoga every morning.","Она каждое утро занимается йогой.","매일 아침 요가를 해요."),
  E("What do you do for a living?","Кем вы работаете?","어떤 일 하세요?"),
 ],
 "dialogue":[
  D("A","What's your day actually like?","Как на самом деле проходит твой день?","실제로 하루가 어떻게 돌아가요?"),
  D("B","Honestly, I do a lot of admin work at my job.","Честно говоря, у меня много бумажной работы.","솔직히 행정 업무를 많이 해요."),
  D("A","I thought you were in sales.","Я думал, ты в продажах.","영업 하시는 줄 알았어요."),
  D("B","I am. Sales is half paperwork.","Я и в продажах. Продажи наполовину бумаги.","맞아요. 영업의 절반은 서류예요.",True),
 ],
 "notes":[
  N("do the dishes, do the laundry, do homework, do business — работа и обязанности. make a plan, make a decision — создание нового.",
    "do는 일, make는 창조입니다."),
  N("What do you do? — «кем работаете». Универсальный вопрос при знакомстве, вежливее, чем What is your job?",
    "처음 만나 직업을 물을 때 쓰는 표현입니다."),
  N("do business with — вести дела с кем-то. We've been doing business with them for ten years.",
    "do business with는 '거래하다'입니다."),
 ],
 "quiz":[
  BUILD("Ты уже оформил документы?","서류 작업 끝냈어요?","Have you done the paperwork yet?",["made","already"]),
  PICK("«Кто у вас готовит?»","'요리는 누가 하세요?'는?",
       "Who does the cooking?","Who makes the cooking?",
       "cooking — это деятельность, поэтому do.",
       "cooking은 활동이므로 do를 씁니다."),
 ],
}

L[35] = {
 "meaning": N("like + to-инфинитив или -ing = «нравиться». Разница тонкая: to чаще о выборе и привычке, -ing о самом процессе и удовольствии.",
              "like + to부정사는 선택과 습관, like + -ing는 과정과 즐거움에 가깝습니다."),
 "examples":[
  E("I don't like to play golf, but I have to for my job.","Я не люблю гольф, но приходится по работе.","골프 좋아하진 않는데 일 때문에 쳐요."),
  E("I like working with this team.","Мне нравится работать с этой командой.","이 팀이랑 일하는 게 좋아요."),
  E("She doesn't like flying.","Она не любит летать.","비행기 타는 걸 안 좋아해요."),
  E("I like to get to the airport early.","Я предпочитаю приезжать в аэропорт заранее.","저는 공항에 일찍 가는 편이에요."),
  E("How do you like Almaty so far?","Как вам пока Алматы?","알마티는 어떠세요?"),
  E("I'd like to schedule a call for Thursday.","Хотел бы назначить созвон на четверг.","목요일에 통화 일정을 잡고 싶습니다."),
 ],
 "dialogue":[
  D("A","You play golf every weekend, right?","Ты же играешь в гольф каждые выходные?","주말마다 골프 치시죠?"),
  D("B","I don't like to play golf, but I have to for my job.","Не люблю гольф, но приходится по работе.","골프 좋아하진 않는데 일 때문에 쳐요."),
  D("A","That's a tough way to spend a Saturday.","Тяжёлый способ провести субботу.","토요일을 그렇게 보내긴 힘들겠네요."),
  D("B","Half my deals get closed there.","Половина моих сделок там и закрывается.","제 계약 절반은 거기서 성사돼요.",True),
 ],
 "notes":[
  N("I'd like to… — вежливая просьба или намерение, не «мне нравится». В деловом письме это основа: I'd like to confirm / I'd like to propose.",
    "I'd like to는 '~하고 싶다'이지 '좋아한다'가 아닙니다. 업무 메일의 기본입니다."),
  N("How do you like…? — «как вам…?». Спрашивает впечатление, а не сравнение.",
    "How do you like…?는 소감을 묻는 표현입니다."),
  N("I like to get there early — о личном правиле. I like getting there early — об ощущении.",
    "to부정사는 방침, -ing는 느낌에 가깝습니다."),
 ],
 "quiz":[
  BUILD("Хотел бы назначить созвон на четверг.","목요일에 통화 일정을 잡고 싶습니다.","I'd like to schedule a call for Thursday.",["want","on"]),
  PICK("«Как вам пока Алматы?»","'알마티는 어떠세요?'는?",
       "How do you like Almaty so far?","How do you think about Almaty so far?",
       "Впечатление спрашивают через How do you like…? или What do you think of…?",
       "How do you think about은 틀린 형태입니다."),
 ],
}

L[36] = {
 "meaning": N("see о встречах и общении: see somebody = «видеться, встречаться». Не про зрение, а про контакт с человеком.",
              "see가 '만나다, 보다(사람을)'의 뜻으로 쓰입니다. 시각이 아니라 만남입니다."),
 "examples":[
  E("I haven't seen you for a while.","Давно тебя не видел.","오랜만이에요."),
  E("I'm seeing a client at two.","В два у меня встреча с клиентом.","두 시에 거래처 미팅 있어요."),
  E("Are you seeing anyone?","Ты с кем-нибудь встречаешься?","만나는 사람 있어요?"),
  E("Let's see each other more often.","Давай видеться почаще.","좀 더 자주 봐요."),
  E("I'll see you in Almaty next month.","Увидимся в Алматы в следующем месяце.","다음 달에 알마티에서 뵙겠습니다."),
  E("You should see a doctor about that.","С этим стоит показаться врачу.","그건 병원에 가 보셔야 해요."),
 ],
 "dialogue":[
  D("A","Minjun! I haven't seen you for a while.","Минджун! Давно тебя не видел.","민준 씨! 오랜만이에요."),
  D("B","It's been almost a year.","Почти год прошёл.","거의 일 년 됐네요."),
  D("A","You look good. Still at the same company?","Хорошо выглядишь. Всё там же работаешь?","좋아 보여요. 아직 같은 회사예요?"),
  D("B","Same company, new department.","Компания та же, отдел новый.","회사는 그대로고 부서만 바뀌었어요.",True),
 ],
 "notes":[
  N("I'm seeing a client — Continuous возможен, потому что это встреча, а не зрение. I'm seeing a bird ✗",
    "만남의 see는 진행형이 되지만, 시각의 see는 안 됩니다."),
  N("Are you seeing anyone? — «встречаешься с кем-то» в романтическом смысле. Осторожно в деловом контексте.",
    "연애 관련 표현이므로 업무 자리에서는 조심하세요."),
  N("see a doctor / see a lawyer / see a dentist — «обратиться к специалисту». Артикль обязателен.",
    "전문가를 찾아갈 때 see를 씁니다."),
 ],
 "quiz":[
  BUILD("В два у меня встреча с клиентом.","두 시에 거래처 미팅 있어요.","I'm seeing a client at two.",["see","meet with"]),
  PICK("«Давно тебя не видел»","'오랜만이에요'는?",
       "I haven't seen you for a while.","I didn't see you for a while.",
       "Отрезок времени, который тянется до сегодня, — Present Perfect.",
       "지금까지 이어지는 기간은 현재완료로 말합니다."),
 ],
}

L[37] = {
 "meaning": N("know somebody = «быть знакомым, иметь связи». В деловом контексте часто означает «у меня там свой человек».",
              "'아는 사이다'라는 뜻으로, 업무에서는 '인맥이 있다'는 의미로 쓰입니다."),
 "examples":[
  E("I know the owner.","Я знаком с владельцем.","제가 사장님이랑 아는 사이예요."),
  E("Do you know anyone at the ministry?","У тебя есть кто-нибудь в министерстве?","혹시 부처에 아는 분 있어요?"),
  E("We've known each other for ten years.","Мы знакомы десять лет.","저희 알고 지낸 지 10년 됐어요."),
  E("I know him by name, but we've never met.","Я знаю его по имени, но лично мы не знакомы.","이름만 알지 직접 만난 적은 없어요."),
  E("Let me know if anything changes.","Дайте знать, если что-то изменится.","변동 있으면 알려 주세요."),
  E("You never know.","Никогда не знаешь.","모르는 일이죠."),
 ],
 "dialogue":[
  D("A","This place is fully booked tonight.","Тут сегодня всё забронировано.","여기 오늘 예약 다 찼대요."),
  D("B","Give me a second. I know the owner.","Секунду. Я знаком с владельцем.","잠깐만요. 제가 사장님이랑 아는 사이예요."),
  D("A","Of course you do.","Ну конечно.","역시나."),
  D("B","Twenty years in this business.","Двадцать лет в этом бизнесе.","이 바닥에서 20년이니까요.",True),
 ],
 "notes":[
  N("Let me know — самая частая формула деловой переписки. Мягче, чем Please inform me.",
    "Let me know는 업무 메일에서 가장 많이 쓰는 표현입니다."),
  N("know не ставится в Continuous: I'm knowing him ✗. Это состояние.",
    "know는 상태 동사이므로 진행형이 안 됩니다."),
  N("Про язык — не know, а speak: I speak Russian, не I know Russian.",
    "언어는 know가 아니라 speak를 씁니다."),
 ],
 "quiz":[
  BUILD("Дайте знать, если что-то изменится.","변동 있으면 알려 주세요.","Let me know if anything changes.",["to know","something"]),
  PICK("«Я говорю по-русски»","'러시아어 할 줄 알아요'는?",
       "I speak Russian.","I know Russian.",
       "О владении языком говорят speak. know Russian звучит как «знаком с русским языком как предметом».",
       "언어 구사는 speak로 말합니다."),
 ],
}

L[38] = {
 "meaning": N("work = «сработать, подействовать, дать результат». Подлежащее — не человек, а метод, лекарство, план, диета.",
              "'효과가 있다, 통하다'의 의미로, 주어는 사람이 아니라 방법이나 약입니다."),
 "examples":[
  E("This diet really worked for me.","Эта диета мне реально помогла.","이 다이어트 저한테 진짜 효과 있었어요."),
  E("The medicine didn't work.","Лекарство не подействовало.","약이 안 들었어요."),
  E("Does Thursday work for you?","Четверг вам подходит?","목요일 괜찮으세요?"),
  E("That approach won't work with this client.","С этим клиентом такой подход не сработает.","이 거래처한테는 그 방식이 안 통해요."),
  E("The elevator isn't working.","Лифт не работает.","엘리베이터가 고장 났어요."),
  E("Whatever works.","Как удобно, так и делай.","편한 대로 하세요."),
 ],
 "dialogue":[
  D("A","You've lost weight.","Ты похудел.","살 빠지셨네요."),
  D("B","This diet really worked for me.","Эта диета мне реально помогла.","이 다이어트 저한테 진짜 효과 있었어요."),
  D("A","Which one?","Какая именно?","어떤 거요?"),
  D("B","Nothing fancy. Less rice, more walking.","Ничего особенного. Меньше риса, больше ходьбы.","별거 없어요. 밥 줄이고 많이 걷고요.",True),
 ],
 "notes":[
  N("Does Thursday work for you? — самый частый способ согласовать время. Вежливее, чем Is Thursday okay?",
    "일정 조율에 가장 많이 쓰는 표현입니다."),
  N("work for me — «мне подходит / мне помогло». Два смысла, различает контекст.",
    "'나한테 맞다'와 '나한테 효과 있었다' 두 가지 뜻입니다."),
  N("isn't working — о технике: не работает, сломано. Не broken, если поломка не окончательная.",
    "기계가 일시적으로 안 될 때는 isn't working이라고 합니다."),
 ],
 "quiz":[
  BUILD("Четверг вам подходит?","목요일 괜찮으세요?","Does Thursday work for you?",["is","to you"]),
  PICK("«Лекарство не подействовало»","'약이 안 들었어요'는?",
       "The medicine didn't work.","The medicine didn't act.",
       "act здесь не употребляется. Эффект — work.",
       "효과를 말할 때는 work를 씁니다."),
 ],
}

L[39] = {
 "meaning": N("work = «быть устроенным, функционировать так-то». О системе, правилах, порядке вещей: как это работает.",
              "'그런 식으로 돌아가다'라는 뜻으로, 제도나 방식의 작동 원리를 말합니다."),
 "examples":[
  E("Dating doesn't work that way anymore. Times have changed.","Свидания теперь устроены иначе. Времена изменились.","요즘 연애는 그런 식이 아니에요. 시대가 변했죠."),
  E("That's not how it works here.","У нас это устроено не так.","여기선 그렇게 안 돌아가요."),
  E("Let me explain how the payment works.","Объясню, как устроена оплата.","결제가 어떻게 되는지 설명드릴게요."),
  E("How does the warranty work?","Как действует гарантия?","보증은 어떻게 되나요?"),
  E("The system works differently in each country.","В каждой стране система работает по-своему.","나라마다 제도가 다르게 돌아가요."),
  E("It works like this.","Это устроено так.","이렇게 되는 거예요."),
 ],
 "dialogue":[
  D("A","In my day you just asked someone out.","В моё время просто звали на свидание.","제 땐 그냥 데이트 신청하면 됐는데."),
  D("B","Dating doesn't work that way anymore. Times have changed.","Теперь всё устроено иначе. Времена изменились.","요즘 연애는 그런 식이 아니에요. 시대가 변했죠."),
  D("A","So how does it work now?","И как же теперь?","그럼 요즘은 어떻게 하는데요?"),
  D("B","Apps, mostly.","В основном через приложения.","거의 앱으로 해요.",True),
 ],
 "notes":[
  N("That's not how it works — очень сильная разговорная формула. В переговорах звучит жёстко, смягчайте: That's not quite how it works here.",
    "강한 표현이므로 협상에서는 quite를 넣어 완화하세요."),
  N("How does it work? — универсальный вопрос про устройство чего угодно: прибора, гарантии, процедуры.",
    "기계, 보증, 절차 무엇에든 쓸 수 있습니다."),
  N("Для объяснения условий поставки клиенту: Let me explain how the payment terms work. Звучит дружелюбнее, чем зачитывание пунктов.",
    "조건을 설명할 때 조항을 읽는 것보다 부드럽게 들립니다."),
 ],
 "quiz":[
  BUILD("Объясню, как устроена оплата.","결제가 어떻게 되는지 설명드릴게요.","Let me explain how the payment works.",["is working","that"]),
  PICK("«Как действует гарантия?»","'보증은 어떻게 되나요?'는?",
       "How does the warranty work?","How is the warranty working?",
       "Речь об устройстве в принципе, а не о текущем моменте.",
       "일반적인 원리를 묻는 것이므로 진행형을 쓰지 않습니다."),
 ],
}

L[40] = {
 "meaning": N("go = «пройти, сложиться». О том, как прошло событие: поездка, встреча, экзамен, презентация.",
              "'(일이) 되어 가다, 진행되다'의 의미로, 행사나 일이 어떻게 됐는지 말합니다."),
 "examples":[
  E("I'm glad to hear your trip went well.","Рад слышать, что поездка прошла хорошо.","여행 잘 다녀오셨다니 다행이에요."),
  E("How did the meeting go?","Как прошло совещание?","회의 어떻게 됐어요?"),
  E("The presentation went better than expected.","Презентация прошла лучше, чем ожидалось.","발표가 생각보다 잘됐어요."),
  E("Everything went smoothly.","Всё прошло гладко.","다 순조롭게 진행됐어요."),
  E("It didn't go as planned.","Всё пошло не по плану.","계획대로 되진 않았어요."),
  E("How's it going?","Как дела?","잘 지내세요?"),
 ],
 "dialogue":[
  D("A","We closed the deal on the last day.","Мы закрыли сделку в последний день.","마지막 날에 계약 성사됐어요."),
  D("B","I'm glad to hear your trip went well.","Рад слышать, что поездка прошла хорошо.","출장 잘 다녀오셨다니 다행이에요."),
  D("A","It was close, though.","Хотя было впритык.","아슬아슬했지만요."),
  D("B","They always are.","Они всегда такие.","늘 그렇죠, 뭐.",True),
 ],
 "notes":[
  N("How did it go? — стандартный вопрос коллеге после встречи, собеседования, переговоров. Запомните целиком.",
    "면접이나 회의 후에 묻는 정형 표현입니다."),
  N("go well / go smoothly / go badly / go wrong — набор связок. go wrong = «пойти не так».",
    "go well, go wrong처럼 짝으로 외우세요."),
  N("How's it going? — приветствие, а не реальный вопрос. Ответ: Good, thanks. You?",
    "How's it going?은 인사말입니다. 진짜 질문이 아닙니다."),
 ],
 "quiz":[
  BUILD("Как прошло совещание?","회의 어떻게 됐어요?","How did the meeting go?",["was","went"]),
  PICK("«Всё пошло не по плану»","'계획대로 되진 않았어요'는?",
       "It didn't go as planned.","It didn't go as plan.",
       "Нужна форма причастия: as planned.","as planned로 써야 합니다."),
 ],
}
