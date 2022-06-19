import { defineConfig } from 'vitepress'

export default defineConfig({
  // ...
  outDir: 'dist',
  description: '🧣Moonman(WIP)',
  title: '🧣Moonman(WIP)',
  themeConfig: {
    nav: [{ text: 'Github', link: 'https://github.com/Akimotorakiyu/Moonman' }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Akimotorakiyu',
    },
  },
})
