/* Vicino — logique de l’application : annonces, recherche, profils, rendez-vous (données en localStorage) */

const icons = {
  Oggetti:
    '<g fill="none" stroke="#b6ff65" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M35 40l40-20 40 20v45L75 108 35 85Z M35 40l40 22 40-22 M75 62v46"/></g>',
  Tecnologia:
    '<g fill="none" stroke="#b6ff65" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="28" y="25" width="94" height="62" rx="7"/><path d="M17 100h116 M62 43l-12 12 12 12 M88 43l12 12-12 12"/></g>',
  "Casa e giardino":
    '<g fill="none" stroke="#b6ff65" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M25 60l50-38 50 38 M38 53v49h74V53 M65 102V75h20v27 M75 52c-28 0-25-25-25-25 25 0 25 25 25 25Z"/></g>',
  Mobilità:
    '<g fill="none" stroke="#b6ff65" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="40" cy="83" r="23"/><circle cx="113" cy="83" r="23"/><path d="M40 83l25-40 23 40H40 M88 83l18-51h-16 M58 43h21"/></g>',
  Studio:
    '<g fill="none" stroke="#b6ff65" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M75 105V32c-17-14-42-10-53-4v67c21-7 38-1 53 10Z M75 105V32c17-14 42-10 53-4v67c-21-7-38-1-53 10Z"/></g>',
  Sport:
    '<g fill="none" stroke="#b6ff65" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="75" cy="62" r="43"/><path d="M32 62h86 M75 19c-30 25-30 62 0 86 M75 19c30 25 30 62 0 86"/></g>',
  Creatività:
    '<g fill="none" stroke="#b6ff65" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M45 80l45-54 18 16-45 54Z M90 26l8-9 18 16-8 9 M45 80l18 16-30 12Z M29 108h92"/></g>',
  Aiuto:
    '<g fill="none" stroke="#b6ff65" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M75 105S20 72 20 43c0-27 39-29 55-4 16-25 55-23 55 4 0 29-55 62-55 62Z"/></g>',
};
const base = [
  {
    id: 1,
    name: "Luca",
    category: "Oggetti",
    title: "Un trapano per i tuoi progetti.",
    description:
      "Presto il mio trapano e alcune punte per piccoli lavori in casa.",
    tag: "In prestito",
    bio: "Mi piace costruire e dare una seconda vita agli oggetti.",
  },
  {
    id: 2,
    name: "Giulia",
    category: "Tecnologia",
    title: "Il computer fa i capricci?",
    description:
      "Ti aiuto a organizzare file, usare il computer e ritrovare spazio sul disco.",
    tag: "Offro aiuto",
    bio: "Appassionata di informatica e soluzioni semplici.",
  },
  {
    id: 3,
    name: "Marco",
    category: "Casa e giardino",
    title: "Una mano con le piante.",
    description:
      "Cerco qualcuno che annaffi le piante durante il fine settimana.",
    tag: "Cerco aiuto",
    bio: "Un piccolo balcone, tante piante e voglia di imparare.",
  },
  {
    id: 4,
    name: "Sofia",
    category: "Studio",
    title: "Una nuova storia ti aspetta.",
    description:
      "Presto libri di avventura e romanzi: scegli una lettura e riportala con cura.",
    tag: "In prestito",
    bio: "Leggo, studio e condivido le storie che mi piacciono.",
  },
  {
    id: 5,
    name: "Andrea",
    category: "Mobilità",
    title: "Ripariamo la tua bicicletta.",
    description:
      "Ti mostro come gonfiare le gomme e fare piccoli controlli sulla bici.",
    tag: "Offro aiuto",
    bio: "Sempre in bicicletta, anche per i piccoli spostamenti.",
  },
  {
    id: 6,
    name: "Anna",
    category: "Aiuto",
    title: "Due parole in italiano?",
    description:
      "Propongo una conversazione in italiano per chi vuole esercitarsi senza paura.",
    tag: "Offro tempo",
    bio: "Mi piace incontrare persone e imparare nuove lingue.",
  },
  {
    id: 7,
    name: "Matteo",
    category: "Sport",
    title: "Una racchetta per iniziare.",
    description:
      "Presto una racchetta da tennis per una prima partita tra amici.",
    tag: "In prestito",
    bio: "Lo sport è più bello quando lo condividi.",
  },
  {
    id: 8,
    name: "Chiara",
    category: "Creatività",
    title: "La tua prima foto, fatta meglio.",
    description:
      "Condivido consigli per comporre una foto e usare la luce naturale.",
    tag: "Offro competenze",
    bio: "Cerco i dettagli che rendono speciale una fotografia.",
  },
  {
    id: 9,
    name: "Davide",
    category: "Oggetti",
    title: "Una valigia per il weekend.",
    description:
      "Una valigia piccola disponibile per un viaggio breve. Da restituire pulita.",
    tag: "In prestito",
    bio: "Preferisco prestare le cose invece di lasciarle ferme.",
  },
  {
    id: 10,
    name: "Elena",
    category: "Tecnologia",
    title: "Presentazioni senza stress.",
    description:
      "Ti aiuto a preparare diapositive chiare e a organizzare un documento digitale.",
    tag: "Offro competenze",
    bio: "La tecnologia deve rendere tutto più semplice.",
  },
  {
    id: 11,
    name: "Paolo",
    category: "Casa e giardino",
    title: "Un kit per il tuo balcone.",
    description:
      "Presto piccoli attrezzi da giardinaggio per rinvasare e curare le piante.",
    tag: "In prestito",
    bio: "Il mio posto preferito è tra vasi e terra.",
  },
  {
    id: 12,
    name: "Francesca",
    category: "Mobilità",
    title: "Una pompa per ripartire.",
    description:
      "Presto una pompa per bicicletta con adattatori per le valvole più comuni.",
    tag: "In prestito",
    bio: "Piccole riparazioni, grandi giri in bici.",
  },
  {
    id: 13,
    name: "Riccardo",
    category: "Studio",
    title: "Ripassiamo matematica.",
    description:
      "Propongo un ripasso di equazioni e proporzioni, con esercizi semplici.",
    tag: "Offro aiuto",
    bio: "Spiegare un esercizio è un modo per imparare insieme.",
  },
  {
    id: 14,
    name: "Valentina",
    category: "Sport",
    title: "Un tappetino per muoverti.",
    description:
      "Presto un tappetino per esercizi a corpo libero e stretching.",
    tag: "In prestito",
    bio: "Mi piace trovare un momento per muovermi ogni giorno.",
  },
  {
    id: 15,
    name: "Tommaso",
    category: "Creatività",
    title: "Accordi, corde e prime canzoni.",
    description:
      "Ti mostro come accordare la chitarra e provare alcuni accordi di base.",
    tag: "Offro competenze",
    bio: "Una chitarra e qualche amico: basta poco.",
  },
  {
    id: 16,
    name: "Sara",
    category: "Aiuto",
    title: "Impariamo a usare lo smartphone.",
    description:
      "Posso spiegare come fare una videochiamata e riconoscere messaggi sospetti.",
    tag: "Offro tempo",
    bio: "Aiutare qualcuno a sentirsi autonomo mi rende felice.",
  },
  {
    id: 17,
    name: "Alessandro",
    category: "Oggetti",
    title: "Una serata di giochi da tavolo.",
    description:
      "Presto un gioco da tavolo per una serata in compagnia. Tutti i pezzi inclusi.",
    tag: "In prestito",
    bio: "Mi piacciono i giochi che fanno parlare e ridere.",
  },
  {
    id: 18,
    name: "Martina",
    category: "Tecnologia",
    title: "Prova una tastiera di riserva.",
    description:
      "Presto una tastiera USB per lavorare mentre la tua non funziona.",
    tag: "In prestito",
    bio: "Tengo qualche accessorio utile per le emergenze digitali.",
  },
  {
    id: 19,
    name: "Federico",
    category: "Casa e giardino",
    title: "Piccole talee, nuove piante.",
    description:
      "Condivido talee e consigli per iniziare a coltivare una pianta in casa.",
    tag: "Da condividere",
    bio: "Ogni nuova foglia è una piccola soddisfazione.",
  },
  {
    id: 20,
    name: "Beatrice",
    category: "Mobilità",
    title: "Una luce per la tua bici.",
    description: "Presto un set di luci per bicicletta per un’uscita serale.",
    tag: "In prestito",
    bio: "Per me la bici è libertà e attenzione agli altri.",
  },
  {
    id: 21,
    name: "Lorenzo",
    category: "Studio",
    title: "Facciamo pratica in inglese.",
    description:
      "Propongo una conversazione in inglese e un ripasso del vocabolario quotidiano.",
    tag: "Offro competenze",
    bio: "Imparare una lingua apre nuove conversazioni.",
  },
  {
    id: 22,
    name: "Alice",
    category: "Sport",
    title: "Un pallone, una partita.",
    description:
      "Presto un pallone da pallavolo per una partita al parco con gli amici.",
    tag: "In prestito",
    bio: "Basta un pallone per passare un bel pomeriggio.",
  },
  {
    id: 23,
    name: "Gabriele",
    category: "Creatività",
    title: "Cucire invece di buttare.",
    description:
      "Ti mostro come riattaccare un bottone e fare una piccola riparazione a mano.",
    tag: "Offro competenze",
    bio: "Riparare un vestito significa dargli un’altra possibilità.",
  },
  {
    id: 24,
    name: "Camilla",
    category: "Aiuto",
    title: "Un quartiere più pulito.",
    description:
      "Cerco vicini interessati a organizzare insieme una piccola raccolta di rifiuti.",
    tag: "Cerco aiuto",
    bio: "I luoghi in cui viviamo meritano cura.",
  },
];
let extra = [];
try {
  const saved = JSON.parse(localStorage.getItem("vicino-demo") || "[]");
  if (Array.isArray(saved))
    extra = saved
      .map((x) =>
        x && x.category === "Competenze" ? { ...x, category: "Tecnologia" } : x,
      )
      .filter(
        (x) =>
          x &&
          ["title", "category", "description", "name"].every(
            (k) => typeof x[k] === "string",
          ) &&
          icons[x.category],
      );
} catch {}
let filter = "Tutti",
  selected = null,
  expanded = false,
  visibleCount = 3;
const $ = (s) => document.querySelector(s);
function save() {
  try {
    localStorage.setItem("vicino-demo", JSON.stringify(extra));
    return true;
  } catch {
    return false;
  }
}
function notify(t) {
  $("#toast").textContent = t;
  setTimeout(() => ($("#toast").textContent = ""), 4500);
}
const normalize = (value) =>
  String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[’']/g, " ")
    .trim();
const vocabulary = [
  ["computer", "ordinateur", "informatique", "pc", "informatica"],
  ["bicicletta", "biciclette", "bici", "velo", "velos", "bicyclette", "bike"],
  ["trapano", "perceuse", "bricolage", "attrezzi", "outil", "outils"],
  [
    "piante",
    "pianta",
    "plante",
    "plantes",
    "giardinaggio",
    "jardin",
    "arrosage",
    "annaffiare",
  ],
  ["libri", "libro", "livre", "livres", "lettura", "lecture"],
  ["italiano", "italien", "lingua", "langue", "conversation", "conversazione"],
  ["aiuto", "aide", "entraide"],
  ["oggetti", "objet", "objets"],
  ["tecnologia", "technologie"],
  ["casa", "maison"],
  ["mobilita", "mobilite", "transport"],
  ["studio", "etudes", "cours"],
  ["creativita", "creativite"],
  ["chitarra", "guitare"],
  ["cucire", "couture"],
  ["racchetta", "raquette"],
  ["pallone", "ballon"],
  ["tastiera", "clavier"],
  ["inglese", "anglais"],
  ["matematica", "maths", "mathematiques"],
  ["valigia", "valise"],
  ["giochi", "jeux"],
  ["competenze", "competenza", "competence", "competences"],
  ["riparare", "ripariamo", "reparation", "reparer"],
];
function matchesSearch(item, query) {
  const person = base.find((user) => normalize(user.name) === normalize(query));
  if (person) return normalize(item.name) === normalize(person.name);
  const content = normalize(
    [
      item.title,
      item.description,
      item.category,
      item.name,
      item.tag || "",
    ].join(" "),
  );
  return normalize(query)
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => {
      const group = vocabulary.find((words) => words.includes(term));
      return (group || [term]).some((word) => content.includes(word));
    });
}
function render() {
  const q = $("#search").value.trim();
  const list = [...extra, ...base].filter(
    (x) => (filter === "Tutti" || x.category === filter) && matchesSearch(x, q),
  );
  $("#clear-search").hidden = !q;
  $("#cards").replaceChildren();
  $("#count").textContent = q
    ? list.length +
      " risultat" +
      (list.length === 1 ? "o" : "i") +
      " per «" +
      q +
      "»"
    : Math.min(visibleCount, list.length) +
      " di " +
      list.length +
      " annunci · " +
      filter;
  $("#more").hidden = visibleCount >= list.length;
  $("#more").textContent =
    "Mostra altri " + Math.min(6, list.length - visibleCount) + " ↓";
  list.slice(0, visibleCount).forEach((x) => {
    const a = document.createElement("article");
    a.className = "card holo";
    a.innerHTML =
      '<div class="art"><span class="tag"></span><svg viewBox="0 0 150 125" aria-hidden="true">' +
      icons[x.category] +
      '</svg></div><div class="card-body"><h3></h3><p></p><div class="meta"><span class="avatar"></span><span class="person"></span><button>Scopri ↗</button></div></div>';
    a.querySelector(".art").style.background = x.color || "#e6eadf";
    a.querySelector(".tag").textContent = x.tag || x.category;
    a.querySelector("h3").textContent = x.title;
    a.querySelector("p").textContent = x.description;
    a.querySelector(".avatar").textContent = x.name.slice(0, 1);
    a.querySelector(".person").textContent = x.name + " · Profilo demo";
    a.querySelector("button").setAttribute("aria-label", "Scopri: " + x.title);
    a.querySelector("button").onclick = () => {
      selected = x;
      $("#detail-title").textContent = x.title;
      $("#detail-body").textContent = x.description;
      $("#detail-profile").textContent = "Conosci " + x.name + " ↗";
      $("#detail-profile").onclick = () => {
        $("#detail").close();
        openProfile(x);
      };
      $("#confirmation").textContent = "";
      $("#confirmation").className = "";
      $("#request").hidden = false;
      $("#detail").showModal();
    };
    $("#cards").append(a);
  });
  if (!list.length) {
    const p = document.createElement("div");
    p.className = "empty";
    const msg = document.createElement("p");
    msg.textContent = "Nessun risultato. Prova “computer”, “vélo” o “trapano”.";
    const clear = document.createElement("button");
    clear.textContent = "Mostra tutti gli annunci ↗";
    clear.onclick = resetSearch;
    p.append(msg, clear);
    $("#cards").append(p);
  }
}
document.querySelectorAll("[data-filter]").forEach(
  (b) =>
    (b.onclick = () => {
      filter = b.dataset.filter;
      expanded = false;
      visibleCount = 3;
      document
        .querySelectorAll("[data-filter]")
        .forEach((c) => c.setAttribute("aria-pressed", c === b));
      render();
    }),
);
function activateSearch() {
  filter = "Tutti";
  expanded = true;
  visibleCount = 30;
  document
    .querySelectorAll("[data-filter]")
    .forEach((b) =>
      b.setAttribute("aria-pressed", b.dataset.filter === "Tutti"),
    );
  render();
}
function resetSearch() {
  $("#search").value = "";
  activateSearch();
  $("#search").focus();
}
$("#search").addEventListener("input", activateSearch);
$("#search").addEventListener("search", activateSearch);
$("#search-form").onsubmit = (e) => {
  e.preventDefault();
  activateSearch();
};
$("#clear-search").onclick = resetSearch;
document.querySelectorAll("[data-query]").forEach(
  (b) =>
    (b.onclick = () => {
      $("#search").value = b.dataset.query;
      activateSearch();
      $("#search").focus();
    }),
);
document.querySelector(".hero .btn").addEventListener("click", () => {
  $("#search").focus({ preventScroll: true });
});
$("#more").onclick = () => {
  visibleCount += 6;
  render();
};
$("#add").onclick = () => $("#create").showModal();
document
  .querySelectorAll(".close")
  .forEach((b) => (b.onclick = () => b.closest("dialog").close()));
$("#form").onsubmit = (e) => {
  e.preventDefault();
  const name = $("#name").value.trim(),
    title = $("#title").value.trim(),
    description = $("#description").value.trim();
  if (!name || !title || !description) {
    notify("Completa tutti i campi, senza usare solo spazi.");
    return;
  }
  extra.unshift({
    id: Date.now(),
    name,
    title,
    description,
    category: $("#category").value,
    tag: "Il tuo annuncio · Demo",
  });
  const stored = save();
  filter = "Tutti";
  visibleCount = 3;
  document
    .querySelectorAll("[data-filter]")
    .forEach((b) =>
      b.setAttribute("aria-pressed", b.dataset.filter === "Tutti"),
    );
  $("#search").value = "";
  render();
  $("#create").close();
  $("#form").reset();
  document.getElementById("esplora").scrollIntoView();
  notify(
    stored
      ? "Annuncio aggiunto! È salvato solo in questo browser."
      : "Annuncio aggiunto per questa sessione; il salvataggio locale non è disponibile.",
  );
};
$("#request").onclick = () => {
  $("#detail").close();
  openBooking(selected);
};
$("#reset").onclick = () => {
  if (confirm("Vuoi eliminare tutti gli annunci che hai aggiunto alla demo?")) {
    extra = [];
    save();
    render();
    notify("Demo reimpostata.");
  }
};
render();
$("#open-values").onclick = () => $("#values").showModal();
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
if ("IntersectionObserver" in window && !reduced.matches) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.remove("pending");
          observer.unobserve(e.target);
        }
      }),
    { threshold: 0.12 },
  );
  document.querySelectorAll(".reveal").forEach((e) => {
    e.classList.add("pending");
    observer.observe(e);
  });
  reduced.addEventListener("change", (e) => {
    if (e.matches)
      document
        .querySelectorAll(".pending")
        .forEach((n) => n.classList.remove("pending"));
  });
}
let scheduled = false;
const progress = document.querySelector(".progress");
const stage = document.querySelector(".stage");
function scrollFrame() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = "scaleX(" + (max > 0 ? scrollY / max : 0) + ")";
  const motion = !reduced.matches;
  stage.style.setProperty(
    "--sy",
    motion
      ? Math.min(scrollY * (innerWidth > 850 ? 0.18 : 0.06), 95) + "px"
      : "0px",
  );
  document.querySelector(".ambient-a").style.transform = motion
    ? "translate3d(" +
      -Math.min(scrollY * 0.035, 100) +
      "px," +
      -Math.min(scrollY * 0.09, 180) +
      "px,0)"
    : "none";
  document.querySelector(".ambient-b").style.transform = motion
    ? "translate3d(" +
      Math.min(scrollY * 0.06, 160) +
      "px," +
      -Math.min(scrollY * 0.16, 360) +
      "px,0)"
    : "none";
  scheduled = false;
}
addEventListener(
  "scroll",
  () => {
    if (!scheduled) {
      requestAnimationFrame(scrollFrame);
      scheduled = true;
    }
  },
  { passive: true },
);
addEventListener("resize", scrollFrame);
scrollFrame();
if (matchMedia("(pointer:fine)").matches) {
  stage.addEventListener("pointermove", (e) => {
    if (reduced.matches) return;
    const r = stage.getBoundingClientRect();
    stage.style.setProperty(
      "--mx",
      ((e.clientX - r.left) / r.width) * 100 + "%",
    );
    stage.style.setProperty(
      "--my",
      ((e.clientY - r.top) / r.height) * 100 + "%",
    );
    stage.style.setProperty(
      "--rx",
      (0.5 - (e.clientY - r.top) / r.height) * 8 + "deg",
    );
    stage.style.setProperty(
      "--ry",
      ((e.clientX - r.left) / r.width - 0.5) * 10 + "deg",
    );
  });
}

stage.addEventListener("pointerleave", () => {
  stage.style.setProperty("--rx", "0deg");
  stage.style.setProperty("--ry", "0deg");
});
reduced.addEventListener("change", scrollFrame);
const halo = document.querySelector(".cursor-halo");
const fine = matchMedia("(hover:hover) and (pointer:fine)");
let cursorFrame = 0,
  cx = 0,
  cy = 0;
document.addEventListener(
  "pointermove",
  (e) => {
    if (!fine.matches || reduced.matches || e.pointerType === "touch") {
      halo.style.opacity = "0";
      return;
    }
    cx = e.clientX;
    cy = e.clientY;
    const input = e.target.closest("input,textarea,select,dialog");
    halo.style.opacity = input ? "0" : "1";
    halo.classList.toggle("hot", !!e.target.closest("a,button,summary"));
    if (!cursorFrame)
      cursorFrame = requestAnimationFrame(() => {
        halo.style.transform = "translate3d(" + cx + "px," + cy + "px,0)";
        cursorFrame = 0;
      });
  },
  { passive: true },
);
document.addEventListener("pointerdown", () => halo.classList.add("down"));
document.addEventListener("pointerup", () => halo.classList.remove("down"));
document.documentElement.addEventListener(
  "pointerleave",
  () => (halo.style.opacity = "0"),
);
addEventListener("blur", () => {
  halo.style.opacity = "0";
  halo.classList.remove("down");
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") halo.style.opacity = "0";
});

let peopleExpanded = false;
function openProfile(person) {
  $("#profile-book").onclick = () => {
    $("#profile").close();
    openBooking(person);
  };
  $("#profile-name").textContent = person.name;
  $("#profile-avatar").textContent = person.name.slice(0, 2).toUpperCase();
  $("#profile-bio").textContent =
    person.bio || "Un vicino che vuole condividere qualcosa con la community.";
  $("#profile-category").textContent =
    person.category + " · Profilo dimostrativo";
  $("#profile-listings").onclick = () => {
    $("#profile").close();
    $("#search").value = person.name;
    activateSearch();
    $("#esplora").scrollIntoView();
  };
  $("#profile").showModal();
}
function renderPeople() {
  $("#people").replaceChildren();
  base.slice(0, peopleExpanded ? base.length : 6).forEach((person) => {
    const button = document.createElement("button");
    button.className = "person-card holo";
    button.setAttribute(
      "aria-label",
      "Scopri il profilo fittizio di " + person.name,
    );
    const face = document.createElement("span");
    face.className = "person-face";
    face.textContent = person.name.slice(0, 2).toUpperCase();
    const name = document.createElement("strong");
    name.textContent = person.name;
    const category = document.createElement("small");
    category.textContent = person.category;
    button.append(face, name, category);
    button.onclick = () => openProfile(person);
    $("#people").append(button);
  });
  $("#more-people").textContent = peopleExpanded
    ? "Mostra meno ↑"
    : "Scopri gli altri 18 profili ↓";
}
$("#more-people").onclick = () => {
  peopleExpanded = !peopleExpanded;
  renderPeople();
};
renderPeople();
let activeHolo = null,
  holoFrame = 0,
  holoX = 0,
  holoY = 0;
function clearHolo() {
  if (activeHolo) {
    activeHolo.style.setProperty("--tx", "0deg");
    activeHolo.style.setProperty("--ty", "0deg");
    activeHolo = null;
  }
}
document.addEventListener(
  "pointermove",
  (e) => {
    if (reduced.matches || !fine.matches) {
      clearHolo();
      return;
    }
    const target = e.target.closest(".holo");
    if (target !== activeHolo) {
      clearHolo();
      activeHolo = target;
    }
    if (!target) return;
    holoX = e.clientX;
    holoY = e.clientY;
    if (!holoFrame)
      holoFrame = requestAnimationFrame(() => {
        if (activeHolo) {
          const r = activeHolo.getBoundingClientRect(),
            x = Math.max(0, Math.min(1, (holoX - r.left) / r.width)),
            y = Math.max(0, Math.min(1, (holoY - r.top) / r.height));
          activeHolo.style.setProperty("--hx", x * 100 + "%");
          activeHolo.style.setProperty("--hy", y * 100 + "%");
          activeHolo.style.setProperty("--tx", (0.5 - y) * 7 + "deg");
          activeHolo.style.setProperty("--ty", (x - 0.5) * 9 + "deg");
        }
        holoFrame = 0;
      });
  },
  { passive: true },
);
document.documentElement.addEventListener("pointerleave", clearHolo);
addEventListener("blur", clearHolo);
reduced.addEventListener("change", clearHolo);

const bookingKey = "vicino-appointments-v1";
let appointments = [];
try {
  const saved = JSON.parse(localStorage.getItem(bookingKey) || "[]");
  if (Array.isArray(saved))
    appointments = saved.filter(
      (x) =>
        x &&
        typeof x.id === "string" &&
        typeof x.person === "string" &&
        typeof x.title === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(x.date) &&
        /^\d{2}:\d{2}$/.test(x.time) &&
        typeof x.place === "string" &&
        ["booked", "cancelled"].includes(x.status),
    );
} catch {}
let bookingPerson = null;
const slotTimes = [
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];
function dateKey(date) {
  return (
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0")
  );
}
function dateLimits(now = new Date()) {
  const end = new Date(now);
  end.setDate(end.getDate() + 90);
  return { min: dateKey(now), max: dateKey(end) };
}
function validBookingDate(date, now = new Date()) {
  const limits = dateLimits(now);
  const parsed = new Date(date + "T12:00:00");
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(date) &&
    !Number.isNaN(parsed.getTime()) &&
    dateKey(parsed) === date &&
    date >= limits.min &&
    date <= limits.max
  );
}
function slotAvailable(date, time, now = new Date()) {
  return (
    validBookingDate(date, now) &&
    slotTimes.includes(time) &&
    new Date(date + "T" + time + ":00") > now &&
    !appointments.some(
      (x) => x.status === "booked" && x.date === date && x.time === time,
    )
  );
}
function persistAppointments() {
  try {
    localStorage.setItem(bookingKey, JSON.stringify(appointments));
    return true;
  } catch {
    return false;
  }
}
function renderSlots() {
  const date = $("#booking-date").value;
  const previous = document.querySelector(
    'input[name="booking-time"]:checked',
  )?.value;
  $("#slots").replaceChildren();
  slotTimes.forEach((time) => {
    const label = document.createElement("label");
    label.className = "slot";
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "booking-time";
    input.value = time;
    input.required = true;
    input.disabled = !slotAvailable(date, time);
    input.checked = previous === time && !input.disabled;
    const text = document.createElement("span");
    text.textContent = time;
    label.append(input, text);
    if (input.disabled)
      label.title = "Orario passato o già prenotato nella tua demo";
    $("#slots").append(label);
  });
  $("#booking-error").textContent = validBookingDate(date)
    ? slotTimes.some((time) => slotAvailable(date, time))
      ? ""
      : "Nessun orario disponibile. Scegli un altro giorno."
    : "Scegli una data valida entro i prossimi 90 giorni.";
}
function openBooking(person) {
  bookingPerson = person;
  $("#booking-form").reset();
  $("#booking-form").hidden = false;
  $("#booking-done").hidden = true;
  $("#booking-error").textContent = "";
  $("#booking-with").textContent = "Con " + person.name + " · " + person.title;
  const limits = dateLimits();
  $("#booking-date").min = limits.min;
  $("#booking-date").max = limits.max;
  let initial = new Date();
  if (!slotTimes.some((time) => slotAvailable(dateKey(initial), time)))
    initial.setDate(initial.getDate() + 1);
  $("#booking-date").value = dateKey(initial);
  renderSlots();
  $("#booking-dialog").showModal();
}
function formatAppointment(x) {
  return (
    new Intl.DateTimeFormat("it-IT", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(x.date + "T12:00:00")) +
    " · " +
    x.time +
    "–" +
    x.time.slice(0, 2) +
    ":30"
  );
}
function refreshBookingCount() {
  $("#booking-count").textContent = appointments.filter(
    (x) =>
      x.status === "booked" &&
      new Date(x.date + "T" + x.time + ":00") >= new Date(),
  ).length;
}
function renderBookings() {
  refreshBookingCount();
  $("#booking-list").replaceChildren();
  if (!appointments.length) {
    const empty = document.createElement("p");
    empty.className = "note";
    empty.textContent =
      "Nessun appuntamento. Apri un annuncio e scegli “Prenota un appuntamento”.";
    $("#booking-list").append(empty);
    return;
  }
  const sorted = [...appointments].sort(
    (a, b) =>
      (a.status === "cancelled") - (b.status === "cancelled") ||
      (a.date + a.time).localeCompare(b.date + b.time),
  );
  sorted.forEach((x) => {
    const card = document.createElement("article");
    card.className =
      "appointment" + (x.status === "cancelled" ? " cancelled" : "");
    const badge = document.createElement("span");
    badge.className = "badge";
    const past = new Date(x.date + "T" + x.time + ":00") < new Date();
    badge.textContent =
      x.status === "cancelled"
        ? "ANNULLATO · DEMO"
        : past
          ? "PASSATO · DEMO"
          : "PRENOTATO · DEMO";
    const title = document.createElement("h3");
    title.textContent = x.person;
    const listing = document.createElement("p");
    listing.textContent = x.title;
    const date = document.createElement("p");
    date.textContent = formatAppointment(x);
    const place = document.createElement("p");
    place.textContent = x.place + " · Luogo di esempio";
    card.append(badge, title, listing, date, place);
    if (x.status === "booked" && !past) {
      const cancel = document.createElement("button");
      cancel.className = "chip";
      cancel.textContent = "Annulla appuntamento";
      cancel.onclick = () => {
        if (!confirm("Vuoi annullare questo appuntamento dimostrativo?"))
          return;
        x.status = "cancelled";
        const stored = persistAppointments();
        renderBookings();
        notify(
          stored
            ? "Appuntamento annullato."
            : "Annullato per questa sessione: salvataggio non disponibile.",
        );
      };
      card.append(cancel);
    }
    $("#booking-list").append(card);
  });
}
$("#booking-date").addEventListener("change", renderSlots);
$("#booking-form").onsubmit = (e) => {
  e.preventDefault();
  const date = $("#booking-date").value,
    time = document.querySelector('input[name="booking-time"]:checked')?.value,
    place = $("#booking-place").value;
  if (!bookingPerson || !slotAvailable(date, time)) {
    renderSlots();
    $("#booking-error").textContent =
      "Questo orario non è disponibile. Scegli un altro giorno o orario.";
    return;
  }
  if (
    ![
      "Biblioteca di quartiere",
      "Ingresso del centro civico",
      "Ingresso del parco comunale",
    ].includes(place)
  ) {
    $("#booking-error").textContent = "Scegli un luogo dall’elenco.";
    return;
  }
  const item = {
    id:
      globalThis.crypto?.randomUUID?.() ||
      String(Date.now()) + "-" + Math.random().toString(36).slice(2),
    person: bookingPerson.name,
    title: bookingPerson.title,
    date,
    time,
    place,
    status: "booked",
  };
  appointments.push(item);
  const stored = persistAppointments();
  refreshBookingCount();
  $("#booking-form").hidden = true;
  $("#booking-done").hidden = false;
  $("#booking-result").textContent =
    "Appuntamento demo con " +
    item.person +
    ": " +
    formatAppointment(item) +
    ", " +
    place +
    ". " +
    (stored
      ? "Salvato in questo browser."
      : "Disponibile solo per questa sessione: salvataggio locale non disponibile.") +
    " Nessuna prenotazione reale è stata inviata.";
};
$("#open-bookings").onclick = () => {
  renderBookings();
  $("#bookings-dialog").showModal();
};
$("#view-bookings").onclick = () => {
  $("#booking-dialog").close();
  renderBookings();
  $("#bookings-dialog").showModal();
};
refreshBookingCount();
let greenFrame = 0,
  greenX = 0,
  greenY = 0;
document.addEventListener(
  "pointermove",
  (e) => {
    if (reduced.matches || !fine.matches) return;
    greenX = e.clientX;
    greenY = e.clientY;
    if (!greenFrame)
      greenFrame = requestAnimationFrame(() => {
        $("#page-glow").style.setProperty("--gx", greenX + "px");
        $("#page-glow").style.setProperty("--gy", greenY + "px");
        greenFrame = 0;
      });
  },
  { passive: true },
);
document.addEventListener("pointerdown", (e) => {
  if (
    reduced.matches ||
    !fine.matches ||
    e.target.closest("input,textarea,select,dialog")
  )
    return;
  const ring = document.createElement("span");
  ring.className = "ink-ripple";
  ring.setAttribute("aria-hidden", "true");
  ring.style.left = e.clientX + "px";
  ring.style.top = e.clientY + "px";
  document.body.append(ring);
  ring.addEventListener("animationend", () => ring.remove(), { once: true });
  setTimeout(() => ring.remove(), 1000);
});
