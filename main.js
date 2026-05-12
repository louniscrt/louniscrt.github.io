/*
  main.js — Portfolio final
  - Menu mobile
  - Dropdown "Projets" (anim + clic extérieur + ESC)
  - <details> projets : chevron injecté + animation + ouverture exclusive
  - Reveal progressif
*/
(() => {
  const html = document.documentElement;
  html.classList.add("js");

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  // ---------------------------
  // Menu mobile
  // ---------------------------
  const nav = document.querySelector(".site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("navMenu");

  if (nav && toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    // Fermer menu mobile après clic sur un lien
    menu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 880px)").matches) {
          nav.classList.remove("nav-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // ---------------------------
  // Dropdown nav "Projets"
  // ---------------------------
  const dropdown = document.querySelector(".dropdown");
  const dropToggle = document.querySelector(".dropdown-toggle");

  const closeDropdown = () => {
    if (!dropdown || !dropToggle) return;
    dropdown.classList.remove("is-open");
    dropToggle.setAttribute("aria-expanded", "false");
  };

  const openDropdown = () => {
    if (!dropdown || !dropToggle) return;
    dropdown.classList.add("is-open");
    dropToggle.setAttribute("aria-expanded", "true");
  };

  if (dropdown && dropToggle) {
    dropToggle.addEventListener("click", (e) => {
      e.preventDefault();
      dropdown.classList.contains("is-open") ? closeDropdown() : openDropdown();
    });

    // Clic extérieur
    document.addEventListener("click", (e) => {
      if (!dropdown.classList.contains("is-open")) return;
      if (!dropdown.contains(e.target)) closeDropdown();
    });

    // ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDropdown();
    });

    // Si clic sur un lien du sous-menu : fermer
    dropdown.querySelectorAll(".dropdown-menu a").forEach((a) => {
      a.addEventListener("click", () => closeDropdown());
    });
  }

  // ---------------------------
  // Projets (<details>)
  // ---------------------------
  const detailsList = Array.from(document.querySelectorAll("details.project-details"));

  // Injecte un chevron si absent + prépare l'animation
  detailsList.forEach((d) => {
    const summary = d.querySelector(":scope > summary");
    if (!summary) return;

    if (!summary.querySelector(".details-chevron")) {
      const chev = document.createElement("span");
      chev.className = "details-chevron";
      chev.setAttribute("aria-hidden", "true");
      chev.innerHTML = "<span>▾</span>";
      summary.appendChild(chev);
    }

    const inner = d.querySelector(".project-content-inner");
    if (!inner) return;

    if (!reduceMotion) {
      // état initial
      inner.style.maxHeight = d.open ? inner.scrollHeight + "px" : "0px";
      inner.style.opacity = d.open ? "1" : "0";
      inner.style.transform = d.open ? "translateY(0)" : "translateY(-6px)";
      inner.style.transition =
        "max-height 300ms cubic-bezier(.2,.8,.2,1), opacity 220ms ease, transform 220ms ease";
      inner.style.overflow = "hidden";
    }
  });

  const closeOthers = (current) => {
    detailsList.forEach((d) => {
      if (d === current || !d.open) return;
      d.open = false;
      const inner = d.querySelector(".project-content-inner");
      if (!inner || reduceMotion) return;
      inner.style.maxHeight = "0px";
      inner.style.opacity = "0";
      inner.style.transform = "translateY(-6px)";
    });
  };

  detailsList.forEach((d) => {
    const summary = d.querySelector(":scope > summary");
    const inner = d.querySelector(".project-content-inner");
    if (!summary || !inner) return;

    summary.addEventListener("click", (e) => {
      if (reduceMotion) return; // laisse le comportement natif
      e.preventDefault();

      if (d.open) {
        // fermeture
        inner.style.maxHeight = inner.scrollHeight + "px";
        requestAnimationFrame(() => {
          inner.style.maxHeight = "0px";
          inner.style.opacity = "0";
          inner.style.transform = "translateY(-6px)";
          d.open = false;
        });
      } else {
        closeOthers(d);
        d.open = true;

        // force reflow
        inner.style.maxHeight = "0px";
        inner.style.opacity = "0";
        inner.style.transform = "translateY(-6px)";

        requestAnimationFrame(() => {
          inner.style.maxHeight = inner.scrollHeight + "px";
          inner.style.opacity = "1";
          inner.style.transform = "translateY(0)";
        });
      }
    });

    // Ajuste si images chargent après
    inner.querySelectorAll("img").forEach((img) => {
      img.addEventListener("load", () => {
        if (d.open && !reduceMotion) inner.style.maxHeight = inner.scrollHeight + "px";
      });
    });
  });

  // ESC ferme tous les details ouverts
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    detailsList.forEach((d) => {
      if (!d.open) return;
      d.open = false;
      const inner = d.querySelector(".project-content-inner");
      if (!inner || reduceMotion) return;
      inner.style.maxHeight = "0px";
      inner.style.opacity = "0";
      inner.style.transform = "translateY(-6px)";
    });
  });

  // ---------------------------
  // Reveal progressif
  // ---------------------------
  const els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) if (en.isIntersecting) en.target.classList.add("is-visible");
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
  } else {
    // fallback
    els.forEach((el) => el.classList.add("is-visible"));
  }
})();
