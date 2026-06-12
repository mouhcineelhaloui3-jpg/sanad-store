#!/usr/bin/env bash
# SANAD IPTV — first-time VPS setup (Ubuntu / Hostinger)
# Usage (on VPS after uploading project to /var/www/sanad-iptv):
#   chmod +x deploy/vps-setup.sh deploy/update.sh
#   sudo DOMAIN=yourdomain.com ADMIN_API_KEY=your-secret ./deploy/vps-setup.sh

set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/sanad-iptv}"
DOMAIN="${DOMAIN:-}"
ADMIN_API_KEY="${ADMIN_API_KEY:-}"

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

log() { echo -e "${GREEN}[sanad-iptv]${NC} $*"; }
err() { echo -e "${RED}[error]${NC} $*" >&2; }

if [[ $EUID -ne 0 ]]; then
  err "Run as root: sudo DOMAIN=... ADMIN_API_KEY=... ./deploy/vps-setup.sh"
  exit 1
fi

if [[ -z "$DOMAIN" || -z "$ADMIN_API_KEY" ]]; then
  err "Required: DOMAIN=yourdomain.com ADMIN_API_KEY=long-random-secret"
  exit 1
fi

if [[ ! -d "$APP_DIR/frontend" ]]; then
  err "frontend/ not found in $APP_DIR — upload the project first."
  exit 1
fi

log "Installing Node.js 20..."
if ! command -v node &>/dev/null || [[ $(node -v | cut -d. -f1 | tr -d v) -lt 18 ]]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

log "Installing nginx..."
apt-get update -qq
apt-get install -y nginx

log "Installing PM2..."
npm install -g pm2

cd "$APP_DIR/frontend"

log "Creating .env.production..."
cat > .env.production <<EOF
NEXT_PUBLIC_SITE_URL=https://${DOMAIN}
NEXT_PUBLIC_WHATSAPP_NUMBER=212600000000
ADMIN_API_KEY=${ADMIN_API_KEY}
NODE_ENV=production
EOF

log "Ensuring data directory (CMS + orders)..."
mkdir -p "$APP_DIR/frontend/data"
chmod 755 "$APP_DIR/frontend/data"

log "Installing dependencies & building..."
npm ci 2>/dev/null || npm install
npm run build

log "Starting PM2..."
cd "$APP_DIR"
pm2 delete sanad-iptv 2>/dev/null || true
pm2 start deploy/ecosystem.config.cjs --env production
pm2 save
pm2 startup systemd -u root --hp /root 2>/dev/null || pm2 startup

log "Configuring nginx for $DOMAIN..."
sed "s/DOMAIN/${DOMAIN}/g" "$APP_DIR/deploy/nginx-sanad-iptv.conf" > /etc/nginx/sites-available/sanad-iptv
ln -sf /etc/nginx/sites-available/sanad-iptv /etc/nginx/sites-enabled/sanad-iptv
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
systemctl enable nginx

if command -v ufw &>/dev/null; then
  ufw allow OpenSSH 2>/dev/null || true
  ufw allow 'Nginx Full' 2>/dev/null || true
fi

log "SSL (optional — run manually if certbot not installed):"
echo "  apt install -y certbot python3-certbot-nginx"
echo "  certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}"

echo ""
log "Done! Site: http://${DOMAIN}"
echo ""
echo "Admin CMS key setup (browser console on /admin/storefront):"
echo "  localStorage.setItem('sanad-admin-api-key', '${ADMIN_API_KEY}');"
echo "  localStorage.setItem('sanad-admin-access', 'granted');"
echo ""
echo "Update WhatsApp in .env.production then: ./deploy/update.sh"
