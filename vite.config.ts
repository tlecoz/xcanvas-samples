import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  /*
  server: {
    host: '0.0.0.0',
    https: {
      key: 'localhost.key',
      cert: 'localhost.crt'
    }
  },
  */
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'], // Exemple de regroupement de bibliothèques
        }
      }
    }
  }


})
