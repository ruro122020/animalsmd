import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'


//IMPORTANT NOTE: VITE CONNECTION MUST BE CONFIGURED FOR COOKIES TO WORK!
// https://vitejs.dev/config/
export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    base: "/animalsmd-frontend/",
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          // To access env vars here use process.env.TEST_VAR
          target: process.env.VITE_API_BASE_URL_PRODUCTION,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  })
}





