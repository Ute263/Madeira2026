# Madeira 2026

Eine statische Progressive Web App fuer einen persoenlichen Madeira-Reisefuehrer.

## Struktur

- `index.html` - App-Einstieg fuer GitHub Pages
- `styles.css` - ruhiges responsives Design
- `app.js` - Inhalte, Navigation, Favoriten, erledigte Tage und Checklisten
- `manifest.json` - PWA-Manifest
- `service-worker.js` - Offline-Cache
- `assets/` - lokales Titelbild und App-Icons

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
