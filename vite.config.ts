import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layout from "vite-plugin-vue-layouts";
import * as path from "node:path";

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
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
