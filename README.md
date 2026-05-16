# kylerauch.com

Personal site for Kyle Rauch. Public-facing portfolio + project showcase.

**Status:** scaffolding. See `PLAN.md` for scope, milestones, and decisions.

## Stack

- Next.js 14+ (App Router) with TypeScript
- Tailwind CSS for structural styling
- Framer Motion for scroll/interaction animation
- Three.js + React Three Fiber for laser/light effects
- Static export → Cloudflare Pages or Vercel
- Domain: `kylerauch.com` (purchased 2026-05-16)
- Branded email: `kyle@kylerauch.com` → forwards to Gmail via Cloudflare Email Routing

## Design system

"Luminescence" — black/charcoal foundation (#131313), pure-white laser accents,
Montserrat, glassmorphism, 4px corners. No purple/violet. See `PLAN.md` for the
full token list.

## Layout

```
kylerauch-site/
├── PLAN.md              # source of truth for scope + milestones
├── README.md            # this file
├── .claude/
│   └── skills/          # CloudAI-X/threejs-skills (cloned)
├── app/                 # Next.js app router (after scaffold)
├── components/
├── lib/
└── public/
```

## Local development

After scaffold:

```powershell
npm install
npm run dev
```

Site runs at `http://localhost:3000`.
