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
function dateShort(iso) {
  var d = parseISO(iso);
  return d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear();
}
function humanDate(iso) {
  var d = parseISO(iso);
  return WEEK[d.getDay()] + ", " + d.getDate() + " " + MONTHS[d.getMonth()];
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
  if (!window.speechSynthesis) return toast("Озвучка недоступна в этом браузере");
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
      '<span>иллюстрация ещё не добавлена</span></div></div>';
  }
  var src = (window.IMG_BASE || "images/") + d.image;
  return '<div class="illo"><img src="' + esc(src) + '" alt="" loading="lazy"></div>';
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
        "<h1>" + (finished ? "Курс пройден" : (st > 0 ? "Серия идёт" : "Доброе утро")) + "</h1>" +
      "</div>" +
      '<div class="row" style="gap:8px">' +
        '<button class="iconbtn" data-go="settings" aria-label="Настройки"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/></svg></button>' +
        '<svg class="ring" viewBox="0 0 56 56" aria-label="Пройдено ' + done + ' из 100">' +
          '<circle class="bg" cx="28" cy="28" r="23"></circle>' +
          '<circle class="fg" cx="28" cy="28" r="23" stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + (C * (1 - pct)).toFixed(1) + '" transform="rotate(-90 28 28)"></circle>' +
          '<text x="28" y="33" text-anchor="middle">' + done + "</text>" +
        "</svg>" +
      "</div>" +
    "</div>";

  if (finished) {
    html += '<div class="card"><div class="lbl">Готово</div><p class="mut" style="margin:6px 0 0">Все 100 уроков пройдены. Дальше — только повторение: карточки продолжают приходить по графику.</p></div>';
  } else {
    html +=
    '<div class="hero">' +
      '<div class="row" style="align-items:flex-start">' +
        '<div class="grow">' +
          '<div class="lbl">DAY ' + n + " · ГЛАВА " + ch.n + "</div>" +
          '<div class="verb">' + esc(b.verb) + (b.sense ? " " + b.sense : "") + "</div>" +
        "</div>" +
        (d.full ? "" : '<span class="pill" style="background:rgba(255,255,255,.22);color:var(--on-acc)">черновик</span>') +
      "</div>" +
      "<div>" +
        '<div class="en">' + esc(b.en) + "</div>" +
        '<div class="tr">' + esc(tr(b)) + "</div>" +
      "</div>" +
      '<button class="btn light" data-lesson="' + n + '">Начать урок · ' + (d.full ? "12 мин" : "3 мин") + "</button>" +
    "</div>";
  }

  html +=
    '<button class="card tight row" data-go="review" style="width:100%;text-align:left">' +
      '<div class="grow"><div class="lbl">Повторение</div><div style="font-size:13.5px">' +
        (due ? "Карточек на сегодня — <b>" + due + "</b>" : "На сегодня всё чисто") +
      "</div></div>" +
      '<span class="pill' + (due ? "" : " g") + '">' + (due ? "Начать" : "✓") + "</span>" +
    "</button>" +

    '<div class="row" style="gap:10px">' +
      '<div class="card tight grow row"><div class="grow"><div class="lbl">Серия</div><div style="font-size:13.5px">' +
        (st ? st + " " + plural(st, "день", "дня", "дней") + " подряд" : "Начнём сегодня") +
      '</div></div><div class="big" style="font-size:22px;color:var(--acc)">' + st + "</div></div>" +
    "</div>" +

    '<div class="card tight">' +
      '<div class="lbl" style="margin-bottom:6px">Смотрю параллельно</div>' +
      '<div class="row">' +
        '<div class="grow" style="font-size:13.5px;line-height:1.35">Лекция по DAY ' + n + '<div class="tr">YouTube · канал 영어독학</div></div>' +
        '<a class="pill n" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=' +
          encodeURIComponent("김재우 기본 동사 100 DAY " + n + " " + b.verb) + '">Открыть</a>' +
      "</div>" +
    "</div>" +
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
      '<button class="iconbtn" data-go="today" aria-label="Закрыть"><svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button>' +
    "</div>" +
  "</div>";

  var body = "";

  if (step === "meaning") {
    body =
      illo(b) +
      '<div class="card">' +
        '<div class="lbl" style="margin-bottom:7px">Ключевое предложение</div>' +
        '<div class="en">' + esc(b.en) + "</div>" +
        '<div class="tr">' + esc(tr(b)) + "</div>" +
        '<div class="row" style="gap:7px;margin-top:12px">' +
          '<button class="pill" data-say="' + esc(b.en) + '">🔊 Слушать</button>' +
          '<button class="pill n" data-rate="1">' + S.rate.toFixed(2).replace(/0$/, "") + "×</button>" +
        "</div>" +
      "</div>";
    if (f) {
      body += '<div><div class="lbl" style="margin-bottom:6px">Значение</div><p style="margin:0;font-size:14.5px;line-height:1.55">' + esc(t(f.meaning)) + "</p></div>";
    } else {
      body +=
      '<div class="card">' +
        '<div class="lbl">Урок в подготовке</div>' +
        '<p class="mut" style="margin:7px 0 0;font-size:14px;line-height:1.5">Развёрнутые блоки Model Examples, Small Talk и Further Studies для этого дня ещё не залиты. ' +
        "Ключевое предложение из книги уже здесь — прослушайте, повторите вслух и отметьте день пройденным.</p>" +
      "</div>";
    }
  }

  if (step === "examples") {
    body =
      '<div><h2 class="big" style="font-size:18px">Model Examples</h2>' +
      '<p class="mut" style="margin:4px 0 0;font-size:13.5px">Нажмите на строку, чтобы скрыть перевод, и переведите сами.</p></div>' +
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
      '<p class="mut" style="margin:4px 0 0;font-size:13.5px">Последняя реплика — ваша. Скажите её вслух, потом откройте.</p></div>' +
      '<div class="dlg">' +
        f.dialogue.map(function (l) {
          if (l.you) {
            return '<div class="who" style="justify-self:end">' + l.s + " · вы</div>" +
              '<div class="bub you" data-reveal><div class="en mut">Ваша реплика…</div><div class="tr">' + esc(tr(l)) + "</div></div>";
          }
          return '<div class="who"' + (l.s === "B" ? ' style="justify-self:end"' : "") + ">" + l.s + "</div>" +
            '<div class="bub ' + (l.s === "A" ? "a" : "b") + '">' +
              '<div class="en">' + esc(l.en) + '</div><div class="tr">' + esc(tr(l)) + "</div>" +
            "</div>";
        }).join("") +
      "</div>" +
      '<button class="btn ghost" data-say-all="1">🔊 Прослушать диалог</button>';
  }

  if (step === "notes") {
    body =
      '<div><h2 class="big" style="font-size:18px">Further Studies</h2>' +
      '<p class="mut" style="margin:4px 0 0;font-size:13.5px">Три момента, на которых обычно спотыкаются.</p></div>' +
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
    ? '<button class="btn teal" data-finish="1">Завершить DAY ' + n + "</button>"
    : '<button class="btn" data-next="1">Дальше</button>';

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
  '<div class="head"><div><div class="sub">DAY ' + n + " · проверка</div><h1>Задание " + (lessonState.quizIndex + 1) + " из " + f.quiz.length + "</h1></div>" +
  '<div class="row" style="gap:8px">' + langToggle() +
  '<button class="iconbtn" data-go="today" aria-label="Закрыть"><svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div></div>';

  var body = "";
  if (q.type === "build") {
    var words = q.answer.split(/\s+/).filter(Boolean);
    var pool = shuffle(words.concat(q.extra || []));
    body =
      '<div><div class="lbl" style="margin-bottom:6px">Соберите предложение</div>' +
      '<div style="font-size:15px">' + esc(S.lang === "ko" ? (q.ko || q.ru) : q.ru) + "</div></div>" +
      '<div class="slot" id="slot"></div>' +
      '<div class="tokens" id="pool">' + pool.map(function (w, i) {
        return '<button class="tok" data-tok="' + i + '" data-w="' + esc(w) + '">' + esc(w) + "</button>";
      }).join("") + "</div>" +
      '<button class="btn ghost sm" id="clearBtn" data-clear="1" hidden>Очистить</button>' +
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
      v.innerHTML = '<div class="card tight"><div class="row"><div class="grow"><b style="color:var(--acc2)">Верно.</b> ' +
        esc(q.answer) + '</div><button class="play" data-say="' + esc(q.answer) + '"><svg viewBox="0 0 10 10"><path d="M1 0l8 5-8 5z"/></svg></button></div></div>' +
        '<button class="btn" data-qnext="1">Дальше</button>';
      pushCard(lessonState.day, q.answer);
    } else {
      lessonState.wrong++;
      v.innerHTML = '<div class="card tight"><b style="color:var(--acc)">Не сходится.</b> Правильный порядок: ' +
        esc(target.join(" ")) + "</div>" +
        '<button class="btn ghost sm" data-clear="1">Попробовать снова</button>' +
        '<button class="btn" data-qnext="1">Дальше</button>';
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
      (o.ok ? "Верно." : "Мимо.") + "</b> " + esc(t(q.why)) + "</div>" +
      '<button class="btn" data-qnext="1">Дальше</button>';
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
  toast(w ? "DAY " + n + " пройден. Ошибок: " + w : "DAY " + n + " пройден без ошибок");
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
    render('<div class="stack">' + headSimple("Повторение", "Интервальные карточки") +
      '<div class="empty"><b>Пусто</b><p>Карточки появятся завтра. Интервалы — 1, 3, 7, 21 и 60 дней после урока.</p>' +
      (S.queue.length ? '<span class="pill n">' + S.queue.length + " в работе</span>" : "") +
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
      '<p class="mut" style="text-align:center;margin:0;font-size:13.5px">Скажите вслух по-английски, потом откройте.</p>' +
      '<button class="btn" data-reveal-card="1">Показать</button>';
  } else {
    body =
      '<div class="card" style="padding:26px 18px;text-align:center">' +
        '<div class="lbl">DAY ' + c.day + "</div>" +
        '<div class="en" style="font-size:19px;margin-top:10px">' + esc(c.en) + "</div>" +
        '<div class="tr">' + esc(S.lang === "ko" ? c.ko : c.ru) + "</div>" +
        '<button class="pill" style="margin-top:14px" data-say="' + esc(c.en) + '">🔊 Слушать</button>' +
      "</div>" +
      '<div class="btnrow">' +
        '<button class="btn ghost" data-grade="0">Не вспомнил</button>' +
        '<button class="btn teal" data-grade="1">Знал</button>' +
      "</div>";
  }
  render('<div class="stack">' +
    headSimple("Карточка " + (r.i + 1) + " из " + r.cards.length, "Повторение") +
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
    toast("Повторение окончено: " + r.right + " из " + r.cards.length);
    reviewState = null;
    go("today");
  } else renderCard();
}

/* ============================================================
   ЭКРАН: КАРТА 100 ДНЕЙ
   ============================================================ */
function viewMap() {
  var cur = currentDay();
  var html = '<div class="stack">' + headSimple("100 дней", "Оглавление книги") ;
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
        '<div class="lbl">Гл. ' + k + " · " + esc(c.ru) + " — DAY " + c.from + "–" + c.to + "</div>" +
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
    headSimple("Прогресс", "Старт — " + dateShort(S.start)) +
    '<div class="stats">' +
      '<div class="stat"><b style="color:var(--acc2)">' + done + "</b><span>Уроков</span></div>" +
      '<div class="stat"><b>' + phrases + "</b><span>Фраз</span></div>" +
      '<div class="stat"><b style="color:var(--acc)">' + Object.keys(verbs).length + "</b><span>Глаголов</span></div>" +
    "</div>" +
    '<div class="card">' +
      '<div class="lbl" style="margin-bottom:10px">Календарь курса</div>' +
      '<div class="weeks">' + cells + "</div>" +
      '<p class="tr" style="margin-top:10px">Пропуск не обнуляет прогресс — урок просто сдвигается на следующий день. Командировка не ломает план.</p>' +
    "</div>" +
    '<div class="card tight row">' +
      '<div class="grow"><div class="lbl">Серия</div><div style="font-size:13.5px">' +
        (st ? st + " " + plural(st, "день", "дня", "дней") + " подряд" : "Пока нет") + "</div></div>" +
      '<div class="big" style="font-size:22px;color:var(--acc)">' + st + "</div>" +
    "</div>" +
    (S.queue.length ? '<div class="card tight"><div class="lbl" style="margin-bottom:7px">Ближайшие повторения</div>' +
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
    '<div class="head"><div><div class="sub">Verb 100</div><h1>Настройки</h1></div>' +
    '<button class="iconbtn" data-go="today" aria-label="Назад"><svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>' +

    '<div class="card">' +
      '<div class="field"><div><label>Язык объяснений</label><div class="hint">Английские фразы не меняются</div></div>' + langToggle() + "</div>" +
      '<div class="field"><div><label>Тема</label></div>' +
        '<div class="seg">' +
          ["auto", "light", "dark"].map(function (x) {
            return '<button data-theme="' + x + '" class="' + (S.theme === x ? "on" : "") + '">' +
              (x === "auto" ? "Авто" : x === "light" ? "Свет" : "Ночь") + "</button>";
          }).join("") +
        "</div></div>" +
    "</div>" +

    '<div class="card">' +
      '<div class="field"><div><label>Напоминание</label><div class="hint">Время локального уведомления</div></div>' +
        '<input type="time" id="rem" value="' + esc(S.reminder) + '"></div>' +
      '<div class="field"><div><label>Часовой пояс</label><div class="hint">Меняйте при перелёте</div></div>' +
        '<select id="tz">' + TZS.map(function (z) {
          return '<option value="' + z + '"' + (S.tz === z ? " selected" : "") + ">" + z.split("/")[1].replace("_", " ") + "</option>";
        }).join("") + "</select></div>" +
      '<div class="field"><div><label>Разрешить уведомления</label><div class="hint">iPhone: сначала добавьте приложение на экран «Домой»</div></div>' +
        '<button class="pill" id="notif">Включить</button></div>' +
    "</div>" +

    '<div class="card">' +
      '<div class="field"><div><label>Скорость речи</label></div>' +
        '<div class="seg">' + [0.75, 0.95, 1.1].map(function (r) {
          return '<button data-rate="' + r + '" class="' + (Math.abs(S.rate - r) < 0.01 ? "on" : "") + '">' + r + "×</button>";
        }).join("") + "</div></div>" +
      '<div class="field"><div><label>Произношение</label></div>' +
        '<div class="seg">' + [["en-US", "US"], ["en-GB", "UK"]].map(function (v) {
          return '<button data-voice="' + v[0] + '" class="' + (S.voice === v[0] ? "on" : "") + '">' + v[1] + "</button>";
        }).join("") + "</div></div>" +
    "</div>" +

    '<div class="card">' +
      '<div class="field"><div><label>Дата старта курса</label><div class="hint">DAY 1 = этот день</div></div>' +
        '<input type="date" id="start" value="' + esc(S.start) + '"></div>' +
      '<div class="field"><div><label>Сбросить прогресс</label><div class="hint">Уроки, серия и карточки</div></div>' +
        '<button class="pill" id="reset">Сбросить</button></div>' +
    "</div>" +

    '<p class="mut" style="font-size:12px;text-align:center;margin:0">По книге «김재우의 기본 동사 100» (상상스퀘어).<br>Прогресс хранится только на этом устройстве.</p>' +
  "</div>", null);

  document.getElementById("rem").onchange = function () { S.reminder = this.value; save(); toast("Напоминание в " + this.value); };
  document.getElementById("tz").onchange = function () { S.tz = this.value; save(); toast("Часовой пояс: " + this.value); };
  document.getElementById("start").onchange = function () { S.start = this.value; save(); toast("Старт: " + dateShort(this.value)); };
  document.getElementById("reset").onclick = function () {
    if (!confirm("Сбросить весь прогресс? Уроки, серия и карточки будут удалены.")) return;
    S.done = {}; S.queue = []; S.errors = {}; save(); go("today"); toast("Прогресс сброшен");
  };
  document.getElementById("notif").onclick = function () {
    if (!("Notification" in window)) return toast("Уведомления не поддерживаются");
    Notification.requestPermission().then(function (p) {
      toast(p === "granted" ? "Уведомления включены" : "Отклонено в настройках браузера");
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
    '<button class="iconbtn" data-go="settings" aria-label="Настройки"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/></svg></button></div></div>';
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
