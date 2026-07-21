/* Ergänzungen für den bestehenden vollständigen Madeira-Reiseführer */

routes.days.subtitle = "Alle Tagespläne kompakt auf einen Blick. Antippen öffnet die Einzelheiten.";
routes.culture = { title: "Kultur & Besonderes", subtitle: "Museen, Gärten und beliebte Madeira-Erlebnisse als ruhige Alternative zum Meer." };

if (!homeTiles.some(([view]) => view === "culture")) {
  homeTiles.splice(1, 0, ["culture", "Kultur & Museen", "spark"]);
}

const culturePlaces = [
  {
    title: "Monte Palace Tropical Garden & Museum",
    text: "Tropischer Garten, Kunst, Mineralien und Aussicht oberhalb von Funchal. Dafür einen halben bis ganzen Tag einplanen.",
    route: "https://www.google.com/maps/search/?api=1&query=Monte+Palace+Madeira"
  },
  {
    title: "Madeira Story Centre",
    text: "Anschauliche Inselgeschichte in der Funchaler Altstadt – gut bei wechselhaftem Wetter.",
    route: "https://www.google.com/maps/search/?api=1&query=Madeira+Story+Centre"
  },
  {
    title: "Blandy’s Wine Lodge",
    text: "Madeirawein, Geschichte und Führungen mitten im Zentrum von Funchal.",
    route: "https://www.google.com/maps/search/?api=1&query=Blandys+Wine+Lodge"
  },
  {
    title: "Madeira Photography Museum",
    text: "Historisches Fotostudio und alte Madeira-Aufnahmen – überschaubar und besonders.",
    route: "https://www.google.com/maps/search/?api=1&query=Madeira+Photography+Museum"
  },
  {
    title: "Quinta das Cruzes",
    text: "Historisches Herrenhaus mit Kunst, Möbeln und einem ruhigen Garten.",
    route: "https://www.google.com/maps/search/?api=1&query=Quinta+das+Cruzes"
  }
];

/* Bereits tatsächlich erlebt */
const experienced = new Set(doneDays());
[3, 5].forEach((day) => experienced.add(day));
writeJson(STORAGE_KEYS.doneDays, [...experienced]);

/* Weniger Badefokus und mehr Kultur */
Object.assign(days[2], {
  swim: "Kein Badestopp eingeplant. Bei einem zweiten Funchal-Besuch lieber Museum, Weinlodge oder Café wählen.",
  weather: "Bei Regen Madeira Story Centre, Fotomuseum, Quinta das Cruzes oder Blandy’s wählen."
});
Object.assign(days[3], {
  description: "Kurzer Ausflug zu Cristo Rei, Aussicht und Café. Der Strand bleibt nur eine freiwillige Zusatzoption.",
  highlights: ["Cristo Rei", "Aussichtspunkt", "Küstenblick", "Caféstopp"],
  swim: "Nur bei wirklich ruhigem Meer; sonst Aussicht und Café genießen."
});
Object.assign(days[4], {
  swim: "Kein Baden einplanen. Porto da Cruz als Küsten- und Caféort genießen."
});
Object.assign(days[5], {
  swim: "Keine Badeoption – der Schwerpunkt liegt auf Bergen, Aussicht und Ribeiro Frio."
});
Object.assign(days[6], {
  description: "Pool, Balkon, Lesen, kleiner Einkauf und keinerlei Pflichtprogramm.",
  highlights: ["Hotelpool", "Balkon", "Lesen", "kleiner Einkauf"],
  swim: "Wenn überhaupt, nur der ruhige Hotelpool."
});
Object.assign(days[8], {
  swim: "Keine Badeplanung. Hafen, Promenade und Café stehen im Mittelpunkt."
});
Object.assign(days[9], {
  description: "Langer Landschaftstag über São Vicente, Seixal und Porto Moniz – ohne verpflichtenden Badestopp.",
  swim: "Lavaküste und Naturbecken ansehen; Baden nur spontan bei sicheren, ruhigen Bedingungen."
});
Object.assign(days[10], {
  swim: "Keine Badeplanung. Fanal und der Lorbeerwald sind das eigentliche Ziel."
});
Object.assign(days[11], {
  title: "Monte Palace und Museum",
  description: "Tropischer Garten, Kunst, Mineralien und Aussicht oberhalb Funchals.",
  route: "Hotel - Monte Palace - Café - Hotel",
  maps: "https://www.google.com/maps/dir/Hotel+Cais+da+Oliveira,+Canico/Monte+Palace+Madeira/Hotel+Cais+da+Oliveira,+Canico",
  drive: "ca. 1-1,5 Std. gesamt plus Besuch",
  highlights: ["Tropischer Garten", "Museum", "Kunst", "Aussicht", "Caféstopp"],
  parking: "Parkmöglichkeiten in Monte prüfen oder Seilbahn ab Funchal nutzen.",
  swim: "Keine Badeoption – ein Kultur- und Gartentag.",
  food: "Café in Monte oder später entspannt in Caniço.",
  intensity: "mittel",
  weather: "Bei starkem Regen stattdessen Madeira Story Centre, Fotomuseum oder Blandy’s besuchen."
});
Object.assign(days[12], {
  swim: "Keine Badeoption; Bergblick, Nonnental und Kastanienkuchen stehen im Mittelpunkt."
});
Object.assign(days[13], {
  description: "Lieblingsort wiederholen oder einen Kulturpunkt auswählen.",
  highlights: ["Lieblingsort", "Museum", "Souvenirs", "Abschiedsessen"],
  swim: "Nur freiwillig und bei ruhigen Bedingungen; Kultur oder Balkonabend sind gleichwertige Alternativen.",
  weather: "Madeira Story Centre, Fotomuseum, Quinta das Cruzes oder Blandy’s auswählen."
});

weatherModes.unshift(["Wenn das Meer zu wild ist", ["Monte Palace", "Madeira Story Centre", "Blandy’s Wine Lodge", "Fotomuseum", "Quinta das Cruzes"]]);

let openDay = null;

function dayAccordionCard(day, done) {
  const isOpen = openDay === day.day;
  return `
    <details class="day-accordion ${done.has(day.day) ? "is-done" : ""}" data-accordion-day="${day.day}" ${isOpen ? "open" : ""}>
      <summary>
        <span class="accordion-day">Tag ${day.day}</span>
        <span class="accordion-title">${day.title}</span>
        <span class="accordion-meta">${done.has(day.day) ? "✓ erlebt" : `${day.intensity} · ${day.drive}`}</span>
      </summary>
      <div class="accordion-content">
        ${imageFrame(day.id, day.title, "card-image")}
        <p>${day.description}</p>
        <div class="details">
          <div class="detail"><strong>Route</strong><span>${day.route}</span></div>
          <div class="detail"><strong>Fahrzeit grob</strong><span>${day.drive}</span></div>
          <div class="detail"><strong>Highlights</strong><ul>${day.highlights.map((item) => `<li>${item}</li>`).join("")}</ul></div>
          <div class="detail"><strong>Parkhinweise</strong><span>${day.parking}</span></div>
          <div class="detail"><strong>Badeoption</strong><span>${day.swim}</span></div>
          <div class="detail"><strong>Restaurant oder Selbstversorgung</strong><span>${day.food}</span></div>
          <div class="detail"><strong>Schlechtwetter oder Nebel</strong><span>${day.weather}</span></div>
        </div>
        ${stopButtons(day.day)}
        <div class="action-row">
          ${moreButton(day.id)}
          ${mapsButton(day.maps, "Google Maps")}
          <button class="btn turquoise js-done" type="button" data-day="${day.day}">${icon("check")}<span>${done.has(day.day) ? "Erledigt" : "Als erledigt markieren"}</span></button>
          ${favoriteButton(day.id)}
        </div>
      </div>
    </details>
  `;
}

renderDays = function renderDaysAccordion() {
  const done = new Set(doneDays());
  const experiencedCards = days.filter((day) => done.has(day.day));
  const cards = days.map((day) => dayAccordionCard(day, done)).join("");
  return pageChrome("days", `
    <section class="trip-status">
      <strong>Schon erlebt</strong>
      <span>${experiencedCards.length ? experiencedCards.map((day) => `Tag ${day.day}: ${day.title}`).join(" · ") : "Noch nichts markiert"}</span>
    </section>
    <div class="accordion-stack">${cards}</div>
  `);
};

function renderCulture() {
  const cards = culturePlaces.map((place) => `
    <article class="card culture-card">
      <div class="meta-row"><span class="meta">Kultur</span></div>
      <h2>${place.title}</h2>
      <p>${place.text}</p>
      <div class="action-row">${mapsButton(place.route, "In Google Maps öffnen")}</div>
    </article>
  `).join("");
  return pageChrome("culture", `<div class="card-grid">${cards}</div>`);
}

const originalRenderHome = renderHome;
renderHome = function renderUpdatedHome() {
  const done = new Set(doneDays());
  const suggestions = [days[11], days[8], days[12]].filter((day) => !done.has(day.day));
  return `
    <main>
      <section class="hero">
        <div class="hero-content">
          <p class="eyebrow">Persönlicher Reiseführer</p>
          <h1>Madeira 2026</h1>
          <p class="hero-text">Euer aktualisierter Reisebegleiter: weniger Badestopps, mehr Kultur und alle Tagespläne kompakt zum Aufklappen.</p>
          <div class="trip-strip"><span class="pill">Caniço</span><span class="pill">Funchal erlebt</span><span class="pill">Santana erlebt</span><span class="pill">Meer nur freiwillig</span></div>
        </div>
      </section>
      <section class="content-band recommendation-band">
        <div class="section-head"><h2>Für die nächsten Tage besonders passend</h2><p>Ruhige, beliebte Ziele ohne Badepflicht.</p></div>
        <div class="recommendation-grid">
          ${suggestions.map((day) => `<a class="recommendation-card" href="#days" data-open-day="${day.day}"><strong>${day.title}</strong><span>${day.intensity} · ${day.drive}</span></a>`).join("")}
        </div>
      </section>
      <section class="content-band" aria-labelledby="home-nav-title">
        <div class="section-head"><h2 id="home-nav-title">Reisebereiche</h2><p>Favoriten, erledigte Tage und Checklisten bleiben lokal gespeichert.</p></div>
        <div class="tile-grid">
          ${homeTiles.map(([view, label, iconName]) => `<a class="tile" href="#${view}">${icon(iconName)}<span class="tile-title">${label}</span></a>`).join("")}
        </div>
      </section>
    </main>
  `;
};

render = function renderEnhanced() {
  const view = (location.hash || "#home").replace("#", "").split("/")[0] || "home";
  const views = {
    home: renderHome,
    days: renderDays,
    culture: renderCulture,
    maps: renderMaps,
    restaurants: renderRestaurants,
    swim: renderSwim,
    markets: renderMarkets,
    whales: renderWhales,
    secrets: renderSecrets,
    weather: renderWeather,
    packing: () => renderChecklist("packing", packingSections, "packing"),
    shopping: () => renderChecklist("shopping", shoppingSections, "shopping"),
    favorites: renderFavorites
  };
  app.innerHTML = (views[view] || renderHome)() + renderStopModal() + renderInfoModal();
  if (!preserveScroll && !activeStopId && !activeInfoId) window.scrollTo({ top: 0, behavior: "instant" });
  preserveScroll = false;
};

document.addEventListener("toggle", (event) => {
  const current = event.target.closest?.(".day-accordion");
  if (!current || !current.open) return;
  openDay = Number(current.dataset.accordionDay);
  document.querySelectorAll(".day-accordion[open]").forEach((other) => {
    if (other !== current) other.removeAttribute("open");
  });
}, true);

document.addEventListener("click", (event) => {
  const suggestion = event.target.closest("[data-open-day]");
  if (suggestion) openDay = Number(suggestion.dataset.openDay);
});

const enhancementStyles = document.createElement("style");
enhancementStyles.textContent = `
  .trip-status{display:grid;gap:.35rem;margin-bottom:1rem;padding:1rem 1.15rem;border:1px solid var(--line);border-radius:18px;background:var(--sand-soft,#fbf6ee)}
  .trip-status span{color:var(--muted)}
  .accordion-stack{display:grid;gap:.75rem}
  .day-accordion{background:#fff;border:1px solid var(--line);border-radius:18px;overflow:hidden;box-shadow:0 8px 24px rgba(6,50,74,.08)}
  .day-accordion.is-done{border-left:5px solid #56aa76}
  .day-accordion summary{list-style:none;display:grid;grid-template-columns:auto minmax(0,1fr) auto auto;gap:.7rem;align-items:center;padding:1rem;cursor:pointer}
  .day-accordion summary::-webkit-details-marker{display:none}
  .day-accordion summary::after{content:'＋';font-size:1.2rem;font-weight:800;color:var(--deep-2,var(--deep))}
  .day-accordion[open] summary::after{content:'−'}
  .accordion-day{font-size:.78rem;text-transform:uppercase;letter-spacing:.06em;font-weight:800;color:var(--turquoise,var(--deep))}
  .accordion-title{font-weight:800}
  .accordion-meta{font-size:.82rem;color:var(--muted);text-align:right}
  .accordion-content{padding:0 1rem 1rem;border-top:1px solid var(--line)}
  .accordion-content>p{color:var(--muted);margin-top:1rem}
  .recommendation-band{padding-top:1.25rem}
  .recommendation-grid{display:grid;gap:.75rem;grid-template-columns:repeat(auto-fit,minmax(190px,1fr))}
  .recommendation-card{display:grid;gap:.35rem;padding:1rem;border:1px solid var(--line);border-radius:16px;background:#fff;box-shadow:0 8px 22px rgba(6,50,74,.08)}
  .recommendation-card span{font-size:.85rem;color:var(--muted)}
  @media(max-width:640px){.day-accordion summary{grid-template-columns:1fr auto}.accordion-day,.accordion-title,.accordion-meta{grid-column:1}.accordion-meta{text-align:left}.day-accordion summary::after{grid-column:2;grid-row:1/4}}
`;
document.head.appendChild(enhancementStyles);

render();
