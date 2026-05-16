# Setup — kylerauch-site

One-time setup steps after the scaffold lands. Run these from PowerShell in `C:\Users\kgrau\ai-projects\kylerauch-site`.

## Step 1 — Clean up the broken sandbox `.git/`

The bash sandbox half-created a `.git/` directory that it couldn't finish. Wipe and re-init properly:

```powershell
cd C:\Users\kgrau\ai-projects\kylerauch-site
Remove-Item -Recurse -Force .git
git init -b main
```

## Step 2 — Install dependencies

```powershell
npm install
```

This installs Next.js, React, Tailwind, Framer Motion, Three.js, React Three Fiber, drei, postprocessing, and dev tooling. Takes ~30-60 seconds.

## Step 3 — Install the Three.js skills for Claude

```powershell
cd .claude\skills
git clone https://github.com/CloudAI-X/threejs-skills.git temp
Move-Item -Force temp\skills\* .
Remove-Item -Recurse -Force temp
cd ..\..
```

Verify: `ls .claude\skills` should show `threejs-fundamentals\`, `threejs-shaders\`, etc.

## Step 4 — First run

```powershell
npm run dev
```

Open http://localhost:3000 — you should see the Luminescence-styled scaffold home page with the headline "L2 SaaS escalation operator & AI-tooling builder", dark background, white laser-streak placeholders.

If the page renders cleanly: M1 is shipped. Stop the dev server with Ctrl+C and proceed to Step 5.

## Step 5 — Initial commit + push to GitHub

```powershell
git add .
git commit -m "M1: Next.js + Tailwind + Three.js scaffold with Luminescence design tokens"
```

Then create the repo on GitHub (`kgr1115/kylerauch-site`):

1. Go to https://github.com/new
2. Repository name: `kylerauch-site`
3. Owner: kgr1115
4. Public
5. Don't add README/license/gitignore (we have them)
6. Click Create

Then connect and push:

```powershell
git remote add origin https://github.com/kgr1115/kylerauch-site.git
git push -u origin main
```

## Step 6 — Connect Cloudflare Pages (deferred to M9)

When you're ready to deploy (probably after M8 polish):

1. https://dash.cloudflare.com → Pages → Create a project
2. Connect to GitHub, select `kgr1115/kylerauch-site`
3. Build command: `npm run build`
4. Build output directory: `out`
5. Root directory: `/`
6. Environment variables: none for now
7. Save and Deploy

Then add `kylerauch.com` and `www.kylerauch.com` as custom domains. DNS records auto-configure since the domain is at Cloudflare Registrar.

## Step 7 — Set up email forwarding (also deferred to M9)

1. https://dash.cloudflare.com → kylerauch.com → Email → Email Routing
2. Add address: `kyle@kylerauch.com` → forward to `kyle.g.rauch@gmail.com`
3. Optional: enable Catch-all → forward to same Gmail (so future aliases auto-work)
4. Verify the destination address via Cloudflare's email
5. In Gmail: Settings → Accounts → "Send mail as" → Add `kyle@kylerauch.com` as alias

After this, outbound applications can send from `kyle@kylerauch.com` and replies route back to Gmail.

---

## Troubleshooting

**`npm install` fails on Three.js types:** Run `npm install --legacy-peer-deps`. The peer deps between three.js and @react-three/* sometimes mismatch; --legacy-peer-deps is the standard workaround.

**`npm run dev` errors with "module not found":** Confirm you're in `C:\Users\kgrau\ai-projects\kylerauch-site` and that `node_modules/` exists. If not, re-run `npm install`.

**Tailwind classes not styling:** Hard-refresh the browser (Ctrl+Shift+R). Tailwind's JIT can lag on first render.

**Page renders unstyled:** Check the browser console for font-loading errors — Montserrat loads from Google Fonts via `next/font/google`. If you're offline, the font fails silently and falls back to system-ui.
