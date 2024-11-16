/// <reference types='vitest' />
import { nxCopyAssetsPlugin } from "@nx/vite/plugins/nx-copy-assets.plugin";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import path from "path";
import { defineConfig } from "vite";
import { default as tsconfigPaths, default as viteTsPaths } from "vite-tsconfig-paths";

export default defineConfig({
  root: __dirname,
  cacheDir: path.join(__dirname, "../node_modules/.vite/admin"),
  server: {
    port: 4200,
    host: "localhost"
  },
  preview: {
    port: 4300,
    host: "localhost"
  },
  plugins: [vue(), viteTsPaths({ root: __dirname }), nxCopyAssetsPlugin(["*.md"]), tsconfigPaths()],
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
          include: ["vue", "vue-router"]
        }
      }
    }
  },
  resolve: {
    alias: {
      "@libs/shared": resolve(__dirname, "../libs/shared/src/index.ts")
    }
  },
});
