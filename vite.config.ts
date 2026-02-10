import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layout from "vite-plugin-vue-layouts";
import * as path from "node:path";
import eslint from 'vite-plugin-eslint'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages({
      dirs: 'src/pages',
      extensions: ['vue'],
      onRoutesGenerated(routes) {
        console.log('Generated routes:', JSON.stringify(routes, null, 2))
      }
    }),
    Layout({
      layoutsDirs: ['src/layouts'],
      defaultLayout: 'basic-layout',
    }),
    eslint({
      cache: false,
      include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
      failOnError: false,   // ❌ 不会因 error 阻断 dev
      failOnWarning: false, // ⚠️ warning 也不阻断 dev
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
