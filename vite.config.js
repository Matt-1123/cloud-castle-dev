import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { secret } from '@aws-amplify/backend';


export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://www.amazon.com/ap/oa',
        // target: 'http://jsonplaceholder.typicode.com/todos/1',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, `?client_id=${secret('lwaClientId')}&scope=alexa::skills:account_linking&response_type=code&redirect_uri=https://www.cloudcastledev.com&state=7dh39dj3x4`) // removes the '/api' prefix
      }
    }
  }  

})
