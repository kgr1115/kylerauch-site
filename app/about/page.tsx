import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Kyle Rauch',
  description:
    'Kyle Rauch — L2 SaaS escalation operator and AI-tooling builder. Background, what I am looking for, how to reach me.',
};

/**
 * About page — M4 Modern Archetype.
 *
 * Editorial layout: portrait left, big serif headline + bio right.
 * Capability chips below. Contact channels integrated at the bottom
 * (no separate /contact route — merged here).
 */
export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24">
      {/* Hero — portrait + bio */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-20 pb-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          {/* Portrait left */}
          <div className="md:col-span-5 relative">
            <div className="aspect-[4/5] rounded-xl overflow-hidden glass-card p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Headshot.png"
                alt="Portrait of Kyle Rauch"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            {/* Rust badge — "EST. xxxx" */}
            <div className="absolute -bottom-4 left-8 bg-primary-container text-on-primary-container font-sans text-label-caps font-semibold px-4 py-2 rounded uppercase tracking-widest">
              Cincinnati, OH
            </div>
          </div>

          {/* Bio right */}
          <div className="md:col-span-7 md:pl-8">
            <p className="font-sans text-label-caps font-semibold text-primary mb-6 uppercase tracking-[0.2em]">
              About
            </p>
            <h1 className="font-serif text-[44px] md:text-[64px] text-on-surface leading-[1.05] mb-10">
              Operator at the{' '}
              <span className="italic text-primary">edge</span> of customer
              and code.
            </h1>
            <p className="font-sans text-body-lg text-on-surface-variant mb-6">
              I&apos;ve spent years working the L2 escalation queue at
              AI-forward SaaS companies. Sustained, direct exposure to where
              customers hit walls — and to the gap between what the product
              can do and what it should do.
            </p>
            <p className="font-sans text-body-lg text-on-surface-variant mb-10">
              In parallel, I build the tools I wished those teams had.
              Local-first AI pipelines for support triage, account health,
              job-search orchestration. Eval-driven. Citation-grounded.
              Designed to be used Monday morning, not shown in a slide deck.
            </p>

            {/* Capability chips */}
            <div className="flex flex-wrap gap-2">
              {[
                'Customer Success',
                'Implementation',
                'Solutions Engineering',
                'AI Training',
                'AI Tooling',
                'Eval Frameworks',
                'Multi-agent Pipelines',
                'Local-first Apps',
              ].map((chip) => (
                <span
                  key={chip}
                  className="font-sans text-label-caps font-semibold px-4 py-2 bg-outline-variant/20 rounded text-on-surface-variant uppercase tracking-widest"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="laser-divider max-w-container-max mx-auto" />

      {/* What I'm looking for */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-4">
            <p className="font-sans text-label-caps font-semibold text-primary mb-6 uppercase tracking-[0.2em]">
              Current focus
            </p>
            <h2 className="font-serif text-headline-lg text-on-surface mb-4">
              What I&apos;m looking for
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <p className="font-sans text-body-lg text-on-surface-variant mb-6">
              Roles at AI-forward SaaS where customer-facing rigor and
              engineering execution have to coexist. CSM, Implementation,
              Solutions Engineering, AI Training — or anywhere a hybrid of
              those lives.
            </p>
            <p className="font-sans text-body-lg text-on-surface-variant">
              Remote-first. Comfortable in companies of any size, but
              especially good fit for series A/B teams shipping AI features
              into existing customer workflows.
            </p>
          </div>
        </div>
      </section>

      <div className="laser-divider max-w-container-max mx-auto" />

      {/* Credentials */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
        <p className="font-sans text-label-caps font-semibold text-primary mb-6 uppercase tracking-[0.2em]">
          Credentials
        </p>
        <h2 className="font-serif text-headline-lg text-on-surface mb-12">
          Background &amp; certifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div className="p-8 border-l border-outline-variant/20">
            <p className="font-sans text-label-caps font-semibold text-on-surface-variant mb-3 uppercase tracking-widest">
              Current
            </p>
            <p className="font-serif text-[24px] text-on-surface mb-2">
              CompTIA Security+
            </p>
            <p className="font-sans text-body-md text-on-surface-variant">
              Active certification. Load-bearing for cybersecurity-adjacent
              SaaS roles.
            </p>
          </div>
          <div className="p-8 border-l border-outline-variant/20">
            <p className="font-sans text-label-caps font-semibold text-on-surface-variant mb-3 uppercase tracking-widest">
              Lapsed
            </p>
            <p className="font-serif text-[24px] text-on-surface mb-2">
              FINRA Series 7 &amp; 63
            </p>
            <p className="font-sans text-body-md text-on-surface-variant">
              Lapsed but signals financial-services context for fintech
              roles.
            </p>
          </div>
          <div className="p-8 border-l border-outline-variant/20">
            <p className="font-sans text-label-caps font-semibold text-on-surface-variant mb-3 uppercase tracking-widest">
              Stack
            </p>
            <p className="font-serif text-[24px] text-on-surface mb-2">
              Polyglot
            </p>
            <p className="font-sans text-body-md text-on-surface-variant">
              Rust, TypeScript, Python, SQL. Tauri, React, Next.js,
              Streamlit. Claude SDK, OpenAI, Anthropic, Groq.
            </p>
          </div>
        </div>
      </section>

      <div className="laser-divider max-w-container-max mx-auto" />

      {/* Contact section — replaces /contact route */}
      <section
        id="contact"
        className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-4">
            <p className="font-sans text-label-caps font-semibold text-primary mb-6 uppercase tracking-[0.2em]">
              Contact
            </p>
            <h2 className="font-serif text-headline-lg text-on-surface mb-4">
              Let&apos;s talk
            </h2>
            <p className="font-sans text-body-lg text-on-surface-variant">
              Recruiter, hiring manager, or someone with an interesting
              problem — easiest path is email or LinkedIn.
            </p>
          </div>

          <div className="md:col-span-7 md:col-start-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <a
              href="mailto:kyle@kylerauch.com"
              className="glass-card rounded-xl p-8 flex flex-col gap-3 transition-colors group rust-glow"
            >
              <p className="font-sans text-label-caps font-semibold text-on-surface-variant uppercase tracking-widest">
                Email
              </p>
              <p className="font-serif text-[20px] text-on-surface group-hover:text-primary transition-colors break-all">
                kyle@kylerauch.com
              </p>
            </a>
            <a
              href="https://www.linkedin.com/in/kyle-rauch-b2984a75/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-xl p-8 flex flex-col gap-3 transition-colors group rust-glow"
            >
              <p className="font-sans text-label-caps font-semibold text-on-surface-variant uppercase tracking-widest">
                LinkedIn
              </p>
              <p className="font-serif text-[20px] text-on-surface group-hover:text-primary transition-colors">
                Kyle Rauch
              </p>
            </a>
            <a
              href="https://github.com/kgr1115"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-xl p-8 flex flex-col gap-3 transition-colors group rust-glow"
            >
              <p className="font-sans text-label-caps font-semibold text-on-surface-variant uppercase tracking-widest">
                GitHub
              </p>
              <p className="font-serif text-[20px] text-on-surface group-hover:text-primary transition-colors">
                @kgr1115
              </p>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
