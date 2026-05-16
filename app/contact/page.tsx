import Link from 'next/link';

/**
 * /contact is now merged into /about under the #contact anchor.
 * Kept as a thin "moved" stub so old links don't 404. Client-side
 * meta refresh handles the auto-redirect for static export.
 */
export const metadata = {
  title: 'Contact — Kyle Rauch',
  description: 'Get in touch with Kyle Rauch.',
};

export default function ContactPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/about#contact" />
      <main className="min-h-screen pt-24">
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-20 pb-section-gap text-center">
          <p className="font-sans text-label-caps font-semibold text-primary mb-6 uppercase tracking-[0.2em]">
            Moved
          </p>
          <h1 className="font-serif text-headline-lg text-on-surface mb-6">
            Contact is now on the About page.
          </h1>
          <Link
            href="/about#contact"
            className="inline-block bg-primary-container text-on-primary-container font-sans text-label-caps font-semibold px-10 py-5 rounded uppercase tracking-widest hover:brightness-110 transition-all"
          >
            Take me there →
          </Link>
        </section>
      </main>
    </>
  );
}
