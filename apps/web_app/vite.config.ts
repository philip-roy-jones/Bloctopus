import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import dotenv from 'dotenv';
import { API_GATEWAY_URL } from './src/config/config';

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    }
  },
  server: {
    proxy: {
      '/api': {
        target: API_GATEWAY_URL,
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
