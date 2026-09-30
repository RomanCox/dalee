# Strapi 5 (TS), sqlite. Собирается и запускается прямо на VPS —
# 4 CPU / 8 GB хватает и на "strapi build" (админка + компиляция TS в dist/),
# больше не нужно тащить готовый dist/ с локальной машины (см. deploy/DEPLOY.md,
# написан под старый 1 GB VPS, где сборка на сервере роняла VPN/бота OOM'ом).

ARG NODE_VERSION=22
FROM node:${NODE_VERSION}-bookworm-slim AS base
RUN corepack enable
WORKDIR /app

FROM base AS build
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN pnpm install --frozen-lockfile
COPY . .
ENV NODE_ENV=production
RUN pnpm build

FROM base AS runtime
ENV NODE_ENV=production
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN pnpm install --prod --frozen-lockfile
# Strapi TS-проект: при "strapi start" он видит tsconfig.json и заново компилирует
# серверный код через tsc, поэтому исходники (config/src/database/types) нужны
# в runtime рядом с dist, а не только сам dist.
COPY --from=build /app/tsconfig.json ./tsconfig.json
COPY --from=build /app/config ./config
COPY --from=build /app/src ./src
COPY --from=build /app/database ./database
COPY --from=build /app/types ./types
COPY --from=build /app/public ./public
COPY --from=build /app/favicon.png ./favicon.png
COPY --from=build /app/dist ./dist

# .tmp (sqlite) и public/uploads монтируются volume'ами снаружи — см. docker-compose.yml,
# без этого при пересборке образа улетят и контент, и загруженные медиа.
EXPOSE 1337
CMD ["node", "node_modules/@strapi/strapi/bin/strapi.js", "start"]
