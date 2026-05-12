"use strict";

/**
 * Dashboard principal — Maths S2
 * Version front statique.
 * Les données sont en dur pour l’instant afin de faciliter une future migration PHP/MySQL.
 */

const chapters = [
  {
    id: "etude-fonction",
    title: "Étude d’une fonction réelle",
    description: "Continuité, TVI, bijection, dérivée, tangente, variations, limites et asymptotes.",
    icon: "fa-chart-line",
    progress: 60,
    level: "Prioritaire"
  },
  {
    id: "fonctions-usuelles",
    title: "Fonctions usuelles",
    description: "Exponentielle, logarithme, trigonométrie, dérivées et fonctions composées.",
    icon: "fa-wave-square",
    progress: 35,
    level: "Important"
  },
  {
    id: "complexes",
    title: "Nombres complexes",
    description: "Forme algébrique, forme polaire, module, argument, Euler, Moivre et racines.",
    icon: "fa-circle-nodes",
    progress: 25,
    level: "À consolider"
  },
  {
    id: "polynomes",
    title: "Polynômes et fractions rationnelles",
    description: "Racines, factorisation, pôles, zéros, décomposition et étude de fractions.",
    icon: "fa-code-branch",
    progress: 15,
    level: "À commencer"
  },
  {
    id: "integrales",
    title: "Primitives et intégrales",
    description: "Primitives usuelles, intégrales, méthodes de calcul et interprétation.",
    icon: "fa-integral",
    progress: 20,
    level: "À commencer"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  initSidebar();
  renderChapters();
  renderGlobalProgress();
});

function initSidebar() {
  const sidebar = document.querySelector("#sidebar");
  const menuToggle = document.querySelector("#menuToggle");
  const overlay = document.querySelector("#sidebarOverlay");

  if (!sidebar || !menuToggle || !overlay) return;

  const openSidebar = () => {
    sidebar.classList.add("is-open");
    overlay.classList.add("is-visible");
  };

  const closeSidebar = () => {
    sidebar.classList.remove("is-open");
    overlay.classList.remove("is-visible");
  };

  menuToggle.addEventListener("click", openSidebar);
  overlay.addEventListener("click", closeSidebar);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSidebar();
    }
  });
}

function renderChapters() {
  const grid = document.querySelector("#chaptersGrid");
  const chapterCount = document.querySelector("#chapterCount");

  if (!grid) return;

  grid.innerHTML = chapters.map((chapter) => createChapterCard(chapter)).join("");

  if (chapterCount) {
    chapterCount.textContent = String(chapters.length);
  }
}

function createChapterCard(chapter) {
  const safeProgress = clamp(chapter.progress, 0, 100);

  return `
    <article class="chapter-card">
      <div class="chapter-card-content">
        <div class="flex items-start justify-between gap-4">
          <div class="chapter-icon">
            <i class="fa-solid ${chapter.icon}"></i>
          </div>

          <span class="text-[0.7rem] uppercase tracking-[0.18em] text-cyan-200 border border-cyan-400/20 bg-cyan-400/5 rounded-full px-3 py-1">
            ${chapter.level}
          </span>
        </div>

        <h3 class="text-xl font-black mt-5">
          ${chapter.title}
        </h3>

        <p class="text-sm text-cyber-muted leading-relaxed mt-2">
          ${chapter.description}
        </p>

        <div class="mt-5">
          <div class="flex items-center justify-between text-xs mb-2">
            <span class="text-cyber-muted">Progression</span>
            <span class="font-bold text-cyber-cyan">${safeProgress}%</span>
          </div>

          <div class="h-2.5 rounded-full bg-slate-800 overflow-hidden">
            <div class="h-full rounded-full progress-gradient" style="width: ${safeProgress}%"></div>
          </div>
        </div>

        <div class="chapter-actions">
          <a href="cours.html?chapter=${encodeURIComponent(chapter.id)}">
            <i class="fa-solid fa-book-open"></i>
            Cours
          </a>

          <a href="td.html?chapter=${encodeURIComponent(chapter.id)}">
            <i class="fa-solid fa-terminal"></i>
            TD
          </a>

          <a href="quiz.html?chapter=${encodeURIComponent(chapter.id)}">
            <i class="fa-solid fa-circle-question"></i>
            Quiz
          </a>
        </div>
      </div>
    </article>
  `;
}

function renderGlobalProgress() {
  const progressText = document.querySelector("#globalProgressText");
  const progressBar = document.querySelector("#globalProgressBar");

  if (!progressText || !progressBar || chapters.length === 0) return;

  const total = chapters.reduce((sum, chapter) => sum + chapter.progress, 0);
  const average = Math.round(total / chapters.length);

  progressText.textContent = `${average}%`;
  progressBar.style.width = `${average}%`;
}

function clamp(value, min, max) {
  return Math.min(Math.max(Number(value) || 0, min), max);
}
