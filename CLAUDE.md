# Dalee

Сайт архитектурно-строительной компании. Монорепо: фронтенд + Strapi как админка.

## Структура

```
apps/web         Vite 7 + React 18 + TypeScript + TanStack Router
apps/cms         Strapi 5.33 — источник контента, админка
apps/web/_next_app   эталон старого Next-проекта. ТОЛЬКО ЧТЕНИЕ, удалить после миграции
```

Workspaces нет: у каждого приложения свои зависимости и свой `.npmrc`.

## Команды

```bash
pnpm dev            # из корня, оба приложения
pnpm dev:web        # только фронт   → localhost:3000
pnpm dev:cms        # только Strapi  → localhost:1337/admin
pnpm build          # оба
```

## Стек фронтенда

- **GSAP + ScrollTrigger + @gsap/react** — основные анимации по скроллу, ядро проекта
- **Lenis** — инерционный скролл, связывается с `gsap.ticker` в `__root.tsx`
- **framer-motion** — переходы между страницами, микроинтеракции
- **swiper**, **react-hook-form**, **@react-input/mask**, **react-player**, **react-animate-height**
- **sass-embedded**, стили — scss-модули рядом с компонентами
- Алиас `@` → `src`. SVG через svgr: `import Icon from './icon.svg?react'`

## Правила

- **pnpm**, не npm и не yarn. Зависимости ставятся в `apps/web` и `apps/cms` раздельно.
- `apps/cms` в задачах по фронтенду **не трогать**.
- `_next_app` — только чтение, ничего туда не писать.
- **Версии пакетов не обновлять** — есть отдельный план, см. ниже.
- Каждый шаг заканчивается работающим `pnpm dev`.
- Реальные ключи только в `.env` (в игноре). В `.env.example` — пустые плейсхолдеры.
- Данные из Strapi грузятся на клиенте, SSR нет.

## Статус миграции Next 14 (App Router) → Vite + TanStack Router

**Сделано:** скаффолд Vite, зависимости, `vite.config.ts`, `tsconfig`, перенос `src` и `public`, Strapi запускается на своих данных.

**В работе:** сборка роутинга, вычистка Next-специфики.

**Не начато:** Lenis + ScrollTrigger в `__root.tsx`, `srcSet` из форматов Strapi, шрифты через `@font-face`.

### Карта роутов

```
_next_app/layout.tsx + providers.tsx  →  src/routes/__root.tsx
_next_app/page.tsx                    →  src/routes/index.tsx
_next_app/about/page.tsx              →  src/routes/about.tsx
_next_app/projects/page.tsx           →  src/routes/projects.index.tsx
_next_app/projects/[slug]/page.tsx    →  src/routes/projects.$slug.tsx
_next_app/context/header-context.tsx  →  src/context/header-context.tsx
```

`createRouter` с `scrollRestoration: false` — скроллом управляет Lenis.

### Что убирать из кода

| Next | Vite |
|---|---|
| `"use client"` | удалить |
| `next/link` | `Link` из `@tanstack/react-router` |
| `next/navigation` | `useNavigate`, `useLocation`, `Route.useParams()` |
| `next/image` | `<img>` + `srcSet` из `formats.*` Strapi |
| `next/font` | `@font-face` в scss, шрифты в `src/fonts` |
| `process.env.NEXT_PUBLIC_*` | `import.meta.env.VITE_*` |
| `dynamic(…, {ssr:false})`, `typeof window !== 'undefined'` | упростить, SSR нет |
| `generateStaticParams`, `generateMetadata`, `{ next: { revalidate } }` | удалить |

## Планируется после миграции

Каждый пункт — отдельная ветка и коммит, между ними проверка анимаций глазами.

1. `framer-motion` → `motion` (переименование импортов на `motion/react`)
2. GSAP до 3.13+ — клубные плагины стали бесплатными: SplitText, ScrollSmoother, Flip. Возможно, ScrollSmoother заменит Lenis.
3. React 19 — проверить `react-player`, `swiper`, `react-animate-height`
4. Strapi 5.33 → 5.52 — предварительно бэкап `.tmp/data.db`

### Вернуть в `tsconfig.app.json`

Ослаблено на время миграции:

- `verbatimModuleSyntax: true` (потребует `import type`)
- `noUnusedLocals` / `noUnusedParameters: true`
- `erasableSyntaxOnly: true` — если в коде нет `enum`
- убрать `noImplicitAny: false`
