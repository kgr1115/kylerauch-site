import type { Metadata } from 'next';
import LaserBackdrop from '@/components/LaserBackdrop';

export const metadata: Metadata = {
  title: 'Resume — Kyle Rauch',
  description:
    'Resume for Kyle Rauch: AI-augmented technical operator. 4+ years L2 SaaS support (Clubessential) plus 18 months financial services (Fidelity, FINRA 7/63), now shipping production AI tooling.',
};

/**
 * Resume page — sourced from the master at
 *   C:\Users\kgrau\ai-projects\Skippy\references\job-search\resume-v2-draft.md
 *
 * If the master changes, this page needs to be re-synced. Keep this in
 * mind when iterating: the master is the source of truth, the page is
 * a mirror.
 */

const SUMMARY = `AI-augmented technical operator. 4+ years L2 SaaS support depth at Clubessential plus 18 months financial services at Fidelity (FINRA Series 7/63), now shipping production AI tooling for the exact problems my support work surfaced — 16 public repos in 2026 spanning B2B support triage, CSM dashboards, calibrated ML + grounded LLM systems, and multi-provider AI facades. Direct AI to implement; own the architecture, eval, and shipping. Targeting Solutions Engineer / AI Implementation / AI-augmented CSM at AI-forward SaaS.`;

const experience = [
  {
    title: 'Independent AI Engineering Portfolio',
    org: 'Self-directed',
    location: 'Cincinnati, OH',
    dates: 'Feb 2026 – Present',
    active: true,
    bullets: [
      'Lead project: OfferPilotV2 — desktop-first, local-first job-search command center in Tauri v2 + React / TypeScript + Rust. OS-keychain integration, atomic-write contracts, file-based Codex bridge for AI-assisted generation, Vitest + Playwright + native Rust test stack.',
      'Shipped 16 public repos in 2026 spanning B2B support triage automation, CSM dashboards, calibrated ML with grounded LLM layers, multi-provider AI facades (Anthropic / OpenAI / Gemini / Groq behind one structured-call interface), and agentic orchestration frameworks.',
      'Every project ships with CI, an eval harness, and documentation showing prompt-version receipts.',
      'Concurrent: BS Information Technology at Western Governors University (in progress).',
    ],
  },
  {
    title: 'Level 2 Website Support Specialist',
    org: 'Clubessential',
    location: 'Blue Ash, OH',
    dates: 'Oct 2021 – Jan 2026',
    active: false,
    bullets: [
      'L2 / L3 escalation point across websites, reservation systems, CRM, and mobile apps for the 1,000+ private-club SaaS client base. Carried an average 90 tickets/week through Salesforce.',
      'Partnered with engineering on root-cause analysis for recurring technical issues; drove long-term platform fixes rather than per-client workarounds across the website, reservation, and CRM stacks.',
      'Hands-on HTML, CSS, and SQL daily: hand-edited HTML to fix client web pages and embedded tables; wrote CSS within the reservation system’s templating layer; built SQL queries against the CRM to extract form-submission data and run client-requested reports.',
      'Client-facing platform optimization and staff training across onboarding and re-engagement cycles for new and existing clubs.',
    ],
  },
  {
    title: 'Customer Relationship Advocate',
    org: 'Fidelity Investments',
    location: 'Covington, KY',
    dates: 'Apr 2019 – Sep 2020',
    active: false,
    bullets: [
      'Delivered client support for account maintenance, trade execution, and money movement in a high-compliance financial services environment.',
      'Applied structured problem-solving to resolve complex financial inquiries while maintaining FINRA / SEC compliance.',
      'Earned FINRA Series 7 and Series 63 licenses (now expired; reactivatable).',
    ],
  },
  {
    title: 'Logistics Account Executive',
    org: 'Total Quality Logistics',
    location: 'Cincinnati, OH',
    dates: 'Oct 2017 – Mar 2019',
    active: false,
    bullets: [
      'Managed client accounts and negotiated freight services in a high-volume outbound sales environment (75+ calls/day).',
      'Built and held client relationships through daily outreach and structured pipeline management.',
    ],
  },
];

const projectHighlights = [
  {
    name: 'OfferPilotV2',
    stack: 'Tauri v2 · React · TypeScript · Rust · OpenAI Responses API',
    detail:
      'Desktop application owning the application-packet pipeline end-to-end: posting fetch with explicit consent, packet request creation, tailored .docx + cover .pdf generation, review-checklist gating, pipeline lanes with persistent state. Two generation paths (file-based Codex bridge + direct API with OS-keychain key storage). Vitest + Playwright + native Rust test stack.',
  },
  {
    name: 'diamond-edge',
    stack: 'Python · LightGBM · Anthropic · isotonic regression',
    detail:
      'Gradient-boosted models on Statcast + odds; rationale generation constrained to top-k SHAP attributions (no free-form storytelling). Isotonic calibration reduced max deviation 14.3% → 5.6%, ECE 0.065 → 0.0004. Variance-collapse guardrail caught a silent "model shipped as market passthrough" bug (CLV −1.045%). Built in 3 weeks with dual-agent dev workflow.',
  },
  {
    name: 'support-triage',
    stack: 'Python · FastAPI · React · FAISS · Anthropic',
    detail:
      'Classifies tickets, retrieves KB context via embeddings, drafts citation-grounded replies, surfaces top-3 macros — the AI version of the work I was doing at Clubessential. Latest eval: 97.1% strict faithfulness, 95.8% recall@3, 95% category accuracy, 100% within-1-tier priority. Single-operator architecture; CI + reproducible eval runbook.',
  },
  {
    name: 'csm-account-pulse',
    stack: 'Python · Streamlit · Anthropic',
    detail:
      'Aggregates CRM/usage/ticket data, computes health scores, generates 3-bullet "focus this week" briefings per account with every claim citing a real fixture field. Shipped through 5 documented prompt iterations (v1 → v5) with eval receipts; precomputing day-counts in the LLM payload eliminated v3 hallucinations. Bring-your-own-CRM via four-CSV CsvDataSource. CI.',
  },
];

const skills = [
  {
    title: 'AI Tooling',
    items: [
      'Agentic pipelines',
      'Prompt evals',
      'RAG workflows',
      'LLM provider abstraction',
      'Human review loops',
      'Calibrated ML + grounded LLM',
    ],
  },
  {
    title: 'Technical Toolkit',
    items: [
      'TypeScript',
      'React',
      'Next.js',
      'Rust',
      'Tauri',
      'Python',
      'FastAPI',
      'SQL',
      'HTML / CSS',
      'Streamlit',
      'LightGBM',
      'FAISS',
    ],
  },
  {
    title: 'Customer Operations',
    items: [
      'L2 / L3 escalation',
      'Salesforce',
      'Root-cause analysis',
      'Client training',
      'Pipeline management',
      'Financial-services compliance',
    ],
  },
];

const credentials = [
  {
    label: 'Active',
    title: 'CompTIA Security+',
    detail:
      'Active certification. Load-bearing for cybersecurity-adjacent SaaS roles.',
  },
  {
    label: 'Active',
    title: 'ITIL 4 Foundations',
    detail:
      'Service-management framework alignment for support-adjacent operations roles.',
  },
  {
    label: 'Expired',
    title: 'FINRA Series 7 & 63',
    detail:
      'Earned at Fidelity (2019–2020). Expired, reactivatable. Financial-services context for fintech / regulated workflows.',
  },
];

const education = [
  {
    school: 'Western Governors University',
    degree: 'BS, Information Technology',
    dates: 'In progress',
  },
  {
    school: 'Moeller High School',
    degree: 'High School Diploma',
    dates: '',
  },
];

export default function ResumePage() {
  return (
    <main className="min-h-screen pt-24 pb-section-gap">
      {/* HEADER */}
      <header className="relative overflow-hidden border-b border-outline-variant/20">
        <LaserBackdrop opacity={40} />

        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-20 pb-12 flex flex-col md:flex-row justify-between md:items-end gap-gutter">
          <div className="max-w-4xl">
            <h1 className="font-serif text-[56px] md:text-[80px] text-on-surface leading-[1.05] mb-5">
              Kyle Rauch
            </h1>
            <p className="font-serif italic text-[26px] md:text-headline-md text-primary leading-snug">
              AI-augmented technical operator
            </p>
          </div>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-3 bg-primary-container text-on-primary-container font-sans text-label-caps font-semibold px-8 py-4 rounded uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all"
          >
            <span aria-hidden="true" className="text-base leading-none">
              ↓
            </span>
            Download PDF resume
          </a>
        </div>
      </header>

      {/* SUMMARY */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-20">
        <SectionLabel>Summary</SectionLabel>
        <p className="font-serif italic text-headline-md text-on-surface-variant leading-snug max-w-5xl">
          {SUMMARY}
        </p>
      </section>

      {/* MAIN GRID */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-section-gap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-section-gap lg:gap-gutter">
          <div className="lg:col-span-8 space-y-section-gap">
            {/* Experience */}
            <section>
              <SectionLabel>Professional Experience</SectionLabel>
              <div className="space-y-12">
                {experience.map((job) => (
                  <TimelineItem key={`${job.title}-${job.dates}`} {...job} />
                ))}
              </div>
            </section>

            {/* Selected Builder Work */}
            <section>
              <SectionLabel>Selected Builder Work</SectionLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectHighlights.map((project) => (
                  <article
                    key={project.name}
                    className="glass-card rounded-xl p-6 transition-all duration-300 rust-glow"
                  >
                    <div className="flex items-start gap-4 mb-2">
                      <span className="text-primary font-sans text-[18px] leading-none mt-1">
                        /
                      </span>
                      <h3 className="font-sans text-body-lg text-on-surface font-semibold">
                        {project.name}
                      </h3>
                    </div>
                    <p className="font-sans text-[11px] font-semibold text-primary uppercase tracking-widest mb-3 ml-8">
                      {project.stack}
                    </p>
                    <p className="font-sans text-body-md text-on-surface-variant ml-8">
                      {project.detail}
                    </p>
                  </article>
                ))}
              </div>
              <p className="font-sans text-body-md text-on-surface-variant italic mt-6">
                Sixteen public repos at{' '}
                <a
                  href="https://github.com/kgr1115"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  github.com/kgr1115
                </a>{' '}
                — also SiftRobust (AI inbox triage), QuarterlineV2 (CRE
                research platform), understudy (agentic job-search
                orchestration), and project scaffolding tooling.
              </p>
            </section>

            {/* Education */}
            <section>
              <SectionLabel>Education</SectionLabel>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div
                    key={edu.school}
                    className="flex flex-col md:flex-row md:items-baseline justify-between gap-2"
                  >
                    <div>
                      <h3 className="font-serif text-[22px] text-on-surface">
                        {edu.school}
                      </h3>
                      <p className="font-sans text-body-md text-on-surface-variant">
                        {edu.degree}
                      </p>
                    </div>
                    {edu.dates && (
                      <span className="font-sans text-label-caps font-semibold text-on-surface-variant uppercase tracking-widest">
                        {edu.dates}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4 space-y-16">
            <section>
              <SectionLabel>Skills &amp; Expertise</SectionLabel>
              <div className="space-y-10">
                {skills.map((group) => (
                  <div key={group.title}>
                    <h3 className="font-sans text-body-md text-on-surface font-bold mb-4">
                      {group.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <Chip key={item}>{item}</Chip>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <SectionLabel>Credentials</SectionLabel>
              <div className="space-y-8">
                {credentials.map((credential) => (
                  <div key={credential.title}>
                    <p className="font-sans text-label-caps font-semibold text-on-surface-variant mb-2 uppercase tracking-widest">
                      {credential.label}
                    </p>
                    <h3 className="font-serif text-[24px] text-on-surface mb-2">
                      {credential.title}
                    </h3>
                    <p className="font-sans text-body-md text-on-surface-variant">
                      {credential.detail}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="glass-card rounded-xl p-8">
              <SectionLabel>Contact</SectionLabel>
              <div className="space-y-4">
                <ResumeLink href="mailto:kyle@kylerauch.com" label="Email">
                  kyle@kylerauch.com
                </ResumeLink>
                <ResumeLink href="tel:+15136097268" label="Phone">
                  513-609-7268
                </ResumeLink>
                <ResumeLink
                  href="https://github.com/kgr1115"
                  label="GitHub"
                  external
                >
                  github.com/kgr1115
                </ResumeLink>
                <ResumeLink
                  href="https://www.linkedin.com/in/kyle-rauch-b2984a75/"
                  label="LinkedIn"
                  external
                >
                  Kyle Rauch
                </ResumeLink>
                <div className="flex items-start gap-3 text-on-surface-variant">
                  <span className="font-sans text-primary text-sm mt-1">
                    LOC
                  </span>
                  <span>Batavia, OH</span>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-sans text-label-caps font-semibold text-primary mb-8 uppercase tracking-[0.2em]">
      {children}
    </h2>
  );
}

function TimelineItem({
  title,
  org,
  location,
  dates,
  active,
  bullets,
}: {
  title: string;
  org: string;
  location: string;
  dates: string;
  active: boolean;
  bullets: string[];
}) {
  return (
    <article className="relative pl-8 border-l border-outline-variant/30">
      <span
        className={
          'absolute -left-[5px] top-0 w-2 h-2 rounded-full ' +
          (active ? 'bg-primary' : 'bg-outline-variant')
        }
        aria-hidden="true"
      />
      <div className="flex flex-col md:flex-row justify-between gap-3 mb-2">
        <h3 className="font-serif text-headline-md text-on-surface">
          {title}
        </h3>
        <span className="font-sans text-label-caps font-semibold text-on-surface-variant uppercase tracking-widest whitespace-nowrap">
          {dates}
        </span>
      </div>
      <p className="font-sans text-body-lg text-secondary mb-4">
        {org} • {location}
      </p>
      <ul className="space-y-3 text-on-surface-variant">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3 font-sans text-body-md">
            <span className="text-primary mt-1" aria-hidden="true">
              /
            </span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-3 py-1 bg-surface-variant/20 border border-outline-variant/30 rounded-lg font-sans text-[10px] font-semibold text-secondary uppercase tracking-wider">
      {children}
    </span>
  );
}

function ResumeLink({
  href,
  label,
  external = false,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="flex items-start gap-3 text-on-surface-variant hover:text-primary transition-colors"
    >
      <span className="font-sans text-primary text-sm mt-1 uppercase">
        {label.slice(0, 2)}
      </span>
      <span>{children}</span>
    </a>
  );
}
