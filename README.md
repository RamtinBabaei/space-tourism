# Space Tourism

live version
https://ramtinbabaei.github.io/space-tourism/


## Stack

React 19, TypeScript in strict mode, Vite 7, modern CSS (Grid, Flexbox, responsive picture sources, backdrop filters), and Vitest with React Testing Library. CSS handles animation without a runtime animation dependency. All imagery and fonts are served locally.

## Run locally

Install Node.js 22.12 or later. From this folder:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Validate and build:

```sh
npm test
npm run typecheck
npm run build
npm run preview
```

## Features

- Home with an animated Explore action.
- Destination tabs for Moon, Mars, Europa, and Titan.
- Crew profiles and launch technology tabs.
- Responsive mobile navigation with Escape dismissal, a focus trap, and scroll locking.
- Arrow-key tab navigation, Home/End shortcuts, focus management after page navigation, skip link, and reduced-motion support.
- Hash-based routes support refresh, browser history, and static hosting without rewrite rules.
- Locally served desktop, tablet, and mobile backgrounds, WebP portraits and planets, and responsive technology imagery.

## Source structure

`src/data.ts` holds typed content. `src/components/` contains shared navigation and tab components. `src/App.tsx` contains the page layouts and route handling. `src/styles.css` holds tokens, layouts, animations, and responsive styles. `tests/App.test.tsx` checks routing, focus, mobile menu behavior, and every content tab.

## Deployment

`npm run build` generates `dist/`, which can be hosted on any static web host. Vite uses a relative base so the bundle works under a repository subpath, including GitHub Pages. The provided workflow publishes to GitHub Pages when you enable Pages → Source → GitHub Actions. The Sites deployment manifest is separate from the portable app source.

## Attribution

Design and original challenge imagery: Frontend Mentor, with Scrimba and Kevin Powell. Challenge assets are sourced from the starter assets mirrored at [sofitanf/space-tourism-website](https://github.com/sofitanf/space-tourism-website/tree/main/assets); no solution implementation is copied. Fonts: Bellefair and Barlow families from Google Fonts, licensed under the SIL Open Font License. License text is included with the font files. Destination descriptions and crew biographies follow the challenge content; fictional technology copy is labeled as a concept.

## Verification

Automated component and keyboard interaction tests, strict TypeScript checks, and a production build are available through the commands above. Browser visual QA requires a browser environment; automated DOM tests do not validate final pixel layout.
