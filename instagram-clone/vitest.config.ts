// import { fileURLToPath } from 'node:url'
// import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
// import viteConfig from './vite.config'

// export default mergeConfig(
//   viteConfig,
//   defineConfig({
//     test: {
//       environment: 'jsdom',
//       exclude: [...configDefaults.exclude, 'e2e/**'],
//       root: fileURLToPath(new URL('./', import.meta.url)),
//     },
//   }),
// )

import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
