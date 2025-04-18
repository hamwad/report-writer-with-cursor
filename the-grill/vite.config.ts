import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

export default defineConfig({
  plugins: [
    VueRouter({ exclude: ['**/components/**/*'] }),
    vue(),
    vueDevTools(),
    Components({
      dirs: ['src/components', 'src/pages/**/components'],
    }),
    AutoImport({
      imports: [
        VueRouterAutoImports,
        'vue',
        '@vueuse/core',
        {
          'vee-validate': ['useForm', 'useField'],
          zod: [['*', 'zod']],
          axios: [['default', 'axios']],
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
