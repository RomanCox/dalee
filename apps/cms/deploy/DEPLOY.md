# Деплой Strapi на VPS (romancox.dev)

Контекст: новый VPS, 4 vCPU / 8 ГБ RAM / 80 ГБ диск, на нём же VPN
(`admin.romancox.dev`) и telegram-бот (не в этом репозитории). Памяти и CPU
достаточно, поэтому в отличие от старого 1 ГБ дроплета:

- **Strapi запускается в Docker** (`Dockerfile`, `docker-compose.yml` в этой
  папке) — свежая версия с изоляцией зависимостей и предсказуемым откатом на
  предыдущий образ;
- **сборка admin-панели — прямо на VPS**, во время `docker compose build`
  (`strapi build` внутри build-стадии). Раньше собирали локально и заливали
  готовый `dist/`, потому что сборка на 1 ГБ дроптете могла уронить OOM'ом
  VPN/бота — на 8 ГБ это не проблема;
- **SQLite**, не Postgres — отдельный процесс БД всё ещё не нужен, файл
  персистентный через volume;
- супервизия процесса — `restart: unless-stopped` в compose вместо pm2;
  `ecosystem.config.cjs` в этой папке больше не используется (оставлен как
  референс, можно удалить).

Своп на этом VPS не заводили отдельно — 8 ГБ RAM с запасом под один
Strapi-контейнер (`mem_limit: 1g` в `docker-compose.yml`) плюс VPN и бота.

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
HOST=0.0.0.0
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

`HOST=0.0.0.0` — внутри контейнера это нормально: наружу торчит не сам
Strapi, а docker, и `docker-compose.yml` публикует порт как
`127.0.0.1:1337:1337` — то есть биндит его на loopback *хоста*. Снаружи VPS
1337 всё равно не виден, доступ только через nginx на 443. Если случайно
поставить здесь `127.0.0.1`, будет хуже — Strapi послушает loopback внутри
контейнера, и даже локальный проброс порта не достучится (сервис не
поднимется, `docker compose logs cms` покажет, что коннекты не доходят).

Также один раз создать папки под тома (иначе Docker создаст их от root, и
Strapi внутри контейнера не сможет в них писать):

```bash
mkdir -p /srv/cms/data/tmp /srv/cms/data/uploads
```

## 3. Каждый деплой

Заливка кода на сервер, способ зависит от ОС (собирать локально не нужно —
`docker compose build` собирает admin-панель и компилирует TS прямо на VPS).

### macOS / Linux — rsync

```bash
rsync -avz --delete \
  --exclude node_modules --exclude .tmp --exclude .env --exclude .cache --exclude data \
  ./ user@cms-host:/srv/cms/
```

### Windows — tar + ssh, **только в Git Bash**

`rsync` на Windows нет по умолчанию — ни в PowerShell, ни в Git Bash.
Замена — `tar`+`ssh`. Выполнять **обязательно в Git Bash, не в PowerShell**:
PowerShell портит бинарный поток при передаче между `tar` и `ssh` через `|`
(гоняет его как текст через свою кодировку консоли), архив на сервере
придёт битым (`gzip: stdin: not in gzip format`).

```bash
tar --exclude=node_modules --exclude=.tmp --exclude=.env --exclude=.cache --exclude=data \
  -czf - . | ssh user@cms-host "tar -xzf - -C /srv/cms"
```

На сервере:

```bash
cd /srv/cms
docker compose up -d --build   # первый запуск и любой редеплой после обновления кода
docker compose logs -f cms     # проверить, что стартовал без ошибок
```

## 4. Бэкап данных

SQLite-файл — единственный источник контента, его не восстановит редеплой:

```bash
# разово в cron на сервере, например ежедневно
crontab -e
# добавить:
0 3 * * * cp /srv/cms/data/tmp/data.db /srv/cms-backups/data-$(date +\%F).db
```

Папку `/srv/cms-backups` создать заранее и не забывать иногда скачивать
куда-то за пределы этого же VPS (диск один — при его потере пропадёт и бэкап).

## 5. Проверка после первого запуска

```bash
docker compose ps
docker stats cms   # разово посмотреть, во сколько памяти/CPU уложился реальный трафик
```

Лимит `mem_limit: 1g` в `docker-compose.yml` — если контейнер упирается в
него и Docker его убивает (`docker compose ps` покажет restart), поднимите
лимит — на 8 ГБ RAM запас большой.
