/* ============================================================
   Verb 100 — движок приложения
   Данные: window.DAYS (100 уроков), window.LESSONS (содержание)
   ============================================================ */
(function () {
"use strict";

/* ---------- состояние ---------- */
var KEY = "verb100.v1";
var DEFAULTS = {
  start: "2026-09-13",
  lang: "ru",
  theme: "auto",
  rate: 0.95,
  voice: "en-US",
  reminder: "10:00",
  tz: "Asia/Almaty",
  done: {},          // { "1": "2026-09-13" }
  queue: [],         // [{k, day, en, ru, ko, due, level}]
  errors: {}         // { "have + O + инфинитив": 3 }
};
var S = load();

function load() {
  try {
    var raw = localStorage.getItem(KEY);
    if (!raw) return Object.assign({}, DEFAULTS);
    var o = JSON.parse(raw);
    return Object.assign({}, DEFAULTS, o);
  } catch (e) { return Object.assign({}, DEFAULTS); }
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
}

/* ---------- строки интерфейса ---------- */
var UI = {
  appTitle:     ["Базовые глаголы 100", "기본 동사 100"],
  verbs58:      ["58 глаголов", "핵심 동사 58개"],
  todayLbl:     ["Сегодня", "오늘"],
  chapterN:     ["Глава %1", "챕터 %1"],
  repeatLesson: ["Повторить урок", "다시 학습"],
  statDone:     ["пройдено", "완료"],
  statStreak:   ["дней подряд", "연속 학습일"],
  statDue:      ["карточек к повтору", "복습할 카드"],
  reviewNow:    ["Повторить карточки · %1", "카드 복습하기 · %1"],
  stepEx:       ["Примеры", "예문"],
  stepTest:     ["Тест", "테스트"],
  listenAll:    ["▶ Слушать все", "▶ 모두 듣기"],
  listen2:      ["▶ Слушать", "▶ 듣기"],
  hideTr:       ["Скрыть перевод", "번역 숨기기"],
  moreEx:       ["Ещё примеры", "추가 예문"],
  phrasesN:     ["%1 фраз", "%1문장"],
  minApprox:    ["≈ %1 мин", "약 %1분"],
  quizN:        ["%1 задания", "%1문제"],
  pickIt:       ["Что звучит естественно", "자연스러운 표현 고르기"],
  allRight:     ["Все ответы верные.", "모두 정답입니다."],
  someWrong:    ["Фразы с ошибками попадут в карточки повторения.", "틀린 문장은 복습 카드로 들어갑니다."],
  greet:        ["Доброе утро", "좋은 아침입니다"],
  courseBasic:  ["Базовые глаголы", "기본 동사"],
  coursePhr:    ["Фразовые глаголы", "구동사"],
  courseAria:   ["Выбор курса", "과정 선택"],
  streakOn:     ["Серия идёт", "연속 학습 중"],
  courseDone:   ["Курс пройден", "과정 완료"],
  settings:     ["Настройки", "설정"],
  close:        ["Закрыть", "닫기"],
  back:         ["Назад", "뒤로"],
  progressAria: ["Пройдено %1 из 100", "100일 중 %1일 완료"],
  done:         ["Готово", "완료"],
  doneText:     ["Все 100 уроков пройдены. Дальше — только повторение: карточки продолжают приходить по графику.",
                 "100개 수업을 모두 마쳤습니다. 이제부터는 복습만 남았고, 카드는 일정에 따라 계속 나옵니다."],
  chapter:      ["ГЛАВА", "챕터"],
  draft:        ["черновик", "초안"],
  startLesson:  ["Начать урок", "학습 시작"],
  min12:        ["12 мин", "12분"],
  min3:         ["3 мин", "3분"],
  review:       ["Повторение", "복습"],
  dueCards:     ["Карточек на сегодня — <b>%1</b>", "오늘 복습할 카드 <b>%1</b>장"],
  dueNone:      ["На сегодня всё чисто", "오늘은 복습할 카드가 없습니다"],
  start:        ["Начать", "시작"],
  streak:       ["Серия", "연속"],
  streakDays:   ["%1 подряд", "%1 연속"],
  streakNone:   ["Начнём сегодня", "오늘부터 시작합니다"],
  streakNone2:  ["Пока нет", "아직 없음"],
  watching:     ["Смотрю параллельно", "함께 보기"],
  open:         ["Открыть", "열기"],
  keySentence:  ["Ключевое предложение", "핵심 문장"],
  listen:       ["🔊 Слушать", "🔊 듣기"],
  meaning:      ["Значение", "의미"],
  draftTitle:   ["Урок в подготовке", "준비 중인 수업"],
  draftBody:    ["Развёрнутые блоки Model Examples, Small Talk и Further Studies для этого дня ещё не залиты. Ключевое предложение из книги уже здесь — прослушайте, повторите вслух и отметьте день пройденным.",
                 "이 날의 Model Examples, Small Talk, Further Studies는 아직 준비 중입니다. 책의 핵심 문장은 이미 들어 있으니 듣고 소리 내어 따라 한 뒤 완료로 표시하세요."],
  hintExamples: ["Нажмите на строку, чтобы скрыть перевод, и переведите сами.",
                 "문장을 누르면 번역이 사라집니다. 직접 옮겨 보세요."],
  hintDialogue: ["Последняя реплика — ваша. Скажите её вслух, потом откройте.",
                 "마지막 대사는 여러분 차례입니다. 소리 내어 말한 뒤 열어 보세요."],
  hintNotes:    ["Три момента, на которых обычно спотыкаются.", "많이들 헷갈리는 세 가지입니다."],
  you:          ["вы", "나"],
  yourLine:     ["Ваша реплика…", "여러분의 대사…"],
  playDialogue: ["🔊 Прослушать диалог", "🔊 대화 듣기"],
  next:         ["Дальше", "다음"],
  finishDay:    ["Завершить DAY %1", "DAY %1 마치기"],
  check:        ["проверка", "확인"],
  taskOf:       ["Задание %1 из %2", "문제 %1 / %2"],
  buildIt:      ["Соберите предложение", "문장 배열하기"],
  clear:        ["Очистить", "지우기"],
  correct:      ["Верно.", "정답입니다."],
  wrong:        ["Мимо.", "아쉽네요."],
  notMatching:  ["Не сходится.", "순서가 맞지 않습니다."],
  rightOrder:   ["Правильный порядок: ", "올바른 순서: "],
  tryAgain:     ["Попробовать снова", "다시 해 보기"],
  dayDoneErr:   ["DAY %1 пройден. Ошибок: %2", "DAY %1 완료. 오답 %2개"],
  dayDoneClean: ["DAY %1 пройден без ошибок", "DAY %1 완료, 오답 없음"],
  srsCards:     ["Интервальные карточки", "간격 반복 카드"],
  emptyTitle:   ["Пусто", "비어 있습니다"],
  emptyBody:    ["Карточки появятся завтра. Интервалы — 1, 3, 7, 21 и 60 дней после урока.",
                 "카드는 내일부터 나옵니다. 간격은 학습 후 1, 3, 7, 21, 60일입니다."],
  inQueue:      ["%1 в работе", "진행 중 %1장"],
  cardOf:       ["Карточка %1 из %2", "카드 %1 / %2"],
  sayItAloud:   ["Скажите вслух по-английски, потом откройте.", "영어로 소리 내어 말한 뒤 열어 보세요."],
  show:         ["Показать", "보기"],
  forgot:       ["Не вспомнил", "기억 안 남"],
  knew:         ["Знал", "알았음"],
  reviewDone:   ["Повторение окончено: %1 из %2", "복습 완료: %2개 중 %1개"],
  hundredDays:  ["100 дней", "100일"],
  bookToc:      ["Оглавление книги", "책 목차"],
  chShort:      ["Гл.", "챕터"],
  progress:     ["Прогресс", "학습 현황"],
  startedOn:    ["Старт — %1", "시작 — %1"],
  statLessons:  ["Уроков", "수업"],
  statPhrases:  ["Фраз", "문장"],
  statVerbs:    ["Глаголов", "동사"],
  calendar:     ["Календарь курса", "학습 달력"],
  softStreak:   ["Пропуск не обнуляет прогресс — урок просто сдвигается на следующий день. Командировка не ломает план.",
                 "하루 걸러도 진도가 초기화되지 않습니다. 수업이 다음 날로 밀릴 뿐이라 출장 중에도 계획이 무너지지 않습니다."],
  upcoming:     ["Ближайшие повторения", "다가오는 복습"],
  langLabel:    ["Язык объяснений", "설명 언어"],
  langHint:     ["Английские фразы не меняются", "영어 문장은 그대로입니다"],
  theme:        ["Тема", "테마"],
  themeAuto:    ["Авто", "자동"],
  themeLight:   ["Свет", "밝게"],
  themeDark:    ["Ночь", "어둡게"],
  reminder:     ["Напоминание", "알림"],
  reminderHint: ["Время локального уведомления", "기기 알림 시각"],
  timezone:     ["Часовой пояс", "시간대"],
  timezoneHint: ["Меняйте при перелёте", "이동 시 변경하세요"],
  allowNotif:   ["Разрешить уведомления", "알림 허용"],
  allowHint:    ["iPhone: сначала добавьте приложение на экран «Домой»", "아이폰은 먼저 홈 화면에 추가해야 합니다"],
  enable:       ["Включить", "켜기"],
  speechRate:   ["Скорость речи", "말하기 속도"],
  accent:       ["Произношение", "발음"],
  startDate:    ["Дата старта курса", "학습 시작일"],
  startHint:    ["DAY 1 = этот день", "이 날짜가 DAY 1입니다"],
  resetLabel:   ["Сбросить прогресс", "진도 초기화"],
  resetHint:    ["Уроки, серия и карточки", "수업, 연속 기록, 카드"],
  reset:        ["Сбросить", "초기화"],
  resetConfirm: ["Сбросить весь прогресс? Уроки, серия и карточки будут удалены.",
                 "진도를 모두 초기화할까요? 수업, 연속 기록, 카드가 삭제됩니다."],
  resetDone:    ["Прогресс сброшен", "진도가 초기화되었습니다"],
  footer:       ["По книге «김재우의 기본 동사 100» (상상스퀘어).<br>Прогресс хранится только на этом устройстве.",
                 "《김재우의 기본 동사 100》(상상스퀘어) 기반입니다.<br>학습 기록은 이 기기에만 저장됩니다."],
  toastReminder:["Напоминание в %1", "알림 시각 %1"],
  toastTz:      ["Часовой пояс: %1", "시간대: %1"],
  toastStart:   ["Старт: %1", "시작일: %1"],
  noTts:        ["Озвучка недоступна в этом браузере", "이 브라우저에서는 음성 재생이 지원되지 않습니다"],
  noNotif:      ["Уведомления не поддерживаются", "알림이 지원되지 않습니다"],
  notifOn:      ["Уведомления включены", "알림이 켜졌습니다"],
  notifOff:     ["Отклонено в настройках браузера", "브라우저 설정에서 거부되었습니다"],
  noImage:      ["иллюстрация ещё не добавлена", "삽화가 아직 없습니다"],
  offline:      ["Офлайн", "오프라인"],
  offlineHint:  ["Скачать все уроки и картинки на телефон", "모든 수업과 이미지를 기기에 내려받기"],
  download:     ["Скачать", "내려받기"],
  downloading:  ["%1 из %2", "%2개 중 %1개"],
  offlineReady: ["Загружено · %1 МБ", "완료 · %1 MB"],
  offlineAgain: ["Обновить", "다시 받기"],
  offlineFail:  ["Не удалось. Проверьте интернет", "실패했습니다. 인터넷을 확인하세요"],
  offlineNo:    ["Этот браузер не умеет сохранять офлайн", "이 브라우저는 오프라인 저장을 지원하지 않습니다"],
  ytRange:      ["Повтор ×5 · DAY %1–%2", "5회 반복 · DAY %1–%2"],
  ytWhole:      ["Весь курс", "전체 과정"],
  ytKoEn:       ["한국어–영어", "한국어–영어"],
  ytEnOnly:     ["영어만", "영어만"],
  ytVideo:      ["🎬 Видео", "🎬 영상"],
  ytPlaylist:   ["원어민 발음 몰아듣기 · плейлист", "원어민 발음 몰아듣기 · 플레이리스트"],
  tabToday:     ["Сегодня", "오늘"],
  tabMap:       ["100 дней", "100일"],
  tabReview:    ["Повтор", "복습"],
  tabProgress:  ["Прогресс", "현황"]
};
function ui(k, a, b) {
  var s = UI[k][S.lang === "ko" ? 1 : 0];
  if (a !== undefined) s = s.replace("%1", a);
  if (b !== undefined) s = s.replace("%2", b);
  return s;
}

/* ---------- даты ---------- */
function todayISO() {
  var d = new Date();
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
}
function pad(n) { return n < 10 ? "0" + n : "" + n; }
function parseISO(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
function addDays(iso, n) {
  var d = parseISO(iso); d.setDate(d.getDate() + n);
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
}
function diffDays(a, b) { return Math.round((parseISO(b) - parseISO(a)) / 86400000); }
var MONTHS = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
var WEEK = ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"];
var WEEK_KO = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"];
function dateShort(iso) {
  var d = parseISO(iso);
  if (S.lang === "ko") return d.getFullYear() + "년 " + (d.getMonth() + 1) + "월 " + d.getDate() + "일";
  return d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear();
}
function humanDate(iso) {
  var d = parseISO(iso);
  if (S.lang === "ko") return (d.getMonth() + 1) + "월 " + d.getDate() + "일 " + WEEK_KO[d.getDay()];
  return WEEK[d.getDay()] + ", " + d.getDate() + " " + MONTHS[d.getMonth()];
}
function daysWord(n) {
  return S.lang === "ko" ? n + "일" : n + " " + plural(n, "день", "дня", "дней");
}

/* ---------- производные ---------- */
function doneCount() { return Object.keys(S.done).length; }
function currentDay() {
  for (var i = 1; i <= 100; i++) if (!S.done[i]) return i;
  return 100;
}
function dayData(n) {
  var base = window.DAYS.find(function (d) { return d.day === n; });
  var full = window.LESSONS[String(n)] || null;
  return { base: base, full: full };
}
function streak() {
  var dates = {};
  Object.keys(S.done).forEach(function (k) { dates[S.done[k]] = 1; });
  var n = 0, cur = todayISO();
  if (!dates[cur]) cur = addDays(cur, -1);       // сегодня ещё можно успеть
  while (dates[cur]) { n++; cur = addDays(cur, -1); }
  return n;
}
function dueCards() {
  var t = todayISO();
  return S.queue.filter(function (c) { return diffDays(c.due, t) >= 0; });
}
function chapterOf(n) {
  var ch = window.CHAPTERS;
  for (var k in ch) if (n >= ch[k].from && n <= ch[k].to) return { n: +k, meta: ch[k] };
  return { n: 5, meta: ch["5"] };
}

/* ---------- видео плейлиста «원어민 발음 몰아듣기» ---------- */
var YT = {
  list: "PLWGv_i60H2Exc_BaZS_4D39KSjnXLzw1i",
  ranges: [
    { from: 1,  to: 20,  id: "DqrkMre_rVA" },
    { from: 21, to: 40,  id: "x6gXJ3z8I_U" },
    { from: 41, to: 60,  id: "IqO1VfZTAlM" },
    { from: 61, to: 80,  id: "y2168ClNKho" },
    { from: 81, to: 100, id: "JdQ9_UGwo5s" }
  ],
  fullKoEn: "2riZH_XDU5o",   // Day 1~100, корейский → английский, один проход
  fullEn:   "F0UkCUbTus8"    // Day 1~100, только английский
};
function ytRangeFor(day) {
  for (var i = 0; i < YT.ranges.length; i++) {
    if (day >= YT.ranges[i].from && day <= YT.ranges[i].to) return YT.ranges[i];
  }
  return YT.ranges[0];
}
function ytUrl(id) {
  return "https://www.youtube.com/watch?v=" + id + "&list=" + YT.list;
}

/* ---------- язык ---------- */
function t(obj) {
  if (!obj) return "";
  return S.lang === "ko" ? (obj.ko || obj.ru) : (obj.ru || obj.ko);
}
function tr(item) { return S.lang === "ko" ? item.ko : item.ru; }

/* ---------- озвучка ---------- */
var voices = [];
function loadVoices() { try { voices = speechSynthesis.getVoices() || []; } catch (e) {} }
if (window.speechSynthesis) {
  loadVoices();
  speechSynthesis.onvoiceschanged = loadVoices;
}
function speak(text, btn) {
  if (!window.speechSynthesis) return toast(ui("noTts"));
  speechSynthesis.cancel();
  var u = new SpeechSynthesisUtterance(text);
  u.lang = S.voice;
  u.rate = S.rate;
  var v = voices.filter(function (x) { return x.lang === S.voice || x.lang.replace("_", "-") === S.voice; })[0];
  if (v) u.voice = v;
  document.querySelectorAll(".playing").forEach(function (x) { x.classList.remove("playing"); });
  if (btn) {
    btn.classList.add("playing");
    u.onend = u.onerror = function () { btn.classList.remove("playing"); };
  }
  speechSynthesis.speak(u);
}

/* ---------- утилиты DOM ---------- */
var view = document.getElementById("view");
function h(html) { var d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function toast(msg) {
  var old = document.querySelector(".toast"); if (old) old.remove();
  var el = h('<div class="toast">' + esc(msg) + "</div>");
  document.body.appendChild(el);
  setTimeout(function () { el.remove(); }, 2200);
}
function shuffle(a) {
  a = a.slice();
  for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; }
  return a;
}

/* ---------- шапка и экран ---------- */
var bar = document.getElementById("bar");
var stepsNav = document.getElementById("steps");
var ICON_GEAR = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/></svg>';
var PLAY = '<span class="spk"><svg viewBox="0 0 10 10"><path d="M1 0l8 5-8 5z"/></svg></span>';

function setBar(html, steps) {
  bar.innerHTML = html;
  stepsNav.innerHTML = steps || "";
  stepsNav.hidden = !steps;
}
function render(html) {
  view.innerHTML = html;
  window.scrollTo(0, 0);
}
function backBtn() {
  return '<button class="icon-btn" data-home="1" aria-label="' + ui("back") + '">←</button>';
}
function langToggle() {
  return '<div class="seg">' +
    '<button data-lang="ru" class="' + (S.lang === "ru" ? "on" : "") + '">RU</button>' +
    '<button data-lang="ko" class="' + (S.lang === "ko" ? "on" : "") + '">한</button>' +
  "</div>";
}
function courseSwitch() {
  return '<nav class="course-sw" aria-label="' + ui("courseAria") + '">' +
    '<span class="on" aria-current="page">' + ui("courseBasic") + "</span>" +
    '<a href="phrasal-verbs/" data-course="phrasal">' + ui("coursePhr") + "</a>" +
  "</nav>";
}

/* ---------- глагол: заголовок и подсветка форм в примерах ---------- */
var FORMS = {
  HAVE: "have has had having", GET: "get gets got gotten getting", MAKE: "make makes made making",
  TAKE: "take takes took taken taking", DO: "do does did done doing", LIKE: "like likes liked liking",
  SEE: "see sees saw seen seeing", KNOW: "know knows knew known knowing", WORK: "work works worked working",
  GO: "go goes went gone going", WANT: "want wants wanted wanting", SAY: "say says said saying",
  LET: "let lets letting", GIVE: "give gives gave given giving", KEEP: "keep keeps kept keeping",
  LEAVE: "leave leaves left leaving", BRING: "bring brings brought bringing", HEAD: "head heads headed heading",
  COME: "come comes came coming", PUT: "put puts putting", FEEL: "feel feels felt feeling",
  TURN: "turn turns turned turning", MOVE: "move moves moved moving", RUN: "run runs ran running",
  TRY: "try tries tried trying", STAND: "stand stands stood standing", BREAK: "break breaks broke broken breaking",
  HURT: "hurt hurts hurting", NOTICE: "notice notices noticed noticing", EXPECT: "expect expects expected expecting",
  LOSE: "lose loses lost losing", CATCH: "catch catches caught catching", COST: "cost costs costing",
  OFFER: "offer offers offered offering", REQUIRE: "require requires required requiring", GAIN: "gain gains gained gaining",
  MENTION: "mention mentions mentioned mentioning", HANDLE: "handle handles handled handling", SELL: "sell sells sold selling",
  SUIT: "suit suits suited suiting", MISS: "miss misses missed missing", FINISH: "finish finishes finished finishing",
  BELONG: "belong belongs belonged belonging", AFFORD: "afford affords afforded affording", GRAB: "grab grabs grabbed grabbing",
  FIX: "fix fixes fixed fixing", DESERVE: "deserve deserves deserved deserving", MIND: "mind minds minded minding",
  BOOK: "book books booked booking", SEEM: "seem seems seemed seeming", BOTHER: "bother bothers bothered bothering",
  SPARE: "spare spares spared sparing", RUIN: "ruin ruins ruined ruining", OWE: "owe owes owed owing",
  QUIT: "quit quits quitting", ARRANGE: "arrange arranges arranged arranging", SKIP: "skip skips skipped skipping",
  SPOIL: "spoil spoils spoiled spoilt spoiling"
};
var formsCache = {};
function hl(text, verb) {
  var re = formsCache[verb] || (formsCache[verb] = new RegExp("\\b(" + (FORMS[verb] || verb.toLowerCase()).split(" ").join("|") + ")\\b", "gi"));
  return esc(text).replace(re, '<b class="v">$1</b>');
}
/* ①…⑬ → кружок с цифрой: системные глифы в разных шрифтах разного размера. */
function senseHTML(sense) {
  if (!sense) return "";
  return '<span class="sn">' + (sense.charCodeAt(0) - 0x2460 + 1) + "</span>";
}
function verbLabel(b) {
  return esc(b.verb.toLowerCase()) + (b.sense ? " " + senseHTML(b.sense) : "");
}
function pvHTML(b) {
  return '<span class="v">' + esc(b.verb.toLowerCase()) + "</span>" + senseHTML(b.sense);
}

/* ============================================================
   ГЛАВНАЯ: сегодня · статистика · карта 100 дней · настройки
   ============================================================ */
function home() {
  lessonState = null; reviewState = null; stopTimer();
  try { speechSynthesis.cancel(); } catch (e) {}
  document.body.classList.remove("hide-tr");
  setBar('<h1>' + ui("appTitle") + "<small>김재우의 기본 동사 100 · " + ui("verbs58") + "</small></h1>" +
    '<button class="icon-btn" data-scroll="settings" aria-label="' + ui("settings") + '">' + ICON_GEAR + "</button>");

  var n = currentDay(), b = dayData(n).base, done = doneCount(), due = dueCards().length;
  var st = streak(), finished = done >= 100, ch = chapterOf(n);

  var html = courseSwitch() +
    '<div class="today">' +
      '<div class="eyebrow">' + (finished ? ui("courseDone") : ui("todayLbl")) + " · DAY " + pad(n) + " · " + ui("chapterN", ch.n) + "</div>" +
      '<div class="pv">' + pvHTML(b) + "</div>" +
      '<div class="en">' + hl(b.en, b.verb) + "</div>" +
      '<div class="ru">' + esc(tr(b)) + "</div>" +
      '<button class="btn" data-lesson="' + n + '">' + (finished ? ui("repeatLesson") : ui("startLesson")) + " · " + ui("min12") + "</button>" +
    "</div>" +
    '<div class="stats">' +
      '<div class="stat"><b>' + done + "<small>/100</small></b><span>" + ui("statDone") + "</span></div>" +
      '<div class="stat"><b>' + st + "</b><span>" + ui("statStreak") + "</span></div>" +
      '<button class="stat" data-go="review"><b>' + due + "</b><span>" + ui("statDue") + "</span></button>" +
    "</div>" +
    (due ? '<button class="btn ghost duebar" data-go="review">' + ui("reviewNow", due) + "</button>" : "");

  /* карта: глава → глагол → дни */
  html += '<div class="map">';
  var chs = window.CHAPTERS, days = window.DAYS, i = 0;
  Object.keys(chs).forEach(function (k) {
    var c = chs[k];
    html += '<div class="chap"><div class="eyebrow">' + ui("chapterN", k) + " · DAY " + c.from + "–" + c.to + "</div><p>" +
      esc(S.lang === "ko" ? (c.ko || c.ru) : c.ru) + "</p></div>";
    while (i < days.length && days[i].day <= c.to) {
      var verb = days[i].verb, group = [];
      while (i < days.length && days[i].verb === verb && days[i].day <= c.to) group.push(days[i++]);
      var span = group.length > 1 ? "DAY " + group[0].day + "–" + group[group.length - 1].day : "DAY " + group[0].day;
      html += '<div class="group"><h3>' + esc(verb.toLowerCase()) + "<span>" + span + "</span></h3><div class=\"chips\">" +
        group.map(function (d) {
          var cls = S.done[d.day] ? " done" : (d.day === n && !finished ? " next" : "");
          return '<button class="chip' + cls + '" data-lesson="' + d.day + '"><i>' + pad(d.day) + "</i>" +
            (d.sense ? senseHTML(d.sense) : esc(verb.toLowerCase())) + "</button>";
        }).join("") + "</div></div>";
    }
  });
  html += "</div>";

  html += '<div class="foot">' + ytBox(n) + calendarBox() + settingsBox() +
    '<p class="fine">' + ui("footer") + "</p></div>";

  render(html);
  wireSettings();
}

function ytBox(n) {
  var r = ytRangeFor(n);
  return '<div class="box"><h3>' + ui("watching") + "</h3>" +
    '<a class="yt" target="_blank" rel="noopener" href="' + ytUrl(r.id) + '">' +
      '<div class="grow">' + ui("ytRange", r.from, r.to) + '<div class="tr">' + ui("ytPlaylist") + "</div></div>" +
      '<span class="pill">' + ui("open") + "</span></a>" +
    '<div class="pillrow"><span class="mut" style="font-size:13px">' + ui("ytWhole") + "</span>" +
      '<a class="pill" target="_blank" rel="noopener" href="' + ytUrl(YT.fullKoEn) + '">' + ui("ytKoEn") + "</a>" +
      '<a class="pill" target="_blank" rel="noopener" href="' + ytUrl(YT.fullEn) + '">' + ui("ytEnOnly") + "</a>" +
    "</div></div>";
}

function calendarBox() {
  var cells = "", today = todayISO(), dates = {};
  Object.keys(S.done).forEach(function (k) { dates[S.done[k]] = 1; });
  for (var i = 0; i < 105; i++) {
    var iso = addDays(S.start, i);
    cells += '<i class="wk' + (dates[iso] ? " on" : "") + (iso === today ? " today" : "") + '"></i>';
  }
  return '<div class="box"><h3>' + ui("calendar") + '<span class="mut" style="font:500 12px var(--f-ui);margin-left:8px">' +
    ui("startedOn", dateShort(S.start)) + "</span></h3>" +
    '<div class="weeks">' + cells + '</div><p class="fine" style="margin-top:10px">' + ui("softStreak") + "</p></div>";
}

var TZS = ["Asia/Almaty", "Asia/Seoul", "Europe/Moscow", "Asia/Tashkent", "Asia/Dubai", "America/Sao_Paulo", "America/Bogota"];

function settingsBox() {
  function row(label, hint, ctrl) {
    return '<div class="srow"><div><label>' + label + "</label>" + (hint ? '<div class="hint">' + hint + "</div>" : "") + "</div>" + ctrl + "</div>";
  }
  return '<div class="box settings" id="settings"><h3 style="margin:0">' + ui("settings") + "</h3>" +
    row(ui("langLabel"), ui("langHint"), langToggle()) +
    row(ui("theme"), "", '<div class="seg">' + ["auto", "light", "dark"].map(function (x) {
      return '<button data-set-theme="' + x + '" class="' + (S.theme === x ? "on" : "") + '">' +
        (x === "auto" ? ui("themeAuto") : x === "light" ? ui("themeLight") : ui("themeDark")) + "</button>";
    }).join("") + "</div>") +
    row(ui("speechRate"), "", '<div class="seg">' + [0.75, 0.95, 1.1].map(function (r) {
      return '<button data-rate="' + r + '" class="' + (Math.abs(S.rate - r) < 0.01 ? "on" : "") + '">' + r + "×</button>";
    }).join("") + "</div>") +
    row(ui("accent"), "", '<div class="seg">' + [["en-US", "US"], ["en-GB", "UK"]].map(function (v) {
      return '<button data-voice="' + v[0] + '" class="' + (S.voice === v[0] ? "on" : "") + '">' + v[1] + "</button>";
    }).join("") + "</div>") +
    row(ui("reminder"), ui("reminderHint"), '<input type="time" id="rem" value="' + esc(S.reminder) + '">') +
    row(ui("timezone"), ui("timezoneHint"), '<select id="tz">' + TZS.map(function (z) {
      return '<option value="' + z + '"' + (S.tz === z ? " selected" : "") + ">" + z.split("/")[1].replace("_", " ") + "</option>";
    }).join("") + "</select>") +
    row(ui("allowNotif"), ui("allowHint"), '<button class="pill" id="notif">' + ui("enable") + "</button>") +
    row(ui("offline"), '<span id="offHint">' + ui("offlineHint") + "</span>", '<button class="pill" id="offBtn">' + ui("download") + "</button>") +
    row(ui("startDate"), ui("startHint"), '<input type="date" id="start" value="' + esc(S.start) + '">') +
    '<button class="danger" id="reset">' + ui("resetLabel") + "</button>" +
  "</div>";
}

function wireSettings() {
  document.getElementById("rem").onchange = function () { S.reminder = this.value; save(); scheduleReminder(); toast(ui("toastReminder", this.value)); };
  document.getElementById("tz").onchange = function () { S.tz = this.value; save(); toast(ui("toastTz", this.value)); };
  document.getElementById("start").onchange = function () { S.start = this.value; save(); toast(ui("toastStart", dateShort(this.value))); rerender(); };
  document.getElementById("reset").onclick = function () {
    if (!confirm(ui("resetConfirm"))) return;
    S.done = {}; S.queue = []; S.errors = {}; save(); home(); toast(ui("resetDone"));
  };
  var offBtn = document.getElementById("offBtn"), offHint = document.getElementById("offHint");
  function showOffline() {
    offlineStatus().then(function (st) {
      if (!st) { offBtn.hidden = true; offHint.textContent = ui("offlineNo"); return; }
      var ready = st.have >= st.total;
      offHint.textContent = ready ? ui("offlineReady", Math.round(st.bytes / 1048576)) : ui("offlineHint");
      offBtn.textContent = ready ? ui("offlineAgain") : ui("download");
    });
  }
  showOffline();
  offBtn.onclick = function () {
    offBtn.disabled = true;
    downloadOffline(function (d, total) { offHint.textContent = ui("downloading", d, total); })
      .then(function () { offBtn.disabled = false; showOffline(); })
      .catch(function () { offBtn.disabled = false; offHint.textContent = ui("offlineFail"); });
  };
  document.getElementById("notif").onclick = function () {
    if (!("Notification" in window)) return toast(ui("noNotif"));
    Notification.requestPermission().then(function (p) {
      toast(p === "granted" ? ui("notifOn") : ui("notifOff"));
      if (p === "granted") scheduleReminder();
    });
  };
}

/* ============================================================
   УРОК: одна лента — 1 · Примеры, 2 · Small talk, 3 · Тест
   ============================================================ */
var lessonState = null;
var timerId = null, tStart = 0;

function startTimer() { stopTimer(); tStart = Date.now(); timerId = setInterval(tick, 1000); }
function stopTimer() { if (timerId) clearInterval(timerId); timerId = null; tStart = 0; }
function tick() {
  var el = document.getElementById("timer"); if (!el || !tStart) return;
  var s = Math.floor((Date.now() - tStart) / 1000);
  el.textContent = Math.floor(s / 60) + ":" + pad(s % 60) + " / 12:00";
  el.classList.toggle("over", s >= 720);
}

function startLesson(n) {
  reviewState = null;
  var f = dayData(n).full;
  lessonState = { day: n, wrong: 0, answered: {}, picked: {}, choice: {}, pools: {} };
  if (f) f.quiz.forEach(function (q, i) {
    if (q.type === "build") {
      lessonState.picked[i] = [];
      lessonState.pools[i] = shuffle(q.answer.split(/\s+/).filter(Boolean).concat(q.extra || []));
    }
  });
  document.body.classList.remove("hide-tr");
  renderLesson();
  startTimer();
}

function lineHTML(item, verb, lead, cls) {
  return '<div class="line ' + (cls || "") + '" tabindex="0" data-line="1" data-say="' + esc(item.en) + '">' +
    lead + '<div><div class="en">' + hl(item.en, verb) + '</div><div class="tr">' + esc(tr(item)) + "</div></div>" + PLAY + "</div>";
}

function renderLesson() {
  var n = lessonState.day, d = dayData(n), b = d.base, f = d.full, ch = chapterOf(n);
  setBar(backBtn() +
    "<h1>DAY " + pad(n) + "<small>" + verbLabel(b) + "</small></h1>" +
    '<span class="timer" id="timer">0:00 / 12:00</span>' + langToggle(),
    f ? '<a href="#s1" class="on">1 · ' + ui("stepEx") + '</a><a href="#s2">2 · Small talk</a><a href="#s3">3 · ' + ui("stepTest") + "</a>" : "");
  tick();

  var r = ytRangeFor(n);
  var html =
    '<div class="hero"><div class="eyebrow">' + ui("chapterN", ch.n) + " · " + esc(S.lang === "ko" ? (ch.meta.ko || ch.meta.ru) : ch.meta.ru) + "</div>" +
      '<div class="pv">' + pvHTML(b) + "</div></div>" +
    '<div class="keyline" data-line="1" data-say="' + esc(b.en) + '"><div><div class="en">' + hl(b.en, b.verb) + '</div><div class="tr">' + esc(tr(b)) + "</div></div>" + PLAY + "</div>" +
    '<div class="scene">' +
      (b.image ? '<img src="' + esc((window.IMG_BASE || "images/") + b.image) + '" alt="">' : '<div class="ph"><div><b>' + esc(b.verb.toLowerCase()) + "</b>" + ui("noImage") + "</div></div>") +
      '<div class="kws"><span class="kw">' + verbLabel(b) + "</span>" +
        '<a class="kw" target="_blank" rel="noopener" href="' + ytUrl(r.id) + '">' + ui("ytVideo") + " · DAY " + r.from + "–" + r.to + "</a></div>" +
    "</div>";

  if (!f) {
    html += '<div class="note"><div class="eyebrow">' + ui("draftTitle") + "</div><p>" + ui("draftBody") + "</p></div>" +
      '<div style="margin-top:20px"><button class="btn" data-finish="1">' + ui("finishDay", n) + "</button></div>";
    render(html);
    return;
  }

  html += '<div class="note"><div class="eyebrow">' + ui("meaning") + "</div><p>" + esc(t(f.meaning)) + "</p></div>";

  /* 1 · примеры */
  var more = f.more || [];
  var total = f.examples.length + more.length;
  html += '<section id="s1"><div class="sec-h"><h2>Model Examples</h2><span>' + ui("phrasesN", total) + "</span></div>" +
    '<div class="tools"><button class="pill" data-playall="ex">' + ui("listenAll") + "</button>" +
      '<button class="pill" data-hidetr="1" aria-pressed="' + document.body.classList.contains("hide-tr") + '">' + ui("hideTr") + "</button></div>" +
    '<div class="dlg" id="ex">' + f.examples.map(function (e, i) {
      return lineHTML(e, b.verb, '<div class="num">' + (i + 1) + "</div>", "nw");
    }).join("") + "</div>";
  if (more.length) {
    html += '<div class="talk"><div class="talk-h"><span class="tag t3">' + ui("moreEx") + '</span><button class="play" data-playall="more">' + ui("listen2") + "</button></div>" +
      '<div class="dlg" id="more">' + more.map(function (e, i) {
        return lineHTML(e, b.verb, '<div class="num">' + (f.examples.length + i + 1) + "</div>", "nw");
      }).join("") + "</div></div>";
  }
  html += "</section>";

  /* 2 · small talk */
  html += '<section id="s2"><div class="sec-h"><h2>Small Talk</h2><span>' + ui("minApprox", 2) + "</span></div>" +
    '<div class="tools"><button class="pill" data-playall="dlg">' + ui("listenAll") + "</button></div>" +
    '<p class="fine" style="margin:-2px 0 10px">' + ui("hintDialogue") + "</p>" +
    '<div class="dlg" id="dlg">' + f.dialogue.map(function (l) {
      var who = '<div class="who">' + esc(l.s) + "</div>";
      if (l.you && !lessonState.revealed) {
        return '<div class="line you" tabindex="0" data-reveal="1"><div class="who">' + esc(l.s) + " · " + ui("you") + "</div>" +
          '<div><div class="en">' + ui("yourLine") + '</div><div class="tr">' + esc(tr(l)) + "</div></div>" + PLAY + "</div>";
      }
      return lineHTML(l, b.verb, who);
    }).join("") + "</div>" +
    '<div class="note"><div class="eyebrow">Further Studies</div><ol>' +
      f.notes.map(function (x) { return "<li>" + esc(t(x)) + "</li>"; }).join("") + "</ol></div>" +
  "</section>";

  /* 3 · тест */
  html += '<section id="s3"><div class="sec-h"><h2>' + ui("stepTest") + "</h2><span>" + ui("quizN", f.quiz.length) + "</span></div>" +
    f.quiz.map(function (q, i) {
      if (q.type === "build") {
        return '<div class="q" id="q' + i + '"><div class="eyebrow">' + ui("buildIt") + "</div>" +
          '<div class="prompt">' + esc(S.lang === "ko" ? (q.ko || q.ru) : q.ru) + "</div>" +
          '<div class="slot" id="slot' + i + '"></div>' +
          '<div class="tokens">' + lessonState.pools[i].map(function (w, k) {
            return '<button class="tok" data-tok="' + i + ":" + k + '">' + esc(w) + "</button>";
          }).join("") + "</div>" +
          '<div class="qbtns"><button class="pill" data-clear="' + i + '">' + ui("clear") + "</button></div>" +
          '<div class="expl" id="v' + i + '"></div></div>';
      }
      return '<div class="q" id="q' + i + '"><div class="eyebrow">' + ui("pickIt") + "</div>" +
        '<div class="prompt">' + esc(S.lang === "ko" ? (q.q_ko || q.q_ru) : q.q_ru) + "</div>" +
        '<div class="opts">' + q.options.map(function (o, j) {
          return '<button class="opt" data-opt="' + i + ":" + j + '">' + esc(o.en) + "</button>";
        }).join("") + "</div>" +
        '<div class="expl" id="v' + i + '"></div></div>';
    }).join("") +
    '<div id="result"></div>' +
    '<div style="margin-top:16px"><button class="btn" data-finish="1">' + ui("finishDay", n) + "</button></div>" +
  "</section>";

  render(html);
  f.quiz.forEach(function (q, i) { drawQ(i); });
  drawResult();
}

/* состояние одного задания → DOM (переживает перерисовку при смене языка) */
function drawQ(i) {
  var f = dayData(lessonState.day).full, q = f.quiz[i], v = document.getElementById("v" + i);
  if (q.type === "build") {
    var pool = lessonState.pools[i], picked = lessonState.picked[i];
    var target = q.answer.split(/\s+/).filter(Boolean);
    var slot = document.getElementById("slot" + i);
    slot.innerHTML = picked.map(function (k, p) {
      return '<button class="tok" data-un="' + i + ":" + p + '">' + esc(pool[k]) + "</button>";
    }).join("");
    document.querySelectorAll('#q' + i + ' [data-tok]').forEach(function (el) {
      el.classList.toggle("used", picked.indexOf(+el.dataset.tok.split(":")[1]) >= 0);
    });
    var full = picked.length === target.length;
    var ok = full && picked.map(function (k) { return pool[k]; }).join(" ") === target.join(" ");
    slot.className = "slot" + (full ? (ok ? " ok" : " bad") : "");
    document.querySelector('#q' + i + ' .qbtns').hidden = ok;
    if (!full) { v.innerHTML = ""; return; }
    v.innerHTML = ok
      ? "<b>" + ui("correct") + "</b> " + esc(q.answer)
      : "<b>" + ui("notMatching") + "</b> " + ui("rightOrder") + esc(q.answer);
  } else {
    var c = lessonState.choice[i];
    if (c === undefined) return;
    document.querySelectorAll('#q' + i + ' .opt').forEach(function (el, j) {
      el.disabled = true;
      el.classList.toggle("ok", q.options[j].ok);
      el.classList.toggle("no", j === c && !q.options[j].ok);
    });
    v.innerHTML = "<b>" + (q.options[c].ok ? ui("correct") : ui("wrong")) + "</b> " + esc(t(q.why));
  }
}

function answerBuild(i) {
  var f = dayData(lessonState.day).full, q = f.quiz[i];
  var pool = lessonState.pools[i], picked = lessonState.picked[i];
  var target = q.answer.split(/\s+/).filter(Boolean);
  if (picked.length !== target.length) return;
  var ok = picked.map(function (k) { return pool[k]; }).join(" ") === target.join(" ");
  if (lessonState.answered[i] === undefined) {
    lessonState.answered[i] = ok;
    if (!ok) lessonState.wrong++;
    pushCard(lessonState.day, q.answer, !ok);
  }
  if (ok) speak(q.answer);
  drawResult();
}

function drawResult() {
  var f = dayData(lessonState.day).full, box = document.getElementById("result");
  if (!box) return;
  var keys = Object.keys(lessonState.answered);
  if (keys.length < f.quiz.length) { box.innerHTML = ""; return; }
  var ok = keys.filter(function (k) { return lessonState.answered[k]; }).length;
  box.innerHTML = '<div class="result"><div class="score">' + ok + "/" + f.quiz.length + "</div><p>" +
    (ok === f.quiz.length ? ui("allRight") : ui("someWrong")) + "</p></div>";
}

function finishLesson() {
  var n = lessonState.day;
  if (!S.done[n]) S.done[n] = todayISO();
  var f = dayData(n).full;
  if (f) f.examples.slice(0, 3).forEach(function (e) { pushCard(n, e.en); });
  save();
  var w = lessonState.wrong;
  toast(w ? ui("dayDoneErr", n, w) : ui("dayDoneClean", n));
  home();
}

/* ---------- интервальное повторение ---------- */
var INTERVALS = [1, 3, 7, 21, 60];
function pushCard(day, en, hard) {
  var k = day + "|" + en;
  var ex = S.queue.filter(function (c) { return c.k === k; })[0];
  var b = dayData(day).base, full = dayData(day).full;
  var src = full ? full.examples.concat(full.dialogue, full.more || []).filter(function (x) { return x.en === en; })[0] : null;
  if (!src) src = { en: en, ru: b.ru, ko: b.ko };
  if (ex) { if (hard) { ex.level = 0; ex.due = addDays(todayISO(), 1); save(); } return; }
  S.queue.push({ k: k, day: day, en: en, ru: src.ru || b.ru, ko: src.ko || b.ko, level: 0, due: addDays(todayISO(), 1) });
  save();
}

/* ============================================================
   ПОВТОРЕНИЕ
   ============================================================ */
var reviewState = null;

function viewReview() {
  lessonState = null; stopTimer();
  var due = dueCards();
  if (!due.length) {
    reviewState = null;
    setBar(backBtn() + "<h1>" + ui("review") + "<small>" + ui("srsCards") + "</small></h1>" + langToggle());
    render('<div class="empty"><b>' + ui("emptyTitle") + "</b><p>" + ui("emptyBody") + "</p>" +
      (S.queue.length ? '<span class="pill">' + ui("inQueue", S.queue.length) + "</span>" : "") + "</div>");
    return;
  }
  reviewState = { cards: shuffle(due), i: 0, revealed: false, right: 0 };
  renderCard();
}

function renderCard() {
  var r = reviewState, c = r.cards[r.i];
  setBar(backBtn() + "<h1>" + ui("review") + "<small>" + ui("cardOf", r.i + 1, r.cards.length) + "</small></h1>" + langToggle());
  var body = '<div class="card"><div class="eyebrow">DAY ' + pad(c.day) + "</div>";
  if (!r.revealed) {
    body += '<div class="ask">' + esc(S.lang === "ko" ? c.ko : c.ru) + "</div></div>" +
      '<p class="fine" style="text-align:center;margin:12px 0">' + ui("sayItAloud") + "</p>" +
      '<button class="btn" data-reveal-card="1">' + ui("show") + "</button>";
  } else {
    var b = dayData(c.day).base;
    body += '<div class="en" style="font-size:20px">' + hl(c.en, b.verb) + "</div>" +
      '<div class="tr">' + esc(S.lang === "ko" ? c.ko : c.ru) + "</div>" +
      '<button class="pill" data-say="' + esc(c.en) + '">' + ui("listen2") + "</button></div>" +
      '<div class="btnrow"><button class="btn ghost" data-grade="0">' + ui("forgot") + "</button>" +
      '<button class="btn" data-grade="1">' + ui("knew") + "</button></div>";
  }
  render(body);
}

function grade(ok) {
  var r = reviewState, c = r.cards[r.i];
  var real = S.queue.filter(function (x) { return x.k === c.k; })[0] || c;
  if (ok) { real.level = Math.min(real.level + 1, INTERVALS.length - 1); r.right++; }
  else real.level = 0;
  real.due = addDays(todayISO(), INTERVALS[real.level]);
  save();
  r.i++; r.revealed = false;
  if (r.i >= r.cards.length) { toast(ui("reviewDone", r.right, r.cards.length)); home(); }
  else renderCard();
}


/* ---------- офлайн: складываем всё в кэш ---------- */
var CACHE = "verb100-v2";

function offlineUrls() {
  var list = ["./", "index.html", "app.css", "app.js", "data.js", "fonts.css",
              "manifest.webmanifest", "icons/icon-180.png", "icons/icon-192.png",
              "icons/icon-512.png"];
  (window.FONT_FILES || []).forEach(function (f) { list.push(f); });
  window.DAYS.forEach(function (d) { if (d.image) list.push("images/" + d.image); });
  return list;
}

/* Сколько из них уже лежит в кэше. */
function offlineStatus() {
  if (!window.caches) return Promise.resolve(null);
  var urls = offlineUrls();
  return caches.open(CACHE).then(function (c) {
    return Promise.all(urls.map(function (u) {
      return c.match(u).then(function (r) { return r ? (r.headers.get("content-length") | 0) || 1 : 0; });
    }));
  }).then(function (sizes) {
    var have = sizes.filter(Boolean).length;
    return { have: have, total: urls.length, bytes: sizes.reduce(function (a, b) { return a + b; }, 0) };
  });
}

function downloadOffline(onProgress) {
  var urls = offlineUrls(), done = 0;
  return caches.open(CACHE).then(function (c) {
    var queue = urls.slice();
    function worker() {
      var u = queue.shift();
      if (!u) return Promise.resolve();
      return fetch(u, { cache: "reload" })
        .then(function (r) { return r.ok ? c.put(u, r) : null; })
        .catch(function () {})
        .then(function () { onProgress(++done, urls.length); return worker(); });
    }
    var lanes = [];
    for (var i = 0; i < 6; i++) lanes.push(worker());
    return Promise.all(lanes);
  });
}

/* ---------- напоминание (пока приложение открыто/в фоне) ---------- */
var remTimer = null;
function scheduleReminder() {
  if (remTimer) clearTimeout(remTimer);
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  var parts = S.reminder.split(":");
  var now = new Date();
  var target = new Date(now);
  target.setHours(+parts[0], +parts[1], 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1);
  var ms = target - now;
  if (ms > 2147483647) return;
  remTimer = setTimeout(function () {
    var n = currentDay(), b = dayData(n).base;
    if (!S.done[n]) {
      try { new Notification("Verb 100 · DAY " + n, { body: b.verb + " — " + b.en, icon: "icons/icon-180.png" }); } catch (e) {}
    }
    scheduleReminder();
  }, ms);
}

/* ============================================================
   РОУТЕР И СОБЫТИЯ
   ============================================================ */
/* Перерисовать текущий экран, сохранив прокрутку (смена языка, темы, скорости). */
function rerender() {
  var y = window.scrollY;
  if (lessonState) renderLesson();
  else if (reviewState) renderCard();
  else home();
  window.scrollTo(0, y);
}
function go(where) {
  if (where === "review") viewReview();
  else home();
}

/* Озвучить несколько строк подряд с подсветкой текущей. */
function sayList(els) {
  if (!window.speechSynthesis) return toast(ui("noTts"));
  speechSynthesis.cancel();
  var i = 0;
  (function next() {
    document.querySelectorAll(".playing").forEach(function (x) { x.classList.remove("playing"); });
    if (i >= els.length || !els[i].isConnected) return;
    var el = els[i++];
    el.classList.add("playing");
    var u = new SpeechSynthesisUtterance(el.dataset.say);
    u.lang = S.voice; u.rate = S.rate;
    var v = voices.filter(function (x) { return x.lang === S.voice || x.lang.replace("_", "-") === S.voice; })[0];
    if (v) u.voice = v;
    u.onend = u.onerror = next;
    speechSynthesis.speak(u);
  })();
}

/* Переключатель курсов: «Базовые глаголы 100» ⇄ «Фразовые глаголы 100» (phrasal-verbs/).
   Последний открытый курс хранится в localStorage "courses:last" — index.html
   открывает его при запуске. */
function setCourse(c) { try { localStorage.setItem("courses:last", c); } catch (e) {} }
setCourse("basic");

document.addEventListener("click", function (e) {
  var el, p;

  if ((el = e.target.closest("[data-course]"))) { setCourse(el.dataset.course); return; } // ссылка ведёт дальше сама
  if ((el = e.target.closest(".steps a"))) {
    e.preventDefault();
    var sec = document.querySelector(el.getAttribute("href"));
    if (sec) window.scrollTo({ top: sec.getBoundingClientRect().top + window.scrollY - 118, behavior: "smooth" });
    return;
  }
  if (e.target.closest("[data-home]")) { home(); return; }
  if ((el = e.target.closest("[data-go]"))) { go(el.dataset.go); return; }
  if ((el = e.target.closest("[data-scroll]"))) {
    var target = document.getElementById(el.dataset.scroll);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  if ((el = e.target.closest("[data-lesson]"))) { startLesson(+el.dataset.lesson); return; }
  if ((el = e.target.closest("[data-lang]"))) { S.lang = el.dataset.lang; save(); rerender(); return; }
  if ((el = e.target.closest("[data-set-theme]"))) { S.theme = el.dataset.setTheme; save(); applyTheme(); rerender(); return; }
  if ((el = e.target.closest("[data-rate]"))) { S.rate = parseFloat(el.dataset.rate); save(); rerender(); return; }
  if ((el = e.target.closest("[data-voice]"))) { S.voice = el.dataset.voice; save(); rerender(); return; }

  /* урок */
  if ((el = e.target.closest("[data-playall]"))) {
    sayList(Array.prototype.slice.call(document.querySelectorAll("#" + el.dataset.playall + " [data-say]")));
    return;
  }
  if ((el = e.target.closest("[data-hidetr]"))) {
    var on = document.body.classList.toggle("hide-tr");
    el.setAttribute("aria-pressed", on);
    document.querySelectorAll(".tr.show").forEach(function (x) { x.classList.remove("show"); });
    return;
  }
  if ((el = e.target.closest("[data-reveal]"))) {
    lessonState.revealed = true;
    var line = dayData(lessonState.day).full.dialogue.filter(function (l) { return l.you; })[0];
    var fresh = h(lineHTML(line, dayData(lessonState.day).base.verb, '<div class="who">' + esc(line.s) + " · " + ui("you") + "</div>"));
    el.replaceWith(fresh);
    speak(line.en, fresh);
    return;
  }
  if ((el = e.target.closest(".tr")) && document.body.classList.contains("hide-tr")) { el.classList.toggle("show"); return; }
  if ((el = e.target.closest("[data-tok]"))) {
    p = el.dataset.tok.split(":"); var qi = +p[0];
    var picked = lessonState.picked[qi];
    if (el.classList.contains("used") || lessonState.answered[qi] === true) return;
    var need = dayData(lessonState.day).full.quiz[qi].answer.split(/\s+/).filter(Boolean).length;
    if (picked.length >= need) return;
    picked.push(+p[1]);
    drawQ(qi); answerBuild(qi);
    return;
  }
  if ((el = e.target.closest("[data-un]"))) {
    p = el.dataset.un.split(":");
    if (lessonState.answered[+p[0]] === true) return;
    lessonState.picked[+p[0]].splice(+p[1], 1);
    drawQ(+p[0]);
    return;
  }
  if ((el = e.target.closest("[data-clear]"))) {
    var ci = +el.dataset.clear;
    if (lessonState.answered[ci] === true) return;
    lessonState.picked[ci] = [];
    drawQ(ci);
    return;
  }
  if ((el = e.target.closest("[data-opt]"))) {
    p = el.dataset.opt.split(":"); var oi = +p[0], j = +p[1];
    if (lessonState.choice[oi] !== undefined) return;
    var q = dayData(lessonState.day).full.quiz[oi];
    lessonState.choice[oi] = j;
    lessonState.answered[oi] = !!q.options[j].ok;
    if (!q.options[j].ok) lessonState.wrong++;
    var right = q.options.filter(function (x) { return x.ok; })[0];
    if (right) pushCard(lessonState.day, right.en, !q.options[j].ok);
    drawQ(oi); drawResult();
    return;
  }
  if (e.target.closest("[data-finish]")) { finishLesson(); return; }

  /* повторение */
  if (e.target.closest("[data-reveal-card]")) { reviewState.revealed = true; renderCard(); return; }
  if ((el = e.target.closest("[data-grade]"))) { grade(el.dataset.grade === "1"); return; }

  /* строка с озвучкой (в самом конце: внутри неё нет других кнопок) */
  if ((el = e.target.closest("[data-say]"))) { speak(el.dataset.say, el); return; }
});

document.addEventListener("keydown", function (e) {
  if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches(".line,.keyline")) { e.preventDefault(); e.target.click(); }
});

/* Вкладки урока: подсвечиваем ту, чей раздел сейчас на экране. */
var spyT;
window.addEventListener("scroll", function () {
  clearTimeout(spyT);
  spyT = setTimeout(function () {
    if (stepsNav.hidden) return;
    var on = 0;
    ["s1", "s2", "s3"].forEach(function (id, i) {
      var s = document.getElementById(id);
      if (s && s.getBoundingClientRect().top < 160) on = i;
    });
    stepsNav.querySelectorAll("a").forEach(function (a, i) { a.classList.toggle("on", i === on); });
  }, 80);
}, { passive: true });

function applyTheme() {
  if (S.theme === "auto") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", S.theme);
}

/* ---------- старт ---------- */
applyTheme();
home();
scheduleReminder();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  });
}
})();
