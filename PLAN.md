# kylerauch.com — Build Plan

**Owner:** Kyle Rauch
**Started:** 2026-05-16
**Last updated:** 2026-05-16 (end of session)
**Goal:** A public-facing personal site that makes the GitHub-builder view of Kyle the default for recruiters and hiring managers, instead of the résumé-CSM view.

---

## ⚡ NEXT STEPS (pick up here next session)

The site is **content-complete on five routes** (`/`, `/projects`, `/projects/[slug]`, `/about`, `/resume`, with `/contact` redirecting to `/about#contact`). Design system is Modern Archetype (warm editorial). Lasers on every page header. Resume page sourced from the real master in Skippy.

**Remaining to ship to kylerauch.com:**

1. **Regenerate resume PDF** (master email was updated kyle.rauch@icloud.com → kyle@kylerauch.com):
   ```powershell
   cd C:\Users\kgrau\ai-projects\Skippy\references\job-search
   node build_resume.js
   ```
2. **Copy regenerated PDF into the site**:
   ```powershell
   Copy-Item C:\Users\kgrau\ai-projects\Skippy\references\job-search\Kyle_Rauch_Resume_v2.pdf C:\Users\kgrau\ai-projects\kylerauch-site\public\resume.pdf
   ```
3. **Verify the build compiles cleanly**:
   ```powershell
   cd C:\Users\kgrau\ai-projects\kylerauch-site
   npm run build
   ```
   Should produce an `out/` directory. If any TypeScript / lint errors land, fix them before deploy.
4. **Commit + push to GitHub** (`kgr1115/kylerauch-site` — repo may need to be created on github.com first):
   ```powershell
   git add .
   git commit -m "Modern Archetype redesign + real resume sync — ready for deploy"
   gh repo create kgr1115/kylerauch-site --public --source=. --remote=origin --push
   ```
5. **Connect Cloudflare Pages** (dash.cloudflare.com → Workers & Pages → Pages → Connect Git):
   - Framework preset: **Next.js (Static HTML Export)**
   - Build command: `npm run build`
   - Build output: `out`
   - Save and deploy
6. **Add custom domains** (`kylerauch.com` + `www.kylerauch.com`) in the Pages project → Custom domains.
7. **Set up Cloudflare Email Routing** (kylerauch.com → Email → Email Routing): `kyle@kylerauch.com` → forwards to `kyle.g.rauch@gmail.com`. Verify destination.

**After live:**
- Update GitHub bio with `https://kylerauch.com` link
- Update LinkedIn with same
- Update master resume header to reference kylerauch.com (already done in markdown — regen PDF picks it up)

**Smaller polish items (not blockers):**
- Compress `Headshot.png` (currently 1.79 MB) → ideally <500 KB via tinypng.com or convert to WebP
- Add favicon + OG card image to `public/`
- Delete deprecated stub files: `components/HeroScene.tsx`, `HeroSceneWrapper.tsx`, `components/scene/*`
- Populate a real case study body for one project (currently all four /projects/[slug] pages use stub bodies — the master resume has the metric-rich descriptions ready to lift)
- Tune copy on home + about — placeholders are best-guess
- Optional: GitHub auto-feed on /projects pulling repos from `github.com/kgr1115` API at build time

---

---

## 1. North star

Kyle's résumé reads as "L2 SaaS escalation / CSM / Implementation." His GitHub reads as "AI-tooling builder shipping Tauri desktop apps and multi-agent pipelines." A recruiter searching `kylerauch.com` should land on the second view in under 5 seconds.

Success looks like:
- A recruiter spends ≥60 seconds on the site
- They click into at least one project
- They leave with a clear answer to: "What does this person actually build?"
- The site loads in <2s on a cold visit, runs at 60fps, and looks distinct enough that they remember it tomorrow

Anti-goals:
- Looking like every other "dark mode dev portfolio template"
- Hiding the CSM background — it's a strength, not a liability; the site reframes it ("I've done customer-facing work AND I build the tooling")
- Becoming a maintenance burden — no CMS, no blog, no per-post overhead

---

## 2. Information architecture

Four pages. No blog. Each page is substantive enough that the lack of a blog isn't felt.

### `/` — Home

- **Hero** — full-viewport, Three.js laser/light scene as background. Headline + sub. Two CTAs: "See projects" → /projects, "Read about me" → /about.
- **Positioning strip** — 3 short lines: who I am, what I build, who I work with. Below the hero, no animation, scannable in 5s.
- **Hero projects (preview)** — 4 cards: OfferPilotV2, support-triage-public, csm-account-pulse, diamond-edge. Each card opens to the detail on `/projects`. Glassmorphic, hover-lit.
- **What I'm working on** — short paragraph + Skippy mention (personal AI assistant) — signals "still building."
- **Footer CTA** — "Hire me / talk to me" with email + LinkedIn + GitHub.

### `/projects` — Projects

- **Hero projects (full)** — same 4 as on home, expanded:
  - The problem it solved / why it exists
  - Tech stack
  - Key technical choices (the interesting ones, not "I used React")
  - Result / what it taught me / what's next
  - Links: GitHub repo, demo if applicable
- **GitHub feed** — auto-pulled tile grid of remaining public repos from `github.com/kgr1115`. Cards show name, description, language, stars. Click → GitHub.
  - Fetched at build time via GitHub REST API (`/users/kgr1115/repos`), no client-side fetch (faster, no rate-limit risk).
  - Excludes the 4 hero repos (de-duped), excludes archived/forked.

### `/about` — About

- **The story** — 2-3 paragraphs. CSM background → why building AI tooling → what's next. Honest, not boilerplate.
- **What I'm looking for** — current role search criteria. Removes the "is he available?" friction for recruiters.
- **Certifications & background** — CompTIA Security+, FINRA 7/63 (lapsed but signals financial-services context), education, prior roles.
- **Personal** — one short paragraph: Cincinnati, family, what I do outside work. Humanizes.
- **Résumé download** — PDF link. Always-fresh from `/public/resume.pdf`.

### `/contact` — Contact

- Email: `kyle@kylerauch.com` (mailto link)
- LinkedIn, GitHub icons → external
- Optional: simple form (Web3Forms or Formspree free tier — no backend needed)
- A short "what I respond to fastest" note

---

## 3. Design system (Luminescence)

Source: Kyle's `design.md` spec.

### Color tokens
```css
--surface: #131313;        /* primary background */
--surface-dim: #0e0e0e;    /* deepest sections */
--surface-bright: #393939; /* card surfaces */
--accent: #ffffff;         /* laser/highlight */
--text-primary: #ffffff;
--text-secondary: #a1a1a1;
--border: rgba(255, 255, 255, 0.1);
```

**Hard constraint:** zero purple/violet anywhere. Neutral-cool only.

### Typography
- **Font:** Montserrat (loaded via `next/font/google`, subset to weights we use)
- **Scale:**
  - `headline-lg`: 64px, bold, tracking -0.02em
  - `headline-md`: 40px, semi-bold
  - `body-lg`: 18px, regular, leading 1.6
  - `body-md`: 16px, regular
  - `label-sm`: 12px, semi-bold, tracking 0.1em, uppercase

### Spacing
4px scale: 4, 8, 16, 32, 64. Tailwind defaults map cleanly (1, 2, 4, 8, 16).

### Corner radius
4px (`rounded` or `rounded-sm` in Tailwind, possibly custom token).

### Borders
Ultra-thin 1px, `rgba(255,255,255,0.1)`. Defines structure without bulk.

### Glassmorphism
`backdrop-blur-md` + `bg-white/5` to `bg-white/10`. Used for nav, cards, hover states.

### Lighting effects
Linear gradients (white → transparent) for laser streaks. Three.js for the hero scene specifically.

### Layout
- Max-width 1440px
- Desktop margins: 80px
- 12-column grid

---

## 4. Animation strategy

Three layers, deliberately separated to avoid the "every element wiggles" problem.

### Layer 1: Three.js laser/light scene (hero only)
- React Three Fiber + drei utilities + custom shader for laser streaks
- Postprocessing: bloom (for the glow), maybe film grain for texture
- Animates on scroll-out (hero parallax dissolves when scrolling down)
- Performance budget: 60fps on mid-range hardware; falls back to a static gradient image if WebGL unsupported or `prefers-reduced-motion`

### Layer 2: Framer Motion scroll-reveals
- Section headers fade in + slide up on scroll-in
- Cards stagger in groups
- Subtle — 200-300ms, ease-out, low translate distance (16px max)

### Layer 3: Hover & micro-interactions
- Card hover: border brightens, subtle scale (1.01), backdrop-blur intensifies
- Buttons: white-to-transparent gradient sweep on hover
- All under 200ms, all reversible

### Reduced motion
Respect `prefers-reduced-motion: reduce` system setting. Three.js scene → static image, Framer Motion → no transforms, hover effects → opacity-only.

---

## 5. Tech stack & dependencies

### Core
- `next` (App Router, latest stable)
- `react`, `react-dom`
- `typescript`

### Styling
- `tailwindcss`
- `@tailwindcss/typography` (for résumé-style prose blocks on /about if needed)

### Animation
- `framer-motion`
- `three`
- `@react-three/fiber`
- `@react-three/drei`
- `@react-three/postprocessing` (for bloom)

### Build & deploy
- Static export (`next export` or App Router equivalent)
- Deploy target: Cloudflare Pages (free, fast edge) or Vercel (zero-config Next.js)

### Dev tooling
- ESLint + Prettier
- `.claude/skills/` populated with CloudAI-X/threejs-skills

### Avoiding bloat
- No headless CMS, no Sanity/Contentful — content is in code
- No analytics SDK at launch (add Plausible later if wanted, ~1kb)
- No icon library beyond what we need — inline SVGs or `lucide-react` if needed

---

## 6. Hosting, DNS, email

### Hosting decision
**Recommendation: Cloudflare Pages.**
- Free tier covers this entirely
- DNS already lives at Cloudflare if you set it up there
- Email Routing comes free in the same account (see below)
- Edge network is faster than Vercel for static sites globally

**Vercel alternative:** if you'd rather have the Next.js-native deploy experience and don't care about edge-on-day-one, also free for this. Trade-off: separate vendor for email forwarding (Cloudflare Email Routing still works but you'd be using two vendors).

### DNS setup (Cloudflare path)
1. Add `kylerauch.com` to Cloudflare (free tier)
2. Update domain registrar to point at Cloudflare nameservers
3. In Cloudflare Pages, connect this GitHub repo → auto-deploy on push to `main`
4. Add `kylerauch.com` and `www.kylerauch.com` as custom domains on the Pages project

### Email forwarding
- Cloudflare Email Routing (free)
- `kyle@kylerauch.com` → forwards to `kyle.g.rauch@gmail.com`
- Catch-all `*@kylerauch.com` → forwards to Gmail (so any future address works)
- Outbound: use Gmail's "Send mail as" feature with kyle@kylerauch.com as the alias, authenticated via Gmail SMTP — applications go out from the branded address

---

## 7. Project content (curated)

### OfferPilotV2 — Hero #1
- **Slug:** `offerpilot-v2`
- **Tagline:** Desktop-first, local-first job-search command center.
- **Stack:** Tauri v2 (Rust core), React, TypeScript
- **The interesting parts:** Local-first state machine for the job pipeline, multi-agent (scout/tailor/researcher) orchestration, integrates with Skippy for status-email-triggered moves
- **Repo:** github.com/kgr1115/OfferPilotV2

### support-triage-public — Hero #2
- **Slug:** `support-triage`
- **Display name:** Support Triage
- **Tagline:** Local-first AI triage for B2B SaaS support — classify, retrieve KB, draft citation-grounded replies, suggest macros.
- **Stack:** Python, eval-driven (faithfulness + recall@k)
- **The interesting parts:** Documented eval methodology, citation-grounded drafts (no hallucinated KB references), macro-suggestion based on intent classification
- **Repo:** github.com/kgr1115/support-triage-public

### csm-account-pulse — Hero #3
- **Slug:** `csm-account-pulse`
- **Display name:** CSM Account Pulse
- **Tagline:** Single-page Streamlit dashboard a CSM opens every Monday.
- **Stack:** Python, Streamlit
- **The interesting parts:** Documented v1→v5 prompt iteration with 7 eval result files, 5 held-out scenarios, live-path renewal-prose receipts — shows engineering discipline applied to prompts
- **Repo:** github.com/kgr1115/csm-account-pulse

### diamond-edge — Hero #4
- **Slug:** `diamond-edge`
- **Display name:** Diamond Edge
- **Tagline:** MLB pick recommendation system — gradient-boosted models + grounded LLM rationale + two parallel Claude agent pipelines.
- **Stack:** TypeScript, Python (models), Claude agent SDK
- **The interesting parts:** Two-pipeline architecture for explanation grounding, walk-forward backtest framework (mlb-market-models sister repo), portfolio piece — free + informational
- **Repo:** github.com/kgr1115/diamond-edge

### Auto GitHub feed (below heroes on /projects)
- Pulled at build time from GitHub REST API
- Includes: `QuarterlineV2`, `understudy`, `agentic-job-pipeline`, `mlb-market-models`, `SiftRobust`, `sift`, `ai-pipeline-scaffold`, `project-generator`, `design.md`, etc.
- Excludes: the 4 heroes (deduped), `kgr1115` profile repo, forks, archived
- Each card: name, description, language pill, star count, last-updated relative

---

## 8. Milestones

Each milestone is one focused chunk of work. Tick when shipped.

- [x] **M0 — Setup.** Directory created, git initialized, threejs-skills installed in `.claude/skills/`. GitHub push pending (step in Next Steps above).
- [x] **M1 — Scaffold.** Next.js 14 + TS + Tailwind + App Router. Three, R3F, drei, postprocessing, framer-motion installed. **Note: Montserrat replaced with Newsreader + Hanken Grotesk in M4.** Luminescence tokens replaced with Modern Archetype tokens in M4.
- [x] **M2 — Layout shell.** Nav (sticky transparent, scroll-aware, Hire Me CTA) + Footer (3-col + giant wordmark) + all four routes rendered, mobile responsive.
- [x] **M3 — Hero scene.** Three iterations: Three.js R3F multi-beam (shipped, not loved) → Meng To single WebGL beam (shipped) → dual phased WebGL beams with rust palette (current). Lives in `components/WebGLLaser.tsx` + `components/LaserBackdrop.tsx`. Reduced-motion + no-WebGL fallback wired.
- [x] **M4 — Modern Archetype redesign (major pivot).** Full design system swap from Luminescence (cool monochrome) to Modern Archetype (warm editorial, rust/clay, serif+sans pairing). Stitch templates in `stitch_rusty_ember_portfolio/` for reference. New tokens, fonts, glass + rust-glow utilities. Home page rebuilt with editorial hero + retinted lasers + Selected Works bento + Capabilities. Lasers added to every page header via `LaserBackdrop` (M4 extension).
- [x] **M5 — Projects page.** 2-col image-led grid live with category badges. `/projects/[slug]` dynamic case-study template with `generateStaticParams`. Real project covers generated programmatically via `scripts/generate-project-covers.ps1` (4 × 1600×1600 abstract dashboard mockups, all in `public/projects/*/cover.jpg`). GitHub auto-feed NOT shipped — deferred.
- [x] **M6 — About page.** Merged About + Contact into single route. Portrait + bio hero, "Looking for" section, Credentials, Contact channels at `#contact` anchor. Old `/contact` redirects via meta refresh.
- [x] **M7 — Resume page (new, not originally planned).** Full editorial resume mirrored from `Skippy/references/job-search/resume-v2-draft.md`. Real timeline (Independent / Clubessential / Fidelity / TQL), real project metrics (97.1% faithfulness, ECE 0.065→0.0004, etc.), education, credentials (Security+ / ITIL 4 / FINRA 7&63), contact sidebar. Download CTA links to `/resume.pdf` — file needs to be regenerated and copied in (see Next Steps).
- [ ] **M8 — Polish pass.** Accessibility audit (WCAG AA contrast, keyboard nav, screen-reader), perf audit (Lighthouse 90+), reduced-motion verified, OG images per page, favicon, sitemap, robots.txt. **Mostly NOT done.** Headshot still uncompressed at 1.79 MB.
- [ ] **M9 — Deploy.** Cloudflare Pages + custom domain + email routing. **All pending — see Next Steps section above.**
- [ ] **M10 — Promote.** Update GitHub bio, LinkedIn, résumé header to reference kylerauch.com.

Status as of end-of-session 2026-05-16: M0-M7 effectively done. M8 + M9 + M10 remain.

---

## 9. Open questions

Things to land before they become blockers.

1. ~~**Hosting: Cloudflare Pages vs. Vercel?**~~ — **Cloudflare Pages** (locked 2026-05-16).
2. ~~**Domain registrar?**~~ — **Cloudflare Registrar** (confirmed 2026-05-16). DNS already at Cloudflare; no nameserver migration needed.
3. ~~**Contact form: yes or just mailto?**~~ — **Yes, simple form** (locked 2026-05-16). Web3Forms or Formspree free tier.
4. **Résumé PDF source:** does Kyle have a current one to drop in `/public/resume.pdf`, or does that need a refresh first? (OfferPilotV2 may have his tailored versions.)
5. **Headshot/avatar:** professional photo for /about, or skip the photo and use just text?
6. **Stitch mockup access:** the design.md spec is strong, but if there are visual mockups in Stitch, screenshots would let me build closer to the intended layout instead of inventing one.
7. **GitHub bio update:** the line in Kyle's GitHub bio is good copy. Reuse it on the site verbatim, or rewrite for the site context?

---

## 10. Out of scope (for v1)

Things that are good ideas but not in v1. Capture here so they don't sneak in:

- Blog / writing section
- Project case studies beyond the 4 heroes (each project gets a card, not its own page)
- Newsletter signup
- Dark/light theme toggle (we ARE dark — no light mode needed)
- i18n
- CMS integration
- Authentication / login / member area (you decided public-only)
- Analytics SDK (add later if wanted, but lean default is no tracking)
- Comment system

---

## 11. Decisions log

Format: `YYYY-MM-DD — decision — why`.

- **2026-05-16** — Public-only, no login/member area — simpler, ships faster, no auth maintenance burden.
- **2026-05-16** — Next.js + R3F over Astro — laser/light animations are core, React-based stack handles WebGL interactivity natively.
- **2026-05-16** — Hybrid hero+auto project content — full narrative control on the 4 most-hireable projects, auto-feed below catches the rest without manual updates.
- **2026-05-16** — Hero project picks: OfferPilotV2, support-triage-public, csm-account-pulse, diamond-edge — three map directly to CSM/Support/Implementation job lanes Kyle's applying to; diamond-edge adds domain breadth.
- **2026-05-16** — CloudAI-X/threejs-skills installed in `.claude/skills/` — necessary for accurate Three.js codegen against r160+.
- **2026-05-16** — Cloudflare Pages as recommended host — free, fast edge, Email Routing on same account.
- **2026-05-16** — Cloudflare Pages locked as host — single-vendor stack (DNS + Pages + Email Routing) outweighs Vercel DX advantage for a low-update-frequency portfolio.
- **2026-05-16** — Cloudflare Registrar confirmed as domain registrar — DNS already at Cloudflare; no nameserver migration needed at deploy.
- **2026-05-16** — Contact form: yes, simple form via Web3Forms or Formspree (locked but NOT yet built — current `/about#contact` has channel links only).
- **2026-05-16** — **Major pivot: Modern Archetype design system replaces Luminescence.** Kyle exported a Stitch redesign with warm editorial palette (rust orange + clay neutrals), serif-sans pairing (Newsreader + Hanken Grotesk), 1280px container, heavier glassmorphism. Original Luminescence direction abandoned mid-session.
- **2026-05-16** — Lasers retinted to rust palette and kept — work alongside the editorial design.
- **2026-05-16** — Brand name = "Kyle Rauch" only (not "Modern Archetype" from the Stitch template). Template name was too studio/agency-flavored for Kyle's actual positioning.
- **2026-05-16** — Resume page added (M7, not originally planned) — mirrors the master at `Skippy/references/job-search/resume-v2-draft.md`. Master email updated kyle.rauch@icloud.com → kyle@kylerauch.com. PDF regen + copy is in Next Steps.
- **2026-05-16** — Three.js R3F laser approach abandoned for Meng To raw-WebGL single-beam (then doubled). Old R3F files (`HeroScene.tsx`, `HeroSceneWrapper.tsx`, `components/scene/*`) reduced to empty deprecation stubs.
- **2026-05-16** — Lasers added to every page's header section via `LaserBackdrop` component (signature dual-laser pattern). Per-page opacity tunable.
- **2026-05-16** — Cloudflare Registrar confirmed as domain registrar — DNS already at Cloudflare; no nameserver migration needed at deploy.
- **2026-05-16** — Contact form: yes, simple form via Web3Forms or Formspree free tier — slightly lower friction for recruiters than mailto-only.
