import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [WindiCSS(), vue(), jsx()],
})
