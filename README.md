# ClipForge Web

The ClipForge website: a static site served by GitHub Pages from this repository's root, modelled on `ivault-web`.

## Pages (planned)

| Page | Purpose |
|---|---|
| Home (built) | "Edit once, export hundreds." The batch-recipe pitch, the workflow, and screenshots |
| Download (built) | Installers for Windows, macOS and Linux, read from `releases.json` |
| Changelog | Release notes for each version |
| Guide | How to import, edit, save a recipe, run a batch, and clean metadata |
| Privacy | What the app does and does not collect (it runs locally) |
| Support | Contact and FAQ |

Brand assets and screenshots come from the `publish` repository.

**Status:** Home and Download are built. Plain HTML/CSS/JS, no build step; preview with `python3 -m http.server` in this folder.

## Design

- Base colours are the app's: canvas `#0E0E10`, brand cyan `#3DE6EF → #0098C8`. Dark is the default; a light theme follows the OS or the toggle.
- The second colour system is the editor's timeline track colours (video, audio, text, effect, sticker, as `--t-*` in `assets/site.css`), used wherever the page talks about that kind of material.
- Type: IBM Plex Sans Condensed (headings), IBM Plex Sans (body), IBM Plex Mono (file names only), self-hosted in `assets/fonts/`.
- The hero's batch sheet (`assets/batch.js`) plays one 200-file run once when it scrolls into view; reduced motion shows the finished batch.
- `download/releases.json` drives the Download page. While `releases` is empty, every platform shows "Not released yet". Each entry looks like `{ "version", "date", "files": { "windows" | "macos" | "linux": { "url", "label" } } }`, newest first.
