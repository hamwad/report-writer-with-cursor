import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import AutoImport from 'unplugin-auto-import/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    VueRouter({ exclude: ['**/components/**/*'] }),
    vue(),
    vueDevTools(),
    tailwindcss(),
    Components({
      resolvers: [PrimeVueResolver()],
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
