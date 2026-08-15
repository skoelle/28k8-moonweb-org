# TODO.md - Offene Aufgaben

Stand: 15.08.2026 | Referenz: PLAN.md, SPEC.md, PRD.md

---

## OFFENE AUFGABEN

### Kosmos Design - Outside SBR
- [ ] `src/content/kosmos-design/outside-sbr.md` — Placeholder-Text in Zeile 12 bereinigen
  (`"exact wording pending, PRD.md 12"`)

### ANSI-Art in Menüs
- [x] BANNER_SKYLINE_SECTION — skyline.astro (blau)
- [x] ANSI Gallery — BANNER_SKYLINE, BANNER_TEMPLE3, BANNER_INFOFILE, BANNER_MAINBASE, BANNER_LOGGED (in ansi-art.astro)
- [ ] BANNER_TEMPLE — Hauptmenü (bbs/index.astro) + cds.astro
- [ ] BANNER_AMIGA — amiga/mods.astro
- [ ] BANNER_ESPRIT — amiga/esprit.astro
- [ ] BANNER_ATARI — atari/tropic-dreams.astro
- [ ] BANNER_TRANCE — pc/trancemission.astro
- [ ] BANNER_PHOBIA — pc/phobia.astro
- [ ] BANNER_KOSMOS — pc/kosmos-design.astro
- [ ] BANNER_ANSI — Header auf ansi-art.astro selbst

### Sonstiges
- [x] sitemap.xml — `/bbs/cds/` Eintrag ergänzt (15.08.2026)
- [x] `skyline-header.png` — wieder eingebaut in skyline.astro (15.08.2026)
- [x] `global.css` — ungenutzte `.gallery-grid` + `.mod-loading` entfernt (15.08.2026)

---

## ERLEDIGT

### Phase 1 - Build-Chain
- [x] npm install, npm run dev, npm run build, npm run preview

### Phase 1.2 - Modem-Intro Audio
- [x] dial-tone.mp3, dtmf-beeps.mp3, modem-handshake.mp3 in public/audio/

### Phase 1.3 - Pre-Build System
- [x] tools/fetch_mods.py → src/data/mods.json
- [x] prebuild.sh als Orchestrator

### CP437 Webfont
- [x] Px437 IBM VGA 8x16 als WOFF2 + TTF in public/fonts/
- [x] @font-face in global.css korrigiert

### Inhalt aufräumen
- [x] Placeholder-Texte in Content-Dateien entfernt (12 .md-Dateien gelöscht/bereinigt)
- [x] Placeholder-Hinweise in Seiten-Descriptions entfernt (5 .astro-Dateien bereinigt)

### Releases
- [x] Tr@nceMISSION: fertig
- [x] Kosmos Design: fertig (außer outside-sbr.md)
- [x] ESPRIT: fertig
- [x] SkyLINE: fertig

### Asset-Hosting
- [x] www.moonweb.org/files/ als Hosting-Lösung (Dateien liegen dort, wird schon überall verlinkt)

### MOD Player
- [x] chiptune3.js + libopenmpt AudioWorklet eingebunden
- [x] ModPlayer.tsx mit Playlist
- [x] Echte .mod Dateien werden von moonweb.org gestreamt

### Deployment
- [x] GitHub-Repo veröffentlicht
- [x] Cloudflare Pages Projekt angelegt + funktioniert
- [x] CI/CD Pipeline (.github/workflows/deploy.yml) konfiguriert
- [x] DNS-Eintrag für 28k8.moonweb.org aktiv
- [x] Live-Deploy funktioniert

### SEO
- [x] sitemap.xml generiert (public/sitemap.xml) — `/bbs/cds/` war vergessen, jetzt drin
- [x] robots.txt angelegt (public/robots.txt)
- [x] <title> und <meta description> pro Seite geprüft

### Legal Notice
- [x] Pflichtangaben zusammengefasst
- [x] legal-notice.astro ausgefüllt (auf Englisch)

---

## GESTRICHEN (nicht mehr relevant)

- **Mobile Anchors** (/bbs/atari/ → /bbs/#atari): Overkill, Kachel-Struktur rendert unnötig
- **View Transitions**: Welcome Banner Stottern funktioniert bereits, restliche Seiten brauchen das nicht
- **Echte Releases nachtragen**: Alle fertig bis auf outside-sbr.md
