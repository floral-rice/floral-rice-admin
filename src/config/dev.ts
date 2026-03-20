import { UserConfig } from "vite";

export function getDevConfig(): UserConfig {
  return {
    define: {
      PROD: JSON.stringify(false),
      BASE_URL: JSON.stringify('http://localhost:8081')
    },
  };
}
