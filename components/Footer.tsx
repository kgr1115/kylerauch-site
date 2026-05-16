import Link from 'next/link';

const socialLinks = [
  { href: 'mailto:kyle@kylerauch.com', label: 'Email' },
  { href: 'https://github.com/kgr1115', label: 'GitHub', external: true },
  {
    href: 'https://www.linkedin.com/in/kyle-rauch-b2984a75/',
    label: 'LinkedIn',
    external: true,
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-surface border-t border-outline-variant/20 mt-section-gap">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-section-gap pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Brand */}
          <div>
            <p className="font-serif text-headline-md text-on-surface mb-2">
              Kyle Rauch
            </p>
            <p className="font-sans text-body-md text-on-surface-variant">
              &copy; {new Date().getFullYear()} Kyle Rauch. Cincinnati, OH.
            </p>
          </div>

          {/* Social */}
          <div className="flex gap-gutter">
            {socialLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-body-md text-on-surface-variant hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-sans text-body-md text-on-surface-variant hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              )
            )}
          </div>
        </div>
      </div>

      {/* Branding Accent — giant wordmark, very low opacity */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-8 text-center opacity-[0.06] overflow-hidden">
        <p className="font-serif text-[120px] md:text-[200px] lg:text-[240px] font-bold uppercase text-on-surface whitespace-nowrap select-none leading-none tracking-tight">
          KYLE&nbsp;RAUCH
        </p>
      </div>
    </footer>
  );
}
