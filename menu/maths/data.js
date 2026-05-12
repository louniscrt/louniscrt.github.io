"use strict";

/**
 * Données pédagogiques temporaires.
 * Plus tard, ce fichier pourra être remplacé par des appels API PHP/MySQL.
 */

const APP_DATA = {
  chapters: [
    {
      id: "etude-fonction",
      title: "Étude d’une fonction réelle",
      icon: "fa-chart-line",
      progress: 60,
      description: "Continuité, TVI, bijection, dérivée, tangente, variations, limites et asymptotes."
    },
    {
      id: "fonctions-usuelles",
      title: "Fonctions usuelles",
      icon: "fa-wave-square",
      progress: 35,
      description: "Exponentielle, logarithme, trigonométrie et fonctions composées."
    },
    {
      id: "complexes",
      title: "Nombres complexes",
      icon: "fa-circle-nodes",
      progress: 25,
      description: "Forme algébrique, forme polaire, module, argument, Euler, Moivre et racines."
    },
    {
      id: "polynomes",
      title: "Polynômes et fractions rationnelles",
      icon: "fa-code-branch",
      progress: 15,
      description: "Racines, factorisation, pôles, zéros et fractions rationnelles."
    },
    {
      id: "integrales",
      title: "Primitives et intégrales",
      icon: "fa-infinity",
      progress: 20,
      description: "Primitives usuelles, intégrales et méthodes de calcul."
    }
  ],

  lessons: {
    "etude-fonction": {
      title: "Étude d’une fonction réelle",
      subtitle: "Continuité, dérivée, tangente et variations",
      difficulty: "Base prioritaire",
      estimatedTime: "35 min",
      objectives: [
        "Comprendre la continuité d’une fonction en un point et sur un intervalle.",
        "Savoir utiliser le théorème des valeurs intermédiaires.",
        "Relier la dérivée au coefficient directeur de la tangente.",
        "Utiliser le signe de la dérivée pour dresser un tableau de variations."
      ],
      sections: [
        {
          type: "definition",
          title: "Continuité en un point",
          html: `
            <p>
              Une fonction \\( f \\) est continue en un point \\( a \\) si la limite de \\( f(x) \\)
              lorsque \\( x \\) tend vers \\( a \\) est égale à la valeur de la fonction en \\( a \\).
            </p>

            <div class="math-box">
              \\[
                \\lim_{x \\to a} f(x) = f(a)
              \\]
            </div>

            <p>
              Pour vérifier une continuité, on compare souvent la limite à gauche,
              la limite à droite et la valeur de la fonction.
            </p>

            <div class="math-box">
              \\[
                \\lim_{x \\to a^-} f(x)
                =
                \\lim_{x \\to a^+} f(x)
                =
                f(a)
              \\]
            </div>
          `
        },
        {
          type: "theorem",
          title: "Théorème des valeurs intermédiaires",
          html: `
            <p>
              Si \\( f \\) est continue sur un intervalle \\([a,b]\\), alors toute valeur
              comprise entre \\( f(a) \\) et \\( f(b) \\) est atteinte au moins une fois.
            </p>

            <div class="math-box">
              \\[
                \\exists c \\in [a,b] \\quad / \\quad f(c)=\\lambda
              \\]
            </div>

            <p>
              En pratique, ce théorème sert à démontrer qu’une équation
              \\( f(x)=\\lambda \\) possède au moins une solution.
            </p>
          `
        },
        {
          type: "theorem",
          title: "Théorème de bijection",
          html: `
            <p>
              Si \\( f \\) est continue et strictement monotone sur \\([a,b]\\),
              alors chaque valeur entre \\( f(a) \\) et \\( f(b) \\) possède un unique antécédent.
            </p>

            <div class="math-box">
              \\[
                \\exists! c \\in [a,b] \\quad / \\quad f(c)=\\lambda
              \\]
            </div>

            <p>
              C’est le théorème à utiliser quand on veut prouver l’existence
              <strong>et l’unicité</strong> d’une solution.
            </p>
          `
        },
        {
          type: "definition",
          title: "Dérivée en un point",
          html: `
            <p>
              La dérivée de \\( f \\) en \\( x_0 \\) mesure la pente de la tangente à la courbe
              au point d’abscisse \\( x_0 \\).
            </p>

            <div class="math-box">
              \\[
                f'(x_0)
                =
                \\lim_{h \\to 0}
                \\frac{f(x_0+h)-f(x_0)}{h}
              \\]
            </div>

            <p>
              Géométriquement, \\( f'(x_0) \\) est le coefficient directeur de la tangente.
            </p>
          `
        },
        {
          type: "method",
          title: "Équation de la tangente",
          html: `
            <p>
              Si \\( f \\) est dérivable en \\( x_0 \\), l’équation de la tangente à la courbe
              en ce point est :
            </p>

            <div class="math-box">
              \\[
                T(x)=f'(x_0)(x-x_0)+f(x_0)
              \\]
            </div>

            <ol>
              <li>Calculer \\( f(x_0) \\).</li>
              <li>Calculer \\( f'(x_0) \\).</li>
              <li>Remplacer dans la formule de la tangente.</li>
            </ol>
          `
        },
        {
          type: "method",
          title: "Variations d’une fonction",
          html: `
            <p>
              Pour étudier les variations d’une fonction, on calcule sa dérivée puis on étudie
              son signe.
            </p>

            <div class="overflow-x-auto">
              <table class="lesson-table">
                <thead>
                  <tr>
                    <th>Signe de \\( f'(x) \\)</th>
                    <th>Variation de \\( f \\)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>\\( f'(x) > 0 \\)</td>
                    <td>\\( f \\) est croissante</td>
                  </tr>
                  <tr>
                    <td>\\( f'(x) < 0 \\)</td>
                    <td>\\( f \\) est décroissante</td>
                  </tr>
                  <tr>
                    <td>\\( f'(x)=0 \\)</td>
                    <td>Point critique possible</td>
                  </tr>
                </tbody>
              </table>
            </div>
          `
        },
        {
          type: "example",
          title: "Exemple type : dérivée de \\( f(x)=x^2+1 \\)",
          html: `
            <p>
              On applique la définition de la dérivée :
            </p>

            <div class="math-box">
              \\[
                f'(x)
                =
                \\lim_{h \\to 0}
                \\frac{(x+h)^2+1-(x^2+1)}{h}
              \\]
            </div>

            <div class="math-box">
              \\[
                f'(x)
                =
                \\lim_{h \\to 0}
                \\frac{x^2+2xh+h^2+1-x^2-1}{h}
                =
                \\lim_{h \\to 0}(2x+h)
                =
                2x
              \\]
            </div>

            <p>
              Donc la dérivée de \\( f(x)=x^2+1 \\) est :
            </p>

            <div class="math-box">
              \\[
                f'(x)=2x
              \\]
            </div>
          `
        }
      ],
      commonMistakes: [
        "Confondre continuité et dérivabilité : une fonction dérivable est continue, mais l’inverse n’est pas toujours vrai.",
        "Oublier de vérifier la monotonie pour utiliser le théorème de bijection.",
        "Utiliser la formule de la tangente sans calculer séparément \\( f(x_0) \\) et \\( f'(x_0) \\).",
        "Dresser un tableau de variations sans étudier le signe de la dérivée."
      ]
    },

    "fonctions-usuelles": {
      title: "Fonctions usuelles",
      subtitle: "Exponentielle, logarithme et trigonométrie",
      difficulty: "Important",
      estimatedTime: "30 min",
      objectives: [
        "Connaître les dérivées usuelles.",
        "Manipuler les fonctions composées.",
        "Reconnaître les formes fréquentes en signal."
      ],
      sections: [
        {
          type: "definition",
          title: "Formules à connaître",
          html: `
            <div class="overflow-x-auto">
              <table class="lesson-table">
                <thead>
                  <tr>
                    <th>Fonction</th>
                    <th>Dérivée</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>\\( e^x \\)</td><td>\\( e^x \\)</td></tr>
                  <tr><td>\\( \\ln(x) \\)</td><td>\\( \\frac{1}{x} \\)</td></tr>
                  <tr><td>\\( \\sin(x) \\)</td><td>\\( \\cos(x) \\)</td></tr>
                  <tr><td>\\( \\cos(x) \\)</td><td>\\( -\\sin(x) \\)</td></tr>
                </tbody>
              </table>
            </div>
          `
        },
        {
          type: "method",
          title: "Fonction composée",
          html: `
            <p>
              Pour dériver une fonction composée, on dérive l’extérieur puis on multiplie
              par la dérivée de l’intérieur.
            </p>

            <div class="math-box">
              \\[
                (f(u))' = u' \\times f'(u)
              \\]
            </div>
          `
        }
      ],
      commonMistakes: [
        "Oublier de multiplier par la dérivée de l’intérieur dans une fonction composée.",
        "Écrire \\( (\\ln u)' = \\frac{1}{u} \\) au lieu de \\( \\frac{u'}{u} \\)."
      ]
    },

    "complexes": {
      title: "Nombres complexes",
      subtitle: "Formes algébrique et polaire",
      difficulty: "À consolider",
      estimatedTime: "40 min",
      objectives: [
        "Passer de la forme algébrique à la forme polaire.",
        "Calculer module et argument.",
        "Utiliser les formules d’Euler et de Moivre."
      ],
      sections: [
        {
          type: "definition",
          title: "Forme algébrique",
          html: `
            <p>
              Un nombre complexe s’écrit sous la forme :
            </p>

            <div class="math-box">
              \\[
                z = a + ib
              \\]
            </div>

            <p>
              \\( a \\) est la partie réelle et \\( b \\) est la partie imaginaire.
            </p>
          `
        },
        {
          type: "definition",
          title: "Module",
          html: `
            <div class="math-box">
              \\[
                |z| = \\sqrt{a^2+b^2}
              \\]
            </div>
          `
        }
      ],
      commonMistakes: [
        "Confondre argument et module.",
        "Oublier que deux arguments peuvent différer de \\( 2k\\pi \\)."
      ]
    },

    "polynomes": {
      title: "Polynômes et fractions rationnelles",
      subtitle: "Racines, pôles et factorisation",
      difficulty: "À commencer",
      estimatedTime: "30 min",
      objectives: [
        "Identifier les racines d’un polynôme.",
        "Factoriser une expression.",
        "Comprendre zéros et pôles d’une fraction rationnelle."
      ],
      sections: [
        {
          type: "definition",
          title: "Forme factorisée",
          html: `
            <p>
              Une fonction rationnelle peut souvent s’écrire :
            </p>

            <div class="math-box">
              \\[
                F(x)=\\lambda
                \\frac{(x-z_1)(x-z_2)\\cdots(x-z_n)}
                {(x-p_1)(x-p_2)\\cdots(x-p_m)}
              \\]
            </div>

            <p>
              Les \\( z_i \\) sont les zéros et les \\( p_i \\) sont les pôles.
            </p>
          `
        }
      ],
      commonMistakes: [
        "Oublier les valeurs interdites dans le domaine de définition.",
        "Simplifier une fraction rationnelle sans préciser les restrictions."
      ]
    },

    "integrales": {
      title: "Primitives et intégrales",
      subtitle: "Calculs et interprétation",
      difficulty: "À commencer",
      estimatedTime: "35 min",
      objectives: [
        "Reconnaître une primitive.",
        "Calculer une intégrale simple.",
        "Interpréter une intégrale comme une aire algébrique."
      ],
      sections: [
        {
          type: "definition",
          title: "Primitive",
          html: `
            <p>
              Une fonction \\( F \\) est une primitive de \\( f \\) sur un intervalle si :
            </p>

            <div class="math-box">
              \\[
                F'(x)=f(x)
              \\]
            </div>
          `
        },
        {
          type: "theorem",
          title: "Lien avec l’intégrale",
          html: `
            <div class="math-box">
              \\[
                \\int_a^b f(x)\\,dx = F(b)-F(a)
              \\]
            </div>
          `
        }
      ],
      commonMistakes: [
        "Oublier la constante pour une primitive générale.",
        "Inverser les bornes dans le calcul d’une intégrale."
      ]
    }
  }
};
