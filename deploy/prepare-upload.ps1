# Prepare zip for Hostinger VPS upload (no GitHub)
# Usage: powershell -ExecutionPolicy Bypass -File deploy\prepare-upload.ps1

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$OutZip = Join-Path $Root "sanad-iptv-deploy.zip"
$TempDir = Join-Path $env:TEMP "sanad-iptv-pack"

Write-Host "[sanad-iptv] Preparing deployment archive..." -ForegroundColor Green

if (Test-Path $TempDir) { Remove-Item -Recurse -Force $TempDir }
if (Test-Path $OutZip) { Remove-Item -Force $OutZip }

New-Item -ItemType Directory -Path $TempDir | Out-Null

$ExcludeDirs = @("node_modules", ".next", ".git", "__pycache__", ".venv", "venv")
$ExcludeFiles = @(".env", ".env.local", ".env.production")

function Copy-Project {
  param([string]$Source, [string]$Dest)
  if (-not (Test-Path $Dest)) {
    New-Item -ItemType Directory -Path $Dest -Force | Out-Null
  }
  Get-ChildItem -Path $Source -Force | ForEach-Object {
    $name = $_.Name
    if ($ExcludeDirs -contains $name) { return }
    if ($ExcludeFiles -contains $name) { return }
    $target = Join-Path $Dest $name
    if ($_.PSIsContainer) {
      New-Item -ItemType Directory -Path $target -Force | Out-Null
      Copy-Project $_.FullName $target
    } else {
      Copy-Item $_.FullName $target -Force
    }
  }
}

# Copy frontend + deploy (+ backend optional, lightweight)
Copy-Project (Join-Path $Root "frontend") (Join-Path $TempDir "frontend")
Copy-Project (Join-Path $Root "deploy") (Join-Path $TempDir "deploy")

# Ensure data dir exists in package
New-Item -ItemType Directory -Path (Join-Path $TempDir "frontend\data") -Force | Out-Null

Compress-Archive -Path "$TempDir\*" -DestinationPath $OutZip -Force
Remove-Item -Recurse -Force $TempDir

$sizeMb = [math]::Round((Get-Item $OutZip).Length / 1MB, 2)
Write-Host "[sanad-iptv] Created: $OutZip ($sizeMb MB)" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Upload sanad-iptv-deploy.zip to VPS /var/www/"
Write-Host "  2. SSH: cd /var/www && unzip sanad-iptv-deploy.zip -d sanad-iptv"
Write-Host "  3. SSH: cd sanad-iptv && chmod +x deploy/*.sh"
Write-Host "  4. SSH: sudo DOMAIN=yourdomain.com ADMIN_API_KEY=secret ./deploy/vps-setup.sh"
