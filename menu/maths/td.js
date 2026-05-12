"use strict";

let currentChapterId = null;
let currentExercise = null;
let currentHintIndex = 0;
let currentStepIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  initTdPage();
});

function initTdPage() {
  if (!window.APP_DATA || !APP_DATA.exerciseSets) {
    console.error("Les données TD sont introuvables. Vérifie data.js.");
    return;
  }

  initTdSelectors();

  const initialChapterId = getInitialTdChapterId();
  setChapter(initialChapterId);
}

function getInitialTdChapterId() {
  const params = new URLSearchParams(window.location.search);
  const chapterFromUrl = params.get("chapter");

  if (chapterFromUrl && APP_DATA.exerciseSets[chapterFromUrl]) {
    return chapterFromUrl;
  }

  const firstChapterWithExercises = APP_DATA.chapters.find((chapter) => {
    return APP_DATA.exerciseSets[chapter.id]?.length > 0;
  });

  return firstChapterWithExercises?.id || "etude-fonction";
}

function initTdSelectors() {
  const chapterSelect = document.querySelector("#tdChapterSelect");
  const exerciseSelect = document.querySelector("#tdExerciseSelect");

  if (!chapterSelect || !exerciseSelect) return;

  chapterSelect.innerHTML = APP_DATA.chapters.map((chapter) => {
    const exerciseCount = APP_DATA.exerciseSets[chapter.id]?.length || 0;
    const disabled = exerciseCount === 0 ? "disabled" : "";

    return `
      <option value="${chapter.id}" ${disabled}>
        ${chapter.title} ${exerciseCount === 0 ? "— bientôt" : ""}
      </option>
    `;
  }).join("");

  chapterSelect.addEventListener("change", () => {
    setChapter(chapterSelect.value);
  });

  exerciseSelect.addEventListener("change", () => {
    setExercise(exerciseSelect.value);
  });

  document.querySelector("#showHintBtn")?.addEventListener("click", showNextHint);
  document.querySelector("#showStepBtn")?.addEventListener("click", showNextStep);
  document.querySelector("#showFullCorrectionBtn")?.addEventListener("click", showFullCorrection);
  document.querySelector("#resetExerciseBtn")?.addEventListener("click", resetCurrentExercise);
}

function setChapter(chapterId) {
  const exercises = APP_DATA.exerciseSets[chapterId] || [];

  if (exercises.length === 0) {
    return;
  }

  currentChapterId = chapterId;

  const chapterSelect = document.querySelector("#tdChapterSelect");
  const exerciseSelect = document.querySelector("#tdExerciseSelect");

  if (chapterSelect) {
    chapterSelect.value = chapterId;
  }

  if (exerciseSelect) {
    exerciseSelect.innerHTML = exercises.map((exercise) => {
      return `
        <option value="${exercise.id}">
          ${exercise.title}
        </option>
      `;
    }).join("");
  }

  updateUrlChapter(chapterId);

  setExercise(exercises[0].id);
}

function setExercise(exerciseId) {
  const exercises = APP_DATA.exerciseSets[currentChapterId] || [];
  const exercise = exercises.find((item) => item.id === exerciseId);

  if (!exercise) return;

  currentExercise = exercise;
  currentHintIndex = 0;
  currentStepIndex = 0;

  const exerciseSelect = document.querySelector("#tdExerciseSelect");
  if (exerciseSelect) {
    exerciseSelect.value = exercise.id;
  }

  renderExercise();
  renderMath();
}

function renderExercise() {
  const title = document.querySelector("#exerciseTitle");
  const difficulty = document.querySelector("#exerciseDifficulty");
  const statement = document.querySelector("#exerciseStatement");
  const hintBox = document.querySelector("#hintBox");
  const correctionSteps = document.querySelector("#correctionSteps");
  const stepCounter = document.querySelector("#stepCounter");
  const goCourseBtn = document.querySelector("#goCourseBtn");

  if (!currentExercise) return;

  if (title) title.textContent = currentExercise.title;
  if (difficulty) difficulty.textContent = currentExercise.difficulty;
  if (statement) statement.innerHTML = currentExercise.statement;

  if (hintBox) {
    hintBox.classList.add("hidden");
    hintBox.innerHTML = "";
  }

  if (correctionSteps) {
    correctionSteps.innerHTML = `
      <div class="td-empty-state">
        <i class="fa-solid fa-lock"></i>
        <p>
          La correction est masquée. Essaie d’abord de résoudre l’exercice,
          puis affiche un indice ou une étape.
        </p>
      </div>
    `;
  }

  if (stepCounter) {
    stepCounter.textContent = `0 / ${currentExercise.correctionSteps.length}`;
  }

  if (goCourseBtn) {
    goCourseBtn.href = `./cours.html?chapter=${encodeURIComponent(currentChapterId)}`;
  }

  updateButtons();
}

function showNextHint() {
  const hintBox = document.querySelector("#hintBox");

  if (!hintBox || !currentExercise) return;

  const hints = currentExercise.hints || [];

  if (hints.length === 0) {
    hintBox.classList.remove("hidden");
    hintBox.innerHTML = `
      <p>Aucun indice disponible pour cet exercice.</p>
    `;
    return;
  }

  const hint = hints[currentHintIndex];

  hintBox.classList.remove("hidden");
  hintBox.innerHTML += `
    <div class="td-hint-item">
      <span>Indice ${currentHintIndex + 1}</span>
      <p>${hint}</p>
    </div>
  `;

  currentHintIndex = Math.min(currentHintIndex + 1, hints.length);

  updateButtons();
  renderMath();
}

function showNextStep() {
  if (!currentExercise) return;

  const steps = currentExercise.correctionSteps;

  if (currentStepIndex >= steps.length) return;

  const correctionSteps = document.querySelector("#correctionSteps");

  if (!correctionSteps) return;

  if (currentStepIndex === 0) {
    correctionSteps.innerHTML = "";
  }

  const step = steps[currentStepIndex];

  correctionSteps.innerHTML += createStepHtml(step, currentStepIndex);

  currentStepIndex += 1;

  updateStepCounter();
  updateButtons();
  renderMath();
}

function showFullCorrection() {
  if (!currentExercise) return;

  const correctionSteps = document.querySelector("#correctionSteps");
  if (!correctionSteps) return;

  correctionSteps.innerHTML = currentExercise.correctionSteps
    .map((step, index) => createStepHtml(step, index))
    .join("");

  currentStepIndex = currentExercise.correctionSteps.length;

  updateStepCounter();
  updateButtons();
  renderMath();
}

function createStepHtml(step, index) {
  return `
    <article class="td-step">
      <div class="td-step-header">
        <span>Étape ${index + 1}</span>
        <h3>${step.title}</h3>
      </div>

      <div class="td-step-content">
        ${step.html}
      </div>
    </article>
  `;
}

function resetCurrentExercise() {
  if (!currentExercise) return;

  currentHintIndex = 0;
  currentStepIndex = 0;

  renderExercise();
  renderMath();
}

function updateStepCounter() {
  const stepCounter = document.querySelector("#stepCounter");

  if (!stepCounter || !currentExercise) return;

  stepCounter.textContent = `${currentStepIndex} / ${currentExercise.correctionSteps.length}`;
}

function updateButtons() {
  const hintButton = document.querySelector("#showHintBtn");
  const stepButton = document.querySelector("#showStepBtn");
  const fullButton = document.querySelector("#showFullCorrectionBtn");

  if (!currentExercise) return;

  if (hintButton) {
    const hasMoreHints = currentHintIndex < currentExercise.hints.length;
    hintButton.disabled = !hasMoreHints;
    hintButton.classList.toggle("is-disabled", !hasMoreHints);
  }

  if (stepButton) {
    const hasMoreSteps = currentStepIndex < currentExercise.correctionSteps.length;
    stepButton.disabled = !hasMoreSteps;
    stepButton.classList.toggle("is-disabled", !hasMoreSteps);
  }

  if (fullButton) {
    const hasHiddenSteps = currentStepIndex < currentExercise.correctionSteps.length;
    fullButton.disabled = !hasHiddenSteps;
    fullButton.classList.toggle("is-disabled", !hasHiddenSteps);
  }
}

function updateUrlChapter(chapterId) {
  const url = new URL(window.location.href);
  url.searchParams.set("chapter", chapterId);
  window.history.replaceState({}, "", url.toString());
}
