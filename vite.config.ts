import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcss from 'postcss'

// https://vitejs.dev/config/
export default defineConfig({
  root: "D:/Personal/AncientPeoplePaleolith/ancientpeopleviteclient",
  base: "./",
  plugins: [vue()]
})
