$ErrorActionPreference = "Stop"

if (-not (Test-Path "package-lock.json")) {
  throw "package-lock.json is required. Restore it from Git before continuing."
}

Write-Host "Removing generated dependency and build folders..." -ForegroundColor Cyan
if (Test-Path "node_modules") {
  Remove-Item -Recurse -Force "node_modules"
}
if (Test-Path ".next") {
  Remove-Item -Recurse -Force ".next"
}

Write-Host "Verifying npm cache..." -ForegroundColor Cyan
npm cache verify

Write-Host "Installing the exact locked dependency tree..." -ForegroundColor Cyan
npm ci

Write-Host "Checking production dependencies..." -ForegroundColor Cyan
npm run audit:prod

Write-Host "Running lint, TypeScript and production build checks..." -ForegroundColor Cyan
npm run check

Write-Host "All required checks passed." -ForegroundColor Green
