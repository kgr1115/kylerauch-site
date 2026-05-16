'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { clsx } from 'clsx';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/resume', label: 'Resume' },
  { href: '/about', label: 'About' },
];

export default function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <header
      className={clsx(
        'fixed top-0 w-full z-50 transition-all duration-300 ease-out',
        'backdrop-blur-glass border-b',
        scrolled
          ? 'bg-background/70 border-outline-variant/30'
          : 'bg-transparent border-outline-variant/10'
      )}
    >
      <div className="max-w-container-max mx-auto flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4">
        {/* Wordmark — Newsreader serif */}
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="font-serif text-headline-md font-semibold text-on-surface hover:text-primary transition-colors"
        >
          Kyle Rauch
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-gutter">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'font-sans text-body-md transition-all duration-300 pb-1',
                isActive(item.href)
                  ? 'text-primary font-bold border-b-2 border-primary'
                  : 'text-on-surface-variant hover:text-on-surface'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Hire Me CTA (desktop) */}
        <a
          href="mailto:kyle@kylerauch.com"
          className="hidden md:inline-block bg-primary-container text-on-primary-container font-sans text-label-caps font-semibold px-6 py-3 rounded uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all"
        >
          Hire Me
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 -mr-2 text-on-surface"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <div className="w-6 h-4 relative flex flex-col justify-between">
            <span
              className={clsx(
                'block h-px w-full bg-current transition-transform origin-center',
                mobileOpen && 'translate-y-[7px] rotate-45'
              )}
            />
            <span
              className={clsx(
                'block h-px w-full bg-current transition-opacity',
                mobileOpen && 'opacity-0'
              )}
            />
            <span
              className={clsx(
                'block h-px w-full bg-current transition-transform origin-center',
                mobileOpen && '-translate-y-[7px] -rotate-45'
              )}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-outline-variant/20 bg-surface-container-lowest/95 backdrop-blur-glass">
          <ul className="max-w-container-max mx-auto px-margin-mobile py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    'block py-3 text-body-lg font-sans transition-colors',
                    isActive(item.href)
                      ? 'text-primary font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <a
                href="mailto:kyle@kylerauch.com"
                onClick={() => setMobileOpen(false)}
                className="block text-center bg-primary-container text-on-primary-container font-sans text-label-caps font-semibold px-6 py-3 rounded uppercase tracking-widest"
              >
                Hire Me
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
