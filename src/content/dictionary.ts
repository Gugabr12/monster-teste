/**
 * Every visible string, per language. Portuguese is the source of truth: `Dict`
 * is derived from it, so a missing or misspelt key in any other language is a
 * type error rather than a blank on the page.
 *
 * Product names (Monster Energy, Ultra Paradise, …) are brand and stay put.
 */

// The artboard reuses one paragraph across the last Ultra panels; keeping it in
// a const means a real description only has to be written once per language.
const PT_SUMMER =
  "Sob o céu noturno iluminado por fogos de artifício, você tem sua paixão ao seu lado. Com boa música e melhores amigos, é o melhor verão de todos os tempos. Ultra Watermelon é verão em lata, para que você possa apreciá-lo a qualquer hora. Sem açúcar, sabor refrescante, com a mistura explosiva de energia Monster para iluminar as noites quentes de verão.";
const PT_ANIMAL =
  "Surpreenda-se com a lata do energético mais animal do planeta. Com duas vezes mais energia do que uma bebida energética regular, Monster possui uma presença marcante e um sabor único, inconfundível.";

export const pt = {
  nav: {
    home: "Monster Energy — início",
    bebidas: "Bebidas",
    atletas: "Atletas",
    eventos: "Eventos",
    novidades: "Novidades",
    openMenu: "Abrir menu",
    changeLanguage: "Trocar idioma",
  },
  hero: {
    titleAccent: "Energia",
    titleRest: "para o seu mundo",
    tagline: "Monster é energia para quem vive no máximo.",
    cta: "Compra Online",
    slides: "Destaques",
    goToSlide: (n: number) => `Ir para o destaque ${n}`,
  },
  products: {
    line1: "Encontre a",
    line2: "sua Monster.",
    action: "[VER TODOS]",
  },
  athletes: { title: "Atletas", action: "[VER TODOS]" },
  activities: {
    line1: "Se acontece,",
    line2: "a gente tá lá.",
    action: "[TODAS AS ATIVIDADES]",
    dragHint: "Arraste os cards para navegar entre as novidades.",
    items: [
      {
        category: "Ação / Atletas",
        headline: "O elenco Monster Energy que domina cada modalidade",
      },
      {
        category: "Ação / Skateboard",
        headline: "Atletas da Monster Energy conquistam medalhas de ouro",
      },
      {
        category: "Ação / Surfe",
        headline: "Monster Energy nas ondas: os drops mais insanos do ano",
      },
      {
        category: "Ação / Bastidores",
        headline: "Um dia na estrada com os atletas Monster Energy",
      },
      {
        category: "Ação / X Games",
        headline: "A noite em que o vert virou show no Caesars Superdome",
      },
      {
        category: "Ação / Surfe",
        headline: "O aéreo perfeito que fechou a etapa do campeonato",
      },
    ],
  },
  footer: {
    columns: [
      { title: "A empresa", links: ["Carreiras", "Sobre nós", "Monster Army"] },
      {
        title: "Suporte",
        links: ["Perguntas Frequentes", "Entre em contato"],
      },
    ],
    legal: [
      "© Monster Energy Company",
      "Todos os direitos reservados",
      "Termos de uso",
      "Política de privacidade",
      "Política de cookies",
      "Não venda minhas informações",
    ],
  },
  drinks: {
    chooseCategory: "Escolha uma categoria",
    prompt:
      "Selecione uma categoria acima para ver os sabores e as informações das latas.",
    comingSoon: "Sabores desta categoria em breve.",
    allCategories: "[ Todas as categorias ]",
    aboutFlavour: "Sobre o sabor:",
    nutrition: "Tabela nutricional",
    buy: "Compra Online",
  },
  flavours: {
    "energy-original": {
      taste: "Sabor de Monster é ao mesmo tempo marcante e suave.",
      description: PT_ANIMAL,
    },
    "energy-zero": {
      taste: "Toda a força da Monster, agora sem açúcar e sem calorias.",
      description:
        "A mesma explosão de energia da Monster original, com zero açúcar. Refrescante, encorpada e com aquele sabor cítrico que refresca a cada gole — para quem quer performance sem abrir mão de nada.",
    },
    "energy-paradise": {
      taste: "Cítrica e refrescante, com kiwi, limão e um toque de cactos.",
      description:
        "Leve, seca e sem açúcar. A Ultra Paradise entrega a energia da Monster com um sabor tropical e crocante — perfeita pra quem quer refrescância sem peso.",
    },
    "ultra-white": {
      taste: "Sabor cítrico. Sem açúcar!",
      description:
        "Mais refrescante. Mais leve. Monster Energy Zero Ultra é zero açúcar e uma carga completa de nossa mistura de energia Monster.",
    },
    "ultra-violet": {
      taste: "Sabor de Monster é ao mesmo tempo marcante e suave.",
      description: PT_ANIMAL,
    },
    "ultra-watermelon": {
      taste: "Melancia refrescante",
      description: PT_SUMMER,
    },
    "ultra-peachy": {
      taste: "Sabor pêssego com o blend secreto Monster Energy",
      description: PT_SUMMER,
    },
    "ultra-mango": {
      taste: "Sabor tropical de manga",
      description: PT_SUMMER,
    },
    "ultra-mango-2": {
      taste: "Sabor tropical de manga",
      description: PT_SUMMER,
    },
  },
};

export type Dict = typeof pt;
export type Lang = "pt" | "en" | "es" | "fr" | "de";

const EN_SUMMER =
  "Under a night sky lit by fireworks, with your passion right beside you. Good music, better friends — the best summer there ever was. Ultra Watermelon is summer in a can, so you can reach for it any time of year. Zero sugar, a refreshing taste and the explosive Monster energy blend to light up warm summer nights.";
const EN_ANIMAL =
  "Meet the most animal energy drink on the planet. With twice the energy of a regular energy drink, Monster has a presence you notice and a taste you will never mistake for anything else.";

export const en: Dict = {
  nav: {
    home: "Monster Energy — home",
    bebidas: "Drinks",
    atletas: "Athletes",
    eventos: "Events",
    novidades: "News",
    openMenu: "Open menu",
    changeLanguage: "Change language",
  },
  hero: {
    titleAccent: "Energy",
    titleRest: "for your world",
    tagline: "Monster is energy for people who live at full throttle.",
    cta: "Buy Online",
    slides: "Highlights",
    goToSlide: (n: number) => `Go to highlight ${n}`,
  },
  products: { line1: "Find your", line2: "Monster.", action: "[SEE ALL]" },
  athletes: { title: "Athletes", action: "[SEE ALL]" },
  activities: {
    line1: "If it happens,",
    line2: "we are there.",
    action: "[ALL ACTIVITIES]",
    dragHint: "Drag the cards to move through the stories.",
    items: [
      {
        category: "Action / Athletes",
        headline: "The Monster Energy roster that owns every discipline",
      },
      {
        category: "Action / Skateboard",
        headline: "Monster Energy athletes take gold",
      },
      {
        category: "Action / Surf",
        headline: "Monster Energy on the water: the wildest drops of the year",
      },
      {
        category: "Action / Backstage",
        headline: "A day on the road with the Monster Energy athletes",
      },
      {
        category: "Action / X Games",
        headline: "The night vert stole the show at the Caesars Superdome",
      },
      {
        category: "Action / Surf",
        headline: "The perfect air that closed out the championship stop",
      },
    ],
  },
  footer: {
    columns: [
      { title: "The company", links: ["Careers", "About us", "Monster Army"] },
      { title: "Support", links: ["Frequently asked questions", "Contact us"] },
    ],
    legal: [
      "© Monster Energy Company",
      "All rights reserved",
      "Terms of use",
      "Privacy policy",
      "Cookie policy",
      "Do not sell my information",
    ],
  },
  drinks: {
    chooseCategory: "Choose a category",
    prompt:
      "Pick a category above to see the flavours and the details on each can.",
    comingSoon: "Flavours in this category are coming soon.",
    allCategories: "[ All categories ]",
    aboutFlavour: "About the flavour:",
    nutrition: "Nutrition facts",
    buy: "Buy Online",
  },
  flavours: {
    "energy-original": {
      taste: "The Monster taste is bold and smooth at the same time.",
      description: EN_ANIMAL,
    },
    "energy-zero": {
      taste: "All the force of Monster, now with no sugar and no calories.",
      description:
        "The same burst of energy as the original Monster, with zero sugar. Refreshing, full-bodied and with a citrus edge on every sip — for anyone who wants performance without giving anything up.",
    },
    "energy-paradise": {
      taste: "Citrus and refreshing, with kiwi, lime and a touch of cactus.",
      description:
        "Light, dry and sugar free. Ultra Paradise delivers Monster energy with a crisp tropical taste — for refreshment that never weighs you down.",
    },
    "ultra-white": {
      taste: "Citrus flavour. Sugar free!",
      description:
        "More refreshing. Lighter. Monster Energy Zero Ultra is zero sugar and a full load of our Monster energy blend.",
    },
    "ultra-violet": {
      taste: "The Monster taste is bold and smooth at the same time.",
      description: EN_ANIMAL,
    },
    "ultra-watermelon": {
      taste: "Refreshing watermelon",
      description: EN_SUMMER,
    },
    "ultra-peachy": {
      taste: "Peach flavour with the secret Monster Energy blend",
      description: EN_SUMMER,
    },
    "ultra-mango": { taste: "Tropical mango flavour", description: EN_SUMMER },
    "ultra-mango-2": {
      taste: "Tropical mango flavour",
      description: EN_SUMMER,
    },
  },
};

const ES_SUMMER =
  "Bajo un cielo nocturno iluminado por fuegos artificiales, con tu pasión al lado. Buena música y mejores amigos: el mejor verano de todos. Ultra Watermelon es verano en lata, para disfrutarlo en cualquier momento del año. Sin azúcar, sabor refrescante y la mezcla explosiva de energía Monster para encender las noches cálidas.";
const ES_ANIMAL =
  "Sorpréndete con la lata de la bebida energética más animal del planeta. Con el doble de energía que una bebida energética normal, Monster tiene una presencia que se nota y un sabor único, inconfundible.";

export const es: Dict = {
  nav: {
    home: "Monster Energy — inicio",
    bebidas: "Bebidas",
    atletas: "Atletas",
    eventos: "Eventos",
    novidades: "Novedades",
    openMenu: "Abrir menú",
    changeLanguage: "Cambiar idioma",
  },
  hero: {
    titleAccent: "Energía",
    titleRest: "para tu mundo",
    tagline: "Monster es energía para quien vive al máximo.",
    cta: "Compra Online",
    slides: "Destacados",
    goToSlide: (n: number) => `Ir al destacado ${n}`,
  },
  products: { line1: "Encuentra tu", line2: "Monster.", action: "[VER TODAS]" },
  athletes: { title: "Atletas", action: "[VER TODOS]" },
  activities: {
    line1: "Si pasa,",
    line2: "ahí estamos.",
    action: "[TODAS LAS ACTIVIDADES]",
    dragHint: "Arrastra las tarjetas para recorrer las novedades.",
    items: [
      {
        category: "Acción / Atletas",
        headline: "El plantel Monster Energy que domina cada disciplina",
      },
      {
        category: "Acción / Skateboard",
        headline: "Los atletas de Monster Energy se llevan el oro",
      },
      {
        category: "Acción / Surf",
        headline: "Monster Energy en el agua: los drops más locos del año",
      },
      {
        category: "Acción / Backstage",
        headline: "Un día en la ruta con los atletas Monster Energy",
      },
      {
        category: "Acción / X Games",
        headline:
          "La noche en que el vert se robó el show en el Caesars Superdome",
      },
      {
        category: "Acción / Surf",
        headline: "El aéreo perfecto que cerró la etapa del campeonato",
      },
    ],
  },
  footer: {
    columns: [
      {
        title: "La empresa",
        links: ["Empleo", "Sobre nosotros", "Monster Army"],
      },
      { title: "Soporte", links: ["Preguntas frecuentes", "Contacto"] },
    ],
    legal: [
      "© Monster Energy Company",
      "Todos los derechos reservados",
      "Términos de uso",
      "Política de privacidad",
      "Política de cookies",
      "No vendan mi información",
    ],
  },
  drinks: {
    chooseCategory: "Elige una categoría",
    prompt:
      "Selecciona una categoría arriba para ver los sabores y la información de cada lata.",
    comingSoon: "Los sabores de esta categoría llegan muy pronto.",
    allCategories: "[ Todas las categorías ]",
    aboutFlavour: "Sobre el sabor:",
    nutrition: "Tabla nutricional",
    buy: "Compra Online",
  },
  flavours: {
    "energy-original": {
      taste: "El sabor de Monster es intenso y suave a la vez.",
      description: ES_ANIMAL,
    },
    "energy-zero": {
      taste: "Toda la fuerza de Monster, ahora sin azúcar y sin calorías.",
      description:
        "La misma explosión de energía de la Monster original, con cero azúcar. Refrescante, con cuerpo y ese toque cítrico en cada sorbo, para quien quiere rendimiento sin renunciar a nada.",
    },
    "energy-paradise": {
      taste: "Cítrica y refrescante, con kiwi, lima y un toque de cactus.",
      description:
        "Ligera, seca y sin azúcar. Ultra Paradise entrega la energía de Monster con un sabor tropical y crujiente, para refrescarte sin pesadez.",
    },
    "ultra-white": {
      taste: "Sabor cítrico. ¡Sin azúcar!",
      description:
        "Más refrescante. Más ligera. Monster Energy Zero Ultra es cero azúcar y una carga completa de nuestra mezcla de energía Monster.",
    },
    "ultra-violet": {
      taste: "El sabor de Monster es intenso y suave a la vez.",
      description: ES_ANIMAL,
    },
    "ultra-watermelon": {
      taste: "Sandía refrescante",
      description: ES_SUMMER,
    },
    "ultra-peachy": {
      taste: "Sabor durazno con la mezcla secreta de Monster Energy",
      description: ES_SUMMER,
    },
    "ultra-mango": {
      taste: "Sabor tropical de mango",
      description: ES_SUMMER,
    },
    "ultra-mango-2": {
      taste: "Sabor tropical de mango",
      description: ES_SUMMER,
    },
  },
};

const FR_SUMMER =
  "Sous un ciel de nuit illuminé par les feux d'artifice, ta passion juste à côté de toi. De la bonne musique, de meilleurs amis : le plus bel été de tous les temps. Ultra Watermelon, c'est l'été en canette, à savourer à n'importe quel moment de l'année. Sans sucre, un goût rafraîchissant et le mélange explosif d'énergie Monster pour éclairer les nuits chaudes.";
const FR_ANIMAL =
  "Découvre la canette de la boisson énergisante la plus animale de la planète. Avec deux fois plus d'énergie qu'une boisson énergisante classique, Monster a une présence qui se remarque et un goût unique, inimitable.";

export const fr: Dict = {
  nav: {
    home: "Monster Energy — accueil",
    bebidas: "Boissons",
    atletas: "Athlètes",
    eventos: "Événements",
    novidades: "Actualités",
    openMenu: "Ouvrir le menu",
    changeLanguage: "Changer de langue",
  },
  hero: {
    titleAccent: "Énergie",
    titleRest: "pour ton monde",
    tagline: "Monster, c'est l'énergie de ceux qui vivent à fond.",
    cta: "Acheter en ligne",
    slides: "À la une",
    goToSlide: (n: number) => `Aller à la une ${n}`,
  },
  products: { line1: "Trouve ta", line2: "Monster.", action: "[TOUT VOIR]" },
  athletes: { title: "Athlètes", action: "[TOUT VOIR]" },
  activities: {
    line1: "Si ça arrive,",
    line2: "on est là.",
    action: "[TOUTES LES ACTIVITÉS]",
    dragHint: "Fais glisser les cartes pour parcourir les actualités.",
    items: [
      {
        category: "Action / Athlètes",
        headline: "L'équipe Monster Energy qui domine chaque discipline",
      },
      {
        category: "Action / Skateboard",
        headline: "Les athlètes Monster Energy décrochent l'or",
      },
      {
        category: "Action / Surf",
        headline: "Monster Energy sur l'eau : les drops les plus fous de l'année",
      },
      {
        category: "Action / Coulisses",
        headline: "Une journée sur la route avec les athlètes Monster Energy",
      },
      {
        category: "Action / X Games",
        headline: "La nuit où le vert a volé la vedette au Caesars Superdome",
      },
      {
        category: "Action / Surf",
        headline: "L'aérien parfait qui a clôturé l'étape du championnat",
      },
    ],
  },
  footer: {
    columns: [
      {
        title: "L'entreprise",
        links: ["Carrières", "À propos", "Monster Army"],
      },
      { title: "Assistance", links: ["Questions fréquentes", "Nous contacter"] },
    ],
    legal: [
      "© Monster Energy Company",
      "Tous droits réservés",
      "Conditions d'utilisation",
      "Politique de confidentialité",
      "Politique de cookies",
      "Ne pas vendre mes informations",
    ],
  },
  drinks: {
    chooseCategory: "Choisis une catégorie",
    prompt:
      "Sélectionne une catégorie ci-dessus pour voir les saveurs et les informations de chaque canette.",
    comingSoon: "Les saveurs de cette catégorie arrivent bientôt.",
    allCategories: "[ Toutes les catégories ]",
    aboutFlavour: "À propos de la saveur :",
    nutrition: "Valeurs nutritionnelles",
    buy: "Acheter en ligne",
  },
  flavours: {
    "energy-original": {
      taste: "Le goût Monster est à la fois puissant et doux.",
      description: FR_ANIMAL,
    },
    "energy-zero": {
      taste: "Toute la force de Monster, sans sucre et sans calories.",
      description:
        "La même explosion d'énergie que la Monster originale, avec zéro sucre. Rafraîchissante, avec du corps et cette pointe d'agrumes à chaque gorgée — pour qui veut la performance sans rien sacrifier.",
    },
    "energy-paradise": {
      taste: "Agrumes et fraîcheur, avec kiwi, citron vert et une touche de cactus.",
      description:
        "Légère, sèche et sans sucre. Ultra Paradise apporte l'énergie Monster avec un goût tropical et vif — pour une fraîcheur qui ne pèse jamais.",
    },
    "ultra-white": {
      taste: "Goût agrumes. Sans sucre !",
      description:
        "Plus rafraîchissante. Plus légère. Monster Energy Zero Ultra, c'est zéro sucre et une dose complète de notre mélange d'énergie Monster.",
    },
    "ultra-violet": {
      taste: "Le goût Monster est à la fois puissant et doux.",
      description: FR_ANIMAL,
    },
    "ultra-watermelon": {
      taste: "Pastèque rafraîchissante",
      description: FR_SUMMER,
    },
    "ultra-peachy": {
      taste: "Goût pêche avec le mélange secret Monster Energy",
      description: FR_SUMMER,
    },
    "ultra-mango": {
      taste: "Goût tropical de mangue",
      description: FR_SUMMER,
    },
    "ultra-mango-2": {
      taste: "Goût tropical de mangue",
      description: FR_SUMMER,
    },
  },
};

const DE_SUMMER =
  "Unter einem von Feuerwerk erhellten Nachthimmel, deine Leidenschaft direkt neben dir. Gute Musik, bessere Freunde — der beste Sommer aller Zeiten. Ultra Watermelon ist Sommer in der Dose, für jeden Moment im Jahr. Ohne Zucker, erfrischend im Geschmack und mit dem explosiven Monster Energy Blend für warme Sommernächte.";
const DE_ANIMAL =
  "Lern die tierischste Energy-Dose des Planeten kennen. Mit doppelt so viel Energie wie ein normaler Energydrink hat Monster eine Präsenz, die auffällt, und einen Geschmack, den du nie verwechselst.";

export const de: Dict = {
  nav: {
    home: "Monster Energy — Startseite",
    bebidas: "Getränke",
    atletas: "Athleten",
    eventos: "Events",
    novidades: "Neuigkeiten",
    openMenu: "Menü öffnen",
    changeLanguage: "Sprache wechseln",
  },
  hero: {
    titleAccent: "Energie",
    titleRest: "für deine Welt",
    tagline: "Monster ist Energie für alle, die Vollgas leben.",
    cta: "Online kaufen",
    slides: "Highlights",
    goToSlide: (n: number) => `Zu Highlight ${n}`,
  },
  products: { line1: "Finde deine", line2: "Monster.", action: "[ALLE ANSEHEN]" },
  athletes: { title: "Athleten", action: "[ALLE ANSEHEN]" },
  activities: {
    line1: "Wenn es passiert,",
    line2: "sind wir da.",
    action: "[ALLE AKTIVITÄTEN]",
    dragHint: "Zieh die Karten, um durch die Neuigkeiten zu blättern.",
    items: [
      {
        category: "Action / Athleten",
        headline: "Das Monster Energy Team, das jede Disziplin beherrscht",
      },
      {
        category: "Action / Skateboard",
        headline: "Monster Energy Athleten holen Gold",
      },
      {
        category: "Action / Surfen",
        headline: "Monster Energy auf dem Wasser: die wildesten Drops des Jahres",
      },
      {
        category: "Action / Backstage",
        headline: "Ein Tag on the Road mit den Monster Energy Athleten",
      },
      {
        category: "Action / X Games",
        headline: "Die Nacht, in der Vert im Caesars Superdome alles überstrahlte",
      },
      {
        category: "Action / Surfen",
        headline: "Der perfekte Air zum Abschluss der Championship-Etappe",
      },
    ],
  },
  footer: {
    columns: [
      {
        title: "Das Unternehmen",
        links: ["Karriere", "Über uns", "Monster Army"],
      },
      { title: "Support", links: ["Häufige Fragen", "Kontakt"] },
    ],
    legal: [
      "© Monster Energy Company",
      "Alle Rechte vorbehalten",
      "Nutzungsbedingungen",
      "Datenschutzerklärung",
      "Cookie-Richtlinie",
      "Meine Daten nicht verkaufen",
    ],
  },
  drinks: {
    chooseCategory: "Wähle eine Kategorie",
    prompt:
      "Wähle oben eine Kategorie, um die Sorten und die Angaben zu jeder Dose zu sehen.",
    comingSoon: "Sorten dieser Kategorie folgen in Kürze.",
    allCategories: "[ Alle Kategorien ]",
    aboutFlavour: "Über den Geschmack:",
    nutrition: "Nährwerte",
    buy: "Online kaufen",
  },
  flavours: {
    "energy-original": {
      taste: "Der Monster Geschmack ist kräftig und weich zugleich.",
      description: DE_ANIMAL,
    },
    "energy-zero": {
      taste: "Die volle Kraft von Monster, jetzt ohne Zucker und ohne Kalorien.",
      description:
        "Derselbe Energieschub wie beim Original, mit null Zucker. Erfrischend, vollmundig und mit dieser Zitrusnote in jedem Schluck — für alle, die Leistung wollen, ohne auf etwas zu verzichten.",
    },
    "energy-paradise": {
      taste: "Zitrisch und erfrischend, mit Kiwi, Limette und einem Hauch Kaktus.",
      description:
        "Leicht, trocken und zuckerfrei. Ultra Paradise liefert Monster Energie mit einem frischen tropischen Geschmack — Erfrischung, die nie schwer im Magen liegt.",
    },
    "ultra-white": {
      taste: "Zitrusgeschmack. Zuckerfrei!",
      description:
        "Erfrischender. Leichter. Monster Energy Zero Ultra ist zuckerfrei und liefert die volle Ladung unseres Monster Energy Blends.",
    },
    "ultra-violet": {
      taste: "Der Monster Geschmack ist kräftig und weich zugleich.",
      description: DE_ANIMAL,
    },
    "ultra-watermelon": {
      taste: "Erfrischende Wassermelone",
      description: DE_SUMMER,
    },
    "ultra-peachy": {
      taste: "Pfirsichgeschmack mit dem geheimen Monster Energy Blend",
      description: DE_SUMMER,
    },
    "ultra-mango": {
      taste: "Tropischer Mangogeschmack",
      description: DE_SUMMER,
    },
    "ultra-mango-2": {
      taste: "Tropischer Mangogeschmack",
      description: DE_SUMMER,
    },
  },
};

export const dictionaries: Record<Lang, Dict> = { pt, en, es, fr, de };
