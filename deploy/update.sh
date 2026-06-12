#!/usr/bin/env bash
# Rebuild after uploading new files (keeps frontend/data/)
# Usage: sudo ./deploy/update.sh

set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/sanad-iptv}"

GREEN='\033[0;32m'
NC='\033[0m'
log() { echo -e "${GREEN}[sanad-iptv]${NC} $*"; }

cd "$APP_DIR/frontend"

log "Keeping existing data/ (CMS, orders, trials)..."
mkdir -p data

log "Installing & building..."
npm ci 2>/dev/null || npm install
npm run build

cd "$APP_DIR"
log "Restarting PM2..."
pm2 restart sanad-iptv || pm2 start deploy/ecosystem.config.cjs --env production
pm2 save

log "Update complete."
