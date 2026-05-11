import { UserConfig } from 'vite';

export function getDevConfig(): UserConfig {
  return {
    server: {
      // proxy: {
      //   '/api': {
      //     target: 'http://localhost:8081',
      //     changeOrigin: true,
      //     rewrite: path => path,
      //   },
      // },
    },
  };
}
