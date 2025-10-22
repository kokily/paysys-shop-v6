// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@styles/_variables.scss" as *; @use "@styles/_mixins.scss" as *;`,
      },
    },
  },
  publicDir: 'public',
  build: {
    rollupOptions: {
      external: [],
    },
  },
});
