import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        // resolve cors errors
        target: 'https://chatty-backend-service.onrender.com',
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
