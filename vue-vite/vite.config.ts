import { fileURLToPath, URL } from 'node:url'
import federation from "@originjs/vite-plugin-federation";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import { federation } from "@module-federation/vite";
import { createEsBuildAdapter } from "@softarc/native-federation-esbuild";

// https://vitejs.dev/config/
export default defineConfig(async ({ command }) => ({
  plugins: [
    // federation({
    //   options: {
    //     workspaceRoot: __dirname,
    //     outputPath: "dist",
    //     tsConfig: "tsconfig.json",
    //     federationConfig: "federation.config.cjs",
    //     verbose: false,
    //     dev: command === "serve",
    //   },
    //   adapter: createEsBuildAdapter({ plugins: [] }),
    // }),
    vue(),
    vueJsx(),
    federation({
      name: "vue-vite",
      filename: 'remoteEntry.js',
      remotes: {
        checkout: {
          external: 'https://checkout.hub4all.io/remoteEntry.js',
          from: 'webpack',
          externalType: 'url'
        },
      },
      // shared: ['react', 'react-dom'],
      shared: {
        react: {
          requiredVersion: '18.2.0',//Fix to get from package.json
        },
        "react-dom": {
          requiredVersion: '18.2.0',//Fix to get from package.json
        }
      },
      remoteType: 'module'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
}))
