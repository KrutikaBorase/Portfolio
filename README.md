# Krutika Borase — Portfolio

React + TypeScript + Vite + Tailwind CSS v4 + Framer Motion + Recharts.

```bash
npm install
npm run dev      # local development
npm run build    # production build in dist/
```

## Edit content (all in `src/data/`)
- `profile.ts` — bio, metrics, education, certification, publication, **resumeUrl**, social links
- `experience.ts`, `skills.ts`, `projects.ts`

## Things to fill in (nothing is faked while these are empty)
| What | Where | Effect when empty |
|---|---|---|
| Resume PDF | put file in `public/`, set `profile.resumeUrl` (e.g. `/Krutika-Borase-CV.pdf`) | Resume buttons hidden |
| IEEE Xplore URL | `profile.publication.url` | Link hidden |
| SQL certificate URL | `profile.certification.url` | "View certificate" hidden |
| Repo/demo URLs for IoT and Ride Wise | `projects.ts` → `repoUrl`, `demoUrl` | GitHub buttons hidden |
| Contact form service | `.env` → `VITE_FORM_ENDPOINT` (e.g. a Formspree endpoint) | Form opens the visitor's email app (mailto) instead of pretending to send |

## Deploy
Static site: connect the repo to Vercel / Netlify / Cloudflare Pages (build `npm run build`, output `dist`).
Set `VITE_FORM_ENDPOINT` in the host's environment variables.

## Notes
- Project preview panels are illustrative mockups (labelled as such); only the KPI figures come from the CV.
- GitHub section reads the public API from the browser (no token), caches 15 minutes, and falls back to a curated list if rate-limited.


## Design notes (v2 "Pearl & Plum")

- A single 3D iridescent pearl (react-three-fiber) follows the reader and glides to a new position per section. It lazy-loads, and falls back to a CSS pearl on reduced-motion, low-power, save-data or no-WebGL devices. Force a mode with `?pearl=3d` or `?pearl=css`.
- Fonts are self-hosted (Fraunces, Plus Jakarta Sans, DM Mono) - no external font requests.
- Colours and slot positions: `src/styles/globals.css` (`@theme`) and `src/scene/sceneState.ts`.
- Project previews are illustrative and labelled as such; all figures come from the CV.
