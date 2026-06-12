/** PM2 — cd /var/www/sanad-iptv && pm2 start deploy/ecosystem.config.cjs */
module.exports = {
  apps: [
    {
      name: "sanad-iptv",
      cwd: "./frontend",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env_production: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
};
