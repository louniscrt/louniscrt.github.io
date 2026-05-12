"use strict";

/**
 * Page de progression.
 * Stockage temporaire en localStorage.
 *
 * Clés utilisées :
 * - maths-s2-lesson-done-{chapterId}
 * - maths-s2-td-done-{chapterId}
 * - maths-s2-best-score-{chapterId}
 */

document.addEventListener("DOMContentLoaded", () => {
  initProgressionPage();
});

function initProgressionPage() {
  if (!window.APP_DATA || !APP_DATA.chapters) {
    console.error("APP_DATA est introuvable. Vérifie data.js.");
    return;
  }

  renderProgression();

  const resetButton = document.querySelector("#resetProgressBtn");
  resetButton?.addEventListener("click", resetProgression);
}

function renderProgression() {
  renderProgressionCards();
  renderGlobalStats();
}

function renderProgressionCards() {
  const grid = document.querySelector("#progressionGrid");
  if (!grid) return;

  grid.innerHTML = APP_DATA.chapters.map((chapter) => {
    const state = getChapterState(chapter);
    const quizText = state.bestScore === null ? "Aucun score" : `${state.bestScore}%`;
    const quizBadgeClass = getQuizBadgeClass(state.bestScore);

    return `
      <article class="progress-chapter-card">
        <div class="progress-chapter-header">
          <div class="progress-chapter-icon">
            <i class="fa-solid ${chapter.icon}"></i>
          </div>

          <div class="min-w-0">
            <h3>${chapter.title}</h3>
            <p>${chapter.description}</p>
          </div>
        </div>

        <div class="progress-line-block">
          <div class="flex items-center justify-between text-sm mb-2">
            <span class="text-cyber-muted">Progression estimée</span>
            <span class="font-black text-cyber-cyan">${state.progress}%</span>
          </div>

          <div class="h-3 rounded-full bg-slate-800 overflow-hidden">
            <div class="h-full rounded-full progress-gradient" style="width: ${state.progress}%"></div>
          </div>
        </div>

        <div class="progress-mini-grid">
          <div class="progress-mini-card ${state.lessonDone ? "done" : ""}">
            <i class="fa-solid fa-book-open"></i>
            <span>Cours</span>
            <strong>${state.lessonDone ? "Terminé" : "À faire"}</strong>
          </div>

          <div class="progress-mini-card ${state.tdDone ? "done" : ""}">
            <i class="fa-solid fa-terminal"></i>
            <span>TD</span>
            <strong>${state.tdDone ? "Terminé" : "À faire"}</strong>
          </div>

          <div class="progress-mini-card ${quizBadgeClass}">
            <i class="fa-solid fa-circle-question"></i>
            <span>Quiz</span>
            <strong>${quizText}</strong>
          </div>
        </div>

        <div class="progress-actions">
          <button
            type="button"
            class="progress-toggle-btn ${state.lessonDone ? "active" : ""}"
            data-action="toggle-lesson"
            data-chapter-id="${chapter.id}"
          >
            <i class="fa-solid ${state.lessonDone ? "fa-check" : "fa-book"}"></i>
            ${state.lessonDone ? "Cours vu" : "Marquer cours vu"}
          </button>

          <button
            type="button"
            class="progress-toggle-btn ${state.tdDone ? "active" : ""}"
            data-action="toggle-td"
            data-chapter-id="${chapter.id}"
          >
            <i class="fa-solid ${state.tdDone ? "fa-check" : "fa-terminal"}"></i>
            ${state.tdDone ? "TD fait" : "Marquer TD fait"}
          </button>

          <a href="./cours.html?chapter=${encodeURIComponent(chapter.id)}">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
            Cours
          </a>

          <a href="./quiz.html?chapter=${encodeURIComponent(chapter.id)}">
            <i class="fa-solid fa-bolt"></i>
            Quiz
          </a>
        </div>
      </article>
    `;
  }).join("");

  grid.querySelectorAll("[data-action='toggle-lesson']").forEach((button) => {
    button.addEventListener("click", () => {
      toggleLocalFlag(getLessonKey(button.dataset.chapterId));
      renderProgression();
    });
  });

  grid.querySelectorAll("[data-action='toggle-td']").forEach((button) => {
    button.addEventListener("click", () => {
      toggleLocalFlag(getTdKey(button.dataset.chapterId));
      renderProgression();
    });
  });
}

function renderGlobalStats() {
  const states = APP_DATA.chapters.map(getChapterState);

  const totalChapters = states.length;
  const lessonsDone = states.filter((state) => state.lessonDone).length;
  const tdDone = states.filter((state) => state.tdDone).length;

  const quizScores = states
    .map((state) => state.bestScore)
    .filter((score) => typeof score === "number");

  const averageQuiz = quizScores.length
    ? Math.round(quizScores.reduce((sum, score) => sum + score, 0) / quizScores.length)
    : 0;

  const globalProgress = states.length
    ? Math.round(states.reduce((sum, state) => sum + state.progress, 0) / states.length)
    : 0;

  setText("#totalChaptersStat", totalChapters);
  setText("#lessonsDoneStat", lessonsDone);
  setText("#tdDoneStat", tdDone);
  setText("#averageQuizStat", `${averageQuiz}%`);
  setText("#globalProgressLabel", `${globalProgress}%`);

  const globalLine = document.querySelector("#globalProgressLine");
  if (globalLine) {
    globalLine.style.width = `${globalProgress}%`;
  }
}

function getChapterState(chapter) {
  const lessonDone = getLocalFlag(getLessonKey(chapter.id));
  const tdDone = getLocalFlag(getTdKey(chapter.id));
  const bestScore = getBestScore(chapter.id);

  /**
   * Pondération simple :
   * - Cours vu : 35 points
   * - TD fait : 35 points
   * - Quiz : jusqu’à 30 points
   */
  const lessonPoints = lessonDone ? 35 : 0;
  const tdPoints = tdDone ? 35 : 0;
  const quizPoints = bestScore === null ? 0 : Math.round(bestScore * 0.3);

  return {
    chapter,
    lessonDone,
    tdDone,
    bestScore,
    progress: clamp(lessonPoints + tdPoints + quizPoints, 0, 100)
  };
}

function getBestScore(chapterId) {
  const rawValue = localStorage.getItem(`maths-s2-best-score-${chapterId}`);

  if (rawValue === null) {
    return null;
  }

  const value = Number(rawValue);

  if (Number.isNaN(value)) {
    return null;
  }

  return clamp(value, 0, 100);
}

function getQuizBadgeClass(score) {
  if (score === null) return "";

  if (score >= 80) return "done";
  if (score >= 50) return "warning";

  return "danger";
}

function toggleLocalFlag(key) {
  const currentValue = localStorage.getItem(key) === "true";
  localStorage.setItem(key, String(!currentValue));
}

function getLocalFlag(key) {
  return localStorage.getItem(key) === "true";
}

function getLessonKey(chapterId) {
  return `maths-s2-lesson-done-${chapterId}`;
}

function getTdKey(chapterId) {
  return `maths-s2-td-done-${chapterId}`;
}

function resetProgression() {
  const confirmation = window.confirm(
    "Voulez-vous vraiment réinitialiser la progression locale ? Les meilleurs scores de quiz seront aussi effacés."
  );

  if (!confirmation) return;

  APP_DATA.chapters.forEach((chapter) => {
    localStorage.removeItem(getLessonKey(chapter.id));
    localStorage.removeItem(getTdKey(chapter.id));
    localStorage.removeItem(`maths-s2-best-score-${chapter.id}`);
  });

  renderProgression();
}

function setText(selector, value) {
  const element = document.querySelector(selector);

  if (element) {
    element.textContent = String(value);
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(Number(value) || 0, min), max);
}
