# Madeira 2026

Eine statische Progressive Web App fuer einen persoenlichen Madeira-Reisefuehrer.

## Struktur

- `index.html` - App-Einstieg fuer GitHub Pages
- `styles.css` - ruhiges responsives Design
- `app.js` - Inhalte, Navigation, Favoriten, erledigte Tage und Checklisten
- `manifest.json` - PWA-Manifest
- `service-worker.js` - Offline-Cache
- `assets/` - lokales Titelbild und App-Icons
- `images/` - lokal gespeicherte Bilder und Bildnachweise

## Eigene Fotos einsetzen

Die App verwendet feste Dateinamen im Ordner `images`. Eigene Fotos koennen spaeter einfach in diesen Ordner gelegt werden. Wenn sie denselben Dateinamen wie ein aktuell aktiviertes Bild haben, werden sie automatisch angezeigt.

Beispiele:

- `images/seixal.jpg`
- `images/pico-do-arieiro.jpg`
- `images/hotel-cais-da-oliveira.jpg`
- `images/tag-10.jpg`

Aktuell werden nur Bilder angezeigt, fuer die ein frei lizenzierter Wikimedia-Commons-Nachweis in `images/credits.json` vorhanden ist. Wenn ein Bild fehlt oder nicht verwendet werden soll, bleibt die Karte bewusst ohne Bild statt einen generischen Platzhalter zu zeigen. Weitere eigene Motive koennen spaeter in `app.js` in der Bildliste aktiviert werden.

Die Datei `images/credits.json` enthaelt Quelle, Urheber und Lizenzhinweis der geladenen Wikimedia-Commons-Bilder.

## GitHub Pages

Den kompletten Ordner `madeira-2026` in ein GitHub-Repository legen und GitHub Pages fuer den Branch aktivieren. Die App nutzt nur relative Pfade und funktioniert daher auch in einem Repository-Unterpfad.

## Lokal testen

Im Ordner starten:

```bash
python3 -m http.server 8056
```

Dann im Browser oeffnen:

```text
http://localhost:8056/
```
