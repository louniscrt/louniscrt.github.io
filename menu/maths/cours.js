"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initCoursePage();
});

function initCoursePage() {
  if (!window.APP_DATA) {
    console.error("APP_DATA est introuvable. Vérifie que data.js est bien chargé avant cours.js.");
    return;
  }

  renderChapterList();

  const initialChapterId = getInitialChapterId();
  renderLesson(initialChapterId);
}

function getInitialChapterId() {
  const params = new URLSearchParams(window.location.search);
  const chapterFromUrl = params.get("chapter");

  if (chapterFromUrl && APP_DATA.lessons[chapterFromUrl]) {
    return chapterFromUrl;
  }

  return APP_DATA.chapters[0]?.id || "etude-fonction";
}

function renderChapterList() {
  const chapterList = document.querySelector("#chapterList");
  if (!chapterList) return;

  chapterList.innerHTML = APP_DATA.chapters.map((chapter) => {
    return `
      <button
        type="button"
        class="course-chapter-btn"
        data-chapter-id="${chapter.id}"
      >
        <span class="course-chapter-icon">
          <i class="fa-solid ${chapter.icon}"></i>
        </span>

        <span class="min-w-0">
          <span class="block font-bold truncate">${chapter.title}</span>
          <span class="block text-xs text-cyber-muted truncate">${chapter.progress}% complété</span>
        </span>
      </button>
    `;
  }).join("");

  chapterList.querySelectorAll(".course-chapter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const chapterId = button.dataset.chapterId;
      updateUrlChapter(chapterId);
      renderLesson(chapterId);
    });
  });
}

function renderLesson(chapterId) {
  const lesson = APP_DATA.lessons[chapterId];
  const container = document.querySelector("#lessonContainer");

  if (!container || !lesson) return;

  setActiveChapterButton(chapterId);

  container.innerHTML = `
    <header class="lesson-header">
      <div>
        <p class="text-xs uppercase tracking-[0.22em] text-cyber-cyan mb-2">
          ${lesson.difficulty}
        </p>

        <h1 class="text-3xl sm:text-4xl font-black leading-tight">
          ${lesson.title}
        </h1>

        <p class="text-cyber-muted mt-2">
          ${lesson.subtitle}
        </p>
      </div>

      <div class="lesson-time">
        <i class="fa-regular fa-clock"></i>
        ${lesson.estimatedTime}
      </div>
    </header>

    <section class="lesson-objectives">
      <h2>
        <i class="fa-solid fa-bullseye text-cyber-cyan"></i>
        Objectifs
      </h2>

      <ul>
        ${lesson.objectives.map((objective) => `<li>${objective}</li>`).join("")}
      </ul>
    </section>

    <section class="space-y-4">
      ${lesson.sections.map((section) => createLessonSection(section)).join("")}
    </section>

    <section class="lesson-mistakes">
      <h2>
        <i class="fa-solid fa-triangle-exclamation text-orange-300"></i>
        Erreurs fréquentes
      </h2>

      <ul>
        ${lesson.commonMistakes.map((mistake) => `<li>${mistake}</li>`).join("")}
      </ul>
    </section>

    <footer class="lesson-actions">
      <a href="./quiz.html?chapter=${encodeURIComponent(chapterId)}" class="btn-primary">
        <i class="fa-solid fa-circle-question"></i>
        Valider avec un quiz
      </a>

      <a href="./td.html?chapter=${encodeURIComponent(chapterId)}" class="btn-secondary">
        <i class="fa-solid fa-terminal"></i>
        Passer au TD
      </a>
    </footer>
  `;

  renderMath();
}

function createLessonSection(section) {
  const iconByType = {
    definition: "fa-book",
    theorem: "fa-shield-halved",
    method: "fa-list-check",
    example: "fa-flask"
  };

  const labelByType = {
    definition: "Définition",
    theorem: "Théorème",
    method: "Méthode",
    example: "Exemple"
  };

  return `
    <article class="lesson-section lesson-section-${section.type}">
      <div class="lesson-section-label">
        <i class="fa-solid ${iconByType[section.type] || "fa-note-sticky"}"></i>
        ${labelByType[section.type] || "Note"}
      </div>

      <h2>${section.title}</h2>

      <div class="lesson-content">
        ${section.html}
      </div>
    </article>
  `;
}

function setActiveChapterButton(chapterId) {
  document.querySelectorAll(".course-chapter-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.chapterId === chapterId);
  });
}

function updateUrlChapter(chapterId) {
  const url = new URL(window.location.href);
  url.searchParams.set("chapter", chapterId);
  window.history.replaceState({}, "", url.toString());
}
