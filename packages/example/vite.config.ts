import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import windicss from 'vite-plugin-windicss'
export default defineConfig({
  plugins: [vue(), jsx(), windicss()],
})
