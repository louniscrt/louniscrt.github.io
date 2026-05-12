"use strict";

let quizChapterId = null;
let quizQuestions = [];
let currentQuestionIndex = 0;
let selectedAnswerIndex = null;
let userAnswers = [];

document.addEventListener("DOMContentLoaded", () => {
  initQuizPage();
});

function initQuizPage() {
  if (!window.APP_DATA || !APP_DATA.quizzes) {
    console.error("Les données de quiz sont introuvables. Vérifie data.js.");
    return;
  }

  initQuizSelector();

  const initialChapterId = getInitialQuizChapterId();
  startQuiz(initialChapterId);
}

function getInitialQuizChapterId() {
  const params = new URLSearchParams(window.location.search);
  const chapterFromUrl = params.get("chapter");

  if (chapterFromUrl && APP_DATA.quizzes[chapterFromUrl]?.length > 0) {
    return chapterFromUrl;
  }

  const firstChapterWithQuiz = APP_DATA.chapters.find((chapter) => {
    return APP_DATA.quizzes[chapter.id]?.length > 0;
  });

  return firstChapterWithQuiz?.id || "etude-fonction";
}

function initQuizSelector() {
  const select = document.querySelector("#quizChapterSelect");
  const restartBtn = document.querySelector("#restartQuizBtn");

  if (!select) return;

  select.innerHTML = APP_DATA.chapters.map((chapter) => {
    const questionCount = APP_DATA.quizzes[chapter.id]?.length || 0;
    const disabled = questionCount === 0 ? "disabled" : "";

    return `
      <option value="${chapter.id}" ${disabled}>
        ${chapter.title} ${questionCount === 0 ? "— bientôt" : `— ${questionCount} questions`}
      </option>
    `;
  }).join("");

  select.addEventListener("change", () => {
    startQuiz(select.value);
  });

  restartBtn?.addEventListener("click", () => {
    startQuiz(quizChapterId);
  });
}

function startQuiz(chapterId) {
  const questions = APP_DATA.quizzes[chapterId] || [];

  if (questions.length === 0) return;

  quizChapterId = chapterId;
  quizQuestions = shuffleArray([...questions]);
  currentQuestionIndex = 0;
  selectedAnswerIndex = null;
  userAnswers = [];

  const select = document.querySelector("#quizChapterSelect");
  if (select) select.value = chapterId;

  updateQuizUrl(chapterId);
  updateScoreDisplay();
  updateBestScoreDisplay();
  renderCurrentQuestion();
}

function renderCurrentQuestion() {
  const container = document.querySelector("#quizContainer");
  if (!container) return;

  const question = quizQuestions[currentQuestionIndex];
  const total = quizQuestions.length;
  const progressPercent = Math.round((currentQuestionIndex / total) * 100);

  container.innerHTML = `
    <div class="quiz-topline">
      <div>
        <p class="td-kicker">Question ${currentQuestionIndex + 1} / ${total}</p>
        <h2 class="quiz-question">${question.question}</h2>
      </div>

      <span class="td-badge">${progressPercent}%</span>
    </div>

    <div class="h-2.5 rounded-full bg-slate-800 overflow-hidden mb-6">
      <div class="h-full rounded-full progress-gradient" style="width: ${progressPercent}%"></div>
    </div>

    <div class="quiz-options">
      ${question.options.map((option, index) => createOptionButton(option, index)).join("")}
    </div>

    <div id="quizFeedback" class="quiz-feedback hidden"></div>

    <div class="quiz-actions">
      <button id="validateAnswerBtn" type="button" class="btn-primary" disabled>
        <i class="fa-solid fa-check"></i>
        Valider
      </button>

      <button id="nextQuestionBtn" type="button" class="btn-secondary hidden">
        <i class="fa-solid fa-arrow-right"></i>
        Question suivante
      </button>
    </div>
  `;

  container.querySelectorAll(".quiz-option").forEach((button) => {
    button.addEventListener("click", () => {
      selectAnswer(Number(button.dataset.index));
    });
  });

  container.querySelector("#validateAnswerBtn")?.addEventListener("click", validateAnswer);
  container.querySelector("#nextQuestionBtn")?.addEventListener("click", goToNextQuestion);

  renderMath();
}

function createOptionButton(option, index) {
  return `
    <button type="button" class="quiz-option" data-index="${index}">
      <span class="quiz-option-letter">${String.fromCharCode(65 + index)}</span>
      <span>${option}</span>
    </button>
  `;
}

function selectAnswer(index) {
  selectedAnswerIndex = index;

  document.querySelectorAll(".quiz-option").forEach((button) => {
    button.classList.toggle("selected", Number(button.dataset.index) === index);
  });

  const validateBtn = document.querySelector("#validateAnswerBtn");
  if (validateBtn) validateBtn.disabled = false;
}

function validateAnswer() {
  const question = quizQuestions[currentQuestionIndex];
  const isCorrect = selectedAnswerIndex === question.correctIndex;

  userAnswers[currentQuestionIndex] = {
    questionId: question.id,
    selectedIndex: selectedAnswerIndex,
    correctIndex: question.correctIndex,
    isCorrect
  };

  document.querySelectorAll(".quiz-option").forEach((button) => {
    const index = Number(button.dataset.index);
    button.disabled = true;

    if (index === question.correctIndex) {
      button.classList.add("correct");
    }

    if (index === selectedAnswerIndex && !isCorrect) {
      button.classList.add("wrong");
    }
  });

  const feedback = document.querySelector("#quizFeedback");
  if (feedback) {
    feedback.classList.remove("hidden");
    feedback.classList.toggle("correct", isCorrect);
    feedback.classList.toggle("wrong", !isCorrect);

    feedback.innerHTML = `
      <h3>
        <i class="fa-solid ${isCorrect ? "fa-circle-check" : "fa-circle-xmark"}"></i>
        ${isCorrect ? "Bonne réponse" : "Réponse incorrecte"}
      </h3>
      <p>${question.explanation}</p>
    `;
  }

  const validateBtn = document.querySelector("#validateAnswerBtn");
  const nextBtn = document.querySelector("#nextQuestionBtn");

  if (validateBtn) validateBtn.classList.add("hidden");
  if (nextBtn) {
    nextBtn.classList.remove("hidden");
    nextBtn.innerHTML = currentQuestionIndex === quizQuestions.length - 1
      ? `<i class="fa-solid fa-flag-checkered"></i> Voir le résultat`
      : `<i class="fa-solid fa-arrow-right"></i> Question suivante`;
  }

  updateScoreDisplay();
  renderMath();
}

function goToNextQuestion() {
  if (currentQuestionIndex < quizQuestions.length - 1) {
    currentQuestionIndex += 1;
    selectedAnswerIndex = null;
    renderCurrentQuestion();
    updateScoreDisplay();
    return;
  }

  renderQuizResult();
}

function renderQuizResult() {
  const container = document.querySelector("#quizContainer");
  if (!container) return;

  const score = getScore();
  const percent = getScorePercent();
  const recommendation = getRecommendation(percent);

  saveBestScore(percent);

  container.innerHTML = `
    <section class="quiz-result">
      <div class="quiz-result-icon ${recommendation.type}">
        <i class="fa-solid ${recommendation.icon}"></i>
      </div>

      <p class="td-kicker">Résultat final</p>

      <h2>${percent}%</h2>

      <p class="quiz-result-subtitle">
        Tu as obtenu ${score} bonne${score > 1 ? "s" : ""} réponse${score > 1 ? "s" : ""}
        sur ${quizQuestions.length}.
      </p>

      <div class="quiz-result-message">
        <h3>${recommendation.title}</h3>
        <p>${recommendation.message}</p>
      </div>

      <div class="quiz-result-actions">
        <button type="button" id="retryQuizBtn" class="btn-primary">
          <i class="fa-solid fa-rotate-right"></i>
          Refaire le quiz
        </button>

        <a href="./cours.html?chapter=${encodeURIComponent(quizChapterId)}" class="btn-secondary">
          <i class="fa-solid fa-book-open"></i>
          Revoir le cours
        </a>

        <a href="./td.html?chapter=${encodeURIComponent(quizChapterId)}" class="btn-secondary">
          <i class="fa-solid fa-terminal"></i>
          Passer au TD
        </a>
      </div>
    </section>
  `;

  document.querySelector("#retryQuizBtn")?.addEventListener("click", () => {
    startQuiz(quizChapterId);
  });

  updateScoreDisplay();
  updateBestScoreDisplay();
  renderMath();
}

function getScore() {
  return userAnswers.filter((answer) => answer?.isCorrect).length;
}

function getScorePercent() {
  if (quizQuestions.length === 0) return 0;
  return Math.round((getScore() / quizQuestions.length) * 100);
}

function updateScoreDisplay() {
  const text = document.querySelector("#quizScoreText");
  const bar = document.querySelector("#quizScoreBar");

  const percent = getScorePercent();

  if (text) text.textContent = `${percent}%`;
  if (bar) bar.style.width = `${percent}%`;
}

function saveBestScore(percent) {
  const key = getBestScoreKey();
  const previousBest = Number(localStorage.getItem(key) || 0);

  if (percent > previousBest) {
    localStorage.setItem(key, String(percent));
  }
}

function updateBestScoreDisplay() {
  const bestScore = document.querySelector("#quizBestScore");
  if (!bestScore || !quizChapterId) return;

  const value = localStorage.getItem(getBestScoreKey());

  bestScore.textContent = value
    ? `Meilleur score : ${value}%`
    : "Meilleur score : aucun";
}

function getBestScoreKey() {
  return `maths-s2-best-score-${quizChapterId}`;
}

function getRecommendation(percent) {
  if (percent < 50) {
    return {
      type: "danger",
      icon: "fa-triangle-exclamation",
      title: "Revoir le cours",
      message: "Les bases ne sont pas encore assez solides. Relis la fiche puis refais le quiz avant de passer au TD."
    };
  }

  if (percent < 80) {
    return {
      type: "warning",
      icon: "fa-screwdriver-wrench",
      title: "Encore un peu d’entraînement",
      message: "Tu as compris une partie du chapitre. Revois les erreurs, puis fais quelques exercices guidés."
    };
  }

  return {
    type: "success",
    icon: "fa-rocket",
    title: "Prêt pour le TD",
    message: "Très bon score. Tu peux passer aux exercices interactifs pour consolider."
  };
}

function updateQuizUrl(chapterId) {
  const url = new URL(window.location.href);
  url.searchParams.set("chapter", chapterId);
  window.history.replaceState({}, "", url.toString());
}

function shuffleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((item) => item.value);
}
