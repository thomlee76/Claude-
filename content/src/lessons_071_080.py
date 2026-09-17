# -*- coding: utf-8 -*-
from _helpers import E, D, N, BUILD, PICK
L = {}

L[71] = {
 "meaning": N("lose = «проиграть, потерять, лишиться». Три круга значений: спорт и конкурсы, потерянные вещи, утраченные возможности.",
              "'지다, 잃다, 놓치다'입니다. 경기, 물건, 기회 모두에 씁니다."),
 "examples":[
  E("I just can't believe we lost.","Просто не верится, что мы проиграли.","우리가 졌다는 게 믿기지 않아요."),
  E("I lost my passport in Bangkok.","Я потерял паспорт в Бангкоке.","방콕에서 여권을 잃어버렸어요."),
  E("We lost the tender to a Chinese supplier.","Мы проиграли тендер китайскому поставщику.","중국 업체한테 입찰에서 졌어요."),
  E("Don't lose your temper.","Не выходи из себя.","화내지 마세요."),
  E("I lost my train of thought.","Я потерял мысль.","무슨 말 하려다 잊어버렸어요."),
  E("We can't afford to lose this client.","Мы не можем позволить себе потерять этого клиента.","이 고객을 잃으면 안 됩니다."),
 ],
 "dialogue":[
  D("A","You watched until the end?","Ты досмотрел до конца?","끝까지 보셨어요?"),
  D("B","I did. I just can't believe we lost.","Досмотрел. Просто не верится, что мы проиграли.","봤죠. 우리가 졌다는 게 믿기지 않아요."),
  D("A","It was close.","Было близко.","아슬아슬했죠."),
  D("B","Close doesn't count.","Близко не считается.","아깝다고 이긴 건 아니니까요.",True),
 ],
 "notes":[
  N("lose to somebody — проиграть кому-то. We lost to them. Предлог обязателен.",
    "누구에게 졌는지는 to로 표시합니다."),
  N("lose vs. miss: lose a flight — потерять рейс как таковой (редко), miss a flight — опоздать на него. Нужен miss.",
    "비행기를 놓친 것은 lose가 아니라 miss입니다."),
  N("lose your temper — выйти из себя. В деловой среде Let's not lose our tempers — способ остановить эскалацию.",
    "감정이 격해질 때 상황을 진정시키는 표현입니다."),
 ],
 "quiz":[
  BUILD("Мы проиграли тендер китайскому поставщику.","중국 업체한테 입찰에서 졌어요.","We lost the tender to a Chinese supplier.",["from","against"]),
  PICK("«Я опоздал на рейс»","'비행기를 놓쳤어요'는?",
       "I missed my flight.","I lost my flight.",
       "Опоздание на транспорт — miss, не lose.",
       "교통편을 놓친 것은 miss입니다."),
 ],
}

L[72] = {
 "meaning": N("catch = «успеть на транспорт, поймать, уловить». Общая идея: схватить то, что движется или может ускользнуть.",
              "'잡다, 타다, 알아듣다'입니다. 움직이는 것을 붙잡는다는 개념입니다."),
 "examples":[
  E("I have to catch the bus at 7 a.m.","Мне надо успеть на автобус в семь утра.","아침 7시 버스를 타야 해요."),
  E("I barely caught the last train.","Я еле успел на последний поезд.","막차 간신히 탔어요."),
  E("Sorry, I didn't catch your name.","Извините, я не расслышал ваше имя.","죄송한데 성함을 못 들었어요."),
  E("I caught a cold on the plane.","Я простудился в самолёте.","비행기에서 감기 걸렸어요."),
  E("Let's catch up next week.","Давай созвонимся на следующей неделе.","다음 주에 한번 봬요."),
  E("Did you catch the end of the meeting?","Ты застал конец совещания?","회의 끝부분 들으셨어요?"),
 ],
 "dialogue":[
  D("A","Want to grab one more?","Ещё по одной?","한 잔 더 할래요?"),
  D("B","I can't. I have to catch the bus at 7 a.m.","Не могу. Мне надо успеть на автобус в семь утра.","안 되겠어요. 아침 7시 버스를 타야 해서요."),
  D("A","That's brutal.","Это жёстко.","빡세네요."),
  D("B","Airport run. Client's arriving.","Еду в аэропорт. Клиент прилетает.","공항 가야 해요. 거래처가 도착해서요.",True),
 ],
 "notes":[
  N("I didn't catch that — самая вежливая просьба повторить. Не I don't understand, которое звучит как «вы говорите непонятно».",
    "다시 말해 달라고 할 때 가장 정중한 표현입니다."),
  N("catch a cold / catch the flu — заболеть. Устойчиво, как get a cold.",
    "감기에 걸릴 때 catch도 씁니다."),
  N("catch up — «наверстать» и «встретиться, чтобы обменяться новостями». Let's catch up soon — тёплое, но ни к чему не обязывающее.",
    "catch up은 '만나서 근황을 나누다'입니다."),
 ],
 "quiz":[
  BUILD("Извините, я не расслышал ваше имя.","죄송한데 성함을 못 들었어요.","Sorry, I didn't catch your name.",["hear","take"]),
  PICK("Собеседник говорит тихо, вы просите повторить","상대 목소리가 작아 다시 물을 때",
       "Sorry, I didn't catch that.","Sorry, I don't understand you.",
       "Второй вариант перекладывает вину на собеседника. Первый нейтрален.",
       "둘째는 상대 탓으로 들립니다."),
 ],
}

L[73] = {
 "meaning": N("cost = «стоить». Подлежащее — товар или услуга. Может брать двойное дополнение: что-то стоит кому-то сколько-то.",
              "'(비용이) 들다'입니다. 물건이나 서비스가 주어가 됩니다."),
 "examples":[
  E("It costs too much.","Это слишком дорого.","그건 너무 비싸요."),
  E("How much does shipping cost?","Сколько стоит доставка?","배송비가 얼마예요?"),
  E("The repair cost us three thousand dollars.","Ремонт обошёлся нам в три тысячи долларов.","수리비로 3천 달러 들었어요."),
  E("That mistake cost us the contract.","Эта ошибка стоила нам контракта.","그 실수로 계약을 놓쳤어요."),
  E("Installation costs extra.","Монтаж оплачивается отдельно.","설치는 별도 비용입니다."),
  E("It won't cost you anything to ask.","Спросить вам ничего не будет стоить.","물어보는 건 공짜예요."),
 ],
 "dialogue":[
  D("A","What do you think of their proposal?","Что думаешь об их предложении?","그쪽 제안 어떻게 보세요?"),
  D("B","The specs are fine. It costs too much.","Характеристики нормальные. Слишком дорого.","사양은 괜찮은데, 너무 비싸요."),
  D("A","How far off are we?","Насколько мы расходимся?","차이가 얼마나 나요?"),
  D("B","About fifteen percent.","Процентов на пятнадцать.","15퍼센트 정도요.",True),
 ],
 "notes":[
  N("cost — неправильный глагол без изменений: cost / cost / cost. It cost us a lot last year.",
    "cost는 형태가 변하지 않습니다."),
  N("Порядок: cost + кому + сколько. It cost us $3,000. Без предлога.",
    "cost + 사람 + 금액 순서로, 전치사를 쓰지 않습니다."),
  N("cost переносно — «стоить чего-то ценного»: cost us the contract, cost him his job. Сильная формулировка.",
    "비유적으로 '~를 잃게 하다'라는 뜻도 있습니다."),
 ],
 "quiz":[
  BUILD("Сколько стоит доставка?","배송비가 얼마예요?","How much does shipping cost?",["is costing","price"]),
  PICK("«Ремонт обошёлся нам в три тысячи»","'수리비로 3천 달러 들었어요'는?",
       "The repair cost us three thousand dollars.","The repair costed us three thousand dollars.",
       "Прошедшее время у cost совпадает с начальной формой.",
       "cost의 과거형은 cost입니다."),
 ],
}

L[74] = {
 "meaning": N("offer = «предложить». О цене, помощи, условиях, должности. Ключевой глагол переговоров.",
              "'제안하다, 제시하다'입니다. 가격, 도움, 조건, 자리 모두에 씁니다."),
 "examples":[
  E("Twenty thousand won is the most I can offer.","Двадцать тысяч вон — мой максимум.","2만 원이 제가 드릴 수 있는 최대예요."),
  E("What can you offer us on the unit price?","Что вы можете предложить по цене за единицу?","단가는 어느 정도까지 가능하세요?"),
  E("They offered him a position in Dubai.","Ему предложили должность в Дубае.","두바이 자리를 제안받으셨어요."),
  E("Can I offer you something to drink?","Могу предложить вам что-нибудь выпить?","마실 것 좀 드릴까요?"),
  E("We're offering free installation this quarter.","В этом квартале мы предлагаем бесплатный монтаж.","이번 분기에는 설치를 무상으로 제공합니다."),
  E("That's the best I can offer.","Это лучшее, что я могу предложить.","이게 제가 드릴 수 있는 최선입니다."),
 ],
 "dialogue":[
  D("A","Can you do any better on the price?","Можете сделать лучше по цене?","가격 좀 더 안 될까요?"),
  D("B","Twenty thousand won is the most I can offer.","Двадцать тысяч вон — мой максимум.","2만 원이 제가 드릴 수 있는 최대예요."),
  D("A","And if I take twice as many?","А если возьму вдвое больше?","두 배로 가져가면요?"),
  D("B","Then we can talk.","Тогда есть о чём поговорить.","그럼 얘기가 달라지죠.",True),
 ],
 "notes":[
  N("That's the best I can offer — вежливый способ обозначить предел, не говоря «нет».",
    "no라고 하지 않고 한계를 밝히는 표현입니다."),
  N("offer somebody something — без предлога. Или offer something to somebody.",
    "offer + 사람 + 사물 또는 offer + 사물 + to + 사람입니다."),
  N("an offer — существительное: We received an offer. Разное ударение: глагол offer, существительное offer — одинаково, различает грамматика.",
    "명사로도 그대로 offer를 씁니다."),
 ],
 "quiz":[
  BUILD("Это лучшее, что я могу предложить.","이게 제가 드릴 수 있는 최선입니다.","That's the best I can offer.",["propose","to offer"]),
  PICK("Обозначить предел скидки, не отказывая прямо","할인 한계를 직접 거절 없이 말할 때",
       "That's the best I can offer.","No, I can't do that.",
       "Первый вариант сохраняет переговоры открытыми.",
       "첫째 표현은 협상의 여지를 남깁니다."),
 ],
}

L[75] = {
 "meaning": N("require = «требовать, требоваться». Формальнее, чем need. В документах, регламентах и технических требованиях — основной глагол.",
              "'요구하다, 필요로 하다'입니다. need보다 격식 있고 문서에서 많이 씁니다."),
 "examples":[
  E("Losing weight requires discipline.","Похудение требует дисциплины.","살 빼려면 절제가 필요해요."),
  E("This model requires annual calibration.","Эта модель требует ежегодной калибровки.","이 모델은 연 1회 교정이 필요합니다."),
  E("Registration requires three documents.","Для регистрации требуются три документа.","등록에는 서류 세 가지가 필요합니다."),
  E("The job requires frequent travel.","Работа требует частых командировок.","이 업무는 출장이 잦습니다."),
  E("No experience required.","Опыт не требуется.","경력 무관입니다."),
  E("Please provide any additional documents required.","Просьба предоставить все необходимые дополнительные документы.","필요한 추가 서류를 제출해 주시기 바랍니다."),
 ],
 "dialogue":[
  D("A","You look different lately.","Ты в последнее время выглядишь иначе.","요즘 좀 달라 보이세요."),
  D("B","Down eight kilos. Losing weight requires discipline, nothing else.","Минус восемь кило. Похудение требует дисциплины, больше ничего.","8킬로 뺐어요. 살 빼는 건 절제가 전부예요."),
  D("A","No special diet?","Без особой диеты?","특별한 식단 없이요?"),
  D("B","No shortcuts. Just consistency.","Без коротких путей. Просто регулярность.","지름길은 없어요. 꾸준함이죠.",True),
 ],
 "notes":[
  N("require формальнее need. В письме партнёру: This requires your approval. В разговоре: This needs your approval.",
    "문서는 require, 대화는 need가 자연스럽습니다."),
  N("required как прилагательное: the required documents, no experience required. Очень частая форма.",
    "형용사 required 형태로 많이 씁니다."),
  N("requirements — требования, в том числе технические. Полезно в вашей отрасли: regulatory requirements.",
    "requirements는 '요구 사항'으로 기술 문서에 자주 나옵니다."),
 ],
 "quiz":[
  BUILD("Эта модель требует ежегодной калибровки.","이 모델은 연 1회 교정이 필요합니다.","This model requires annual calibration.",["needs to","is required"]),
  PICK("Формулировка в техническом документе","기술 문서에 쓸 표현",
       "Annual calibration is required.","Annual calibration is needed to be done.",
       "Первый вариант — стандарт документов. Второй громоздкий.",
       "문서에서는 첫째가 표준입니다."),
 ],
}

L[76] = {
 "meaning": N("gain = «приобрести, набрать, обрести». О том, что прибавляется: вес, опыт, уверенность, доля рынка.",
              "'얻다, 늘리다'입니다. 체중, 경험, 자신감, 점유율 등이 늘어나는 것입니다."),
 "examples":[
  E("I gained a lot of confidence at the English speaking workshop last week.","На воркшопе по английскому на прошлой неделе я сильно прибавил в уверенности.","지난주 영어 회화 워크숍에서 자신감이 많이 붙었어요."),
  E("I gained three kilos over the holidays.","За праздники я набрал три килограмма.","연휴 동안 3킬로 쪘어요."),
  E("We gained market share in Central Asia.","Мы увеличили долю рынка в Центральной Азии.","중앙아시아에서 시장 점유율이 올랐습니다."),
  E("She gained a lot of experience in that role.","Она получила большой опыт на той должности.","그 자리에서 경험을 많이 쌓으셨어요."),
  E("What do we gain from this partnership?","Что мы выигрываем от этого партнёрства?","이번 협력으로 저희가 얻는 게 뭐죠?"),
  E("The company has gained a solid reputation.","Компания заработала прочную репутацию.","회사가 탄탄한 평판을 쌓았습니다."),
 ],
 "dialogue":[
  D("A","Was the workshop worth it?","Воркшоп того стоил?","워크숍 갈 만했어요?"),
  D("B","I gained a lot of confidence.","Я сильно прибавил в уверенности.","자신감이 많이 붙었어요."),
  D("A","More than the grammar itself?","Больше, чем сама грамматика?","문법보다도요?"),
  D("B","Much more. Grammar I already had.","Гораздо больше. Грамматика у меня и так была.","훨씬요. 문법은 원래 알고 있었거든요.",True),
 ],
 "notes":[
  N("gain — прибавить что-то ценное. get — просто получить. gain experience звучит весомее, чем get experience.",
    "gain은 가치 있는 것이 늘어나는 것입니다."),
  N("gain weight / lose weight — пара. put on weight — разговорный синоним gain weight.",
    "체중은 gain과 lose가 짝입니다."),
  N("Для отчёта руководству: We gained two percentage points of market share — точнее и убедительнее, чем We sold more.",
    "보고서에서는 구체적 수치와 함께 쓰면 설득력이 높습니다."),
 ],
 "quiz":[
  BUILD("Мы увеличили долю рынка в Центральной Азии.","중앙아시아에서 점유율이 올랐습니다.","We gained market share in Central Asia.",["got","on"]),
  PICK("«За праздники я набрал три килограмма»","'연휴에 3킬로 쪘어요'는?",
       "I gained three kilos over the holidays.","I got three kilos over the holidays.",
       "О весе говорят gain, а не get.","체중 증가는 gain으로 말합니다."),
 ],
}

L[77] = {
 "meaning": N("mention = «упомянуть, сказать вскользь». Не полноценный рассказ, а короткое замечание в разговоре.",
              "'언급하다, 말하다'입니다. 자세히 설명한 것이 아니라 지나가듯 말한 것입니다."),
 "examples":[
  E("Didn't you mention that you have friends in Osaka?","Ты же вроде говорил, что у тебя есть друзья в Осаке?","오사카에 친구 있다고 하지 않았어요?"),
  E("He mentioned it briefly at the meeting.","Он вскользь упомянул это на совещании.","회의에서 잠깐 언급하셨어요."),
  E("Don't mention it.","Не за что.","별말씀을요."),
  E("She didn't mention the price at all.","Про цену она вообще не сказала.","가격 얘기는 아예 안 하셨어요."),
  E("As I mentioned in my previous email…","Как я упоминал в предыдущем письме…","이전 메일에서 말씀드린 것처럼…"),
  E("Was anything mentioned about the delivery date?","Про дату поставки что-нибудь говорили?","납기에 대해 얘기 나온 거 있어요?"),
 ],
 "dialogue":[
  D("A","We're routing through Osaka on the way back.","Обратно летим через Осаку.","돌아올 때 오사카 경유해요."),
  D("B","Didn't you mention that you have friends there?","Ты же говорил, что у тебя там друзья?","거기 친구 있다고 하지 않았어요?"),
  D("A","I do. We have an eight-hour layover.","Есть. У нас восемь часов пересадки.","있어요. 경유 시간이 여덟 시간이거든요."),
  D("B","Then that's dinner sorted.","Значит, с ужином решено.","그럼 저녁은 해결됐네요.",True),
 ],
 "notes":[
  N("As I mentioned in my previous email — вежливое напоминание в переписке. Не обвиняет, но указывает, что вопрос уже поднимался.",
    "메일에서 앞서 말한 내용을 다시 짚을 때 정중합니다."),
  N("Don't mention it — «не за что» в ответ на благодарность. Идиома, не связана с упоминанием.",
    "Don't mention it은 '별말씀을요'라는 관용구입니다."),
  N("mention без предлога: mention the price, а не mention about the price. Частая ошибка.",
    "mention 뒤에 about을 쓰지 않습니다. 자주 하는 실수입니다."),
 ],
 "quiz":[
  BUILD("Про цену она вообще не сказала.","가격 얘기는 아예 안 하셨어요.","She didn't mention the price at all.",["about","to mention"]),
  PICK("«Он упомянул об этом на совещании»","'회의에서 그걸 언급했어요'는?",
       "He mentioned it at the meeting.","He mentioned about it at the meeting.",
       "После mention предлог about не нужен.",
       "mention은 전치사 없이 목적어를 바로 받습니다."),
 ],
}

L[78] = {
 "meaning": N("handle = «справляться, выдерживать, вести». О ситуациях, людях, объёме работы, клиентах.",
              "'감당하다, 처리하다, 상대하다'입니다. 상황, 사람, 업무량 모두에 씁니다."),
 "examples":[
  E("I can't handle people like her.","Я не выношу таких людей, как она.","저는 그런 사람 감당이 안 돼요."),
  E("Who's handling the Kazakhstan account?","Кто ведёт казахстанского клиента?","카자흐스탄 거래처는 누가 담당해요?"),
  E("Can your team handle the extra volume?","Ваша команда потянет дополнительный объём?","추가 물량 감당 가능하세요?"),
  E("She handled the complaint very professionally.","Она очень профессионально отработала претензию.","클레임을 아주 프로답게 처리하셨어요."),
  E("I'll handle it.","Я этим займусь.","제가 처리할게요."),
  E("Handle with care.","Обращаться осторожно.","취급 주의."),
 ],
 "dialogue":[
  D("A","You look drained after that call.","Ты выжат после этого звонка.","통화 끝나고 진이 빠져 보이네요."),
  D("B","I can't handle people like her.","Я не выношу таких людей, как она.","저는 그런 사람 감당이 안 돼요."),
  D("A","Want me to take the next one?","Хочешь, следующий звонок возьму я?","다음 통화는 제가 할까요?"),
  D("B","Would you? I'd owe you.","Правда? Буду должен.","그래 주시겠어요? 제가 빚지는 거죠.",True),
 ],
 "notes":[
  N("I'll handle it — короткий и уверенный способ взять задачу на себя. Сильнее, чем I'll do it.",
    "I'll do it보다 책임감 있게 들립니다."),
  N("handle an account / a client — вести клиента. Ключевой термин в продажах.",
    "영업에서 '거래처를 담당하다'라는 뜻으로 씁니다."),
  N("Handle with care — маркировка на грузе. Пригодится в отгрузочных документах.",
    "화물 표기에 쓰는 문구입니다."),
 ],
 "quiz":[
  BUILD("Ваша команда потянет дополнительный объём?","추가 물량 감당 가능하세요?","Can your team handle the extra volume?",["to handle","manage with"]),
  PICK("Взять задачу на себя перед руководством","상사 앞에서 일을 맡겠다고 할 때",
       "I'll handle it.","I will do it maybe.",
       "Первый вариант звучит уверенно и профессионально.",
       "첫째가 훨씬 책임감 있게 들립니다."),
 ],
}

L[79] = {
 "meaning": N("sell без дополнения = «продаваться». Подлежащее — товар, а не продавец. Об успешности продаж.",
              "목적어 없이 쓰는 sell은 '팔리다'입니다. 주어가 상품입니다."),
 "examples":[
  E("Iced coffee sells year-round.","Холодный кофе продаётся круглый год.","아이스 커피는 사계절 내내 팔려요."),
  E("This model sells well in Central Asia.","Эта модель хорошо идёт в Центральной Азии.","이 모델은 중앙아시아에서 잘 나가요."),
  E("The tickets sold out in five minutes.","Билеты раскупили за пять минут.","표가 5분 만에 매진됐어요."),
  E("It doesn't sell at that price.","По такой цене оно не продаётся.","그 가격에는 안 팔려요."),
  E("We sell direct to hospitals.","Мы продаём напрямую больницам.","저희는 병원에 직접 판매합니다."),
  E("Our entry model sells better than the premium one.","Начальная модель продаётся лучше премиальной.","보급형이 프리미엄보다 잘 팔려요."),
 ],
 "dialogue":[
  D("A","Should we drop iced drinks in winter?","Убрать холодные напитки на зиму?","겨울에 아이스 음료 뺄까요?"),
  D("B","Definitely not. Iced coffee sells year-round here.","Ни в коем случае. Холодный кофе тут идёт круглый год.","절대 안 되죠. 여긴 아이스 커피가 사계절 내내 팔려요."),
  D("A","Even in January?","Даже в январе?","1월에도요?"),
  D("B","Especially in January.","Особенно в январе.","1월엔 더 팔려요.",True),
 ],
 "notes":[
  N("sell well / sell poorly / sell out — подлежащее товар. Активная форма с пассивным смыслом.",
    "상품이 주어여도 능동형으로 씁니다."),
  N("sell out — распродаться полностью. Уже было в уроке 9: they sold out in five minutes.",
    "sell out은 '매진되다'입니다."),
  N("В отчёте: This model sells well in the region — звучит как факт рынка, а не как ваша заслуга или вина.",
    "보고서에서 객관적인 사실로 들립니다."),
 ],
 "quiz":[
  BUILD("По такой цене оно не продаётся.","그 가격에는 안 팔려요.","It doesn't sell at that price.",["is not sold","in"]),
  PICK("«Эта модель хорошо продаётся»","'이 모델 잘 팔려요'는?",
       "This model sells well.","This model is selling well by us.",
       "Товар в роли подлежащего берёт активную форму без дополнений.",
       "상품이 주어일 때는 능동형으로 간단히 씁니다."),
 ],
}

L[80] = {
 "meaning": N("suit = «идти, подходить». Об одежде и цвете — идёт человеку. О времени и условиях — удобно, устраивает.",
              "'어울리다, 적합하다'입니다. 옷이나 색뿐 아니라 시간과 조건에도 씁니다."),
 "examples":[
  E("Bow ties don't suit me.","Мне не идут бабочки.","저는 나비넥타이가 안 어울려요."),
  E("That color really suits you.","Этот цвет тебе очень идёт.","그 색 정말 잘 어울리세요."),
  E("Does Tuesday suit you?","Вторник вам подходит?","화요일 괜찮으세요?"),
  E("This model suits smaller clinics.","Эта модель подходит небольшим клиникам.","이 모델은 소규모 병원에 적합합니다."),
  E("Whatever suits you best.","Как вам удобнее.","편하신 대로 하세요."),
  E("The arrangement suits both sides.","Такая схема устраивает обе стороны.","이 방식이 양쪽 다 좋습니다."),
 ],
 "dialogue":[
  D("A","Try the bow tie with it.","Примерь к нему бабочку.","나비넥타이도 한번 해 보세요."),
  D("B","Bow ties don't suit me.","Мне не идут бабочки.","저는 나비넥타이가 안 어울려요."),
  D("A","You haven't even looked.","Ты даже не посмотрел.","보지도 않으셨잖아요."),
  D("B","I've looked before. Trust me.","Я смотрел раньше. Поверь.","예전에 봤어요. 믿어 주세요.",True),
 ],
 "notes":[
  N("suit — идёт человеку. fit — подходит по размеру. match — сочетается с другой вещью. Три разных слова.",
    "suit은 어울림, fit은 사이즈, match는 다른 것과의 조화입니다."),
  N("Does Tuesday suit you? — вежливее, чем Is Tuesday okay? Сравните с Does Tuesday work for you? из урока 38.",
    "일정 조율에서 work for you와 같은 뜻입니다."),
  N("Whatever suits you best — уступка в переговорах, показывает гибкость без потери позиции.",
    "협상에서 유연함을 보여 주는 표현입니다."),
 ],
 "quiz":[
  BUILD("Вторник вам подходит?","화요일 괜찮으세요?","Does Tuesday suit you?",["fit","match"]),
  PICK("Пиджак нужного размера, но фасон не ваш","사이즈는 맞지만 스타일이 안 어울릴 때",
       "It fits, but it doesn't suit me.","It suits, but it doesn't fit me.",
       "fit — про размер, suit — про то, идёт ли вам.",
       "fit은 사이즈, suit은 어울림입니다."),
 ],
}
