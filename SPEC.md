# SPEC.md - 28k8.moonweb.org Technical Specification

## Architecture
- **Framework:** Astro 4.15+ mit React-Islands
- **Rendering:** Vollständig statisch (SSG), jede Route zur Build-Zeit vorgerendert
- **Hosting:** Cloudflare Pages
- **DNS:** Cloudflare

## Repository Layout
```
src/
├── pages/              # Astro-Routing (eine Datei = eine URL)
├── components/         # Astro-Components + React-Islands
├── content/            # Markdown+Frontmatter für Releases
├── data/               # Pre-Build JSON (mods.json)
├── lib/                # ansiArt.ts, keymap.ts, sound.ts
└── styles/             # global.css
public/
├── audio/              # Modem-Intro Sounds
├── js/                 # chiptune3.js + WASM Worker
├── fonts/              # CP437 Webfont
└── images/             # skyline-header.png, og-image.png
tools/                  # Pre-Build Scripts (Python)
```

## AnsiArt Contract
- BANNER_<NAME> / ANSI_GALLERY / BOX_<NAME> als HTML-Exporte in ansiArt.ts
- CSS-Klassen: c-border-red, c-main-red, c-shadow-red, c-border-blue, c-main-blue,
  c-shadow-blue, c-white, c-grey, c-pink, c-cyan (alle in global.css)
- Rendering via `<AnsiArt html={BANNER_X} />` (zero JS, set:html)

## NavBar Contract
- [B] Back (history.back()), [Q] Disconnect (clears localStorage.hasConnected),
  [I] Legal Notice. Überall statt ad-hoc Links verwenden.

## Pre-Build System
- `prebuild.sh` wird nur lokal ausgeführt, wenn sich externe Daten ändern
- Ergebnis (JSON in src/data/) wird ins Repo committed
- CI/CD (`deploy.yml`) ruft `npx astro build` direkt auf (überspringt prebuild.sh bewusst)

## Design Tokens
- DOS 16-Farben-Palette, Hintergrund Schwarz
- CP437-Font für ANSI-Art, IBM Plex Mono für Fließtext
- Fix 80 Zeichen breit, vertikal scrollbar
- SkyLINE: einzige Seite mit Blau-Akzent (sonst immer Rot)

## Routing
| URL | Seite |
|---|---|
| `/` | Modem-Intro (→ /bbs/ wenn localStorage.hasConnected) |
| `/bbs/` | Hauptmenü (2×2-Kachel-Raster) |
| `/bbs/pc/*` | PHOB!A, Tr@nceMISSION, SkyLINE, Kosmos Design |
| `/bbs/atari/*` | Tropic DREAMs |
| `/bbs/amiga/*` | ESPRIT, MOD Files |
| `/bbs/fido/*` | BBS ANSI Art, Fidonets & Nodelists |
| `/bbs/legal-notice` | Legal Notice |
