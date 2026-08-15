# PRD – 28k8.moonweb.org
**"tHE tEMPLE bBS" Retro Hub Page**

Status: v2.0

---

## 1. Vision & Zweck

Eine persönliche Hub-Page unter `28k8.moonweb.org`, die die eigene BBS-/Demoscene-Vergangenheit der 90er Jahre in Augsburg dokumentiert und als Portal zu bereits existierenden Archiv-Subdomains (`phobia`, `tcm`) sowie neuen Unterseiten (SkyLINE, Kosmos Design, Tropic DREAMs, ESPRIT, MOD-Sammlung, BBS-ANSI-Art, Fidonet) dient.

Das ursprüngliche Vorbild ist das eigene BBS aus den 90ern:

```
tHE tEMPLE bBS
0821-2191038 (Augsburg)
Sysop: Stefan Koelle
Fido: 2:2480/330
```

Die Seite soll stilistisch wie ein echtes DOS-Terminal wirken (schwarzer Hintergrund, ANSI-Art, CP437-Font), aber technisch eine moderne, rein clientseitige Static Site sein – kein Backend, kein PHP.

**Kernprinzip:** Nostalgie-Genauigkeit im Design > moderne UX-Konventionen. Lieber weniger Schnickschnack als zu viel. Kleine, witzige moderne Gimmicks im alten Stil sind erlaubt (z. B. Modem-Dial-Sound, In-Browser-MOD-Player).

## 2. Ziele / Non-Goals

**Ziele:**
- Alle eigenen 90er-Projekte (PC/Atari ST/Amiga/BBS) an einem zentralen Ort dokumentieren
- Authentisches BBS-/Terminal-Gefühl per Maus (primär, ganze Box/Kachel klickbar inkl. Hover-State) **und** Tastatur (Fallback, eindeutige Buchstaben-Shortcuts)
- Vollständig statisch, SEO-fähig
- Wartbar über Markdown+Frontmatter im Git-Repo, Content-Pflege künftig primär durch AI-gestützte Edits
- Kein Server, kein PHP, keine Datenbank
- Komplett englischsprachiger Content

**Non-Goals:**
- Keine Barrierefreiheit/Accessibility
- Kein CMS, kein Backend, kein Login-System
- Kein Nodelist-Browser
- Keine Terminal-Effekte wie Scanlines/CRT-Curvature/Flicker
- Kein Guestbook/Kommentarfunktion
- Kein Analytics/Tracking jeglicher Art
- Kein Easter-Egg im Buchstaben-Footer (rein dekorativ)

## 3. Tech-Stack & Architektur

| Bereich | Entscheidung |
|---|---|
| Framework | **Astro** + React-Islands für interaktive Komponenten (Terminal-Input, MOD-Player, ANSI-Renderer) |
| Rendering | Vollständig statisch, jede Route wird zur Build-Zeit vorgerendert (SSG) |
| Hosting | **Cloudflare Pages** – Git-Push triggert automatisch Cloudflare-eigenen Build & Deploy |
| DNS/CDN | Cloudflare |
| Domain-Registrar | 1&1 IONOS (unverändert) |
| Backend | **Keins.** Kein PHP, keine serverseitige Logik jemals |
| Asset-Hosting (Downloads) | `files.moonweb.org` (Synology oder eigener Static-Fileserver-Container) |
| Asset-Ablage (Design-Referenz) | `source-assets/` im Haupt-Repo |
| Repo | Neues, öffentliches GitHub-Repo |
| Content-Format | Markdown mit Frontmatter pro Release/Seite |

### 3.1 Technologie-Entscheidung: Astro statt Eleventy

**Frage geklärt:** Eleventy (11ty) ist ein reiner Template-basierter Static-Site-Generator ohne eingebaute Interaktivitäts-Architektur – JS-Komponenten (Terminal-Input, ANSI-Renderer, MOD-Player) müssten manuell über einen separaten Bundler eingebunden werden, inkl. eigener Logik dafür, dass nur nötige Seiten JS laden.

Astro bietet **Islands Architecture**: jede Seite ist standardmäßig 100% statisches HTML/CSS, nur explizit markierte Komponenten (Terminal-Shell, MOD-Player) werden als React-Island hydriert. Zusätzlich: Content Collections mit Schema-Validierung (Zod) für Markdown+Frontmatter, integrierte View-Transitions-API für den gewünschten SPA-Effekt zwischen Subseiten. Deshalb Astro statt Eleventy – bessere Passform für "größtenteils statisch, aber gezielt interaktiv".

### 3.2 Lokaler Dev-Workflow

Damit vor jedem Push zu GitHub lokal getestet werden kann (Astro bringt das ohne Zusatztooling mit):

| Command | Zweck |
|---|---|
| `npm run dev` | Lokaler Dev-Server mit Hot-Reload (`localhost:4321`) für die Entwicklung |
| `npm run build` | Erzeugt den finalen statischen Build nach `dist/` – identisch zu dem, was Cloudflare Pages baut |
| `npm run preview` | Startet einen kleinen lokalen Webserver, der exakt den `dist/`-Static-Build ausliefert, zum Prüfen vor dem Push |

Damit ist ein vollständiger lokaler Build+Test-Zyklus möglich, ohne dass die GitHub Action/Cloudflare Pages involviert sein muss.

### CI/CD
- Push auf `main` → Cloudflare Pages Build (Astro build) → automatisches Deploy
- Preview-Deployments für Pull Requests (Cloudflare-Pages-Standardfeature)
- Kein SFTP/IONOS-Webspace-Deploy nötig

## 4. Informationsarchitektur / URL-Struktur

```
28k8.moonweb.org/                      → Modem-Connect-Intro (nur beim ersten Besuch
                                          bzw. nach explizitem "Disconnect")
28k8.moonweb.org/bbs/                   → Hauptmenü (2x2-Kachel-Raster), Google-indexierbar
28k8.moonweb.org/bbs/pc/                → PC Section (Anchor-Ziel, kein eigenständiger Content)
28k8.moonweb.org/bbs/pc/phobia          → Subseite PHOB!A
28k8.moonweb.org/bbs/pc/trancemission   → Subseite Tr@nceMISSION
28k8.moonweb.org/bbs/pc/skyline         → Subseite SkyLINE Productions
28k8.moonweb.org/bbs/pc/kosmos-design   → Subseite Kosmos Design [KDS]
28k8.moonweb.org/bbs/atari/             → Atari Section (Anchor-Ziel)
28k8.moonweb.org/bbs/atari/tropic-dreams→ Subseite Tropic DREAMs
28k8.moonweb.org/bbs/amiga/             → Amiga Section (Anchor-Ziel)
28k8.moonweb.org/bbs/amiga/esprit       → Subseite ESPRIT Releases
28k8.moonweb.org/bbs/amiga/mods         → Subseite MOD Files (mit In-Browser-Player)
28k8.moonweb.org/bbs/fido/              → BBS & FIDO Section (Anchor-Ziel)
28k8.moonweb.org/bbs/fido/ansi-art      → Subseite BBS ANSI Art
28k8.moonweb.org/bbs/fido/nodelist      → Subseite Fidonets and Nodelists
28k8.moonweb.org/bbs/legal-notice        → Legal Notice (Pflichtseite, eigener Menüpunkt)
```

**Regeln:**
- `/` zeigt Intro nur beim allerersten Besuch (`localStorage`-Flag), danach Redirect zu `/bbs/`
- "Disconnect" setzt den Flag zurück und navigiert zu `/`
- Zurück-Navigation: `[B] Back` als Tastaturbefehl, zusätzlich klickbar
- Mobile: Section-URL scrollt zum Anchor innerhalb `/bbs/` (`/bbs/#atari`)
- Subseiten-Wechsel wirkt wie SPA (äußerer Terminal-Rahmen bleibt bestehen), aber jede Subseite hat eine echte, vorgerenderte, crawlbare URL

## 5. Interaktionsmodell

### 5.1 Modem-Connect-Intro (`/`)
- 28k8-Modem-SVG + simuliertes Terminalfenster, ATDT-Wählbefehl
- Line-Auswahl:
  ```
  Line 1: +49-821-2191-038 [VFC V34] 28800
  Line 2: +49-821-2191-036 [X75]     64000
  ```
- **Line 1:** Volle Modem-Einwahl-Simulation (Wählton → Pieptöne → Handshake-Sound) → Redirect zu `/bbs/`
- **Line 2:** Kein Sound, sofortiger Direktzugang → Redirect zu `/bbs/`
- Sound nur an dieser einen Stelle im gesamten Projekt

### 5.2 Hauptmenü (`/bbs/`) – Bedienlogik
- **Keine Section-Keys mehr** (P/A/G/F entfallen) – Sections selbst sind reine visuelle Gruppierung ohne eigenes Ziel
- **Jeder einzelne Menüpunkt bekommt einen global eindeutigen Tastatur-Shortcut** (siehe Keymap-Tabelle 5.2.1), Tastatur ist Fallback/Gimmick
- **Primäre Bedienung: Maus** – die **komplette Kachel/Box ist klickbar** (nicht nur der `[X]`-Buchstabe am Anfang der Zeile), inkl. Hover-State (z. B. Aufhellen der Box-Rahmenfarbe oder invertierter Text)
- Ungültige Tasteneingabe: keine Fehlermeldung, wird einfach ignoriert (kein "Invalid selection"-Text)
- Kein Sysop-Login-Screen, kein "New User"-Dialog – nach Intro direkt ins Hauptmenü
- **Statuszeile gewünscht:** unten im Hauptmenü (und ggf. auf Subseiten) eine Zeile im Stil `Connected: 28800 bps | Line: V34 | 28k8.moonweb.org` – Details (echte vs. simulierte Uhrzeit, weitere Felder) noch offen, siehe Abschnitt 15
- **Buchstaben-Button-Footer** ("t H E t E M P L E b B S", siehe Referenzscreen 7.2 Punkt 4) wird 1:1 optisch nachgebaut, ist aber **rein dekorativ, ohne Klickfunktion/Easter-Egg**
- **Layout: 2×2-Kachel-Raster** auf Desktop (siehe 14.1), auf Mobile 1 Spalte mit allen 4 Kacheln untereinander (siehe 14.1-Mobile)
- Kein Guestbook, kein Loading-Screen zwischen Seiten (sofortiger Content-Wechsel). Optional/nice-to-have: leicht verzögerter Textaufbau mit kleinem "Stocken" mitten in der Zeile beim ersten Erscheinen einer Box – kein Muss, kann später entschieden werden
- Legal Notice ist ein regulärer Menüpunkt im BBS-Stil (nicht nur ein unauffälliger Footer-Link)

### 5.2.1 Globaler Keymap

| Key | Ziel | Bereich |
|---|---|---|
| `B` | Back | global |
| `Q` | Disconnect | global |
| `I` | Legal Notice | global |
| `P` | PHOB!A | PC |
| `T` | Tr@nceMISSION | PC |
| `S` | SkyLINE Productions | PC |
| `K` | Kosmos Design [KDS] | PC |
| `D` | Tropic DREAMs | Atari ST |
| `E` | ESPRIT Releases | Amiga |
| `M` | MOD Files | Amiga |
| `A` | BBS ANSI Art | BBS & FIDO |
| `N` | Fidonets and Nodelists | BBS & FIDO |

**Offen:** Reihenfolge der Kacheln (welche Section oben-links im 2×2-Raster). `M` wurde als globaler Main-Menu-Key verworfen — bei nur 2 Ebenen und immer verfügbarem `[B] Back` ist er nicht nötig, stattdessen `M` für MOD Files (Amiga) reserviert.

### 5.3 Subseiten
- Gleiches Grundlayout: ANSI-Banner-Header + Einleitungstext + Release-Liste + Outbound-Link-Box
- Ausnahme SkyLINE: PNG-Header (Cyan "SKY"/Weiß "LINE" auf Blau-Gradient), zweispaltiges Listen-Layout (siehe 14.2)
- Content-Wechsel behält äußeren Terminal-Rahmen bei

## 6. Design-System

| Element | Vorgabe |
|---|---|
| Grundfarben | Strikt DOS 16-Farben-Palette, Hintergrund konsequent Schwarz |
| Vordergrundfarbe Standard | Grau/Weiß, angelehnt an MS-DOS 6.22 |
| **Verboten** | DOS-Blau als Hintergrund |
| Hauptfarbe gesamte Seite | Dunkelrot/Hellrot (bestätigt durch Original-Screens) |
| SkyLINE-Ausnahme | **Nur innerhalb** der SkyLINE-Subseite: zusätzlich Blau/Hellblau als Akzent (PNG-Header + Rahmen-Akzente), Rest der Seite bleibt sonst konsistent im roten Grundton |
| Box-/Rahmen-Stile | (a) eckige Klammerboxen `[ Titel ]`; (b) runde Divider mit `º`/`°` für große Abschnittsüberschriften |
| Terminal-Effekte | Keine Scanlines, kein Flicker, kein CRT-Curvature |
| Font (ANSI/echte Retro-Art) | Echte CP437/DOS-Font (z. B. "Web 437"/"Perfect DOS VGA 437") |
| Font (Fake-BBS-Fließtext) | IBM Plex Mono o. ä. Monospace |
| Breite | Fix 80 Zeichen breit, vertikal unendlich scrollbar |
| Sound | Ausschließlich der Modem-Connect-Sound in der Intro |
| Barrierefreiheit | Explizit nicht priorisiert |
| Analytics | Keins – kein Tracking jeglicher Art |
| Favicon/Social-Preview | **Ja, vollständig umsetzen** – Retro-Favicon (z. B. Ausschnitt Temple-BBS-Logo) + Open-Graph-Bild für Link-Previews (Discord/Mastodon/etc.) |

### 6.1 Kachel-Styling-Beschreibung (textuelle Spezifikation, noch nicht visuell umgesetzt)

Die 4 Hauptmenü-Kacheln sollen "stylischer" wirken als reine Einfarb-Boxen, aber ohne die 16-Farben-Grenze zu verlassen. Ansatz: **Dithering-Farbverläufe per ANSI-Blockzeichen**, eine klassische Scene-Technik – durch Kombination von Halbraster-Zeichen (`░` `▒` `▓` `█`) mit wechselnder Vorder-/Hintergrundfarbe lässt sich innerhalb der 16-Farben-Palette ein Verlaufseffekt simulieren (z. B. Kachel-Kopfzeile: oben helles Rot auf dunklem Rot mit `█`-Zeichen, darunter zunehmend `▓`→`▒`→`░` für einen weichen Übergang zum schwarzen Body). Diese Technik wurde in echten 90er-ANSI-Artworks häufig für Logo-Hintergründe und Balken verwendet und passt damit stilecht. Die konkrete Umsetzung (welche Zeichen, welche Farbpaare pro Kachel) wird erst in der Design-/Umsetzungsphase ausgearbeitet, hier nur als Anforderung dokumentiert.

### 6.2 Box-Interaktion
- Die **gesamte Kachel bzw. gesamte FILE_ID.DIZ-Box** ist eine klickbare Fläche (nicht nur das Shortcut-Zeichen)
- Hover-State erforderlich (visuelle Rückmeldung, z. B. hellere Rahmenfarbe oder Farbinversion), Umsetzungsdetail folgt in der Design-Phase

### 6.3 Content-Sprache
**Die komplette Live-Seite wird auf Englisch verfasst** – Menütexte, Einleitungstexte, FILE_ID.DIZ-Beschreibungen, Statusmeldungen, Fehlertexte (falls vorhanden) und so weit rechtlich zulässig auch das Impressum. Dieses PRD-Dokument selbst bleibt als internes Planungsdokument auf Deutsch.

## 7. ANSI-Art-Handling

- Quellmaterial: `.ANS`-Dateien (transkribiert) sowie Foto-Screenshots als aktuelle visuelle Referenz
- Rendering-Strategie: Hybrid (teilweise Live-ANSI-Rendering, größtenteils Fake-BBS-Look mit CP437-Font)
- BBS-ANSI-Art-Galerie: ca. 8 Snippets, untereinander, mit Fake-BBS-Kontexttexten dazwischen

### 7.1 Asset-Intake & Ablage-Konvention

| Kategorie | Beispiel | Ablageort |
|---|---|---|
| Design-Referenz | Fotos/Screenshots Original-BBS | `source-assets/reference/` im Haupt-Repo |
| Enduser-Downloads | `.ans`, Disk-Images, `.mod`-Dateien | `files.moonweb.org` |

Kein ZIP im Repo committen (nur als Transportweg). Kebab-case-Dateinamen mit Herkunfts-Tag.

### 7.2 Bereits gesichtetes Referenzmaterial (Stand 12.08.2026)

1. Hauptmenü-Screen (rot/pink): Blocklogo, "USEFULL INFORMATION"/"SUPPORTED NETS" mit `º...°`-Divider
2. Hauptmenü-Screen (Line-1/Line-2): bestätigt Wortlaut, FidoNet-Adressen, Tagline
3. Tr@nceMISSION-Crack-Intro: ASCII-Blocklogo, Stilvorbild (Inhalt nicht übernehmen)
4. Regular-Nets-Übersicht: `[ Titel ]`-Rahmenmuster, Buchstaben-Button-Footer
5. Pixel-Logo-Variante: Sponsor-Tags, Kandidat für Fidonet-Seite
6. ASCII-Slash-Logo mit `%KDS world headquarter%`-Tag
7. SkyLINE-PNG-Header: Cyan/Weiß auf Blau-Gradient

## 8. Content-Modell (Markdown + Frontmatter)

```yaml
---
title: "Runner"
group: "Tropic DREAMs"
year: 1991
platform: "Atari ST"
credits:
  - role: "Idea"
    name: "CPK"
  - role: "Coding"
    name: "Stefan"
description: >
  An all-round helper tool including a database, memo, system overview,
  and a game.
download_url: "https://files.moonweb.org/atari/tropic-dreams/runner.zip"
screenshot: "https://files.moonweb.org/atari/tropic-dreams/runner_shot1.png"
file_id_diz: |
  RUNNER v1.0
  by Tropic DREAMs
  All-round helper
  tool w/ Hangman
  game. (~25 chars
  per line wrap)
---
```

Content-Sprache in allen Feldern: Englisch (siehe 6.3).

## 9. Sections & Menüpunkte

### PC Section
Hardware: Colani 486 DX-50 / DOS / VGA / Soundblaster AWE32

| Menüpunkt | Key | Status | Ziel |
|---|---|---|---|
| PHOB!A | `P` | Bestehende Subdomain | `moonweb.org/phobia/` |
| Tr@nceMISSION | `T` | Bestehende Subdomain, Releases nachtragen | `moonweb.org/tcm/` |
| SkyLINE Productions | `S` | **Neue Subseite, MVP #1** | FILE_ID.DIZ-Liste + Screenshots + PNG-Header |
| Kosmos Design [KDS] | `K` | **Neue Subseite** | 4 Releases + Fremdproductions integriert |

### Atari ST Section
Hardware: 1040 STFM (1MB) / Mega 4 (4MB, 60MB HDD)

| Menüpunkt | Key | Status |
|---|---|---|
| Tropic DREAMs | `D` | **Neue Subseite**, Inhalte vollständig vorhanden (International Kegeln and Bowling 1990, Runner 1991, Atom Oh No! 1991, TOP Tools 1992) |

### Amiga Section
Hardware: Amiga 500, 1MB, 2 Diskdrives

| Menüpunkt | Key | Status |
|---|---|---|
| ESPRIT Releases | `E` | **Neue Subseite** – Content TBD |
| MOD Files | `F` | **Neue Subseite** mit In-Browser-MOD-Player |

### BBS & FIDO Section
Hardware: 486dx2-66 OS/2 Warp 3; PHOBOS 486dx2-66 OS/2-Mailbox

| Menüpunkt | Key | Status |
|---|---|---|
| BBS ANSI Art | `A` | **Neue Subseite** – ca. 8 Snippets |
| Fidonets and Nodelists | `N` | **Neue Subseite** – Nodelist 2:2480/330 |

## 10. Downloads & Asset-Strategie

Original-Assets werden direkt zum Download angeboten, gehostet auf `files.moonweb.org`. Design-Referenzmaterial separat in `source-assets/reference/`.

## 11. SEO & Crawlability

`/bbs/` und alle Subseiten vollständig vorgerendert. `sitemap.xml`/`robots.txt`. Aussagekräftige `<title>`/`<meta description>` (Englisch) pro Subseite.

## 12. Offene Punkte (TBD)

- [ ] Weitere `.ANS`-Rohdateien ins Repo übernehmen
- [ ] Finale Release-Texte/FILE_ID.DIZ-Inhalte (Englisch) für SkyLINE, Kosmos Design, ESPRIT
- [ ] Technisches Setup von `files.moonweb.org`
- [ ] Foto vom Amiga 500 nachreichen
- [ ] Sponsor-/Affiliation-Tags: welche als Flavor-Text auf der Fidonet-Seite erscheinen
- [ ] Cloudflare Pages Projekt-Setup
- [ ] Fehlende Tr@nceMISSION-Releases nachtragen
- [ ] Referenzbilder gemäß 7.1 ins Repo einpflegen
- [ ] **Keymap-Bestätigung** (Tabelle 5.2.1) und Kachel-Reihenfolge im 2×2-Raster
- [ ] Konkrete Umsetzung der Dithering-Gradient-Kacheln (Abschnitt 6.1) in der Design-Phase
- [ ] Optionaler "Stocken beim Textaufbau"-Effekt: einbauen oder weglassen (nice-to-have, kein Muss)
- [x] Legal Notice-Inhalt (Pflichtangaben) zusammenstellen

## 13. MVP-Reihenfolge (Vorschlag)

1. Grundgerüst: Astro-Projekt, Terminal-Shell-Komponente, Routing `/`, `/bbs/`
2. Modem-Connect-Intro mit Line-1/Line-2-Logik und Sound
3. Hauptmenü `/bbs/` mit 2×2-Kachel-Raster und Buchstaben-Button-Footer
4. **SkyLINE-Subseite** als erste vollständige Content-Subseite (zweispaltiges Listen-Layout)
5. Rollout der übrigen Subseiten nach demselben Template
6. MOD-Player-Integration (Amiga-Section)
7. Deployment-Pipeline (Cloudflare Pages) parallel von Anfang an aktivieren

## 14. Wireframes (ASCII-Scribbles, Layout-Sketches)

**Hinweis:** Grobe Struktur-Skizzen, keine finale ANSI-Kunst. Farbverläufe/Dithering (siehe 6.1) sind hier nur als Kommentar markiert, nicht ausgezeichnet.

### 14.1 Hauptmenü `/bbs/` – Desktop: 2×2-Kachel-Raster (je Kachel ~40 Zeichen)

```
================================================================================
||  [ ASCII-LOGO PLATZHALTER: "tHE tEMPLE bBS" Blockschrift-Banner,          ||
||    Referenz: source-assets/reference/temple-bbs-mainmenu-red-v1.jpg ]     ||
||        DemoBoard - MultiNetServer - no ratios - Augsburg, DE              ||
||             FidoNet: 2:2480/330 - 2:2480/331                              ||
================================================================================

+--------------------------------------++--------------------------------------+
| PC SECTION                           || ATARI ST SECTION                     |
| <- Kachel-Kopf mit Dither-Gradient    || <- Kachel-Kopf mit Dither-Gradient    |
| (siehe 6.1), Farbe dunkelrot->hellrot || (siehe 6.1), Farbe dunkelrot->hellrot |
|                                       ||                                       |
| Colani 486 DX-50 / DOS / VGA /       || 1040 STFM (1MB) / Mega 4 (4MB,       |
| Soundblaster AWE32                   || 60MB HD)                              |
|                                       ||                                       |
| [P] PHOB!A                           || [D] Tropic DREAMs                     |
| [T] Tr@nceMISSION                    ||                                       |
| [S] SkyLINE Productions              ||                                       |
| [K] Kosmos Design [KDS]              ||                                       |
|                                       ||                                       |
| (ganze Kachel klickbar + Hover)      || (ganze Kachel klickbar + Hover)       |
+--------------------------------------++--------------------------------------+
+--------------------------------------++--------------------------------------+
| AMIGA SECTION                        || BBS & FIDO SECTION                    |
|                                       ||                                       |
| Amiga 500, 1MB, 2 Diskdrives         || 486dx2-66 OS/2 Warp3 / PHOBOS         |
|                                       || Mailbox                               |
| [E] ESPRIT Releases                  || [A] BBS ANSI Art                      |
| [F] MOD Files                        || [N] Fidonets and Nodelists            |
|                                       ||                                       |
+--------------------------------------++--------------------------------------+

 [B] Back   [Q] Disconnect   [I] Legal Notice

 -----------------------------------------------------------------------------
 | t | H | E |   | t | E | M | P | L | E |   | b | B | S |   <- rein dekorativ
 -----------------------------------------------------------------------------

 Status: 28800 bps | Line V34 | 28k8.moonweb.org   <- Statuszeile
================================================================================
```

### 14.1-Mobile Hauptmenü – Kacheln gestapelt (1 Spalte)

```
================================
|| ASCII-LOGO (verkleinert)   ||
================================

+------------------------------+
| PC SECTION                  |
| Colani 486 DX-50 / DOS /    |
| VGA / Soundblaster AWE32    |
|                              |
| [P] PHOB!A                  |
| [T] Tr@nceMISSION           |
| [S] SkyLINE Productions     |
| [K] Kosmos Design [KDS]     |
+------------------------------+

+------------------------------+
| ATARI ST SECTION             |
| 1040 STFM (1MB) / Mega 4     |
|                              |
| [D] Tropic DREAMs            |
+------------------------------+

+------------------------------+
| AMIGA SECTION                |
| Amiga 500, 1MB, 2 Disk       |
|                              |
| [E] ESPRIT Releases          |
| [F] MOD Files                |
+------------------------------+

+------------------------------+
| BBS & FIDO SECTION           |
| 486dx2-66 OS/2 Warp3         |
|                              |
| [A] BBS ANSI Art             |
| [N] Fidonets and Nodelists   |
+------------------------------+

 [B] Back [Q] Disconnect [I] Legal Notice
 Status: 28800 bps | V34
================================
```

### 14.2 SkyLINE-Subseite `/bbs/pc/skyline` – Desktop, zweispaltige Liste

```
================================================================================
||   [ PNG-HEADER: skyline-header.png - Cyan "SKY" + Weiss "LINE" auf       ||
||     blauem Gradient-Banner, darunter schwarzer Hintergrund ]              ||
================================================================================

 [B] Back to Main Menu                          28k8.moonweb.org/bbs/pc/skyline

 --------------------------------------------------------------------------
 SkyLINE Productions
 Intro text (TBD, English): Application software for the 486, small tools
 and subdemos. Most of my own PC releases happened here.
 --------------------------------------------------------------------------

 +----------------------------------------+  +-------------------------+
 | TOOLNAME v1.0                           |  | [ FILE_ID.DIZ ]--[ 01 ] |
 | by SkyLINE Productions                  |  | .-----------------.    |
 | Year: 199x   Platform: DOS/486          |  | | TOOLNAME v1.0   |    |
 | Credits: Coding-Stefan | Gfx-...        |  | | by SkyLINE Prod.|    |
 |                                          |  | | --------------- |    |
 | [Screenshot Thumbnail Placeholder]      |  | | Short descr.,   |    |
 | (files.moonweb.org, ca. 240x160)        |  | | wrapped at ~25  |    |
 |                                          |  | | chars, like the |    |
 | [D]ownload   [S]creenshot   [I]nfo      |  | | original DIZ.   |    |
 |                                          |  | '-----------------'    |
 | (ganze Box klickbar + Hover)            |  | (~25 Zeichen breit)     |
 +----------------------------------------+  +-------------------------+

 +----------------------------------------+  +-------------------------+
 | ... naechstes Release, gleiches Muster, untereinander in der Liste ...  |
 +----------------------------------------+  +-------------------------+

 --------------------------------------------------------------------------
 [B] Back   [Q] Disconnect
================================================================================
```

### 14.2-Mobile SkyLINE – gestapelte Spalten pro Release

```
================================
|| PNG-HEADER (verkleinert)    ||
================================
 [B] Back

 SkyLINE Productions
 Intro text (TBD, English)...

 +------------------------------+
 | TOOLNAME v1.0                |
 | by SkyLINE Productions       |
 | Year: 199x  Platform: DOS    |
 | Credits: Coding-Stefan       |
 |                               |
 | [Screenshot Placeholder]     |
 |                               |
 | [D]ownload [S]creenshot      |
 +------------------------------+
 +------------------------------+
 | [ FILE_ID.DIZ ]------[ 01 ]  |
 | .--------------------.      |
 | | TOOLNAME v1.0      |      |
 | | by SkyLINE Prod.   |      |
 | | Short descr. text  |      |
 | | wrapped ~25 chars  |      |
 | '--------------------'      |
 +------------------------------+

 ... (naechstes Release darunter) ...

 [B] Back [Q] Disconnect
================================
```

## 15. Noch offene Detailfragen

- [ ] Reihenfolge der Kacheln im 2×2-Raster (Vorschlag: PC oben-links, Atari oben-rechts, Amiga unten-links, BBS&FIDO unten-rechts – zu bestätigen)
- [ ] Keymap-Tabelle 5.2.1: passt so oder andere Wunsch-Buchstaben (historisch aus Original-BBS-Menü)?
- [ ] Statuszeile: exakte Felder (echte vs. simulierte Uhrzeit, weitere Angaben wie "Time online")
- [ ] Optionaler Stocken-Effekt beim Textaufbau: einbauen oder nicht (nice-to-have)
- [x] Legal Notice: Pflichtangaben zusammenstellen (Name, Anschrift, Kontakt – rechtlich notwendig)
- [ ] Konkrete Farbpaare/Zeichen für die Dithering-Gradient-Kacheln (Abschnitt 6.1) in der Design-Phase festlegen

---

**Ende PRD v2.0**
