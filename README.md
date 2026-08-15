# 🖥️ 28k8.moonweb.org - tHE tEMPLE bBS Retro Hub (v2)

A 90s BBS/demoscene retro hub, built with Astro + React Islands, deployed
on Cloudflare Pages. No backend, no PHP, no database, no tracking. 🚫

## ✨ v2 highlights
- 🎨 The colored TEMPLE ANSI banner now actually renders on the main menu.
- 🔌 Disconnect works correctly (clears state, returns to the intro screen).
- 🔵 SkyLINE has a visible blue accent + a real generated header image.
- 🎭 10 full ASCII banners with color gradients across every page, an 8-item
  ANSI-art gallery, and real net-list content from the original screenshots.
- 📚 Lots more content: Tropic DREAMs (all 4 real releases), SkyLINE (+3),
  Kosmos Design (7, new), ESPRIT (4, new), MOD Files tracklist.

## 🗺️ Start here
1. 📋 PRD.md - requirements + v1.4 changelog
2. 📐 SPEC.md - technical spec, what changed and why
3. 📅 PLAN.md - phase-by-phase remaining work

## 🚀 Quick start
```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # -> dist/
npm run preview   # serve the production build locally
```

## ☁️ Deployment
Cloudflare Pages, connected directly to this repo. Build command
`npm run build`, output directory `dist`.

## 🔄 Pre-Build System

The pre-build system loads external data (JSON) before each build and writes
it to `src/data/`. The JSON is committed, so the build does not depend on
external servers.

```bash
./prebuild.sh          # all stages
./prebuild.sh mods     # MOD metadata only
```

**Important:** `prebuild.sh` is only run locally when external data changes.
The result (JSON files in `src/data/`) is committed to the repo.
In CI/CD (`deploy.yml`), `npx astro build` is called directly — this
intentionally skips `prebuild.sh` since the JSON data is already in the repo.

Active stages:
| Stage | Script | Output | Description |
|---|---|---|---|
| `mods` | `tools/fetch_mods.py` | `src/data/mods.json` | MOD metadata from moonweb.org |

Add a new stage:
1. 🐍 Create `tools/fetch_<name>.py` (output: `src/data/<name>.json`)
2. 🔧 Add case block in `prebuild.sh`
3. 🏗️ `npm run build` automatically runs `prebuild.sh`

## 🎬 WelcomeBanner (Start Screen)

The "THE TEMPLE BBS" logo on the start screen is rendered as CP437 text with
a typewriter animation. The text comes from a real CP437 file and is rendered
with an IBM VGA webfont.

### 📁 Files

| File | Purpose |
|---|---|
| `source-assets/welcome.txt` | Original file (CP437 encoded) |
| `source-assets/welcome-utf8.txt` | UTF-8 version, read by Astro |
| `src/components/WelcomeBanner.astro` | Component (rendering + animation) |
| `public/fonts/Px437_IBM_VGA_8x16.woff2` | CP437 webfont (6.6 KB) |
| `public/fonts/Px437_IBM_VGA_8x16.ttf` | Font as fallback |
| `src/styles/global.css:2` | `@font-face` definition |

### 🤔 Why two text files?

Node.js does not support `cp437` in `TextDecoder`. The original file
is converted to UTF-8 via Python and the `.txt` file is saved alongside it.
When `welcome.txt` is changed, the UTF-8 version must be regenerated:

```bash
python3 -c "
with open('source-assets/welcome.txt','rb') as f: d=f.read()
with open('source-assets/welcome-utf8.txt','w',encoding='utf-8') as f: f.write(d.decode('cp437'))
"
```

### ⏱️ Adjusting the animation

In `src/components/WelcomeBanner.astro`, lines 24-26:

```javascript
const BASE = 8;    // base delay per character (ms)
const FAST = 4;    // delay for spaces (ms)
const HARD_PAUSES: [number, number][] = [[34, 400], [98, 350]];
//                                 [character position, pause in ms]
```

- **`BASE`/`FAST`** smaller = faster
- **`HARD_PAUSES`** = 2 deliberate pauses in the middle of a line.
  Position 34 ≈ middle of line 1, position 98 ≈ middle of line 2.
  Adjust values if line lengths change.

### 🔤 Font

`Px437 IBM VGA 8x16` from int10h.org (Oldschool PC Font Pack v2.2,
CC BY-SA 4.0). Contains 288 glyphs including all CP437 block characters
(█, ▄, ▀, ▌, ▐, ░, ▒, ▓) and box-drawing characters.

The font is available via `--font-ansi` in `global.css` and is also
used by the ANSI art banners (`ansiArt.ts`).

## 📜 License

[![CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

See [LICENSE](LICENSE) for the full text.
