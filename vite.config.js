import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
//IMPORTANT NOTE: VITE CONNECTION MUST BE CONFIGURED FOR COOKIES TO WORK!
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: import.meta.env.VITE_API_BASE_URL_PRODUCTION,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})

//for local development
//target: 'http://localhost:8000',
//for production
//target: 'https://running-kimmi-ruthsweb-5ee6d665.koyeb.app',