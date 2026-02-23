const startBtn = document.getElementById("startBtn");
const testCard = document.getElementById("testCard");
const resultCard = document.getElementById("resultCard");
const questionText = document.getElementById("questionText");
const optionsWrap = document.getElementById("options");
const progressLabel = document.getElementById("progressLabel");
const progressFill = document.getElementById("progressFill");
const timerEl = document.getElementById("timer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const scoreText = document.getElementById("scoreText");
const bandText = document.getElementById("bandText");
const iqText = document.getElementById("iqText");
const detailText = document.getElementById("detailText");
const domainGrid = document.getElementById("domainGrid");
const restartBtn = document.getElementById("restartBtn");

const TEST_MINUTES = 25;

const BASE_QUESTIONS = [
  {
    domain: "Логика",
    text: "Если все ленты — это нити, а все нити — это волокна, то верно ли, что все ленты — это волокна?",
    options: ["Да", "Нет", "Неизвестно", "Иногда"],
    answer: 0,
  },
  {
    domain: "Числа",
    text: "Продолжите ряд: 2, 6, 12, 20, 30, ?",
    options: ["36", "40", "42", "44"],
    answer: 2,
  },
  {
    domain: "Вербальный",
    text: "Выберите слово, наиболее близкое по смыслу к «прозрачный».",
    options: ["Скользкий", "Ясный", "Гибкий", "Круглый"],
    answer: 1,
  },
  {
    domain: "Пространственный",
    text: "Куб, раскрашенный снаружи, разрезан на 27 равных кубиков. Сколько маленьких кубиков окрашены с трех сторон?",
    options: ["4", "6", "8", "12"],
    answer: 2,
  },
  {
    domain: "Паттерны",
    text: "Какой символ логически продолжает последовательность? ▲ ■ ▲ ■ ▲ ?",
    options: ["▲", "●", "■", "◆"],
    answer: 2,
  },
  {
    domain: "Логика",
    text: "Если сегодня понедельник, какой день недели будет через 19 дней?",
    options: ["Понедельник", "Среда", "Пятница", "Воскресенье"],
    answer: 2,
  },
  {
    domain: "Числа",
    text: "Если 3x + 5 = 20, чему равен x?",
    options: ["3", "4", "5", "6"],
    answer: 1,
  },
  {
    domain: "Вербальный",
    text: "Какое слово лишнее? «Кварц», «Гранит», «Песок», «Мрамор».",
    options: ["Кварц", "Гранит", "Песок", "Мрамор"],
    answer: 2,
  },
  {
    domain: "Пространственный",
    text: "Сколько граней у усеченной пирамиды с квадратным основанием?",
    options: ["4", "5", "6", "8"],
    answer: 2,
  },
  {
    domain: "Паттерны",
    text: "Найдите недостающее число: 4, 9, 16, 25, ?",
    options: ["30", "32", "36", "40"],
    answer: 2,
  },
  {
    domain: "Логика",
    text: "Все инженеры умеют считать. Алекс — инженер. Следовательно, Алекс умеет считать?",
    options: ["Да", "Нет", "Неизвестно", "Иногда"],
    answer: 0,
  },
  {
    domain: "Числа",
    text: "Если 40% от числа равны 72, чему равно число?",
    options: ["160", "170", "180", "200"],
    answer: 2,
  },
  {
    domain: "Вербальный",
    text: "Выберите антоним к «экономный».",
    options: ["Бережливый", "Скупой", "Расточительный", "Точный"],
    answer: 2,
  },
  {
    domain: "Пространственный",
    text: "Какое число получится, если развернуть двузначное число 37?",
    options: ["73", "37", "34", "70"],
    answer: 0,
  },
  {
    domain: "Паттерны",
    text: "Выберите продолжение: 1, 1, 2, 3, 5, 8, ?",
    options: ["10", "11", "13", "15"],
    answer: 2,
  },
  {
    domain: "Логика",
    text: "Если утверждение «все кошки — животные» истинно, то утверждение «некоторые животные — кошки»?",
    options: ["Всегда истинно", "Всегда ложно", "Иногда истинно", "Неизвестно"],
    answer: 0,
  },
  {
    domain: "Числа",
    text: "Выберите недостающее: 6, 10, 18, 34, ?",
    options: ["50", "62", "66", "70"],
    answer: 2,
  },
  {
    domain: "Вербальный",
    text: "Какое слово лишнее? «Река», «Канал», «Море», «Трасса».",
    options: ["Река", "Канал", "Море", "Трасса"],
    answer: 3,
  },
  {
    domain: "Пространственный",
    text: "Сколько осей симметрии у правильного пятиугольника?",
    options: ["3", "4", "5", "6"],
    answer: 2,
  },
  {
    domain: "Паттерны",
    text: "Какое число должно стоять вместо X? 2, 4, 8, 16, X",
    options: ["18", "20", "24", "32"],
    answer: 3,
  },
  {
    domain: "Цвета",
    text: "Какой цвет вам больше нравится?",
    options: ["Черный", "Зеленый", "Белый", "Голубой", "Розовый"],
    answer: null,
  },
  {
    domain: "Цвета",
    text: "Какой оттенок кажется вам более спокойным?",
    options: ["Черный", "Зеленый", "Белый", "Голубой", "Розовый"],
    answer: null,
  },
];

let questions = [];
let currentIndex = 0;
let answers = [];
let timerId = null;
let secondsLeft = TEST_MINUTES * 60;

const shuffle = (list) => {
  const arr = list.slice();
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const bandByScore = (score, total) => {
  const ratio = total === 0 ? 0 : score / total;
  if (ratio <= 0.35) return "Ниже среднего";
  if (ratio <= 0.6) return "Средний уровень";
  if (ratio <= 0.8) return "Выше среднего";
  return "Высокий уровень";
};

const iqEstimate = (score, total) => {
  if (total === 0) return 100;
  const minIq = 70;
  const maxIq = 130;
  const ratio = score / total;
  return Math.round(minIq + (maxIq - minIq) * ratio);
};

const toFormBody = (payload) =>
  Object.entries(payload)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");

const buildPrettyAnswers = (items) =>
  items
    .map((item, idx) => {
      const chosen =
        item.chosen === null || item.chosen === undefined
          ? "Без ответа"
          : item.options[item.chosen];
      const correct =
        item.correct === null || item.correct === undefined
          ? "Без оценки"
          : item.options[item.correct];
      const verdict =
        item.correct === null || item.correct === undefined
          ? "Не оценивается"
          : item.chosen === item.correct
            ? "Верно"
            : `Неверно (верный: ${correct})`;
      return [
        `${idx + 1}. [${item.domain}] ${item.text}`,
        `Ответ: ${chosen}`,
        `Итог: ${verdict}`,
      ].join("\n");
    })
    .join("\n\n");

const renderQuestion = () => {
  const q = questions[currentIndex];
  progressLabel.textContent = `Вопрос ${currentIndex + 1} из ${questions.length}`;
  progressFill.style.width = `${((currentIndex + 1) / questions.length) * 100}%`;
  questionText.textContent = q.text;

  optionsWrap.innerHTML = "";
  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.type = "button";
    btn.textContent = opt;
    if (answers[currentIndex] === idx) {
      btn.classList.add("active");
    }
    btn.addEventListener("click", () => {
      answers[currentIndex] = idx;
      renderQuestion();
    });
    optionsWrap.appendChild(btn);
  });

  prevBtn.disabled = currentIndex === 0;
  nextBtn.textContent = currentIndex === questions.length - 1 ? "Завершить" : "Далее";
};

const updateTimer = () => {
  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");
  timerEl.textContent = `${minutes}:${seconds}`;
  if (secondsLeft <= 0) {
    finishTest();
  }
  secondsLeft -= 1;
};


const startTest = () => {
  startBtn.disabled = true;
  testCard.classList.remove("hidden");
  resultCard.classList.add("hidden");
  questions = shuffle(BASE_QUESTIONS);
  currentIndex = 0;
  answers = Array(questions.length).fill(null);
  secondsLeft = TEST_MINUTES * 60;
  renderQuestion();
  updateTimer();
  timerId = setInterval(updateTimer, 1000);
};

const finishTest = () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  testCard.classList.add("hidden");
  resultCard.classList.remove("hidden");

  const scoredQuestions = questions.filter((q) => q.answer !== null);
  const total = scoredQuestions.length;
  const score = questions.reduce((sum, q, idx) => {
    if (q.answer === null) return sum;
    return sum + (answers[idx] === q.answer ? 1 : 0);
  }, 0);
  const iq = iqEstimate(score, total);

  scoreText.textContent = `${score} из ${total}`;
  bandText.textContent = bandByScore(score, total);
  iqText.textContent = `IQ: ${iq}`;

  const domainStats = {};
  questions.forEach((q, idx) => {
    if (q.answer === null) return;
    if (!domainStats[q.domain]) {
      domainStats[q.domain] = { total: 0, correct: 0 };
    }
    domainStats[q.domain].total += 1;
    if (answers[idx] === q.answer) {
      domainStats[q.domain].correct += 1;
    }
  });

  domainGrid.innerHTML = "";
  Object.entries(domainStats).forEach(([domain, stats]) => {
    const card = document.createElement("div");
    card.className = "result-card";
    const title = document.createElement("strong");
    title.textContent = domain;
    const value = document.createElement("span");
    value.textContent = `${stats.correct} из ${stats.total}`;
    card.appendChild(title);
    card.appendChild(value);
    domainGrid.appendChild(card);
  });

  detailText.textContent =
    "Результат показывает текущую форму в доменах мышления. Вопросы предпочтений по цветам не оцениваются и отправляются вместе с ответами.";

  const run = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    score,
    total,
    iq,
    items: questions.map((q, idx) => ({
      domain: q.domain,
      text: q.text,
      options: q.options,
      correct: q.answer,
      chosen: answers[idx],
    })),
  };

  const payload = {
    "form-name": "iq-results",
    run_id: run.id,
    completed_at: run.timestamp,
    score: run.score,
    total: run.total,
    iq_estimate: run.iq,
    band: bandByScore(score, total),
    answers_pretty: buildPrettyAnswers(run.items),
    answers_json: JSON.stringify(run.items),
  };

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: toFormBody(payload),
  }).catch(() => {});
};

startBtn.addEventListener("click", startTest);

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex -= 1;
    renderQuestion();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < questions.length - 1) {
    currentIndex += 1;
    renderQuestion();
    return;
  }
  finishTest();
});

restartBtn.addEventListener("click", startTest);
