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
          target: 'http://localhost:5555',
          changeOrigin: true,
          secure:false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
})
