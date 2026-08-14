# CUELUM website

Real, buildable React app (Vite) implementing the CUELUM website design exported from Claude Design (`project/ui_kits/website/`). This replaces the browser-Babel prototype so the site can be edited as normal code.

## Run it

```
npm install
npm run dev
```

Open the printed `http://localhost:5173` URL in your browser.

## Structure

- `src/App.jsx` — page shell: sticky nav, page switcher, footer (mirrors the old `index.html` `Site` component).
- `src/pages/` — `HomePage.jsx`, `VexaPage.jsx`, `CuriosityPage.jsx`, `AmbliaPage.jsx`.
- `src/components/core/` — shared design-system primitives (Button, Label, NavBar, Rule, TextField, etc.), copied from `project/components/core/` — these were already real ES modules.
- `src/components/NotifyForm.jsx` — waitlist/notify form shared by Curiosity and Amblia pages (previously a `window.CaNotifyForm` global hack in the prototype; now a normal import).
- `src/site.css` — page-specific interaction styles (division hover, responsive grid, VEXA marquee animation) that used to live in an inline `<style>` tag in the prototype's `index.html`.
- `public/` — design tokens (`tokens/*.css`, `styles.css`), brand assets (`assets/`), and the hero/division images actually used (`uploads/`), served as static files at the site root.

## Source of truth

`project/` is the original Claude Design export (untouched) — keep it around as a reference for anything not yet ported, but new edits should happen here in `website/`.
# cuelumsitereleasev1
# releaseprivate
