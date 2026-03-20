import { UserConfig } from "vite";

export function getProConfig(): UserConfig {
  return {
    define: {
      PROD: JSON.stringify(true),
      BASE_URL: JSON.stringify('http://localhost:8081')
    },
  };
}
