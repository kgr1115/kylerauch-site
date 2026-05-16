# Claude Code skills directory

This directory holds Claude Code skill files that Claude auto-loads when context matches. For this project, we install **CloudAI-X/threejs-skills** — a curated, audited-against-r160+ set of Three.js skill files that give Claude accurate API knowledge.

## Install

From PowerShell, in this project's root:

```powershell
cd C:\Users\kgrau\ai-projects\kylerauch-site\.claude\skills
git clone https://github.com/CloudAI-X/threejs-skills.git temp
Move-Item temp\skills\* .
Remove-Item -Recurse -Force temp
```

Or if you prefer manual:

1. Clone `https://github.com/CloudAI-X/threejs-skills` somewhere
2. Copy everything inside its `skills/` directory into THIS directory
3. Delete the temp clone

After install, this directory should contain folders like `threejs-fundamentals/`, `threejs-shaders/`, `threejs-postprocessing/`, etc.

## What's covered

- `threejs-fundamentals` — scene/camera/renderer/object hierarchy
- `threejs-geometry` — built-ins, BufferGeometry, custom geometry, instancing
- `threejs-materials` — PBR, basic, shader materials
- `threejs-lighting` — light types, shadows, environment lighting
- `threejs-textures` — texture types, UV mapping, render targets
- `threejs-animation` — keyframe, skeletal, morph targets
- `threejs-loaders` — GLTF/GLB, async patterns, caching
- `threejs-shaders` — GLSL, ShaderMaterial, uniforms, custom effects
- `threejs-postprocessing` — EffectComposer, bloom, DOF, screen effects
- `threejs-interaction` — raycasting, camera controls, mouse/touch

## Why this matters

Three.js evolves fast. Claude's general training is loose on current API surface (constructor signatures, valid property names, current import paths). These skill files bridge that gap. For this project, they're especially load-bearing on the laser/light hero scene (M3) which uses shaders + postprocessing bloom.
