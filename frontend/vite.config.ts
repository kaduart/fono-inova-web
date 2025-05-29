import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'react-router-dom',
      'react',
      'react-dom'
    ]
  },
  server: {
    port: 3000,
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': {
        target: 'http://167.234.249.6:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')  // Garantir que o alias "@" aponta para a pasta src
    }
  },
});
