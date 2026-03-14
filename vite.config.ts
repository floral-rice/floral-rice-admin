import { defineConfig, mergeConfig } from "vite";
import baseConfig from './src/config/base.config.js'
import devconfig from './src/config/dev.config.js'
import proConfig from './src/config/pro.confing.js'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return mergeConfig(baseConfig, devconfig)
  }
  return mergeConfig(baseConfig, proConfig)
});
