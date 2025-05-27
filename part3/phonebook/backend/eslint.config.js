import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'


export default defineConfig([
  js.configs.recommended,

  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      sourceType: 'module', // Enable ES Modules (import/export)
      globals: globals.node,
    },
    plugins: {
      js,
      '@stylistic/js': stylistic,
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
    },
  },

  {
    ignores: ['dist/**'],
  },
])
