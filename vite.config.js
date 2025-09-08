import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
const target = process.env.VITE_API_URL || 'http://zamio_app:8000';
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 4176,
    proxy: {
      '/api': { target, changeOrigin: true, secure: false },
      '/media': { target, changeOrigin: true, secure: false },
    },
  },
})

