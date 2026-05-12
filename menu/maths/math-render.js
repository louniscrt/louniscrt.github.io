"use strict";

/**
 * Relance MathJax après injection dynamique de contenu HTML.
 */
function renderMath() {
  if (window.MathJax && typeof window.MathJax.typesetPromise === "function") {
    window.MathJax.typesetPromise().catch((error) => {
      console.error("Erreur MathJax :", error);
    });
  }
}
