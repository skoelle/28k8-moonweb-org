# PLAN.md - Implementation Roadmap (v2)

## Phase 0 - Scaffold (v1, done) + Phase 0.5 - v2 fixes (done in this drop)
- [x] Fix: ANSI banner renders (AnsiArt.astro + ansiArt.ts)
- [x] Fix: Disconnect clears state (NavBar.astro)
- [x] Fix: SkyLINE blue accent visible + real header PNG
- [x] 10 boxed ASCII banners w/ dithering bars, 8 gallery patterns, 9 net-boxes
- [x] Tropic DREAMs (4 real), SkyLINE (+3), Kosmos Design (7 new), ESPRIT (4 new)
- [x] MOD Files placeholder tracklist + visual player widget
- [x] PHOB!A / Tr@nceMISSION teaser text, favicon.ico + og-image.png

## Phase 1 - Make it actually run
- [ ] npm install, npm run dev, npm run build && npm run preview
- [ ] Modem-Intro-Audio-Clips bereitstellen: public/audio/dial-tone.mp3, dtmf-beeps.mp3, modem-handshake.mp3

## Phase 2 - Real ANSI rendering
- [ ] Feed real .ans files (via OpenCode) into source-assets/ansi/
- [ ] Self-host CP437 webfont under public/fonts/

## Phase 3 - Navigation polish
- [ ] /bbs/atari/ etc. as mobile anchors to /bbs/#atari
- [ ] Astro View Transitions, subtle text-build-in stutter effect

## Phase 4-5 - Visual + Content
- [ ] Replace filler gallery patterns with real scanned ANSI art
- [ ] Replace placeholder releases with real ones, write real Impressum text

## Phase 6 - Amiga MOD player
- [ ] Real WASM MOD player (libopenmpt.js/chiptune3.js), real .mod files

## Phase 7-8 - Infra & Launch
- [ ] files.moonweb.org, public GitHub repo + Cloudflare Pages
- [ ] sitemap.xml/robots.txt, full click-through incl. regression test of
      the two v1 bugs (banner visibility + Disconnect)
