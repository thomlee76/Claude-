# -*- coding: utf-8 -*-
from _helpers import E, D, N, BUILD, PICK
L = {}

L[91] = {
 "meaning": N("seem = «казаться, производить впечатление». Смягчает утверждение: вы говорите о впечатлении, а не о факте.",
              "'~인 것 같다'입니다. 단정을 피하고 인상을 말할 때 씁니다."),
 "examples":[
  E("You always seem busy with something.","Ты всегда чем-то занят.","항상 뭔가 바쁘신 것 같아요."),
  E("He seems tired lately.","Он в последнее время выглядит уставшим.","요즘 피곤해 보이세요."),
  E("There seems to be a problem with the invoice.","Похоже, с инвойсом какая-то проблема.","인보이스에 문제가 있는 것 같습니다."),
  E("It seems like a reasonable request.","Просьба кажется разумной.","합리적인 요청 같습니다."),
  E("They don't seem interested.","Похоже, им неинтересно.","별로 관심 없어 보여요."),
  E("It seemed simpler at the time.","Тогда это казалось проще.","그땐 더 간단해 보였어요."),
 ],
 "dialogue":[
  D("A","We should catch up properly sometime.","Надо бы как-нибудь нормально пообщаться.","언제 제대로 한번 봬요."),
  D("B","We should. You always seem busy with something.","Надо. Ты всегда чем-то занят.","그래야죠. 항상 뭔가 바쁘신 것 같아요."),
  D("A","That's fair. Pick a date and I'll clear it.","Справедливо. Назови дату, я освобожу.","맞는 말이에요. 날짜 정해 주시면 비워 둘게요."),
  D("B","I'll send you three options.","Пришлю три варианта.","세 가지 안 보내 드릴게요.",True),
 ],
 "notes":[
  N("There seems to be a problem — деликатнейший способ сообщить о проблеме. Не обвиняет и не паникует.",
    "문제를 알릴 때 가장 부드러운 표현입니다."),
  N("seem + прилагательное, seem to + глагол, seem like + существительное. Три конструкции.",
    "seem 뒤에는 형용사, to부정사, like + 명사가 옵니다."),
  N("В деловой переписке seem снижает категоричность: It seems the shipment was delayed — мягче, чем You delayed the shipment.",
    "업무 메일에서 단정을 피할 때 유용합니다."),
 ],
 "quiz":[
  BUILD("Похоже, с инвойсом какая-то проблема.","인보이스에 문제가 있는 것 같습니다.","There seems to be a problem with the invoice.",["is seeming","in"]),
  PICK("Сообщить партнёру о проблеме, не обвиняя","상대를 탓하지 않고 문제를 알릴 때",
       "There seems to be an issue with the delivery.","You made a mistake with the delivery.",
       "Первый вариант оставляет место для объяснений и сохраняет отношения.",
       "첫째 표현은 해명의 여지를 남깁니다."),
 ],
}

L[92] = {
 "meaning": N("bother = «раздражать, беспокоить». Подлежащее — раздражитель, дополнение — человек. Часто в конструкции it bothers me when…",
              "'신경 쓰이게 하다, 거슬리다'입니다. 주어가 원인, 목적어가 사람입니다."),
 "examples":[
  E("It really bothers me when my laptop is slow.","Меня реально бесит, когда ноутбук тормозит.","노트북 느려지면 진짜 짜증 나요."),
  E("Does the noise bother you?","Шум вам не мешает?","소음 거슬리세요?"),
  E("Sorry to bother you, but do you have a minute?","Извините за беспокойство, у вас есть минута?","번거롭게 해서 죄송한데, 잠시 시간 되세요?"),
  E("Something about that quote bothers me.","Что-то в этом предложении меня смущает.","그 견적에서 뭔가 걸리는 게 있어요."),
  E("Don't let it bother you.","Пусть это тебя не беспокоит.","너무 신경 쓰지 마세요."),
  E("It doesn't bother me at all.","Меня это совсем не напрягает.","저는 전혀 상관없어요."),
 ],
 "dialogue":[
  D("A","Why are you restarting it again?","Почему ты опять перезагружаешь?","왜 또 재부팅해요?"),
  D("B","It really bothers me when my laptop is slow.","Меня реально бесит, когда ноутбук тормозит.","노트북 느려지면 진짜 짜증 나요."),
  D("A","How old is it?","Сколько ему лет?","몇 년 됐어요?"),
  D("B","Six years. I know, I know.","Шесть. Знаю, знаю.","6년이요. 알아요, 알아요.",True),
 ],
 "notes":[
  N("Sorry to bother you — обязательное начало, когда прерываете занятого человека. Работает и в почте, и вживую.",
    "바쁜 사람을 방해할 때 쓰는 필수 표현입니다."),
  N("It bothers me when… — конструкция для мягкой жалобы. Говорит о своём ощущении, а не о вине другого.",
    "상대를 탓하지 않고 불편함을 말하는 구조입니다."),
  N("Something bothers me about… — очень полезно в переговорах: обозначает сомнение, не формулируя обвинения.",
    "협상에서 의심을 조심스럽게 드러낼 때 유용합니다."),
 ],
 "quiz":[
  BUILD("Извините за беспокойство, у вас есть минута?","번거롭게 해서 죄송한데, 잠시 시간 되세요?","Sorry to bother you, but do you have a minute?",["bothering","for"]),
  PICK("Мягко сказать коллеге о том, что мешает","동료에게 불편함을 부드럽게 말할 때",
       "It bothers me when the door is left open.","You always leave the door open.",
       "Первый вариант говорит о вашем ощущении, второй обвиняет.",
       "첫째는 내 느낌, 둘째는 상대 탓입니다."),
 ],
}

L[93] = {
 "meaning": N("not bother + -ing = «не утруждаться, даже не пытаться». Подчёркивает, что человек не считает нужным что-то сделать.",
              "not bother + -ing는 '~하려고도 하지 않다'입니다. 수고할 가치를 못 느낀다는 뜻입니다."),
 "examples":[
  E("He never bothers texting back.","Он никогда не удосуживается ответить на сообщение.","걔는 답장을 아예 안 해요."),
  E("Don't bother waiting for me.","Не жди меня, не надо.","저 기다리지 마세요."),
  E("They didn't even bother to reply.","Они даже не потрудились ответить.","답장조차 안 하더라고요."),
  E("Don't bother, I'll do it myself.","Не утруждайся, я сам сделаю.","그냥 두세요, 제가 할게요."),
  E("Why bother?","Зачем вообще стараться?","뭐 하러요?"),
  E("Nobody bothered to check the figures.","Никто не потрудился проверить цифры.","숫자를 확인해 본 사람이 아무도 없었어요."),
 ],
 "dialogue":[
  D("A","Did he get back to you?","Он тебе ответил?","답장 왔어요?"),
  D("B","He never bothers texting back.","Он никогда не удосуживается ответить.","걔는 답장을 아예 안 해요."),
  D("A","Then call him.","Тогда позвони.","그럼 전화해요."),
  D("B","I did. Twice.","Звонил. Дважды.","했어요. 두 번이나.",True),
 ],
 "notes":[
  N("bother + -ing и bother + to — оба верны: didn't bother texting / didn't bother to text.",
    "bother 뒤에는 -ing와 to부정사 둘 다 가능합니다."),
  N("Don't bother — «не надо, не утруждайся». Может звучать как забота или как раздражение, всё решает интонация.",
    "억양에 따라 배려로도, 짜증으로도 들립니다."),
  N("Nobody bothered to… — сильная формулировка для разбора инцидента. В письме руководству употребляйте осознанно.",
    "사고 원인을 짚을 때 강한 표현이므로 주의해서 쓰세요."),
 ],
 "quiz":[
  BUILD("Они даже не потрудились ответить.","답장조차 안 하더라고요.","They didn't even bother to reply.",["replying to","for"]),
  PICK("«Он никогда не отвечает на сообщения»","'걔는 답장을 아예 안 해요'는?",
       "He never bothers texting back.","He never bothers text back.",
       "После bother нужна форма -ing или to.","bother 뒤에는 -ing나 to가 옵니다."),
 ],
}

L[94] = {
 "meaning": N("spare = «выделить, уделить, обойтись без». О времени, деньгах, людях, вещах, которых мало.",
              "'내주다, 할애하다'입니다. 시간, 돈, 인력처럼 여유가 없는 것을 내어 주는 것입니다."),
 "examples":[
  E("Can you spare a moment to help me with something?","Найдётся минутка помочь мне кое с чем?","잠깐 시간 좀 내주실 수 있어요?"),
  E("We can't spare anyone this week.","На этой неделе мы никого выделить не можем.","이번 주는 인력을 뺄 수가 없어요."),
  E("Can you spare a pen?","Ручка лишняя найдётся?","펜 하나 남는 거 있어요?"),
  E("I'll spare you the details.","Избавлю тебя от подробностей.","자세한 얘기는 생략할게요."),
  E("We have no time to spare.","У нас нет времени в запасе.","여유 시간이 전혀 없습니다."),
  E("Could you spare me five minutes before the call?","Уделите мне пять минут до созвона?","통화 전에 5분만 시간 주실 수 있어요?"),
 ],
 "dialogue":[
  D("A","Are you in the middle of something?","Ты сейчас занят?","지금 뭐 하시는 중이에요?"),
  D("B","Almost done. What's up?","Почти закончил. Что такое?","거의 끝나 가요. 무슨 일이세요?"),
  D("A","Can you spare a moment to help me with something?","Найдётся минутка помочь мне кое с чем?","잠깐 시간 좀 내주실 수 있어요?"),
  D("B","Give me two minutes and I'm all yours.","Дай две минуты, и я весь твой.","2분만요, 그다음엔 얼마든지요.",True),
 ],
 "notes":[
  N("Can you spare a moment? — вежливее, чем Do you have time? Подчёркивает, что вы цените чужое время.",
    "상대의 시간을 존중한다는 뉘앙스가 있습니다."),
  N("time to spare — запас времени. We arrived with an hour to spare — приехали с часом в запасе.",
    "to spare는 '여유분의'라는 뜻입니다."),
  N("I'll spare you the details — вежливо сокращает долгий рассказ. Полезно в устных отчётах руководству.",
    "긴 설명을 줄일 때 정중하게 쓸 수 있습니다."),
 ],
 "quiz":[
  BUILD("Уделите мне пять минут до созвона?","통화 전에 5분만 시간 주실 수 있어요?","Could you spare me five minutes before the call?",["for me","to spare"]),
  PICK("Попросить время у занятого руководителя","바쁜 상사에게 시간을 요청할 때",
       "Can you spare a moment?","Do you have free time now?",
       "Первый вариант признаёт, что времени мало, и звучит уважительно.",
       "첫째가 상대의 바쁨을 존중하는 표현입니다."),
 ],
}

L[95] = {
 "meaning": N("ruin = «испортить, загубить». Сильное слово: не просто ухудшить, а сделать негодным. Об аппетите, вещах, планах, репутации.",
              "'망치다'입니다. 조금 나빠지는 정도가 아니라 못 쓰게 만드는 것입니다."),
 "examples":[
  E("Don't eat candy before dinner! You'll ruin your appetite!","Не ешь конфеты перед ужином! Аппетит перебьёшь!","저녁 전에 사탕 먹지 마! 입맛 버려!"),
  E("The rain ruined our plans.","Дождь испортил нам планы.","비 때문에 계획이 다 틀어졌어요."),
  E("One bad batch can ruin a reputation.","Одна плохая партия может погубить репутацию.","불량 한 배치가 평판을 망칠 수 있습니다."),
  E("I ruined my jacket with coffee.","Я испортил пиджак кофе.","커피 쏟아서 재킷을 버렸어요."),
  E("Don't let one comment ruin your day.","Не давай одному комментарию испортить тебе день.","댓글 하나 때문에 하루 망치지 마세요."),
  E("The delay ruined any chance of a second order.","Задержка убила все шансы на повторный заказ.","지연 때문에 재주문 가능성이 사라졌어요."),
 ],
 "dialogue":[
  D("A","Just one more piece.","Ещё один кусочек.","하나만 더요."),
  D("B","Don't eat candy before dinner. You'll ruin your appetite.","Не ешь конфеты перед ужином. Аппетит перебьёшь.","저녁 전에 사탕 먹지 마. 입맛 버려."),
  D("A","But I'm hungry now.","Но я голодный сейчас.","근데 지금 배고픈데요."),
  D("B","Dinner's in ten minutes. Hold on.","Ужин через десять минут. Потерпи.","10분이면 저녁이야. 조금만 참아.",True),
 ],
 "notes":[
  N("ruin сильнее, чем spoil и damage. Ruin означает «безвозвратно».",
    "ruin은 spoil이나 damage보다 강하고, 되돌릴 수 없다는 뜻입니다."),
  N("ruin your appetite — устойчивая фраза, буквально «испортить аппетит». Так и говорят.",
    "ruin your appetite는 굳어진 표현입니다."),
  N("В отчёте лучше избегать ruin — слишком эмоционально. Нейтральнее: seriously affected our reputation.",
    "보고서에서는 감정적이므로 피하고 affected를 쓰세요."),
 ],
 "quiz":[
  BUILD("Дождь испортил нам планы.","비 때문에 계획이 다 틀어졌어요.","The rain ruined our plans.",["spoiled to","has ruin"]),
  PICK("Нейтральная формулировка в отчёте руководству","경영진 보고서에 쓸 중립적 표현",
       "The delay seriously affected our reputation.","The delay ruined our reputation.",
       "ruin в отчёте звучит эмоционально и безнадёжно.",
       "보고서에서 ruin은 감정적으로 들립니다."),
 ],
}

L[96] = {
 "meaning": N("owe = «быть должным». О деньгах, услугах, объяснениях и благодарности. Порядок: owe + кому + что.",
              "'빚지다, 신세 지다'입니다. 돈뿐 아니라 설명이나 감사에도 씁니다."),
 "examples":[
  E("I don't owe the bank anything.","Я ничего не должен банку.","저는 은행에 빚이 하나도 없어요."),
  E("You owe me a coffee.","С тебя кофе.","커피 한 잔 사셔야죠."),
  E("How much do we owe you?","Сколько мы вам должны?","저희가 얼마 드리면 될까요?"),
  E("I owe you an apology.","Я должен перед вами извиниться.","제가 사과드려야 할 것 같습니다."),
  E("They still owe us for the last shipment.","Они всё ещё должны нам за прошлую отгрузку.","지난 선적 대금이 아직 미수예요."),
  E("I owe him a lot.","Я ему многим обязан.","그분께 신세를 많이 졌어요."),
 ],
 "dialogue":[
  D("A","You look relieved.","У тебя вид, будто гора с плеч.","홀가분해 보이시네요."),
  D("B","Last payment went through. I don't owe the bank anything.","Последний платёж прошёл. Я ничего не должен банку.","마지막 상환이 끝났어요. 은행에 빚이 하나도 없어요."),
  D("A","Congratulations. That's a big one.","Поздравляю. Это серьёзно.","축하해요. 큰일 하셨네요."),
  D("B","Twelve years. Worth every won.","Двенадцать лет. Каждая вона того стоила.","12년이요. 한 푼도 안 아까워요.",True),
 ],
 "notes":[
  N("Порядок: owe + кому + что, без предлога. I owe you an explanation.",
    "owe + 사람 + 사물 순서로, 전치사를 쓰지 않습니다."),
  N("owe не ставится в Continuous: I'm owing you ✗. Это состояние.",
    "owe는 진행형으로 쓰지 않습니다."),
  N("В работе с дебиторкой: outstanding amount — сумма задолженности. They still owe us — в разговоре, The amount remains outstanding — в письме.",
    "미수금은 구어로 owe, 문서로는 outstanding을 씁니다."),
 ],
 "quiz":[
  BUILD("Я должен перед вами извиниться.","제가 사과드려야 할 것 같습니다.","I owe you an apology.",["to you","am owing"]),
  PICK("«Они всё ещё должны нам за отгрузку»","'지난 선적 대금이 아직 미수예요'는?",
       "They still owe us for the last shipment.","They are still owing us for the last shipment.",
       "owe — состояние, Continuous не используется.",
       "owe는 상태 동사입니다."),
 ],
}

L[97] = {
 "meaning": N("quit = «бросить, прекратить». О привычке, работе, занятии. Резкое и окончательное прекращение.",
              "'끊다, 그만두다'입니다. 습관, 직장, 활동을 단호하게 그만두는 것입니다."),
 "examples":[
  E("I quit caffeine for a week.","Я неделю не пил кофеин.","일주일 동안 카페인 끊었어요."),
  E("He quit his job without another offer.","Он уволился, не имея другого предложения.","다른 데 안 정하고 퇴사했어요."),
  E("I quit smoking three years ago.","Я бросил курить три года назад.","3년 전에 담배 끊었어요."),
  E("Don't quit now, you're close.","Не бросай сейчас, ты близко.","지금 포기하지 마세요, 거의 다 왔어요."),
  E("She quit halfway through the program.","Она бросила на середине программы.","프로그램 중간에 그만두셨어요."),
  E("The app keeps quitting unexpectedly.","Приложение постоянно неожиданно закрывается.","앱이 자꾸 갑자기 종료돼요."),
 ],
 "dialogue":[
  D("A","Herbal tea? That's new.","Травяной чай? Это что-то новое.","허브차요? 처음 보네요."),
  D("B","I quit caffeine for a week.","Я на неделю бросил кофеин.","일주일 동안 카페인 끊었어요."),
  D("A","How's that going?","И как оно?","어때요?"),
  D("B","Day three. I've made a terrible mistake.","Третий день. Я совершил ужасную ошибку.","3일째예요. 큰 실수를 한 것 같아요.",True),
 ],
 "notes":[
  N("quit + -ing: quit smoking, quit drinking. Не quit to smoke.",
    "quit 뒤에는 -ing가 옵니다."),
  N("quit — неправильный глагол без изменений: quit / quit / quit.",
    "quit는 형태가 변하지 않는 불규칙 동사입니다."),
  N("quit a job резче, чем leave a company или resign. В резюме и официальных письмах используйте resign.",
    "이력서나 공식 문서에서는 resign을 씁니다."),
 ],
 "quiz":[
  BUILD("Я бросил курить три года назад.","3년 전에 담배 끊었어요.","I quit smoking three years ago.",["to smoke","quitted"]),
  PICK("Официальное письмо об уходе из компании","퇴사를 알리는 공식 서한에서",
       "I have decided to resign from my position.","I have decided to quit my job.",
       "В официальном письме уместен resign, quit слишком разговорно.",
       "공식 문서에서는 resign을 씁니다."),
 ],
}

L[98] = {
 "meaning": N("arrange = «организовать, устроить, договориться». Формальнее, чем organize, и очень частое в деловой переписке.",
              "'준비하다, 마련하다, 주선하다'입니다. organize보다 격식 있고 업무 메일에 자주 나옵니다."),
 "examples":[
  E("I'll arrange for someone to pick you up.","Я организую, чтобы вас встретили.","마중 나갈 사람 준비해 둘게요."),
  E("Can we arrange a call for Thursday?","Можем назначить созвон на четверг?","목요일에 통화 일정을 잡을 수 있을까요?"),
  E("We've arranged accommodation for the delegation.","Размещение для делегации мы организовали.","대표단 숙소는 준비해 두었습니다."),
  E("I'll arrange the shipping documents this week.","Отгрузочные документы подготовлю на этой неделе.","선적 서류는 이번 주에 준비하겠습니다."),
  E("Everything has been arranged.","Всё организовано.","다 준비돼 있습니다."),
  E("Let me arrange a visit to the factory.","Организую вам визит на завод.","공장 방문을 주선해 드리겠습니다."),
 ],
 "dialogue":[
  D("A","I land at 6:40 in the morning.","Я прилетаю в 6:40 утра.","아침 6시 40분에 도착해요."),
  D("B","I'll arrange for someone to pick you up.","Я организую, чтобы вас встретили.","마중 나갈 사람 준비해 둘게요."),
  D("A","You don't have to do that.","Не обязательно.","안 그러셔도 되는데요."),
  D("B","At that hour you do. It's already done.","В такой час — обязательно. Уже сделано.","그 시간엔 필요합니다. 이미 준비했어요.",True),
 ],
 "notes":[
  N("arrange for + человек + to + глагол — «устроить, чтобы кто-то сделал». Ключевая деловая формула.",
    "arrange for + 사람 + to부정사는 업무에서 핵심 구조입니다."),
  N("Без for: arrange a meeting, arrange transport — прямое дополнение. С for — когда действует другой человек.",
    "사물은 바로, 사람이 행동할 때는 for를 씁니다."),
  N("Everything has been arranged — фраза, снимающая тревогу у партнёра. Работает в письме перед визитом.",
    "방문 전 메일에서 상대를 안심시키는 표현입니다."),
 ],
 "quiz":[
  BUILD("Я организую, чтобы вас встретили.","마중 나갈 사람 준비해 둘게요.","I'll arrange for someone to pick you up.",["that","picking"]),
  PICK("«Можем назначить созвон на четверг?»","'목요일에 통화 잡을 수 있을까요?'는?",
       "Can we arrange a call for Thursday?","Can we arrange for a call on Thursday?",
       "Перед прямым дополнением for не нужен.",
       "사물 앞에는 for를 쓰지 않습니다."),
 ],
}

L[99] = {
 "meaning": N("skip = «пропустить намеренно». В отличие от miss (не получилось), skip — это ваш выбор: пропустить приём пищи, пункт, встречу.",
              "'일부러 건너뛰다'입니다. 어쩔 수 없이 놓치는 miss와 달리 스스로 선택한 것입니다."),
 "examples":[
  E("I never skip leg day.","Я никогда не пропускаю день ног.","저는 하체 운동 절대 안 빼먹어요."),
  E("I skipped lunch to finish the report.","Я пропустил обед, чтобы дописать отчёт.","보고서 끝내려고 점심 걸렀어요."),
  E("Let's skip the introductions and get to the numbers.","Давайте пропустим вступление и перейдём к цифрам.","인사말은 생략하고 바로 숫자로 가죠."),
  E("You can skip that section.","Этот раздел можно пропустить.","그 부분은 건너뛰셔도 됩니다."),
  E("Don't skip the pre-installation check.","Не пропускайте предмонтажную проверку.","설치 전 점검은 생략하지 마세요."),
  E("I'll skip dessert, thanks.","Десерт пропущу, спасибо.","디저트는 괜찮습니다."),
 ],
 "dialogue":[
  D("A","You're limping.","Ты хромаешь.","절뚝거리시는데요."),
  D("B","Leg day. I never skip it.","День ног. Я его никогда не пропускаю.","하체 운동 날이요. 절대 안 빼먹어요."),
  D("A","Maybe you should, once in a while.","Может, стоит иногда пропускать.","가끔은 쉬어도 되지 않아요?"),
  D("B","That's how it starts.","Вот так всё и начинается.","그렇게 시작되는 거예요.",True),
 ],
 "notes":[
  N("skip — сознательно пропустил. miss — не смог. I skipped the meeting (не пошёл) / I missed the meeting (не успел).",
    "skip은 의도적, miss는 어쩔 수 없이입니다."),
  N("Let's skip… — способ ускорить совещание. Вежливее, чем Let's not waste time.",
    "회의를 빠르게 진행할 때 정중한 표현입니다."),
  N("skip a meal / skip breakfast — устойчиво. Про еду skip, не pass.",
    "식사를 거를 때는 skip을 씁니다."),
 ],
 "quiz":[
  BUILD("Я пропустил обед, чтобы дописать отчёт.","보고서 끝내려고 점심 걸렀어요.","I skipped lunch to finish the report.",["missed","for finishing"]),
  PICK("Вы сознательно не пошли на необязательную встречу","선택 사항인 모임에 일부러 안 갔습니다",
       "I skipped the meeting.","I missed the meeting.",
       "Сознательный выбор — skip. miss означало бы, что вы не смогли.",
       "의도적으로 안 간 것이므로 skip입니다."),
 ],
}

L[100] = {
 "meaning": N("spoil = «испортить впечатление, раскрыть сюжет, избаловать». Три значения одного слова, все три употребимы.",
              "'망치다, 스포일러를 하다, 오냐오냐 키우다'의 세 가지 뜻이 모두 쓰입니다."),
 "examples":[
  E("Don't spoil the movie! I haven't seen it yet.","Не спойлери фильм! Я его ещё не смотрел!","영화 스포 하지 마! 아직 안 봤어!"),
  E("I don't want to spoil the surprise.","Не хочу испортить сюрприз.","깜짝 선물을 망치고 싶지 않아요."),
  E("The weather spoiled an otherwise perfect trip.","Погода испортила в остальном идеальную поездку.","날씨만 아니었으면 완벽한 여행이었어요."),
  E("My grandparents spoil the kids.","Бабушка с дедушкой балуют детей.","할머니 할아버지가 애들을 너무 오냐오냐해요."),
  E("The milk has spoiled.","Молоко испортилось.","우유가 상했어요."),
  E("Let me spoil you tonight.","Сегодня позволь мне тебя побаловать.","오늘은 제가 호강시켜 드릴게요."),
 ],
 "dialogue":[
  D("A","Wait until you see the ending, it's when he…","Погоди, пока не увидишь концовку, там он…","엔딩 볼 때까지 기다려요, 거기서 걔가…"),
  D("B","Don't spoil the movie! I haven't seen it yet.","Не спойлери! Я ещё не смотрел!","스포 하지 마요! 아직 안 봤어요!"),
  D("A","Sorry. I'll stop.","Извини. Молчу.","미안해요. 그만할게요."),
  D("B","We'll talk after Friday.","Поговорим после пятницы.","금요일 지나고 얘기해요.",True),
 ],
 "notes":[
  N("spoiler как существительное вошло во все языки. Глагол spoil при этом шире: портить, баловать, протухать.",
    "명사 spoiler는 널리 쓰이지만, 동사 spoil은 뜻이 더 넓습니다."),
  N("spoil vs. ruin: ruin — безвозвратно и полностью, spoil — испортить впечатление или качество.",
    "ruin은 되돌릴 수 없는 파괴, spoil은 기분이나 품질을 해치는 것입니다."),
  N("Сотый глагол — и он же напоминание: одно слово живёт в трёх разных ситуациях. Именно поэтому базовых глаголов хватает, чтобы говорить обо всём.",
    "마지막 동사가 보여 주듯, 단어 하나가 세 가지 상황에서 살아 움직입니다. 기본 동사만으로 대부분을 말할 수 있는 이유입니다."),
 ],
 "quiz":[
  BUILD("Не хочу испортить сюрприз.","깜짝 선물을 망치고 싶지 않아요.","I don't want to spoil the surprise.",["ruin","spoiling"]),
  PICK("Друг начинает пересказывать фильм, который вы не видели","안 본 영화 줄거리를 말하려 할 때",
       "Don't spoil it for me.","Don't ruin it for me.",
       "О сюжете говорят spoil. ruin означало бы, что фильм испорчен физически.",
       "줄거리를 말할 때는 spoil을 씁니다."),
 ],
}
