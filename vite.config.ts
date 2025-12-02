import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svrg from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  base: "article_trainer",
  plugins: [react(), svrg()],
  css: {
    devSourcemap: true,
  },
})
