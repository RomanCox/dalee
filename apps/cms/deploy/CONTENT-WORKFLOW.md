# Новый Content-Type и синхронизация БД (Strapi, VPS)

Дополнение к `DEPLOY.md`. Контекст тот же: прод — VPS DigitalOcean, sqlite,
без CI, деплой руками через `tar`+`ssh` (не `rsync` — на Windows его нет ни в
PowerShell, ни в Git Bash).

Content-Type Builder **не работает в production** (`NODE_ENV=production` в
`ecosystem.config.cjs`) — схему всегда создаём локально, на сервер попадает
уже готовый код.

## 1. Создать новый Content-Type

### Локально

```bash
pnpm dev:cms   # или pnpm dev из корня — Strapi должен быть в dev-режиме
```

1. `localhost:1337/admin` → **Content-Type Builder** → создать Single/Collection
   Type с нужными полями → Save (Strapi перезапустится сам).
2. Файлы схемы появятся в `apps/cms/src/api/<type>/**` — это обычный код.
3. Проверить локально: заполнить тестовым контентом в Content Manager,
   включить `find` (+`findOne` для Collection Type) в
   **Settings → Users & Permissions Plugin → Roles → Public**, дёрнуть
   `curl http://localhost:1337/api/<type>?populate=*` — должен быть 200.

### Собрать и залить на сервер

Из `apps/cms`:

```bash
pnpm build
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
pnpm install --prod --frozen-lockfile
pm2 restart cms
pm2 logs cms --lines 30 --nostream
```

Strapi при старте сам синхронизирует новую схему в `data.db` на сервере —
это не Content-Type Builder, а обычная загрузка кода, работает и в
production-режиме.

### Заполнить контентом на проде

1. `cms.romancox.dev/admin` → **Content Manager** → новый тип появится в
   списке → заполнить → **Save** → **Publish**.
2. **Settings → Users & Permissions Plugin → Roles → Public** → включить
   `find` (+`findOne` для Collection Type) для нового типа.
3. Проверить: `curl -i "https://cms.romancox.dev/api/<type>?populate=*"` → 200.

Если пункта 1 нет в списке — код на сервер не доехал или `pm2` не
перезапустился, смотреть `pm2 logs cms`.

## 2. Перенос БД: локально → сервер

Когда нужно, чтобы прод получил контент, накопленный локально
(перезаписывает **весь** контент на сервере, включая админ-аккаунты и
разрешения — на них тоже влияет, БД общая).

```bash
# на сервере — остановить и подстраховаться бэкапом
pm2 stop cms
mv /srv/cms/.tmp/data.db /srv/cms/.tmp/data.db.bak.$(date +%F)
```

```bash
# локально — залить БД и медиатеку
scp apps/cms/.tmp/data.db user@cms-host:/srv/cms/.tmp/data.db
scp -r apps/cms/public/uploads user@cms-host:/srv/cms/public/   # если есть загруженные файлы
```

```bash
# на сервере — запустить обратно
pm2 restart cms
pm2 logs cms --lines 30 --nostream
```

## 3. Перенос БД: сервер → локально

Чтобы локальная копия совпадала с продом (иначе часть запросов с фронта
будет падать 403/404 из-за отсутствующего контента/прав — ровно то, что уже
происходило).

```bash
# локально — остановить dev-сервер Strapi (Ctrl+C), sqlite не любит запись
# в файл, который параллельно открыт другим процессом

# подстраховаться бэкапом локальной БД
cp apps/cms/.tmp/data.db apps/cms/.tmp/data.db.bak.$(date +%F)
```

```bash
# скачать БД и медиатеку с сервера
scp user@cms-host:/srv/cms/.tmp/data.db apps/cms/.tmp/data.db
scp -r user@cms-host:/srv/cms/public/uploads apps/cms/public/   # если есть
```

```bash
pnpm dev:cms
```

**Важно:** после этого логиниться в локальной админке нужно уже под тем
аккаунтом, что был создан **на проде** — старый локальный админ из БД
пропадёт вместе с остальным локальным контентом.

### Если после переноса Strapi ругается на расшифровку полей

`ENCRYPTION_KEY` в локальном и прод `.env` — разные (генерировались
отдельно на каждом окружении, см. `DEPLOY.md`). Если в БД есть зашифрованные
данными этим ключом поля (настройки провайдеров и т.п.), после переноса
прод-БД локально с локальным `ENCRYPTION_KEY` они не расшифруются. Обычно
для контента сайта это не встречается, но если ошибка появилась — сверить,
что оба `.env` (`apps/cms/.env` и прод) для этого поля используют один и
тот же `ENCRYPTION_KEY`.