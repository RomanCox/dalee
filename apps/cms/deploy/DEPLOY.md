# Деплой Strapi на VPS (romancox.dev)

Контекст: VPS DigitalOcean, 1 vCPU / 1 ГБ RAM / 25 ГБ диск, уже занят VPN
(`admin.romancox.dev`) и telegram-ботом. Свободной памяти немного, поэтому:

- **без Docker** — лишний оверхед на 1 ГБ;
- **SQLite**, не Postgres — отдельный процесс БД не нужен, диск персистентный;
- **сборка admin-панели — НЕ на VPS** (`strapi build` кратковременно ест 2–4 ГБ
  и может уронить OOM'ом заодно VPN/бота), собираем локально и заливаем
  готовый билд;
- процесс держит **pm2** с лимитом памяти (`ecosystem.config.cjs`), не systemd
  напрямую — так проще смотреть логи и делать `pm2 restart`.

## 0. Разово: swap про запас

Сейчас на сервере уже 1 ГБ swap и он наполовину занят в простое. Добавляем
ещё 2 ГБ подушки безопасности (диска 25 ГБ, место есть):

```bash
sudo fallocate -l 2G /swapfile2
sudo chmod 600 /swapfile2
sudo mkswap /swapfile2
sudo swapon /swapfile2
echo '/swapfile2 none swap sw 0 0' | sudo tee -a /etc/fstab
free -h   # проверить, что Swap подрос
```

## 1. Разово: nginx + HTTPS для cms.romancox.dev

Домен `romancox.dev` уже привязан к серверу, `admin.` занят под VPN — берём
`cms.romancox.dev`. Убедитесь, что DNS A-запись `cms` -> IP сервера уже
создана (может занять время на распространение).

```bash
# на сервере, из этой папки (или скопировать содержимое nginx.cms.conf руками)
sudo cp nginx.cms.conf /etc/nginx/sites-available/cms.romancox.dev
sudo ln -s /etc/nginx/sites-available/cms.romancox.dev /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

sudo ufw allow 80/tcp   # если 80 не был открыт — certbot ходит по HTTP-01
sudo certbot --nginx -d cms.romancox.dev
```

Certbot сам допишет `listen 443 ssl` и редирект с 80 на 443 в этот же файл.

## 2. Разово: секреты и .env на сервере

`.env` живёт только на сервере, в репозиторий не попадает (см. `.env.example`).

```bash
cd /srv/cms   # путь, куда будем заливать проект — создать заранее: sudo mkdir -p /srv/cms && sudo chown $USER /srv/cms
cat > .env <<EOF
HOST=127.0.0.1
PORT=1337
APP_KEYS=$(openssl rand -base64 32),$(openssl rand -base64 32)
API_TOKEN_SALT=$(openssl rand -base64 32)
ADMIN_JWT_SECRET=$(openssl rand -base64 32)
TRANSFER_TOKEN_SALT=$(openssl rand -base64 32)
ENCRYPTION_KEY=$(openssl rand -base64 32)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
EOF
```

`HOST=127.0.0.1` — важно: Strapi слушает только локально, наружу торчит
только nginx на 443. Порт 1337 наружу не открываем (`ufw` не должен его
разрешать).

## 3. Каждый деплой

Локально (или в CI), из `apps/cms`:

```bash
pnpm install
pnpm build          # strapi build — собирается на вашей машине, не на VPS
```

Дальше — заливка кода на сервер, способ зависит от ОС.

### macOS / Linux — rsync

```bash
rsync -avz --delete \
  --exclude node_modules --exclude .tmp --exclude .env --exclude .cache \
  ./ user@cms-host:/srv/cms/
```

### Windows — tar + ssh, **только в Git Bash**

`rsync` на Windows нет по умолчанию — ни в PowerShell, ни в Git Bash.
Замена — `tar`+`ssh`. Выполнять **обязательно в Git Bash, не в PowerShell**:
PowerShell портит бинарный поток при передаче между `tar` и `ssh` через `|`
(гоняет его как текст через свою кодировку консоли), архив на сервере
придёт битым (`gzip: stdin: not in gzip format`).

```bash
tar --exclude=node_modules --exclude=.tmp --exclude=.env --exclude=.cache \
  -czf - . | ssh user@cms-host "tar -xzf - -C /srv/cms"
```

На сервере:

```bash
cd /srv/cms
pnpm install --prod --frozen-lockfile   # только прод-зависимости, без пересборки admin-панели

pm2 start deploy/ecosystem.config.cjs   # первый запуск
# или после обновления кода:
pm2 restart cms

pm2 save            # чтобы pm2 startup поднимал процесс после перезагрузки VPS
pm2 startup         # один раз — выведет команду для systemd, выполнить её
```

## 4. Бэкап данных

SQLite-файл — единственный источник контента, его не восстановит редеплой:

```bash
# разово в cron на сервере, например ежедневно
crontab -e
# добавить:
0 3 * * * cp /srv/cms/.tmp/data.db /srv/cms-backups/data-$(date +\%F).db
```

Папку `/srv/cms-backups` создать заранее и не забывать иногда скачивать
куда-то за пределы этого же VPS (диск один — при его потере пропадёт и бэкап).

## 5. Проверка памяти после первого запуска

```bash
free -h
pm2 monit
```

Если `cms` начинает часто перезапускиваться по `max_memory_restart` — либо
поднимайте лимит в `ecosystem.config.cjs`, либо это сигнал, что 1 ГБ реально
мало и стоит смотреть на апгрейд дроплета (не входит в "бесплатно", но
DigitalOcean позволяет resize без пересоздания сервера).
