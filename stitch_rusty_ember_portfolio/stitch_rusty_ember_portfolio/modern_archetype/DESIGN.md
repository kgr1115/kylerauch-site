---
name: Modern Archetype
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#dcc1b5'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#a48c81'
  outline-variant: '#56433a'
  surface-tint: '#ffb693'
  primary: '#ffb693'
  on-primary: '#561f00'
  primary-container: '#b3541e'
  on-primary-container: '#fff1ed'
  inverse-primary: '#9d440c'
  secondary: '#dbc2b2'
  on-secondary: '#3d2d22'
  secondary-container: '#554337'
  on-secondary-container: '#c9b1a1'
  tertiary: '#ffb690'
  on-tertiary: '#542100'
  tertiary-container: '#a65c30'
  on-tertiary-container: '#fff1ec'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbcc'
  primary-fixed-dim: '#ffb693'
  on-primary-fixed: '#351000'
  on-primary-fixed-variant: '#7a3000'
  secondary-fixed: '#f8decd'
  secondary-fixed-dim: '#dbc2b2'
  on-secondary-fixed: '#26190f'
  on-secondary-fixed-variant: '#554337'
  tertiary-fixed: '#ffdbca'
  tertiary-fixed-dim: '#ffb690'
  on-tertiary-fixed: '#331100'
  on-tertiary-fixed-variant: '#74350b'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display:
    fontFamily: Newsreader
    fontSize: 80px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 32px
  margin-desktop: 64px
  margin-mobile: 24px
  section-gap: 128px
---

## Brand & Style

The design system is built for a personal portfolio that balances intellectual authority with creative warmth. It targets a high-end professional audience, evoking a sense of "digital craft" through the juxtaposition of organic, earthy tones and a precise, architectural layout.

The visual direction is **Minimalist Glassmorphism**. It utilizes heavy whitespace to allow the portfolio work to breathe, while employing high-contrast typography to establish a clear hierarchy. The sophistication comes from the "near-black" canvas and the strategic use of semi-transparent layers that suggest depth without the clutter of traditional skeuomorphism. The emotional response is one of calm confidence, reliability, and modern elegance.

## Colors

The palette is anchored by a deep **Charcoal (#121212)** background, providing a high-contrast foundation for the **Rust Orange (#B3541E)** primary brand color. This orange is used sparingly for calls-to-action and critical highlights to maintain its impact.

Secondary tones consist of **Muted Clay** and **Warm Grays**, which serve as the "bridge" colors for borders, metadata, and secondary UI elements. These warmer neutrals prevent the dark theme from feeling sterile or "gamer-centric," instead steering it toward a premium, editorial aesthetic. Glassmorphic elements should use a white stroke at very low opacity (5-10%) to define edges against the dark background.

## Typography

Typography is the primary driver of personality in this design system. We pair **Newsreader**, a bold and modern serif, with **Hanken Grotesk**, a sharp and contemporary sans-serif.

- **Headlines:** Should always use Newsreader. Large display text should utilize the 700 weight with tight letter spacing for an editorial, "front-page" impact.
- **Body Text:** Hanken Grotesk provides a technical, clean contrast to the serif headings. It ensures readability in long-form project descriptions.
- **Labels:** Small navigational labels and "Eyebrow" headers should use Hanken Grotesk in all-caps with generous letter spacing to provide a structural, architectural feel to the layout.

## Layout & Spacing

This design system follows a **Fixed Grid** philosophy for desktop to maintain strict control over whitespace and line lengths. A 12-column grid is used with large gutters (32px) to reinforce the minimalist aesthetic.

- **Desktop:** 1280px max-width container centered with 64px side margins.
- **Sectioning:** Vertical rhythm is aggressive, using 128px gaps between major sections to ensure the content never feels crowded.
- **Mobile:** Transitions to a fluid 4-column grid with 24px margins. Headlines scale down significantly to maintain legibility without excessive wrapping.

## Elevation & Depth

Depth is achieved through **Glassmorphism** and tonal layering rather than traditional drop shadows.

1.  **The Base:** The #121212 background is the lowest level.
2.  **The Surface:** Interactive cards use a semi-transparent fill (#FFFFFF with 3-5% opacity) and a high `backdrop-filter: blur(16px)`. 
3.  **The Edge:** A 1px solid border using a "clay" tone at 20% opacity provides a crisp definition that catches the eye.
4.  **The Accent:** When an element is hovered, the border opacity increases, and a subtle, large-radius "Rust" tinted glow (0% spread, 40px blur, 10% opacity) may appear behind the element to simulate a soft light source.

## Shapes

The shape language is **Soft**. We use a 0.25rem (4px) base radius for small components like inputs and tags, scaling up to 0.75rem (12px) for larger project cards.

This subtle rounding breaks the harshness of the high-contrast dark theme while maintaining a professional, structured appearance. Avoid pill-shaped buttons; instead, use slightly rounded rectangles to keep the "architectural" feel of the portfolio intact.

## Components

### Buttons
- **Primary:** Filled Rust (#B3541E) with white text. No shadow, just a solid color block.
- **Secondary:** Ghost style with a 1px Clay-colored border. On hover, the background fills with a 5% white tint.
- **Label:** Text-only buttons should be all-caps with the "label-caps" typography style.

### Cards
Cards are the primary container for portfolio pieces. They must use the glassmorphic treatment: a 12px corner radius, a 16px background blur, and a 1px subtle Clay border. Images inside cards should have a slight zoom-in effect on hover.

### Input Fields
Inputs are minimalist: a bottom-border only approach or a very dark (#1A1A1A) inset fill. Focus states are indicated by the bottom border changing to the Primary Rust color.

### Chips & Tags
Used for "Tools" or "Services." These should be small, Hanken Grotesk caps, with a 4px radius and a subtle Clay-toned background (15% opacity).

### Navigation
The header should be "sticky" with a strong backdrop blur and no background color, creating a seamless transition as the user scrolls through the content.