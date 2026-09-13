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
  greet:        ["Доброе утро", "좋은 아침입니다"],
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
  if (btn) {
    btn.classList.add("active");
    u.onend = u.onerror = function () { btn.classList.remove("active"); };
  }
  speechSynthesis.speak(u);
}

/* ---------- утилиты DOM ---------- */
var view = document.getElementById("view");
var tabbar = document.getElementById("tabbar");
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

/* ---------- иллюстрация ---------- */
function illo(d) {
  if (!d.image) {
    return '<div class="illo"><div class="ph"><b>' + esc(d.verb) + "</b>" +
      '<span>' + ui("noImage") + "</span></div></div>";
  }
  var src = (window.IMG_BASE || "images/") + d.image;
  return '<div class="illo"><img src="' + esc(src) + '" alt="" loading="lazy"></div>';
}

/* ---------- блок с видео ---------- */
function ytCard(n) {
  var r = ytRangeFor(n);
  return '<div class="card tight">' +
    '<div class="lbl" style="margin-bottom:8px">' + ui("watching") + "</div>" +
    '<a class="row" target="_blank" rel="noopener" href="' + ytUrl(r.id) + '">' +
      '<div class="grow" style="font-size:13.5px;line-height:1.35">' + ui("ytRange", r.from, r.to) +
        '<div class="tr">' + ui("ytPlaylist") + "</div></div>" +
      '<span class="pill">' + ui("open") + "</span>" +
    "</a>" +
    '<div class="divider" style="height:1px;background:var(--line);margin:10px 0"></div>' +
    '<div class="row" style="gap:7px">' +
      '<span class="tr" style="margin:0">' + ui("ytWhole") + "</span>" +
      '<a class="pill n" target="_blank" rel="noopener" href="' + ytUrl(YT.fullKoEn) + '">' + ui("ytKoEn") + "</a>" +
      '<a class="pill n" target="_blank" rel="noopener" href="' + ytUrl(YT.fullEn) + '">' + ui("ytEnOnly") + "</a>" +
    "</div>" +
  "</div>";
}

/* ============================================================
   ЭКРАН: СЕГОДНЯ
   ============================================================ */
function viewToday() {
  var n = currentDay();
  var d = dayData(n);
  var b = d.base;
  var done = doneCount();
  var due = dueCards().length;
  var ch = chapterOf(n);
  var pct = done / 100;
  var C = 2 * Math.PI * 23;
  var st = streak();
  var finished = done >= 100;

  var html =
  '<div class="stack">' +
    '<div class="head">' +
      "<div>" +
        '<div class="sub">' + esc(humanDate(todayISO())) + "</div>" +
        "<h1>" + (finished ? ui("courseDone") : (st > 0 ? ui("streakOn") : ui("greet"))) + "</h1>" +
      "</div>" +
      '<div class="row" style="gap:8px">' +
        '<button class="iconbtn" data-go="settings" aria-label="' + ui("settings") + '"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/></svg></button>' +
        '<svg class="ring" viewBox="0 0 56 56" aria-label="' + ui("progressAria", done) + '">' +
          '<circle class="bg" cx="28" cy="28" r="23"></circle>' +
          '<circle class="fg" cx="28" cy="28" r="23" stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + (C * (1 - pct)).toFixed(1) + '" transform="rotate(-90 28 28)"></circle>' +
          '<text x="28" y="33" text-anchor="middle">' + done + "</text>" +
        "</svg>" +
      "</div>" +
    "</div>";

  if (finished) {
    html += '<div class="card"><div class="lbl">' + ui("done") + '</div><p class="mut" style="margin:6px 0 0">' + ui("doneText") + "</p></div>";
  } else {
    html +=
    '<div class="hero">' +
      '<div class="row" style="align-items:flex-start">' +
        '<div class="grow">' +
          '<div class="lbl">DAY ' + n + " · " + ui("chapter") + " " + ch.n + "</div>" +
          '<div class="verb">' + esc(b.verb) + (b.sense ? " " + b.sense : "") + "</div>" +
        "</div>" +
        (d.full ? "" : '<span class="pill" style="background:rgba(255,255,255,.22);color:var(--on-acc)">' + ui("draft") + "</span>") +
      "</div>" +
      "<div>" +
        '<div class="en">' + esc(b.en) + "</div>" +
        '<div class="tr">' + esc(tr(b)) + "</div>" +
      "</div>" +
      '<button class="btn light" data-lesson="' + n + '">' + ui("startLesson") + " · " + (d.full ? ui("min12") : ui("min3")) + "</button>" +
    "</div>";
  }

  html +=
    '<button class="card tight row" data-go="review" style="width:100%;text-align:left">' +
      '<div class="grow"><div class="lbl">' + ui("review") + '</div><div style="font-size:13.5px">' +
        (due ? ui("dueCards", due) : ui("dueNone")) +
      "</div></div>" +
      '<span class="pill' + (due ? "" : " g") + '">' + (due ? ui("start") : "✓") + "</span>" +
    "</button>" +

    '<div class="row" style="gap:10px">' +
      '<div class="card tight grow row"><div class="grow"><div class="lbl">' + ui("streak") + '</div><div style="font-size:13.5px">' +
        (st ? ui("streakDays", daysWord(st)) : ui("streakNone")) +
      '</div></div><div class="big" style="font-size:22px;color:var(--acc)">' + st + "</div></div>" +
    "</div>" +

    ytCard(n) +
  "</div>";

  render(html, "today");
}
function plural(n, a, b, c) {
  var m = n % 100;
  if (m >= 11 && m <= 14) return c;
  m = n % 10;
  if (m === 1) return a;
  if (m >= 2 && m <= 4) return b;
  return c;
}

/* ============================================================
   ЭКРАН: УРОК
   ============================================================ */
var lessonState = null;
var activeBuild = null;

function startLesson(n) {
  var d = dayData(n);
  lessonState = { day: n, step: 0, quizIndex: 0, wrong: 0 };
  renderLesson();
}

function lessonSteps() {
  var d = dayData(lessonState.day);
  return d.full ? ["meaning", "examples", "dialogue", "notes", "quiz"] : ["meaning"];
}

function renderLesson() {
  var n = lessonState.day, d = dayData(n), b = d.base, f = d.full;
  var steps = lessonSteps(), step = steps[lessonState.step];

  var bar = '<div class="steps">' + steps.map(function (_, i) {
    return '<i class="' + (i < lessonState.step ? "done" : i === lessonState.step ? "on" : "") + '"></i>';
  }).join("") + "</div>";

  var head =
  '<div class="head">' +
    "<div>" +
      '<div class="sub">DAY ' + n + " / 100</div>" +
      "<h1>" + esc(b.verb) + (b.sense ? " " + b.sense : "") + "</h1>" +
    "</div>" +
    '<div class="row" style="gap:8px">' + langToggle() +
      '<button class="iconbtn" data-go="today" aria-label="' + ui("close") + '"><svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button>' +
    "</div>" +
  "</div>";

  var body = "";

  if (step === "meaning") {
    body =
      illo(b) +
      '<div class="card">' +
        '<div class="lbl" style="margin-bottom:7px">' + ui("keySentence") + "</div>" +
        '<div class="en">' + esc(b.en) + "</div>" +
        '<div class="tr">' + esc(tr(b)) + "</div>" +
        '<div class="row" style="gap:7px;margin-top:12px">' +
          '<button class="pill" data-say="' + esc(b.en) + '">' + ui("listen") + "</button>" +
          '<button class="pill n" data-rate="1">' + S.rate.toFixed(2).replace(/0$/, "") + "×</button>" +
          '<a class="pill n" target="_blank" rel="noopener" href="' + ytUrl(ytRangeFor(n).id) + '">' + ui("ytVideo") + "</a>" +
        "</div>" +
      "</div>";
    if (f) {
      body += '<div><div class="lbl" style="margin-bottom:6px">' + ui("meaning") + '</div><p style="margin:0;font-size:14.5px;line-height:1.55">' + esc(t(f.meaning)) + "</p></div>";
    } else {
      body +=
      '<div class="card">' +
        '<div class="lbl">' + ui("draftTitle") + "</div>" +
        '<p class="mut" style="margin:7px 0 0;font-size:14px;line-height:1.5">' + ui("draftBody") + "</p>" +
      "</div>";
    }
  }

  if (step === "examples") {
    body =
      '<div><h2 class="big" style="font-size:18px">Model Examples</h2>' +
      '<p class="mut" style="margin:4px 0 0;font-size:13.5px">' + ui("hintExamples") + "</p></div>" +
      '<div class="card"><div class="ex">' +
        f.examples.map(function (e, i) {
          return '<div class="exitem" data-toggle="' + i + '">' +
            '<button class="play" data-say="' + esc(e.en) + '"><svg viewBox="0 0 10 10"><path d="M1 0l8 5-8 5z"/></svg></button>' +
            '<div class="grow"><div class="en">' + esc(e.en) + '</div><div class="tr">' + esc(tr(e)) + "</div></div>" +
          "</div>";
        }).join("") +
      "</div></div>";
  }

  if (step === "dialogue") {
    body =
      '<div><h2 class="big" style="font-size:18px">Small Talk</h2>' +
      '<p class="mut" style="margin:4px 0 0;font-size:13.5px">' + ui("hintDialogue") + "</p></div>" +
      '<div class="dlg">' +
        f.dialogue.map(function (l) {
          if (l.you) {
            return '<div class="who" style="justify-self:end">' + l.s + " · " + ui("you") + "</div>" +
              '<div class="bub you" data-reveal><div class="en mut">' + ui("yourLine") + '</div><div class="tr">' + esc(tr(l)) + "</div></div>";
          }
          return '<div class="who"' + (l.s === "B" ? ' style="justify-self:end"' : "") + ">" + l.s + "</div>" +
            '<div class="bub ' + (l.s === "A" ? "a" : "b") + '">' +
              '<div class="en">' + esc(l.en) + '</div><div class="tr">' + esc(tr(l)) + "</div>" +
            "</div>";
        }).join("") +
      "</div>" +
      '<button class="btn ghost" data-say-all="1">' + ui("playDialogue") + "</button>";
  }

  if (step === "notes") {
    body =
      '<div><h2 class="big" style="font-size:18px">Further Studies</h2>' +
      '<p class="mut" style="margin:4px 0 0;font-size:13.5px">' + ui("hintNotes") + "</p></div>" +
      '<div class="card">' +
        f.notes.map(function (x, i) {
          return '<div class="note"><b class="m">' + (i + 1) + "</b><div>" + esc(t(x)) + "</div></div>";
        }).join("") +
      "</div>";
  }

  if (step === "quiz") {
    return renderQuiz();
  }

  var last = lessonState.step >= steps.length - 1;
  var next = last
    ? '<button class="btn teal" data-finish="1">' + ui("finishDay", n) + "</button>"
    : '<button class="btn" data-next="1">' + ui("next") + "</button>";

  render('<div class="stack">' + bar + head + body + '<div style="height:4px"></div>' + next + "</div>", null);
}

function langToggle() {
  return '<div class="seg">' +
    '<button data-lang="ru" class="' + (S.lang === "ru" ? "on" : "") + '">RU</button>' +
    '<button data-lang="ko" class="' + (S.lang === "ko" ? "on" : "") + '">한</button>' +
  "</div>";
}

/* ---------- тест ---------- */
function renderQuiz() {
  var n = lessonState.day, f = dayData(n).full;
  var q = f.quiz[lessonState.quizIndex];
  var steps = lessonSteps();
  var bar = '<div class="steps">' + steps.map(function (_, i) {
    return '<i class="' + (i < lessonState.step ? "done" : i === lessonState.step ? "on" : "") + '"></i>';
  }).join("") + "</div>";

  var head =
  '<div class="head"><div><div class="sub">DAY ' + n + " · " + ui("check") + "</div><h1>" + ui("taskOf", lessonState.quizIndex + 1, f.quiz.length) + "</h1></div>" +
  '<div class="row" style="gap:8px">' + langToggle() +
  '<button class="iconbtn" data-go="today" aria-label="' + ui("close") + '"><svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div></div>';

  var body = "";
  if (q.type === "build") {
    var words = q.answer.split(/\s+/).filter(Boolean);
    var pool = shuffle(words.concat(q.extra || []));
    body =
      '<div><div class="lbl" style="margin-bottom:6px">' + ui("buildIt") + "</div>" +
      '<div style="font-size:15px">' + esc(S.lang === "ko" ? (q.ko || q.ru) : q.ru) + "</div></div>" +
      '<div class="slot" id="slot"></div>' +
      '<div class="tokens" id="pool">' + pool.map(function (w, i) {
        return '<button class="tok" data-tok="' + i + '" data-w="' + esc(w) + '">' + esc(w) + "</button>";
      }).join("") + "</div>" +
      '<button class="btn ghost sm" id="clearBtn" data-clear="1" hidden>' + ui("clear") + "</button>" +
      '<div id="verdict"></div>';
  } else {
    body =
      '<div><div class="lbl" style="margin-bottom:6px">' + esc(S.lang === "ko" ? (q.q_ko || q.q_ru) : q.q_ru) + "</div></div>" +
      '<div class="stack" id="opts">' + q.options.map(function (o, i) {
        return '<button class="opt" data-opt="' + i + '"><span class="mk"></span><span class="en" style="font-size:15px">' + esc(o.en) + "</span></button>";
      }).join("") + "</div>" +
      '<div id="verdict"></div>';
  }

  render('<div class="stack">' + bar + head + body + "</div>", null);

  activeBuild = null;
  if (q.type === "build") wireBuild(q);
  else wirePick(q);
}

function wireBuild(q) {
  var slot = document.getElementById("slot");
  var pool = document.getElementById("pool");
  var target = q.answer.split(/\s+/).filter(Boolean);
  var picked = [];

  function redraw() {
    slot.innerHTML = picked.map(function (w, i) {
      return '<button class="tok" data-un="' + i + '">' + esc(w) + "</button>";
    }).join("");
    slot.className = "slot";
    var cb = document.getElementById("clearBtn");
    if (cb) cb.hidden = picked.length === 0;
    if (picked.length === target.length) check();
  }
  function check() {
    var ok = picked.join(" ") === target.join(" ");
    slot.className = "slot " + (ok ? "ok" : "bad");
    var v = document.getElementById("verdict");
    if (ok) {
      var cb2 = document.getElementById("clearBtn"); if (cb2) cb2.hidden = true;
      v.innerHTML = '<div class="card tight"><div class="row"><div class="grow"><b style="color:var(--acc2)">' + ui("correct") + "</b> " +
        esc(q.answer) + '</div><button class="play" data-say="' + esc(q.answer) + '"><svg viewBox="0 0 10 10"><path d="M1 0l8 5-8 5z"/></svg></button></div></div>' +
        '<button class="btn" data-qnext="1">' + ui("next") + "</button>";
      pushCard(lessonState.day, q.answer);
    } else {
      lessonState.wrong++;
      v.innerHTML = '<div class="card tight"><b style="color:var(--acc)">' + ui("notMatching") + "</b> " + ui("rightOrder") +
        esc(target.join(" ")) + "</div>" +
        '<button class="btn ghost sm" data-clear="1">' + ui("tryAgain") + "</button>" +
        '<button class="btn" data-qnext="1">' + ui("next") + "</button>";
      pushCard(lessonState.day, q.answer, true);
    }
  }

  pool.addEventListener("click", function (e) {
    var b = e.target.closest("[data-tok]"); if (!b || b.classList.contains("used")) return;
    b.classList.add("used");
    picked.push(b.dataset.w);
    redraw();
  });
  slot.addEventListener("click", function (e) {
    var b = e.target.closest("[data-un]"); if (!b) return;
    var i = +b.dataset.un, w = picked[i];
    picked.splice(i, 1);
    var back = Array.prototype.slice.call(pool.querySelectorAll(".tok.used")).filter(function (x) { return x.dataset.w === w; })[0];
    if (back) back.classList.remove("used");
    document.getElementById("verdict").innerHTML = "";
    redraw();
  });
  activeBuild = function () {
    picked = [];
    Array.prototype.slice.call(pool.querySelectorAll(".tok")).forEach(function (x) { x.classList.remove("used"); });
    document.getElementById("verdict").innerHTML = "";
    redraw();
  };
  redraw();
}

function wirePick(q) {
  var opts = document.getElementById("opts");
  opts.addEventListener("click", function (e) {
    var b = e.target.closest("[data-opt]"); if (!b || opts.dataset.locked) return;
    opts.dataset.locked = "1";
    var i = +b.dataset.opt, o = q.options[i];
    Array.prototype.slice.call(opts.children).forEach(function (el, j) {
      var oo = q.options[j];
      el.classList.add(oo.ok ? "ok" : "no");
      el.querySelector(".mk").textContent = oo.ok ? "✓" : "✕";
    });
    if (!o.ok) lessonState.wrong++;
    var right = q.options.filter(function (x) { return x.ok; })[0];
    document.getElementById("verdict").innerHTML =
      '<div class="card tight"><b style="color:' + (o.ok ? "var(--acc2)" : "var(--acc)") + '">' +
      (o.ok ? ui("correct") : ui("wrong")) + "</b> " + esc(t(q.why)) + "</div>" +
      '<button class="btn" data-qnext="1">' + ui("next") + "</button>";
    if (right) pushCard(lessonState.day, right.en, !o.ok);
  });
}

function quizNext() {
  var f = dayData(lessonState.day).full;
  if (lessonState.quizIndex < f.quiz.length - 1) {
    lessonState.quizIndex++;
    renderQuiz();
  } else {
    finishLesson();
  }
}

function finishLesson() {
  var n = lessonState.day;
  S.done[n] = todayISO();
  var f = dayData(n).full;
  if (f) f.examples.slice(0, 3).forEach(function (e) { pushCard(n, e.en); });
  save();
  var w = lessonState.wrong;
  toast(w ? ui("dayDoneErr", n, w) : ui("dayDoneClean", n));
  lessonState = null;
  go("today");
}

/* ---------- интервальное повторение ---------- */
var INTERVALS = [1, 3, 7, 21, 60];
function pushCard(day, en, hard) {
  var k = day + "|" + en;
  var ex = S.queue.filter(function (c) { return c.k === k; })[0];
  var b = dayData(day).base;
  var full = dayData(day).full;
  var src = full ? (full.examples.concat(full.dialogue).filter(function (x) { return x.en === en; })[0]) : null;
  if (!src) src = { en: en, ru: b.ru, ko: b.ko };
  if (ex) { if (hard) { ex.level = 0; ex.due = addDays(todayISO(), 1); } return; }
  S.queue.push({
    k: k, day: day, en: en,
    ru: src.ru || b.ru, ko: src.ko || b.ko,
    level: hard ? 0 : 0,
    due: addDays(todayISO(), 1)
  });
  save();
}

/* ============================================================
   ЭКРАН: ПОВТОРЕНИЕ
   ============================================================ */
var reviewState = null;

function viewReview() {
  var due = dueCards();
  if (!due.length) {
    render('<div class="stack">' + headSimple(ui("review"), ui("srsCards")) +
      '<div class="empty"><b>' + ui("emptyTitle") + "</b><p>" + ui("emptyBody") + "</p>" +
      (S.queue.length ? '<span class="pill n">' + ui("inQueue", S.queue.length) + "</span>" : "") +
      "</div></div>", "review");
    return;
  }
  reviewState = { cards: shuffle(due), i: 0, revealed: false, right: 0 };
  renderCard();
}

function renderCard() {
  var r = reviewState, c = r.cards[r.i];
  var body;
  if (!r.revealed) {
    body =
      '<div class="card" style="padding:26px 18px;text-align:center">' +
        '<div class="lbl">DAY ' + c.day + "</div>" +
        '<div style="font-size:18px;margin-top:10px;line-height:1.4">' + esc(S.lang === "ko" ? c.ko : c.ru) + "</div>" +
      "</div>" +
      '<p class="mut" style="text-align:center;margin:0;font-size:13.5px">' + ui("sayItAloud") + "</p>" +
      '<button class="btn" data-reveal-card="1">' + ui("show") + "</button>";
  } else {
    body =
      '<div class="card" style="padding:26px 18px;text-align:center">' +
        '<div class="lbl">DAY ' + c.day + "</div>" +
        '<div class="en" style="font-size:19px;margin-top:10px">' + esc(c.en) + "</div>" +
        '<div class="tr">' + esc(S.lang === "ko" ? c.ko : c.ru) + "</div>" +
        '<button class="pill" style="margin-top:14px" data-say="' + esc(c.en) + '">' + ui("listen") + "</button>" +
      "</div>" +
      '<div class="btnrow">' +
        '<button class="btn ghost" data-grade="0">' + ui("forgot") + "</button>" +
        '<button class="btn teal" data-grade="1">' + ui("knew") + "</button>" +
      "</div>";
  }
  render('<div class="stack">' +
    headSimple(ui("cardOf", r.i + 1, r.cards.length), ui("review")) +
    body + "</div>", "review");
}

function grade(ok) {
  var r = reviewState, c = r.cards[r.i];
  var real = S.queue.filter(function (x) { return x.k === c.k; })[0] || c;
  if (ok) { real.level = Math.min(real.level + 1, INTERVALS.length - 1); r.right++; }
  else real.level = 0;
  real.due = addDays(todayISO(), INTERVALS[real.level]);
  save();
  r.i++;
  r.revealed = false;
  if (r.i >= r.cards.length) {
    toast(ui("reviewDone", r.right, r.cards.length));
    reviewState = null;
    go("today");
  } else renderCard();
}

/* ============================================================
   ЭКРАН: КАРТА 100 ДНЕЙ
   ============================================================ */
function viewMap() {
  var cur = currentDay();
  var html = '<div class="stack">' + headSimple(ui("hundredDays"), ui("bookToc")) ;
  var chs = window.CHAPTERS;
  Object.keys(chs).forEach(function (k) {
    var c = chs[k], cells = "";
    for (var i = c.from; i <= c.to; i++) {
      var cls = S.done[i] ? "done" : (i === cur ? "now" : (i < cur ? "" : "lock"));
      cells += '<button class="cell ' + cls + '" data-lesson="' + i + '">' + i + "</button>";
    }
    var verbs = {};
    window.DAYS.filter(function (d) { return d.day >= c.from && d.day <= c.to; })
      .forEach(function (d) { verbs[d.verb] = (verbs[d.verb] || 0) + 1; });
    html +=
      '<div class="chapter">' +
        '<div class="lbl">' + ui("chShort") + " " + k + " · " + esc(S.lang === "ko" ? (c.ko || c.ru) : c.ru) + " — DAY " + c.from + "–" + c.to + "</div>" +
        '<div class="map">' + cells + "</div>" +
        '<div class="pillrow">' + Object.keys(verbs).map(function (v) {
          return '<span class="pill n">' + esc(v) + (verbs[v] > 1 ? " ×" + verbs[v] : "") + "</span>";
        }).join("") + "</div>" +
      "</div>";
  });
  render(html + "</div>", "map");
}

/* ============================================================
   ЭКРАН: ПРОГРЕСС
   ============================================================ */
function viewProgress() {
  var done = doneCount(), st = streak();
  var verbs = {};
  Object.keys(S.done).forEach(function (n) {
    var b = dayData(+n).base; if (b) verbs[b.verb] = 1;
  });
  var phrases = S.queue.length;

  var cells = "";
  var start = S.start, today = todayISO();
  for (var i = 0; i < 105; i++) {
    var iso = addDays(start, i);
    var on = Object.keys(S.done).some(function (k) { return S.done[k] === iso; });
    cells += '<i class="wk' + (on ? " on" : "") + (iso === today ? " today" : "") + '"></i>';
  }

  render('<div class="stack">' +
    headSimple(ui("progress"), ui("startedOn", dateShort(S.start))) +
    '<div class="stats">' +
      '<div class="stat"><b style="color:var(--acc2)">' + done + "</b><span>" + ui("statLessons") + "</span></div>" +
      '<div class="stat"><b>' + phrases + "</b><span>" + ui("statPhrases") + "</span></div>" +
      '<div class="stat"><b style="color:var(--acc)">' + Object.keys(verbs).length + "</b><span>" + ui("statVerbs") + "</span></div>" +
    "</div>" +
    '<div class="card">' +
      '<div class="lbl" style="margin-bottom:10px">' + ui("calendar") + "</div>" +
      '<div class="weeks">' + cells + "</div>" +
      '<p class="tr" style="margin-top:10px">' + ui("softStreak") + "</p>" +
    "</div>" +
    '<div class="card tight row">' +
      '<div class="grow"><div class="lbl">' + ui("streak") + '</div><div style="font-size:13.5px">' +
        (st ? ui("streakDays", daysWord(st)) : ui("streakNone2")) + "</div></div>" +
      '<div class="big" style="font-size:22px;color:var(--acc)">' + st + "</div>" +
    "</div>" +
    (S.queue.length ? '<div class="card tight"><div class="lbl" style="margin-bottom:7px">' + ui("upcoming") + "</div>" +
      S.queue.slice().sort(function (a, b) { return a.due < b.due ? -1 : 1; }).slice(0, 4).map(function (c) {
        return '<div class="row" style="padding:5px 0"><span class="en grow" style="font-size:13.5px">' + esc(c.en) +
          '</span><span class="pill n">' + esc(c.due.slice(5).replace("-", ".")) + "</span></div>";
      }).join("") + "</div>" : "") +
  "</div>", "progress");
}

/* ============================================================
   ЭКРАН: НАСТРОЙКИ
   ============================================================ */
var TZS = ["Asia/Almaty", "Asia/Seoul", "Europe/Moscow", "Asia/Tashkent", "Asia/Dubai", "America/Sao_Paulo", "America/Bogota"];

function viewSettings() {
  render('<div class="stack">' +
    '<div class="head"><div><div class="sub">Verb 100</div><h1>' + ui("settings") + '</h1></div>' +
    '<button class="iconbtn" data-go="today" aria-label="' + ui("back") + '"><svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>' +

    '<div class="card">' +
      '<div class="field"><div><label>' + ui("langLabel") + '</label><div class="hint">' + ui("langHint") + "</div></div>" + langToggle() + "</div>" +
      '<div class="field"><div><label>' + ui("theme") + "</label></div>" +
        '<div class="seg">' +
          ["auto", "light", "dark"].map(function (x) {
            return '<button data-theme="' + x + '" class="' + (S.theme === x ? "on" : "") + '">' +
              (x === "auto" ? ui("themeAuto") : x === "light" ? ui("themeLight") : ui("themeDark")) + "</button>";
          }).join("") +
        "</div></div>" +
    "</div>" +

    '<div class="card">' +
      '<div class="field"><div><label>' + ui("reminder") + '</label><div class="hint">' + ui("reminderHint") + "</div></div>" +
        '<input type="time" id="rem" value="' + esc(S.reminder) + '"></div>' +
      '<div class="field"><div><label>' + ui("timezone") + '</label><div class="hint">' + ui("timezoneHint") + "</div></div>" +
        '<select id="tz">' + TZS.map(function (z) {
          return '<option value="' + z + '"' + (S.tz === z ? " selected" : "") + ">" + z.split("/")[1].replace("_", " ") + "</option>";
        }).join("") + "</select></div>" +
      '<div class="field"><div><label>' + ui("allowNotif") + '</label><div class="hint">' + ui("allowHint") + "</div></div>" +
        '<button class="pill" id="notif">' + ui("enable") + "</button></div>" +
    "</div>" +

    '<div class="card">' +
      '<div class="field"><div><label>' + ui("speechRate") + "</label></div>" +
        '<div class="seg">' + [0.75, 0.95, 1.1].map(function (r) {
          return '<button data-rate="' + r + '" class="' + (Math.abs(S.rate - r) < 0.01 ? "on" : "") + '">' + r + "×</button>";
        }).join("") + "</div></div>" +
      '<div class="field"><div><label>' + ui("accent") + "</label></div>" +
        '<div class="seg">' + [["en-US", "US"], ["en-GB", "UK"]].map(function (v) {
          return '<button data-voice="' + v[0] + '" class="' + (S.voice === v[0] ? "on" : "") + '">' + v[1] + "</button>";
        }).join("") + "</div></div>" +
    "</div>" +

    '<div class="card">' +
      '<div class="field"><div><label>' + ui("startDate") + '</label><div class="hint">' + ui("startHint") + "</div></div>" +
        '<input type="date" id="start" value="' + esc(S.start) + '"></div>' +
      '<div class="field"><div><label>' + ui("resetLabel") + '</label><div class="hint">' + ui("resetHint") + "</div></div>" +
        '<button class="pill" id="reset">' + ui("reset") + "</button></div>" +
    "</div>" +

    '<p class="mut" style="font-size:12px;text-align:center;margin:0">' + ui("footer") + "</p>" +
  "</div>", null);

  document.getElementById("rem").onchange = function () { S.reminder = this.value; save(); toast(ui("toastReminder", this.value)); };
  document.getElementById("tz").onchange = function () { S.tz = this.value; save(); toast(ui("toastTz", this.value)); };
  document.getElementById("start").onchange = function () { S.start = this.value; save(); toast(ui("toastStart", dateShort(this.value))); };
  document.getElementById("reset").onclick = function () {
    if (!confirm(ui("resetConfirm"))) return;
    S.done = {}; S.queue = []; S.errors = {}; save(); go("today"); toast(ui("resetDone"));
  };
  document.getElementById("notif").onclick = function () {
    if (!("Notification" in window)) return toast(ui("noNotif"));
    Notification.requestPermission().then(function (p) {
      toast(p === "granted" ? ui("notifOn") : ui("notifOff"));
      if (p === "granted") scheduleReminder();
    });
  };
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
   РОУТЕР
   ============================================================ */
function headSimple(title, sub) {
  return '<div class="head"><div><div class="sub">' + esc(sub) + '</div><h1>' + esc(title) + "</h1></div>" +
    '<div class="row" style="gap:8px">' + langToggle() +
    '<button class="iconbtn" data-go="settings" aria-label="' + ui("settings") + '"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/></svg></button></div></div>';
}

var currentTab = "today";
function render(html, tab) {
  view.innerHTML = "";
  view.appendChild(h('<div>' + html + "</div>"));
  view.scrollTop = 0;
  if (tab) {
    currentTab = tab;
    tabbar.hidden = false;
    Array.prototype.slice.call(tabbar.children).forEach(function (b) {
      b.classList.toggle("on", b.dataset.go === tab);
    });
  } else {
    tabbar.hidden = true;
  }
  var tabNames = ["tabToday", "tabMap", "tabReview", "tabProgress"];
  Array.prototype.slice.call(tabbar.children).forEach(function (b, i) {
    var label = b.querySelector("span");
    if (label) label.textContent = ui(tabNames[i]);
  });
  var due = dueCards().length;
  var badge = document.getElementById("reviewBadge");
  badge.hidden = !due;
  badge.textContent = due;
}

function go(where) {
  if (where === "today") viewToday();
  else if (where === "map") viewMap();
  else if (where === "review") viewReview();
  else if (where === "progress") viewProgress();
  else if (where === "settings") viewSettings();
}

/* ---------- делегирование событий ---------- */
document.addEventListener("click", function (e) {
  var el;

  if ((el = e.target.closest("[data-go]"))) { go(el.dataset.go); return; }
  if ((el = e.target.closest("[data-lesson]"))) { startLesson(+el.dataset.lesson); return; }
  if ((el = e.target.closest("[data-say]"))) { speak(el.dataset.say, el); return; }
  if (e.target.closest("[data-say-all]")) {
    var f = dayData(lessonState.day).full;
    var lines = f.dialogue.map(function (l) { return l.en; });
    var i = 0;
    (function next() {
      if (i >= lines.length) return;
      var u = new SpeechSynthesisUtterance(lines[i++]);
      u.lang = S.voice; u.rate = S.rate;
      var v = voices.filter(function (x) { return x.lang === S.voice; })[0];
      if (v) u.voice = v;
      u.onend = next;
      speechSynthesis.speak(u);
    })();
    return;
  }
  if ((el = e.target.closest("[data-lang]"))) {
    S.lang = el.dataset.lang; save();
    if (lessonState) { if (lessonSteps()[lessonState.step] === "quiz") renderQuiz(); else renderLesson(); }
    else if (reviewState) renderCard();
    else go(currentTab);
    return;
  }
  if ((el = e.target.closest("[data-theme]"))) {
    S.theme = el.dataset.theme; save(); applyTheme(); viewSettings(); return;
  }
  if ((el = e.target.closest("[data-rate]"))) {
    var r = parseFloat(el.dataset.rate);
    if (r === 1) { var cyc = [0.75, 0.95, 1.1]; var idx = cyc.indexOf(S.rate); S.rate = cyc[(idx + 1) % cyc.length]; }
    else S.rate = r;
    save();
    if (lessonState) renderLesson(); else viewSettings();
    return;
  }
  if ((el = e.target.closest("[data-voice]"))) { S.voice = el.dataset.voice; save(); viewSettings(); return; }
  if ((el = e.target.closest("[data-toggle]"))) {
    var item = e.target.closest(".exitem");
    if (item && !e.target.closest(".play")) item.classList.toggle("hidden");
    return;
  }
  if ((el = e.target.closest("[data-reveal]"))) {
    var line = dayData(lessonState.day).full.dialogue.filter(function (l) { return l.you; })[0];
    el.innerHTML = '<div class="en">' + esc(line.en) + '</div><div class="tr">' + esc(tr(line)) + "</div>";
    el.classList.remove("you"); el.classList.add("b");
    speak(line.en);
    return;
  }
  if (e.target.closest("[data-clear]")) { if (activeBuild) activeBuild(); return; }
  if (e.target.closest("[data-next]")) { lessonState.step++; renderLesson(); return; }
  if (e.target.closest("[data-qnext]")) { quizNext(); return; }
  if (e.target.closest("[data-finish]")) { finishLesson(); return; }
  if (e.target.closest("[data-reveal-card]")) { reviewState.revealed = true; renderCard(); return; }
  if ((el = e.target.closest("[data-grade]"))) { grade(el.dataset.grade === "1"); return; }
});

function applyTheme() {
  if (S.theme === "auto") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", S.theme);
}

/* ---------- старт ---------- */
applyTheme();
go("today");
scheduleReminder();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  });
}
})();
