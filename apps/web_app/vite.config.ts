import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import tailwindcss from '@tailwindcss/vite';
import dotenv from 'dotenv';
import { NGINX_URL } from './src/config/config';

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    }
  },
  server: {
    proxy: {
      '/api': {
        target: NGINX_URL,
        changeOrigin: true,
        secure: false,
      }
    },
    watch: {
      usePolling: true,
    },
    port: 5173,
    host: true,
    strictPort: true
  }
})
