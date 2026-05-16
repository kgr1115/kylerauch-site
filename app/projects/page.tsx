import Link from 'next/link';
import type { Metadata } from 'next';
import { HERO_PROJECTS } from '@/lib/projects';
import ProjectCover from '@/components/ProjectCover';

export const metadata: Metadata = {
  title: 'Projects — Kyle Rauch',
  description:
    'Selected works from Kyle Rauch: OfferPilotV2, Support Triage, CSM Account Pulse, Diamond Edge. Plus the full GitHub feed.',
};

/**
 * Projects page — M4 Modern Archetype.
 *
 * Editorial header + 2-col image-led project grid. Each card links to its
 * case study route (/projects/[slug]). GitHub auto-feed lands in a later
 * milestone — for v1 the four hero projects carry the page.
 */
export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-24">
      {/* Header */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-20 pb-16">
        <p className="font-sans text-label-caps font-semibold text-primary mb-6 uppercase tracking-[0.2em]">
          Selected Works
        </p>
        <h1 className="font-serif text-[44px] md:text-[64px] lg:text-display text-on-surface leading-[1.05] mb-8">
          Selected Works &amp;{' '}
          <span className="italic text-primary">Digital</span> Experiments
        </h1>
        <p className="font-sans text-body-lg text-on-surface-variant max-w-3xl">
          A curated set of shipping projects where customer-facing rigor meets
          engineering execution. Each one solves a real workflow problem;
          none are demos.
        </p>
      </section>

      <div className="laser-divider max-w-container-max mx-auto" />

      {/* Project grid */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {HERO_PROJECTS.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group"
            >
              <article className="glass-card rounded-xl overflow-hidden rust-glow transition-all duration-500 h-full flex flex-col">
                <div className="aspect-square overflow-hidden bg-surface-container-low relative">
                  <ProjectCover
                    src={`/projects/${project.slug}/cover.jpg`}
                    alt={`${project.name} cover`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Category tag */}
                  <span className="absolute top-4 right-4 font-sans text-[10px] font-semibold px-3 py-1 bg-background/70 backdrop-blur-glass rounded-full text-on-surface-variant uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h2 className="font-serif text-headline-md text-on-surface mb-3">
                    {project.name}
                  </h2>
                  <p className="font-sans text-body-md text-on-surface-variant mb-6 flex-1">
                    {project.tagline}
                  </p>
                  <div className="flex justify-between items-end">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="font-sans text-[10px] font-semibold px-3 py-1 bg-outline-variant/20 rounded-full text-on-surface-variant uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="font-sans text-label-caps font-semibold text-primary uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                      View →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* GitHub link CTA */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-section-gap">
        <div className="glass-card rounded-xl p-12 text-center">
          <p className="font-sans text-label-caps font-semibold text-primary mb-4 uppercase tracking-[0.2em]">
            More on GitHub
          </p>
          <h2 className="font-serif text-headline-md text-on-surface mb-4">
            The full workshop
          </h2>
          <p className="font-sans text-body-md text-on-surface-variant max-w-2xl mx-auto mb-8">
            Twenty-plus public repos covering AI tooling, multi-agent
            pipelines, prompt-eval frameworks, and personal infrastructure.
          </p>
          <a
            href="https://github.com/kgr1115"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-outline text-on-surface font-sans text-label-caps font-semibold px-10 py-5 rounded uppercase tracking-widest hover:bg-surface-container-low transition-all"
          >
            github.com/kgr1115 →
          </a>
        </div>
      </section>
    </main>
  );
}
