<#
.SYNOPSIS
  One-shot prep script: cleanup leftovers, regenerate resume PDF, verify build.
  Run from the kylerauch-site project root.
.NOTES
  Author: kyle@kylerauch.com — generated 2026-05-16
#>

$ErrorActionPreference = 'Stop'

$root = $PSScriptRoot | Split-Path -Parent
Set-Location $root
Write-Host "→ Working in $root" -ForegroundColor Cyan

# ── 1. Delete sandbox-leftover stubs the bash sandbox couldn't unlink ──
$stubs = @(
  'components/HeroScene.tsx',
  'components/HeroSceneWrapper.tsx',
  'components/scene',
  'public/.write-test'
)
foreach ($p in $stubs) {
  if (Test-Path $p) {
    Remove-Item -Recurse -Force $p
    Write-Host "  removed $p" -ForegroundColor DarkGray
  }
}

# ── 2. Optionally drop the giant original Headshot.png (now using .webp) ──
# Comment out if you'd rather keep it.
if (Test-Path 'public/Headshot.png') {
  Remove-Item 'public/Headshot.png' -Force
  Write-Host "  removed public/Headshot.png (1.8 MB → using Headshot.webp now)" -ForegroundColor DarkGray
}
if (Test-Path 'public/Headshot.jpg') {
  # Keep the .jpg as a fallback or remove. Default: remove to keep public/ minimal.
  Remove-Item 'public/Headshot.jpg' -Force
  Write-Host "  removed public/Headshot.jpg (kept only Headshot.webp)" -ForegroundColor DarkGray
}

# ── 3. Regenerate resume PDF from the master in Skippy ──
$skippy = 'C:\Users\kgrau\ai-projects\Skippy\references\job-search'
$pdfSrc = Join-Path $skippy 'Kyle_Rauch_Resume_v2.pdf'

if (-not (Test-Path $skippy)) {
  Write-Warning "Skippy not found at $skippy — skipping resume regen. Update PDF manually."
} else {
  Write-Host "→ Regenerating resume from $skippy" -ForegroundColor Cyan
  Push-Location $skippy
  try {
    node build_resume.js
  } finally {
    Pop-Location
  }
  if (Test-Path $pdfSrc) {
    Copy-Item -Force $pdfSrc (Join-Path $root 'public\resume.pdf')
    Write-Host "  copied resume.pdf into public/ ($([math]::Round((Get-Item public\resume.pdf).Length/1KB)) KB)" -ForegroundColor DarkGray
  } else {
    Write-Warning "Resume build ran but $pdfSrc not found — check build_resume.js output."
  }
}

# ── 4. Verify the build compiles cleanly ──
Write-Host "→ Running npm run build" -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
  Write-Error "npm run build failed. Fix errors before committing."
  exit 1
}

Write-Host ""
Write-Host "✓ Prep complete. Next:" -ForegroundColor Green
Write-Host "    git add ."
Write-Host "    git commit -m ""Cleanup + favicon/OG + Headshot.webp + resume refresh"""
Write-Host "    gh repo create kgr1115/kylerauch-site --public --source=. --remote=origin --push"
Write-Host "  Then go to dash.cloudflare.com → Workers & Pages → Pages → Connect Git."
