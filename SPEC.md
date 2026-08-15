# SPEC.md - 28k8.moonweb.org Technical Specification (v2)

## v2 changes (bug fixes + requested improvements)
1. Fixed: ANSI banner not visible - v1 only showed a placeholder <pre> comment.
   Now rendered via src/components/AnsiArt.astro + src/lib/ansiArt.ts (precomputed
   colored HTML via set:html, zero JS required).
2. Fixed: Disconnect not working - v1's mouse link never cleared localStorage,
   so '/' bounced straight back to '/bbs/'. Fixed in src/components/NavBar.astro
   via a plain onclick attribute that clears state before navigating.
3. More content: Tropic DREAMs (4 real releases), SkyLINE (+3), Kosmos Design
   (7, new collection), ESPRIT (4, new collection), MOD Files tracklist, BBS
   ANSI Art gallery (8 filler patterns), PHOB!A/Tr@nceMISSION teaser text.
4. More period ASCII art + gradients: 10 full boxed banners (5x7 bitmap font)
   each with a dithering gradient bar, plus 9 net-list boxes transcribed
   verbatim from the original reference screenshots (Fidonet/Nodelist page).
5. SkyLINE blue accent strengthened (headings/tiles/diz-box/nav-bar) + a real
   generated header PNG (public/images/skyline-header.png).

## Repository layout delta
src/lib/ansiArt.ts, src/components/AnsiArt.astro, src/components/NavBar.astro,
tools/generate_ansi.py, public/images/skyline-header.png, public/favicon.ico,
public/og-image.png, src/content/kosmos-design/*.md, src/content/esprit/*.md

## AnsiArt contract
BANNER_<NAME> / ANSI_GALLERY / BOX_<NAME> exports, HTML with CSS classes
c-border-red, c-main-red, c-shadow-red, c-border-blue, c-main-blue,
c-shadow-blue, c-white, c-grey, c-pink, c-cyan (all in global.css).
Render via <AnsiArt html={BANNER_X} />.

## NavBar contract
optional [B] Back (history.back()), always [Q] Disconnect
(clears localStorage.hasConnected via onclick, then navigates to /),
optional [I] Impressum & Privacy. Use everywhere instead of ad-hoc links.

## Everything else
Routing table, design tokens, local dev workflow (npm run dev/build/preview),
deployment (Cloudflare Pages) - unchanged from v1. See PRD.md and PLAN.md.
