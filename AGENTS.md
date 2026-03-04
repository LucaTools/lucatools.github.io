# Agent Instructions

This file provides guidance to agents when working with code in this repository.

## Project Overview

Static marketing website for **Luca**, a minimalistic decentralized tool manager for macOS. Hosted on GitHub Pages at `luca.tools`. No build process — the repository is served directly as-is.

## Development

No build, lint, or test commands. To preview locally, serve the root with any static file server:

```sh
python3 -m http.server 8080
# or
npx serve .
```

## Architecture

Single-page site with no framework or dependencies:

- **index.html** — The entire site content (hero, features, quick-start, footer). Contains inline SEO meta tags, Open Graph/Twitter Card tags, and JSON-LD structured data.
- **css/style.css** — All styling. Uses CSS variables (`--color-primary: #10b981` emerald green, `--bg: #030712` dark). Glassmorphic cards, CSS Grid layout, responsive breakpoints at 768px.
- **js/terminal-animation.js** — Animates the terminal demo on the landing page using `async/await` with a sequence of typed commands and outputs. Uses `IntersectionObserver` to trigger when visible.
- **js/logo-animation.js** — Hover and pulsating glow effects on the SVG logo.
- **js/main.js** — Clipboard copy functionality for the install command snippet.
- **install.sh / uninstall.sh** — Thin wrappers that delegate to external scripts hosted on GitHub (not the actual installer logic).

## Key Design Decisions

- Fonts: Inter (body), JetBrains Mono (code/terminal).
- All theming is done via CSS variables — changes to colors/spacing should go through variables in `:root` in `style.css`.
- The terminal animation sequence in `terminal-animation.js` must be kept in sync with the actual Luca CLI UX if the tool's behavior changes.
