# preeta-chatterjee.github.io

Personal portfolio of Preeta Chatterjee: computer vision, simulation, and game engines. Live at **https://preeta-chatterjee.github.io**.

## Stack

- [Vite](https://vite.dev) + React 19
- react-router-dom with `HashRouter` (routes look like `/#/about`, `/#/projects/hallway-hunters`)
- Inline style objects; colors and fonts in `src/theme.js`
- Contact form via [Formspree](https://formspree.io)

## Project layout

| Path | What's there |
|---|---|
| `src/content.js` | All site copy and data: hero, skills, projects, case studies, experience, education, publications. Content edits go here. |
| `src/components/`, `src/pages/` | One component per file; pages for Home, Projects, About, and case studies. |
| `src/routes.js` | Shared route paths (e.g. `CONTACT_PATH`). Use router links, not `#id` anchors. |
| `public/` | Static files served as-is: résumé, paper PDF, favicon, `og-preview.png`, project images in `public/projects/<id>/` (WebP). |
| `assets-src/` | Original PNGs and the `og-preview.png` source page. Not deployed. |
| `index.html` | Page title and Open Graph / Twitter meta tags. |

## Local development

Requires Node 20.19+ or 22.12+.

```bash
npm ci
```

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run preview
```

```bash
npm run lint
```

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and deploys `dist/` to GitHub Pages. In the repository settings, **Pages → Source** must be set to **GitHub Actions**.

The contact form ID comes from the `VITE_FORMSPREE_ID` repository secret when it's set, with a fallback ID in `src/components/ContactForm.jsx`.

The older manual path is kept as a fallback: run `npm run build`, then `npm run deploy`, which pushes `dist/` to the `gh-pages` branch. Pages only serves that branch if **Pages → Source** is switched back to it.

## Regenerating `og-preview.png`

`assets-src/og-preview/og-preview.html` is the 1200×630 source. It loads Bebas Neue and DM Mono from `/__fonts/…`; serve it with those fonts (for example from the `@fontsource/bebas-neue` and `@fontsource/dm-mono` packages) and screenshot it at 1200×630 into `public/og-preview.png`.
