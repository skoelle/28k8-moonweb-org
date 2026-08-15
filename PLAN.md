# PLAN.md - Implementation Roadmap

## Phase 0 - Scaffold + v2 Fixes (done)
- [x] Fix: ANSI banner renders (AnsiArt.astro + ansiArt.ts)
- [x] Fix: Disconnect clears state (NavBar.astro)
- [x] Fix: SkyLINE blue accent visible + real header PNG
- [x] 10 boxed ASCII banners w/ dithering bars, 8 gallery patterns, 9 net-boxes
- [x] Tropic DREAMs (4 real), SkyLINE (+3), Kosmos Design (7 new), ESPRIT (4 new)
- [x] MOD Files tracklist + visual player widget
- [x] PHOB!A / Tr@nceMISSION teaser text, favicon.ico + og-image.png

## Phase 1 - Build & Infrastructure (done)
- [x] npm install, npm run dev, npm run build && npm run preview
- [x] Modem-Intro-Audio-Clips in public/audio/
- [x] Pre-Build System (fetch_mods.py, prebuild.sh)
- [x] CP437 Webfont (Px437 IBM VGA 8x16, WOFF2+TTF)

## Phase 2 - Real ANSI-Art (offen)
- [ ] Echte .ans Dateien aus den 90ern besorgen
- [ ] 8 Filler-Patterns durch echte gescannte/analysierte .ans ersetzen

## Phase 3-5 - Content & Visual (fast fertig)
- [x] Tr@nceMISSION, Kosmos Design, ESPRIT, SkyLINE Releases fertig
- [ ] Kosmos Design - outside-sbr.md: Placeholder bereinigen

## Phase 6 - MOD Player (fertig)
- [x] chiptune3.js (libopenmpt AudioWorklet) eingebunden
- [x] ModPlayer.tsx mit Playlist
- [x] Echte .mod Dateien werden von moonweb.org gestreamt

## Phase 7-8 - Infra & Launch (fertig)
- [x] www.moonweb.org/files/ als Asset-Hosting (Dateien liegen dort)
- [x] GitHub-Repo + Cloudflare Pages Deploy funktioniert
- [x] sitemap.xml / robots.txt
- [x] <title> und <meta description> pro Seite geprüft
- [x] Legal Notice fertig
