
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // _next_app — эталон старого Next-проекта, только чтение, удалить после
  // миграции (см. CLAUDE.md). Не наш код — линтить и чинить его не нужно.
  globalIgnores(['dist', '_next_app']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // Легитимный паттерн "синхронизировать state с пропом/внешней подпиской"
      // (Portal, Modal, подписка на Lenis-скролл) это правило не отличает от
      // настоящих антипаттернов — понижено, чтобы не блокировать сборку.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
  {
    // TanStack Router: файл-роут экспортирует только Route, а сам компонент
    // объявляется локально и передаётся в createFileRoute({ component }) —
    // под это правило (рассчитанное на Next/CRA-паттерн) конвенция роутера
    // в принципе не подходит, allowExportNames тут не спасает.
    files: ['src/routes/**/*.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])
