'use client';

import { useEffect, useRef } from 'react';

/**
 * WebGLLaser — single vertical light-blade hero background.
 *
 * Adapted from the Meng To "webgl-laser" skill (.claude/skills/webgl-laser/).
 *
 * Motion stack (Kyle's tuning, 2026-05-16 iteration):
 *   - Rotation: beam pivots back-and-forth, ~57° amplitude, slow (~78s
 *     cycle). Applied via shader UV rotation, so beam + halo + smoke
 *     direction all rotate together as one coherent system.
 *   - Vertical motion along beam axis: yOffset oscillation slides the
 *     smoke pattern up and down the beam's length. This is the
 *     "vertical relative to rotation" motion — moves along whichever
 *     direction the beam is currently pointing.
 *   - Lateral sway: minor remaining perpendicular drift on top.
 *   - Pulse: shader-side sin(time) on the glow.
 *
 * Edge-to-edge guarantee: the beam is mathematically infinite (defined
 * as distance-from-a-line, not a finite segment), so it always extends
 * past both screen edges regardless of rotation or position. No visible
 * endpoints, ever.
 *
 * Reduced-motion: render one frame, no animation. WebGL-unsupported:
 * render nothing, DOM static gradient underneath carries the visual.
 */

const VERTEX_SHADER = /* glsl */ `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec3 u_color;
  uniform float u_xOffset;
  uniform float u_yOffset;      // shift smoke along the beam length
  uniform float u_rotation;     // radians — rotates beam around screen center
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

    // Rotate the world around screen center by -u_rotation, then evaluate
    // a vertical beam in the rotated frame. This is what makes the beam
    // appear to pivot. Beam is infinite along the rotated Y-axis so it
    // always extends past both screen edges.
    float cr = cos(-u_rotation);
    float sr = sin(-u_rotation);
    vec2 rp = vec2(p.x * cr - p.y * sr, p.x * sr + p.y * cr);

    float x = rp.x - u_xOffset;
    float distanceToBeam = abs(x);

    float core = exp(-pow(distanceToBeam / u_coreWidth, 2.0));
    float glow = exp(-pow(distanceToBeam / u_glowWidth, 1.45));
    float scatter = exp(-pow(distanceToBeam / (u_glowWidth * 5.5), 1.25));

    // Pulse breathes the glow
    float pulse = 0.78 + 0.22 * sin(u_time * 2.2);

    // Smoke advection in the rotated frame. u_yOffset slides the entire
    // smoke pattern along the beam length — this is the visible
    // "vertical motion relative to rotation" because rp.y IS the beam-
    // length direction (whichever way the beam is currently pointing).
    vec2 fogUv = rp * 3.1 + vec2(0.0, -u_time * 0.22 - u_yOffset);
    fogUv.x += sin(rp.y * 3.5 + u_time * 0.32) * 0.18;
    float fogBase = fbm(fogUv);
    float fogFine = fbm(rp * 8.0 + vec2(sin(u_time * 0.22) * 0.45, u_time * 0.30 + u_yOffset * 0.6));
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

    // Vignette uses unrotated p so the corners stay dark regardless
    // of beam angle
    float vignette = smoothstep(1.25, 0.18, length(p));
    color *= vignette;

    float alpha = clamp(smoke * 0.72 + glow * 0.68 + core, 0.0, 1.0);
    gl_FragColor = vec4(color, alpha);
  }
`;

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Failed to create shader');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader) || 'Shader compile failed';
    gl.deleteShader(shader);
    throw new Error(info);
  }
  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexSource: string,
  fragmentSource: string
): WebGLProgram {
  const program = gl.createProgram();
  if (!program) throw new Error('Failed to create program');
  gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vertexSource));
  gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fragmentSource));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program) || 'Program link failed';
    gl.deleteProgram(program);
    throw new Error(info);
  }
  return program;
}

export type LaserOptions = {
  /** RGB in 0-1 range. Default [1,1,1] = pure white (Luminescence) */
  color?: [number, number, number];
  /** Base horizontal offset of beam. CPU adds a slow sway on top. */
  xOffsetBase?: number;
  /** Amplitude of perpendicular sway. Default 0.06 */
  swayAmplitude?: number;
  /** Sway speed (radians/sec). Default 0.22 */
  swaySpeed?: number;
  /** Sway phase offset (radians). Default 0 */
  swayPhase?: number;
  /** Rotation amplitude in radians. Default 1.0 (~57°) */
  rotationAmplitude?: number;
  /** Rotation oscillation speed (radians/sec). Default 0.08 (slow, ~78s cycle) */
  rotationSpeed?: number;
  /** Rotation phase offset (radians). Default 0 — use to desync multiple beams */
  rotationPhase?: number;
  /** Vertical-along-beam motion amplitude. Default 2.0 */
  yMotionAmplitude?: number;
  /** Vertical-along-beam motion speed (radians/sec). Default 0.55 */
  yMotionSpeed?: number;
  /** Vertical-along-beam motion phase offset (radians). Default 0 */
  yMotionPhase?: number;
  /** Core radius — keep very thin. Default 0.0045 */
  coreWidth?: number;
  /** Halo radius — soft glow around the core. Default 0.035 */
  glowWidth?: number;
  /** Smoke intensity. Default 0.52 */
  smokeDensity?: number;
  /** Cap device pixel ratio (perf vs sharpness). Default 1.5 */
  maxDpr?: number;
  /** Additional className for the canvas — useful for mix-blend-mode etc. */
  className?: string;
};

const DEFAULTS: Required<Omit<LaserOptions, 'className'>> = {
  color: [1, 1, 1],
  xOffsetBase: 0,
  swayAmplitude: 0.06,
  swaySpeed: 0.22,
  swayPhase: 0,
  rotationAmplitude: 1.0,
  rotationSpeed: 0.08,
  rotationPhase: 0,
  yMotionAmplitude: 2.0,
  yMotionSpeed: 0.55,
  yMotionPhase: 0,
  coreWidth: 0.0045,
  glowWidth: 0.035,
  smokeDensity: 0.52,
  maxDpr: 1.5,
};

export default function WebGLLaser(props: LaserOptions = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { className: extraClassName, ...motionProps } = props;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
    });
    if (!gl) {
      console.warn('[WebGLLaser] WebGL not available — static fallback in DOM.');
      return;
    }

    const options: Required<Omit<LaserOptions, 'className'>> = {
      ...DEFAULTS,
      ...motionProps,
    };

    let program: WebGLProgram;
    try {
      program = createProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
    } catch (err) {
      console.error('[WebGLLaser] shader compile failed:', err);
      return;
    }

    console.info(
      '[WebGLLaser] initialized — reduceMotion=%s, animating=%s',
      reduceMotion,
      !reduceMotion
    );

    const positionBuffer = gl.createBuffer();
    const positions = new Float32Array([
      -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
    ]);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    gl.useProgram(program);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const uniforms = {
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      time: gl.getUniformLocation(program, 'u_time'),
      color: gl.getUniformLocation(program, 'u_color'),
      xOffset: gl.getUniformLocation(program, 'u_xOffset'),
      yOffset: gl.getUniformLocation(program, 'u_yOffset'),
      rotation: gl.getUniformLocation(program, 'u_rotation'),
      coreWidth: gl.getUniformLocation(program, 'u_coreWidth'),
      glowWidth: gl.getUniformLocation(program, 'u_glowWidth'),
      smokeDensity: gl.getUniformLocation(program, 'u_smokeDensity'),
    };

    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let rafId = 0;
    const startTime = performance.now();

    function resize() {
      if (!gl || !canvas || !parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, options.maxDpr);
      const width = Math.max(1, parent.clientWidth);
      const height = Math.max(1, parent.clientHeight);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    function render(now: number) {
      if (!gl || !canvas) return;
      const elapsed = (now - startTime) / 1000;

      const swayedXOffset =
        options.xOffsetBase +
        Math.sin(elapsed * options.swaySpeed + options.swayPhase) *
          options.swayAmplitude;

      const rotation =
        Math.sin(elapsed * options.rotationSpeed + options.rotationPhase) *
        options.rotationAmplitude;

      const yOffset =
        Math.sin(elapsed * options.yMotionSpeed + options.yMotionPhase) *
        options.yMotionAmplitude;

      gl.useProgram(program);
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform1f(uniforms.time, elapsed);
      gl.uniform3f(
        uniforms.color,
        options.color[0],
        options.color[1],
        options.color[2]
      );
      gl.uniform1f(uniforms.xOffset, swayedXOffset);
      gl.uniform1f(uniforms.yOffset, yOffset);
      gl.uniform1f(uniforms.rotation, rotation);
      gl.uniform1f(uniforms.coreWidth, options.coreWidth);
      gl.uniform1f(uniforms.glowWidth, options.glowWidth);
      gl.uniform1f(uniforms.smokeDensity, options.smokeDensity);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!reduceMotion) rafId = requestAnimationFrame(render);
    }

    const ro = new ResizeObserver(() => {
      resize();
      render(performance.now());
    });
    ro.observe(parent);

    resize();
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={
        'absolute inset-0 w-full h-full pointer-events-none' +
        (extraClassName ? ' ' + extraClassName : '')
      }
      aria-hidden="true"
    />
  );
}
