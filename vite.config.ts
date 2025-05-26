import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "bootstrap/scss/_functions.scss";
          @import "bootstrap/scss/_variables.scss";
          @import "bootstrap/scss/_mixins.scss";
        `
      }
    }
  }
})