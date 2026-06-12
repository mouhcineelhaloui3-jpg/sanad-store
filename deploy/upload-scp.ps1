# Upload zip to VPS via SCP (requires OpenSSH on Windows)
# Usage:
#   powershell -ExecutionPolicy Bypass -File deploy\upload-scp.ps1 -VpsHost 1.2.3.4 -User root

param(
  [Parameter(Mandatory = $true)]
  [string]$VpsHost,
  [string]$User = "root",
  [string]$ZipPath = ""
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
if (-not $ZipPath) { $ZipPath = Join-Path $Root "sanad-iptv-deploy.zip" }

if (-not (Test-Path $ZipPath)) {
  Write-Host "Zip not found. Run prepare-upload.ps1 first." -ForegroundColor Red
  exit 1
}

Write-Host "[sanad-iptv] Uploading to ${User}@${VpsHost}:/var/www/ ..." -ForegroundColor Green
ssh "${User}@${VpsHost}" "mkdir -p /var/www"
scp $ZipPath "${User}@${VpsHost}:/var/www/sanad-iptv-deploy.zip"

Write-Host "[sanad-iptv] Upload done. Run on VPS:" -ForegroundColor Green
Write-Host "  cd /var/www && rm -rf sanad-iptv && unzip -o sanad-iptv-deploy.zip -d sanad-iptv"
Write-Host "  cd sanad-iptv && chmod +x deploy/*.sh"
Write-Host "  sudo DOMAIN=yourdomain.com ADMIN_API_KEY=your-secret ./deploy/vps-setup.sh"
