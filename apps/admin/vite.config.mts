/// <reference types='vitest' />
import { nxCopyAssetsPlugin } from "@nx/vite/plugins/nx-copy-assets.plugin";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  root: "./",
  cacheDir: "../node_modules/.vite/admin",
  server: {
    port: 4200,
    host: "localhost"
  },
  preview: {
    port: 4300,
    host: "localhost"
  },
  plugins: [vue(), nxViteTsPaths(), nxCopyAssetsPlugin(["*.md"]), tsconfigPaths()],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: "../dist/admin",
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  test: {
    watch: false,
    globals: true,
    environment: "happy-dom",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    reporters: ["default"],
    coverage: {
      reportsDirectory: "../coverage/admin",
      provider: "v8"
    },
    deps: {
      optimizer: {
        web: {
          include: ['vue', 'vue-router']
        }
      }
    }
  },
  resolve: {
    alias: {
      "@libs/shared": resolve(__dirname, "../libs/shared/src/index.ts")
    }
  }
});
