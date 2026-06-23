const STORAGE_KEYS = {
  favorites: "madeira2026:favorites",
  doneDays: "madeira2026:done-days",
  checklist: "madeira2026:checklists"
};

const app = document.querySelector("#app");

const routes = {
  home: { title: "Madeira 2026", subtitle: "14 Tage Caniço, Meerblick und entspannte Ausflüge" },
  days: { title: "Tagesplan", subtitle: "Leichte Tage, kurze Spaziergänge und genug Raum für Balkon, Meer und Pausen." },
  maps: { title: "Google-Maps-Routen", subtitle: "Alle geplanten Strecken gesammelt an einem Ort." },
  restaurants: { title: "Restaurants", subtitle: "Ruhige Auswahl für Hotelnähe, Ausflüge und besondere Abende." },
  swim: { title: "Baden", subtitle: "Badestellen mit Parkhinweisen, Badeschuh-Frage und passender Tagesidee." },
  markets: { title: "Supermärkte", subtitle: "Große Einkäufe, kurze Wege und kleine Läden für zwischendurch." },
  whales: { title: "Wale & Delfine", subtitle: "Aussichtspunkte vom Land. Fernglas einpacken, Geduld mitbringen." },
  secrets: { title: "Geheimtipps", subtitle: "Kleine Madeira-Momente, die gut zu einer entspannten Reise passen." },
  weather: { title: "Schlechtwetter", subtitle: "Alternativen für Nebel, Regen, Hitze oder müde Tage." },
  packing: { title: "Packliste", subtitle: "Gespeicherte Checkliste für Juli, Mietwagen, Baden und Kitchenette." },
  shopping: { title: "Einkaufsliste", subtitle: "Gespeicherte Liste für den ersten Abend und die kleine Selbstversorgung." },
  favorites: { title: "Favoriten", subtitle: "Alle markierten Tage, Orte, Restaurants und Badestellen gesammelt." }
};

const homeTiles = [
  ["days", "Tagesplan", "calendar"],
  ["maps", "Google-Maps-Routen", "route"],
  ["restaurants", "Restaurants", "utensils"],
  ["swim", "Baden", "waves"],
  ["markets", "Supermärkte", "basket"],
  ["whales", "Wale & Delfine", "binoculars"],
  ["secrets", "Geheimtipps", "spark"],
  ["weather", "Schlechtwetter", "cloud"],
  ["packing", "Packliste", "bag"],
  ["shopping", "Einkaufsliste", "check"],
  ["favorites", "Favoriten", "heart"]
];

const days = [
  {
    id: "day-1",
    day: 1,
    title: "Ankommen in Caniço",
    description: "Ankunft, Mietwagen, ein kurzer Einkauf und der erste ruhige Balkonabend mit Meerblick.",
    route: "Flughafen - kurzer Einkauf - Hotel Cais da Oliveira",
    maps: "https://www.google.com/maps/dir/Madeira+Airport/Continente+Modelo+Água+de+Pena/Hotel+Cais+da+Oliveira,+Canico",
    drive: "ca. 25-40 Min. plus Einkauf",
    highlights: ["Ankunft 16:10 Uhr", "Mietwagen übernehmen", "Einchecken", "Balkon mit Meerblick"],
    parking: "Am Hotel einparken und den Wagen danach möglichst stehen lassen.",
    swim: "Nur wenn noch Energie da ist: kurzer Blick zur Ponta da Oliveira.",
    food: "Brot, Käse, Schinken, Gemüse, Obst, Wasser und Wein oder Bier auf dem Balkon.",
    intensity: "leicht",
    weather: "Bei spätem Ankommen oder Müdigkeit den Einkauf auf Tag 2 verschieben und nur SPAR/kleine Basics nehmen."
  },
  {
    id: "day-2",
    day: 2,
    title: "Ankommen, Einkauf und Caniço",
    description: "Frühstück, Großeinkauf, Hotelumgebung und ein erster ruhiger Kontakt mit Meer und Ort.",
    route: "Hotel - Pingo Doce Super Cancela - Hotel",
    maps: "https://www.google.com/maps/dir/Hotel+Cais+da+Oliveira,+Canico/Pingo+Doce+Super+Cancela/Hotel+Cais+da+Oliveira,+Canico",
    drive: "ca. 25-35 Min. gesamt",
    highlights: ["Frühstück", "Großeinkauf", "Ponta da Oliveira", "Hotelumgebung"],
    parking: "Beim Pingo Doce auf dem Supermarktparkplatz, rund ums Hotel entspannt zu Fuß.",
    swim: "Ponta da Oliveira, Pool oder Meerzugang je nach Wind.",
    food: "Kitchenette füllen: Kaffee, Milch, Obst, Salat, Snacks und Zutaten für einfache Abendessen.",
    intensity: "leicht",
    weather: "Bei Regen als ruhiger Einkaufstag perfekt; Spaziergang einfach auf eine trockene Stunde legen."
  },
  {
    id: "day-3",
    day: 3,
    title: "Funchal ohne Korbschlitten",
    description: "Altstadt, Markt, Hafen und Promenade ohne Pflichtprogramm und ohne Korbschlitten-Stress.",
    route: "Hotel - Mercado dos Lavradores - Altstadt - Marina - Hotel",
    maps: "https://www.google.com/maps/dir/Hotel+Cais+da+Oliveira,+Canico/Mercado+dos+Lavradores+Funchal/Funchal+Old+Town/Funchal+Marina/Hotel+Cais+da+Oliveira,+Canico",
    drive: "ca. 45-60 Min. gesamt",
    highlights: ["Mercado dos Lavradores", "Altstadt", "Hafen", "Promenade", "Caféstopp"],
    parking: "Parkhaus nahe Altstadt oder Marina wählen und Funchal zu Fuß angehen.",
    swim: "Doca do Cavacas als spätere Badeoption, wenn der Tag warm und offen bleibt.",
    food: "Café oder leichtes Mittagessen in Funchal; abends entweder Hotelnähe oder Balkon.",
    intensity: "mittel",
    weather: "Sehr gute Alternative, wenn die Berge neblig sind."
  },
  {
    id: "day-4",
    day: 4,
    title: "Garajau und Cristo Rei",
    description: "Kurzer Ausflug mit Aussicht, Küste, Praia do Garajau und Zeit zum Baden oder Schnorcheln.",
    route: "Hotel - Cristo Rei - Praia do Garajau - Hotel",
    maps: "https://www.google.com/maps/dir/Hotel+Cais+da+Oliveira,+Canico/Cristo+Rei+do+Garajau/Praia+do+Garajau/Hotel+Cais+da+Oliveira,+Canico",
    drive: "ca. 20-35 Min. gesamt",
    highlights: ["Cristo Rei", "Aussichtspunkt", "Praia do Garajau", "Schnorcheloption"],
    parking: "Oben beim Aussichtspunkt meist einfacher; unten am Strand begrenzt und steiler.",
    swim: "Garajau bei ruhigem Meer, Badeschuhe und Schnorchelmaske lohnen sich.",
    food: "Snack am Strand oder später A Traineira/A Rede in Caniço.",
    intensity: "leicht",
    weather: "Bei Wind oder Wellen nur Aussichtspunkt und danach Café/Pooltag."
  },
  {
    id: "day-5",
    day: 5,
    title: "Santana und Nordostküste",
    description: "Fotostopps, Santana-Häuser und Porto da Cruz als ruhiger Lieblingsort ohne große Wanderung.",
    route: "Hotel - Guindaste - Santana - Faial - Porto da Cruz - Hotel",
    maps: "https://www.google.com/maps/dir/Hotel+Cais+da+Oliveira,+Canico/Miradouro+do+Guindaste/Santana+Madeira/Faial+Madeira/Porto+da+Cruz/Hotel+Cais+da+Oliveira,+Canico",
    drive: "ca. 2-2,5 Std. gesamt",
    highlights: ["Miradouro do Guindaste", "Santana-Häuser", "Faial", "Porto da Cruz"],
    parking: "An den Aussichtspunkten kurz parken; in Santana und Porto da Cruz zentrale Parkplätze nutzen.",
    swim: "Porto da Cruz eher für Küstenstimmung; Baden nur bei ruhigen Bedingungen.",
    food: "Mittagessen oder Café in Porto da Cruz, abends leicht in der Kitchenette.",
    intensity: "mittel",
    weather: "Bei Regen an der Nordostküste nach Funchal, Caniço oder Garajau wechseln."
  },
  {
    id: "day-6",
    day: 6,
    title: "Pico do Arieiro leicht",
    description: "Nur bei gutem Wetter hochfahren, kurze Spaziergänge machen und warme Jacke mitnehmen.",
    route: "Hotel - Pico do Arieiro - Ribeiro Frio - Hotel",
    maps: "https://www.google.com/maps/dir/Hotel+Cais+da+Oliveira,+Canico/Pico+do+Arieiro/Ribeiro+Frio/Hotel+Cais+da+Oliveira,+Canico",
    drive: "ca. 2-2,5 Std. gesamt",
    highlights: ["Aussicht am Pico", "kurze Wege", "Ribeiro Frio", "Bergluft"],
    parking: "Am Pico früh starten; Parkplätze können schnell voll werden.",
    swim: "Keine Badeoption, dafür später Pool oder Ponta da Oliveira.",
    food: "Warme Schicht, Wasser und Snack mitnehmen; danach frühes Abendessen in Caniço.",
    intensity: "mittel",
    weather: "Bei Nebel nicht erzwingen: Funchal, Garajau, Caniço oder Pooltag wählen."
  },
  {
    id: "day-7",
    day: 7,
    title: "Ruhetag",
    description: "Pool, Meer, Balkon, kleiner Einkauf und keinerlei festes Programm.",
    route: "Hotel, Ponta da Oliveira und ein kurzer Einkauf nach Bedarf",
    maps: "https://www.google.com/maps/search/?api=1&query=Hotel+Cais+da+Oliveira+Canico",
    drive: "0-15 Min.",
    highlights: ["Pool", "Meer", "Balkon", "kleiner Einkauf"],
    parking: "Auto einfach stehen lassen, solange nichts fehlt.",
    swim: "Pool, Meerzugang oder Ponta da Oliveira.",
    food: "Einfach selbst versorgen: Salat, Bolo do Caco, Käse, Obst und kalte Getränke.",
    intensity: "leicht",
    weather: "Bei Regen Lesetag, Kaffee, Hotelblick und später kurzer Supermarktbesuch."
  },
  {
    id: "day-8",
    day: 8,
    title: "Machico und Ponta de São Lourenço",
    description: "Nur bis zum ersten Aussichtspunkt, danach Strand Machico, Baden, Eis oder Café.",
    route: "Hotel - Ponta de São Lourenço - Machico - Hotel",
    maps: "https://www.google.com/maps/dir/Hotel+Cais+da+Oliveira,+Canico/Ponta+de+Sao+Lourenco/Machico/Hotel+Cais+da+Oliveira,+Canico",
    drive: "ca. 1,5-2 Std. gesamt",
    highlights: ["erste Aussicht an São Lourenço", "Machico-Strand", "Baden", "Eis oder Café"],
    parking: "Am São-Lourenço-Parkplatz früh besser; in Machico Strandparkplätze suchen.",
    swim: "Machico ist eine der bequemsten Badeoptionen mit Sandstrand.",
    food: "Café oder leichtes Mittagessen in Machico, abends entspannt im Hotel.",
    intensity: "mittel",
    weather: "Bei starkem Wind São Lourenço streichen und direkt Machico/Caniço wählen."
  },
  {
    id: "day-9",
    day: 9,
    title: "Cabo Girão und Câmara de Lobos",
    description: "Skywalk, Hafen, Mittagessen oder Café und ein Ausflug ohne Eile.",
    route: "Hotel - Cabo Girão - Câmara de Lobos - Hotel",
    maps: "https://www.google.com/maps/dir/Hotel+Cais+da+Oliveira,+Canico/Cabo+Girao/Camara+de+Lobos/Hotel+Cais+da+Oliveira,+Canico",
    drive: "ca. 1-1,5 Std. gesamt",
    highlights: ["Cabo-Girão-Skywalk", "Hafen Câmara de Lobos", "Caféstopp", "Promenade"],
    parking: "Am Skywalk Besucherparkplatz, in Câmara de Lobos zentrale Parkplätze nutzen.",
    swim: "Keine Haupt-Badeoption; später Pool oder Doca do Cavacas bei Lust.",
    food: "Vila do Peixe oder Hafencafé, je nach Hunger und Stimmung.",
    intensity: "leicht",
    weather: "Bei Nordküstenregen oft gute Südküstenalternative."
  },
  {
    id: "day-10",
    day: 10,
    title: "Große Nordküstenrunde",
    description: "Langer, schöner Fahrtag über Ribeira Brava, São Vicente, Seixal, Porto Moniz und Paul da Serra.",
    route: "Hotel - Ribeira Brava - São Vicente - Véu da Noiva - Seixal - Porto Moniz - Paul da Serra - Hotel",
    maps: "https://www.google.com/maps/dir/Hotel+Cais+da+Oliveira,+Canico/Ribeira+Brava/Sao+Vicente+Madeira/Veu+da+Noiva+Madeira/Seixal+Madeira/Porto+Moniz/Paul+da+Serra/Hotel+Cais+da+Oliveira,+Canico",
    drive: "ca. 3,5-4,5 Std. gesamt",
    highlights: ["Ribeira Brava", "São Vicente", "Véu da Noiva", "Seixal", "Porto Moniz", "Paul da Serra"],
    parking: "In Seixal und Porto Moniz früh entspannter; Fotostopps kurz und bewusst halten.",
    swim: "Seixal oder Porto Moniz. Badeschuhe mitnehmen.",
    food: "Cachalote in Porto Moniz oder Picknick mit Meerblick.",
    intensity: "lang",
    weather: "Bei Regen an der Nordküste den Tag teilen oder auf Südküste/Machico wechseln."
  },
  {
    id: "day-11",
    day: 11,
    title: "Fanalwald",
    description: "Mystischer Wald, leichter Spaziergang, Picknick und besonders schön bei Nebel oder spätem Licht.",
    route: "Hotel - Fanal Forest - Porto Moniz - Hotel",
    maps: "https://www.google.com/maps/dir/Hotel+Cais+da+Oliveira,+Canico/Fanal+Forest/Porto+Moniz/Hotel+Cais+da+Oliveira,+Canico",
    drive: "ca. 3-3,5 Std. gesamt",
    highlights: ["Fanal", "leichter Spaziergang", "Picknick", "später Nachmittag"],
    parking: "Am Fanal-Parkplatz, warme Schicht und Geduld für wechselndes Wetter einplanen.",
    swim: "Optional Porto Moniz, wenn der Tag danach noch offen ist.",
    food: "Picknick oder später einfaches Abendessen in der Kitchenette.",
    intensity: "mittel",
    weather: "Nebel ist hier kein Problem, starker Regen schon: dann Ribeiro Frio oder Hotelpause."
  },
  {
    id: "day-12",
    day: 12,
    title: "Levada dos Balcões",
    description: "Leichte Levada ab Ribeiro Frio, etwa 3 km hin und zurück, fast eben und mit Aussichtspunkt.",
    route: "Hotel - Ribeiro Frio - Balcões - Santana - Hotel",
    maps: "https://www.google.com/maps/dir/Hotel+Cais+da+Oliveira,+Canico/Ribeiro+Frio/Balcoes+Madeira/Santana+Madeira/Hotel+Cais+da+Oliveira,+Canico",
    drive: "ca. 2-2,5 Std. gesamt",
    highlights: ["Ribeiro Frio", "Levada dos Balcões", "Aussichtspunkt", "Santana optional"],
    parking: "In Ribeiro Frio früh starten, da Parkplätze begrenzt sein können.",
    swim: "Keine direkte Badeoption; danach Pool oder kurzer Meerblick in Caniço.",
    food: "Snack mitnehmen, später Santana oder Selbstversorgung.",
    intensity: "mittel",
    weather: "Nicht bei starkem Regen gehen; stattdessen Funchal, Caniço oder Südküste."
  },
  {
    id: "day-13",
    day: 13,
    title: "Nonnental",
    description: "Eira do Serrado, Curral das Freiras und Kastanienkuchen als ruhiger Ausflug.",
    route: "Hotel - Eira do Serrado - Curral das Freiras - Hotel",
    maps: "https://www.google.com/maps/dir/Hotel+Cais+da+Oliveira,+Canico/Eira+do+Serrado/Curral+das+Freiras/Hotel+Cais+da+Oliveira,+Canico",
    drive: "ca. 1,5-2 Std. gesamt",
    highlights: ["Eira do Serrado", "Curral das Freiras", "Kastanienkuchen", "Bergblick"],
    parking: "Oben am Aussichtspunkt und unten im Ort die ausgeschilderten Parkflächen nutzen.",
    swim: "Keine Badeoption; später Ponta da Oliveira, wenn Sonne und Zeit passen.",
    food: "Kastanienkuchen probieren, abends Abschiedsplanung in Caniço.",
    intensity: "leicht",
    weather: "Bei Nebel oben flexibel bleiben und den Ort unten in Ruhe besuchen."
  },
  {
    id: "day-14",
    day: 14,
    title: "Freier Abschlusstag",
    description: "Lieblingstag wiederholen, baden, Souvenirs, Balkonabend und Abschiedsessen.",
    route: "Nach Lust: Lieblingsort, Badestelle, Caniço oder Funchal",
    maps: "https://www.google.com/maps/search/?api=1&query=Hotel+Cais+da+Oliveira+Canico",
    drive: "frei wählbar",
    highlights: ["Lieblingstag wiederholen", "Baden", "Souvenirs", "Balkonabend", "Abschiedsessen"],
    parking: "Je nach Ziel bewusst kurz planen und den Tag nicht vollpacken.",
    swim: "Machico, Ponta da Oliveira, Garajau oder Seixal, wenn es besonders werden soll.",
    food: "ÁKUA, Armazém do Sal oder ein sehr guter Balkonabend.",
    intensity: "leicht",
    weather: "Schlechtwettermodus nutzen: müde, heiß, neblig oder regnerisch entscheidet den Tag."
  }
];

const swimSpots = [
  {
    id: "swim-seixal",
    title: "Seixal",
    description: "Dunkler Sand, dramatische Nordküste und ein Ort, an dem man besser verweilt als nur fotografiert.",
    suitable: "Für einen besonderen Badestopp mit Landschaft und ruhigem Tempo.",
    shoes: "Für Felsen und Naturbecken sinnvoll.",
    parking: "Parkplätze im Ort, früh entspannter.",
    facilities: "WC/Duschen je nach Bereich saisonal möglich; vor Ort prüfen.",
    cafe: "Kleine Cafés im Ort.",
    route: "https://www.google.com/maps/search/?api=1&query=Seixal+Madeira+beach"
  },
  {
    id: "swim-porto-moniz",
    title: "Porto Moniz",
    description: "Bekannte Lavapools mit Meerblick, gut für einen langen Nordküsten-Badetag.",
    suitable: "Für bequemes Baden, Fotostopps und längere Pausen.",
    shoes: "Empfohlen, vor allem rund um Lavagestein.",
    parking: "Große Parkbereiche im Ort, in der Saison früher besser.",
    facilities: "Bei den offiziellen Pools normalerweise Infrastruktur vorhanden.",
    cafe: "Cachalote und weitere Lokale in Laufnähe.",
    route: "https://www.google.com/maps/search/?api=1&query=Porto+Moniz+natural+swimming+pools"
  },
  {
    id: "swim-machico",
    title: "Machico",
    description: "Bequemer Strand mit hellerem Sand und guter Infrastruktur.",
    suitable: "Für entspanntes Baden ohne viel Vorbereitung.",
    shoes: "Nicht zwingend, aber für Madeira grundsätzlich praktisch.",
    parking: "Parkplätze nahe Strand und Promenade.",
    facilities: "WC/Duschen meist gut erreichbar.",
    cafe: "Cafés und Eisdielen direkt in Machico.",
    route: "https://www.google.com/maps/search/?api=1&query=Machico+beach+Madeira"
  },
  {
    id: "swim-ponta-oliveira",
    title: "Ponta da Oliveira",
    description: "Nahe am Hotel, ideal für kurze Meerzeit ohne großen Ausflug.",
    suitable: "Für spontane Badepausen, Sonnenmomente und kurze Wege.",
    shoes: "Sinnvoll bei Felsen und Einstiegen.",
    parking: "Am besten vom Hotel aus zu Fuß.",
    facilities: "Hotel- und Umgebungsinfrastruktur nutzen.",
    cafe: "Hotelnähe und Caniço de Baixo.",
    route: "https://www.google.com/maps/search/?api=1&query=Ponta+da+Oliveira+Canico"
  },
  {
    id: "swim-garajau",
    title: "Garajau",
    description: "Kieselstrand unterhalb des Cristo Rei, schön zum Baden und Schnorcheln bei ruhigem Meer.",
    suitable: "Für Meerblick, Schnorchelmaske und einen kurzen Ausflug.",
    shoes: "Ja, sehr sinnvoll.",
    parking: "Oben einfacher; unten begrenzt und steil.",
    facilities: "Strandinfrastruktur kann saisonal variieren.",
    cafe: "Snackmöglichkeit am Strand oder später Caniço.",
    route: "https://www.google.com/maps/search/?api=1&query=Praia+do+Garajau"
  },
  {
    id: "swim-cavacas",
    title: "Doca do Cavacas",
    description: "Meerwasserbecken bei Funchal, gut kombinierbar mit Promenade oder Stadt.",
    suitable: "Für einen Stadt-Badetag mit kurzer Anfahrt innerhalb Funchals.",
    shoes: "Für die Umgebung sinnvoll.",
    parking: "Parken in der Nähe je nach Uhrzeit enger.",
    facilities: "Bei geöffnetem Bad normalerweise Infrastruktur vorhanden.",
    cafe: "Restaurants und Cafés rund um Lido/Funchal.",
    route: "https://www.google.com/maps/search/?api=1&query=Doca+do+Cavacas+Funchal"
  }
];

const whaleSpots = [
  ["whale-garajau", "Garajau", "Hohe Küste und gute Sicht aufs Meer, besonders bei ruhiger See.", "https://www.google.com/maps/search/?api=1&query=Garajau+Madeira"],
  ["whale-lourenco", "Ponta de São Lourenço", "Weite Sicht nach Osten, am besten früh oder bei klarer Luft.", "https://www.google.com/maps/search/?api=1&query=Ponta+de+Sao+Lourenco"],
  ["whale-guindaste", "Miradouro do Guindaste", "Großartige Nordost-Aussicht, eher Geduldsort als Garantie.", "https://www.google.com/maps/search/?api=1&query=Miradouro+do+Guindaste"],
  ["whale-pargo", "Ponta do Pargo", "Westlicher Blick, besonders schön zum Sonnenuntergang.", "https://www.google.com/maps/search/?api=1&query=Ponta+do+Pargo+Madeira"],
  ["whale-balcony", "Balkon Hotel Cais da Oliveira", "Der bequemste Aussichtspunkt: Kaffee, Fernglas, Meer beobachten.", "https://www.google.com/maps/search/?api=1&query=Hotel+Cais+da+Oliveira+Canico"]
];

const markets = [
  ["market-pingo-cancela", "Pingo Doce Super Cancela", "ca. 15-20 Min.", "Großeinkauf für Frühstück, Kitchenette und Getränke.", "Gute erste Basis für die Reise.", "https://www.google.com/maps/search/?api=1&query=Pingo+Doce+Super+Cancela"],
  ["market-continente-agua", "Continente Modelo Água de Pena", "ca. 10-15 Min. vom Flughafen", "Ideal am Ankunftstag, wenn noch Energie da ist.", "Liegt praktisch zwischen Flughafen und Hotel.", "https://www.google.com/maps/search/?api=1&query=Continente+Modelo+Agua+de+Pena"],
  ["market-continente-canico", "Continente Modelo Caniço", "ca. 10-15 Min.", "Solider Einkauf für Vorräte und Getränke.", "Gute Alternative zu Pingo Doce.", "https://www.google.com/maps/search/?api=1&query=Continente+Modelo+Canico"],
  ["market-spar", "SPAR in Hotelnähe", "kurzer Weg", "Kleine Basics, Wasser, Brot, Snacks.", "Gut, wenn man nicht mehr fahren möchte.", "https://www.google.com/maps/search/?api=1&query=SPAR+Canico+de+Baixo"],
  ["market-sabores", "Sabores da Ilha", "kurzer Weg in Caniço", "Kleine Ergänzungen, lokale Produkte und Mitbringsel.", "Praktisch für Kleinigkeiten.", "https://www.google.com/maps/search/?api=1&query=Sabores+da+Ilha+Canico"],
  ["market-mercearia", "Mercearia José da Costa", "kurzer Weg in Caniço", "Kleiner Laden für schnelle Besorgungen.", "Gut für Brot, Getränke oder fehlende Kleinigkeiten.", "https://www.google.com/maps/search/?api=1&query=Mercearia+Jose+da+Costa+Canico"]
];

const restaurants = [
  ["rest-traineira", "A Traineira", "Hotelnähe", "€€", "Fisch, portugiesisch", "Tag 4, Tag 7 oder ruhiger Abend", "Ja, sinnvoll", "https://www.google.com/maps/search/?api=1&query=A+Traineira+Canico"],
  ["rest-rede", "A Rede", "Hotelnähe", "€€", "Fisch und Fleisch", "kurzer Abend in Caniço", "Ja, sinnvoll", "https://www.google.com/maps/search/?api=1&query=A+Rede+Canico"],
  ["rest-mare", "Snack Bar Maré", "Hotelnähe", "€", "Snack, unkompliziert", "nach Badetag oder Ruhetag", "meist nicht nötig", "https://www.google.com/maps/search/?api=1&query=Snack+Bar+Mare+Canico"],
  ["rest-terraca", "La Terraça", "Hotelnähe", "€€", "mediterran, entspannt", "leichter Abend ohne lange Fahrt", "Ja, sinnvoll", "https://www.google.com/maps/search/?api=1&query=La+Terraca+Canico"],
  ["rest-ti-laura", "Ti Laura", "Hotelnähe", "€€", "madeirensisch", "klassischer Abend in der Nähe", "Ja", "https://www.google.com/maps/search/?api=1&query=Ti+Laura+Canico"],
  ["rest-laranjinha", "Laranjinha", "Hotelnähe", "€€", "lokal, freundlich", "spontaner Caniço-Abend", "sinnvoll", "https://www.google.com/maps/search/?api=1&query=Laranjinha+Canico"],
  ["rest-polar", "O Polar", "Ausflugsrestaurants", "€", "Espetada, rustikal", "Nonnental oder Südküste", "sinnvoll", "https://www.google.com/maps/search/?api=1&query=O+Polar+Madeira"],
  ["rest-casco", "O Casco", "Ausflugsrestaurants", "€€", "Fisch, regional", "Nordostküste oder Porto da Cruz", "sinnvoll", "https://www.google.com/maps/search/?api=1&query=O+Casco+Madeira"],
  ["rest-vila-peixe", "Vila do Peixe", "Ausflugsrestaurants", "€€€", "Fisch", "Câmara de Lobos", "Ja", "https://www.google.com/maps/search/?api=1&query=Vila+do+Peixe+Camara+de+Lobos"],
  ["rest-cachalote", "Cachalote", "Ausflugsrestaurants", "€€", "Fisch, Porto Moniz", "Nordküstenrunde", "sinnvoll", "https://www.google.com/maps/search/?api=1&query=Cachalote+Porto+Moniz"],
  ["rest-curral", "Sabores do Curral", "Ausflugsrestaurants", "€€", "regional, Kastanie", "Nonnental", "sinnvoll", "https://www.google.com/maps/search/?api=1&query=Sabores+do+Curral"],
  ["rest-akua", "Besonderer Abend: ÁKUA", "Besonderer Abend", "€€€", "modern, Fisch/Meer", "Abschluss oder freier Tag", "Ja", "https://www.google.com/maps/search/?api=1&query=AKUA+Funchal"],
  ["rest-armazem", "Besonderer Abend: Armazém do Sal", "Besonderer Abend", "€€€", "gehoben, Funchal", "Funchal oder Abschiedsessen", "Ja", "https://www.google.com/maps/search/?api=1&query=Armazem+do+Sal+Funchal"]
];

const secrets = [
  ["secret-porto-cruz", "Porto da Cruz", "Nicht nur Durchfahrt: am Wasser sitzen, Café trinken, Küste schauen.", "https://www.google.com/maps/search/?api=1&query=Porto+da+Cruz+Madeira"],
  ["secret-fatima", "Capela de Nossa Senhora de Fátima bei São Vicente", "Kleiner Stopp mit Aussicht und ruhiger Stimmung.", "https://www.google.com/maps/search/?api=1&query=Capela+de+Nossa+Senhora+de+Fatima+Sao+Vicente+Madeira"],
  ["secret-seixal", "Seixal zum Verweilen", "Badesachen einpacken und dem Ort Zeit geben.", "https://www.google.com/maps/search/?api=1&query=Seixal+Madeira"],
  ["secret-pargo", "Ponta do Pargo zum Sonnenuntergang", "Weit im Westen, ruhig planen und nicht an einen langen Fahrtag hängen.", "https://www.google.com/maps/search/?api=1&query=Ponta+do+Pargo+Madeira"],
  ["secret-fanal", "Fanal am späten Nachmittag", "Spätes Licht oder Nebel machen den Wald besonders.", "https://www.google.com/maps/search/?api=1&query=Fanal+Forest+Madeira"],
  ["secret-balcony", "Balkonabend", "Bolo do Caco, Käse, Obst und Wein. Manchmal ist das der beste Programmpunkt.", "https://www.google.com/maps/search/?api=1&query=Hotel+Cais+da+Oliveira+Canico"]
];

const shoppingSections = [
  ["Erster Abend", ["Brot/Baguette", "Käse", "Schinken", "Gemüse", "Obst", "Wasser", "Wein oder Bier", "Bolo do Caco"]],
  ["Grundausstattung", ["Kaffee", "Milch", "Joghurt", "Eier", "Nudeln", "Tomatensauce", "Salat", "Hähnchen oder Fisch", "Oliven", "Snacks", "Küchenrolle", "Müllbeutel"]],
  ["Typisch Madeira", ["kleine Madeirabananen", "Maracuja", "Ananas", "Queijo Flamengo", "Bolo do Caco", "Madeirawein", "Poncha", "Queijadas"]]
];

const packingSections = [
  ["Kleidung Juli", ["leichte Jacke", "Regenjacke", "leichte Kleidung", "lange Hose für abends", "Sonnenhut oder Cap"]],
  ["Baden", ["Badeschuhe", "Badesachen", "Mikrofaserhandtuch", "Sonnencreme", "After-Sun"]],
  ["leichte Spaziergänge", ["bequeme Schuhe", "kleiner Tagesrucksack", "Trinkflasche", "leichte Snacks", "Fernglas"]],
  ["Medikamente", ["persönliche Medikamente", "Schmerzmittel", "Pflaster", "Mückenschutz", "Reisetabletten"]],
  ["Technik", ["Powerbank", "Ladekabel", "Adapter falls nötig", "Kopfhörer", "Offline-Karten laden"]],
  ["Auto", ["Führerschein", "Kreditkarte für Mietwagen", "Sonnenbrille", "Parkmünzen/Kleingeld", "Handyhalterung"]],
  ["Kitchenette", ["kleine Gewürze", "verschließbare Beutel", "Spültuch", "Lieblingskaffee", "Einkaufsbeutel"]],
  ["Dokumente", ["Personalausweis", "Krankenversicherungskarte", "Reiseunterlagen", "Hoteladresse", "Mietwagenunterlagen"]]
];

const weatherModes = [
  ["Wenn Pico do Arieiro neblig ist", ["Funchal", "Caniço", "Garajau", "Pooltag"]],
  ["Wenn die Nordküste regnerisch ist", ["Südküste", "Machico", "Câmara de Lobos"]],
  ["Wenn es sehr heiß ist", ["Fanal", "Ribeiro Frio", "früher starten", "Mittagspause im Hotel"]],
  ["Wenn man müde ist", ["Ponta da Oliveira", "Balkon", "kleiner Einkauf", "kurzer Cafébesuch"]]
];

let activeStopId = null;
let preserveScroll = false;

const stopInfos = [
  {
    id: "stop-hotel",
    title: "Hotel Cais da Oliveira",
    area: "Hotelnähe",
    explanation: "Das Hotel liegt in Caniço de Baixo direkt am Meer und ist die ruhige Basis der Reise.",
    worth: "Meerblick, Frühstück, Kitchenette und kurze Wege machen es ideal für entspannte Tage ohne ständigen Ortswechsel.",
    time: "30-60 Min. zum Ankommen, sonst als flexible Basis",
    parking: "Hotelparkplätze oder Parkmöglichkeiten in der Umgebung nutzen; nach Ausflügen früh genug zurückfahren.",
    photo: "Morgens oder abends vom Balkon auf Licht, Wolken und Atlantik achten.",
    walk: "Kurze Wege rund um die Anlage und zur Ponta da Oliveira sind gut als lockerer Spaziergang.",
    bath: "Pool, Meerzugang oder nahe Ponta da Oliveira je nach Bedingungen.",
    cafe: "Frühstück im Hotel, abends unkompliziert mit Kitchenette oder Restaurants in Caniço.",
    route: "https://www.google.com/maps/search/?api=1&query=Hotel+Cais+da+Oliveira+Canico"
  },
  {
    id: "stop-ponta-oliveira",
    title: "Ponta da Oliveira",
    area: "Hotelnähe",
    explanation: "Küstenbereich direkt bei Caniço de Baixo mit Blick auf Felsen, Meer und die Südküste.",
    worth: "Perfekt für kurze Meerzeit, ohne den Wagen zu bewegen.",
    time: "30-90 Min.",
    parking: "Am besten vom Hotel aus zu Fuß gehen.",
    photo: "Seitliches Licht am Morgen oder Abend bringt die Felsen besonders schön heraus.",
    walk: "Kurzer, leichter Küstenspaziergang möglich; auf Stufen und rutschige Stellen achten.",
    bath: "Ja, bei ruhigem Meer. Badeschuhe sind sinnvoll.",
    cafe: "Hotelbar oder kleine Stopps in Caniço de Baixo.",
    route: "https://www.google.com/maps/search/?api=1&query=Ponta+da+Oliveira+Canico"
  },
  {
    id: "stop-canico",
    title: "Caniço",
    area: "Hotelnähe",
    explanation: "Caniço ist der praktische Heimatort der Reise: nah am Flughafen, nah an Funchal und trotzdem ruhig.",
    worth: "Gute Basis für kurze Einkäufe, einfache Abendessen und Tage ohne großes Programm.",
    time: "30-90 Min.",
    parking: "Je nach Ziel im Ort parken; in Hotelnähe lieber zu Fuß gehen.",
    photo: "Kleine Ortsblicke, Meerblick und Abendlicht statt großer Sehenswürdigkeiten.",
    walk: "Leichte Wege im Ort und rund um Caniço de Baixo.",
    bath: "Ponta da Oliveira oder Hotelbereich.",
    cafe: "Snackbars, kleine Cafés und Restaurants in Hotelnähe.",
    route: "https://www.google.com/maps/search/?api=1&query=Canico+Madeira"
  },
  {
    id: "stop-garajau",
    title: "Garajau",
    area: "Hotelnähe",
    explanation: "Garajau liegt oberhalb der Küste und verbindet Aussicht, Cristo Rei und Strandzugang.",
    worth: "Ein kurzer Ausflug mit viel Meerblick und wenig Fahrzeit.",
    time: "1-2 Std.",
    parking: "Oben beim Aussichtspunkt meist einfacher als unten am Strand.",
    photo: "Cristo Rei mit Küste und weitem Atlantik im Hintergrund.",
    walk: "Kurze Wege am Aussichtspunkt; zum Strand ist es steiler.",
    bath: "Praia do Garajau bei ruhigem Meer.",
    cafe: "Snack oder Café am Strand bzw. danach in Caniço.",
    route: "https://www.google.com/maps/search/?api=1&query=Garajau+Madeira"
  },
  {
    id: "stop-cristo-rei",
    title: "Cristo Rei",
    area: "Hotelnähe",
    explanation: "Die Christusstatue von Garajau steht an einem markanten Aussichtspunkt über dem Meer.",
    worth: "Sehr nah am Hotel und trotzdem ein echter Madeira-Blick.",
    time: "30-60 Min.",
    parking: "Parken oben beim Aussichtspunkt.",
    photo: "Vom Weg aus Statue, Klippen und Meer zusammen aufnehmen.",
    walk: "Kurzer leichter Spaziergang am Aussichtspunkt, mit einigen Stufen und Kanten.",
    bath: "Mit Praia do Garajau kombinierbar.",
    cafe: "Danach Strandstopp oder Caniço.",
    route: "https://www.google.com/maps/search/?api=1&query=Cristo+Rei+do+Garajau"
  },
  {
    id: "stop-praia-garajau",
    title: "Praia do Garajau",
    area: "Hotelnähe",
    explanation: "Kieselstrand unterhalb von Garajau im Meeresschutzgebiet.",
    worth: "Schöner Bade- und Schnorchelstopp, wenn das Meer ruhig ist.",
    time: "1-2 Std.",
    parking: "Unten begrenzt; alternativ oben parken und den Zugang bewusst einplanen.",
    photo: "Der Blick vom Strand zurück zu den Felsen ist besonders schön.",
    walk: "Am Strand leicht, der Weg dorthin kann steil sein.",
    bath: "Ja. Badeschuhe und Schnorchelmaske lohnen sich.",
    cafe: "Strandbar/Snack je nach Öffnung; sonst später Caniço.",
    route: "https://www.google.com/maps/search/?api=1&query=Praia+do+Garajau"
  },
  {
    id: "stop-mercado",
    title: "Mercado dos Lavradores",
    area: "Funchal",
    explanation: "Markthalle in Funchal mit Obst, Blumen, Farben und viel Stadtleben.",
    worth: "Ein sinnlicher Start in Funchal, besonders für Madeira-Früchte und Fotomotive.",
    time: "30-60 Min.",
    parking: "Parkhaus in Altstadtnähe wählen und zu Fuß gehen.",
    photo: "Obststände und Blumen aus der Nähe fotografieren, ohne den Weg zu blockieren.",
    walk: "Leichter Stadtstopp, aber lebhaft und teils eng.",
    cafe: "Danach Altstadt-Café oder Promenade.",
    route: "https://www.google.com/maps/search/?api=1&query=Mercado+dos+Lavradores+Funchal"
  },
  {
    id: "stop-funchal-oldtown",
    title: "Altstadt Funchal",
    area: "Funchal",
    explanation: "Historische Straßen, bemalte Türen, kleine Lokale und ruhige Ecken nahe dem Markt.",
    worth: "Ideal für Funchal ohne Pflichtprogramm: schauen, sitzen, Café trinken.",
    time: "1-2 Std.",
    parking: "Parkhaus nahe Mercado oder Marina.",
    photo: "Bemalte Türen in der Rua de Santa Maria und kleine Gassen.",
    walk: "Leicht, mit Kopfsteinpflaster und gelegentlichen Steigungen.",
    cafe: "Viele Cafés und Restaurants in der Altstadt.",
    route: "https://www.google.com/maps/search/?api=1&query=Funchal+Old+Town"
  },
  {
    id: "stop-funchal-marina",
    title: "Hafen/Marina Funchal",
    area: "Funchal",
    explanation: "Zentraler Hafenbereich mit Booten, Promenade und weitem Blick auf die Bucht.",
    worth: "Guter ruhiger Abschluss für den Stadtspaziergang.",
    time: "30-60 Min.",
    parking: "Parkhäuser und Parkflächen rund um Marina und Avenida do Mar.",
    photo: "Boote im Vordergrund, Stadt und Berge dahinter.",
    walk: "Sehr leicht und eben entlang der Promenade.",
    cafe: "Cafés rund um Marina und Avenida.",
    route: "https://www.google.com/maps/search/?api=1&query=Funchal+Marina"
  },
  {
    id: "stop-promenade",
    title: "Promenade",
    area: "Funchal",
    explanation: "Die Promenade verbindet Stadt, Hafenblick und entspannte Pausen am Wasser.",
    worth: "Gut, wenn man Funchal ruhig und ohne Museumsmarathon erleben möchte.",
    time: "30-90 Min.",
    parking: "Je nach Abschnitt Parkhaus in Funchal oder Lido nutzen.",
    photo: "Blick über die Bucht, besonders mit Wolken über den Bergen.",
    walk: "Leicht und weitgehend eben.",
    bath: "Doca do Cavacas oder Barreirinha lassen sich als Badeoption ergänzen.",
    cafe: "Viele Cafés entlang der Strecke.",
    route: "https://www.google.com/maps/search/?api=1&query=Funchal+Promenade"
  },
  {
    id: "stop-barreirinha",
    title: "Barreirinha",
    area: "Funchal",
    explanation: "Kleines Meerbad am Rand der Altstadt mit Blick auf Atlantik und Stadt.",
    worth: "Schöne leichte Bade- oder Getränkepause nach der Altstadt.",
    time: "45-90 Min.",
    parking: "Zu Fuß aus der Altstadt am angenehmsten; Parken in der Nähe kann knapp sein.",
    photo: "Meerbad, Küstenlinie und Stadtlicht Richtung Abend.",
    walk: "Kurzer Stadtweg, teils mit Steigung.",
    bath: "Ja, wenn geöffnet und das Meer passt.",
    cafe: "Barreirinha Bar Café ist ein naheliegender Stopp.",
    route: "https://www.google.com/maps/search/?api=1&query=Barreirinha+Funchal"
  },
  {
    id: "stop-guindaste",
    title: "Miradouro do Guindaste",
    area: "Nordostküste",
    explanation: "Aussichtspunkt bei Faial mit Blick auf die raue Nordostküste.",
    worth: "Große Küstenkulisse ohne lange Wanderung.",
    time: "20-45 Min.",
    parking: "Parkplätze direkt am Aussichtspunkt, bei Andrang kurz warten.",
    photo: "Klippen und Meer im Panorama; bei klarer Sicht sehr stark.",
    walk: "Kurzer leichter Weg am Aussichtspunkt.",
    cafe: "Danach Santana, Faial oder Porto da Cruz.",
    route: "https://www.google.com/maps/search/?api=1&query=Miradouro+do+Guindaste"
  },
  {
    id: "stop-santana",
    title: "Santana",
    area: "Nordostküste",
    explanation: "Ort im Nordosten, bekannt für die traditionellen kleinen Häuser mit Strohdächern.",
    worth: "Klassischer Fotostopp, gut kombinierbar mit Guindaste und Porto da Cruz.",
    time: "45-90 Min.",
    parking: "Zentrale Parkplätze nutzen.",
    photo: "Santana-Häuser frontal und mit Gartenfarben aufnehmen.",
    walk: "Leichter Ortsbummel, keine Wanderung nötig.",
    cafe: "Café oder Snack im Ort.",
    route: "https://www.google.com/maps/search/?api=1&query=Santana+Madeira"
  },
  {
    id: "stop-faial",
    title: "Faial",
    area: "Nordostküste",
    explanation: "Ruhiger Küstenort zwischen Santana und Porto da Cruz mit Blick auf Berge und Meer.",
    worth: "Guter kleiner Zwischenstopp, wenn man die Nordostküste nicht nur durchfahren möchte.",
    time: "20-45 Min.",
    parking: "Im Ort oder an Aussichtspunkten kurz parken.",
    photo: "Blick Richtung Küste und grüne Hänge.",
    walk: "Kurzer leichter Orts- oder Aussichtsstopp.",
    cafe: "Kleiner Snackstopp möglich, sonst weiter nach Porto da Cruz.",
    route: "https://www.google.com/maps/search/?api=1&query=Faial+Madeira"
  },
  {
    id: "stop-porto-cruz",
    title: "Porto da Cruz",
    area: "Nordostküste",
    explanation: "Küstenort mit entspannter Promenade, Meerblick und rauer Nordküstenstimmung.",
    worth: "Einer der schönsten Orte, um nicht nur zu halten, sondern wirklich Pause zu machen.",
    time: "1-2 Std.",
    parking: "Zentrale Parkplätze im Ort nutzen.",
    photo: "Promenade, Brandung und Penha d'Águia als Kulisse.",
    walk: "Leichter Spaziergang am Wasser.",
    bath: "Nur bei ruhigem Meer und passender Stelle.",
    cafe: "Café oder Mittagspause im Ort.",
    route: "https://www.google.com/maps/search/?api=1&query=Porto+da+Cruz+Madeira"
  },
  {
    id: "stop-pico-arieiro",
    title: "Pico do Arieiro",
    area: "Berge und Natur",
    explanation: "Einer der höchsten erreichbaren Punkte Madeiras, direkt mit dem Auto anfahrbar.",
    worth: "Spektakuläre Bergblicke ohne anspruchsvolle Wanderung, wenn das Wetter mitspielt.",
    time: "45-90 Min.",
    parking: "Früh starten; Parkplätze können schnell voll sein.",
    photo: "Wolken, Gipfel und Lichtwechsel; warme Jacke nicht vergessen.",
    walk: "Nur kurze Spaziergänge am Aussichtspunkt, keine lange Gipfeltour nötig.",
    cafe: "Café/Snack am Bereich, Öffnung vor Ort prüfen.",
    route: "https://www.google.com/maps/search/?api=1&query=Pico+do+Arieiro"
  },
  {
    id: "stop-ribeiro-frio",
    title: "Ribeiro Frio",
    area: "Berge und Natur",
    explanation: "Grüner Bergort im Lorbeerwald, Ausgangspunkt für leichte Wege wie Balcões.",
    worth: "Kühler, frischer Kontrast zur Küste und gut bei heißem Wetter.",
    time: "45-120 Min.",
    parking: "Begrenzte Parkplätze, am besten früher kommen.",
    photo: "Moos, Waldwege und weiches Licht im Grün.",
    walk: "Leichte Spaziergänge möglich; bei Regen rutschig.",
    cafe: "Café/Restaurant im Ort möglich.",
    route: "https://www.google.com/maps/search/?api=1&query=Ribeiro+Frio+Madeira"
  },
  {
    id: "stop-balcoes",
    title: "Levada dos Balcões",
    area: "Berge und Natur",
    explanation: "Kurze, fast ebene Levada ab Ribeiro Frio zu einem Aussichtspunkt.",
    worth: "Eine der leichtesten klassischen Levada-Erfahrungen Madeiras.",
    time: "1-1,5 Std.",
    parking: "In Ribeiro Frio parken und den Start zu Fuß erreichen.",
    photo: "Am Aussichtspunkt auf Wolkenlücken warten.",
    walk: "Ca. 3 km hin und zurück, fast eben; nicht bei starkem Regen.",
    cafe: "Vor oder nach dem Weg in Ribeiro Frio einkehren.",
    route: "https://www.google.com/maps/search/?api=1&query=Levada+dos+Balcoes+Madeira"
  },
  {
    id: "stop-fanal",
    title: "Fanalwald",
    area: "Berge und Natur",
    explanation: "Alter Lorbeerwald mit moosigen Bäumen, Wiesen und oft mystischer Nebelstimmung.",
    worth: "Besonders atmosphärisch am späten Nachmittag oder bei leichtem Nebel.",
    time: "1-2 Std.",
    parking: "Parkplatz am Fanal nutzen; Wetterwechsel einplanen.",
    photo: "Einzelne knorrige Bäume mit Nebel oder weichem Seitenlicht.",
    walk: "Leichte Spaziergänge auf Wiesen und Wegen, bei Nässe vorsichtig.",
    cafe: "Picknick mitnehmen; Cafés eher vorher/nachher einplanen.",
    route: "https://www.google.com/maps/search/?api=1&query=Fanal+Forest+Madeira"
  },
  {
    id: "stop-paul-serra",
    title: "Paul da Serra",
    area: "Berge und Natur",
    explanation: "Hochebene im Inselinneren, oft weit, windig und ganz anders als die Küste.",
    worth: "Schöner Kontrast auf der Rückfahrt von Porto Moniz oder Seixal.",
    time: "20-45 Min. als Stopp",
    parking: "Nur an sicheren Haltebuchten oder Parkflächen stoppen.",
    photo: "Weite, Wolken und Straße als ruhiges Landschaftsmotiv.",
    walk: "Nur kurze Stopps, besonders bei Wind und Nebel vorsichtig.",
    cafe: "Eher vorher oder nachher einplanen.",
    route: "https://www.google.com/maps/search/?api=1&query=Paul+da+Serra+Madeira"
  },
  {
    id: "stop-sao-lourenco",
    title: "Ponta de São Lourenço",
    area: "Osten",
    explanation: "Karge, dramatische Ostspitze Madeiras mit weitem Blick aufs Meer.",
    worth: "Ganz andere Landschaft als der grüne Inselkern; schon der erste Aussichtspunkt reicht.",
    time: "45-90 Min. für die leichte Variante",
    parking: "Früh am Parkplatz sein, besonders im Juli.",
    photo: "Felsfarben, Meer und Windwolken; nicht nur mittags fotografieren.",
    walk: "Nur bis zum ersten Aussichtspunkt gehen, wenn es leicht bleiben soll.",
    bath: "Danach Machico als bequeme Badeoption.",
    cafe: "Eis oder Café später in Machico.",
    route: "https://www.google.com/maps/search/?api=1&query=Ponta+de+Sao+Lourenco"
  },
  {
    id: "stop-machico",
    title: "Machico",
    area: "Osten",
    explanation: "Küstenstadt mit bequemem Strand, Promenade und guter Infrastruktur.",
    worth: "Ideal nach São Lourenço: Baden, Eis, Café und kein komplizierter Zugang.",
    time: "1-3 Std.",
    parking: "Parkplätze nahe Strand und Promenade suchen.",
    photo: "Strand mit Bergen und Bucht im Hintergrund.",
    walk: "Leichte Promenade, gut für einen ruhigen Ausklang.",
    bath: "Ja, eine der bequemsten Badeoptionen.",
    cafe: "Cafés und Eisdielen nahe Strand.",
    route: "https://www.google.com/maps/search/?api=1&query=Machico+Madeira"
  },
  {
    id: "stop-ribeira-brava",
    title: "Ribeira Brava",
    area: "Westen und Nordküste",
    explanation: "Küstenort an der Südküste, gut als erster Stopp vor der Nordküstenrunde.",
    worth: "Kurze Pause, Kaffee und ein ruhiger Start in einen langen Fahrtag.",
    time: "20-45 Min.",
    parking: "Parkplätze im Ort oder nahe Promenade.",
    photo: "Promenade, Kirche und Talöffnung.",
    walk: "Leichter kurzer Ortsgang.",
    cafe: "Café oder Snack vor der Weiterfahrt.",
    route: "https://www.google.com/maps/search/?api=1&query=Ribeira+Brava+Madeira"
  },
  {
    id: "stop-sao-vicente",
    title: "São Vicente",
    area: "Westen und Nordküste",
    explanation: "Ort an der Nordküste mit Bergen, Meer und ruhigerer Atmosphäre.",
    worth: "Schöner Zwischenstopp auf dem Weg zu Véu da Noiva, Seixal oder Porto Moniz.",
    time: "30-60 Min.",
    parking: "Im Ort oder an der Küste parken.",
    photo: "Berge hinter dem Ort und Nordküstenbrandung.",
    walk: "Leichter Spaziergang im Ort oder an der Küste.",
    cafe: "Café im Ort oder später Seixal/Porto Moniz.",
    route: "https://www.google.com/maps/search/?api=1&query=Sao+Vicente+Madeira"
  },
  {
    id: "stop-veu-noiva",
    title: "Véu da Noiva",
    area: "Westen und Nordküste",
    explanation: "Bekannter Wasserfallblick an der Nordküste, dessen Name an einen Brautschleier erinnert.",
    worth: "Kurzer Fotostopp mit typischer Madeira-Küstenkulisse.",
    time: "10-25 Min.",
    parking: "Nur sicher und ausgeschildert halten; Verkehr beachten.",
    photo: "Wasserfall, alte Küstenstraße und Meer zusammen rahmen.",
    walk: "Kein Spaziergang nötig, eher Aussichtspunkt.",
    cafe: "Weiter nach Seixal oder Porto Moniz.",
    route: "https://www.google.com/maps/search/?api=1&query=Veu+da+Noiva+Madeira"
  },
  {
    id: "stop-seixal",
    title: "Seixal",
    area: "Westen und Nordküste",
    explanation: "Kleiner Ort an der Nordküste, bekannt für schwarzen Sandstrand, grüne Bergkulisse und wilde Atlantikküste.",
    worth: "Einer der schönsten Badestopps der Insel und ideal, um wirklich Pause zu machen.",
    time: "1-2 Std.",
    parking: "Parkplätze im Ort und in Strandnähe, je nach Saison begrenzt.",
    photo: "Der Blick vom Strand auf die grüne Steilküste ist besonders schön.",
    walk: "Kurzer Spaziergang am Strand oder entlang der Küste möglich.",
    bath: "Ja, bei ruhigem Meer sehr schön. Badeschuhe oder Wasserschuhe sind sinnvoll.",
    cafe: "Kleiner Café- oder Snackstopp im Ort möglich.",
    route: "https://www.google.com/maps/search/?api=1&query=Seixal+Madeira+beach"
  },
  {
    id: "stop-porto-moniz",
    title: "Porto Moniz",
    area: "Westen und Nordküste",
    explanation: "Ort im Nordwesten mit bekannten Naturschwimmbecken aus Lavagestein.",
    worth: "Gute Mischung aus Baden, Mittagspause und beeindruckender Küstenlandschaft.",
    time: "1,5-3 Std.",
    parking: "Größere Parkbereiche im Ort, im Juli früh entspannter.",
    photo: "Lavapools mit Brandung und Felsen im Hintergrund.",
    walk: "Leichter Spaziergang entlang der Becken und Promenade.",
    bath: "Ja. Badeschuhe rund um Lavagestein sinnvoll.",
    cafe: "Cachalote oder andere Lokale in Laufnähe.",
    route: "https://www.google.com/maps/search/?api=1&query=Porto+Moniz+natural+swimming+pools"
  },
  {
    id: "stop-cabo-girao",
    title: "Cabo Girão",
    area: "Südwesten",
    explanation: "Hoher Aussichtspunkt mit Glasplattform über der Südküste.",
    worth: "Kurzer, eindrucksvoller Stopp mit weitem Blick und wenig Laufaufwand.",
    time: "30-60 Min.",
    parking: "Besucherparkplatz am Skywalk nutzen.",
    photo: "Glasplattform, Küste und Funchal-Richtung; bei Andrang Geduld.",
    walk: "Sehr kurzer leichter Stopp.",
    cafe: "Danach Câmara de Lobos für Café oder Mittagessen.",
    route: "https://www.google.com/maps/search/?api=1&query=Cabo+Girao"
  },
  {
    id: "stop-camara-lobos",
    title: "Câmara de Lobos",
    area: "Südwesten",
    explanation: "Fischerort mit Hafen, bunten Booten und gemütlicher Promenade.",
    worth: "Entspannter Ort für Mittagessen, Café und Hafenstimmung.",
    time: "1-2 Std.",
    parking: "Zentrale Parkplätze oder Parkhaus nutzen.",
    photo: "Bunte Boote im Hafen mit Häusern am Hang.",
    walk: "Leichter Spaziergang am Hafen.",
    cafe: "Vila do Peixe, Hafencafés oder Poncha-Stopp.",
    route: "https://www.google.com/maps/search/?api=1&query=Camara+de+Lobos"
  },
  {
    id: "stop-eira-serrado",
    title: "Eira do Serrado",
    area: "Nonnental",
    explanation: "Aussichtspunkt hoch über Curral das Freiras mit Blick in das Nonnental.",
    worth: "Großer Bergblick ohne lange Wanderung.",
    time: "30-60 Min.",
    parking: "Parkplatz am Aussichtspunkt/Hotelbereich nutzen.",
    photo: "Talblick mit Bergen, besonders bei klaren Wolkenlücken.",
    walk: "Kurzer Weg zum Aussichtspunkt, teils Stufen.",
    cafe: "Café am Aussichtspunkt möglich.",
    route: "https://www.google.com/maps/search/?api=1&query=Eira+do+Serrado"
  },
  {
    id: "stop-curral",
    title: "Curral das Freiras",
    area: "Nonnental",
    explanation: "Dorf im tief eingeschnittenen Nonnental, bekannt für Kastanienprodukte.",
    worth: "Ruhiger Ort für Kastanienkuchen und eine andere Seite Madeiras.",
    time: "45-90 Min.",
    parking: "Im Ort ausgeschilderte Parkmöglichkeiten nutzen.",
    photo: "Dorf, Talwände und kleine Details im Ort.",
    walk: "Leichter Ortsbummel.",
    cafe: "Kastanienkuchen probieren, z. B. bei einem Café im Ort.",
    route: "https://www.google.com/maps/search/?api=1&query=Curral+das+Freiras"
  },
  {
    id: "stop-fatima",
    title: "Capela de Nossa Senhora de Fátima",
    area: "Geheimtipps",
    explanation: "Kleine Kapelle oberhalb von São Vicente mit schöner Aussicht auf Tal und Küste.",
    worth: "Ruhiger, kurzer Zusatzstopp abseits der großen Programmpunkte.",
    time: "20-40 Min.",
    parking: "Nur an geeigneten Stellen kurz und rücksichtsvoll parken.",
    photo: "Kapelle mit Tal, Bergen oder Meer im Hintergrund.",
    walk: "Kurzer leichter Stopp, je nach Zugang mit kleinen Steigungen.",
    cafe: "Danach São Vicente oder Seixal.",
    route: "https://www.google.com/maps/search/?api=1&query=Capela+de+Nossa+Senhora+de+Fatima+Sao+Vicente+Madeira"
  },
  {
    id: "stop-ponta-pargo",
    title: "Ponta do Pargo",
    area: "Geheimtipps",
    explanation: "Westlicher Küstenbereich mit Leuchtturmstimmung und weitem Atlantikblick.",
    worth: "Besonders schön zum Sonnenuntergang, wenn der Tag nicht schon zu lang ist.",
    time: "45-90 Min.",
    parking: "Bei Aussichtspunkten und Leuchtturm nur ausgewiesene Flächen nutzen.",
    photo: "Sonnenuntergang, Leuchtturm und Atlantik weit aufnehmen.",
    walk: "Kurze leichte Wege an Aussichtspunkten, auf Wind achten.",
    cafe: "Vorher oder nachher in einem Ort einplanen.",
    route: "https://www.google.com/maps/search/?api=1&query=Ponta+do+Pargo+Madeira"
  }
];

const dayStops = {
  1: ["stop-hotel", "stop-canico", "stop-ponta-oliveira"],
  2: ["stop-hotel", "stop-canico", "stop-ponta-oliveira"],
  3: ["stop-mercado", "stop-funchal-oldtown", "stop-funchal-marina", "stop-promenade", "stop-barreirinha"],
  4: ["stop-garajau", "stop-cristo-rei", "stop-praia-garajau"],
  5: ["stop-guindaste", "stop-santana", "stop-faial", "stop-porto-cruz"],
  6: ["stop-pico-arieiro", "stop-ribeiro-frio"],
  7: ["stop-hotel", "stop-ponta-oliveira", "stop-canico"],
  8: ["stop-sao-lourenco", "stop-machico"],
  9: ["stop-cabo-girao", "stop-camara-lobos"],
  10: ["stop-ribeira-brava", "stop-sao-vicente", "stop-veu-noiva", "stop-seixal", "stop-porto-moniz", "stop-paul-serra"],
  11: ["stop-fanal", "stop-porto-moniz"],
  12: ["stop-ribeiro-frio", "stop-balcoes", "stop-santana"],
  13: ["stop-eira-serrado", "stop-curral"],
  14: ["stop-ponta-oliveira", "stop-machico", "stop-ponta-pargo", "stop-fatima"]
};

function icon(name) {
  const icons = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9 21v-6h6v6"/>',
    back: '<path d="m15 18-6-6 6-6"/>',
    route: '<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h3a4 4 0 0 0 0-8H9a4 4 0 0 1 0-8h7"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/>',
    utensils: '<path d="M4 3v8"/><path d="M8 3v8"/><path d="M6 3v18"/><path d="M14 3v18"/><path d="M14 3c4 2 5 7 0 10"/>',
    waves: '<path d="M2 16c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/><path d="M2 20c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/><path d="M2 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/>',
    basket: '<path d="m5 11 2-7"/><path d="m19 11-2-7"/><path d="M3 11h18l-2 10H5L3 11Z"/><path d="M9 15v3"/><path d="M15 15v3"/>',
    binoculars: '<path d="M7 6h3v14H4a2 2 0 0 1-2-2v-4l3-8h2Z"/><path d="M17 6h-3v14h6a2 2 0 0 0 2-2v-4l-3-8h-2Z"/><path d="M10 12h4"/><path d="M10 6h4"/>',
    spark: '<path d="m12 3 2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2L12 3Z"/>',
    cloud: '<path d="M17.5 19H7a5 5 0 1 1 1.2-9.8A6 6 0 0 1 20 11.5a3.8 3.8 0 0 1-2.5 7.5Z"/>',
    bag: '<path d="M6 8h12l1 13H5L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2 7.5 14 3 9.6l6.2-.9L12 3Z"/>'
  };
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.spark}</svg>`;
}

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function favoriteMap() {
  return readJson(STORAGE_KEYS.favorites, {});
}

function doneDays() {
  return readJson(STORAGE_KEYS.doneDays, []);
}

function checkState() {
  return readJson(STORAGE_KEYS.checklist, {});
}

function stopMap() {
  return Object.fromEntries(stopInfos.map((stop) => [stop.id, stop]));
}

function itemRegistry() {
  const registry = {};
  days.forEach((day) => {
    registry[day.id] = {
      id: day.id,
      type: "Tagesplan",
      title: `Tag ${day.day}: ${day.title}`,
      subtitle: day.description,
      route: day.maps,
      anchor: `#days`
    };
  });
  swimSpots.forEach((spot) => {
    registry[spot.id] = {
      id: spot.id,
      type: "Baden",
      title: spot.title,
      subtitle: spot.description,
      route: spot.route,
      anchor: "#swim"
    };
  });
  whaleSpots.forEach(([id, title, description, route]) => {
    registry[id] = { id, type: "Wale & Delfine", title, subtitle: description, route, anchor: "#whales" };
  });
  restaurants.forEach(([id, title, group, price, kitchen, dayFit, reservation, route]) => {
    registry[id] = { id, type: group, title, subtitle: `${kitchen} · ${dayFit} · Reservierung: ${reservation}`, route, anchor: "#restaurants" };
  });
  secrets.forEach(([id, title, description, route]) => {
    registry[id] = { id, type: "Geheimtipp", title, subtitle: description, route, anchor: "#secrets" };
  });
  stopInfos.forEach((stop) => {
    registry[stop.id] = {
      id: stop.id,
      type: stop.area,
      title: stop.title,
      subtitle: stop.worth,
      route: stop.route,
      anchor: "#days"
    };
  });
  return registry;
}

function toggleFavorite(id) {
  const favorites = favoriteMap();
  if (favorites[id]) {
    delete favorites[id];
  } else {
    const item = itemRegistry()[id];
    if (item) favorites[id] = item;
  }
  writeJson(STORAGE_KEYS.favorites, favorites);
}

function toggleDone(dayNumber) {
  const current = new Set(doneDays());
  const value = Number(dayNumber);
  if (current.has(value)) current.delete(value);
  else current.add(value);
  writeJson(STORAGE_KEYS.doneDays, [...current].sort((a, b) => a - b));
}

function mapsButton(url, label = "Route öffnen") {
  return `<a class="btn primary" href="${url}" target="_blank" rel="noopener">${icon("route")}<span>${label}</span></a>`;
}

function favoriteButton(id) {
  const active = Boolean(favoriteMap()[id]);
  return `<button class="btn js-fav ${active ? "is-active" : ""}" type="button" data-id="${id}">${icon("heart")}<span>${active ? "Favorit" : "Favorit"}</span></button>`;
}

function stopButtons(dayNumber) {
  const stops = stopMap();
  const stopIds = dayStops[dayNumber] || [];
  if (!stopIds.length) return "";

  return `
    <section class="stop-strip" aria-label="Stopps mit Infofenstern">
      <div class="stop-strip-head">
        <strong>Stopps</strong>
        <span>kurze Infos für unterwegs</span>
      </div>
      <div class="stop-buttons">
        ${stopIds.map((id) => {
          const stop = stops[id];
          if (!stop) return "";
          return `
            <button class="stop-button js-stop" type="button" data-stop="${id}">
              <span>${stop.title}</span>
              <small>Mehr erfahren</small>
            </button>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function renderStopModal() {
  if (!activeStopId) return "";
  const stop = stopMap()[activeStopId];
  if (!stop) return "";
  const rows = [
    ["Kurze Erklärung", stop.explanation],
    ["Warum lohnt es sich?", stop.worth],
    ["Zeit", stop.time],
    ["Parken", stop.parking],
    ["Fototipp", stop.photo],
    ["Leichter Spaziergang", stop.walk],
    ["Baden", stop.bath],
    ["Café/Restaurant", stop.cafe]
  ].filter(([, value]) => Boolean(value));

  return `
    <div class="modal-backdrop js-modal-close" role="presentation">
      <section class="stop-modal" role="dialog" aria-modal="true" aria-labelledby="stop-modal-title">
        <button class="modal-close js-modal-close" type="button" aria-label="Infofenster schließen">×</button>
        <div class="meta-row"><span class="meta">${stop.area}</span></div>
        <h2 id="stop-modal-title">${stop.title}</h2>
        <div class="modal-details">
          ${rows.map(([label, value]) => `
            <div class="modal-detail">
              <strong>${label}</strong>
              <span>${value}</span>
            </div>
          `).join("")}
        </div>
        <div class="action-row">
          ${mapsButton(stop.route)}
          ${favoriteButton(stop.id)}
        </div>
      </section>
    </div>
  `;
}

function pageChrome(view, content) {
  const route = routes[view] || routes.home;
  return `
    <nav class="topbar" aria-label="App-Navigation">
      <div class="brand-mini">
        <strong>Madeira 2026</strong>
        <span>${route.title}</span>
      </div>
      <button class="btn ghost js-back" type="button">${icon("back")}<span>Zurück</span></button>
      <a class="btn ghost" href="#home">${icon("home")}<span>Home</span></a>
    </nav>
    <main class="page">
      <header class="page-title">
        <p class="eyebrow">Reise zu zweit</p>
        <h1>${route.title}</h1>
        <p>${route.subtitle}</p>
      </header>
      ${content}
    </main>
  `;
}

function renderHome() {
  return `
    <main>
      <section class="hero">
        <div class="hero-content">
          <p class="eyebrow">Persönlicher Reiseführer</p>
          <h1>Madeira 2026</h1>
          <p class="hero-text">14 entspannte Tage in Caniço mit Meerblick, Mietwagen, leichten Spaziergängen, guten Badestopps und genug Zeit für Balkonabende.</p>
          <div class="trip-strip" aria-label="Reisedaten">
            <span class="pill">Juli</span>
            <span class="pill">Hotel Cais da Oliveira</span>
            <span class="pill">Junior Suite mit Kitchenette</span>
            <span class="pill">Frühstück inklusive</span>
            <span class="pill">Mietwagen</span>
          </div>
        </div>
      </section>
      <section class="content-band" aria-labelledby="home-nav-title">
        <div class="section-head">
          <h2 id="home-nav-title">Reisebereiche</h2>
          <p>Alles ist lokal gespeichert: Favoriten, erledigte Tage und Checklisten bleiben auch ohne Verbindung erhalten.</p>
        </div>
        <div class="tile-grid">
          ${homeTiles.map(([view, label, iconName]) => `
            <a class="tile" href="#${view}">
              ${icon(iconName)}
              <span class="tile-title">${label}</span>
            </a>
          `).join("")}
        </div>
      </section>
    </main>
  `;
}

function renderDays() {
  const done = new Set(doneDays());
  const cards = days.map((day) => `
    <article class="day-card" id="${day.id}">
      <div class="meta-row">
        <span class="meta">Tag ${day.day}</span>
        <span class="meta">${day.intensity}</span>
        ${done.has(day.day) ? '<span class="meta done">erledigt</span>' : ""}
      </div>
      <h2>${day.title}</h2>
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
        ${mapsButton(day.maps, "Google Maps")}
        <button class="btn turquoise js-done" type="button" data-day="${day.day}">${icon("check")}<span>${done.has(day.day) ? "Erledigt" : "Als erledigt markieren"}</span></button>
        ${favoriteButton(day.id)}
      </div>
    </article>
  `).join("");

  return pageChrome("days", `<div class="stack">${cards}</div>`);
}

function renderMaps() {
  const cards = days.map((day) => `
    <article class="card">
      <div class="meta-row"><span class="meta">Tag ${day.day}</span><span class="meta">${day.intensity}</span></div>
      <h3>${day.title}</h3>
      <p>${day.route}</p>
      <div class="action-row">${mapsButton(day.maps, "Route öffnen")}</div>
    </article>
  `).join("");
  return pageChrome("maps", `<div class="card-grid">${cards}</div>`);
}

function renderSwim() {
  const cards = swimSpots.map((spot) => `
    <article class="card">
      <h2>${spot.title}</h2>
      <p>${spot.description}</p>
      <div class="details">
        <div class="detail"><strong>Geeignet für</strong><span>${spot.suitable}</span></div>
        <div class="detail"><strong>Badeschuhe</strong><span>${spot.shoes}</span></div>
        <div class="detail"><strong>Parken</strong><span>${spot.parking}</span></div>
        <div class="detail"><strong>WC/Duschen</strong><span>${spot.facilities}</span></div>
        <div class="detail"><strong>Restaurant/Café</strong><span>${spot.cafe}</span></div>
      </div>
      <div class="action-row">${mapsButton(spot.route)}${favoriteButton(spot.id)}</div>
    </article>
  `).join("");
  return pageChrome("swim", `<div class="card-grid">${cards}</div>`);
}

function renderWhales() {
  const cards = whaleSpots.map(([id, title, description, route]) => `
    <article class="card">
      <h2>${title}</h2>
      <p>${description}</p>
      <div class="action-row">${mapsButton(route)}${favoriteButton(id)}</div>
    </article>
  `).join("");
  return pageChrome("whales", `
    <div class="footer-note">Vom Land aus sind Delfine möglich, Wale mit Glück. Ein Fernglas macht aus kurzen Blicken echte kleine Beobachtungsmomente.</div>
    <div class="card-grid" style="margin-top:14px">${cards}</div>
  `);
}

function renderMarkets() {
  const cards = markets.map(([id, title, distance, use, detail, route]) => `
    <article class="card">
      <h2>${title}</h2>
      <div class="details">
        <div class="detail"><strong>Entfernung grob</strong><span>${distance}</span></div>
        <div class="detail"><strong>Geeignet für</strong><span>${use}</span></div>
        <div class="detail"><strong>Besonderheit</strong><span>${detail}</span></div>
      </div>
      <div class="action-row">${mapsButton(route)}</div>
    </article>
  `).join("");
  return pageChrome("markets", `<div class="card-grid">${cards}</div>`);
}

function renderRestaurants() {
  const groups = ["Hotelnähe", "Ausflugsrestaurants", "Besonderer Abend"];
  const html = groups.map((group) => `
    <section class="list-panel">
      <h2>${group}</h2>
      <div class="card-grid" style="margin-top:14px">
        ${restaurants.filter((restaurant) => restaurant[2] === group || (group === "Besonderer Abend" && restaurant[2] === "Besonderer Abend")).map(([id, title, category, price, kitchen, dayFit, reservation, route]) => `
          <article class="card">
            <div class="meta-row"><span class="meta">${price}</span><span class="meta">${category}</span></div>
            <h3>${title}</h3>
            <div class="details">
              <div class="detail"><strong>Küche</strong><span>${kitchen}</span></div>
              <div class="detail"><strong>Passend für</strong><span>${dayFit}</span></div>
              <div class="detail"><strong>Reservierung</strong><span>${reservation}</span></div>
            </div>
            <div class="action-row">${mapsButton(route)}${favoriteButton(id)}</div>
          </article>
        `).join("")}
      </div>
    </section>
  `).join("");
  return pageChrome("restaurants", `<div class="split-list">${html}</div>`);
}

function renderSecrets() {
  const cards = secrets.map(([id, title, description, route]) => `
    <article class="card">
      <h2>${title}</h2>
      <p>${description}</p>
      <div class="action-row">${mapsButton(route)}${favoriteButton(id)}</div>
    </article>
  `).join("");
  return pageChrome("secrets", `<div class="card-grid">${cards}</div>`);
}

function renderWeather() {
  const cards = weatherModes.map(([title, options]) => `
    <article class="card">
      <h2>${title}</h2>
      <div class="details">
        ${options.map((option) => `<div class="detail"><strong>Option</strong><span>${option}</span></div>`).join("")}
      </div>
    </article>
  `).join("");
  return pageChrome("weather", `<div class="card-grid">${cards}</div>`);
}

function checklistId(kind, section, item) {
  return `${kind}:${section}:${item}`.toLowerCase().replace(/\s+/g, "-");
}

function renderChecklist(view, sections, kind) {
  const checked = checkState();
  const panels = sections.map(([section, items]) => `
    <section class="list-panel">
      <h2>${section}</h2>
      <div class="checklist">
        ${items.map((item) => {
          const id = checklistId(kind, section, item);
          return `
            <label class="check-item">
              <input class="js-check" type="checkbox" data-id="${id}" ${checked[id] ? "checked" : ""}>
              <span>${item}</span>
            </label>
          `;
        }).join("")}
      </div>
    </section>
  `).join("");
  return pageChrome(view, `<div class="split-list">${panels}</div>`);
}

function renderFavorites() {
  const favorites = Object.values(favoriteMap());
  if (!favorites.length) {
    return pageChrome("favorites", `<div class="empty">Noch keine Favoriten markiert. Herzen bei Tagesplänen, Restaurants, Badestellen und besonderen Orten sammeln sie hier.</div>`);
  }
  const cards = favorites.map((item) => `
    <article class="card">
      <div class="meta-row"><span class="meta">${item.type}</span></div>
      <h2>${item.title}</h2>
      <p>${item.subtitle}</p>
      <div class="action-row">
        ${item.route ? mapsButton(item.route) : ""}
        <a class="btn" href="${item.anchor}">${icon("home")}<span>Bereich öffnen</span></a>
        ${favoriteButton(item.id)}
      </div>
    </article>
  `).join("");
  return pageChrome("favorites", `<div class="card-grid">${cards}</div>`);
}

function render() {
  const view = (location.hash || "#home").replace("#", "").split("/")[0] || "home";
  const views = {
    home: renderHome,
    days: renderDays,
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
  app.innerHTML = (views[view] || renderHome)() + renderStopModal();
  if (!preserveScroll && !activeStopId) {
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  preserveScroll = false;
}

document.addEventListener("click", (event) => {
  const stop = event.target.closest(".js-stop");
  if (stop) {
    activeStopId = stop.dataset.stop;
    preserveScroll = true;
    render();
    return;
  }

  const favorite = event.target.closest(".js-fav");
  if (favorite) {
    toggleFavorite(favorite.dataset.id);
    render();
    return;
  }

  const done = event.target.closest(".js-done");
  if (done) {
    toggleDone(done.dataset.day);
    render();
    return;
  }

  const back = event.target.closest(".js-back");
  if (back) {
    if (history.length > 1 && location.hash !== "#home") {
      history.back();
    } else {
      location.hash = "#home";
    }
  }

  const closeModal = event.target.classList.contains("modal-backdrop") || event.target.closest(".modal-close");
  if (closeModal) {
    activeStopId = null;
    preserveScroll = true;
    render();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !activeStopId) return;
  activeStopId = null;
  preserveScroll = true;
  render();
});

document.addEventListener("change", (event) => {
  if (!event.target.matches(".js-check")) return;
  const state = checkState();
  state[event.target.dataset.id] = event.target.checked;
  writeJson(STORAGE_KEYS.checklist, state);
});

window.addEventListener("hashchange", render);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");
  });
}

render();
