import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const PORT = 3001;
// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    port: PORT
  },
  root: 'src/client',
  publicDir: 'assets',
  plugins: [vue()],
  server: {
    port: PORT,
    strictPort: true,
    https: false,
    open: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: '../../dist/src/client',
    emptyOutDir: true,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 650,
    target: 'esnext'
  }
});
