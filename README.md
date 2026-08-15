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

Das Pre-Build-System lädt vor jedem Build externe Daten (JSON) und schreibt
sie nach `src/data/`. Die JSON wird committed, sodass der Build nicht von
externen Servern abhängt.

```bash
./prebuild.sh          # alle Stages
./prebuild.sh mods     # nur MOD-Metadaten
```

**Wichtig:** `prebuild.sh` wird nur lokal ausgeführt, wenn sich externe Daten
ändern. Das Ergebnis (JSON-Dateien in `src/data/`) wird ins Repo committed.
In der CI/CD (`deploy.yml`) wird `npx astro build` direkt aufgerufen — das
überspringt `prebuild.sh` bewusst, da die JSON-Daten bereits im Repo liegen.

Aktive Stages:
| Stage | Script | Output | Beschreibung |
|---|---|---|---|
| `mods` | `tools/fetch_mods.py` | `src/data/mods.json` | MOD-Metadaten von moonweb.org |

Neuen Stage hinzufügen:
1. 🐍 `tools/fetch_<name>.py` erstellen (Output: `src/data/<name>.json`)
2. 🔧 Case-Block in `prebuild.sh` ergänzen
3. 🏗️ `npm run build` ruft automatisch `prebuild.sh` auf

## 🎬 WelcomeBanner (Startseite)

Das "THE TEMPLE BBS"-Logo auf der Startseite wird als CP437-Text mit
Typewriter-Animation dargestellt. Der Text kommt aus einer echten
CP437-Datei und wird mit einem IBM-VGA-Webfont gerendert.

### 📁 Dateien

| Datei | Zweck |
|---|---|
| `source-assets/welcome.txt` | Original-Datei (CP437-kodiert) |
| `source-assets/welcome-utf8.txt` | UTF-8-Version, wird von Astro eingelesen |
| `src/components/WelcomeBanner.astro` | Komponente (Rendering + Animation) |
| `public/fonts/Px437_IBM_VGA_8x16.woff2` | CP437-Webfont (6.6 KB) |
| `public/fonts/Px437_IBM_VGA_8x16.ttf` | Font als Fallback |
| `src/styles/global.css:2` | `@font-face`-Definition |

### 🤔 Warum zwei Textdateien?

Node.js unterstützt `cp437` nicht in `TextDecoder`. Die Original-Datei
wird daher per Python in UTF-8 konvertiert und die `.txt`-Datei mit
abgespeichert. Bei Änderungen an `welcome.txt` muss die UTF-8-Version
neu generiert werden:

```bash
python3 -c "
with open('source-assets/welcome.txt','rb') as f: d=f.read()
with open('source-assets/welcome-utf8.txt','w',encoding='utf-8') as f: f.write(d.decode('cp437'))
"
```

### ⏱️ Animation anpassen

In `src/components/WelcomeBanner.astro`, Zeile 24-26:

```javascript
const BASE = 8;    // Basis-delay pro Zeichen (ms)
const FAST = 4;    // Delay für Leerzeichen (ms)
const HARD_PAUSES: [number, number][] = [[34, 400], [98, 350]];
//                                 [Zeichen-Position, Pause in ms]
```

- **`BASE`/`FAST`** kleiner = schneller
- **`HARD_PAUSES`** = 2 bewusste Pausen mitten in einer Zeile.
  Position 34 ≈ Mitte der 1. Zeile, Position 98 ≈ Mitte der 2. Zeile.
  Werte an Text anpassen wenn sich die Zeilenlängen ändern.

### 🔤 Font

`Px437 IBM VGA 8x16` von int10h.org (Oldschool PC Font Pack v2.2,
CC BY-SA 4.0). Enthält 288 Glyphs inkl. aller CP437-Block-Zeichen
(█, ▄, ▀, ▌, ▐, ░, ▒, ▓) und Box-Drawing-Zeichen.

Der Font ist über `--font-ansi` in `global.css` verfügbar und wird
auch von den ANSI-Art-Bannern (`ansiArt.ts`) genutzt.
