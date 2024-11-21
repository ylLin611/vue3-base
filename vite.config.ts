import { fileURLToPath, URL } from 'node:url'

import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { viteMockServe } from 'vite-plugin-mock'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const resolve = (dir: string): string => path.resolve(__dirname, dir)
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    UnoCSS(),
    // mock支持
    viteMockServe({
      mockPath: './mock',
    }),
    // 自动引入
    Components({
      dirs: [resolve('src/common/components')],
      extensions: ['vue', 'ts'],
      deep: true,
      dts: true,
      // resolvers: [ElementPlusResolver({})]
    }),
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      imports: ['vue-router', 'vue', 'pinia'],
      eslintrc: {
        enabled: true, // Default `false`
      },
      // resolvers: [ElementPlusResolver()]
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
