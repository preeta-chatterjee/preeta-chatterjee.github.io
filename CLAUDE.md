# CLAUDE.md

Personal portfolio site for Preeta Chatterjee, served at https://preeta-chatterjee.github.io.

This file is the source of truth for the site restructure. Follow the rules and the PR plan below in every session.

## Repo orientation

- Vite + React 19, react-router-dom with `HashRouter` (routes look like `/#/about`). Styling is inline style objects; `src/index.css` is only a reset. Hover, `:active` and `:focus-visible` states live in `src/interactions.css` (`ix-*` classes; Phase 2 PR 5), not in onMouseEnter handlers. Scroll reveals use `useReveal` (`src/hooks.js`) with `src/reveal.css`; follow the Loading rules below.
- Layout of `src/`:
  - `content.js`: all site copy and data (SITE, CANVAS_LABS, HOME_INTRO, STATS, CONTACT_BLURB, SKILLS, PROJECT_GROUPS, PROJECTS, PUBLICATIONS, ABOUT_QUOTE, ABOUT_SECTIONS, EXPERIENCE, EDUCATION, CASE_STUDIES). Content edits go here.
  - `theme.js`: colors (`C`), fonts (`T`), layout constants, shared style helpers, and the home themes (`HOME_THEMES`, `TAG_TONES`, `homeThemeVars`). `hooks.js`: `useReveal`, `useMobile`.
  - Home theme: `SITE.theme` in `content.js` ("dark" or "light") is the only switch. `HomeGrid` (the 2×2 top of the home page) applies it as CSS variables (`--home-fade-x`, `--about-green`, etc.).
  - `components/`: one component per file. `pages/`: HomePage, ProjectsPage, AboutPage, CaseStudyPage. `App.jsx`: router. `main.jsx` mounts `App`.
  - Case studies: add an entry to `CASE_STUDIES` keyed by slug and it renders at `/#/projects/<slug>`. Link to it from a project with `links: [{ label: "Case Study", to: "/projects/<slug>" }]`.
  - `routes.js`: shared route paths (`CONTACT_PATH`). Link to the contact section with `<Link to={CONTACT_PATH}>`; plain `#id` anchors don't work under HashRouter.
  - UI chrome (section labels like "02 / Selected Work", button text, form labels) still lives inline in components and pages.
- Meta, Open Graph and Twitter tags are in `index.html`.
- Static files (paper PDF, favicon, `og-preview.png`) live in `public/` and are copied to the build as-is.
- Fonts are self-hosted in `public/fonts/` (latin-subset woff2 from Fontsource, SIL OFL; license texts alongside) and declared and preloaded inline in `index.html`. There is no Google Fonts request.
- Project images: deployed WebP files live in `public/projects/<slug>/` (`<name>.webp` max 1600px wide for display, `<name>-full.webp` for the lightbox). Original PNGs are kept in `assets-src/<slug>/`, which is not deployed.
- Project card images: set `media` on a PROJECTS entry (`{ type: "image", src, alt, width, height, position? }` or `{ type: "video", id, title }`). Cards without `media` show no image area. `position` (CSS object-position) picks which part survives the crop. Media appears on the Projects page cards; the home page uses the typographic carousel (`ProjectCarousel.jsx`) instead.
- Where a card or slide links (case study, else first link) and its label: `src/projectLinks.js` (`primaryLink`), shared by `CardCta.jsx` and the carousel.
- `og-preview.png` (1200×630) is generated from `assets-src/og-preview/og-preview.html`; see README.
- Contact form uses Formspree. The ID comes from `VITE_FORMSPREE_ID`, with a hardcoded fallback in `src/components/ContactForm.jsx`.
- Commands: `npm ci`, `npm run dev`, `npm run build`, `npm run lint`, `npm run preview`.
- Deployment is Actions-only: `.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every push to `main` (Settings → Pages → Source is "GitHub Actions"). The manual `npm run deploy` script, the `gh-pages` dev dependency and the `gh-pages` branch were removed in Phase 2.

## Workflow

- Do one PR at a time, in order. After each PR, stop and wait for Preeta to review and merge before starting the next one.
- Run `npm run build` before handing over every PR and report the result.

### PR status

- [x] PR 1: CLAUDE.md + automatic deployment (merged)
- [x] PR 2: Refactor with zero visual change (merged)
- [x] PR 3: Projects (merged)
- [x] PR 4: Fix the 5 existing lint problems (merged)
- [x] PR 5: Fix Contact links (merged)
- [x] PR 6: Copy, metadata, experience, skills, about (merged)
- [x] PR 7: Home "About strip" copy (merged)
- [x] PR 8: Visuals and cleanup (merged, plus Hallway Hunters thumbnail follow-up)

## Rules for all work

- Never invent content. Don't list any tool, metric, result, feature or claim Preeta hasn't given you. If something is unclear, leave a clearly marked placeholder like [TODO: Preeta] and tell Preeta. Don't guess.
- Text provided in quotes or marked "use verbatim" goes on the site exactly as written. Don't rewrite or expand it.
- No em dashes (—) anywhere in visible site text, including meta tags. En dashes in date ranges (Jan–May 2026) are fine.
- Tools Preeta has NOT used, so never list them: Isaac Sim, ROS 2, or any others not in the skills list below.
- Use "built" for projects, never "shipped" (especially for Hallway Hunters).
- Publications must read exactly as: one IEEE conference paper (IEMENTech 2021) and one journal article in IJIIP (2020). Never "two IEEE publications."
- Every PR must pass `npm run build` before handover. Report the result.
- Keep each PR scoped to its own section. No drive-by changes.
- Use US spelling throughout. The current site uses "specialising"; change it.

## Decisions

1. Availability: replace "Summer 2026 co-op" everywhere with "Seeking a co-op/internship, January–August 2027." Graduation: May 2027. Update the education entry to match.
2. Projects: see the PR 3 section below. Use only the facts given there.
3. The refactor is its own PR. Automatic deployment comes first.

## Positioning

Focus: computer vision, simulation and game engines, with long-term interests in physical AI and digital twins. RAG stays as evidence of ML evaluation rigor, not a headline and not "Other work."

## PR 1: CLAUDE.md + automatic deployment (no content or visual changes)

- Add CLAUDE.md containing this whole plan.
- Add a GitHub Actions workflow that builds with Vite and deploys to GitHub Pages on every push to main (actions/upload-pages-artifact + actions/deploy-pages).
- Pass VITE_FORMSPREE_ID from a repository secret if one exists, but keep the existing hardcoded fallback so the contact form works either way.
- Don't delete the gh-pages branch or the `deploy` npm script. They stay as a fallback. (Superseded in Phase 2: both removed; deployment is Actions-only.)
- In the summary, remind Preeta to change Settings → Pages → Source to "GitHub Actions" after merging.

## PR 2: Refactor with zero visual change

- Move all content (SKILLS, PROJECTS, PUBLICATIONS, EXPERIENCE, EDUCATION, ABOUT_SECTIONS, hero copy, canvas labels, marquee items, contact blurb, stats, a SITE object for name/email/links/availability) into src/content.js.
- Split components into src/components/ and pages into src/pages/.
- The rendered site must look identical. List anything you weren't sure how to move.

## PR 3: Projects

Restructure PROJECTS into two groups with filter tabs on the Projects page:

- "Computer Vision & ML": 3D reconstruction, RAG
- "Simulation & Game Engines": Stone & Soul, Hallway Hunters, Roll-a-Ball, Haunted Hallway
- The stair climber moves to the Publications section.
- Keep the Job Tracker under a small "Other" heading.
- Home page: feature Hallway Hunters, Stone & Soul, and 3D reconstruction instead of PROJECTS.slice(0, 3).

New or updated entries (use only these facts):

**When Geometry Breaks: 3D Reconstruction under Motion and Image Degradation** (Oct 2026–present, status: In Progress)

- Course project for Pattern Recognition & Computer Vision at Northeastern, with a classmate.
- Studies how scene motion and image degradation (blur, haze, low light) get confused in feed-forward 3D reconstruction. Uses VGGT as the backbone, with VGGT4D and Easi3R as baselines. Aims to build a degradation-aware masking method that separates real motion from image degradation.
- Preeta's role: motion experiments and the geometric consistency score.
- Research in progress. Claim no results.

**Stone & Soul: 2D Game and Custom C++ Game Engine** (May–Aug 2026)

- Built a custom 2D game engine in C++ and SDL3 on an Entity-Component-System architecture, with swappable collision strategies (grid and quadtree), Lua scripting, A* pathfinding, and a unit and property test suite.
- Built a three-level tile-based puzzle game on the engine (a villager-rescue game with boulder-pushing puzzles), with enemy AI that switches from patrolling to live A* pursuit when the player gets close.

**Hallway Hunters: First-Person Survival Horror (Unreal Engine 5.7)** (Jan–May 2026)

- This is the same project as "Apartment 101" (its earlier name). Merge them into one entry and remove the separate Apartment 101 entry, including the "currently solving a collision bug" and "video coming soon" text and the commented-out video TODO.
- Card summary (use verbatim): "A first-person survival horror game in Unreal Engine 5.7. Trapped on a zombie-infected apartment floor, the player uses doors as tactical barriers to reach a rooftop evacuation before time runs out. Features a three-layer enemy AI (Behavior Tree, Animation Blueprint, Character Blueprint) and was rebuilt from scratch mid-development into a modular codebase."
- No playable build or download link.
- Fix the Haunted Hallway text so its "companion piece to Hallway Hunters" line links to the Hallway Hunters page.

**Hallway Hunters case-study page** at /#/projects/hallway-hunters (the project card links here). Make the layout reusable so other projects can get one later. Embed videos responsively (16:9, lazy-loaded); don't commit video files. Use all section text below verbatim.

**1. Hero**
- Embedded gameplay video: https://youtu.be/9aV8TK9dP9I
- Pitch: "You're a detective trapped on a zombie-infected apartment floor. Zombies can't open doors. Reach the rooftop helicopter before time runs out."
- Tags: Unreal Engine 5.7, Blueprints, Behavior Trees, Niagara, UMG

**2. Overview**
"Hallway Hunters is a first-person survival horror game built in Unreal Engine 5.7. You play a detective trapped on one floor of an apartment building during a viral outbreak, with five zombie-occupied rooms off a central hallway. To survive, you manage your health, fight or evade zombies with a metal pipe, and reach the rooftop evacuation helicopter before the timer runs out. Zombies cannot open doors, so every closed door is a tactical decision."

Then a "Features" list:
- Door interaction with on-screen prompts; doors act as tactical barriers because zombies cannot open them
- Zombie AI with sight-based perception and patrol, chase, and attack states
- Zombie attacks timed to the animation's hit frame
- Player health bar, evacuation countdown timer, and an independent world-space health bar above each zombie
- Main menu, plus win and lose screens with restart
- Six-state zombie animation system (idle, patrol walk, chase walk, attack, hit reaction, death) with a ragdoll death
- Niagara effects: blood splatter on attacks and falling electric sparks
- Flickering lights with randomized, non-repeating timing and occasional full blackouts
- PBR and emissive flicker materials, with 3D spatial audio for zombie alerts
- Melee combat with a metal pipe (see Known Issues)

**3. Enemy AI Architecture**
Intro: "The zombie AI is split into three layers that never bypass each other: the Behavior Tree decides, the Animation Blueprint displays, and the Character Blueprint handles gameplay."
One subsection per layer, each with its blueprint screenshot (click-to-enlarge with a simple lightbox, no heavy dependencies) and this text as the caption:
- Behavior Tree & Blackboard: "Makes every decision. Three branches run in priority order: a dead state, chase-and-attack when the zombie can see the player, and random patrol as the fallback. The AI controller's sight perception (1200-unit radius, 60-degree peripheral angle, 1500-unit lose-sight radius) writes the player reference and a can-see-player flag to the Blackboard."
- Animation Blueprint: "Handles all visual output. A six-state locomotion state machine is driven by speed and the can-see-player flag. Attack, hit reaction, and death play as montages so they blend and interrupt cleanly, and death uses a highest-priority global transition. An Anim Notify on the attack's hit frame fires the damage trace."
- Character Blueprint (BP_Zombie): "Owns health, damage, and the per-zombie health bar, and exposes the state variables the Animation Blueprint reads every frame. Each zombie tracks its own health independently."
Images are in public/projects/hallway-hunters/. Match files to layers by filename and report how they were matched. If a layer has no image, use a labelled placeholder. Show any remaining images in a small gallery with [TODO: Preeta] captions.

**4. Development: The Rebuild**
"All of my semester coursework had been built in a single Unreal project. By mid-development it held several generations of the same zombie Blueprints, duplicate state-machine transitions, and inconsistent Blackboard keys, and the AI behaved unpredictably: attacking out of range, ignoring the player up close, and getting stuck mid-animation. Every fix broke something else, so I started a new project, migrated only confirmed-working assets, and rebuilt every Blueprint system from a written architecture plan. The rebuild took about two days and produced a stable codebase where each system has one responsibility: cleanly separated Behavior Tree branches, a single animation-update path, montage-end callbacks instead of fixed delays, and consistent asset naming."
Then the embedded project walkthrough video: https://youtu.be/LqsOFARvTSs

**5. Known Issues & Next Steps**
- "Weapon hit detection: the pipe's line trace reaches every zombie (confirmed with debug drawing), but damage registers on some instances and not others. Next step: switch to a multi line trace that processes every hit, and audit the collision channel settings on each zombie instance."
- "Level dressing: room layouts, doors, and enemy placement are final, but the apartments lack furniture and props. Next step: dress each room with marketplace props so they read as lived-in homes."

**6. What I Learned**
- "Project organization drives code quality. A semester of experiments in one project file became unmaintainable, and rebuilding with a clean architecture worked better than patching."
- "Implementation should serve design. A looping timeline would have been quicker for the flickering lights, but randomized recursion creates the unpredictability horror needs."
- "Building the full pipeline from perception to Behavior Tree to Animation Blueprint taught me game AI at the systems level. Understanding why the three layers are separated made debugging much faster after the rebuild."

## PR 4: Fix the 5 existing lint problems (done)

- Fix only the lint problems; no visible or behavioral changes. `npm run lint` must report 0 problems.

## PR 5: Fix Contact links

- Every Contact link (desktop nav, mobile menu, footer, hero "Get in Touch") goes to the home page and scrolls smoothly to the contact section, from every page.
- Clicking Contact while already on the home page just scrolls: no blank page, no reload.
- Shareable route `/#/contact` renders the home page and scrolls to the contact section, including on a fresh page load and with back/forward.
- The mobile menu still closes after tapping Contact. No other visible or behavioral changes.

## PR 6: Copy, metadata, experience, skills, about

**index.html** (title, description, og:*, twitter:*):

- Title: "Preeta Chatterjee | Computer Vision · Simulation · Game Engines"
- Description: "MS CS @ Northeastern · Computer vision, simulation, and game engines. Seeking a co-op/internship, January–August 2027."
- Remove the "Two IEEE publications" claim.
- Stop overwriting document.title at runtime, or make it match.

**Hero:** chips "Computer Vision · Simulation · Game Engines". Update the tagline to match, and offer 2–3 options to choose from.

**Canvas labels and marquee:** use only the skills list below.

**Home stats:** remove "3+ Projects Shipped" and "5+ Years Coding". Replace with [TODO: Preeta] placeholders and suggest 2–3 verifiable options (e.g. publications count, GPA).

**About:** rewrite ABOUT_SECTIONS and the pull quote around the positioning above, using only facts in this file. Remove "specialising in NLP and generative AI." Put the draft in the PR summary for review.

**Skills** (only these):

- Languages: Python, C++, C#, Java, MATLAB/Simulink
- ML/AI: PyTorch, NumPy, Hugging Face Transformers, scikit-learn, FAISS, vector search
- Game Engines/Simulation: Unreal Engine (Blueprints, Behavior Trees), Unity, SDL3, ECS architecture, Lua scripting
- Tools & Practices: Git/GitHub, CI/CD, unit & property testing, React.js, Azure Cosmos DB, Agile/Scrum

**Experience** (in this order):

1. Teaching Assistant, CS5800 Algorithms, Northeastern University, Boston (Aug 2026–present)
    - Hold office hours guiding students through dynamic programming, greedy, and graph algorithms
    - Grade homework and exams with written feedback on correctness; proctor quizzes and exams
2. Notetaker, Disability Accommodation Services, Northeastern University, Boston (May–Aug 2026)
    - Provided structured lecture notes for a student in CS5850: Building Game Engines, a graduate C++ course covering rendering pipelines and engine architecture
3. Graduate Engineer Trainee (Simulation and Software Testing), SMS India Pvt Ltd., Kolkata (Aug 2023–Jun 2024; joined after a 4-month internship, Jan–Apr 2023)
    - Built and validated MATLAB/Simulink mathematical models for rolling mill automation; coordinated cross-departmental simulation outputs, reducing project commissioning time by 25%
    - Conducted on-site I/O and integration testing during plant commissioning; troubleshot hardware-software mismatches using system diagrams
    - Led recruitment and onboarding of interns; mentored junior team members on simulation workflows
4. Software Development Intern, Caravel Labs Inc., WA, USA (Jun–Aug 2022)
    - Developed and deployed a full-stack web application using TypeScript and React.js with an Azure Cosmos DB backend in production
    - Collaborated in weekly Agile sprints using Git for version control, code review, and CI/CD

**Education:**

- MS Computer Science, Northeastern University, GPA 4.0, Expected May 2027. Coursework: Machine Learning, Pattern Recognition & Computer Vision, Natural Language Processing, Algorithms, Building Game Engines, Building Virtual Environments.
- B.Tech Electronics & Communication Engineering, Institute of Engineering & Management, Kolkata, GPA 3.75, Apr 2023. Mrs. Maya Chakraborty Award for Academic Excellence (2023).

**Publications:**

- "A Brief Study on Quantum Computing," International Journal of Innovative Research in Physics (IJIIP), 2020
- "Automated Hybrid Stair Climber for Physically Challenged People," IEEE IEMENTech 2021. The research was later built into a physical prototype and presented as my final-year B.Tech project (2023).

**Contact blurb:** "Open to co-op and internship opportunities in computer vision, ML, simulation, and game engines. Boston-based, available January–August 2027."

**Footer:** make the © year dynamic.

**Final decisions (from Preeta's review):**

- Hero tagline: option A, "Building computer vision systems, simulations, and game engines, with long-term interests in physical AI and digital twins."
- Home stats: "4.0" GPA, "7+" Projects Built, "2" Publications, "10+" Years Coding.
- About: draft approved, with "In NLP, my RAG research engine..." in What I Build. Pull quote: "I want to build systems that see the world, and simulations that let machines learn from it."
- Locations: use "India" for India-based entries (SMS India, B.Tech); keep US locations as written.
- Publications order: IEEE paper first, then IJIIP.

## PR 7: Home "About strip" copy

- Separate small PR, after PR 6 is merged and before the visuals PR.
- Update the home page About strip (HOME_INTRO: the "ML meets game dev & beyond." headline and its blurb) to match the positioning: computer vision, simulation, game engines.
- Starting point: headline "Vision meets simulation & game engines.", blurb "Master's student at Northeastern building computer vision systems, simulations, and game engines." Offer Preeta 2 options in the PR and use the one Preeta picks.
- Final decision: headline "Vision meets simulation & game engines." (option A); blurb (verbatim): "Master's student at Northeastern. I came to software through electronics engineering and industrial simulation, and now work on 3D reconstruction, NLP retrieval systems, and game AI in Unreal Engine."

## PR 8: Visuals and cleanup

- Add optional `media` (image or video embed) support to project cards. Move gameplay.png into public/ (compressed to WebP, max ~1600px wide) and use it on the most fitting card. Ask Preeta which one.
- Create public/og-preview.png (1200×630): name plus the three focus areas, matching the site's fonts and colors.
- Delete unused scaffolding: src/assets/hero.png, react.svg, vite.svg.
- Replace README.md with a short description, the stack, local dev commands, and how deployment works.
- Final decisions: Roll-a-Ball card uses gameplay.png; Stone & Soul uses stone-soul-game.png; Hallway Hunters uses ai-debugger (the YouTube thumbnail hosts are blocked by the session's network policy; swap to the gameplay video thumbnail if that host is allowed later). All other cards have no image.
- Follow-up: the Hallway Hunters card now uses Preeta's `hallway-hunters-thumb.png` (original in `assets-src/hallway-hunters/`), cropped to its left 1322×941 so the title stays intact and the Objective HUD box is excluded, with `position: "left center"`. ai-debugger stays in the case-study gallery.

# Phase 2

All Phase 1 rules still apply: no invented content, verbatim text exactly as given, no em dashes in visible text, US spelling, `npm run build` and `npm run lint` must pass, one PR at a time, and wait for Preeta to merge before starting the next one.

## Phase 2 rules

- Every PR must work and be checked at desktop (1440, 1280) and phone (390, 360) widths, and respect `prefers-reduced-motion`.
- Send Preeta screenshots of every visual change at both desktop and phone widths. The theme (`SITE.theme`) only affects the home top band (`HomeGrid`), so both-theme screenshots are needed only when a PR changes that band; otherwise one theme is enough.

### Phase 2 PR status

- [x] PR 1: Analytics (Cloudflare Web Analytics) (merged)
- [x] PR 2: Content cleanup (merged)
- [x] Deployment cleanup: Actions-only (merged; gh-pages branch deleted by Preeta)
- [x] PR 3: Home 2×2 layout with dark and light themes (merged)
- [x] Typography PR: DM Sans body text, larger Technical Arsenal (merged, plus the description-color follow-up)
- [x] Dependency PR: `npm audit fix` (no `--force`) (merged)
- [x] PR 4: Bubble game (merged, plus the tap-highlight fix)
- [x] PR 5: Hover and focus states (merged)
- [x] Loading fix: no first-screen entrance animations, self-hosted fonts (merged)
- [x] PR 6: Project thumbnails (typographic, no images) (merged)
- [x] PR 7: Home projects carousel (merged)
- [ ] About "Off the Clock" section (in review)

## Loading rules (all pages, all future sections)

Added after a real-phone bug: the home grid's boxes appeared separately during load, so the shared top-band fade showed half-drawn, and every heading jumped when the fonts arrived. These rules apply to every page and every new section.

1. Nothing visible in the first screen on load (check 1440×900, 1280×800, 390×844, 360×780) has an entrance animation. It renders immediately. This also applies after client-side navigation: `ScrollToTop` resets the scroll in a layout effect, before the new page measures itself.
2. Never animate backgrounds or shared surfaces (the top-band gradient, the dark about panel, card surfaces, the contact panels, section backgrounds). Only the content inside them may fade.
3. Elements that share a surface appear together as one unit: one `useReveal` per surface, with `className="rv"` on the content inside it. The name box and about box have no animation at all.
4. Below the fold, an optional short fade-up on scroll: 0.45s, 12px, never staggered (no per-item delays). Use `const ref = useReveal()` on the element to measure and `className="rv"` on the content to fade (`src/reveal.css`). `useReveal` decides in a layout effect, before the first paint: if the element is on screen it does nothing; otherwise it sets `data-reveal="hidden"` and then `"shown"` when it scrolls into view. Never put `rv` on an element that paints a background.
5. `prefers-reduced-motion`: no reveal at all. The hook does nothing, and `reveal.css` forces `.rv` visible.
6. Fonts: self-hosted in `public/fonts/` and declared inline in `index.html`. The faces used in the first screen are preloaded with `font-display: block`, so the first render is already in the right font and the browser caps any wait at about 3s. Those faces are Bebas Neue 400, DM Mono 400, DM Sans 400 and DM Serif Display italic. Faces used only below the fold use `swap` and aren't preloaded: DM Mono 500 (canvas text) and DM Serif Display upright (project titles). A new font or weight in the first screen must be added to the preloads. Don't go back to a JS-injected Google Fonts link.
7. Check new sections with a throttled load: Fast 3G (562.5ms RTT, ~1.6 Mbps) plus 4× CPU on a production build (`npm run build`, then serve `dist/`). Filmstrip at 100ms steps at 390 and 1440: the first screen must appear in one frame, in its final fonts.

Implementation notes (loading fix PR):

- Entrance/reveal animations found and what happened to each:
  - HomeGrid mount animation (name 0.15s, about panel 0.3s, buttons 0.4s delays; on phone the about panel's dark background faded too): removed.
  - Featured project cards (`ProjCard`, stagger i×0.1s, whole card including its background): now content-only, no stagger.
  - Projects page cards (`ProjCardFull`, stagger) and publication cards (`PubCard`, stagger): same.
  - About page sections (`AboutSection`, stagger i×0.1s): no stagger.
  - `ExperienceBlock` faded again inside its About section: its own reveal removed.
  - `EducationBlock`, case-study sections (`CaseSection`) and the home "Projects." header: kept as below-fold reveals, first screen exempt.
  - Contact row: previously only the green panel faded, background included. Now both panels' content shares one reveal and the panel backgrounds never fade.
  - `revealStyle` and `useInView` were removed.
- Fonts before: the Google Fonts stylesheet was injected by JS after React mounted (`App.jsx`), so the first render always used fallback fonts. On Fast 3G + 4× CPU the real fonts arrived about 2s after first paint, and every heading visibly jumped (about 5.4s vs 3.3s at 390). After: self-hosted, preloaded faces (66KB total). The first screen appears at about 3.6–3.7s in its final fonts, with no later change. The final rendering is pixel-identical to the Google-served fonts at 1440 and 390.
- `html, body { background: #F2F2F2 }` inline in `index.html`, so the frames before the app renders are the page color, not white.

## Phase 2 PR 1: Analytics

- Cloudflare Web Analytics, manual snippet (use exactly this):
  `<!-- Cloudflare Web Analytics --><script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "f36f9029145d40e5b3996d91cb40e750"}'></script><!-- End Cloudflare Web Analytics -->`
- Cloudflare doesn't track hash-router navigation, so it only counts initial page loads. That's expected; don't try to work around it.

## Phase 2 PR 2: Content cleanup (no layout changes yet)

- Remove the skills marquee band entirely.
- Remove the hero chips, the hero tagline, and the hero eyebrow line. The hero keeps only Preeta's name and the two buttons.
- Remove the résumé from the site entirely: the nav Résumé button, the "Want the full picture?" block, `public/Preeta_Chatterjee_Resume.pdf`, `SITE.resume`, and the Phase 1 rule about not touching the PDF.
- Experience/education sync: SMS India title is "Graduate Engineer (Simulation and Software Testing)", Aug 2023 – May 2024. B.Tech dates: Aug 2019 – May 2023.
- These supersede the Phase 1 PR 6 values for the SMS India role and B.Tech. Dates are written in the site's existing style, with no spaces around the en dash ("Aug 2023–May 2024").

## Phase 2 deployment cleanup (small PR between PR 2 and PR 3)

- Delete the old `gh-pages` branch, the `deploy` npm script, and the `gh-pages` dev dependency (nothing else uses it).
- Update README and CLAUDE.md to say deployment is Actions-only.
- Don't rewrite repo history (the old résumé PDF stays in history; it isn't served).

## Phase 2 PR 3: Home layout as a 2×2 grid, with two themes (mockup approved)

Layout:

- Nav: PC logo left; About, Projects, Contact right; no Résumé.
- Top left: name only (two lines, PREETA dark / CHATTERJEE maroon, ~128px at 1440) plus Explore Work and Get in Touch.
- Top right: the about panel (headline, blurb, stats, Read more). Stats become one row of four on desktop, 2×2 on phone. Give the about panel extra left padding (~96px at 1440) so its text sits clear of the fade.
- Bottom left: skills (Technical Arsenal), category label left, tags right.
- Bottom right: bubble game.
- At 1440×900, all four boxes fit in one screen. Shrink type and spacing as needed and report what changed.
- Phone stack order: name, about, skills, game.

Themes:

- Two themes, "dark" and "light", selected by a single setting `SITE.theme` in `src/content.js` (default "dark"). Use CSS variables so one value switches everything, desktop and phone. No visitor-facing toggle; only Preeta chooses the theme, by editing that setting.
- The name box and about box share one background that fades between them: horizontally on desktop, top-to-bottom on phone (on phone the fade sits between the buttons and the about headline).
  - dark: off-white #F2F1EF fading smoothly to black #121212 (start the fade ~26% across, fully black by ~60% (final, from Preeta's PR 3 review; originally ~70%); use many stops so it's gradual). About text: headline #F2F1EF, accents green #3D8A66 and red #C0504F (final, from Preeta's PR 3 review; originally #2F6B50 / #8E3536) for the headline accents and stat numbers, Read More button #2F6B50 with white text, blurb #D9D6D1, stat labels #B8B4AE, stat borders #4A4C50.
  - light: off-white #F2F1EF fading to light grey #DDDAD5 (30% to 60%). About text: headline #111111, accents green #1E4D3B and maroon #5A1A1C, blurb #2E2E2E, stat labels #4A4A4A, stat borders #B5B1AB.
- Read more: filled button in the theme's green, white text.
- Skill tags colored by row in both themes: Languages filled maroon #5A1A1C, ML/AI filled green #1E4D3B, Game Engines/Simulation filled charcoal #2F3135 (all white text), Tools & Practices white with #111111 outline.
- Report contrast for both themes; flag anything below WCAG AA rather than changing Preeta's colors.

Implementation notes (PR 3):

- PREETA is #111111 and CHATTERJEE is maroon #5A1A1C (the maroon from the theme spec). The Explore Work / Get in Touch buttons keep their existing colors.
- At 1440×900 each of the four boxes is 420px tall and the grid ends exactly at the fold; it also fits 1280×800 (370px boxes). Desktop sizes: name 128px at 1440 (clamp 8.9vw), about headline 56px (was 72px), blurb .92rem / 1.65 line height (was .98rem / 1.8), stat values 1.8rem (was 2.2rem), top-row vertical padding 1.5rem, skills rows .6rem padding.
- Final dark palette (Preeta's decisions): accents green #3D8A66 and red #C0504F (headline accents, stat numbers); Read More background #2F6B50 with white text (`readMore` in HOME_THEMES, CSS var `--readmore-bg`). Dark fade: #F2F1EF → #121212 from 26% to 60% across (`start: 26, stop: 60`), 15 smoothstep-eased stops (one every ~2.4%). Light theme unchanged (fade 30% → 60%; its Read More stays #1E4D3B).
- Contrast (measured against the rendered backgrounds), final palette: light theme passes AA everywhere. Dark theme: on solid #121212 the green is 4.48:1 and the red 4.02:1, so the headline accents and stat numbers pass AA large (3:1) on phone and wherever the fade is fully black; Read More (white on #2F6B50) is 6.29:1 and passes. With the fade ending at 60%, the background where the about text starts (56.7% across) is #181818, so everything in the about panel passes AA at 1440, 1280 and 390: worst cases "& game engines." 3.81:1 and "4.0" 4.41:1 (1440) / 4.37:1 (1280); CHATTERJEE on the fade 6.2:1 (1440) / 6.0:1 (1280). "tap the bubbles" (#777777, 3.97:1) is left for PR 4.

## Typography PR (between PR 3 and the dependency PR)

- Fonts: body and paragraph text site-wide uses DM Sans (regular, upright), loaded from Google Fonts with the other fonts in `src/App.jsx`. `T.sans` and the shared `S_BODY` style in `src/theme.js` (17px on desktop, about 16px on phone, line height 1.6). Use `S_BODY` for any new body text.
- DM Serif Display (italic) stays for headings and labels: skill category names, role and degree titles, project and publication titles, case-study layer headings, the About pull quote and the case-study pitch. Bebas Neue stays for display headings, DM Mono for small labels, tags and buttons.
- Covers: home about blurb, contact blurb, About page paragraphs, experience bullets, coursework/award lines, project and publication descriptions, case-study paragraphs, lists and captions (gallery captions .95rem).
- Role titles 1.15rem (was 1rem) and degree titles 1.2rem (was 1.05rem) so they stay larger than the 17px body text.
- Technical Arsenal: tags 13px (.8125rem, was .56rem), padding .28rem .65rem, letter spacing .02em, no wrapping inside a tag; category labels 1.1rem (was .95rem), and long labels wrap after the slash ("Game Engines/ Simulation") on desktop; heading .72rem (was .62rem).
- To keep the 2×2 grid on one screen at 1280×800 (the 17px blurb wraps to 4 lines there): top-row vertical padding 1rem (was 1.5rem), about headline margin .75rem (was 1rem), blurb and Read More gaps .85rem (were 1.25rem), stat cell padding .55rem (was .7rem), skills box vertical padding 1.1rem (was 1.6rem), skills rows .42rem (was .6rem). Phone spacing unchanged. **At 1280×800 the about panel has only ~2px to spare. Any future copy change to the about panel (headline, blurb, stats, Read More) must re-check the 1280×800 and 1440×900 fit in both themes before handover.**
- Contrast (follow-up, Preeta's decision): project/publication descriptions and case-study gallery captions changed from #777777 (4.00:1 on #F2F2F2, below AA) to #595959 (`C.desc`, 6.26:1 on #F2F2F2, measured), which passes AA. `C.muted` (#777777) is unchanged for other small labels.

## Dependency PR: `npm audit fix` (right after the typography PR)

- Run `npm audit fix` (no `--force`). Confirm build, lint, and the site-wide checks pass; report what got updated and list anything still unresolved.
- Result: 13 vulnerabilities (1 low, 2 moderate, 10 high) fixed, 0 remaining. Only `package-lock.json` changed (package.json ranges already allowed the fixes). Direct dependencies: vite 8.0.3 → 8.3.8, react-router-dom/react-router 7.14.0 → 7.18.5. Transitive: @babel/core, @humanfs/node, baseline-browser-mapping, brace-expansion, browserslist, js-yaml, nanoid, postcss, source-map-js, zod.

## Phase 2 PR 4: Bubble game

- A start card over the canvas: "MINI GAME" / "POP THE SKILLS" / "Pop as many bubbles as you can in 20 seconds." on desktop, "Tap as many bubbles..." on phone / Start button / "Best: 0".
- While playing: 20-second timer and score. Best score saved in localStorage (wrapped in try/catch).
- Keep skill names on the bubbles. Works with mouse and touch.
- The card has a white background, black border, and a solid offset shadow.

Implementation notes (PR 4):

- All in `src/components/HeroCanvas.jsx`. Idle: the ambient bubbles and canvas labels keep drifting behind the start card (they can still be popped for fun, no score). Start: the ambient layer clears and 7 skill bubbles (5 when the box is under 500px wide) rise from the bottom, swaying slightly and speeding up by up to 60% as time runs out; a bubble that leaves the top respawns at the bottom. A pop scores +1, shows a "+1" and a burst, and spawns a replacement.
- Bubble labels: the SKILLS tags of 12 characters or fewer plus the CANVAS_LABS names, uppercased and de-duplicated, drawn from a shuffled deck so labels don't repeat back to back. Longer tags (MATLAB/Simulink, Hugging Face Transformers, vector search, Unreal Engine (Blueprints, Behavior Trees), ECS architecture, Lua scripting, unit & property testing, Azure Cosmos DB) don't fit in a bubble; UNREAL and ECS come from CANVAS_LABS. Fills are the tag colors (maroon, green, charcoal) with white text.
- HUD while playing: "0:20" countdown chip top left and "Score N" chip top right (white, black border). After the round the card returns with "Score: N" and a "Play Again" button (UI chrome added in this PR), and focus moves to that button.
- Best score: localStorage key `pc-bubble-best`; reads and writes are wrapped in try/catch, and the game works with storage blocked.
- Input: one `pointerdown` handler for mouse and touch (no double count from synthetic clicks). The canvas uses `touch-action: none` only during a round, so the page still scrolls over the game box otherwise. Touch gets a slightly larger hit radius.
- `prefers-reduced-motion`: nothing moves. Idle labels and bubbles are static; in a round the bubbles sit at random spots and a popped one is replaced at a new spot, with no bursts or rising "+1".
- The canvas now renders at devicePixelRatio, so bubble text is sharp on retina screens.
- The Start / Play Again button inverts on hover through a small CSS rule inside `@media (hover: hover)` (class `bubble-start`), so taps on touch screens never leave it stuck inverted.
- Tap-highlight follow-up (live-site bug on real phones: every tap flashed the browser's light blue tap highlight over the game box): `-webkit-tap-highlight-color: transparent` on the game box (HomeGrid), the HeroCanvas root, the canvas and the Start / Play Again button, plus `user-select: none` on the game area. Scoped to the game only; links and buttons elsewhere keep the browser default until PR 5.
- Testing note: headless Chromium/Playwright (including device emulation) does not render tap highlights, sticky hover or other native touch feedback, so touch visuals need a check on a real phone (iOS Safari and Android Chrome) before handover.
- Removed the "tap the bubbles" hint (#777777, 3.97:1, flagged in PR 3); the start card replaces it. Contrast: card text 9.74:1 or better, title/chips/buttons 18.88:1, bubble text 9.63:1 (green) to 13.13:1 (maroon).

## Phase 2 PR 5: Hover and focus states

- Site-wide: a clear contrast change on every button, link, and card on hover.
- Cards lift with an accent border and show "View project →".
- Visible `:focus-visible` outlines.
- The open phone menu fully covers the page behind it (currently the hero shows through below the menu items).
- Works in both themes. Check WCAG AA.
- Contrast pass: the remaining #777777 (`C.muted`) small labels (dates, locations, metadata such as company/school lines, project subtitles and status lines) fail AA at 4.00:1 on #F2F2F2. Darken them to pass AA (4.5:1) while keeping them visually lighter than the body text (#444444 / #595959).

Implementation notes (PR 5):

- `src/interactions.css` (imported in `main.jsx`) holds every interactive state. Components keep their resting look inline and get `ix-*` classes; the stylesheet uses `!important` to beat the inline values. All the old onMouseEnter/onMouseLeave color swaps are gone (they stuck on after a tap on phones). Hover rules sit in `@media (hover: hover)`; the same look is applied on `:active`, which is the tap feedback on touch screens.
- Hover per element: nav/back links #666666 → #111111 + underline (active page link gets the underline); colored text links (Case Study, GitHub, itch.io, IEEE, PDF) underline + darken; inline links (Haunted Hallway → Hallway Hunters) red → #111111; footer links 70% → 100% white + underline; PC logo darkens. Filled buttons invert to outline (Explore Work, Get in Touch, Send Message, Start), outline buttons fill (View All), Read More turns white with theme-green text (both themes pass: 6.29:1 dark, light higher). Filter tabs: inactive → white with black border/text; selected → #333333. Phone menu button gets a grey fill. Lightbox preview dims its image and darkens its chip; Close inverts.
- Cards (`ix-card`, project and publication): white background, lift 4px (`translate`, so it doesn't fight the scroll-reveal `transform`), drop shadow, 2px border in the card's accent (`--accent`, drawn as an outline so images don't cover it), bottom bar fills. Keyboard focus inside a card gives the same look (no lift).
- Card call-to-action (`CardCta.jsx`), fades in on hover/focus (Preeta's decisions from the PR 5 review):
  - Project with a case study: "View project →" (in-site). Only Hallway Hunters has one.
  - Project with only external links: labelled by where its first link goes, new tab with `rel="noopener noreferrer"`: "View on GitHub ↗" (RAG, Roll-a-Ball), "Play on itch.io ↗" (Haunted Hallway), "Live demo ↗" (Job Tracker).
  - Publications: "Read paper ↗" to the paper's PDF (stair climber: `/Hybrid_Stair_Climber.pdf`; IJIIP: the journal PDF), new tab.
  - Projects with no links (3D reconstruction, Stone & Soul): lift and border only, no label (left as is).
  - On hover screens the label's link covers the whole card, so clicking anywhere on the card follows it; inner links, inline links and the media link sit above it (`ix-above`). On touch screens the label and the card-wide link are hidden.
  - `C.redOnDark` #CC6260 confirmed by Preeta.
- Focus: `:focus-visible` gives a 2px #111111 outline, 3px offset, everywhere; light (#F2F2F2) inside `.on-dark` (footer, lightbox) and on card image links (drawn inside, over the image); Read More uses `var(--about-headline)` so it shows on the dark about panel. Inputs no longer set `outline: none`. YouTube embeds draw the ring on the video box from JS (`VideoEmbed.jsx`), because focus goes straight into the cross-origin player and `:focus-within` doesn't match there; it shows only for keyboard focus.
- Phone menu: covers the whole screen below the nav with a solid #F2F2F2 background, locks page scroll while open, closes on Escape, link tap and navigation. The toggle has `aria-label` (Open/Close menu), `aria-expanded` and `aria-controls`.
- Touch: the browser tap highlight is now off for all links and buttons (`a, button { -webkit-tap-highlight-color: transparent }`), replaced by the `:active` states above. Needs a real-phone check (headless tests don't render tap feedback).
- Contrast changes: `C.muted` #777777 → #666666 (5.13:1 on #F2F2F2, 5.74:1 on white; lighter than body #595959/#444444). Contact panel labels ("03 / Contact", "Email", "LinkedIn") 45–50% → 70% white (5.15:1 on the green). Dark page-header labels ("01 / About", "02 / Work", "Case Study · …") were #4D1717 on #111111 (1.3:1) → new `C.redOnDark` #CC6260 (4.93:1). Footer © 30% → 60% white (6.5:1), footer links 30% → 70%. The big faint card numbers and the "HELLO" watermark are decorative, so they're `aria-hidden` and left as they are.
- Checks: every text node on Home, About, Projects and the case study passes AA at 1440 and 390 (except the decorative watermarks); every link, button and card changes on hover; all 71 keyboard focus stops show a 2px ring at 3:1 or better.

## Phase 2 PR 6: Project thumbnails (typographic, no images)

Change of plan (Preeta): no image thumbnails. They are built in code, so visitors don't mistake an illustration for the actual project.

- Reusable component `src/components/ProjThumb.jsx` (`variant` prop). A 16:10 card in the project's group color (`GROUP_TONES` in `theme.js`): Computer Vision & ML deep green #1E4D3B, Simulation & Game Engines maroon #5A1A1C, Other charcoal #2F3135.
- Content: a small DM Mono label with the short group name (`short` on PROJECT_GROUPS: "Vision & ML", "Game Engines", "Other") and the year, the short title (`thumbTitle`) in Bebas Neue, and the `hook` in DM Sans. Content is vertically centered, with no watermark.
- Titles are always one line (`white-space: nowrap`). Every card uses the same title size, set so the longest title, "3D Reconstruction" (6.59em wide in Bebas Neue), fits: 12cqw for the light and solid cards, 9.2cqw for the split card.
- Short titles on the thumbnails only: "3D Reconstruction" and "RAG System". The full titles stay everywhere else on the site.
- Sizes are in container units (`cqw`) with pixel floors for phones (label 10px, hook 13px). Checked at 1440, 1280, 390 and 360: every card is 16:10, nothing is clipped or outside the card, and every title is on one line.
- Design review (Preeta): round 1 (solid panel, big watermark number) looked heavy and unbalanced. Round 2 compared three variants (light, solid, split). **Final: the light card (variant A)**, with a 6px group-color band on top and a 1px #D6D2CB border plus a soft shadow (reaching about 10px), so cards separate from the off-white page in both themes. Variants B and C were removed. The title and label are in the group color, the hook in #2E2E2E.
- Contrast (1440/1280/390/360, both themes): titles and labels in the group color on white are 9.63:1 (green), 13.13:1 (maroon) and 13.03:1 (charcoal); the hook is 13.58:1.
- No image files. The cards are theme-independent, so they read the same in both themes. Follows the loading rules: the card never animates.
- Used on the home carousel only (PR 7). Project and case-study pages stay unchanged.
- Temporary review page (removed in PR 7): `/#/preview/thumbnails` (`ThumbPreviewPage.jsx`), not linked anywhere. It showed a static carousel row (center card clear, neighbors veiled 50%, next ones 82%, the rest hidden), all seven unveiled, and the hook/overview list. Remove it in PR 7. The veil covers the card's shadow too, so it extends about 11px past the card; the carousel needs the same.
- Content fix: the RAG paper count is 30+ (was 20+), in both the card description and the overview.

### Hook and overview rule (all projects, including future ones)

Each project in `content.js` has `thumbTitle`, `hook` and `overview`.

- `hook` (on the thumbnail) is the one standout technical detail.
- `overview` (the two-line carousel slide text, PR 7) is what the project is and what it does, drawn only from facts already in content.js.
- **No repetition:** the hook and overview must not share a key phrase, number or fact. Check every pair for shared words and numbers before handover. Keep overviews to about 160 characters so they fit two lines.
- Verbatim hooks from Preeta: Hallway Hunters "Three-layer enemy AI in Unreal Engine 5.7", Stone & Soul "A custom C++ engine, built from scratch", 3D Reconstruction "Telling motion apart from image degradation", RAG "Tuned for better answers, not just better matches", Haunted Hallway "Rigged 2D sprite animation". The proposed hooks for Roll-a-Ball ("Real-time rigid-body dynamics") and Job Tracker ("AI-powered prioritization with Google Gemini") and all seven overviews were approved by Preeta in the PR 6 review. Haunted Hallway's overview dropped "2D" (Preeta's decision) so it no longer repeats the hook.

## Phase 2 PR 7: Home projects carousel (replaces the featured cards)

Spec updated by Preeta (supersedes the earlier fade-between-slides plan):

- All projects, in a single horizontal row of cards side by side that slides left as it advances.
- The center card is fully clear. Cards fade progressively with distance from the center: the immediate neighbors are partly veiled with a light off-white cover, and cards leaving the left edge fade out completely while new ones fade in from the right. The fade follows the cards' movement smoothly; it never switches suddenly.
- Infinite loop: after the last project comes the first again, in both directions, with no visible jump.
- Safeguards: slow auto-advance; pauses on hover, focus, and touch; stops auto-advancing permanently after any arrow click or swipe; no auto-advance (and no sliding animation) under `prefers-reduced-motion`. Arrows plus dots; swipe on phone.
- Phone: one card in focus with a sliver of the neighbors visible.
- Each slide: the `ProjThumb` light card, the two-line `overview`, tags, and a link to the project or case study.
- Accessibility note from PR 6: the veil deliberately drops neighbor text below AA (50% veil about 2.4–3.1:1, 82% about 1.4:1). Only the center card is meant to be read, so the veiled cards must be hidden from screen readers and keyboard focus (`aria-hidden`, `inert`). Every project is then reached, readable, when it is centered.
- Follow the loading rules: the carousel is below the fold on desktop, but nothing in it may animate on first paint, and the veils and card surfaces don't fade in on load.

Implementation notes (PR 7, after Preeta's review):

- `src/components/ProjectCarousel.jsx` replaces the featured cards in the home "02 / Selected Work" section; `ProjCard.jsx`, `FEATURED_PROJECT_IDS` and the PR 6 preview page are removed. The section background is #F2F1EF, which is also the veil color.
- Order (carousel only): `CAROUSEL_PROJECT_IDS` in content.js, starting at RAG System: RAG System, Hallway Hunters, 3D Reconstruction, Stone & Soul, Haunted Hallway, Job Tracker, Roll-a-Ball. With four Game Engines (maroon) projects out of seven, one same-color pair can't be avoided in any loop; here it is Stone & Soul → Haunted Hallway. The Projects page keeps PROJECTS order.
- Each slide holds the light `ProjThumb`, the `overview` (DM Sans .95rem), up to four `stack` tags and the destination hint from `primaryLink`.
- Hallway Hunters overview, Preeta's verbatim replacement: "A first-person survival horror game: use doors as barriers to escape a zombie-infected apartment floor before time runs out."
- Overview lines: every overview fits two lines at 1440 and 1280. Phone: 4 lines (5 for 3D Reconstruction at 360); they aren't clamped.
- Card width: desktop 46% of the width, max 580px (gap 24px). Phone: 80% (gap 12px), with a sliver of each neighbor.
- Timing: the `TIMING` object at the top of ProjectCarousel.jsx is the one place to tune it. Rest 1.5s per card and slide 0.5s (ease-in-out cubic), about one card every 2s (Preeta's decision; it was 3.5s + 0.7s). It resumes 5s after a desktop interaction, and multi-card dot jumps are capped at 1s.
- Pause and resume:
  - **Desktop:** hover pauses. Arrow, dot, arrow-key and side-card clicks pause too. Auto-advance resumes 5s after the last interaction and the mouse leaving (it advances straight away then, since the card has already rested). Keyboard focus inside the carousel (`:focus-visible`) pauses until focus leaves, then resumes after 5s. Mouse clicks don't count as focus, so a clicked arrow doesn't freeze it.
  - **Touch:** any touch (swipe, tap, arrow, dot) stops auto-advance for good.
  - **Always:** offscreen (less than half visible) and a hidden tab pause it.
  - `prefers-reduced-motion`: nothing auto-advances, and arrows and dots switch instantly.
  - **No pause/play toggle.** One was added in the review round, then removed by Preeta's decision. Don't add it back; the pauses above (hover, keyboard focus, touch stop, reduced motion) are the controls.
- Arrows (Netflix-style): on the row's left and right edges, vertically centered on the card image, over the veiled side cards.
  - **Desktop:** 56px, white with a #111 border, hidden until the carousel is hovered or has keyboard focus. Hover fills them #111.
  - **Touch:** no hover, so they're always visible, 30px, white at 90% with a #B5B1AB border (Preeta's pick; the swipe-only option was removed).
  - They clear the center card by 7px at 390 and 4px at 360.
- Whole card clickable:
  - The center slide is one link: thumbnail, overview, tags and the visible destination hint. It opens the case study (Hallway Hunters) or the external link in a new tab. Its accessible name includes the destination, e.g. "RAG System: View on GitHub (opens in a new tab)".
  - On desktop hover it lifts 4px, the card shadow deepens and the hint underlines.
  - 3D Reconstruction and Stone & Soul have no destination, so no link, no lift and a default cursor.
  - Clicking a side card brings it to the center instead of opening it.
  - The click that follows a swipe is suppressed.
- Accessibility:
  - The wrapper has `role="region"`, `aria-roledescription="carousel"` and `aria-label="Projects"`. Each slide is a group labelled "N of 7: title".
  - Side slides are `aria-hidden` and contain nothing focusable (they're not `inert`, so they can still be clicked). The center slide's link is the only focus stop inside the row.
  - Arrows (56/30px) and dots (28px targets) have labels; the active dot has `aria-current`.
  - A live region announces the current card once the visitor takes control.
- Motion:
  - One continuous position drives both the offset and the veil (0 → 0, 1 → 50%, 2 → 82%, 2.6+ → 100%; the veil extends 11px past the card to cover its shadow).
  - Slides are keyed by an unbounded slot number (slot s shows project s mod 7), so the loop has no jump.
  - During a slide or swipe a requestAnimationFrame loop writes only `transform` and the veil's `opacity`.
- Loading rules: the first render already has every offset and veil in place, and nothing moves until the first rest ends while the carousel is on screen.
- Testing note: Playwright element screenshots (`locator.screenshot`) override the device metrics and drop touch emulation, so `(hover: none)` styles don't show in them. Use viewport screenshots for touch visuals.
- Checks:
  - Pace (after the speed-up): see the PR 7 final checks below.
  - Hover pause and resume after mouse-leave (about 5.0s), desktop arrow hold, keyboard-focus pause, side-card click, center-card click (case study and GitHub in a new tab), touch swipe stop, and reduced motion all verified.
  - Every overview fits two lines at 1440 and 1280.
  - 83 focus stops, 0 failing; no page scrolls sideways at the four widths.

PR 7 final changes and checks (Preeta's last review):

- Pause/play toggle removed (Preeta's decision); don't add it back.
- Speed: rest 1.5s, slide 0.5s, measured at about 1.3s to the first advance, then 2.0s per card.
- Phone arrows: the small always-visible ones (30px) are kept; the swipe-only option and its `TOUCH_ARROWS` constant were removed.
- Kept and re-verified: no auto-advance under `prefers-reduced-motion`; hover pauses; keyboard focus pauses; resumes about 5.0s after the mouse leaves (desktop); a touch swipe stops it for good.
- 81 keyboard focus stops, 0 failing. No page scrolls sideways at 1440, 1280, 390 or 360.


## About page "Off the Clock" section (small PR after PR 7)

- Personal section at the end of the About page, after Education (Education belongs with the professional record; the personal note closes the page before the footer). Content is `ABOUT_OFF_CLOCK` in content.js: heading "Off the Clock", body verbatim from Preeta ("...and this cover of City of Stars from La La Land is my favorite."), the City of Stars cover (`zelHJKieVto`), and two links: "in2_music on YouTube ↗" (`SITE.youtube`) and "What I'm reading on StoryGraph ↗". Both open in a new tab with `rel="noopener noreferrer"`.
- Rendered by `AboutSection`. A section with a `video` gets its own layout: from 900px wide, two columns (heading, text and links on the left; the video on the right, max 480px, 16:9). Below 900px it stacks: heading, text, full-width video, links. `rule={false}` skips the top divider, since Education's bottom rule already separates them.
- Links (Preeta's review): outline buttons, DM Mono 15px, at least 44px tall, .75rem apart. YouTube is red (`ix-btn-outline-red`, new in interactions.css, fills #4D1717 on hover/tap), StoryGraph green (`ix-btn-outline`, like View All). They don't wrap on desktop; on phone, at 360, the StoryGraph label wraps inside its button (59px tall). Contrast: 12.93:1 (red) and 8.70:1 (green), at rest and when filled.
- `VideoEmbed` has a `clickToLoad` prop: it shows the YouTube thumbnail (`i.ytimg.com/vi/<id>/hqdefault.jpg`, lazy) with a play button, and loads the youtube-nocookie player (with autoplay) only on click. No player request before the click. If the thumbnail can't load, the dark box with the play button still shows. After a click, focus moves into the player; activated from the keyboard, the box shows the focus ring. The case-study embeds are unchanged (no `clickToLoad`).
- The play button inverts on hover/tap (`ix-video-play` in interactions.css).
- Footer: a "YouTube" link to `SITE.youtube` after Contact, new tab. The footer links wrap if needed; at 360 they still fit on one line.
- The thumbnail host (i.ytimg.com) is blocked in the Claude session sandbox, so local screenshots show the fallback dark box; visitors see the real thumbnail.
