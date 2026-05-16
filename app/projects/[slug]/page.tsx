import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { HERO_PROJECTS, getProject } from '@/lib/projects';
import ProjectCover from '@/components/ProjectCover';
import LaserBackdrop from '@/components/LaserBackdrop';

type Props = {
  params: { slug: string };
};

/**
 * Case Study route — /projects/[slug]
 *
 * M4 stub template. Renders the editorial case-study layout with eyebrow +
 * giant serif headline + meta row (role, duration, repo) + hero image.
 * Body content is placeholder per project — Kyle fills these in once the
 * design is locked.
 *
 * generateStaticParams pre-renders one HTML file per hero project at build
 * time, which keeps the static-export deploy on Cloudflare Pages working.
 */

export function generateStaticParams() {
  return HERO_PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: 'Project not found — Kyle Rauch' };
  return {
    title: `${project.name} — Kyle Rauch`,
    description: project.tagline,
  };
}

export default function CaseStudyPage({ params }: Props) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen pt-24">
      {/* Header — eyebrow + giant headline + meta */}
      <section className="relative overflow-hidden">
        <LaserBackdrop opacity={40} />

        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-20 pb-16">
          <p className="font-sans text-label-caps font-semibold text-primary mb-6 uppercase tracking-[0.2em]">
            {project.category}
          </p>
          <h1 className="font-serif text-[44px] md:text-[64px] lg:text-display text-on-surface leading-[1.05] mb-12 max-w-5xl">
            {project.name}:{' '}
            <span className="italic text-primary">{project.tagline}</span>
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter pt-8 border-t border-outline-variant/20">
            <Meta label="Role" value={project.role} />
            <Meta label="Duration" value={project.duration} />
            <Meta
              label="Repo"
              value={
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline break-all"
                >
                  GitHub →
                </a>
              }
            />
            {project.liveUrl && (
              <Meta
                label="Live"
                value={
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Open →
                  </a>
                }
              />
            )}
          </div>
        </div>
      </section>

      {/* Hero image */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-section-gap">
        <div className="aspect-[16/9] rounded-xl overflow-hidden glass-card">
          <ProjectCover
            src={`/projects/${project.slug}/cover.jpg`}
            alt={`${project.name} hero`}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Body — placeholder until Kyle writes the real case studies */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-section-gap">
        <div className="max-w-3xl mx-auto">
          <p className="font-sans text-label-caps font-semibold text-primary mb-6 uppercase tracking-[0.2em]">
            Overview
          </p>
          <p className="font-serif italic text-headline-md text-on-surface-variant leading-relaxed mb-12">
            {project.blurb}
          </p>

          <div className="laser-divider mb-16" />

          <p className="font-sans text-label-caps font-semibold text-primary mb-6 uppercase tracking-[0.2em]">
            Case study
          </p>
          <p className="font-sans text-body-lg text-on-surface-variant mb-6">
            Full write-up landing in a later milestone. For now, the canonical
            source is the GitHub repo — it contains the README, eval results,
            architecture notes, and current state of the project.
          </p>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-outline text-on-surface font-sans text-label-caps font-semibold px-10 py-5 rounded uppercase tracking-widest hover:bg-surface-container-low transition-all"
          >
            View repository →
          </a>
        </div>
      </section>

      {/* Footer nav — back + other projects */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-section-gap">
        <div className="laser-divider mb-12" />
        <div className="flex flex-wrap justify-between items-center gap-6">
          <Link
            href="/projects"
            className="font-sans text-label-caps font-semibold text-on-surface-variant hover:text-primary uppercase tracking-widest transition-colors"
          >
            ← All projects
          </Link>
          <div className="flex flex-wrap gap-gutter">
            {HERO_PROJECTS.filter((p) => p.slug !== project.slug)
              .slice(0, 2)
              .map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="font-sans text-body-md text-on-surface-variant hover:text-primary transition-colors"
                >
                  {p.name} →
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Meta({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="font-sans text-label-caps font-semibold text-on-surface-variant mb-2 uppercase tracking-widest">
        {label}
      </p>
      <p className="font-sans text-body-md text-on-surface">{value}</p>
    </div>
  );
}
