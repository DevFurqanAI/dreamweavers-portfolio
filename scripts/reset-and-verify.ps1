$ErrorActionPreference = "Stop"

Write-Host "Removing the previous dependency tree..." -ForegroundColor Cyan
if (Test-Path "node_modules") {
  Remove-Item -Recurse -Force "node_modules"
}
if (Test-Path "package-lock.json") {
  Remove-Item -Force "package-lock.json"
}
if (Test-Path ".next") {
  Remove-Item -Recurse -Force ".next"
}

Write-Host "Verifying npm cache..." -ForegroundColor Cyan
npm cache verify

Write-Host "Installing dependencies..." -ForegroundColor Cyan
npm install

Write-Host "Checking production dependencies..." -ForegroundColor Cyan
npm audit --omit=dev

Write-Host "Running lint..." -ForegroundColor Cyan
npm run lint

Write-Host "Running TypeScript checks..." -ForegroundColor Cyan
npm run typecheck

Write-Host "Creating a production build..." -ForegroundColor Cyan
npm run build

Write-Host "All required checks passed." -ForegroundColor Green
