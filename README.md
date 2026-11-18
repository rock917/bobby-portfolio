# Beyond the Code — Bobby Ahirwar

A personal portfolio for Bobby Ahirwar, IIT Hyderabad, presenting AI, machine learning, and software projects through a cinematic space theme. The site includes four detailed case studies: CodeLens AI, DocuMind AI, Ledgerly, and FeedbackIQ.

**Status:** deployment-ready source. No live portfolio deployment has been created or verified in this workspace.

## Features

- Responsive homepage with About, Skills, Projects, Experience, Education, credentials, resume, and contact sections.
- Four project pages with actual screenshots, architecture, results, limitations, GitHub links, and available demos.
- Deferred Three.js Earth scene with pause controls, reduced-motion support, and static fallback.
- Keyboard navigation, mobile menu, skip link, focus restoration, and image failure states.
- Original resume available to view or download; direct email, GitHub, and LinkedIn contact links.
- Page-specific HTML titles and social metadata for direct project links, plus domain-aware canonical URLs, robots rules, and sitemap generation.

This is a static frontend. No database, AI API keys, backend service, or contact-form subscription is required. Project demos are external applications with their own availability and login requirements.

## Stack

React, TypeScript, Vite, React Router, Tailwind CSS, Framer Motion, Three.js / React Three Fiber, Lucide, DM Sans, and Space Grotesk. Exact dependency versions are in `package-lock.json`.

## Install and run

Use **Node.js 24.x** and npm. `.nvmrc` and `package.json` select the tested major version.

```powershell
cd E:\PortFolio_Bobby
npm ci
npm run dev
```

Open the local URL printed by Vite. On another computer, use the folder where you placed this project.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development with live updates |
| `npm run typecheck` | TypeScript checks |
| `npm run lint` | ESLint checks |
| `npm run test:deployment` | Metadata and deployment-route tests |
| `npm run build` | Compile and generate deployable `dist/` |
| `npm run preview` | Serve the production output locally |

The build creates HTML metadata documents for all four case studies. React still renders the page body in the browser; this is not full server-side rendering. The optional 3D bundle is loaded separately and still produces Vite's large-chunk warning.

## Deploy to Vercel

### Option A: deploy this local folder with the CLI

This does not require creating a GitHub repository first. In the project root:

```powershell
npx vercel login
npx vercel
```

Sign into your own Vercel account and select the intended personal/team scope. Link to a new project unless you already created the correct portfolio project. Keep the project root as `./`. The first deployment is a preview; inspect it before publishing production:

```powershell
npx vercel --prod
```

The CLI prints the actual deployment URL. Do not treat an example domain or a local build as a live deployment.

### Option B: GitHub integration

Create a portfolio repository and push this project's source, including `src/`, `public/`, `scripts/`, `index.html`, `package.json`, `package-lock.json`, TypeScript/Vite configuration, and `vercel.json`. This folder is not currently initialized as a Git repository. Do not commit `node_modules/`, `dist/`, `.env` files, `.vercel/`, or the local `reference/` research copies.

In Vercel, choose **Add New → Project**, import that repository, and use:

| Setting | Value |
| --- | --- |
| Framework preset | Vite |
| Root directory | Folder containing `package.json` |
| Node.js | 24.x |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `dist` |

`vercel.json` supplies these build settings and ordered rewrites. Known project URLs serve their own HTML metadata, then the final SPA fallback handles other routes. Existing assets retain their file responses. Unknown app routes show the app's 404 screen but return an HTTP 200 through the SPA fallback (a soft 404).

`.vercelignore` excludes local QA evidence, reference repositories, dependencies, local environment files, and the duplicate root resume from CLI uploads. The intended public resume remains in `public/resume/Resume_Bobby.pdf`. Only `dist/` is served as the website.

### Production domain and search metadata

No secret environment variables are needed. The build selects its public origin in this order:

1. `SITE_URL`, if set to the real HTTPS origin, such as your assigned Vercel domain or connected custom domain.
2. Vercel's `VERCEL_PROJECT_PRODUCTION_URL`, prefixed with `https://`.
3. No origin for local builds: absolute canonical URLs and sitemap are omitted instead of inventing a domain.

Enable Vercel's access to system environment variables if relying on the automatic domain. For a preferred custom domain, connect it in Vercel's Domains settings, set `SITE_URL` to that origin in the project environment settings, and redeploy. Use an origin only, with no subpath, query, or fragment. `SITE_URL` is public metadata, not a credential.

To check domain metadata locally, copy `.env.example` to `.env.local`, supply the actual domain, then rebuild. Do not enter a placeholder URL for the final production build. Vercel preview builds emit `noindex, nofollow`, disallow crawling, and omit their sitemap; production builds use the selected public origin. These robots directives are indexing hints, not access control.

## Verify the actual deployment

After Vercel reports success:

1. Open the homepage and each route directly, then refresh: `/projects/codelens-ai`, `/projects/documind-ai`, `/projects/ledgerly`, and `/projects/feedbackiq`.
2. Check desktop/mobile navigation, project images, resume view/download, and contact links.
3. Open `/resume/Resume_Bobby.pdf`, `/favicon.svg`, and `/images/social-card.jpg` directly. Confirm the resume is a PDF and assets are not HTML fallback responses.
4. Inspect page source for the correct project title and final-domain canonical/social URLs. Confirm `/robots.txt` and `/sitemap.xml` on production.
5. Check the browser console and Network panel for failed assets. The upstream Three.js clock deprecation warning was already recorded during local QA.

`npm run preview` validates the built app locally but does not emulate Vercel's edge routing, deployment protection, or TLS. Live checks remain necessary after publication.

## Updating content

- Profile, project data, skills, and certificates: `src/data/content.ts`.
- Sections and project layouts: `src/App.tsx`; navigation/hero: `src/components/`.
- Visual styles: `src/styles.css`.
- Screenshots: `public/images/projects/`; update `src/data/image-dimensions.json` when replacing images.
- Resume: `public/resume/Resume_Bobby.pdf`.
- Adding a project also requires its matching rewrite in `vercel.json`; the deployment test catches a missing rule.

Preserve factual claims and asset attribution. Font and Three.js notices are under `public/licenses/`; image provenance is documented in `docs/phase-3-assets.md`. No blanket reuse license is granted for the resume, project screenshots, or personal content.

## Validation records and external limits

See `docs/phase-4-qa-report.md` for responsive, accessibility, navigation, fallback, performance, and link results; `docs/phase-5-deployment.md` records deployment preparation. CodeLens and Ledgerly require accounts; LinkedIn may present an authentication wall; DocuMind's old IP demo was unavailable and is offered on request. External services can change independently of this portfolio.

Official references: [Vite deployment on Vercel](https://vercel.com/docs/frameworks/frontend/vite), [Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions), [system environment variables](https://vercel.com/docs/environment-variables/system-environment-variables), and [CLI upload exclusions](https://vercel.com/docs/deployments/vercel-ignore).
