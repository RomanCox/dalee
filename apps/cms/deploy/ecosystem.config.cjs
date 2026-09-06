// pm2-конфиг для прод-Strapi на VPS (1 ГБ RAM, соседствует с VPN и telegram-ботом).
// Запускать УЖЕ собранный проект (strapi build выполняется локально/в CI, не здесь) —
// см. apps/cms/deploy/DEPLOY.md.
module.exports = {
  apps: [
    {
      name: 'cms',
      cwd: __dirname + '/..',
      // Не node_modules/.bin/strapi — это shell-скрипт, pm2 в fork-режиме
      // запускает script через `node`, который не может распарсить #!/bin/sh.
      script: 'node_modules/@strapi/strapi/bin/strapi.js',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
      // Жёсткий потолок памяти: если Strapi разрастётся (утечка, всплеск),
      // pm2 перезапустит процесс сам, не давая утащить в OOM VPN/бота на этой же машине.
      max_memory_restart: '450M',
      autorestart: true,
      min_uptime: '30s',
      max_restarts: 10,
    },
  ],
};
