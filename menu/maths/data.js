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
APP_DATA.exerciseSets = {
  "etude-fonction": [
    {
      id: "td1-ex1-derivee-point",
      title: "TD1 — Dérivée d’une fonction en un point",
      difficulty: "Base",
      statement: `
        <p>
          On considère la fonction définie par :
        </p>

        <div class="math-box">
          \\[
            f(x)=\\frac{1}{1+x}
          \\]
        </div>

        <ol>
          <li>Donner le domaine de définition de \\( f \\).</li>
          <li>Pour \\( x_1=1 \\), tracer la droite \\( D \\) passant par les points \\( A(0,f(0)) \\) et \\( B(x_1,f(x_1)) \\).</li>
          <li>Donner l’équation de la droite \\( D \\).</li>
          <li>En déduire l’équation de la tangente à la courbe en \\( x=0 \\).</li>
          <li>Calculer \\( f'(x) \\) à partir de la définition.</li>
        </ol>
      `,
      hints: [
        "Commence par chercher la valeur interdite du dénominateur \\(1+x\\).",
        "Pour la droite passant par deux points, utilise le coefficient directeur : \\( a=\\frac{f(x_1)-f(0)}{x_1-0} \\).",
        "La tangente en 0 correspond à la limite de la droite lorsque le second point se rapproche de \\( A \\)."
      ],
      correctionSteps: [
        {
          title: "Domaine de définition",
          html: `
            <p>
              La fonction est définie lorsque le dénominateur n’est pas nul.
            </p>

            <div class="math-box">
              \\[
                1+x \\neq 0 \\Longleftrightarrow x \\neq -1
              \\]
            </div>

            <p>
              Donc :
            </p>

            <div class="math-box">
              \\[
                D_f = \\mathbb{R}\\setminus\\{-1\\}
              \\]
            </div>
          `
        },
        {
          title: "Coefficient directeur de la droite",
          html: `
            <p>
              On a :
            </p>

            <div class="math-box">
              \\[
                f(0)=1
                \\qquad
                f(x_1)=\\frac{1}{1+x_1}
              \\]
            </div>

            <p>
              Le coefficient directeur vaut :
            </p>

            <div class="math-box">
              \\[
                a=
                \\frac{f(x_1)-f(0)}{x_1}
                =
                \\frac{\\frac{1}{1+x_1}-1}{x_1}
                =
                -\\frac{1}{1+x_1}
              \\]
            </div>
          `
        },
        {
          title: "Équation de la droite",
          html: `
            <p>
              Comme l’ordonnée à l’origine est \\( f(0)=1 \\), la droite a pour équation :
            </p>

            <div class="math-box">
              \\[
                D(x)= -\\frac{1}{1+x_1}x+1
              \\]
            </div>

            <p>
              Pour \\( x_1=1 \\), on obtient :
            </p>

            <div class="math-box">
              \\[
                D(x)=-\\frac{1}{2}x+1
              \\]
            </div>
          `
        },
        {
          title: "Tangente en \\( x=0 \\)",
          html: `
            <p>
              Quand \\( x_1 \\to 0 \\), la pente tend vers :
            </p>

            <div class="math-box">
              \\[
                -\\frac{1}{1+x_1} \\longrightarrow -1
              \\]
            </div>

            <p>
              La tangente en \\( x=0 \\) est donc :
            </p>

            <div class="math-box">
              \\[
                T(x)=-x+1
              \\]
            </div>
          `
        },
        {
          title: "Dérivée de \\( f \\)",
          html: `
            <p>
              La dérivée de \\( f(x)=\\frac{1}{1+x} \\) est :
            </p>

            <div class="math-box">
              \\[
                f'(x)=-\\frac{1}{(1+x)^2}
              \\]
            </div>

            <p>
              En particulier :
            </p>

            <div class="math-box">
              \\[
                f'(0)=-1
              \\]
            </div>

            <p>
              On retrouve bien le coefficient directeur de la tangente \\( T(x)=-x+1 \\).
            </p>
          `
        }
      ]
    },

    {
      id: "td2-ex1-asymptotes",
      title: "Étude de fonction — Asymptotes",
      difficulty: "Base",
      statement: `
        <p>
          Soit \\( f \\) la fonction définie sur \\( \\mathbb{R}\\setminus\\{2\\} \\) par :
        </p>

        <div class="math-box">
          \\[
            f(x)=\\frac{3x+1}{2-x}
          \\]
        </div>

        <ol>
          <li>Démontrer que la droite \\( y=-3 \\) est asymptote horizontale en \\( +\\infty \\) et en \\( -\\infty \\).</li>
          <li>Étudier la position de la courbe par rapport à cette asymptote.</li>
          <li>Justifier que la droite \\( x=2 \\) est asymptote verticale.</li>
        </ol>
      `,
      hints: [
        "Pour une asymptote horizontale \\( y=a \\), étudie \\( f(x)-a \\).",
        "Ici, calcule \\( f(x)+3 \\).",
        "Pour l’asymptote verticale, regarde les limites lorsque \\( x \\to 2^- \\) et \\( x \\to 2^+ \\)."
      ],
      correctionSteps: [
        {
          title: "Étude de \\( f(x)+3 \\)",
          html: `
            <p>
              On calcule l’écart entre la fonction et la droite \\( y=-3 \\).
            </p>

            <div class="math-box">
              \\[
                f(x)-(-3)
                =
                \\frac{3x+1}{2-x}+3
              \\]
            </div>

            <div class="math-box">
              \\[
                f(x)+3
                =
                \\frac{3x+1+3(2-x)}{2-x}
                =
                \\frac{7}{2-x}
              \\]
            </div>
          `
        },
        {
          title: "Asymptote horizontale",
          html: `
            <p>
              Lorsque \\( x \\to +\\infty \\) ou \\( x \\to -\\infty \\), on a :
            </p>

            <div class="math-box">
              \\[
                \\frac{7}{2-x}\\longrightarrow 0
              \\]
            </div>

            <p>
              Donc :
            </p>

            <div class="math-box">
              \\[
                y=-3
              \\]
            </div>

            <p>
              est une asymptote horizontale en \\( +\\infty \\) et en \\( -\\infty \\).
            </p>
          `
        },
        {
          title: "Position relative",
          html: `
            <p>
              On utilise le signe de :
            </p>

            <div class="math-box">
              \\[
                f(x)+3=\\frac{7}{2-x}
              \\]
            </div>

            <p>
              En \\( +\\infty \\), \\( 2-x<0 \\), donc \\( f(x)+3<0 \\).
              La courbe est sous l’asymptote.
            </p>

            <p>
              En \\( -\\infty \\), \\( 2-x>0 \\), donc \\( f(x)+3>0 \\).
              La courbe est au-dessus de l’asymptote.
            </p>
          `
        },
        {
          title: "Asymptote verticale",
          html: `
            <p>
              La valeur \\( x=2 \\) est interdite car le dénominateur s’annule.
            </p>

            <div class="math-box">
              \\[
                \\lim_{x\\to 2^-} f(x)=+\\infty
                \\qquad
                \\lim_{x\\to 2^+} f(x)=-\\infty
              \\]
            </div>

            <p>
              Donc la droite :
            </p>

            <div class="math-box">
              \\[
                x=2
              \\]
            </div>

            <p>
              est une asymptote verticale.
            </p>
          `
        }
      ]
    },

    {
      id: "td2-ex3-puissance-wifi",
      title: "Étude de la puissance transmise à une antenne WiFi",
      difficulty: "Application R&T",
      statement: `
        <p>
          Un amplificateur de puissance débite dans une antenne WiFi.
        </p>

        <ul>
          <li>Tension à vide : \\( V_s=0,5\\,V \\)</li>
          <li>Résistance de sortie : \\( R_s=50\\,\\Omega \\)</li>
          <li>Résistance équivalente de l’antenne : \\( R_a \\)</li>
        </ul>

        <p>
          La puissance transmise à l’antenne est :
        </p>

        <div class="math-box">
          \\[
            P_a(R_a)=
            \\frac{R_a}{(R_a+R_s)^2}V_s^2
          \\]
        </div>

        <ol>
          <li>Calculer la dérivée de \\( P_a \\) par rapport à \\( R_a \\).</li>
          <li>Faire le tableau de variation.</li>
          <li>Déterminer pour quelle valeur de \\( R_a \\) la puissance est maximale.</li>
        </ol>
      `,
      hints: [
        "Considère \\( V_s^2 \\) comme une constante.",
        "Tu peux écrire \\( P_a(R_a)=V_s^2 R_a(R_a+R_s)^{-2} \\).",
        "Le maximum apparaît lorsque \\( R_a=R_s \\), ce qui correspond à l’adaptation d’impédance."
      ],
      correctionSteps: [
        {
          title: "Réécriture de la fonction",
          html: `
            <p>
              On écrit la fonction sous une forme plus facile à dériver :
            </p>

            <div class="math-box">
              \\[
                P_a(R_a)=V_s^2 R_a(R_a+R_s)^{-2}
              \\]
            </div>

            <p>
              Ici, \\( V_s^2 \\) et \\( R_s \\) sont des constantes.
            </p>
          `
        },
        {
          title: "Dérivée",
          html: `
            <p>
              On dérive comme un produit :
            </p>

            <div class="math-box">
              \\[
                P_a'(R_a)
                =
                V_s^2
                \\left[
                  (R_a+R_s)^{-2}
                  -
                  2R_a(R_a+R_s)^{-3}
                \\right]
              \\]
            </div>

            <p>
              On factorise :
            </p>

            <div class="math-box">
              \\[
                P_a'(R_a)
                =
                V_s^2
                \\frac{R_s-R_a}{(R_a+R_s)^3}
              \\]
            </div>
          `
        },
        {
          title: "Signe de la dérivée",
          html: `
            <p>
              Comme \\( V_s^2>0 \\) et \\( (R_a+R_s)^3>0 \\) pour \\( R_a>0 \\),
              le signe de \\( P_a'(R_a) \\) dépend de :
            </p>

            <div class="math-box">
              \\[
                R_s-R_a
              \\]
            </div>

            <ul>
              <li>Si \\( R_a<R_s \\), alors \\( P_a'(R_a)>0 \\).</li>
              <li>Si \\( R_a=R_s \\), alors \\( P_a'(R_a)=0 \\).</li>
              <li>Si \\( R_a>R_s \\), alors \\( P_a'(R_a)<0 \\).</li>
            </ul>
          `
        },
        {
          title: "Maximum de puissance",
          html: `
            <p>
              La puissance augmente jusqu’à \\( R_a=R_s \\), puis diminue.
              Le maximum est donc atteint pour :
            </p>

            <div class="math-box">
              \\[
                R_a=R_s
              \\]
            </div>

            <p>
              Avec \\( R_s=50\\,\\Omega \\), on obtient :
            </p>

            <div class="math-box">
              \\[
                R_a=50\\,\\Omega
              \\]
            </div>

            <p>
              C’est le principe d’adaptation d’impédance.
            </p>
          `
        }
      ]
    }
  ],

  "complexes": [
    {
      id: "complexes-forme-algebrique",
      title: "Nombres complexes — Forme algébrique",
      difficulty: "Base",
      statement: `
        <p>
          Soit un nombre complexe :
        </p>

        <div class="math-box">
          \\[
            z = 3 - 4i
          \\]
        </div>

        <ol>
          <li>Donner sa partie réelle.</li>
          <li>Donner sa partie imaginaire.</li>
          <li>Calculer son module.</li>
        </ol>
      `,
      hints: [
        "Dans \\( z=a+ib \\), la partie réelle est \\( a \\) et la partie imaginaire est \\( b \\).",
        "Le module se calcule avec \\( |z|=\\sqrt{a^2+b^2} \\)."
      ],
      correctionSteps: [
        {
          title: "Parties réelle et imaginaire",
          html: `
            <p>
              On compare \\( z=3-4i \\) avec \\( z=a+ib \\).
            </p>

            <div class="math-box">
              \\[
                a=3
                \\qquad
                b=-4
              \\]
            </div>

            <p>
              Donc :
            </p>

            <div class="math-box">
              \\[
                \\operatorname{Re}(z)=3
                \\qquad
                \\operatorname{Im}(z)=-4
              \\]
            </div>
          `
        },
        {
          title: "Module",
          html: `
            <div class="math-box">
              \\[
                |z|=\\sqrt{3^2+(-4)^2}
                =
                \\sqrt{9+16}
                =
                5
              \\]
            </div>
          `
        }
      ]
    }
  ],

  "integrales": [
    {
      id: "integrales-primitive-base",
      title: "Primitives — Calcul direct",
      difficulty: "Base",
      statement: `
        <p>
          Déterminer une primitive de la fonction :
        </p>

        <div class="math-box">
          \\[
            f(x)=3x^2-4x+1
          \\]
        </div>
      `,
      hints: [
        "On cherche une fonction \\( F \\) telle que \\( F'(x)=f(x) \\).",
        "Utilise la règle inverse : une primitive de \\( x^n \\) est \\( \\frac{x^{n+1}}{n+1} \\)."
      ],
      correctionSteps: [
        {
          title: "Primitive terme à terme",
          html: `
            <div class="math-box">
              \\[
                \\int 3x^2\\,dx=x^3
              \\]
            </div>

            <div class="math-box">
              \\[
                \\int -4x\\,dx=-2x^2
              \\]
            </div>

            <div class="math-box">
              \\[
                \\int 1\\,dx=x
              \\]
            </div>
          `
        },
        {
          title: "Résultat",
          html: `
            <p>
              Une primitive est donc :
            </p>

            <div class="math-box">
              \\[
                F(x)=x^3-2x^2+x
              \\]
            </div>

            <p>
              La primitive générale est :
            </p>

            <div class="math-box">
              \\[
                F(x)=x^3-2x^2+x+C
              \\]
            </div>
          `
        }
      ]
    }
  ],

  "fonctions-usuelles": [],
  "polynomes": []
};
