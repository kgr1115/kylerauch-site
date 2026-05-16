---
name: webgl-laser
description: Create a fixed full-screen WebGL laser background effect with a thin white-hot vertical core, restrained brand-colored halo, and soft smoky fog around the beam. Use only for laser background effects, not full page layout, copy, generic hero scenes, particles, or unrelated motion systems.
keywords: visual-design, animation, web-design, javascript, performance, motion, best-practices
author: MengTo
source: https://www.aura.build/skills/2e83a1dd-ab9c-4510-9e12-163dcc4708f2/webgl-laser
---

# WebGL Laser

## Scope

- Apply only to the laser background effect.
- Use a fixed full-screen canvas behind the DOM.
- Set `pointer-events: none` on the canvas.
- Keep page content in a higher stacking context.
- Match the halo and smoke to the page's primary or strongest accent color.

## Visual Target

- Thin vertical beam: crisp white-hot inner core, narrow colored halo.
- Atmospheric smoke: soft cloudy breakup concentrated around the beam.
- Dark cinematic field: restrained, brand-colored, and readable behind content.
- Slow pulse: glow breathes gently; no aggressive flicker or color cycling.
- Light blade feel: narrow and precise, never a thick neon pillar.

## Layering

```html
<canvas class="laser-canvas" data-webgl-laser></canvas>
<main class="page-content">...</main>
```

```css
.laser-canvas {
  position: fixed;
  inset: 0;
  z-index: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}

.page-content {
  position: relative;
  z-index: 1;
}
```

## Brand Color

Use the product accent as the source color. The shader keeps the core near white and derives the halo/smoke from this color.

```js
function hexToRgb01(hex) {
  const clean = hex.replace("#", "").trim();
  const value = clean.length === 3
    ? clean.split("").map((char) => char + char).join("")
    : clean;

  return [
    parseInt(value.slice(0, 2), 16) / 255,
    parseInt(value.slice(2, 4), 16) / 255,
    parseInt(value.slice(4, 6), 16) / 255,
  ];
}

const accent = getComputedStyle(document.documentElement)
  .getPropertyValue("--brand-accent")
  .trim() || "#ff4d8d";
```

## Raw WebGL Setup

Prefer raw WebGL with a full-screen quad unless the active file already uses another renderer.

### Vertex shader

```glsl
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
```

### Fragment shader

```glsl
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_color;
uniform float u_xOffset;
uniform float u_coreWidth;
uniform float u_glowWidth;
uniform float u_smokeDensity;

varying vec2 v_uv;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;

  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p *= 2.02;
    amplitude *= 0.5;
  }

  return value;
}

void main() {
  vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
  vec2 p = (v_uv - 0.5) * aspect;
  float x = p.x - u_xOffset;
  float distanceToBeam = abs(x);

  float core = exp(-pow(distanceToBeam / u_coreWidth, 2.0));
  float glow = exp(-pow(distanceToBeam / u_glowWidth, 1.45));
  float scatter = exp(-pow(distanceToBeam / (u_glowWidth * 5.5), 1.25));
  float pulse = 0.9 + 0.1 * sin(u_time * 1.15);

  vec2 fogUv = p * 3.1 + vec2(0.0, -u_time * 0.035);
  fogUv.x += sin(p.y * 3.5 + u_time * 0.11) * 0.14;
  float fogBase = fbm(fogUv);
  float fogFine = fbm(p * 8.0 + vec2(sin(u_time * 0.07) * 0.35, u_time * 0.05));
  float fog = smoothstep(0.30, 0.86, fogBase * 0.72 + fogFine * 0.28);
  float smoke = fog * scatter * u_smokeDensity;

  vec3 brand = clamp(u_color, 0.0, 1.0);
  vec3 haloColor = mix(brand, vec3(1.0), 0.16);
  vec3 smokeColor = mix(brand, vec3(0.55), 0.28) * 0.55;
  vec3 hotCore = vec3(1.0, 0.96, 0.90);

  vec3 color = vec3(0.006, 0.007, 0.010);
  color += smokeColor * smoke;
  color += haloColor * glow * 0.46 * pulse;
  color += hotCore * core * 1.35;

  float vignette = smoothstep(1.25, 0.18, length(p));
  color *= vignette;

  float alpha = clamp(smoke * 0.72 + glow * 0.68 + core, 0.0, 1.0);
  gl_FragColor = vec4(color, alpha);
}
```

## Tuning Knobs

- **Beam position:** adjust `xOffset`; keep it in aspect-correct centered UV space.
- **Beam thickness:** tune `coreWidth` separately from `glowWidth`; keep the core extremely thin.
- **Color:** derive color from the brand accent, then soften halo and smoke in shader.
- **Smoke density:** tune `smokeDensity`, FBM scale, drift speed, scatter width, and edge falloff.
- **Performance:** reduce FBM octaves or cap `maxDpr` before changing the visual structure.

## Taste Rules

- The hottest beam core stays near white.
- The halo and fog use the design's primary or strongest accent color.
- Smoke blooms near the beam and dissipates outward.
- Pulse affects glow only; avoid rapid flicker.
- Content readability wins over bloom, haze, or cinematic drama.

## Avoid

- Hardcoding blue when the design uses another primary color.
- Making the beam thick enough to read as a glowing bar.
- Generic full-screen fog that is not concentrated around the beam.
- Turning the effect into a Three.js scene, particle explosion, or multicolor neon background.
- Letting the canvas intercept pointer events.
- Dense fog or extreme bloom that washes out foreground UI.
