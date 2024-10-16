import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Make the server accessible from outside docker
    port: 5173,  // Port running vite dev server inside the container
    proxy: {
      '/users': {
        target: 'http://backend:8080',  // Forward API requests to the backend service in Docker
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users/, '/users'),
      },
    },
  },
})

