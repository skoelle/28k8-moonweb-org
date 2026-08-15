# TODO.md - Offene Aufgaben & Workflow

Stand: 13.08.2026 | Referenz: PLAN.md, SPEC.md, PRD.md

---

## NÄCHSTER SCHRITT: Phase 1 (fertig)

### P1.1 Build-Chain testen
- [x] `npm install` ausgeführt
- [x] `npm run dev` → localhost:4321 funktioniert
- [x] `npm run build` → dist/ mit 12 Seiten erfolgreich
- [x] `npm run preview` → lokaler Production-Server (nächster Schritt)

### P1.2 Modem-Intro Audio
- [x] dial-tone.mp3 besorgen/erstellen → public/audio/
- [x] dtmf-beeps.mp3 besorgen/erstellen → public/audio/
- [x] modem-handshake.mp3 besorgen/erstellen → public/audio/
- [x] ModemIntro.tsx testen (Line 1 = Sound, Line 2 = Direktzugang)

### P1.3 Pre-Build System
- [x] `tools/fetch_mods.py` — MOD-Metadaten von moonweb.org
- [x] `prebuild.sh` — ruft alle Pre-Build Stages auf
- [x] `npm run build` führt automatisch prebuild.sh aus
- [x] `src/data/mods.json` — gecachte MOD-Daten

---

## VOR DEM LIVE-TEST

### Inhalt aufräumen
- [ ] Placeholder-Texte in Content-Dateien entfernen (`[Placeholder/fake content]`, PRD.md-Referenzen)
  - [ ] `src/content/skyline/disk-doctor.md`
  - [ ] `src/content/skyline/example-tool.md`
  - [ ] `src/content/skyline/megademo-93.md`
  - [ ] `src/content/skyline/sky-file-manager.md`
  - [ ] `src/content/esprit/esprit-utility-music.md`
  - [ ] `src/content/esprit/esprit-demomaker-1.md`
  - [ ] `src/content/esprit/esprit-utility-copy.md`
  - [ ] `src/content/esprit/esprit-demomaker-2.md`
  - [ ] `src/content/kosmos-design/kds-intro-1.md`
  - [ ] `src/content/kosmos-design/kds-cracktro-pack.md`
  - [ ] `src/content/kosmos-design/kds-slideshow.md`
  - [ ] `src/content/kosmos-design/kds-musicdisk.md`
- [ ] Placeholder-Hinweise in Seiten-Descriptions entfernen:
  - [ ] `src/pages/bbs/pc/skyline.astro` (PRD.md 12)
  - [ ] `src/pages/bbs/pc/trancemission.astro` (PRD.md section 12)
  - [ ] `src/pages/bbs/pc/kosmos-design.astro` (PRD.md 12)
  - [ ] `src/pages/bbs/amiga/esprit.astro` (PRD.md 12)
  - [ ] `src/pages/bbs/fido/ansi-art.astro` (PRD.md section 3)

### Asset-Hosting
- [ ] `files.moonweb.org` einrichten (Synology oder Static-Fileserver)
- [ ] Download-Dateien (.zip, .mod) dort ablegen
- [ ] Links in Content-Dateien prüfen/aktualisieren

---

## DANACH: Phase 2 - ANSI-Art

### P2.1 Echte .ans Dateien
- [ ] Original .ans Dateien aus den 90ern besorgen
- [ ] In source-assets/ansi/ ablegen
- [ ] generate_ansi.py anpassen oder neuen Parser schreiben
- [ ] In ansiArt.ts einbinden (Fallback auf generierte Patterns)

### P2.2 CP437 Webfont
- [ ] Passenden CP437/DOS-Font beschaffen (Web 437, Perfect DOS VGA 437)
- [ ] Als WOFF2 unter public/fonts/ ablegen
- [ ] @font-face in global.css korrigieren (aktuell: `src: local('Web 437')` → funktioniert nur wenn Font installiert)
- [ ] Testing: ANSI-Art mit echtem Font rendern

---

## DANACH: Phase 3 - Navigation

### P3.1 Mobile Anchors
- [ ] /bbs/atari/ → /bbs/#atari als Scroll-Ziel
- [ ] /bbs/amiga/ → /bbs/#amiga
- [ ] /bbs/fido/ → /bbs/#fido
- [ ] /bbs/pc/ → /bbs/#pc (falls nötig)

### P3.2 View Transitions
- [ ] Astro View Transitions einbauen
- [ ] Optional: Subtiler Textaufbau-Effekt ("Stottern")

---

## DANACH: Phase 4-5 - Content & Visual

### P4.1 Echte ANSI-Art
- [ ] 8 Filler-Patterns durch echte gescannte/analysierte .ans ersetzen
- [ ] BBS ANSI Art Seite aktualisieren

### P4.2 Echte Releases
- [ ] SkyLINE: placeholder/disk-doctor.md → echte Inhalte
- [ ] SkyLINE: example-tool.md → echte Inhalte
- [ ] Kosmos Design: Prüfen ob alle Credits korrekt sind
- [ ] ESPRIT: Prüfen ob alle Inhalte korrekt sind
- [ ] Tr@nceMISSION: Fehlende Releases nachtragen (PRD.md 12)

### P4.3 Impressum
- [x] Pflichtangaben zusammenstellen (Name, Anschrift, Kontakt)
- [x] legal-notice.astro ausfüllen
- [x] Auf Englisch (PRD.md 6.3)

---

## DANACH: Phase 6 - MOD Player

### P6.1 WASM MOD Player
- [x] chiptune3.js (libopenmpt AudioWorklet) eingebunden
- [x] `tools/fetch_mods.py` → `src/data/mods.json` (pre-build)
- [x] `ModPlayer.tsx` React-Island mit Playlist
- [x] `prebuild.sh` Orchestrator für alle Pre-Build Stages
- [ ] Echte .mod Dateien auf files.moonweb.org bereitstellen (oder direkt von moonweb.org streamen)

---

## LETZTE PHASE: 7-8 - Infra & Launch

### P7.1 Asset-Hosting
- [ ] files.moonweb.org einrichten (Synology oder Static-Fileserver)
- [ ] Alle Downloads (.ans, .mod, Disk-Images) dort ablegen
- [ ] Links in Content-Dateien aktualisieren

### P7.2 Deployment
- [ ] GitHub-Repo veröffentlichen
- [ ] Cloudflare Pages Projekt anlegen
- [ ] Build-Command: `npm run build`, Output: `dist`
- [ ] DNS-Eintrag für 28k8.moonweb.org prüfen
- [ ] Erstes Live-Deploy

### P7.3 SEO & Finalisierung
- [ ] sitemap.xml generieren
- [ ] robots.txt anlegen
- [ ] <title> und <meta description> pro Seite prüfen
- [ ] Full click-through Regression Test
  - [ ] Banner sichtbar auf Hauptmenü?
  - [ ] Disconnect → localStorage geleert → Redirect zu /?
  - [ ] Alle Keyboard-Shortcuts funktionieren?
  - [ ] Mobile Ansicht: Kacheln gestapelt?

---

## EMBEDDED CONTEXT (für neuen Chat)

Wenn du diesen Kontext in einem neuen Chat öffnest:

1. Lies diese Datei als erstes
2. Das NÄCHSTE unmittelbare Ziel steht oben unter "NÄCHSTER SCHRITT"
3. Fertige Phasen sind unten (hier aktuell: Phase 1 + Pre-Launch Checklist)
4. Referenz-Dokumente: PLAN.md (Roadmap), SPEC.md (Tech-Spec), PRD.md (Anforderungen)
5. AGENTS.md hat die Projektstruktur und technischen Details
6. Wenn Phase 1 fertig ist → diese Datei aktualisieren, Phase 1 als done markieren, Phase 2 als nächstes setzen
