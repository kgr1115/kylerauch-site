/**
 * Hero project metadata.
 *
 * Single source of truth used by both /projects (the grid) and
 * /projects/[slug] (the case study template). Add new entries here.
 *
 * cover image path convention: /projects/<slug>/cover.jpg
 * Kyle generates AI imagery per project and drops them in that path.
 */

export type HeroProject = {
  slug: string;
  name: string;
  category: string; // displayed as eyebrow on case study
  tagline: string; // short single-line for project cards
  blurb: string; // 1-2 sentence project summary
  tags: string[];
  role: string;
  duration: string;
  repoUrl: string;
  liveUrl?: string;
};

export const HERO_PROJECTS: HeroProject[] = [
  {
    slug: 'offerpilot-v2',
    name: 'OfferPilotV2',
    category: 'Desktop AI Tooling',
    tagline: 'Desktop-first, local-first job-search command center.',
    blurb:
      'Tauri + Rust + React desktop app. Multi-agent pipeline (Scout / Tailor / Researcher) with human-in-the-loop approval, file-based state, and local-first sync.',
    tags: ['Tauri', 'Rust', 'React', 'TypeScript'],
    role: 'Sole developer',
    duration: 'Active',
    repoUrl: 'https://github.com/kgr1115/OfferPilotV2',
  },
  {
    slug: 'support-triage',
    name: 'Support Triage',
    category: 'Customer Operations',
    tagline:
      'Local-first AI triage for B2B SaaS support — classify, retrieve KB, draft replies.',
    blurb:
      'Python pipeline that classifies inbound tickets, retrieves relevant KB articles, and drafts citation-grounded replies. Eval-driven (faithfulness + recall@k) with documented prompt iteration.',
    tags: ['Python', 'LLM', 'Evals'],
    role: 'Sole developer',
    duration: '6 months',
    repoUrl: 'https://github.com/kgr1115/support-triage-public',
  },
  {
    slug: 'csm-account-pulse',
    name: 'CSM Account Pulse',
    category: 'Customer Success',
    tagline: 'Single-page Streamlit dashboard a CSM opens every Monday.',
    blurb:
      'Documented v1→v5 prompt iteration with 7 eval result files and 5 held-out scenarios. Renewal-prose receipts on the live path. Built to be the one tab a CSM actually keeps open.',
    tags: ['Python', 'Streamlit', 'LLM', 'Prompt eval'],
    role: 'Sole developer',
    duration: '3 months',
    repoUrl: 'https://github.com/kgr1115/csm-account-pulse',
  },
  {
    slug: 'diamond-edge',
    name: 'Diamond Edge',
    category: 'Sports + ML',
    tagline:
      'MLB pick recommendation system — gradient-boosted models + grounded LLM rationale.',
    blurb:
      'Two parallel Claude agent pipelines feeding a gradient-boosted classifier. Walk-forward backtest framework (mlb-market-models sister repo) with Bayesian shrinkage and isotonic calibration. Portfolio piece — free + informational.',
    tags: ['TypeScript', 'Python', 'Claude SDK', 'ML'],
    role: 'Sole developer',
    duration: 'Active',
    repoUrl: 'https://github.com/kgr1115/diamond-edge',
  },
];

export function getProject(slug: string): HeroProject | undefined {
  return HERO_PROJECTS.find((p) => p.slug === slug);
}
