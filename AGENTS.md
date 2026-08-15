# AGENTS.md - Projekt-Kontext für KI-Agenten

## Was ist das Projekt?

**28k8.moonweb.org** — Eine Retro-BBS-Homepage im Stil eines 90er-DOS-Terminals für "tHE tEMPLE bBS" (Augsburg, FidoNet 2:2480/330, Sysop: Stefan Koelle). Kein Backend, kein PHP, keine Datenbank, kein Tracking.

## Tech-Stack

| Bereich | Technologie |
|---|---|
| Framework | **Astro 4.15+** mit React-Islands |
| Rendering | Vollständig statisch (SSG), jede Route wird zur Build-Zeit vorgerendert |
| Hosting | **Cloudflare Pages** |
| DNS | Cloudflare |
| Content | Astro Content Collections + Zod-Schema-Validierung |
| Styling | CSS Custom Properties, DOS 16-Farben-Palette, kein CSS-Framework |
| TypeScript | Strict Mode, React-JSX |

## Dokumentenlage

| Datei | Inhalt |
|---|---|
| `PRD.md` | Anforderungsdokument für 28k8 |
| `PLAN.md` | Implementierungsplan (Astro) |
| `SPEC.md` | Technische Spezifikation (Astro) |
| `README.md` | Projekt-README |

## Projektstruktur

```
28k8-moonweb-org/
├── src/
│   ├── pages/              # Astro-Routing (eine Datei = eine URL)
│   │   ├── index.astro     # / → Modem-Intro (nur beim ersten Besuch)
│   │   └── bbs/
│   │       ├── index.astro # /bbs/ → Hauptmenü (2×2-Kachel-Raster)
│   │       ├── legal-notice.astro
│   │       ├── pc/         # PHOB!A, Tr@nceMISSION, SkyLINE, Kosmos Design
│   │       ├── atari/      # Tropic DREAMs
│   │       ├── amiga/      # ESPRIT, MOD Files
│   │       └── fido/       # ANSI Art, Nodelist
│   ├── components/
│   │   ├── TerminalLayout.astro  # Basis-HTML-Layout (head, meta, CSS-Import)
│   │   ├── TerminalShell.tsx     # React-Island: Keyboard-Shortcuts
│   │   ├── ModemIntro.tsx        # React-Island: Wahl-Simulation + Sound
│   │   ├── ModPlayer.tsx         # React-Island: MOD Playlist + WASM Player
│   │   ├── AnsiArt.astro         # Rendered vorberechnete ANSI-Art als HTML
│   │   ├── Tile.astro            # Menü-Kachel-Component
│   │   ├── NavBar.astro          # Navigation [B] [Q] [I]
│   │   ├── StatusBar.astro       # "28800 bps | Line: V34 | 28k8.moonweb.org"
│   │   └── LetterFooter.astro    # Dekorativer "tHE tEMPLE bBS"-Buchstaben-Footer
│   ├── data/
│   │   └── mods.json        # MOD-Metadaten (pre-build generiert, committed)
│   ├── content/            # Markdown+Frontmatter für Releases
│   │   ├── config.ts       # Zod-Schemas für Content Collections
│   │   ├── skyline/        # SkyLINE Productions Releases
│   │   ├── kosmos-design/  # Kosmos Design Releases
│   │   ├── tropicdreams/   # Tropic DREAMs Releases (Atari ST)
│   │   └── esprit/         # ESPRIT Releases (Amiga)
│   ├── lib/
│   │   ├── ansiArt.ts      # BANNER_*, ANSI_GALLERY, BOX_* Exporte (HTML-Strings)
│   │   ├── keymap.ts       # Tastatur-Zuordnungen (GLOBAL_NAV_KEYS, MENU_KEYS)
│   │   └── sound.ts        # Audio-Playback für Modem-Intro
│   └── styles/
│       └── global.css      # alle CSS-Variablen, Klassen, Responsive-Styles
├── public/
│   ├── images/             # skyline-header.png, og-image.png
│   ├── audio/              # dial-tone.mp3, dtmf-beeps.mp3, modem-handshake.mp3
│   ├── js/
│   │   ├── chiptune3.js          # MOD Player Library (gepatcht für Script-Tag)
│   │   ├── chiptune3.worklet.js  # AudioWorklet für libopenmpt
│   │   └── libopenmpt.worklet.js # libopenmpt WASM (~1.5 MB)
│   ├── favicon.ico
│   └── fonts/              # CP437-Webfont (geplant, noch nicht vorhanden)
├── tools/
│   ├── fetch_mods.py       # Pre-build: Holt MOD-Metadaten von moonweb.org
│   ├── generate_ansi.py    # Referenz-Script für ANSI-Art-Generierung
│   └── cp437_to_utf8.py    # CP437 → UTF-8 Konverter für BBS-Dateien
├── prebuild.sh             # Pre-build Orchestrator (ruft alle tools/fetch_*.py auf)
├── source-assets/
│   └── reference/          # Original-BBS-Screenshots als Design-Referenz
├── astro.config.mjs        # site: https://28k8.moonweb.org, React-Integration
├── tsconfig.json           # strict Mode, react-jsx
├── package.json            # astro, @astrojs/react, react, react-dom, chiptune3
└── .env.example            # CLOUDFLARE_API_TOKEN, CLOUDFLARE_ZONE_ID
```

## Routing & URLs

| URL | Seite | Bemerkung |
|---|---|---|
| `/` | Modem-Intro | Redirect zu `/bbs/` wenn `localStorage.hasConnected === 'true'` |
| `/bbs/` | Hauptmenü | 2×2-Kachel-Raster, Google-indexierbar |
| `/bbs/pc/phobia` | PHOB!A | Teaser → Link zu moonweb.org/phobia/ |
| `/bbs/pc/trancemission` | Tr@nceMISSION | Teaser → Link zu moonweb.org/tcm/ |
| `/bbs/pc/skyline` | SkyLINE Productions | Content aus Collections, Blau-Akzent |
| `/bbs/pc/kosmos-design` | Kosmos Design [KDS] | Own Releases + Outside Productions |
| `/bbs/atari/tropic-dreams` | Tropic DREAMs | Atari ST Releases (1990-1992) |
| `/bbs/amiga/esprit` | ESPRIT Releases | Amiga DemoMaker |
| `/bbs/amiga/mods` | MOD Files | Echte MODs von moonweb.org, WASM-Player (chiptune3) |
| `/bbs/fido/ansi-art` | BBS ANSI Art | Gallery mit 8 Filler-Patterns |
| `/bbs/fido/nodelist` | Fidonets & Nodelists | 9 Net-Boxen transkribiert |
| `/bbs/legal-notice` | Legal Notice | Pflichtangaben hinterlegt, Link zu hub.moonweb.org/impressum |

## Keyboard-Shortcuts (keymap.ts)

**Global:** `B` Back (history.back), `Q` Disconnect (clears localStorage), `I` Legal Notice

**Menu:** `P` PHOB!A, `T` Tr@nceMISSION, `S` SkyLINE, `K` Kosmos Design, `D` Tropic DREAMs, `E` ESPRIT, `M` MOD Files, `A` BBS ANSI Art, `N` Fidonets

## Content Collections (src/content/config.ts)

Schema für alle Releases:
```typescript
{ title, group, year?, platform, credits: [{role, name}], description,
  download_url?, screenshot?, file_id_diz }
```

## ANSI-Art-System

1. `tools/generate_ansi.py` generiert HTML aus 5×7-Bitmap-Font + Dithering-Gradienten
2. Output landet als statische Strings in `src/lib/ansiArt.ts`
3. Components laden via `import { BANNER_X } from '../../lib/ansiArt'`
4. Rendered via `<AnsiArt html={BANNER_X} />` (zero JS, set:html)

CSS-Klassen: `c-border-red`, `c-main-red`, `c-shadow-red`, `c-border-blue`, `c-main-blue`, `c-shadow-blue`, `c-white`, `c-grey`, `c-pink`, `c-cyan`

## Lokaler Dev-Workflow

```bash
npm install
npm run dev        # → localhost:4321
npm run build      # → prebuild.sh + dist/
npm run preview    # → lokaler Production-Server
```

## Pre-Build System

`prebuild.sh` lädt vor jedem Build externe Daten (JSON) und schreibt sie nach `src/data/`. Die JSON wird committed, der Build hängt nicht vom externen Server ab.

**Wichtig:** `prebuild.sh` wird nur lokal ausgeführt, wenn sich externe Daten
ändern. Das Ergebnis (JSON-Dateien in `src/data/`) wird ins Repo committed.
In der CI/CD (`deploy.yml`) wird `npx astro build` direkt aufgerufen — das
überspringt `prebuild.sh` bewusst, da die JSON-Daten bereits im Repo liegen.

```bash
./prebuild.sh          # alle Stages
./prebuild.sh mods     # nur MOD-Metadaten
```

Aktive Stages:
| Stage | Script | Output | Beschreibung |
|---|---|---|---|
| `mods` | `tools/fetch_mods.py` | `src/data/mods.json` | MOD-Metadaten von moonweb.org |

Neuen Stage hinzufügen:
1. `tools/fetch_<name>.py` erstellen (Output: `src/data/<name>.json`)
2. Case-Block in `prebuild.sh` ergänzen
3. `npm run build` ruft automatisch `prebuild.sh` auf

## CP437 → UTF-8 Konvertierung

Alte BBS-Dateien (FILES.BBS, kosmos.txt, etc.) sind im CP437-Kodiert (IBM PC Zeichensatz). Für die Anzeige auf der Website müssen sie konvertiert werden.

```bash
# Einmal-Datei konvertieren (Output auf stdout)
python3 tools/cp437_to_utf8.py https://www.moonweb.org/files/pc/KDS/kosmos.txt

# In Datei speichern
python3 tools/cp437_to_utf8.py https://www.moonweb.org/files/pc/KDS/FILES.BBS src/data/kds-files-bbs.txt
```

**Neue Dateien einbinden:**
1. Konvertieren: `python3 tools/cp437_to_utf8.py <url> src/data/<name>.txt`
2. In `.astro` einlesen: `const text = readFileSync('src/data/<name>.txt', 'utf-8');`
3. Overlay nutzen: `<TextOverlay title="datei.txt" content={text} />`

Konvertierte Dateien werden in `src/data/` gespeichert und committed.

## Design-Regeln

- DOS 16-Farben-Palette strikt, Hintergrund immer Schwarz
- Keine Scanlines, kein CRT-Curvature, kein Flicker
- CP437-Font für ANSI-Art, IBM Plex Mono für Fließtext
- Fix 80 Zeichen breit, vertikal scrollbar
- SkyLINE: einzige Seite mit Blau-Akzent (sonst immer Rot)
- Kompletter Content auf Englisch
- Barrierefreiheit explizit nicht priorisiert

## Offene Aufgaben

**Aktuelle Task-Liste:** `TODO.md` — dort steht der nächste Schritt ganz oben.

Bei neuem Kontext: Zuerst `TODO.md` lesen, dann `PLAN.md` (Roadmap), dann `SPEC.md` (Tech-Spec).
