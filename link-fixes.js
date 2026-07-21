/* Korrekte Zuordnung der Kultur-Sehenswürdigkeiten und Tagesstopps */
const cultureLinkFixes = {
  "Monte Palace Tropical Garden & Museum": "https://www.google.com/maps/search/?api=1&query=Monte+Palace+Madeira+Funchal",
  "Madeira Story Centre": "https://www.google.com/maps/search/?api=1&query=Madeira+Story+Centre+Funchal",
  "Blandy’s Wine Lodge": "https://www.google.com/maps/search/?api=1&query=Blandy%27s+Wine+Lodge+Funchal",
  "Madeira Photography Museum": "https://www.google.com/maps/search/?api=1&query=Museu+de+Fotografia+da+Madeira+Atelier+Vicente%27s+Funchal",
  "Quinta das Cruzes": "https://www.google.com/maps/search/?api=1&query=Museu+Quinta+das+Cruzes+Funchal"
};

culturePlaces.forEach((place) => {
  if (cultureLinkFixes[place.title]) place.route = cultureLinkFixes[place.title];
});

const correctedCultureStops = [
  {
    id: "stop-monte-palace",
    title: "Monte Palace Tropical Garden",
    area: "Monte / Funchal",
    explanation: "Großer tropischer Garten oberhalb von Funchal mit Kunst, Teichen, Pflanzen und Aussicht.",
    worth: "Ein ruhiger halber bis ganzer Tag mit Garten, Museum und vielen Sitzmöglichkeiten.",
    time: "3-5 Std.",
    parking: "Mit dem Auto nach Monte oder per Seilbahn ab Funchal. Vor Ort Beschilderung beachten.",
    photo: "Teiche, Kacheln, Pflanzen und Aussichtspunkte lohnen sich besonders.",
    walk: "Viele Wege und teilweise Gefälle; bequeme Schuhe tragen.",
    bath: "Keine Badeoption.",
    cafe: "Café im Garten oder anschließend in Monte.",
    route: cultureLinkFixes["Monte Palace Tropical Garden & Museum"]
  },
  {
    id: "stop-story-centre",
    title: "Madeira Story Centre",
    area: "Funchal Altstadt",
    explanation: "Museum zur Geschichte Madeiras direkt in der Altstadt nahe der Seilbahnstation.",
    worth: "Gut verständlich, überschaubar und besonders passend bei Regen oder wechselhaftem Wetter.",
    time: "1-2 Std.",
    parking: "Parkhaus in Altstadtnähe nutzen.",
    photo: "Innen eher Erinnerungsfotos; außen Altstadt und Seilbahn kombinieren.",
    walk: "Leichter Stadtweg.",
    bath: "Keine Badeoption.",
    cafe: "Viele Cafés rund um die Altstadt.",
    route: cultureLinkFixes["Madeira Story Centre"]
  },
  {
    id: "stop-blandys",
    title: "Blandy’s Wine Lodge",
    area: "Funchal Zentrum",
    explanation: "Historische Weinlodge mit Führungen und Informationen zum Madeirawein.",
    worth: "Ein typisches Madeira-Erlebnis mitten im Zentrum und gut mit einem Stadtbummel kombinierbar.",
    time: "1-1,5 Std.",
    parking: "Zentrales Parkhaus nutzen und zu Fuß gehen.",
    photo: "Innenräume und Weinfässer nur dort fotografieren, wo es erlaubt ist.",
    walk: "Leichter Stadtweg.",
    bath: "Keine Badeoption.",
    cafe: "Cafés und Restaurants im Zentrum.",
    route: cultureLinkFixes["Blandy’s Wine Lodge"]
  },
  {
    id: "stop-photo-museum",
    title: "Museu de Fotografia da Madeira",
    area: "Funchal Zentrum",
    explanation: "Historisches Fotostudio Atelier Vicente’s mit alten Aufnahmen und Fototechnik.",
    worth: "Klein, besonders und gut für einen ruhigen Kulturstopp.",
    time: "45-90 Min.",
    parking: "Parkhaus im Zentrum nutzen.",
    photo: "Ausstellungsregeln beachten.",
    walk: "Leichter Stadtweg.",
    bath: "Keine Badeoption.",
    cafe: "Viele Möglichkeiten im Zentrum.",
    route: cultureLinkFixes["Madeira Photography Museum"]
  },
  {
    id: "stop-quinta-cruzes",
    title: "Museu Quinta das Cruzes",
    area: "Funchal",
    explanation: "Historisches Herrenhaus mit Möbeln, Kunst und einem ruhigen Garten.",
    worth: "Eine entspannte Alternative zu den belebteren Sehenswürdigkeiten.",
    time: "1-2 Std.",
    parking: "Parkhaus im Zentrum oder nahegelegene Parkmöglichkeiten nutzen.",
    photo: "Garten und Architektur sind besonders fotogen.",
    walk: "Leichter Rundgang, teils mit Stufen.",
    bath: "Keine Badeoption.",
    cafe: "Danach Café im Zentrum.",
    route: cultureLinkFixes["Quinta das Cruzes"]
  }
];

correctedCultureStops.forEach((stop) => {
  const existingIndex = stopInfos.findIndex((item) => item.id === stop.id);
  if (existingIndex >= 0) stopInfos[existingIndex] = stop;
  else stopInfos.push(stop);
});

/* Tag 12 darf nicht mehr die alten Balcões-/Santana-Stopps anzeigen. */
dayStops[12] = ["stop-monte-palace", "stop-story-centre", "stop-blandys", "stop-photo-museum", "stop-quinta-cruzes"];

days[11].maps = "https://www.google.com/maps/dir/?api=1&origin=Hotel+Cais+da+Oliveira+Canico&destination=Monte+Palace+Madeira+Funchal";
days[11].route = "Hotel - Monte Palace Tropical Garden - Café - Hotel";

render();
