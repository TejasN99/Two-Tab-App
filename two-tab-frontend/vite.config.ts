// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Two-Tab-App/',  // <—— This must match your GitHub repo name
  plugins: [react()],
})
