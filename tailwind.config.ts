import type { Config } from 'tailwindcss';

/**
 * Modern Archetype design tokens
 * Source: stitch_rusty_ember_portfolio/modern_archetype/DESIGN.md
 *
 * Warm editorial palette: dark base #131313, rust orange primary,
 * clay/warm-gray neutrals. Newsreader serif for headlines, Hanken Grotesk
 * sans for body. 1280px container, 64px desktop margins, 128px section gaps.
 *
 * Previous design (Luminescence) preserved in git history if needed.
 */
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces — dark base with warm tonal layers
        background: '#131313',
        surface: '#131313',
        'surface-dim': '#131313',
        'surface-bright': '#393939',
        'surface-container-lowest': '#0e0e0e',
        'surface-container-low': '#1c1b1b',
        'surface-container': '#201f1f',
        'surface-container-high': '#2a2a2a',
        'surface-container-highest': '#353534',
        'surface-variant': '#353534',

        // Text on surfaces
        'on-background': '#e5e2e1',
        'on-surface': '#e5e2e1',
        'on-surface-variant': '#dcc1b5',

        // Primary — Rust Orange
        primary: '#ffb693',
        'on-primary': '#561f00',
        'primary-container': '#b3541e',
        'on-primary-container': '#fff1ed',
        'inverse-primary': '#9d440c',

        // Secondary — Muted Clay
        secondary: '#dbc2b2',
        'on-secondary': '#3d2d22',
        'secondary-container': '#554337',
        'on-secondary-container': '#c9b1a1',

        // Tertiary — paired warm
        tertiary: '#ffb690',
        'on-tertiary': '#542100',
        'tertiary-container': '#a65c30',
        'on-tertiary-container': '#fff1ec',

        // Error
        error: '#ffb4ab',
        'on-error': '#690005',
        'error-container': '#93000a',
        'on-error-container': '#ffdad6',

        // Outline / borders
        outline: '#a48c81',
        'outline-variant': '#56433a',

        // Inverse
        'inverse-surface': '#e5e2e1',
        'inverse-on-surface': '#313030',
      },
      fontFamily: {
        // Newsreader for serif headlines, Hanken Grotesk for sans body
        serif: ['var(--font-newsreader)', 'Georgia', 'serif'],
        sans: ['var(--font-hanken)', 'system-ui', 'sans-serif'],
        // Named aliases mirroring DESIGN.md
        display: ['var(--font-newsreader)', 'Georgia', 'serif'],
        'headline-lg': ['var(--font-newsreader)', 'Georgia', 'serif'],
        'headline-md': ['var(--font-newsreader)', 'Georgia', 'serif'],
        'body-lg': ['var(--font-hanken)', 'system-ui', 'sans-serif'],
        'body-md': ['var(--font-hanken)', 'system-ui', 'sans-serif'],
        'label-caps': ['var(--font-hanken)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Modern Archetype type scale
        display: [
          '80px',
          { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' },
        ],
        'headline-lg': ['48px', { lineHeight: '1.2', fontWeight: '600' }],
        'headline-lg-mobile': ['32px', { lineHeight: '1.2', fontWeight: '600' }],
        'headline-md': ['32px', { lineHeight: '1.3', fontWeight: '500' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'label-caps': [
          '12px',
          { lineHeight: '1.0', letterSpacing: '0.1em', fontWeight: '600' },
        ],
      },
      borderRadius: {
        DEFAULT: '0.25rem', // 4px — base
        sm: '0.125rem', // 2px
        md: '0.375rem', // 6px
        lg: '0.5rem', // 8px
        xl: '0.75rem', // 12px — used for project cards
        full: '9999px',
      },
      spacing: {
        // 8px-based scale
        unit: '8px',
        gutter: '32px',
        'section-gap': '128px',
        'margin-desktop': '64px',
        'margin-mobile': '24px',
      },
      maxWidth: {
        'container-max': '1280px',
      },
      backdropBlur: {
        glass: '16px',
      },
    },
  },
  plugins: [],
};

export default config;
