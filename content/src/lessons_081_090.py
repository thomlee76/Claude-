# -*- coding: utf-8 -*-
from _helpers import E, D, N, BUILD, PICK
L = {}

L[81] = {
 "meaning": N("miss = «пропустить, не попасть, скучать». Общая идея: что-то прошло мимо вас — встреча, рейс, человек.",
              "'놓치다, 빠지다, 그리워하다'입니다. 무언가가 나를 지나쳤다는 개념입니다."),
 "examples":[
  E("I'm very sorry for missing our meetup yesterday.","Прошу прощения, что не пришёл вчера на встречу.","어제 모임에 못 가서 정말 죄송해요."),
  E("I missed my connecting flight in Istanbul.","Я опоздал на стыковочный рейс в Стамбуле.","이스탄불에서 환승 비행기를 놓쳤어요."),
  E("You missed a great presentation.","Ты пропустил отличную презентацию.","좋은 발표였는데 놓치셨네요."),
  E("I miss working with that team.","Скучаю по работе с той командой.","그 팀이랑 일하던 때가 그리워요."),
  E("Did I miss anything important?","Я пропустил что-то важное?","제가 중요한 거 놓친 거 있어요?"),
  E("We can't afford to miss this deadline.","Мы не можем позволить себе сорвать этот срок.","이번 기한은 절대 놓치면 안 됩니다."),
 ],
 "dialogue":[
  D("A","We waited until eight.","Мы ждали до восьми.","여덟 시까지 기다렸어요."),
  D("B","I'm very sorry for missing our meetup yesterday.","Прошу прощения, что не пришёл вчера.","어제 모임에 못 가서 정말 죄송해요."),
  D("A","What happened?","Что случилось?","무슨 일 있었어요?"),
  D("B","My flight was delayed four hours.","Мой рейс задержали на четыре часа.","비행기가 네 시간 지연됐어요.",True),
 ],
 "notes":[
  N("Sorry for missing… + -ing — стандартная форма извинения за пропуск. Не Sorry for miss.",
    "for 뒤에는 -ing를 씁니다."),
  N("miss somebody — скучать. miss a meeting — пропустить. Одно слово, два чувства: контекст различает.",
    "사람에는 '그립다', 일정에는 '놓치다'입니다."),
  N("Did I miss anything? — вежливый вход в разговор, который уже идёт. Работает и на совещании, и в чате.",
    "이미 진행 중인 대화에 합류할 때 쓰는 표현입니다."),
 ],
 "quiz":[
  BUILD("Прошу прощения, что пропустил вчерашнюю встречу.","어제 모임에 못 가서 죄송해요.","I'm sorry for missing our meetup yesterday.",["to miss","miss"]),
  PICK("«Я опоздал на стыковочный рейс»","'환승 비행기를 놓쳤어요'는?",
       "I missed my connecting flight.","I lost my connecting flight.",
       "Опоздание на транспорт — только miss.",
       "교통편을 놓친 것은 miss입니다."),
 ],
}

L[82] = {
 "meaning": N("finish без дополнения = «закончиться, завершиться с таким-то результатом». Подлежащее — событие, а не человек.",
              "목적어 없이 쓰는 finish는 '끝나다'입니다. 주어가 사건입니다."),
 "examples":[
  E("The game finished 4-3 in extra innings.","Матч закончился 4:3 в дополнительное время.","경기가 연장에서 4대 3으로 끝났어요."),
  E("What time does the conference finish?","Во сколько заканчивается конференция?","학회는 몇 시에 끝나요?"),
  E("The meeting finished early for once.","Хоть раз совещание закончилось раньше.","모처럼 회의가 일찍 끝났어요."),
  E("He finished second in the tender.","В тендере он занял второе место.","입찰에서 2위로 마감됐어요."),
  E("The quarter finished stronger than expected.","Квартал завершился сильнее, чем ожидалось.","분기 실적이 예상보다 좋게 마감됐습니다."),
  E("Let's finish on time today.","Давайте сегодня закончим вовремя.","오늘은 제시간에 끝냅시다."),
 ],
 "dialogue":[
  D("A","I fell asleep in the seventh.","Я уснул на седьмом иннинге.","7회에 잠들었어요."),
  D("B","You missed the best part. The game finished 4-3 in extra innings.","Ты пропустил самое интересное. Матч закончился 4:3 в дополнительное.","제일 좋은 데를 놓치셨네요. 연장에서 4대 3으로 끝났어요."),
  D("A","Who scored?","Кто забил?","누가 냈어요?"),
  D("B","The guy they almost released last season.","Тот, кого чуть не отпустили в прошлом сезоне.","작년에 방출될 뻔한 선수요.",True),
 ],
 "notes":[
  N("The meeting finished — событие само закончилось. We finished the meeting — мы его завершили. Урок 83 про второе.",
    "사건이 주어면 자동사, 사람이 주어면 타동사입니다."),
  N("finish / end почти синонимы здесь. finish чаще о запланированном завершении, end о конце вообще.",
    "finish는 예정된 종료, end는 일반적인 끝입니다."),
  N("finish second / finish third — занять место в соревновании или тендере.",
    "순위를 말할 때도 finish를 씁니다."),
 ],
 "quiz":[
  BUILD("Во сколько заканчивается конференция?","학회는 몇 시에 끝나요?","What time does the conference finish?",["is finishing","finished"]),
  PICK("«Совещание закончилось раньше»","'회의가 일찍 끝났어요'는?",
       "The meeting finished early.","The meeting was finished early by us.",
       "Событие само завершилось — активная форма без исполнителя.",
       "사건이 주어면 능동형으로 간단히 씁니다."),
 ],
}

L[83] = {
 "meaning": N("finish + объект = «доесть, дочитать, доделать до конца». Важно: не «начать заканчивать», а именно израсходовать полностью.",
              "finish + 목적어는 '다 먹다, 다 읽다, 끝까지 하다'입니다."),
 "examples":[
  E("I can't finish this cake — it's too sweet.","Я не смогу доесть этот торт — слишком сладкий.","이 케이크 너무 달아서 다 못 먹겠어요."),
  E("Did you finish the report?","Ты дописал отчёт?","보고서 다 쓰셨어요?"),
  E("Let me finish this call and I'll come over.","Дай договорю по телефону и подойду.","통화만 끝내고 갈게요."),
  E("I finished the book on the flight.","Я дочитал книгу в самолёте.","비행기에서 책을 다 읽었어요."),
  E("Finish your vegetables first.","Сначала доешь овощи.","채소부터 다 먹어."),
  E("We need to finish this by Friday.","Нам надо закончить это к пятнице.","금요일까지 끝내야 합니다."),
 ],
 "dialogue":[
  D("A","Not hungry anymore?","Уже наелась?","이제 배부르세요?"),
  D("B","I can't finish this cake — it's too sweet.","Не смогу доесть торт, слишком сладкий.","이 케이크 너무 달아서 다 못 먹겠어요."),
  D("A","Should we get a box?","Взять контейнер?","포장해 갈까요?"),
  D("B","Good idea. It'll be fine tomorrow with coffee.","Хорошая идея. Завтра с кофе пойдёт.","좋아요. 내일 커피랑 먹으면 괜찮겠네요.",True),
 ],
 "notes":[
  N("finish + -ing: I finished reading. Не finish to read. После finish всегда -ing.",
    "finish 뒤에는 to부정사가 아니라 -ing가 옵니다."),
  N("Let me finish — «дай договорить». Уже встречалось в уроке 46 с let.",
    "46과의 let과 함께 쓰이는 표현입니다."),
  N("В переписке: I'll finish it by Friday — обязательство. I'll try to finish — нет. Выбирайте осознанно.",
    "메일에서 약속의 강도가 달라지니 주의하세요."),
 ],
 "quiz":[
  BUILD("Я дочитал книгу в самолёте.","비행기에서 책을 다 읽었어요.","I finished the book on the flight.",["to read","in"]),
  PICK("«Я закончил читать»","'다 읽었어요'는?",
       "I finished reading.","I finished to read.",
       "После finish идёт -ing.","finish 뒤에는 -ing를 씁니다."),
 ],
}

L[84] = {
 "meaning": N("belong = «принадлежать, быть на своём месте». С in или on — о месте вещи. С to — о владельце.",
              "'제자리에 있다, ~의 것이다'입니다. in/on은 자리, to는 소유입니다."),
 "examples":[
  E("These mugs belong in this cupboard.","Эти кружки стоят вот в этом шкафу.","이 컵들은 이 찬장에 놓는 거예요."),
  E("Does this file belong to you?","Эта папка ваша?","이 파일 혹시 본인 거예요?"),
  E("That doesn't belong here.","Это не отсюда.","그건 여기 있을 게 아니에요."),
  E("The patent belongs to the manufacturer.","Патент принадлежит производителю.","특허는 제조사 소유입니다."),
  E("I felt like I didn't belong there.","Я чувствовал себя там чужим.","거기선 제가 겉도는 느낌이었어요."),
  E("Where do these forms belong?","Куда подшиваются эти формы?","이 양식들은 어디에 넣어요?"),
 ],
 "dialogue":[
  D("A","I put the mugs on the counter.","Я поставил кружки на стойку.","컵들은 조리대에 올려놨어요."),
  D("B","Thanks. Actually, these mugs belong in this cupboard.","Спасибо. Вообще-то они стоят в этом шкафу.","고마워요. 근데 이 컵들은 이 찬장에 놓는 거예요."),
  D("A","Noted. Second shelf?","Понял. Вторая полка?","알겠어요. 두 번째 칸이요?"),
  D("B","Second shelf, handles facing out.","Вторая полка, ручками наружу.","네, 손잡이는 바깥쪽으로요.",True),
 ],
 "notes":[
  N("belong in — место, где вещь должна быть. belong to — кому принадлежит. Предлог меняет смысл целиком.",
    "belong in은 자리, belong to는 소유입니다."),
  N("belong не ставится в Continuous: This is belonging to me ✗. Это состояние.",
    "belong은 상태 동사라 진행형이 안 됩니다."),
  N("В юридических текстах: The rights belong to… — стандартная формулировка о правах и патентах.",
    "권리나 특허 관련 문서에서 표준 표현입니다."),
 ],
 "quiz":[
  BUILD("Патент принадлежит производителю.","특허는 제조사 소유입니다.","The patent belongs to the manufacturer.",["in","is belonging"]),
  PICK("«Эти кружки стоят в этом шкафу»","'이 컵은 이 찬장에 놓는 거예요'는?",
       "These mugs belong in this cupboard.","These mugs belong to this cupboard.",
       "Про место вещи — belong in. belong to означало бы, что шкаф ими владеет.",
       "자리를 말할 때는 in을 씁니다."),
 ],
}

L[85] = {
 "meaning": N("afford = «быть в состоянии позволить себе». Почти всегда с can или could, чаще в отрицании. Не только о деньгах — о времени и риске тоже.",
              "'~할 여유가 있다'입니다. 보통 can/could와 함께 쓰고, 돈뿐 아니라 시간과 위험에도 씁니다."),
 "examples":[
  E("I wish I could afford to buy a place around here.","Хотел бы я иметь возможность купить здесь жильё.","이 동네에 집 살 형편이 됐으면 좋겠어요."),
  E("We can't afford another delay.","Ещё одну задержку мы себе позволить не можем.","추가 지연은 감당할 수 없습니다."),
  E("Can you afford to take a week off?","Можешь позволить себе неделю отпуска?","일주일 쉴 여유 되세요?"),
  E("Not everyone can afford this model.","Не каждый может позволить себе эту модель.","이 모델은 아무나 살 수 있는 게 아니에요."),
  E("I couldn't afford it back then.","Тогда я не мог себе этого позволить.","그땐 그럴 형편이 안 됐어요."),
  E("We can't afford to lose this market.","Мы не можем позволить себе потерять этот рынок.","이 시장을 잃을 수는 없습니다."),
 ],
 "dialogue":[
  D("A","You've been looking at that window for a while.","Ты давно смотришь на эту витрину.","한참을 그 유리창만 보고 계시네요."),
  D("B","I wish I could afford to buy a place around here.","Хотел бы я иметь возможность купить здесь жильё.","이 동네에 집 살 형편이 됐으면 좋겠어요."),
  D("A","Prices have doubled in five years.","За пять лет цены удвоились.","5년 만에 두 배가 됐어요."),
  D("B","And they're still going up.","И всё ещё растут.","그런데 아직도 오르고 있죠.",True),
 ],
 "notes":[
  N("afford почти не употребляется без can, could, be able to. I afford it ✗ → I can afford it ✓",
    "afford는 보통 can과 함께 씁니다."),
  N("afford to + глагол или afford + существительное: afford a car / afford to buy a car.",
    "afford 뒤에는 명사 또는 to부정사가 옵니다."),
  N("We can't afford to… — сильный аргумент в отчёте руководству: переводит вопрос из «хочется» в «нельзя иначе».",
    "경영진 보고에서 강력한 논거가 되는 표현입니다."),
 ],
 "quiz":[
  BUILD("Ещё одну задержку мы себе позволить не можем.","추가 지연은 감당할 수 없습니다.","We can't afford another delay.",["afford to","don't"]),
  PICK("«Я не могу себе это позволить»","'그럴 형편이 안 돼요'는?",
       "I can't afford it.","I don't afford it.",
       "afford требует can или could.","afford는 can과 함께 씁니다."),
 ],
}

L[86] = {
 "meaning": N("grab = «взять быстро, схватить, занять». Разговорный синоним take и get с оттенком «быстро, без церемоний».",
              "'빨리 잡다, 집다'입니다. take나 get의 구어 표현으로, 격식 없이 재빠르게라는 뉘앙스입니다."),
 "examples":[
  E("Please grab a seat and we'll get started.","Присаживайтесь, и начнём.","자리에 앉으시면 시작하겠습니다."),
  E("Let's grab lunch.","Давай быстро пообедаем.","점심 간단히 먹죠."),
  E("Grab your coat, we're leaving.","Бери пальто, выходим.","외투 챙기세요, 나갑니다."),
  E("Can you grab me a coffee on the way?","Возьмёшь мне кофе по дороге?","오는 길에 커피 하나만 사다 주실래요?"),
  E("I'll grab the file from my desk.","Сейчас возьму файл со стола.","책상에서 파일 가져올게요."),
  E("Grab a seat anywhere.","Садитесь где угодно.","아무 데나 앉으세요."),
 ],
 "dialogue":[
  D("A","Are we waiting for anyone else?","Мы кого-то ещё ждём?","더 오실 분 있나요?"),
  D("B","No. Please grab a seat and we'll get started.","Нет. Присаживайтесь, и начнём.","아니요. 자리에 앉으시면 시작하겠습니다."),
  D("A","Should I close the door?","Дверь закрыть?","문 닫을까요?"),
  D("B","Please. And the blinds, if you don't mind.","Да, пожалуйста. И жалюзи, если не сложно.","네. 괜찮으시면 블라인드도요.",True),
 ],
 "notes":[
  N("grab — разговорное. На официальной встрече с министерством лучше Please take a seat или Please have a seat.",
    "공식 자리에서는 take a seat이나 have a seat을 씁니다."),
  N("grab lunch / grab a coffee / grab a bite — всегда о быстром и неформальном.",
    "간단하고 격식 없는 자리를 뜻합니다."),
  N("Can you grab me…? — просьба к коллеге, не к клиенту. Дистанция имеет значение.",
    "동료에게는 괜찮지만 고객에게는 쓰지 않습니다."),
 ],
 "quiz":[
  BUILD("Возьмёшь мне кофе по дороге?","오는 길에 커피 하나만 사다 주실래요?","Can you grab me a coffee on the way?",["for me","in"]),
  PICK("Официальная встреча с делегацией министерства","부처 대표단과의 공식 면담에서",
       "Please have a seat.","Please grab a seat.",
       "grab слишком неформально для официального протокола.",
       "grab은 공식 자리에 어울리지 않습니다."),
 ],
}

L[87] = {
 "meaning": N("fix = «починить, исправить, уладить». О технике, ошибках, отношениях, проблемах. Один из самых универсальных глаголов.",
              "'고치다, 바로잡다, 해결하다'입니다. 기계, 실수, 관계, 문제 모두에 씁니다."),
 "examples":[
  E("I'm not sure if we can fix our marriage.","Не уверен, что мы сможем починить наш брак.","우리 결혼 생활을 되돌릴 수 있을지 모르겠어요."),
  E("Can you fix it by Friday?","Сможете починить к пятнице?","금요일까지 고칠 수 있을까요?"),
  E("We fixed the error in the invoice.","Мы исправили ошибку в инвойсе.","인보이스 오류는 수정했습니다."),
  E("The engineer will fix it on site.","Инженер починит на месте.","엔지니어가 현장에서 수리할 겁니다."),
  E("Let's fix a date for the training.","Давайте зафиксируем дату обучения.","교육 일정을 확정하죠."),
  E("It's not something money can fix.","Это не то, что решается деньгами.","돈으로 해결될 문제가 아니에요."),
 ],
 "dialogue":[
  D("A","Have you two talked?","Вы разговаривали?","두 분 얘기는 해 보셨어요?"),
  D("B","We have. I'm not sure if we can fix our marriage.","Разговаривали. Не уверен, что мы сможем это починить.","해 봤어요. 되돌릴 수 있을지 모르겠어요."),
  D("A","Have you considered counselling?","Про психолога думали?","상담은 생각해 보셨어요?"),
  D("B","She suggested it. I said I'd think about it.","Она предложила. Я сказал, что подумаю.","아내가 제안했어요. 생각해 보겠다고 했고요.",True),
 ],
 "notes":[
  N("fix — починить. repair — формальнее, о серьёзном ремонте. В сервисной документации чаще repair, в разговоре fix.",
    "문서는 repair, 대화는 fix가 자연스럽습니다."),
  N("fix a date / fix a time — назначить и зафиксировать. Полезно при согласовании визитов.",
    "일정을 확정할 때 씁니다."),
  N("a quick fix — «временное решение». В обсуждении рекламаций важно различать a quick fix и a real solution.",
    "a quick fix는 임시방편이라는 뜻입니다."),
 ],
 "quiz":[
  BUILD("Мы исправили ошибку в инвойсе.","인보이스 오류는 수정했습니다.","We fixed the error in the invoice.",["repaired","on"]),
  PICK("В сервисном отчёте для клиента","고객에게 보내는 서비스 보고서에서",
       "The unit was repaired on site.","The unit was fixed up on site.",
       "В официальном документе repair точнее и нейтральнее.",
       "공식 문서에서는 repair가 적절합니다."),
 ],
}

L[88] = {
 "meaning": N("deserve = «заслуживать». О заслуженной награде или заслуженном наказании. Сильное оценочное слово.",
              "'~를 받을 만하다'입니다. 보상과 벌 모두에 씁니다. 평가가 강한 단어입니다."),
 "examples":[
  E("I think they got what they deserve.","Думаю, они получили по заслугам.","걔네는 자업자득이에요."),
  E("She deserves a promotion.","Она заслуживает повышения.","그분은 승진할 자격이 있어요."),
  E("You deserve a break.","Ты заслужил отдых.","좀 쉬셔도 돼요."),
  E("Our team deserves more credit for this.","Наша команда заслуживает большего признания за это.","이번 건은 저희 팀이 더 인정받아야 합니다."),
  E("That supplier doesn't deserve our business.","Этот поставщик не заслуживает работы с нами.","그 공급사는 저희와 거래할 자격이 없어요."),
  E("It deserves a closer look.","Это заслуживает более внимательного рассмотрения.","좀 더 자세히 볼 만합니다."),
 ],
 "dialogue":[
  D("A","Did you see the news about that company?","Видел новость про ту компанию?","그 회사 뉴스 보셨어요?"),
  D("B","I did. I think they got what they deserve.","Видел. Думаю, они получили по заслугам.","봤어요. 자업자득이죠."),
  D("A","That's harsh.","Жёстко.","좀 심한데요."),
  D("B","They were warned three times.","Их предупреждали три раза.","세 번이나 경고받았잖아요.",True),
 ],
 "notes":[
  N("deserve не ставится в Continuous: He is deserving it ✗. Это оценка, а не действие.",
    "deserve는 진행형으로 쓰지 않습니다."),
  N("deserve + существительное или to + глагол: deserves a raise / deserves to know.",
    "deserve 뒤에는 명사나 to부정사가 옵니다."),
  N("deserves a closer look — деловая формула: предлагает вернуться к вопросу, не отвергая его.",
    "안건을 거절하지 않고 보류할 때 유용합니다."),
 ],
 "quiz":[
  BUILD("Она заслуживает повышения.","그분은 승진할 자격이 있어요.","She deserves a promotion.",["is deserving","to promotion"]),
  PICK("«Он заслуживает знать правду»","'그는 진실을 알 자격이 있어요'는?",
       "He deserves to know the truth.","He deserves knowing the truth.",
       "После deserve перед глаголом идёт to.","deserve 뒤 동사에는 to를 씁니다."),
 ],
}

L[89] = {
 "meaning": N("would not mind = «не возражал бы, вполне устроит». Мягкое согласие или ненавязчивое пожелание. Осторожный, вежливый тон.",
              "'~해도 괜찮다, ~하면 좋겠다'입니다. 부드럽고 조심스러운 동의나 희망입니다."),
 "examples":[
  E("I wouldn't mind staying at this hotel.","Я бы не отказался остановиться в этом отеле.","이 호텔이면 저는 좋아요."),
  E("I wouldn't mind a coffee.","От кофе бы не отказался.","커피 한잔이면 좋겠네요."),
  E("Would you mind sending it again?","Не могли бы вы прислать ещё раз?","다시 보내 주실 수 있을까요?"),
  E("I don't mind waiting.","Я не против подождать.","기다려도 괜찮아요."),
  E("Do you mind if I join you?","Не возражаете, если я присоединюсь?","합석해도 될까요?"),
  E("She wouldn't mind a change of scenery.","Она была бы не против сменить обстановку.","그분도 환경을 좀 바꾸고 싶어 하실 거예요."),
 ],
 "dialogue":[
  D("A","This is where they'd put us for the conference.","Вот здесь нас разместят на время конференции.","학회 때 저희 묵을 곳이 여기예요."),
  D("B","I wouldn't mind staying at this hotel.","Я бы не отказался тут остановиться.","이 호텔이면 저는 좋아요."),
  D("A","It's a fifteen-minute walk to the venue.","До площадки пятнадцать минут пешком.","행사장까지 걸어서 15분이에요."),
  D("B","Even better.","Тем лучше.","더 좋네요.",True),
 ],
 "notes":[
  N("Would you mind + -ing — очень вежливая просьба. Would you mind sending, не Would you mind to send.",
    "Would you mind 뒤에는 -ing가 옵니다."),
  N("Ответ на Do you mind…? : разрешение — Not at all / Of course not. Слово Yes означает отказ.",
    "허락은 Not at all입니다. Yes는 거절이 됩니다."),
  N("I wouldn't mind… — деликатный способ высказать пожелание, не требуя. Полезно с руководством.",
    "요구하지 않고 희망을 전하는 표현입니다."),
 ],
 "quiz":[
  BUILD("Не могли бы вы прислать ещё раз?","다시 보내 주실 수 있을까요?","Would you mind sending it again?",["to send","send"]),
  PICK("Вас спросили Do you mind if I sit here? Вы не против","Do you mind if I sit here?에 괜찮다고 답할 때",
       "Not at all.","Yes, please.",
       "Вопрос значит «вы против?», поэтому согласие — отрицание.",
       "'싫으세요?'라는 뜻이므로 부정으로 답합니다."),
 ],
}

L[90] = {
 "meaning": N("book как глагол = «забронировать». Британское по происхождению, но понятно везде. Можно бронировать кому-то: book us a room.",
              "동사 book은 '예약하다'입니다. book + 사람 + 사물 형태도 가능합니다."),
 "examples":[
  E("I booked us a room at The Shilla Seoul for our anniversary.","Я забронировал нам номер в The Shilla Seoul на годовщину.","기념일이라 신라호텔에 방 잡았어요."),
  E("Have you booked your flight yet?","Ты уже забронировал рейс?","항공권 예약하셨어요?"),
  E("The restaurant is fully booked tonight.","Ресторан сегодня полностью забронирован.","오늘 그 식당 예약 다 찼어요."),
  E("I'll book a meeting room for two o'clock.","Забронирую переговорную на два часа.","두 시로 회의실 잡을게요."),
  E("We're booked through March.","У нас всё занято до марта.","3월까지 일정이 꽉 찼습니다."),
  E("Book it before the price goes up.","Бронируй, пока цена не выросла.","가격 오르기 전에 예약하세요."),
 ],
 "dialogue":[
  D("A","You've been secretive all week.","Ты всю неделю что-то скрываешь.","일주일 내내 뭔가 숨기시더라고요."),
  D("B","I booked us a room at The Shilla for our anniversary.","Я забронировал нам номер в The Shilla на годовщину.","기념일이라 신라호텔에 방 잡았어요."),
  D("A","You didn't.","Да ладно.","진짜요?"),
  D("B","Friday night. Pack something nice.","В пятницу вечером. Возьми что-нибудь нарядное.","금요일 밤이요. 좋은 옷 챙겨요.",True),
 ],
 "notes":[
  N("book — британское, reserve — американское, make a reservation — нейтральное и самое формальное.",
    "book은 영국식, reserve는 미국식, make a reservation은 가장 격식 있는 표현입니다."),
  N("fully booked — мест нет. Стандартная формулировка отелей и ресторанов.",
    "fully booked은 '예약 마감'입니다."),
  N("В уроке 10 уже было: You have to book way in advance. Та же конструкция, теперь с адресатом.",
    "10과의 표현과 같은 동사입니다."),
 ],
 "quiz":[
  BUILD("Забронирую переговорную на два часа.","두 시로 회의실 잡을게요.","I'll book a meeting room for two o'clock.",["at","to"]),
  PICK("«Ресторан сегодня полностью забронирован»","'오늘 예약 다 찼어요'는?",
       "The restaurant is fully booked tonight.","The restaurant is full booked tonight.",
       "Устойчиво — fully booked, с наречием.","fully booked로 굳어진 표현입니다."),
 ],
}
