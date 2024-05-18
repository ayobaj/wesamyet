import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy: {
      '/backend':{
        target: import.meta.env.VITE_ENVIRONMENT,
        secure: false,
      }
    }
  },
  plugins: [react()],
})
