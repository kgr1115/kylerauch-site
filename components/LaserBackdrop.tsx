import WebGLLaser from './WebGLLaser';

/**
 * LaserBackdrop — the signature dual-laser motion used across every page's
 * header section.
 *
 * Composition:
 *   - Beam 1: rust-container (#b3541e ≈ [0.7, 0.33, 0.12]), wide rotation,
 *     baseline phases.
 *   - Beam 2: lighter rust ([1.0, 0.71, 0.58] ≈ #ffb693), narrower rotation
 *     amplitude, offset by π/2 on rotation phase + π on yMotion phase so
 *     it never duplicates beam 1's pose. Screen-blended so overlapping
 *     cores compound additively.
 *
 * Usage — put inside a `relative overflow-hidden` parent, wrap sibling
 * content in `relative z-10`:
 *
 *   <section className="relative overflow-hidden">
 *     <LaserBackdrop />
 *     <div className="relative z-10">…</div>
 *   </section>
 *
 * Tune per-page by passing `opacity` (default 60) — resume / case study
 * use a lower value so the formal content stays in front.
 */
export default function LaserBackdrop({
  opacity = 60,
}: {
  /** 0-100, applied as Tailwind opacity-{n} on the wrapper */
  opacity?: number;
}) {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: opacity / 100 }}
      aria-hidden="true"
    >
      <WebGLLaser
        color={[0.7, 0.33, 0.12]}
        rotationAmplitude={1.0}
        rotationSpeed={0.08}
        yMotionAmplitude={2.0}
        yMotionSpeed={0.55}
      />
      <WebGLLaser
        color={[1.0, 0.71, 0.58]}
        xOffsetBase={0.18}
        rotationAmplitude={0.7}
        rotationSpeed={0.11}
        rotationPhase={Math.PI / 2}
        yMotionAmplitude={2.6}
        yMotionSpeed={0.42}
        yMotionPhase={Math.PI}
        swayPhase={Math.PI / 3}
        className="mix-blend-screen"
      />
    </div>
  );
}
